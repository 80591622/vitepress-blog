import path from "node:path";
import { fileURLToPath } from "node:url";
import type { UserConfig } from "vitepress";

const dir = path.dirname(fileURLToPath(import.meta.url));
const teekPackages = path.resolve(dir, "../../../packages");
const teekEntry = path.join(teekPackages, "teek");
const localTeekPackages = ["components", "composables", "config", "helper", "locale", "markdown", "static"] as const;

function getPackageAliasReplacement(name: (typeof localTeekPackages)[number]) {
  if (name === "helper") return path.join(teekPackages, name, "index.ts");
  return path.join(teekPackages, name);
}

const teekPackageAliases = localTeekPackages.map(name => ({
  find: `@teek/${name}`,
  replacement: getPackageAliasReplacement(name),
}));

/**
 * 主题入口与 @teek/* 子包走本地源码；
 * theme-chalk 的发布态 CSS 由 `pnpm theme-chalk:build` 预生成到 workspace 包目录，解析时走包本身的 exports。
 */
export const teekViteConfig: NonNullable<UserConfig["vite"]> = {
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
      ...teekPackageAliases,
    ],
  },
  ssr: {
    noExternal: ["vitepress-theme-teek", /@teek\//],
  },
};
