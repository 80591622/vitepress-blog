<script setup lang="ts" name="ArticleOverviewPage">
import type { Category, DocDocAnalysisFileInfo } from "@teek/config";
import { computed } from "vue";
import { withBase, useData } from "vitepress";
import { formatDate } from "@teek/helper";
import { useNamespace, useLocale } from "@teek/composables";
import { usePosts, useTeekConfig } from "@teek/components/theme/config-provider";
import { TkArticlePage } from "@teek/components/common/article-page";
import { createDynamicComponent } from "@teek/components/theme/article-title";

defineOptions({ name: "ArticleOverviewPage" });

const ns = useNamespace("article-overview");
const { t } = useLocale();
const posts = usePosts();
const { localeIndex, site, theme, frontmatter } = useData();
const { getTeekConfigRef } = useTeekConfig();

const categoryConfig = getTeekConfigRef<Required<Category>>("category", {
  path: "/categories",
});

const overviewLabel = computed(() => ({
  name: t("tk.articleOverview.name"),
  title: t("tk.articleOverview.title"),
  date: t("tk.articleOverview.date"),
  wordCount: t("tk.articleOverview.wordCount"),
  readingTime: t("tk.articleOverview.readingTime"),
}));

const categories = computed(() => posts.value.groupPosts.categories);
const eachFileWords = computed<DocDocAnalysisFileInfo[]>(() => theme.value.docAnalysisInfo?.eachFileWords || []);

// 分类页链接
const categoriesPageLink = computed(() => {
  const localeIndexConst = localeIndex.value;
  const localeName = localeIndexConst !== "root" ? `/${localeIndexConst}` : "";
  // 兼容国际化功能，如果没有配置多语言，则返回 '/categories'
  return withBase(`${localeName}${categoryConfig.value.path}${site.value.cleanUrls ? "" : ".html"}`);
});

const getFileWords = (url: string) => {
  return eachFileWords.value.filter(item => {
    const path = "/" + item.fileInfo.relativePath.replace(".md", "");
    return [path, `${path}.html`].includes(url);
  })[0];
};

const enhancedCategories = computed(() => {
  return (
    Object.entries(categories.value)
      .map(([key, items]) => ({
        name: key,
        data:
          (items as any[]).map(item => {
            const wordsInfo = getFileWords(item.url);
            return {
              ...item,
              wordCount: wordsInfo?.wordCount || "-",
              readingTime: wordsInfo?.readingTime || "-",
            };
          }) || [],
      }))
      // 获取每个目录的第一篇文章发布时间，然后进行排序，发布时间越晚，优先级越高
      .sort(
        (a, b) =>
          new Date(b.data[b.data.length - 1].date).getTime() - new Date(a.data[a.data.length - 1].date).getTime()
      )
  );
});

const formatPublishDate = (date?: string) => {
  const publishDateFormat = frontmatter.value.publishDateFormat;

  if (!publishDateFormat) return date;
  return formatDate(date || new Date(), publishDateFormat);
};
</script>

<template>
  <TkArticlePage doc aside :class="ns.b()">
    <h1 v-if="frontmatter.title">
      {{ frontmatter.title }}
      <a class="header-anchor" :href="`#${frontmatter.title}`" :aria-label="`Permalink to '${frontmatter.title}'`" />
    </h1>

    <div class="overview-intro">
      <Content />
    </div>

    <template v-for="item in enhancedCategories" :key="item.name">
      <section class="overview-section">
        <div class="overview-section__head">
          <div class="overview-section__title">
            <h2 :id="`${item.name}-${t('tk.articleOverview.overview')}`">
              {{ item.name }} {{ t("tk.articleOverview.overview") }}
              <a
                class="header-anchor"
                :href="`#${item.name}-${t('tk.articleOverview.overview')}`"
                :aria-label="`Permalink to '${item.name}-${t('tk.articleOverview.overview')}'`"
              />
            </h2>
            <p>{{ item.data.length }} {{ t("tk.articleOverview.category") }}</p>
          </div>

          <a
            class="overview-section__link"
            :href="`${categoriesPageLink}?category=${item.name}`"
            :aria-describedby="`overview-title`"
          >
            查看 {{ item.name }}
          </a>
        </div>

        <div class="overview-section__body">
          <table :aria-describedby="`overview-title`">
            <thead>
              <tr>
                <th>{{ overviewLabel.name }}</th>
                <th>{{ overviewLabel.title }}</th>
                <th>{{ overviewLabel.date }}</th>
                <th>{{ overviewLabel.wordCount }}</th>
                <th>{{ overviewLabel.readingTime }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in item.data" :key="data.url">
                <td :data-label="overviewLabel.name">{{ item.name }}</td>
                <td :data-label="overviewLabel.title">
                  <a :href="data.url && withBase(data.url)" :aria-label="data.title">
                    <component v-if="data.title" :is="createDynamicComponent(data.title)" />
                  </a>
                </td>
                <td :data-label="overviewLabel.date">{{ formatPublishDate(data.date) }}</td>
                <td :data-label="overviewLabel.wordCount">{{ data.wordCount }}</td>
                <td :data-label="overviewLabel.readingTime">{{ data.readingTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </TkArticlePage>
</template>
