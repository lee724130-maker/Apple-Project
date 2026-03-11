<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo区域 - 使用AppLogo组件 -->
        <AppLogo 
          @click="handleLogoClick" 
          @hover="isHovering = $event"
          :hover="isHovering"
        />

        <!-- 导航和按钮区域 -->
        <div class="nav-right">
          <nav class="nav-menu">
            <a href="#" class="nav-link" @click.prevent="navigateToHome">首页</a>
            <a href="#" class="nav-link" @click.prevent="navigateToHome">团队介绍</a>
            <a href="#" class="nav-link" @click.prevent="scrollToFooter">联系我们</a>
          </nav>
          
          <!-- 统一按钮样式 -->
          <button class="btn-primary">开始合作</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLogo from '@/components/ui/AppLogo.vue'

const router = useRouter()
const route = useRoute()
const isHovering = ref(false)

// 处理Logo点击
const handleLogoClick = () => {
  if (route.path === '/') {
    // 如果在首页，刷新页面
    window.location.reload()
  } else {
    // 如果不在首页，跳转到首页
    router.push('/')
  }
}

// 导航到首页的方法
const navigateToHome = () => {
   if (route.path === '/') {
    // 如果在首页，刷新页面
    window.location.reload()
  } else {
    // 如果不在首页，跳转到首页
    router.push('/')
  }
}

// 滚动到页脚
const scrollToFooter = () => {
  // 先确保在首页
  if (route.path !== '/') {
    router.push('/').then(() => {
      // 等待页面加载完成后滚动到页脚
      setTimeout(() => {
        const footer = document.querySelector('.app-footer')
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    })
  } else {
    // 已经在首页，直接滚动
    setTimeout(() => {
      const footer = document.querySelector('.app-footer')
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
}
</script>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

/* 右侧导航和按钮 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  color: #1e293b;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #4a6cf7;
}

/* 统一按钮样式 - 与HeroSection保持一致 */
.btn-primary {
  padding: 12px 32px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.2);
}

.btn-primary:hover {
  background: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 108, 247, 0.3);
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .btn-primary {
    padding: 10px 24px;
    font-size: 0.95rem;
  }
}

/* 移动端适配 */
@media (max-width: 480px) {
  .nav-right {
    gap: 20px;
  }
  
  .btn-primary {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
}
</style>