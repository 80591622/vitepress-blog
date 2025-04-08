## 性能优化

### 首屏加载指标细化

1. FP (首次绘制)
2. FCP（首次内容绘制），FP 到 FCP 中间主要是 SPA 应用js执行，太慢就会有白屏时间
3. FMP （首次有效绘制），主要内容呈现的时间 （MutationObserver）
4. LCP （最大内容渲染），加载最大内容块的呈现时间
5. TTI （可交互时间，SSR）
6. TBT （阻塞时间从 FCP 到 TTI）: 总阻塞时间
7. CLS （布局偏移）：布局偏移情况，重排 reflow
8. TTFB 首字节到达时间，请求发出后到接收到数据中间的时间

### 方案

1. 优化图片， Webp，图片压缩，图片尺寸（在合适的容器内使用合适的尺寸图片）
2. 字体瘦身，设计性产品，字体子集化（fontmin）
3. 懒加载资源，图片懒加载，js 异步加载
4. css，js 文件压缩，打包构建阶段完成 （terser）webpack-bundle-analyzer
   - 代码压缩
   - 文件合并
   - Tree shaking
   - 动态加载

5. Gzip，brotli
6. SSR， SSG

### 动画卡顿

1. 减少主线程阻塞
   - 优化 JavaScript 执行，较少长任务（复杂的计算【web worker、将任务切分（react Scheduler）】）
2. GPU
   - css 属性（transform、opacity）
   - 避免会引起重排的属性（定位 left、top）
3. requestAnimationFrame

### 应用层状态优化

1. 减少全局状态的依赖
   - 将状态尽可能局部化，避免使用全局状态 (如 Redux 或 Context) 管理所有数据。
   - 示例：对于仅用于某些组件的状态，可以使用组件的 useState 或 useReducer。
2. 优化 Context 的性能
   - Context 的更新会重新渲染所有订阅的组件。
   - 解决方案：**拆分 Context**，将不同的逻辑存储在多个 Context 中，降低重新渲染范围。
3. 使用高效的状态管理库
   - 使用轻量、高性能的状态管理工具，如 Zustand、Jotai，它们具备更细粒度的状态更新机制。
4. 避免不必要的状态更新

## 总结

- **构建策略**：基于构建工具(`Webpack/Rollup/Parcel/Esbuild/Vite/Gulp`)
- **减少打包时间**：`缩减范围`、`缓存副本`、`定向搜索`、`提前构建`、`并行构建`、`可视结构`
- **减少打包体积**：`分割代码`、`摇树优化`、`动态垫片`、`按需加载`、`作用提升`、`压缩资源`

 ###  **缩减范围**

 ```js
 // 配置include/exclude缩小Loader对文件的搜索范围，避免不必要的转译
 export default {
     // ...
     module: {
         rules: [{
             exclude: /node_modules/,
             include: /src/,
             test: /\.js$/,
             use: "babel-loader"
         }]
     }
 };	
 ```

 ### **缓存副本**

 ```js
 // 大部分Loader/Plugin都会提供一个可使用编译缓存的选项，通常包含cache字眼
 // 配置cache缓存Loader对文件的编译副本，好处是再次编译时只编译修改过的文件
 // babel-loader、eslint-webpack-plugin
 import EslintPlugin from "eslint-webpack-plugin";
 
 export default {
     // ...
     module: {
         rules: [{
             // ...
             test: /\.js$/,
             use: [{
                 loader: "babel-loader",
                 options: { cacheDirectory: true }
             }]
         }]
     },
     plugins: [
         new EslintPlugin({ cache: true })
     ]
 };
 
 ```

 ###  **定向搜索**

```js
    // 配置resolve提高文件的搜索速度，好处是定向指定必须文件路径
    // alias映射模块路径，extensions表明文件后缀，noParse过滤无依赖文件
    export default {
        // ...
        resolve: {
            alias: {
                "#": AbsPath(""), // 根目录快捷方式
                "@": AbsPath("src"), // src目录快捷方式
                swiper: "swiper/js/swiper.min.js"
            }, // 模块导入快捷方式
            extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"] // import路径时文件可省略后缀名
        }
    };
```

 ###  **提前构建**

