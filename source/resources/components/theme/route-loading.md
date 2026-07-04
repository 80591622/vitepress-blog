---
title: RouteLoading 路由加载
date: 2025-09-14 21:05:23
permalink: /resources/components/route-loading
categories:
  - 资源库
  - 主题组件
tags:
  - 资源库
  - 主题组件
codeBlock:
  collapseHeight: false
---

页面加载 Loading 组件，在切换路由前显示，在切换路由后消失。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkRouteLoading, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-route-loading.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup(_, { slots }) {
      provide(teekConfigContext, {
        loading: "Teek 正在加载中...", // 指定加载 Loading 动画的文案
      });

      return () => h("div", null, [h(TkRouteLoading), h(DefaultTheme.Layout, null, slots)]);
    },
  }),
};
```
