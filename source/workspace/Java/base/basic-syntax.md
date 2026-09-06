---
date: "2026-09-06 12:04:42"
title: basic-syntax
categories:
  - Java
  - java
  - base
tags:
  - java
lastUpdated: "2026-09-06T09:45:15.054Z"
---

# Java 基础语法

Java 程序由包、导入、类、方法和语句组成。代码通常从 `main` 方法开始执行，语句以分号结尾，代码块使用花括号包裹。

## 程序结构与入口

```java
public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

| 部分                     | 作用                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| `public class HelloJava` | 定义一个名为 `HelloJava` 的类；文件名通常也应为 `HelloJava.java` |
| `main` 方法              | Java 应用程序的入口方法                                          |
| `String[] args`          | 接收命令行参数；暂时可以先记住固定写法                           |
| `System.out.println`     | 输出内容并换行                                                   |

类名使用大驼峰，例如 `OrderService`；变量和方法使用小驼峰，例如 `orderCount`、`calculateTotal`。

实际项目中的类通常还会使用包和导入语句：`package` 表示类所属的包，`import` 用于使用其他包中的类型，例如后文的 `Scanner`。

```java
package com.itheima.scanner;

import java.util.Scanner;
```

`package` 必须位于源文件第一行（忽略注释和空行），`import` 位于 `package` 之后、类定义之前。

## 标识符、关键字与注释

注释只为阅读代码服务，不会参与程序执行。

```java
// 单行注释

/*
 * 多行注释
 */

/**
 * 文档注释，常用于类和公开方法。
 */
```

`class`、`public`、`static`、`if`、`return` 等是 Java 关键字，不能作为变量名。标识符可以由字母、数字、`_`、`$` 组成，但不能以数字开头；业务代码中避免使用 `$` 和含义不明确的缩写。

```java
int orderCount = 3;
// int 2count = 3; // 错误：不能以数字开头
```

## 类型转换

类型转换是将一个类型的值用于另一个兼容类型的过程。数值类型的转换分为自动类型转换和强制类型转换；`String` 与数值之间则需要使用对应的转换方法。

![Java 自动类型转换](/img/java-type-conversion.png)

### 自动类型转换

当目标类型能容纳原值时，Java 会自动转换。整数类型通常按 `byte → short → int → long → float → double` 扩大；`char` 可以自动转换为 `int`、`long`、`float` 或 `double`。

```java
byte quantity = 12;
int count = quantity; // byte 自动提升为 int

char initial = 'A';
int code = initial; // 65
```

自动转换不一定意味着完全无损。例如 `long` 转为 `float`、`double` 时，数值范围足够大，但低位精度可能丢失；金额计算仍应使用 `BigDecimal`。

### 表达式的自动类型提升

数值参与算术表达式时，Java 会先把范围较小的类型提升为能参与运算的较大类型，再计算结果。`byte`、`short` 和 `char` 即使单独参与 `+`、`-`、`*`、`/`、`%`，也会先提升为 `int`。

![Java 表达式的自动类型提升](/img/java-expression-type-promotion.png)

表达式的结果由参与运算的最高类型决定；其中 `byte`、`short`、`char` 的起点是 `int`，而不是彼此之间逐级提升。

```java
public class TypePromotionDemo {
    // 多类型混合运算：最终结果提升为 double
    public static double calc(int a, int b, double c, char letter) {
        // char 保存 Unicode 代码单元；'A' 的码值恰好是 65
        return a + b + c + letter;
    }

    // byte + byte 的运算结果是 int，所以返回类型是 int
    public static int calc2(byte a, byte b) {
        return a + b;
    }

    // 若需要 byte 结果，必须显式强制转换
    public static byte calc3(byte a, byte b) {
        return (byte) (a + b);
    }

