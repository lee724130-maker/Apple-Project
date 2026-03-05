// src/router/index.ts
import HomeView from '@/views/HomeView.vue'
import UploadView from '../views/UploadView.vue'
import VideoPlayerView from '../views/VideoPlayerView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
    },
    {
      path: '/video/:id',
      name: 'VideoPlayer',
      component: VideoPlayerView,
      props: true,
    },
    // 添加重定向路由，处理不存在的路径
    {
      path: '/dynamic',
      redirect: '/',
    },
    {
      path: '/hot',
      redirect: '/',
    },
    {
      path: '/channel',
      redirect: '/',
    },
    {
      path: '/subscription',
      redirect: '/',
    },
    {
      path: '/profile',
      redirect: '/',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
