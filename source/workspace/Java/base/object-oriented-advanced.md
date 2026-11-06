---
date: "2026-10-28 23:20:00"
title: Java 面向对象高级
description: 按面向对象高级课件整理继承、方法重写、多态、final、抽象类、接口、Object、代码块、包、内部类和 Lambda，配有注释示例。
categories:
  - Java
tags:
  - java
  - 面向对象
lastUpdated: "2026-11-06T01:27:14.665Z"
---

# Java 面向对象高级

对象有了各自的状态和行为之后，还需要处理类型之间的关系：哪些代码可以继承复用，哪些行为应该由接口约定，调用时又如何选择具体实现。本篇按三份《面向对象高级》课件整理这些内容。

阅读前建议先掌握 [Java 面向对象基础](./object-oriented-basics) 中的类、构造方法、封装与静态成员。各节示例独立使用，不需要把所有代码合并到同一个文件。

## 继承

当类之间存在“是一种”的关系时，可以考虑继承。例如程序员是一种员工，经理也是一种员工，两者都有姓名、年龄和工资，可以把这些共同内容定义在员工类中。

使用 `extends` 指定父类：`class Coder extends Employee` 表示 `Coder` 是子类，`Employee` 是父类。子类可以复用父类中可访问的成员，也可以增加自己的字段和方法。

### 示例：程序员和经理继承员工类

下面的代码保存为 `ExtendsDemo1.java` 即可运行。`Coder` 和 `Manager` 暂时不编写任何成员，先观察子类如何直接使用父类已有的方法。

```java
public class ExtendsDemo1 {
    public static void main(String[] args) {
        // 创建程序员对象，Coder 继承 Employee。
        Coder c = new Coder();

        // 这些 setter 都定义在 Employee 中，Coder 可以直接复用。
        c.setName("张三");
        c.setAge(23);
        c.setSalary(12000);

        // getter 同样来自父类，读取的是当前程序员对象中的数据。
        System.out.println(c.getName() + "---" + c.getAge() + "---" + c.getSalary());
        // 输出：张三---23---12000.0，salary 是 double 类型。
    }
}

// 父类：集中定义员工共有的数据和方法。
class Employee {
    // 私有字段不能在 Coder、Manager 中直接访问。
    // 通过公开的 getter、setter 读写，保留数据封装。
    private String name;
    private int age;
    private double salary;

    // 两个子类都可以复用的普通实例方法。
    public void work() {
        System.out.println("员工工作");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        // this.name 是当前对象的字段，name 是传入的参数。
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}

// 程序员是一种员工，无须重复定义姓名、年龄、工资和访问方法。
class Coder extends Employee {
}

// 经理也是一种员工，与 Coder 分别继承同一个父类。
class Manager extends Employee {
}
```

继承关系如下，`Coder` 和 `Manager` 互相没有继承关系：

```text
Employee（员工）
├─ Coder（程序员）
└─ Manager（经理）
```

`c.setName("张三")` 调用继承自 `Employee` 的方法，其中的 `this` 指向当前程序员对象。`name` 虽然由父类定义，仍然是这个对象自身状态的一部分，不属于另外一个独立的父类对象。

`Coder` 没有重写 `work()`，所以在 `main` 中调用 `c.work()` 会直接执行父类实现，输出“员工工作”。`Manager` 也可以使用同样的 getter、setter 和 `work()`；不同对象保存各自的数据，修改程序员的姓名不会改变经理的姓名。

三个类都没有显式声明构造方法，编译器会分别提供默认无参构造方法。执行 `new Coder()` 时，先沿构造调用链完成父类初始化，再完成子类初始化。构造方法本身不会被继承。

### 继承的规则

- 一个类只能直接继承一个父类，但可以逐级继承，例如 `Person → Employee → Manager`；类也可以实现多个接口。
- 构造方法不会被继承；子类使用自己声明的构造方法，或编译器提供的默认构造方法，通过构造方法调用链完成父类初始化。
- 按本文使用的 Java 8～21 语法，如果构造方法没有显式调用 `this(...)` 或 `super(...)`，编译器会尝试插入 `super()`。父类没有可访问的无参构造时，需要显式调用合适的父类构造方法，或通过 `this(...)` 转交给本类其他构造方法处理。
- 父类的 `private` 成员不能在子类中直接访问；子类对象仍包含父类定义的实例状态，可以通过父类提供的可访问方法操作。
- 其他成员能否访问，还要遵守 `public`、`protected` 和包访问权限的规则。

