---
abbrlink: 3e1a3a
title: ES6-新增特性一览
date: 2019-01-16
categories: 
- JS
- ES6-新增特性一览
---

<strong class='old-blog'>ES6-新增特性一览</strong>

[[toc]]

### 1. let/const取代var

### 2. 字符串模板

### 3. 对象解构

### 4. 新数据类型 Symbol

### 5. 新数据结构[Map/Set/WeakMap/WeakSet](https://github.com/lukehoban/es6features#map--set--weakmap--weakset)

### 6. [Proxy](https://github.com/lukehoban/es6features#proxies)、[Reflect](https://www.cnblogs.com/zczhangcui/p/6486582.html)

### 7. 扩展

* 字符串填充（padStart 和 padEnd）

* Array
    * Array.from()
    * Array.of()
    * Array.copyWithin()
    * Array.find()
    * Array.findIndex()
    * Array.fill()
    * Array.includes()<sup>`ES7`</sup>
* Object
    * Object.keys()
    * Object.values()<sup>`ES8`</sup>
    * Object.entries()<sup>`ES8`</sup>
    * Object.assign()
    * Object. is()

### 8. 异步
* [Promise](https://github.com/lukehoban/es6features#promises)
    * Promise.prototype.then
    * Promise.prototype.catch
    * Promise.prototype.finally<sup>`ES9`</sup>
    * Promise.all()
    * Promise.rece()
* [Iterator](https://github.com/lukehoban/es6features#iterators--forof)
    * Iterator接口
    * for of
* [Generator](https://github.com/lukehoban/es6features#generators)
    * yield*
* async/await<sup>`ES8`</sup>


### 9. Class类

* class
* extends
* decorator<sup>`ES7`</sup>

### 10. Module

* import
* export

```javascript
// export default 方式
import defaultName from 'modules.js';

// export type 方式
import { export1, export2 } from 'modules';
import { export1 as ex1, export2 as ex2 } from 'moduls.js'; // as 关键字
import * as moduleName from 'modules.js';

// 同时引入export default 和export type
import defaultName, { expoprt1, export2 } from 'modules';
import defaultName， * as moduleName from 'modules';

// 引入无输出模块
import 'modules';

```

### 参考文档

* [司徒正美](https://zhuanlan.zhihu.com/p/87699079)

* [es6features](https://github.com/lukehoban/es6features)

* [Finished Proposals](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

* [ryf es6 reference](http://es6.ruanyifeng.com/#docs/reference)
