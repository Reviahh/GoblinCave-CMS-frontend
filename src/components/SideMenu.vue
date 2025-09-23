<template>
  <el-aside width="200px" class="sidemenu">
    <el-menu :default-active="$route.path" router>
      <el-sub-menu index="1">
        <template #title>竞赛管理</template>
        <el-menu-item index="/competitions">竞赛列表</el-menu-item>
        <el-menu-item index="/competitions/apply">报名入口</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>课程管理</template>
        <el-menu-item index="/courses">课程列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.sidemenu {
  background: #fff;
  border-right: 1px solid #ddd;
}
</style>