配置DllPlugin将第三方依赖提前打包，好处是将DLL与业务代码完全分离且每次只构建业务代码

DLL意为动态链接库，指一个包含可由多个程序同时使用的代码库。在前端领域里可认为是另类缓存的存在，它把公共代码打包为	DLL文件并存到硬盘里，再次打包时动态链接DLL文件就无需再次打包那些公共代码，从而提升构建速度，减少打包时间

```js
    // 1. 首先告知构建脚本哪些依赖做成DLL并生成DLL文件和DLL映射表文件
    import { DefinePlugin, DllPlugin } from "webpack";
    
    export default {
        // ...
        entry: {
            vendor: ["react", "react-dom", "react-router-dom"]
        },
        mode: "production",
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        name: "vendor",
                        test: /node_modules/
                    }
                }
            }
        },
        output: {
            filename: "[name].dll.js", // 输出路径和文件名称
            library: "[name]", // 全局变量名称：其他模块会从此变量上获取里面模块
            path: AbsPath("dist/static") // 输出目录路径
        },
        plugins: [
            new DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("development") // DLL模式下覆盖生产环境成开发环境(启动第三方依赖调试模式)
            }),
            new DllPlugin({
                name: "[name]", // 全局变量名称：减小搜索范围，与output.library结合使用
                path: AbsPath("dist/static/[name]-manifest.json") // 输出目录路径
            })
        ]
    };
    
```

 ```js
 // 2. 然后在package.json里配置执行脚本且每次构建前首先执行该脚本打包出DLL文件。
 {
     "scripts": {
         "dll": "webpack --config webpack.dll.js"
     }
 }
 ```

 ```js
 // 3. 最后链接DLL文件并告知webpack可命中的DLL文件让其自行读取。使用html-webpack-tags-plugin在打包时自动插入DLL文件 
 import { DllReferencePlugin } from "webpack";
 import HtmlTagsPlugin from "html-webpack-tags-plugin";
 
 export default {
     // ...
     plugins: [
         // ...
         new DllReferencePlugin({
             manifest: AbsPath("dist/static/vendor-manifest.json") // manifest文件路径
         }),
         new HtmlTagsPlugin({
             append: false, // 在生成资源后插入
             publicPath: "/", // 使用公共路径
             tags: ["static/vendor.dll.js"] // 资源路径
         })
     ]
 };
 ```

 ###  **并行构建**

**配置Thread将Loader单进程转换为多进程**，好处是`释放CPU多核并发的优势`。在使用`webpack`构建项目时会有大量文件需解析和处理，构建过程是计算密集型的操作，随着文件增多会使构建过程变得越慢。

运行在`Node`里的`webpack`是单线程模型，简单来说就是`webpack`待处理的任务需一件件处理，不能同一时刻处理多件任务。

`文件读写`与`计算操作`无法避免，能不能让`webpack`同一时刻处理多个任务，发挥多核`CPU`电脑的威力以提升构建速度呢？[thread-loader](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fthread-loader)来帮你，根据`CPU`个数开启线程。

```js
import Os from "os";

export default {
    // ...
    module: {
        rules: [{
            // ...
            test: /\.js$/,
            use: [{
                loader: "thread-loader",
                options: { workers: Os.cpus().length }
            }, {
                loader: "babel-loader",
                options: { cacheDirectory: true }
            }]
        }]
    }
};
```

 ### **可视结构**

**配置BundleAnalyzer分析打包文件结构**，好处是`找出导致体积过大的原因`

使用[webpack-bundle-analyzer](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fwebpack-bundle-analyzer)配置

```js
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
    // ...
    plugins: [
        // ...
        BundleAnalyzerPlugin()
    ]
};
```

###  **分割代码**

  **分割各个模块代码，提取相同部分代码**，好处是`减少重复代码的出现频率`

```js
export default {
    // ...
    optimization: {
        runtimeChunk: { name: "manifest" }, // 抽离WebpackRuntime函数
        splitChunks: {
            cacheGroups: {
                common: {
                    minChunks: 2,
                    name: "common",
                    priority: 5,
                    reuseExistingChunk: true, // 重用已存在代码块
                    test: AbsPath("src")
                },
                vendor: {
                    chunks: "initial", // 代码分割类型
                    name: "vendor", // 代码块名称
                    priority: 10, // 优先级
                    test: /node_modules/ // 校验文件正则表达式
                }
            }, // 缓存组
            chunks: "all" // 代码分割类型：all全部模块，async异步模块，initial入口模块
        } // 代码块分割
    }
};
```

 ### **摇树优化**

