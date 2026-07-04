import { version } from "../../../packages/teek/version";
import type { Message } from "../../../packages/components/common/message/src/message";
import { siteProfile } from "./siteInfo";

/**
 * 博客主题与交互规则：
 * - 主题增强
 * - 页脚
 * - 交互反馈
 * - 风险跳转 / 过渡动画等站点体验
 */
export const blogThemeConfig = {
  /** 关闭侧栏边缘折叠按钮（双箭头），避免与正文之间的干扰线视觉 */
  sidebarTrigger: false,
  themeEnhance: {
    spotlight: {
      /** 聚光灯默认样式：aside 置于侧边 | under 置于底部 */
      defaultStyle: "aside",
    },
  },
  author: siteProfile.author,
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
    },
    copyright: {
      createYear: siteProfile.copyright.createYear,
      suffix: siteProfile.copyright.suffix,
    },
  },
  backTop: {
    enabled: true,
    content: "progress",
    done: (TkMessage: Message) => TkMessage.success("返回顶部成功"),
  },
  viewTransition: {
    enabled: true,
    mode: "out-in",
    duration: 300,
    easing: "ease-in",
  },
  codeBlock: {
    /** false：所有代码块默认展开，不自动折叠 */
    collapseHeight: false,
    copiedDone: (TkMessage: Message) => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  /** 点击站内外链时跳转风险提示页（/risk-link），功能页导航不直接暴露该页 */
  riskLink: {
    enabled: true,
  },
} as const;
