import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
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
  // 获取所有用户
  getUsers() {
    return api.get('/users')
  },
  
  // 获取单个用户
  getUser(id: number) {
    return api.get(`/users/${id}`)
  },
  
  // 创建用户
  createUser(userData: { name: string; email: string; role?: string }) {
    return api.post('/users', userData)
  },
  
  // 更新用户
  updateUser(id: number, userData: { name?: string; email?: string; role?: string }) {
    return api.put(`/users/${id}`, userData)
  },
  
  // 删除用户
  deleteUser(id: number) {
    return api.delete(`/users/${id}`)
  }
}

// 导出默认实例
export default api