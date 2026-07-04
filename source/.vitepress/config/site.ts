import { defineTeekConfig } from "../../../packages/config";
import { blogContentConfig } from "./content";
import { blogThemeConfig } from "./theme";
import { themeLayoutFlags } from "./themeFlags";

export const teekConfig = defineTeekConfig({
  ...themeLayoutFlags,
  ...blogThemeConfig,
  ...blogContentConfig,
});
