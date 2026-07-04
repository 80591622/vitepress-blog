---
title: ArticleShare 文章分享
date: 2025-04-13 15:54:37
permalink: /resources/components/article-share
categories:
  - 资源库
  - 主题组件
tags:
  - 资源库
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用文章分享组件可以分享文章页的链接。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleShare, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-share.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(teekConfigContext, {
        articleShare: {
          // ... 更多配置请看配置系列文章
        },
      });

      return () =>
        h(DefaultTheme.Layout, null, {
          "aside-outline-before": () => h(TkArticleShare),
        });
    },
  }),
};
```
