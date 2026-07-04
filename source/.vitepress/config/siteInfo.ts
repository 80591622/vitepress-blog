import type { DefaultTheme } from "vitepress";

export const siteProfile = {
  title: "TimeByte",
  description: "软件开发计：开发文档和开发计划，完成功能工具，和待开发的功能和工具",
  logo: "/img/clock.png",
  author: {
    name: "TimeByte",
    link: "https://github.com/80591622",
  },
  copyright: {
    createYear: 2024,
    suffix: "TimeByte",
    footerMessage: "Copyright © 2024",
    icpLink: "https://beian.miit.gov.cn/",
    icpText: "京 ICP 备 18059340 号",
  },
  github: {
    profile: "https://github.com/80591622",
    repo: "https://github.com/80591622/vitepress-blog",
    editPattern: "https://github.com/80591622/vitepress-blog/edit/master/source/:path",
  },
} as const;

export const featurePageLinks: DefaultTheme.NavItemWithLink[] = [
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
];

export const commonNavLinks: DefaultTheme.NavItemWithLink[] = [
  { text: "Vue", link: "/workspace/Frame/vue/vue" },
  { text: "React", link: "/workspace/Frame/react/react" },
  { text: "Taro", link: "/workspace/Frame/taro/taroBase" },
  { text: "谷歌", link: "https://google.com" },
];

export const socialLinkItems: DefaultTheme.SocialLink[] = [
  {
    icon: "github",
    link: siteProfile.github.profile,
  },
];
