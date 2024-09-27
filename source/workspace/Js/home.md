

# 技术清单
## js正则删除行内块之间的空格

```javascript
 let rep = function (match, item1, item2, item3) {
   // item2 是空格部分
   return item1 + item3
 }
 let source = template.content.replace(/(>)(\s*)(<)/g, rep);
```

## 本地缓存

localStorage的库

```javascript
yarn add store
```

JS检测本地储存localStorage的变化

```javascript
window.addEventListener('storage', function(event){
 console.log(event)
})
```

IndexedDB的库

```javascript
yarn add hello-indexeddb
```

## 页面直接编辑

```javascript
document.body.contentEditable = true
```

```html
// 一些API的简单使用 
<input type=button value=剪切 οnclick=document.execCommand('Cut')>
<input type=button value=拷贝 οnclick=document.execCommand('Copy')>
<input type=button value=粘贴 οnclick=document.execCommand('Paste')>
<input type=button value=撤消 οnclick=document.execCommand('Undo')>
<input type=button value=重做 οnclick=document.execCommand('Redo')>
<input type=button value=删除 οnclick=document.execCommand('Delete')>
<input type=button value=黑体 οnclick=document.execCommand('Bold')>
<input type=button value=斜体 οnclick=document.execCommand('Italic')>
<input type=button value=下划线 οnclick=document.execCommand('Underline')>
<input type=button value=停止 οnclick=document.execCommand('stop')>
<input type=button value=保存 οnclick=document.execCommand('SaveAs')>
<input type=button value=另存为 οnclick=document.execCommand('Saveas',false,'c:\\test.htm')>
<input type=button value=字体 οnclick=document.execCommand('FontName',false,fn)>
<input type=button value=字体大小 οnclick=document.execCommand('FontSize',false,fs)>
<input type=button value=刷新 οnclick=document.execCommand('refresh',false,0)>
```

```javascript
/* 
*第二个参数最好不要设置为TRUE，否则可能会执行不了 
*/  
//加粗  
function jiacu() {  
    document.execCommand("Bold",false,null);  
}  
//斜体  
function xieti() {  
    document.execCommand("Italic",false,null);  
}  
//下划线  
function xiahua() {  
    document.execCommand("Underline",false,null);  
}  
//删除线  
function shanchu() {  
    document.execCommand("StrikeThrough",false,null);  
}  
  
//设置字体  
function setFontName(param) {  
    document.execCommand("FontName",false,param);  
    document.getElementById("fontUl").style.display="none";   
}  
//设置字体大小  
function setFontSize(param) {  
    document.execCommand("FontSize",false,param);  
    document.getElementById("sizeUl").style.display="none";   
}  
//设置字体颜色  
function setFontColor(param) {  
    document.execCommand("ForeColor",false,param)  
    document.getElementById("fontColor1").style.display="none";   
}  
//设置背景颜色  
function setBackColor(param)  
{  
    document.execCommand("BackColor",false,param)  
    document.getElementById("bgColor1").style.display="none";   
}  
//删除文字格式  
function removeFormat() {  
    document.execCommand("RemoveFormat",false,null);  
}  
//对齐方式  
function duiqiway(param) {  
    document.execCommand(param,false,null);  
    document.getElementById("duiqiUl").style.display="none";   
}  
//插入列表  
function insertList(param) {  
    document.execCommand(param,false,null);  
    alert("暂时未实现");  
    document.getElementById("liebiaoUl").style.display="none";   
}  
//改变缩进  
function changeIndent(param) {  
    document.execCommand(param,false,null);  
    alert("暂时未实现");  
}  
//链接    //不能实现,取消链接的命令只用于用createLink命令创建的链接  
function setLink(param) {  
    document.execCommand(param,false,"http://blog.csdn.net/u011043843"); //第三个参数为URL  
    alert("暂时未实现");  
}  
//表情  
function insertBQ(param) {  
    document.execCommand("InsertImage",false,param);   //param为图片的url    
    document.getElementById("bqDiv").style.display="none";   
}  
  
//段落  
function parag(param) {  
    document.execCommand("formatBlock",false,param);  
    document.getElementById("paraUl").style.display="none";  
}
```

## 实现一套撤销重恢复做功能

上面的方案仅仅针对文字类需求有效，而且兼容性比较低，一些设备都不能用。

如果是画布的话，只能自己实现一套

