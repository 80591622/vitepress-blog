---
title: ArticleBanner 文章页 Banner
date: 2025-09-14 21:13:50
permalink: /ecosystem/components/article-banner
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
codeBlock:
  collapseHeight: false
---

文章页顶部的 Banner 组件，仅在没有侧边栏的文章页生效，可以添加封面图或者背景色。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleBanner, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-banner.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(teekConfigContext, {
        articleBanner: {
          enabled: true, // 是否启用单文章页 Banner
          showCategory: true, // 是否展示分类
          showTag: true, // 是否展示标签
          defaultCoverImg: "", // 默认封面图
          defaultCoverBgColor: "", // 默认封面背景色，优先级低于 defaultCoverImg
        },
      });

      return () =>
        h(DefaultTheme.Layout, null, {
          "layout-top": () => h(TkArticleBanner),
        });
    },
  }),
};
```

组件插入 `layout-top` 插槽后，实际是否展示仍取决于当前页面是否为无侧边栏的文章页，以及 `articleBanner.enabled` 是否开启。
