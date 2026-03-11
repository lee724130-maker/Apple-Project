<template>
  <footer class="app-footer">
    <div class="container">
      <!-- 顶部区域 -->
      <div class="footer-top">
        <div class="footer-info">
          <!-- Logo区域 -->
          <AppLogo />
          <p class="footer-description">专业提供App、网站、小程序、物联网及企业管理系统开发服务，助力企业数字化转型</p>
        </div>

        <!-- 咨询表单区域 -->
        <div class="footer-consult">
          <div class="consult-title">免费咨询</div>
          <div class="consult-form">
            <!-- 电话号码输入框 -->
            <div class="form-group">
              <input 
                type="tel" 
                v-model="formData.phone"
                class="consult-input" 
                :class="{ 'input-error': formErrors.phone }"
                placeholder="请输入您的电话号码"
                aria-label="Phone number"
                @input="validateForm"
                :disabled="submitting"
              >
            </div>
            
            <!-- 微信号输入框 -->
            <div class="form-group">
              <input 
                type="text" 
                v-model="formData.wechat"
                class="consult-input" 
                :class="{ 'input-error': formErrors.wechat }"
                placeholder="请输入您的微信号"
                aria-label="WeChat ID"
                @input="validateForm"
                :disabled="submitting"
              >
            </div>
            
            <!-- 问题咨询输入框（大号） -->
            <div class="form-group">
              <textarea 
                v-model="formData.question"
                class="consult-textarea" 
                :class="{ 'input-error': formErrors.question }"
                placeholder="请详细描述您的需求或问题，我们会尽快为您解答"
                rows="4"
                aria-label="Question"
                @input="validateForm"
                :disabled="submitting"
              ></textarea>
            </div>
            
            <!-- 错误提示 -->
            <div v-if="formErrors.message" class="error-message">
              {{ formErrors.message }}
            </div>
            
            <!-- 提交按钮 -->
            <button class="consult-btn" @click="submitForm" :disabled="!isFormValid || submitting">
              {{ submitting ? '提交中...' : '提交咨询' }}
            </button>
          </div>
          <p class="consult-note">专业顾问将在24小时内联系您</p>
        </div>

        <!-- 二维码区域 -->
        <div class="footer-qrcode">
          <div class="qrcode-title">扫码咨询</div>
          <div class="qrcode-image-wrapper">
            <img src="@/assets/boss2.jpg" alt="商务经理二维码" class="qrcode-img">
          </div>
          <!-- 经理联系方式 -->
          <div class="manager-contact">
            <div class="manager-title">项目经理直联</div>
            <p class="manager-phone">商务经理：13750576760</p>
            <p class="manager-note">（周一至周五 9:00-18:00）</p>
          </div>
        </div>
      </div>

      <!-- 底部区域 -->
      <div class="footer-bottom">
        <div class="copyright-wrapper">
          <p class="copyright">
            © 广州市金丰大数据科技有限公司 版权所有 粤ICP备2022006741号-1
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
import { ref, computed } from 'vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import { trackApi } from '@/api/index'

// 表单数据
const formData = ref({
  phone: '',
  wechat: '',
  question: ''
})

// 表单错误信息
const formErrors = ref({
  phone: false,
  wechat: false,
  question: false,
  message: ''
})

// 提交状态
const submitting = ref(false)

// 验证表单
const validateForm = () => {
  // 重置错误
  formErrors.value = {
    phone: false,
    wechat: false,
    question: false,
    message: ''
  }
  
  // 检查问题咨询是否填写
  if (!formData.value.question.trim()) {
    formErrors.value.question = true
    formErrors.value.message = '请填写您的问题咨询'
    return false
  }
  
  // 检查手机号和微信号是否至少填一个
  const hasPhone = formData.value.phone.trim().length > 0
  const hasWechat = formData.value.wechat.trim().length > 0
  
  if (!hasPhone && !hasWechat) {
    formErrors.value.phone = true
    formErrors.value.wechat = true
    formErrors.value.message = '请至少填写手机号或微信号'
    return false
  }
  
  // 如果填写了手机号，验证格式（简单验证）
  if (hasPhone && !/^1[3-9]\d{9}$/.test(formData.value.phone)) {
    formErrors.value.phone = true
    formErrors.value.message = '请输入有效的手机号码'
    return false
  }
  
  return true
}