**删除项目中未被引用代码**，好处是`移除重复代码和未使用代码`

`摇树优化`只对`ESM规范`生效，对其他模块规范失效。`摇树优化`针对静态结构分析，只有`import/export`才能提供静态的`导入/导出`功能。因此在编写业务代码时必须使用`ESM规范`才能让`摇树优化`移除重复代码和未使用代码。

```js
export default {
    // ...
    mode: "production"
};
```

### **动态垫片**

**通过垫片服务根据UA返回当前浏览器代码垫片**，好处是`无需将繁重的代码垫片打包进去`。每次构建都配置`@babel/preset-env`和`core-js`根据某些需求将`Polyfill`打包进来，这无疑又为代码体积增加了贡献。

`@babel/preset-env`提供的`useBuiltIns`可按需导入`Polyfill`。

-  **false**：无视`target.browsers`将所有`Polyfill`加载进来
-  **entry**：根据`target.browsers`将部分`Polyfill`加载进来(仅引入有浏览器不支持的`Polyfill`，需在入口文件`import "core-js/stable"`)
-  **usage**：根据`target.browsers`和检测代码里ES6的使用情况将部分`Polyfill`加载进来(无需在入口文件`import "core-js/stable"`)

在此推荐大家使用`动态垫片`。`动态垫片`可根据浏览器`UserAgent`返回当前浏览器`Polyfill`，其思路是根据浏览器的`UserAgent`从`browserlist`查找出当前浏览器哪些特性缺乏支持从而返回这些特性的`Polyfill`。对这方面感兴趣的同学可参考[polyfill-library](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FFinancial-Times%2Fpolyfill-library)和[polyfill-service](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FFinancial-Times%2Fpolyfill-service)的源码。

在此提供两个`动态垫片`服务，可在不同浏览器里点击以下链接看看输出不同的`Polyfill`。相信`IExplore`还是最多`Polyfill`的，它自豪地说：`我就是我，不一样的烟火`。

