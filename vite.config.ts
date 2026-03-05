import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 重要：添加 proxy 配置
    proxy: {
      // 所有以 /videos 开头的请求都代理到后端（根据你的路由前缀调整）
      '/api': {
        target: 'http://127.0.0.1:3000/api', // ← 改成你 Express 实际监听的地址+端口
        changeOrigin: true, // 改 origin 头，防止后端 CORS 或 host 校验问题
        secure: false, // 如果后端不是 https，关掉
        ws: false, // 没用 websocket 就 false
        timeout: 600000, // 请求整体超时 10 分钟
        proxyTimeout: 600000, // proxy 等待后端响应的超时 10 分钟

        // 可选：调试用，打印 proxy 事件（开发完可删）
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('[Proxy] 发送请求到后端:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('[Proxy] 收到后端响应:', proxyRes.statusCode, req.url)
          })
          proxy.on('error', (err, req, _res) => {
            console.log('[Proxy Error]', err.message, req.url)
          })
        },
      },

      // 如果你还有其他 API 前缀，比如 /api、/upload 等，也可以加在这里
      // '/api': { target: 'http://localhost:3000', ... }
    },

    // 可选：如果后端和前端端口冲突，或想固定端口
    // port: 5173,
    // strictPort: true,
  },
})
