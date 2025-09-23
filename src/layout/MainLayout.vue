<template>
  <div class="common-layout">
    <HeaderBar />
    <div class="container">
      <SideMenu />
      <main class="main-area">
        <BreadcrumbBar />
        <router-view />
      </main>
    </div>
    <FooterBar />
  </div>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import SideMenu from '@/components/SideMenu.vue'
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container {
  display: flex;
  flex: 1;
  width: 100%;
  background: #f5f7fa;
}

.main-area {
  flex: 1;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