继承适合子类可以作为父类使用的关系。程序员可以作为员工使用；订单使用库存服务则通常通过字段持有服务对象，这种关系适合组合。

## 方法重写

方法重写（Override），也叫方法覆盖，是子类为父类中可重写的实例方法提供新的实现。方法表示的操作不变，具体执行逻辑由子类调整。

### 使用场景：修改或增强父类行为

子类需要父类提供的操作，但原有实现不完全适用时，可以重写方法：

- **修改行为**：在子类方法中编写新的逻辑，不调用父类实现。
- **增强行为**：先通过 `super.方法名(...)` 执行父类逻辑，再补充子类操作；也可以根据需要先执行子类操作，再调用父类实现。

下面沿用 `Father`、`Son` 示例。`Son` 保留父类的三项操作，再增加两项操作，属于增强父类行为。

### 示例：保留父类逻辑，再增加操作

代码保存为 `ExtendsDemo3.java`，可以直接运行。

```java
public class ExtendsDemo3 {
    public static void main(String[] args) {
        Son s = new Son();
        s.love(); // 调用 Son 重写后的 love 方法。
    }
}

class Father {
    // 不写访问修饰符，表示包访问权限；本例中的类在同一个包中。
    void love() {
        System.out.println("送花");
        System.out.println("送自行车");
        System.out.println("送冰箱");
    }
}

class Son extends Father {
    // 校验当前方法是否正确重写父类方法；方法名或参数写错会报编译错误。
    @Override
    public void love() {
        // 调用父类的实现，先执行上面的三条输出。
        // 这行代码是“调用父类方法”，不是建立继承关系。
        super.love();
        // 再补充子类自己的操作。
        System.out.println("送口红");
        System.out.println("送包");
    }
}
```

输出结果：

```text
送花
送自行车
送冰箱
送口红
送包
```

调用 `s.love()` 会进入 `Son.love()`。执行到 `super.love()` 时才调用 `Father.love()`，父类方法结束后继续执行子类剩余代码。如果去掉 `super.love()`，只会输出“送口红”和“送包”，不会自动执行父类原有逻辑。

### 重写规则

| 检查项       | 规则                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------- |
| 方法名和参数 | 与父类方法相同；参数名称可以不同，但参数类型及顺序必须匹配                                     |
| 访问权限     | 不能缩小父类方法的可见范围；本例从包访问权限扩大到 `public` 是允许的                           |
| 返回类型     | 基本类型和 `void` 必须保持一致；引用类型可以相同，也可以是父类返回类型的子类型（协变返回类型） |
| 异常声明     | 不能新增或扩大父类方法声明的受检异常范围，可以不声明或缩小范围                                 |
| 可重写范围   | `private` 方法不能被子类重写，`final` 方法禁止重写；静态方法的同名定义属于隐藏                 |

“方法声明完全一致”适合帮助记忆方法名和参数，但返回类型、访问权限与异常声明应按上表判断。`@Override` 用于编译检查，不是产生重写的开关；即使不写注解，符合规则的方法仍然构成重写，实际编写时建议保留它。

### 原文知识点总结

```text
方法重写的使用场景:
    子类继承了父类的方法, 但是子类不想原封不动的继承父类的方法逻辑, 想要修改或者是增强, 就可以重写父类方法.

    方法重载(Overload): 在同一个类中, 方法名相同, 参数不同, 与返回值无关
                        参数不同: 个数不同, 类型不同, 顺序不同.

    方法重写(Override): 在子父类中, 出现了方法声明完全一致的方法
                        (方法名, 参数, 返回值都需要和父类保持一致)
```

这段保留原文表述。重载也可以由子类新增方法与继承的方法共同形成，不局限于同一个类内声明；“与返回值无关”指不能只改变返回类型来构成重载，调用后的返回值仍需符合正常的类型检查规则。

### 重载与重写的区别

| 对比项   | 重载（overload）                   | 重写（override）             |
| -------- | ---------------------------------- | ---------------------------- |
| 关系     | 同名方法使用不同参数列表           | 子类重新实现父类的实例方法   |
| 参数     | 数量、类型或类型顺序不同           | 参数列表相同                 |
| 返回类型 | 不能仅靠返回类型区分重载           | 相同，或符合协变返回类型规则 |
| 选择时机 | 编译期根据参数的静态类型等规则确定 | 运行时根据实际对象选择实现   |

