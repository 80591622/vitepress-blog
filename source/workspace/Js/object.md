

# Object的方法简单整理
## Object.create()

描述：该方法创建一个新对象，将对象继承到__proto__属性上<br/>
格式：Object.create(proto[, propertiesObject])<br/>
用法：如果用传统的方法要给一个对象的原型上添加属性和方法，是通过 __propt__ 实现的<br/>


通过构造函数
```javascript
//创建一个构造函数或者类
let People = function(){}
People.prototype.y = 20
People.prototype.z = 40
People.prototype.showNum = function() {}
//通过构造函数创建实例
let p = new People();
console.log(p.__proto__ === People.prototype) // true
```
使用`Object.create()`
```javascript
let proto = {
    y: 20,
    z: 40,
    showNum(){}
};
let o = Object.create(proto);
```


## Object.defineProperty() 

Object.defineProperty(obj, prop, descriptor)

obj: 需要被操作的目标对象<br/>
prop: 目标对象需要定义或修改的属性的名称<br/>
descriptor: 将被定义或修改的属性的描述符<br/>
 
```javascript
let obj = new Object();

Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})

console.log(obj.name)  //张三
```

## 对象的数据属性

```javascript
let person = {}
Object.defineProperty(person,'name',{
    configurable:false, // 能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
    enumerable:false, // 不可枚举 对象属性是否可通过for-in循环，flase为不可循环，默认值为true
    writable:false, // 对象属性是否可修改,flase为不可修改，默认值为true
    value:'xiaoming' // 对象属性的默认值，默认值为undefined
});

// value
console.log(person); // xiaoming，默认value

// writable
person.name="666";
console.log(person); // xiaoming，不可修改value

// enumerable
for(let i in person){
    console.log(person[i]) // 无结果，不可循环
}
Object.keys(person) // []  与for in区别在于不能遍历出原型链上的属性
Object.getOwnPropertyNames(person) // ['name']

// configurable
delete person.name
console.log(person.name)// xiaoming，不可删除

Object.defineProperty(person,'name',{
    configurable:true // 不可修改，将抛出错误
});

// Object.getOwnPropertyDescriptors(person) // 返回自身所有的属性
Object.getOwnPropertyDescriptor(person,'name') // 返回自身属性
{
  configurable: false
  enumerable: false
  value: "xiaoming"
  writable: false
}
```

## Object.defineProperties()

Object.defineProperties(obj, props)

obj: 将要被添加属性或修改属性的对象<br/>
props: 该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置

```javascript
let obj = new Object();
Object.defineProperties(obj, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})

console.log(obj) // 张三, 18
```


## Object.getPrototypeOf()

描述：用于读取一个对象的原型对象；

格式：Object.getPrototypeOf(obj);

用法：

```javascript
Object.getPrototypeOf('foo') === String.prototype === 'foo'.__proto__ // true
Object.getPrototypeOf(true) === Boolean.prototype === true.__proto__ // true
```

## Object.setPrototypeOf(

描述: Object.setPrototypeOf方法的作用与_proto_相同，用来设置一个对象的prototype对象，返回参数对象本身

格式：Object.setPrototypeOf(object, prototype)

该方法等同于下面的函数：

```javascript
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

**示例**

```javascript
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
 
proto.y = 20;
proto.z = 40;
 
obj.x // 10
obj.y // 20
obj.z // 40
```

## keys & values & entries

- Object.keys   键
- Object.values  值 
- Object.entries  组件二级数组


```javascript

const obj =  {
    address: "434343422",
    admin: "3434",
    adminCharater: '4444',
    adminRecord: '33',
    article: '22',
    artist: '11'
  }
  Object.entries(obj)// [["address", "434343422"]...]
  Object.keys(obj) //["address", "admin", "adminCharater", "adminRecord", "article", "artist"]
  Object.values(obj) //["434343422", "3434", "4444", "33", "22", "11"]

