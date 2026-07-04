<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useData } from "vitepress";
import {
  TkHomePost,
  TkHomeCardCategory,
  TkHomeCardTag,
  postDataUpdateSymbol,
  type TkHomePostInstance,
} from "vitepress-theme-teek";
import CalendarCard from "./CalendarCard.vue";

const { frontmatter } = useData();

const isCategoriesPage = computed(() => !!frontmatter.value.categoriesPage);

const showBlock = computed(() => Boolean(frontmatter.value.categoriesPage || frontmatter.value.tagsPage));

const isPaging = ref(false);
const postListRef = ref<TkHomePostInstance | null>(null);

provide(postDataUpdateSymbol, () => {
  postListRef.value?.updateData?.();
});
</script>

<template>
  <div
    v-if="showBlock"
    :class="['tk-home vp-doc', isCategoriesPage ? 'tk-home--categories' : 'tk-home--catalog']"
    role="main"
  >
    <div class="tk-home__content flx-start-justify-center">
      <div class="tk-home__content__post">
        <TkHomePost ref="postListRef" v-model="isPaging" />
      </div>
      <div class="tk-home__content__info is-right">
        <TkHomeCardCategory v-if="isCategoriesPage" :categories-page="true" />
        <TkHomeCardTag v-else :tags-page="true" />
        <CalendarCard />
      </div>
    </div>
  </div>
</template>

<style src="../../styles/categories-page.css"></style>
