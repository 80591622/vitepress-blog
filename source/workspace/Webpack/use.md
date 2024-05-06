
# Webpack的使用

## 优化速度

```javascript
1.异步加载模块
2.提取第三库
3.代码压缩
4.去除不必要的插件
5.图片base64
6.按需加载
7.开启Gzip压缩
8.多进程打包
```

## splitChunks分割拆包

### chunk-vendors.js 简介

顾名思义，chunk-vendors.js 是捆绑所有不是自己的模块，而是来自其他方的模块的捆绑包，它们称为 **第三方模块或供应商模块**。

通常，它意味着（仅和）来自项目 /node_modules 目录的所有模块，会将所有 /node_modules 中的第三方包打包到 chunk-vendors.js 中。

将所有的第三方包集中到一个文件，自然也会出现文件过大的问题。


- Webpack4之SplitChunksPlugin
- Webpack3的CommonsChunkPlugin（已废弃）

```javascript
//自己项目的配置
{
    splitChunks: {
      chunks: 'all',
      minSize: 30000,//分离后的最小块文件大小，单位为字节
      maxSize: 0,
      minChunks: 1,//分离前，该块被引入的次数（也就是某个js文件通过import或require引入的次数）
      maxAsyncRequests: 5,//内层文件（第二层）按需加载时最大的并行加载数量
      maxInitialRequests: 3,//一个入口文件可以并行加载的最大文件数量
      automaticNameDelimiter: '~',//修改上文中的 “~” ,  若改为： “-” 则分离后的js默认命名规则为 [来源]-[入口的key值].js
      name: true,//用以控制分离后代码块的命名，当存在匹配的缓存组（后面会说到）时，命名使用缓存组中的name值，若不存在则为  [来源]~[入口的key值].js  的格式
      cacheGroups: {//名字叫做缓存组，其实就是存放分离代码块的规则的对象，叫做cacheGroup的原因是webpack会将规则放置在cache流中，为对应的块文件匹配对应的流，从而生成分离后的块。
      // 抽取所有CSS为一个文件
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
      styles: { name: 'styles', test: /\.css$/, chunks: 'all', enforce: true },
    
      // 第三方组件
      common: {
        name: 'common',
        chunks: 'all',//chunks :匹配的块的类型：initial（初始块），async（按需加载的异步块），all（所有块）
        test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
        priority: 10,
        enforce: true,
        reuseExistingChunk: true // 可设置是否重用该chunk
      },
      // 指定组件
      antd: {
        name: 'antd',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        priority: -10,
        enforce: true,
        reuseExistingChunk: true // 可设置是否重用该chunk
      },
      excel: {
        name: 'excel',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](js-export-excel)[\\/]/,
        priority: -20,
        enforce: true,
        reuseExistingChunk: true // 可设置是否重用该chunk
      },
       echarts: {
          name: 'echarts',
          chunks: 'async',  //设置异步导入，什么时候用什么时候导入
          test: /[\\/]node_modules[\\/](echarts|echarts-for-react)[\\/]/,
          priority: 80,
          enforce: true,
          reuseExistingChunk: true // 可设置是否重用该chunk
      }
    },
    runtimeChunk: {
        name: "manifest"  //用于管理被分出来的包，优化持久化缓存的,如果不设置这个的话，一旦代码有变动的话，main.js的hash就会发生变化,
        // optimization.runtimeChunk 就是告诉 webpack 是否要把这变化的部分单独打包出来
    }
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h3bm2vwy9uj212q0d075s.jpg)


### 记一次拆包遇到的坑

最近一个需求把页面多处 bn.js  分割出来，抽离到一个单独的js中，使用 SplitChunksPlugin 做了分割之后，发一个一个问题 如下图
![image-20220617223038058](https://book.img.zhangyue01.com/idc_1/group61/M00/19/B2/CmQUOGOuqsCEBEBUAAAAAHJAJt871789693.jpeg?v=x8YRy3aL&t=CmQUOGOuqsA.)

最后定位到的问题是因为项目中用了 crypto-js 加密组件，这个模块存在一个bug导致webpack会把原生crypto模块打包进来，导致项目 polyfile 后包的体积大了400多k。跑题了，为什么出现 bn.js 抽离后还是冗余在一起的问题

cryptojs 兼容 nodeJs 的写法 既可以在浏览器中使用也可以在服务端使用，间接导致出现很多个 bn.js。 

直接抽离会有上图bug,因为有的包在node环境下webpack不认 会导致一个bn.js被抽离多次。解决办法就是统一出口，统一用一个bn.js 包然后在进行分割。

```js
// 第一步 设置成一个出口 resolve
alias: {
  'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
}


