---
date: "2026-10-28 23:20:00"
title: Java 面向对象高级
description: 按面向对象高级课件整理继承、方法重写、多态、final、抽象类、接口、Object、代码块、包、内部类和 Lambda，配有注释示例。
categories:
  - Java
tags:
  - java
  - 面向对象
lastUpdated: "2026-10-28T15:36:59.621Z"
---

# Java 面向对象高级

对象有了各自的状态和行为之后，还需要处理类型之间的关系：哪些代码可以继承复用，哪些行为应该由接口约定，调用时又如何选择具体实现。本篇按三份《面向对象高级》课件整理这些内容。

阅读前建议先掌握 [Java 面向对象基础](./object-oriented-basics) 中的类、构造方法、封装与静态成员。各节示例独立使用，不需要把所有代码合并到同一个文件。

## 知识点概览

| 知识点            | 需要掌握的内容                                  |
| ----------------- | ----------------------------------------------- |
| 继承              | 单继承、多层继承、成员访问和父类构造方法调用    |
| this 与 super     | 区分当前对象访问、父类成员访问和构造方法调用    |
| 方法重写          | 重写规则、Override 注解，以及与重载的区别       |
| 多态与转型        | 声明类型与实际类型、动态分派、向上与向下转型    |
| final             | 限制重新赋值、方法重写和类继承                  |
| 抽象类            | 抽象方法、共享状态与模板方法                    |
| 接口              | 实现与继承关系，default、static 和 private 方法 |
| Object 与 Objects | toString、equals、hashCode 以及空值处理         |
| 代码块            | 静态块、实例初始化块和构造方法的执行顺序        |
| 包与导入          | 组织类型、处理同名类并遵守访问权限              |
| 内部类            | 成员内部类、静态嵌套类、局部类和匿名内部类      |
| Lambda            | 函数式接口、简写规则，以及与匿名内部类的区别    |

## 继承

当两个类有“是一种”的关系时，可以用继承表达。例如员工也是人，员工除了有姓名、可以自我介绍，还会有自己的工号和工作行为。

使用 `extends` 指定父类：`class Employee extends Person` 表示 `Employee` 是子类，`Person` 是父类。子类可以复用父类中可访问的成员，也可以增加自己的字段和方法。

### 示例：员工复用人的姓名和自我介绍方法

下面的代码单独保存为 `InheritanceDemo.java`，可以直接运行。先看 `main` 中的调用，再对照两个类的定义：`getName()` 和 `introduce()` 写在父类，`getEmployeeId()` 和 `work()` 写在子类。

```java
// 文件：InheritanceDemo.java
public class InheritanceDemo {
    public static void main(String[] args) {
        // 创建一个员工对象，同时设置父类部分的姓名和子类自己的工号。
        Employee employee = new Employee("小林", "E001");

        // Employee 没有重复定义这两个方法，可以直接复用父类的实现。
        System.out.println(employee.getName()); // 小林
        employee.introduce();                   // 我叫小林

        // 下面两个方法由 Employee 自己定义，表示员工特有的数据和行为。
        System.out.println(employee.getEmployeeId()); // E001
        employee.work();                              // 小林正在处理工作
    }
}

// 父类：保存人的共同信息，提供共同方法。
class Person {
    // private 字段只能在 Person 内直接访问。
    private String name;

    public Person(String name) {
        // 第 2 步：执行父类构造方法，初始化当前员工对象中的姓名。
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void introduce() {
        System.out.println("我叫" + name);
    }
}

// 子类：员工是一种人，复用 Person 的可访问成员。
class Employee extends Person {
    // 子类新增的字段，Person 中没有工号。
    private String employeeId;

    public Employee(String name, String employeeId) {
        // 第 1 步：把姓名传给父类构造方法，先初始化父类部分。
        // Person 只有有参构造，所以这里明确调用 super(name)。
        super(name);

        // 第 3 步：父类构造方法执行完，再初始化子类自己的工号。
        this.employeeId = employeeId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void work() {
        // 子类不能直接写 name，但可以调用父类公开的 getName()。
        System.out.println(getName() + "正在处理工作");
        // System.out.println(name); // 编译错误：name 在 Person 中是 private。
    }
}
```

执行 `new Employee("小林", "E001")` 时，构造方法的调用顺序是：

