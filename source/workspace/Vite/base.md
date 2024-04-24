
# vite

[github 24k](https://github.com/vitejs/vite)

`Bundleless`, 本质上是将原先 Webpack 中模块依赖解析的工作交给浏览器去执行，使得在开发过程中代码的转换变少，极大地提升了开发过程中的构建速度，同时也可以更好地利用浏览器的相关开发工具。

---------


为什么会出现 Vite？在过去的 Webpack、Rollup 等构建工具的时代，我们所写的代码一般都是基于 ES Module 规范，在文件之间通过 `import` 和 `export` 形成一个很大的依赖图。

这些构建工具在本地开发调试的时候，也都会**提前把你的模块**先打包成浏览器可读取的 js `bundle`，虽然有诸如路由懒加载等优化手段，但懒加载并不代表懒构建，Webpack 还是需要把你的异步路由用到的模块提前构建好。

当你的项目越来越大的时候，启动也难免变的越来越慢，甚至可能达到分钟级别。而 `HMR` 热更新也会达到好几秒的耗时。

Vite 则别出心裁的利用了[浏览器的原生 ES Module 支持](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)，直接在 html 文件里写诸如这样的代码：

```html
// index.html
<div id="app"></div>
<script type="module">
  import { createApp } from 'vue'
  import Main from './main.vue'

  createApp(Main).mount('#app')
</script>
```

Vite 会在本地帮你启动一个服务器，当浏览器读取到这个 html 文件之后，会在执行到 import 的时候才去向服务端发送 `Main.vue` 模块的请求，Vite 此时在利用内部的一系列黑魔法，包括 Vue 的 template 解析，代码的编译等等，解析成浏览器可以执行的 js 文件返回到浏览器端。

这就保证了只有在真正使用到这个模块的时候，浏览器才会请求并且解析这个模块，最大程度的做到了按需加载。

用 Vite 官网上的图来解释，传统的 bundle 模式是这样的：

![传统 bundle](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1c187722cd9405687c6c0ff40b54b9b~tplv-k3u1fbpfcp-zoom-1.image)

而基于 ESM 的构建模式则是这样的：

![基于 ESM](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af2907c55cdb4fedadf8e604907ddc57~tplv-k3u1fbpfcp-zoom-1.image)

灰色部分是暂时没有用到的路由，甚至完全不会参与构建过程，随着项目里的路由越来越多，构建速度也不会变慢。

webpack会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。
而vite是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。
由于现代浏览器本身就支持ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。
由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite的优势越明显。
在HMR（热更新）方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高。
当需要打包到生产环境时，vite默认使用传统的rollup（也可以自己手动安装webpack来）进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的是ES Module，因此在代码中（除了vite.config.js里面，这里是node的执行环境）不可以使用 CommonJS





## 依赖预编译

依赖预编译，其实是 Vite 2.0 在为用户启动开发服务器之前，先用 `esbuild` 把`检测到的依赖预先构建了一遍`。

也许你会疑惑，不是一直说好的 no-bundle 吗，怎么还是走启动时编译这条路线了？尤老师这么做当然是有理由的，我们先以导入 `lodash-es` 这个包为例。

当你用 `import { debounce } from 'lodash'` 导入一个命名函数的时候，可能你理想中的场景就是浏览器去下载只包含这个函数的文件。但其实没那么理想，`debounce` 函数的模块内部又依赖了很多其他函数，形成了一个依赖图。

当浏览器请求 `debounce` 的模块时，又会发现内部有 2 个 `import`，再这样延伸下去，这个函数内部竟然带来了 600 次请求，耗时会在 1s 左右。

![lodash 请求依赖链路](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9273fbf819c430ea0a44677c789cf6b~tplv-k3u1fbpfcp-zoom-1.image)

这当然是不可接受的，于是尤老师想了个折中的办法，正好利用 [Esbuild](https://github.com/evanw/esbuild) 接近无敌的构建速度，让你在没有感知的情况下在启动的时候预先帮你把 `debounce` 所用到的所有内部模块全部打包成一个传统的 `js bundle`。



## 为啥生产模式不用 esbuild，不是更快吗？

其实也想用，但是 esbuild 目前对生产包支持不够健壮，很多配置无法通过 esbuild 实现（1.esbuild虽然有loader，但是没有插件机制；2.esbuild没有热更新（Hot Module Replacement），对于开发来说会是一件非常痛苦的事情）。所以目前而言，Rollup 是一个好选择，虽然远比 esbuild 慢。

另外，可以用 esbuild 作为压缩器，替代 terser，详见 build.minify,这样会更快，但是包的体积可能会有 5% - 10% 左右的增长，看用户取舍。

弊端  开发运行没事，生产报错