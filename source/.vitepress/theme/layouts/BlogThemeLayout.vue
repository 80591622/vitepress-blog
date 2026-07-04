<script setup lang="ts" name="BlogThemeLayout">
import { defineAsyncComponent } from "vue";
import Teek from "vitepress-theme-teek";
import CategoriesTagsPage from "../components/widgets/CategoriesTagsPage.vue";
import DiamondParticleTrail from "../features/diamond-particle-trail/DiamondParticleTrail.vue";
import NotFound from "../components/pages/NotFoundPage.vue";

const ContributeChart = defineAsyncComponent(() => import("../components/widgets/ContributeChart.vue"));
</script>

<template>
  <DiamondParticleTrail />

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
