

# CSS使用锦囊
##
<div style="margin-left: -6px; margin-right: -6px;">
    <div class="el-col-6" style="padding-left: 6px; padding-right: 6px;">
        <div class="demo-color-box" style="background: #409EFF;">
        Brand Color
        <div class="value">#409EFF</div>
        </div>
    </div>
     <div class="el-col-6" style="padding-left: 6px; padding-right: 6px;">
        <div class="demo-color-box" style="background: rgb(103, 194, 58);">
        Success
        <div class="value">#67C23A</div>
        </div>
    </div>
    <div class="el-col-6 " style="padding-left: 6px; padding-right: 6px;">
        <div class="demo-color-box" style="background: rgb(230, 162, 60);">
        Warning
        <div class="value">#E6A23C</div>
        </div>
    </div>
    <div class="el-col-6" style="padding-left: 6px; padding-right: 6px;">
        <div class="demo-color-box" style="background: rgb(245, 108, 108);">
        Danger
        <div class="value">#F56C6C</div>
        </div>
    </div>
    <div class="el-col-6 " style="padding-left: 6px; padding-right: 6px;">
        <div class="demo-color-box" style="background: rgb(144, 147, 153);">
        Info
        <div class="value">#909399</div>
        </div>
    </div>
    <div style="padding-left: 6px; padding-right: 6px">
         <div class="demo-color-box" style="background: linear-gradient(to right,#fcb045,#fd1d1d,#833ab4);">
          渐变 
          <div class="value">✎ linear-gradient(to right,#fcb045,#fd1d1d,#833ab4)</div>
         </div>
    </div>
 </div>
 
 

## calc方法 
```css
- html{ font-size: calc(1em + 1vw); }
```


 **less**下
```less
-  e("calc(100% - 260px)") 
-  calc(~"100% - 30px")
```

## animate动画-停在动画最后的的那个画面

```css
animation: downIn 0.5s;
animation-fill-mode: forwards; 

@keyframes downIn {
  from {top: -88px};
  to {top: 0}
}
```

## nth-child() & nth-of-type()

**:nth-child(n)** 选择器匹配父元素和属于其父元素的第N个子元素，`不论元素的类型`。

**:nth-of-type(n)** 选择器匹配和父元素属于父元素的`特定类型`的第N个子元素的每个元素。

**nth-last-child()** 从后面开始，类似nth-child()

```html
<p></p>
<p></p>
<div style="background-color:coral;"></div>
<div style="background-color:lightblue;"></div> // nth-of-type(2)
<p></p>
<div style="background-color:khaki;"></div>  // nth-child(6)
```

## 超出隐藏
   
```css
.info:after {
  /* 不太实用，任何时候都有... */
  content: "";
  font-weight: bold;
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 90px;
  height: 16px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
}
```

## 多行超出隐藏 

```css
.info{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

## 三角形 | 旋转三角效果 | 0.5像素的线

```css
 &:nth-child(1):before {
  content: '';
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-45%);
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-color: #FD5E4E transparent transparent transparent;

}
```

```css
background: #72B4FD;
width: 100%;
height: 100%;
position: absolute;
top: 0;
right: -0.23rem;
-webkit-transform: skewX(-20deg);
transform: skewX(-20deg);
```
```css
& .line {
  width: 236px;
  float: right;
  height: 1px;
  margin: 11px 0px;
  position: relative;
  border: none;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #ccc;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
}
```

## loading

```css
.loading
    width: 159px;
    height: 151px;
    margin: 0 auto;
    position: relative;
 .loading::before,.loading::after
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    background: black;
    border-radius: 50%;
    top:0;      
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;   /*上下左右都为0，再加上margin:auto; 就是自动居中*/
    animation: s 1.5s linear infinite;  /*加上s状态，状态开始到结束为1.5s*/
.loading::after
    animation-delay: 0.75s;     /*第二个圆出现的时间*/
    
 @keyframes s{
    0%{             /*初始状态*/
        width: 0px;
        height: 0px;
        opacity: 1; /*透明度*/
    }
    100%{           /*结束状态*/
        width: 100px;
        height: 100px;
        opacity: 0;
    }
}
```

## 伪类面包屑
```css
<ul class="breadcrumb">
    <li><a href="#">Home</a>
    </li>
    <li><a href="#">Pictures</a>
    </li>
    <li><a href="#">Summer 15</a>
    </li>
    <li>Italy</li>
