---
abbrlink: 87b8410e
title: TypeScript
date: 2019-05-11
tags: TypeScript
categories: 
- TypeScript
- TypeScript基础
---


<strong class='old-blog'>TypeScript</strong>

[[toc]]

<!-- ### TypeScript -->

TypeScript 是 Microsoft 开发和维护的一种面向对象的编程语言。它是 JavaScript 的超集，包含了 JavaScript 的所有元素，可以载入 JavaScript 代码运行，并扩展了 JavaScript 的语法。

- TypeScript 具有以下特点：
  - TypeScript 是 Microsoft 推出的开源语言，使用 Apache 授权协议
  - TypeScript **增加了静态类型、类、模块、接口和类型注解**
  - TypeScript 可用于开发大型的应用
  - TypeScript 易学易于理解

- TypeScript 的优势：
  - 静态输入  开发环境下自动检查类型错误，以便写好更健壮的代码并对其进行维护，使得代码质量更好、更清晰。
  - 大型的开发项目   使用TypeScript工具来进行重构更变的容易、快捷。（有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化）
  - 更好的协作
  - 更强的生产力

### 使用ts

```js
npm i  -g  typescript
// 或者
yarn  global add  typescript
```

打开终端输入命令 tsc -v 查看包是否下载成功   有版本号输出 则为成功


接下来就可以书写 ts 的代码啦！

1. 新建文件，如 hello.ts
2. 书写代码

3. 编译代码：在终端输入 tsc ./hello.ts, 会自动生成一个js 文件，接下来就可以用 node 命名来运行js 的文件，在浏览器打开看效果啦


如果不想下载包的话，也可以在线运行，链接如下： [在线运行](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fplay)


### ts 的类型

ts 的常用基础类型分为两种： js 已有类型

1. 原始类型：`number/string/boolean/null/undefined/symbol`
2. 对象类型：`object`（包括，数组、对象、函数等对象）

ts 新增类型

1. 联合类型
2. 自定义类型(类型别名)
3. 接口
4. 元组
5. 字面量类型
6. 枚举
7. void
8. any

---


`Number`
```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
//编译的结果
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

`String`
```typescript
let myName: string = 'Tom';
```


`Boolean`
```typescript{1}
let isDone: boolean = false;
// 编译通过
// 后面约定，未强调编译错误的代码片kk段，默认为编译通过

let createdByNewBoolean: boolean = new Boolean(1);
// index.ts(1,5): error TS2322: Type 'Boolean' is not assignable to type 'boolean'.
// 后面约定，注释中标出了编译报错的代码片段，表示编译未通过
```

`Void`
```typescript
//JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
function alertName(): void {
    alert('My name is Tom');
}
//能将它赋值为 undefined 和 null：
let unusable: void = undefined;
let unusable: void = null;
```

`Null 和 Undefined`
```typescript
let u: undefined = undefined;
let n: null = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num: number = undefined;
//而 void 类型的变量不能赋值给 number 类型的变量：
let u: void;
let num: number = u;

// index.ts(2,5): error TS2322: Type 'void' is not assignable to type 'number'.
```

`Any`

```typescript
//任意值（Any）用来表示允许赋值为任意类型。
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

`Symbol`
```typescript
let uniKey:symbol = Symbol()
```


### 元组


**元组**是一种特殊的**数组**。有两点特殊之处

1. 它约定了的元素个数
2. 它约定了特定索引对应的数据类型

举个例子： 就拿 react 里面的 useState来举例：

```typescript
function useState(n: number): [number, (number)=>void] {
        const setN = (n1) => {
            n = n1
        }
        return [n, setN]
    }

const [num ,setNum] = useState(10)
```

```typescript
// 定义一对值分别为 string 和 number 的元组：
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

onsole.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

`越界的元素`

在 2.6 及之前版本中，超出规定个数的元素称作越界元素，但是只要越界元素的类型是定义的类型中的一种即可。
比如我们定义的类型有两种：string 和 number，越界的元素是 string 类型，属于联合类型，
所以没问题，联合类型的概念我们后面会讲到。string | number

```typescript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```
在 2.6 之后的版本，去掉了这个越界元素是联合类型的子类型即可的条件，要求元组赋值必须类型和个数都对应。

在 2.6 之后的版本，[string, number] 元组类型的声明效果上可以看作等同于下面的声明：
```typescript
interface Tuple extends Array<number | string> {0: string; 1: number; length: 2;}
```
如果元素个数超过 2 个时，它的 length 就不是 2 是大于 2 的数了，就不满足这个接口定义了，所以就会报错。

**如果你想要和 2.6 及之前版本一样的元组特性，那你可以这样定义接口：**
```typescript
interface Tuple extends Array<number | string> {0: string; 1: number;}
```

### 枚举

`枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。`

**普通枚举**
```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

//枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

