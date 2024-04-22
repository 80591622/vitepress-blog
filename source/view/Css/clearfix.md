---
abbrlink: 3b42e1b4
title: 清除浮动的最常用的几种方法
date: 2018-01-20
tag: css
---

<strong class='old-blog'>清除浮动的最常用的几种方法</strong>

[[toc]]

**为什么要清除浮动？**

清除浮动主要是为了解决，父元素因为子级元素浮动引起的内部高度为0的问题

### 额外标签法

在最后一个浮动标签后，新加一个标签，给其设置clear：both；（不推荐）

```html
.clear{
    clear:both;
}

<div class="box">
    <div></div>
    <div></div>
    <div class="clear">额外标签法</div>
</div>
```

### 父级添加overflow属性

通过触发BFC的方式，实现清楚浮动效果。

```html
.box{
   overflow: hidden;
}
```

**缺点**：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素,局限性太大

### 使用after伪元素清除浮动 **

```css
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
.clearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
```

### 使用before和after双伪元素清除浮动 **

```css
.clearfix:after,.clearfix:before{
    content: "";
    display: table;
}
.clearfix:after{
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```