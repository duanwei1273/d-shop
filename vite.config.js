import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
  ],
    server: {
        // host:'192.168.0.104',
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://demo.itlike.com/web/xlmc/api/', // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
            }
        }
    }


})



