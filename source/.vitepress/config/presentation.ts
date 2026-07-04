import type { DefaultTheme } from "vitepress";
import search from "./search";
import sidebar from "./sidebar";
import socialLinks from "./socialLinks";
import nav from "./nav";
import { siteEditLink, siteFooter, siteHeadMeta } from "./siteInfo";
import { withThemeLayoutFlags } from "./themeFlags";

/**
 * 站点展示配置：
 * - 顶部导航 / 侧边栏 / 搜索 / 社交链接
 * - 站点文案、页脚、编辑链接
 * - 与最终页面呈现直接相关的 VitePress themeConfig
 */
export const siteThemeConfig = withThemeLayoutFlags({
  darkModeSwitchLabel: "主题",
  sidebarMenuLabel: "菜单",
  returnToTopLabel: "返回顶部",
  logo: siteHeadMeta.logo,
  outline: {
    level: [2, 3] as [number, number],
    label: "本页导航",
  },
  search,
  socialLinks,
  sidebar,
  nav,
  editLink: siteEditLink,
  lastUpdated: {
    text: "上次更新",
    formatOptions: {
      dateStyle: "full",
      timeStyle: "medium",
    } as Intl.DateTimeFormatOptions,
  },
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  footer: siteFooter,
}) satisfies DefaultTheme.Config;
