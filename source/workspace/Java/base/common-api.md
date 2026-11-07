---
date: 2026-11-07T13:39:41.000Z
title: Java 常用API
categories:
  - Java
tags:
  - java
lastUpdated: "2026-11-07T14:09:27.219Z"
---

# Java 常用API

## StringBuilder、StringBuffer、StringJoiner

这三个类都可以帮助我们拼接字符串：

- `StringBuilder`：适合多次追加、修改字符串。
- `StringBuffer`：用法与 `StringBuilder` 类似，单个方法有同步保护。
- `StringJoiner`：适合用分隔符连接多个字符串，例如 `张三, 李四, 王五`。

### StringBuilder

`String` 的内容不可变；`StringBuilder` 的内容可以修改。循环中需要多次拼接时，可以先使用 `StringBuilder`，完成后再调用 `toString()` 得到字符串。

![StringBuilder 常用方法](/img/java-stringbuilder-methods.png)

```java
public class StringBuilderDemo1 {
    /*
        StringBuilder 知识点：
        1. new StringBuilder()：创建空容器。
        2. append(内容)：在末尾追加内容，返回当前对象，可以连续调用。
        3. length()：获取当前内容长度。
        4. reverse()：反转当前内容。
        5. toString()：转换为 String。
    */
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();

        // 连续追加内容，append 返回的仍然是 sb。
        sb.append("Java").append(" API");
        System.out.println(sb);          // Java API
        System.out.println(sb.length()); // 8

        sb.reverse();
        System.out.println(sb);          // IPA avaJ

        String result = sb.toString();
        System.out.println(result);      // IPA avaJ
    }
}
```

也可以使用 `new StringBuilder("Java")` 创建带初始内容的容器。`insert(位置, 内容)` 可以插入内容，`delete(开始, 结束)` 可以删除内容；删除范围包含开始位置，不包含结束位置。

#### 小案例：循环拼接数字

下面分别用 `String` 和 `StringBuilder` 拼接数字。程序只输出结果长度和耗时，避免打印大量内容影响计时。

```java
public class StringBuilderDemo2 {
    /*
        多次拼接时：
        1. String 内容不可变，循环中的 += 会不断产生新的字符串。
        2. StringBuilder 可以反复向同一个容器追加内容。
        3. 耗时受设备、JVM 和运行环境影响，每次结果都可能不同。
    */
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        String text = "";
        for (int i = 1; i <= 10000; i++) {
            text += i;
        }
        long end = System.currentTimeMillis();
        System.out.println("String 长度：" + text.length());
        System.out.println("String 耗时：" + (end - start) + " 毫秒");

        start = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 10000; i++) {
            sb.append(i);
        }
        String result = sb.toString();
        end = System.currentTimeMillis();
        System.out.println("StringBuilder 长度：" + result.length());
        System.out.println("StringBuilder 耗时：" + (end - start) + " 毫秒");
    }
}
```

这个例子用于观察循环拼接的写法，计时结果只能作粗略参考。普通的少量拼接直接使用 `+` 即可。

### StringBuffer

`StringBuffer` 也是可修改的字符串容器，用法与 `StringBuilder` 类似。它的单个方法有同步保护；普通的单线程拼接通常使用 `StringBuilder`。

```java
public class StringBufferDemo1 {
    /*
        StringBuffer 知识点：
        1. append() 追加内容，reverse() 反转内容。
        2. toString() 将结果转换为 String。
        3. 单个方法有同步保护；多个步骤组合时仍可能需要额外同步。
    */
    public static void main(String[] args) {
        StringBuffer buffer = new StringBuffer("Java");
        buffer.append(" API");

        System.out.println(buffer);            // Java API
        System.out.println(buffer.toString()); // Java API
    }
}
```

### StringJoiner

`StringJoiner` 适合把多个字符串按指定符号连接起来。它位于 `java.util` 包，Java 8 起可以使用。

```java
import java.util.StringJoiner;

public class StringJoinerDemo1 {
    /*
        StringJoiner 知识点：
        1. 第一个参数是分隔符，第二个和第三个参数是前缀、后缀。
        2. add() 添加内容，toString() 得到拼接后的字符串。
        3. 只需要分隔符时，可以写 new StringJoiner(", ")。
    */
    public static void main(String[] args) {
        StringJoiner names = new StringJoiner(", ", "[", "]");
        names.add("张三");
        names.add("李四");
        names.add("王五");

        String result = names.toString();
        System.out.println(result); // [张三, 李四, 王五]
    }
}
```

