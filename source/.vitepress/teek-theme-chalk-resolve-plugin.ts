import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/** 与主题仓库 build/theme-chalk.ts 的 glob ignore 保持一致，避免 common 等与 vp-plus 重名 scss 抢解析 */
const IGNORE_DIRS = new Set(["var", "module", "mixins", "common"]);

function collectScssFiles(absDir: string, out: string[]): void {
  if (!fs.existsSync(absDir)) return;
  for (const ent of fs.readdirSync(absDir, { withFileTypes: true })) {
    const full = path.join(absDir, ent.name);
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      collectScssFiles(full, out);
    } else if (ent.name.endsWith(".scss")) {
      out.push(full);
    }
  }
}

/**
 * Map tk-{stem}.css / {stem}.css requests to matching ** /{stem}.scss files (same naming as published theme-chalk).
 */
function buildStemToScss(themeChalkSrc: string): Map<string, string> {
  const files: string[] = [];
  collectScssFiles(themeChalkSrc, files);
  const map = new Map<string, string>();
  for (const abs of files) {
    const stem = path.basename(abs, ".scss");
    if (stem === "index") continue;
    const prev = map.get(stem);
    if (!prev) {
      map.set(stem, abs);
      continue;
    }
    const prefer = abs.split(path.sep).length < prev.split(path.sep).length ? abs : prev;
    map.set(stem, prefer);
  }
  return map;
}

const CHALK_TAIL_RE = /^(?:.*?\/|^)(?:@teek\/theme-chalk\/|vitepress-theme-teek\/theme-chalk\/)([^/]+\.css)$/;

/**
 * Resolve published-style .css imports to theme-chalk source .scss during dev.
 *
 * @see vitepress-theme-teek build/theme-chalk.ts (output: tk-{basename}.css)
 */
export function teekThemeChalkCssResolve(themeChalkSrc: string): Plugin {
  const indexScssPath = path.join(themeChalkSrc, "index.scss");
  let stemToScss: Map<string, string>;

  const ensureMap = (): Map<string, string> => {
    if (!stemToScss) stemToScss = buildStemToScss(themeChalkSrc);
    return stemToScss;
  };

  return {
    name: "teek-theme-chalk-css-to-scss",
    enforce: "pre",
    buildStart() {
      stemToScss = buildStemToScss(themeChalkSrc);
    },
    resolveId(id: string): string | undefined {
      const normalized = id.split(path.sep).join("/");

      if (normalized === "vitepress-theme-teek/index.css" || normalized.endsWith("/vitepress-theme-teek/index.css")) {
        return indexScssPath;
      }

      const m = normalized.match(CHALK_TAIL_RE);
      if (!m) return;

      const fileBase = m[1].replace(/\.css$/, "");
      const stem = fileBase.startsWith("tk-") ? fileBase.slice(3) : fileBase;
      const resolved = ensureMap().get(stem);
      if (!resolved) {
        // 让 Vite 继续走后续解析，便于看到原始报错
        return;
      }
      return resolved;
    },
  };
}
