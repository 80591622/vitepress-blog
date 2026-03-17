// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      default: () => h(DefaultTheme.Layout)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Layout', Layout)
  }
} satisfies Theme