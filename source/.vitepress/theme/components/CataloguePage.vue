<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import {
  TkHomeCategoryCard,
  TkHomeTagCard,
  usePosts,
  usePagePath,
} from "vitepress-theme-teek";

const { frontmatter } = useData();
const posts = usePosts();
const { categoryPath, tagPath } = usePagePath();

const isCategoriesPage = computed(() => !!frontmatter.value.categoriesPage);

const items = computed(() => {
  if (isCategoriesPage.value) {
    return posts.value.groupCards.categories;
  }
  return posts.value.groupCards.tags;
});

const queryKey = computed(() => (isCategoriesPage.value ? "category" : "tag"));

const basePath = computed(() =>
  withBase(
    isCategoriesPage.value ? categoryPath.value : tagPath.value
  )
);
</script>

<template>
  <div
    class="tk-home tk-home--catalog vp-doc"
    role="main"
  >
    <div class="tk-home__content flx-start-justify-center">
      <!-- 主内容区：分类/标签卡片网格 -->
      <div class="tk-home__content__post">
        <div class="catalogue-grid">
          <a
            v-for="item in items"
            :key="item.name"
            class="catalogue-card"
            :href="`${basePath}?${queryKey}=${encodeURIComponent(item.name)}`"
            :aria-label="item.name"
          >
            <span class="catalogue-card__name">{{ item.name }}</span>
          </a>
        </div>
      </div>

      <!-- 侧边栏：分类/标签快捷列表 -->
      <div class="tk-home__content__info is-right">
        <TkHomeCategoryCard
          v-if="isCategoriesPage"
          :categories-page="true"
        />
        <TkHomeTagCard
          v-else
          :tags-page="true"
        />
      </div>
    </div>
  </div>
</template>
