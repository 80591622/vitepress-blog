import type { DefaultTheme } from "vitepress";
import { backendSidebarSection } from "./sections/backend";
import { baseSidebarSection } from "./sections/base";
import { frontendSidebarSection } from "./sections/frontend";
import { miscSidebarSection } from "./sections/misc";
import { toolingSidebarSection } from "./sections/tooling";

const workspaceSidebarSections = [
  baseSidebarSection,
  frontendSidebarSection,
  backendSidebarSection,
  toolingSidebarSection,
  miscSidebarSection,
] as const;

function flattenSidebarSections(sections: readonly DefaultTheme.SidebarItem[][]): DefaultTheme.SidebarItem[] {
  return sections.flatMap(section => section);
}

export const workspaceSidebarItems = flattenSidebarSections(workspaceSidebarSections);
