<template>
  <div class="users-management">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理后台</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input 
            placeholder="请输入用户名进行搜索" 
            v-model="queryParams.username" 
            clearable 
            @clear="handleClearSearch"
            @input="handleSearch"
            @keydown.enter.native="handleSearchImmediate">
            <template #append>
              <el-button @click="handleSearchImmediate" size="small">
                <i class="el-icon-search"></i>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>

      <el-table :data="userList" border stripe v-loading="loading">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户名" prop="userAccount"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
  <el-table-column label="电话" prop="phone"></el-table-column>
  <el-table-column label="签名" prop="tags"></el-table-column>
        <el-table-column label="角色" prop="userRole">
          <template #default="scope">
            <el-tag :type="scope.row.userRole === 1 ? 'success' : 'info'">
              {{ scope.row.userRole === 1 ? '管理员' : '学生' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template #default="scope">
            <el-space align="center" size="small">
              <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="warning" size="small" @click="openResetPassword(scope.row)">重置密码</el-button>
              <el-popconfirm title="确定要删除这位用户吗?" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </el-space>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>

  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" @close="resetEditForm">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px">
        <el-form-item label="用户名" prop="userAccount">
          <el-input v-model="userForm.userAccount"></el-input>
        </el-form-item>
        <!-- 后台不支持直接在此修改密码，新增用户请走注册流程 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="签名" prop="tags">
          <el-input type="textarea" :rows="3" v-model="userForm.tags"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="userRole">
           <el-select v-model="userForm.userRole" placeholder="请选择角色">
            <el-option label="学生" :value="0"></el-option>
            <el-option label="管理员" :value="1"></el-option>
           </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 重置密码对话框 -->
    <el-dialog v-model="resetDialogVisible" title="重置密码" width="400px" @close="() => { resetFormRef.value && resetFormRef.value.clearValidate(); }">
      <el-form ref="resetFormRef" :model="resetForm" :rules="resetFormRules" label-width="100px">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetForm.newPassword" type="password" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="resetForm.confirmPassword" type="password" autocomplete="new-password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitResetPassword">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { apiSearchUsers, apiUpdateUser, apiDeleteUser } from '@/api/user'

// --- 响应式数据 ---
const loading = ref(false)
const allUsers = ref([]) // Store all users from API
const queryParams = reactive({
  username: '',
  pageNum: 1,
  pageSize: 5
})
const dialogVisible = ref(false)
const dialogTitle = ref('')
const userFormRef = ref(null)
const userForm = ref({ id: null, userAccount: '', email: '', phone: '', tags: '', userRole: 0 })
// Reset password dialog
const resetDialogVisible = ref(false)
const resetFormRef = ref(null)
const resetForm = ref({ id: null, newPassword: '', confirmPassword: '' })
const resetFormRules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, message: '密码至少 8 位', trigger: ['blur', 'change'] }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: (rule, value, cb) => {
        if (value !== resetForm.value.newPassword) cb(new Error('两次输入密码不一致'))
        else cb()
      }, trigger: ['blur', 'change'] }
  ]
}
const userFormRules = {
  userAccount: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { 
      min: 1, 
      max: 50, 
      message: '用户名长度应在1到50个字符之间', 
      trigger: ['blur', 'change'] 
    },
    {
      validator: (rule, value, callback) => {
        if (!value || value.trim() === '') {
          callback(new Error('用户名不能为空或仅包含空格'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { 
      type: 'email', 
      message: '请输入正确的邮箱地址', 
      trigger: ['blur', 'change'] 
    },
    {
      validator: (rule, value, callback) => {
        if (!value || value.trim() === '') {
          callback(new Error('邮箱不能为空或仅包含空格'))
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  phone: [
    { required: false },
    { validator: (rule, value, cb) => {
        if (!value) return cb()
        if (!/^1[3-9]\d{9}$/.test(value)) cb(new Error('请输入正确的手机号'))
        else cb()
      }, trigger: ['blur', 'change'] }
  ],
  tags: [
    { required: false },
    { max: 512, message: '签名最多 512 个字符', trigger: ['blur', 'change'] }
  ],
  userRole: [
    { 
      required: true, 
      message: '请选择角色', 
      trigger: ['change', 'blur'] 
    },
    {
      validator: (rule, value, callback) => {
        if (value !== 0 && value !== 1) {
          callback(new Error('角色值必须为0（学生）或1（管理员）'))
        } else {
          callback()
        }
      },
      trigger: ['change', 'blur']
    }
  ]
}

// Debounce timer for search input
let searchDebounceTimer = null

// Computed property for paginated user list
const userList = computed(() => {
  const start = (queryParams.pageNum - 1) * queryParams.pageSize
  const end = start + queryParams.pageSize
  return allUsers.value.slice(start, end)
})

// Computed property for total count (reflects filtered results)
const total = computed(() => allUsers.value.length)

onMounted(() => { getUsersList() })

// --- 方法 ---
const getUsersList = async () => {
  loading.value = true
  try {
    const base = await apiSearchUsers({ userName: queryParams.username })
    if (base?.code === 0) {
      // Handle empty or malformed data
      if (!base.data) {
        allUsers.value = []
        ElMessage.warning('未返回用户数据')
        return
      }
      
      // Ensure data is an array
      if (!Array.isArray(base.data)) {
        allUsers.value = []
        ElMessage.error('返回的用户数据格式错误')
        return
      }
      
      allUsers.value = base.data

      // 回退：如果按 userName 搜索没有结果，但用户可能在 userAccount 中匹配（比如只输入学号片段），
      // 则尝试拉取全量并在前端根据 userAccount 做模糊匹配（谨慎：仅在管理列表较小或临时调试时使用）
      if (Array.isArray(base.data) && base.data.length === 0 && queryParams.username) {
        console.debug('userSearch: no results by userName, trying fallback by userAccount')
        try {
          const allResp = await apiSearchUsers({ userName: '' })
          const allList = (allResp?.code === 0 && Array.isArray(allResp.data)) ? allResp.data : []
          const q = String(queryParams.username).toLowerCase()
          allUsers.value = allList.filter(u => {
            return (u.userAccount && String(u.userAccount).toLowerCase().includes(q)) ||
                   (u.userName && String(u.userName).toLowerCase().includes(q))
          })
        } catch (e) {
          console.debug('userSearch: fallback failed', e)
        }
      }
      
      // Handle empty search results gracefully (no error message, just empty state)
      if (allUsers.value.length === 0 && queryParams.username) {
        // Empty search results - this is normal, no error message needed
      }
    } else {
      // Backend returned an error code
      const errorMsg = base?.message || '获取用户列表失败，请稍后重试'
      ElMessage.error(errorMsg)
      allUsers.value = []
    }
  } catch (e) {
    // Network or unexpected errors
    const errorMsg = e?.response?.data?.message || e?.message || '网络错误，无法获取用户列表'
    ElMessage.error(errorMsg)
    allUsers.value = []
  } finally {
    // Ensure loading state is always cleared
    loading.value = false
  }
}

// Debounced search function
const handleSearch = () => {
  // Clear existing timer
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  
  // Set new timer for debounced search
  searchDebounceTimer = setTimeout(() => {
    // Reset to page 1 on new search
    queryParams.pageNum = 1
    getUsersList()
  }, 300) // 300ms debounce delay
}

// Immediate search (e.g., on Enter or button click)
const handleSearchImmediate = () => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = null
  }
  queryParams.pageNum = 1
  getUsersList()
}

// Handle clear search
const handleClearSearch = () => {
  // Clear debounce timer if exists
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  // Reset to page 1 and reload full list
  queryParams.pageNum = 1
  getUsersList()
}

// 此处暂不支持新增用户（请走注册流程）

// 打开编辑用户对话框
const handleEdit = (row) => {
  // 深拷贝，避免直接修改列表数据
  userForm.value = {
    id: row.id,
    userAccount: row.userAccount || row.userName,
    email: row.email,
    phone: row.phone,
    tags: row.tags,
    userRole: row.userRole ?? 0
  }
  dialogTitle.value = '编辑用户'
  dialogVisible.value = true
}

// 打开重置密码对话框
const openResetPassword = (row) => {
  resetForm.value = { id: row.id, newPassword: '', confirmPassword: '' }
  resetDialogVisible.value = true
}

// 提交重置密码
const submitResetPassword = async () => {
  if (!resetFormRef.value) {
    ElMessage.error('表单未初始化')
    return
  }
  try {
    const valid = await resetFormRef.value.validate()
    if (!valid) return
  } catch (e) {
    ElMessage.warning('请检查重置密码表单')
    return
  }
  try {
    // 调用通用更新接口，后端需要支持 userPassword 字段更新（或提供专门接口）
    const payload = { id: resetForm.value.id, userPassword: resetForm.value.newPassword }
    const base = await apiUpdateUser(payload)
    if (base?.code === 0) {
      ElMessage.success('密码已重置')
      resetDialogVisible.value = false
    } else {
      ElMessage.error(base?.message || '重置密码失败')
    }
  } catch (e) {
    const errorMsg = e?.response?.data?.message || e?.message || '网络错误，无法重置密码'
    ElMessage.error(errorMsg)
  }
}

// 删除用户
const handleDelete = async (id) => {
  try {
    const base = await apiDeleteUser(id)
    if (base?.code === 0) {
      ElMessage.success('删除成功！')
      getUsersList()
    } else {
      // Standardized error message extraction from API response
      const errorMsg = base?.message || '删除用户失败，请稍后重试'
      ElMessage.error(errorMsg)
    }
  } catch (e) {
    // Handle network failures and other exceptions
    const errorMsg = e?.response?.data?.message || e?.message || '网络错误，无法删除用户'
    ElMessage.error(errorMsg)
  }
}

// 提交表单（新增/编辑）
const submitForm = async () => {
  // Validate form before proceeding
  if (!userFormRef.value) {
    ElMessage.error('表单未初始化')
    return
  }

  try {
    const valid = await userFormRef.value.validate()
    if (!valid) {
      ElMessage.warning('请填写完整的表单信息')
      return
    }
  } catch (validationError) {
    // Validation failed - Element Plus throws error with invalid fields
    ElMessage.warning('请检查表单中的错误信息')
    return
  }

  try {
    const payload = {
      id: userForm.value.id,
      userAccount: userForm.value.userAccount,
      email: userForm.value.email,
      phone: userForm.value.phone,
      tags: userForm.value.tags,
      userRole: userForm.value.userRole
    }
    
    const base = await apiUpdateUser(payload)
    if (base?.code === 0) {
      ElMessage.success('更新成功！')
      dialogVisible.value = false
      getUsersList()
    } else {
      // Improved error message display for update failures
      const errorMsg = base?.message || '更新用户信息失败，请稍后重试'
      ElMessage.error(errorMsg)
    }
  } catch (e) {
    // Handle network timeouts and other exceptions
    const errorMsg = e?.response?.data?.message || e?.message || '网络错误，无法更新用户信息'
    ElMessage.error(errorMsg)
  }
}

// 重置编辑表单
const resetEditForm = () => {
  // Reset form data to initial state
  userForm.value = { 
    id: null, 
    userAccount: '', 
    email: '', 
    userRole: 0 
  }
  
  // Clear validation errors and reset fields
  if (userFormRef.value) {
    // clearValidate() removes validation errors
    userFormRef.value.clearValidate()
    // resetFields() resets to initial values
    userFormRef.value.resetFields()
  }
}
</script>

<style scoped>
.users-management {
  padding: 20px;
}
.box-card {
  margin-top: 20px;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
