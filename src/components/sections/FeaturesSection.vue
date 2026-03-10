<template>
  <section class="features-section">
    <div class="container">
      <!-- 头部文字区域 -->
      <div class="section-header">
        <span class="subtitle">为什么选择我们</span>
        <h2 class="title">专业的软件开发解决方案</h2>
      </div>

      <!-- 名人名言卡片 - 改成技术相关的名言 -->
      <div class="quote-wrapper">
        <div class="quote-card">
          <p class="quote-text">"优秀的软件不仅仅是代码的堆砌，更是对业务需求的深刻理解和创新思维的完美结合。"</p>
          <div class="quote-author">
            <div class="author-name">Steve Jobs</div>
            <div class="author-title">Apple 联合创始人</div>
          </div>
        </div>
      </div>

      <!-- 三个核心优势卡片 -->
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="card-number">{{ feature.number }}</div>
          <h3 class="card-title">{{ feature.title }}</h3>
          <p class="card-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    number: '1',
    title: '全平台覆盖开发',
    description: '专业开发App、网站、小程序、H5应用，覆盖iOS、Android、Web全平台。采用最新的跨平台技术，一次开发多端运行，大幅降低开发成本和时间。'
  },
  {
    number: '2',
    title: '企业数字化解决方案',
    description: '为企业提供ERP、CRM、OA等管理系统开发，结合数据分析和云计算技术，帮助企业实现数字化转型，提升运营效率和管理水平。'
  },
  {
    number: '3',
    title: '物联网与智能硬件',
    description: '专业的物联网解决方案，支持设备接入、数据采集、远程控制。从智能家居到工业物联网，为您的产品提供完整的软硬件一体化服务。'
  }
]
</script>

<style scoped>
.features-section {
  padding: 100px 0;
  background: #ffffff;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 头部样式 */
.section-header {
  text-align: center;
  max-width: 640px;
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

/* 名人名言卡片 */
.quote-wrapper {
  max-width: 800px;
  margin: 0 auto 60px;
  position: relative;
}

.quote-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2f6;
  position: relative;
}

.quote-card::before {
  content: '"';
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 120px;
  font-family: Georgia, serif;
  color: #4a6cf7;
  opacity: 0.1;
  line-height: 1;
}

.quote-text {
  font-size: 1.5rem;
  line-height: 1.5;
  color: #1e293b;
  font-weight: 500;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
  padding-left: 20px;
}

.quote-author {
  border-left: 4px solid #4a6cf7;
  padding-left: 20px;
}

.author-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.author-title {
  font-size: 0.95rem;
  color: #64748b;
}

/* 三个核心优势卡片网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2f6;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(74, 108, 247, 0.1);
  border-color: #4a6cf7;
}

.card-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4a6cf7 0%, #6d8aff 100%);
  color: white;
  font-size: 28px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(74, 108, 247, 0.2);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  line-height: 1.3;
}

.card-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .features-section {
    padding: 80px 0;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .quote-text {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 60px 0;
  }
  
  .section-header {
    margin-bottom: 40px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .quote-wrapper {
    margin-bottom: 40px;
  }
  
  .quote-card {
    padding: 30px;
  }
  
  .quote-text {
    font-size: 1.2rem;
    padding-left: 10px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .feature-card {
    padding: 35px;
  }
}

@media (max-width: 480px) {
  .features-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .quote-card {
    padding: 25px;
  }
  
  .quote-text {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  
  .card-number {
    width: 50px;
    height: 50px;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
}
</style>