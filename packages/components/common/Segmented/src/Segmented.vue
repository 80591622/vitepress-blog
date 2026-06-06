<script setup lang="ts" name="Segmented">
import type { SegmentedProps, ModelType, SegmentedEmits } from "./segmented";
import { watch } from "vue";
import { useNamespace } from "@teek/composables";
import SegmentedHorizontalItem from "./segmented-item.vue";

defineOptions({ name: "Segmented" });

const ns = useNamespace("segmented");

defineProps<SegmentedProps>();
const emit = defineEmits<SegmentedEmits>();

const model = defineModel<ModelType>();

watch(
  () => model.value,
  newValue => emit("change", newValue),
  { deep: true }
);
</script>

<template>
  <fieldset :class="ns.b()">
    <SegmentedHorizontalItem
      v-for="option in options"
      :key="option.name"
      v-model="model"
      v-bind="option"
      :title="option.title ?? option.label"
      :disabled="option.disabled ?? disabled"
    />
  </fieldset>
</template>
