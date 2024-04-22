<!-- ---
abbrlink: 7bfdfcb0
title: Babel-polyfill
date: 2019-01-16
categories: 
- Webpack
- Babel-polyfill
--- -->

<strong class='old-blog'>Babel-polyfill</strong>

[[toc]]

### @babel/preset-env、@babel/polyfill和@babel/plugin-transform-runtime

@babel/preset-env,这可以说是babel官方的得意之作，最早的时候没有这个包，有的是babel-preset-es2015这样的包，后来每次新标准发布之后，就要新加一个包。<br/>
babel顺应民意，发布了babel-preset-env这个包，它一次性囊括了已发布的所有标准包。<br/>
首先我们需要明确一下，preset-env的首要作用，不是帮我们把ES6+代码转成ES5.它的首要作用是认读ES6+代码。<br/>
在使用preset-env之前，babel是无法认识ES6+代码的，运行时会报Token错误。在使用preset-env之后，babel才能认识这些代码语法，并将它们抽象出AST树。<br/>
preset-env本身包含了一大堆plugin，并通过配置来控制插件，从而控制转码效果<br/>

#### polyfill了解下

babel 编译时只`转换语法`，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM里面不兼容的API<br/>
比如 **Promise,Set,Symbol,Array.from,Array.is,async** 等等的一些API<br/>
这时候就需要 polyfill 来转转化这些API<br/>
babel 转译语法需要一些plugin<br/>
如**babel-preset-es2015,stage-0,stage-1**等等<br/>
其中的 es2015 表示 babel会加载 es6 相关的编译模块，然后 stage-0 表示的是什么呢？<br/>
stage 系列集合了一些对 es7 的草案支持的插件，由于是草案，所以作为插件的形式提供。<br/>

```javascript
stage-0 - Strawman: just an idea, possible Babel plugin.
stage-1 - Proposal: this is worth working on.
stage-2 - Draft: initial spec.
stage-3 - Candidate: complete spec and initial browser implementations.
stage-4 - Finished: will be added to the next yearly release.
```
	
stage 是向下兼容  0>1>2>3>4 所包含的插件数量依次减少

