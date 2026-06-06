<script setup lang="ts" name="Home">
import type { TeekConfig } from "@teek/config";
import type { TkHomePostInstance } from "@teek/components";
import { ref, provide } from "vue";
import { useNamespace, useLocale } from "@teek/composables";
import { useTeekConfig, usePageState } from "@teek/components/theme/config-provider";
import { TkHomeFullscreenWallpaper } from "@teek/components/theme/home-fullscreen-wallpaper";
import { TkHomePost } from "@teek/components/theme/home-post";
import { TkHomeBanner } from "@teek/components/theme/home-banner";
import { TkHomeCardMain } from "@teek/components/theme/home-card";
import { postDataUpdateSymbol } from "./home-main";

defineOptions({ name: "HomeMain" });

const ns = useNamespace("home-main");
const { t } = useLocale();

const { isHomePage } = usePageState();
const { getTeekConfigRef } = useTeekConfig();

const teekConfig = getTeekConfigRef<Required<TeekConfig>>(null, {
  teekHome: true,
  homeCardListPosition: "right",
  banner: {},
  wallpaper: {},
  bodyBgImg: {},
});

const homePostInstance = ref<TkHomePostInstance | null>(null);

provide(postDataUpdateSymbol, () => homePostInstance.value?.updateData());

// 翻页 > 1 则隐藏 Banner
const isPaging = ref(false);
</script>

<template>
  <div :class="ns.b()" role="main" :aria-label="t('tk.home.label')">
    <div v-if="isHomePage && (teekConfig.banner.enabled ?? true)" v-show="!isPaging">
      <TkHomeBanner :disabled="isPaging">
        <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </TkHomeBanner>
    </div>

    <div :class="[ns.e('content'), ns.join('wallpaper-outside'), 'flx-start-justify-center']">
      <div :class="ns.e('content__post')" :aria-label="t('tk.home.postLabel')">
        <slot name="teek-home-post-before" />
        <TkHomePost v-model="isPaging" ref="homePostInstance">
          <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </TkHomePost>
        <slot name="teek-home-post-after" />
      </div>

      <div
        v-if="teekConfig.homeCardListPosition"
        :class="[ns.e('content__info'), teekConfig.homeCardListPosition === 'left' ? ns.is('left') : ns.is('right')]"
        :aria-label="t('tk.home.cardLabel')"
      >
        <TkHomeCardMain>
          <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </TkHomeCardMain>
      </div>
    </div>

    <TkHomeFullscreenWallpaper
      v-if="teekConfig.wallpaper.enabled && (teekConfig.banner.bgStyle === 'fullImg' || teekConfig.bodyBgImg.imgSrc)"
    />
  </div>
</template>
