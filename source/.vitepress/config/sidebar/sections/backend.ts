import type { DefaultTheme } from "vitepress";

export const backendSidebarSection: DefaultTheme.SidebarItem[] = [
  {
    text: "Server",
    collapsed: true,
    items: [
      {
        text: "☞ NodeJS",
        collapsed: false,
        items: [
          { text: "NodeJs的原生方法", link: "/workspace/Server/node/base" },
          { text: "Koa2", link: "/workspace/Server/node/node-1" },
          { text: "NodeJs 插件拓展", link: "/workspace/Server/node/node-2" },
          { text: "Node启动工具", link: "/workspace/Server/node/pm2" },
          { text: "终端实现console输出不同颜色", link: "/workspace/Server/node/node-console" },
        ],
      },
      {
        text: "☞ Mongoose",
        collapsed: true,
        items: [
          { text: "Mongodb安装", link: "/workspace/Server/sql/mongodb" },
          { text: "Mongoose使用", link: "/workspace/Server/sql/mongoose" },
        ],
      },
      {
        text: "☞ Nginx",
        collapsed: true,
        items: [
          { text: "Nginx的使用指南", link: "/workspace/Server/nginx/nginx_base" },
          { text: "安装Nginx踩到的坑", link: "/workspace/Server/nginx/nginx_local" },
        ],
      },
      { text: "云服务器配置", link: "/workspace/Server/lnmp" },
      { text: "什么是cookie,token和session?它们之间有什么关系？", link: "/workspace/Server/token" },
    ],
  },
];
