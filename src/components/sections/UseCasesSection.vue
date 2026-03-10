<template>
  <section class="usecases-section">
    <div class="container">
      <!-- 头部文字区域 -->
      <div class="section-header">
        <span class="subtitle">我们的服务</span>
        <h2 class="title">全方位的软件开发解决方案</h2>
        <p class="description">从移动应用到企业系统，从物联网到数据分析，我们提供一站式数字化服务</p>
      </div>
      
      <!-- 六个服务卡片 -->
      <div class="usecases-grid">
        <div v-for="(item, index) in services" :key="index" class="service-card">
          <div class="icon-wrapper">
            <span class="icon">{{ item.icon }}</span>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
          <div class="card-footer">
            <span class="tech-stack">{{ item.tech }}</span>
          </div>
        </div>
      </div>
      
      <!-- 底部链接 -->
      <div class="section-footer">
        <a href="#" class="link-with-icon">
          了解更多服务
          <span class="icon">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: '📱',
    title: '移动应用开发',
    description: '专业开发iOS、Android原生应用及Flutter、React Native跨平台应用，提供从需求分析到应用上架的全流程服务。',
    tech: 'Swift · Kotlin · Flutter · React Native'
  },
  {
    icon: '💻',
    title: '网站与H5开发',
    description: '定制企业官网、电商平台、管理系统及H5营销页面，采用最新技术栈确保高性能、SEO友好和用户体验。',
    tech: 'Vue · React · Node.js · Next.js'
  },
  {
    icon: '📦',
    title: '小程序开发',
    description: '微信、支付宝、抖音等多平台小程序开发，帮助企业快速获客，提供从UI设计到后端接口的全套解决方案。',
    tech: '微信小程序 · UniApp · Taro'
  },
  {
    icon: '🌐',
    title: '物联网解决方案',
    description: '设备接入、数据采集、远程控制、实时监控，为智能家居、工业物联网提供完整的软硬件一体化服务。',
    tech: 'MQTT · Modbus · Arduino · 边缘计算'
  },
  {
    icon: '📊',
    title: '企业管理软件',
    description: 'ERP、CRM、OA、进销存等企业管理系统开发，打通数据孤岛，提升运营效率，支持私有化部署。',
    tech: 'Java · Python · MySQL · Redis'
  },
  {
    icon: '☁️',
    title: '数据分析与云计算',
    description: '数据采集、清洗、可视化分析，结合云计算技术，为企业提供数字化转型和智能决策支持。',
    tech: 'Hadoop · Spark · Tableau · AWS/Azure'
  }
]
</script>

<style scoped>
.usecases-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #fafcff 100%);
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
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #4a6cf7;
  margin-bottom: 16px;
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
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #475569;
  margin: 0;
}

/* 服务卡片网格 */
.usecases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.service-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 35px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(74, 108, 247, 0.12);
  border-color: #4a6cf7;
}

/* 图标样式 */
.icon-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  background: #f0f4ff;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper {
  transform: scale(1.05) rotate(5deg);
}

.icon {
  font-size: 32px;
  line-height: 1;
}

/* 卡片内容 */
.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 15px;
  line-height: 1.3;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #475569;
  margin-bottom: 20px;
}

.card-footer {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px dashed #e2e8f0;
}

.tech-stack {
  font-size: 0.85rem;
  color: #4a6cf7;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* 底部链接 */
.section-footer {
  text-align: center;
  margin-top: 20px;
}

.link-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1e293b;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 12px 28px;
  background: white;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.link-with-icon:hover {
  color: #4a6cf7;
  border-color: #4a6cf7;
  gap: 12px;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(74, 108, 247, 0.15);
}

.icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .usecases-section {
    padding: 80px 0;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .usecases-grid {
    gap: 25px;
  }
  
  .service-card {
    padding: 30px 25px;
  }
}

@media (max-width: 768px) {
  .usecases-section {
    padding: 60px 0;
  }
  
  .section-header {
    margin-bottom: 40px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .usecases-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 640px) {
  .usecases-grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .service-card {
    padding: 30px 25px;
  }
}

@media (max-width: 480px) {
  .usecases-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
    padding: 5px 16px;
  }
  
  .icon-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
  }
  
  .icon {
    font-size: 28px;
  }
  
  .card-title {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
  
  .tech-stack {
    font-size: 0.8rem;
  }
  
  .link-with-icon {
    font-size: 1rem;
    padding: 10px 24px;
  }
}
</style>