<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { trackApi } from '@/api/index'
import { RouterView } from 'vue-router'
import '@/styles/index.css'

onMounted(() => {
  // 记录页面访问
  trackApi.trackVisit(window.location.pathname).catch(err => {
    console.error('记录访问失败:', err)
  })
})
</script>

<style scoped></style>