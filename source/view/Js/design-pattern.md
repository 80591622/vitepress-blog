
# JS设计模式探索


## 单例模式

```javascript
var singleton = {
 name: 'wk',
 age: 24,
 walk: function(){
     console.log(this.age); //24
 },
 eat: function(){
     //todo
 }
}
```
- 不足之处:<br/>
   - (1)没有什么封装性，所有的属性方法都是暴露的。<br/>
   - (2)全局变量很容易造成命名空间污染。<br/>
   - (3)对象一开始变创建，万一我们用不上就浪费了。<br/>

```javascript
var person = function(){
     // 这里声明私有变量和方法；
     const privateVariable = '私有的外面获取不到';
     
     function showPrivate(){
         console.log(privateVariable);
     }
     
     //公有的变量和方法(可以访问私有变量和方法);
     return {
         publicMethod: function(){
             showPrivate();
         },
         publicVar: '共有的外面能直接获取'
     }
}
const  single = person();

single.publicMethod(); // '私有的外面获取不到'
console.log(single.publicVar); // '共有的外面能直接获取'

```


## 发布订阅模式+观察者模式

如下图所示：

<img style="width:50%" src="https://ae01.alicdn.com/kf/Hd0dd34b5adf14ea1a3b9648fa8fa1507b.jpg">

### 观察者模式
观察者和被观察者一般是`直接联系`的，相互知道对方的存在。

观察者一般是同步的，被观察者一旦有变化，观察者会立即发生反应

`Subject` - 被观察者，发布者;

`Observer` - 观察者，订阅者；

```javascript
// 被观察者
class Subject {
  constructor() {
    this. observers = []; // 观察者列表
  }
  // 添加订阅者
  add(observer) {
    this.observers.push(observer);
  }
  // 删除...
  remove(observer) {
    let idx = this.observers.findIndex(item => item === observer);
    idx > -1 && this.observers.splice(idx, 1);
  }
  // 通知  全部执行
  notify(boss) {
    for(let o of this.observers) {
      o.update(boss);
    }
  }
}
 
// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
 
  // 目标对象更新时触发的回调，即收到更新通知后的回调
  update(boss) {
    console.log(`${boss}通知我职位了，我是：${this.name}`);
  }
}
 
// 实例化目标者
let subject = new Subject();
 
// 实例化两个观察者
let obs1 = new Observer('高级前端开发工程师');
let obs2 = new Observer('初级后端开发工程师');
 
// 向目标者添加观察者
subject.add(obs1);
subject.add(obs2);

//通知
subject.notify('HR');
subject.notify('CTO');

```

### 发布订阅模式

发布者和订阅者是解耦的，他们是通过一个`介质`（往往是消息队列）执行代码

发布订阅模式由于是消息队列代理的存在，往往是异步的

**代码实现**

```javascript
// 控制中心
let pubSub = {
  list: {},
 
  // 订阅
  subscribe: function(key, fn) {
    if (!this.list[key]) this.list[key] = [];
    //可能是多个
    this.list[key].push(fn);
  },
 
  //取消订阅
  unsubscribe: function(key, fn) {
    let fnList = this.list[key];
 
    if (!fnList) return false;
 
    if (!fn) { // 不传入指定的方法，清空所用 key 下的订阅
      fnList && (fnList.length = 0);
    } else {
     const curFn =  fnList.filter((item, index) => {
            return  item !== fn 
      });
     this.list[key]=curFn
    }
  },
 
  // 发布
  publish: function(key, ...args) {
    for (let fn of this.list[key]) fn.call(this, ...args);
  }
}
 
let sub1 = function (time) {
  console.log(`上班了：${time}`);
}
let sub2 = function (time) {
    console.log(`下班了：${time}`);
}
// 订阅
pubSub.subscribe('onwork',sub1 )
pubSub.subscribe('onwork', sub2 )
 
// 发布
pubSub.publish('onwork', '18:00:00');

// 取消订阅
pubSub.unsubscribe('onwork');
```



**DOM 的事件监听是"发布订阅模式"**
```javascript
const  wk = document.getElementById('#wk');
 
// 监听回调函数（指定事件）
function notifyClick() {
    console.log('我被点击了');
}
 
// 添加事件监听
wk.addEventListener('click', notifyClick);


// 用户触发点击, 事件中心派发指定事件
 
// 取消事件监听
loginBtn.removeEventListener('click', notifyClick);
```

### 两种模式的关联和区别

发布订阅模式更灵活，是进阶版的观察者模式，`指定`对应分发。

观察者模式维护`单一`事件对应多个依赖该事件的对象关系；<br/>
发布订阅维护`多个`事件（主题）及依赖各事件（主题）的对象之间的关系；

观察者模式是目标对象直接触发通知（全部通知），观察对象被迫接收通知。<br/>
发布订阅模式多了个中间层（事件中心），由其去管理通知广播（只通知订阅对应事件的对象）；

观察者模式对象间依赖关系较强，发布订阅模式中对象之间实现真正的解耦。

### 参考文档

[观察者模式 vs 发布订阅模式](https://juejin.im/post/5c0a9d9bf265da612909ff1b)

[观察者模式与发布订阅模式](https://juejin.im/post/5d25a2316fb9a07f04207010)

[观察者模式](https://juejin.im/post/591a4f2a128fe1005cda28df)

## 原型模式


## 未完待续.......
