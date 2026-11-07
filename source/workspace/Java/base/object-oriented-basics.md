---
date: "2026-10-26 20:18:00"
title: Java 面向对象基础
description: Java 面向对象基础笔记，整理类与对象、引用与内存关系、成员变量、构造方法、this、封装、JavaBean、static 和参数传递。
categories:
  - Java
tags:
  - java
  - 面向对象
lastUpdated: "2026-11-07T14:09:27.219Z"
---

# Java 面向对象基础

数组和集合解决了“一组数据放在哪里”的问题。数据开始有自己的规则时，就需要把数据和操作放在一起：学生有姓名、成绩，账户有余额、存取款操作，订单有商品、支付和取消操作。Java 用类来描述这些状态和行为，用对象保存每一份具体的数据。

## 类与对象

类使用 `class` 定义。字段保存对象的状态，方法描述对象能做的事情。

```java
public class Student {
    private String name;
    private int score;

    public Student(String name, int score) {
        this.name = name;
        setScore(score);
    }

    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("成绩必须在 0 到 100 之间");
        }
        this.score = score;
    }

    public boolean isPassed() {
        return score >= 60;
    }
}
```

将这个类保存到 `Student.java` 后，可以在另一个类的 `main` 方法中创建和使用对象：

```java
Student student = new Student("小林", 85);
System.out.println(student.getName()); // 小林
System.out.println(student.isPassed()); // true
```

`new Student(...)` 创建对象并调用对应的构造方法，变量 `student` 保存指向该对象的引用。每次执行 `new` 都会创建新的对象，各个对象的实例字段互不影响。

### 成员变量与局部变量

定义在类中、方法外的变量是成员变量，定义在方法或代码块中的变量是局部变量。没有 `static` 修饰的成员变量也叫实例变量。

实例变量会得到默认值，例如 `int` 为 `0`、`boolean` 为 `false`、引用类型为 `null`。局部变量没有这项规则，读取前必须明确赋值。

```java
class Counter {
    private int count; // 默认值为 0

    public void print() {
        int step;
        // System.out.println(step); // 编译错误：step 尚未初始化
        System.out.println(count);
    }
}
```

引用的值为 `null` 时，表示它没有指向对象。通过它访问实例字段或调用实例方法，会抛出 `NullPointerException`。

| 对比项   | 实例变量                               | 局部变量                       |
| -------- | -------------------------------------- | ------------------------------ |
| 声明位置 | 类中、方法外，没有 `static`            | 方法、构造方法或代码块内       |
| 默认值   | 有类型对应的默认值                     | 使用前必须赋值                 |
| 访问范围 | 通过对象访问，受访问权限限制           | 受声明所在代码块及声明位置限制 |
| 生命周期 | 随对象存在，对象不可达后才可能被回收   | 与当前方法调用、代码块执行有关 |
| 内存理解 | 属于对象的状态，概念上随对象保存在堆中 | 当前调用的局部变量在栈帧中描述 |

方法参数也属于局部变量，在调用时获得实参值。这里按 JVM 的概念模型理解内存即可，实际运行时还可能发生逃逸分析、标量替换等优化，不能据此断定每个值的物理存储位置。

### 对象与引用的内存关系

一个引用指向一个对象、两次 `new` 创建两个对象、两个引用指向同一个对象。

```java
Student first = new Student("小林", 85);
Student second = new Student("小林", 85); // 再次 new，得到独立对象。
Student alias = first;                   // 复制引用，与 first 指向同一对象。

alias.setScore(90);
System.out.println(first.getScore());  // 90：通过 alias 修改了同一个对象。
System.out.println(second.getScore()); // 85：第二个对象没有变化。
System.out.println(first == second);   // false
System.out.println(first == alias);    // true
```

```text
当前方法中的引用变量          堆中的对象（示意）

first ─┐
       ├──────────────────→ Student { name: 小林, score: 90 }
alias ─┘
second ───────────────────→ Student { name: 小林, score: 85 }
```

对象本身和引用变量要分开看。局部引用出了作用域，不表示它指向的对象立即销毁；如果对象仍能通过其他引用访问，就仍然可以使用。对象不可达后也只是具备被垃圾回收的条件，回收时间由 JVM 决定。

## 构造方法与 this

构造方法名称必须和类名一致，没有返回类型，连 `void` 也不写。它负责让新对象具有合理的初始状态。

```java
class Book {
    private String title;
    private int pages;

    public Book(String title) {
        this(title, 0);
    }

    public Book(String title, int pages) {
        this.title = title;
        this.pages = pages;
    }
}
```

