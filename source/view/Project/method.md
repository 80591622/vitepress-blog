---
abbrlink: aa78f18f
title: 用到的方法
date: 2019-03-19
categories: 
- Project
- Methods
---

<strong class='old-blog'>用到的方法</strong>

[[toc]]

### 获取给定范围的随机数

```javascript
export const  getRand= (min, max)=> {
    let range = max - min + 1;
    return Math.floor(Math.random() * range + min);
}

```

### 吸顶

```javascript
//titleFixed是className的名字
let offsetTop =[dom].getBoundingClientRect().top;

if (offsetTop < 0) {
    this.titleFixed = true
} else {
    this.titleFixed = false
}
//改成三元
(offsetTop < 0) ? this. titleFixed = true : this. titleFixed = false;
//我们发现条件块里面的赋值情况是布尔值，所以可以更简单
this. titleFixed = offsetTop < 0;

//原生js获取到顶部-左侧的距离
function getOffset(obj, direction){
	let offsetL = 0;
	let offsetT = 0;
	while( obj !== window. document.body && obj !== null ){
		offsetL += obj.offsetLeft;
		offsetT += obj.offsetTop;
		obj = obj.offsetParent;
	}
	if(direction === 'left'){
	    return offsetL;
	}else {
	   return offsetT
	};
}
```

### 字符串去空

```javascript
/**
 * 去空 默认是两边的
 * @param str 需要进行去空格的内容
 * @param is_global 是否全部去除空格
 */
export const trim = (str, is_global) => {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() === "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};
```

### 经常用到的一些小正则

```javascript
// 匹配8-16位数字和字母密码的正则表达式
let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

// 匹配身份证号码
let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 匹配中文
let reg = /^[\u4e00-\u9fa5]*$/;

//匹配手机号
let reg = /^1\d{10}$/;

//匹配括号里面的文字 
let reg =/\(([^)]*)\)/g

//匹配千分位
let reg =/^(-)?\d{1,3}(,\d{3})*(.\d+)?$/
```

### 单击和双击同时存在

```javascript
 dbJumpHome = () => {
    if (this.clickTimer) {
        window.clearTimeout(this.clickTimer);
        this.clickTimer = null;
    }
    //执行代码
};

jumpTo = () => {
    if (this.clickTimer) {
        window.clearTimeout(this.clickTimer);
        this.clickTimer = null;
    }

    this.clickTimer = window.setTimeout(() => {
        //执行代码
    }, 200);
};
```

### 同时调取多个接口

```javascript
//Promise 请求多个接口
const createSource = await Promise.all([queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id'])])
console.log(createSource);//[{},{}]

//axios请求多个接口
axios.all([queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id']).then(axios.spread((user, aside) => {
  console.log(user);
  console.log(aside);
}));

```

### 移动端兼容性问题

```javascript
//解决ios键盘弹起取消后留空白的现象
;(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
// 这里加了个类型判断，因为a等元素也会触发blur事件
if (
  ['input', 'textarea'].includes(e.target.localName)
) {
  // document.body.scrollIntoViewIfNeeded();
  // document.activeElement.scrollIntoViewIfNeeded();
  document.body.scrollIntoView(true);
}

}, true);
```

### 获取滚动条的高度

```javascript
function ScollPostion() {//滚动条位置
let t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
 return { top: t, left: l, width: w, height: h };
}


window.pageYOffset == window.scrollY; // 总是返回 true
var supportPageOffset = window.pageXOffset !== undefined;
// document.compatMode;　　//可以用来判断是否声明了DTD; 值为"BackCompat"：未声明DTD;    值为"CSS1Compat"：已声明DTD;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

```

### URL的编码解码

```javascript
//编码
//;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号,会被十六进制的转义序列替换
encodeURIComponent(URIstring)
encodeURIComponent(",/?:@&=+$#")//%2C%2F%3F%3A%40%26%3D%2B%24%23

//解码
decodeURIComponent(URIstring)
decodeURIComponent("%2C%2F%3F%3A%40%26%3D%2B%24%23")//,/?:@&=+$#
```

### 获取图片的原始尺寸

```js
function getImgNaturalDimensions(oImg, callback) {
　　var nWidth, nHeight;
　　if (!oImg.naturalWidth) { // 现代浏览器

　　　　nWidth = oImg.naturalWidth;
　　　　nHeight = oImg.naturalHeight;
　　　　callback({w: nWidth, h:nHeight});

　　} else { // IE6/7/8
　　　　var nImg = new Image();

        nImg.onload = function() {
             var nWidth = nImg.width,
                 nHeight = nImg.height;
           callback({w: nWidth, h:nHeight});
　　　　}
　　　　nImg.src = oImg.src;
　　}
}
// 使用
var img = document.getElementById("oImg");
getImgNaturalDimensions(img, function(dimensions){
　　console.log(dimensions.w);
});
```

### 无尺寸的图像布局偏移

https://web.dev/optimize-cls/#images-without-dimensions

布局偏移可能会分散用户的注意力。想象一下，您已经开始阅读一篇文章，可是页面上的元素突然位移，让您措手不及，于是您不得不再次找到先前阅读的位置。
这在网络上十分常见，包括在阅读新闻或尝试单击"搜索"或"添加到购物车"按钮时。这种体验在视觉上十分扎眼且令人郁闷。
这些情况通常是由于另一个元素被突然添加到页面上或是突然调整了大小，使可见元素被迫移动位置而导致的。

现代最佳实践

首先在 img 标签上添加 width height

```html
<img src="puppy.jpg" width="640" height="360" alt="小狗与气球" />
```

其次在 css 上添加以下代码

```css
img {
  height: auto;
  width: 100%;
}
```

一个个添加效率低，服务端返回的尺寸也不清晰，我们可以封装一个方法，帮助我们自动添加

```javascript
export const readImageSize = (imgUrl) => new Promise((resolve, reject) => {
  const img = new Image()

  img.src = imgUrl

  img.onload = () => {
    resolve({
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
    })
  }

  img.onerror = reject
})
```

然后拿到 img 的链接，动态添加，:width="xxxx" 、 :height="xxxx"

```javascript
// templateObj 数据源
export const  fillImageSizes = (templateObj) => {
  return Promise.all(Object.keys(templateObj).map((key) => {
    const item = templateObj[key]
    if (item.width && item.height) {
        return
    }

    return readImageSize(this.templateImgUrl(key)).then(({ width, height }) => {
        Object.assign(item, { width, height })
    }, () => {
    })
  }))
}
```