```text
进入 Employee 构造方法
  → super(name) 调用 Person 构造方法
  → Person 设置姓名，返回 Employee 构造方法
  → Employee 设置工号
  → 创建完成，得到员工对象
```

这里创建的是一个员工对象，其中包含父类定义的姓名状态和子类定义的工号状态。`super(name)` 是初始化同一个对象的父类部分，不会额外创建一个独立的 `Person` 对象。

### 继承的规则

- 一个类只能直接继承一个父类，但可以逐级继承，例如 `Person → Employee → Manager`；类也可以实现多个接口。
- 构造方法不会被继承，子类需要定义自己的构造方法，并通过构造方法调用链完成父类初始化。
- 按本文使用的 Java 8～21 语法，如果构造方法没有显式调用 `this(...)` 或 `super(...)`，编译器会尝试插入 `super()`。父类没有可访问的无参构造时，需要显式调用合适的父类构造方法，或通过 `this(...)` 转交给本类其他构造方法处理。
- 父类的 `private` 成员不能在子类中直接访问；子类对象仍包含父类定义的实例状态，可以通过父类提供的可访问方法操作。
- 其他成员能否访问，还要遵守 `public`、`protected` 和包访问权限的规则。

继承适合子类可以作为父类使用的关系。员工可以作为人使用；订单使用库存服务则通常通过字段持有服务对象，这种关系适合组合。

### this、super 与同名字段

`this` 指向当前对象，`super` 用于从父类角度访问成员，或调用父类构造方法。`super` 不能当成普通变量单独赋值或传参。

| 用法     | `this`                                            | `super`                                        |
| -------- | ------------------------------------------------- | ---------------------------------------------- |
| 字段     | `this.name`：从当前类查找字段                     | `super.name`：从父类查找可访问字段             |
| 方法     | `this.show()`：对当前对象调用方法，可发生动态分派 | `super.show()`：调用父类实现，跳过当前类的重写 |
| 构造方法 | `this(...)`：调用本类其他构造方法                 | `super(...)`：调用直接父类构造方法             |

父子类出现同名字段时，属于字段隐藏；两个字段都存在，不会像方法重写那样替换实现。

```java
class ParentValue {
    protected int number = 10;
}

class ChildValue extends ParentValue {
    private int number = 20;

    public void show() {
        int number = 30;
        System.out.println(number);       // 30：局部变量。
        System.out.println(this.number);  // 20：子类字段。
        System.out.println(super.number); // 10：父类字段，仍要遵守访问权限。
    }
}
```

在方法中执行 `new ChildValue().show()` 即可观察三个输出。业务代码中尽量避免父子类字段同名，以免读写到不同字段。

## 方法重写

继承父类后，如果某个实例方法的实现不适合子类，可以在子类中重新实现它，这叫方法重写。例如动物都有发声行为，狗发声时输出“汪汪”。

下面的 `Animal`、`Dog` 是一组独立示例，后面的多态小节也会使用它们。

```java
class Animal {
    private final String name;

    public Animal(String name) {
        // 父类统一保存动物的名字。
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void speak() {
        // 父类提供通用实现，子类可以重写。
        System.out.println("发出声音");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void speak() {
        // 方法名和参数列表与父类一致，替换为狗自己的发声行为。
        System.out.println(getName() + "：汪汪");
    }
}
```

在 `main` 方法中分别调用：

```java
Animal animal = new Animal("普通动物");
animal.speak(); // 发出声音：使用 Animal 的实现。

Dog dog = new Dog("阿黄");
dog.speak(); // 阿黄：汪汪：使用 Dog 重写后的实现。
```

重写方法时保留 `@Override`，如果方法名或参数写错，编译器会提示它没有正确重写父类方法。需要在重写方法中保留父类行为时，可以使用 `super.方法名(...)` 调用父类实现。

重写需要遵守以下规则：

- 方法名和参数列表与父类方法相同；只修改参数列表属于重载。
- 不能缩小访问权限，例如父类是 `public`，子类不能改成 `private`。
- 返回类型保持一致，或使用原引用返回类型的子类型；基本类型返回值必须保持相同类型。
- 不能扩大受检异常的声明范围。
- `private` 方法不能被子类重写，`final` 方法禁止重写；静态方法的同名定义属于隐藏。

## 多态与类型转换

父类引用可以指向子类对象。调用被重写的实例方法时，执行哪个实现取决于实际对象。

```java
Animal animal = new Dog("阿黄");
animal.speak(); // 阿黄：汪汪
```

