import type { ThemeEnhance } from "@teek/config";
import { computed } from "vue";
import { useLocale } from "@teek/composables";
import { isBoolean, isClient } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { ThemeColorName, ThemeColorOption } from "./themeEnhance";

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

    const useVitepressTheme = isBoolean(customize) ? customize === false : (customize?.vitepressTheme ?? true);
    const useElementPlusTheme = isBoolean(customize) ? customize === false : (customize?.elementPlusTheme ?? true);

    const vitePressThemeColorList = useVitepressTheme
      ? [
          {
            label: t("tk.themeEnhance.themeColor.vpLabel"),
            tip: t("tk.themeEnhance.themeColor.vpTip"),
            options: [
              {
                value: ThemeColorName.vpDefault,
                label: t("tk.themeEnhance.themeColor.defaultLabel"),
                title: `VitePress ${t("tk.themeEnhance.themeColor.defaultLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.defaultLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-indigo-1"),
              },
              {
                value: ThemeColorName.vpGreen,
                label: t("tk.themeEnhance.themeColor.greenLabel"),
                title: `VitePress ${t("tk.themeEnhance.themeColor.greenLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.greenLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-green-1"),
              },
              {
                value: ThemeColorName.vpYellow,
                label: t("tk.themeEnhance.themeColor.yellowLabel"),
                title: `VitePress ${t("tk.themeEnhance.themeColor.yellowLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.yellowLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-yellow-1"),
              },
              {
                value: ThemeColorName.vpRed,
                label: t("tk.themeEnhance.themeColor.redLabel"),
                title: `VitePress ${t("tk.themeEnhance.themeColor.redLabel")}`,
                ariaLabel: `VitePress ${t("tk.themeEnhance.themeColor.redLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--vp-c-red-1"),
              },
            ],
          },
        ]
      : [];

    const elementPlusThemeColorList = useElementPlusTheme
      ? [
          {
            label: t("tk.themeEnhance.themeColor.epLabel"),
            tip: t("tk.themeEnhance.themeColor.epTip"),
            options: [
              {
                value: ThemeColorName.epBlue,
                label: `${t("tk.themeEnhance.themeColor.blueLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.blueLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.blueLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-primary"),
              },
              {
                value: ThemeColorName.epGreen,
                label: `${t("tk.themeEnhance.themeColor.greenLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.greenLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.greenLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-success"),
              },
              {
                value: ThemeColorName.epYellow,
                label: `${t("tk.themeEnhance.themeColor.yellowLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.yellowLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.yellowLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-warning"),
              },
              {
                value: ThemeColorName.epRed,
                label: `${t("tk.themeEnhance.themeColor.redLabel")}`,
                title: `ElementPlus ${t("tk.themeEnhance.themeColor.redLabel")}`,
                ariaLabel: `ElementPlus ${t("tk.themeEnhance.themeColor.redLabel")}`,
                color: getComputedStyle(document.documentElement).getPropertyValue("--tk-el-color-danger"),
              },
            ],
          },
        ]
      : [];

    return [...vitePressThemeColorList, ...elementPlusThemeColorList, ...append] as {
      label: string;
      tip: string;
      options: ThemeColorOption[];
    }[];
  });
};
