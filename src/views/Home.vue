<template>
  <div class="home-page">
    <!-- 轮播图 -->
    <el-carousel height="300px" :interval="5000" arrow="always" class="home-carousel">
      <el-carousel-item v-for="(slide, idx) in slides" :key="idx">
        <img :src="slide.image" class="carousel-image" />
        <div class="carousel-caption">{{ slide.caption }}</div>
      </el-carousel-item>
    </el-carousel>

    <!-- 通知公告 -->
    <section class="section notices">
      <h3>通知公告</h3>
      <el-card
        v-for="(n, i) in notices"
        :key="i"
        class="notice-card"
        shadow="hover"
        @click="$router.push('/news')"
      >
        <div class="title">{{ n.title }}</div>
        <div class="date">{{ n.date }}</div>
      </el-card>
      <el-button type="text" @click="$router.push('/news')">更多公告 →</el-button>
    </section>

    <!-- 竞赛结果 -->
    <section class="section results">
      <h3>竞赛结果</h3>
      <el-card v-for="(r, i) in results" :key="i" class="result-card">
        <h4>{{ r.title }}</h4>
        <p>{{ r.brief }}</p>
        <span class="date">{{ r.date }}</span>
      </el-card>
    </section>
  </div>
</template>

<script setup>
import { newsList } from '@/data/news'
import { ref } from 'vue'
import p1 from '@/assets/p1.png'
import p2 from '@/assets/p2.png'
import p3 from '@/assets/p3.png'
// 轮播图
const slides = ref([
  { image: p1, caption: '重大竞赛通知一' },
  { image: p2, caption: '奖学金颁奖典礼' },
  { image: p3, caption: '招生信息开放' }
])

// 通知公告：只取前 3 条
const notices = newsList.slice(0, 3)

// 模拟竞赛结果
const results = ref([
  { title: '数学竞赛一等奖名单', brief: '恭喜以下学生获得一等奖：张三、李四...', date: '2025-08-15' },
  { title: '编程大赛优秀奖公示', brief: '以下同学在编程大赛中表现优异...', date: '2025-08-10' }
])
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.home-carousel {
  margin-bottom: 40px;
  position: relative;
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel-caption {
  position: absolute;
  bottom: 20px;
  left: 30px;
  color: #fff;
  background-color: rgba(0,0,0,0.3);
  padding: 8px 12px;
  border-radius: 4px;
}

.section {
  margin-bottom: 30px;
}
.section h3 {
  margin-bottom: 15px;
  color: #3fbed1;
}

.notice-card {
  margin-bottom: 10px;
  cursor: pointer;
}
.notice-card:hover {
  background: #f9f9f9;
}

.result-card {
  margin-bottom: 15px;
}
.date {
  color: #888;
  font-size: 14px;
}
</style>
