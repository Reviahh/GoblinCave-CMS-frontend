import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PagePlaceholder from '@/views/PagePlaceholder.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/news', name: 'News', component: PagePlaceholder, props: { title: '新闻公告' } },
  { path: '/competitions', name: 'Competitions', component: PagePlaceholder, props: { title: '学科竞赛' } },
  { path: '/courses', name: 'Courses', component: PagePlaceholder, props: { title: '课程管理' } },
  { path: '/about', name: 'About', component: PagePlaceholder, props: { title: '关于我们' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
