
<script setup>
import NavHeader from './components/NavHeader.vue'
import MainContent from './components/MainContent.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><NavHeader /></el-header>
      <el-main><MainContent /></el-main>
      <el-footer><PageFooter /></el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-container {
  width: 100%;
  margin: 0 auto;    /* 居中 */
  flex: 1;
  display: flex;
  flex-direction: column;
}
.el-header {
  background-color: #3fbed1;
  padding: 0;
  align-self: flex-start;
  width: 100%;
}
.el-main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.el-footer {
  justify-content: center;
}
</style>
