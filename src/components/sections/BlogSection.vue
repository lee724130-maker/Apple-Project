<template>
  <section class="blog-section">
    <div class="container">
      <!-- 头部区域 -->
      <div class="section-header">
        <div>
          <span class="subtitle">技术博客</span>
          <h2 class="title">最新技术资讯与开发案例</h2>
        </div>
        <a href="#" class="btn-secondary" @click.prevent="goToHomeWithReload">查看所有文章</a>
      </div>

      <!-- 博客文章网格 -->
      <div class="blog-grid">
        <div v-for="(post, index) in blogPosts" :key="index" class="blog-card">
          <div class="blog-image" @click="goToHomeWithReload">
            <div class="image-placeholder">
              <!-- 装饰性图案 - 根据文章类型不同 -->
              <div class="pattern-dots"></div>
              <div class="pattern-circle" :class="`pattern-${post.category}`"></div>
              <div class="pattern-lines"></div>
              <div class="pattern-icon">{{ getCategoryIcon(post.category) }}</div>
            </div>
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-category" :class="`category-${post.category}`">{{ post.category }}</span>
              <span class="blog-date">{{ post.date }}</span>
            </div>
            <h3 class="blog-title" @click="goToHomeWithReload">{{ post.title }}</h3>
            <div class="read-more-wrapper">
              <a 
                href="#" 
                class="read-more" 
                @click.prevent.stop="goToHomeWithReload"
              >
                阅读全文
                <span class="icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const blogPosts = [
  {
    category: '大数据',
    date: '2026-02-15',
    title: '2026年大数据技术趋势：实时分析与AI融合',
    excerpt: '从流处理到湖仓一体，探索大数据技术的最新发展...'
  },
  {
    category: '人工智能',
    date: '2026-02-10',
    title: '大模型在企业应用中的落地实践',
    excerpt: '某金融企业的AI中台建设，业务效率提升200%...'
  },
  {
    category: '数据中台',
    date: '2026-02-05',
    title: '企业级数据治理的最佳实践指南',
    excerpt: '从数据采集到数据服务，构建完整的数据管理体系...'
  }
]

const getCategoryIcon = (category) => {
  const icons = {
    '大数据': '📊',
    '人工智能': '🤖',
    '数据中台': '🏢'
  }
  return icons[category] || '📄'
}

// 跳转到首页并刷新，同时滚动到顶部
const goToHomeWithReload = () => {
  console.log('跳转到首页并刷新')
  if (route.path === '/') {
    window.scrollTo(0, 0)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } else {
    router.push('/').then(() => {
      window.scrollTo(0, 0)
      setTimeout(() => {
        window.location.reload()
      }, 100)
    })
  }
}
</script>

<style scoped>
.blog-section {
  padding: 100px 0;
  background: #f8fafc;
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

.subtitle {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
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
  margin: 0;
}

.btn-secondary {
  padding: 12px 32px;
  background: transparent;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
}

.btn-secondary:hover {
  border-color: #4a6cf7;
  color: #4a6cf7;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 108, 247, 0.1);
}

/* 博客文章网格 */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.blog-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #edf2f7;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(74, 108, 247, 0.12);
  border-color: #4a6cf7;
}

.blog-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4a6cf7 0%, #8ca3ff 50%, #a5b9ff 100%);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 装饰性图案 - 圆点 */
.pattern-dots {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.3) 2px, transparent 2px);
  background-size: 8px 8px;
  border-radius: 50%;
  opacity: 0.5;
  z-index: 1;
}

/* 装饰性图案 - 圆形 */
.pattern-circle {
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
}

/* 不同分类的圆形颜色 */
.pattern-大数据 {
  background: rgba(74, 108, 247, 0.2);
  border-color: rgba(74, 108, 247, 0.3);
}

.pattern-人工智能 {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.3);
}

.pattern-数据中台 {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.3);
}

/* 装饰性图案 - 线条 */
.pattern-lines {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 80px;
  height: 80px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(255, 255, 255, 0.1) 5px,
    rgba(255, 255, 255, 0.1) 10px
  );
  border-radius: 12px;
  transform: rotate(10deg);
  z-index: 1;
}

/* 装饰性图案 - 图标 */
.pattern-icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 48px;
  opacity: 0.2;
  z-index: 1;
  transform: rotate(-5deg);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.blog-card:hover .pattern-icon {
  opacity: 0.3;
  transform: rotate(0deg) scale(1.1);
  transition: all 0.3s ease;
}

.blog-card:hover .image-placeholder {
  transform: scale(1.05);
}

.blog-content {
  padding: 30px 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.blog-category {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-大数据 {
  background: rgba(74, 108, 247, 0.1);
  color: #4a6cf7;
}

.category-人工智能 {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.category-数据中台 {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.blog-date {
  font-size: 0.85rem;
  color: #64748b;
}

.blog-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.3s ease;
}

.blog-title:hover {
  color: #4a6cf7;
}

.read-more-wrapper {
  margin-top: auto;
  display: inline-block;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #4a6cf7;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 8px 0;
  border-radius: 4px;
}

.read-more:hover {
  gap: 10px;
  background: rgba(74, 108, 247, 0.05);
  padding: 8px 12px;
  margin-left: -12px;
}

.icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .blog-section {
    padding: 80px 0;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .blog-grid {
    gap: 25px;
  }
  
  .blog-image {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .blog-section {
    padding: 60px 0;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .btn-secondary {
    width: 100%;
    text-align: center;
  }
  
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .blog-grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .blog-section {
    padding: 50px 0;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .blog-content {
    padding: 25px 20px;
  }
  
  .blog-title {
    font-size: 1.2rem;
  }
  
  .blog-image {
    height: 180px;
  }
  
  .pattern-icon {
    font-size: 36px;
  }
}
</style>