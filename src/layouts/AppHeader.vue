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
            <a href="#" class="nav-link">Home</a>
            
            <!-- About 下拉菜单 -->
            <div class="dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
              <button class="nav-link dropdown-trigger">
                About
                <span class="dropdown-arrow">▼</span>
              </button>
              
              <!-- 下拉内容 -->
              <Transition name="dropdown">
                <div v-if="showDropdown" class="dropdown-content">
                  <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Team</a>
                    <a href="#" class="dropdown-item">Contact</a>
                  </div>
                </div>
              </Transition>
            </div>
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
const showDropdown = ref(false)
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

/* 移除旧的.logo样式，因为现在使用AppLogo组件 */

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

/* 下拉菜单容器 */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dropdown-arrow {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* 下拉菜单内容 */
.dropdown-content {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 140px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: dropdownFade 0.2s ease;
}

.dropdown-menu {
  padding: 8px;
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: #1e293b;
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: #f1f4f9;
  color: #4a6cf7;
}

/* 下拉菜单动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
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