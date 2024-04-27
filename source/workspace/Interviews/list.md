

# 面试清单

## 一
```text
数组去重的方法有哪些？
如何判断左右小括号是否全部匹配。如 ( ( ))()((((()))))
JS 的事件机制
如何劫持 XMLHttpRequest 的 send() 方法，调用他的时候，把参数输出到控制台。
git 和svn 的区别，git 的本地仓库有什么用呢？
为什么简单的项目选择使用 jQuery 而不用 vue 。
跨域解决方案有哪些？jsonp 的原理及缺点？及如何判断 JS 加载完成了？IE7不支持 script.onload 事件怎么办？
浏览器的渲染机制？
浏览器最大并发量限制是多少个？及如何去突破这个限制？
缓存机制？
内存泄漏，及如何主动的去发现是否存在内存泄漏？
你们平时项目的 JS 异常有做上报处理吗？是什么实现的？
xss 攻击的原理和预防？
eslint 是怎么使用的？
webpac打包性能优化，如何分块打包，及 HMR 的实现原理。
React的虚拟dom是什么？及 diff 算法原理？
SSR(服务端渲染)的作用，及它有什么缺点？？？
HTTP和HTTPS的握手过程，是否了解HTTP2的特点，以及怎么理解它的多路复用
MVVW是什么，有什么优缺点
怎么实现记住登录功能（很强的整体性）
怎么实现统一登录，或者授权登录需要考虑什么（更强的整体性）
JS手写二分搜索算法
用JS代码求出页面上一个元素的最终的background-color，不考虑IE浏览器，不考虑元素float情况。(window.getComputedStyle、当这个元素的背景色为透明时，它最终的背景色应该为其父元素的背景色。)
html和CSS绘制柱状图,用CSS和JS动画在刚才那个柱状图中表现出快排的整个过程
HTML5新特性(新增的标签, API等)，如localstorage的用法以及与cookie的区别，如何理解web语义化
CSS3新特性，如动画等
CSS特性，如position的用法，如何实现居中，bootstrap源代码的理解，盒模型(W3C和IE)，flex的使用
前端兼容性处理(CSS hack技术)
JS基础，如this用法，new关键字的过程，call与apply的区别，闭包，原型以及JS如何实现继承
前端基础，浏览器缓存，跨域，从输入url到渲染的整个过程，事件(W3C和IE)，TCP三次握手过程，如何实现懒加载(跟预加载的区别)
之前有看过你做的一个移动页简历，请问如何实现？我主要是使用REM+Media Query，根据不同尺寸的设备进行不同的font-size设置。然后问我REM和EM的区别，如果父元素的font-size也是采用em表示，那么子元素的font-size怎么计算等。
有没有遇到过margin重叠的现象，如何解决？BFC
常见的清除浮动的方法有哪些？bootstrap是怎么做的？bootstrap是怎么实现grid系统的？
怎么理解JS模块化？有没有使用过webpack？
什么是浅复制和深复制？有什么区别？如何实现Object的深复制？
Jquery的源代码怎么进行Object的深复制的
数据类型判断(https://juejin.im/post/5b0554c86fb9a07acb3d3ddc)
set和map的区别
浏览器解析javascript的词法是怎样的
```


