import { defineConfig } from "vite"
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 在这里添加您的相对路径别名
      "@": fileURLToPath(new URL('./source'))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.md']
  }
})
