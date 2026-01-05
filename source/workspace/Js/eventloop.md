

# Event-Loop


## 同步 & 异步 & 多线程


**同步与异步的区别**

同步（Synchronous）：在执行某个操作时，应用程序`必须等待该操作执行完成后`才能继续执行。<br/>
异步（Asynchronous）：在执行某个操作时，应用程序可在异步操作执行时继续执行。实质：异步操作，启动了新的，线程主线程与方法线程并行执行。`异步任务是不会进入主线程，而是会先进入任务队列`<br/>

**异步和多线程的区别**

我们已经知道， 异步和多线程并不是一个同等关系,`异步是最终目的`,`多线程只是我们实现异步的一种手段`。
异步是当一个调用请求发送给被调用者,而调用者不用等待其结果的返回而可以做其它的事情。实现异步可以采用多线程技术或则交给另外的进程来处理。

简单的说就是：异步线程是由`线程池`负责管理，而多线程，我们可以`自己控制`，当然在多线程中我们也可以使用线程池。

[运行机制详解](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)


## JS中的异步操作

- 定时函数，如setTimeout setInterval requestAnimationFrame setImmediate(nodeJS) 
- IO 操作，如readFile readdir
- 网络请求，如ajax http.get（也可以同步，但是等待ajax请求响应之前，页面会卡住，用户什么都做不了,体验差）


这两个看你怎么说了

- 事件绑定都是异步操作 <br/>
除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。
- 回调函数可以理解为异步（不是严谨的异步操作，同步回调，异步回调）<br/>
所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

## 如何理解 JS 的异步？

```js
单线程是异步产生的原因
事件循环是异步的实现方式
```

JS 是一门**单线程**的语言，这是因为它运行在浏览器的**渲染主线程**中，而渲染主线程只有一个。  
而渲染主线程承担着诸多的工作，**渲染页面、执行 JS** 都在其中运行。如果使用同步的方式，就极有可能导致主线程产生**阻塞**，从而导致**消息队列**中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致**页面无法及时更新，给用户造成卡死现象**。  
所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如**计时器、网络、事件监听**，主线程将任务交给**其他线程**去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的**回调函数**包装成任务，加入到**消息队列的末尾排队**，等待主线程调度执行。  
在这种异步模式下，浏览器**永不阻塞**，从而最大限度的保证了单线程的流畅运行。

## event-loop（事件轮询）

<img src='/img/event-loop.webp'/>

主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，
它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"**任务队列（task queue）**"，依次执行那些事件所对应的回调函数

事件循环（又叫消息循环）是浏览器渲染主线程的工作方式：在 Chrome 源码中，它通过一个永不结束的 for 循环实现 —— 每次循环从消息队列中取出第一个任务执行；其他线程只需在合适时机将任务加入队列末尾即可。
过去将消息队列简单分为 “宏队列、微队列” 的说法已不适用复杂浏览器环境，现在采用更灵活的方式：根据 W3C 规范，每个任务有不同类型，同类型任务需在同一个队列，不同任务可分属不同队列；不同队列有不同优先级，一次事件循环中浏览器自行决定执行哪个队列的任务，但必须有一个微队列，微队列任务具有最高优先级，需优先调度执行。  
JS 中的定时器能做到精确计时吗？为什么？  
答案：不行，原因包括：
硬件限制：计算机硬件没有原子钟，本身无法实现精确计时；  
系统函数偏差：JS 定时器最终调用的是操作系统的计时函数，而系统函数本身存在少量偏差；  
浏览器规范限制：按 W3C 标准，若定时器嵌套层级超过 5 层，会强制设置 4 毫秒的最少时间，当计时时间少于 4 毫秒时会产生差；    
事件循环影响：定时器的回调函数只能在渲染主线程空闲时执行，主线程的阻塞会导致回调延迟执行，进一步带来偏差。  


## 宏任务 & 微任务

- **浏览器的任务队列:**
   -主任务队列:存储的都是同步任务
  - 等待任务队列:存储的都是异步任务

- **微任务:**
  - Promise的then回调函数
  - async函数中await下面的代码
  - process.nextTick（nodeJS）
  - MutationObserver

- **宏任务:**
  - 定时器(setInterval/setTimeout)
  - requestAnimationFrame
  - setImmediate(nodeJS)

**微任务的优先级⽐宏任务的优先级要高**


### async/await 和 promise 的执行顺序

## async 

**带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象**,async 函数也没啥了不起的，你就想它无非就是把return值包装了一下，其他就跟普通函数一样,重点是里面的await。

```javascript
async function fn1(){
    return 123
}
function fn2(){
    return 123
}
console.log(fn1())
console.log(fn2())
/*
Promise {<resolved>: 123}
123
*/
```


## await

await等待的是右侧「表达式」的结果

对于await来说，分2个情况

- 不是promise对象
- 是promise对象

**如果不是 promise（会被转成一个立即resolve的 Promise 对象） , await会阻塞后面（并非await后面那个函数）的代码，先执行async函数`外面`的同步代码，同步代码执行完，再回到async内部，据需执行下面的方法**

**如果它等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async函数`外面`的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果，然后在继续向下执行剩余的代码**

```javascript
const ff = async () => {
    console.log('async1 start'); //【1】
    await async2();
    console.log('async1 end')//【2】
    function async2() {
        new Promise((resolve) => {
            console.log(11);//【3】
            resolve(22)
        }).then(
            (data) => {
                console.log(data);//【4】
            }
        )
    }
    console.log('外面')//【5】
};

/*
解析：async函数下的方法，就想成跟普通的函数一样的就行，函数先执行【1】然后执行到await执行的async2，Promise内部相当于同步函数，然后执行【3】，
然后执行async外面的方法，发现没有，然后又回到ff函数内部，执行resolve里面的函数【4】,最后就该轮到【2】和【4】
*/

/*
* async1 start
* 11
* 22
* async1 end
* 外面
*/
```

```javascript
 const ff = () => {
    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end')
    }
    function async2() {
        new Promise((a, b) => {
            console.log(11);
            a(22)
        }).then(
            (data) => {
                console.log(data);
            }
        )
    }
    async1();
    console.log('外面')
};
/*
解析：跟上面的一样，就是在ff重新声明一个async1函数，这种比上面那种更加实用，不会堵塞async1外面的同步代码
*/

/*
* async1 start
* 11
* 外面
* 22
* async1 end
*/
```

**面试题**
```javascript
const ff = async () => {
    async function async1() {
        console.log('async1 start')
        await async2()
        console.log('async1 end')
    }
    async function async2() {
        new Promise((a, b) => {
            console.log('async2');
            a('async222')
        }).then(
            (data) => {
                console.log(data);
            }
        )
    }
    console.log('script start')
    setTimeout(function () {
        console.log('setTimeout')
    }, 0)
    async1();
    new Promise(function (resolve) {
        console.log('promise1')
        resolve();
    }).then(function () {
        console.log('promise2')
    })
    console.log('script end')
};
```

[参考文档](https://segmentfault.com/a/1190000017224799)

[https://www.cnblogs.com/jiasm/p/9482443.html](https://www.cnblogs.com/jiasm/p/9482443.html)