这里的两个构造方法构成重载。`this.title` 表示当前对象的字段，右侧的 `title` 是构造方法的参数；`this(title, 0)` 则调用本类的另一个构造方法，集中处理初始化逻辑。

如果类没有声明任何构造方法，编译器会提供默认的无参构造方法。只要自己声明了构造方法，编译器就不会再补无参版本。例如上面的 `Book` 不能直接写 `new Book()`。

本文示例按 Java 8～21 常用语法编写，`this(...)` 放在构造方法第一条语句。用于调用父类构造方法的 `super(...)` 会在 [高级篇](./object-oriented-advanced) 介绍。

`this` 指向当前正在构造或正在执行实例方法的对象。多个对象调用同一个实例方法时，方法中的 `this` 分别对应各自的调用对象。参数和字段同名时，不加限定的名称优先匹配参数，例如 `name = name` 只会把参数赋给自身，字段赋值应写成 `this.name = name`。

## 封装与访问权限

成绩限制在 `0` 到 `100` 之间，就应该由 `Student` 自己检查。把字段设为 `private` 后，外部代码只能通过 `setScore` 修改成绩，校验规则也就有了统一入口。

封装时不必给每个字段都生成 getter 和 setter。例如订单的状态可以通过 `pay()`、`cancel()` 改变，直接提供 `setStatus()` 反而容易绕过业务规则。

| 修饰符      | 同一个类 | 同一个包 | 不同包的子类     | 其他位置 |
| ----------- | -------- | -------- | ---------------- | -------- |
| `private`   | 可以     | 不可以   | 不可以           | 不可以   |
| 不写修饰符  | 可以     | 可以     | 不可以           | 不可以   |
| `protected` | 可以     | 可以     | 可以，有访问限制 | 不可以   |
| `public`    | 可以     | 可以     | 可以             | 可以     |

跨包的子类访问 `protected` 实例成员时，不能通过任意父类对象引用访问；通常通过 `this`、`super` 或符合要求的子类引用访问。顶层类只能使用 `public` 或不写访问修饰符。

## JavaBean

JavaBean 是遵循一组约定的 Java 类，常用来封装用户、商品、表单等数据。它没有专门的关键字，也不需要继承某个固定父类。

日常编写用于数据封装的 JavaBean 时，通常采用以下写法：

- 类声明为 `public`，便于其他代码使用。
- 提供 `public` 无参构造方法，方便工具先创建对象，再设置属性。
- 字段设为 `private`，通过公开的 getter、setter 访问。
- getter、setter 遵守命名约定，方便工具识别属性。

### 属性与访问方法

JavaBean 的“属性”主要由访问方法识别，不要求和某个字段一一对应。例如 `getName()`、`setName(String name)` 对应属性 `name`；只有 getter 的属性可以只读，也可以在 getter 中计算结果。

| 类型      | 字段示例                  | getter        | setter                      |
| --------- | ------------------------- | ------------- | --------------------------- |
| `String`  | `private String name;`    | `getName()`   | `setName(String name)`      |
| `int`     | `private int age;`        | `getAge()`    | `setAge(int age)`           |
| `boolean` | `private boolean active;` | `isActive()`  | `setActive(boolean active)` |
| `Boolean` | `private Boolean active;` | `getActive()` | `setActive(Boolean active)` |

基本类型 `boolean` 可以使用 `isXxx()`，也可以使用 `getXxx()`；包装类型 `Boolean` 按标准属性识别规则使用 `getXxx()`。布尔字段直接命名为 `active`，对应 `isActive()`，可以减少字段名和属性名不一致带来的困惑。

普通 setter 的返回类型是 `void`，接收一个与属性类型一致的参数；getter 不接收参数，返回属性值。像 `setName()` 返回 `this` 的链式写法，部分框架支持，但并非标准 JavaBean setter 的形式。

### 示例：封装用户信息

下面两个文件放在同一目录中。`UserBean` 封装姓名、年龄和启用状态，`JavaBeanDemo` 演示创建对象、修改属性和读取属性。

