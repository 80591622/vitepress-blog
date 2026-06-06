export enum LayoutMode {
  FullWidth = "fullWidth",
  SidebarWidthAdjustableOnly = "sidebarWidthAdjustableOnly",
  BothWidthAdjustable = "bothWidthAdjustable",
  Original = "original",
}

export type LayoutModeVal = "fullWidth" | "sidebarWidthAdjustableOnly" | "bothWidthAdjustable" | "original";

export enum SpotlightStyle {
  Under = "under",
  Aside = "aside",
}

export enum ThemeColorName {
  vpPrimary = "vp-primary",
  vpSuccess = "vp-success",
  vpWarning = "vp-warning",
  vpDanger = "vp-danger",
  tkPrimary = "tk-primary",
  tkSuccess = "tk-success",
  tkWarning = "tk-warning",
  tkDanger = "tk-danger",
  epPrimary = "ep-primary",
  epSuccess = "ep-success",
  epWarning = "ep-warning",
  epDanger = "ep-danger",
}

export interface ThemeColorOption {
  value: string;
  label?: string;
  color?: string;
  title?: string;
  ariaLabel?: string;
}

// Teek 内置的主题色
export const themeColorList = [
  ThemeColorName.vpPrimary,
  ThemeColorName.vpSuccess,
  ThemeColorName.vpWarning,
  ThemeColorName.vpDanger,
  ThemeColorName.tkPrimary,
  ThemeColorName.tkSuccess,
  ThemeColorName.tkWarning,
  ThemeColorName.tkDanger,
  ThemeColorName.epPrimary,
  ThemeColorName.epSuccess,
  ThemeColorName.epWarning,
  ThemeColorName.epDanger,
] as string[];

export const mobileMaxWidthMedia = "(max-width: 768px)";
export const activateMaxWidthSlideMedia = "(min-width: 1440px)";
export const touchMedia = "(pointer: coarse)";

export const layoutModeAttribute = "layout-mode";
export const themeColorAttribute = "theme-color";
