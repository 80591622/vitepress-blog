<script setup lang="ts">
import { TkIcon } from "@teek/components/common/Icon";
import { arrowDownIcon } from "@teek/static";

const emits = defineEmits<{ click: [] }>();

const onClick = () => emits("click");
</script>

<template>
  <div class="code-block-overlay" @click="onClick">
    <span>查看更多</span>
    <TkIcon class="overlay-icon" :icon="arrowDownIcon" />
  </div>
</template>
