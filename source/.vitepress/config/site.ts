import { defineTeekConfig } from "../../../packages/config";
import { blogContentConfig } from "./content";
import { blogThemeConfig } from "./theme";
import { withThemeLayoutFlags } from "./themeFlags";

export const teekConfig = defineTeekConfig(
  withThemeLayoutFlags({
    ...blogThemeConfig,
    ...blogContentConfig,
  })
);
