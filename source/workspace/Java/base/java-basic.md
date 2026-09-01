---
date: "2026-08-12 10:00:00"
title: data-types
categories:
  - Java
  - java
  - base
tags:
  - java
lastUpdated: "2026-09-01T10:21:04.020Z"
---

# Java 数据类型与变量

Java 是静态类型语言。变量先声明类型，赋值时会做类型检查；基础数据类型直接保存值，`String`、数组和对象则保存引用。

## 变量声明与赋值

![Java 变量声明](/img/java-variable-declaration.png)

变量可以理解为程序中保存数据的名称。声明时要明确数据类型，变量名通常使用小驼峰命名，并且应表达数据的含义。

```java
数据类型 变量名 = 数据;

int age = 18;
String userName = "wangke";
```

同一个变量只能保存与声明类型兼容的值：`int age` 用于整数，不能直接赋值为字符串。变量声明后也可以稍后再赋值。

```java
int age;
age = 18;
```

## 变量如何存储

“变量是一个盒子”适合入门理解，但实际运行时要区分变量保存的是值，还是指向对象的引用。

| 类型         | 示例                     | 变量中保存的内容 | 常见位置                         |
| ------------ | ------------------------ | ---------------- | -------------------------------- |
| 基本数据类型 | `int age = 18`           | 数据本身         | 局部变量位于当前方法的栈帧中     |
| 引用类型     | `User user = new User()` | 对象的引用       | 局部引用在栈帧中，对象通常在堆中 |

```java
int age = 18;

User user = new User("wangke");
```

`age` 直接保存 `18`。`user` 保存的是对 `User` 对象的引用；对象里的 `name` 等字段由对象本身持有。给一个引用变量赋值给另一个变量时，复制的是引用，两者会指向同一个对象。

```java
User first = new User("wangke");
User second = first;

second.setName("coder");
// first.getName() 也会得到 "coder"
```

方法调用时，局部变量会进入当前方法的栈帧；`new` 创建的对象通常分配在堆中，并由垃圾回收器在对象不再可达时回收。这里的“通常”很重要：JVM 可以通过逃逸分析等优化改变实际分配位置，所以不要依赖具体内存地址写业务代码。

`String`、数组、集合和自定义类都属于引用类型。字符串内容不可变，修改字符串实际上会得到新的 `String` 对象。

```java
String title = "Java";
title = title + " 基础"; // title 指向新的字符串对象
```

## 字面量与基本类型

字面量就是直接写在代码中的值，例如 `100`、`3.14F`、`true`、`"Hello"`。

| Java 类型 |     大小 | 字面量示例      | 说明                             |
| --------- | -------: | --------------- | -------------------------------- |
| `byte`    |   1 字节 | `100`           | 范围 `-128 ~ 127`                |
| `short`   |   2 字节 | `30000`         | 较少直接使用                     |
| `int`     |   4 字节 | `2147483647`    | 默认整数类型                     |
| `long`    |   8 字节 | `10000000000L`  | 整数字面量加 `L`                 |
| `float`   |   4 字节 | `3.14F`         | 浮点字面量加 `F`，精度有限       |
| `double`  |   8 字节 | `3.1415926535`  | 默认浮点类型                     |
| `char`    |   2 字节 | `'A'`、`'中'`   | 一个 UTF-16 代码单元，使用单引号 |
| `boolean` |        — | `true`、`false` | 只能是两个布尔值                 |
| `String`  | 引用类型 | `"Hello World"` | 字符串，使用双引号               |

> `boolean` 的实际存储布局由 JVM 实现决定，不要把它当作固定字节数使用。

## 分类型示例

下面的变量以订单和用户信息为例。每段只说明一种类型，不通过连续打印来展示。

### `byte`

```java
byte orderStatus = 1; // 1：待支付，2：已支付
```

适合保存取值范围很小的状态值。日常业务中更常见的做法是使用枚举表达状态含义。

### `short`

```java
short stockQuantity = 32000;
```

可表示较小的整数范围，但 Java 开发里通常直接使用 `int`，只有明确需要节省存储时才考虑它。

### `int`

```java
int age = 18;
```

`int` 是默认整数类型，计数、年龄、页码等普通整数优先使用它。

### `long`

```java
long orderId = 10000000000L;
```

订单号、雪花 ID、毫秒时间戳等可能超过 `int` 范围的整数使用 `long`。字面量末尾要加大写 `L`。

### `float`

```java
float temperature = 36.5F;
```

`float` 精度较低，字面量必须带 `F`。涉及金额时不要使用 `float` 或 `double`，应使用 `BigDecimal`。

### `double`

```java
double latitude = 31.2304;
```

`double` 是默认的小数类型，适合坐标、比例等允许精度误差的场景。

### `BigDecimal`

`BigDecimal` 是处理金额、税率、折扣等精确十进制数的常用类型。它不是基本数据类型，位于 `java.math` 包中。

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

BigDecimal price = new BigDecimal("19.90");
BigDecimal quantity = BigDecimal.valueOf(3);
BigDecimal total = price.multiply(quantity); // 59.70

