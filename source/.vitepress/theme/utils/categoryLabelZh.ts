/**
 * 侧栏「全部分类」展示用文案：frontmatter 里仍是英文 key（与 ?category= 一致），此处仅影响显示。
 */
const CATEGORY_ZH: Record<string, string> = {
  Css: "CSS 与样式",
  Frame: "前端框架",
  Server: "服务端",
  Js: "JavaScript",
  Webpack: "Webpack",
  Vite: "Vite",
  Typescript: "TypeScript",
  Snowpack: "Snowpack",
  Rollup: "Rollup",
  Jenkins: "Jenkins",
  Git: "Git",
  Electron: "Electron",
  vue: "Vue",
  react: "React",
  next: "Vue 响应式",
  "source-code": "Vue 源码",
  nginx: "Nginx",
  node: "Node.js",
  sql: "数据库",
  api: "接口与 API",
  taro: "Taro",
  "react-native": "React Native",
  "unit-test": "单元测试",
  "micro-app": "微前端",
  FE框架: "前端框架",
  Vue: "Vue",
}

export function getCategoryLabelZh(name: string): string {
  if (/[\u3000-\u9fff]/.test(name)) return name
  return CATEGORY_ZH[name] ?? name
}