`private` 方法不能被子类重写，`final` 方法禁止重写，静态方法的同名定义属于隐藏。不要把这些情况和实例方法的重写混在一起。

## 构造方法

构造方法不能被继承。子类通过自己的构造方法调用父类构造方法，先初始化父类定义的状态，再处理子类特有的状态。

按本文使用的 Java 8～21 语法，构造方法没有显式调用 `this(...)` 或 `super(...)` 时，编译器会尝试补上 `super()`。如果父类没有可访问的无参构造方法，就需要显式调用合适的父类构造方法，或通过 `this(...)` 转交给本类其他构造方法处理。

### 构造方法示例

人有姓名和年龄，学生额外有成绩，老师暂时没有新增字段。下面分成四个文件，放在同一个目录中运行，分别观察父类、两个子类和测试入口。

#### Person.java：父类保存姓名和年龄

```java
public class Person {
    private String name;
    private int age;

    // 无参构造：供子类通过 super() 调用。
    public Person() {
    }

    // 有参构造：统一初始化父类定义的姓名和年龄。
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

#### Student.java：子类新增成绩

```java
public class Student extends Person {
    // 1. 有没有特有的成员变量 -> 有：score。
    // 2. 有没有特有的业务方法 -> 没有，下面只提供成绩的访问方法。
    // 3. 有没有需要重写的成员方法 -> 没有。
    // 4. 构造方法不会被继承，需要提供本类所需的构造方法。
    private int score;

    public Student() {
        // 没有显式调用时，编译器会补上 super()，调用 Person 的无参构造。
    }

