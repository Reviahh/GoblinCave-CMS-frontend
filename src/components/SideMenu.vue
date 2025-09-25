<template>
  <el-aside width="200px" class="sidemenu">
    <el-menu :default-active="$route.path" router>
      <!-- 竞赛管理（所有人都能看到） -->
      <el-sub-menu index="1">
        <template #title>竞赛管理</template>
        <el-menu-item index="/competitions">竞赛列表</el-menu-item>
        <el-menu-item v-if="userStore.role === 'student'" index="/seek">寻找队友</el-menu-item>
        <el-menu-item v-if="userStore.role === 'student'" index="/my-competitions">我的竞赛</el-menu-item>
      </el-sub-menu>

      <!-- 只有管理员能看到的菜单 -->
      <el-sub-menu v-if="userStore.role === 'admin'" index="3">
        <template #title>后台管理</template>
        <el-menu-item index="/admin/publish">发布竞赛题目</el-menu-item>
        <el-menu-item index="/admin/users">用户管理</el-menu-item>
        <el-menu-item index="/admin/settings">系统设置</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.sidemenu {
  background: #ffffff;
  border-right: none;
  color: rgb(0, 0, 0);
}

:deep(.el-menu) {
  background: #ffffff;
  color: rgb(0, 0, 0);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  color: rgb(0, 0, 0) !important;
}

:deep(.el-menu-item.is-active) {
  background: #ffffff !important;
}
</style>
