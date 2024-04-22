---
abbrlink: 929f57e7
title: Promise & async
date: 2018-01-16
categories: 
- JS
- Promise & async
---

<strong class='old-blog'>Promise & async</strong>

[[toc]]

### Promise

- 主要用于异步计算
- 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 可以在对象之间传递和操作promise，帮助我们处理队列

**实现一个 Promise**
```javascript
let  resolvePromise = (promise2,x,resolve,reject) => {
    // 判断x的类型 来处理promise2是成功还是失败
    // 所有的promise都遵循这个规范，不同的人写的promise可能会混用
    // 尽可能考虑的周全 要考虑别人promise可能出错的情况
    if(promise2 === x){
        return reject(new TypeError('循环引用'))
    }
    // 判断x是不是一个promise  ,这个x 可能不是自己的promise 所以为了安全 需要在进行校验，放置调一起用成功和失败
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        // 尝试取当前x的then方法, 这个then方法可能别人定义的时候 用的Object.defineProperty
        let called;
        try{
            let then = x.then; // 如果取then方法出错 那就用错误拒绝promise2
            if(typeof then === 'function'){ // 我就认为他是一个promise
                then.call(x,y=>{ // 让当前的promise执行 ，不用多次取then方法了
                    // y 有可能还是一个promise , 继续调用resolvePromise方法，直到解析出一个常量为止，最终把常量传递下去
                    if(called) return; // 放置此方法多次被调用
                    called = true;
                    resolvePromise(promise2,y,resolve,reject);
                },r=>{
                    if(called) return;
                    called = true;
                    reject(r); // 让当前的promise变成失败态即可
                })
            }else{
                // x就是一个普通的对象 并没有then方法
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{
        // x肯定一个常量
        resolve(x);
    }
}

class Promise{
    constructor(executor){
        this.status = 'pending';
        this.value;
        this.reason;
        this.resolveCallbacks = []; // 当then是pending 我希望吧成功的方法都放到数组中
        this.rejectCallbacks = [];
        let resolve = (value)=>{
            // 如果是promise就调用这个promise的then方法
            if(value instanceof Promise){
                // 不停的解析 等待着解析出一个常量 传递给下面
                return value.then(resolve,reject);
            }
            if(this.status == 'pending'){
                this.status = 'fulfilled';
                this.value = value;
                this.resolveCallbacks.forEach(fn=>fn()); // 发布
            }
        }
        let reject = (reason)=>{
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.reason = reason;
                this.rejectCallbacks.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
    then(onfulfilled,onrejected){ // onfulfilled,onrejected 是两个可选参数
        onfulfilled = typeof onfulfilled === 'function'?onfulfilled:val=>val;
        onrejected = typeof onrejected === 'function'?onrejected:r=>{throw r}
        let promise2;
        promise2 = new Promise((resolve,reject)=>{
            if(this.status === 'fulfilled'){
                setTimeout(()=>{
                    try{
                        let x = onfulfilled(this.value);
                        // x是普通值还是promise 如果是普通值 直接调用promise2的resolve
                        // 如果是promise  那应该让x这个promise执行 x.then
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0);
            }
            if(this.status === 'rejected'){
                setTimeout(()=>{
                    try{
                        let x = onrejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            }
            if(this.status === 'pending'){
                this.resolveCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onfulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                });
                this.rejectCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onrejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                })
            }
        });
        return promise2;
    }
    catch(rejectFunc){// catch的实现
        return this.then(null,rejectFunc);
    }
}
// 暴露一个方法这个方法需要返回一个对象 对象上需要有 promise resolve reject 三个属性
// 减少嵌套
Promise.defer = Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
// 产生成功的promise
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        resolve(value);
    })
}
// 产生一个失败的promise
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    })
}
Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let results = []; // 结果数组
        let i = 0;
        let processData = (value,index)=>{
            results[index] = value;
            // 当成功的个数 和 当前的参数个数相等就把结果抛出去
            if(++i === values.length){
                resolve(results);
            }
        }
        for(let i = 0 ; i< values.length;i++){
            let current = values[i]; // 拿到数组中每一项
            // 判断是不是一个promise
            if((typeof current === 'object' &&  current !==null)|| typeof current == 'function'){
                // 如果是promise
                if(typeof current.then == 'function'){
                    // 就调用这个promise的then方法，把结果和索引对应上,如果任何一个失败了返回的proimise就是一个失败的promise
                    current.then(y=>{
                        processData(y,i);
                    },reject);
                }else{
                    processData(current,i);
                }
            }else{
                processData(current,i);
            }
        }
    });
}
// race的原理
Promise.race = function(values){
    return new Promise((resolve,reject)=>{
        for(let i = 0 ; i< values.length;i++){
            let current = values[i];
            if((typeof current === 'object' &&  current !==null)|| typeof current == 'function'){
                let then = current.then;
                if(typeof then == 'function'){ // 比较哪个promise比较快，谁快用快
                    then.call(current,resolve,reject)
                }else{
                    resolve(current);
                }
            }else{
                resolve(current);
            }
        }
    });
}
```

