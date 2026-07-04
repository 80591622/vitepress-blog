import type { DefaultTheme } from "vitepress";

const LOCAL_SEARCH_EXCLUDED_PREFIXES = ["some/path"];

const localSearchTranslations = {
  button: {
    buttonText: "搜索文档",
    buttonAriaLabel: "搜索文档",
  },
  modal: {
    noResultsText: "无法找到相关结果",
    displayDetails: "显示详细信息",
    resetButtonTitle: "清除查询条件",
    backButtonTitle: "返回搜索结果",
    footer: {
      selectText: "选择",
      selectKeyAriaLabel: "enter",
      navigateText: "切换",
      navigateUpKeyAriaLabel: "up arrow",
      navigateDownKeyAriaLabel: "down arrow",
      closeText: "关闭",
      closeKeyAriaLabel: "escape",
    },
  },
} as const;

function shouldSkipSearchIndex(relativePath: string, frontmatter?: Record<string, unknown>) {
  if (frontmatter?.search === false) return true;
  return LOCAL_SEARCH_EXCLUDED_PREFIXES.some(prefix => relativePath.startsWith(prefix));
}

function renderSearchHtml(
  src: string,
  env: Record<string, any>,
  md: { render: (source: string, env: unknown) => string }
) {
  if (shouldSkipSearchIndex(env.relativePath, env.frontmatter)) return "";
  // 不要前置再渲染 `# title`：正文已有标题时会与 frontmatter.title 生成重复锚点，触发 local search 构建失败
  return md.render(src, env);
}

const search = {
  provider: "local",
  options: {
    locales: {
      root: {
        translations: localSearchTranslations,
      },
    },
    _render: renderSearchHtml,
    miniSearch: {
      options: {},
      searchOptions: {},
    },
  },
} satisfies Extract<NonNullable<DefaultTheme.Config["search"]>, { provider: "local" }>;

export default search;