如果已经有一组字符串，只需要用分隔符连接，也可以直接使用 `String.join(", ", "张三", "李四")`。

## Math 常用方法

`Math` 位于 `java.lang` 包，无须导包。它提供的常用方法都是静态方法，可以直接通过 `Math.方法名()` 调用。

```java
public class MathDemo {
    public static void main(String[] args) {
        // abs：绝对值。
        System.out.println(Math.abs(-10)); // 10

        // max、min：取两个数中的较大值、较小值。
        System.out.println(Math.max(10, 20)); // 20
        System.out.println(Math.min(10, 20)); // 10

        // ceil：向上取整；floor：向下取整，返回值都是 double。
        System.out.println(Math.ceil(3.2));   // 4.0
        System.out.println(Math.floor(3.8));  // 3.0
        System.out.println(Math.floor(-3.2)); // -4.0，向更小的整数取整

        // round：四舍五入；double 参数返回 long，float 参数返回 int。
        System.out.println(Math.round(3.5));   // 4
        System.out.println(Math.round(-3.5));  // -3

        // pow：计算次方；sqrt：计算平方根，返回值都是 double。
        System.out.println(Math.pow(2, 3)); // 8.0，即 2 的 3 次方
        System.out.println(Math.sqrt(25));  // 5.0

        // random：返回大于等于 0.0、小于 1.0 的随机小数。
        double value = Math.random();
        System.out.println(value);

        // 生成 1 到 10 的随机整数，包含 1 和 10。
        int number = (int) (Math.random() * 10) + 1;
        System.out.println(number);
    }
}
```

`Math.round` 在恰好位于两个整数中间时取较大的整数，所以 `-3.5` 的结果是 `-3`。`Math.abs(Integer.MIN_VALUE)` 的结果仍为负数，因为对应的正数超出了 `int` 范围；处理可能溢出的数值时要注意类型范围。

## Runtime

- Runtime 代表电脑中运行的环境

- Runtime 是一个单例类

| 方法名                                | 说明                                       |
| ------------------------------------- | ------------------------------------------ |
| `public static Runtime getRuntime()`  | 返回与当前 Java 应用程序关联的运行时对象   |
| `public void exit(int status)`        | 终止当前运行的 Java 虚拟机                 |
| `public int availableProcessors()`    | 返回 Java 虚拟机可用的处理器数量           |
| `public long totalMemory()`           | 返回 Java 虚拟机中的内存总量，单位为字节   |
| `public long freeMemory()`            | 返回 Java 虚拟机中的可用内存量，单位为字节 |
| `public Process exec(String command)` | 执行命令启动程序，并返回代表该进程的对象   |

```java
public class RuntimeTest {
    public static void main(String[] args) throws Exception {
        // 1、public static Runtime getRuntime() 返回与当前Java应用程序关联的运行时对象。
        Runtime jre = Runtime.getRuntime();

        // 2、public void exit(int status) 终止当前运行的虚拟机,该参数用作状态代码；按照惯例，非零状态代码表示异常终止。
        // jre.exit(0);

        // 3、public int availableProcessors(): 获取虚拟机能够使用的处理器数。
        System.out.println("处理器数量: " + jre.availableProcessors());

        // 4、public long totalMemory() 返回Java虚拟机中的内存总量。 字节数
        System.out.println("Java虚拟机中的内存总量: " + jre.totalMemory() / 1024.0 / 1024.0 + "MB");

        // 5、public long freeMemory() 返回Java虚拟机中的可用内存量
        System.out.println("Java虚拟机中的可用内存量: " + jre.freeMemory() / 1024.0 / 1024.0 + "MB");

        // 6、public Process exec(String command): 执行命令,启动程序
        // jre.exec("notepad.exe"); // 打开记事本示例，windows
    }
}
```

## System

System 代表程序所在的系统，也是一个工具类。

1. `public static void exit(int status)`：终止当前运行的 Java 虚拟机。
   - status = 0：正常退出
   - status ≠ 0：异常退出
2. `public static long currentTimeMillis()`：返回当前系统的时间毫秒值形式（从 1970-01-01 00:00:00 UTC 到现在的毫秒数）

3. `public static void arraycopy(源数组,源起始索引,目标数组,目标起始索引,拷贝长度)`：数组拷贝，底层 native，速度很快

4. `public static void gc()`：建议 JVM 执行垃圾回收（只是建议，不保证立刻回收）

