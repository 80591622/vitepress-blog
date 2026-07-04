import type { DefaultTheme } from "vitepress";
import { ecosystemNavGroup } from "./ecosystem";
import { commonNavLinks, featurePageLinks } from "./siteInfo";

const nav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text: "功能页",
    items: featurePageLinks,
  },
  {
    text: "常用链接",
    items: commonNavLinks,
  },
  ecosystemNavGroup,
];

export default nav;
