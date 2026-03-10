<template>
  <section class="partners-section">
    <div class="container">
      <!-- 头部文字 -->
      <div class="section-header">
        <span class="subtitle">我们的技术伙伴</span>
        <h2 class="title">与全球领先的技术平台深度合作</h2>
      </div>

      <!-- 合作伙伴logo网格 -->
      <div class="partners-grid">
        <div v-for="(partner, index) in partners" :key="index" class="partner-item">
          <div class="partner-logo">{{ partner.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = [
  { name: 'Microsoft Azure' },
  { name: 'AWS' },
  { name: 'Google Cloud' },
  { name: 'Alibaba Cloud' },
  { name: 'Tencent Cloud' },
  { name: 'Huawei Cloud' }
]
</script>

<style scoped>
.partners-section {
  padding: 80px 0;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 头部样式优化 */
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
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1e293b;
  margin: 0;
}

/* 合作伙伴网格 */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.partner-item {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 12px;
  text-align: center;
  border: 1px solid #edf2f7;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.partner-item:hover {
  transform: translateY(-4px);
  border-color: #4a6cf7;
  box-shadow: 0 12px 24px rgba(74, 108, 247, 0.12);
}

.partner-logo {
  font-size: 1rem;
  font-weight: 500;
  color: #334155;
  line-height: 1.5;
  transition: color 0.3s ease;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  letter-spacing: -0.01em;
}

.partner-item:hover .partner-logo {
  color: #4a6cf7;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .partners-section {
    padding: 70px 0;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .partners-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .partners-section {
    padding: 60px 0;
  }
  
  .section-header {
    margin-bottom: 50px;
  }
  
  .subtitle {
    font-size: 0.9rem;
    padding: 5px 16px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .partners-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 600px;
  }
  
  .partner-item {
    padding: 20px 8px;
  }
  
  .partner-logo {
    font-size: 0.95rem;
  }
}

@media (max-width: 640px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

@media (max-width: 480px) {
  .partners-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 1.6rem;
  }
  
  .partners-grid {
    max-width: 350px;
  }
  
  .partner-item {
    padding: 16px 6px;
  }
  
  .partner-logo {
    font-size: 0.9rem;
    white-space: normal;
    word-break: keep-all;
  }
}
</style>