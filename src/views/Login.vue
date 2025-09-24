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
            <el-form-item label="身份选择">
              <el-radio-group v-model="loginForm.role">
                <el-radio label="admin">管理员</el-radio>
                <el-radio label="student">学生</el-radio>
              </el-radio-group>
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
            <el-form-item label="身份选择">
              <el-radio-group v-model="registerForm.role">
                <el-radio label="student">学生</el-radio>
                <el-radio label="admin">管理员</el-radio>
              </el-radio-group>
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

const userStore = useUserStore()
const router = useRouter()

// 控制 Tab
const activeTab = ref('login')

// 登录表单
const loginForm = ref({
  username: '',
  password: '',
  role: 'student'
})

// 注册表单
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'student'
})

const handleLogin = () => {
  if (
    loginForm.value.role === 'admin' &&
    loginForm.value.username === 'admin' &&
    loginForm.value.password === '123456'
  ) {
    userStore.login(loginForm.value.username, loginForm.value.role)
    router.push('/admin/users') // 管理员跳后台
  } else if (loginForm.value.username && loginForm.value.password) {
    userStore.login(loginForm.value.username, loginForm.value.role)
    router.push('/')
  } else {
    alert('用户名或密码错误！')
  }
}


const handleRegister = () => {
  if (!registerForm.value.username || !registerForm.value.password) {
    alert('请填写完整信息')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致！')
    return
  }

  // 这里应该调用后端 API 保存用户数据，现在简单模拟：
  alert(`注册成功！欢迎 ${registerForm.value.username} 作为 ${registerForm.value.role}`)
  activeTab.value = 'login' // 注册成功后切回登录
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
