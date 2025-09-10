<template>
  <el-header>
    <nav class="nav">
      <a href="/">首页</a>
      <a href="/about">关于</a>
      <a href="/contact">联系</a>
    </nav>
  </el-header>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 18px;
}
.nav a {
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
}
.nav a:hover {
  background: #e9eef3;
  border-radius: 4px;
}
</style>
