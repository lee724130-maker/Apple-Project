<!-- frontend/src/views/HomeView.vue -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import VideoCard from '@/components/VideoCard.vue'
import TheHeader from '@/components/TheHeader.vue'
import { getVideoList, getCarouselVideos } from '@/api/video.ts'

const router = useRouter()
const videos = ref([]) // 所有视频
const carouselVideos = ref([]) // 轮播图视频
const rightGridVideos = ref([]) // 右侧网格视频
const loading = ref(false)
const errorMsg = ref('')
const currentCarouselIndex = ref(0)
let carouselTimer = null

// 计算右侧网格显示的视频数量（2行3列 = 6个）
const RIGHT_GRID_COUNT = 6

// 获取视频列表
const fetchVideos = async () => {
  loading.value = true
  try {
    const data = await getVideoList()
    videos.value = data || []
    console.log('视频列表获取成功:', videos.value.length)

    // 获取视频后，随机选择右侧网格的视频
    refreshRightGrid()
  } catch (err) {
    console.error('获取视频列表失败:', err)
    errorMsg.value = '加载失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 获取轮播图视频
const fetchCarouselVideos = async () => {
  try {
    const data = await getCarouselVideos(5)
    carouselVideos.value = data || []
    currentCarouselIndex.value = 0
    console.log('轮播图视频获取成功:', carouselVideos.value.length)
  } catch (err) {
    console.error('获取轮播图失败:', err)
  }
}

// 刷新右侧网格视频（随机选择6个）
const refreshRightGrid = () => {
  if (videos.value.length > 0) {
    // 创建视频列表的副本
    const videoList = [...videos.value]

    // 随机排序（Fisher-Yates 算法，更均匀的随机）
    for (let i = videoList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[videoList[i], videoList[j]] = [videoList[j], videoList[i]]
    }

    // 取前6个作为右侧网格视频
    rightGridVideos.value = videoList.slice(0, RIGHT_GRID_COUNT)

    console.log(
      '右侧网格视频已刷新:',
      rightGridVideos.value.map((v) => v.id),
    )
  } else {
    rightGridVideos.value = []
  }
}

// 点击轮播图跳转到视频播放页
const goToVideoPlayer = (videoId) => {
  console.log('跳转到视频播放页，ID:', videoId)
  router.push(`/video/${videoId}`)
}

// 轮播图切换
const nextSlide = () => {
  if (carouselVideos.value.length > 0) {
    currentCarouselIndex.value = (currentCarouselIndex.value + 1) % carouselVideos.value.length
  }
}

const prevSlide = () => {
  if (carouselVideos.value.length > 0) {
    currentCarouselIndex.value =
      (currentCarouselIndex.value - 1 + carouselVideos.value.length) % carouselVideos.value.length
  }
}

// 自动轮播
const startAutoPlay = () => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
  }
  carouselTimer = setInterval(() => {
    nextSlide()
  }, 5000)
}

// 停止自动轮播（鼠标悬停时）
const stopAutoPlay = () => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
}

// 刷新所有数据（换一换功能）
const refreshAll = async () => {
  loading.value = true
  try {
    // 同时获取视频列表和轮播图
    await Promise.all([fetchVideos(), fetchCarouselVideos()])
    // refreshRightGrid 已经在 fetchVideos 中调用
  } finally {
    loading.value = false
  }
}

// 只刷新右侧网格（随机选择）
const refreshRightGridOnly = () => {
  refreshRightGrid()
}

onMounted(async () => {
  await refreshAll()
  startAutoPlay()
})

onUnmounted(() => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
  }
})

// 图片处理方法
const getHighQualityImage = (url) => {
  if (!url) return `https://picsum.photos/640/360?random=${Date.now()}`

  if (url.includes('picsum.photos')) {
    return url.replace(/320\/180/, '640/360')
  }

  return url
}

const handleImageError = (e) => {
  e.target.src = `https://picsum.photos/640/360?random=${Date.now()}`
}
</script>

