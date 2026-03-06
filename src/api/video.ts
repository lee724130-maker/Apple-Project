// frontend/src/api/video.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 60000,
})

// 添加请求拦截器（用于调试）
api.interceptors.request.use(
  (config) => {
    console.log('【API请求】', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器处理封面数据
api.interceptors.response.use(
  (response) => {
    console.log('【API响应】', response.config.url, '状态:', response.status)

    // 如果是获取视频列表的请求，处理封面数据
    if (
      response.config.url?.includes('/videos') ||
      response.config.url?.includes('/recommendations') ||
      response.config.url?.includes('/carousel')
    ) {
      if (Array.isArray(response.data)) {
        console.log(
          '原始数据:',
          response.data.map((v) => ({
            id: v.id,
            title: v.title,
            cover_url: v.cover_url,
            thumbnail_path: v.thumbnail_path,
          })),
        )

        response.data = response.data.map((video) => {
          let thumbnail = ''

          // 1. 优先使用 cover_url（用户上传的封面）
          if (
            video.cover_url &&
            video.cover_url !== 'null' &&
            !video.cover_url.includes('via.placeholder.com')
          ) {
            // 如果是相对路径，加上域名
            if (video.cover_url.startsWith('/')) {
              thumbnail = `http://localhost:3000${video.cover_url}`
            } else {
              thumbnail = video.cover_url
            }
          }
          // 2. 其次使用 thumbnail_path
          else if (
            video.thumbnail_path &&
            video.thumbnail_path !== 'null' &&
            !video.thumbnail_path.includes('via.placeholder.com')
          ) {
            if (video.thumbnail_path.startsWith('/')) {
              thumbnail = `http://localhost:3000${video.thumbnail_path}`
            } else {
              thumbnail = video.thumbnail_path
            }
          }
          // 3. 如果都没有，使用 picsum
          else {
            thumbnail = `https://picsum.photos/320/180?random=${video.id}`
          }

          console.log(`视频 ${video.id} ${video.title} 最终封面:`, thumbnail)

          return {
            ...video,
            thumbnail: thumbnail,
          }
        })
      } else if (response.data && typeof response.data === 'object') {
        // 单个视频对象
        let thumbnail = ''
        if (response.data.cover_url && !response.data.cover_url.includes('via.placeholder.com')) {
          thumbnail = response.data.cover_url.startsWith('/')
            ? `http://localhost:3000${response.data.cover_url}`
            : response.data.cover_url
        } else if (
          response.data.thumbnail_path &&
          !response.data.thumbnail_path.includes('via.placeholder.com')
        ) {
          thumbnail = response.data.thumbnail_path.startsWith('/')
            ? `http://localhost:3000${response.data.thumbnail_path}`
            : response.data.thumbnail_path
        } else {
          thumbnail = `https://picsum.photos/320/180?random=${response.data.id}`
        }
        response.data.thumbnail = thumbnail
        console.log('单个视频封面:', response.data.thumbnail)
      }
    }
    return response
  },
  (error) => {
    console.error('【API错误】', error.config?.url, error.message)
    return Promise.reject(error)
  },
)

/**
 * 获取视频列表
 * @param {Object} params - 查询参数
 * @returns {Promise<Array>} 视频列表
 */
export const getVideoList = async (params = {}) => {
  try {
    console.log('【getVideoList】开始请求')
    const response = await api.get('/videos', { params })
    console.log('【getVideoList】成功，获取到', response.data.length, '条视频')
    return response.data
  } catch (error) {
    console.error('【getVideoList】失败', error)
    throw error
  }
}

/**
 * 获取推荐视频
 * @returns {Promise<Array>} 推荐视频列表
 */
export const getRecommendations = async () => {
  try {
    console.log('【getRecommendations】开始请求')
    const response = await api.get('/recommendations')
    console.log('【getRecommendations】成功，获取到', response.data.length, '条推荐')
    return response.data
  } catch (error) {
    console.error('【getRecommendations】失败', error)
    throw error
  }
}

/**
 * 获取单个视频详情
 * @param {number|string} id - 视频ID
 * @returns {Promise<Object>} 视频详情
 */
export const getVideoDetail = async (id) => {
  try {
    console.log('【getVideoDetail】开始请求，ID:', id)
    const response = await api.get(`/videos/${id}`)
    console.log('【getVideoDetail】成功:', response.data)
    return response.data
  } catch (error) {
    console.error('【getVideoDetail】失败:', error)
    throw error
  }
}

/**
 * 上传视频
 * @param {FormData} formData - 包含视频文件、封面文件和表单数据的 FormData
 * @returns {Promise<Object>} 上传结果
 */
export const uploadVideo = async (formData) => {
  try {
    console.log('开始上传，超时设置:', api.defaults.timeout + 'ms')

    // 打印上传的数据
    for (let pair of formData.entries()) {
      console.log('上传字段:', pair[0], pair[1] instanceof File ? pair[1].name : pair[1])
    }

    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log('上传进度：', percentCompleted + '%')
        }
      },
    })
    console.log('上传响应:', response.data)
    return response.data
  } catch (error) {
    console.error('上传失败详细:', error)
    if (error.code === 'ECONNABORTED') {
      console.error('上传超时，请检查网络或增大超时时间')
    }
    throw error
  }
}

/**
 * 删除视频
 * @param {number|string} id - 视频ID
 * @returns {Promise<Object>} 删除结果
 */
export const deleteVideo = async (id) => {
  try {
    console.log('【deleteVideo】开始请求，ID:', id)
    const response = await api.delete(`/videos/${id}`)
    console.log('【deleteVideo】成功:', response.data)
    return response.data
  } catch (error) {
    console.error('【deleteVideo】失败:', error)
    throw error
  }
}

/**
 * 获取轮播图视频
 * @param {number} limit - 获取数量
 * @returns {Promise<Array>} 轮播图视频列表
 */
export const getCarouselVideos = async (limit = 5) => {
  try {
    console.log('【getCarouselVideos】开始请求')
    const response = await api.get('/carousel', { params: { limit } })
    console.log('【getCarouselVideos】成功，获取到', response.data.length, '条视频')
    return response.data
  } catch (error) {
    console.error('【getCarouselVideos】失败', error)
    // 降级处理：如果接口失败，从视频列表中随机获取
    try {
      const videos = await getVideoList()
      const shuffled = [...videos].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, limit)
    } catch (e) {
      console.error('降级获取视频列表也失败:', e)
      return []
    }
  }
}
