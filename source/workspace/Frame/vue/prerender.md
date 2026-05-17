---
date: 2026-05-10 22:52:36
title: prerender
categories:
  - Frame
  - vue
tags:
  - vue
---

# Vue预渲染
## SSR

之前一段时间调研了React的[SSR](https://juejin.im/post/6854573205349367815),今天有时间研究下Vue的预渲染。老套路还是先说说预渲染有什么好处，跟SSR有什么区别？？？？  Let's look down  👓⏬



如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 `/`, `/about`, `/contact` 等）的 SEO，那么你可能需要**预渲染**。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。



预渲染是为了页面有更好的加载速度，而且可以改善少数页面的SEO，为什么是少数的，因为大量的路由会使预渲染变得非常缓慢（构建时）。预渲染基本原理是 - 启动无头浏览器，加载应用程序的路由并将结果保存到静态HTML文件中。然后，您可以将其与以前使用的任何静态文件服务解决方案一起使用，用最少的代码做到你想要的效果几乎没有任何的侵入性。



看下他们的区别：

| [SSR](https://juejin.im/post/6854573205349367815) | [预渲染](https://www.npmjs.com/package/prerender-spa-plugin) |
| :------------------------------------------------- | :----------------------------------------------------------- |
| 运行时 | 构建时  |
| 代码侵入性大，开发调试代价高，报错不明显（钩子）  | 几乎没有侵入性                                               |
| SEO更彻底                                         | 有局限性（动态URL的异步请求）                                |
| 首屏加载更快                                      | 首屏加载快                                                   |
| 需要Node环境，耗费CPU内存                         | 不需要Node环境                                               |
| 难度较大（有现成的框架）                          | 难度小                                                       |
| 动态内容直出 HTMl                                 | 直出有限，客户端会再次加载（跳屏）                           |



## 上干货



预渲染核心插件：**prerender-spa-plugin** 为了更好的SEO一般会动态需改meta的内容 **vue-meta-info**

安装：

```bash
yarn add prerender-spa-plugin vue-meta-info -D
```

prerender-spa-plugin 是基于puppeteer的，下载出错多试几次，百度很多文章可解决



**vue.config.js中进行配置**



```javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  configureWebpack: {
    plugins: [
       new PrerenderSPAPlugin({
          // 生成文件的路径，这个目录只能有一级。若目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动
          staticDir: path.join(__dirname, './dist'),
          // 可选-渲染的应用程序应输出到的路径。
          // (默认为staticDir。）
          outputDir: path.join（__dirname ，'/dist/prerendered'）， 
          // 对应自己的路由文件
          routes: [ '/', '/home','/list'],
          // 若没有这段则不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            // headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event',
            // 可选-等待渲染，直到经过一定的时间。
            // 不推荐
            renderAfterTime: 5000,
            // 可选-默认为0，无限制。
            // 路由是异步呈现的。
            // 使用它来限制并行渲染的路由数量
            maxConcurrentRoutes: 4 ， 
          })
        }),
    ]
  }
}
```



**main.js中进行配置**

```javascript
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'


// ......


Vue.use(MetaInfo)
new Vue({
  router,
  store,
  render:h=>h(App),
  mounted(){
     document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
```



`注：预渲染方式下的route需采用history模式，否则每个打包生成的index.html的文件内容会一样`



## 组件内静态使用metaInfo

```vue
<template>
...
</template>

<script>
export default {
  metaInfo: {
    title: 'My Example App', // 可以是异步的
    meta: [{                 
      name: 'keyWords',
      content: '预渲染'
    }]
    link: [{                
      rel: 'asstes',
      href: 'file.wkdevhub.cn'
    }]
  }
}
</script> 
```