//  然后在抽离出来 SplitChunksPlugin
 bn: {
   name: 'bnjs',
   chunks: 'initial',
   test: /[\\/]node_modules[\\/](bn.js)[\\/]/,
   priority: 1,
   enforce: true,
   reuseExistingChunk: true
 },
```

做到这里还没完，不然项目启动的时候会出现白屏的情况。 需要把分割后的 chunk-bnjs 引入到 HtmlWebpackPlugin 的 chunk 中.

```js
new HtmlWebpackPlugin({
    ... // 
    chunks: ['manifest','chunk-bnjs']   
})
```

vue-cli 直接在 pages 对象中添加即可.


**参考资料**

https://github.com/brix/crypto-js/issues/276


https://github.com/NervJS/taro/issues/8169

https://github.com/TencentCloudBase/cloudbase-js-sdk/issues/1


## 外部扩展(Externals)


externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。

此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。


**防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖**




例如，从 CDN 引入 [jQuery](https://jquery.com/)，而不是把它打包：

**index.html**

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"
></script>
```

**webpack.config.js**

```javascript
module.exports = {
  //...
  externals: {
    jquery: 'jQuery',
  },
};
```

这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：

```javascript
import $ from 'jquery';

$('.my-element').animate(/* ... */);
```

上面 `webpack.config.js` 中 `externals` 下指定的属性名称 `jquery` 表示 `import $ from 'jquery'` 中的模块 `jquery` 应该从打包产物中排除。 为了替换这个模块，`jQuery` 值将用于检索全局 `jQuery` 变量，因为默认的外部库类型是 `var`


### externals 高级配置

上面的 externals 配置都是用的是简单的对象，key 和 value 都是字符串，其实相当于

