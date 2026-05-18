import path from "node:path";
import { fileURLToPath } from "node:url";
import type { UserConfig } from "vitepress";

import { teekThemeChalkCssResolve } from "./teek-theme-chalk-resolve-plugin";

const dir = path.dirname(fileURLToPath(import.meta.url));
const teekPackages = path.resolve(dir, "../../packages");
const teekEntry = path.join(teekPackages, "teek");
const themeChalkSrc = path.join(teekPackages, "theme-chalk", "src");

/**
 * 主题入口与 @teek/* / vitepress-theme-teek 子路径走本地源码与子包；
 * 组件内 `*.css` 引用由插件解析到 theme-chalk 的 `.scss`（与正式发布产物命名对齐）。
 */
export const teekViteConfig: NonNullable<UserConfig["vite"]> = {
  plugins: [teekThemeChalkCssResolve(themeChalkSrc)],
  resolve: {
    alias: [
      {
        find: /^vitepress-theme-teek\/config$/,
        replacement: path.join(teekPackages, "config", "index.ts"),
      },
      {
        find: /^vitepress-theme-teek\/es\/version$/,
        replacement: path.join(teekEntry, "version.ts"),
      },
      {
        find: /^vitepress-theme-teek$/,
        replacement: path.join(teekEntry, "index.ts"),
      },
      { find: "@teek/components", replacement: path.join(teekPackages, "components") },
      { find: "@teek/composables", replacement: path.join(teekPackages, "composables") },
      { find: "@teek/config", replacement: path.join(teekPackages, "config") },
      { find: "@teek/helper", replacement: path.join(teekPackages, "helper") },
      { find: "@teek/locale", replacement: path.join(teekPackages, "locale") },
      { find: "@teek/markdown", replacement: path.join(teekPackages, "markdown") },
      { find: "@teek/static", replacement: path.join(teekPackages, "static") },
      {
        find: /^@teek\/theme-chalk\/(.*)/,
        replacement: `${path.join(teekPackages, "theme-chalk", "src")}/$1`,
      },
    ],
  },
  ssr: {
    noExternal: ["vitepress-theme-teek", /@teek\//],
  },
};
