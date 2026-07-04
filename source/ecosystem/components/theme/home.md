---
title: Home 首页
date: 2025-04-13 15:55:54
permalink: /ecosystem/components/home
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用首页组件可以快速搭建一个精美的博客首页。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkHomeMain, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-image.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-pure.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-content.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-feature.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-waves.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-category.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-doc-analysis.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-friend-link.css";
import "vitepress-theme-teek/theme-chalk/tk-home-fullscreen-wallpaper.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-my.css";
import "vitepress-theme-teek/theme-chalk/tk-home-post.css";
import "vitepress-theme-teek/theme-chalk/tk-home-post-item-list.css";
import "vitepress-theme-teek/theme-chalk/tk-home-post-item-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-tag.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-top-article.css";
import "vitepress-theme-teek/theme-chalk/tk-home-main.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(teekConfigContext, {
        // ... 更多配置请看配置系列文章
      });

      return () =>
        h(DefaultTheme.Layout, null, {
          "home-hero-before": () => h(TkHomeMain),
        });
    },
  }),
};
```
