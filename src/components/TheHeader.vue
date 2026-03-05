<!-- src/components/TheHeader.vue -->
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToUpload = () => {
  router.push('/upload')
}

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="site-header">
    <div class="header-left">
      <div class="logo" @click="goToHome">
        <span class="logo-text">bilibili</span>
      </div>

      <nav class="main-nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/dynamic" class="nav-item">动态</router-link>
        <router-link to="/hot" class="nav-item">热门</router-link>
        <router-link to="/channel" class="nav-item">频道</router-link>
        <router-link to="/subscription" class="nav-item">订阅</router-link>
      </nav>
    </div>

    <div class="header-center">
      <div class="search-container">
        <input type="text" placeholder="搜索视频、UP主或关键字..." class="search-input" />
        <button class="search-btn">
          <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="header-right">
      <button class="upload-btn" @click="goToUpload">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span>投稿</span>
      </button>

      <div class="user-actions">
        <button class="icon-btn" title="消息">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M20 4v13.5c0 .828-.672 1.5-1.5 1.5h-13C4.672 19 4 18.328 4 17.5V4h16zM6 6v11h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z"
            />
          </svg>
        </button>

        <button class="icon-btn" title="个人中心">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            />
          </svg>
        </button>
      </div>

      <div class="user-profile" @click="router.push('/profile')">
        <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" class="avatar" />
        <span class="username">游客</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px); /* B站常见毛玻璃感 */
  -webkit-backdrop-filter: blur(12px);
  color: #18191c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed; /* 改为 fixed，更像B站 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(240, 241, 242, 0.8);
  transition: background 0.3s ease;
}

.site-header:hover {
  background: rgba(255, 255, 255, 1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 36px;
}

.logo {
  cursor: pointer;
  transition: transform 0.2s;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 24px;
  font-weight: 800;
  color: #00aeec;
  letter-spacing: -1px;
  background: linear-gradient(90deg, #00aeec 0%, #00a3de 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-nav {
  display: flex;
  gap: 28px;
}

.nav-item {
  color: #18191c;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 6px 4px;
  position: relative;
  transition: all 0.25s ease;
}

.nav-item:hover {
  color: #fb7299;
  transform: translateY(-1px);
}

.nav-item.router-link-active {
  color: #fb7299;
  font-weight: 600;
}

.nav-item.router-link-active::after,
.nav-item:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: #fb7299;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover::after,
.nav-item.router-link-active::after {
  width: 70%;
}

.header-center {
  flex: 1;
  max-width: 520px;
  margin: 0 40px;
}

.search-container {
  display: flex;
  align-items: center;
  background: rgba(241, 242, 243, 0.9);
  border-radius: 24px; /* B站搜索框更圆润 */
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.search-container:focus-within {
  background: #fff;
  border-color: #fb7299;
  box-shadow: 0 0 0 3px rgba(251, 114, 153, 0.18);
  transform: scale(1.02);
}

.search-input {
  flex: 1;
  height: 42px;
  padding: 0 20px;
  border: none;
  background: transparent;
  font-size: 15px;
  outline: none;
  color: #18191c;
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  width: 52px;
  height: 42px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
}

.search-btn:hover {
  color: #fb7299;
  transform: scale(1.15);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  background: linear-gradient(135deg, #fb7299 0%, #ff85c0 100%);
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.28s ease;
  box-shadow: 0 4px 12px rgba(251, 114, 153, 0.25);
}

.upload-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px rgba(251, 114, 153, 0.35);
  background: linear-gradient(135deg, #ff85c0 0%, #fb7299 100%);
}

.user-actions {
  display: flex;
  gap: 14px;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  color: #61666d;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: rgba(251, 114, 153, 0.1);
  color: #fb7299;
  transform: scale(1.12);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 30px;
  transition: all 0.25s;
  cursor: pointer;
}

.user-profile:hover {
  background: rgba(251, 114, 153, 0.08);
  transform: scale(1.05);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #18191c;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 响应式 */
@media (max-width: 1200px) {
  .main-nav {
    display: none;
  }
  .username {
    display: none;
  }
}

@media (max-width: 768px) {
  .user-actions,
  .upload-btn span {
    display: none;
  }
  .header-center {
    margin: 0 16px;
    max-width: 300px;
  }
  .upload-btn {
    padding: 8px 14px;
  }
}
</style>
