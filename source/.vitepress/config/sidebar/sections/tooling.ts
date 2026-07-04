import type { DefaultTheme } from "vitepress";

export const toolingSidebarSection: DefaultTheme.SidebarItem[] = [
  {
    text: "TypeScript",
    collapsed: true,
    items: [
      { text: "TypeScript", link: "/workspace/Typescript/ts" },
      { text: "TypeScr 误区", link: "/workspace/Typescript/ts-object-type-interface" },
      { text: "tsconfig了解一下", link: "/workspace/Typescript/tsConfig" },
      // { text: "", link: "workspace/Typescript/use" },
    ],
  },
  {
    text: "Plugin",
    collapsed: true,
    items: [{ text: "会用到的插件", link: "/workspace/Project/more" }],
  },
  {
    text: "构建工具",
    collapsed: true,
    items: [
      {
        text: "☞ webpack",
        collapsed: false,
        items: [
          { text: "Webpack4 配置详解", link: "/workspace/Webpack/webpack" },
          { text: "Webpack的使用", link: "/workspace/Webpack/use" },
          { text: "babel_polyfill", link: "/workspace/Webpack/babel_polyfill" },
        ],
      },
      {
        text: "☞ gulp",
        collapsed: true,
        items: [{ text: "gulp", link: "/workspace/Gulp/base" }],
      },
      {
        text: "☞ rollup",
        collapsed: true,
        items: [{ text: "rollup", link: "/workspace/Rollup/base" }],
      },
      {
        text: "☞ snowpack",
        collapsed: true,
        items: [{ text: "snowpack", link: "/workspace/Snowpack/base" }],
      },
      {
        text: "☞ vite",
        collapsed: true,
        items: [{ text: "vite", link: "/workspace/Vite/base" }],
      },
    ],
  },
  {
    text: "Git教程",
    collapsed: true,
    items: [
      { text: "git基础", link: "/workspace/Git/git" },
      { text: "git恢复上一次的修改", link: "/workspace/Git/git-cherry" },
      { text: "git hooks", link: "/workspace/Git/git-hooks" },
      { text: "github API 调用", link: "/workspace/Git/github" },
    ],
  },
];
