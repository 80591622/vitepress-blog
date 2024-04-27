
# seamless-immutable


React在减少重复渲染方面确实是有一套独特的处理办法，那就是虚拟DOM，但显然在首次渲染的时候React绝无可能超越原生的速度，或者一定能将其它的框架比下去。
但是每次数据变动都会执行render，大大影响了性能，特别是在移动端。


JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如 foo={a: 1}; bar=foo; bar.a=2 你会发现此时 foo.a 也被改成了 2。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，Mutable 带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。

seamless-immutable 与immutable功能类似，通过共享现有嵌套对象来提高深度复制大型嵌套对象时的速度。seamless-immutable中通过Object.freeze防止对象被修改，并定义了一系列API来实现对不可变数据结构的操作。(仅限于数组和对象)

与 Immutable.js 学院派的风格不同，seamless-immutable 并没有实现完整的 Persistent Data Structure，
而是使用 Object.defineProperty（因此只能在 IE9 及以上使用）扩展了 JavaScript 的 Array 和 Object 对象来实现，
只支持 Array 和 Object 两种数据类型，API 基于与 Array 和 Object 操持不变。代码库非常小，**压缩后下载只有 2K。而 Immutable.js 压缩后下载有 16K**。


Object.freeze() 方法可以冻结一个对象，冻结的对象不能添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。尝试修改会静默失败或抛出TypeError类型的错误。相关函数还包括：
Object.isExtensible() 
Object.seal() 
Object.freeze和Object.defineProperty均为ES5中定义的方法，因此使用seamless-immutable需保证浏览器中这些方法存在


与 Object.freeze、const 区别

Object.freeze 和 ES6 中新加入的 const 都可以达到防止对象被篡改的功能，但它们是 shallowCopy 的。对象层级一深就要特殊处理了。

-------------------------


- **开始使用**
- yarn add seamless-immutable
- import Immutable from "seamless-immutable"



# Immutable Array

----------


### from(type)

- type：array | object
- 设置成 Immutable 对象

```javascript
 let code1 = Immutable.from([1, 2, 3]);
  let code2 = Immutable([1, 2, 3])); //同 from()
  console.log(code1);//Immutable([1, 2, 3])
  console.log(code2);//Immutable([1, 2, 3])
```

### flatMap(obj,fun)
- obj： immutable
- fun : function
- 循环 immutable 对象， 返回 一个新的 immutable 对象

```javascript
var array = Immutable(['AA', 'BB', 'CC']);
let newarr = Immutable.flatMap(array, str => 'hello ' + str);
console.log(newarr); //Immutable(["hello AA", "hello BB", "hello CC"])

```


### isImmutable(type)

- type：array | object | immutable
- 判断是否是 Immutable 对象

- 注：参数如果是 int string bool,undefined,null 返回 true
```javascript
let code1=Immutable.from([1, 2, 3])
let code2= {a: 12};
console.log(Immutable.isImmutable(code1)); //true
console.log(Immutable.isImmutable(code2)); //false
```

 # Immutable Object || Array


----------


### asMutable(obj,type)
- obj： immutable
- type：默认是{deep:false}
- 返回数组的可变副本,对于深度可变的副本需设置 {deep:true}
- 
```javascript

	var mutableArray = immutable.asMutable(banner,{deep: true});
     mutableArray.map((item) => {
       return item.victory='victory'
     });

   console.log(mutableArray,banner);//可改变
```

# Immutable Object


----------


### merge (obj1,obj2,type)

- obj1 immutable
- obj2 : object| array
- type: object 默认是{deep:false}
- 
- 返回合并后的 Immutable,对于深度可变的副本需设置 {deep:true}

```javascript

//code1:

var obj = Immutable({a: 'AA', b: 'BB', c: 'CC'});
let newobj = Immutable.merge(obj, {c: 'CC', d: 'DD'});
console.log(newobj); // Immutable({a: "AA", b: "BB", c: "CC", d: "DD"})

//code2:

var obj = Immutable({status: 'ok', data: {a: 'AA', b: 'BB'}});
let newsobj = Immutable.merge(obj, [{status: 'error', data: {c: 'CC'}}, {data: {a: 'AAAA'}}], {deep: true});
console.log(newsobj); //Immutable({status: "error", {a: "AAAA", b: "BB", c: "CC"}})

//code3:

var code1 = Immutable([1, 2, 3]); //Array无效
let code2 = Immutable.merge(code1, [4, 5, 6]);
console.log(code2); //Immutable([1,2,3])

```

### replace(obj1,obj2,type)

- obj1 immutable
- obj2 : object
- type: object 默认是{deep:false}

- 返回替换后的 Immutable,对于深度可变的副本需设置 {deep:true}

