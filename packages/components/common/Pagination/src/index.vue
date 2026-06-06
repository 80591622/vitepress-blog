<script setup lang="ts" name="Pagination">
import type { PaginationProps, PaginationEmits, LayoutKey } from "./pagination";
import { computed, provide, watch } from "vue";
import { useNamespace } from "@teek/composables";
import { arrowLeftIcon, arrowRightIcon } from "@teek/static";
import { paginationKey } from "./pagination";
import Prev from "./components/prev.vue";
import Next from "./components/next.vue";
import Jumper from "./components/jumper.vue";
import Total from "./components/total.vue";
import Pager from "./components/pager.vue";

defineOptions({ name: "Pagination" });

const props = withDefaults(defineProps<PaginationProps>(), {
  pagerCount: 7,
  layout: ["prev, pager, next, jumper, ->, total"].join(", "),
  prevIcon: () => arrowLeftIcon,
  nextIcon: () => arrowRightIcon,
  size: "default",
  background: false,
  disabled: false,
  hideOnSinglePage: false,
});
const emit = defineEmits<PaginationEmits>();

const ns = useNamespace("pagination");

const currentPageModel = defineModel<number>("currentPage", { type: Number, default: 1 });
const pageSizeModel = defineModel<number>("pageSize", { type: Number, default: 10 });

const isAbsent = (v: unknown): v is undefined => typeof v !== "number";

// 总页数
const pageCountBridge = computed(() => {
  let pageCount = 0;
  if (!isAbsent(props.pageCount)) pageCount = props.pageCount;
  else if (!isAbsent(props.total)) pageCount = Math.max(1, Math.ceil(props.total / pageSizeModel.value));
  return pageCount;
});

watch(pageCountBridge, val => {
  if (currentPageModel.value > val) currentPageModel.value = val;
});

watch(
  [currentPageModel, pageSizeModel],
  value => {
    emit("change", ...value);
  },
  { flush: "post" }
);

const handleSizeChange = (val: number) => {
  pageSizeModel.value = val;
  emit("size-change", pageSizeModel.value);

  const newPageCount = pageCountBridge.value;
  if (currentPageModel.value > newPageCount) currentPageModel.value = newPageCount;
};

const prev = () => {
  if (props.disabled) return;

  handleCurrentChange(currentPageModel.value - 1);
  emit("prev-click", currentPageModel.value);
};

const next = () => {
  if (props.disabled) return;

  handleCurrentChange(currentPageModel.value + 1);
  emit("next-click", currentPageModel.value);
};

const handleCurrentChange = (val: number) => {
  currentPageModel.value = val;
  const newPageCount = pageCountBridge.value;

  if (currentPageModel.value < 1) currentPageModel.value = 1;
  else if (currentPageModel.value > newPageCount) currentPageModel.value = newPageCount;
  emit("current-change", currentPageModel.value);
};

provide(paginationKey, {
  pageCount: pageCountBridge,
  disabled: computed(() => props.disabled),
  currentPage: currentPageModel,
  changeEvent: handleCurrentChange,
  handleSizeChange,
});

const layoutSections = computed(() => {
  if (!props.layout) return null;
  if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null;

  const parts = props.layout.split(",").map(item => item.trim()) as LayoutKey[];
  const separatorIndex = parts.indexOf("->");
  const left = separatorIndex === -1 ? parts : parts.slice(0, separatorIndex);
  const right = separatorIndex === -1 ? [] : parts.slice(separatorIndex + 1);

  return { left, right };
});

const getLeftItemClass = (index: number, leftTotal: number, hasRight: boolean) => ({
  [ns.is("first")]: index === 0,
  [ns.is("last")]: !hasRight && index === leftTotal - 1,
});

const getRightItemClass = (index: number, rightTotal: number) => ({
  [ns.is("first")]: index === 0,
  [ns.is("last")]: index === rightTotal - 1,
});
</script>

<template>
  <div v-if="layoutSections" :class="[ns.b(), ns.is('background', background), ns.m(size)]">
    <template v-for="(item, index) in layoutSections.left" :key="`left-${item}-${index}`">
      <Prev
        v-if="item === 'prev'"
        :disabled="disabled"
        :current-page="currentPageModel"
        :prev-text="prevText"
        :prev-icon="prevIcon"
        :class="getLeftItemClass(index, layoutSections.left.length, layoutSections.right.length > 0)"
        @click="prev"
      />
      <Pager
        v-else-if="item === 'pager'"
        :current-page="currentPageModel"
        :page-count="pageCountBridge"
        :pager-count="pagerCount"
        :disabled="disabled"
        :class="getLeftItemClass(index, layoutSections.left.length, layoutSections.right.length > 0)"
        @change="handleCurrentChange"
      />
      <Next
        v-else-if="item === 'next'"
        :disabled="disabled"
        :current-page="currentPageModel"
        :page-count="pageCountBridge"
        :next-text="nextText"
        :next-icon="nextIcon"
        :class="getLeftItemClass(index, layoutSections.left.length, layoutSections.right.length > 0)"
        @click="next"
      />
      <Jumper
        v-else-if="item === 'jumper'"
        :size="size"
        :class="getLeftItemClass(index, layoutSections.left.length, layoutSections.right.length > 0)"
      />
      <Total
        v-else-if="item === 'total'"
        :total="isAbsent(total) ? 0 : total"
        :class="getLeftItemClass(index, layoutSections.left.length, layoutSections.right.length > 0)"
      />
      <slot v-else-if="item === 'slot'" />
    </template>

    <div v-if="layoutSections.right.length" :class="ns.e('right-wrapper')">
      <template v-for="(item, index) in layoutSections.right" :key="`right-${item}-${index}`">
        <Prev
          v-if="item === 'prev'"
          :disabled="disabled"
          :current-page="currentPageModel"
          :prev-text="prevText"
          :prev-icon="prevIcon"
          :class="getRightItemClass(index, layoutSections.right.length)"
          @click="prev"
        />
        <Pager
          v-else-if="item === 'pager'"
          :current-page="currentPageModel"
          :page-count="pageCountBridge"
          :pager-count="pagerCount"
          :disabled="disabled"
          :class="getRightItemClass(index, layoutSections.right.length)"
          @change="handleCurrentChange"
        />
        <Next
          v-else-if="item === 'next'"
          :disabled="disabled"
          :current-page="currentPageModel"
          :page-count="pageCountBridge"
          :next-text="nextText"
          :next-icon="nextIcon"
          :class="getRightItemClass(index, layoutSections.right.length)"
          @click="next"
        />
        <Jumper
          v-else-if="item === 'jumper'"
          :size="size"
          :class="getRightItemClass(index, layoutSections.right.length)"
        />
        <Total
          v-else-if="item === 'total'"
          :total="isAbsent(total) ? 0 : total"
          :class="getRightItemClass(index, layoutSections.right.length)"
        />
        <slot v-else-if="item === 'slot'" />
      </template>
    </div>
  </div>
</template>
