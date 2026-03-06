<!-- src/components/TheHeader.vue -->
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToUpload = () => {
  window.open('/upload', '_blank')
}

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="site-header">
    <div class="header-left">
      <nav class="main-nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/anime" class="nav-item">番剧</router-link>
        <router-link to="/live" class="nav-item">直播</router-link>
        <router-link to="/game" class="nav-item">游戏中心</router-link>
        <router-link to="/member" class="nav-item">会员购</router-link>
        <router-link to="/comic" class="nav-item">漫画</router-link>
        <router-link to="/match" class="nav-item">赛事</router-link>
        <router-link to="/download" class="nav-item">下载客户端</router-link>
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
      <!-- 用户头像 + 个人中心入口 -->
      <div class="user-profile" @click="router.push('/profile')">
        <img src="@/assets/Logo.jpg" alt="avatar" class="avatar" />
      </div>

      <!-- 大会员 -->
      <button class="text-btn" title="大会员" @click="goToVip">大会员</button>

      <!-- 消息 -->
      <button class="text-btn" title="消息" @click="goToMessages">消息</button>

      <!-- 动态 -->
      <button class="text-btn" title="动态" @click="goToDynamic">动态</button>

      <!-- 收藏 -->
      <button class="text-btn" title="收藏" @click="goToFavorites">收藏</button>

      <!-- 历史 -->
      <button class="text-btn" title="历史" @click="goToHistory">历史</button>

      <!-- 创作中心 -->
      <button class="text-btn" title="创作中心" @click="goToCreator">创作中心</button>

      <!-- 投稿 -->
      <button class="upload-btn" @click="goToUpload">
        <span>投稿</span>
      </button>
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

.main-nav {
  display: flex;
  gap: 14px;
}

.nav-item {
  color: #18191c;
  text-decoration: none;
  font-size: 14px;
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
  border-radius: 10px; /* B站搜索框更圆润 */
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
  gap: 6px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #18191c;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 普通文字按钮 */
.text-btn {
  background: transparent;
  border: none;
  color: #18191c;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.18s ease; /* 过渡时间稍短，更灵敏 */
  display: inline-flex;
  align-items: center;
}

.text-btn:hover {
  color: #fb7299;
  transform: translateY(-2px);
  background: transparent !important;
}

/* 投稿按钮（保持粉色突出） */
.upload-btn {
  display: flex;
  align-items: center;
  padding: 7px 30px;
  background: linear-gradient(90deg, #fb7299, #ff85c0);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 2px 8px rgba(251, 114, 153, 0.2);
}

.upload-btn:hover {
  background: linear-gradient(90deg, #fe86a8, #fc93c6);
}

.text-btn::after {
  content: '';
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
