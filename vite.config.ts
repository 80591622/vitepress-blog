import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      // 在这里添加您的相对路径别名
      "@": path.resolve(__dirname, "./workspace")
    }
  }
})
