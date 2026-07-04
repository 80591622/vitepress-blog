import type { DefaultTheme } from "vitepress";
import { ecosystemSidebar } from "../ecosystem";
import { workspaceSidebarItems } from "./workspace";

const sidebar: DefaultTheme.Sidebar = {
  "/ecosystem/": ecosystemSidebar,
  "/": workspaceSidebarItems,
};

export default sidebar;