<template>
  <div class="bili-home">
    <TheHeader />

    <div class="home-container">
      <!-- 主内容区域 - 轮播图和网格合并 -->
      <main class="content-section">
        <!-- 左侧轮播图区域 - 占36%宽度 -->
        <div class="carousel-wrapper" v-if="carouselVideos.length > 0">
          <div class="carousel-container" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
            <div
              class="carousel-slides"
              :style="{ transform: `translateX(-${currentCarouselIndex * 100}%)` }"
            >
              <div
                v-for="video in carouselVideos"
                :key="video.id"
                class="carousel-slide"
                @click="goToVideoPlayer(video.id)"
              >
                <img
                  :src="getHighQualityImage(video.thumbnail)"
                  :alt="video.title"
                  class="carousel-image"
                  @error="handleImageError"
                  loading="eager"
                />
                <div class="carousel-overlay">
                  <h3 class="carousel-title">{{ video.title }}</h3>
                  <span class="carousel-duration">{{ video.duration || '00:00' }}</span>
                </div>
              </div>
            </div>

            <!-- 左右箭头 -->
            <button class="carousel-arrow prev" @click.stop="prevSlide">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button class="carousel-arrow next" @click.stop="nextSlide">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>

            <!-- 指示点 -->
            <div class="carousel-dots">
              <span
                v-for="(_, index) in carouselVideos"
                :key="index"
                :class="['dot', { active: currentCarouselIndex === index }]"
                @click="currentCarouselIndex = index"
              ></span>
            </div>
          </div>
        </div>

        <!-- 右侧区域 - 网格 + 竖向换一换按钮 -->
        <div class="right-section">
          <!-- 右侧网格区域 - 占剩余宽度 -->
          <div class="grid-wrapper">
            <div class="video-grid">
              <div v-if="loading && rightGridVideos.length === 0" class="loading-state">
                <div class="loading-spinner"></div>
                <p>加载中...</p>
              </div>
              <div v-else-if="errorMsg" class="error-state">{{ errorMsg }}</div>
              <template v-else>
                <VideoCard
                  v-for="video in rightGridVideos"
                  :key="video.id"
                  :video="video"
                  :compact="true"
                />
              </template>
              <div v-if="!loading && rightGridVideos.length === 0" class="empty-state">
                暂无内容
              </div>
            </div>
          </div>

          <!-- 右侧竖向换一换按钮 -->
          <div class="vertical-refresh">
            <button @click="refreshRightGridOnly" class="vertical-refresh-btn" :disabled="loading">
              <span v-if="loading" class="loading-icon">↻</span>
              <template v-else>
                换一换
                <span class="refresh-icon">↻</span>
              </template>
            </button>
          </div>
        </div>
      </main>

      <!-- 下方更多视频网格 -->
      <section class="more-videos">
        <h2 class="section-title">更多视频</h2>
        <div class="video-grid-large">
          <!-- 过滤掉已经在右侧网格中显示的视频 -->
          <VideoCard
            v-for="video in videos.filter((v) => !rightGridVideos.some((rv) => rv.id === v.id))"
            :key="video.id"
            :video="video"
          />
          <div v-if="videos.length <= RIGHT_GRID_COUNT && !loading" class="empty-more">
            没有更多视频了
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.bili-home {
  min-height: 100vh;
  background: #f6f7f8;
  padding-top: 64px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.home-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* 主内容区域 - 轮播图和网格合并 */
.content-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

/* 左侧轮播图 - 占36%宽度 */
.carousel-wrapper {
  flex: 0 0 36%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background: #f0f0f0;
  height: fit-content;
}

.carousel-container {
  position: relative;
  width: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  cursor: pointer;
  height: 370px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 16px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  color: white;
}

.carousel-title {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.carousel-duration {
  font-size: 12px;
  opacity: 0.95;
  background: rgba(0, 0, 0, 0.6);
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;
  backdrop-filter: blur(2px);
}

/* 轮播图箭头 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
  opacity: 0;
  backdrop-filter: blur(4px);
}

.carousel-container:hover .carousel-arrow {
  opacity: 1;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.05);
}

.carousel-arrow.prev {
  left: 12px;
}

.carousel-arrow.next {
  right: 12px;
}

/* 指示点 */
.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

.dot.active {
  width: 20px;
  border-radius: 4px;
  background: #fb7299;
}

/* 右侧区域 - 网格 + 竖向按钮 */
.right-section {
  flex: 1;
  display: flex;
  gap: 12px;
}

/* 右侧网格区域 */
.grid-wrapper {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列布局 */
  gap: 12px;
}

/* 右侧网格中的视频卡片样式调整 */
.video-grid :deep(.video-card) {
  background: transparent;
  transition: transform 0.2s;
}

.video-grid :deep(.video-card:hover) {
  transform: translateY(-2px);
}

.video-grid :deep(.video-card .thumb img) {
  border-radius: 8px;
  aspect-ratio: 16/9;
}

.video-grid :deep(.video-card .info) {
  padding: 8px 4px;
}

.video-grid :deep(.video-card .title) {
  font-size: 13px;
  margin-bottom: 4px;
  line-height: 1.4;
  -webkit-line-clamp: 2;
}

.video-grid :deep(.video-card .meta) {
  font-size: 11px;
  color: #999;
}

/* 右侧竖向换一换按钮 - 修复竖向显示问题 */
.vertical-refresh {
  display: flex;
  align-items: start;
}

.vertical-refresh-btn {
  background: #fb7299;
  color: white;
  border: none;
  border-radius: 10px;
  width: 45px;
  height: 130px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(251, 114, 153, 0.3);

  /* 竖向文字核心样式 */
  writing-mode: vertical-rl; /* 文字竖向排列 */
  text-orientation: upright; /* 文字正向直立 */
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px; /* 增加字间距 */
  line-height: 2; /* 增加行高 */
  padding: 20px 0;
  text-align: center;

  /* 确保文字不换行 */
  white-space: nowrap;

  /* 居中内容 */
  display: inline-block;
  vertical-align: middle;
}

.vertical-refresh-btn:hover:not(:disabled) {
  background: #ff85c0;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(251, 114, 153, 0.4);
}

.vertical-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 图标样式 */
.vertical-refresh-btn .refresh-icon {
  display: inline-block;
  font-size: 18px;
  transform: rotate(90deg); /* 旋转图标使其竖向显示 */
  animation: none;
}

.vertical-refresh-btn:hover:not(:disabled) .refresh-icon {
  animation: rotate 1s linear infinite;
}

/* 加载图标样式 */
.vertical-refresh-btn .loading-icon {
  display: inline-block;
  font-size: 24px;
  transform: rotate(90deg); /* 让加载图标也竖向 */
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg); /* 90 + 360，保持竖向旋转 */
  }
}

