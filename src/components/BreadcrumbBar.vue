<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.meta?.title || $route.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
