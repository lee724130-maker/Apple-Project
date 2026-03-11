<template>
  <div class="logo" @click="handleClick" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="logo-container" :class="{ 
      'logo-hover': isHovered,
      'logo-light': light 
    }">
      <!-- 纯文字Logo -->
      <div class="logo-text-wrapper">
        <span class="logo-text">
          <span class="jf">JF</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  light: Boolean
})

const emit = defineEmits(['click'])

const isHovered = ref(false)

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.logo {
  cursor: pointer;
  display: inline-block;
}

.logo-container {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

/* 文字包装器 */
.logo-text-wrapper {
  display: flex;
  align-items: baseline;
  line-height: 1;
}

/* 主文字样式 */
.logo-text {
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -1px;
  display: flex;
  align-items: baseline;
}

/* JF 字母样式 - 普通模式为 #4a6cf7 */
.jf {
  color: #4a6cf7;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  position: relative;
}

/* 亮色模式下的文字 - 用于深色背景 */
.logo-light .jf {
  color: #8ca3ff;
}

/* 悬停效果 - 只有缩小 */
.logo-hover .logo-text {
  transform: scale(0.90);
  transition: transform 0.4s ease;
}

/* 点击效果 */
.logo:active .logo-text {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .logo-text {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.8rem;
  }
}
</style>