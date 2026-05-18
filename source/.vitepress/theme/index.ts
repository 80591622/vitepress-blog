import Teek from "vitepress-theme-teek";
import TeekLayoutProvider from "./components/TeekLayoutProvider.vue";

/**
 * 与官方文档站一致：直接引用 theme-chalk 源码 `.scss`。组件内 `@teek/theme-chalk/*.css` 由 Vite 插件解析到对应 `.scss`。
 * @see https://github.com/Kele-Bingtang/vitepress-theme-teek/tree/master/docs/.vitepress/theme
 */
import "@teek/theme-chalk/vp-plus/code-block-mobile.scss";
import "@teek/theme-chalk/vp-plus/sidebar.scss";
import "@teek/theme-chalk/vp-plus/nav.scss";
import "@teek/theme-chalk/vp-plus/aside.scss";
import "@teek/theme-chalk/vp-plus/doc-h1-gradient.scss";
import "@teek/theme-chalk/vp-plus/table.scss";
import "@teek/theme-chalk/vp-plus/mark.scss";
import "@teek/theme-chalk/vp-plus/blockquote.scss";
import "@teek/theme-chalk/vp-plus/index-rainbow.scss";
import "@teek/theme-chalk/tk-plus/banner-desc-gradient.scss";
import "@teek/theme-chalk/tk-plus/home-card-hover.scss";
import "@teek/theme-chalk/tk-plus/fade-up-animation.scss";
import "@teek/theme-chalk/components/theme/home.scss";
import "@teek/theme-chalk/components/theme/home-category-card.scss";
import "@teek/theme-chalk/components/theme/home-tag-card.scss";

import "./styles/code-bg.scss";
import "./styles/iframe.scss";
import "./style.css";

export default {
  extends: Teek,
  Layout: TeekLayoutProvider,
};
