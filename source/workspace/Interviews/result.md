
# 习题解答


## 基于promise的改造Ajax

```javascript
function ajax(url, callback,error) {
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            callback(data);
        },
        error: function (err) {
            error(err)
            console.log('error');
        }
    })
}

function request(url) {
    return new Promise((resolve, reject)=> {
        ajax(url, resolve, reject);
    })
}
//使用方式
request('a.txt').then( (res)=> {
    if (res === 0) {
        console.log(res);
        return request('b.txt')
    }
}).then(function (res2) {
    if (res2 === 1) {
        console.log(res2);
        return request('c.txt');
    }
}).then(function (res3) {
    console.log(res3);
})

```

## JS实现bind方法
```javascript
Function.prototype.bindFn = function bind(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + 'must be a function');
    }
    // 存储函数本身
    const self = this;
    // 去除thisArg的其他参数 转成数组
    let args = [].slice.call(arguments, 1); //获取所有的形参，但是要剔除第一个，因为thisArg就是第一个
    let bound = function(){
        // bind返回的函数 的参数转成数组
        let boundArgs = [].slice.call(arguments);
        // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
        return self.apply(thisArg, args.concat(boundArgs));
    }
    return bound;
}
// 测试
let obj = {
    name: 'wk',
};
function original(a, b){
    console.log(this.name);
    console.log([a, b]);
}
let bound = original.bindFn(obj, 1);
bound(2); // 'wk', [1, 2]

```

## JS实现call/apply方法

```javascript
Function.prototype.myCall = function(thisArg) {
    // this指向调用call的对象
    if (typeof this !== 'function') {
      throw new TypeError('Error');
    }
    // 声明一个 Symbol 属性，防止 fn 被占用
    const fn = Symbol('fn');  
    const args = [].slice.call(arguments,1);   // 若是封装apply函数，const args = [].slice.call(arguments,1,2);
    thisArg = thisArg || window;
    // 将调用call函数的对象添加到thisArg的属性中
    thisArg[fn] = this;
    // 执行该属性
    const result = thisArg[fn](args);
    // 删除该属性
    delete thisArg[fn];
    // 返回函数执行结果
    return result;
}
```

## JS的闭包 & 作用域

**闭包的概念**
- 一个函数执行完后所在的作用域没有被销毁，就形成了闭包
- 闭包就是能够读取其他函数内部变量的函数。

**最大用处有两个**
- 可以读取自身函数外部的变量（沿着作用域链寻找） 
- 让这些变量的值始终保持在内存中

```javascript
//变量保存到内存中
function f1(){
　　　var n = 999;
　　　nAdd = function(){n+=1} //nAdd是一个全局变量
　　　function f2 (){
　　　alert(n);
　}
 return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000

//n一直保存在内存中，为什么没有在f1调用后被自动清除？
//原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制回收。
```
### 使用闭包注意的点

1）由于闭包会使得函数中的变量都被保存在内存中，`内存消耗很大`，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致`内存泄露`。解决方法是，`在退出函数之前，将不使用的局部变量全部删除`。

2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法，把内部变量当作它的私有属性，这时一定要小心，不要随便

**看题**
```javascript
let obj1={
   name:"aaa",
   print:function(){
     return ()=>console.log(this.name)
   }
}
let obj2={name:"bbb"}

obj1.print()()   //aaa
obj1.print().call(obj2)  //aaa  bind不能改变箭头函数的this指向
obj1.print.call(obj2)()  //bbb
``` 

<h3>作用域</h3>


```javascript
function test(){
  var arr = [];
  for(var i = 0;i < 10;i++){
    //js函数内的变量值不是在编译的时候就确定的，而是等在运行时期再去寻找的
    arr[i] = function(){
      return i   //函数内部并没有声明这i,所以就会沿着作用域链去找i变量，结果在上一级找到变量i
    };
  }
  for(var a = 0;a < 10;a++){
    console.log(arr[a]());
  }
}
test(); // 连续打印 10 个 10

//声明块作用域
function test(){
  var arr = [];
  for(let i = 0;i < 10;i++){  // 仅在这里作出了改动
    arr[i] = function(){
      return i;
    };
  }
  for(var a = 0;a < 10;a++){
    console.log(arr[a]());
  }
}
test(); // 打印 0 到 9

function test(){
  var arr = [];
  for(var i = 0;i < 10;i++){
     //闭包
    ((i)=>arr[i] = function(){
      return i;
    })(i);
  }
  for(let a = 0;a < 10;a++){
    console.log(arr[a]());
  }
}
test(); // 打印 0 到 9
```
![result1.webp](/img/result1.webp)