BigDecimal discount = new BigDecimal("0.85");
BigDecimal payable = total.multiply(discount); // 50.7450
BigDecimal finalPrice = payable.setScale(2, RoundingMode.HALF_UP); // 50.75
```

金额不要写成 `new BigDecimal(19.90)`，`double` 本身可能已经带有二进制浮点误差。优先传入字符串；整数和 `long` 也可以使用 `BigDecimal.valueOf`。

```java
BigDecimal amount = new BigDecimal("0.1");
BigDecimal result = amount.add(new BigDecimal("0.2")); // 0.3
```

`BigDecimal` 是不可变对象，运算结果需要重新接收；不能直接使用 `+`、`-`、`*`、`/`。

| 目的       | 方法        | 示例                                           |
| ---------- | ----------- | ---------------------------------------------- |
| 加法       | `add`       | `amount.add(fee)`                              |
| 减法       | `subtract`  | `amount.subtract(coupon)`                      |
| 乘法       | `multiply`  | `price.multiply(quantity)`                     |
| 除法       | `divide`    | `total.divide(count, 2, RoundingMode.HALF_UP)` |
| 比较大小   | `compareTo` | `amount.compareTo(BigDecimal.ZERO) > 0`        |
| 保留小数位 | `setScale`  | `amount.setScale(2, RoundingMode.HALF_UP)`     |

比较数值大小使用 `compareTo`，不要用 `equals`。`equals` 还会比较小数位数，`1.0` 与 `1.00` 的数值相同，但 `equals` 结果为 `false`。

```java
BigDecimal first = new BigDecimal("1.0");
BigDecimal second = new BigDecimal("1.00");

boolean sameValue = first.compareTo(second) == 0; // true
boolean sameScale = first.equals(second); // false
```

### `char`

```java
char initial = 'W';
char letter = 65; // Unicode 编码 65 对应 A
```

`char` 只能保存一个 UTF-16 代码单元，使用单引号。实际业务文本通常使用 `String`。

### `boolean`

```java
boolean isVip = true;
```

布尔值只表示“是/否”或“开/关”两种状态，不要用 `0`、`1` 替代。

### `String`

```java
String userName = "wangke";
String remark = "";
```

`String` 用双引号表示，可以保存多个字符；空字符串 `""` 有值但长度为 `0`，与 `null` 不同。

## 与 JavaScript、TypeScript 对比

| 场景     | Java                                | JavaScript                          | TypeScript                             |
| -------- | ----------------------------------- | ----------------------------------- | -------------------------------------- |
| 整数     | `byte`、`short`、`int`、`long` 分开 | 通常都是 `number`                   | 运行时同 JS，类型标注一般也是 `number` |
| 小数     | `float`、`double` 分开              | `number`                            | `number`                               |
| 精确小数 | `BigDecimal`，适合金额计算          | 无内置十进制类型，常借助 decimal 库 | 运行时同 JS，通常借助 decimal 库       |
| 大整数   | `long`，字面量写 `L`                | `BigInt`，字面量写 `n`              | `bigint`，运行时是 JS `BigInt`         |
| 字符     | `char` 表示单个 UTF-16 代码单元     | 没有 `char`，单个字符也是 `string`  | 同 JS，使用 `string`                   |
| 字符串   | `String` 是引用类型                 | `string` 是原始类型                 | `string` 是静态类型标注                |
| 布尔值   | `boolean`，不能当数字使用           | `boolean`，但条件判断会发生真值转换 | `boolean`；编译期能约束类型            |
| 类型检查 | 编译时和运行时都有明确类型          | 运行时动态决定                      | 编译期检查，编译后仍是 JavaScript      |

```java
int count = 1;
// count = "1"; // 编译错误
```

```ts
let count: number = 1;
// count = "1"; // TypeScript 编译错误
```

```js
let count = 1;
count = "1"; // 可以执行，变量类型在运行时改变
```

## 转义字符

| 写法 | 含义   | 示例                 |
| ---- | ------ | -------------------- |
| `\t` | 制表符 | `姓名\t年龄`         |
| `\n` | 换行   | `第一行\n第二行`     |
| `\"` | 双引号 | `他说\"你好\"`       |
| `\\` | 反斜杠 | `C:\\Users\\Desktop` |

Java、JavaScript 和 TypeScript 都支持这些常见转义字符。Java 中字符串使用双引号、字符使用单引号；JS/TS 的单引号和双引号都用于字符串。

## 容易混淆的点

1. `10000000000` 默认按 `int` 处理，超出范围；写成 `10000000000L` 才是 `long`。
2. `3.14` 默认是 `double`；赋给 `float` 时必须写 `3.14F`。
3. `char` 可以接收数值编码，但不是“数字字符”。`char c = 65` 的结果是 `A`，`'65'` 则不是合法的 `char` 字面量。
4. `String` 不是基本数据类型。比较字符串内容使用 `equals`，不要使用 `==`。

```java
String a = new String("java");
String b = new String("java");

boolean sameReference = a == b;      // false，比较引用地址
boolean sameContent = a.equals(b);   // true，比较字符串内容
```
