---
date: "2026-09-06 15:18:00"
title: operators-and-loops
categories:
  - Java
  - java
  - base
tags:
  - java
lastUpdated: "2026-09-06T10:46:57.598Z"
---

# Java 运算符、条件与循环

本文按“计算 → 判断 → 循环”的顺序整理。运算符用于计算、比较和更新数据；条件判断决定执行哪个分支；循环用于重复执行一段逻辑。

## 基本运算与赋值

`+`、`-`、`*`、`/`、`%` 用于数值运算。两个整数相除时会舍弃小数部分；只要有一个操作数是浮点数，结果才会保留小数。

```java
int total = 10 + 5;
int remainder = 10 % 3; // 1

int pageCount = 5 / 2; // 2
double average = 5 / 2.0; // 2.5
```

对应的 JavaScript 写法如下。注意：JavaScript 的 `number` 没有整数、浮点数之分，因此 `5 / 2` 直接得到 `2.5`。

```js
const total = 10 + 5;
const remainder = 10 % 3; // 1

const pageCount = 5 / 2; // 2.5
```

`=` 是赋值，`+=`、`-=` 等会基于原值更新变量。它们不是相等比较。

![Java 赋值与复合赋值运算符](/img/java-assignment-operators.webp)

```java
int stock = 10;
stock += 5; // 15
stock -= 2; // 13
```

```js
let stock = 10;
stock += 5; // 15
stock -= 2; // 13
```

### 自增、自减与运算顺序

`++`、`--` 分别表示加一和减一。单独作为一条语句时，前缀和后缀写法的效果相同；嵌入表达式时，后缀先取值再更新，前缀先更新再取值。

![Java 自增自减运算符](/img/java-increment-decrement-operators.webp)

```java
int count = 1;
int first = count++; // first 是 1，count 变为 2
int second = ++count; // count 先变为 3，second 是 3
```

```js
let count = 1;
const first = count++; // first 是 1，count 变为 2
const second = ++count; // count 先变为 3，second 是 3
```

复杂表达式中不要混用多个 `++`、`--`，拆成独立语句更容易阅读和排查问题。

## 比较与逻辑运算符

比较运算的结果是 `boolean`。逻辑运算符用于组合多个布尔值。

| 分类   | 运算符                    | 说明                                     |
| ------ | ------------------------- | ---------------------------------------- |
| 比较   | `>`、`>=`、`<`、`<=`      | 比较大小                                 |
| 相等   | `==`、`!=`                | 比较基本类型的值，或比较两个引用是否相同 |
| 逻辑与 | `&&`                      | 左右两边都为 `true` 时结果才为 `true`    |
| 逻辑或 | <code>&#124;&#124;</code> | 任意一边为 `true` 时结果为 `true`        |
| 逻辑非 | `!`                       | 反转布尔值                               |

`&&` 和 <code>&#124;&#124;</code> 都是短路运算：前半部分已经能确定结果时，后半部分不会执行。这可以避免空引用调用，但不应在逻辑表达式中依赖副作用。

```java
String userName = null;
boolean hasName = userName != null && !userName.isBlank();
```

```js
const userName = null;
const hasName = userName !== null && userName.trim() !== "";
```

字符串内容不要使用 `==`。`==` 比较引用是否相同，使用 `equals` 比较字符串内容；常量写在前面可以避免变量为 `null` 时抛出异常。

```java
String role = "admin";
boolean isAdmin = "admin".equals(role);
```

JavaScript 中字符串是原始值，比较内容时优先使用严格相等 `===`。

```js
const role = "admin";
const isAdmin = role === "admin";
```

## 三元运算符

三元运算符根据条件在两个值中选择一个，语法是 `条件 ? 条件为 true 时的值 : 条件为 false 时的值`。它适合简单的二选一赋值；分支逻辑复杂时使用 `if / else` 更清楚。

```java
int score = 82;
String result = score >= 60 ? "及格" : "不及格";

int max = 10 > 20 ? 10 : 20; // 20
```

