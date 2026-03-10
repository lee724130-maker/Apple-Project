<template>
  <footer class="app-footer">
    <div class="container">
      <!-- 顶部区域 -->
      <div class="footer-top">
        <div class="footer-info">
          <!-- 使用亮色模式的Logo -->
          <AppLogo light />
          <p class="footer-description">专业提供App、网站、小程序、物联网及企业管理系统开发服务，助力企业数字化转型</p>
        </div>

        <!-- 订阅区域 -->
        <div class="footer-subscribe">
          <div class="subscribe-title">订阅技术动态</div>
          <div class="subscribe-form">
            <input 
              type="email" 
              class="subscribe-input" 
              placeholder="输入您的邮箱"
              aria-label="Email address"
            >
            <button class="subscribe-btn">立即订阅</button>
          </div>
          <p class="subscribe-note">获取最新的技术资讯和开发案例</p>
        </div>
      </div>

      <!-- 底部区域 -->
      <div class="footer-bottom">
        <div class="copyright-wrapper">
          <p class="copyright">
            Copyright © 2024 JF专业软件开发服务商
          </p>
          <div class="legal-links">
            <a href="#" class="footer-link">隐私政策</a>
            <span class="separator">|</span>
            <a href="#" class="footer-link">服务条款</a>
          </div>
        </div>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="GitHub">
            <span class="social-icon">Git</span>
          </a>
          <a href="#" class="social-link" aria-label="LinkedIn">
            <span class="social-icon">ins</span>
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <span class="social-icon">X</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 装饰性图案 -->
    <div class="footer-decoration left"></div>
    <div class="footer-decoration right"></div>
  </footer>
</template>

<script setup>
import AppLogo from '@/components/ui/AppLogo.vue'
</script>

<style scoped>
.app-footer {
  background: #0a1e3c;
  color: white;
  padding: 80px 0 30px;
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

/* 顶部区域 */
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
  flex-wrap: wrap;
  gap: 40px;
}

/* Logo和描述 */
.footer-info {
  max-width: 360px;
}

.footer-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #94a3b8;
  margin: 20px 0 0;
}

/* 订阅区域 */
.footer-subscribe {
  max-width: 400px;
  width: 100%;
}

.subscribe-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.subscribe-form {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.subscribe-input {
  flex: 1;
  min-width: 240px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.subscribe-input::placeholder {
  color: #64748b;
}

.subscribe-input:focus {
  outline: none;
  border-color: #4a6cf7;
  background: rgba(255, 255, 255, 0.1);
}

.subscribe-btn {
  padding: 14px 28px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.subscribe-btn:hover {
  background: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 108, 247, 0.3);
}

.subscribe-note {
  font-size: 0.85rem;
  color: #64748b;
  margin: 8px 0 0;
}

/* 底部区域 */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 20px;
}

.copyright-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.copyright {
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.footer-link:hover {
  color: white;
}

.separator {
  color: #4a5568;
  font-size: 0.9rem;
}

/* 社交链接 */
.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
}

.social-link:hover {
  background: #4a6cf7;
  color: white;
  transform: translateY(-3px);
}

.social-icon {
  font-size: 1rem;
  font-weight: 600;
}

/* 装饰性图案 */
.footer-decoration {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(74, 108, 247, 0.03) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
}

.footer-decoration.left {
  bottom: -100px;
  left: -100px;
}

.footer-decoration.right {
  top: -100px;
  right: -100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-footer {
    padding: 60px 0 30px;
  }

  .footer-top {
    flex-direction: column;
    gap: 30px;
  }

  .footer-info {
    max-width: 100%;
  }

  .footer-subscribe {
    max-width: 100%;
  }

  .subscribe-form {
    flex-direction: column;
  }

  .subscribe-input {
    width: 100%;
  }

  .subscribe-btn {
    width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .copyright-wrapper {
    align-items: center;
  }

  .legal-links {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 50px 0 20px;
  }

  .footer-description {
    font-size: 0.9rem;
  }

  .subscribe-title {
    font-size: 0.95rem;
  }

  .subscribe-input,
  .subscribe-btn {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  .subscribe-note {
    font-size: 0.8rem;
  }

  .copyright {
    font-size: 0.85rem;
  }

  .footer-link {
    font-size: 0.85rem;
  }

  .social-link {
    width: 36px;
    height: 36px;
  }
}
</style>