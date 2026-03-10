<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <!-- 左侧内容 -->
        <div class="hero-content">
          <span class="subtitle">软件开发公司</span>
          <h1 class="hero-title">专业开发各类应用与网站</h1>
          <p class="hero-description">
            可开发App、网站、小程序、H5、物联网、企业管理、数据分析、云计算，
            助力企业数字化转型和增长
          </p>
          <div class="button-group">
            <button class="btn-primary">开始合作</button>
            <a href="#" class="link-with-icon">
              了解更多
              <span class="icon">→</span>
            </a>
          </div>
        </div>
        
        <!-- 右侧图片区域 -->
        <div class="hero-image-wrapper">
          <div class="image-placeholder"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: 140px 0 100px;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* 左侧内容样式 */
.hero-content {
  max-width: 540px;
}

.subtitle {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #4a6cf7;
  background: rgba(74, 108, 247, 0.1);
  padding: 8px 16px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 3.2rem;
  line-height: 1.2;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #475569;
  margin-bottom: 40px;
}

/* 按钮组样式 */
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

/* 右侧图片占位符 */
.hero-image-wrapper {
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 480px;
  background: linear-gradient(135deg, #e0e7ff 0%, #cbd5e1 100%);
  border-radius: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/* 添加装饰性图案 */
.image-placeholder::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.image-placeholder::after {
  content: '';
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 150px;
  background: rgba(74, 108, 247, 0.1);
  border-radius: 50%;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-section {
    padding: 120px 0 80px;
  }
  
  .hero-grid {
    gap: 60px;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 0 60px;
  }
  
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-content {
    max-width: 100%;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .button-group {
    justify-content: center;
  }
  
  .image-placeholder {
    height: 360px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 90px 0 50px;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .btn-primary {
    padding: 12px 28px;
    width: 100%;
  }
  
  .button-group {
    flex-direction: column;
    gap: 16px;
  }
  
  .image-placeholder {
    height: 280px;
  }
}
</style>