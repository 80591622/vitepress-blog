import type { DefaultTheme } from "vitepress";
import { resourcesSidebar } from "../resources";
import { workspaceSidebarItems } from "./workspace";

const WORKSPACE_SIDEBAR_ROUTE = "/";
const RESOURCES_SIDEBAR_ROUTE = "/resources/";

const sidebar: DefaultTheme.Sidebar = {
  [RESOURCES_SIDEBAR_ROUTE]: resourcesSidebar,
  [WORKSPACE_SIDEBAR_ROUTE]: workspaceSidebarItems,
};

export default sidebar;
