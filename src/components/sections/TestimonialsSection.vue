<template>
  <section class="testimonials-section">
    <div class="container">
      <!-- 头部区域 -->
      <div class="section-header">
        <div class="header-left">
          <span class="subtitle">客户评价</span>
          <h2 class="title">听听我们的客户怎么说</h2>
        </div>
        <button class="btn-primary">开始合作</button>
      </div>

      <!-- 评价卡片网格 -->
      <div class="testimonials-grid">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
          <div class="quote-icon">"</div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar-img">
            </div>
            <div class="author-info">
              <div class="author-name">{{ testimonial.name }}</div>
              <div class="author-title">{{ testimonial.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const testimonials = [
  {
    text: '"他们团队的专业性和响应速度给我们留下了深刻印象。不仅按时交付了项目，还提供了很多有价值的技术建议。产品上线后性能稳定，用户体验出色。"',
    name: '张伟',
    title: '某科技公司 CEO',
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    text: '"从需求沟通到最终交付，整个过程非常顺畅。他们深刻理解我们的业务需求，开发的管理系统极大地提升了我们的运营效率。强烈推荐！"',
    name: '李娜',
    title: '某电商平台 运营总监',
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    text: '"非常专业的开发团队，技术实力强，沟通效率高。即使项目后期有一些需求变更，他们也能快速响应并给出合理的解决方案。"',
    name: '王明',
    title: '某创业公司 CTO',
    avatar: 'https://i.pravatar.cc/100?img=3'
  }
]

</script>

<style scoped>
.testimonials-section {
  padding: 100px 0;
  background: #0a1e3c;
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

/* 头部样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  flex-wrap: wrap;
  gap: 30px;
}

.header-left {
  max-width: 600px;
}

.subtitle {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #8ca3ff;
  margin-bottom: 16px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 20px;
  border-radius: 30px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: white;
  margin: 0;
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

/* 评价卡片网格 */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(74, 108, 247, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.quote-icon {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 8rem;
  font-family: Georgia, serif;
  color: rgba(74, 108, 247, 0.2);
  line-height: 1;
  pointer-events: none;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #e2e8f0;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #4a6cf7;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.author-title {
  font-size: 0.9rem;
  color: #94a3b8;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .testimonials-section {
    padding: 80px 0;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .testimonials-grid {
    gap: 25px;
  }
  
  .testimonial-card {
    padding: 35px 25px;
  }
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 60px 0;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .btn-primary {
    width: 100%;
  }
  
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .testimonials-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .testimonial-card {
    padding: 30px 20px;
  }
  
  .testimonial-text {
    font-size: 1rem;
  }
  
  .author-avatar {
    width: 50px;
    height: 50px;
  }
}
</style>