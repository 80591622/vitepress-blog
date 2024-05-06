

# 脚手架vue-cli

## vue-cli
```bash
# 安装 Vue CLI 3.x
yarn global @vue/cli

# my-project 是你的项目名称
vue create my-project
```

vue-cli 中包含着 typescript 选项，只需要选择即可

```javascript
vue create repo
# 手动配置的时候需要选择 TypeScript
Check the features needed for your project:
 ◉ Babel
 ◉ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

## vue.config.js 的配置

```javascript
// 这个文件用于修改cli和webpack的配置
// 基于CommonJS 的风格导出一个对象
// 和webpack.config.js一样，修改后需要重启
module.exports = {
    outputDir: './dist', // 指定文件打包后的输出路径
    lintOnSave: true, // 启用eslint语法检查，默认启用
    productionSourceMap: false, // 生产环境是否需要source-map,如果设为false可以加速构建(打包)
    devServer: { // vue-cli 支持所有webpack-dev-server的配置
        port: 8082, // 端口号
        open: true, // 自动打开浏览器
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
        https: false, // 是否启用https
        proxy: { // 这个必须会，用来解决开发环境跨域的问题
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false
            }
        }
    }
};
```

## 开启Gzip压缩

```javascript
/* vue.config.js */
const isPro = process.env.NODE_ENV === 'production'

module.exports = {
    ...
    
    configureWebpack: config => {
        if (isPro) {
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                         // 目标文件名称。[path] 被替换为原始文件的路径和 [query] 查询
                        asset: '[path].gz[query]',
                        // 使用 gzip 压缩
                        algorithm: 'gzip', 
                        // 处理与此正则相匹配的所有文件
                        test: new RegExp(
                            '\\.(js|css)$'
                        ),
                        // 只处理大于此大小的文件
                        threshold: 10240,
                        // 最小压缩比达到 0.8 时才会被压缩
                        minRatio: 0.8，
                    })
                ]
            }
        }
    }
    ...
}
```

## 分析包文件

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    if (isAnalyze) {
        config
            .plugin('webpack-bundle-analyzer')
            .use(
                new BundleAnalyzerPlugin({
                    analyzerPort: 9999,
                    openAnalyzer: true,
                }))
    }
}
```

## 拆包

```javascript
configureWebpack: () => ({
    optimization: {
        splitChunks: {
        cacheGroups: {
            vendor:{
            chunks:"all",
                test: /node_modules/,
                name:"vendor",
                minChunks: 1,
                maxInitialRequests: 5,
                minSize: 0,
                priority:100,
            },
            common: {
                chunks:"all",
                test:/[\\/]src[\\/]js[\\/]/,
                name: "common",
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0,
                priority:60
            },
            styles: {
                name: 'styles',
                test: /\.(sa|sc|c)ss$/,
                chunks: 'all',
                enforce: true,
                },
                runtimeChunk: {
                name: 'manifest'
            }
        }
        }
    }
})
```

## 默认插件简介

通过对 `vue.config.js` 的了解，我们知道了 `vue-cli 3.x`为我们默认封装了项目运行的常用 `webpack` 配置，那么它给我们提供了哪些默认插件，每一个`plugin` 又有着怎样的用途呢？除了使用 **vue inspect plugins** 我们还可以通过运行 **vue ui** 进入可视化页面查看，步骤如下

- 打开可视化页面，点击对应项目进入管理页面（如果没有对应项目，需要导入或新建）
- 点击侧边栏 `Tasks` 选项，再点击二级栏 `inspect`选项
- 点击` Run task` 按钮执行审查命令

