---
date: "2026-09-06 18:05:00"
title: data-containers
categories:
  - Java
  - java
  - base
tags:
  - java
  - collection
lastUpdated: "2026-09-06T10:07:36.861Z"
---

# Java 数据存储容器

变量保存一个值；当需要保存一组数据时，使用数组或集合容器。选择容器前先回答三个问题：元素数量是否固定、是否需要去重、是否需要通过 key 查找 value。

```text
一组同类型、数量固定  → 数组
一组有顺序的数据      → List
一组不重复的数据      → Set
按 key 查 value       → Map
按先后顺序处理任务    → Queue / Deque
```

## 容器关系

数组是 Java 语言内置的容器；集合框架位于 `java.util` 包。`Collection` 是 `List`、`Set`、`Queue` 的共同父接口，`Map` 以键值对方式保存数据，不继承 `Collection`。

```text
数组：String[]

Collection<E>
├─ List<E>   有序、可重复
├─ Set<E>    不重复
└─ Queue<E>  按队列规则处理

Map<K, V>    key-value 键值对（不属于 Collection）
```

`<E>`、`<K, V>` 是泛型，用于限制元素类型。泛型只能使用引用类型，因此 `List<int>` 不合法，应写成 `List<Integer>`；Java 会在需要时自动装箱或拆箱。

```java
List<Integer> scores = new ArrayList<>();
scores.add(95); // int 自动装箱为 Integer

int firstScore = scores.get(0); // Integer 自动拆箱为 int
```

Java 集合框架中，有些容器允许重复元素，有些不允许；有些保留顺序，有些不保证遍历顺序。接口表达“需要什么能力”，实现类决定具体行为。[Java `Collection` 文档](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collection.html)

## 数组：长度固定的一组数据

数组创建后长度不能改变，元素类型相同，通过下标访问；下标从 `0` 开始，最后一个下标是 `length - 1`。

```java
String[] names = {"Tom", "Jack", "Rose"};

names[1] = "Alice";
String firstName = names[0];
int size = names.length;
```

数组适合容量明确、结构简单的场景，例如一周七天、固定题目选项、批量读取的基础数据。访问越界会抛出 `ArrayIndexOutOfBoundsException`。

```java
for (int index = 0; index < names.length; index++) {
    System.out.println(names[index]);
}
```

数组是对象，即使元素是基本类型也是如此；`int[]` 保存 `int` 值，`String[]` 保存对字符串对象的引用。

| 操作            | 数组                                               |
| --------------- | -------------------------------------------------- |
| 创建            | `new String[3]`、`{"Tom", "Jack"}`                 |
| 获取长度        | `array.length`，不是方法                           |
| 按下标读取/修改 | `array[index]`                                     |
| 扩容            | 不能直接扩容；创建新数组并复制，或使用 `ArrayList` |

## List：有序且允许重复

`List` 按插入顺序保存元素，允许重复，也支持按下标访问。日常业务中默认选择 `ArrayList`；声明变量时优先使用接口类型 `List`。

```java
import java.util.ArrayList;
import java.util.List;

List<String> todos = new ArrayList<>();
todos.add("学习 Java");
todos.add("复习集合");
todos.add("学习 Java"); // 允许重复

String firstTodo = todos.get(0);
todos.set(1, "完成练习");
todos.remove("学习 Java"); // 删除第一个匹配项
```

| 场景                   | 推荐                 |
| ---------------------- | -------------------- |
| 需要保留顺序、允许重复 | `List` / `ArrayList` |
| 主要按下标读取         | `ArrayList`          |
| 需要不可修改的固定结果 | `List.of("A", "B")`  |

`List.of(...)` 返回不可修改列表，调用 `add`、`remove`、`set` 会抛出 `UnsupportedOperationException`；它适合返回固定配置或只读结果。`Arrays.asList(...)` 返回的是固定长度视图，不能 `add`、`remove`，但可 `set`，使用时要区分。

## Set：不重复的元素

`Set` 用于去重。`HashSet` 不保证遍历顺序；`LinkedHashSet` 保留插入顺序；`TreeSet` 按自然顺序或比较器排序。

```java
import java.util.HashSet;
import java.util.Set;

Set<String> tags = new HashSet<>();
tags.add("Java");
tags.add("集合");
tags.add("Java");

System.out.println(tags.size()); // 2
boolean hasJava = tags.contains("Java");
```

对象放入 `HashSet` 时，去重依赖 `equals` 和 `hashCode`。自定义类若希望按字段内容去重，需要正确重写这两个方法；只重写其中一个会导致集合行为异常。

| 需求                   | 实现            |
| ---------------------- | --------------- |
| 只关心去重，不关心顺序 | `HashSet`       |
| 去重且保留插入顺序     | `LinkedHashSet` |
| 去重且需要排序         | `TreeSet`       |

## Map：通过 key 保存和查找 value

