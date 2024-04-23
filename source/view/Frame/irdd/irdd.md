
# irdd 组件库

开发组件库，遇到的问题


## 使用插件

- popper.js Popper.js是一款功能强大的JS定位引擎。 [https://blog.csdn.net/jhzhahuaiyu/article/details/90213582]()
- deepmerge/object-assign 实现两个对象的深度合并，类似于Object.assign(),但是是多层的合并  [https://blog.csdn.net/weixin_34198797/article/details/93476329]()
- async-validator  antd和element等ui库 都有引入这个插件,表单验证  [https://www.cnblogs.com/wozho/p/10955525.html]()
- vue-markdown-loader  vue的md组件
- css-color-function 转化css颜色
- markdown-it-anchor 锚点插件,用于段落跳转  hash路径问题
  - https://github.com/valeriangalliat/markdown-it-anchor/blob/HEAD/README-zh_CN.md
- transliteration  把汉语转化为拼音  [https://www.npmjs.com/package/transliteration](https://www.npmjs.com/package/transliteration)
- markdown-it   [markdown解析器](https://markdown-it.docschina.org/#%E7%94%A8%E6%B3%95%E7%A4%BA%E4%BE%8B)
- markdown-it-chain 用于链式调用,参考 webpack-chain
- [markdown-it-container](https://www.npmjs.com/package/markdown-it-container)  自定义包裹元素插件识别 markdown 语法:::
- highlightjs  [https://highlightjs.org/static/demo/](https://highlightjs.org/static/demo/)
- vue-codemirror  线上ide   [https://github.com/surmon-china/vue-codemirror](https://github.com/surmon-china/vue-codemirror)  [https://blog.csdn.net/weixin_43080277/article/details/83860629](https://blog.csdn.net/weixin_43080277/article/details/83860629)

- resize-observer-polyfill [https://github.com/que-etc/resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill)

  element-resize-detector [https://github.com/wnr/element-resize-detector](https://github.com/wnr/element-resize-detector)

  resize-detector https://github.com/Justineo/resize-detector

  监控元素DOM变化



## 去除inline-block元素间间距的N方法

- webpack 去除空格了

- ```javascript
  let rep = function (match, item1, item2, item3) {
    // item2 是空格部分
    return item1 + item3
  }
  html.replace(/(>)(\s*)(<)/g, rep);
  ```

- [css  去除空格](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)



## scss用法大全

bem  [gulp-postcss、postcss-salad]  、 saladcss-bem

BEM是一个命名约定，让前端代码更容易阅读和理解，更容易协作，更加健壮和明确，而且更加严密。

```javascript
.block{}
.block__element{}
.block--modifier{}

// 注释:
// .block代表了更高级别的抽象或组件
// .block__element代表.block的后代，用于形成一个完整的.block的整体。
// .block–modifier代表.block的不同状态或不同版本。
```

ELE  自己编写的

scss 函数方法 ： [https://www.cnblogs.com/Zting00/p/7497640.html](https://www.cnblogs.com/Zting00/p/7497640.html)



## 组件挂载

Babel直接编译需要先挂载才能用、Vue.extend可以随时挂载


全局挂载组件之 [vue.extend](https://juejin.cn/post/6844904190255300615)



## todo 

- 升级babel  ✅
- 文档侧边栏  ✅
- 主题换色 ✅ 
- 历史版本文档（cdn） ✅
- 按需加载 ✅

- 异常页面  https://luolr.github.io/mhc-iView-doc/components/exception

- TextCopy 文本复制   ✅

- 富文本    ✅

- 更改媒体的 meta 信息

- Ide 鼠标划上跳出用法详情 （.d.ts）   ✅

- Table thead置顶、table虚拟滚动、里面包含div的话会有位置的顺序的偏差

- 所有列举文字 都是图书命  ✅

- 国际化

- hash时候锚点跳转的问题   ✅

- 除去浏览器默认空格   ✅

  
  

## 手动按需加载

**js  按需加载**  

 babel-plugin-component(ele)     fork 的babel-plugin-import

babel-plugin-import（antd)

## **css 按需加载** 

1. 打包到组件中 

 webpack多入口打包可以，但是热加载后的资源是放到内存中，不能引入(可以引入原文件)   但是js里面还是会有少量的针对css加载的代码（导致包变大）

组件库中引入其他的组件  css重复添加  

2. 额外单独打包

使用gulp的原因是能实时编译，而且发布包的时候不用额外打包，
Js组件的体积小，组件内部没有关系css的样式(使用webpack打包抽离css的时候，会有少量真对css的代码)

css打包多个的时候，需要多页面打包，或者统一引入到一个js里面，更复杂，没有冗余代码

针对一些不是组件的样式，需要开发者可以自行引入的  (transtion.css)样式 支持友好

修改**css**后，可直接针对样式打包，不用所有的组件重新打包

减少耦合

能做主题换肤功能  导出scss文件



## **组件库微前端优势**

减少外在因素干扰

同级样式干扰

不是一个移动端容器，容器不同

拓展不足

vw vh rem响应式拓展不足

浏览器前缀

分享功能，或者移动端打开

需要同时服务两套系统

一些移动端的资源重复检查

埋点



## 一期分享

1. 锚点跳转、刷新、回退定位问题
2. 动态修改主题色（3种）
3. 行内块元素之间的间距 （loader）i
4. css 的使用方式  - BEM
5. Jsx  直接引入也ok
6. 版本之间跳转的问题
7. 在线ide
8. markdown      <span v-text="radio"></span>
9. highlight  代码高亮
10. 一个组件使用另一个组件  记得导入css
11. 启动慢、hmr慢的问题  开发优化、生产保持现有的



## 外部扩展(Externals)



**防止**将某些 `import` 的包(package)**打包**到 bundle 中，而是在运行时(runtime)再去从外部获取这些*扩展依赖(external dependencies)*。

```javascript
const nodeExternals = require("webpack-node-externals");
const Components = require("../components.json");

// 防止打包的时候再重新打包一次，直接使用require引入，开发者打包的时候自己会继承到项目内。 优点：打包速度快、体积小、需要区分开发和生产的包
// var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
let externals = {};

Object.keys(Components).forEach(function(key) {
  // 这里要和约定好的路径对应上，不然就会把组件打包进来
  externals[`packages/${key}/index.js`] = `irdd/lib/${key}`;
});

// "packages/button/index.js": "irdd/lib/button",
externals = [Object.assign({
  vue: "vue",
}, externals), nodeExternals()];

exports.externals = externals;
```

## 区分dependencies和devDependencies

因为上面使用了Externals 会导致一些插件直接引入不会打包进去，就可能会导致开发依赖的在组件库中使用，到开发者手中就会报错提示找不到该插件或者版本不一致的问题。

## utils 

为了方便使用，建议放到文件的第一级目录下  `import {} from "irdd/utils"`,也可以建立一个入口，直接引入打包后的地址



## types 的代码提示

纯手写

## 按需加载

将 .babelrc 的 plugins 修改为：

```javascript
"plugins": [
 [
  "import",
  {
    "libraryName": "irdd",
    "styleLibraryDirectory": "src/styles/lib"
  }
 ]
]
```

irdd: 样式也可以按需加载, 可以使用cdn全量导入。

[iview](https://www.iviewui.com/docs/guide/start#TBTX) ：按需引用仍然需要导入样式

[Ele-plus](https://element-plus.gitee.io/#/zh-CN/component/quickstart#yang-shi-de-yin-ru): 我们**强烈建议直接引入全部的样式文件**，虽然这看起来会增大整个应用的体积，但这样做可以避免引入额外的打包工具插件（减少负担）



注意 Webpack 不能百分百安全地进行 tree-shaking。有些模块导入，只要被引入，就会对应用程序产生重要的影响。一个很好的例子就是**全局样式表**，或者设置全局配置的 JavaScript 文件。webpack4 默认地将所有代码视为有副作用。这可以保护你免于删除必要的文件，但这意味着 Webpack 的默认行为实际上是不进行 tree-shaking。webpack5默认会进行 tree-shaking，所以需要在package.json 设置下sideEffects属性 

```javascript
// 所有文件都有副作用，全都不可 tree-shaking
{
 "sideEffects": true
}
// 没有文件有副作用，全都可以 tree-shaking
{
 "sideEffects": false
}
// 只有这些文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件
{
 "sideEffects": [
  "*.less",
  "*.css",
  "dist/*",
  "es/**/style/*",
  "lib/**/style/*",
 ]
}
```



## 补坑  按需加载

**坑位1** 

使用 babel-plugin-import 做的按需加载，出现的问题就是，做了按需加载后不能全量导入，解决的办法就是 删除.babael的文件  或者 使用 `import Irdd from "irdd/es"` or  `const Irdd = require('irdd')`

需要注意的点是 此插件默认是查找到你的文件名称，需保持css和js命令是一致的，默认是短斜杠格式，可设置。

**坑位2** 

![](https://tva1.sinaimg.cn/large/008i3skNly1gurubwhk7nj60su09yjss02.jpg)

上述错误是因为 webpack 没有配置默认可以不写 `.css`的 extensions, 配置下即可

```js
// webpack下
resolve: {
 extensions: [".js", ".jsx", ".vue", ".css", ".scss", ".json", ".md"],
}

// vue-cli下
{
  chainWebpack: config => {
    config.resolve.extensions.add('.css').end()
  }
}
```

##  JSX下  component 失效

`@vue/babel-helper-vue-jsx-merge-props` 编译 `element-ui` 组件库 `table`的时候，内部编译导致 `dom` 丢失，
所以使用此组件时需保证项目中有在使用 `el-table` 



## 外部不具名的坑

发版后 ，yarn、cnpm获取不到最新的npm包   需要手动刷新下 [同步频率目前为 **10分钟**](https://developer.aliyun.com/special/npm/notice)

迁移前 babel 版本不一致，导致解析的不一样

一期组件库的入口  `...component` ,生产引发的 BUG FIX

## NPM 下载问题

发版后 ，yarn、cnpm获取不到最新的npm包   需要手动刷新下 [同步频率目前为 **10分钟**](https://developer.aliyun.com/special/npm/notice)

**设置白名单**

`.npmignore`的文件，是一种`黑名单`机制，在包发布时用于排除某些文件或目录跟`.gitigonre`一致。



比如，我有一份非常全的`.npmignore`清单，我不想去动它，可又想把清单上的一些文件放开并上传到npm，怎么办呢？

答案是：通过配置`package.json`里的`files`字段来解决。
比如，我的`.npmignore`清单忽略了`examples`整个目录：



```javascript
examples
```

配置`package.json`里的`files`字段放开`examples`下的`white-label.txt`文件:

```javascript
{
  "files": [
    "examples/white-label.txt"
  ],
}
```

## 优先级问题

如果项目同时存在`.gitignore`,`.npmignore`,并且配置了`files`字段,优先级如下：
`files`>`.npmignore`>`.gitignore`。



## markdown-loader  编译小胡子语法



## rem 未编译 （@import ''）

https://github.com/cuth/postcss-pxtorem/issues/38

```javascript
 {
   test: /\.(scss|css)$/,
     use: [
       isProd ? MiniCssExtractPlugin.loader : "style-loader",
       "css-loader",
       "postcss-loader", // 新版本不支持在此配置，转postcss.config.js
       "sass-loader",
     ],
 }
```


## pc 下没有滑动事件

[桌面适配](http://vant-contrib.gitee.io/vant/v2/#/zh-CN/advanced-usage#zhuo-mian-duan-gua-pei)

## 组件库打包出现 const

```js
// 组件库的 .babelrc
"@babel/preset-env",
   {
   "modules": false,
   "targets": {
     "browsers": [
       "Android >= 4",
       "iOS >= 8"
     ]
   }
```