变量声明为 `Animal`，编译器就按 `Animal` 的类型检查可访问的成员。即使实际对象是 `Dog`，也不能直接调用只在 `Dog` 中定义的方法。

子类赋给父类引用属于向上转型，通常自动完成。需要向下转型时，先判断实际类型，否则可能抛出 `ClassCastException`。

```java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.speak();
}
```

`null instanceof Dog` 的结果为 `false`。实际业务如果频繁判断类型再强转，可以检查一下共同操作是否应该放进父类或接口。

多态针对可重写的实例方法。字段访问取决于引用的声明类型，静态方法也按编译期类型解析，不具备同样的动态分派行为。

| 访问内容         | 编译时                         | 执行时                       |
| ---------------- | ------------------------------ | ---------------------------- |
| 实例字段         | 检查引用声明类型中是否可访问   | 根据声明类型确定字段         |
| 可重写的实例方法 | 根据声明类型检查、选择方法签名 | 根据对象实际类型选择重写实现 |
| 静态成员         | 根据编译期类型解析             | 不根据对象实际类型动态分派   |

### 用接口统一不同支付方式

课件用多种支付方式说明多态：调用方接收支付接口，不必逐个判断具体支付类型。

```java
// 文件：PaymentDemo.java
public class PaymentDemo {
    public static void main(String[] args) {
        checkout(new PlatformPayment(), 1000);
        checkout(new BankPayment(), 1000);
    }

    // 参数使用接口类型，可以接收不同实现。
    // 示例金额以“分”为单位，1000 分表示 10 元。
    static void checkout(Payment payment, int amountInCents) {
        payment.pay(amountInCents); // 实际执行哪个 pay，由传入对象决定。
    }
}

interface Payment {
    void pay(int amountInCents);
}

class PlatformPayment implements Payment {
    @Override
    public void pay(int amountInCents) {
        System.out.println("平台支付：" + amountInCents + " 分");
    }
}

class BankPayment implements Payment {
    @Override
    public void pay(int amountInCents) {
        System.out.println("银行卡支付：" + amountInCents + " 分");
    }
}
```

新增一种支付方式时，可以增加 `Payment` 实现，再传给 `checkout`。这里模拟调用关系，没有真正发起支付。

### 重载与重写的区别

| 对比项   | 重载（overload）                   | 重写（override）             |
| -------- | ---------------------------------- | ---------------------------- |
| 关系     | 同名方法使用不同参数列表           | 子类重新实现父类的实例方法   |
| 参数     | 数量、类型或类型顺序不同           | 参数列表相同                 |
| 返回类型 | 不能仅靠返回类型区分重载           | 相同，或符合协变返回类型规则 |
| 选择时机 | 编译期根据参数的静态类型等规则确定 | 运行时根据实际对象选择实现   |

`private` 方法不能被子类重写，`final` 方法禁止重写，静态方法的同名定义属于隐藏。不要把这些情况和实例方法的重写混在一起。

## final：限制变化

| 修饰位置 | 含义                      |
| -------- | ------------------------- |
| 变量     | 只能赋值一次              |
| 方法     | 不能被子类重写            |
| 类       | 不能被继承，例如 `String` |

`final` 修饰引用时，限制的是引用重新指向其他对象，对象内部仍可能变化。

```java
final List<String> names = new ArrayList<>();
names.add("小林"); // 可以修改列表内容
// names = new ArrayList<>(); // 编译错误：不能重新赋值
```

这里的 `List` 和 `ArrayList` 来自 `java.util` 包。常量通常写成 `public static final`，名称使用大写字母加下划线，例如 `MAX_RETRY_COUNT`。

实例 `final` 字段可以在声明时、实例初始化块或构造方法中赋值，但每条正常完成的构造路径都必须保证它恰好赋值一次。静态 `final` 字段则在声明时或静态初始化块中完成赋值，不能留给实例构造方法。

## 抽象类

抽象类使用 `abstract class` 定义，不能直接实例化。它可以有字段、构造方法、普通方法和抽象方法；抽象方法只有声明，没有方法体。

