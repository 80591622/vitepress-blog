import type { AutoFrontmatterFileInfo } from "../../../packages/config";

type AutoFrontmatterMerged = {
  categories?: string[] | string;
  tags?: string[] | string;
  [key: string]: unknown;
};

const CATEGORY_PATH = "/categories";
const TAG_PATH = "/tags";
const AUTO_FRONTMATTER_IGNORE = ["**/index.md", "**/routes/*.md", "**/tag/**", "**/todos/**"];

const contentLabels = {
  category: {
    moreLabel: "更多 ...",
    emptyLabel: "暂无文章分类",
  },
  tag: {
    moreLabel: "更多 ...",
    emptyLabel: "暂无标签",
  },
  post: {
    moreLabel: "阅读全文 >",
    emptyLabel: "暂无文章",
  },
} as const;

function normalizeRelativePath(relativePath: string): string {
  return relativePath.replace(/\\/g, "/");
}

function getPathSegments(relativePath: string): string[] {
  return relativePath.replace(/\.md$/i, "").split("/").filter(Boolean);
}

function getMergedStringList(value: AutoFrontmatterMerged["categories"] | AutoFrontmatterMerged["tags"]): string[] {
  return [value].flat().filter(Boolean) as string[];
}

function getWorkspaceDerivedCategory(relativePath: string): string[] | undefined {
  const segments = getPathSegments(relativePath);
  const workspaceIndex = segments.indexOf("workspace");
  const workspaceChild = segments[workspaceIndex + 1];
  if (!workspaceChild) return undefined;
  return [workspaceChild.replace(/^\d+\./, "")];
}

function getParentDerivedTags(relativePath: string): string[] | undefined {
  const segments = getPathSegments(relativePath);
  if (segments.length < 2) return undefined;

  const parent = segments[segments.length - 2].replace(/^\d+\./, "");
  return parent ? [parent] : undefined;
}

function diffFrontmatterPatch(
  merged: AutoFrontmatterMerged,
  patch: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!Object.keys(patch).length) return undefined;

  const diff: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(patch)) {
    const current = merged[key];
    if (JSON.stringify(current) !== JSON.stringify(value)) diff[key] = value;
  }

  return Object.keys(diff).length ? diff : undefined;
}

function transformAutoFrontmatter(merged: AutoFrontmatterMerged, fileInfo: AutoFrontmatterFileInfo) {
  const relativePath = normalizeRelativePath(fileInfo.relativePath);
  const patch: Record<string, unknown> = {};

  const rawCategories = getMergedStringList(merged.categories);
  if (rawCategories.length) {
    const filteredCategories = rawCategories.filter(category => category !== "workspace");
    patch.categories = filteredCategories.length ? filteredCategories : getWorkspaceDerivedCategory(relativePath);
  }

  const rawTags = getMergedStringList(merged.tags);
  if (!rawTags.length) {
    const derivedTags = getParentDerivedTags(relativePath);
    if (derivedTags?.length) patch.tags = derivedTags;
  }

  return diffFrontmatterPatch(merged, patch);
}

/**
 * 博客内容规则：
 * - 分类 / 标签页文案与路径
 * - 文章卡片呈现方式
 * - frontmatter 自动补全规则
 */
export const blogContentConfig = {
  /** 分类 / 标签页路由与文案；标题图标由 Teek 默认注入，勿在 pageTitle 中写 "${svg}" */
  category: {
    path: CATEGORY_PATH,
    ...contentLabels.category,
  },
  tag: {
    path: TAG_PATH,
    ...contentLabels.tag,
  },
  /** 分类、标签页：横向列表（左文右图）+ 元信息在标题下、摘要在后，对齐 vp.teek.top */
  post: {
    postStyle: "list",
    excerptPosition: "bottom",
    showMore: true,
    ...contentLabels.post,
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
        ignore: AUTO_FRONTMATTER_IGNORE,
      },
      transform: transformAutoFrontmatter,
    },
  },
} as const;