### Generator

- generator也是为了解决地狱回调问题的，和promise一样都是为了实现异步编程，本质还是各种回调；
- generator为es6中新定义的数据类型，这种数据类型和函数很像，每个函数只能返回一个结果，即只能return一次，
如果在某些函数中没有看到return，其实质在函数结尾是存在一个隐藏的return undefined 的，而generator不同，可以返回多次


```javascript
function* gen(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return "结束";
}

let g = gen();
let i = 0;
let timer = setInterval(() => {//每间隔500ms执行一次g.next()，执行7次，并在控制台打印
      i++;
      console.log(g.next()); //执行gen函数
      if(i>7){
          clearInterval(timer);
      }
}, 500);

try{
  g.throw(new Error('test1'))
}catch(e){
  console.log(e)
}
```

上述例子 可以看出generator 遇到yleld就会暂停，只有当调用`generator.next()`才会向下执行，
调用这个方法会返回`{value: x, done: true/false}`,这个对象中value是yield的返回值，
done表示generator是否执行结束，只有当执行到return时，这个对象中的done才会变成true，说明执行结束


### async/await

原理就是利用 generator（生成器）分割代码片段。然后我们使用一个函数让其自迭代，每一个yield 用 promise 包裹起来。执行下一步的时机由 promise 来控制

而且相较于Promise,async的优越性就是把每次异步返回的结果从then中拿到最外层的方法中，不需要链式调用，只要用同步的写法就可以了。
更加直观而且，更适合处理并发调用的问题。但是async必须以一个Promise对象开始 ，所以async通常是和Promise结合使用的

```javascript
function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    // 将返回值promise化
    return new Promise(function(resolve, reject) {
      // 获取迭代器实例
      var gen = fn.apply(self, args);
      // 执行下一步
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      // 抛出异常
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      // 第一次触发
      _next(undefined);
    });
  };
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    // 迭代器完成
    resolve(value);
  } else {
    // -- 这行代码就是精髓 --
    // 将所有值promise化
    // 比如 yield 1
    // const a = Promise.resolve(1) a 是一个 promise
    // const b = Promise.resolve(a) b 是一个 promise
    // 可以做到统一 promise 输出
    // 当 promise 执行完之后再执行下一步
    // 递归调用 next 函数，直到 done == true
    Promise.resolve(value).then(_next, _throw);
  }
}
```

**await**
每次遇到await都会中断此次进程，然后去执行外面的同步代码，然后再进来，根据上次保存的next值，继续执行
```javascript
async function foo() {
  await console.log(121212)
  console.log(121212)
}
```
```javascript
function _foo() {
    _foo = _asyncToGenerator(
        regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return console.log(121212);
                        case 2:
                             console.log(121212);
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        }));
    return _foo.apply(this, arguments);
}
```

测试
```javascript
const asyncFunc = _asyncToGenerator(function*() {
  const e = yield new Promise(resolve => {
    setTimeout(() => {
      resolve('e');
    }, 1000);
  });
  const a = yield Promise.resolve('a');
  const d = yield 'd';
  const b = yield Promise.resolve('b');
  const c = yield Promise.resolve('c');
  return [a, b, c, d, e];
});

asyncFunc().then(res => {
  console.log(res); // ['a', 'b', 'c', 'd', 'e']
});
```

总的来说，async和generator函数主要就是为了解决异步的并发调用使用的 ，直接将参数从then里取出来，相比promise的链式调用，传参更加方便，异步顺序更加清晰

#### 捕获错误

**try catch**
```javascript
(async () => {
 try {
  const data = await fn()
 } catch(err) {
  console.log('err is ->', err)
 }
})()
```
单个还好，多个await就显得麻烦了

**利用promise**
```javascript
(async () => {
 const [err, data] = await fn().then(data => [null, data] ).catch(err => [err, null])
})()

// 抽离成公共方法
const awaitWrap = (promise) => {
  return promise
   .then(data => [null, data])
   .catch(err => [err, null])
}
const [err, data] = await awaitWrap(fn())
```

#### async函数Generator函数的区别
1.内置执行器。<br/>
Generator 函数的执行必须靠执行器，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。如果你是从上面顺着看下来的，这里的执行器就是Generator和Iterator的yield和next机制，不用怀疑！

2.更好的语义。<br/>
async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

3.正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。

4.返回值是 Promise。<br/>
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