Java 的两个结果表达式需要类型兼容。数值类型混用时可能发生自动类型提升，因此变量类型要能接收最终结果。

```java
boolean isVip = true;
double discount = isVip ? 0.8 : 1; // 1 自动提升为 double
```

对应的 JavaScript 写法相同，但其条件可以是任意真值/假值，Java 的条件必须是 `boolean`。

```js
const score = 82;
const result = score >= 60 ? "及格" : "不及格";

const isVip = true;
const discount = isVip ? 0.8 : 1;
```

不要连续嵌套三元运算符；当条件超过一个，或分支中有多步处理时，改用 `if / else`。

## 条件判断与 switch

条件判断根据 `boolean` 结果选择不同分支。条件只有两个简单结果时可用三元运算符；有范围判断或多步处理时使用 `if / else if / else` 更清楚。

### if / else if / else

`if` 从上到下判断，命中一个分支后会跳过其余分支。多个范围条件应按从严格到宽松的顺序编写。

```java
int score = 82;
String level;

if (score >= 90) {
    level = "优秀";
} else if (score >= 60) {
    level = "及格";
} else {
    level = "不及格";
}
```

Java 的条件必须是 `boolean`。例如 `if (score)` 是编译错误，不能把数字直接当成条件。

```js
const score = 82;
let level;

if (score >= 90) {
  level = "优秀";
} else if (score >= 60) {
  level = "及格";
} else {
  level = "不及格";
}
```

JavaScript 的 `if` 接受真值和假值，但跨语言编写时不要依赖 `0`、空字符串或 `null` 的隐式判断，显式比较更清晰。

### 传统 switch

`switch` 适合根据同一个值匹配多个固定分支，例如菜单、状态码或星期。传统写法的每个 `case` 通常都要写 `break`，否则会继续执行下一个分支。

#### switch 支持哪些类型

日常使用常量 `case` 的 `switch` 时，选择器通常使用整数相关类型、`String` 或枚举。`byte`、`short`、`char`、`int` 及其对应包装类型会按需要自动拆箱。

| 类型                                    | 是否支持                       | 示例或说明                                                |
| --------------------------------------- | ------------------------------ | --------------------------------------------------------- |
| `byte`、`short`、`char`、`int`          | 支持                           | `switch (status)`、`switch (grade)`                       |
| `Byte`、`Short`、`Character`、`Integer` | 支持                           | 使用时自动拆箱；值为 `null` 会抛出 `NullPointerException` |
| `String`                                | 支持                           | 适合菜单名、状态名等固定文本                              |
| `enum`                                  | 支持                           | 适合有限状态，例如订单状态、星期                          |
| `long`、`Long`                          | 不支持作为普通 `switch` 选择器 | 可用 `if / else`，或在确认范围后转换为 `int`              |
| `float`、`double` 及其包装类型          | 不支持                         | 浮点数精度问题使其不适合用固定 `case` 匹配                |
| `boolean`、`Boolean`                    | 不支持                         | 直接使用 `if / else`                                      |

```java
String role = "ADMIN";

switch (role) {
    case "ADMIN":
        System.out.println("管理员");
        break;
    default:
        System.out.println("普通用户");
}
```

从 Java 21 开始，结合模式匹配的增强 `switch` 还可以处理任意引用类型，并支持 `case null`；这属于比本节“固定值分支”更进阶的写法。无论使用哪种 `switch`，`boolean`、`long`、`float`、`double` 都不能作为选择器类型。[Java Language Specification §14.11](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11)

```java
int day = 2;
String dayName;

switch (day) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    default:
        dayName = "未知";
}
```

```js
const day = 2;
let dayName;

switch (day) {
  case 1:
    dayName = "星期一";
    break;
  case 2:
    dayName = "星期二";
    break;
  default:
    dayName = "未知";
}
```

两种语言的传统 `switch` 都会发生穿透：缺少 `break` 时会继续执行后续 `case`。只有明确需要合并多个分支时才省略 `break`。

```java
int month = 2;
String season;

switch (month) {
    case 12:
    case 1:
    case 2:
        season = "冬季";
        break;
    default:
        season = "其他季节";
}
```