    public Student(String name, int age, int score) {
        // 先调用 Person 的有参构造，初始化当前学生对象的姓名和年龄。
        super(name, age);
        // 父类构造执行完后，再设置学生特有的成绩。
        this.score = score;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
```

#### Teacher.java：子类复用父类状态

```java
public class Teacher extends Person {
    // 1. 有没有特有的成员变量需要补充 -> 没有。
    // 2. 有没有特有的方法需要补充 -> 没有。
    // 3. 有没有需要重写的方法 -> 没有。
    // 4. 即使没有新增字段，也需要提供本类所需的构造方法。
    public Teacher() {
        super(); // 显式调用父类无参构造，这里省略也可以。
    }

    public Teacher(String name, int age) {
        super(name, age); // 将姓名和年龄交给父类构造方法初始化。
    }
}
```

#### Test.java：创建对象并读取数据

```java
public class Test {
    public static void main(String[] args) {
        // Teacher 的有参构造通过 super(name, age) 初始化姓名和年龄。
        Teacher t = new Teacher("张三", 30);
        // 两个 getter 都继承自 Person。
        System.out.println(t.getName() + "---" + t.getAge());

        // Student 先初始化姓名、年龄，再初始化自己的 score。
        Student s = new Student("李四", 24, 100);
        // 姓名、年龄通过父类 getter 读取，成绩通过子类 getter 读取。
        System.out.println(s.getName() + "---" + s.getAge() + "---" + s.getScore());
    }
}
```

输出结果：

```text
张三---30
李四---24---100
```

执行 `new Student("李四", 24, 100)` 时，`super(name, age)` 先完成 `Person` 部分的初始化，然后 `this.score = score` 设置成绩。这里创建的是一个学生对象，不会额外创建一个独立的 `Person` 对象。

`Student` 和 `Teacher` 都声明了有参构造，所以需要自己保留无参构造，才能继续使用 `new Student()`、`new Teacher()`；编译器不会再自动补无参版本。

## this 和 super

`this` 指向当前对象，可以访问当前对象的成员，也可以通过 `this(...)` 调用本类其他构造方法。`super` 用于访问父类中可访问的成员，或通过 `super(...)` 调用直接父类构造方法。

![this 和 super 访问成员变量、成员方法与构造方法的用法对照](/img/java-this-super-summary.png)

```java
public class Demo1 {
    /*
        super的调用细节:
            super.父类成员变量
            super.父类成员方法();

            如果调用的成员, 在子类中不存在, super.可以省略不写.
     */
    public static void main(String[] args) {
        Zi z = new Zi();
        z.method();
    }
}

class Fu {
    int num = 10;

    public void show() {
        System.out.println("Fu...show...");
    }
}

class Zi extends Fu {

    public void method() {
        System.out.println(num);
        show();
    }
}
```

```java
public class Demo2 {
    /*
        项目升级到2.0版本, 需要新增一个成员变量
     */
    public static void main(String[] args) {
        A a1 = new A(10, 20);
        A a2 = new A(10, 20);

        A a3 = new A(10,20,30);
    }
}

class A {
    int a;
    int b;
    int c;

    public A() {
    }

    public A(int a, int b) {
        this.a = a;
        this.b = b;
    }

    public A(int a, int b, int c) {
        // `this(...)` → 构造调用语法，用来跳转到本类其他构造，**本身不是地址**
        this(a, b);
        this.c = c;
    }
}
```

注意：

    - this 调用本类成员、super 调用父类成员

    - this () super () 二者都在争夺构造方法的第一行位置，所以二者不能共存

## Object 类toString() 方法

![Object 类 toString 方法](/img/java-object-tostring.png)

```java
public class Student {
    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}
```

```java
public class ObjectMethod {
    /*
        Object类: 所有的类都直接, 或者间接的继承了Object类.

        成员方法:
            public String toString(): 返回对象的字符串表示形式.

        细节:
            System.out.println(); 打印对象的时候, 源码中会自动调用该对象的toString方法.

            public static String valueOf(Object obj) {
                return (obj == null) ? "null" : obj.toString();
            }

        Object类的toString方法, 源码:

            对象的全类名@十六进制哈希值
            哈希值: 对象的整数表示形式, 常被人称作为地址值.

            public String toString() {
                return getClass().getName() + "@" + Integer.toHexString(hashCode());
            }
     */
    public static void main(String[] args) {
        Student stu = new Student("张三", 23);
        System.out.println(stu);
    }
}
```

## final：限制变化

![final 关键字的介绍](/img/java-final-introduction.png)

![final 修饰变量的细节补充](/img/java-final-variable-details.png)

```java

public class FinalTest {
    /*
       final关键字: 可以修饰方法, 类, 变量.

       方法: 被其修饰的方法, 不能被重写
       类: 被其修饰的类, 不能被继承
       变量: 被其修饰的变量就变成了常量, 不能修改.

                基本数据类型变量: 数据值不可改变
                引用数据类型变量: 地址值不可改变

                final修饰成员变量, 初始化时机
                        1. 在定义的时候完成赋值
                        2. 在构造方法结束之前完成赋值.

       ----------------------------------------------------------------
       final修饰的变量就变成了常量, 常量的命名规范
       1. 如果是一个单词: 所有字母大写       MAX
       2. 如果是多个单词: 所有字母大写, 中间使用_分割  MAX_VALUE
     */
    public static void main(String[] args) {
        final int[] arr = {11, 22, 33};
        // arr = new int[2];
    }
}

class A {
    final int num;

    public A(int num) {
        this.num = num;
    }
}

final class Fu extends Object {
    public void method() {
        System.out.println("Fu类中非常重要的方法, 不希望子类修改.");
    }

    public void method1() {
        System.out.println("Fu类中非常重要的方法, 不希望子类修改.");
    }

    public void method2() {
        System.out.println("Fu类中非常重要的方法, 不希望子类修改.");
    }

    public void method3() {
        System.out.println("Fu类中非常重要的方法, 不希望子类修改.");
    }
}
```

## 抽象类

抽象类使用 `abstract class` 定义，不能直接实例化。它可以有字段、构造方法、普通方法和抽象方法；抽象方法只有声明，没有方法体。

```java
public class AbstractDemo1 {
    /*
        抽象类介绍: 一种特殊的父类, 内部可以编写抽象方法

        抽象方法: 共性的行为（方法）抽取到父类之后，发现该方法的实现逻辑
	                无法在父类中给出具体明确，该方法就可以定义为抽象方法

	                特点: 强制要求子类重写的方法
     */
    public static void main(String[] args) {
        Cat c = new Cat();
        c.eat();

        Dog d = new Dog();
        d.eat();
    }
}

abstract class Animal {
    public abstract void eat();

    public void drink(){
        System.out.println("喝水");
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
}

class Dog extends Animal {

    @Override
    public void eat() {
        System.out.println("狗吃肉");
    }
}
```

### 抽象类的注意事项

1. **抽象类不能直接实例化。**

   原因：如果允许创建对象, 就可以调用抽象方法了, 这样做没意义。

2. **抽象类不能直接创建对象，但仍然可以有构造方法。**

   原因：构造方法是交给子类通过super()调用的。

3. **抽象类中可以编写普通方法。**

   原因：子类可以直接继承到这些方法使用。

4. **抽象类的子类有两种处理方式。**

   A：重写所有抽象方法。

   B：将子类改造为抽象类。

![abstract 关键字的冲突问题](/img/java-abstract-keyword-conflicts.png)

```java
public class AbstractDemo2 {
    public static void main(String[] args) {
        Zi z = new Zi();
        z.method();
    }
}

abstract class Fu {

    public Fu(){
    }

    public abstract void show();
    public abstract void show2();

    public void method(){
        System.out.println("method...");
    }
}

class Zi extends Fu {

    public Zi(){
        super();
    }

    @Override
    public void show() {

    }

    @Override
    public void show2() {

    }
}

```

### 模板方法：保留共同流程

```java
abstract class ReportTemplate {
    // final 禁止修改 固定整体流程，子类只实现其中的内容步骤。
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

## 接口

- 接口用关键字interface来定义

  `public interface 接口名 {}`

- 接口不能实例化

- 接口和类之间是实现关系，通过implements关键字表示

  `public class 类名 implements 接口名 {}`

- 接口的子类（实现类）
  - 要么重写接口中的所有抽象方法
  - 要么是抽象类

```java
public class InterfaceDemo1 {
    /*
        1. 接口介绍
            体现的思想是对规则的声明

        2. 接口定义和使用
            接口用关键字 interface 来定义
            接口和类之间是实现关系, 通过 implements 关键字表示
     */
    public static void main(String[] args) {
        InterImpl ii = new InterImpl();
        ii.method();
        ii.show();
    }
}

interface Inter {
    public abstract void show();
    public abstract void method();
}

class InterImpl implements Inter {

    @Override
    public void show() {
        System.out.println("实现类重写后的 show 方法");
    }

    @Override
    public void method() {
        System.out.println("实现类重写后的 method 方法");
    }
}
```

### 接口中的成员特点

- 成员变量
  只能是常量
  默认修饰符：public static final
- 构造方法
  没有
- 成员方法
  只能是抽象方法
  默认修饰符：public abstract
  关于接口中的方法，JDK8 和 JDK9 中有一些新特性

```java
// 定义接口
interface Inter {
    // 成员变量：默认 public static final 常量，必须赋值
    int NUM = 100;

    // 成员方法：默认 public abstract 抽象方法，没有方法体
    void test();
}

// 实现类，重写接口全部抽象方法
class InterImpl implements Inter {
    @Override
    public void test() {
        // 常量可以直接使用
        System.out.println("接口里的常量 NUM = " + NUM);
        // NUM = 200;  // 报错！final 修饰，不能修改
    }
}

public class Test {
    public static void main(String[] args) {
        // Inter inter = new Inter(); // 报错！接口不能实例化、没有构造方法

        Inter inter = new InterImpl();
        inter.test();

        // 常量是static的，可以直接通过接口名访问
        System.out.println(Inter.NUM);
    }
}

```

### 类与接口的关系

![类和接口之间的各种关系](/img/java-class-interface-relationships.png)

```java
/**
 * 接口关系演示
 * 1. 接口 和 类：实现关系 implements
 *    - 可以单实现、多实现
 *    - 类可以先继承一个父类，同时实现多个接口（先extends，后implements）
 * 2. 接口 和 接口：继承关系 extends
 *    - 支持单继承，也支持【多继承】（接口打破类的单继承限制）
 */
public class InterfaceDemo3 {
    public static void main(String[] args) {
        // 接口多继承测试
        C c = new CImpl();
        c.method();

        // 类：继承父类 + 同时实现多个接口
        InterABImpl ab = new InterABImpl();
        ab.show();
        ab.showFu();
    }
}

// 接口A
interface A {
    void method();
}

// 接口B
interface B {
    void method();
}

/**
 * ✅ 接口多继承：接口C同时继承A、B
 * 两个父接口有同名抽象方法，子接口只需要重写一次
 */
interface C extends A, B {
    @Override
    void method();
}

// 实现类，实现子接口C
class CImpl implements C {
    @Override
    public void method() {
        System.out.println("CImpl 实现 method()");
    }
}

// 普通父类
class Fu {
    public void showFu() {
        System.out.println("父类Fu的showFu方法");
    }
}

interface InterA {
    void show();
}

interface InterB {
    void show();
}

/**
 * ✅ 类：先继承一个父类，同时实现多个接口
 * 父类、多个接口里面有同名show方法，实现类只需要重写一次show
 */
class InterABImpl extends Fu implements InterA, InterB {
    @Override
    public void show() {
        System.out.println("InterABImpl 重写 show()");
    }
}

```

### 抽象类与接口对比

| 对比项   | 抽象类                       | 接口                                       |
| -------- | ---------------------------- | ------------------------------------------ |
| 实例字段 | 可以有                       | 没有，字段隐含 `public static final`       |
| 构造方法 | 可以有，供子类初始化时调用   | 没有                                       |
| 方法     | 抽象方法、普通方法等         | 抽象方法、默认方法、静态方法和私有辅助方法 |
| 复用关系 | 子类直接继承一个父类         | 类可以实现多个接口                         |
| 使用侧重 | 共享相关类型的状态和部分实现 | 为不同类型约定共同能力                     |

![抽象类与接口的成员变量、成员方法和构造方法对比](/img/java-abstract-class-interface-comparison.png)

```java
/**
 * 订单业务接口
 */
public interface OrderService {
    /**
     * 创建订单
     */
    void create();

    /**
     * 查询单个订单
     */
    void findOne();

    /**
     * 查询订单列表
     */
    void findList();

    /**
     * 取消订单
     */
    void cancel();

    /**
     * 完结订单
     */
    void finish();

    /**
     * 支付订单
     */
    void paid();
}

```

```java
public class OrderServiceImpl implements OrderService {
    @Override
    public void create() {

    }

    @Override
    public void findOne() {

    }

    @Override
    public void findList() {

    }

    @Override
    public void cancel() {

    }

    @Override
    public void finish() {

    }

    @Override
    public void paid() {

    }
}

```

### 接口新特性

- JDK8 的新特性：接口中可以定义有方法体的方法。（默认、静态）

  ![JDK8 接口默认方法的定义格式与注意事项](/img/java-interface-jdk8-default-method.png)

```java
/**
 * JDK8 接口默认方法、静态方法 演示
 */
public class Jdk8InterfaceDemo {
    public static void main(String[] args) {
        // 多态创建实现类对象
        MyInterface impl = new MyInterfaceImpl();

        // 1. 默认方法：可以用对象调用，不强制重写
        impl.defaultShow();
        // 重写后的默认方法
        impl.defaultShow2();

        // 2. 静态方法：【只能用接口名调用】，不能用实现类/对象调用
        MyInterface.staticShow();
    }
}

// 定义接口
interface MyInterface {
    // 抽象方法（必须重写）
    void test();

    // JDK8 默认方法：有方法体，default 不能省略
    default void defaultShow() {
        System.out.println("接口里的默认方法 defaultShow");
    }

    // 第二个默认方法，实现类选择重写它
    default void defaultShow2() {
        System.out.println("接口里的默认方法 defaultShow2");
    }

    // JDK8 接口静态方法：static 不能省略
    static void staticShow() {
        System.out.println("接口里的静态方法 staticShow");
    }
}

// 实现类
class MyInterfaceImpl implements MyInterface {
    @Override
    public void test() {
        System.out.println("实现抽象方法 test");
    }

    // ✅ 默认方法可以选择性重写，重写时【去掉default关键字】
    @Override
    public void defaultShow2() {
        System.out.println("实现类重写了 defaultShow2");
    }
}

```

![JDK8 接口静态方法的定义格式与注意事项](/img/java-interface-jdk8-static-method.png)

```java
interface A {
    default void hello() {
        System.out.println("A的hello");
    }
}
interface B {
    default void hello() {
        System.out.println("B的hello");
    }
}

// 同时实现A、B，两个接口有同名默认方法，子类【必须重写】
class ABImpl implements A, B {
    @Override
    public void hello() {
        // 如果想使用任意一个接口中的某一个方法
        // 接口名.super.方法()  A.super.hello() 或 B.super.hello()
        System.out.println("解决冲突：实现类重写hello方法");
    }
}

```

- JDK9 的新特性：接口中可以定义私有方法。

  ![JDK9 接口私有方法的定义格式](/img/java-interface-jdk9-private-method.png)

```java
public class Test {
    public static void main(String[] args) {
        A a = new B();
        a.hello1();
        a.hello2();
    }
}

interface A {
    // 私有方法，只给接口内部用，对于重复逻辑抽离只在接口内部使用
    private void log() {
        System.out.println("公共日志");
    }

    default void hello1() {
        log();
        System.out.println("hello1");
    }
    default void hello2() {
        log();
        System.out.println("hello2");
    }
}

class B implements A {
}

```

## 多态

### 多态的前提和成员访问特点

多态的三个前提条件 - 继承 | 实现关系 - 方法重写 - 父类引用指向子类对象

多态创建对象后，成员访问特点 - 成员变量：编译看父类，运行看父类 - 成员方法：编译看父类，运行看子类 - 静态成员：编译看父类，运行看父类

![多态的成员访问特点与对象内存示意图](/img/java-polymorphism-member-access.png)

```java
public class PolymorphismDemo1 {
    /*
        多态的前提:
            1. 继承 | 实现关系
            2. 方法重写
            3. 父类引用指向子类对象

        多态的成员访问特点:
            成员变量: 编译看左边(父类), 运行看左边(父类)
                            因为是父类的引用, 所以访问存在局限性, 只能访问super空间中的数据.

            成员方法: 编译看左边(父类), 运行看右边(子类)
                            编译时检查方法在父类中是否存在
                                不存在: 编译出错
                                存在: 编译通过, 但运行的时候, 一定会执行子类的方法逻辑

            静态成员: 编译看左边(父类), 运行看左边(父类)
                             static修饰的成员, 推荐使用类名调用
                             f.show();  ---> 字节码文件中 ---> Fu.show();
     */
    public static void main(String[] args) {
        // 子类引用, 指向子类对象
        Zi z = new Zi();
        System.out.println(z.num);          // 20
        z.show();                           // Zi....show...

        // 父类引用, 指向子类对象 (以多态的形式创建对象)
        Fu f = new Zi();
        System.out.println(f.num);          // 10
        f.show();                           // Zi....show...
    }
}

class Fu {
    int num = 10;

    public static void show() {
        System.out.println("Fu...show...");
    }
}

class Zi extends Fu {
    int num = 20;

    public static void show() {
        System.out.println("Zi....show...");
    }
}
```

### 多态要点：扩展与转型

- **前提**：继承或实现关系、实例方法重写、父类或接口引用指向子类对象。
- **访问规则**：字段、静态成员看引用类型；重写的实例方法看实际对象类型。
- **好处**：形参使用父类或接口类型，可以接收不同子类对象，提高扩展性。
- **限制**：父类引用不能直接调用子类特有成员。
- **转型**：向上转型自动完成；向下转型先用 `instanceof` 判断，再强转。

  ![多态向上转型与向下转型示意图](/img/java-polymorphism-type-casting.png)

- **异常**：实际对象不能转换为目标类型时，强转会抛出 `ClassCastException`；`null instanceof 类型` 为 `false`。

```java
public class PolymorphismDemo3 {
    /*
        多态的好处: 提高代码的扩展性
                        - 方法的形参定义为父类类型, 就可以传入该类的任意, 子类对象了.
        多态的弊端: 不能直接调用子类特有的成员
                        - 需要向下转型.

        ClassCastException : 类型转换异常
                原因: 在强转的过程中, 如果目标类型和实际类型, 不是同一种类型, 就会出现该异常.

                instanceof : 判断左边的变量, 记录的是否是右边的类型, 返回true, false结果.
     */
    public static void main(String[] args) {
        useAnimal(new Dog());
        useAnimal(new Cat());
    }

    public static void useAnimal(Animal a) {
        // 第一次调用方法:  Animal a = new Dog();
        // 第二次调用方法:  Animal a = new Cat();
        a.eat();
        if (a instanceof Dog){
            Dog d = (Dog) a;
            d.watchHome();
        }else if (a instanceof Cat){
            Cat c = (Cat) a;
            c.catchMouse();
        }

    }

}


abstract class Animal {
    public abstract void eat();
}

class Dog extends Animal {

    @Override
    public void eat() {
        System.out.println("狗吃肉");
    }

    public void watchHome() {
        System.out.println("狗看家...");
    }
}

class Cat extends Animal {

    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }

    public void catchMouse() {
        System.out.println("猫捉老鼠...");
    }
}
```

### 多态案例：国内订单与国外订单

国内订单和国外订单都提供创建、查询、取消、完结、支付操作，但具体处理逻辑不同。用 `OrderService` 统一操作约定，程序根据用户选择创建实现对象，后续通过接口引用调用。

- **接口约定**：`OrderService` 定义共同操作。
- **不同实现**：两个实现类分别重写接口方法，提供国内、国外业务逻辑。
- **多态调用**：同一个 `orderService.create()`，实际执行哪个实现，由引用指向的对象决定。
- **特有行为**：`check()` 只在国外实现中定义，需要通过国外实现类型调用。

下面四个文件放在同一个目录中。示例只打印业务名称，用于观察调用关系。

#### OrderService.java：定义订单操作

```java
/**
 * 订单业务接口：统一国内订单和国外订单的操作约定。
 */
public interface OrderService {
    /** 创建单个订单 */
    void create();

    /** 查询单个订单 */
    void findOne();

    /** 查询订单列表 */
    void findList();

    /** 取消订单 */
    void cancel();

    /** 完结订单 */
    void finish();

    /** 支付订单 */
    void paid();
}
```

#### OrderServiceImpl.java：国内订单实现

```java
public class OrderServiceImpl implements OrderService {
    @Override
    public void create() {
        System.out.println("创建订单");
    }

    @Override
    public void findOne() {
        System.out.println("查询单个订单");
    }

    @Override
    public void findList() {
        System.out.println("查询订单列表");
    }

    @Override
    public void cancel() {
        System.out.println("取消订单");
    }

    @Override
    public void finish() {
        System.out.println("完结订单");
    }

    @Override
    public void paid() {
        System.out.println("支付订单");
    }
}
```

#### OverseasServiceImpl.java：国外订单实现

```java
public class OverseasServiceImpl implements OrderService {
    // 国外实现特有的方法，不属于 OrderService 接口约定。
    public void check() {
        System.out.println("IP地址检测");
    }

    @Override
    public void create() {
        System.out.println("国外业务 --- 创建订单");
    }

    @Override
    public void findOne() {
        System.out.println("国外业务 --- 查询单个订单");
    }

    @Override
    public void findList() {
        System.out.println("国外业务 --- 查询订单列表");
    }

    @Override
    public void cancel() {
        System.out.println("国外业务 --- 取消订单");
    }

    @Override
    public void finish() {
        System.out.println("国外业务 --- 完结订单");
    }

    @Override
    public void paid() {
        System.out.println("国外业务 --- 支付订单");
    }
}
```

#### Test.java：选择实现，再统一调用

```java
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入:  1. 国内订单   2. 国外订单");

        // 避免输入非整数时 nextInt() 抛出异常。
        if (!sc.hasNextInt()) {
            System.out.println("请输入 1 或 2");
            return;
        }
        int choice = sc.nextInt();

        // 引用使用接口类型，具体对象根据选择确定。
        OrderService orderService = null;
        switch (choice) {
            case 1:
                // 向上转型：接口引用指向国内实现对象。
                orderService = new OrderServiceImpl();
                break;
            case 2:
                // 向上转型：同一个接口引用也可以指向国外实现对象。
                orderService = new OverseasServiceImpl();

                // 接口没有 check()，不能直接写 orderService.check()。
                // 当前分支刚创建了国外实现对象，实际类型已知，可以安全强转。
                OverseasServiceImpl o = (OverseasServiceImpl) orderService;
                o.check();
                break;
            default:
                // 非法选项直接结束，避免后续使用未赋值或为 null 的引用。
                System.out.println("请输入 1 或 2");
                return;
        }

        // 编译时检查接口方法，运行时执行实际对象对应的实现。
        orderService.create();
        orderService.findOne();
        orderService.findList();
        orderService.cancel();
        orderService.finish();
        orderService.paid();
    }
}
```

输入 `1` 时执行国内实现；输入 `2` 时先输出“IP地址检测”，再执行国外实现。后面的六次方法调用无须重复编写。

这里的强转用于演示接口引用访问实现类特有方法。如果引用来自外部、实际类型不确定，应先用 `instanceof` 判断。`check()` 目前仅输出文字，没有真正检测 IP；六次订单调用也只是演示不同实现，不代表真实订单的状态流转顺序。

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
