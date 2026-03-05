<script setup>
import { ref, onMounted, computed } from 'vue'
import VideoCard from '@/components/VideoCard.vue'
import RecommendationItem from '@/components/RecommendationItem.vue'
import { getVideoList, getRecommendations } from '@/api/video.ts'
import { useRouter } from 'vue-router'

const videos = ref([])
const recommendations = ref([])
const searchQuery = ref('')
const loading = ref(false)
const errorMsg = ref('')
const router = useRouter()

const filteredVideos = computed(() => {
  if (!searchQuery.value.trim()) return videos.value
  const q = searchQuery.value.toLowerCase()
  return videos.value.filter((v) => v.title.toLowerCase().includes(q))
})

const goToUpload = () => {
  router.push('/upload')
}

const fetchVideos = async () => {
  loading.value = true
  try {
    const data = await getVideoList()
    videos.value = data || []
  } catch (err) {
    errorMsg.value = '加载视频失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const fetchRecommendations = async () => {
  try {
    recommendations.value = (await getRecommendations()) || []
  } catch {}
}

onMounted(() => {
  fetchVideos()
  fetchRecommendations()
})
</script>

<template>
  <div class="bili-layout">
    <TheHeader />

    <main class="main-container">
      <section class="video-grid">
        <div v-if="loading">加载中...</div>
        <div v-else-if="errorMsg" class="error">{{ errorMsg }}</div>
        <VideoCard v-else v-for="video in filteredVideos" :key="video.id" :video="video" />
        <div v-if="!loading && filteredVideos.length === 0">暂无视频</div>
      </section>

      <aside class="sidebar">
        <div class="recommend-box">
          <h2>推荐内容</h2>
          <RecommendationItem v-for="rec in recommendations" :key="rec.id" :item="rec" />
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.bili-layout {
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-top: 64px;
}
.main-container {
  max-width: 1400px;
  margin: 20px auto 40px;
  padding: 0 20px;
  display: flex;
  gap: 20px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logo-img {
  width: 36px;
  height: 36px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #fb7299;
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #61666d;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 4px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #fb7299;
}

.nav-item.active {
  color: #fb7299;
  font-weight: 600;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fb7299;
  border-radius: 2px;
}

.search-container {
  display: flex;
  align-items: center;
  background: #f1f2f3;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.search-container:focus-within {
  background: #ffffff;
  border-color: #fb7299;
  box-shadow: 0 0 0 2px rgba(251, 114, 153, 0.1);
}

.search-input {
  flex: 1;
  height: 40px;
  padding: 0 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
}

.search-btn {
  width: 48px;
  height: 40px;
  border: none;
  background: transparent;
  color: #61666d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
}

.search-btn:hover {
  color: #fb7299;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fb7299;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.upload-btn:hover {
  background: #ff8aad;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #61666d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.icon-btn:hover {
  background: #f1f2f3;
  color: #fb7299;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 24px;
  transition: background 0.3s;
}

.user-profile:hover {
  background: #f1f2f3;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 14px;
  color: #18191c;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-nav {
    display: none;
  }

  .username {
    display: none;
  }
}

@media (max-width: 768px) {
  .user-actions {
    display: none;
  }
}

.main-container {
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 20px;
  display: flex;
  gap: 20px;
}

.video-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.sidebar {
  width: 340px;
  flex-shrink: 0;
}

.recommend-box {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.recommend-box h2 {
  margin: 0 0 16px;
  font-size: 18px;
  color: #222;
}
</style>