### switch 表达式

Java 14 起可以使用 `->` 写 `switch` 表达式。它直接产生一个值，不会穿透分支，适合替代简单的“根据值赋值”的传统 `switch`。

```java
int day = 2;

String dayName = switch (day) {
    case 1 -> "星期一";
    case 2 -> "星期二";
    default -> "未知";
};
```

JavaScript 没有对应的内置 `switch` 表达式；简单场景可继续使用三元运算符，多个固定映射也可以使用对象。

```js
const day = 2;
const dayNames = { 1: "星期一", 2: "星期二" };
const dayName = dayNames[day] ?? "未知";
```

## for：已知循环次数

`for` 适合已知起始值、结束条件和步长的场景。循环变量通常只在循环体内使用。

```java
for (int index = 0; index < 3; index++) {
    System.out.println("第 " + (index + 1) + " 次执行");
}
```

```js
for (let index = 0; index < 3; index++) {
  console.log(`第 ${index + 1} 次执行`);
}
```

`for` 的三个部分依次是初始化、继续条件和每轮结束后的更新。数组下标从 `0` 开始，使用 `index < array.length`，不要写成 `<=`，否则会越界。

```java
String[] names = {"Tom", "Jack", "Rose"};

for (int index = 0; index < names.length; index++) {
    System.out.println(names[index]);
}
```

```js
const names = ["Tom", "Jack", "Rose"];

for (let index = 0; index < names.length; index++) {
  console.log(names[index]);
}
```

## 增强 for：遍历元素

增强 `for` 直接取得每个元素，适合只读取数组或集合元素的场景。

```java
String[] names = {"Tom", "Jack", "Rose"};

for (String name : names) {
    System.out.println(name);
}
```

Java 增强 `for` 对应 JavaScript 的 `for...of`。两者都直接遍历元素，而非下标。

```js
const names = ["Tom", "Jack", "Rose"];

for (const name of names) {
  console.log(name);
}
```

需要下标、需要按下标修改数组，或需要在遍历集合时安全删除元素时，不使用增强 `for`；应改用普通 `for` 或迭代器。

## forEach：回调式遍历

`forEach` 也是遍历元素的方式，但它接收一个回调（Java 中是 `Consumer` / Lambda），更适合“对每个元素执行同一件事”的简短操作。Java 集合实现了 `Iterable`，可以调用 `forEach`；数组本身不能直接调用它。

```java
import java.util.List;

List<String> names = List.of("Tom", "Jack", "Rose");

names.forEach(name -> System.out.println(name));
// 也可以使用方法引用：names.forEach(System.out::println);
```

JavaScript 的数组也提供 `forEach`，回调依次收到元素、下标和原数组。

```js
const names = ["Tom", "Jack", "Rose"];

names.forEach((name, index) => {
  console.log(`${index}: ${name}`);
});
```

| 场景               | Java `forEach`                                        | JavaScript `forEach`                                  |
| ------------------ | ----------------------------------------------------- | ----------------------------------------------------- |
| 常见对象           | `List`、`Set` 等 `Iterable` 集合                      | `Array`                                               |
| 回调参数           | 元素，例如 `name -> ...`                              | 元素、下标、原数组，例如 `(name, index) => ...`       |
| 返回值             | `void`                                                | `undefined`，回调的返回值会被忽略                     |
| 提前结束           | 不能使用 `break`；Lambda 中的 `return` 只结束当前回调 | 不能使用 `break`、`continue`；`return` 只结束当前回调 |
| 需要提前结束或跳过 | 使用普通 `for`、增强 `for` 或迭代器                   | 使用 `for...of`、`some`、`find` 等                    |

