

# 理论解答

[[toc]]

## 基本数据类型

```javascript
string  
number
boolean
null
undefined
[bigint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) // typeof BigInt(Number.MAX_SAFE_INTEGER)
symbol // typeof Symbol('fn')
```

## new做了什么

```javascript
//1.创建了一个全新的对象。
//2.这个对象会被执行[[Prototype]]（也就是__proto__）链接。
//3.生成的新对象会绑定到函数调用的this。
//4.如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。

//new运算符的执行过程，实现一个new
function realizeNew(con, ...args) {
    let obj = {};
    obj.__proto__ = con.prototype;
    let ret = con.apply(obj, args);
    
    return typeof ret === 'object' && ret !== null ? ret : obj;
}

//举列
function Person(name,age){
    this.name=name;  /*属性*/
    this.age=age;
    this.run=function(){  /*实例方法*/
        alert(this.name+'在运动');
    }
}    
realizeNew(Person,'王可',24)
```

## 移动端点击问题

### 移动端Click300毫秒点击延迟

- 为了对早期普通网页更好的体验，iphone设计了`双击放大显示的功能`--这就是300ms延迟的来源：如果用户一次点击后300ms内没有其他操作，则认为是个单击行为；否则为双击放大行为。

**解决方法**

- 1.meta标签禁止放大

```javascript
//不适用于所有的
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
```

- 2.fastclick.js

fastclick.js的原理是：FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即触发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉

### 点透问题

当A/B两个层上下z轴重叠，上层的A点击后消失或移开（这一点很重要），并且B元素本身有默认click事件（如a标签）或绑定了click事件。在这种情况下，点击A/B重叠的部分，就会出现点透的现象。

**点透问题的出现原因**

点透问题出现的原因就是因为我们上边说过的移动端click事件300ms延迟问题，
当点击上层元素时，先触发touchstart事件，然后在300ms后会触发click事件，而此时上层元素已经消失，所以下边的元素会触发click事件，这就是点透

**点透问题的解决方案**

1.使用click,解决300ms延迟问题 (解决了300毫秒延迟问题即解决了点透问题)<br/>
2.给上面元素加preventDefault()<br/>
```javascript
button.ontouchstart = function(ev){
    let oEvent = ev || event;
    this.style.display = 'none';
    oEvent.preventDefault();
    console.log(1)
}
div.onclick = function(){
    console.log(2)
}
```
3.使用一个(透明)遮罩层，屏蔽所有事件，然后400ms(对于IOS来说是个理想值)后自动隐藏<br/>
4.下层避开click事件，如a链接改为span等标签，使用js跳转页面（通过一个变量，只有在touchend触发时，才实现跳转）<br/>

## 浏览器并发请求个数


因为浏览器对同一域名下的最大连接数做了限制，为了让浏览器并发加载，利用domain hash也就是将资源分散到不同域名下。
因此，新的浏览器加大了并发数的限制，控制在8以内，缺点是需要DNS解析更多的域名。

[https://www.zhihu.com/question/20474326](https://www.zhihu.com/question/20474326)


## JSONP 原理

利用了script的src属性不受同源策略的约束（link的href、img的src都不受约束），所以用script的src请求第三方的接口，但是后台需要做一些特殊处理。
```javascript
<script>
    function fn(data){
        console.log(data);
    };
</script>
<script src="https://www.baidu.com/s?wd=666&callback=fn"></script>
```

## react-redux是如何把store绑定到组件上的，底层实现

[redux源码解析](/workspace/Frame/react/react-redux.html)

## http缓存

[HTTP缓存控制](/workspace/Server/nginx/nginx_base.html)


## http状态码有那些？分别代表是什么意思？

```javascript
100  Continue	继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
200  OK 		正常返回信息
201  Created  	请求成功并且服务器创建了新的资源
202  Accepted 	服务器已接受请求，但尚未处理
301  Moved Permanently  请求的网页已永久移动到新位置。
302  Found  		临时性重定向。
303  See Other  	临时性重定向，且总是使用 GET 请求新的 URI。
304  Not Modified 自从上次请求后，请求的网页未修改过。

400  Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
401  Unauthorized 请求未授权。
403  Forbidden  	禁止访问。
404  Not Found  	找不到如何与 URI 相匹配的资源。

500  Internal Server Error  最常见的服务器端错误。
503  Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
```

## react和vue的区别

```javascript
 相同点：
1.数据驱动页面，提供响应式的试图组件
2.都有virtual DOM,组件化的开发，通过props参数进行父子之间组件传递数据，都实现了webComponents规范
3.数据流动单向，都支持服务器的渲染SSR
4.都有支持native的方法，react有React native， vue有wexx
不同点：
1.数据绑定：Vue实现了双向的数据绑定，react数据流动是单向的
2.数据渲染：大规模的数据渲染，react更快(react推崇不可变，vue推崇可变)
3.使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小快的项目
4.开发风格：react推荐做法jsx + inline style把html和css都写在js了
           vue是采用webpack + vue-loader单文件组件格式，html, js, css同一个文件
5.vue都是基于各种指令，react则比较接近原生es6的写法
```


## 如何实现浏览器内多个标签页之间的通信? (阿里)
   
```javascript
WebSocket、SharedWorker；
也可以调用localstorge、cookies等本地存储方式；

localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，
我们通过监听事件，控制它的值来进行页面信息通信；
注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常；
```


## setInterval方法的返回值什么?

```javascript
setInterval(() => console.log("Hi"), 1000); //一个唯一的id
```

## 你能说出浏览器上到此支持多少个中文字吗

```javascript
let name='';
for(let i = 0x4e00;i<0x9fa5;i++){
	name+=String.fromCharCode(i);
}
console.log(name.length);
```