## 实现一个instanceof

**先看用法**

```javascript
[1, 2, 3] instanceof Array; //true
//可以看到[1, 2, 3]是类型Array的实例
[1, 2, 3] instanceof Object; //true
```

**实现一个instanceof**
```javascript
function myInstanceof(val, type) { 
    let rightProto = type.prototype; // 取右边 prototype的值
    let leftPrevProto = val.__proto__; // 取左边__proto__值
    while (true) {
        if (leftPrevProto === null) { //如果左边的__proto__值为null，返回false
            return false;   
        }
        if (leftPrevProto === rightProto) { 
            return true;    
        } 
        leftPrevProto = leftPrevProto.__proto__ ; //以上都不满足，取上一层原型继续循环，直到没取到为null
    }
}
```

## 手写实现去除字符串连续重复值（例：'aaabcdeefghhb'=>'abcdefghb'）

```javascript
//方法一
function removeRepeatStr(str){
    let newStr = '';
    for (let item of str) {
        console.log(item);
        newStr.indexOf(item) === -1 && (newStr = newStr + item);
        // !newStr.includes(item) && (newStr = newStr + item)
    }
    return newStr
};
//方法二 利用对象
function removeRepeatStr(str){
    let obj = {};
    let newStr = '';
    for (let item of str) {
        if (!obj[item]) {
            obj[item] = item;
            newStr += item
        }
    }
    return newStr
};
```


## num++ 和 ++num

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

后缀一元运算符++：先返回在增加

前缀一元运算符++：先增加在返回


## 函数执行 例：fn`${num}模板字符串`

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = "Lydia";
const age = 21;

getPersonInfo`${person} is ${age} years old`;
//第一个参数的值始终是字符串值的数组
//余参数获取传递到模板字符串中的表达式的值！
```

## continue & break & return

**break**用于完全结束一个循环，跳出循环体执行循环后面的语句，完全终止循环。

**continue**只是终止本次循环，接着还执行后面的循环

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
//1,2,4
for (let i = 1; i < 5; i++) {
  if (i === 3) break;
  console.log(i);
}
//1,2
for (let i = 1; i < 5; i++) {
  if (i === 3) return true;
  console.log(i);
}
//1,2  true
```

## 下面这些值哪些是假值?

```javascript
0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;

//JavaScript中只有6个假值：
undefined
null
NaN
0
'' (empty string)
false
```

## typeof typeof 1
```javascript
typeof 1  //返回 "number".
typeof "number" //返回 "string"
```


## [..."wk"]返回什么

["w", "k"]


## 小程序里面canvas map等组件优先级最高，怎么将其覆盖

可以在state里定义了一个radarImg，然后在render中判断，radarImg这个值是否有效，若有效，canvas隐藏；否则，显示canvas。然后在页面渲染雷达图时，执行了Taro.canvasToTempfilepath方法，将雷达图转化为图片。此时给radarImg赋值，canvas隐藏，image显示
```javascript
Taro.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: 260,
    height: 180,
    canvasId: 'radarCanvas',//画布标识，传入 <Canvas> 组件的 canvasId
    success: function({tempFilePath}) {
      that.setState({ radarImg:tempFilePath});
    }
});
```

