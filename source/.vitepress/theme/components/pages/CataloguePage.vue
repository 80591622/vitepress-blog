<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { TkHomeCardCategory, TkHomeCardTag, usePosts, usePagePath } from "vitepress-theme-teek";

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

const basePath = computed(() => withBase(isCategoriesPage.value ? categoryPath.value : tagPath.value));
</script>

<template>
  <div class="tk-home tk-home--catalog vp-doc" role="main">
    <div class="tk-home__content flx-start-justify-center">
      <div class="tk-home__content__post">
        <div class="catalogue-shell">
          <div class="catalogue-intro">
            <div class="catalogue-intro__title">
              <h2>{{ isCategoriesPage ? "分类索引" : "标签索引" }}</h2>
              <p>
                {{ isCategoriesPage ? "按主题浏览文章，快速进入对应分类。" : "按关键词聚合内容，快速定位相关文章。" }}
              </p>
            </div>
            <div class="catalogue-intro__meta">{{ items.length }} 项</div>
          </div>

          <div class="catalogue-grid">
            <a
              v-for="item in items"
              :key="item.name"
              class="catalogue-card"
              :href="`${basePath}?${queryKey}=${encodeURIComponent(item.name)}`"
              :aria-label="item.name"
            >
              <span class="catalogue-card__name">{{ item.name }}</span>
              <span class="catalogue-card__count">{{ item.length }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="tk-home__content__info is-right">
        <TkHomeCardCategory v-if="isCategoriesPage" :categories-page="true" />
        <TkHomeCardTag v-else :tags-page="true" />
      </div>
    </div>
  </div>
</template>
