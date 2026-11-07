---
date: 2026-11-07T19:56:17.000Z
title: Java 泛型
categories:
  - Java
tags:
  - java
lastUpdated: "2026-11-07T14:09:27.219Z"
---

# Java 泛型

## 泛型介绍

```java
public class GenericsDemo1 {
    /*
        泛型介绍 : JDK5引入的, 可以在编译阶段约束操作的数据类型, 并进行检查

        泛型如果没有指定具体的类型, 默认为Object

        泛型的好处 :
                    1. 统一数据类型
                    2. 将运行期的错误提升到了编译期
     */
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("abc");
        list.add("abc");
        list.add("abc");

        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            String s = it.next();
            System.out.println(s.length());
        }
    }
}
```

## 泛型类

```java
public class GenericsDemo2 {
    /*
        泛型常见的标识符:

            E : Element 元素
            T : Type 类型
            K : Key 键
            V : Value 值
     */
    public static void main(String[] args) {
        Student<Integer> stu1 = new Student<>();
        stu1.setE(10);
    }
}

class Student<E> {
    private E e;

    public E getE() {
        return e;
    }

    public void setE(E e) {
        this.e = e;
    }
}
```

## 泛型方法

```java

public class GenericsDemo3 {
    /*
        泛型方法

              非静态方法: 跟着类的泛型去匹配的
                            类的泛型, 是在创建对象的时候确定到具体数据类型.

              静态方法: 调用方法的时候, 传入实际参数, 在这时候确定到具体的数据类型
                            注意: 静态方法如果声明了泛型, 必须声明出自己独立的泛型.
     */
    public static void main(String[] args) {

        String[] arr1 = {"张三", "李四", "王五"};
        Integer[] arr2 = {11, 22, 33};
        Double[] arr3 = {11.1, 22.2, 33.3};

        printArray(arr1);
        printArray(arr2);
        printArray(arr3);

    }

    public static <T> void printArray(T[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length - 1; i++) {
            System.out.print(arr[i] + ", ");
        }
        System.out.println(arr[arr.length - 1] + "]");
    }
}
```

## 泛型接口

```java

public class GenericsDemo4 {
    /*
        泛型接口
                1. 实现类, 实现接口的时候确定到具体的类型
                2. 实现类实现接口, 没有指定具体类型, 就让接口的泛型, 跟着类的泛型去匹配
     */
    public static void main(String[] args) {
        InterCImpl<String> c1 = new InterCImpl<>();
        c1.show("abc");

        InterCImpl<Integer> c2 = new InterCImpl<>();
        c2.show(123);
    }
}

interface Inter<E> {
    void show(E e);
}

class InterAImpl implements Inter<String> {

    @Override
    public void show(String s) {

    }
}

class InterBImpl implements Inter<Integer> {

    @Override
    public void show(Integer integer) {

    }
}

class InterCImpl<E> implements Inter<E> {

    @Override
    public void show(E e) {

    }
}
```

## 泛型通配符

```java
public class GenericsDemo5 {
    /*
        泛型通配符

                ? : 任意类型

                ? extends E : 可以传入的是E, 或者是E的子类

                ? super E : 可以传入的是E, 或者是E的父类
     */
    public static void main(String[] args) {

        ArrayList<Coder> list1 = new ArrayList<>();
        list1.add(new Coder());

        ArrayList<Manager> list2 = new ArrayList<>();
        list2.add(new Manager());

        ArrayList<String> list3 = new ArrayList<>();
        list3.add("abc");

        method(list1);
        method(list2);

    }

    public static void method(ArrayList<? extends Employee> list) {
        for (Employee e : list) {
            e.work();
        }
    }

}

abstract class Employee {
    private String name;
    private double salary;

    public Employee() {
    }

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public abstract void work();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Employee{name = " + name + ", salary = " + salary + "}";
    }
}

class Coder extends Employee {
    @Override
    public void work() {
        System.out.println("程序员写代码...");
    }
}

class Manager extends Employee {
    @Override
    public void work() {
        System.out.println("项目经理分配任务...");
    }
}

```
