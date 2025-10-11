<template>
  <div class="login-page">
    <el-card class="login-card">
      <el-tabs v-model="activeTab">
        <!-- 登录 Tab -->
        <el-tab-pane label="登录" name="login">
          <h2>用户登录</h2>
          <el-form :model="loginForm" @submit.prevent="handleLogin">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" block>登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 注册 Tab -->
        <el-tab-pane label="注册" name="register">
          <h2>用户注册</h2>
          <el-form :model="registerForm" @submit.prevent="handleRegister">
            <el-form-item label="用户名">
              <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="handleRegister" block>注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

// 控制 Tab
const activeTab = ref('login')

// 登录表单
const loginForm = ref({
  username: '',
  password: ''
})

// 注册表单
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  try {
    await userStore.backendLogin({
      username: loginForm.value.username,
      password: loginForm.value.password,
    })
    ElMessage.success('登录成功')
    if (userStore.role === 'admin') {
      router.push('/admin/users')
    } else {
      router.push('/')
    }
  } catch (e) {
    ElMessage.error(e?.response?.data?.message || '登录失败')
  }
}


const handleRegister = async () => {
  if (!registerForm.value.username || !registerForm.value.password) {
    ElMessage.error('请填写完整信息')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  try {
    await userStore.backendRegister({
      username: registerForm.value.username,
      password: registerForm.value.password,
      confirmPassword: registerForm.value.confirmPassword,
    })
    ElMessage.success('注册成功，请登录')
    activeTab.value = 'login'
  } catch (e) {
    ElMessage.error(e?.response?.data?.message || '注册失败')
  }
}
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background: #f2f2f2;
}
.login-card {
  width: 400px;
  padding: 20px;
}
</style>