```java
abstract class Shape {
    public abstract double area();

    public void printArea() {
        System.out.println(area());
    }
}

class Circle extends Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

具体子类必须实现继承下来的抽象方法，否则子类也要声明为抽象类。抽象类的构造方法会在创建子类对象时参与初始化。

抽象类可以没有抽象方法，但普通类不能声明抽象方法。抽象方法不能同时使用 `private`、`final` 或 `static` 修饰：它需要由子类提供实例实现，这些修饰符与这一要求冲突。抽象类中仍可以有普通的静态方法、私有方法和 `final` 方法。

### 模板方法：保留共同流程

课件中的模板方法把固定流程放在父类，把不同的步骤留给子类实现。

```java
abstract class ReportTemplate {
    // final 固定整体流程，子类只实现其中的内容步骤。
    public final void printReport() {
        System.out.println("=== 日报 ===");
        printContent();
        System.out.println("=== 结束 ===");
    }

    protected abstract void printContent();
}

class DailyReport extends ReportTemplate {
    @Override
    protected void printContent() {
        System.out.println("今天完成了订单查询功能");
    }
}
```

在方法中执行 `new DailyReport().printReport()`，标题和结尾由父类输出，正文由子类输出。这是模板方法的用法；并非所有抽象类都属于这种设计。

## 接口

接口使用 `interface` 定义，类通过 `implements` 实现接口。调用方可以只依赖接口，把具体实现留给创建对象的地方。

```java
interface MessageSender {
    void send(String message);
}

class ConsoleSender implements MessageSender {
    @Override
    public void send(String message) {
        System.out.println(message);
    }
}

class NotificationService {
    private final MessageSender sender;

    public NotificationService(MessageSender sender) {
        this.sender = sender;
    }

    public void notifyUser() {
        sender.send("订单已发货");
    }
}
```

使用时写 `new NotificationService(new ConsoleSender()).notifyUser()`。以后增加邮件或短信实现，通知服务仍通过 `MessageSender` 调用。

接口中普通抽象方法隐含 `public abstract`，实现时必须是 `public`；字段隐含 `public static final`。Java 8 起接口支持 `default` 方法和静态方法，Java 9 起支持私有辅助方法。接口没有构造方法，也没有实例字段。

需要共享实例状态、构造过程或部分实现时，可以考虑抽象类；需要让不同类遵循同一种能力约定时，可以考虑接口。一个类可以同时继承一个抽象类并实现多个接口。

### 类与接口的关系

| 关系         | 语法                       | 限制                                   |
| ------------ | -------------------------- | -------------------------------------- |
| 类继承类     | `class B extends A`        | 直接父类只能有一个，可多层继承         |
| 类实现接口   | `class C implements A, B`  | 可以实现多个接口，也可以同时继承一个类 |
| 接口继承接口 | `interface C extends A, B` | 可以继承多个接口                       |

接口不能直接实例化。具体实现类必须提供尚未实现的抽象方法，否则应声明为抽象类。

### default、static 与 private 方法

```java
// 文件：InterfaceDemo.java，使用 Java 9 或更高版本。
public class InterfaceDemo {
    public static void main(String[] args) {
        Task task = new DownloadTask();
        task.run();                  // 调用实现类的方法：下载文件。
        task.finish();               // 复用默认方法：记录日志，再输出任务结束。
        System.out.println(Task.version()); // 静态方法通过接口名调用：1.0。
    }
}

interface Task {
    void run(); // 普通抽象方法，由具体实现类提供实现。

    default void finish() {
        log(); // 默认方法可以复用接口内部的私有辅助方法。
        System.out.println("任务结束");
    }

    static String version() {
        return "1.0";
    }

    private void log() {
        // Java 9 起允许：只在接口内部使用，不暴露给调用方或实现类。
        System.out.println("记录日志");
    }
}