因此，`forEach` 不适合本篇前面“遇到空值就 `continue`、输出三条后 `break`”的场景。不要在 `forEach` 过程中结构性修改正在遍历的集合或数组；Java 的默认 `Iterable.forEach` 在修改底层元素来源时行为未定义，JS 也容易出现跳过元素等不易理解的结果。[Java `Iterable.forEach` 文档](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Iterable.html#forEach(java.util.function.Consumer)>)；[MDN `Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

### 综合示例：0 到 100 的求和

下面的示例使用 `for` 计算 `0 ~ 100` 的总和，并使用集合 `forEach` 计算偶数和与奇数和。传入 `101` 时，循环条件 `i < n` 正好处理 `0 ~ 100`。

```java
package com.itheima.loop;

import java.util.List;
import java.util.stream.IntStream;

public class LoopDemo {
    public static void main(String[] args) {
        printLoopDemo1(101);
        printLoopDemo2(101);
    }

    // 使用普通 for：计算 0 ~ n-1 的总和
    public static void printLoopDemo1(int n) {
        int sum = 0;

        for (int i = 0; i < n; i++) {
            sum += i;
        }

        System.out.println("总和：" + sum); // 5050
    }

    // 使用集合 forEach：计算 0 ~ n-1 的偶数和与奇数和
    public static void printLoopDemo2(int n) {
        List<Integer> numbers = IntStream.range(0, n).boxed().toList();
        int[] sums = {0, 0}; // 下标 0 存偶数和，下标 1 存奇数和

        numbers.forEach(number -> {
            if (number % 2 == 0) {
                sums[0] += number;
            } else {
                sums[1] += number;
            }
        });

        System.out.println("偶数和：" + sums[0]); // 2550
        System.out.println("奇数和：" + sums[1]); // 2500
    }
}
```

`for` 中的局部变量可以直接累加，所以求和场景通常更直观。`forEach` 的 Lambda 只能捕获最终或“实际最终”的局部变量，不能直接写 `evenSum += number`；示例用 `int[]` 保存可变结果只是为了说明这一限制。实际业务中，优先选择更清晰的普通 `for`，或者使用 Stream 的 `filter(...).sum()` 完成聚合。

## while 与 do-while：次数未知的循环

`while` 先判断条件，再决定是否执行循环体，适合重试、持续读取等次数未知的场景。

```java
int retryCount = 0;

while (retryCount < 3) {
    retryCount++;
}
```

```js
let retryCount = 0;

while (retryCount < 3) {
  retryCount++;
}
```

`do-while` 会先执行一次循环体，再检查条件；适合至少需要执行一次的场景。

```java
int attempt = 0;

do {
    attempt++;
} while (attempt < 1);
```

```js
let attempt = 0;

do {
  attempt++;
} while (attempt < 1);
```

循环条件中的变量必须在循环体内向结束方向变化，否则容易产生死循环。

## break 与 continue

`break` 立即结束当前循环；`continue` 跳过本轮剩余代码，直接进入下一轮。二者应当只用于让流程更清楚的场景。

```java
for (int number = 1; number <= 5; number++) {
    if (number == 3) {
        continue; // 跳过 3
    }

    if (number == 5) {
        break; // 结束循环，不处理 5
    }

    System.out.println(number); // 输出 1、2、4
}
```

```js
for (let number = 1; number <= 5; number++) {
  if (number === 3) {
    continue;
  }

  if (number === 5) {
    break;
  }

  console.log(number); // 输出 1、2、4
}
```

## 与 JavaScript 对照

两门语言的 `for`、`while`、`break`、`continue` 写法很接近，但数值运算、相等比较和循环条件的规则不同。下面以 Java 为主，标出迁移 JavaScript 经验时最容易踩坑的地方。

| 场景                 | Java                                                       | JavaScript                                                        | 需要注意                                                                      |
| -------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 整数除法             | `5 / 2` 的 `int` 结果是 `2`                                | `5 / 2` 的 `number` 结果是 `2.5`                                  | Java 需要至少一个浮点操作数才能保留小数；JS 的 `number` 默认就是浮点数。      |
| 相等比较             | `==` 比较基本类型值或引用是否相同；对象内容自行用 `equals` | 优先使用 `===`、`!==`；`==` 会进行隐式类型转换                    | Java 中的 `String` 内容用 `equals`，JS 字符串可用 `===`。                     |
| 逻辑运算             | `&&`、<code>&#124;&#124;</code>、`!` 的结果是 `boolean`    | 同样支持短路，但 `&&`、<code>&#124;&#124;</code> 会返回实际操作数 | JS 中 `value && value.name` 可能得到对象、空字符串或 `null`，不一定是布尔值。 |
| 循环条件             | 条件必须是 `boolean`                                       | 条件接受真值/假值，例如 `0`、`""`、`null` 为假                    | `while (count)` 在 Java 非法，在 JS 可以执行。                                |
| 普通 `for`           | `for (int i = 0; i < length; i++)`                         | `for (let i = 0; i < length; i++)`                                | 写法相近；Java 的循环变量有明确类型，JS 用 `let` 避免作用域问题。             |
| 遍历元素             | `for (String item : items)`                                | `for (const item of items)`                                       | 都适合读取元素；Java 是增强 `for`，JS 是 `for...of`。                         |
| 回调遍历             | `items.forEach(item -> ...)`                               | `items.forEach(item => ...)`                                      | 简短的逐项处理；不能用 `break`、`continue` 提前控制循环。                     |
| 遍历对象属性         | 通常通过 `Map`、对象方法或反射处理                         | `for (const key in object)` 可遍历可枚举属性                      | JS 的 `for...in` 面向属性名，不用于数组元素遍历。                             |
| `while` / `do-while` | 语法与含义固定，条件为布尔值                               | 语法相同，条件遵循真值/假值规则                                   | 两者都要确保循环变量会改变，避免死循环。                                      |
| `break` / `continue` | 可用于循环；`break` 也可退出 `switch`                      | 可用于循环；不能用来提前结束 `forEach` 回调                       | JS 需要提前结束遍历时，用 `for...of`、`some`、`find` 等替代 `forEach`。       |

## 综合练习：健康指标计算器

下面的练习将本篇知识点放入一个完整流程：读取并校验输入、完成数值计算、用条件判断生成结果，再循环输出建议。BMI 与 BMR 结果仅用于学习程序结构和运算，不应用作医疗诊断或个人健康建议。

```java
package com.itheima.demo;

import java.util.Scanner;

public class DemoTest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        calculateHealthIndex(scanner);
    }

    public static void calculateHealthIndex(Scanner scanner) {
        System.out.println("===== 健康指标计算器 =====");

        String gender = readGender(scanner);
        int age = readPositiveInt(scanner, "请输入年龄：");
        double weight = readPositiveDouble(scanner, "请输入体重（kg）：");
        double heightCm = readPositiveDouble(scanner, "请输入身高（cm）：");

        double bmi = calculateBmi(weight, heightCm);
        double bmr = calculateBmr(gender, age, weight, heightCm);
        String bmiResult = evaluateBmi(bmi);

        System.out.println("\n===== 计算结果 =====");
        System.out.println("BMI：" + String.format("%.2f", bmi));
        System.out.println("BMI 评估：" + bmiResult);
        System.out.println("BMR：" + String.format("%.2f", bmr) + " 千卡/天");
        printTips(bmiResult);
    }

    public static String readGender(Scanner scanner) {
        String gender;

        do {
            System.out.print("请输入性别（男/女）：");
            gender = scanner.next();

            if (!isSupportedGender(gender)) {
                System.out.println("输入无效，请输入男或女。");
            }
        } while (!isSupportedGender(gender));

        return gender;
    }

    public static boolean isSupportedGender(String gender) {
        return "男".equals(gender) || "女".equals(gender);
    }

    public static int readPositiveInt(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);

            if (scanner.hasNextInt()) {
                int value = scanner.nextInt();
                if (value > 0) {
                    return value;
                }
            } else {
                scanner.next(); // 丢弃非整数输入，避免死循环
            }

            System.out.println("请输入大于 0 的整数。");
        }
    }

    public static double readPositiveDouble(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);

            if (scanner.hasNextDouble()) {
                double value = scanner.nextDouble();
                if (value > 0) {
                    return value;
                }
            } else {
                scanner.next();
            }

            System.out.println("请输入大于 0 的数字。");
        }
    }

    public static double calculateBmi(double weightKg, double heightCm) {
        double heightM = heightCm / 100.0;
        return weightKg / (heightM * heightM);
    }

    public static double calculateBmr(String gender, int age, double weightKg, double heightCm) {
        if ("男".equals(gender)) {
            return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
        }

        return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
    }

    public static String evaluateBmi(double bmi) {
        int level = bmi < 18.5 ? 1 : bmi < 24 ? 2 : bmi < 28 ? 3 : 4;

        return switch (level) {
            case 1 -> "偏瘦";
            case 2 -> "正常";
            case 3 -> "偏胖";
            case 4 -> "肥胖";
            default -> "未知";
        };
    }

    public static void printTips(String bmiResult) {
        String[] tips = {"保持规律作息", "每周安排适量运动", "注意均衡饮食", ""};
        int availableCount = 0;

        // 增强 for 适合直接读取每个元素
        for (String tip : tips) {
            if (!tip.isBlank()) {
                availableCount++;
            }
        }

        System.out.println("可用建议数：" + availableCount);
        int displayed = 0;

        // 普通 for 适合同时使用数组下标和元素
        for (int index = 0; index < tips.length; index++) {
            String tip = tips[index];

            if (tip.isBlank()) {
                continue; // 跳过空内容
            }

            System.out.println("建议 " + (index + 1) + "：" + tip);
            displayed++;

            if (displayed >= 3) {
                break;
            }
        }

        // 传统 switch 适合固定值分支，注意每个 case 的 break
        switch (bmiResult) {
            case "偏瘦":
                System.out.println("提示：可关注营养摄入。");
                break;
            case "偏胖":
            case "肥胖":
                System.out.println("提示：可关注能量摄入与活动量。");
                break;
            default:
                System.out.println("提示：保持当前的健康习惯。");
        }
    }
}
```

这个示例中的关键点：

- `readGender` 使用 `do-while`，至少询问一次；`isSupportedGender` 通过 <code>&#124;&#124;</code> 判断是否命中“男”或“女”。
- `readPositiveInt`、`readPositiveDouble` 使用 `while (true)` 重试。`hasNextInt`、`hasNextDouble` 先校验类型，`scanner.next()` 丢弃错误输入，避免无限读取同一个值。
- `calculateBmi`、`calculateBmr` 展示 `+`、`-`、`*`、`/` 的数值运算；`evaluateBmi` 先用三元运算符划分等级，再由 `switch` 表达式返回文案。
- `printTips` 用增强 `for` 统计有效建议，再用普通 `for` 按下标编号输出；`continue` 跳过空字符串，`break` 在输出 3 条后结束循环。最后以传统 `switch` 展示 `case` 合并与 `break` 防穿透。
- `String.format("%.2f", value)` 将输出格式化为两位小数，但不会改变 `double` 本身的值。

## 小结

- 整数相除会舍弃小数；用 `2.0` 等浮点操作数参与运算才能得到小数结果。
- 三元运算符适合简单二选一赋值；Java 条件必须是 `boolean`，两个结果表达式必须类型兼容。
- `==` 比较引用是否相同，字符串内容用 `equals`；`&&`、<code>&#124;&#124;</code> 具有短路特性。
- `if / else if / else` 适合范围和复杂条件；`switch` 适合固定值分支，传统写法注意 `break`，Java 的 `switch` 表达式使用 `->` 可避免穿透。
- 已知次数用 `for`，只遍历元素用增强 `for`，简单逐项处理可用 `forEach`；次数未知用 `while`，至少执行一次用 `do-while`。
- `break` 结束当前循环，`continue` 跳过当前这一轮；循环条件要保证最终能够结束。
- 对照 JavaScript 时重点区分：Java 的循环条件必须是 `boolean`，JS 使用真值/假值；JS 优先使用 `===`，并且不在 `forEach` 回调中使用 `break`、`continue`。
