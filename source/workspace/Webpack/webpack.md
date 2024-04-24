
# Webpack4 配置详解

Webpack4后包拆成webpack和webpack-cli两个包：
 
 ```js
 // 安装webpack
 npm install --save-dev webpack webpack-cli
 ```
 
 主要有以下这些一级配置：
 
 ``` js
 module.exports = {
     mode: 'development', // 模式配置,webpack4.0新增
     entry: '', // 入口文件
     output: {}, // 出口文件
     module: {
         rules: [/*loader setting*/]
     }, // 配置modules，包括loader
     plugins: [], // 对应的插件
     devServer: {}, // 开发服务器配置
     optimization: {}, // 最佳实践
     devtool: '',
     resolve: { alias: {}},
 }
 ```
 
 ## 1. mode
 
 Webpack 4 引入了 mode 这个选项。这个选项的值可以是 development 或者 production。
 
 设置了 mode 之后会把 process.env.NODE\_ENV 也设置为 development 或者 production。然后在 production 模式下，会默认开启 UglifyJsPlugin 等一堆插件。
 
- webpack4支持ES6的方式导入JSON文件，并且支持Tree-shaking (通过工具"摇"我们的JS文件，将其中用不到的代码"摇"掉，是一个性能优化的范畴)
 
 ## 2. entry & output
 