</ul>

ul.breadcrumb {
    padding: 8px 16px;
    list-style: none;
    background-color: #eee;
}
ul.breadcrumb li {
    display: inline;
}
ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}
ul.breadcrumb li a {
    color: green;
}
```

```css
const elm = document.documentElement
//全局控制 
elm.style.setProperty("background-color", "yellow");
```

## Css的两种盒模型
**CSS 盒模型包含以下几个部分：**
 - 内容区域（Content） ：指元素内部实际包含内容的区域，例如文字、图片等。
 - 内边距（Padding） ：内容区域与边框之间的空白区域，用来控制内容与边框的距离。
 - 边框（Border） ：内边距外部的边框，用来围绕内容和内边距的区域。
 - 外边距（Margin） ：边框外部的空白区域，用来控制元素与其他元素之间的距离。

**盒模型的分类：**
`标准盒模型（content-box）`和 `IE 盒模型（border-box）`。

**标准盒模型：**
在标准盒模型中，元素的宽度和高度仅包括内容区域的尺寸，不包括内边距（padding）、边框（border）和外边距（margin）。这意味着，当你设置一个元素的宽度为 200px 时，这个`宽度值仅包括元素的内容区域`，而`不包括内边距、边框和外边距的宽度`。

`标准盒模型中，元素的总宽度计算方式为：内容宽度（width） + 左右内边距（padding-left + padding-right） + 左右边框宽度（border-left-width + border-right-width） + 左右外边距（margin-left + margin-right）。这个总宽度值就是元素所占据的实际空间。也就是说盒子总宽度：width + padding + border + margin = 330 `

<img src="https://ae01.alicdn.com/kf/H8a671283100a4512ba5ae28cdfe70b3b6.jpg" alt/>

**怪异盒模型（box-sizing）**
在 IE 盒模型中，元素的宽度和高度包括了内容区域、内边距和边框的尺寸，但不包括外边距。换句话说，当你设置一个元素的宽度为 300px 时，这个宽度值包括了内容区域、内边距和边框的宽度。还是上面的那个例子，但是我们需要在style中加上box-sizing: border-box要求浏览器以IE盒子模型来加载盒子。

` IE 盒模型中，元素的总宽度计算方式为：内容宽度（width）（包括内边距和边框） + 左右外边距（margin-left + margin-right）。这个总宽度值同样是元素所占据的实际空间。也就是是说，盒子总宽度：width + margin，盒子总高度：height + margin。`

<img src="https://ae01.alicdn.com/kf/H113065c568374278958356d8834155a1x.jpg" alt/>


## 清除浮动

浮动（float）常用于创建多列布局或让元素围绕其他元素排列。然而，浮动元素可能会影响布局的正常流动，因此需要清除浮动来恢复文档流。

***1. 浮动导致的问题：***
当父容器中的所有子元素都设置为浮动时，父容器的高度会塌陷，导致其他正常文档流的元素可能覆盖或重叠该容器。这是因为浮动元素脱离了文档流。
```html
<div class="container">
  <div class="box" style="float: left;"></div>
  <div class="box" style="float: left;"></div>
</div>
<!-- 容器高度会塌陷，其他内容可能覆盖到 .container 上 -->

```
***2.常见清除浮动的方法***

**2.1 clear: both**
通过在浮动元素的最后插入一个 clear 属性的元素来清除浮动。常见方法是在浮动元素之后添加一个 div，并设置 clear: both。
```html
<div class="container">
  <div class="box" style="float: left;"></div>
  <div class="box" style="float: left;"></div>
  <div style="clear: both;"></div> <!-- 清除浮动 -->
</div>
<!-- 缺点：增加了额外的无语义的标签，违反了结构与样式分离的原则。 -->
```

**2.2 overflow: hidden**
给父容器设置 overflow: hidden，可以使其包含浮动的子元素。
```css
.container {
  overflow: hidden;
}
/* 优点：简单且有效。 缺点：会隐藏超出的内容，不适合某些特定场景。 */
```

**2.3 clearfix 伪元素**
目前比较推荐的清除浮动的方法，通过使用 ::after 伪元素来自动清除浮动。
```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

