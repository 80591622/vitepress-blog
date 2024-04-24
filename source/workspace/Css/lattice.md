---
abbrlink: '37888229'
title: CSS九宫格布局实现
date: 2018-01-20
tag: css
---

<strong class='old-blog'>CSS九宫格布局实现</strong>

[[toc]]

**基本的布局**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
    <title></title>
    <style>
        .box {
            background: #e4f7fd61;
            border: 2px solid #0786ada1;
            border-radius: 8px;
        }
        ul {
            padding: 0;
            margin: 0;
        }
        .box li {
            list-style: none;
            text-align: center;
            line-height: 200px;
            background: rgba(146, 203, 230, 0.65);
            border-radius: 8px;
        }
    </style>
</head>

<body>
<div class="box">
    <ul class="flex grid">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
    </ul>
</div>
</body>
</html>
```


### margin负值实现

- 最外层的包裹元素等于：li宽度*3+li右间距*2
- 子盒子左浮动，margin-left margin-bottom间距为20px
- 父盒子的margin-bottom和margin-top的的间距为-20px,消除子盒子代理的移动
- 父盒子消除浮动

```css
.box {
    width: 940px;
}

ul {
    margin-right: -20px;
    margin-bottom: -20px;  
}

ul:after {
    content: '';
    display: block;
    height: 0;
    width: 0;
    clear: both;
    visibility: hidden;
}

.box li {
    float: left;
    width: 300px;
    height: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
}
```

### nth-child

跟上面的那种方法类似，就是把父盒子的移动换成了指定的子盒子移动

但是这回出现一个问题就是最下的一层盒子个数不确定所以margin-bottom,就没办法正确的设置
所以就会用到css的级联使用，方法看如下的代码：

```css
...  // 代码跟上面的一致，去除UI部分
.box li:nth-child(3n) {
    margin-right: 0
}
.box li:nth-child(3n+1):nth-last-child(-n+3), .box li:nth-child(3n+1):nth-last-child(-n+3) ~ li {
    margin-bottom: 0;
}
// li:nth-last-child(-n+3)
```

### grid布局

```css
 .grid {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
}

.grid > li {
    margin-top: 4px;
    margin-left: 4px;
    box-sizing: border-box;
    list-style: none;
    line-height: 100px;
    text-align: center;
    border: 4px solid #ccc;
    background: #6a8bad;
}
.grid > li:hover{
    border-color: red;
    position: relative;
    transition: all 500ms;
    /*z-index:-2;*/
}
```
这里有一个地方需要注意，就是不要再给li子项设置宽度和高度。
该grid布局中，也可以在hover时添加z-index:2;来提高叠加等级,不然没办法展示全部

### flex布局

```css
.flex {
    display: flex;
    width: 312px;
    flex-wrap: wrap;
    margin: -4px 0 0 -4px;
}

.flex > li {
    box-sizing: border-box;
    height: 100px;
    width: 100px;
    margin-left: 4px;
    margin-top: 4px;
    line-height: 100px;
    text-align: center;
    list-style: none;
    background: rgba(146, 203, 230, 0.65);
}

.flex > li:hover {
    background: red;
    position: relative;
    /*z-index:2;*/
}
```