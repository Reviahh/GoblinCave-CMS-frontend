import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Courses from '@/views/Courses.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', component: Home, meta: { title: '首页' } },
  { path: '/news', component: News, meta: { title: '新闻公告' } },
  // { path: '/competitions', component: Competitions, meta: { title: '学科竞赛', requiresAuth: true } },
  { path: '/courses', component: Courses, meta: { title: '课程管理', requiresAuth: true, role: 'student' } },
  { path: '/about', component: About, meta: { title: '关于我们' } },
  { path: '/login', component: Login, meta: { title: '用户登录' } },
  { path: '/profile', component: Profile, meta: { title: '个人中心', requiresAuth: true } },

  {
    path: '/admin/users',
    component: () => import('@/views/admin/Users.vue'),
    meta: { title: '用户管理', requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/settings',
    component: () => import('@/views/admin/Settings.vue'),
    meta: { title: '系统设置', requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/publish',
    component: () => import('@/views/admin/AdminPublish.vue'),
    meta: { title: '发布竞赛题目', requiresAuth: true, role: 'admin' }
  },
  {
    path: '/competitions',
    component: () => import('@/views/Competitions.vue'),
    meta: { title: '学科竞赛', requiresAuth: true }
  },
  {
    path: '/competitions/:id',
    component: () => import('@/views/CompetitionDetail.vue'),
    meta: { title: '竞赛详情', requiresAuth: true }
  }
  ,
  {
    path: '/team-detail',
    component: () => import('@/views/TeamDetail.vue'),
    meta: { title: '队伍详情', requiresAuth: true }
  }
  ,
  {
    path: '/my-competitions',
    component: () => import('@/views/MyCompetitions.vue'),
    meta: { title: '我的竞赛', requiresAuth: true, role: 'student' }
  }
  ,
  {
    path: '/seek',
    component: () => import('@/views/ChatSeek.vue'),
    meta: { title: '寻找队友', requiresAuth: true }
  }
  ,
  {
    path: '/chat',
    component: () => import('@/views/ChatRoom.vue'),
    meta: { title: '临时会话', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 登录拦截
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login')
  }

  // 角色拦截
  if (to.meta.role && userStore.role !== to.meta.role) {
    return next('/') // 无权限访问时退回首页
  }

  next()
})

export default router
