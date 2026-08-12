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
          { text: "Mongodb安装", link: "/workspace/Server/database/mongodb" },
          { text: "Mongoose使用", link: "/workspace/Server/database/mongoose" },
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
      {
        text: "☞ Java",
        collapsed: false,
        items: [
          { text: "JDK 安装与版本切换", link: "/workspace/Server/java/base/jdk-install" },
          { text: "Java 基础语法", link: "/workspace/Server/java/base/java-basic" },
          { text: "Spring 基础", link: "/workspace/Server/java/spring/spring-base" },
          { text: "Spring Boot 快速开始", link: "/workspace/Server/java/spring-boot/quick-start" },
          { text: "MyBatis 基础", link: "/workspace/Server/java/persistence/mybatis" },
          { text: "用户系统实战", link: "/workspace/Server/java/project/user-system" },
          { text: "Java 八股整理", link: "/workspace/Server/java/interview/java-baguwen" },
        ],
      },
      {
        text: "☞ Auth",
        collapsed: true,
        items: [{ text: "什么是cookie,token和session?它们之间有什么关系？", link: "/workspace/Server/auth/token" }],
      },
      {
        text: "☞ Deploy",
        collapsed: true,
        items: [{ text: "云服务器配置", link: "/workspace/Server/deploy/lnmp" }],
      },
    ],
  },
];