我们需要两个栈来实现这个操作：分别是撤销栈和回退栈。

整体流程：
1.每当我们开始拖拽画布元素，或者开始缩放之前，我们要保存此次操作时刻的屏幕快照，在本系统中，组件都以json数组的形式来渲染。所以我们需要保存的就是当前画布的组件json数组。.将当前画布的json数组作为一个整体push进撤销栈，表示记录本次操作。

2.我们拖动元素这个动作结束了，当前画布的json数组必然发生了更新。现在我们想撤销这次拖动操作。点击撤销后，先将当前画布的json数组push到回退栈中，用撤销栈中最后一个json数组来setstate重新渲染画布元素（第一步push的那个json数组）。再使用数组pop方法，删除撤销栈中最后一个json数组。

3.回退时先将当前画布的json数组push到撤销栈中，用回退栈中最后一个json数组来setstate重新渲染画布元素（第二步push的那个json数组）。再使用数组pop方法，删除回退栈中最后一个json数组。

![](https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/desc/4f73703bd58543449a08ef6d2b2da1af.png)

看下控制台输出：

![](https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/desc/adcaf891cd4341f9b9f6f951451cd181.gif)

部分实现逻辑

```js
import { cloneDeep } from 'lodash';
import { useModel } from 'umi';
 
// 最大回退操作步骤
const maxStep = 60;
 
const undoQueue: any = [];
let redoQueue: any = [];
 
// 实现撤销回退队列的管理功能
const QueueManager = () => {
  const { components, setComponents } = useModel('visualPage');
  const saveSnap = () => {
    const snap = cloneDeep(components);
    if (undoQueue.length >= maxStep) {
      undoQueue.shift();
    }
    undoQueue.push(snap);
    // console.log('queue', undoQueue, redoQueue);
    // 注意！！每次执行命令时清空重做栈
    redoQueue = [];
  };
 
  const undo = () => {
    const snap = cloneDeep(components);
    const c = cloneDeep(undoQueue[undoQueue.length - 1]);
    setComponents(c);
    redoQueue.push(snap);
    undoQueue.pop();
    // console.log('undo', undoQueue, redoQueue);
  };
 
  const redo = () => {
    const snap = cloneDeep(components);
    const c = cloneDeep(redoQueue[redoQueue.length - 1]);
    setComponents(c);
    undoQueue.push(snap);
    redoQueue.pop();
    // console.log('redo', undoQueue, redoQueue);
  };
 
  return {
    saveSnap,
    undo,
    redo,
    undoQueue,
    redoQueue,
  };
};
 
/* bug手中过，片叶不沾身！ */
 
export default QueueManager;
```

## 双向数据绑定

`defineProperty`版本

```javascript
<input type="text" id="input">
<span id="text"></span>

const data = {};
Object.defineProperty(data, 'text', {
    set(value) {
        this._value = value;  // 使用一个私有属性来存储值
        input.value = value;  // 更新输入框
        text.innerText = value;  // 更新文本
    },
    get() {
        console.log('获取值', this._value);  // 输出当前值
        return this._value;  // 返回存储的值
    }
});

input.oninput = function (e) {
    data.text = e.target.value;  // 更新 data.text
    console.log(data.text);  // 输出当前值
};
```

`proxy`版本

```js
<input type="text" id="input">
<span id="text"></span>

const data = {};
const handler = {
    set(target, key, value) {
        target[key] = value;
        input.value = value;  // 更新输入框
        text.innerText = value;  // 更新文本
        return true;  // 返回 true 表示成功
    },
    get(target, key) {
        console.log('获取值');
        return target[key];  // 返回目标对象中的值
    }
};

const proxy = new Proxy(data, handler);

input.oninput = function (e) {
    proxy.text = e.target.value;  // 使用统一的属性名
};
```

## 节流防抖

```javascript
// 防抖函数
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 节流函数
export const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

export default {
  data() {
    return {
      value: ''
    };
  },
  methods: {
    handleChange: debounce(function(e) {
      console.log(this.value);
    }, 300),  // 防抖延迟设为 300 毫秒
  },
  created() {
    this.fnScroll = throttle(() => {
      // 滚动处理逻辑
      console.log('滚动事件');
    }, 1000);
  }
};

```

## 导出表格

