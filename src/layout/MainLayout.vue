<template>
  <div class="common-layout">
    <HeaderBar />
    <div class="container">
      <div class="sidemenu-wrapper">
        <SideMenu />
      </div>
      <div class="content-area">
        <div class="breadcrumb-bar">
          <BreadcrumbBar />
        </div>
        <div class="main-scroll">
          <router-view />
        </div>
      </div>
    </div>
    <FooterBar class="footer-fixed" />
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
  position: relative;
}

/* 中间部分：左边菜单+右边内容 */
/* 让 container 高度撑满剩余空间，避免 main-scroll 以外区域滚动 */
.container {
  flex: 1 0 auto;
  display: flex;
  width: 100%;
  min-height: 0;
  overflow: hidden;
}

/* 左侧菜单固定+滚动 */
/* SideMenu 固定高度，且不滚动 */
.sidemenu-wrapper {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e5e5e5;
  /* 不要 overflow-y: auto; 让其不滚动 */
  flex-shrink: 0;
  height: 100%;
}

/* 右侧内容区 */
/* 右侧内容区撑满剩余空间 */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 关键：让 main-scroll 能滚动 */
  overflow: hidden;
  background: #f5f7fa;
}

/* 面包屑固定在顶部 */
.breadcrumb-bar {
  flex-shrink: 0;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

/* 主内容区可滚动 */
/* 只有 main-scroll 区域滚动 */
.main-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  box-sizing: border-box;
}

/* FooterBar 固定在底部 */
.footer-fixed {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>
