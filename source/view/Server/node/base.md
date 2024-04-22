---
abbrlink: e48f83pp
title: NodeJs的原生方法
date: 2019-03-15
categories: 
- Server
- NodeJS
- NodeJs的原生方法
---

<strong class='old-blog'>NodeJs的原生方法</strong>

[[toc]]

### process.argv


process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。

process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，

其中：

数组的第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径

第二个元素process.argv[1]——为当前执行的JavaScript文件路径

剩余的元素为其他命令行参数

例如：

```javascript
// 输入
node config.js aaaa bbbb cccc

process.argv
// 输出
[
  '/usr/local/bin/node',
  '/Users/wk/workspace/zy-vue/babel.config.js',
  'aaaa',
  'bbbb',
  'cccc'
]
```

### fs

![image-20221205231721390](https://tva1.sinaimg.cn/large/008vxvgGgy1h8tcp0epc6j31q70u045s.jpg)

fs.promises API 提供了一组备用的异步文件系统的方法，它们返回 Promise 对象而不是使用回调。 API 可通过 require('fs').promises 访问。

