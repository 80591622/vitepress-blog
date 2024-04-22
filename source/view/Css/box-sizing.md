---
abbrlink: 9acb3b73
title: css的两种盒模型
tag: css
date: 2019-01-21
---

[[toc]]

<!-- ### css的两种盒模型 -->

#### W3C的标准盒模型

默认是w3c标准的

![仔细看图](https://ae01.alicdn.com/kf/H8a671283100a4512ba5ae28cdfe70b3b6.jpg)

> 在标准的盒子模型中，width指content部分的宽度
  
#### IE的盒模型

![仔细看图](https://ae01.alicdn.com/kf/H113065c568374278958356d8834155a1x.jpg)

> 在IE盒子模型中，width表示content+padding+border这三个部分的宽度
  
#### box-sizing的使用

如果想要切换盒模型也很简单，这里需要借助css3的box-sizing属性

```js
box-sizing: content-box  //是W3C盒子模型
box-sizing: border-box //是IE盒子模型
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css盒模型</title>
</head>
<style type="text/css">
.content {
	width: 300px;
	height: 400px;
	border: 5px solid #242424;
	padding: 20px;
	background-color: #898989;
   /*box-sizing: border-box;*/
}
</style>
<body>
	<div class="content"></div>
</body>
</html>
```