```js
const url = window.URL.createObjectURL(
  new Blob([res], { type: "application/vnd.ms-excel" })
);
const fileName = `操作日志${dayjs().format("YYYY-MM-DD")}.xls`;
let link = document.createElement("a");
link.style.display = "none";
link.href = url;
link.setAttribute("download", fileName);

document.body.appendChild(link);
link.click();
//释放URL对象所占资源
window.URL.revokeObjectURL(url);
//用完即删
document.body.removeChild(link);
```

## window.requestAnimationFrame & window.requestIdleCallback

**软知识：**

1. **屏幕刷新频率：** 屏幕每秒出现图像的次数,普通笔记本为60Hz.

2. **动画原理：** 计算机每16.7ms刷新一次（1000/60），由于人眼的视觉停留，所以看起来是流畅的移动。

3. **setTimeout：** 通过设定`间隔时间`来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：

> 1、settimeout任务被放入`异步队列`，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；<br/>
> 2、settimeout的固定`时间间隔不一定与屏幕刷新时间相同`，会引起丢帧。

4. **requestAnimationFrame：** 优势：

> 1.由`系统决定回调函数的执行时机`，60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿<br/>
> 2.CPU节能：使用setTimeout实现的动画，`当页面被隐藏或最小化时`，`setTimeout 仍然在后台执行动画任务`，由于此时页面处于不可见或不可用状态，
刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，
因此跟着系统步伐走的`requestAnimationFrame也会停止渲染`，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。<br/>
> 3.函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，
使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。

### requestAnimationFrame

```javascript
 //回到顶部
const goTop=()=> {
let product_content = document.getElementById('product_content');
this.progress = product_content.scrollTop;
    if (this.progress >= 0) {
      window.requestAnimationFrame(this.step);
    }
}

export const step= ()=> {
let product_content = document.getElementById('product_content');
    if (this.progress > 0) {
      this.progress -= 250;  //这里可以根据高度成比例减少，不会突兀
      product_content.scrollTop = this.progress;
      window.requestAnimationFrame(this.step);
    }else{
      window.cancelAnimationFrame(this.step);
    }
}
```

### requestIdleCallback

浏览器每一帧都需要完成哪些工作？

<img src="https://p5.ssl.qhimg.com/t110b9a93012e1b41fd501c7ec1.webp" alt="">

通过上图可看到，一帧内需要完成如下六个步骤的任务：

1. 处理用户的交互<br/>
2. JS 解析执行<br/>
3. 帧开始。窗口尺寸变更，页面滚去等的处理<br/>
4. requestAnimationFrame(rAF)<br/>
5. 布局<br/>
6. 绘制<br/>

上面六个步骤完成后没超过16.7ms,说明时间有富余，此时就会执行`requestIdleCallback里注册的任务`(requestIdleCallback的时长并不是16ms,他是一个肉眼觉察不到的时间),如果没rAF这样的循环处理，浏览器一直处于空闲状态的话，`deadline.timeRemaining`可以得到的最长时间

在`空闲时段`这种情况下，用户代理可能没有即将完成的任务，可以限制空闲周期的结束。为了避免在不可预测的任务（例如用户输入的处理）中引起用户可察觉的延迟，这些空闲周期的长度应限制为最大值50ms。

最大期限为50毫秒，是根据研究[ RESPONSETIME ] 得出的，该研究表明，对用户输入的100毫秒以内的响应通常被认为对人类是瞬时的。将闲置截止期限设置为50ms意味着即使在闲置任务开始后立即发生用户输入，用户代理仍然有剩余的50ms可以在其中响应用户输入而不会产生用户可察觉的滞后。

**API**

```javascript
var handle = window.requestIdleCallback(callback[, options])
```

- callback：回调，即空闲时需要执行的任务，该回调函数接收一个IdleDeadline对象作为入参。其中IdleDeadline对象包含：
  - **didTimeout**，布尔值，表示任务是否超时，结合 timeRemaining 使用。
  - **timeRemaining()**，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。
- options：目前 options 只有一个参数
  - **timeout**。表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲

```javascript
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
// 任务队列
const tasks = [
 () => {
   console.log("第一个任务");
 },
 () => {
   console.log("第二个任务");
 },
 () => {
   console.log("第三个任务");
 },
];

function myNonEssentialWork (deadline) {
 // 如果帧内有富余的时间，或者超时
 while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
   work();
 }

 if (tasks.length > 0)
   requestIdleCallback(myNonEssentialWork);
 }

function work () {
 tasks.shift()();
 console.log('执行任务');
}
```

