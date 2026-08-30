---
date: "2023-06-16 06:02:23"
title: heap_stack
categories:
  - Js
tags:
  - Js
  - Java
lastUpdated: "2026-08-30T16:47:07.753Z"
---

# 堆内存、栈内存与数据类型

堆和栈用于帮助理解程序运行时的数据管理：方法调用有自己的执行空间，对象通常需要更灵活的内存空间。它们是很有用的模型，但不要把“基本类型一定在栈、引用类型一定在堆”当成所有引擎和 JVM 都严格遵守的规则。

## 先区分：值与引用

基本类型变量保存数据值；引用类型变量保存一个能找到对象的引用。把引用赋给另一个变量时，复制的是引用，因此两个变量可能指向同一个对象。

```js
const user = { name: "wangke" };
const admin = user;

admin.name = "coder";
// user.name 也是 "coder"
```

```java
User user = new User("wangke");
User admin = user;

admin.setName("coder");
// user.getName() 也是 "coder"
```

相反，基本类型赋值会复制值本身，之后修改其中一个变量不会影响另一个。

```js
let first = 18;
let second = first;
second = 20;
// first 仍然是 18
```

## 栈、堆与垃圾回收

| 区域/概念            | 主要作用                           | 与代码的关系                                      |
| -------------------- | ---------------------------------- | ------------------------------------------------- |
| 调用栈（call stack） | 管理函数或方法的调用顺序           | 函数调用会创建执行上下文；Java 方法调用会创建栈帧 |
| 栈帧（stack frame）  | 保存一次调用所需的局部数据         | 局部变量、参数、返回位置等属于当前调用的上下文    |
| 堆（heap）           | 存放动态创建、生命周期不固定的数据 | 对象、数组、集合等通常在这里分配                  |
| 垃圾回收（GC）       | 回收不再可达的对象                 | JS 引擎和 JVM 都自动管理，不需要手动 `free`       |

```text
调用方法 / 函数
        ↓
创建栈帧：局部变量与参数
        ↓
创建对象：局部变量保存对象引用
        ↓
方法结束：栈帧退出
        ↓
对象没有任何可达引用时，后续由 GC 回收
```

![堆、栈与基本类型、引用类型的关系](/img/heap-stack-data-types.png)

图中以 Java 代码举例，但“基本值复制、引用值复制、对象由 GC 回收”的理解同样适用于 JavaScript。引用变量本身保存的是引用值，修改对象内部状态会影响所有指向该对象的引用变量。

JavaScript 规范没有规定变量必须放在某一块真实内存中；不同引擎会做优化。Java 的 JVM 也可能通过逃逸分析调整对象分配位置。因此下面的“栈/堆”应理解为常见运行时模型，而不是依赖内存地址的编程规则。

## JavaScript：基本类型与引用类型

JavaScript 的原始值（primitive values）有 7 种：

![JavaScript 数据类型分类](/img/javascript-data-types.png)

| 分类   | 类型        | 示例                     | 特点                       |
| ------ | ----------- | ------------------------ | -------------------------- |
| 原始值 | `undefined` | `let value;`             | 未赋值时的默认值           |
| 原始值 | `null`      | `const selected = null`  | 表示“明确没有对象”         |
| 原始值 | `boolean`   | `true`                   | 真/假                      |
| 原始值 | `number`    | `3.14`、`NaN`            | 整数和小数共用一种数值类型 |
| 原始值 | `bigint`    | `123n`                   | 任意精度整数               |
| 原始值 | `string`    | `"Java"`                 | 字符串是原始值，且不可变   |
| 原始值 | `symbol`    | `Symbol("id")`           | 常用作唯一对象键           |
| 引用值 | `object`    | `{}`、`[]`、`new Date()` | 变量保存对象引用           |
| 引用值 | `function`  | `function run() {}`      | 函数也是对象，可赋值和传参 |