class DownloadTask implements Task {
    @Override
    public void run() {
        System.out.println("下载文件");
    }
}
```

`default` 方法从 Java 8 开始支持，实现类可以直接复用，也可以重写，重写时不加 `default`。为接口新增默认方法，可以减少对原有实现类的修改，但仍需考虑同名方法冲突。

当一个类实现了两个接口，而这两个接口提供互不覆盖的同签名默认方法时，实现类必须重写来消除冲突；需要复用某一实现时，可以在重写方法中使用 `接口名.super.方法名()`。单纯两个接口都有同签名抽象方法，不一定产生这种冲突。

接口静态方法不被实现类继承，只能通过接口名调用，不能写成 `DownloadTask.version()` 或 `task.version()`。私有方法用于接口内部复用，可以是实例方法，也可以是静态方法。

### 抽象类与接口对照

| 对比项   | 抽象类                       | 接口                                       |
| -------- | ---------------------------- | ------------------------------------------ |
| 实例字段 | 可以有                       | 没有，字段隐含 `public static final`       |
| 构造方法 | 可以有，供子类初始化时调用   | 没有                                       |
| 方法     | 抽象方法、普通方法等         | 抽象方法、默认方法、静态方法和私有辅助方法 |
| 复用关系 | 子类直接继承一个父类         | 类可以实现多个接口                         |
| 使用侧重 | 共享相关类型的状态和部分实现 | 为不同类型约定共同能力                     |

## Object、equals 与 hashCode

没有显式指定父类的普通类默认继承 `Object`。常用方法包括 `toString()`、`equals(Object)` 和 `hashCode()`。

对于引用类型，`==` 判断两个引用是否指向同一个对象。`Object.equals` 默认也按对象身份比较；如果需要按业务字段判断相等，要重写它。没有重写 `equals` 的类，即使两个独立对象的字段值完全相同，调用 `equals` 仍会得到 `false`。

```java
String first = new String("Java");
String second = new String("Java");

System.out.println(first == second);      // false
System.out.println(first.equals(second)); // true
```

`String` 已经实现了内容比较。引用可能为 `null` 时，可以使用 `java.util.Objects.equals(first, second)`。

重写 `equals` 时应同时重写 `hashCode`：两个对象只要 `equals` 为 `true`，哈希值就必须相同；哈希值相同则不一定相等。`HashSet` 去重、`HashMap` 查找 key 都依赖这个约定。对象进入哈希容器后，参与这两个方法计算的字段应保持稳定，否则可能出现元素明明存在却查不到的情况。

`toString()` 用于提供对象的文本表示，打印日志时经常用到。默认结果通常是类名加 `@` 和哈希码的十六进制表示，不应当把它当成对象的内存地址。

### 示例：按用户编号比较对象

```java
// 文件：ObjectDemo.java
import java.util.Objects;

public class ObjectDemo {
    public static void main(String[] args) {
        UserId first = new UserId("U001");
        UserId second = new UserId("U001");
        System.out.println(first); // UserId{id='U001'}：调用重写后的 toString。
        System.out.println(first == second);             // false：两个独立对象。
        System.out.println(first.equals(second));        // true：编号相同。
        System.out.println(Objects.equals(first, null)); // false：安全处理 null。
        System.out.println(Objects.isNull(null));         // true
    }
}

// 不可继承、编号不可修改，比较规则和哈希值保持稳定。
final class UserId {
    private final String id;

    public UserId(String id) {
        this.id = Objects.requireNonNull(id, "用户编号不能为空");
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true; // 同一个对象，直接相等。
        }
        if (!(other instanceof UserId)) {
            return false; // 同时排除 null 和其他类型。
        }
        UserId that = (UserId) other;
        return id.equals(that.id); // 这个类型约定：编号一致即相等。
    }

    @Override
    public int hashCode() {
        return id.hashCode(); // 和 equals 使用同一份编号数据。
    }

    @Override
    public String toString() {
        return "UserId{id='" + id + "'}";
    }
}
```

`Object` 是类继承体系的根，`Objects` 是 `java.util` 中的工具类。`Objects.equals(a, b)` 会处理空值，再委托给对象自己的 `equals`，不会自动推断哪些业务字段应该参与比较。课件中的 `Objects.isNull(obj)` 也可以直接写为 `obj == null`。

## 代码块与初始化顺序

| 类型                       | 写法与位置                      | 执行时机                                       |
| -------------------------- | ------------------------------- | ---------------------------------------------- |
| 局部代码块                 | 方法等执行体中的 `{ ... }`      | 程序执行到该位置时执行，限定局部变量的作用域   |
| 实例初始化块（构造代码块） | 类中、方法外的 `{ ... }`        | 每次创建对象时执行，位于本类构造方法主体之前   |
| 静态代码块                 | 类中、方法外的 `static { ... }` | 类初始化时执行，同一个类的初始化通常只完成一次 |
| 同步代码块                 | `synchronized (锁对象) { ... }` | 执行时获取相应对象的锁，用于协调线程访问       |

局部代码块结束表示块内变量不再可见，不保证对象立即释放，也不应把它当成手动管理内存的方式。同步代码块涉及线程和锁，这里先识别语法。

### 示例：先初始化类，再初始化对象

```java
// 文件：InitializationDemo.java
public class InitializationDemo {
    public static void main(String[] args) {
        new ChildInit();
        System.out.println("--- 再创建一个对象 ---");
        new ChildInit();
    }
}

