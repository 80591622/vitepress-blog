---
abbrlink: ff86eea5
title: JS添加水印功能
date: 2021-04-25
categories: 
- JS
- JS添加水印功能
---
<strong class='old-blog'>JS添加水印功能</strong>

[[toc]]

### 不使用canvas

```javascript
// watermark.js
let waterMarkDOM;

let clearWaterMark = () => {
  if (waterMarkDOM) waterMarkDOM.remove();
};
export default function createWaterMark(waterMarkName) {
  clearWaterMark();
  if (!waterMarkName)  return;

  let width = window.parseInt(document.body.clientWidth);
  let canvasWidth = width / window.parseInt(width / 200);
  let fontFamily = window.getComputedStyle(document.body)['font-family'];

  const fragment = document.createDocumentFragment();
  waterMarkDOM = document.createElement('div');
  waterMarkDOM.className = 'water-mark-wrap';
  let spanStr = '';
  for (let i = 0; i < 40; i++) {
    spanStr += `<span class="water-word" style=width:${canvasWidth}px;height:150px;font: ${fontFamily}>${waterMarkName}</span>`;
  }
  waterMarkDOM.innerHTML = spanStr;

  fragment.appendChild(waterMarkDOM);
  document.body.appendChild(fragment);
}

// index.html
import watermark from "./util/watermark"
watermark('username');

// index.css
<style>
  .water-mark-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}

  .water-word {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(8, 8, 8, 0.1);
  transform: rotate(-25deg);
  user-select: none;
}
</style>
```



### 使用canvas

```javascript
// watermark.js
let waterMarkDOM;
export default function createWaterMark(text) {
  let getIdEle = (ele) => document.getElementById(ele);
  if (waterMarkDOM) waterMarkDOM.remove()
  if (!text) {
    return getIdEle('__water-mark') && document.head.removeChild(document.getElementById('__water-mark'));
  }

  let width = window.parseInt(document.body.clientWidth);
  let canvasWidth = width / window.parseInt(width / 200);
  let fontFamily = window.getComputedStyle(document.body)["font-family"];

  // canvas
  let canvas = document.createElement('canvas')
  canvas.width = canvasWidth // 每个水印的宽高
  canvas.height = 150;
  let ctx = canvas.getContext('2d')
  ctx.font = `18px ${fontFamily}`;
  ctx.fillStyle = 'rgba(8, 8, 8, 0.1)'
  ctx.rotate(-0.29);
  ctx.fillText(text, 0, 80)

  let src = canvas.toDataURL('image/png')

  // 添加dom
  const fragment = document.createDocumentFragment();
  waterMarkDOM = document.createElement('div')
  waterMarkDOM.id = 'water-mark';
  fragment.appendChild(waterMarkDOM);
  
  if (!getIdEle(waterMarkDOM.id)) {
    getIdEle('main') ? getIdEle('main').appendChild(fragment) : console.error('水印加载失败');
  }

  // 处理样式
  let style = document.createElement("style");
  style.id = '__water-mark';
  let innerHTML = `#water-mark:before{
        content: "";
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        position: fixed;
        overflow: hidden;
        z-index: 9999;
        pointer-events: none;
        background-repeat: repeat, repeat;
        background-position: 102.5px 102.5px, 0px 0px;
        background-image: url("${src}");
    }`;
  style.innerHTML = innerHTML
  let styleEle = document.getElementById('__water-mark')

  if (styleEle) {
    styleEle.innerHTML = innerHTML;
  } else {
    document.head.appendChild(style);
  }
}

// index.html
<div id='main'>
	// 会在这个里面添加
</div>
// 这里最好添加定时器，防止获取不到内部的dom
this.$nextTick(() => {
  watermark(val);
})
```

切记 `canvas.toDataURL('image/png')` 只能是png这种透明的、jpeg是不行的(部分带有背景色，遮挡页面内容),或者谷歌下可以使用 `image/webp` 体积更小、解码快、性能更好。



### 优化

做到目前为止只能防君子不防小人，那就要防止用户使用开发者工具之类的删除或者修改节点的样式去除水印，这时候可以用到 MutationObserver 构造函数，他可以创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用

这里使用canvas的方式来优化，MutationObserver 检测的 dom，没有这么多，也不用构建这么多dom,性能相对比较好。

