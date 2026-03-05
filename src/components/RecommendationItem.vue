<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const handleThumbnailError = (e) => {
  e.target.src = 'https://picsum.photos/120/68?random=' + props.item.id
}
</script>

<template>
  <div class="rec-item">
    <img
      :src="item.thumbnail || 'https://picsum.photos/120/68?random=' + item.id"
      :alt="item.title"
      class="rec-thumb"
      @error="handleThumbnailError"
    />
    <div class="rec-right">
      <h4 class="rec-title">{{ item.title }}</h4>
      <p class="rec-views">{{ item.views }}播放</p>
    </div>
  </div>
</template>

<style scoped>
.rec-item {
  display: flex;
  margin-bottom: 16px;
  cursor: pointer;
}

.rec-thumb {
  width: 120px;
  height: 68px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.rec-right {
  margin-left: 12px;
  flex: 1;
}

.rec-title {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rec-views {
  margin: 0;
  font-size: 12px;
  color: #888;
}
</style>
