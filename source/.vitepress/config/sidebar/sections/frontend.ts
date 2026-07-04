import type { DefaultTheme } from "vitepress";

export const frontendSidebarSection: DefaultTheme.SidebarItem[] = [
  {
    text: "FE框架",
    collapsed: true,
    items: [
      {
        text: "☞ Vue",
        collapsed: false,
        items: [
          { text: "vue基本用法", link: "/workspace/Frame/vue/vue" },
          // { text: "会用到的插件", link: "workspace/Frame/vue/use-project" },
          { text: "vue中使用JSX", link: "/workspace/Frame/vue/jsx" },
          { text: "脚手架vue-cli", link: "/workspace/Frame/vue/vue-cli" },
          { text: "问题验证解析", link: "/workspace/Frame/vue/problem" },
          { text: "Vue预渲染", link: "/workspace/Frame/vue/prerender" },
          {
            text: "踩坑记录",
            collapsed: true,
            items: [{ text: "使用keepAlive遇到的坑", link: "/workspace/Frame/vue/keep-alive" }],
          },
          {
            text: "使用拓展",
            collapsed: true,
            items: [
              { text: "vue之JSX封装table", link: "/workspace/Frame/vue/table-jsx" },
              { text: "Element-UI ，Table组件实现拖拽效果", link: "/workspace/Frame/vue/sortable" },
              { text: "Vue之JSX封装搜索头部", link: "/workspace/Frame/vue/with-search" },
              { text: "封装树形菜单", link: "/workspace/Frame/vue/tree-menu" },
              { text: "基于Vue的组件局部刷新", link: "/workspace/Frame/vue/reload" },
            ],
          },
          {
            text: "源码分析",
            collapsed: true,
            items: [
              { text: "vue3.0源码分析-1", link: "/workspace/Frame/vue/next/reactivity" },
              { text: "Vue3.0源码分析-2", link: "/workspace/Frame/vue/vue-next" },
              { text: "错误机制", link: "/workspace/Frame/vue/error-handler" },
              { text: "keep-alive源码分析", link: "/workspace/Frame/vue/source-code/keep-alive" },
              { text: "全局挂载组件之Vue.extend", link: "/workspace/Frame/vue/source-code/vue-extend" },
            ],
          },
          {
            text: "UI组件库",
            collapsed: true,
            items: [{ text: "irdd 组件库", link: "/workspace/Frame/irdd/irdd" }],
          },
        ],
      },
      {
        text: "☞ React",
        collapsed: true,
        items: [
          { text: "React错误处理", link: "/workspace/Frame/react/reactErr-handle" },
          { text: "React最佳实践", link: "/workspace/Frame/react/react-best-practices" },
          { text: "React基本用法", link: "/workspace/Frame/react/react" },
          { text: "Hooks", link: "/workspace/Frame/react/react-hooks" },
          { text: "Immer", link: "/workspace/Frame/react/immer" },
          // {text: "",link: "workspace/Frame/react/reactComponent"},
          { text: "Router原理", link: "/workspace/Frame/react/react-router" },
          { text: "Redux源码解析", link: "/workspace/Frame/react/react-redux" },
          { text: "Dva封装", link: "/workspace/Frame/react/dva" },
          { text: "react事件委托机制", link: "/workspace/Frame/react/event" },
          { text: "React16 Fiber", link: "/workspace/Frame/react/fiber" },
          { text: "VirtualDOM", link: "/workspace/Frame/react/dom_diff" },
          { text: "React-SSR", link: "/workspace/Frame/react/ssr" },
          { text: "问题验证解析", link: "/workspace/Frame/react/problem" },
        ],
      },
      {
        text: "☞ Taro",
        collapsed: true,
        items: [
          { text: "Taro基本用法", link: "/workspace/Frame/taro/taroBase" },
          { text: "Taro一些配置", link: "/workspace/Frame/taro/taroAdvanced" },
          { text: "Node生成模板", link: "/workspace/Frame/taro/template" },
          { text: "项目目录", link: "/workspace/Frame/taro/toc" },
        ],
      },
      {
        text: "☞ React Native",
        collapsed: true,
        items: [
          { text: "RN基本用法", link: "/workspace/Frame/react-native/guide" },
          { text: "RN IOS环境搭建", link: "/workspace/Frame/react-native/base" },
          { text: "XCODE模拟器报错修复", link: "/workspace/Frame/react-native/bug" },
        ],
      },
      {
        text: "☞ 微前端",
        collapsed: true,
        items: [
          { text: "微前端方案", link: "/workspace/Frame/micro-app/mic" },
          { text: "微前端总结", link: "/workspace/Frame/micro-app/micro-summary" },
        ],
      },
      {
        text: "☞ 单元测试",
        collapsed: true,
        items: [{ text: "单元测试框架Jest学习总结", link: "/workspace/Frame/unit-test/jest" }],
      },
    ],
  },
];
