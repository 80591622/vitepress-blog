import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import type { DefaultTheme } from "vitepress";

const RESOURCE_ROUTE_BASE = "/resources";
const RESOURCE_SOURCE_PREFIX = "resources/";

const resourceGroupConfig = {
  root: {
    text: "资源库",
    collapsed: false,
    prefixes: [] as string[],
    order: ["components/index.md", "runtime-api.md", "helper.md", "composables.md", "markdown-plugin-utils.md"],
  },
  common: {
    text: "公共组件",
    collapsed: false,
    prefixes: ["components/common/"],
    order: [
      "components/common/avatar.md",
      "components/common/title-tag.md",
      "components/common/pagination.md",
      "components/common/breadcrumb.md",
      "components/common/image-viewer.md",
      "components/common/input-slide.md",
      "components/common/verify-code.md",
      "components/common/transition-collapse.md",
      "components/common/icon.md",
      "components/common/message.md",
      "components/common/page-card.md",
      "components/common/article-page.md",
      "components/common/popover.md",
      "components/common/vp-container.md",
      "components/common/segmented.md",
    ],
  },
  theme: {
    text: "主题组件",
    collapsed: false,
    prefixes: ["components/theme/"],
    order: [
      "components/theme/archives-page.md",
      "components/theme/article-analyze.md",
      "components/theme/article-appreciation.md",
      "components/theme/article-banner.md",
      "components/theme/article-heading-highlight.md",
      "components/theme/article-image-preview.md",
      "components/theme/article-overview-page.md",
      "components/theme/article-page-style.md",
      "components/theme/article-share.md",
      "components/theme/article-update.md",
      "components/theme/catalogue-page.md",
      "components/theme/code-block-toggle.md",
      "components/theme/demo-code.md",
      "components/theme/footer-group.md",
      "components/theme/footer-info.md",
      "components/theme/home.md",
      "components/theme/notice.md",
      "components/theme/right-bottom-button.md",
      "components/theme/route-loading.md",
      "components/theme/theme-enhance.md",
    ],
  },
  comments: {
    text: "评论区组件",
    collapsed: true,
    prefixes: ["components/theme/comments/"],
    order: [
      "components/theme/comments/comment-giscus.md",
      "components/theme/comments/comment-twikoo.md",
      "components/theme/comments/comment-artalk.md",
      "components/theme/comments/comment-waline.md",
    ],
  },
} as const;

type ResourceGroup = keyof typeof resourceGroupConfig;
type ResourceGroupConfig = (typeof resourceGroupConfig)[ResourceGroup];

interface ResourceDoc {
  sourcePath: string;
  relativePath: string;
  title: string;
  link: string;
  rewriteTo: string;
  group: ResourceGroup;
}

const configDir = path.dirname(fileURLToPath(import.meta.url));
const resourcesDir = path.resolve(configDir, "../../resources");
const groupEntries = Object.entries(resourceGroupConfig) as [ResourceGroup, ResourceGroupConfig][];
const nonRootGroups = groupEntries.filter(([group]) => group !== "root").map(([group]) => group);

function collectMarkdownFiles(dir: string, base = dir): string[] {
  if (!fs.existsSync(dir)) return [];

  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectMarkdownFiles(fullPath, base));
    else if (entry.isFile() && entry.name.endsWith(".md"))
      files.push(path.relative(base, fullPath).replace(/\\/g, "/"));
  }

  return files;
}

function getGroup(relativePath: string): ResourceGroup {
  for (const [group, config] of groupEntries) {
    if (group === "root") continue;
    if (config.prefixes.some(prefix => relativePath.startsWith(prefix))) return group;
  }
  return "root";
}

function getFallbackLink(relativePath: string): string {
  const noExt = relativePath.replace(/\.md$/i, "");
  const withoutIndex = noExt.replace(/\/index$/i, "");
  return `${RESOURCE_ROUTE_BASE}/${withoutIndex}`;
}

function getRewriteTarget(link: string): string {
  const normalized = link.replace(/^\/+/, "");
  return `${normalized}.md`;
}

function getSortWeight(group: ResourceGroup, relativePath: string): number {
  const order = resourceGroupConfig[group].order as readonly string[];
  const index = order.indexOf(relativePath);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function parseResourceDoc(relativePath: string): ResourceDoc {
  const absolutePath = path.join(resourcesDir, relativePath);
  const { data } = matter(fs.readFileSync(absolutePath, "utf-8"));
  const title = typeof data.title === "string" ? data.title : path.basename(relativePath, ".md");
  const link =
    typeof data.permalink === "string" && data.permalink.trim() ? data.permalink.trim() : getFallbackLink(relativePath);

  return {
    sourcePath: relativePath,
    relativePath: `${RESOURCE_SOURCE_PREFIX}${relativePath}`,
    title,
    link,
    rewriteTo: getRewriteTarget(link),
    group: getGroup(relativePath),
  };
}

function compareResourceDocs(a: ResourceDoc, b: ResourceDoc): number {
  if (a.group !== b.group) return 0;

  const weightDiff = getSortWeight(a.group, a.sourcePath) - getSortWeight(b.group, b.sourcePath);
  if (weightDiff !== 0) return weightDiff;

  return a.sourcePath.localeCompare(b.sourcePath, "zh-CN");
}

function readResourceDocs(): ResourceDoc[] {
  return collectMarkdownFiles(resourcesDir).map(parseResourceDoc).sort(compareResourceDocs);
}

function assertUniqueLinks(docs: ResourceDoc[]) {
  const linkToDoc = new Map<string, ResourceDoc>();
  const rewriteToDoc = new Map<string, ResourceDoc>();

  for (const doc of docs) {
    const prevLinkDoc = linkToDoc.get(doc.link);
    if (prevLinkDoc) {
      throw new Error(
        `[resources] duplicate link '${doc.link}' detected in '${prevLinkDoc.relativePath}' and '${doc.relativePath}'`
      );
    }
    linkToDoc.set(doc.link, doc);

    const prevRewriteDoc = rewriteToDoc.get(doc.rewriteTo);
    if (prevRewriteDoc) {
      throw new Error(
        `[resources] duplicate rewrite target '${doc.rewriteTo}' detected in '${prevRewriteDoc.relativePath}' and '${doc.relativePath}'`
      );
    }
    rewriteToDoc.set(doc.rewriteTo, doc);
  }
}

const resourceDocs = readResourceDocs();
assertUniqueLinks(resourceDocs);

const topLevelDocs = resourceDocs.filter(item => item.group === "root");

const makeItems = (docs: ResourceDoc[]): DefaultTheme.SidebarItem[] =>
  docs.map(item => ({
    text: item.title,
    link: item.link,
  }));

const resourceSidebarGroups = nonRootGroups.map(group => ({
  text: resourceGroupConfig[group].text,
  collapsed: resourceGroupConfig[group].collapsed,
  items: makeItems(resourceDocs.filter(item => item.group === group)),
}));

export const resourcesRewrites = Object.fromEntries(
  resourceDocs.map(item => [item.relativePath, item.rewriteTo])
) as Record<string, string>;

export const resourcesNavGroup: DefaultTheme.NavItem = {
  text: "资源库",
  activeMatch: "^/resources(/|$)",
  items: topLevelDocs.map(item => ({
    text: item.title,
    link: item.link,
  })),
};

export const resourcesSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: resourceGroupConfig.root.text,
    collapsed: resourceGroupConfig.root.collapsed,
    items: makeItems(topLevelDocs),
  },
  ...resourceSidebarGroups,
];