class ParentInit {
    static {
        System.out.println("父类静态块");
    }

    {
        System.out.println("父类实例块");
    }

    public ParentInit() {
        System.out.println("父类构造方法");
    }
}

class ChildInit extends ParentInit {
    static {
        System.out.println("子类静态块");
    }

    {
        System.out.println("子类实例块");
    }

    public ChildInit() {
        super(); // 先执行父类初始化，再执行本类实例块和构造方法主体。
        System.out.println("子类构造方法");
    }
}
```

输出顺序：

```text
父类静态块
子类静态块
父类实例块
父类构造方法
子类实例块
子类构造方法
--- 再创建一个对象 ---
父类实例块
父类构造方法
子类实例块
子类构造方法
```

同一个类内，静态字段的显式初始化和静态块按源码顺序执行；实例字段的显式初始化和实例块也按源码顺序执行。创建子类对象时先完成父类部分，再完成子类部分。

构造方法通过 `this(...)` 调用本类其他构造方法时，实例字段初始化和实例块不会因此重复执行。复杂业务初始化通常更适合放进有名称的方法或构造方法，便于读出意图。

## 包与导入

包用于组织类型并参与访问控制，包名通常全部小写。源码目录一般按包名分层，例如 `com.example.model` 对应 `com/example/model`。

```java
package com.example.model; // package 位于 import 和类型定义之前。

import java.util.List; // 引入类型名称，后续可以直接写 List。

public class Course {
    private List<String> students;
}
```

同包的类型和 `java.lang` 中的公共类型通常不必显式导入。其他包中的类型可以通过 `import` 使用简单名称，也可以直接写全限定名；`import` 不会绕过 `private`、包访问权限等限制。

两个类的简单名称相同时，可以导入其中一个，另一个使用全限定名，例如 `java.util.Date` 和 `java.sql.Date`。包名相近也不代表同包，`com.example` 和 `com.example.model` 之间仍按不同包判断访问权限。

## 内部类与静态嵌套类

类可以定义在另一个类中，用于把紧密相关的类型放在一起。课件分为成员内部类、静态内部类、局部内部类和匿名内部类；其中带 `static` 的嵌套类严格说属于静态嵌套类。

| 类型       | 定义位置                        | 是否依赖外部类实例                       |
| ---------- | ------------------------------- | ---------------------------------------- |
| 成员内部类 | 外部类中，方法外，不加 `static` | 是，创建时关联一个外部对象               |
| 静态嵌套类 | 外部类中，方法外，加 `static`   | 否，没有隐含的外部对象引用               |
| 局部内部类 | 方法、构造方法或代码块内        | 取决于上下文，只能在局部范围使用         |
| 匿名内部类 | 表达式中直接定义并创建，无类名  | 取决于上下文，常用于临时实现接口或继承类 |

### 示例：局部变量、内部字段与外部字段同名

```java
// 文件：InnerClassDemo.java
public class InnerClassDemo {
    public static void main(String[] args) {
        Outer outer = new Outer();

        // 成员内部类关联 outer 对象，通过 outer.new 创建。
        Outer.Inner inner = outer.new Inner();
        inner.show(); // 依次输出 78、110、150。

        // 静态嵌套类不需要 outer 对象。
        Outer.Helper helper = new Outer.Helper();
        helper.show(); // 静态嵌套类
    }
}

class Outer {
    private int number = 150;

    class Inner {
        private int number = 110;

        public void show() {
            int number = 78;
            System.out.println(number);            // 方法中的局部变量。
            System.out.println(this.number);       // 当前 Inner 对象的字段。
            System.out.println(Outer.this.number); // 关联的 Outer 对象的私有字段。
        }
    }

