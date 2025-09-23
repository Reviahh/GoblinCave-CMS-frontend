import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Competitions from '@/views/Competitions.vue'
import Courses from '@/views/Courses.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', component: Home, meta: { title: '首页' } },
  { path: '/news', component: News, meta: { title: '新闻公告' } },
  { path: '/competitions', component: Competitions, meta: { title: '学科竞赛', requiresAuth: true } },
  { path: '/courses', component: Courses, meta: { title: '课程管理', requiresAuth: true } },
  { path: '/about', component: About, meta: { title: '关于我们' } },
  { path: '/login', component: Login, meta: { title: '用户登录' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