// 计算表单是否有效
const isFormValid = computed(() => {
  if (!formData.value.question.trim()) return false
  
  const hasPhone = formData.value.phone.trim().length > 0
  const hasWechat = formData.value.wechat.trim().length > 0
  
  if (!hasPhone && !hasWechat) return false
  
  if (hasPhone && !/^1[3-9]\d{9}$/.test(formData.value.phone)) return false
  
  return true
})

// 提交表单
const submitForm = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  
  try {
    // 调用提交接口
    const response = await trackApi.submitConsult({
      phone: formData.value.phone || undefined,
      wechat: formData.value.wechat || undefined,
      question: formData.value.question
    })
    
    console.log('提交成功:', response)
    alert('提交成功！我们会尽快联系您')
    
    // 清空表单
    formData.value = {
      phone: '',
      wechat: '',
      question: ''
    }
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
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

/* 顶部区域 - 改为三列布局 */
.footer-top {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 0.8fr;
  gap: 40px;
  margin-bottom: 60px;
}

/* Logo和描述 */
.footer-info {
  max-width: 100%;
}

.footer-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #94a3b8;
  margin: 20px 0 0;
}

/* 咨询表单区域 */
.footer-consult {
  width: 100%;
}

.consult-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.consult-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
}

.form-group {
  width: 100%;
}

.consult-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.consult-textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
}

.consult-input::placeholder,
.consult-textarea::placeholder {
  color: #64748b;
}

.consult-input:focus,
.consult-textarea:focus {
  outline: none;
  border-color: #4a6cf7;
  background: rgba(255, 255, 255, 0.1);
}

/* 输入框错误状态 */
.input-error {
  border-color: #ef4444 !important;
}

.error-message {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 4px;
  padding-left: 4px;
}

.consult-btn {
  width: 100%;
  padding: 14px 16px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin-top: 4px;
}

.consult-btn:hover:not(:disabled) {
  background: #3a5bd9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 108, 247, 0.3);
}

.consult-btn:disabled {
  background: #4a5568;
  cursor: not-allowed;
  opacity: 0.6;
}

.consult-note {
  font-size: 0.8rem;
  color: #64748b;
  margin: 8px 0 0;
  text-align: right;
}

/* 二维码区域 */
.footer-qrcode {
  text-align: center;
}

.qrcode-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

/* 二维码图片容器 */
.qrcode-image-wrapper {
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.qrcode-image-wrapper:hover {
  transform: scale(1.05);
}

/* 二维码图片样式 */
.qrcode-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
}

/* 经理联系方式 */
.manager-contact {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.manager-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 8px;
}

.manager-phone {
  display: inline-block;
  color: #4a6cf7;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s ease;
  margin-bottom: 4px;
}

.manager-phone:hover {
  color: #6d8aff;
}

.manager-note {
  font-size: 0.75rem;
  color: #64748b;
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
@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  
  .footer-qrcode {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: 60px 0 30px;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-info {
    max-width: 100%;
  }

  .consult-form {
    max-width: 100%;
  }

  .footer-qrcode {
    grid-column: span 1;
  }

  .qrcode-image-wrapper {
    margin: 0 auto;
  }

  .consult-note {
    text-align: center;
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

  .consult-title,
  .qrcode-title {
    font-size: 0.95rem;
  }

  .consult-input,
  .consult-textarea,
  .consult-btn {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  .consult-textarea {
    min-height: 90px;
  }

  .consult-note {
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

  .qrcode-image-wrapper {
    width: 100px;
    height: 100px;
  }
  
  .manager-phone {
    font-size: 0.9rem;
  }
}
</style>