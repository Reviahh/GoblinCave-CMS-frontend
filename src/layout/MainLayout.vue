<template>
  <div class="common-layout">
    <HeaderBar class="header-bar"/>
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
/* ---------- 调整这些变量以匹配你组件的真实高度/宽度 ---------- */
.common-layout {
  --header-height: 64px;     /* Header 的高度（确保与 HeaderBar 实际高度一致） */
  --footer-height: 56px;     /* Footer 的高度 */
  --side-width: 200px;       /* 侧边栏宽度 */
  --breadcrumb-height: 56px; /* 面包屑高度（固定在 header 下方） */

  min-height: 100vh;
  width: 100%;
  /* 禁止页面整体滚动，只有 main-scroll 滚动 */
  overflow: hidden;
  box-sizing: border-box;
}

/* ---------- Header 固定在顶部 ---------- */
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 1100;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
}

/* 确保 Header 内部占满高度（可选，根据你 Header 组件内部结构） */
.header-bar > * {
  height: 100%;
  box-sizing: border-box;
}

/* ---------- Footer 固定在底部 ---------- */
.footer-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--footer-height);
  z-index: 1100;
  background: #fff;
  box-shadow: 0 -1px 0 rgba(0,0,0,0.04);
}
.footer-fixed > * { height: 100%; box-sizing: border-box; }

/* ---------- 左侧侧边栏：固定在 header 下方 / footer 上方 ---------- */
.sidemenu-wrapper {
  position: fixed;
  top: var(--header-height);           /* 紧贴 Header 下方 */
  left: 0;
  bottom: var(--footer-height);        /* 紧贴 Footer 上方 */
  background: #fff;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;                    /* 菜单内容超长时内部滚动 */
  z-index: 1050;
  box-sizing: border-box;
  /* 如果你不希望侧边栏也带 shadow，就去掉以下 */
}

/* ---------- 主容器（为 main-scroll 留出侧边与上下空间） ---------- */
.container {
  /* 因为侧栏和 header/footer 都是 fixed，我们把主内容区推开以避免遮挡 */
  margin-left: var(--side-width);      /* 给侧边栏让空间 */
  /* 上下的空间由 main-scroll 的 fixed 定位来控制 */
  min-height: 100vh;
  box-sizing: border-box;
  width: calc(100% - var(--side-width));
}

/* content-area 可以作为语义容器，内部并不负责滚动 */
.content-area {
  box-sizing: border-box;
  min-height: 0;
  /* 不设置 overflow，这里不滚动 */
}

/* ---------- Breadcrumb 固定在 Header 下面，横跨侧边栏右侧到右边缘 ---------- */
.breadcrumb-bar {
  position: fixed;
  top: var(--header-height);           /* 紧贴 Header 下方（“顶着 header”） */
  left: var(--side-width);             /* 从侧边栏右侧开始 */
  right: 0;
  height: var(--breadcrumb-height);
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 1090;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

/* ---------- 只有 main-scroll 可滚动，位于 breadcrumb 下方到 footer 上方 ---------- */
.main-scroll {
  position: fixed;
  top: calc(var(--header-height) + var(--breadcrumb-height)); /* 从面包屑下开始 */
  left: var(--side-width);
  right: 0;
  bottom: var(--footer-height);        /* 到 Footer 上方结束 */
  overflow-y: auto;                    /* 仅此处可滚动 */
  padding: 16px;
  box-sizing: border-box;
  background: #f5f7fa;                 /* 可选背景 */
}

/* ---------- 响应式：小屏幕时侧边栏改为非固定流式（可根据需要调整） ---------- */
@media (max-width: 900px) {
  .sidemenu-wrapper {
    position: static;
    width: 100%;
    height: auto;
    border-right: none;
  }
  .container { margin-left: 0; width: 100%; }
  .breadcrumb-bar { left: 0; }
  .main-scroll { left: 0; }
}
</style>
