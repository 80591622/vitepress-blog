---
abbrlink: d3djjcc9
title: gulp
date: 2021-05-16
categories: 
- Gulp
---

<strong class='old-blog'>gulp</strong>

[[toc]]

[github 32k](https://github.com/gulpjs/gulp)

5种方法就可以支持几乎所有构建场景：

通过gulp.task注册一个任务；

通过gulp.run执行任务；

通过gulp.watch监听文件的变化；

通过gulp.src读取文件；

通过gulp.dest写文件。

Gulp的最大特点是引入了流的概念，同时提供了一系列常用的插件去处理流，流可以在插件之间传递，大致使用如下：


```javascript
// gulpfile.js   // 不区分大小写，也可以指定目录
'use strict';
const {series, src, dest} = require('gulp');
const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

function watch() {
  gulp.watch('./src/*.scss', series(compile));
}

exports.build = series(compile, copyfont);
exports.watch = series(watch);
```



从各个角度对 gulp 和 webpack 做的对比：

|          | Gulp                                                         | Webpack                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 定位     | 基于流的自动化构建工具                                       | 一个万能模块打包器                                           |
| 目标     | 自动化和优化开发工作流，为通用 website 开发而生              | 通用`模块`打包加载器，为移动端大型 SPA 应用而生              |
| 学习难度 | 易于学习，易于使用，api总共只有5个方法                       | 有大量新的概念和api，不过好在有详尽的官方文档                |
| 适用场景 | 基于流的作业方式适合多页面应用开发                           | 一切皆模块的特点适合单页面应用开发                           |
| 作业方式 | 对输入（gulp.src）的 js，ts，scss，less 等源文件依次执行打包（bundle）、编译（compile）、压缩、重命名等处理后输出（gulp.dest）到指定目录中去，为了构建而打包 | 对入口文件（entry）递归解析生成依赖关系图，然后将所有依赖打包在一起，在打包之前会将所有依赖转译成可打包的 js 模块，为了打包而构建 |
| 使用方式 | 常规 js 开发，编写一系列构建任务（task）。                   | 编辑各种 JSON 配置项                                         |
| 优点     | 适合多页面开发，易于学习，易于使用，接口优雅。               | 可以打包一切资源，适配各种模块系统                           |
| 缺点     | 在单页面应用方面输出乏力，而且对流行的单页技术有些难以处理（比如 Vue 单文件组件，使用 gulp 处理就会很困难，而 webpack 一个 loader 就能轻松搞定） | 不适合多页应用开发，灵活度高但同时配置很繁琐复杂。“打包一切” 这个优点对于 HTTP/1.1 尤其重要，因为所有资源打包在一起能明显减少浏览器访问页面时的资源请求数量，从而减少应用程序必须等待的时间。但这个优点可能会随着 HTTP/2 的流行而变得不那么突出，因为 HTTP/2 的多路复用可以有效解决客户端并行请求时的瓶颈问题。 |
| 结论     | 浏览器多页应用(MPA)首选方案                                  | 浏览器单页应用(SPA)首选方案                                  |



**webpack 怎么实现像 gulp 一样对大量源文件进行流式处理**
人家 webpack 本来就没打算做这事。webpack 不是以取代 gulp 为目的的，而是为了给大型 SPA 提供更好的构建方案。对大量源文件进行流式处理是 gulp 擅长的事，webpack 不想抢，也没必要抢。即使抢，也无非是再造一个蹩脚的 gulp 出来而已。

**既然 webpack 模块化这么强，那以后模块化就全用 webpack 好了**
webpack 模块化是强，但是他胖啊，不是所有人都抱得动，主要是他为了提供更多的功能封装进了太多东西，所以选择上还是需要因地制宜。如果单纯只是打包 js（多页应用往往是这种需求），完全可以使用 rollup，vite 这种小而美的实现，因为他们只做一件事——打包js。而如果需要将图片，样式，字体等所有静态资源全部打包，webpack 毫无疑问是首选。这也是为什么越来越多的流行库和框架开始从 webpack 转向使用 rollup 进行打包，因为他们只需要打包 js，webpack 好多强大功能根本用不到。连 rollup 官网也坦言如果你在构建一个库，rollup 绝对是首选，但如果是构建一个应用，那么请选 webpack。

**gulp 为何不吸取百家之长，把 webpack 的东西集成进来，反正都是开源的**
腾讯那么牛逼，你说他怎么不把阿里巴巴集成进来。集成应该是没可能，因为 gulp 和 webpack 的定位不一样。所以，没有放之天下而皆准的解决方案，只有具体问题具体分析选择适合的解决方案才能正确地解决问题。gulp 和 webpack 只是我们解决问题的工具，不要被工具束缚了手脚不能前进。

**扯了这么多，到底谁会被拍死在沙滩上**
可以看出来，这两个工具其实各有优缺，都有用武之地。合理地配合使用，取长补短，才能发挥最大的威力，所以这俩基友并不是互斥的，而是互补的，谁也不会被拍死在沙滩上。

