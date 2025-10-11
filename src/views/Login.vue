<template>
  <div class="login-page">
    <el-card class="login-card">
      <el-tabs v-model="activeTab">
        <!-- 登录 Tab -->
        <el-tab-pane label="登录" name="login">
          <h2>用户登录</h2>
          <el-form :model="loginForm" @submit.prevent="handleLogin">
            <el-alert type="info" :closable="false" title="填写规则" style="margin-bottom: 12px">
              <template #default>
                <div>• 用户名至少 4 位，不能包含空格/标点/符号</div>
                <div>• 密码至少 8 位</div>
              </template>
            </el-alert>
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="loginForm.userRole" placeholder="请选择角色" style="width: 100%">
                <el-option label="学生" :value="0" />
                <el-option label="管理员" :value="1" />
              </el-select>
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
            <el-alert type="info" :closable="false" title="填写规则" style="margin-bottom: 12px">
              <template #default>
                <div>• 用户名至少 4 位，不能包含空格/标点/符号</div>
                <div>• 密码至少 8 位</div>
                <div>• 两次输入的密码需一致</div>
              </template>
            </el-alert>
            <el-form-item label="用户名">
              <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="registerForm.userRole" placeholder="请选择角色" style="width: 100%">
                <el-option label="学生" :value="0" />
                <el-option label="管理员" :value="1" />
              </el-select>
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
  password: '',
  userRole: 0,
})

// 注册表单
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  userRole: 0,
})

const handleLogin = async () => {
  const username = loginForm.value.username?.trim() || ''
  const password = loginForm.value.password || ''
  const invalidChars = /[\p{P}\p{S}\s]+/u // 标点、符号、空白

  if (!username || !password) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  if (username.length < 4) {
    ElMessage.error('用户名不规范：至少 4 位，且不含空格/符号')
    return
  }
  if (invalidChars.test(username)) {
    ElMessage.error('用户名不支持特殊字符（空格/标点/符号）')
    return
  }
  if (password.length < 8) {
    ElMessage.error('用户密码不规范：至少 8 位')
    return
  }
  try {
    await userStore.backendLogin({
      username,
      password,
      userRole: loginForm.value.userRole,
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
  const username = registerForm.value.username?.trim() || ''
  const password = registerForm.value.password || ''
  const confirmPassword = registerForm.value.confirmPassword || ''
  const invalidChars = /[\p{P}\p{S}\s]+/u

  if (!username || !password || !confirmPassword) {
    ElMessage.error('请填写完整信息')
    return
  }
  if (username.length < 4) {
    ElMessage.error('用户名不规范：至少 4 位，且不含空格/符号')
    return
  }
  if (invalidChars.test(username)) {
    ElMessage.error('用户名不支持特殊字符（空格/标点/符号）')
    return
  }
  if (password.length < 8 || confirmPassword.length < 8) {
    ElMessage.error('用户密码不规范：至少 8 位')
    return
  }
  if (password !== confirmPassword) {
    ElMessage.error('密码与校验密码不一致')
    return
  }
  try {
    await userStore.backendRegister({
      username,
      password,
      confirmPassword,
      userRole: registerForm.value.userRole,
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
