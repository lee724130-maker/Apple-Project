<!-- src/components/VideoCard.vue -->
<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const imgError = ref(false)

const imageSrc = computed(() => {
  if (imgError.value) {
    return `https://picsum.photos/320/180?random=${props.video.id}`
  }
  return props.video.thumbnail || `https://picsum.photos/320/180?random=${props.video.id}`
})

const handleThumbnailError = (e) => {
  console.log('图片加载失败，使用备用图片:', props.video.id)
  imgError.value = true
}

// 点击在新标签页打开视频播放页
const goToVideoPlayer = () => {
  console.log('新标签页打开视频播放页，ID:', props.video.id)
  window.open(`/video/${props.video.id}`, '_blank')
}

// 格式化时长显示（确保有默认值）
const displayDuration = computed(() => {
  return props.video.duration || '00:00'
})
</script>

<template>
  <div class="video-card" @click="goToVideoPlayer">
    <div class="thumb">
      <img :src="imageSrc" :alt="video.title" @error="handleThumbnailError" />
      <div class="duration">{{ displayDuration }}</div>
    </div>
    <div class="info">
      <h3 class="title">{{ video.title }}</h3>
      <div class="meta">
        <span>{{ video.uploader }}</span>
        <span>·</span>
        <span>{{ video.views }}播放</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.thumb {
  position: relative;
}

.thumb img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.duration {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
}

.info {
  padding: 12px;
}

.title {
  margin: 0 0 8px;
  font-size: 15px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  font-size: 13px;
  color: #888;
}
</style>
