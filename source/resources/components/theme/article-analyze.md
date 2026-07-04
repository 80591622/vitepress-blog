---
title: ArticleAnalyze 文章分析
date: 2025-04-29 02:41:47
permalink: /resources/components/article-analyze
categories:
  - 资源库
  - 主题组件
tags:
  - 资源库
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用文章分析组件，可以获取文章的创建时间、字数、阅读时间、访问量等信息。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleAnalyze, teekConfigContext } from "vitepress-theme-teek";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(teekConfigContext, {
        author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
        articleAnalyze: {
          showIcon: true,
          dateFormat: "yyyy-MM-dd",
          showAuthor: true,
          showCreateDate: true,
          showUpdateDate: false,
          showCategory: false,
          showTag: false,
        },
        docAnalysis: {
          wordCount: true,
          readingTime: true,
        },

        // ... 更多配置请看配置系列文章
      });

      return () =>
        h(DefaultTheme.Layout, null, {
          "doc-before": () => h(TkArticleAnalyze),
        });
    },
  }),
};
```
