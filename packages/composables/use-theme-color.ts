import { readonly, ref } from "vue";
import { useData } from "vitepress";
import { getLightColor, getDarkColor, isClient, isFunction } from "@teek/helper";
import { computed, MaybeRef, shallowRef, toValue, watch } from "vue";

const vpBrand1 = "--vp-c-brand-1";
const vpBrand2 = "--vp-c-brand-2";
const vpBrand3 = "--vp-c-brand-3";
const vpBrandSoft = "--vp-c-brand-soft";
const vpBg = "--vp-c-bg";
const vpBgAlt = "--vp-c-bg-alt";
const vpBgSoft = "--vp-c-bg-soft";
const vpBgElv = "--vp-c-bg-elv";
const vpText1 = "--vp-c-text-1";
const vpText2 = "--vp-c-text-2";
const vpText3 = "--vp-c-text-3";

const tkBgColorElm = "--tk-bg-color-elm";
const tkBgColorMute = "--tk-bg-color-mute";

export const varNameList = {
  vpBrand1,
  vpBrand2,
  vpBrand3,
  vpBrandSoft,
  vpBg,
  vpBgAlt,
  vpBgSoft,
  vpBgElv,
  vpText1,
  vpText2,
  vpText3,
  tkBgColorElm,
  tkBgColorMute,
};

/**
 * 根据 color 计算其他 var 变量需要的颜色，并直接覆盖这些 var 变量的颜色
 *
 * @param color 主题色
 * @param ignoreList 无视的 var 变量，在覆盖颜色时可以指定哪些 var 变量不覆盖
 *
 * @returnParam start 开启计算逻辑（第一次已自动调用）
 * @returnParam stop 还原 var 变量本身的颜色，并取消 dark 的监听
 * @returnParam update 手动根据 color 再次计算并更新 var 变量
 * @returnParam clear 还原所有 var 变量
 * @returnParam updateSpread 修改 spread 的值
 */
export const useThemeColor = (color: MaybeRef<string>, ignoreList?: string[] | (() => string[] | undefined)) => {
  // 主题色是否扩展到其他 css 变量
  const isSpread = ref(false);

  const { isDark } = useData();

  const setStyleVar = (key: string, value: string) => {
    if (!isClient) return;
    document.documentElement.style.setProperty(key, value);
  };

  const removeStyleVar = (key: string) => {
    if (!isClient) return;
    document.documentElement.style.removeProperty(key);
  };

  // 主题色
  const colorComputed = computed(() => toValue(color));

  const clear = () => {
    Object.values(varNameList).forEach(key => {
      removeStyleVar(key);
    });
  };

  /**
   * 计算浅色模式的颜色
   */
  const switchLight = () => {
    if (!isClient) return;
    const primary = colorComputed.value;
    if (!primary) return;

    const lightVarDefaultMap: Record<string, string> = {
      [vpBrand1]: primary,
      [vpBrand2]: getLightColor(primary, 0.1)!,
      [vpBrand3]: getLightColor(primary, 0.2)!,
      [vpBrandSoft]: getLightColor(primary, 0.85)!,
    };

    const lightVarSpreadMap: Record<string, string> = {
      [vpBg]: getLightColor(primary, 0.96)!,
      [vpBgAlt]: getLightColor(primary, 0.93)!,
      [vpBgElv]: getLightColor(primary, 0.945)!,
      [vpBgSoft]: getLightColor(primary, 0.93)!,

      [vpText1]: getDarkColor(primary, 0.6)!,
      [vpText2]: getDarkColor(primary, 0.7)!,
      [vpText3]: getLightColor(primary, 0.6)!,

      [tkBgColorElm]: getLightColor(primary, 0.945)!,
      [tkBgColorMute]: getLightColor(primary, 0.91)!,
    };

    const ignoreListConst = isFunction(ignoreList) ? ignoreList() : ignoreList || [];

    Object.keys(lightVarDefaultMap).forEach(key => {
      if (ignoreListConst?.includes(key)) return;
      setStyleVar(key, lightVarDefaultMap[key]);
    });

    // 扩展其他 var 变量
    if (isSpread.value) {
      Object.keys(lightVarSpreadMap).forEach(key => {
        if (ignoreListConst?.includes(key)) return;
        setStyleVar(key, lightVarSpreadMap[key]);
      });
    }
  };

  /**
   * 计算深色模式的颜色
   */
  const switchDark = () => {
    if (!isClient) return;
    const primary = colorComputed.value;
    if (!primary) return;

    const darkVarDefaultMap: Record<string, string> = {
      [vpBrand1]: primary,
      [vpBrand2]: getDarkColor(primary, 0.1)!,
      [vpBrand3]: getDarkColor(primary, 0.2)!,
      [vpBrandSoft]: getDarkColor(primary, 0.85)!,
    };

    const darkVarSpreadMap: Record<string, string> = {
      [vpBg]: getDarkColor(primary, 0.92)!,
      [vpBgAlt]: getDarkColor(primary, 0.94)!,
      [vpBgElv]: getDarkColor(primary, 0.92)!,
      [vpBgSoft]: getDarkColor(primary, 0.94)!,

      [vpText1]: getLightColor(primary, 0.9)!,

      [tkBgColorElm]: getDarkColor(primary, 0.92)!,
      [tkBgColorMute]: getDarkColor(primary, 0.91)!,
    };

    const ignoreListConst = isFunction(ignoreList) ? ignoreList() : ignoreList || [];

    Object.keys(darkVarDefaultMap).forEach(key => {
      if (ignoreListConst?.includes(key)) return;
      setStyleVar(key, darkVarDefaultMap[key]);
    });

    // 扩展其他 var 变量
    if (isSpread.value) {
      Object.keys(darkVarSpreadMap).forEach(key => {
        if (ignoreListConst?.includes(key)) return;
        setStyleVar(key, darkVarSpreadMap[key]);
      });
    }
  };

  const isStop = shallowRef(false);
  let stopWatch: ReturnType<typeof watch> | null = null;

  const start = () => {
    if (!isStop.value || !!stopWatch) return;
    isStop.value = false;

    update();

    stopWatch = watch(isDark, update, { flush: "post" });
  };

  const update = () => {
    if (isStop.value) return;
    clear();

    if (isDark.value) switchDark();
    else switchLight();
  };

  const stop = () => {
    stopWatch?.();
    stopWatch = null;
    isStop.value = true;
    clear();
  };

  start();

  // 主题色变化时，重新计算颜色
  watch(colorComputed, update);
  // 修改扩散值，则重置
  watch(isSpread, () => {
    stop();
    start();
  });

  return {
    isSpread: readonly(isSpread),
    start,
    stop,
    update,
    clear,
    updateSpread: (value: boolean) => (isSpread.value = value),
  };
};
