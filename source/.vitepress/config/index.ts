import { defineConfig } from "vitepress";
import { teekConfig } from "./site";
import { teekViteConfig } from "./vite";
import { resourcesRewrites } from "./resources";
import { siteHeadMeta } from "./siteInfo";
import { siteThemeConfig } from "./presentation";

/**
 * 在 Vue 挂载前恢复布局偏好，避免浏览器先以默认布局绘制、再因 localStorage
 * 中的用户设置发生一次明显的重排（FOUC）。键名与 Theme Enhance 保持一致。
 */
const layoutPreferenceBootstrap = String.raw`(() => {
  try {
    const storage = window.localStorage;
    const root = document.documentElement;
    const modes = ["fullWidth", "sidebarWidthAdjustableOnly", "bothWidthAdjustable", "original"];
    const savedMode = storage.getItem("tk:layoutMode");
    const mode = modes.includes(savedMode) ? savedMode : "original";

    root.setAttribute("layout-mode", mode);

    const readWidth = (key, fallback) => {
      const value = Number(storage.getItem(key));
      return Number.isFinite(value) && value >= 6000 && value <= 10000 ? Math.ceil(value / 100) : fallback;
    };

    const pageWidth = readWidth("tk:pageMaxWidthSlide", 90);
    const docWidth = readWidth("tk:docMaxWidthSlide", 95);

    root.style.setProperty("--tk-page-max-width", pageWidth + "%");
    root.style.setProperty("--tk-doc-max-width", docWidth + "%");

    // 与 LayoutDocWidthSlide 的初始化逻辑一致：1440px 以下不使用可调页面宽度。
    if (!window.matchMedia("(min-width: 1440px)").matches) {
      root.style.setProperty("--tk-page-max-width", "100%");
    }
  } catch {
    // 隐私模式或禁用存储时，保留 CSS 的默认布局即可。
  }
})();`;

export default defineConfig({
  extends: teekConfig,
  lang: "zh-CN",
  title: siteHeadMeta.title,
  description: siteHeadMeta.description,
  appearance: true,
  lastUpdated: true,
  base: "/",
  cleanUrls: false,
  /** 功能页放在 source/routes/，通过重写映射到 /archives、/categories 等 URL */
  rewrites: {
    "routes/:page.md": ":page.md",
    ...resourcesRewrites,
  },
  outDir: "../dist",
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: siteHeadMeta.logo }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1" }],
    ["script", { id: "layout-preference-bootstrap" }, layoutPreferenceBootstrap],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: siteHeadMeta.title }],
    ["meta", { property: "og:description", content: siteHeadMeta.description }],
    ["meta", { name: "description", content: siteHeadMeta.description }],
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
    ...teekViteConfig,
    build: {
      // 让异常大的首屏 chunk 在构建阶段暴露出来，而不是被 3 MB 阈值掩盖。
      chunkSizeWarningLimit: 700,
    },
  },
  themeConfig: siteThemeConfig,
});