```javascript
let waterMarkDOM, observer;
export default function createWaterMark(text) {
  // 停止监控
  observer && observer.disconnect()
  let getIdEle = (ele) => document.getElementById(ele);
  if (waterMarkDOM) waterMarkDOM.remove()
  if (!text) {
    return getIdEle('__water-mark') && document.head.removeChild(document.getElementById('__water-mark'));
  }

  let clientWidth = document.body.clientWidth || document.body.offsetWidth;
  let width = window.parseInt(clientWidth, 10);
  let canvasWidth = width / window.parseInt(width / 200);
  let fontFamily = window.getComputedStyle(document.body)["font-family"];

  // canvas
  let canvas = document.createElement('canvas')
  canvas.width = canvasWidth // 每个水印的宽高
  canvas.height = 150;
  let ctx = canvas.getContext('2d')
  ctx.font = `18px ${fontFamily}`;
  ctx.fillStyle = 'rgba(8, 8, 8, 0.08)'
  ctx.rotate(-0.29);
  ctx.fillText(text, 0, 80)

  let src = canvas.toDataURL('image/webp') 

  // 添加dom
  const fragment = document.createDocumentFragment();
  waterMarkDOM = document.createElement('div')
  waterMarkDOM.id = 'water-mark';
  fragment.appendChild(waterMarkDOM);
  if (!getIdEle(waterMarkDOM.id)) {
    getIdEle('main') ? getIdEle('main').appendChild(fragment) : console.error('水印加载失败');
  }

  // 处理样式
  let style = document.createElement("style");
  style.id = '__water-mark';
  let innerHTML = `#water-mark:before{
        content: "";
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        position: fixed;
        overflow: hidden;
        z-index: 9999;
        pointer-events: none;
        background-repeat: repeat, repeat;
        background-position: 102.5px 102.5px, 0px 0px;
        background-image: url("${src}");
    }`;
  style.innerHTML = innerHTML
  let styleEle = document.getElementById('__water-mark')

  if (styleEle) {
    styleEle.innerHTML = innerHTML;
  } else {
    document.head.appendChild(style);
  }

  // 禁止修改水印节点
  let targetNode = document.querySelector('#water-mark')
  let main = document.querySelector('#main')
 
  const resetDom = () => {
    targetNode.remove()
    createWaterMark(text);
  }
    
  let config = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }

  const mutationCallback = mutationList => {
    for (let mutation of mutationList) {
      // 遍历当前 dom 是否编辑了 主要针对是 attr 的修改  、  优化性能 只针对 water-mark 的 dom 监控 针对当前dom的内部信息
      if (mutation.oldValue === 'water-mark' || mutation.target.id === 'water-mark') {
        resetDom()
        break;
      }
      // 防止直接干掉当前 dom
      for (let item of mutation.removedNodes) {
        if (item.id === 'water-mark') {
          resetDom()
          break
        }
      }
    }
  }
 // firefox和chrome早期版本中带有前缀  
 let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

  // 创建 MutationObserver 实例
  observer = new MutationObserver(mutationCallback)
  // 开始监控目标节点
  observer.observe(main, config)
}
```

到此已经能防止开发者操作你的dom,但是还有一个问题是，我当前为了页面简洁把css添加到了head里面，而且css的检测功能并不完善（在控制台可以动态不勾选），所以就要把当前的样式放到标签上了。

```javascript
  // 添加dom 、样式
  const fragment = document.createDocumentFragment();
  waterMarkDOM = document.createElement('div')
  waterMarkDOM.id = 'water-mark';

  waterMarkDOM.style.height = '100%'
  waterMarkDOM.style.width = '100%'
  waterMarkDOM.style.position = 'fixed'
  waterMarkDOM.style.zIndex = '9999'
  waterMarkDOM.style.top = '0'
  waterMarkDOM.style.left = '0'
  waterMarkDOM.style.overflow = 'hidden'
  waterMarkDOM.style.pointerEvents = 'none'
  waterMarkDOM.style.backgroundRepeat = 'repeat, repeat'
  waterMarkDOM.style.backgroundPosition = '102.5px 102.5px, 0px 0px'
  waterMarkDOM.style.backgroundImage = 'URL(' + src + ')'
```

大致就是把之前的 head 的样式删除，添加到标签上就ok了。

本插件已发布npm,有兴趣的小伙伴可以[点击跳转](https://www.npmjs.com/package/watermark-webp)，查看更加完善的解析示例。



### 扩展题外知识

**cssText的使用优势**

一般情况下我们用js设置元素对象的样式会使用这样的形式：

```js
var element= document.getElementById(“id”);
element.style.width=”20px”;
element.style.height=”20px”;
element.style.border=”solid 1px red”;
```

样式一多，代码就很多；而且通过JS来覆写对象的样式是比较典型的一种销毁原样式并重建的过程，这种销毁和重建，都会增加浏览器的开销。

js中有一个cssText的方法：

语法为：

```javascript
obj.style.cssText=”样式”;

element.style.cssText=”width:20px;height:20px;border:solid 1px red;”;
```

这样就可以尽量避免页面reflow，提高页面性能。

但是，这样会有一个问题，会把原有的cssText清掉，比如原来的style中有’display:none;’，那么执行完上面的JS后，display就被删掉了。
为了解决这个问题，可以采用cssText累加的方法：
```javascript
Element.style.cssText += ‘width:100px;height:100px;top:100px;left:100px;’
```
因此，上面cssText累加的方法在IE中是无效的。

最后，可以在前面添加一个分号来解决这个问题：
```javascript
Element.style.cssText += ‘;width:100px;height:100px;top:100px;left:100px;’
```
再进一步，如果前面有样式表文件写着 div { text-decoration:underline; }，这个会被覆盖吗？不会！因为它不是直接作用于 HTML 元素的 style 属性。

