import type { DefaultTheme } from "vitepress";
import { resourcesNavGroup } from "./resources";
import { siteNavGroups } from "./siteInfo";

const nav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text: "功能页",
    items: siteNavGroups.featurePages,
  },
  {
    text: "常用链接",
    items: siteNavGroups.commonLinks,
  },
  resourcesNavGroup,
];

export default nav;
