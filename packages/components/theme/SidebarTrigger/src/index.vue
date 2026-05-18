<script setup lang="ts" name="SidebarTrigger">
import { nextTick, onMounted, ref } from "vue";
import { useLocale, useMediaQuery, useNamespace } from "@teek/composables";
import { autoWidthIcon } from "@teek/static";
import { TkIcon } from "@teek/components/common/Icon";

const ns = useNamespace("sidebar-trigger");
const { t } = useLocale();

const active = ref(false);

const isLt960 = useMediaQuery("(max-width: 960px)");

const toggleSideBar = () => {
  const layoutDom = document.querySelector(`.${ns.join("layout")}`);
  layoutDom && layoutDom.classList.toggle(ns.is("sidebar-collapse"));

  // 激活添加样式（目的是添加 transition-duration）
  if (!active.value) {
    active.value = true;
    setTimeout(() => {
      active.value = false;
    }, 300);
  }
};

onMounted(async () => {
  await nextTick();
  const docDom = document.querySelector(".VPContent.has-sidebar");
  // 不直接在 css 添加动画，而是在组件初始化时添加 class，从而添加动画，如果直接在 css 添加动画，导致从首页进入文章页触发动画，有割裂感
  docDom?.classList.add("sidebar-trigger-transition");
});
</script>

<template>
  <slot v-if="!isLt960" :active :icon="autoWidthIcon" :toggleSideBar>
    <div
      :class="[ns.b(), ns.is('active', active)]"
      @click="toggleSideBar"
      :title="t('tk.sidebarTrigger.label')"
      role="button"
      :aria-label="t('tk.sidebarTrigger.label')"
    >
      <div :class="[ns.join('right-bottom-button__button')]">
        <TkIcon :icon="autoWidthIcon" aria-hidden="true" />
      </div>
    </div>
  </slot>
</template>
