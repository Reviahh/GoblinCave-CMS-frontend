<template>
  <div class="news-page">
    <h2>新闻公告</h2>
    <el-card
      v-for="(n, i) in newsList"
      :key="i"
      class="news-card"
      shadow="hover"
    >
      <h3>{{ n.title }}</h3>
      <p class="date">{{ n.date }}</p>
      <p>{{ n.content }}</p>
    </el-card>
  </div>
</template>

<script setup>
import { newsList } from '@/data/news'
</script>

<style scoped>
.news-page {
  padding: 20px;
}
.news-card {
  margin-bottom: 15px;
}
.date {
  color: #888;
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