```javascript

var obj1 = Immutable({a: {b: 'test'}, c: 'test'});
var obj2 = Immutable.replace(obj1, {a: {b: 'test'}, d: 'ok'}, {deep: true});
console.log(obj2);//Immutable({a: {b: 'test'}, d: 'ok'})
console.log(obj1 === obj2); //  false
console.log(obj1.a === obj2.a); //  true。

```

### set(obj,key,value,type)
- obj1 immutable
- key : string
- value : any
- type: object 默认是{deep:false}
- 设置 immutable 对象制定的值

```javascript
var obj = Immutable({a: 'AA', b: 'BB', c: {d: 'DD'}});
let newobj = Immutable.set(obj, 'b', 'BBB');
console.log(obj); // Immutable({a: 'AA', b: 'BB', c: {d: 'DD'}})
console.log(newobj); // Immutable({a: 'AA', b: 'BBB', c: {d: 'DD'}})

```


### setIn (obj,key,value,type)
- obj1 immutable
- key : string
- value : any
- type: object 默认是{deep:false}
- 深度设置 immutable 对象制定的值

```javascript
var obj = Immutable({a: 'AA', b: 'BB', c: {d: 'DD'}});
let newobj = Immutable.setIn(obj, ['c', 'd'], 'DDDD');
console.log(obj);//Immutable({a: 'AA', b: 'BB', c: {d: 'DD'})
console.log(newobj); //Immutable({a: 'AA', b: 'BB', c: {d: 'DDDD'})

```

### getIn(ob,arr,default)
- obj： immutable
- key : array
- default : 如果返回值为空则返回默认值
- 获取 immutable 对象指定的值

```javascript
var obj = Immutable({a: {b: 'BB', c: 'CC'}, d: 'DD'});
let code1 = Immutable.getIn(obj, ['a', 'b']);
let code2 = Immutable.getIn(obj, ['a', 'c'], 'EE');
console.log(code1); //BB
console.log(code2); //CC

```

### update(obj,key,fun,parmas)
- obj： immutable
- key : string
- fun : function
- parmas：any，回调函数的参数
- 修改 immutable 对象的值

```javascript

//code1:

let fun = x => x + x;
var obj = Immutable({a: 'AA'});
let newobj = Immutable.update(obj, 'a', fun);
console.log(obj); //Immutable({a: 'AA'})
console.log(newobj); // Immutable({a: 'AAAA'})

//code 2 :

let add = (x, y) => x + ' ' + y;
var obj = Immutable({a: 'hello'});
var newobj = Immutable.update(obj, 'a', add, 'world');
console.log(obj); //Immutable({a: 'hello'})
console.log(newobj); //Immutable({a: 'hello world'})

```

### updateIn(obj,key,fun,parmas)
- obj： immutable
- key : array
- fun : function
- parmas：any，回调函数的参数
- 深度修改 immutable 对象的值

```javascript
let add = (x, y) => x + y;
var obj = Immutable({a: {b: 1}});
let newobj = Immutable.updateIn(obj, ['a', 'b'], add, 10);
console.log(obj);workspace
console.log(newobj); workspace

```

### without(obj,key)
- obj： immutable
- key : array | string |function
- 删除 immutable 对象的值

```javascript

//code 1:

var obj = Immutable({a: 'AA', b: 'BB', c: 'CC'});
let obj1 = Immutable.without(obj, 'b');
console.log(obj1); // Immutable({a: 'AA', c: 'CC'})

code 2:

var obj = Immutable({a: 'AA', b: 'BB', c: 'CC'});
let obj2 = Immutable.without(obj, ['a', 'b']);
console.log(obj2); // Immutable({ c: 'CC'})

code 3:

var obj = Immutable({a: 'AA', b: 'BB', c: 'CC'});
let obj3 = Immutable.without(obj, 'a', 'b');
console.log(obj3); // Immutable({ c: 'CC'})

code 4:

var obj = Immutable({a: 'AA', b: 'BB', c: 'CC'});
let obj4 = Immutable.without(obj, (value, key) => key === 'a' || value === 'BB');
console.log(obj4); // Immutable({ c: 'CC'})

```


### asObject(obj,fun)
- obj： immutable
- fun : function
- 迭代器函数将返回两个元素的数组 - 第一个表示键，另一个表示值。然后返- 回由这些键和值构成的不可变对象。

```javascript

//code1

 var array = immutable(["hey", "you"]);
    var tempAry = immutable.asObject(array, function(str) {
      return [str,str]
    });
  console.log(tempAry);   //{hey: "hey", you: "you"}

//code2
,
var array = Immutable(['aa', 'bb']);
let newobj = Immutable.asObject(array, str => {
    return [str, str.toUpperCase()];
});
console.log(newobj); //Immutable({aa: "AA", bb: "BB"})

``` 