```java
public class SystemTest {
    public static void main(String[] args) {
        // 1. currentTimeMillis() 获取时间毫秒值
        long millis = System.currentTimeMillis();
        System.out.println("时间毫秒戳：" + millis);

        // 2. arraycopy() 数组拷贝
        int[] src = {10,20,30,40,50};
        int[] dest = new int[5];
        System.arraycopy(src, 0, dest, 0, 3);
        System.out.println("拷贝后的数组：");
        for (int num : dest) {
            System.out.print(num + " ");
        }
        System.out.println();

        // 3. gc() 提醒垃圾回收
        System.gc();

        // 4. exit() 退出虚拟机，打开后后面代码不会执行
        // System.exit(0);
        System.out.println("程序正常执行结束");
    }
}

```

## BigDecimal

1. double、float 存在浮点精度丢失问题，金融计算必须用`BigDecimal`

2. 推荐创建方式：`BigDecimal.valueOf(double值)`，不推荐直接 new BigDecimal (double)

3. 常用运算：`add()`加法、`subtract()`减法、`multiply()`乘法、`divide()`除法

4. 除法一定要指定保留位数 + 舍入模式，否则除不尽会直接报错

5. `RoundingMode.HALF_UP`：四舍五入

```java
public class BigDecimalDemo {
    public static void main(String[] args) {
        // 目标：学会处理浮点型运算失真的问题
        double a = 0.1;
        double b = 0.2;
        double c = a + b;
        System.out.println(c); // 0.30000000000000004

        // 1、把两个数据包装成BigDecimal对象
        // a、public BigDecimal(String val)：这个接收字符串的构造器才可以处理失真问题
        BigDecimal a1 = new BigDecimal(Double.toString(a));
        BigDecimal b1 = new BigDecimal(Double.toString(b));

        // b、阿里巴巴公司更推荐我们用valueOf方法包装浮点型数据成为BigDecimal对象
        // 跟上面的做法本质是一样的
        BigDecimal a11 = BigDecimal.valueOf(a);
        BigDecimal b11 = BigDecimal.valueOf(b);

        // 2、调用方法进行精度运算。
        BigDecimal c11 = a11.add(b11);

        // 3、BigDecimal是处理精度问题的手段，结果必须还是基本类型的。
        double result = c11.doubleValue();
        System.out.println(result);

        System.out.println("----------------------------------------");

        BigDecimal i = BigDecimal.valueOf(0.1);
        BigDecimal j = BigDecimal.valueOf(0.3);
        /**
         * 参数一： 除数
         * 参数二： 保留位数
         * 参数三： 舍入模式
         */
        // public BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode)
        BigDecimal k = i.divide(j, 2, RoundingMode.HALF_UP);
        System.out.println(k);
    }
}
```

## 日期、时间与时区

Java 8 起，常用日期时间类型放在 `java.time` 包中。它们的对象不可变：调用 `plusDays()`、`minusHours()` 等方法会返回新对象，不会修改原值。

业务中先区分日期、当地时间和具体时刻：

- `LocalDate`：日期，例如生日、账单日期。
- `LocalTime`：时间，例如每天的营业时间。
- `LocalDateTime`：日期加时间，不包含时区，不能单独确定全球唯一时刻。
- `Instant`：时间线上的具体时刻，适合记录事件发生时间。
- `ZoneId`、`ZonedDateTime`：时区，以及带时区的日期时间。

### 获取和创建日期时间

```java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;

public class DateTimeDemo1 {
    public static void main(String[] args) {
        // 按指定时区获取当前日期和时间，避免依赖服务器默认时区。
        ZoneId zone = ZoneId.of("Asia/Shanghai");
        LocalDate today = LocalDate.now(zone);
        LocalTime now = LocalTime.now(zone);
        LocalDateTime current = LocalDateTime.now(zone);
        System.out.println(today);
        System.out.println(now);
        System.out.println(current);

        // 创建指定日期和时间，月份从 1 开始。
        LocalDate date = LocalDate.of(2026, 11, 7);
        LocalTime time = LocalTime.of(9, 30);
        LocalDateTime meeting = LocalDateTime.of(date, time);
        System.out.println(meeting); // 2026-11-07T09:30

        System.out.println(date.getYear());       // 2026
        System.out.println(date.getMonthValue()); // 11
        System.out.println(date.getDayOfMonth()); // 7
    }
}
```

如果使用不带时区参数的 `now()`，获取结果会依赖运行环境的默认时区。同一项业务需要固定使用某个时区时，应明确传入对应的 `ZoneId`。