- **官方CDN服务**：[polyfill.io/v3/polyfill…](https://link.juejin.cn?target=https%3A%2F%2Fpolyfill.io%2Fv3%2Fpolyfill.min.js)
- **阿里CDN服务**：[polyfill.alicdn.com/polyfill.mi…](https://link.juejin.cn?target=https%3A%2F%2Fpolyfill.alicdn.com%2Fpolyfill.min.js)

使用[html-webpack-tags-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjharris4%2Fhtml-webpack-tags-plugin)在打包时自动插入`动态垫片`。

```js

// 代码解读
// 复制代码import HtmlTagsPlugin from "html-webpack-tags-plugin";

export default {
    plugins: [
        new HtmlTagsPlugin({
            append: false, // 在生成资源后插入
            publicPath: false, // 使用公共路径
            tags: ["https://polyfill.alicdn.com/polyfill.min.js"] // 资源路径
        })
    ]
};
```

### 按需加载

**将路由页面/触发性功能单独打包为一个文件，使用时才加载**，好处是`减轻首屏渲染的负担`

首屏渲染时只需对应`JS代码`而无需其他`JS代码`，所以可使用`按需加载`

`webpack v4`提供魔术注解命名`切割模块`，若无注解则切割出来的模块无法分辨出属于哪个业务模块，所以一般都是一个业务模块共用一个`切割模块`的注解名称

```js
const Login = () = import( /* webpackChunkName: "login" */ "../../views/login");
const Logon = () = import( /* webpackChunkName: "logon" */ "../../views/logon");
```

```js
运行起来控制台可能会报错，在package.json的babel相关配置里接入@babel/plugin-syntax-dynamic-import即可。
{
    // ...
    "babel": {
        // ...
        "plugins": [
            // ...
            "@babel/plugin-syntax-dynamic-import"
        ]
    }
}
```

### **作用提升**

**分析模块间依赖关系，把打包好的模块合并到一个函数中**，好处是`减少函数声明和内存花销`

在未开启`作用提升`前，构建后的代码会存在大量函数闭包。由于模块依赖，通过`webpack`打包后会转换成`IIFE`，大量函数闭包包裹代码会导致打包体积增大(`模块越多越明显`)。在运行代码时创建的函数作用域变多，从而导致更大的内存开销。

在开启`作用提升`后，构建后的代码会按照引入顺序放到一个函数作用域里，通过适当重命名某些变量以防止变量名冲突，从而减少函数声明和内存花销

```js
export default {
    // ...
    mode: "production"
};
// 显式设置
export default {
    // ...
    optimization: {
        // ...
        concatenateModules: true
    }
};

```

### 压缩资源

压缩HTML/CSS/JS代码，压缩字体/图像/音频/视频**，好处是`更有效减少打包体积`

针对`HTML`代码，使用[html-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjantimon%2Fhtml-webpack-plugin)开启压缩功能

```js
import HtmlPlugin from "html-webpack-plugin";

export default {
    // ...
    plugins: [
        // ...
        HtmlPlugin({
            // ...
            minify: {
                collapseWhitespace: true,
                removeComments: true
            } // 压缩HTML
        })
    ]
};
```
  

针对`CSS/JS`代码，分别使用以下插件开启压缩功能。其中`OptimizeCss`基于`cssnano`封装，`Uglifyjs`和`Terser`都是`webpack`官方插件，同时需注意压缩`JS代码`需区分`ES5`和`ES6`。

- [optimize-css-assets-webpack-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FNMFR%2Foptimize-css-assets-webpack-plugin)：压缩`CSS代码`
- [uglifyjs-webpack-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fuglifyjs-webpack-plugin)：压缩`ES5`版本的`JS代码`
- [terser-webpack-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fterser-webpack-plugin)：压缩`ES6`版本的`JS代码`

     ```js
     js
     import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
     import TerserPlugin from "terser-webpack-plugin";
     import UglifyjsPlugin from "uglifyjs-webpack-plugin";
     
     const compressOpts = type = ({
         cache: true, // 缓存文件
         parallel: true, // 并行处理
         [`${type}Options`]: {
             beautify: false,
             compress: { drop_console: true }
         } // 压缩配置
     });
     const compressCss = new OptimizeCssAssetsPlugin({
         cssProcessorOptions: {
             autoprefixer: { remove: false }, // 设置autoprefixer保留过时样式
             safe: true // 避免cssnano重新计算z-index
         }
     });
     const compressJs = USE_ES6
         ? new TerserPlugin(compressOpts("terser"))
         : new UglifyjsPlugin(compressOpts("uglify"));
     
     export default {
         // ...
         optimization: {
             // ...
             minimizer: [compressCss, compressJs] // 代码压缩
         }
     };
     
     ```

## **图像策略**
基于图像类型(`JPG/PNG/SVG/WebP/Base64`)

- **图像选型**：了解所有图像类型的特点及其何种应用场景最合适
- **图像压缩**：在部署到生产环境前使用工具或脚本对其压缩处理

| **工具**                                                     | **开源** | **收费** | API  | 免费体验                                             |
| ------------------------------------------------------------ | -------- | -------- | ---- | ---------------------------------------------------- |
| [QuickPicture](https://link.juejin.cn/?target=https%3A%2F%2Fwww.tuhaokuai.com) | ✖️        | ✔️        | ✖️    | 可压缩类型较多，压缩质感较好，有体积限制，有数量限制 |
| [ShrinkMe](https://link.juejin.cn/?target=https%3A%2F%2Fshrinkme.app) | ✖️        | ✖️        | ✖️    | 可压缩类型较多，压缩质感一般，无数量限制，有体积限制 |
| [Squoosh](https://link.juejin.cn/?target=https%3A%2F%2Fsquoosh.app) | ✔️        | ✖️        | ✔️    | 可压缩类型较少，压缩质感一般，无数量限制，有体积限制 |
| [TinyJpg](https://link.juejin.cn/?target=https%3A%2F%2Ftinyjpg.com) | ✖️        | ✔️        | ✔️    | 可压缩类型较少，压缩质感很好，有数量限制，有体积限制 |
| [TinyPng](https://link.juejin.cn/?target=https%3A%2F%2Ftinypng.com) | ✖️        | ✔️        | ✔️    | 可压缩类型较少，压缩质感很好，有数量限制，有体积限制 |
| [Zhitu](https://link.juejin.cn/?target=https%3A%2F%2Fzhitu.isux.us) | ✖️        | ✖️        | ✖️    | 可压缩类型一般，压缩质感一般，有数量限制，有体积限制 |

 ## **分发策略**
 基于内容分发网络(`CDN`)

- **所有静态资源走CDN**：开发阶段确定哪些文件属于静态资源
- **把静态资源与主页面置于不同域名下**：避免请求带上`Cookie`

 **缓存策略**：基于浏览器缓存(`强缓存/协商缓存`)

- **考虑拒绝一切缓存策略**：`Cache-Control:no-store`
- **考虑资源是否每次向服务器请求**：`Cache-Control:no-cache`
- **考虑资源是否被代理服务器缓存**：`Cache-Control:public/private`
- **考虑资源过期时间**：`Expires:t/Cache-Control:max-age=t,s-maxage=t`
- **考虑协商缓存**：`Last-Modified/Etag`

![缓存判断机制](/img/cache-1.png)

![强缓存.png](/img/cache-2.png)

![协商缓存.png](/img/cache-3.png)

整个`缓存策略`机制很明了，`先走强缓存，若命中失败才走协商缓存`。若命中`强缓存`，直接使用`强缓存`；若未命中`强缓存`，发送请求到服务器检查是否命中`协商缓存`；若命中`协商缓存`，服务器返回304通知浏览器使用`本地缓存`，否则返回`最新资源`。

有两种较常用的应用场景值得使用`缓存策略`一试，当然更多应用场景都可根据项目需求制定。

- **频繁变动资源**：设置`Cache-Control:no-cache`，使浏览器每次都发送请求到服务器，配合`Last-Modified/ETag`验证资源是否有效
- **不常变化资源**：设置`Cache-Control:max-age=31536000`，对文件名哈希处理，当代码修改后生成新的文件名，当HTML文件引入文件名发生改变才会下载最新文件

## 渲染层面

**渲染层面**的性能优化，无疑是如何让代码`解析更好执行更快`。因此笔者从以下五方面做出建议。

-  **CSS策略**：基于CSS规则
-  **DOM策略**：基于DOM操作
-  **阻塞策略**：基于脚本加载
-  **回流重绘策略**：基于回流重绘
-  **异步更新策略**：基于异步更新

上述五方面都是编写代码时完成，充满在整个项目流程的开发阶段里。因此在开发阶段需时刻注意以下涉及到的每一点，养成良好的开发习惯，`性能优化`也自然而然被使用上了。

`渲染层面`的`性能优化`更多表现在编码细节上，而并非实体代码。简单来说就是遵循某些编码规则，才能将`渲染层面`的`性能优化`发挥到最大作用。

**回流重绘策略**在`渲染层面`的`性能优化`里占比较重，也是最常规的`性能优化`之一。上年笔者发布的掘金小册[《玩转CSS的艺术之美》](https://juejin.cn/book/6850413616484040711)使用一整章讲解`回流重绘`，本章已开通试读，更多细节请戳[这里](https://juejin.cn/book/6850413616484040711/section/6850413616559194119)。

### CSS策略

- 避免出现超过三层的`嵌套规则`
- 避免为`ID选择器`添加多余选择器
- 避免使用`标签选择器`代替`类选择器`
- 避免使用`通配选择器`，只对目标节点声明规则
- 避免重复匹配重复定义，关注`可继承属性`

### DOM策略

- 缓存`DOM计算属性`
- 避免过多`DOM操作`
- 使用`DOMFragment`缓存批量化`DOM操作`

### 阻塞策略

- 脚本与`DOM/其它脚本`的依赖关系很强：对`<script`设置`defer`
- 脚本与`DOM/其它脚本`的依赖关系不强：对`<script`设置`async`

### 回流重绘策略

- 缓存`DOM计算属性`
- 使用类合并样式，避免逐条改变样式
- 使用`display`控制`DOM显隐`，将`DOM离线化`

### 异步更新策略

- 在`异步任务`中修改`DOM`时把其包装成`微任务`