```

```javascript
//遍历数组，字符串等...
for (const value of Object.values(obj)) { 
    console.log(value);
}
//遍历对象
for (const value in obj) { 
    console.log(value);
}
```

## Object.keys、Object.getOwnPropertyNames区别

```javascript
let obj = { "prop1": "v1" };
Object.defineProperty(obj, "prop2", { value: "v2", writable: false });
console.log(Object.keys(obj).length);           //output：1
console.log(Object.getOwnPropertyNames(obj).length);    //output：2
```

**内置的判断，访问和迭代方法**


功能	 | 可枚举(writable:true) | 可枚举、不可枚举
:--------   | :--------  | :--------
判断	 | propertyIsEnumerable |  in/hasOwnProperty
访问	 |  Object.keys	 |  Object.getOwnPropertyNames
迭代 |  for..in.. |  Object.getOwnPropertyNames




## Object 的 set 和 get 用法

在初始化对象的时候这样使用

```javascript
let obj={
    a: 1,
    b: 2,
    set c(x){console.log('c被赋值：',x);c=x;},
    get c(){console.log('c被取出: ',c);return c}  
};

obj.c=3  // c被赋值： 3
obj.c  // c被取出:  3
```

对象初始化之后可以这样添加属性

```javascript
let obj={
    a: 1,
    b: 2    
};

obj.__defineGetter__('c', function(){return c});
obj.__defineSetter__('c', function(x){c = x});
```

或者使用

```javascript
Object.defineProperty(obj, c, {
　　set:function(x){
　　　　console.log('c被赋值：',x);
　　　　c=x
　　},
　　get:function(){
　　　　console.log('c被取出：',c)
　　　　return c
　　}
})
obj.c=3  // c被赋值： 3
obj.c  // c被取出:  3
```

## Object.fromEntries()

ES10新增

```javascript
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }
```

## lodash/pick

```javascript
/**
 * @param {object} obj - 对象
 * @param {array} props - 要取那些属性
 * @param {function} predicate - 回调
 * @returns {object}
 */
function basePickBy(obj, props, predicate) {
    return props.reduce((acc, key) => {
      predicate(obj[key], key) && (acc[key] = obj[key]);
      return acc;
    }, {});
}
/**
 * pick
 *
 * @param {*} obj - 对象
 * @param {*} props - 要取那些属性
 */
function pick(obj, props) {
    return basePickBy(obj, props, (value, key) => key in obj);
}

let data = {message: "Foo", a: 11, b: 2, c: 3}
pick(data,['a','b'])  // {a: 11, b: 2}
```

**结果同上：**

```js
JSON.parse(JSON.stringify(data,['a','b'])) // {a: 11, b: 2}
```

## 浅拷贝/深拷贝

```javascript
//浅克隆 [层级嵌套不能超过2级,包括2级]
const clone = source => Object.assign({}, source)
const clone = source => { ...source }

```

```javascript
//深克隆
function deepclone(obj){
   if (typeof obj === 'object' && obj !== null) {
      let o = obj.push ? [] : {};
      console.log(obj.push);
      
      for(let attr in obj){
          if(obj.hasOwnProperty(attr)){
              if(typeof obj[attr] === 'object'){
                  o[attr] = deepclone(obj[attr]);
              }else{
                  o[attr] = obj[attr];
              }
          }
      }
      return o;
    } else {
      return obj;
  }
}

// or 取巧方法 JSON.parse(JSON.stringify());
// 注意这种取巧方法是有限制的
// 1. 只能解析Number、String、Array等能够被json表示的数据结构（无法拷贝一写特殊的对象，诸如 RegExp, Date, Set, Map，函数 等。）
// 2. 不能处理循环引用


const obj = { val : 2 };
obj.target = obj;

//拷贝obj会出现系统栈溢出，因为出现了无限递归的情况。

JSON.parse(JSON.stringify(obj));

//VM913:1 Uncaught TypeError: Converting circular structure to JSON
//--> starting at object with constructor 'Object'
//--- property 'target' closes the circle
//at JSON.stringify (<anonymous>)
//at <anonymous>:1:17
//(anonymous) @ VM913:1
 

