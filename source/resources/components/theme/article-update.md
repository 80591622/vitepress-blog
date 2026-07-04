---
title: ArticleUpdate 文章最近更新栏 <Badge type="tip" text="v1.2.0" />
date: 2025-05-12 22:58:00
permalink: /resources/components/article-update
categories:
  - 资源库
  - 主题组件
tags:
  - 资源库
  - 主题组件
codeBlock:
  collapseHeight: false
---

在文章页底部使用文章最近更新栏组件，可以显示最近更新的文章信息，方便点击查看。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleUpdate, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-update.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(teekConfigContext, {
        articleUpdate: {
          limit: 3, // 默认为 3，表示最多显示 3 条最近更新文章
        },
      });

      return () =>
        h(DefaultTheme.Layout, null, {
          "doc-after": () => h(TkArticleUpdate),
        });
    },
  }),
};
```
