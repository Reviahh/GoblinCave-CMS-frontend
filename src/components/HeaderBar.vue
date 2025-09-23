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
  color: #fff;
}

.nav-links {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