超时的情况，其实就是浏览器很忙，没有空闲时间，此时会等待指定的 timeout 那么久再执行
，通过入参 dealine 拿到的 `didTmieout 会为 true，同时 timeRemaining () 返回的也是 0`。
超时的情况下如果选择继续执行的话，肯定会出现卡顿的，因为必然会将一帧的时间拉长

**cancelIdleCallback**

与 setTimeout 类似，返回一个唯一 id，可通过 cancelIdleCallback 来取消任务。

## MutationObserver

MutationObserver 是一个可以监听DOM结构变化的接口。

异步的 （微任务）

- childList：如果突变目标的子代被观察，则设置为 true。
- attributes：如果要观察目标属性的突变，则设置为 true。 如果指定了 attributeOldValue 和（或）attributeFilter，则可以省略。
- characterData：如果要观察到目标数据的突变，则设置为 true。 如果指定了characterDataOldValue，则可以省略。
- subtree：如果突变不仅仅是目标对象，而且包括目标的后代（descendants），则设置为 true。
- attributeOldValue：如果前面的 attributes 属性设置为 true 或省略，并且目标的属性值在突变前要做记录，则设置为 true。
- characterDataOldValue：如果前面的 characterData 属性设置为 true 或省略，并且目标的数据在突变前要做记录，则设置为 true。
- attributeFilter：设置为属性本地名称列表（没有命名空间），如果不是所有属性突变都需要观察，属性为 true 或省略。例如：['class','src']

```javascript
new MutationObserver(() => {
  let dom =   document.body.getAttribute('data-random')
  console.log(dom)  // 如果用户修改body的属性，就会触发这个方法
}).observe(document.body, {
  attributes: true
})

document.body.setAttribute('data-random', Math.random())
document.body.setAttribute('data-random', Math.random())
document.body.setAttribute('data-random', Math.random())

// 只会输出一次 ovserver
```

## ResizeObserver

ResizeObserver 创建一个新的ResizeObserver对象监听元素大小变化

这个接口可以监听到元素的变化，以前我们只能通过window.resize来监听页面变化，现在有了这个API任何元素都可以监听

```javascript
<!--html-->
<textarea id="main"></textarea>

// javascript

let mainEl = document.querySelector('#main')
const resizeObserver = new ResizeObserver(entries => {
    console.log(entries)
})

//拉动textarea的大小，即可看到输出
// 监听元素大小改变
resizeObserver.observe(mainEl) //ResizeObserverEntry [{target: textarea#main, contentRect:  {x: 2, y: 2, width: 143, height: 43, top: 2, …}}]

// 取消某个元素监听
//resizeObserver.unobserve(mainEl)

// 取消全部元素监听
//resizeObserver.disconnect()
```

## IntersectionObserver 是否可见

```javascript
const observer = new IntersectionObserver(function(changes) {
  console.log(changes);
  changes.forEach(function(element, index) {
    // statements
    if (element.intersectionRatio > 0 && element.intersectionRatio <= 1) {
      element.target.src = element.target.dataset.src;
    }
   }); 
});


function addObserver() {
let listItems = document.querySelectorAll('.list-item-img');
listItems.forEach(function(item) {
  observer.observe(item);
});
}

addObserver();
```

## Es6模块导入

```javascript
import * as xxx from ‘xxx’:  // 会将若干export导出的内容组合成一个对象返回；
import {a,b,c,...} from ‘xxx’

import xxx from ‘xxx’：（export default xxx）// 只会导出这个默认的对象作为一个对象

export {default as docs} from "./xxx"  // 可以作为入口 统一导出
```

## Tay Catch

```javascript
 try {
    value = this.getter.call(vm, vm)
 } catch (e) {
    handleError(e, vm, `getter for watcher "${this.expression}"`)
 } finally {
    console.log('失败与否必须执行')
 }
```

## 控制进度 (任务编排)

```javascript
// 控制加载
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
let frameworkStartedDefer = new Deferred()
async function ff() {
  await frameworkStartedDefer.promise;
  console.log(121212)
}
ff();
frameworkStartedDefer.resolve()
```

