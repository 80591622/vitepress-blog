import type { DefaultTheme } from "vitepress";

/** 站点首页绝对地址（风险链接页的 `target` 须经 Teek `isValidURL`，不能用相对路径 `/`） */
const SITE_HOME = "https://www.wkdev.cn/";

const nav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text: "功能页",
    items: [
      { text: "归档", link: "/archives" },
      { text: "清单页", link: "/articleOverview" },
      {
        text: "分类",
        link: "/categories",
        /** Teek 分类详情为 /categories/xxx，需正则匹配否则下拉项高亮与展开态异常 */
        activeMatch: "^/categories(/|$)",
      },
      {
        text: "标签",
        link: "/tags",
        activeMatch: "^/tags(/|$)",
      },
      {
        text: "风险链接提示",
        link: `/risk-link?target=${encodeURIComponent(SITE_HOME)}`,
      },
    ],
  },
  {
    text: "常用链接",
    items: [
      { text: "Vue", link: "/workspace/Frame/vue/vue" },
      { text: "React", link: "/workspace/Frame/react/react" },
      { text: "Taro", link: "/workspace/Frame/taro/taroBase" },
      { text: " 谷歌", link: "https://google.com" },
    ],
  },
];

export default nav;