![](https://ae01.alicdn.com/kf/Hb1e97ba0e7ce4cb2b72ea6466cbb0ba6N.png)

> 最后我们从输出的内容中找到 `plugins` 数组，其包含了如下插件（配置项已经省略，增加了定义插件的代码）：

```javascript
// vue-loader是 webpack 的加载器，允许你以单文件组件的格式编写 Vue 组件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// webpack 内置插件，用于创建在编译时可以配置的全局常量
const { DefinePlugin } = require('webpack');

// 用于强制所有模块的完整路径必需与磁盘上实际路径的确切大小写相匹配
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// 识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 用于在 webpack 构建期间优化、最小化 CSS文件
const OptimizeCssnanoPlugin = require('optimize-css-public-webpack-plugin');

// webpack 内置插件，用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
const { HashedModuleIdsPlugin } = require('webpack');

// 用于根据模板或使用加载器生成 HTML 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用于在使用 html-webpack-plugin 生成的 html 中添加 <link rel ='preload'> 或 <link rel ='prefetch'>，有助于异步加载
const PreloadPlugin = require('preload-webpack-plugin');

// 用于将单个文件或整个目录复制到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin(), 
        
        /* config.plugin('define') */
        new DefinePlugin(),
        
        /* config.plugin('case-sensitive-paths') */
        new CaseSensitivePathsPlugin(),
        
        /* config.plugin('friendly-errors') */
        new FriendlyErrorsWebpackPlugin(),
        
        /* config.plugin('extract-css') */
        new MiniCssExtractPlugin(),
        
        /* config.plugin('optimize-css') */
        new OptimizeCssnanoPlugin(),
        
        /* config.plugin('hash-module-ids') */
        new HashedModuleIdsPlugin(),
        
        /* config.plugin('html') */
        new HtmlWebpackPlugin(),
        
        /* config.plugin('preload') */
        new PreloadPlugin(),
        
        /* config.plugin('copy') */
        new CopyWebpackPlugin()
    ]
}
```

## 使用 alias 简化路径

而在 `CLI 3.x `中我们无法直接操作 `webpack` 的配置文件，我们需要通过 `chainWebpack` 来进行间接修改，代码如下

```javascript
/* vue.config.js */
module.exports = {
    // ...
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_lib', resolve('src/common'))
            .set('_com', resolve('src/components'))
            .set('_img', resolve('src/images'))
            .set('_ser', resolve('src/services'))
    }, 
   // ...
}
```

这样我们修改 `webpack alias` 来简化路径的优化就实现了。
但是需要注意的是对于在样式及 `htm`l 模板中引用路径的简写时，前面需要加上 `～` 符，否则路径解析会失败，如：

```css
.img {
    background: (~_img/home.png);
}
```

## 构建多页应用

## 多入口

在单页应用中，我们的入口文件只有一个，`CLI` 默认配置的是 `main.js`，但是到了多页应用，
我们的入口文件便包含了 `page1.js、page2.js、index.js`等，数量取决于 pages 文件夹下目录的个数，
这时候为了项目的可拓展性，我们需要自动计算入口文件的数量并解析路径配置到 `webpack` 中的 `entry` 属性上，如：

```javascript
module.exports = {
    // ...
    entry: {
        page1: '/xxx/pages/page1/page1.js',
        page2: '/xxx/pages/page2/page2.js',
        index: '/xxx/pages/index/index.js',
    },
   //  ...
}
```

那么我们如何读取并解析这样的路径呢，这里就需要使用工具和函数来解决了。
我们可以在根目录新建 `build` 文件夹存放 `utils.js` 这样共用的 `webpack` 功能性文件，并加入多入口读取解析方法

```javascript{6}
/* utils.js */
const path = require('path');

// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');

// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages');

/* 
* 多入口配置
* 通过 glob 模块读取 pages 文件夹下的所有对应文件夹下的 js * 后缀文件，如果该文件存在
* 那么就作为入口处理
*/
exports.getEntries = () => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/*.js') // 同步读取所有入口文件
    let map = {}
    
    // 遍历所有入口文件
    entryFiles.forEach(filePath => {
        // 获取文件名
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        
        // 以键值对的形式存储
        map[filename] = filePath 
    })
    
    return map
}
```

```javascript{9}
/* vue.config.js */

const utils = require('./build/utils')

module.exports = {
    // ...
    configureWebpack: config => {
        config.entry = utils.getEntries()
    },
    // ...
}
```

## 多模板

相对于多入口来说，多模板的配置也是大同小异，这里所说的模板便是每个` page` 下的` html` 模板文件，
而模板文件的作用主要用于 `webpack `中 `html-webpack-plugin` 插件的配置，
其会根据模板文件生产一个编译后的 `html` 文件并自动加入携带 `hash `的脚本和样式，基本配置如下

```javascript
/* webpack 配置文件 */
const HtmlWebpackPlugin = require('html-webpack-plugin') // 安装并引用插件

module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My Page', // 生成 html 中的 title
            filename: 'demo.html', // 生成 html 的文件名
            template: 'xxx/xxx/demo.html', // 模板路径
            chunks: ['manifest', 'vendor', 'demo'], // 所要包含的模块
            inject: true, // 是否注入资源
        })
    ]
    // ...
}
```

```javascript
/* utils.js */

// 多页面输出配置
// 与上面的多页面入口配置相同，读取 page 文件夹下的对应的 html 后缀文件，然后放入数组中
exports.htmlPlugin = configs => {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    let arr = []
    
    entryHtml.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            template: filePath, // 模板路径
            filename: filename + '.html', // 生成 html 的文件名
            chunks: ['manifest', 'vendor',  filename],
            inject: true,
        }
        
        // 如果有自定义配置可以进行 merge
        if (configs) {
            conf = merge(conf, configs)
        }
        
        // 针对生产环境配置
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true, // 删除 html 中的注释代码
                    collapseWhitespace: true, // 删除 html 中的空白符
                    // removeAttributeQuotes: true // 删除 html 元素中属性的引号
                },
                chunksSortMode: 'manual' // 按 manual 的顺序引入
            })
        }
        
        arr.push(new HtmlWebpackPlugin(conf))
    })
    
    return arr
}
```


```javascript{13}
/* vue.config.js */

const utils = require('./build/utils')

module.exports = {
    // ...
    configureWebpack: config => {
        config.entry = utils.getEntries() // 直接覆盖 entry 配置
        // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
        return {
            plugins: [...utils.htmlPlugin()]
        }
    },
    // ...
}
```

如此我们多页应用的多入口和多模板的配置就完成了，
这时候我们运行命令 `yarn build` 后你会发现 `dist` 目录下生成了 3 个 html 文件，分别是 `index.html、page1.html 和 page2.html`

## 使用 pages 配置

其实，在 `vue.config.js` 中，我们还有一个配置没有使用，便是 `pages`。`pages` 对象允许我们为应用配置多个入口及模板，
这就为我们的多页应用提供了开放的配置入口。官方示例代码如下

```javascript
/* vue.config.js */
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/index/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/subpage/main.js'
    }
}
```

我们不难发现，`pages` 对象中的 `key` 就是入口的别名，而其 `value` 对象其实是入口 `entry` 和模板属性的合并，
这样我们上述介绍的获取多入口和多模板的方法就可以合并成一个函数来进行多页的处理，合并后的 `setPages` 方法如下

```javascript
/ pages 多入口配置
exports.setPages = configs => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    let map = {}

    entryFiles.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let tmp = filePath.substring(0, filePath.lastIndexOf('\/'))

        let conf = {
            // page 的入口
            entry: filePath, 
            // 模板来源
            template: tmp + '.html', 
            // 在 dist/index.html 的输出
            filename: filename + '.html', 
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename], 
            inject: true,
        };

        if (configs) {
            conf = merge(conf, configs)
        }

        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true, // 删除 html 中的注释代码
                    collapseWhitespace: true, // 删除 html 中的空白符
                    // removeAttributeQuotes: true // 删除 html 元素中属性的引号
                },
                chunksSortMode: 'manual'// 按 manual 的顺序引入
            })
        }

        map[filename] = conf
    })

    return map
}
```

```javascript
/* vue.config.js */

const utils = require('./build/utils')

module.exports = {
    // ...
    pages: utils.setPages(),
    // ...
}
```

这样我们多页应用基于 `pages` 配置的改进就大功告成了，当你运行打包命令来查看输出结果的时候，你会发现和之前的方式相比并没有什么变化，
这就说明这两种方式都适用于多页的构建，但是这里还是`推荐`大家使用更便捷的 `pages` 配置

## 多页面应用分页面打包

**如果支持分项目编译打包到相应文件夹中,请看我的github [编译打包到相应文件夹](https://github.com/wkvictory/vue-mpa/blob/master/vue.config.js#L17)**

## 路由配置

首先我们要明确一点就是，多页应用中的每个单页都是相互隔离的，即如果你想从 `page1` 下的路由跳到 `page2` 下的路由，
你无法使用 `vue-router` 中的方法进行跳转，需要使用原生方法：`location.href` 或 `location.replace`

```vue
<template>
  <div id="app">
    <div id="nav">
      <a @click="goFn('')">Index</a> |
      <a @click="goFn('page1')">Page1</a> |
      <a @click="goFn('page2')">Page2</a> |
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    methods: {
        goFn(name) {
            location.href = `${process.env.BASE_URL}` + name
        }
    }
}
</script>
```

但是为了保持和`Vue` 路由跳转同样的风格，我可以对单页之间的跳转做一下封装，
实现一个` Navigator` 类，类的代码可以查看本文最后的示例，封装完成后我们可以将跳转方法修改为

```vue
this.$openRouter({
    name: name, // 跳转地址
    query: {
        text: 'hello' // 可以进行参数传递
    },
})
```

将其绑定到 Vue 的原型链上

```vue
import { Navigator } from '../../common' // 引入 Navigator

Vue.prototype.$openRouter = Navigator.openRouter; // 添加至 Vue 原型链
```

至此我们已经能够成功模仿 `vue-router `进行单页间的跳转，但是需要注意的是因为其本质使用的是 `location` 跳转，所以必然会产生浏览器的刷新与重载

## 重定向

当我们完成上述路由跳转的功能后，可以在本地服务器上来进行一下测试，你会发现` Index` 首页可以正常打开，
但是跳转 `Page1、Page2 `却仍然处于 `Index` 父组件下，这是因为浏览器认为你所要跳转的页面还是在 `Index` 根路由下，
同时又没有匹配到` Index` 单页中对应的路由。这时候我们服务器需要做一次重定向，将下方路由指向对应的 `html `文件即可

```bash
/vue/page1 -> /vue/page1.html
/vue/page2 -> /vue/page2.html
```

在 `vue.config.js` 中，我们需要对 `devServer` 进行配置，添加 `historyApiFallback`配置项，
该配置项主要用于解决 `HTML5 History API` 产生的问题，比如其 `rewrites` 选项用于重写路由

```javascript
/* vue.config.js */

let baseUrl = '/vue/';

module.exports = {
    // ...
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: new RegExp(baseUrl + 'page1'), to: baseUrl + 'page1.html' },
                { from: new RegExp(baseUrl + 'page2'), to: baseUrl + 'page2.html' },
            ]
        }
    }
   // ...
}
```