```js
const profile = { name: "wangke" };
profile.name = "coder"; // 可以修改对象内部状态

// profile = {}; // const 不允许变量重新绑定到另一个对象
```

`const` 约束的是变量绑定不能重新赋值，不会让对象深度不可变；`let` 和 `const` 的重复声明报错来自词法作用域规则，不是“遍历栈内存查重”。

> 图中“基本类型存储在栈、引用类型存储在堆”用于入门理解。JavaScript 规范没有规定真实内存布局，具体实现由运行时引擎决定。

## Java：基本类型与引用类型

Java 是静态类型语言，变量声明时必须确定类型。8 个基本数据类型直接表示数值；其余类型都属于引用类型。

![Java 数据类型分类](/img/java-data-types.png)

| 分类     | 类型                           | 常见用途                          |
| -------- | ------------------------------ | --------------------------------- |
| 基本类型 | `byte`、`short`、`int`、`long` | 不同范围的整数                    |
| 基本类型 | `float`、`double`              | 小数；金额计算应使用 `BigDecimal` |
| 基本类型 | `char`                         | 一个 UTF-16 代码单元              |
| 基本类型 | `boolean`                      | 逻辑真/假                         |
| 引用类型 | `String`、数组                 | 文本和有序数据                    |
| 引用类型 | 类、接口、枚举、集合           | 自定义对象、抽象能力、业务数据    |
| 引用类型 | 包装类，如 `Integer`           | 泛型、集合、可空值场景            |

> 图中的 `String` 只是引用类型示例。数组、类、接口、枚举、集合和包装类等同样都是引用类型；`boolean` 的实际内存布局由 JVM 实现决定，不能简单按固定 1 字节理解。

```java
int age = 18;                    // 基本类型：保存数值
String name = "wangke";          // 引用类型：保存 String 对象的引用
int[] scores = { 90, 95, 100 };  // 引用类型：保存数组对象的引用
```

Java 的 `String` 是引用类型且内容不可变；比较字符串内容用 `equals`，`==` 比较的是两个引用是否指向同一对象。

```java
String first = new String("java");
String second = new String("java");

boolean sameReference = first == second;      // false
boolean sameContent = first.equals(second);   // true
```

## JavaScript 与 Java 对照

| 场景       | JavaScript                     | Java                                        |
| ---------- | ------------------------------ | ------------------------------------------- |
| 类型系统   | 动态类型，运行时决定值的类型   | 静态类型，编译期检查变量类型                |
| 整数与小数 | 通常都用 `number`              | 按范围和精度区分 `int`、`long`、`double` 等 |
| 字符串     | `string` 是原始值              | `String` 是引用类型                         |
| 对象和数组 | 都是引用值                     | 都是引用类型                                |
| 传参方式   | 按值传递；对象引用这个值被复制 | 按值传递；对象引用这个值被复制              |
| 回收机制   | 引擎 GC 回收不可达对象         | JVM GC 回收不可达对象                       |

“对象引用被复制”并不等于“按引用传递”。两种语言传递参数时复制的都是变量当前保存的值；当这个值恰好是对象引用时，函数内外就能通过不同变量修改同一个对象。

```js
function rename(user) {
  user.name = "coder"; // 修改同一对象
  user = { name: "new user" }; // 只改变函数内的变量
}
```

```java
void rename(User user) {
    user.setName("coder"); // 修改同一对象
    user = new User("new user"); // 只改变方法内的引用变量
}
```

## 常见误区

1. 不要用“基本类型在栈、引用类型在堆”解释所有细节。它适合入门，但实现会随引擎、JVM 和优化策略变化。
2. 对象不再被变量名引用，不代表立即释放；GC 会在合适的时机回收不可达对象。
3. `null` 是 JavaScript 原始值，但 `typeof null === "object"` 是历史遗留行为。
4. JS 的 `string` 是原始值，Java 的 `String` 是引用类型；两者都具有不可变特性。
5. Java 金额计算不要使用 `float`、`double`，应使用 `BigDecimal`。