![img](https://pic4.zhimg.com/80/v2-b2a45ab76f7ae9a3decfa7613a9a263b_1440w.webp)

- **root**：可以通过一个**全局变量**访问 library（例如，通过 script 标签）。
- **commonjs**：可以将 library 作为一个 CommonJS 模块访问。
- **commonjs2**：和上面的类似，但导出的是 module.exports.default.   模块引入 适合编写组件库
- **amd**：使用 AMD 模块系统。


[webpack 如何处理 externals](https://zhuanlan.zhihu.com/p/115305393)

## 定义全局变量(DefinePlugin)

```javascript
//eslint 设置通过
 "globals": {
     "ENV": true
 },
 new webpack.DefinePlugin({
     //必须 JSON.stringify()，然后在eslint里面，global()通过一下
    ENV: JSON.stringify(process.env.ENV), // 执行环境
}),

```

## webpack代理

- webpack-dev-server
```javascript
//在配置文件webpackDevServer.config.js添加，
//新版本直接在package.json 里面添加，但是只能添加一个并且是字符串，也可在src下添加setupProxy.js

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy("/pic", {
            "target": "http://120.79.229.197:9000",
            "changeOrigin": true,
            "secure": false,
            "pathRewrite": {"^/pic": ""}
        })
    );
};

```

## .babelrc

```javascript
// 可以配置在package.json里面直接修改
{{
   "presets": [
     [
     "@babel/preset-env", {
       "targets": {
         "chrome": 58,
         "ie": 11
       }
     }
   ], "react-app"],
   "plugins": [
     ["import", {
         "libraryName": "antd",
         "libraryDirectory": "es",
         "style": "css"
       }
     ],
     ["@babel/plugin-proposal-decorators", { "legacy": true }],  //用于转换装饰器代码的插件。
     [
       "@babel/plugin-transform-runtime",
       {
         "absoluteRuntime": false,
         "corejs": 2,
         "helpers": true,
         "regenerator": true,
         "useESModules": false
       }
     ]
   ],
   "env": {
     "production": {
       "plugins":  ["transform-remove-console"]
     }
   }
 }

```

## .env

定义一些环境变量，可以通过process.env.[name]拿取出来

```javascript
GENERATE_SOURCEMAP=false  //禁止输出.map文件
```

```js
const Dotenv = require("dotenv-webpack"); // 配置 .env变量

//...
plugins: [
// ....
new Dotenv({
  path: env && env !== "development" ? `./.env.${env}` : `./.env`,
}),
],
```
## 优化输出的文件

`taro为例`

```javascript
/**
* hash:hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改
* 采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash。
*
* chunkhash:根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
* 我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
* 
* filename:决定了entry入口文件输出文件的名称。 (main.js)
* 
* chunkFilename:决定了非入口(non-entry) chunk 文件的名称,比如按需加载（异步）模块的时候 (组件打包的js)
*/


//js文件的输出
output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
},
//css文件的输出
miniCssExtractPluginOption: {
    filename: 'css/[name].[hash:8].css',
    chunkFilename: 'css/[name].[chunkhash:8].css'
},
//img文件的输出
imageUrlLoaderOption: {
    limit: 1024*50,
    name: 'static/images/[name].[hash:8].[ext]'
},
```

## webpack对图片做了什了？（面试题）

**url-loader：** 如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl(base64)。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy


**file-loader：**  解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
 
**image-webpack-loader：**  对图片进行压缩和优化

[image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)

```javascript
{
test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],

// options: {
//     limit: 10000,
//     name: 'static/media/[name].[hash:8].[ext]',
// },
use: [
    {
        loader: require.resolve('url-loader'),
        options:
            { // 这里的options选项参数可以定义多大的图片转换为base64
                name: 'static/images/[name].[hash:8].[ext]',
                limit: 1024 * 50, // 表示小于50kb的图片转为base64,大于50kb的是路径
                // outputPath: 'images' //定义输出的图片文件夹
            }
    },
    // {    //压缩图片要在file-loader之后使用
    //     loader: require.resolve('image-webpack-loader'),
    //     options:
    //         {
    //             bypassOnDebug: true
    //         }
    // }
]
},
                        
```

## webpack用到的插件
 
```javascript
webpack-dev-server  //热更新
clean-webpack-plugin   //在打包输出前清空文件夹
mini-css-extract-plugin //拆分css
/*
new MiniCssExtractPlugin({
 filename: 'static/css/[name].[contenthash:8].css',
 chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
})
*/
extract-text-webpack-plugin@next //拆分多个css
terser-webpack-plugin/uglifyjs-webpack-plugin  //压缩js 解决uglifyjs不支持es6语法问题
optimize-css-public-webpack-plugin //最大化压缩css


image-webpack-loader  //图片压缩
webpackbar  //进度条
dotenv-webpack  // 配置 .env 文件
@babel/plugin-proposal-decorators(transform-decorators-legacy 基于babel6)   //装饰器
redux-devtools-extension  //配置redux工具
babel-plugin-transform-remove-console  //生产环境清除控制台的内容
webpack-bundle-analyzer  //打包体积优化
happyPack //多进程打包，加快打包速度。
postcss-loader  //css编译的工具
postcss-preset-env //将现代CSS转换成浏览器能理解的东西,无需再安装autoprefixer
postcss-flexbugs-fixes //修复Flexbugs
postcss-px-to-viewport //把px转换成viewport单位
postcss-pxtorem //把px转换成rem
```

## require.context是什么

一个webpack的api,通过执行`require.context`函数获取一个特定的上下文,主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')
Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
// files.keys() 获取所有的文件目录，不带后缀
let modules = {}
files.keys().forEach(key => {
    let name = path.basename(key, '.js')
    modules[name] = files(key).default || files(key) // 获取所有的内容
})

const store = new Vuex.Store({
    modules,
    getters
})
export default store
```
## 端口号被占用 

```js
const portfinder = require("portfinder"); // 端口号被占取下个端口

// ...

devServer: {
port: new Promise((resolve, reject) => {
  portfinder.getPort({ port: 9000, stopPort: 9999 }, (err, port) => {
    if (port) {
      console.log("项目运行端口：" + port);
      resolve(port);
    } else {
      reject(9000);
    }
  });
}),
proxy: {
  "/msg": {
    target: "https://www.iowen.cn/jitang/api/",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/msg": "",
    },
  },
},
},
```
