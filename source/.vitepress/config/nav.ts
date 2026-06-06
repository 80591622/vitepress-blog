import type { DefaultTheme } from "vitepress";

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