## 二
```text
js 中 module 的了解
写一个单例模式
跨域方法
get 与 post 的区别
http 与 tcp 的区别
业务的了解
浏览器的缓存问题
vim 的优势是什么
react 和 vue有什么不同
IFC
BFC
内联元素与块级元素的区别
react 单向数据流与传统 MVC，MVP的区别
String.prototype.trim
把短横线字符转化为驼峰式字符
三列布局
getComputedStyle
N个数和为M
你最满意的项目，你觉得有哪些地方做的比较好
自适应的正方形
如何实现一个轮播图
基本数据类型
事件流冒泡和捕获，捕获用在什么地方
跨域和跨域的解决方法
你最满意的项目，你觉得有哪些地方做的比较好
setInterval 与 setTimeout 的区别
react 和 vue 的区别
跨域和跨域的解决方法
http 的状态码有哪些
html5 有哪些新的东西
localStorage 和 sessionStorage 的区别
setInterval 与 setTimeout 的区别
webpack 有哪些东西，有哪些loader 和 plugin
你最满意的项目，你觉得有哪些地方做的比较好
数组去重，就地
react的声明周期，各在里边做些什么操作
react 请求发出去时组件已经卸载，fetch 如何取消
async 会返回什么，如果发送多个async，多个 async 预制失败
如何做一些网站的性能优化
如何优化 webpack 体积
简单介绍下 grid layout，与table有什么不同
简单介绍下 redux ，它会不会循环
简单介绍一下CI，写一个脚本还是写一个程序
状态码和方法，101
502 和 504的区别
事件传播的阶段，以及addEventListener的执行顺序，绑定一个函数会执行几次
virtual DOM 是什么以及是如何实现的
dom diff 是什么
get 和 post 请求
如何进行 CI 以及测试的，是否使用 ESLint
Accept 头部的作用什么，如果服务器不支持怎么办
tcp 如何做拥塞控制
事件代理是什么，如何实现
如何判断一个对象的类型，
如何把一个类数组转化为数组
inline，inline-block，block元素有什么区别，其中inline-block元素有哪些，img是inline-block吗
position 的取值
四分布局flex与float有什么区别
移动端一像素边框问题
移动端如何禁止屏幕缩放
移动端如何适配屏幕
移动端如何调试
数组去重问题
如何判断一个 DOM 节点包含另一个 DOM 节点，html5 如何做，兼容性怎么处理
如何筛选出一个祖父节点下的所有指定class的元素，html5如何做，兼容性怎么处理，如何判断一个节点是指定的class，正则表达式如何提取(漏了querySelectorAll)
如何提取 path 路径中的文件名，正则表达式如何提取
如何实现模板字符串
suggestion 下拉列表如何做，应该使用什么事件，input，keyup, keypress 与 change 有什么不同
301 与 302 的区别
如何实现图片的懒加载
如何使用 canvas 处理图片
从浏览器输入 url 到页面展现的过程
csp 是什么，xss 与 csrf 是什么，原理以及预防
如何实现一个 animate.js
如何实现一个模板引擎，并且能处理嵌套数据
如何实现两个函数的继承
好像做不到继承属性，util.inherits 也不继承属性
如何替换一个文件中的内容
shell 中如何做循环
for in 与 Object.keys 的区别
找出数组中最小的n个数
bloom filter 是什么
Function.prototype.bind 的实现
```

## 三
```text
一道 setTimeout/Promise 输出顺序问题的题
什么是事件循环
async 与 generator 的关系以及实现原理
react 和 vue 有什么区别
vue 的双向绑定怎么实现的，在 3.0 后呢
react 的生命周期是什么
react 中的 key 用来做什么
有没有看过 fiber 的代码，原理是什么
什么是 virtual DOM
webpack 的原理是什么，loader 和 plugin 的作用是什么
如何使用 webpack 优化体积
网站性能优化有哪些方面
有没有了解过 shell
如何替换一个文件中的内容
对一个文件如何只查看特定行的内容
你们的 node 的服务端应用如何部署
docker 部署有什么好处
部署时如何利用服务器的多核
你们有没有对服务端的异常进行监控
你如何看待前端和后端
如何查看一个 node 的服务端应用的内存和CPU
当服务端的内存发生了 OOM 问题如何排查
如何监控某个进程的内存和 CPU
当一个云主机的内存占用过大，如何找到内存占用最大的进程
数据库索引中为什么要用 Btree
如何优化 SQL
如何监控数据库的慢查询
当一个地址从输入到展示在浏览器中有哪些步骤
TCP 的三次握手是什么
TCP 为什么要三次握手
TCP 与 UDP 的区别是什么，既然 TCP 是可靠的，那它有啥缺点
如何在 linux 中拿到 TCP 的状态
TCP 的拥塞控制是怎么做的
什么是 ARP 欺骗
什么是防抖和节流
写一段关于防抖的代码
graphql 有什么好处和劣势
你遇到过哪些 OOM 的事例，都是什么问题，以及如何解决的
什么是 serverless，如何看待它的发展
服务端渲染的原理是什么
服务端渲染会遇到哪些问题，与客户端渲染如何取舍
除了服务端渲染，还有哪些做 SEO 的方案
react hooks 有什么好处
如何做 tracing
如果给 log 都加上 requestId，应该怎么做
async hooks 是用来干嘛的
如何设计一个高并发系统
对数据库做过什么优化
有没有看过 libuv 代码
什么是IO多路复用
redis 的使用场景有哪些
你们的 qps 是多少
你们业务跑了多少台机器
如果优化你们的 qps
如何做弹性扩容
如何设计一个短网址服务
rpc 与 rest 相比有什么优势与劣势
什么是TCP粘包
如何设计一个消息队列，要注意什么地方
```