## 睡觉函数

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ff() {
  await sleep(3000);
  console.log(121212)
}
ff();
```

## 弱网检测

```javascript
const isSlowNetwork = navigator.connection
  ? navigator.connection.saveData ||
    (navigator.connection.type !== 'wifi' &&
      navigator.connection.type !== 'ethernet' &&
      /(2|3)g/.test(navigator.connection.effectiveType))
  : false;
if (!navigator.onLine || isSlowNetwork) {
    return;
}
```

## 获取 某个 Attr 属性上的 dom

```html
<div class="report-position" data-log-expo="{&quot;event&quot;:&quot;get_sharebooks_content&quot;}"></div>
```

获取 dom

```javascript
document.querySelectorAll(`[data-log-expo]`)
```

## userAgent

```javascript
// 判断浏览器内核、手机系统等，使用 browser.userAgent.mobile
var browser = {
    userAgent: function () {
        var ua = navigator.userAgent;
        var ualower = navigator.userAgent.toLocaleLowerCase();
        return {
            trident: ua.indexOf('Trident') > -1, // IE内核
            presto: ua.indexOf('Presto') > -1, // opera内核
            webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, // 火狐内核
            mobile: !!ua.match(/AppleWebKit.*Mobile.*/) || !!ua.match(/AppleWebKit/), // 是否为移动终端
            ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
            android: ua.indexOf('Android') > -1, // 安卓终端
            iPhone: ua.indexOf('iPhone') > -1, // 是否为iphone或QQHD浏览器
            iPad: ua.indexOf('iPad') > -1, // 是否为iPad
            webApp: ua.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
            QQbrw: ua.indexOf('MQQBrowser') > -1, // QQ浏览器(手机上的)
            weiXin: ua.indexOf('MicroMessenger') > -1, // 微信
            QQ: ualower.match(/\sQQ/i) == " qq", // QQ App内置浏览器（需要配合使用）
            weiBo: ualower.match(/WeiBo/i) == "weibo", // 微博
            ucLowEnd: ua.indexOf('UCWEB7.') > -1, //
            ucSpecial: ua.indexOf('rv:1.2.3.4') > -1,
            webview: !(ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)) && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
            ucweb: function () {
                try {
                    return parseFloat(ua.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
                } catch (e) {
                    if (ua.indexOf('UC') > -1) {
                        return true;
                    }
                    return false;
                }
            }(),
            Symbian: ua.indexOf('Symbian') > -1,
            ucSB: ua.indexOf('Firofox/1.') > -1
        };
    }()
};
```

## import和require区别

**语法**：
    `import`是 ES6 引入的模块导入语法，如：`import module from'modulePath';`
    `require`是 Node.js 中传统的模块导入方式，如：`const module = require('modulePath');`

**静态与动态**：
    `import`是静态导入，在编译时确定模块依赖关系，运行时不能动态改变。
    `require`是动态导入，可在运行时根据条件加载不同模块。

**模块格式**：
    `import`通常用于导入 ES6 模块，支持默认导出和命名导出，模块默认使用严格模式。
    `require`主要用于 CommonJS 模块，使用`module.exports`导出模块内容。

**异步与同步**：
    在浏览器中，`import`通常是异步的，不阻塞页面渲染。
    `require`在 Node.js 中是同步的，会阻塞代码执行直到模块加载完成。

```javascript

//index.tsx
console.log(1)
import {sum} from "./sum"
console.log(sum(1,2))

//sum.tsx
console.log(2)
export const sum=(a,b)=>a+b;

//result: 2,1,3

//import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行
//如果是require()结果会依次打印出来，1，2，3
```

## 检测数据类型

### typeof

```javascript
// typeof 用以获取一个变量或者表达式的类型，typeof 一般只能返回如下几个结果：
number，boolean，string，function（函数），symbol，object（NULL,数组，对象），undefined。

let num = 10;
console.log(typeof num); // 输出: number

let isTrue = true;
console.log(typeof isTrue); // 输出: boolean

let str = "Hello";
console.log(typeof str); // 输出: string

let func = function() {};
console.log(typeof func); // 输出: function

let sym = Symbol();
console.log(typeof sym); // 输出: symbol

let obj = {};
console.log(typeof obj); // 输出: object

let arr = [];
console.log(typeof arr); // 输出: object

let nullVar = null;
console.log(typeof nullVar); // 输出: object

let undef = undefined;
console.log(typeof undef); // 输出: undefined
```

### instanceof

```javascript
[1, 2, 3] instanceof Array; //true

