// 文章的侧边导航：写的markdown文档要配置 文章的标题和路径链接

// 左边侧栏导航
export default {
  "/": [
    {
      text: "Base",
      collapsed: true, // 初始不折叠
      items: [
        { text: "技术清单", link: "/view/Js/home" },
        { text: "Array的方法简单整理", link: "/view/Js/array" },
        { text: "Object的方法简单整理", link: "view/Js/object" },
        { text: "String的方法简单整理", link: "view/Js/string" },
        { text: "Date时间", link: "/view/Js/date" },
        { text: "RegExp正则", link: "/view/Js/reg" },
        { text: "CSS使用锦囊", link: "/view/Css/css" },
        { text: "自定义事件", link: "/view/Js/dispatchEvent" },
        { text: "for in和for of区别", link: "/view/Js/for-in-for-of" },
        { text: "ES6-新增特性一览", link: "/view/Js/es6" },
        { text: "Event-Loop", link: "/view/Js/eventloop" },
        { text: "Promise & async", link: "/view/Js/promise" },
        { text: "Web Worker", link: "/view/Js/webWorker" },
        { text: "WebSocket & socket.io", link: "/view/Js/socket" },
        { text: "shell & ssh", link: "/view/Project/linux" },
        { text: "yarn & npm", link: "/view/Project/yarn" },
        { text: "堆内存 & 栈内存", link: "/view/Js/heap_stack" },
        { text: "Fetch和Axios的区别", link: "/view/Js/xhr" },
        { text: "JS设计模式探索", link: "/view/Js/design-pattern" },
        { text: "输入URL背后的技术步骤", link: "/view/Js/http-base" },
        { text: "原型与原型链", link: "/view/Js/extends" },
        { text: "leetCode", link: "/view/Project/leetcode" }
      ]
    },

    {
      text: "Project",
      collapsed: true, // 初始不折叠
      items: [
        { text: "用到的方法", link: "/view/Project/method" },
        { text: "简易封装Cookie", link: "/view/Project/cookie" },
        { text: "toFixed方法的bug", link: "/view/Project/toFixed" },
        { text: "实现JS复制内容到剪贴板", link: "/view/Project/copy" },
        { text: "全屏实现方案", link: "/view/Project/screenfull" },
        { text: "base64上传七云获取key", link: "/view/Project/qiyunniu" },
        { text: "聊一聊前端换肤", link: "/view/Js/theme" },
        { text: "JS添加水印功能", link: "/view/Js/water-mask" },
        { text: "Axios 获取文件流导出 excel 表格", link: "/view/Js/export" },
        { text: "会用到的插件", link: "/view/Project/more" }
      ]
    },

    {
      text: "FE框架",
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "☞ vue",
          collapsed: true,
          sidebarDepth: 4,
          items: [
            { text: "vue基本用法", link: "view/Frame/vue/vue" },
            // { text: "会用到的插件", link: "view/Frame/vue/use-project" },
            { text: "vue中使用JSX", link: "view/Frame/vue/jsx" },
            { text: "脚手架vue-cli", link: "view/Frame/vue/vue-cli" },
            { text: "问题验证解析", link: "view/Frame/vue/problem" },
            { text: "Vue预渲染", link: "view/Frame/vue/prerender" },
            {
              text: "踩坑记录",
              collapsed: true,
              items: [{text: "使用keepAlive遇到的坑",link: "view/Frame/vue/keep-alive"}]
            },
            {
              text: "使用拓展",
              collapsed: true,
              items: [
                {text: "vue之JSX封装table",link: "view/Frame/vue/table-jsx"},
                {text: "Element-UI ，Table组件实现拖拽效果",link: "view/Frame/vue/sortable"},
                {text: "Vue之JSX封装搜索头部",link: "view/Frame/vue/with-search"},
                {text: "封装树形菜单",link: "view/Frame/vue/tree-menu"},
                {text: "基于Vue的组件局部刷新",link: "view/Frame/vue/reload"}
              ]
            },
            {
              text: "源码分析",
              collapsed: true,
              items: [
                {text: "vue3.0源码分析-1",link: "view/Frame/vue/next/reactivity"},
                {text: "Vue3.0源码分析-2",link: "view/Frame/vue/vue-next"},
                {text: "Vue之JSX封装搜索头部",link: "view/Frame/vue/error-handler"},
                {text: "封装树形菜单",link: "view/Frame/vue/source-code/keep-alive"},
                {text: "基于Vue的组件局部刷新",link: "view/Frame/vue/source-code/vue-extend"},
              ]
            },
            {
              text: "UI组件库",
              collapsed: true,
              items: [
                {text: "irdd 组件库",link: "view/Frame/irdd/irdd"}
              ]
            }
          ]
        },

        {
          text: '☞ react',
          collapsed: true,
          items: [
            {text: "React基本用法",link: "view/Frame/react/react"},
            {text: "Hooks",link: "view/Frame/react/react-hooks"},
            {text: "Immer",link: "view/Frame/react/immer"},
            // {text: "",link: "view/Frame/react/reactComponent"},
            {text: "Router原理",link: "view/Frame/react/react-router"},
            {text: "Redux源码解析",link: "view/Frame/react/react-redux"},
            {text: "Dva封装",link: "view/Frame/react/dva"},
            {text: "react事件委托机制",link: "view/Frame/react/event"},
            {text: "React16 Fiber",link: "view/Frame/react/fiber"},
            {text: "VirtualDOM",link: "view/Frame/react/dom_diff"},
            {text: "React-SSR",link: "view/Frame/react/ssr"},
            {text: "问题验证解析",link: "view/Frame/react/problem"}
          ]
        },

        {
          text: '☞ taro',
          collapsed: true,
          items: [
            // {text: "Taro基本用法",link: "view/Frame/taro/taroBase"},
            {text: "Taro一些配置",link: "view/Frame/taro/taroAdvanced"},
            {text: "Node生成模板",link: "view/Frame/taro/template"},
            {text: "项目目录",link: "view/Frame/taro/toc"}
          ]
        },

        {
          text: '☞ react-native',
          collapsed: true,
          items: [
            {text: "RN基本用法",link: "view/Frame/react-native/guide"},
            {text: "RN IOS环境搭建",link: "view/Frame/react-native/base"},
            {text: "XCODE模拟器报错修复",link: "view/Frame/react-native/bug"}
          ]
        },

        {
          text: '☞ 单元测试',
          collapsed: true,
          items: [
            {text: "单元测试框架Jest学习总结",link: "view/Frame/unit-test/jest"}
          ]
        }

      ]
    },

    {
      text: "Server",
      collapsed: true, // 初始不折叠
      items: [
        {
          text: '☞ NodeJS',
          collapsed: true,
          items: [
            { text: "NodeJs的原生方法", link: "view/Server/node/base" },
            { text: "Koa2", link: "view/Server/node/node-1" },
            { text: "NodeJs 插件拓展", link: "view/Server/node/node-2" },
            { text: "Node启动工具", link: "view/Server/node/pm2" },
            { text: "终端实现console输出不同颜色", link: "view/Server/node/node-console" }
          ]
        },

        {
          text: '☞ Mongoose',
          collapsed: true,
          items: [
            { text: "Mongodb安装", link: "view/Server/sql/mongodb" },
            { text: "Mongoose使用", link: "view/Server/sql/mongoose" }
          ]
        },

        {
          text: '☞ Nginx',
          collapsed: true,
          items: [
            { text: "Mongodb安装", link: "view/Server/nginx/nginx_base" },
            { text: "Mongoose使用", link: "view/Server/nginx/nginx_local" }
          ]
        },

        { text: "云服务器配置", link: "view/Server/lnmp" },
        { text: "什么是cookie,token和session?它们之间有什么关系？", link: "view/Server/token" }
      ]
    },

    {
      text: "TypeScript",
      collapsed: true, // 初始不折叠
      items: [
        { text: "TypeScript", link: "view/Typescript/ts" },
        { text: "TypeScr 误区", link: "view/Typescript/ts-object-type-interface.md" },
        { text: "tsconfig了解一下", link: "view/Typescript/tsConfig" },
        // { text: "", link: "view/Typescript/use" },
      ]
    },

    {
      text: "构建工具 ",
      collapsed: true, // 初始不折叠
      items: [
        {
          text: '☞ webpack',
          collapsed: true,
          items: [
            { text: "Webpack4 配置详解", link: "view/Webpack/webpack" },
            { text: "Webpack的使用", link: "view/Webpack/use" },
            { text: "Babel-polyfill", link: "view/Webpack/babel_polyfill" }
          ]
        },

        {
          text: '☞ gulp',
          collapsed: true,
          items: [
            { text: "gulp", link: "view/Gulp/base" }
          ]
        },

        {
          text: '☞ rollup',
          collapsed: true,
          items: [
            { text: "rollup", link: "view/Rollup/base" }
          ]
        },

        {
          text: '☞ snowpack',
          collapsed: true,
          items: [
            { text: "rollup", link: "view/Snowpack/base" }
          ]
        },

        {
          text: '☞ vite',
          collapsed: true,
          items: [
            { text: "vite", link: "view/Vite/base" }
          ]
        }
      ]
    },

    {
      text: "Git教程",
      collapsed: true, // 初始不折叠
      items: [
        { text: "git基础", link: "view/Git/git" },
        { text: "git恢复上一次的修改", link: "view/Git/git-cherry" },
        { text: "git hooks", link: "view/Git/git-hooks" },
        { text: "github API 调用", link: "view/Git/github" }
      ]
    },

    {
      text: "Other",
      collapsed: true, // 初始不折叠
      items: [
        { text: "Jenkins自动化部署", link: "view/Jenkins/base" },
        { text: "MAC整理", link: "tools/mac" },
        { text: "开发工具", link: "tools/store" },
        { text: "网站大全", link: "tools/page" },
        { text: "配置WS", link: "other/ws-configure" },
        { text: "习题解答", link: "view/Interviews/result" },
      ]
    }
  ]
}