```java
// 文件：UserBean.java
public class UserBean {
    // 实例字段：每个用户对象分别保存自己的数据。
    // private 限制外部直接访问，修改数据时统一经过 setter。
    private String name;
    private int age;
    private boolean active;

    // public 无参构造：支持 new UserBean()，也方便工具创建对象。
    // 此时字段使用默认值：name 为 null，age 为 0，active 为 false。
    public UserBean() {
    }

    // 有参构造：方便手动创建时一次传入数据，可以和无参构造共存。
    // 已经声明有参构造后，需要自己保留上面的无参构造。
    public UserBean(String name, int age, boolean active) {
        this.name = name;
        setAge(age); // 复用年龄校验，避免有参构造绕过范围限制。
        this.active = active;
    }

    // getName 对应 name 属性：无参数，返回 String。
    public String getName() {
        return name;
    }

    // setName 对应 name 属性：接收新值，无返回值。
    public void setName(String name) {
        // this.name 是当前对象的字段，name 是本次调用传入的参数。
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        // 在赋值前检查数据；校验失败时保留原年龄，并抛出异常。
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("年龄必须在 0 到 150 之间");
        }
        this.age = age;
    }

    // active 是基本类型 boolean，使用 isActive 作为 getter。
    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
```

```java
// 文件：JavaBeanDemo.java
public class JavaBeanDemo {
    public static void main(String[] args) {
        // 先调用无参构造创建对象，再通过 setter 填充属性。
        UserBean user = new UserBean();
        user.setName("小林");
        user.setAge(20);
        user.setActive(true);

        // 通过 getter 读取属性，外部不能直接访问 user.name 等私有字段。
        System.out.println(user.getName());  // 小林
        System.out.println(user.getAge());   // 20
        System.out.println(user.isActive()); // true

        // 修改已有对象的属性；setter 操作的仍然是同一个 user 对象。
        user.setAge(21);
        System.out.println(user.getAge()); // 21

        // 有参构造是另一种创建方式，得到的是独立的新对象。
        UserBean another = new UserBean("小周", 18, false);
        System.out.println(another.getName()); // 小周

        // 取消下一行注释，会抛出 IllegalArgumentException，程序在此终止。
        // user.setAge(-1);
    }
}
```

在这两个文件所在的目录执行：

```sh
javac -encoding UTF-8 UserBean.java JavaBeanDemo.java
java JavaBeanDemo
```

这里没有重写 `toString()`、`equals()` 和 `hashCode()`，它们不是识别 JavaBean 属性的前提。是否补充，要看打印对象、内容比较等实际需求。

一些资料会把 `implements Serializable` 列入 JavaBean 的常见写法，它服务于 Java 对象序列化和持久化需求。普通属性读写以及许多框架的数据绑定不依赖这个接口，JSON 转换通常也不要求它，是否实现应根据所用工具的要求判断。

JavaBean 和 Spring Bean 也要分清：前者描述类的编写约定，后者指由 Spring 容器管理的对象。符合 JavaBean 约定的类不会自动进入 Spring 容器，Spring 管理的对象也不一定采用无参构造加 setter 的写法。

### 数据对象与业务处理

基础还展示了实体类与操作类的分工：数据对象负责保存和访问数据，操作类负责计算、展示等业务处理。例如 `Student` 保存成绩，统计服务接收学生列表并计算平均分。

这种分工适合业务处理逐渐增多的场景，但不代表实体类只能写 getter、setter。年龄范围校验、订单状态变更等与对象自身规则紧密相关的行为，仍然可以保留在对象中。

## static 关键字

实例字段每个对象各有一份，静态字段由同一个类的实例共享。静态方法可以直接通过类名调用。

| 知识点     | 说明                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| 属于类     | `static` 修饰的字段和方法属于类，使用前不必先创建对象                        |
| 共享数据   | 同一个类的多个对象访问同一份静态字段，一个地方修改后，其他地方也能看到变化   |
| 类名调用   | 通常写成 `类名.静态字段`、`类名.静态方法(...)`，仍需遵守访问权限             |
| 初始化时机 | 静态字段和静态代码块在类初始化时处理，创建该类的第一个实例前会先完成类初始化 |
| 常见用途   | 静态字段保存类级别的共享数据；静态方法常用于不依赖对象状态的工具操作         |

### 静态字段：共享一份数据

```java
class IdGenerator {
    // 属于 IdGenerator 类，所有调用共享同一个计数值。
    private static int nextId = 1;

    // 不需要创建 IdGenerator 对象，就能通过类名调用。
    public static int next() {
        return nextId++;
    }
}

// 在方法中调用
int firstId = IdGenerator.next();  // 1
int secondId = IdGenerator.next(); // 2
```

这个例子只适合演示单线程下的共享状态；`nextId++` 不是原子操作，不能直接用作并发场景下的 ID 生成方案。