**2.4 display: flow-root（CSS3）**
在 CSS3 中，display: flow-root 是一种较新的方法，它可以让元素成为块级格式化上下文，从而自动清除浮动。
```css
.container {
  display: flow-root;
}
```

## BFC

"BFC容器"通常是指"块级格式化上下文容器"（Block Formatting Context Container）。块级格式化上下文（BFC）是在CSS中用来管理和控制元素在页面上布局和排列的一种机制。BFC容器是一种具有特定规则的HTML元素或CSS属性，它们会创建一个独立的上下文，影响其内部元素的布局和排列方式。BFC容器是CSS布局中的一个重要概念，可以帮助开发人员更精确地控制元素的布局和排列

作用

 - 清除浮动：BFC容器可以用来清除浮动元素的影响，确保父元素包含浮动子元素的高度，从而避免出现高度塌陷问题。这是BFC最常见的应用之一，特别是在创建多列布局或类似网格的布局时非常有用。
 - 防止外边距重叠：在同一个BFC容器内的相邻块级元素的外边距不会发生重叠，这有助于更精确地控制元素之间的间距。这对于垂直外边距塌陷问题的解决非常有帮助。

**哪些属性可以创建BFC容器**
```bash
- float: left || right
- position: absolute || fixed
- display: inline-block;
- display: table-cell ....
- overflow: hidden || auto  || overly  || scroll
- 弹性盒子  (display: flex || inline-flex)
```




## display:none opacity:0以及visibility:hidden的区别
**display: none;**

- DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
- 事件监听：无法进行 DOM 事件监听；
- 性能：动态改变此属性时会引起重排，性能较差；
- 继承：不会被子元素继承，毕竟子类也不会被渲染；
- transition：transition 不支持 display。

**visibility: hidden;**

- DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
- 事件监听：无法进行 DOM 事件监听；
- 性 能：动态改变此属性时会引起重绘，性能较高；
- 继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；
- transition：visibility 会立即显示，隐藏时会延时

**opacity: 0;**

- DOM 结构：透明度为 100%，元素隐藏，占据空间；
- 事件监听：可以进行 DOM 事件监听；
- 性 能：提升为合成层，不会触发重绘，性能较高；
- 继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
- transition：opacity 可以延时显示和隐藏


## CSS九宫格布局实现

[CSS九宫格布局实现](/workspace/Css/lattice.html)


```css
// 最后一行  去除 margin-bottom
.book-item:nth-last-of-type(-n+3) {
    margin-bottom: 0;
}
```
## CSS实现正六边形

