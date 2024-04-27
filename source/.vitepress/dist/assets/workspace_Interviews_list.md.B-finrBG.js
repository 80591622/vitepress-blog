import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BQQWXjGs.js";const h=JSON.parse('{"title":"面试清单","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Interviews/list.md","filePath":"workspace/Interviews/list.md","lastUpdated":1713942612000}'),l={name:"workspace/Interviews/list.md"},e=p(`<h1 id="面试清单" tabindex="-1">面试清单 <a class="header-anchor" href="#面试清单" aria-label="Permalink to &quot;面试清单&quot;">​</a></h1><h2 id="一" tabindex="-1">一 <a class="header-anchor" href="#一" aria-label="Permalink to &quot;一&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>数组去重的方法有哪些？</span></span>
<span class="line"><span>如何判断左右小括号是否全部匹配。如 ( ( ))()((((()))))</span></span>
<span class="line"><span>JS 的事件机制</span></span>
<span class="line"><span>如何劫持 XMLHttpRequest 的 send() 方法，调用他的时候，把参数输出到控制台。</span></span>
<span class="line"><span>git 和svn 的区别，git 的本地仓库有什么用呢？</span></span>
<span class="line"><span>为什么简单的项目选择使用 jQuery 而不用 vue 。</span></span>
<span class="line"><span>跨域解决方案有哪些？jsonp 的原理及缺点？及如何判断 JS 加载完成了？IE7不支持 script.onload 事件怎么办？</span></span>
<span class="line"><span>浏览器的渲染机制？</span></span>
<span class="line"><span>浏览器最大并发量限制是多少个？及如何去突破这个限制？</span></span>
<span class="line"><span>缓存机制？</span></span>
<span class="line"><span>内存泄漏，及如何主动的去发现是否存在内存泄漏？</span></span>
<span class="line"><span>你们平时项目的 JS 异常有做上报处理吗？是什么实现的？</span></span>
<span class="line"><span>xss 攻击的原理和预防？</span></span>
<span class="line"><span>eslint 是怎么使用的？</span></span>
<span class="line"><span>webpac打包性能优化，如何分块打包，及 HMR 的实现原理。</span></span>
<span class="line"><span>React的虚拟dom是什么？及 diff 算法原理？</span></span>
<span class="line"><span>SSR(服务端渲染)的作用，及它有什么缺点？？？</span></span>
<span class="line"><span>HTTP和HTTPS的握手过程，是否了解HTTP2的特点，以及怎么理解它的多路复用</span></span>
<span class="line"><span>MVVW是什么，有什么优缺点</span></span>
<span class="line"><span>怎么实现记住登录功能（很强的整体性）</span></span>
<span class="line"><span>怎么实现统一登录，或者授权登录需要考虑什么（更强的整体性）</span></span>
<span class="line"><span>JS手写二分搜索算法</span></span>
<span class="line"><span>用JS代码求出页面上一个元素的最终的background-color，不考虑IE浏览器，不考虑元素float情况。(window.getComputedStyle、当这个元素的背景色为透明时，它最终的背景色应该为其父元素的背景色。)</span></span>
<span class="line"><span>html和CSS绘制柱状图,用CSS和JS动画在刚才那个柱状图中表现出快排的整个过程</span></span>
<span class="line"><span>HTML5新特性(新增的标签, API等)，如localstorage的用法以及与cookie的区别，如何理解web语义化</span></span>
<span class="line"><span>CSS3新特性，如动画等</span></span>
<span class="line"><span>CSS特性，如position的用法，如何实现居中，bootstrap源代码的理解，盒模型(W3C和IE)，flex的使用</span></span>
<span class="line"><span>前端兼容性处理(CSS hack技术)</span></span>
<span class="line"><span>JS基础，如this用法，new关键字的过程，call与apply的区别，闭包，原型以及JS如何实现继承</span></span>
<span class="line"><span>前端基础，浏览器缓存，跨域，从输入url到渲染的整个过程，事件(W3C和IE)，TCP三次握手过程，如何实现懒加载(跟预加载的区别)</span></span>
<span class="line"><span>之前有看过你做的一个移动页简历，请问如何实现？我主要是使用REM+Media Query，根据不同尺寸的设备进行不同的font-size设置。然后问我REM和EM的区别，如果父元素的font-size也是采用em表示，那么子元素的font-size怎么计算等。</span></span>
<span class="line"><span>有没有遇到过margin重叠的现象，如何解决？BFC</span></span>
<span class="line"><span>常见的清除浮动的方法有哪些？bootstrap是怎么做的？bootstrap是怎么实现grid系统的？</span></span>
<span class="line"><span>怎么理解JS模块化？有没有使用过webpack？</span></span>
<span class="line"><span>什么是浅复制和深复制？有什么区别？如何实现Object的深复制？</span></span>
<span class="line"><span>Jquery的源代码怎么进行Object的深复制的</span></span>
<span class="line"><span>数据类型判断(https://juejin.im/post/5b0554c86fb9a07acb3d3ddc)</span></span>
<span class="line"><span>set和map的区别</span></span>
<span class="line"><span>浏览器解析javascript的词法是怎样的</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h2 id="二" tabindex="-1">二 <a class="header-anchor" href="#二" aria-label="Permalink to &quot;二&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>js 中 module 的了解</span></span>
<span class="line"><span>写一个单例模式</span></span>
<span class="line"><span>跨域方法</span></span>
<span class="line"><span>get 与 post 的区别</span></span>
<span class="line"><span>http 与 tcp 的区别</span></span>
<span class="line"><span>业务的了解</span></span>
<span class="line"><span>浏览器的缓存问题</span></span>
<span class="line"><span>vim 的优势是什么</span></span>
<span class="line"><span>react 和 vue有什么不同</span></span>
<span class="line"><span>IFC</span></span>
<span class="line"><span>BFC</span></span>
<span class="line"><span>内联元素与块级元素的区别</span></span>
<span class="line"><span>react 单向数据流与传统 MVC，MVP的区别</span></span>
<span class="line"><span>String.prototype.trim</span></span>
<span class="line"><span>把短横线字符转化为驼峰式字符</span></span>
<span class="line"><span>三列布局</span></span>
<span class="line"><span>getComputedStyle</span></span>
<span class="line"><span>N个数和为M</span></span>
<span class="line"><span>你最满意的项目，你觉得有哪些地方做的比较好</span></span>
<span class="line"><span>自适应的正方形</span></span>
<span class="line"><span>如何实现一个轮播图</span></span>
<span class="line"><span>基本数据类型</span></span>
<span class="line"><span>事件流冒泡和捕获，捕获用在什么地方</span></span>
<span class="line"><span>跨域和跨域的解决方法</span></span>
<span class="line"><span>你最满意的项目，你觉得有哪些地方做的比较好</span></span>
<span class="line"><span>setInterval 与 setTimeout 的区别</span></span>
<span class="line"><span>react 和 vue 的区别</span></span>
<span class="line"><span>跨域和跨域的解决方法</span></span>
<span class="line"><span>http 的状态码有哪些</span></span>
<span class="line"><span>html5 有哪些新的东西</span></span>
<span class="line"><span>localStorage 和 sessionStorage 的区别</span></span>
<span class="line"><span>setInterval 与 setTimeout 的区别</span></span>
<span class="line"><span>webpack 有哪些东西，有哪些loader 和 plugin</span></span>
<span class="line"><span>你最满意的项目，你觉得有哪些地方做的比较好</span></span>
<span class="line"><span>数组去重，就地</span></span>
<span class="line"><span>react的声明周期，各在里边做些什么操作</span></span>
<span class="line"><span>react 请求发出去时组件已经卸载，fetch 如何取消</span></span>
<span class="line"><span>async 会返回什么，如果发送多个async，多个 async 预制失败</span></span>
<span class="line"><span>如何做一些网站的性能优化</span></span>
<span class="line"><span>如何优化 webpack 体积</span></span>
<span class="line"><span>简单介绍下 grid layout，与table有什么不同</span></span>
<span class="line"><span>简单介绍下 redux ，它会不会循环</span></span>
<span class="line"><span>简单介绍一下CI，写一个脚本还是写一个程序</span></span>
<span class="line"><span>状态码和方法，101</span></span>
<span class="line"><span>502 和 504的区别</span></span>
<span class="line"><span>事件传播的阶段，以及addEventListener的执行顺序，绑定一个函数会执行几次</span></span>
<span class="line"><span>virtual DOM 是什么以及是如何实现的</span></span>
<span class="line"><span>dom diff 是什么</span></span>
<span class="line"><span>get 和 post 请求</span></span>
<span class="line"><span>如何进行 CI 以及测试的，是否使用 ESLint</span></span>
<span class="line"><span>Accept 头部的作用什么，如果服务器不支持怎么办</span></span>
<span class="line"><span>tcp 如何做拥塞控制</span></span>
<span class="line"><span>事件代理是什么，如何实现</span></span>
<span class="line"><span>如何判断一个对象的类型，</span></span>
<span class="line"><span>如何把一个类数组转化为数组</span></span>
<span class="line"><span>inline，inline-block，block元素有什么区别，其中inline-block元素有哪些，img是inline-block吗</span></span>
<span class="line"><span>position 的取值</span></span>
<span class="line"><span>四分布局flex与float有什么区别</span></span>
<span class="line"><span>移动端一像素边框问题</span></span>
<span class="line"><span>移动端如何禁止屏幕缩放</span></span>
<span class="line"><span>移动端如何适配屏幕</span></span>
<span class="line"><span>移动端如何调试</span></span>
<span class="line"><span>数组去重问题</span></span>
<span class="line"><span>如何判断一个 DOM 节点包含另一个 DOM 节点，html5 如何做，兼容性怎么处理</span></span>
<span class="line"><span>如何筛选出一个祖父节点下的所有指定class的元素，html5如何做，兼容性怎么处理，如何判断一个节点是指定的class，正则表达式如何提取(漏了querySelectorAll)</span></span>
<span class="line"><span>如何提取 path 路径中的文件名，正则表达式如何提取</span></span>
<span class="line"><span>如何实现模板字符串</span></span>
<span class="line"><span>suggestion 下拉列表如何做，应该使用什么事件，input，keyup, keypress 与 change 有什么不同</span></span>
<span class="line"><span>301 与 302 的区别</span></span>
<span class="line"><span>如何实现图片的懒加载</span></span>
<span class="line"><span>如何使用 canvas 处理图片</span></span>
<span class="line"><span>从浏览器输入 url 到页面展现的过程</span></span>
<span class="line"><span>csp 是什么，xss 与 csrf 是什么，原理以及预防</span></span>
<span class="line"><span>如何实现一个 animate.js</span></span>
<span class="line"><span>如何实现一个模板引擎，并且能处理嵌套数据</span></span>
<span class="line"><span>如何实现两个函数的继承</span></span>
<span class="line"><span>好像做不到继承属性，util.inherits 也不继承属性</span></span>
<span class="line"><span>如何替换一个文件中的内容</span></span>
<span class="line"><span>shell 中如何做循环</span></span>
<span class="line"><span>for in 与 Object.keys 的区别</span></span>
<span class="line"><span>找出数组中最小的n个数</span></span>
<span class="line"><span>bloom filter 是什么</span></span>
<span class="line"><span>Function.prototype.bind 的实现</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><h2 id="三" tabindex="-1">三 <a class="header-anchor" href="#三" aria-label="Permalink to &quot;三&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>一道 setTimeout/Promise 输出顺序问题的题</span></span>
<span class="line"><span>什么是事件循环</span></span>
<span class="line"><span>async 与 generator 的关系以及实现原理</span></span>
<span class="line"><span>react 和 vue 有什么区别</span></span>
<span class="line"><span>vue 的双向绑定怎么实现的，在 3.0 后呢</span></span>
<span class="line"><span>react 的生命周期是什么</span></span>
<span class="line"><span>react 中的 key 用来做什么</span></span>
<span class="line"><span>有没有看过 fiber 的代码，原理是什么</span></span>
<span class="line"><span>什么是 virtual DOM</span></span>
<span class="line"><span>webpack 的原理是什么，loader 和 plugin 的作用是什么</span></span>
<span class="line"><span>如何使用 webpack 优化体积</span></span>
<span class="line"><span>网站性能优化有哪些方面</span></span>
<span class="line"><span>有没有了解过 shell</span></span>
<span class="line"><span>如何替换一个文件中的内容</span></span>
<span class="line"><span>对一个文件如何只查看特定行的内容</span></span>
<span class="line"><span>你们的 node 的服务端应用如何部署</span></span>
<span class="line"><span>docker 部署有什么好处</span></span>
<span class="line"><span>部署时如何利用服务器的多核</span></span>
<span class="line"><span>你们有没有对服务端的异常进行监控</span></span>
<span class="line"><span>你如何看待前端和后端</span></span>
<span class="line"><span>如何查看一个 node 的服务端应用的内存和CPU</span></span>
<span class="line"><span>当服务端的内存发生了 OOM 问题如何排查</span></span>
<span class="line"><span>如何监控某个进程的内存和 CPU</span></span>
<span class="line"><span>当一个云主机的内存占用过大，如何找到内存占用最大的进程</span></span>
<span class="line"><span>数据库索引中为什么要用 Btree</span></span>
<span class="line"><span>如何优化 SQL</span></span>
<span class="line"><span>如何监控数据库的慢查询</span></span>
<span class="line"><span>当一个地址从输入到展示在浏览器中有哪些步骤</span></span>
<span class="line"><span>TCP 的三次握手是什么</span></span>
<span class="line"><span>TCP 为什么要三次握手</span></span>
<span class="line"><span>TCP 与 UDP 的区别是什么，既然 TCP 是可靠的，那它有啥缺点</span></span>
<span class="line"><span>如何在 linux 中拿到 TCP 的状态</span></span>
<span class="line"><span>TCP 的拥塞控制是怎么做的</span></span>
<span class="line"><span>什么是 ARP 欺骗</span></span>
<span class="line"><span>什么是防抖和节流</span></span>
<span class="line"><span>写一段关于防抖的代码</span></span>
<span class="line"><span>graphql 有什么好处和劣势</span></span>
<span class="line"><span>你遇到过哪些 OOM 的事例，都是什么问题，以及如何解决的</span></span>
<span class="line"><span>什么是 serverless，如何看待它的发展</span></span>
<span class="line"><span>服务端渲染的原理是什么</span></span>
<span class="line"><span>服务端渲染会遇到哪些问题，与客户端渲染如何取舍</span></span>
<span class="line"><span>除了服务端渲染，还有哪些做 SEO 的方案</span></span>
<span class="line"><span>react hooks 有什么好处</span></span>
<span class="line"><span>如何做 tracing</span></span>
<span class="line"><span>如果给 log 都加上 requestId，应该怎么做</span></span>
<span class="line"><span>async hooks 是用来干嘛的</span></span>
<span class="line"><span>如何设计一个高并发系统</span></span>
<span class="line"><span>对数据库做过什么优化</span></span>
<span class="line"><span>有没有看过 libuv 代码</span></span>
<span class="line"><span>什么是IO多路复用</span></span>
<span class="line"><span>redis 的使用场景有哪些</span></span>
<span class="line"><span>你们的 qps 是多少</span></span>
<span class="line"><span>你们业务跑了多少台机器</span></span>
<span class="line"><span>如果优化你们的 qps</span></span>
<span class="line"><span>如何做弹性扩容</span></span>
<span class="line"><span>如何设计一个短网址服务</span></span>
<span class="line"><span>rpc 与 rest 相比有什么优势与劣势</span></span>
<span class="line"><span>什么是TCP粘包</span></span>
<span class="line"><span>如何设计一个消息队列，要注意什么地方</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><h2 id="四" tabindex="-1">四 <a class="header-anchor" href="#四" aria-label="Permalink to &quot;四&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>弹性布局使用场景</span></span>
<span class="line"><span>bfc</span></span>
<span class="line"><span>定位都有哪些</span></span>
<span class="line"><span>样式的优先级</span></span>
<span class="line"><span>http 缓存</span></span>
<span class="line"><span>new 发生了什么</span></span>
<span class="line"><span>原型里面声明和prototype里面声明的一样 优先级</span></span>
<span class="line"><span>基本数据类型 和引用数据类型的区别和判断 栈和堆</span></span>
<span class="line"><span>设计模式</span></span>
<span class="line"><span>hooks</span></span>
<span class="line"><span>webworker</span></span>
<span class="line"><span>*事件代理</span></span>
<span class="line"><span>http码</span></span>
<span class="line"><span>dva的原理</span></span>
<span class="line"><span>koa 中间件</span></span>
<span class="line"><span>git 工作流</span></span>
<span class="line"><span>工程目录怎么搭建的</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="五" tabindex="-1">五 <a class="header-anchor" href="#五" aria-label="Permalink to &quot;五&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>事件委托</span></span>
<span class="line"><span>深浅拷贝的区别</span></span>
<span class="line"><span>Object.assign</span></span>
<span class="line"><span>BFC</span></span>
<span class="line"><span>Fiber</span></span>
<span class="line"><span>virtual dom</span></span>
<span class="line"><span>diff算法</span></span>
<span class="line"><span>hook</span></span>
<span class="line"><span>webpack流程</span></span>
<span class="line"><span>webpack打包出来的js的结构，内容是什么</span></span>
<span class="line"><span>babel编译原理</span></span>
<span class="line"><span>node的优势</span></span>
<span class="line"><span>node中，async/await，generator，promise的区别，联系</span></span>
<span class="line"><span>多用户来访问聊天服务器，你有1000台服务器，应该怎么办（坑啊）</span></span>
<span class="line"><span>Vue双向绑定如何实现</span></span>
<span class="line"><span>Vue数据流</span></span>
<span class="line"><span>Vue与React的区别</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="六" tabindex="-1">六 <a class="header-anchor" href="#六" aria-label="Permalink to &quot;六&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>输入url到页面渲染展示</span></span>
<span class="line"><span>DNS如何解析</span></span>
<span class="line"><span>输入域名如何转换为ip地址，然后转到服务器</span></span>
<span class="line"><span>gzip原理</span></span>
<span class="line"><span>cookie localStorage sessionStorage</span></span>
<span class="line"><span>cookie与token的本质区别（session）</span></span>
<span class="line"><span>闭包 及其常见的应用场景</span></span>
<span class="line"><span>缓存</span></span>
<span class="line"><span>强缓存如何存</span></span>
<span class="line"><span>过期时间等参数浏览器是如何获取的</span></span>
<span class="line"><span>服务器如何设置缓存设置头</span></span>
<span class="line"><span>缓存的场景</span></span>
<span class="line"><span>call apply区别</span></span>
<span class="line"><span>React的事件机制</span></span>
<span class="line"><span>virtual dom</span></span>
<span class="line"><span>hooks的优势，为何被喜欢，常用的方式</span></span>
<span class="line"><span>React数据流</span></span>
<span class="line"><span>HOC，优势及其常用方式</span></span>
<span class="line"><span>setState获取更新的值</span></span>
<span class="line"><span>csrf 和 xss</span></span>
<span class="line"><span>flex布局，及你常用的方式，兼容性</span></span>
<span class="line"><span>前端性能优化（你用过的）</span></span>
<span class="line"><span>node异步的历史（答了async/await, generator）</span></span>
<span class="line"><span>webpack流程</span></span>
<span class="line"><span>webpack-dev-server原理</span></span>
<span class="line"><span>webpack配置项与常用插件</span></span>
<span class="line"><span>ES6的语法，及你常用的</span></span>
<span class="line"><span>Mobx的原理</span></span>
<span class="line"><span>盒模型与怪异盒模型</span></span>
<span class="line"><span>HTTP报文结构，请求头有啥，响应头有啥</span></span>
<span class="line"><span>最近看什么书，看什么文章，打算考研吗</span></span>
<span class="line"><span>栈，队列</span></span>
<span class="line"><span>10万个数字找最大的K个数（描述了快排，及如何实现，时间复杂度，最好，最差的情况下）</span></span>
<span class="line"><span>DFS与BFS，如何实现</span></span>
<span class="line"><span>小程序与H5的区别，商业性、技术性（小程序有自己独立的保护机制，独立运行在一个地方，不会破坏现有生态）</span></span>
<span class="line"><span>nginx怎么配置</span></span>
<span class="line"><span>阿里云dns怎么配置解析（A？TXT？）</span></span>
<span class="line"><span>箭头函数和普通函数</span></span>
<span class="line"><span>按钮设置监听用箭头函数this指向哪</span></span>
<span class="line"><span>jwttoken</span></span>
<span class="line"><span>服务器开启服务（nohup，pm2）</span></span>
<span class="line"><span>Taro编译原理</span></span>
<span class="line"><span>typescript优势，为何收到推崇</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h2 id="react相关问题" tabindex="-1">React相关问题 <a class="header-anchor" href="#react相关问题" aria-label="Permalink to &quot;React相关问题&quot;">​</a></h2><p><strong>问题</strong></p><ul><li>控制台报 Warning:Autoprefixer applies control comment to whole block, not to next rules.</li></ul><p>意思是让单行(而不是块)的规则需要用 autoprefixer: ignore next</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">/* autoprefixer: off */</span></span>
<span class="line"><span style="color:#C678DD;">-webkit-box-orient: vertical;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">/* autoprefixer: on */</span></span>
<span class="line"><span style="color:#ABB2BF;">//</span><span style="color:#C678DD;">此时需修改成</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">/* autoprefixer: ignore next */</span></span>
<span class="line"><span style="color:#C678DD;">-webkit-box-orient: vertical</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>路由缓存的问题</li><li>但双击同时存在的问题</li><li>循环map,判断data.length，需要加上&gt;0或者直接取反</li><li>hooks不同步的更新问题</li><li>BrowserRouter上线刷新304问题，nginx重定向</li><li>本地代理和服务器反向代理</li><li>setState代码不更新的问题【可能使用了不可变的插件】</li><li>key 用的index,当列表有其他不跟数据相关的盒子时候，删除前面的任何一项，都会是最后那个 盒子的内容丢失</li><li>IE 360急速浏览器的兼容</li><li>this指向的问题</li><li>父子组件通信 「redux,父传子，context，本地储存，cloneElement,Render Props」</li><li>setState为什么是异步的、什么时候是异步的？</li></ul><p><strong>优化</strong></p><ul><li>长列表使用（虚拟化长列表react-window 和 react-virtualized ）</li><li>ReactDOM.createPortal(child,container);</li><li>不可变数据</li><li>函数式组件</li><li>PureComponent</li></ul><p><strong>新的api</strong></p><ul><li>context</li><li>lazy suspense</li></ul>`,23),i=[e];function r(c,b,u,t,m,o){return a(),n("div",null,i)}const g=s(l,[["render",r]]);export{h as __pageData,g as default};