Java 语法也允许通过对象表达式访问静态成员，例如 `对象.静态方法()`，但成员仍然属于类。统一使用类名调用，更容易看出它与具体对象无关。

### 静态方法：工具操作与访问限制

不依赖某个对象状态的方法适合写成静态方法。例如 `Math.max(10, 20)` 直接根据参数计算结果，无须创建 `Math` 对象。

静态方法没有当前对象，不能使用 `this`、`super`，也不能直接访问实例字段或调用实例方法。需要实例数据时，应通过明确的对象引用访问；实例方法则既可以访问实例成员，也可以访问静态成员。

```java
class StaticExample {
    private int count = 3;               // 实例字段：每个对象各有一份。
    private static String unit = "件";  // 静态字段：同一个类共享。

    public static void printCount(StaticExample example) {
        System.out.println(unit);          // 可以直接访问静态字段。
        System.out.println(example.count); // 可以通过传入的对象访问实例字段。

        // System.out.println(count);      // 编译错误：没有指定访问哪个对象。
        // System.out.println(this.count); // 编译错误：静态方法中没有 this。
    }

    public void print() {
        // 实例方法有当前对象，可以访问自己的字段，也能访问静态字段。
        System.out.println(count + StaticExample.unit);
    }
}
```

“静态方法只能访问静态成员”应理解为直接访问的限制。上面的 `example.count` 有明确的对象引用，因此可以访问；如果 `example` 为 `null`，这次实例字段访问会抛出 `NullPointerException`。

### 工具类与 main 方法

用数组工具类练习静态方法。工具方法的输入来自参数，不依赖某个对象的字段，调用时可以直接使用类名。

示例中的 `final class` 表示这个类不能被继承，完整规则见 [高级篇的 final 部分](./object-oriented-advanced#final-限制变化)。

```java
final class ArrayTools {
    // 工具类不需要创建实例，私有构造方法阻止外部 new。
    private ArrayTools() {
    }

    public static int max(int[] values) {
        // 空数组没有最大值，先明确拒绝，避免后续访问下标出错。
        if (values == null || values.length == 0) {
            throw new IllegalArgumentException("数组不能为空");
        }
        int result = values[0]; // 用首元素初始化，才能正确处理全为负数的数组。
        for (int index = 1; index < values.length; index++) {
            result = Math.max(result, values[index]);
        }
        return result;
    }

    public static int min(int[] values) {
        if (values == null || values.length == 0) {
            throw new IllegalArgumentException("数组不能为空");
        }
        int result = values[0];
        for (int index = 1; index < values.length; index++) {
            result = Math.min(result, values[index]);
        }
        return result;
    }

    public static void print(int[] values) {
        // Arrays.toString 负责格式化，不必自己拼接逗号和方括号。
        System.out.println(java.util.Arrays.toString(values));
    }
}
```

在方法中调用 `ArrayTools.max(new int[] {-5, -2, -9})` 得到 `-2`，调用 `min` 得到 `-9`，调用 `print` 输出 `[-5, -2, -9]`。

Java 8～21 常用的程序入口是 `public static void main(String[] args)`：`public` 允许启动器访问，`static` 让启动时不必先创建入口类对象，`void` 表示不返回结果。`args` 接收命令行参数，例如 `java Demo hello` 中的 `hello`，不是键盘输入；参数名也可以换成其他合法名称。

`main` 是静态方法，不代表这个类的其他方法都必须是静态方法。需要调用实例方法时，在 `main` 中先创建对象即可。

## 引用与参数传递

两个变量可以指向同一个对象。给引用变量赋值，只会复制引用，不会复制对象。

```java
Student first = new Student("小林", 85);
Student second = first;
second.setScore(90);

System.out.println(first.getScore()); // 90
System.out.println(first == second); // true
```

Java 的方法参数始终按值传递。基础类型复制具体值，引用类型复制引用值，所以方法内既可能修改原对象，也可能只是改变局部参数的指向。

```java
static void changeScore(Student student) {
    student.setScore(95);
}

static void replaceStudent(Student student) {
    student = new Student("小周", 60);
}

// 在 main 方法中调用
Student student = new Student("小林", 85);
changeScore(student);
System.out.println(student.getScore()); // 95

replaceStudent(student);
System.out.println(student.getName()); // 仍然是小林
```

`changeScore` 中的引用副本仍指向原对象，所以修改能被调用方看到。`replaceStudent` 只让参数指向新对象，调用方变量的引用值没有改变。
