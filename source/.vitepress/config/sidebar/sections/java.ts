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
          { text: "Java 基础语法", link: "/workspace/Java/base/basic-syntax" },
          { text: "Java 运算符与循环", link: "/workspace/Java/base/operators-and-loops" },
          { text: "Java 数据存储容器", link: "/workspace/Java/base/data-containers" },
          { text: "Java 面向对象基础", link: "/workspace/Java/base/object-oriented-basics" },
          { text: "Java 面向对象高级", link: "/workspace/Java/base/object-oriented-advanced" },
          { text: "Java String 方法", link: "/workspace/Java/base/string-methods" },
          { text: "Java 泛型", link: "/workspace/Java/base/generics" },
          { text: "Java 集合操作", link: "/workspace/Java/base/collection-operations" },
          { text: "Java 常用API", link: "/workspace/Java/base/common-api" },
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
