<script setup lang="ts" name="LayoutPageWidthSlide">
import type { ThemeEnhance } from "@teek/config";
import { computed, watch } from "vue";
import { isClient } from "@teek/helper";
import { useDebounce, useStorage, useMediaQuery, useLocale } from "@teek/composables";
import { autoWidthIcon, scaleIcon } from "@teek/static";
import { useTeekConfig } from "@teek/components/theme/config-provider";
import { TkInputSlide } from "@teek/components/common/input-slide";
import { activateMaxWidthSlideMedia, LayoutMode, mobileMaxWidthMedia } from "./theme-enhance";
import { ns, layoutModeStorageKey, pageMaxWidthSlideStorageKey, transitionName, pageMaxWidthVar } from "./namespace";
import { useAnimated } from "./use-animated";
import BaseTemplate from "./components/base-template.vue";

defineOptions({ name: "LayoutPageWidthSlide" });

const { getTeekConfigRef } = useTeekConfig();
const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", {});
const { t } = useLocale();

const min = computed(() => 60 * 100);
const max = computed(() => 100 * 100);

const pageMaxWidth = useStorage(
  pageMaxWidthSlideStorageKey,
  (themeEnhanceConfig.value.layoutSwitch?.defaultPageMaxWidth || 90) * 100
);
const layoutMode = useStorage(
  layoutModeStorageKey,
  themeEnhanceConfig.value.layoutSwitch?.defaultMode || LayoutMode.Original
);

const { start: startAnimated } = useAnimated();

const updatePageMaxWidth = (val: number) => {
  if (!isClient) return;
  if (!themeEnhanceConfig.value.layoutSwitch?.disableAnimation) startAnimated();

  document.body.style.setProperty(pageMaxWidthVar, `${Math.ceil(val / 100)}%`);
};

const isMobile = useMediaQuery(mobileMaxWidthMedia);
const shouldActivateMaxWidth = useMediaQuery(activateMaxWidthSlideMedia);

// 初始化会马上触发一次
watch(shouldActivateMaxWidth, () => {
  updatePageMaxWidth(pageMaxWidth.value);
});

const update = useDebounce(updatePageMaxWidth, 1000);
watch(pageMaxWidth, update);

const format = (val: number) => `${Math.ceil(val / 100)}%`;

const tips = computed(() => [
  {
    title: t("tk.themeEnhance.pageLayoutMaxWidth.helpTipTitle"),
    icon: scaleIcon,
    content: t("tk.themeEnhance.pageLayoutMaxWidth.helpTipContent"),
  },
]);
</script>

<template>
  <Transition
    v-if="!(themeEnhanceConfig.layoutSwitch?.hidden ?? themeEnhanceConfig.hidden ?? false)"
    :name="transitionName"
  >
    <BaseTemplate
      v-show="layoutMode === LayoutMode.SidebarWidthAdjustableOnly || layoutMode === LayoutMode.BothWidthAdjustable"
      :icon="autoWidthIcon"
      :title="t('tk.themeEnhance.pageLayoutMaxWidth.title')"
      :helper="!themeEnhanceConfig.layoutSwitch?.disablePageMaxWidthHelp"
      :helper-desc="t('tk.themeEnhance.pageLayoutMaxWidth.helpDesc')"
      :tips
      :disabled="isMobile"
    >
      <TkInputSlide
        v-model="pageMaxWidth"
        :disabled="isMobile"
        :min
        :max
        :format
        :class="ns.e('slide')"
        :aria-label="t('tk.themeEnhance.pageLayoutMaxWidth.helperTipTitle')"
      />
    </BaseTemplate>
  </Transition>
</template>