polyfill 有三种：
```javascript{2}
babel-runtime
babel-plugin-transform-runtime(推荐-默认依赖于babel-runtime)
babel-polyfill
````
因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，<br/>
这些polyfill包就是在babel-runtime这个包里 core-js 、regenerator等  polyfill。<br/>
babel-runtime和 babel-plugin-transform-runtime的区别是，相当一前者是手动挡而后者是自动挡，每当要转译一个api时都要手动加上require('babel-runtime')，<br/>
而babel-plugin-transform-runtime会由工具自动添加，主要的功能是为api提供沙箱的垫片方案，不会污染全局的api，因此适合用在第三方的开发产品中。<br/>

#### @babel/preset-env

**targets**
控制目标浏览器的版本

**modules**
默认为commonjs，设置为false时，不会转码模块加载，import from 语法不会转码

**useBuiltIns**
是否自动加载polyfill。它有三个值可选：false（默认）, entry, usage。

**corejs**
承接useBuiltIns，当useBuiltIns值为entry或usage时，有效。它可以设置为：2，3，{ version:2, proposals:true }

#### @babel/polyfill

这个包是一个纯运行时的包，不是babel插件。它的作用是直接改写全局变量，从而让运行环境支持经过present-env转码后的代码


```js
[
  '@babel/preset-env',
  {
    'corejs': 3, // 使用 core-js@3 版本，core-js@2 从 ES2017 之后就没再更新了，不推荐使用
    'useBuiltIns': 'usage', // 只转译用到的新语言元素
    'bugfix': true, // v7.9 之后引入的新选项，尽量减小转译后的代码体积，v8 之后会变成默认选项
  },
],
```

```js
function test() {
  new Promise()
}
test()
const arr = [1,2,3,4].map(item => item * item)
console.log(arr)
```

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h26ym1lcfhj20te0g8jsq.jpg)

直接重写了 Promise ，污染全局

#### @babel/plugin-transform-runtime

在webpack中，**babel-plugin-transform-runtime 实际上是依赖babel-runtime** <br/>


- 它有两个作用：
  - 将preset-env所产生的helpers函数提出到一个独立文件中，从而减少代码量
  - 建立运行时沙盒，避免全局污染

<!-- **corejs** -->

**helpers**
是否要将所有helper函数提炼到另外一个公共文件中。默认为true。

当使用@babel/plugin-trasnform-runtime之后，原本babel会直接在文件中创建一个helper函数，现在会采用require的方式，从@babel/runtime中引入这些函数，这样就可以减少代码量

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h26yo5knxaj21k20u0n0w.jpg)


### babel7中 corejs 和 corejs2 的区别

最近在给项目升级babel7，有一些改变但是变化不大,在升级中发现 babel7 变化挺大的，包括插件和包。
其中一项功能特别赞，就是  @babel/preset-env  中的  useBuiltIns  选项，如果你设置了  usage ，babel 编绎的时候就不用整个 polyfills , 只加载你使用 polyfills，这样就可以减少包的大小。
在使用 babel 中还想减少代码，就需要引入 babel 的运行时：

```js
yarn add @babel/plugin-transform-runtime -D
yarn add @babel/runtime
```
需要注意的是：

1. `两个包引入的范围不一样：一个在开发时引入，一个在运行时引入。`
2. plugin-transform-runtime 已经默认包括了 @babel/polyfill，因此不用在独立引入。

在 plugin-transform-runtime 中有一个 corejs 很奇怪，可以设置成 false 或者 2。这是为什么这样？<br/>
大家知道 corejs 是一个给低版本的浏览器提供接口的库，如 Promise, map, set 等。<br/>
在 babel 中你设置成 false 或者不设置，就是引入的是 corejs 中的库，而且在全局中引入，也就是说侵入了全局的变量。可以观察以下的代码：
```javascript
// 这是你写的代码
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
// babel 编绎成的代码
"use strict";
require("core-js/modules/es6.promise");  // 这里可以看出是全局引入
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
```
如果你的全局有一个引入，防止引入的库影响全局，那你就需要引把 corejs 设置成2。下面就是设真置成2，编绎成的代码：
```javascript
"use strict";
var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise")); // 独立变量
function sleep(ms) {
  return new _promise.default(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
```
可以从编绎出的代码看到，Promise 代码变成了一个独立的变量 _promise，不会影响全局的 Promise。<br/>
这样的好处是，引入的库者自己引入了一个变量，这样如果你引入的第三方库会对 Promise 进行一些自定义操作，这样就可以避免第三方库报错。<br/>
还要注意一点是： 如果你设置了 corejs2，那你就需要加入下面的库:

<span style='display: block;text-align: left;'> corejs选项</span>|<span style='display: block;text-align: left;'> 安装命令</span>|<span style='display: block;text-align: left;'>里面包含的文件</span>
--|:--:|:--:|--|
false |	yarn add @babel/runtime |  helpers、regenerator
**2** |	**yarn add  @babel/runtime-corejs2** |  core-js、helpers、regenerator
3  | yarn add  @babel/runtime-corejs3 | 还支持实例属性（例如[].includes)

参考文档：<br/>
[babel-preset-env](https://babeljs.io/docs/en/babel-preset-env/)

[babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

runtime转换器插件主要做了三件事：

```js
当你使用generators/async方法、函数时自动调用babel-runtime/regenerator
当你使用ES6 的Map或者内置的东西时自动调用babel-runtime/core-js
移除内联babel helpers并替换使用babel-runtime/helpers来替换


transform-runtime优点
    不会污染全局变量
    多次使用只会打包一次
    依赖统一按需引入,无重复引入,无多余引入

transform-runtime缺点
   不支持实例化的方法Array.includes(x) 就不能转化
   如果使用的API用的次数不是很多，那么transform-runtime 引入polyfill的包会比不是transform-runtime时大

babel-polyfill则是通过改写全局prototype的方式实现，比较适合单独运行的项目。
    开启babel-polyfill的方式，可以直接在代码中require，或者在webpack的entry中添加，也可以在babel的env中设置useBuildins为true来开启。
    但是babel-polyfill会有近100K，
    打包后代码冗余量比较大，
    对于现代的浏览器,有些不需要polyfill，造成流量浪费
    污染了全局对象

@babel/runtime-corejs2包含三个文件夹：
    core-js  引用core-js这个npm包
    helpers  定义了一些处理新的语法关键字的帮助函数
    regenerator  仅仅是引用regenerator-runtime这个npm包
```


### 库项目

@babel/preset-env 拥有根据 useBuiltIns 参数的多种polyfill实现，优点是覆盖面比较全（entry）， 缺点是会污染全局， 推荐在业务项目中使用

库类项目推荐使用 `@babel/plugin-transform-runtime`，因为库项目通常会面临另一个问题。如果我们直接导入 core-js 作 polyfill 的话，像 `Promise`，`Set`，`Map` 这样的全局对象就会被覆盖。对于一般的应用而言，问题不大；但如果是库，你无法预期其它开发者会在什么情况下使用你的库，很可能他的目标平台都支持这些新语法元素，不希望转译污染。

此时，使用 `@babel/plugin-transform-runtime` 可以让 babel 在转译时使用沙箱垫片和代码复用， 避免帮助函数重复 inject 过多的问题， 该方式的优点是不会污染全局



