<!-- 该文件为 @teek/components/themeEnhance/src/ThemeColor.vue 的非扩散版，代码逻辑完全一样 -->
<script setup lang="ts" name="ThemeColor">
import type { ThemeEnhance } from "@teek/config";
import type { ThemeColorOption } from "@teek/components/theme/ThemeEnhance";
import { onMounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { useLocale, useStorage, useThemeColor, varNameList } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkIcon } from "@teek/components/common/Icon";
import { TkPopover } from "@teek/components/common/Popover";
import {
  ThemeColorName,
  themeColorAttribute,
  themeColorList,
  themeColorStorageKey,
  useThemeColorList,
} from "@teek/components/theme/ThemeEnhance";
import { magicIcon } from "@teek/static";
import { isClient } from "@teek/helper";
import { ns } from "./namespace";

defineOptions({ name: "ThemeColor" });

const { t } = useLocale();

const { frontmatter } = useData();
const { getTeekConfigRef } = useTeekConfig();

const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", {});

const themeColorName = useStorage<string>(
  themeColorStorageKey,
  themeEnhanceConfig.value.themeColor?.defaultColorName || ThemeColorName.vpDefault
);

const oldThemeColor = ref(themeColorName.value);

// 主题色
const primaryColor = ref("");
// 根据 primaryColor 计算其他 var 变量需要的颜色，并直接覆盖这些 var 变量的颜色
const { clear } = useThemeColor(primaryColor, () => {
  // 内置的 VP、EP 主题色需要忽略部分 var 变量，因为这些 var 变量已经固定，无需自动计算新的值替换（具体看 packages/theme-chalk/var/theme-color.scss 文件）
  if (themeColorList.includes(themeColorName.value)) {
    return [varNameList.vpBrand1, varNameList.vpBrand2, varNameList.vpBrand3, varNameList.vpBrandSoft];
  }
});

const themeColorSelectList = useThemeColorList();

/**
 * 更新主题色
 */
const update = (val: typeof themeColorName.value | string) => {
  if (!isClient) return;

  const el = document.documentElement;

  themeColorName.value = val;

  if (el.getAttribute(themeColorAttribute) === val) return;
  el.setAttribute(themeColorAttribute, val);

  // includes 为 true 走内置主题色逻辑
  if (themeColorList.includes(val)) {
    // 先清除旧属性再获取新属性，否则一直获取的是旧属性
    clear();
    primaryColor.value = getComputedStyle(el).getPropertyValue(varNameList.vpBrand1);
  } else {
    const appendThemeColor = themeEnhanceConfig.value.themeColor?.append || [];
    // 扁平化 options 并获取 val 对应的 option
    const option = appendThemeColor
      .map(item => item.options)
      .flat()
      .filter(item => item.value === val);

    const color = option[0]?.color;

    // 如果 color 不存在，则默认从 css var 获取主题色，因此先清除旧属性再获取新属性，否则一直获取的是旧属性
    !color && clear();
    primaryColor.value = color || getComputedStyle(el).getPropertyValue(varNameList.vpBrand1);
  }

  themeEnhanceConfig.value.themeColor?.switchColorDone?.(val);
};

watch(themeColorName, update, { immediate: true });

// 文章单独设置主题色
watch(
  () => frontmatter.value.themeColorName,
  newVal => {
    if (newVal) {
      oldThemeColor.value = themeColorName.value;
      themeColorName.value = newVal;
    } else {
      // 还原
      themeColorName.value = oldThemeColor.value;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (frontmatter.value.themeColor) update(frontmatter.value.themeColor);
  else update(themeColorName.value);
});

const handleChangePrimaryColor = (option: ThemeColorOption) => {
  themeColorName.value = option.value;
};
</script>

<template>
  <TkPopover
    :class="ns.e('button')"
    :popper-class="ns.e('dropdown')"
    placement="left-start"
    :width="120"
    :x-offset="15"
    :transition-name="ns.join('fade-scale')"
    :title="t('tk.themeEnhance.themeColor.title')"
    role="button"
    :aria-label="t('tk.themeEnhance.themeColor.title')"
  >
    <template #reference>
      <TkIcon :icon="magicIcon" aria-hidden="true" />
    </template>
    <ul v-for="item in themeColorSelectList" :key="item.label">
      <li :class="`${ns.e('dropdown__title')} sle`" :title="item.tip" :aria-label="item.label">
        {{ item.label }}
      </li>
      <li>
        <ul>
          <li
            v-for="option in item.options"
            :key="item.label + option.value"
            :class="['dropdown-item', 'sle', { active: option.value === themeColorName }]"
            @click="handleChangePrimaryColor(option)"
            role="button"
            :title="option.title"
            :aria-label="option.ariaLabel ?? option.title ?? option.label"
          >
            {{ option.label }}
          </li>
        </ul>
      </li>
    </ul>
  </TkPopover>
</template>