    static class Helper {
        public void show() {
            // 没有 Outer.this；若要访问外部实例字段，需要显式获得 Outer 对象。
            System.out.println("静态嵌套类");
        }
    }
}
```

成员内部类可以直接访问关联外部对象的成员，包括私有成员；外部类访问内部类的实例成员，也需要一个内部类对象。局部类或匿名内部类捕获方法内的变量时，变量必须是 `final` 或事实上不再重新赋值的变量（effectively final）。

课件用汽车与发动机说明类型关联。实际建模时，汽车持有 `Engine` 字段就能表达组合关系；只有发动机类型确实只服务于该外部类、需要限制可见性或访问外部状态时，才进一步考虑嵌套定义。

## 匿名内部类与 Lambda

匿名内部类在表达式中同时完成类型定义和实例创建，适合只使用一次的实现：

```java
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("处理任务");
    }
};
task.run(); // 这里只是普通方法调用，不会启动新线程。
```

`new 接口名() { ... }` 创建的是实现接口的匿名类对象，接口本身仍不能直接实例化。匿名内部类也可以继承普通类或抽象类；没有类名，不能声明普通的具名构造方法。

### 函数式接口

Java 8 引入 Lambda，用于给函数式接口提供实现。函数式接口只有一个抽象方法的功能约定，可以同时有默认方法、静态方法等。与 `Object` 公共实例方法对应的声明不计入这个抽象方法数量。

`@FunctionalInterface` 不是使用 Lambda 的必要条件，但可以让编译器检查接口是否符合要求。

```java
// 文件：LambdaDemo.java
public class LambdaDemo {
    public static void main(String[] args) {
        // 完整写法：参数列表、箭头、方法体；结果类型由接口约束。
        Calculator full = (int left, int right) -> {
            return left + right;
        };

        // 单个表达式可直接作为返回结果，省略类型、大括号和 return。
        Calculator simple = (left, right) -> left + right;
        System.out.println(full.calculate(2, 3));   // 5
        System.out.println(simple.calculate(4, 6)); // 10

        // 没有参数保留 ()；Runnable.run 没有返回值。
        Runnable task = () -> System.out.println("处理任务");
        task.run(); // 处理任务

        // 只有一个参数，省略参数类型时也可省略括号。
        java.util.function.Consumer<String> printer = name -> System.out.println(name);
        printer.accept("小林"); // 小林
    }
}

@FunctionalInterface
interface Calculator {
    int calculate(int left, int right);
}
```

### 省略规则与使用边界

- 参数类型可由目标接口推断时可以省略，多个参数仍需括号；使用这种写法时不要只给部分参数写类型。
- 只有一个不声明类型的参数时，可以省略参数列表的括号；零个或多个参数不能省略。
- 方法体只有一个符合接口返回要求的表达式时，可以省略大括号。若需要返回值，表达式直接作为结果，不写 `return`，表达式后也不写方法体内部的分号。
- 保留大括号且接口方法有返回值时，需要写 `return`；给 Lambda 变量赋值的整条语句末尾仍需分号。

| 对比项       | 匿名内部类                                 | Lambda                                                            |
| ------------ | ------------------------------------------ | ----------------------------------------------------------------- |
| 目标类型     | 可以继承类或实现接口                       | 目标必须是函数式接口                                              |
| `this` 含义  | 当前匿名类对象                             | 沿用外围上下文的 `this`；静态上下文中没有 `this`                  |
| 捕获局部变量 | 要求 `final` 或 effectively final          | 同样要求                                                          |
| 常见编译形式 | `javac` 通常生成额外的匿名类 `.class` 文件 | `javac` 通常通过 `invokedynamic` 实现，不单独输出对应的匿名类文件 |

Lambda 不是把任意匿名内部类换成箭头就可以，也不意味着运行时没有对象。判断能否改写时，先看目标是否为函数式接口，再看代码是否依赖匿名类自己的 `this` 或其他成员。

## 课件对应范围

本篇依据「Java Xmind」目录中的三份《第九章：面向对象高级》PPT 整理，重复的目录页和动画页已合并。

| 课件                   | 页码与主要内容                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| 第九章：面向对象高级 1 | 第 5～53 页：继承、重写与 this/super；第 55～61 页：Object、final；第 63～69 页：抽象类与模板方法     |
| 第九章：面向对象高级 2 | 第 7～32 页：接口与新特性；第 34～44 页：多态、转型与支付案例；第 45～53 页：equals、Objects 与代码块 |
| 第九章：面向对象高级 3 | 第 4 页：包；第 6～17 页：内部类；第 19～22 页：函数式接口与 Lambda                                   |

示例中的变量名、注释和部分案例做了调整。类初始化、接口默认方法冲突、默认 toString 结果等简化说法，按本文说明理解。
