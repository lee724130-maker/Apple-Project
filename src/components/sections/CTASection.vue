<template>
  <section class="cta-section" :class="{ 'cta-accent': variant === 'accent' }">
    <div class="container">
      <div class="cta-card" :class="{ 'cta-card-accent': variant === 'accent' }">
        <div class="cta-grid">
          <h2 class="cta-title">{{ title }}</h2>
          <div class="cta-buttons">
            <button class="btn-primary" :class="{ 'btn-white': variant === 'accent' }">{{ buttonText }}</button>
            <a v-if="showPricingLink" href="#" class="link-with-icon" :class="{ 'link-light': variant === 'accent' }" @click.prevent="goToHomeWithReload">
              查看报价
              <span class="icon">→</span>
            </a>
            <a v-else href="#" class="link-with-icon" :class="{ 'link-light': variant === 'accent' }" @click.prevent="goToHomeWithReload">
              了解更多
              <span class="icon">→</span>
            </a>
          </div>
        </div>
        
        <!-- 装饰性图案 -->
        <div class="decoration dots"></div>
        <div class="decoration circle-1"></div>
        <div class="decoration circle-2"></div>
        <div class="decoration circle-3"></div>
      </div>
    </div>
    <div class="bg-overlay"></div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    default: 'Pay any bill with Crypto from as little as $1'
  },
  buttonText: {
    type: String,
    default: 'Get started'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'accent'].includes(value)
  },
  showPricingLink: {
    type: Boolean,
    default: false
  }
})


// 跳转到首页并刷新，同时滚动到顶部
const goToHomeWithReload = () => {
  if (route.path === '/') {
    // 如果在首页，先滚动到顶部再刷新
    window.scrollTo(0, 0)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } else {
    // 如果不在首页，跳转到首页
    router.push('/').then(() => {
      // 确保滚动到顶部
      window.scrollTo(0, 0)
      // 延迟刷新，让滚动先完成
      setTimeout(() => {
        window.location.reload()
      }, 100)
    })
  }
}
</script>

<style scoped>
.cta-section {
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
}

/* 主色调CTA卡片 */
.cta-card {
  background: linear-gradient(135deg, #0a1e3c 0%, #1a2f4f 100%);
  border-radius: 32px;
  padding: 60px 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

/* 强调色CTA卡片（第二个） */
.cta-card-accent {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
}

.cta-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.3;
  max-width: 600px;
}

.cta-buttons {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 14px 36px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.3);
}

.btn-primary:hover {
  background: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(74, 108, 247, 0.4);
}

/* 白色按钮（用于accent背景） */
.btn-white {
  background: white;
  color: #f97316;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-white:hover {
  background: #f8fafc;
  color: #ea580c;
}

.link-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 0;
  opacity: 0.9;
}

.link-with-icon:hover {
  gap: 12px;
  opacity: 1;
}

.link-light {
  color: white;
}

.icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

/* 装饰性图案 */
.decoration {
  position: absolute;
  pointer-events: none;
}

.dots {
  width: 200px;
  height: 200px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 2px);
  background-size: 20px 20px;
  bottom: -50px;
  left: -50px;
  opacity: 0.3;
}

.circle-1 {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74, 108, 247, 0.2) 0%, transparent 70%);
  bottom: 20px;
  right: 20%;
}

.cta-card-accent .circle-2 {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
}

.circle-3 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%);
  top: 20px;
  left: 20%;
}

.cta-card-accent .circle-3 {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 30, 60, 0.5) 100%);
  pointer-events: none;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .cta-card {
    padding: 50px 40px;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 60px 0;
  }
  
  .cta-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }
  
  .cta-title {
    font-size: 1.8rem;
    max-width: 100%;
  }
  
  .cta-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .cta-section {
    padding: 50px 0;
  }
  
  .cta-card {
    padding: 40px 20px;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 20px;
  }
  
  .btn-primary {
    width: 100%;
    padding: 12px 24px;
  }
}
</style>