//可以看到[1, 2, 3]是类型Array的实例
[1, 2, 3] instanceof Object; //true

//封装
function myInstanceof(val, type) {
    let rightProto = type.prototype;  // 目标构造函数的原型
    let proto = Object.getPrototypeOf(val);  // 获取 val 的原型
    
    // 循环遍历 val 的原型链
    while (proto) {
        if (proto === rightProto) {
            return true;  // 找到了匹配的原型，返回 true
        }
        proto = Object.getPrototypeOf(proto);  // 继续向上查找原型链
    }
    
    return false;  // 遍历完原型链，没找到匹配的原型，返回 false
}

```

### constructor

1：null 和 undefined 无constructor，这种方法判断不了。

2：还有，如果自定义对象，开发者重写prototype之后，原有的constructor会丢失，因此，为了规范开发，在重写对象原型时一般都需要重新给 constructor 赋值，以保证对象实例的类型不被篡改。

```javascript
''.constructor===String
new Number(111).constructor===Number
(11).constructor===Number
false.constructor===Boolean
new Date().constructor===Date
new Function().constructor===Function
[].constructor===Array

class Chameleon {
  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}
Chameleon.constructor===Function
new Chameleon().constructor.constructor===Function
Object.prototype.toString.call(new Chameleon().constructor) //"[object Function]"
new ew Chameleon().constructor===Function  //false
```

### Object.prototype.toString.call()

```javascript
function is(type, obj) {
    const classType = Object.prototype.toString.call(obj).slice(8, -1); // 获取对象类型
    return obj != null && classType === type; // 使用 != 来同时检查 null 和 undefined
}

// 示例使用
console.log(is('String', 'test')); // true
console.log(is('String', new String('test'))); // true
```

## HTML页面加载完毕后运行JS

```javascript
// 可以判断js时候加载完毕
window.onload=function(){}  

// 当dom加载完就可以执行（比window.onload更早）
$(function(){}); 
$(document).ready(function(){})

// 最晚执行
<body onload="fn()"></body>
```

**两者的主要区别**

当一个文档完全下载到浏览器中时，才会触发`window.onload`事件

$(document).ready{ }是在DOM完全就绪并可以使用时调用，此时可能图片等还可能没有下载完成

## JS 动态加载 JS

```js
function reloadJSFn(id, newJS) {
    const oldScript = document.getElementById(id);
    if (oldScript) oldScript.remove(); // 移除旧脚本

    const scriptObj = document.createElement('script');
    scriptObj.src = newJS;
    scriptObj.id = id;
    document.head.appendChild(scriptObj); // 添加新脚本
}

// 请求并执行 JS 文件
fetch('https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/water-mark/index.js')
    .then(res => res.ok ? res.text() : Promise.reject('Network error'))
    .then(eval)
    .then(() => waterMark('wk', null, 'app'))
    .catch(console.error);
```

## Symbol

```javascript
//Symbol 是基本数据类型  

const Age=Symbol();

typeof Age === 'symbol'
```

```javascript
//属性名 为不可枚举属性

let obj = {
   [Symbol('name')]: '一斤代码',
   age: 18,
   title: 'Engineer'
}

Object.keys(obj)   // ['age', 'title']

for (let p in obj) {
   console.log(p)   // 分别会输出：'age' 和 'title'
}

Object.getOwnPropertyNames(obj)   // ['age', 'title']

JSON.stringify(obj)  // {"age":18,"title":"Engineer"}

//一些专门针对Symbol的API
// 使用Object的API
Object.getOwnPropertySymbols(obj) // [Symbol(name)]

// 使用新增的反射API
Reflect.ownKeys(obj) // [Symbol(name), 'age', 'title']
```

```javascript
//使用Symbol代替REDUX的常量
// const TYPE_AUDIO = 'AUDIO'
// const TYPE_VIDEO = 'VIDEO'
// const TYPE_IMAGE = 'IMAGE'

const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()
```

- 显示版本号

```javascript
const pkg = require('../package.json');
window.mmPlayer = window.mmplayer = `欢迎使用 
当前版本为：V${pkg.version}
作者：${pkg.auter}`
console.info(`%c${window.mmPlayer}`, `color:blue`);
```

- 耗时监控

```javascript
console.time(111)

