/** Teek / VitePress 首页布局开关（teekConfig 与 config 须保持一致） */
export const themeLayoutFlags = {
  teekHome: false,
  vpHome: true,
  homeCardListPosition: false,
} as const;

export const withThemeLayoutFlags = <T extends Record<string, unknown>>(config: T) => ({
  ...themeLayoutFlags,
  ...config,
});
