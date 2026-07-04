---
title: Notice 公告栏
date: 2025-04-13 15:56:22
permalink: /resources/components/notice
categories:
  - 资源库
  - 主题组件
tags:
  - 资源库
  - 主题组件
codeBlock:
  collapseHeight: false
---

Notice 公告栏仅实现了基础的交互功能，公告内容需要您自己实现，这里给一个 Demo。

在 `.vitepress/theme/components` 定义一个公告内容组件 `NoticeContent.vue`。

```vue
<!-- .vitepress/theme/components/NoticeContent.vue -->
<script setup lang="ts" name="NoticeContent">
const namespace = "notice";
</script>

<template>
  <div :class="namespace">
    <p>微信 👇</p>
    <img src="/img/qrCode.png" alt="QR Code" />
    <p class="">欢迎大家私信交流</p>
  </div>
</template>

<style lang="scss" scoped>
.notice {
  img {
    width: 100%;
    height: 120px;
    object-fit: contain;
  }
  p {
    text-align: center;
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
```

## 基础使用

```ts
import { defineComponent, h, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkNotice, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-notice.css";
import NoticeContent from "./components/NoticeContent.vue";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup(_, { slots }) {
      provide(teekConfigContext, {
        notice: {
          // ... 更多配置请看配置系列文章
        },
      });

      return () =>
        h("div", null, [
          h(
            TkNotice,
            {},
            {
              "teek-notice-content": () => h(NoticeContent),
            }
          ),
          h(DefaultTheme.Layout, null, slots),
        ]);
    },
  }),
};
```