    public static void main(String[] args) {
        double mixedResult = calc(1, 2, 3.5, 'A');
        System.out.println(mixedResult); // 71.5

        byte num1 = 10;
        byte num2 = 20;
        int intResult = calc2(num1, num2);
        byte byteResult = calc3(num1, num2);

        System.out.println(intResult); // 30
        System.out.println(byteResult); // 30

        char ch1 = 'A';
        char ch2 = 'B';
        int charSum = ch1 + ch2; // 65 + 66 = 131

        short s1 = 30;
        short s2 = 40;
        int shortSum = s1 + s2; // 70

        byte b1 = 100;
        byte b2 = 100;
        byte overflow = (byte) (b1 + b2);
        System.out.println(overflow); // -56
    }
}
```

上例中 `charSum` 与 `shortSum` 都是 `int`。`100 + 100` 的结果是 `200`，超出 `byte` 的 `-128 ~ 127` 范围；强制转换只保留低 8 位，因此 `overflow` 是 `-56`，不是 `200`。

![Java 表达式自动类型提升小结](/img/java-expression-type-promotion-summary.png)

常量表达式是一个例外：如果编译器能在编译期确定结果，并且结果没有超出目标类型范围，允许直接赋值给 `byte`、`short` 或 `char`。

```java
byte value = 10 + 20; // 编译期可确定为 30，允许赋值
// byte result = first + second; // 编译错误，变量相加的结果是 int
```

### 强制类型转换

从范围较大的类型转换为范围较小的类型时，必须在前面写目标类型。转换可能发生截断或溢出，使用前应确认数值范围。

![Java 强制类型转换](/img/java-forced-type-conversion.png)

```java
int total = 130;
byte smallTotal = (byte) total; // -126，发生溢出

double price = 19.9;
int integerPrice = (int) price; // 19，直接舍弃小数部分
```

### 字符串与数值转换

`String` 不是数值类型，不能通过强制转换变成数字。解析外部输入时使用包装类的 `parseXxx` 方法；拼接文本时使用 `String.valueOf` 或字符串拼接。

```java
String input = "42";
int age = Integer.parseInt(input);

double ratio = Double.parseDouble("3.14");
String ageText = String.valueOf(age);
```

解析失败会抛出 `NumberFormatException`，所以用户输入、请求参数等不可信数据应先校验格式，或在合适的位置处理异常。

## 控制台输入：Scanner 与 Node.js 对照

Java 使用 JDK 提供的 `Scanner` 从标准输入流 `System.in` 读取内容。`next()` 读取一个以空白字符分隔的单词，`nextLine()` 读取整行；年龄这类数值输入可以使用 `nextInt()`。

```java
package com.itheima.scanner;

import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        printUserInfo();
    }

    public static void printUserInfo() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("请输入用户名：");
        String username = scanner.nextLine();

        System.out.print("请输入年龄：");
        int age = scanner.nextInt();

        System.out.println("用户名：" + username);
        System.out.println("年龄：" + age);
    }
}
```

`nextInt()` 输入的不是整数时会抛出 `InputMismatchException`。学习阶段可先保证输入正确；实际程序应先检查 `scanner.hasNextInt()`，或先读取字符串后再自行解析。这里不关闭 `scanner`，因为关闭它会同时关闭 `System.in`；若程序后续还需要读取控制台输入，就不能继续使用该输入流。

Node.js 中可用内置的 `node:readline/promises` 创建命令行输入接口。`question()` 返回的始终是字符串，需要自行转换并校验年龄。[Node.js Readline 文档](https://nodejs.org/api/readline.html)

```js
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function printUserInfo() {
  const rl = readline.createInterface({ input, output });

  try {
    const username = await rl.question("请输入用户名：");
    const ageText = await rl.question("请输入年龄：");
    const age = Number.parseInt(ageText, 10);

    if (Number.isNaN(age)) {
      throw new Error("年龄必须是整数");
    }

    console.log(`用户名：${username}`);
    console.log(`年龄：${age}`);
  } finally {
    rl.close();
  }
}