## 四
```text
弹性布局使用场景
bfc
定位都有哪些
样式的优先级
http 缓存
new 发生了什么
原型里面声明和prototype里面声明的一样 优先级
基本数据类型 和引用数据类型的区别和判断 栈和堆
设计模式
hooks
webworker
*事件代理
http码
dva的原理
koa 中间件
git 工作流
工程目录怎么搭建的
```

## 五
```text
事件委托
深浅拷贝的区别
Object.assign
BFC
Fiber
virtual dom
diff算法
hook
webpack流程
webpack打包出来的js的结构，内容是什么
babel编译原理
node的优势
node中，async/await，generator，promise的区别，联系
多用户来访问聊天服务器，你有1000台服务器，应该怎么办（坑啊）
Vue双向绑定如何实现
Vue数据流
Vue与React的区别
```

## 六
```text
输入url到页面渲染展示
DNS如何解析
输入域名如何转换为ip地址，然后转到服务器
gzip原理
cookie localStorage sessionStorage
cookie与token的本质区别（session）
闭包 及其常见的应用场景
缓存
强缓存如何存
过期时间等参数浏览器是如何获取的
服务器如何设置缓存设置头
缓存的场景
call apply区别
React的事件机制
virtual dom
hooks的优势，为何被喜欢，常用的方式
React数据流
HOC，优势及其常用方式
setState获取更新的值
csrf 和 xss
flex布局，及你常用的方式，兼容性
前端性能优化（你用过的）
node异步的历史（答了async/await, generator）
webpack流程
webpack-dev-server原理
webpack配置项与常用插件
ES6的语法，及你常用的
Mobx的原理
盒模型与怪异盒模型
HTTP报文结构，请求头有啥，响应头有啥
最近看什么书，看什么文章，打算考研吗
栈，队列
10万个数字找最大的K个数（描述了快排，及如何实现，时间复杂度，最好，最差的情况下）
DFS与BFS，如何实现
小程序与H5的区别，商业性、技术性（小程序有自己独立的保护机制，独立运行在一个地方，不会破坏现有生态）
nginx怎么配置
阿里云dns怎么配置解析（A？TXT？）
箭头函数和普通函数
按钮设置监听用箭头函数this指向哪
jwttoken
服务器开启服务（nohup，pm2）
Taro编译原理
typescript优势，为何收到推崇
```

## React相关问题

**问题**

- 控制台报 Warning:Autoprefixer applies control comment to whole block, not to next rules.

意思是让单行(而不是块)的规则需要用 autoprefixer: ignore next
```css
/* autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
//此时需修改成
/* autoprefixer: ignore next */
-webkit-box-orient: vertical
```
- 路由缓存的问题
- 但双击同时存在的问题
- 循环map,判断data.length，需要加上>0或者直接取反 
- hooks不同步的更新问题
- BrowserRouter上线刷新304问题，nginx重定向
- 本地代理和服务器反向代理
- setState代码不更新的问题【可能使用了不可变的插件】
- key 用的index,当列表有其他不跟数据相关的盒子时候，删除前面的任何一项，都会是最后那个 盒子的内容丢失
- IE 360急速浏览器的兼容
- this指向的问题
- 父子组件通信 「redux,父传子，context，本地储存，cloneElement,Render Props」
- setState为什么是异步的、什么时候是异步的？

**优化**
- 长列表使用（虚拟化长列表react-window 和 react-virtualized ）
- ReactDOM.createPortal(child,container);
- 不可变数据
- 函数式组件
- PureComponent

**新的api**
- context
- lazy  suspense
