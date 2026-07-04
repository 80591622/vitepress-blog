---
title: ThemeEnhance 主题增强 <Badge type="tip" text="v1.1.0" />
date: 2025-04-29 02:41:47
permalink: /resources/components/theme-enhance
categories:
  - 资源库
  - 主题组件
tags:
  - 资源库
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用主题增强组件，可以为导航栏和页面交互补充额外能力。

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkThemeEnhance, teekConfigContext } from "vitepress-theme-teek";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(teekConfigContext, {
        themeEnhance: {
          // ... 更多配置请看配置系列文章
        },
      });

      return () =>
        h(DefaultTheme.Layout, null, {
          "nav-bar-content-after": () => h(TkThemeEnhance),
        });
    },
  }),
};
```
