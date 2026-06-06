<script setup lang="ts" name="TeekLayoutProvider">
import { defineAsyncComponent } from "vue";
import Teek from "vitepress-theme-teek";
import CategoriesTagsPage from "./CategoriesTagsPage.vue";
import NotFound from "./404.vue";

const ContributeChart = defineAsyncComponent(() => import("./ContributeChart.vue"));
</script>

<template>
  <Teek.Layout>
    <template #teek-home-features-before>
      <CategoriesTagsPage />
    </template>

    <template #teek-archives-top-before>
      <ContributeChart />
    </template>

    <template #not-found>
      <NotFound />
    </template>
  </Teek.Layout>
</template>
