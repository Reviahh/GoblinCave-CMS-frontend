<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-header class="topbar">
    <div class="logo">哥布林大学</div>
    <div class="nav-links">
      <el-menu
        mode="horizontal"
        :default-active="$route.path"
        router
        background-color="#3fbed1"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/news">新闻公告</el-menu-item>
        <el-menu-item index="/competitions">学科竞赛</el-menu-item>
        <el-menu-item index="/courses">课程管理</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
      </el-menu>
    </div>
    <div class="auth">
      <template v-if="!userStore.isLoggedIn">
        <el-button type="primary" size="small" @click="$router.push('/login')">
          登录
        </el-button>
      </template>
      <template v-else>
        <span class="welcome">欢迎，{{ userStore.username }}</span>
        <el-button type="danger" size="small" @click="handleLogout">
          退出
        </el-button>
      </template>
    </div>
  </el-header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3fbed1;
  color: #fff;
  height: 60px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  padding: 0 20px;
  background-color: #3fbed1;
  color: #fff;
  display: flex;
  align-items: center;
  height: 60px;
}

.nav-links {
  flex: 1;
}
.nav-links :deep(.el-menu) {
  border-bottom: none !important;
  box-shadow: none !important;
}


.auth {
  padding-right: 20px;
  display: flex;
  align-items: center;
  height: 60px;
}

.welcome {
  margin-right: 10px;
  color: #fff;
}
</style>
