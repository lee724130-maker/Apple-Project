<template>
  <section class="target-users-section">
    <div class="container">
      <!-- 头部文字 -->
      <div class="section-header">
        <span class="subtitle">谁适合我们的服务</span>
        <h2 class="title">为不同规模的客户提供定制化解决方案</h2>
      </div>

      <div class="content-grid">
        <!-- 左侧图片区域 -->
        <div class="image-wrapper">
          <div class="image-placeholder">
            <!-- 装饰性图案 -->
            <div class="pattern-dots-large"></div>
            <div class="pattern-waves"></div>
            <div class="pattern-shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
            </div>
            <div class="pattern-bars"></div>
            
            <div class="stats-card">
              <p class="stats-text">已服务超过200家企业客户，涵盖初创公司到上市公司</p>
              <div class="stats-link" @click="goToHomeWithReload">了解更多 →</div>
            </div>
          </div>
          <div class="dots-pattern"></div>
        </div>

        <!-- 右侧手风琴区域 -->
        <div class="accordion-wrapper">
          <div v-for="(item, index) in targetUsers" :key="index" class="accordion-item">
            <div class="accordion-header" @click="toggleAccordion(index)">
              <h3 class="accordion-title">{{ item.title }}</h3>
              <span class="accordion-icon" :class="{ 'rotate': openIndex === index }">▼</span>
            </div>
            <Transition
              @before-enter="beforeEnter"
              @enter="enter"
              @before-leave="beforeLeave"
              @leave="leave"
            >
              <div v-if="openIndex === index" class="accordion-content">
                <div class="accordion-body">
                  <ul class="feature-list">
                    <li v-for="(feature, i) in item.features" :key="i">{{ feature }}</li>
                  </ul>
                  <a href="#" class="learn-more" @click.prevent="goToHomeWithReload">了解更多 →</a>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const openIndex = ref(0)

const targetUsers = [
  {
    title: '初创公司',
    features: [
      'MVP快速开发，帮助验证商业模式',
      '技术选型咨询，避免走弯路',
      '敏捷开发流程，快速迭代产品',
      '成本可控的开发方案'
    ]
  },
  {
    title: '成长型企业',
    features: [
      'ERP、CRM等管理系统开发',
      '数据分析和可视化报表',
      '系统集成和API对接',
      '技术团队培训和能力提升'
    ]
  },
  {
    title: '大型企业',
    features: [
      '私有化部署方案，保障数据安全',
      '高并发、高可用架构设计',
      '微服务改造和云原生转型',
      '7x24小时技术支持'
    ]
  }
]

const toggleAccordion = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

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

// 动画钩子
const beforeEnter = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
}

const enter = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
  el.style.transition = 'height 0.3s ease, opacity 0.3s ease'
}

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
}

const leave = (el) => {
  el.style.height = '0'
  el.style.opacity = '0'
  el.style.transition = 'height 0.3s ease, opacity 0.3s ease'
}
</script>

<style scoped>
.target-users-section {
  padding: 100px 0;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 头部样式 */
.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.subtitle {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #4a6cf7;
  margin-bottom: 20px;
  display: inline-block;
  background: rgba(74, 108, 247, 0.08);
  padding: 6px 20px;
  border-radius: 30px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1e293b;
  margin: 0;
}

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

/* 左侧图片区域 */
.image-wrapper {
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #4a6cf7 0%, #8ca3ff 50%, #a5b9ff 100%);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 大圆点图案 */
.pattern-dots-large {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 4px, transparent 4px);
  background-size: 20px 20px;
  z-index: 1;
}

/* 波浪图案 */
.pattern-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: repeating-linear-gradient(
    transparent,
    transparent 15px,
    rgba(255, 255, 255, 0.05) 15px,
    rgba(255, 255, 255, 0.05) 30px
  );
  z-index: 2;
}

/* 几何形状组 */
.pattern-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 15%;
  left: 10%;
  border-radius: 20px;
  transform: rotate(15deg);
  background: rgba(74, 108, 247, 0.15);
}

.shape-2 {
  width: 60px;
  height: 60px;
  bottom: 25%;
  right: 15%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: pulse 4s ease-in-out infinite;
}

.shape-3 {
  width: 40px;
  height: 40px;
  top: 40%;
  right: 25%;
  border-radius: 10px;
  background: rgba(139, 92, 246, 0.2);
  transform: rotate(45deg);
}

/* 条形图案 */
.pattern-bars {
  position: absolute;
  top: 30%;
  left: 15%;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0.15;
  z-index: 2;
}

.pattern-bars::before,
.pattern-bars::after,
.pattern-bars span {
  content: '';
  display: block;
  height: 12px;
  background: white;
  border-radius: 6px;
}

.pattern-bars::before {
  width: 100%;
}

.pattern-bars::after {
  width: 70%;
  margin-top: 8px;
}

.pattern-bars span {
  width: 85%;
  margin-top: 8px;
}


@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.3); opacity: 0.25; }
}

.stats-card {
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.stats-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #1e293b;
  margin-bottom: 15px;
  font-weight: 500;
}

.stats-link {
  color: #4a6cf7;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  display: inline-block;
}

.stats-link:hover {
  transform: translateX(5px);
}

.dots-pattern {
  position: absolute;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(#4a6cf7 2px, transparent 2px);
  background-size: 20px 20px;
  bottom: -30px;
  right: -30px;
  opacity: 0.1;
  z-index: -1;
}

/* 右侧手风琴区域 */
.accordion-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.accordion-item {
  border: 1px solid #eef2f6;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.accordion-item:hover {
  border-color: #4a6cf7;
  box-shadow: 0 5px 20px rgba(74, 108, 247, 0.08);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;
  background: white;
  user-select: none;
}

.accordion-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.accordion-icon {
  font-size: 0.8rem;
  color: #64748b;
  transition: transform 0.3s ease;
}

.accordion-icon.rotate {
  transform: rotate(180deg);
  color: #4a6cf7;
}

.accordion-content {
  overflow: hidden;
  will-change: height;
}

.accordion-body {
  padding: 0 25px 25px 25px;
  background: white;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.feature-list li {
  padding: 8px 0 8px 24px;
  position: relative;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4a6cf7;
  font-weight: 600;
}

.learn-more {
  color: #4a6cf7;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.learn-more:hover {
  transform: translateX(5px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .target-users-section {
    padding: 80px 0;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .content-grid {
    gap: 40px;
  }
  
  .image-placeholder {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .target-users-section {
    padding: 60px 0;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .image-wrapper {
    order: 2;
  }
  
  .accordion-wrapper {
    order: 1;
  }
  
  .image-placeholder {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .target-users-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .image-placeholder {
    height: 350px;
  }
  
  .stats-card {
    left: 20px;
    right: 20px;
    padding: 20px;
  }
  
  
  .accordion-title {
    font-size: 1.2rem;
  }
  
  .accordion-header {
    padding: 16px 20px;
  }
}
</style>