[canvasToTempfilepath](https://nervjs.github.io/taro/docs/apis/interface/canvas/canvasToTempFilePath.html#docsNav)



## Promise 中断或者取消 

**Promise.race()**
```javascript
 let promise1 = new Promise(function(resolve, reject) {
　　　//模拟ajax异步请求
    setTimeout(resolve, 3000, '接口返回成功！');
});
let promise2 = new Promise(function(resolve, reject) {
    document.querySelector('#cancel').addEventListener('click', function() {
        reject('取消等待接口！');
    });
});

Promise.race([promise1, promise2]).then(function(value) {
    console.log(value);
}).catch(function(value) {
    console.log(value);
});
```
**直接抛出一个错误**

```javascript
throw new error()
// or
return Promise.reject()
```

**保持pedding状态**

```javascript{5}
let promise = new Promise(function(resolve, reject){
    resolve('第一次成功')
})
promise.then(function(val) {
    return new Promise(()=>{})
}).then(function(val) {
    console.log('被跳过的方法')
}).catch(function(val) {
    console.log('返回失败')
})
```
## JavaScript中Null和Undefined的区别

**`Null`**

null是js中的关键字，表示空值，null可以看作是object的一个特殊的值，如果一个object值为空，表示这个对象不是有效对象。

**`Undefined`**

undefined不是js中的关键字，其是一个全局变量，是Global的一个属性，以下情况会返回undefined:
<br/>
1）使用了一个未定义的变量；var i;
<br/>
2）使用了已定义但未声明的变量；
<br/>
3）使用了一个对象属性，但该属性不存在或者未赋值；
<br/>
4)   调用函数时，该提供的参数没有提供：
```javascript
function func(a){
   console.log(a);      
}
func();//undefined
```
 5)函数没有返回值时，默认返回undefined
 
```javascript
let aa=func();
aa;//undefined
```
` 相同点：`

都是原始类型的值，保存在栈中变量本地

`两者的区别：`

1.类型不一样：

```javascript
console.log(typeOf undefined);//undefined
console.log(typeOf null);//object
```
 

2.转化为值时不一样：undefined为NaN ,null为0
```javascript
console.log(Number(undefined));//NaN
console.log(Number(10+undefined));//NaN
 
console.log(Number(null));//0
console.log(Number(10+null));//10
```
 3.
 
```javascript
undefined===null;//false
undefined==null;//true
```


`何时使用：`
null当使用完一个比较大的对象时，需要对其进行释放内存时，设置为null;
<br/>
var arr=["aa","bb","cc"];
<br/>
arr=null;//释放指向数组的引用

## 堆内存

```javascript
const getInfo=(member,year)=>{
	member.name ="大江";
	year=21
}
let person ={name:"王可"}
let age=23


getInfo(person,age)
console.log(person,age)   //{name: "大江"} 23
```

## 作用域

```javascript
(()=>{
 let x = (y =1008611)
})()
console.log(typeof x , typeof y)
```

## 原型链

```javascript
class person {
 name='王可'
 static age=22
}

person.sex=1
person.prototype.city='邯郸'

let l = new person()

console.log(l) //如下图

person.age //22
person.sex //1
l.__proto__.constructor.age //22
l.constructor.age //22

person.name  //person
l.name //王可
delete l.name
l.name //undefined
```
<img style="border: .3em solid #e0dfcc;border-radius: 1em;width：98%"  src="https://ae01.alicdn.com/kf/H9c240b019636472a8f8f9d6165ca878fi.png">


## import导入不可被修改

```javascript
// counter.js
let counter =10;

export default counter

// index.js
import counter from "./counter"
counter+=1

console.log(counter)   //不可被修改，只读的
```

**`引用数据类型是可修改的，慎重慎重`**

## JSON.stringify参数

```javascript
let obj={a:1,b:2}
JSON.stringify(obj,['a']) //"{"a":1}"
```

## String.raw

```javascript
const path =`C:\Documents\Projects\table.html`
// \为转义符，会对结果有影响
path                //"C:DocumentsProjects	able.html"
String.raw`${path}`  //"C:DocumentsProjects	able.html"
String.raw`C:\Documents\Projects\table.html` //"C:\Documents\Projects\table.html"

//可以用正则全局匹配下  '\' replace  '\\'
const draftPath =`C:\\Documents\\Projects\\table.html`
draftPath    //"C:\Documents\Projects\table.html"
```
