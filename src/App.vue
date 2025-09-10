
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
}
.el-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.el-main {
  flex: 1;
}
</style>
