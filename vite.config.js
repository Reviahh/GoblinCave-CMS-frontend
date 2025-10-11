import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,       // 固定使用 5173 端口
    strictPort: true, // 若被占用则报错，不自动切换端口
    host: true,
  },
  // 如需本地代理后端，可取消注释如下配置：
  // server: {
  //   proxy: {
  //     '/user': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})
