<script setup lang="ts" name="BlogThemeLayout">
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vitepress";
import Teek from "vitepress-theme-teek";
import DiamondParticleTrail from "../features/diamond-particle-trail/DiamondParticleTrail.vue";
import NotFound from "../components/pages/NotFoundPage.vue";
import TerminalHome from "../components/home/TerminalHome.vue";

const CategoriesTagsPage = defineAsyncComponent(() => import("../components/widgets/CategoriesTagsPage.vue"));
const ContributeChart = defineAsyncComponent(() => import("../components/widgets/ContributeChart.vue"));

/**
 * VitePress 会在分类等页面复用 home 插槽；终端首页只能挂在根路由，
 * 否则会把首页组件与背景错误地注入内容页。
 */
const route = useRoute();
const isTerminalHome = computed(() => route.path === "/" || route.path === "/index.html");
</script>

<template>
  <DiamondParticleTrail />

  <Teek.Layout>
    <template #home-hero-before>
      <TerminalHome v-if="isTerminalHome" />
    </template>

    <template #page-top>
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
