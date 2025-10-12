<template>
  <div class="users-management">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理后台</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入用户名进行搜索" v-model="queryParams.username" clearable @clear="getUsersList">
            <template #append>
              <el-button icon="Search" @click="getUsersList"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>

      <el-table :data="userList" border stripe v-loading="loading">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户名" prop="userAccount"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="userRole">
          <template #default="scope">
            <el-tag :type="scope.row.userRole === 1 ? 'success' : 'info'">
              {{ scope.row.userRole === 1 ? '管理员' : '学生' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <el-button type="primary" icon="Edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定要删除这位用户吗?" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getUsersList"
        @current-change="getUsersList"
      />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" @close="resetForm">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px">
        <el-form-item label="用户名" prop="userAccount">
          <el-input v-model="userForm.userAccount"></el-input>
        </el-form-item>
        <!-- 后台不支持直接在此修改密码，新增用户请走注册流程 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
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
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';

// --- 响应式数据 ---
const loading = ref(false);
const userList = ref([]);
const total = ref(0);
const queryParams = reactive({
  username: '',
  pageNum: 1,
  pageSize: 5
});
const dialogVisible = ref(false);
const dialogTitle = ref('');
const userFormRef = ref(null);
const userForm = ref({ id: null, userAccount: '', email: '', userRole: 0 });
const userFormRules = {
  userAccount: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  userRole: [{ required: true, message: '请选择角色', trigger: 'change' }]
};

onMounted(() => { getUsersList(); });

// --- 方法 ---

import { apiSearchUsers, apiUpdateUser, apiDeleteUser } from '@/api/user'
const getUsersList = async () => {
  loading.value = true;
  try {
    const base = await apiSearchUsers({ userName: queryParams.username })
    if (base?.code === 0) {
      userList.value = base.data || []
      total.value = userList.value.length
    } else {
      ElMessage.error(base?.message || '获取用户失败')
    }
  } finally {
    loading.value = false;
  }
};

// 此处暂不支持新增用户（请走注册流程）

// 打开编辑用户对话框
const handleEdit = (row) => {
  // 深拷贝，避免直接修改列表数据
  userForm.value = {
    id: row.id,
    userAccount: row.userAccount || row.userName,
    email: row.email,
    userRole: row.userRole ?? 0,
  }
  dialogTitle.value = '编辑用户';
  dialogVisible.value = true;
};

// 删除用户
const handleDelete = async (id) => {
  try {
    const base = await apiDeleteUser(id)
    if (base?.code === 0) {
      ElMessage.success('删除成功！')
      getUsersList()
    } else {
      ElMessage.error(base?.message || '删除失败')
    }
  } catch (e) {
    ElMessage.error(e?.response?.data?.message || '删除失败')
  }
};

// 提交表单（新增/编辑）
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      const payload = {
        id: userForm.value.id,
        userAccount: userForm.value.userAccount,
        email: userForm.value.email,
        userRole: userForm.value.userRole,
      }
      const base = await apiUpdateUser(payload)
      if (base?.code === 0) {
        ElMessage.success('更新成功！')
        dialogVisible.value = false
        getUsersList()
      } else {
        ElMessage.error(base?.message || '更新失败')
      }
    } catch (e) {
      ElMessage.error(e?.response?.data?.message || '更新失败')
    }
  })
};

// 重置表单
const resetForm = () => {
  userForm.value = { id: null, userAccount: '', email: '', userRole: 0 };
  if (userFormRef.value) {
    userFormRef.value.resetFields();
  }
};
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