```javascript{8,9,10,11,12,13,14,15,16,17}
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js', './src/login.js'],
    // 2.真正实现多入口和多出口需要写成对象的方式
    entry: {
        index: path.resolve(__dirname,'./src/index.js'),
        login: path.resolve(__dirname,'./src/login.js')
    },
    output: {
        // 1. filename: 'bundle.js', 'bundle.[hash:4].js',   
        // 2. [name]就可以将出口文件名和入口文件名一一对应
        filename: '[name].[hash:8].js',      // 打包后会生成index.313eerrd.js和login.dsfcersx.js文件
        path: path.resolve(__dirname,'../dist')   //打包后的目录
    },
     plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./public/index.html'),   // 用哪个html作为模板 , react一般在在src目录下public里创建一个index.html页面当做模板来用
            filename: 'index.html', //  要打包输出的文件名
            chunks: ['manifest','index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./public/login.html'),
            filename: 'login.html', 
            chunks: ['manifest','login']   // 对应关系,login.js对应的是login.html
        })
    ]
}

```
 
 ## 3. module - rules 配置
 
 webpack4中移除loaders配置，必须使用rules。rules 配置模块的读取和解析规则， 通常用来配置loader， 其类型是一个数组， 数组里每一项都描述了如何去处理部分文件。
 
 配置一项rules大致通过以下方式：
 1. 条件匹配： 通过test、include、exclude三个配置来命中Loader要应用的规则文件。(三个配置都可以是正则，也支持数组)
 2. 应用规则： 对选中后的文件通过use配置项来应用loader，可以应用一个loader或者按照从后往前的顺序应用一组loader。同时还可以分别给loader传入参数。
 3. 重置顺序： 一组loader的执行顺序默认是从右到左执行，通过exforce选项可以让其中一个loader的执行顺序放到最前或者是最后。
 
 ```js
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.css$/,     // 解析css
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'] // 从右向左解析
                /* 
                    也可以这样写，这种方式方便写一些配置参数
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: require.resolve('postcss-loader'),   //这里是加上浏览器的前缀
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'), //修复Flexbugs
                                    require('postcss-preset-env')({ //postcss-preset-env包括autoprefixer
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                        },
                                        stage: 3,
                                    }),
                                ]
                            },
                       }
                    ]
                */
            }
        ]
    }
}
 ```
 ## 4. optimization
 
 在Webpack4中引入，根据mode（production/development）的不同，配置项默认值不同，具体有以下：
 1. **optimization.minimize**： 是否自动压缩打包后的代码。mode = production时，为true。
 压缩默认使用`terser-webpack-plugin`插件(更加兼容ES6)，如果想要使用别的压缩插件，可以使用`optimization.minimizer`设置。
 
 1. **optimization.splitChunks**: 根据不同的策略来分割打包出来的bundle。配置基于[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/),剔除了老的`CommonsChunkPlugin`（webpack4移除）。
 1. 零配置
     * **optimization.nodeEnv**: 告诉webpack process.env.NODE_ENV的值，值来自于mode的取值。代替[webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
     * **optimization.namedModules**: 代替webpack.NamedModulesPlugin（webpack4移除）  `给模块有意义的名称代替ids`
     * **optimization.noEmitOnErrors**: 代替webpack.NoEmitOnErrorsPlugin（webpack4移除） `编译错误时不写入到输出`
     * **optimization.concatenateModules**: 代替webpack.optimize.ModuleConcatenationPlugin（webpack4移除） `尝试查找模块图中可以安全连接到单个模块中的段。- -`
 
[默认配置](https://segmentfault.com/a/1190000013712229?utm_source=index-hottest)


## 5. plugins
 
* 常用插件
 1. `HtmlWebpackPlugin` 自动在html中加载打包后的js文件
 1. `DLLPlugin/DllReferencePlugin` 提高打包速度
     * DLLPlugin：创建一个只有dll的bundle
     * DllReferencePlugin： 打包生成的dll文件引用到需要的预编译依赖上来
 1. happyPack 多进程打包，加快打包速度。
 1. `webpack.DefinePlugin` webpack4设置mode会自动使用
 1. `uglifyjs-webpack-plugin` webpack4 mode = production默认使用
 1. WebpackBar
 1. webpack-bundle-analyzer
 1. clean-webpack-plugin  清除dist文件夹里会残留上次打包的文件
* 废弃插件
ExtractTextWebpackPlugin 拆分css样式的插件(webapck4已废弃)。由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，
在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的extract-text-webpack-plugin也完成了其历史使命，
将让位于[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)。


 ## 6. devServer
 
 webpack的devServer配置基于webpack-dev-server集成的插件。该插件提供了proxy代理配置，基于express中间件 http-proxy-middleware实现，该中间件又基于node http-proxy,
 
 
 ```javascript
 devServer: {
     // 提供静态文件目录地址
     // 基于express.static实现
     contentBase: path.join(__dirname, 'dist'),
     // 任意的 404 响应都被替代为 index.html
     // 基于node connect-history-api-fallback包实现
     historyApiFallback: true,
     // 是否一切服务都启用 gzip 压缩
     // 基于node compression包实现
     compress: true,
     // 是否隐藏bundle信息
     noInfo: true,
     // 发生错误是否覆盖在页面上
     overlay: true,
     // 是否开启热加载
     // 必须搭配webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
     // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
     hot: true,
     // 热加载模式
     // true代表inline模式，false代表iframe模式
     inline: true, // 默认是true
     // 是否自动打开
     open: true,
     // 设置本地url和端口号
     host: 'localhost',
     port: 8080,
     // 代理
     // 基于node http-proxy-middleware包实现
     proxy: {
         // 匹配api前缀时，则代理到3001端口
         // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
         // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3001
         '/api': 'http://localhost:3001',
         // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
         // 主要解决跨域问题
         changeOrigin: true,
         // 针对代理https
         secure: false,
         // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
         pathRewrite: {'^/api' : ''}
     }
 }
 ```


 
 举个完整例子：
 
 ``` js{28,29,32,37,98,137,188,195,204}
 const path = require('path');
 const webpack = require('webpack');
 // 插件都是一个类，所以我们命名的时候尽量用大写开头
 const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html
 const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取出来css
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩打包后的js 
 const HappyPack = require('happypack'); // 多线程构建
 const happyThreadPool = HappyPack.ThreadPool({ size: 5 });  // 构造出共享进程池，进程池中包含5个子进程
 const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')// 最大化压缩css
 const Dotenv = require('dotenv-webpack');

 console.log('process.env.NODE_ENV------->',  process.env.NODE_ENV)
 // 解决css 分离后图片引入路径不正确问题
 if (process.env.type == 'build') { // 判断package.json里面是build还是dev命令
     // 开发
     var website ={
         publicPath:"/"
     }
 } else {
     // 生产
     var website ={
         publicPath:"/"
     }
 }
 
 
 module.exports = {
     // devtool:'eval-source-map',
     mode: 'development', // 模式配置
     entry: {
         main: './src/index.js',
     },             
     output: {
         filename: 'bundle.[chunkhash:6].js',
         path: path.resolve(__dirname, 'dist'),
         publicPath: website.publicPath, // 解决css 分离后图片引入路径不正确问题
     },             
     module: {
         rules: [
             {
                 test: /\.css/,
                 exclude: /node_modules/,
                 use: ['style-loader', MiniCssExtractPlugin.loader,//拆分css [对应109-112行]
                 {
                       loader: require.resolve('postcss-loader'),   //这里是加上浏览器的前缀
                       options: {
                           ident: 'postcss',
                           plugins: () => [
                               require('postcss-flexbugs-fixes'), //修复Flexbugs
                               require('postcss-preset-env')({ //postcss-preset-env包括autoprefixer
                                   autoprefixer: {
                                       flexbox: 'no-2009',
                                   },
                                   stage: 3,
                               }),
                           ]
                       },
                  }, 
                  'css-loader'],
             },
             {
                 test: /\.less$/,
                 exclude: /node_modules/,
                 use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
             },
             {
                 test: /\.(png|jpe?g|gif|svg)$/,
                 use: [
                     {
                         loader: 'url-loader',
                         options: {
                             limit: 10000,
                             name: '[name]_[hash:7].[ext]', 
                             outputPath:'static/images/'
                         }
                     }
                 ]
             },
             {
                 test: /\.(htm|html)$/,
                 use: 'html-withimg-loader'
             },
             // babel 解析es7 es6 jsx
             {
                 test:/\.(jsx|js)$/,
                 include: [ 
                     path.resolve(__dirname, 'src'),
                 ],
                 use:['babel-loader'],
                 /*
                     如果开启多线程进行构建
                     use:['happypack/loader?id=js'], 
                     loader这样写 匹配下面注释的插件
                 */
                 exclude:/node_modules/
             },
         ]
     },              
     plugins: [
         // 打包html
         new HtmlWebpackPlugin({
             template: './src/index.html',
             hash: true,
             minify: {
                 minifyCSS: true,
                 minifyJS: true, 
                 removeAttributeQuotes: true
             },
         }),
         new MiniCssExtractPlugin({
             filename: "static/css/[name].[chunkhash:8].css",
             chunkFilename: "[id].css"
         }),
         new UglifyJsPlugin({
             parallel: true, 
         }),
         new Dotenv(), // 配置 .env 文件
         new webpack.DefinePlugin({
             NODE_ENV: JSON.stringify('DEV')
         }),
         // 多线程构建 匹配上面的loader
         // new HappyPack({
         //     id: 'js',
         //     //threads: 4,
         //     loaders: ['babel-loader'],
         //     threadPool: happyThreadPool, // 使用共享进程池中的子进程去处理任务
         // }),
         'postcss-px-to-viewport': {
            viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
            viewportUnit: "vw",   //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false     // 允许在媒体查询中转换`px`
         }   
     ],   
     // 提取公共代码
     optimization: {
         minimizer: [
            // 自定义js优化配置，将会覆盖默认配置 最大化压缩成js
             new UglifyJsPlugin({
                 exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                 cache: true,
                 parallel: true, // 开启并行压缩，充分利用cpu
                 sourceMap: false,
                 extractComments: false, // 移除注释
                 uglifyOptions: {
                   compress: {
                     unused: true,
                     warnings: false,
                     drop_debugger: true
                   },
                   output: {
                     comments: false
                   }
                 }
             }),
             // 用于优化css文件 最大化压缩成css 并且去掉注释掉的css
             new OptimizeCssAssetsPlugin({
                 assetNameRegExp: /\.css$/g,
                 cssProcessorOptions: {
                   safe: true,
                   autoprefixer: { disable: true },
                   mergeLonghand: false,
                   discardComments: {
                     removeAll: true // 移除注释
                   }
                 },
                 canPrint: true
             })
            ],
             splitChunks: {
                 cacheGroups: {
                 vendor: {   // 抽离第三方插件
                     test: /node_modules/,   // 指定是node_modules下的第三方包
                     chunks: 'initial',
                     name: 'vendor',  // 打包后的文件名，任意命名    
                     // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                     priority: 10    
                 },
                 // utils: { // 抽离自己写的公共代码，utils这个名字可以随意起 (css/js公用的都会单独抽离出来生成一个单独的文件)
                 //     chunks: 'initial',
                 //     name: 'utils',  // 任意命名
                 //     minSize: 0    // 只要超出0字节就生成一个新包
                 // }
             }
         }
     },        
     devServer: {
         historyApiFallback: true,
         inline: true
     },   
     // externals: {
     //     jquery: "jQuery",
     // },
     resolve: {
         // alias 别名配置，它能够将导入语句里的关键字替换成你需要的路径
         alias: {
             // 比如我们就可以直接写 import Nav from '@/Nav'
             '@': './app/component'
         },
         // 省略后缀
         extensions: ['.js', '.jsx', '.less', '.json', '.css'],
     },     
     performance: {
         hints: false // 选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
     }
 }
 ```
 
 
 ## 参考文章
 
 * [实战](https://juejin.im/post/5de87444518825124c50cd36?utm_source=gold_browser_extension)
 
 * [webpack optimization](https://webpack.js.org/configuration/optimization/)
 
 * [Upgrade to Webpack 4](https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5)
 
 * [webpack编译速度提升之DllPlugin](https://juejin.im/post/5b3e22e3f265da0f4b7a72df)
 
 * [webpack4.0打包优化策略系列](https://juejin.im/post/5abbc2ca5188257ddb0fae9b)
