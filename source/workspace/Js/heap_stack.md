---
date: "2023-06-16 06:02:23"
title: heap_stack
categories:
  - Js
tags:
  - Js
  - Java
lastUpdated: "2026-09-01T10:21:04.020Z"
---

# 堆内存、栈内存与数据类型

学堆和栈，重点不是记住数据一定放在哪里，而是弄清两件事：函数调用结束后，局部变量为什么会失效；两个变量为什么有时会互相影响。

## 先记住：复制值，还是共用对象

普通值赋给另一个变量时，复制的是值本身。后面改 `second`，不会影响 `first`。

```js
let first = 18;
let second = first;

second = 20;
// first 还是 18
```

对象不一样。赋值时复制的是“找到这个对象的引用”，所以两个变量会指向同一个对象。

```js
const user = { name: "wangke" };
const admin = user;

admin.name = "coder";
// user.name 也是 "coder"
```

Java 也是同样的现象：基本类型复制值，引用类型复制引用。

```java
User user = new User("wangke");
User admin = user;

admin.setName("coder");
// user.getName() 也是 "coder"
```

## 堆和栈是怎么配合的

调用函数或方法时，会创建一块临时的调用空间，通常称为栈帧。参数和局部变量跟着这次调用存在；调用结束，栈帧就退出。

对象、数组、集合这类大小和生命周期不固定的数据，通常由堆管理。只要还有变量能访问对象，它就会继续存在；没有任何可达引用后，JavaScript 引擎或 JVM 会在合适的时机用 GC 回收它。

```text
调用函数 / 方法
        ↓
创建本次调用的局部变量和参数
        ↓
创建对象，变量保存对象的引用
        ↓
调用结束，局部变量退出
        ↓
对象不再可达，等待 GC 回收
```

![堆、栈与基本类型、引用类型的关系](/img/heap-stack-data-types.png)

“基本类型在栈、引用类型在堆”适合先建立概念，但不是语言规范保证的固定规则。JavaScript 引擎和 JVM 都会根据运行情况做优化，不需要也不应该依赖真实内存位置写代码。

## JavaScript：原始值和对象

JavaScript 有 7 种原始值：`undefined`、`null`、`boolean`、`number`、`bigint`、`string`、`symbol`。对象、数组、函数都属于对象相关的引用值。

![JavaScript 数据类型分类](/img/javascript-data-types.png)

`const` 只是不允许变量重新指向另一个值，不代表对象不能修改。

```js
const profile = { name: "wangke" };
profile.name = "coder"; // 可以修改对象内容

// profile = {}; // 不允许重新赋值
```

还有一点容易混淆：`null` 是原始值，但 `typeof null === "object"` 是 JavaScript 的历史遗留行为。

## Java：基本类型和引用类型

Java 有 8 种基本类型：`byte`、`short`、`int`、`long`、`float`、`double`、`char`、`boolean`。`String`、数组、类实例、集合、包装类等都属于引用类型。

![Java 数据类型分类](/img/java-data-types.png)

```java
int age = 18;                    // 基本类型
String name = "wangke";          // 引用类型
int[] scores = { 90, 95, 100 };  // 引用类型
```

Java 的 `String` 是引用类型，但内容不可变。比较字符串内容用 `equals`，`==` 比较的是不是同一个对象。

```java
String first = new String("java");
String second = new String("java");

first == second;        // false
first.equals(second);   // true
```

## JavaScript 和 Java 的区别

| 场景       | JavaScript           | Java                |
| ---------- | -------------------- | ------------------- |
| 类型检查   | 运行时决定值的类型   | 编译时检查变量类型  |
| 字符串     | `string` 是原始值    | `String` 是引用类型 |
| 对象和数组 | 都是对象相关的引用值 | 都是引用类型        |
| 参数传递   | 按值传递             | 按值传递            |
| 内存回收   | 引擎 GC              | JVM GC              |

两门语言都按值传递。传对象时，复制的是引用这个值，所以可以在函数里修改同一个对象；但给参数重新赋一个对象，不会改变外面的变量。

```js
function rename(user) {
  user.name = "coder"; // 改到原对象
  user = { name: "new user" }; // 只改函数内的变量
}
```

## 小结

1. 基本值赋值后互不影响；对象赋值后可能共用同一个对象。
2. 栈和堆是帮助理解运行过程的模型，不要把它当成固定内存规则。
3. JavaScript 的 `string` 是原始值，Java 的 `String` 是引用类型。
4. JavaScript 和 Java 传参都是按值传递。
