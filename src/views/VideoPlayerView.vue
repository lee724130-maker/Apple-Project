<!-- src/views/VideoPlayerView.vue -->
<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVideoDetail, getRecommendations } from '@/api/video'
import VideoCard from '@/components/VideoCard.vue'

const route = useRoute()
const router = useRouter()
const video = ref(null)
const recommendations = ref([])
const loading = ref(true)
const errorMsg = ref('')

// 更新页面标题
const updatePageTitle = (title) => {
  if (title) {
    document.title = `${title} - bilibili`
    console.log('页面标题已更新为:', document.title)
  } else {
    document.title = '视频播放 - bilibili'
  }
}

// 获取视频详情
const fetchVideoDetail = async () => {
  loading.value = true
  try {
    const videoId = route.params.id
    console.log('获取视频详情，ID:', videoId)
    const data = await getVideoDetail(videoId)
    video.value = data
    console.log('视频详情:', data)

    // 使用视频标题更新页面标题
    if (data && data.title) {
      updatePageTitle(data.title)
    }

    // 获取视频详情后，再获取推荐视频
    await fetchRecommendations()
  } catch (err) {
    console.error('获取视频详情失败:', err)
    errorMsg.value = '视频加载失败'
    updatePageTitle('视频加载失败')
  } finally {
    loading.value = false
  }
}

// 获取推荐视频
const fetchRecommendations = async () => {
  try {
    const data = await getRecommendations()
    console.log('获取到推荐视频:', data.length)
    // 过滤掉当前视频
    if (video.value) {
      recommendations.value = data.filter((v) => v.id !== video.value.id)
    } else {
      recommendations.value = data
    }
    console.log('过滤后的推荐视频:', recommendations.value.length)
  } catch (err) {
    console.error('获取推荐失败:', err)
  }
}

// 处理视频播放结束
const handleVideoEnded = () => {
  console.log('视频播放结束')
  // 可以在这里添加自动播放下一个推荐视频的逻辑
}

// 处理视频错误
const handleVideoError = (e) => {
  console.error('视频播放错误:', e)
  errorMsg.value = '视频播放失败，请稍后重试'
  updatePageTitle('视频播放失败')
}

// 监听路由参数变化，当ID改变时重新加载数据
watch(
  () => route.params.id,
  (newId) => {
    console.log('路由ID变化，重新加载:', newId)
    fetchVideoDetail()
  },
)

onMounted(() => {
  fetchVideoDetail()
})

// 组件卸载时恢复默认标题
onUnmounted(() => {
  document.title = 'bilibili'
})
</script>

<template>
  <div class="player-layout">
    <TheHeader />

    <main class="player-container">
      <!-- 视频播放区域 -->
      <div class="video-section">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="errorMsg" class="error-state">
          {{ errorMsg }}
        </div>

        <div v-else-if="video" class="video-wrapper">
          <!-- 视频播放器 -->
          <video
            class="video-player"
            :src="`http://localhost:3000/${video.file_path}`"
            controls
            autoplay
            @ended="handleVideoEnded"
            @error="handleVideoError"
          >
            您的浏览器不支持视频播放
          </video>

          <!-- 视频信息 -->
          <div class="video-info">
            <h1 class="video-title">{{ video.title }}</h1>

            <div class="video-meta">
              <div class="meta-left">
                <span class="uploader">{{ video.uploader }}</span>
                <span class="views">{{ video.views }}次观看</span>
                <span class="upload-time">{{
                  new Date(video.created_at).toLocaleDateString()
                }}</span>
              </div>
              <div class="meta-right">
                <button class="action-btn like-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                    />
                  </svg>
                  <span>点赞</span>
                </button>
                <button class="action-btn collect-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
                    />
                  </svg>
                  <span>收藏</span>
                </button>
                <button class="action-btn share-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                    />
                  </svg>
                  <span>分享</span>
                </button>
              </div>
            </div>

            <!-- 视频描述 -->
            <div class="video-description">
              <h3>视频描述</h3>
              <p>{{ video.description || '暂无描述' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐视频侧边栏 -->
      <aside class="recommend-section">
        <h2>推荐视频</h2>
        <div class="recommend-list">
          <VideoCard v-for="rec in recommendations" :key="rec.id" :video="rec" />
          <div v-if="recommendations.length === 0 && !loading" class="no-recommend">
            暂无推荐视频
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.player-layout {
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-top: 64px;
}

.player-container {
  max-width: 1400px;
  margin: 20px auto 40px;
  padding: 0 20px;
  display: flex;
  gap: 24px;
}

.video-section {
  flex: 1;
  min-width: 0;
}

.video-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.video-player {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  display: block;
}

.video-info {
  padding: 24px;
}

.video-title {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 600;
  color: #18191c;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e9f0;
  margin-bottom: 20px;
}

.meta-left {
  display: flex;
  gap: 16px;
  color: #61666d;
  font-size: 14px;
}

.uploader {
  color: #00aeec;
  font-weight: 500;
  cursor: pointer;
}

.uploader:hover {
  color: #fb7299;
}

.meta-right {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e5e9f0;
  border-radius: 20px;
  background: white;
  color: #61666d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f6f7f8;
  border-color: #fb7299;
  color: #fb7299;
}

.like-btn:hover {
  color: #00aeec;
}

.collect-btn:hover {
  color: #ffa000;
}

.share-btn:hover {
  color: #4caf50;
}

.video-description {
  color: #18191c;
}

.video-description h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 600;
}

.video-description p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #61666d;
  white-space: pre-wrap;
}

.recommend-section {
  width: 360px;
  flex-shrink: 0;
}

.recommend-section h2 {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 600;
  color: #18191c;
}

.recommend-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loading-state {
  text-align: center;
  padding: 60px 0;
  color: #999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid #f0f0f0;
  border-top-color: #fb7299;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  text-align: center;
  padding: 60px 0;
  color: #f56c6c;
  font-size: 16px;
}

.no-recommend {
  text-align: center;
  padding: 40px 0;
  color: #999;
  background: white;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .player-container {
    flex-direction: column;
  }

  .recommend-section {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .video-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .video-title {
    font-size: 20px;
  }
}
</style>
