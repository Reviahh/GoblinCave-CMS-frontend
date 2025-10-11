<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}

function goProfile() {
  router.push('/profile')
}
</script>

<template>
  <el-header class="topbar">
    <div class="logo">
      <img :src="logo" alt="logo" class="logo-img" />
      <span>哥布林大学</span>
    </div>
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
        <el-avatar
          :src="userStore.avatar || 'https://i.pravatar.cc/150?img=1'"
          size="small"
          class="nav-avatar"
          @click="$router.push('/profile')"
        />
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
.nav-avatar {
  margin: 0 15px; /* 左右间距 */
  cursor: pointer;
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

.logo-img {
  height: 32px; /* 适配 60px 顶栏的合适高度 */
  width: auto;
  margin-right: 8px;
  display: block;
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

.avatar {
  margin-right: 10px;
  cursor: pointer;
}
</style>
