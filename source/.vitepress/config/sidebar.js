// 文章的侧边导航：写的markdown文档要配置 文章的标题和路径链接

// 左边侧栏导航
export default {
  "/": [
    {
      text: "Base",
      collapsed: false, // 初始不折叠
      items: [
        // { text: "前端知识图谱", link: "/workspace/Js/frontend-map" },
        { text: "技术清单", link: "/workspace/Js/home" },
        { text: "Array的方法简单整理", link: "/workspace/Js/array" },
        { text: "Object的方法简单整理", link: "/workspace/Js/object" },
        { text: "String的方法简单整理", link: "/workspace/Js/string" },
        { text: "Date时间", link: "/workspace/Js/date" },
        { text: "RegExp正则", link: "/workspace/Js/reg" },
        { text: "CSS使用锦囊", link: "/workspace/Css/css" },
        // { text: "九宫格实现", link: "/workspace/Css/lattice" },
        { text: "自定义事件", link: "/workspace/Js/dispatchEvent" },
        { text: "for in和for of区别", link: "/workspace/Js/for-in-for-of" },
        { text: "ES6-新增特性一览", link: "/workspace/Js/es6" },
        { text: "Event-Loop", link: "/workspace/Js/eventloop" },
        { text: "Promise & async", link: "/workspace/Js/promise" },
        { text: "Web Worker", link: "/workspace/Js/webWorker" },
        { text: "WebSocket & socket.io", link: "/workspace/Js/socket" },
        { text: "shell & ssh", link: "/workspace/Project/linux" },
        { text: "yarn & npm", link: "/workspace/Project/yarn" },
        { text: "堆内存 & 栈内存", link: "/workspace/Js/heap_stack" },
        { text: "Fetch和Axios的区别", link: "/workspace/Js/xhr" },
        { text: "JS设计模式探索", link: "/workspace/Js/design-pattern" },
        { text: "浏览器渲染原理", link: "/workspace/Js/http-base" },
        { text: "原型与原型链", link: "/workspace/Js/extends" },
        { text: "leetCode", link: "/workspace/Project/leetcode" }
      ]
    },

    {
      text: "Project",
      collapsed: true, // 初始不折叠
      items: [
        { text: "用到的方法", link: "/workspace/Project/method" },
        { text: "简易封装Cookie", link: "/workspace/Project/cookie" },
        { text: "toFixed方法的bug", link: "/workspace/Project/toFixed" },
        { text: "实现JS复制内容到剪贴板", link: "/workspace/Project/copy" },
        { text: "全屏实现方案", link: "/workspace/Project/screenfull" },
        { text: "base64上传七云获取key", link: "/workspace/Project/qiyunniu" },
        { text: "聊一聊前端换肤", link: "/workspace/Js/theme" },
        { text: "JS添加水印功能", link: "/workspace/Js/water-mask" },
        { text: "Axios 获取文件流导出 excel 表格", link: "/workspace/Js/export" },
        { text: "会用到的插件", link: "/workspace/Project/more" },
        { text: "首屏性能优化", link: "/workspace/Project/perf-opt" },
      ]
    },

    {
      text: "FE框架",
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "☞ vue",
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
              items: [
                {text: "使用keepAlive遇到的坑",link: "/workspace/Frame/vue/keep-alive"}
              ]
            },
            {
              text: "使用拓展",
              collapsed: true,
              items: [
                {text: "vue之JSX封装table",link: "/workspace/Frame/vue/table-jsx"},
                {text: "Element-UI ，Table组件实现拖拽效果",link: "/workspace/Frame/vue/sortable"},
                {text: "Vue之JSX封装搜索头部",link: "/workspace/Frame/vue/with-search"},
                {text: "封装树形菜单",link: "/workspace/Frame/vue/tree-menu"},
                {text: "基于Vue的组件局部刷新",link: "/workspace/Frame/vue/reload"}
              ]
            },
            {
              text: "源码分析",
              collapsed: true,
              items: [
                {text: "vue3.0源码分析-1",link: "/workspace/Frame/vue/next/reactivity"},
                {text: "Vue3.0源码分析-2",link: "/workspace/Frame/vue/vue-next"},
                {text: "Vue之JSX封装搜索头部",link: "/workspace/Frame/vue/error-handler"},
                {text: "封装树形菜单",link: "/workspace/Frame/vue/source-code/keep-alive"},
                {text: "基于Vue的组件局部刷新",link: "/workspace/Frame/vue/source-code/vue-extend"},
              ]
            },
            {
              text: "UI组件库",
              collapsed: true,
              items: [
                {text: "irdd 组件库",link: "/workspace/Frame/irdd/irdd"}
              ]
            }
          ]
        },

        {
          text: '☞ react',
          collapsed: true,
          items: [
            {text: "React错误处理",link: "/workspace/Frame/react/reactErr-handle"},
            {text: "React最佳实践",link: "/workspace/Frame/react/react-best-practices"},
            {text: "React基本用法",link: "/workspace/Frame/react/react"},
            {text: "Hooks",link: "/workspace/Frame/react/react-hooks"},
            {text: "Immer",link: "/workspace/Frame/react/immer"},
            // {text: "",link: "workspace/Frame/react/reactComponent"},
            {text: "Router原理",link: "/workspace/Frame/react/react-router"},
            {text: "Redux源码解析",link: "/workspace/Frame/react/react-redux"},
            {text: "Dva封装",link: "/workspace/Frame/react/dva"},
            {text: "react事件委托机制",link: "/workspace/Frame/react/event"},
            {text: "React16 Fiber",link: "/workspace/Frame/react/fiber"},
            {text: "VirtualDOM",link: "/workspace/Frame/react/dom_diff"},
            {text: "React-SSR",link: "/workspace/Frame/react/ssr"},
            {text: "问题验证解析",link: "/workspace/Frame/react/problem"}
          ]
        },

        {
          text: '☞ taro',
          collapsed: true,
          items: [
            {text: "Taro基本用法",link: "/workspace/Frame/taro/taroBase"},
            {text: "Taro一些配置",link: "/workspace/Frame/taro/taroAdvanced"},
            {text: "Node生成模板",link: "/workspace/Frame/taro/template"},
            {text: "项目目录",link: "/workspace/Frame/taro/toc"}
          ]
        },

        {
          text: '☞ react-native',
          collapsed: true,
          items: [
            {text: "RN基本用法",link: "/workspace/Frame/react-native/guide"},
            {text: "RN IOS环境搭建",link: "/workspace/Frame/react-native/base"},
            {text: "XCODE模拟器报错修复",link: "/workspace/Frame/react-native/bug"}
          ]
        },

        {
          text: '☞ Micro-Fe',
          collapsed: true,
          items: [
            {text: "微前端方案",link: "/workspace/Frame/micro-app/mic"},
            {text: "微前端总结",link: "/workspace/Frame/micro-app/micro-summary"},
          ]
        },

        {
          text: '☞ 单元测试',
          collapsed: true,
          items: [
            {text: "单元测试框架Jest学习总结",link: "/workspace/Frame/unit-test/jest"}
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
          collapsed: false,
          items: [
            { text: "NodeJs的原生方法", link: "/workspace/Server/node/base" },
            { text: "Koa2", link: "/workspace/Server/node/node-1" },
            { text: "NodeJs 插件拓展", link: "/workspace/Server/node/node-2" },
            { text: "Node启动工具", link: "/workspace/Server/node/pm2" },
            { text: "终端实现console输出不同颜色", link: "/workspace/Server/node/node-console" }
          ]
        },

        {
          text: '☞ Mongoose',
          collapsed: true,
          items: [
            { text: "Mongodb安装", link: "/workspace/Server/sql/mongodb" },
            { text: "Mongoose使用", link: "/workspace/Server/sql/mongoose" }
          ]
        },

        {
          text: '☞ Nginx',
          collapsed: true,
          items: [
            { text: "Nginx的使用指南", link: "/workspace/Server/nginx/nginx_base" },
            { text: "安装Nginx踩到的坑", link: "/workspace/Server/nginx/nginx_local" }
          ]
        },

        { text: "云服务器配置", link: "/workspace/Server/lnmp" },
        { text: "什么是cookie,token和session?它们之间有什么关系？", link: "/workspace/Server/token" }
      ]
    },

    {
      text: "TypeScript",
      collapsed: true, // 初始不折叠
      items: [
        { text: "TypeScript", link: "/workspace/Typescript/ts" },
        { text: "TypeScr 误区", link: "/workspace/Typescript/ts-object-type-interface.md" },
        { text: "tsconfig了解一下", link: "/workspace/Typescript/tsConfig" },
        // { text: "", link: "workspace/Typescript/use" },
      ]
    },

    {
      text: "构建工具 ",
      collapsed: true, // 初始不折叠
      items: [
        {
          text: '☞ webpack',
          collapsed: false,
          items: [
            { text: "Webpack4 配置详解", link: "/workspace/Webpack/webpack" },
            { text: "Webpack的使用", link: "/workspace/Webpack/use" },
            { text: "babel_polyfill", link: "/workspace/Webpack/babel_polyfill" }
          ]
        },

        {
          text: '☞ gulp',
          collapsed: true,
          items: [
            { text: "gulp", link: "/workspace/Gulp/base" }
          ]
        },

        {
          text: '☞ rollup',
          collapsed: true,
          items: [
            { text: "rollup", link: "/workspace/Rollup/base" }
          ]
        },

        {
          text: '☞ snowpack',
          collapsed: true,
          items: [
            { text: "snowpack", link: "/workspace/Snowpack/base" }
          ]
        },

        {
          text: '☞ vite',
          collapsed: true,
          items: [
            { text: "vite", link: "/workspace/Vite/base" }
          ]
        }
      ]
    },

    {
      text: "Git教程",
      collapsed: true, // 初始不折叠
      items: [
        { text: "git基础", link: "/workspace/Git/git" },
        { text: "git恢复上一次的修改", link: "/workspace/Git/git-cherry" },
        { text: "git hooks", link: "/workspace/Git/git-hooks" },
        { text: "github API 调用", link: "/workspace/Git/github" }
      ]
    },

    {
      text: "Other",
      collapsed: true, // 初始不折叠
      items: [
        { text: "Jenkins自动化部署", link: "/workspace/Jenkins/base" },
        { text: "MAC整理", link: "/tools/mac" },
        { text: "开发工具", link: "/tools/store" },
        { text: "网站大全", link: "/tools/page" },
        { text: "配置WS", link: "/other/ws-configure" },
        { text: "习题解答", link: "/workspace/Interviews/result" },
      ]
    }
  ]
}
