---
abbrlink: 97cf9ba4
title: 原型与原型链
date: 2020-11-16

categories: 
- JS
- 原型与原型链
---

<strong class='old-blog'>原型与原型链</strong>

[[toc]]


<!-- ## 原型与原型链 -->

首先，JS是真正的“面向对象”的语言，而其他我们所熟知的例如C++、Java等，严格意义上说，是“面向类”的语言，仔细想想，还真是那么回事儿。其次，JS中，调用构造器之后，对象并不是它原型的一份拷贝，而是被**链接**到原型上。

### Object

我们先看一段代码:

```js
function Person(name){     
    this.name = name;
}

Person.prototype.sayName = function(welcome) {     
	console.log(welcome, this.name);
}

var person1 = new Person('Smiley');     
person1.sayName('Hello');        
```

在执行这段代码之前，有个东西是一直存在的，就是有些人所说的“原型的原型”。如下图所示，我们用圆形代表function，用方形代表object:

![img](https://pic1.zhimg.com/80/v2-522ff289c8c9fae68f7f83de74a15848_1440w.jpg)

左边的圆形是Object构造函数，就是我们一般使用var obj = new Object()时最普普通通的的构造函数。右边的方形是Object的prototype，这个东西没有名字（虽然它很重要）。左边有一个箭头指向右边，意味着Object有一个属性叫做prototype，这个属性指向的是右边的那个方块，而向左指的箭头，意味着右边方块的constructor属性是左边的Object构造函数。

这些东西在上面程序运行之前就一直存在的。

### 构造函数

好的，我们开始看第一行代码，运行第一行代码之后，会生成一个叫Person的构造函数，而这个构造函数的prototype属性，指向的就是它的prototype，如下图方块所示：

![img](https://pic2.zhimg.com/80/v2-30fce0fbe78cf4b2bb1c8a060dc28751_1440w.jpg)

Person与Person.prototype之间的关系，与Object和Object.prototype类似，不同的是，Person.prototype会通过__proto__指向Object.prototype。

接下来看第5行代码：我们在Person.prototype上面添加一个sayName方法，如上图所示，Person.prototype这个方块中有sayName方法。

### new调用构造器

使用new这个关键字的时候，JS编译器会做四件事情：



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



![img](https://pic4.zhimg.com/80/v2-109c6159bd3523658b1f5bfc48acc47f_1440w.jpg)

如上图所示，我们先创建一个person1的空对象，然后把person1通过__proto__指向原型对象，指向构造函数中的代码，person1就获得了一个叫做name的属性，最后返回。

我们最后运行第10行代码：person1.sayName('Hello');

person1上有sayName这个方法么？没有，那么就顺着person1的__proto__向上找，找到Person.prototype。Person.prototype上面有sayName方法么？有的，那么执行这个方法。这个方法内部使用了this.name，那么这个this的指向是什么么？我们需要看sayName的call site，是person1调用的sayName，隐式调用，this就指向person1，而person1的name就是Smiley。

是不是觉得很神奇，最后调用时候使用的属性和方法都是我们希望使用的那个，person1.sayName('Hello')看似很容易理解，JS初学者都能很容易说出最后输出结果，但是这其中的过程，恐怕只有理解了原型和原型链才能真正说明白。

明白了这些之后，我们看几个相等关系：

```js
console.log(Person === Person.prototype.constructor);
console.log(person1.__proto__ === Person.prototype);
```

我们再也不用死记硬背这个关系了，而是通过上面的图直接可以推到出来。



console.log(person1.constructor)是什么的呢？


## es5的几种继承方式 

### 对象冒充实现继承

```javascript
function Person(){
    this.name='张三';  /*属性*/
    this.age=20;
    this.run=function(){  /*实例方法*/
        alert(this.name+'在运动');
    }

}      
Person.prototype.sex="男";
Person.prototype.work=function(){
     alert(this.name+'在工作');

}

//Web类 继承Person类   对象冒充的组合继承模式
function Web(){
    Person.call(this);    /*对象冒充实现继承*/
}
var w=new Web();
// w.run();  //**对象冒充可以继承构造函数里面的属性和方法**

w.work();  //对象冒充可以继承构造函数里面的属性和方法   但是没法继承原型链上面的属性和方法

```
### 原型链实现继承

```javascript
function Person(name,age){
    this.name='张三';  /*属性*/
    this.age=20;
    this.run=function(){  /*实例方法*/
        alert(this.name+'在运动');
    }
}      
Person.prototype.sex="男";
Person.prototype.work=function(){
     alert(this.name+'在工作');
}

//Web类 继承Person类   原型链+对象冒充的组合继承模式
function Web(name,age){    
}

Web.prototype=new Person();   //原型链实现继承
var w=new Web();
//原型链实现继承:可以继承构造函数里面的属性和方法 也可以继承原型链上面的属性和方法
//w.run();

w.work();
 //缺点是实例化子类的时候没法给父类传参
        
```

### 原型链+对象冒充的组合继承模式

```javascript
function Person(name,age){
        this.name=name;  /*属性*/
        this.age=age;
        this.run=function(){  /*实例方法*/
            alert(this.name+'在运动');
        }

}      
Person.prototype.sex="男";
Person.prototype.work=function(){
        alert(this.name+'在工作');

}   
function Web(name,age){
    Person.call(this,name,age);   //对象冒充继承   实例化子类可以给父类传参
}

Web.prototype=new Person();//上面已经继承了构函数的方法 ， 这里new 一个会重新继承构造函数的方法 ，所以这里可以直接 -> Web.prototype=Person.prototype;

var w=new Web('赵四',20);   

// w.run();
w.work();

// var w1=new Web('王五',22);
```

### class实现继承源码

`ES6`
```javascript
class B {
  constructor(props) {
    this.name = props.name;
  }
}
class A extends B {
  constructor() {
    // 向父类传参
    super({ name: 'B' });
    // this 必须在 super() 下面使用
    console.log(this);
  }
}
```

`ES5`
```javascript
function __extends(child, parent) {
  // 修改对象原型
  Object.setPrototypeOf(child, parent);
  // 寄生继承，创建一个干净的构造函数，用于继承父类的 prototype
  // 这样做的好处是，修改子类的 prototype 不会影响父类的 prototype
  function __() {
    // 修正 constructor 指向子类
    this.constructor = child;
  }
  // 原型继承，继承父类原型属性，但是无法向父类构造函数传参
  child.prototype =
    parent === null
      ? Object.create(parent)
      : ((__.prototype = parent.prototype), new __());
}
var B = (function () {
    function B(props) {
        this.name = props.name;
    }
    return B;
}());
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        var _this = _super.call(this, { name: 'B' }) || this; // // 向父类传参
        // this 必须在 super() 下面使用
        console.log(_this);
        return _this;
    }
    return A;
}(B));
```



### ES5/ES6 的继承除了写法以外还有什么区别？

1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。

```javascript
const bar = new Bar(); // it's ok
function Bar() {
  this.bar = 42;
}

const foo = new Foo(); // ReferenceError: Foo is not defined
class Foo {
  constructor() {
    this.foo = 42;
  }
}
```



2. class 声明内部会启用严格模式。

```javascript
// 引用一个未声明的变量
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
```

3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的。

```javascript
// 引用一个未声明的变量
function Bar() {
  this.bar = 42;
}
Bar.answer = function() {
  return 42;
};
Bar.prototype.print = function() {
  console.log(this.bar);
};
const barKeys = Object.keys(Bar); // ['answer']
const barProtoKeys = Object.keys(Bar.prototype); // ['print']

class Foo {
  constructor() {
    this.foo = 42;
  }
  static answer() {
    return 42;
  }
  print() {
    console.log(this.foo);
  }
}
const fooKeys = Object.keys(Foo); // []
const fooProtoKeys = Object.keys(Foo.prototype); // []
```

4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。

```javascript
function Bar() {
  this.bar = 42;
}
Bar.prototype.print = function() {
  console.log(this.bar);
};

const bar = new Bar();
const barPrint = new bar.print(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
  print() {
    console.log(this.foo);
  }
}
const foo = new Foo();
const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
```



5. 必须使用 new 调用 class。

```javascript
function Bar() {
  this.bar = 42;
}
const bar = Bar(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
}
const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
```



6. class 内部无法重写类名。

```javascript
function Bar() {
  Bar = 'Baz'; // it's ok
  this.bar = 42;
}
const bar = new Bar();
// Bar: 'Baz'
// bar: Bar {bar: 42}  

class Foo {
  constructor() {
    this.foo = 42;
    Foo = 'Fol'; // TypeError: Assignment to constant variable
  }
}
const foo = new Foo();
Foo = 'Fol'; // it's ok
```

