<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <span class="logo-text">Vue3 Company</span>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </router-link>
          <router-link to="/users" class="nav-link" :class="{ active: $route.path === '/users' }">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </router-link>
          <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">
            <el-icon><InfoFilled /></el-icon>
            <span>关于我们</span>
          </router-link>
        </nav>

        <!-- 用户信息 -->
        <div class="user-info">
          <el-dropdown>
            <div class="user-dropdown">
              <el-avatar :size="32" :src="userAvatar" />
              <span class="user-name">{{ userName }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><User /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Setting /></el-icon>
                  系统设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="content-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <p>© 2024 Vue3 Company. All rights reserved.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">使用条款</a>
          <a href="#" class="footer-link">联系我们</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  House,
  User,
  InfoFilled,
  ArrowDown,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue'

const router = useRouter()

// 用户信息（这里可以替换为从store获取）
const userName = ref('管理员')
const userAvatar = ref('')

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 这里可以添加退出登录的逻辑，比如清除token等
    // localStorage.removeItem('token')
    
    ElMessage.success('退出成功')
    router.push('/login')
  } catch {
    // 用户取消操作
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 头部样式 */
.header {
  background-color: var(--bg-white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 20px;
}

.logo-text {
  margin-left: var(--spacing-sm);
}

/* 导航菜单 */
.nav {
  display: flex;
  gap: var(--spacing-lg);
  margin: 0 var(--spacing-xl);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  color: var(--text-regular);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: var(--border-extra-light);
  color: var(--primary-color);
}

.nav-link.active {
  background-color: var(--primary-color);
  color: white;
}

.nav-link .el-icon {
  font-size: 16px;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-dropdown:hover {
  background-color: var(--border-lighter);
}

.user-name {
  font-weight: 500;
  color: var(--text-primary);
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding: var(--spacing-lg) 0;
  background-color: var(--bg-color);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* 页脚 */
.footer {
  background-color: var(--bg-white);
  border-top: 1px solid var(--border-light);
  padding: var(--spacing-lg) 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer p {
  color: var(--text-secondary);
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--spacing-md);
  }
  
  .nav {
    margin: 0 var(--spacing-md);
    gap: var(--spacing-md);
  }
  
  .nav-link span {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .footer-container {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}
</style>