/* 下方更多视频区域 */
.more-videos {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.section-title {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 600;
  color: #18191c;
  position: relative;
  padding-left: 12px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: #fb7299;
  border-radius: 2px;
}

.video-grid-large {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px 20px;
}

/* 加载状态 */
.loading-state,
.error-state,
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  margin: 0 auto 12px;
  border: 2px solid #f0f0f0;
  border-top-color: #fb7299;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-more {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 15px;
  background: #f9f9f9;
  border-radius: 12px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .home-container {
    max-width: 1100px;
  }

  .video-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .content-section {
    flex-direction: column;
  }

  .carousel-wrapper {
    flex: 0 0 auto;
  }

  .right-section {
    width: 100%;
  }

  .carousel-slide {
    max-height: 320px;
  }

  .video-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .vertical-refresh-btn {
    width: 40px;
    height: 140px;
    font-size: 16px;
    letter-spacing: 3px;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 12px;
  }

  .carousel-slide {
    max-height: 240px;
  }

  .carousel-title {
    font-size: 16px;
  }

  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .video-grid-large {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  .right-section {
    flex-direction: column;
  }

  .vertical-refresh {
    justify-content: center;
  }

  .vertical-refresh-btn {
    width: 100%;
    height: 48px;
    writing-mode: horizontal-tb; /* 移动端恢复水平 */
    text-orientation: mixed;
    font-size: 14px;
    letter-spacing: normal;
    line-height: normal;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .vertical-refresh-btn .refresh-icon {
    transform: rotate(0deg); /* 移动端图标恢复水平 */
    margin: 0;
  }

  .vertical-refresh-btn .loading-icon {
    transform: rotate(0deg);
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

@media (max-width: 480px) {
  .carousel-slide {
    max-height: 180px;
  }

  .carousel-title {
    font-size: 14px;
  }

  .carousel-duration {
    font-size: 10px;
    padding: 2px 6px;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }

  .grid-wrapper {
    padding: 12px;
  }
}
</style>
