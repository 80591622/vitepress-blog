import type { ThemeEnhance } from "@teek/config";
import { computed } from "vue";
import { useLocale } from "@teek/composables";
import { isClient } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/config-provider";
import { ThemeColorName, ThemeColorOption } from "./theme-enhance";

/**
 * 获取主题色列表
 */
export const useThemeColorList = () => {
  if (!isClient) return;

  const { getTeekConfigRef } = useTeekConfig();
  const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", {});

  const { t } = useLocale();

  return computed(() => {
    const { customize = false, append = [] } = themeEnhanceConfig.value.themeColor || {};

    const nativeThemeColorList = !customize
      ? [
          {
            label: t("tk.themeEnhance.themeColor.label"),
            tip: t("tk.themeEnhance.themeColor.tip"),
            options: [
              {
                value: ThemeColorName.vpPrimary,
                label: `VP ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                title: `VitePress ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-indigo-1"),
              },
              {
                value: ThemeColorName.vpSuccess,
                label: `VP ${t("tk.themeEnhance.themeColor.successLabel")}`,
                title: `VitePress ${t("tk.themeEnhance.themeColor.successLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.successLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-green-1"),
              },
              {
                value: ThemeColorName.vpWarning,
                label: `VP ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                title: `VitePress ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-yellow-1"),
              },
              {
                value: ThemeColorName.vpDanger,
                label: `VP ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                title: `VitePress ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-red-1"),
              },
              // Teek Color
              {
                value: ThemeColorName.tkPrimary,
                label: `TK ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                title: `Teek ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                ariaLabel: `Teek ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-color-primary"),
              },
              {
                value: ThemeColorName.tkSuccess,
                label: `TK ${t("tk.themeEnhance.themeColor.successLabel")}`,
                title: `Teek ${t("tk.themeEnhance.themeColor.successLabel")}`,
                ariaLabel: `Teek ${t("tk.themeEnhance.themeColor.successLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-color-success"),
              },
              {
                value: ThemeColorName.tkWarning,
                label: `TK ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                title: `Teek ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                ariaLabel: `Teek ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-color-warning"),
              },
              {
                value: ThemeColorName.tkDanger,
                label: `TK ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                title: `Teek ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                ariaLabel: `Teek ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-color-danger"),
              },
              // Element Plus Color
              {
                value: ThemeColorName.epPrimary,
                label: `EP ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.primaryLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-primary"),
              },
              {
                value: ThemeColorName.epSuccess,
                label: `EP ${t("tk.themeEnhance.themeColor.successLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.successLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.successLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-success"),
              },
              {
                value: ThemeColorName.epWarning,
                label: `EP ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.warningLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-warning"),
              },
              {
                value: ThemeColorName.epDanger,
                label: `EP ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.dangerLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-danger"),
              },
            ],
          },
        ]
      : [];

    return [...nativeThemeColorList, ...append] as {
      label: string;
      tip: string;
      options: ThemeColorOption[];
    }[];
  });
};
