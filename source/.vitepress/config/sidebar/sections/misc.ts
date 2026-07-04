import type { DefaultTheme } from "vitepress";

export const miscSidebarSection: DefaultTheme.SidebarItem[] = [
  {
    text: "Other",
    collapsed: true,
    items: [
      { text: "Jenkins自动化部署", link: "/workspace/Jenkins/base" },
      { text: "MAC整理", link: "/tools/mac" },
      { text: "开发工具", link: "/tools/store" },
      { text: "网站大全", link: "/tools/page" },
      { text: "配置WS", link: "/other/ws-configure" },
      { text: "习题解答", link: "/workspace/Interviews/result" },
    ],
  },
];
