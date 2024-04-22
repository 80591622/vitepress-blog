---
abbrlink: 7d86d2ac
title: NodeJs 插件拓展
date: 2019-09-15
categories: 
- Server
- NodeJS
- NodeJs 插件拓展
---

<strong class='old-blog'>NodeJs 插件拓展</strong>

[[toc]]

## node-scheduleNodejs定时任务

[node-schedule](https://github.com/node-schedule/node-schedule)  Nodejs定时任务

**安装**

```javascript
yarn add node-schedule -D
```

**使用**

### Cron风格定时器

```javascript
const scheduleCronstyle = () => {
  schedule.scheduleJob('1-59 * * * * *', () => {
    // sendEmail();
    console.log(11);
  });
};

scheduleCronstyle();
```

6个占位符从左到右分别代表：`秒、分、时、日、月、周几`

`*`表示通配符，匹配任意，当秒是`*`时，表示任意秒数都触发，其它类推

下面可以看看以下传入参数分别代表的意思

```text
每分钟的第59秒触发： '59 * * * * *'
每小时的1分59秒触发 ：'59 1 * * * *'
每天的凌晨1点1分59秒触发 ：'59 1 1 * * *'
每月的1日1点1分59秒触发 ：'59 1 1 1 * *'
2020年的1月1日1点1分59秒触发 ：'59 1 1 1 2020 *'
每周天的1点1分30秒触发 ：'30 1 1 * * 0'
```

### 基于日期的计划

```javascript
const scheduleCronstyle = () => {
  const date = new Date(2020, 4, 26, 15, 10, 10);
  const j = schedule.scheduleJob(date, function(){
    console.log('scheduleObjectLiteralSyntax:' + new Date());
  });
};
```

### 对象文本语法定时器

```text
second (0-59)
minute (0-59)
hour (0-23)
date (1-31)
month (0-11)
year
dayOfWeek (0-6) Starting with Sunday
```

```javascript
const scheduleCronstyle = () => {
// 周末的10点11分
  const j = schedule.scheduleJob({hour: 10, minute: 11, dayOfWeek: 0}, function () {
    console.log('hi 小哥明天该上班了啊:' + new Date());
  });
};
```

### 设置开始时间和结束时间

```javascript
// 5秒后运行，并在10秒后停止
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
  console.log('Time for tea!');
});
```

### 取消定时器

```javascript
const scheduleCronstyle = () => {
// 周末的10点11分
  const j = schedule.scheduleJob({hour: 10, minute: 11, dayOfWeek: 0}, function () {
    console.log('hi 小哥明天该上班了啊:' + new Date());
  });

  setTimeout(function () {
    console.log('定时器取消');
    // 定时器取消
    j.cancel();
  }, 5000);
};
```

**写在之后**

定时器功能大部分需求都可以借助`node-schedule`完成了，用它在项目中使用效果也不错，各种需求可以满足^_^!

## qrcode-terminal在终端输出二维码

[qrcode-terminal](https://github.com/gtanner/qrcode-terminal)在终端输出二维码

**安装**

```javascript
yarn add qrcode-terminal -D
```

**使用**

```javascript
const qrcode = require('qrcode-terminal');

const url = 'http://www.wk.jing999.cn';
qrcode.generate(url);
// 第二个参数 {small:true} 第三个参数是回调
```

## node爬虫

### superagent / axios / node-fetch  请求数据

> **superagent** 拓展性强，同时支持 Node.js 和浏览器，通过构建插件可以实现更多功能 ；缺点：其 API 不符合任何标准<br/>
> **axios** 支持 Promise API，同时支持 Node.js 和浏览器<br/>
> **node-fetch** 轻量级的模块,与window.fetchAPI 保持一致，在nodeJs中使用

### cheerio

[cheerio](https://cheerio.js.org/) 可以理解为一个Node.js版本的jquery

```javascript
let cheerio = require('cheerio');
let $ = cheerio.load("<div id='helloworld'>hello world</div>", {ignoreWhitespace: true...})
```

#### 选择器

```text{1,8,23,34}
// 属性操作
.attr(name, value)
.removeAtrr(name)
.hasClass(className)
.addClass(className)
.remoteClass([className])

// 遍历
.find(selector)
.parent()
.next()
.prev()
.siblings()
.children( selector )
.each( function(index, element) )
.map( function(index, element) )
.filter( selector )
.filter( function(index) )
.first()
.last()
.eq(i)

// 操作DOM
.append( content, [content, ...] )
.prepend( content, [content, ...] )
.after( content, [content, ...] )
.before( content, [content, ...] )
.remove( [selector] )
.replaceWith( content )
.empty()
.html( [htmlString] )
.text( [textString] )

// 其他
$.html()
$('ul').text()
.toArray()
.clone()
$.root()
$.contains( container, contained )
```

### iconv-lite

有些时候,获取到的数据是一些乱码,尤其是中文的情况.所以我们需要解决乱码的问题,`iconv-lite`模块就可以解决这一问题.
```javascript
homeBody = iconv.decode(homeBody,"GBK"); //进行gbk解码
```
如果有乱码就在 `cheerio.load()`之前进行解码
```javascript
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> //这里是utf-8,就不需要解码
```
如果是静态页面上面的操作基本上就已经完成了，但是现实中毕竟都是spa 大行其道很多都不是静态的，所以不能用 cheerio 模块来解析。

### 动态页面爬取

- **手动复制body,用IDE或者node起服务进行爬取，人力成本比较高**
- **找到数据接口,直接爬去**，有的网页打开控制台全部是debug,并不能高效的找到对应的数据接口 [csdn](https://blog.csdn.net/zhang6223284/article/details/80152368)
- **最近刚看到的，[puppeteer](https://github.com/puppeteer/puppeteer)** [文档链接](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v3.0.1&show=api-class-puppeteer)

- **phantomjs 跟上面的类似**


## ora 控制台进度条

```js
const ora = require('ora')
const spinner = ora({text: 'loading......', color: 'red'})
spinner.start()
setTimeout(() => {
  spinner.stop()
}, 2000)
```

## yargs 命令行参数解析工具

```js
const yargs = require('yargs');
console.log(yargs.argv);

// node yargs.js -f -l false  --force
// { _: [
```

## inquirer 终端命令行交互工具

```js
const inquirer = require('inquirer')
inquirer.prompt([{
  type: 'checkbox', // list、input、number、confirm、rawlist、expand、checkbox、password、editor
  choices: ['scss', 'ts', 'vuex'],
  name: 'type',// 字段名
  message: '添加项目功能',
  default: true
}]).then((answers) => {
  console.log('结果为:');
  console.log(answers)
})
```

```html
添加项目功能 (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ scss
 ◉ ts
 ◉ vuex
 ```