//解决死循环的问题
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const deepClone = (target, map = new Map()) => { 
    
  //如果有的话直接跳过
  if(map.get(target))  return target; 
 
  if (isObject(target)) { 
    map.set(target, true); 
    const cloneTarget = Array.isArray(target) ? []: {}; 
    for (let prop in target) { 
      if (target.hasOwnProperty(prop)) { 
          cloneTarget[prop] = deepClone(target[prop],map); 
      } 
    } 
    return cloneTarget; 
  } else { 
    return target; 
  } 
}
//map 和 a一直是强引用的关系， 在程序结束之前，a 所占的内存空间一直不会被释放。
//弱引用的对象可以在任何时候被回收，而对于强引用来说，只要这个强引用还在，那么对象无法被回收。

//ES6给我们提供了这样的数据结构，它的名字叫WeakMap,它是一种特殊的Map, 其中的键是弱引用的。`其键必须是对象`，而值可以是任意的


//稍微改造一下即可:
const deepClone = (target, map = new WeakMap()) => {
  //...
}

```

## 对象转原始类型是根据什么流程运行的？

对象转原始类型，会优先调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

如果Symbol.toPrimitive()方法，优先调用再返回<br/>
调用valueOf()，如果转换为原始类型，则返回<br/>
调用toString()，如果转换为原始类型，则返回<br/>
如果都没有返回原始类型，会报错


```javascript
 const obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7
```

## 如何让if(a == 1 && a == 2)条件成立？

就是上面例子的应用

```javascript
const a = {
  value: 0,
  valueOf() {
    this.value++;
    return this.value;
  }
};
console.log(a == 1 && a == 2,a);//true
```


## 对象比较

### hashcode

javascript 对象的比较是比较坑爹的一件事，因为javascript对象比较的是引用地址，当两个引用地址相同的对象总是相等的,或者两个完全一样的对象也是不相等的。

```javascript
 let object1={
    name:"1234 ",
    code:123,
    test:"321",
};
let object2={
    name:"1234 ",
    code:123,
    test:"321",
};

console.log(object1===object2)   //false
```

解决方法使用hashcode

这里只是简单的走个流程，详细的请查看`js-hash-code`
```javascript
function hashCode(str) {
  let hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; 
  }
  return hash;
}
```
```bash{1,5}
<<是移位符 

移位运算就是对二进制进行有规律低移位。移位运算可以设计很多奇妙的效果，在图形图像编程中应用广泛。

|= 按位或．然后赋值．

i=1;//二进制为0001
i|2;//2的二进制为0010 两个按位或为0011也就是3
i|=2等价于i=i|2;
```

```javascript
console.log(object1===object2);  //false

let test1=hashCode(JSON.stringify(object1));
let test2=hashCode(JSON.stringify(object2));
console.log(test1,test2,test1===test2);  //true
```

### 递归

```javascript
/*
 判断对象相等的步骤：
1.先判断两者是不是对象
2.对象的键值对数量是否相等
3.判断两个对象的所有key值是否相等相同
4.判断两个对象的相应的key对应的值是否相同
来一个递归判断里面的对象循环1-4步骤代码如下
*/

const isEqual = (obj1, obj2) => {
   let isObj1 = obj1 instanceof Object;
   let isObj2 = obj2 instanceof Object;
   if (!isObj1 || !isObj2) return Object.is(obj1, obj2);

   let kyes1 = Object.keys(obj1);
   let kyes2 = Object.keys(obj2);

   if (kyes1.length !== kyes2.length) return false;

   for (let item in kyes1) {
       if (!kyes2.includes(kyes1[item])) {
           return false
       }
   }
   
   for (let attr in obj1) {
       let t1 = obj1[attr] instanceof Object;
       let t2 = obj2[attr] instanceof Object;
       if (t1 && t2) {
           return isEqual(obj1[attr], obj2[attr]);
       } else if (obj1[attr] !== obj2[attr]) {
           return false;
       }
   }
   return true;
};
```

## 参考文档
 
[MDN OBJECT](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
