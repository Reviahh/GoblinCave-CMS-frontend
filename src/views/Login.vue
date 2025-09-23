<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>用户登录</h2>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="身份选择">
          <el-radio-group v-model="form.role">
            <el-radio label="admin">管理员</el-radio>
            <el-radio label="student">学生</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLogin" block>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const form = ref({
  username: '',
  password: '',
  role: 'student' // 默认学生
})

const handleLogin = () => {
  // 简单模拟：只有 admin/123456 才能当管理员，其余默认学生
  if (form.value.role === 'admin' && form.value.username === 'admin' && form.value.password === '123456') {
    userStore.login(form.value.username, 'admin')
    router.push('/')
  } else if (form.value.role === 'student' && form.value.username && form.value.password) {
    userStore.login(form.value.username, 'student')
    router.push('/')
  } else {
    alert('用户名或密码错误！')
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
  width: 350px;
  padding: 20px;
}
</style>
