import { defineConfig } from "vitepress";
import { teekConfig } from "./site";
import { teekViteConfig } from "./vite";
import { ecosystemRewrites } from "./ecosystem";
import { siteProfile } from "./siteInfo";
import { siteDescription, siteThemeConfig } from "./presentation";

export default defineConfig({
  extends: teekConfig,
  lang: "zh-CN",
  title: siteProfile.title,
  description: siteDescription,
  appearance: true,
  lastUpdated: true,
  base: "/",
  cleanUrls: false,
  /** 功能页放在 source/routes/，通过重写映射到 /archives、/categories 等 URL */
  rewrites: {
    "routes/:page.md": ":page.md",
    ...ecosystemRewrites,
  },
  outDir: "../dist",
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: siteProfile.logo }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: siteProfile.title }],
    ["meta", { property: "og:description", content: siteDescription }],
    ["meta", { name: "description", content: siteDescription }],
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
      chunkSizeWarningLimit: 3000,
    },
  },
  themeConfig: siteThemeConfig,
});