```typescript
enum Days {Sun = 7, Mon = 4, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 4); // true
console.log(Days["Tue"] === 5); // true
console.log(Days["Thu"] === 7); // true
//未手动赋值的枚举项会接着上一个枚举项递增。
//如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
//所以使用的时候需要注意，最好不要出现这种覆盖的情况。

enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
//使用类型断言来让 tsc 无视类型检查
```

**常数枚举**

`常数枚举是使用 const enum 定义的枚举类型：`

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员(赋值)。
//上例的编译结果是：
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

### 类型推论

`如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。`
<br/>
以下代码虽然没有指定类型，但是会在编译的时候报错：
```typescript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
事实上，它等价于：
```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

```typescript
//如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```


### 联合类型


`联合类型（Union Types）表示取值可以为多种类型中的一种。`

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错,number么有length

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

注意： 这里的 | 竖线，在 TS 中叫做联合类型，即：由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种。不要和 js 中的 || 搞混哦。 应用场景： 定时器id

```typescript
let timer:number|null = null
timer = setTimeout(()=>{})
```

### 类型断言

```typescript
//类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
//另一个为as语法：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
//两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
```


`解决上面联合类型字符串和数字length的问题`
```typescript
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

### Interfaces 接口
`在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。`

```typescript
interface Person {
    name: string;
    age?: number;// 可选属性
    [propName: string]: any;// 任意属性
    readonly id: number;// 只读属性
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    id:1
};
```
需要注意的是，`一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：`

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//Index signatures are incompatible.
//Type 'string | number' is not assignable to type 'string'.
//Type 'number' is not assignable to type 'string'.

//上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
```
**`接口继承接口`**

```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```
**`混合类型`**

```typescript
//一个对象可以同时做为函数和对象使用，并带有额外的属性。
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

**`接口继承类`**

```typescript
// 简单
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};

// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 
// 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
// 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select() { }
}
class TextBox extends Control {
    select() { }
}


// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}
class Location {

}
```

**`window 扩充一些不具名的字段`**


```javascript
declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__: string,
    [key: string]: object
  }
}
// 新版本 直接 interface 会自动合并
interface Window {
  __MICRO_APP_ENVIRONMENT__: string,
  [key: string]: object
}
```


### 数组类型

`在 TypeScript 中，数组类型有多种定义方式，比较灵活。`

```typescript
//「类型 + 方括号」表示法
let fibonacci: number[] = [1, 1, 2, 3, 5];
               number|string[] = ['1', 1, 2, 3, 5];
```

```typescript
//数组泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
               Array<number|string> = ['22', 1, 2, 3, 5];

let banners: Array<{ id: number, name: string, pic: string, url: string }>=[{id: 1, name: "111", pic: "111", url: "111"}];
```

```typescript
//用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

interface NumberArray {
    id: number;
    name: string
    pic: string;
    url: string
}

let banners: NumberArray[] = [{id: 1, name: "111", pic: "111", url: "111"}];
```

```typescript
//any 在数组中的应用
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
```

### 函数类型

#### 单个函数
```typescript
// 普通函数
function 函数名(形参1： 类型=默认值， 形参2：类型=默认值,...): 返回值类型 { }
// 声明式实际写法:
function add(num1: number, num2: number): number {
  return num1 + num2
}

// 箭头函数
const 函数名（形参1： 类型=默认值， 形参2：类型=默认值, ...):返回值类型 => { }
const add2 = (a: number =100, b: number = 100): number =>{
   return a + b
 }
// 注意： 箭头函数的返回值类型要写在参数小括号的后面
```

#### 统一定义函数格式

当函数的类型一致时，写多个就会显得代码冗余，所以需要统一定义函数的格式 如下所示：


```typescript
const add1 = (a: number =100, b: number = 100): number => {
    return a + b
  }

function add2 (a:number = 100 , b: number = 200): number {
    return a + b
  }
// 这里的 add1 和 add2 的参数类型和返回值一致，
// 那么就可以统一定义一个函数类型
type Fn = (n1:number,n2:number) => number 
// interface SearchFunc { (n1: number, n2: number): number; }

const add3 : Fn = (a,b)=>{return a+b }
// 这样书写起来就简单多啦
```

#### 函数返回值类型void

在 ts 中，如果一个函数没有返回值，应该使用 `void` 类型



可以用到`void` 有以下几种情况

1. 函数没写return
2. 只写了 return， 没有具体的返回值
3. return 的是 undefined


```typescript
// 如果什么都不写，此时，add 函数的返回值类型为： void
const add = () => {}

// 如果return之后什么都不写，此时，add 函数的返回值类型为： void
const add = () => { return }