### 日期与时间计算

```java
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class DateTimeDemo2 {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 11, 7);
        LocalDate nextWeek = date.plusDays(7);
        LocalDate lastMonth = date.minusMonths(1);
        System.out.println(date);      // 2026-11-07，原对象没有改变
        System.out.println(nextWeek);  // 2026-11-14
        System.out.println(lastMonth); // 2026-10-07

        // 判断日期先后。
        System.out.println(date.isBefore(nextWeek)); // true
        System.out.println(date.isAfter(nextWeek));  // false
        System.out.println(date.isEqual(nextWeek));  // false

        // 计算两个日期之间相隔多少天。
        System.out.println(ChronoUnit.DAYS.between(date, nextWeek)); // 7

        // 计算两个日期时间之间经过的分钟数。
        LocalDateTime start = LocalDateTime.of(2026, 11, 7, 9, 0);
        LocalDateTime end = start.plusHours(2).plusMinutes(30);
        System.out.println(Duration.between(start, end).toMinutes()); // 150
    }
}
```

`LocalDateTime` 没有时区，上面的 `Duration` 按这两个本地日期时间的差值计算。要计算跨时区或夏令时变化时实际经过的时间，应先确定时区，再基于 `Instant` 或带时区的时间计算。

### 格式化与解析

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeDemo3 {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime time = LocalDateTime.of(2026, 11, 7, 9, 30, 5);

        // 日期时间转字符串。
        String text = time.format(formatter);
        System.out.println(text); // 2026-11-07 09:30:05

        // 字符串按同样的格式解析为日期时间。
        LocalDateTime parsed = LocalDateTime.parse(text, formatter);
        System.out.println(parsed); // 2026-11-07T09:30:05
    }
}
```

格式中的 `MM` 表示月份，`mm` 表示分钟，`HH` 表示 24 小时制。输入内容不符合格式时，解析会抛出 `DateTimeParseException`，业务中需要处理无效输入。`DateTimeFormatter` 是线程安全的，可以复用。

### 时区与时刻转换

同一个时刻在不同时区显示的本地时间可能不同。转换时先明确原始时间所在时区，再转换到目标时区。

```java
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeDemo4 {
    public static void main(String[] args) {
        ZoneId shanghai = ZoneId.of("Asia/Shanghai");
        ZoneId utc = ZoneId.of("UTC");

        // 这段本地时间原本没有时区，先按上海时间解释。
        LocalDateTime local = LocalDateTime.of(2026, 11, 7, 9, 30);
        ZonedDateTime shanghaiTime = local.atZone(shanghai);

        // 转为 UTC，时刻相同，显示的本地时间不同。
        ZonedDateTime utcTime = shanghaiTime.withZoneSameInstant(utc);
        System.out.println(shanghaiTime); // 2026-11-07T09:30+08:00[Asia/Shanghai]
        System.out.println(utcTime);      // 2026-11-07T01:30Z[UTC]

        // Instant 表示同一个具体时刻，可以转换成 Unix 毫秒时间戳。
        Instant instant = shanghaiTime.toInstant();
        long timestamp = instant.toEpochMilli();
        System.out.println(timestamp); // 1794015000000

        // 从毫秒时间戳还原，再按上海时区显示。
        ZonedDateTime restored = Instant.ofEpochMilli(timestamp).atZone(shanghai);
        System.out.println(restored); // 2026-11-07T09:30+08:00[Asia/Shanghai]
    }
}
```

`withZoneSameInstant()` 保持时刻不变。`atZone()` 则是把没有时区的本地时间按指定时区解释，不能把它当作时区转换。遇到夏令时切换时，某些本地时间可能不存在或出现两次；Java 会按时区规则调整或选择偏移，预约、结算等业务应按实际规则处理。

### 业务中如何选择

- **生日、节假日、账单日期**：只关心日期，用 `LocalDate`。
- **每天固定的营业时间**：只关心当地时分秒，用 `LocalTime`；实际执行时还需要日期和业务时区。
- **订单创建时间、支付完成时间**：需要记录确定的时刻，可用 `Instant` 或保存 UTC 时间；展示时转换到用户或业务时区。
- **预约时间**：明确当地日期、时间和时区，例如使用 `ZonedDateTime`；跨时区展示时保持同一个时刻。

数据库字段和序列化格式是否保留时区，取决于数据库类型、驱动和接口约定；存取时需要与系统的时区规则保持一致。
