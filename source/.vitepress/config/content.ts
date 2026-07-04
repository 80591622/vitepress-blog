import type { AutoFrontmatterFileInfo } from "../../../packages/config";

type AutoFrontmatterMerged = {
  categories?: string[] | string;
  tags?: string[] | string;
  [key: string]: unknown;
};

/**
 * 博客内容规则：
 * - 分类 / 标签页文案与路径
 * - 文章卡片呈现方式
 * - frontmatter 自动补全规则
 */
export const blogContentConfig = {
  /** 分类 / 标签页路由与文案；标题图标由 Teek 默认注入，勿在 pageTitle 中写 "${svg}" */
  category: {
    path: "/categories",
    moreLabel: "更多 ...",
    emptyLabel: "暂无文章分类",
  },
  tag: {
    path: "/tags",
    moreLabel: "更多 ...",
    emptyLabel: "暂无标签",
  },
  /** 分类、标签页：横向列表（左文右图）+ 元信息在标题下、摘要在后，对齐 vp.teek.top */
  post: {
    postStyle: "list",
    excerptPosition: "bottom",
    showMore: true,
    moreLabel: "阅读全文 >",
    emptyLabel: "暂无文章",
    transition: true,
    /** 无 description 时用正文截取作为卡片简介（与 Teek 文档站 categories/tags 一致） */
    showCapture: true,
  },
  vitePlugins: {
    permalink: false,
    /**
     * 关闭按目录自动生成的侧栏。否则插件会覆盖 themeConfig.sidebar，出现 Analysis/Css/Frame 等目录树且与手写层级不一致。
     * 侧栏使用 ./config/sidebar.ts 全量维护。
     */
    sidebar: false,
    autoFrontmatter: true,
    autoFrontmatterOption: {
      permalink: false,
      categories: true,
      recoverTransform: false,
      globOptions: {
        ignore: ["**/index.md", "**/routes/*.md", "**/tag/**", "**/todos/**"],
      },
      transform(merged: AutoFrontmatterMerged, fileInfo: AutoFrontmatterFileInfo) {
        const rel = fileInfo.relativePath.replace(/\\/g, "/");
        const out: Record<string, unknown> = {};

        const rawCats = [merged.categories].flat().filter(Boolean) as string[];
        if (rawCats.length) {
          const filtered = rawCats.filter(c => c !== "workspace");
          if (filtered.length) out.categories = filtered;
          else {
            const parts = rel.replace(/\.md$/i, "").split("/").filter(Boolean);
            const w = parts.indexOf("workspace");
            if (w >= 0 && parts[w + 1]) out.categories = [parts[w + 1].replace(/^\d+\./, "")];
          }
        }

        if (!merged.tags?.length) {
          const segs = rel.replace(/\.md$/i, "").split("/").filter(Boolean);
          if (segs.length >= 2) {
            const parent = segs[segs.length - 2].replace(/^\d+\./, "");
            if (parent) out.tags = [parent];
          }
        }

        if (!Object.keys(out).length) return undefined;

        const diff: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(out)) {
          const current = merged[key];
          if (JSON.stringify(current) !== JSON.stringify(value)) diff[key] = value;
        }

        return Object.keys(diff).length ? diff : undefined;
      },
    },
  },
} as const;
