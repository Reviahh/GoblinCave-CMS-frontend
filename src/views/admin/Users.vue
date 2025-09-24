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
        <el-col :span="4">
          <el-button type="primary" @click="handleAdd">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border stripe v-loading="loading">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role">
          <template #default="scope">
            <el-tag :type="scope.row.role === 'admin' ? 'success' : 'info'">
              {{ scope.row.role === 'admin' ? '管理员' : '普通用户' }}
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userForm.id">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
           <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="user"></el-option>
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
const loading = ref(true);
const userList = ref([]); // 用户列表
const total = ref(0); // 总用户数
const queryParams = reactive({
  username: '',
  pageNum: 1,
  pageSize: 5
});
const dialogVisible = ref(false);
const dialogTitle = ref('');
const userFormRef = ref(null);
const userForm = ref({
  id: null,
  username: '',
  password: '',
  email: '',
  role: 'user'
});
const userFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
};

// --- 模拟数据 ---
const allUsers = ref([]);
onMounted(() => {
  // 模拟从 API 获取数据
  const mockData = Array.from({ length: 37 }).map((_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    email: `user${i+1}@example.com`,
    role: i % 5 === 0 ? 'admin' : 'user',
    createTime: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
  }));
  allUsers.value = mockData;
  getUsersList();
});

// --- 方法 ---

// 获取用户列表（模拟）
const getUsersList = () => {
  loading.value = true;
  // 模拟筛选
  const filtered = allUsers.value.filter(user => 
    user.username.toLowerCase().includes(queryParams.username.toLowerCase())
  );
  // 模拟分页
  const start = (queryParams.pageNum - 1) * queryParams.pageSize;
  const end = start + queryParams.pageSize;
  userList.value = filtered.slice(start, end);
  total.value = filtered.length;
  
  setTimeout(() => {
    loading.value = false;
  }, 300); // 模拟加载延迟
};

// 打开新增用户对话框
const handleAdd = () => {
  resetForm();
  dialogTitle.value = '添加新用户';
  dialogVisible.value = true;
};

// 打开编辑用户对话框
const handleEdit = (row) => {
  // 深拷贝，避免直接修改列表数据
  userForm.value = JSON.parse(JSON.stringify(row));
  // 编辑时不需要显示密码
  delete userForm.value.password;
  dialogTitle.value = '编辑用户';
  dialogVisible.value = true;
};

// 删除用户
const handleDelete = (id) => {
  allUsers.value = allUsers.value.filter(user => user.id !== id);
  getUsersList(); // 重新获取数据
  ElMessage.success('删除成功！');
};

// 提交表单（新增/编辑）
const submitForm = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      if (userForm.value.id) {
        // 编辑
        const index = allUsers.value.findIndex(user => user.id === userForm.value.id);
        if (index !== -1) {
          allUsers.value[index] = { ...allUsers.value[index], ...userForm.value };
        }
        ElMessage.success('更新成功！');
      } else {
        // 新增
        const newUser = {
          ...userForm.value,
          id: Date.now(), // 模拟唯一ID
          createTime: new Date().toLocaleDateString()
        };
        allUsers.value.unshift(newUser);
        ElMessage.success('添加成功！');
      }
      getUsersList();
      dialogVisible.value = false;
    }
  });
};

// 重置表单
const resetForm = () => {
  userForm.value = {
    id: null,
    username: '',
    password: '',
    email: '',
    role: 'user'
  };
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
