import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import type { DefaultTheme } from "vitepress";

const groupConfig = {
  root: {
    text: "生态",
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

type EcosystemGroup = keyof typeof groupConfig;

interface EcosystemDoc {
  relativePath: string;
  title: string;
  link: string;
  rewriteTo: string;
  group: EcosystemGroup;
}

const configDir = path.dirname(fileURLToPath(import.meta.url));
const ecosystemDir = path.resolve(configDir, "../../ecosystem");
const groupEntries = Object.entries(groupConfig) as [EcosystemGroup, (typeof groupConfig)[EcosystemGroup]][];
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

function getGroup(relativePath: string): EcosystemGroup {
  for (const [group, config] of groupEntries) {
    if (group === "root") continue;
    if (config.prefixes.some(prefix => relativePath.startsWith(prefix))) return group;
  }
  return "root";
}

function getFallbackLink(relativePath: string): string {
  const noExt = relativePath.replace(/\.md$/i, "");
  const withoutIndex = noExt.replace(/\/index$/i, "");
  return `/ecosystem/${withoutIndex}`;
}

function getRewriteTarget(link: string): string {
  const normalized = link.replace(/^\/+/, "");
  return `${normalized}.md`;
}

function getSortWeight(group: EcosystemGroup, relativePath: string): number {
  const order = groupConfig[group].order as readonly string[];
  const index = order.indexOf(relativePath);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function readEcosystemDocs(): EcosystemDoc[] {
  return collectMarkdownFiles(ecosystemDir)
    .map(relativePath => {
      const absolutePath = path.join(ecosystemDir, relativePath);
      const { data } = matter(fs.readFileSync(absolutePath, "utf-8"));
      const title = typeof data.title === "string" ? data.title : path.basename(relativePath, ".md");
      const link =
        typeof data.permalink === "string" && data.permalink.trim()
          ? data.permalink.trim()
          : getFallbackLink(relativePath);

      return {
        relativePath: `ecosystem/${relativePath}`,
        title,
        link,
        rewriteTo: getRewriteTarget(link),
        group: getGroup(relativePath),
      };
    })
    .sort((a, b) => {
      if (a.group !== b.group) return 0;

      const weightDiff =
        getSortWeight(a.group, a.relativePath.replace(/^ecosystem\//, "")) -
        getSortWeight(b.group, b.relativePath.replace(/^ecosystem\//, ""));
      if (weightDiff !== 0) return weightDiff;

      return a.relativePath.localeCompare(b.relativePath, "zh-CN");
    });
}

function assertUniqueLinks(docs: EcosystemDoc[]) {
  const linkToDoc = new Map<string, EcosystemDoc>();
  const rewriteToDoc = new Map<string, EcosystemDoc>();

  for (const doc of docs) {
    const prevLinkDoc = linkToDoc.get(doc.link);
    if (prevLinkDoc) {
      throw new Error(
        `[ecosystem] duplicate link '${doc.link}' detected in '${prevLinkDoc.relativePath}' and '${doc.relativePath}'`
      );
    }
    linkToDoc.set(doc.link, doc);

    const prevRewriteDoc = rewriteToDoc.get(doc.rewriteTo);
    if (prevRewriteDoc) {
      throw new Error(
        `[ecosystem] duplicate rewrite target '${doc.rewriteTo}' detected in '${prevRewriteDoc.relativePath}' and '${doc.relativePath}'`
      );
    }
    rewriteToDoc.set(doc.rewriteTo, doc);
  }
}

const ecosystemDocs = readEcosystemDocs();
assertUniqueLinks(ecosystemDocs);

const topLevelDocs = ecosystemDocs.filter(item => item.group === "root");

const makeItems = (docs: EcosystemDoc[]): DefaultTheme.SidebarItem[] =>
  docs.map(item => ({
    text: item.title,
    link: item.link,
  }));

export const ecosystemRewrites = Object.fromEntries(
  ecosystemDocs.map(item => [item.relativePath, item.rewriteTo])
) as Record<string, string>;

export const ecosystemNavGroup: DefaultTheme.NavItem = {
  text: "生态",
  activeMatch: "^/ecosystem(/|$)",
  items: topLevelDocs.map(item => ({
    text: item.title,
    link: item.link,
  })),
};

export const ecosystemSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: groupConfig.root.text,
    collapsed: groupConfig.root.collapsed,
    items: makeItems(topLevelDocs),
  },
  ...nonRootGroups.map(group => ({
    text: groupConfig[group].text,
    collapsed: groupConfig[group].collapsed,
    items: makeItems(ecosystemDocs.filter(item => item.group === group)),
  })),
];
