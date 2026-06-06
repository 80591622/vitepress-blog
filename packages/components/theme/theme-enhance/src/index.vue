<script setup lang="ts" name="ThemeEnhance">
import type { ThemeEnhance } from "@teek/config";
import { computed } from "vue";
import { readingIcon } from "@teek/static";
import { useMediaQuery } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/config-provider";
import { TkIcon } from "@teek/components/common/icon";
import { TkPopover } from "@teek/components/common/popover";
import { ns } from "./namespace";
import { mobileMaxWidthMedia } from "./theme-enhance";
import LayoutSwitch from "./layout-switch.vue";
import LayoutPageWidthSlide from "./layout-page-width-slide.vue";
import LayoutDocWidthSlide from "./layout-doc-width-slide.vue";
import ThemeColor from "./theme-color.vue";
import Spotlight from "./spotlight.vue";
import SpotlightStyle from "./spotlight-style.vue";

defineOptions({ name: "ThemeEnhance" });

const { getTeekConfigRef } = useTeekConfig();
const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", { position: "top" });

const isMobile = useMediaQuery(mobileMaxWidthMedia);

const disabledList = computed(() => {
  return {
    layoutSwitch: themeEnhanceConfig.value.layoutSwitch?.disabled ?? false,
    themeColor: themeEnhanceConfig.value.themeColor?.disabled ?? false,
    spotlight: themeEnhanceConfig.value.spotlight?.disabled ?? false,
  };
});
</script>

<template>
  <TkPopover
    v-if="!isMobile && themeEnhanceConfig.position === 'top' && !(themeEnhanceConfig.hidden ?? false)"
    :class="[ns.b(), 'flx-align-center']"
    :popper-class="ns.e('popover')"
    :y-offset="-15"
  >
    <template #reference>
      <TkIcon :icon="readingIcon" :size="20" />
    </template>
    <div :class="ns.e('content')">
      <slot name="teek-theme-enhance-top" />

      <template v-if="!disabledList.layoutSwitch">
        <LayoutSwitch />
        <LayoutPageWidthSlide />
        <LayoutDocWidthSlide />
      </template>

      <template v-if="!disabledList.themeColor">
        <ThemeColor />
      </template>

      <template v-if="!disabledList.spotlight">
        <Spotlight />
        <SpotlightStyle />
      </template>

      <slot name="teek-theme-enhance-bottom" />
    </div>
  </TkPopover>

  <div
    v-if="themeEnhanceConfig.hidden ?? false"
    v-show="!(themeEnhanceConfig.hidden ?? false)"
    :class="ns.e('content')"
  >
    <slot name="teek-theme-enhance-top" />

    <template v-if="!disabledList.layoutSwitch">
      <LayoutSwitch />
      <LayoutPageWidthSlide />
      <LayoutDocWidthSlide />
    </template>

    <template v-if="!disabledList.themeColor">
      <ThemeColor />
    </template>

    <template v-if="!disabledList.spotlight">
      <Spotlight />
      <SpotlightStyle />
    </template>

    <slot name="teek-theme-enhance-bottom" />
  </div>
</template>
