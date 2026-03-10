<template>
  <div class="logo" @click="handleClick" @mouseenter="$emit('hover', true)" @mouseleave="$emit('hover', false)">
    <div class="logo-container" :class="{ 'logo-hover': hover, 'logo-light': light }">
      <!-- SVG图标 -->
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
        <!-- 外框 - 稍微调整使其更精致 -->
        <rect x="5" y="5" width="34" height="34" rx="10" stroke="currentColor" stroke-width="2.2" :class="{ 'stroke-light': light }"/>
        <!-- 代码符号 -->
        <path d="M15 17L11 21L15 25" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'stroke-light': light }"/>
        <path d="M29 17L33 21L29 25" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'stroke-light': light }"/>
        <!-- 中间的J/F字母组合 - 重新设计使其更优雅 -->
        <path d="M19 16V24C19 26.5 21 26.5 22 26.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'stroke-light': light }"/>
        <path d="M24 16H28V20H25V26" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'stroke-light': light }"/>
        <!-- 装饰点 - 位置调整 -->
        <circle cx="22" cy="30" r="2.2" fill="currentColor" :class="{ 'fill-light': light }"/>
      </svg>
      
      <!-- 文字部分 - 优化字体设计 -->
      <div class="logo-text-wrapper">
        <span class="logo-text">
          <span class="jfs">JF</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  light: Boolean,
  hover: Boolean
})

const emit = defineEmits(['click', 'hover'])

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
  gap: 12px;
  transition: all 0.3s ease;
  color: #4a6cf7;
}

/* SVG 样式 */
.logo-svg {
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(74, 108, 247, 0.2));
}

.logo-light .logo-svg {
  filter: drop-shadow(0 4px 8px rgba(138, 163, 255, 0.3));
}

/* 文字包装器 */
.logo-text-wrapper {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

/* 主文字样式 */
.logo-text {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  display: flex;
  align-items: baseline;
}

.jfs {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  position: relative;
}

.jfs {
  background: linear-gradient(135deg, #4a6cf7 0%, #6d8aff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  margin-left: -2px;
  font-size: 2.2rem;
  transform: translateY(-1px);
  display: inline-block;
}

/* 亮色模式下的文字 */
.logo-light .jf {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-light .s {
  background: linear-gradient(135deg, #8ca3ff 0%, #a5b9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 标签文字 */
.logo-tagline {
  font-size: 0.8rem;
  font-weight: 400;
  color: #64748b;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: -4px;
  font-family: 'Fira Code', monospace;
}

.logo-light .logo-tagline {
  color: #94a3b8;
}

/* 悬停效果 */
.logo-hover .logo-svg {
  transform: scale(0.95) rotate(-3deg);
}

.logo-hover .jf {
  background: linear-gradient(135deg, #4a6cf7 0%, #6d8aff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-hover .s {
  background: linear-gradient(135deg, #6d8aff 0%, #8ca3ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateY(-1px) scale(1.05);
}

.logo-hover .logo-tagline {
  color: #4a6cf7;
}

.logo-light.logo-hover .jf {
  background: linear-gradient(135deg, #8ca3ff 0%, #a5b9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-light.logo-hover .s {
  background: linear-gradient(135deg, #a5b9ff 0%, #b8c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-light.logo-hover .logo-tagline {
  color: #8ca3ff;
}

/* 点击效果 */
.logo:active .logo-svg {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}

.logo:active .logo-text {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .logo-container {
    gap: 8px;
  }
  
  .logo-text {
    font-size: 1.8rem;
  }
  
  .s {
    font-size: 2rem;
  }
  
  .logo-tagline {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .logo-svg {
    width: 36px;
    height: 36px;
  }
  
  .logo-text {
    font-size: 1.6rem;
  }
  
  .s {
    font-size: 1.8rem;
  }
}
</style>