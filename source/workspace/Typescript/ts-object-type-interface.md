
# TypeScr 误区

## Object vs object vs {}

TypeScript 2.2 引入了被称为 `object` 类型的新类型，它用于表示非原始类型。在 JavaScript 中以下类型被视为原始类型：`string`、`boolean`、`number`、`bigint`、`symbol`、`null` 和 `undefined`。

所有其他类型均被视为非基本类型。新的 `object` 类型表示如下：

```javascript
// All primitive types
type Primitive = string 
 | boolean | number 
 | bigint | symbol 
 | null | undefined;

// All non-primitive types
type NonPrimitive = object;
```

让我们看看 `object` 类型，如何让我们编写更精确的类型声明。



## 使用 object 类型进行类型声明

随着 TypeScript 2.2 的发布，标准库的类型声明已经更新，以使用新的对象类型。例如，[`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 和[`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 方法，现在需要为它们的原型参数指定 `object | null` 类型：

```javascript
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  create(o: object | null): any;
  setPrototypeOf(o: any, proto: object | null): any;
  // ...
}
```

将原始类型作为原型传递给 `Object.setPrototypeOf()` 或 `Object.create()` 将导致在运行时抛出类型错误。TypeScript 现在能够捕获这些错误，并在编译时提示相应的错误：

```javascript
const proto = {};

Object.create(proto);     // OK
Object.create(null);      // OK
Object.create(undefined); // Error
Object.create(1337);      // Error
Object.create(true);      // Error
Object.create("oops");    // Error
```

`object` 类型的另一个用例是作为 ES2015 的一部分引入的 WeakMap 数据结构。它的键必须是对象，不能是原始值。这个要求现在反映在类型定义中：

```javascript
interface WeakMap<K extends object, V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}
```



## 对比 Object vs object vs {}

也许令人困惑的是，TypeScript 定义了几个类型，它们有相似的名字，但是代表不同的概念：

- `object`
- `Object`
- `{}`

我们已经看到了上面的新对象类型。现在让我们讨论 `Object` 和 `{}` 表示什么。

### Object 类型

TypeScript 定义了另一个与新的 `object` 类型几乎同名的类型，那就是 `Object` 类型。该类型是所有 Object 类的实例的类型。它由以下两个接口来定义：

- Object 接口定义了 Object.prototype 原型对象上的属性；
- ObjectConstructor 接口定义了 Object 类的属性。

下面我们来看一下上述两个接口的相关定义：



1、`Object` 接口定义

```javascript
// node_modules/typescript/lib/lib.es5.d.ts

interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
```

2、`ObjectConstructor` 接口定义

```javascript
// node_modules/typescript/lib/lib.es5.d.ts

interface ObjectConstructor {
  /** Invocation via `new` */
  new(value?: any): Object;
  /** Invocation via function calls */
  (value?: any): any;

  readonly prototype: Object;

  getPrototypeOf(o: any): any;

  // ···
}

declare var Object: ObjectConstructor;
```

Object 类的所有实例都继承了 Object 接口中的所有属性。我们可以看到，如果我们创建一个返回其参数的函数：

传入一个 Object 对象的实例，它总是会满足该函数的返回类型 —— 即要求返回值包含一个 toString() 方法。

```javascript
// Object: Provides functionality common to all JavaScript objects.
function f(x: Object): { toString(): string } {
  return x; // OK
}
```

而 `object` 类型，它用于表示非原始类型（undefined, null, boolean, number, bigint, string, symbol）。使用这种类型，我们不能访问值的任何属性。



### Object vs object

有趣的是，类型 `Object` 包括原始值：

```javascript
function func1(x: Object) { }
func1('semlinker'); // OK
```

为什么？

`Object.prototype` 的属性也可以通过原始值访问：

```javascript
'semlinker'.hasOwnProperty === Object.prototype.hasOwnProperty
// true
```

> 感兴趣的读者，可以自行了解一下 “JavaScript 装箱和拆箱” 的相关内容。

相反，`object` 类型不包括原始值：

```javascript
function func2(x: object) { }

// Argument of type '"semlinker"' 
// is not assignable to parameter of type 'object'.(2345)
func2('semlinker'); // Error
```

需要注意的是，当对 Object 类型的变量进行赋值时，如果值对象属性名与 Object 接口中的属性冲突，则 TypeScript 编译器会提示相应的错误：

```javascript
// Type '() => number' is not assignable to type 
// '() => string'.
// Type 'number' is not assignable to type 'string'.
const obj1: Object = { 
   toString() { return 123 } // Error
};
```

而对于 object 类型来说，TypeScript 编译器不会提示任何错误：

```javascript
const obj2: object = { 
  toString() { return 123 } 
};
```

另外在处理 object 类型和字符串索引对象类型的赋值操作时，也要特别注意。比如：

```javascript
let strictTypeHeaders: { [key: string]: string } = {};
let header: object = {};
header = strictTypeHeaders; // OK
// Type 'object' is not assignable to type '{ [key: string]: string; }'.
strictTypeHeaders = header; // Error
```

在上述例子中，最后一行会出现编译错误，这是因为 `{ [key: string]: string }` 类型相比 `object` 类型更加精确。而 `header = strictTypeHeaders;` 这一行却没有提示任何错误，是因为这两种类型都是非基本类型，`object` 类型比 `{ [key: string]: string }` 类型更加通用。



### 空类型 {}

还有另一种类型与之非常相似，即空类型：`{}`。它描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误：

```javascript
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

但是，你仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用：

```javascript
// Type {}
const obj = {};

// "[object Object]"
obj.toString();
```

在 JavaScript 中创建一个表示二维坐标点的对象很简单：

```javascript
const pt = {}; 
pt.x = 3; 
pt.y = 4;
```

然而以上代码在 TypeScript 中，每个赋值语句都会产生错误：

```javascript
const pt = {}; // (A)
// Property 'x' does not exist on type '{}'
pt.x = 3; // Error
// Property 'y' does not exist on type '{}'
pt.y = 4; // Error
```

这是因为第 A 行中的 pt 类型是根据它的值 {} 推断出来的，你只可以对已知的属性赋值。这个问题怎么解决呢？有些读者可能会先想到接口，比如这样子：

```javascript
interface Point {
  x: number;
  y: number;
}

// Type '{}' is missing the following 
// properties from type 'Point': x, y(2739)
const pt: Point = {}; // Error
pt.x = 3;
pt.y = 4;
```

很可惜对于以上的方案，TypeScript 编译器仍会提示错误。那么这个问题该如何解决呢？其实我们可以直接通过对象字面量进行赋值：

```javascript
const pt = { 
  x: 3,
  y: 4, 
}; // OK
```

而如果你需要一步一步地创建对象，你可以使用类型断言（as）来消除 TypeScript 的类型检查：

```javascript
const pt = {} as Point; 
pt.x = 3;
pt.y = 4; // OK
```

但是更好的方法是声明变量的类型并一次性构建对象：

```javascript
const pt: Point = { 
  x: 3,
  y: 4, 
};
```

另外在使用 `Object.assign` 方法合并多个对象的时候，你可能也会遇到以下问题：

```javascript
const pt = { x: 666, y: 888 };
const id = { name: "semlinker" };
const namedPoint = {};
Object.assign(namedPoint, pt, id);

// Property 'name' does not exist on type '{}'.(2339)
namedPoint.name; // Error
```

这时候你可以使用对象展开运算符 `...` 来解决上述问题：

```javascript
const pt = { x: 666, y: 888 };
const id = { name: "semlinker" };
const namedPoint = {...pt, ...id}

//(property) name: string
namedPoint.name // Ok
```


## 对象字面量类型 vs 接口类型


我们除了可以通过 Object 和 object 类型来描述对象之外，也可以通过对象的属性来描述对象：

```javascript
// Object literal type
let obj3: { prop: boolean };

// Interface
interface ObjectType {
  prop: boolean;
}

let obj4: ObjectType;
```

在 TypeScript 中有两种定义对象类型的方法，它们非常相似：

```javascript
// Object literal type
type ObjType1 = {
  a: boolean,
  b: number;
  c: string,
};

// Interface
interface ObjType2 {
  a: boolean,
  b: number;
  c: string,
}
```

在以上代码中，我们使用分号或逗号作为分隔符。尾随分隔符是允许的，也是可选的。好的，那么现在问题来了，对象字面量类型和接口类型之间有什么区别呢？下面我从以下几个方面来分析一下它们之间的区别：

## 内联

对象字面量类型可以内联，而接口不能：

```javascript
// Inlined object literal type:
function f1(x: { prop: number }) {}

function f2(x: ObjectInterface) {} // referenced interface
interface ObjectInterface {
  prop: number;
}
```

## 名称重复

含有重复名称的类型别名是非法的：

```javascript
// @ts-ignore: Duplicate identifier 'PersonAlias'. (2300)
type PersonAlias = {first: string};

// @ts-ignore: Duplicate identifier 'PersonAlias'. (2300)
type PersonAlias = {last: string};
```

> TypeScript 2.6 支持在 .ts 文件中通过在报错一行上方使用 `// @ts-ignore` 来忽略错误。
>
> `// @ts-ignore` 注释会忽略下一行中产生的所有错误。建议实践中在 `@ts-ignore`之后添加相关提示，解释忽略了什么错误。
>
> 请注意，这个注释仅会隐藏报错，并且我们建议你少使用这一注释。

相反，含有重复名称的接口将会被合并：

```javascript
interface PersonInterface {
  first: string;
}

interface PersonInterface {
  last: string;
}

const sem: PersonInterface = {
  first: 'Jiabao',
  last: 'Huang',
};
```

##  映射类型

对于映射类型（A行），我们需要使用对象字面量类型：

```javascript
interface Point {
  x: number;
  y: number;
}

type PointCopy1 = {
  [Key in keyof Point]: Point[Key]; // (A)
};

// Syntax error:
// interface PointCopy2 {
//   [Key in keyof Point]: Point[Key];
// };
```

## 多态 this 类型

多态 this 类型仅适用于接口：

```javascript
interface AddsStrings {
  add(str: string): this;
};

class StringBuilder implements AddsStrings {
  result = '';
  add(str: string) {
    this.result += str;
    return this;
  }
}
```

## type 和 interface的区别

1. type类型别名，可以定义基础类型，元组等
2. type不可以继承
3. type不会创建一个真正的新的类名
4. 类型别名无法被实现implements，而接口可以被派生类实现
5. 类型别名重名会抛出错误，接口重名是会产生合并



## 参考资源

- [the-object-type-in-typescript](https://mariusschulz.com/blog/the-object-type-in-typescript)
- [typing-objects-typescript](https://2ality.com/2020/01/typing-objects-typescript.html)
- [difference-between-object-and-in-typescript](https://stackoverflow.com/questions/49464634/difference-between-object-and-in-typescript)
