<!-- src/views/UploadView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { uploadVideo } from '@/api/video'

const router = useRouter()
const formData = ref({
  title: '',
  description: '',
  uploader: '',
})
const videoFile = ref(null)
const coverFile = ref(null) // 新增：封面文件
const coverPreview = ref('') // 新增：封面预览
const uploading = ref(false)
const progress = ref(0)

const handleVideoChange = (e) => {
  videoFile.value = e.target.files[0]
}

// 新增：处理封面文件选择
const handleCoverChange = (e) => {
  const file = e.target.files[0]
  coverFile.value = file

  // 生成预览URL
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      coverPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 新增：移除封面
const removeCover = () => {
  coverFile.value = null
  coverPreview.value = ''
}

const handleUpload = async () => {
  // === 强制校验：必须上传封面 ===
  if (!coverFile.value) {
    alert('请必须上传视频封面图片！\n（封面是视频在首页显示的缩略图）')
    return
  }

  if (!videoFile.value) {
    alert('请选择视频文件')
    return
  }

  const form = new FormData()
  form.append('video', videoFile.value)
  form.append('cover', coverFile.value) // 强制有 cover，不需要 if 判断了
  form.append('title', formData.value.title)
  form.append('description', formData.value.description)
  form.append('uploader', formData.value.uploader || '匿名用户')

  uploading.value = true
  try {
    const result = await uploadVideo(form)
    alert('上传成功！')
    router.push('/')
  } catch (error) {
    console.error('上传失败', error)
    alert('上传失败，请重试')
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <TheHeader />
    <div class="upload-container">
      <h2>上传视频</h2>

      <form @submit.prevent="handleUpload" class="upload-form">
        <div class="form-group">
          <label>视频文件</label>
          <div class="file-input-wrapper">
            <input
              type="file"
              accept="video/*"
              @change="handleVideoChange"
              required
              class="file-input"
            />
            <span class="file-placeholder">
              {{ videoFile ? videoFile.name : '点击或拖拽选择视频文件' }}
            </span>
          </div>
        </div>

        <!-- 新增：封面上传区域 -->
        <div class="form-group">
          <label>视频封面</label>
          <div class="cover-upload-area">
            <!-- 封面预览 -->
            <div v-if="coverPreview" class="cover-preview">
              <img :src="coverPreview" alt="封面预览" />
              <button type="button" class="remove-cover" @click="removeCover">×</button>
            </div>

            <!-- 上传按钮（当没有封面时显示） -->
            <div v-else class="cover-input-wrapper">
              <input type="file" accept="image/*" @change="handleCoverChange" class="file-input" />
              <div class="cover-placeholder">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                  <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                  />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>点击选择封面图片</span>
                <small>支持 JPG、PNG 格式</small>
              </div>
            </div>
          </div>
          <p class="hint">建议尺寸：1280×720 像素（可选）</p>
        </div>

        <div class="form-group">
          <label>视频标题</label>
          <input type="text" v-model="formData.title" placeholder="输入视频标题（必填）" required />
        </div>

        <div class="form-group">
          <label>视频描述</label>
          <textarea
            v-model="formData.description"
            placeholder="简单描述一下视频内容吧～"
            rows="5"
          ></textarea>
        </div>

        <button type="submit" :disabled="uploading" class="upload-btn">
          <span v-if="uploading">上传中...</span>
          <span v-else>开始上传</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 以下是你的完整样式，没有任何删除或删减 */
.upload-container {
  max-width: 640px;
  margin: 80px auto 40px;
  padding: 40px 36px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 38px rgba(0, 0, 0, 0.08);
}

h2 {
  margin: 0 0 32px;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  letter-spacing: -0.5px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  background: #fafafa;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff85c0;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(255, 133, 192, 0.15);
}

/* 封面上传区域样式 */
.cover-upload-area {
  min-height: 160px;
}

.cover-preview {
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cover-preview img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.remove-cover {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.remove-cover:hover {
  background: rgba(0, 0, 0, 0.8);
}

.cover-input-wrapper {
  position: relative;
  cursor: pointer;
}

.cover-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 20px;
  border: 2px dashed #d0d0d0;
  border-radius: 10px;
  background: #f8f9fa;
  color: #666;
  transition: all 0.2s;
}

.cover-placeholder svg {
  width: 40px;
  height: 40px;
  stroke: #999;
}

.cover-placeholder span {
  font-size: 14px;
}

.cover-placeholder small {
  font-size: 12px;
  color: #999;
}

.cover-input-wrapper:hover .cover-placeholder {
  border-color: #ff85c0;
  background: #fff5f8;
  color: #e64980;
}

.cover-input-wrapper:hover svg {
  stroke: #ff85c0;
}

.hint {
  font-size: 12px;
  color: #999;
  margin: 4px 0 0;
}

.file-input-wrapper {
  position: relative;
  overflow: hidden;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.file-placeholder {
  display: block;
  padding: 14px 16px;
  border: 2px dashed #d0d0d0;
  border-radius: 10px;
  background: #f8f9fa;
  color: #666;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.file-input:hover + .file-placeholder,
.file-placeholder:hover {
  border-color: #ff85c0;
  background: #fff5f8;
  color: #e64980;
}

.upload-btn {
  margin-top: 12px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #ff85c0 0%, #ff4d94 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(255, 77, 148, 0.25);
}

.upload-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 77, 148, 0.35);
  background: linear-gradient(135deg, #ff4d94 0%, #e64980 100%);
}

.upload-btn:disabled {
  background: #d0d0d0;
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