const add = (): void => {
  // 此处，返回的 undefined 是 JS 中的一个值
  return undefined
}
// 这种写法是明确指定函数返回值类型为 void，与上面不指定返回值类型相同
const add = (): void => {}
```

#### 可选参数

使用函数实现某个功能时，参数可以传也可以不传。

例如：数组的 slice 方法，可以 `slice()` 也可以 `slice(1)` 还可以 `slice(1, 3)` 那么就可以定义可选参数 语法：

```typescript
// 可选参数：在可选参数名的后面添加 ?（问号）
function slice (a?: number, b?: number) {
    // ? 跟在参数名字的后面，表示可选的参数
    // 注意：可选参数只能在 必须参数的后面
    // 如果可选参数在必选参数的前面，会报错
    console.log(111);
    
  }
  slice()
  slice(1)
  slice(1,2)
}
```

####  可选和默认值的区别

相同点： 调用函数时，可以少传参数

区别：设置了默认值之后，就是可选的了，不写就会使用默认值； 可选的参数一定有值才会跟默认值表现一致。

注意：它们不能一起使用。优先使用默认值

![image-20220529131037283](https://tva1.sinaimg.cn/large/e6c9d24egy1h2p74bp2raj21ou0k8acr.jpg)

#### 对象类型-单独使用

```typescript
// 类型别名
// 创建类型别名
type Person = {
  name: string，
  age: number
  add(): void
}

// 使用类型别名作为对象的类型：
let person: Person = {
  name: '小花',
  age: 18
  add() {}
}
```

### 泛型

```typescript
interface IProps {
    foo: string;
}
interface IState {
  loading:boolean;
}
class MyComponent extends React.Component<IProps, IState> {
    render() {
    return <span>{this.props.foo}</span>
    }
}
```


### Class类

**默认为 `public`**

```typescript
// 在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 public来做修饰；例如，C#要求必须明确地使用 public指定成员是可见的。 在TypeScript里，成员都默认为 public。
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
**理解 `private`**

```typescript
// 成员被标记成 private时，它就不能在声明它的类的外部访问。比如
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

**理解 `protected`**

```typescript
// protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在子类中仍然可以访问。例如：
class Animal {
    protected name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}
new Cat('heshen').name
// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如

class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```
**`抽象类`**

`abstract 用于定义抽象类和其中的抽象方法。`

```typescript
// 首先，抽象类是不允许被实例化的：
// 其次，抽象类中的抽象方法必须被子类实现：
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat extends Animal {
    public eat() {
        console.log(`${this.name} is eating.`);
    }
}


let a = new Animal('Jack');
// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'

let cat = new Cat('Tom');
// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.

// 上面的例子中，我们定义了一个类 Cat 继承了抽象类 Animal，但是没有实现抽象方法 sayHi
```

### 内置对象

`ECMAScript 标准提供的内置对象有：`
Boolean、Error、Date、RegExp  Object Number......[查看更多](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

`DOM 和 BOM 的内置对象`
Document、HTMLElement、Event、NodeList .....
```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

`TypeScript 核心库的定义文件`

```typescript
Math.pow(10, '2');

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

//事实上Math.pow 的类型定义如下：
interface Math {
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    pow(x: number, y: number): number;
}
```

### type 类型别名 

type 会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。

```typescript
type Name = string; // 基本类型
type NameResolver = () => string; // 函数
type NameOrResolver = Name | NameResolver; // 联合类型
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
//类型别名常用于联合类型。
```

注意：别名可以是任意的合法字符串，一般首字母大写


### type 和 interface的区别

1. type类型别名，可以定义基础类型，元组等
2. type不可以继承
3. type不会创建一个真正的新的类名
4. 类型别名无法被实现implements，而接口可以被派生类实现
5. 类型别名重名会抛出错误，接口重名是会产生合并


### 字符串字面量类型
`字符串字面量类型用来约束取值只能是某几个字符串中的一个。`

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// index.ts(7,47): error TS2345: Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```
**`类型别名` 与 `字符串字面量类型` 都是使用 `type` 进行定义**


### 声明文件
`声明语句放到一个单独的文件如(index.d.ts)中，这就是声明文件，声明文件必需以 .d.ts 为后缀。`

假如无法解析index.d.ts，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 index.d.ts 文件


#### React的声明文件

```typescript jsx{1,7}
import { History,Location } from "history";
interface IProps {
   location: Location;
   history: History;
}

import { AnyAction, Dispatch } from "redux";
interface IProps {
  dispatch: Dispatch<AnyAction>;
}
```

### 继承React

```typescript
import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { match } from 'react-router';
import { Dispatch } from 'redux';

/**
 * 基础属性
 */
export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  dispatch?: Dispatch<any>;
  match?: match;
}
export class Component<P = {}, S = {}> extends React.Component<P & IProps, S> {}
export class PureComponent<P = {}, S = {}> extends React.PureComponent<P & IProps, S> {}

/**
 * 表单属性
 */
export interface FormProps extends IProps, FormComponentProps {}
export class FormComponent<P = {}, S = {}> extends React.PureComponent<P & FormProps, S> {}
```

### Typescript错误忽略

**单行忽略**
`// @ts-ignore`

**忽略全文**
`// @ts-nocheck`

**取消忽略全文**
`// @ts-check`