printUserInfo();
```

| 目的         | Java                                   | Node.js                                       |
| ------------ | -------------------------------------- | --------------------------------------------- |
| 创建输入工具 | `new Scanner(System.in)`               | `readline.createInterface({ input, output })` |
| 读取用户名   | `scanner.nextLine()`                   | `await rl.question()`                         |
| 读取整数     | `scanner.nextInt()`                    | `Number.parseInt(await rl.question(), 10)`    |
| 结束输入     | 不再使用即可；避免过早关闭 `System.in` | 调用 `rl.close()`                             |

## 方法

方法将可复用的一段逻辑命名。方法名以动词开头，参数描述输入，返回值描述输出；没有返回值时使用 `void`。

```java
public static int calculateTotal(int price, int quantity) {
    return price * quantity;
}

public static void printWelcome(String userName) {
    System.out.println("欢迎，" + userName);
}
```

### 方法可以返回哪些类型

除 `void` 外，Java 方法可以返回任意有效的 Java 类型：8 种基本类型、类和接口、数组、枚举、记录（`record`）以及带泛型参数的类型。返回类型写在方法名之前，`return` 的结果必须与它兼容。

| 返回类型       | 示例                            | 适用场景                               |
| -------------- | ------------------------------- | -------------------------------------- |
| 基本类型       | `int getCount()`                | 数量、状态、计算结果等单个值           |
| `boolean`      | `boolean isValid()`             | 条件判断、校验结果                     |
| 类或接口       | `User findUser()`               | 返回一个对象；找不到时可能返回 `null`  |
| 数组           | `String[] getTags()`            | 返回固定顺序的一组同类型数据           |
| 集合与泛型     | `List<User> findUsers()`        | 返回可变数量的数据；通常用接口类型声明 |
| `Optional<T>`  | `Optional<User> findUserById()` | 返回“可能存在、也可能不存在”的单个结果 |
| 枚举、`record` | `OrderStatus getStatus()`       | 返回有限状态或结构化的不可变数据       |
| `void`         | `void save(User user)`          | 只执行操作，不向调用方返回结果         |

```java
import java.util.List;
import java.util.Optional;

public static boolean isAdult(int age) {
    return age >= 18;
}

public static String[] getTags() {
    return new String[] {"Java", "基础"};
}

public static List<String> getRoles() {
    return List.of("USER", "ADMIN");
}

public static Optional<String> findName(boolean exists) {
    return exists ? Optional.of("wangke") : Optional.empty();
}
```

`void` 不代表方法没有结果，只表示它不通过 `return` 把结果交给调用方。例如保存数据、发送消息或修改传入对象都可以使用 `void`。只有 `void` 方法可以使用 `return;` 提前结束；带返回值的方法在每条可能的执行路径上都必须返回与声明类型兼容的值。

调用方法时，传入的参数会赋值给形参。Java 始终是值传递：基本类型传递值本身；对象作为参数时，传递的是引用值的副本，因此可以通过该引用修改对象内容。

```java
public static void increaseAge(User user) {
    user.setAge(user.getAge() + 1);
}
```

## 小结

- Java 从 `main` 方法开始执行，语句以 `;` 结尾，代码块使用 `{}`。
- `package` 声明类所属包，`import` 导入其他包中的类型；类名使用大驼峰，变量和方法使用小驼峰，关键字不能作为标识符。
- 字符串内容使用 `equals` 比较，不使用 `==`。
- 范围由小到大的数值类型可自动转换；缩小范围必须强制转换，可能截断或溢出；`String` 与数值之间使用 `parseXxx`、`String.valueOf` 等方法转换。
- `Scanner` 用于读取 Java 控制台输入；Node.js 可用 `node:readline/promises` 完成同类交互，二者都需要对外部输入做校验。
- 方法可返回基本类型、对象、数组、集合、泛型类型等；`void` 表示不返回结果给调用方。
- 方法通过参数接收输入、通过 `return` 返回结果；Java 的参数传递始终是值传递。
