import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        // 这里可以添加更多子路由
        // {
        //   path: 'users',
        //   name: 'users',
        //   component: () => import('@/views/UsersView.vue')
        // },
        // {
        //   path: 'about',
        //   name: 'about',
        //   component: () => import('@/views/AboutView.vue')
        // }
      ]
    }
  ],
})

export default router
