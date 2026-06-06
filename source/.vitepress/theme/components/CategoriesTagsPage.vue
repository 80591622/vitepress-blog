<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useData } from "vitepress";
import { TkHomePostList, TkHomeCategoryCard, TkHomeTagCard, postDataUpdateSymbol } from "vitepress-theme-teek";

const { frontmatter } = useData();

const isCategoriesPage = computed(() => !!frontmatter.value.categoriesPage);

const showBlock = computed(() => Boolean(frontmatter.value.categoriesPage || frontmatter.value.tagsPage));

const isPaging = ref(false);
const postListRef = ref<InstanceType<typeof TkHomePostList> | null>(null);

provide(postDataUpdateSymbol, () => {
  postListRef.value?.updateData?.();
});
</script>

<template>
  <div v-if="showBlock" class="tk-home tk-home--catalog vp-doc" role="main">
    <div class="tk-home__content flx-start-justify-center">
      <div class="tk-home__content__post">
        <TkHomePostList ref="postListRef" v-model="isPaging" />
      </div>
      <div class="tk-home__content__info is-right">
        <TkHomeCategoryCard v-if="isCategoriesPage" :categories-page="true" />
        <TkHomeTagCard v-else :tags-page="true" />
      </div>
    </div>
  </div>
</template>
