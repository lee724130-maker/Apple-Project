import axios from 'axios'

// 动态获取基础 URL
const getBaseUrl = () => {
  // 获取当前页面的主机名
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // 如果是本地开发（localhost 或 127.0.0.1）
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000/api';
  }
  
  // 如果是通过 IP 访问，使用相同的 IP 访问后端
  return `${protocol}//${hostname}:3000/api`;
};

// 创建axios实例
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加日志便于调试
api.interceptors.request.use(
  (config) => {
    console.log('请求地址:', config.baseURL + config.url);
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// 用户相关API
export const userApi = {
  getUsers() {
    return api.get('/users')
  },
  getUser(id: number) {
    return api.get(`/users/${id}`)
  },
  createUser(userData: { name: string; email: string; role?: string }) {
    return api.post('/users', userData)
  },
  updateUser(id: number, userData: { name?: string; email?: string; role?: string }) {
    return api.put(`/users/${id}`, userData)
  },
  deleteUser(id: number) {
    return api.delete(`/users/${id}`)
  }
}

// 访问统计 API
export const trackApi = {
  trackVisit(pageUrl: string = '/') {
    return api.post('/track/visit', { pageUrl })
  },
  submitConsult(data: { phone?: string; wechat?: string; question: string }) {
    return api.post('/consult/submit', data)
  }
}

// 统计数据 API
export const statsApi = {
  getOverview() {
    return api.get('/stats/overview')
  },
  getDailyVisits(startDate?: string, endDate?: string) {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    return api.get(`/stats/visits/daily?${params.toString()}`)
  },
  getSubmissions(startDate?: string, endDate?: string, status?: number) {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    if (status !== undefined) params.append('status', String(status))
    return api.get(`/stats/submissions?${params.toString()}`)
  },
  updateSubmissionStatus(id: number, status: number, remark?: string) {
    return api.put(`/stats/submissions/${id}/status`, { status, remark })
  }
}

export default api