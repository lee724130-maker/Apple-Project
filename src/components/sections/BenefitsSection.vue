<template>
  <section class="benefits-section">
    <div class="container">
      <div class="content-grid">
        <!-- 左侧文字内容 -->
        <div class="text-content">
          <span class="subtitle">为什么选择我们</span>
          <h2 class="title">专业的软件开发服务体验</h2>
          
          <div class="benefits-list">
            <div v-for="(benefit, index) in benefits" :key="index" class="benefit-item">
              <div class="benefit-icon">✓</div>
              <div class="benefit-text">{{ benefit }}</div>
            </div>
          </div>

          <div class="button-group">
            <button class="btn-primary">开始合作</button>
            <a href="#" class="link-with-icon" @click.prevent="goToHomeWithReload">
              了解更多
              <span class="icon">→</span>
            </a>
          </div>
        </div>

        <!-- 右侧图片区域 -->
        <div class="image-wrapper">
          <div class="image-placeholder">
            <!-- 装饰性图案 -->
            <div class="pattern-grid"></div>
            <div class="pattern-circles">
              <div class="circle circle-1"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-3"></div>
            </div>
            <div class="pattern-lines"></div>
            <div class="pattern-code">
              <span>&lt;/&gt;</span>
            </div>
            
            <div class="floating-card">
              <div class="card-icon">⚡</div>
              <div class="card-text">敏捷开发<br>快速迭代</div>
            </div>
          </div>
          <div class="dots-pattern top-left"></div>
          <div class="dots-pattern bottom-right"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const benefits = [
  '合规保障 - 严格遵守行业标准，保障数据安全',
  '便捷高效 - 一站式解决方案，快速响应需求',
  '成本优化 - 合理的定价策略，高性价比服务'
]


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
.benefits-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* 左侧文字内容 */
.text-content {
  max-width: 540px;
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
  margin-bottom: 40px;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.benefit-icon {
  width: 26px;
  height: 26px;
  background: #4a6cf7;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
}

.benefit-text {
  font-size: 1.1rem;
  color: #334155;
  line-height: 1.6;
}

.button-group {
  display: flex;
  gap: 24px;
  align-items: center;
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
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.2);
}

.btn-primary:hover {
  background: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 108, 247, 0.3);
}

.link-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1e293b;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 0;
}

.link-with-icon:hover {
  color: #4a6cf7;
  gap: 12px;
}

.icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

/* 右侧图片区域 */
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

/* 网格图案 */
.pattern-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
}

/* 圆形图案组 */
.pattern-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.circle-1 {
  width: 150px;
  height: 150px;
  top: -30px;
  right: -30px;
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 10%;
  background: rgba(74, 108, 247, 0.2);
  border-color: rgba(74, 108, 247, 0.3);
}

.circle-3 {
  width: 50px;
  height: 50px;
  top: 30%;
  right: 15%;
  background: rgba(255, 255, 255, 0.15);
  animation: pulse 3s ease-in-out infinite;
}

/* 线条图案 */
.pattern-lines {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 120px;
  height: 120px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 8px,
    rgba(255, 255, 255, 0.1) 8px,
    rgba(255, 255, 255, 0.1) 16px
  );
  border-radius: 20px;
  transform: rotate(15deg);
  z-index: 3;
}

/* 代码符号图案 */
.pattern-code {
  position: absolute;
  bottom: 30%;
  right: 10%;
  font-size: 48px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.15);
  font-family: monospace;
  transform: rotate(-5deg);
  z-index: 3;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.2); opacity: 0.25; }
}

.floating-card {
  position: absolute;
  bottom: 40px;
  left: 40px;
  background: white;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  animation: float 3s ease-in-out infinite;
  z-index: 10;
}

.card-icon {
  width: 50px;
  height: 50px;
  background: #4a6cf7;
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.card-text {
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.4;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.dots-pattern {
  position: absolute;
  width: 150px;
  height: 150px;
  background-image: radial-gradient(#4a6cf7 2px, transparent 2px);
  background-size: 20px 20px;
  opacity: 0.1;
  z-index: -1;
}

.dots-pattern.top-left {
  top: -30px;
  left: -30px;
}

.dots-pattern.bottom-right {
  bottom: -30px;
  right: -30px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .benefits-section {
    padding: 80px 0;
  }
  
  .content-grid {
    gap: 60px;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .image-placeholder {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .benefits-section {
    padding: 60px 0;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  
  .text-content {
    max-width: 100%;
    text-align: center;
  }
  
  .benefit-item {
    justify-content: center;
  }
  
  .button-group {
    justify-content: center;
  }
  
  .image-wrapper {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .benefits-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .benefit-text {
    font-size: 1rem;
  }
  
  .image-placeholder {
    height: 400px;
  }
  
  .floating-card {
    left: 20px;
    right: 20px;
    padding: 20px;
  }
  
  .pattern-code {
    font-size: 36px;
  }
}
</style>