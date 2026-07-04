import type { DefaultTheme } from "vitepress";
import { backendSidebarSection } from "./sections/backend";
import { baseSidebarSection } from "./sections/base";
import { frontendSidebarSection } from "./sections/frontend";
import { miscSidebarSection } from "./sections/misc";
import { toolingSidebarSection } from "./sections/tooling";

export const workspaceSidebarItems: DefaultTheme.SidebarItem[] = [
  ...baseSidebarSection,
  ...frontendSidebarSection,
  ...backendSidebarSection,
  ...toolingSidebarSection,
  ...miscSidebarSection,
];
