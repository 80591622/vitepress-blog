---
abbrlink: d3djpphh
title: rollup
date: 2021-05-16
categories: 
- Rollup
---

<strong class='old-blog'>rollup</strong>


[github 20k](https://github.com/rollup/rollup)

[文档](https://www.rollupjs.com/guide/introduction)

与webpack 偏向于应用打包的定位不同， rollup.js 更专注于 Javascript 类库打包 。



the-answer  

与 webpack 和 browserify 这样的其他捆绑包不同， rollup 不知道如何打破常规去处理这些依赖。因此我们需要添加一些配置。



- -f 。 -f 参数是 --format 的缩写，它表示生成代码的格式， amd 表示采用 AMD 标准， cjs 为 CommonJS 标准， esm （或 es）为 ES 模块标准。 -f 的值可以为 amd 、 cjs 、 system 、 esm （'es’也可以）、 iife 或 umd 中的任何一个。
- -o 。 -o 指定了输出的路径，这里我们将打包后的文件输出到 dist 目录下的 bundle.js

其实除了这两个，还有很多其他常用的命令（这里我暂且列举剩下两个也比较常用的，完整的rollup 命令行参数）：

- -c 。指定 rollup 的配置文件。
- -w 。监听源文件是否有改动，如果有改动，重新打包。



- input
  入口文件地址
- output

```javascript
output:{
    file:'bundle.js', // 输出文件
    format: 'cjs,  //  五种输出格式：amd /  es6 / iife / umd / cjs
    name:'A',  //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
    sourcemap:true  //生成bundle.map.js文件，方便调试
}
```

- plugins
  最常用的就是babel插件了,比较不爽的是，babel 的预设不像 webpack 可以直接写在配置文件里，而还是得独立写个“src/.babelrc”（注意我们可以写在 src 下，而不是非得放在项目根目录下）



```javascript
// .babelrc 
{
  "presets": [
    ["env", {
      "modules": false
    }]
  ],
}
```

- external

```javascript
external:['lodash'] //告诉rollup不要将此lodash打包，而作为外部依赖
```



### 整体打包流程

```javascript
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

const env = process.env.NODE_ENV

export default {
  input: ["./package/watermark.js"],
  output: {
    file: "./lib/index.js",
    format: "umd",
    name: "waterMark",
    sourcemap: false
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    babel({babelHelpers: 'bundled'}),
  ], // babel这个 显式配置此选项（即使使用其默认值）
  external: ["the-answer"],
};
```

