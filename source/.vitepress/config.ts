import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress";
import { teekConfig } from "./teekConfig";
import search from "./config/search.js";
import sidebar from "./config/sidebar.js";
import socialLinks from "./config/socialLinks.js";
import nav from "./config/nav.js";

const description =
  "软件开发计：开发文档和开发计划，完成功能工具，和待开发的功能和工具";

export default defineConfig({
  extends: teekConfig,
  lang: "zh-CN",
  title: "TimeByte",
  description,
  appearance: true,
  lastUpdated: true,
  base: "/",
  cleanUrls: false,
  outDir: "../dist",
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/img/clock.png" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "TimeByte" }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { name: "description", content: description }],
  ],
  markdown: {
    lineNumbers: true,
    theme: "one-dark-pro",
    image: {
      lazyLoading: true,
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 3000,
    },
  },
  themeConfig: {
    // 必须出现在最终 theme 上：否则 Teek 合并配置时 teekHome 会回退为 true，首页会套上博客布局与右侧卡片栏
    teekHome: false,
    vpHome: true,
    // 若启用 Teek 博客首页，关闭右侧资讯卡片列（与纯 VitePress 首页二选一时可防错位）
    homeCardListPosition: false,
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    logo: "/img/clock.png",
    outline: {
      level: [2, 3],
      label: "本页导航",
    },
    search: search as DefaultTheme.Config["search"],
    socialLinks,
    sidebar,
    nav,
    editLink: {
      pattern: "https://github.com/80591622",
      text: "在 GitHub 上编辑此页",
    },
    lastUpdated: {
      text: "上次更新",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    footer: {
      message: "Copyright © 2024",
      copyright: `<a href="https://beian.miit.gov.cn/" target="_blank">京 ICP 备 18059340 号</a>`,
    },
  } as DefaultTheme.Config,
});
