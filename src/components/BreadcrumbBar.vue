<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbItems"
      :key="index"
      :to="index < breadcrumbItems.length - 1 ? item.path : null"
    >
      {{ item.meta?.title || item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 生成面包屑数组
const breadcrumbItems = computed(() =>
  route.matched
    .filter(r => r.path !== '/') // 过滤首页
    .map(r => ({
      path: r.path,
      name: r.name,
      meta: r.meta
    }))
)
</script>

<style scoped>
.el-breadcrumb {
  margin: 10px 0;
}
</style>