`Map<K, V>` 保存键值对，key 不重复；同一个 key 再次 `put` 会替换原来的 value。常用实现是 `HashMap`，它不保证遍历顺序。

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> stockBySku = new HashMap<>();
stockBySku.put("SKU-001", 20);
stockBySku.put("SKU-002", 15);
stockBySku.put("SKU-001", 18); // 替换原库存

int stock = stockBySku.getOrDefault("SKU-001", 0);
boolean exists = stockBySku.containsKey("SKU-002");
```

遍历 `Map` 时优先遍历 `entrySet()`，一次即可得到 key 和 value。

```java
for (Map.Entry<String, Integer> entry : stockBySku.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

| 需求                | 实现            |
| ------------------- | --------------- |
| 普通 key-value 查询 | `HashMap`       |
| 按插入顺序遍历      | `LinkedHashMap` |
| 按 key 排序         | `TreeMap`       |

`Map` 的 key 与 `Set` 元素一样需要遵守 `equals` / `hashCode` 规则；可变对象不适合作为 `HashMap` 的 key，因为关键字段变化后可能无法再正确查到它。[Java `Map` 文档](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html)

## Queue 与 Deque：按顺序处理任务

`Queue` 适合先进先出（FIFO）任务，例如消息处理、排队任务。`Deque` 是双端队列，既能作为队列，也能作为栈。日常使用栈或队列时优先选择 `ArrayDeque`，不要使用旧的 `Stack` 类。

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Queue;

Queue<String> tasks = new ArrayDeque<>();
tasks.offer("发送邮件");
tasks.offer("生成报表");

String currentTask = tasks.poll(); // 发送邮件；空队列时返回 null

Deque<String> history = new ArrayDeque<>();
history.push("页面 A");
history.push("页面 B");
String previousPage = history.pop(); // 页面 B
```

| 容器           | 常用方法                                       | 行为                 |
| -------------- | ---------------------------------------------- | -------------------- |
| `Queue`        | `offer`、`poll`、`peek`                        | 入队、出队、查看队首 |
| `Deque`        | `addFirst`、`addLast`、`pollFirst`、`pollLast` | 从两端操作           |
| `Deque` 作为栈 | `push`、`pop`、`peek`                          | 后进先出（LIFO）     |

## 如何选择

| 你要解决的问题              | 优先选择                      | 原因                   |
| --------------------------- | ----------------------------- | ---------------------- |
| 固定数量、按下标存取        | 数组                          | 结构简单，长度固定     |
| 有顺序、允许重复的列表      | `ArrayList`                   | 业务中最常见的默认选择 |
| 消除重复标签、权限、ID      | `HashSet`                     | 自动去重               |
| 根据用户 ID、商品编号取数据 | `HashMap`                     | 通过 key 查 value      |
| 任务排队、消息处理          | `ArrayDeque` + `Queue`        | 先进先出语义明确       |
| 返回只读的固定集合          | `List.of`、`Set.of`、`Map.of` | 明确不可修改           |

先用接口声明，再选择实现类：`List<User> users = new ArrayList<>();`。除非业务真的依赖实现细节，否则方法参数和返回值也优先使用 `List`、`Set`、`Map` 等接口类型。

## 与 JavaScript 对照

| 目的                 | Java                                  | JavaScript                                                    |
| -------------------- | ------------------------------------- | ------------------------------------------------------------- |
| 固定长度的同类型数据 | `String[]`                            | `Array`，但 JS 数组长度可变且元素可混合类型                   |
| 有序、可重复列表     | `List<String>` / `ArrayList`          | `Array`                                                       |
| 去重                 | `Set<String>` / `HashSet`             | `Set`                                                         |
| key-value 查询       | `Map<String, User>` / `HashMap`       | `Map` 或普通对象 `{}`                                         |
| 队列、栈             | `Queue` / `Deque` + `ArrayDeque`      | 通常使用 `Array`，或自行封装队列                              |
| 类型约束             | 泛型在编译期约束，例如 `List<String>` | JS 运行时不限制；TS 可用 `string[]`、`Map<string, User>` 标注 |

Java 的数组和泛型集合都会限制元素类型；JS 的 `Array` 可以同时放入不同类型。学习时不要直接把 Java `List` 等同于 JS 数组：Java 的 `List` 是接口，`ArrayList` 才是常用实现。

## 小结

- 数组适合长度固定的数据；长度可能变化时通常使用 `ArrayList`。
- `List` 有序且允许重复，`Set` 用于去重，`Map` 通过唯一 key 查找 value，`Queue` / `Deque` 按处理顺序组织任务。
- 泛型限制容器元素类型，基本类型要使用包装类型，例如 `List<Integer>`。
- `List.of`、`Set.of`、`Map.of` 创建的是不可修改集合；需要增删改时使用 `ArrayList`、`HashSet`、`HashMap` 等实现。
- 先根据业务语义选择接口，再选择实现类；不要为了方便把所有数据都放进 `List`。