Array(1000000).keys()
console.timeEnd(111)  //111: 8.5390625ms
```

- table

```javascript
console.table()
```

- 清空控制台历史记录
  - 在控制台`右键`，或者按下 `Ctrl 并单击鼠标`，选择 Clear Console。
  - 在脚本窗口输入 `clear()`执行。
  - 使用快捷键 `command + K`

- 切换主题

Chrome 提供了 亮&暗 两种主题,当你视觉疲劳的时候,可以 switch 哦, 快捷键 `command+shift+p` ,打开 Command Menu,输入 `theme` ,即可选择切换


## js文件压缩原因和压缩原理

**压缩：** 删除 Javascript 代码中所有注释、跳格符号、换行符号及无用的空格，从而压缩 JS 文件大小。<br/>
**混淆：** 经过编码将变量和函数原命名改为毫无意义的命名，以防止他人窥视和窃取 Javascript 源代码。

**javascript文件压缩的原理**

第一个当然就是去掉注释了。

另外就是跟CSS压缩相同的去掉换行符，空格什么的。

JAVASCRIPT中有几种变量形式，如变量，函数名，函数的参数等，通常我们在手写JS代码的时候，为了便于理解，我们都会给这些变量名以直观易懂的字符串，如：var title=”javascript”;这个习惯是值得推崇的。

但是，这些变量对于用户理解有帮助，对于计算机却没什么影响，如果我们把前面的句子变成：var a=”javascript”;对电脑来讲是一样的。

通常深度压缩JS都必须要做的一步就是尽量地缩短变量名，因为一份体积巨大的JS代码，其中的变量名会占去不少空间。

26个单字母，几乎就可以把一个函数中所有的参数都写完，所以我们经常在压缩版的JS代码中发现a,b,c,d之类的连续变量。

另外，Javascript有个特性就是不同作用域的变量名可以任意重复，所以此函数中有a,b,c,d，其他函数也可以有。这样短又大量重复的变量可以让人索云里雾里不知所云，也变相的起到了加密JS代码的作用.

**注意**

1. 压缩前的代码格式要标准。因为去掉换行与空格时，所有语句就变成一行了，如果你的代码有瑕疵（比如某行少了个分号），那就会导致整个文件报错。当然，现在有的压缩工具已经比较智能了。
2. 备份原文件
3. 压缩很可能不会一次成功，一般要多试，多改

## window.performance API

允许网页访问某些函数来测量网页和Web应用程序的性能,包括 Navigation Timing API和高分辨率时间数据

```js
function getPerformanceTiming () {
  var performance = window.performance;

  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口');
    return;
  }

  var t = performance.timing;
  var times = {};

  //【重要】页面加载完成的时间
  //【原因】这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventEnd - t.navigationStart;

  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  times.domReady = t.domComplete - t.responseEnd;

  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  times.redirect = t.redirectEnd - t.redirectStart;

  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.ttfb = t.responseStart - t.navigationStart;

  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  times.request = t.responseEnd - t.requestStart;

  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  times.loadEvent = t.loadEventEnd - t.loadEventStart;

  // DNS 缓存时间
  times.appcache = t.domainLookupStart - t.fetchStart;

  // 卸载页面的时间
  times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

  // TCP 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart;

  return times;
}
```

**计算性能指标**

    可以使用Navigation.timing 统计到的时间数据来计算一些页面性能指标，比如DNS查询耗时、白屏时间、domready等等。如下：

    DNS查询耗时 = domainLookupEnd - domainLookupStart
    TCP链接耗时 = connectEnd - connectStart
    request请求耗时 = responseEnd - responseStart
    解析dom树耗时 = domComplete - domInteractive
    白屏时间 = domloadng - fetchStart
    domready时间 = domContentLoadedEventEnd - fetchStart
    onload时间 = loadEventEnd - fetchStart

## 读取注释

```javascript

function eachComment(ele) {
    let child = ele.childNodes[0];
    if (child.nodeType === 8) {
        console.log(child.nodeValue);
    }
}
let bodyElement = document.getElementsByTagName("body")[0];
eachComment(bodyElement);
```

## 参看文档

[github](https://sourcegraph.com/github.com/alienzhou/frontend-tech-list@master/-/blob/README.md?utm_source=share)

[博客1](https://panjiachen.github.io/awesome-bookmarks/repository/)

[博客2](https://lq782655835.github.io/blogs//)

[博客3](https://www.muyiy.cn/)
