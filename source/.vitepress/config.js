import search from "./config/search"
import sidebar from "./config/sidebar"
import socialLinks from "./config/socialLinks"
import nav from "./config/nav"
import algolia from "./config/algolia"

// https://vitepress.dev/reference/site-config
export default {
  lang: "zh",
  title: "Serein's Blogscape",
  description:
    "软件开发计：开发文档和开发计划，完成功能工具，和待开发的功能和工具",
  appearance: true, // 暗黑模式
  ignoreDeadLinks: true, // 不会因死链接而使构建失败
  lastUpdated: true, // 使用 git 提交获取时间戳，使默认主题能够显示页面的上次更新时间
  base: "/", // url默认前缀
  markdown: {
    // 主题选择：https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    // 主题预览：https://vscodethemes.com/
    // 添加自定义的主题(加载主题)：https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme
    theme: "one-dark-pro",
    lineNumbers: true // 显示代码行数
  },
  outDir: "../dist", // 打包输出的目录
  // titleTemplate: '牧涯前端学习笔记', // 标题后缀
  cleanUrls: false, // url是否带.html后缀
  
  // 浏览器标签图标设置
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/img/clock.png' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 使用 algolia 搜索框
    // search: {
    //   provider: 'algolia',
    //   options: algolia,
    // },

    // 使用浏览器内置索引进行模糊全文搜索
    search,

    // 右上角导航中显示带有图标的社交帐户链接
    socialLinks,

    // *****左边侧栏导航*****
    sidebar,

    // 右上角导航
    nav,

    // 编辑
    editLink: {
      pattern:"https://github.com/80591622",
      text: "在 Gihub上编辑此页"
    },

    // 自定义上次更新的文本和日期格式
    lastUpdated: {
      text: "上次更新",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },

    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },

    // 右边文档大纲下面的-卡片广告
    // carbonAds: {
    //   code: "卡片广告 code",
    //   placement: "卡片广告布置"
    // },

    // 首页页脚配置。您可以添加消息和版权。仅当页面由于设计原因不包含边栏时，才会显示页脚。
    footer: {
      message: "Copyright © 2024",
      copyright: `<a href="https://beian.miit.gov.cn/" target="_blank">京 ICP 备 18059340 号-1</a>`
    }
  }
}
