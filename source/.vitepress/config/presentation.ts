import type { DefaultTheme } from "vitepress";
import search from "./search";
import sidebar from "./sidebar";
import socialLinks from "./socialLinks";
import nav from "./nav";
import { siteProfile } from "./siteInfo";
import { themeLayoutFlags } from "./themeFlags";

export const siteDescription = siteProfile.description;

/**
 * 站点展示配置：
 * - 顶部导航 / 侧边栏 / 搜索 / 社交链接
 * - 站点文案、页脚、编辑链接
 * - 与最终页面呈现直接相关的 VitePress themeConfig
 */
export const siteThemeConfig = {
  // 必须出现在最终 theme 上：否则 Teek 合并配置时 teekHome 会回退为 true，首页会套上博客布局与右侧卡片栏
  ...themeLayoutFlags,
  darkModeSwitchLabel: "主题",
  sidebarMenuLabel: "菜单",
  returnToTopLabel: "返回顶部",
  logo: siteProfile.logo,
  outline: {
    level: [2, 3],
    label: "本页导航",
  },
  search,
  socialLinks,
  sidebar,
  nav,
  editLink: {
    pattern: siteProfile.github.editPattern,
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
    message: siteProfile.copyright.footerMessage,
    copyright: `<a href="${siteProfile.copyright.icpLink}" target="_blank">${siteProfile.copyright.icpText}</a>`,
  },
} satisfies DefaultTheme.Config;
