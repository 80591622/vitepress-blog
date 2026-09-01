import type { DefaultTheme } from "vitepress";

export const javaSidebarSection: DefaultTheme.SidebarItem[] = [
  {
    text: "Java",
    collapsed: false,
    items: [
      {
        text: "入门与基础",
        collapsed: false,
        items: [
          { text: "JDK 安装与版本切换", link: "/workspace/Java/base/jdk-install" },
          { text: "二进制与数据存储", link: "/workspace/Java/base/computer-principles" },
          { text: "Java 数据类型与变量", link: "/workspace/Java/base/java-basic" },
        ],
      },
      {
        text: "框架",
        collapsed: false,
        items: [
          { text: "Spring 基础", link: "/workspace/Java/spring/spring-base" },
          { text: "Spring Boot 快速开始", link: "/workspace/Java/spring-boot/quick-start" },
        ],
      },
      {
        text: "数据访问",
        collapsed: false,
        items: [{ text: "MyBatis 基础", link: "/workspace/Java/persistence/mybatis" }],
      },
      {
        text: "项目与复习",
        collapsed: true,
        items: [
          { text: "用户系统实战", link: "/workspace/Java/project/user-system" },
          { text: "Java 八股整理", link: "/workspace/Java/interview/java-baguwen" },
        ],
      },
    ],
  },
];