[github](https://github.com/web-tiki/responsive-grid-of-hexagons)


## 美化滚动条

```css
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 4px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #eff0f1;
  border-radius: 10px;
  /*background-color:#555;*/
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  /*-webkit-box-shadow:inset 0 0 6px  #555;*/
}
```

## 移动端viewport

```html
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
```
```bash
content属性值 :
width:可视区域的宽度，值可为数字或关键词device-width
height:同width
intial-scale:页面首次被显示是可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放
maximum-scale=1.0, minimum-scale=1.0;可视区域的缩放级别，
maximum-scale用户可将页面放大的程序，1.0将禁止用户放大到实际尺寸之上。
user-scalable:是否可对页面进行缩放，no 禁止缩放
viewport-fit=cover：兼容iPhoneX刘海全屏
```

## 移动端1px很粗的问题

在做移动端开发时,设计师提供的视觉稿一般是750px,当你定义 border-width:1px时,在iphone6手机上却发现:边框变粗了。
这是因为,1px是相对于750px的(物理像素),而我们定义的1px是相对于375px的(css像素)“实际上应该是border-width:0.5px”.

**关于物理像素和独立像素**

物理像素<br/>
移动设备出厂时,不同设备自带的不同像素,也称硬件像素;

独立像素<br/>
即css中记录的像素。

**手机屏幕分为：**

一：非视网膜屏幕 （物理像素375，该设备的独立像素（视区宽度）也是375）<br/>
二：视网膜屏幕  （物理像素是750，该设备的独立的独立像素还是375）

`px都会受哪些因素的影响而变化？`

- 像素密度(pixel per inch, PPI)
- 设备像素比(device pixel ratio, DPR)

**PPI**

每英寸物理像素点数），更确切的说法应该是像素密度，也就是衡量单位物理面积内拥有像素值的情况,放到显示器上说的是每英寸多少物理像素或显示器设备的点距。

**DPR**

设备像素比 ＝ 物理像素 / 设备独立像素

通俗点讲：**设备像素比(dpr)** 是指在移动开发同一方向上（x轴或y轴）中1个css像素占用多少设备像素，

如视网膜屏幕 dpr = 2，代表1个css像素用2x2个设备像素来绘制。

在 JavaScript 中，可以通过window.devicePixelRatio获取到当前设备的 dpr。
而在 CSS 中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和-webkit-max-device-pixel-ratio进行媒体查询。

我们可以在运行的时候拿到设备的devicePixelRatio，动态改变viewport的initial-scale为 1/devicePixelRatio，
这样就能保证1px的宽度就是真正的1物理像素宽，其他适配使用rem（因为使用px的话都会被缩小）

```javascript
function fn() {
  var clientWidth = window.screen.width;
  var dpr = window.devicePixelRatio;
  var vp = document.createElement('meta');
  document.documentElement.style.fontSize = clientWidth > 414 ? '20px' : 20 * dpr * clientWidth / 360 + 'px';
  vp.name = 'viewport';
  vp.content = `initial-scale=${1.0 * 1 / dpr}, maximum-scale=${1.0 * 1 / dpr}, minimum-scale=${1.0 * 1 / dpr}, user-scalable=no, width=device-width`;
  var m = document.getElementsByTagName('meta')[0];
  m.parentNode.insertBefore(vp, m);
  
  // var vp = document.getElementsByTagName('meta')[1];
  // vp.content = `initial-scale=${1.0 * 1 / dpr}, maximum-scale=${1.0 * 1 / dpr}, minimum-scale=${1.0 * 1 / dpr}, user-scalable=no, width=device-width`;
};

window.onresize = function () {
    fn()
};
```

[https://www.cnblogs.com/maqingbo/p/7528861/](https://www.cnblogs.com/maqingbo/p/7528861/)


## rem原理

rem布局的本质是`等比缩放`，一般是基于宽度，假设将屏幕宽度分为100份，每份宽度是1rem，1rem的宽度是屏幕宽度/100,，然后子元素设置rem单位的属性，
通过改变html元素的字体大小，就可以设置子元素的实际大小。
rem布局加载闪烁的问题

解决方案，媒体查询设置根元素字体大小，比如设计稿是750px;对应的开发方式是1rem=100px,那375px的font-size 大小就是50px（具体方法可以百度一下）


比rem更好的方案（缺点兼容不好）

vw(1vw是视口宽度的1%，100vw就是视口宽度),vh(100vh就是视口高度)



## scss Mixins

```scss
$warning: #ead1a6;
$danger: #f44f4d;

$dpr: 2 !default;
@function second($val) {
  @return round($val * $dpr);
}
/* methods
-------------------------- */
// 背景图片地址和大小
@mixin bg($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

// 定位上下左右居中
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// 定位上下居中
@mixin ct {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

// 定位左右居中
@mixin cl {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

//多行显示省略号
@mixin noWrapline($line:2) {
  display: -webkit-box;
  -webkit-line-clamp: $line;
  overflow: hidden;
  text-overflow: ellipsis;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}

// flex 布局和 子元素 对其方式
@mixin fj($type: space-between) {
  display: flex;
  justify-content: $type;
}


//用法
.box{
 @include fj(center);
 background: $page-bg;
}

```

## less Mixins

```css{1}
@import '~antd/es/style/themes/default.less';

@pro-header-hover-bg: rgba(0, 0, 0, 0.025);

@blue: #3190e8;
@bc: #e4e4e4;
@fc:#fff;

// 背景图片地址和大小
.bis(@url) {
  background-image: url(@url);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

//定位全屏
.allcover{
  position:absolute;
  top:0;
  right:0;
}

// 水平垂直居中
.center () {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

//定位上下居中
.tb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

//定位左右居中
.lr {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

//单行显示省略号
.noWrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

//多行显示省略号
.noWrapline(@line) {
  display: -webkit-box;
  -webkit-line-clamp: @line;
  overflow: hidden;
  text-overflow: ellipsis;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}

//用法
.ant-menu-item-selected {
  .center;
  background-color: @all-color 
}

``` 

## cssModules

**旧博客**
[cssModules](/workspace/Css/cssModules)


## ✄ Flex弹性布局

**旧博客**
[Flex弹性布局](/workspace/Css/flex)



## PostCSS

**什么是postcss**

postcss 一种对css编译的工具，类似babel对js的处理，常见的功能如:

1. 使用下一代css语法
2. 自动补全浏览器前缀
3. 自动把px代为转换成rem
4. css代码压缩等等

**如何使用**

这里只说在webpack里集成使用，首先需要 loader

`sudo yarn add -D postcss-loader  postcss-preset-env`

```javascript
 {
    loader: require.resolve('postcss-loader'),
    options: {
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
        ],
    }
}
```

- postcss-flexbugs-fixes  修复Flexbugs<br/>
- postcss-preset-env  将现代CSS转换成浏览器能理解的东西【安装postcss-preset-env，无需再安装autoprefixer，由于postcss-preset-env已经内置了相关功能。】<br/>
- postcss-cssnext  使用下个版本的css语法；如css4（可以理解为css中的Babel）
- postcss-sprites 自动制作雪碧图，不用手动拼接啦
- postcss-hash-classname 把转换后的css文件名附上哈希值
- postcss-pxtorem  把px转换成rem
- pixrem 将rem转换为px
- postcss-px-to-viewport 把px转换成viewport单位【viewport-units-buggyfill(vw的兼容处理)】

```javascript
module.exports = {
   plugins: {
       'postcss-px-to-viewport': {
           viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
           viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
           unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
           viewportUnit: "vw",   //指定需要转换成的视窗单位，建议使用vw
           selectorBlackList: ['.ignore'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
           minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
           mediaQuery: false     // 允许在媒体查询中转换`px`
       }   
   }
}
```

## 暗黑模式

```css
@media (prefers-color-scheme: dark) { // 黑暗模式 
  .guide-page {
    background: #292929;
    .guide-title {
      font-size: 28px;
      color: white
    }
  }
}

@media (prefers-color-scheme: light) { // 正常的
  .guide-page {
    background: white;
    .guide-title {
      font-size: 28px;
      color: #222222eb
    }
  }
}
```

[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)

## SVG favicon

favicon 支持实现黑白模式

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <style>
        circle {
            fill: yellow;
            stroke: black;
            stroke-width: 3px;
        }
        @media (prefers-color-scheme: dark) {
            circle {
            fill: black;
            stroke: yellow;
            }
        }
    </style>
    <circle cx="50" cy="50" r="47"/>
</svg>
```

## 如何设置body背景色，height:100%,不生效？
```css
//同时设置html，body的高度
html,body{
    height:100%；
} 
或
body{
  height: 100vh; // 代表占屏幕100%
}
```
## 去除ios 手机端input输入框的内阴影
```css
input{ 
    -webkit-appearance: none; 
}
```

## iOS端input输入框光标错位

是由于fixed定位引起的，改成absolute就解决了。

```css
.box{
    position: absolute; 
}
```

## 图片显示中间部分

[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

```css
//1
object-fit: cover;
//2
object-position: 50% 50%;
```

## iOS下取消input在输入的时候英文首字母的默认大写

```css

<input type="text" autocapitalize="none">
```

## 禁止 iOS 识别长串数字为电话

```css
<meta name="format-detection" content="telephone=no" />
```

## 一些情况下对非可点击元素如(label,span)监听click事件，ios下不会触发

```css
cursor: pointer;
```

## 禁止ios和android用户选中文字

```css
-webkit-user-select: none;
```

## 利用灰色滤镜做灰色图

```css
-webkit-filter: grayscale(1);
```

## 页面自适应最佳实践

```css
html {
    font-size: 16px;
}
@media screen and (min-width: 375px) {
    html {
        /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
        font-size: calc(100% + 2 * (100vw - 375px) / 39);
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
        font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 600px) {
    html {
        /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
        font-size: calc(125% + 4 * (100vw - 600px) / 400);
        font-size: calc(20px + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 1000px往后是每100像素0.5px增加 */
        font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
        font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
    }
}
```
