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
lastUpdated: "2026-09-13T14:03:52.155Z"
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

![Java 数组的定义、访问与长度](/img/java-array-basics.webp)

```java
String[] names = {"Tom", "Jack", "Rose"};

names[1] = "Alice";
String firstName = names[0];
int size = names.length;
```

```javascript
const names = ["Tom", "Jack", "Rose"];

names[1] = "Alice";
const firstName = names[0];
const size = names.length;
```

### 动态初始化与默认值

Java 数组可以在创建时只指定元素类型和长度，JVM 会为每个数组元素填入该类型的默认值。这里的“动态初始化”是指元素值由 JVM 初始化，并不表示数组可以动态扩容；数组长度一旦确定就不能改变。

![Java 数组动态初始化及元素默认值](/img/java-array-dynamic-initialization.webp)

```java
int[] scores = new int[3];          // [0, 0, 0]
boolean[] states = new boolean[3];  // [false, false, false]
String[] names = new String[3];     // [null, null, null]
```

Java 数组元素的默认值如下：

| 元素类型                            | 默认值                    |
| ----------------------------------- | ------------------------- |
| `byte`、`short`、`int`、`long`      | `0`（`long` 可写作 `0L`） |
| `float`、`double`                   | `0.0`                     |
| `char`                              | `\u0000`（空字符）        |
| `boolean`                           | `false`                   |
| 类、接口、数组、`String` 等引用类型 | `null`                    |

默认值规则适用于数组元素和对象字段，不适用于方法内未初始化的局部变量；局部变量必须先赋值才能读取。

JavaScript 的近似写法是 `new Array(length)`，但它创建的是包含空槽的稀疏数组。读取空槽会得到 `undefined`，而 `forEach`、`map` 等方法会跳过这些空槽。因此，需要明确初始值时应主动填充：

```javascript
const emptySlots = new Array(3); // [empty × 3]
console.log(emptySlots[0]); // undefined

const scores = new Array(3).fill(0); // [0, 0, 0]
const states = Array.from({ length: 3 }, () => false);
const names = Array.from({ length: 3 }, () => null);
```

填充对象时不要直接使用 `new Array(3).fill({})`，因为三个元素会指向同一个对象；使用 `Array.from` 可以为每个位置创建独立对象：

```javascript
const users = Array.from({ length: 3 }, () => ({}));
```

| 对比项       | Java                                  | JavaScript                                       |
| ------------ | ------------------------------------- | ------------------------------------------------ |
| 指定长度创建 | `new int[3]`                          | `new Array(3)`                                   |
| 初始内容     | 按元素类型填入 `0`、`false` 或 `null` | 产生 3 个空槽，读取时得到 `undefined`            |
| 元素类型     | 创建时确定，数组元素必须是兼容类型    | 同一数组可保存不同类型                           |
| 长度         | 创建后固定                            | 可通过 `push`、`pop` 或修改 `length` 改变        |
| 明确填充值   | 创建数组时由 JVM 自动提供类型默认值   | 使用 `fill(value)` 或 `Array.from(...)` 主动生成 |

数组适合容量明确、结构简单的场景，例如一周七天、固定题目选项、批量读取的基础数据。访问越界会抛出 `ArrayIndexOutOfBoundsException`。

```java
for (int index = 0; index < names.length; index++) {
    System.out.println(names[index]);
}
```

```javascript
for (let index = 0; index < names.length; index++) {
  console.log(names[index]);
}

// 或使用 for...of
for (const name of names) {
  console.log(name);
}

// 或使用 forEach
names.forEach(name => console.log(name));
```

数组是对象，即使元素是基本类型也是如此；`int[]` 保存 `int` 值，`String[]` 保存对字符串对象的引用。

| 操作            | 数组                                               |
| --------------- | -------------------------------------------------- |
| 创建            | `new String[3]`、`{"Tom", "Jack"}`                 |
| 获取长度        | `array.length`，不是方法                           |
| 按下标读取/修改 | `array[index]`                                     |
| 扩容            | 不能直接扩容；创建新数组并复制，或使用 `ArrayList` |

### 综合案例：简易斗地主的做牌与洗牌

下面实现一个简化版斗地主案例，只完成做牌和洗牌：先将 52 张普通牌与大小王存入长度为 54 的数组，再打乱数组中牌的顺序。

![使用数组实现斗地主做牌与洗牌](/img/java-array-poker-shuffle.webp)

#### Java 实现

```java

public class PokerGame {
    public static void main(String[] args) {
        String[] pokers = createPokers();

        System.out.println("洗牌前：" + Arrays.toString(pokers));
        shuffle(pokers);
        System.out.println("洗牌后：" + Arrays.toString(pokers));
    }

    // 做牌：创建并填充 54 张牌
    public static String[] createPokers() {
        String[] suits = {"♠", "♥", "♣", "♦"};
        String[] ranks = {"3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"};
        String[] pokers = new String[54];
        int index = 0;

        for (String rank : ranks) {
            for (String suit : suits) {
                pokers[index++] = suit + rank;
            }
        }

        pokers[index++] = "🃏小王";
        pokers[index] = "🃏大王";
        return pokers;
    }

    // 洗牌：从数组末尾开始，将当前牌与前面任意一张牌交换
    public static void shuffle(String[] pokers) {
        Random random = new Random();

        for (int i = pokers.length - 1; i > 0; i--) {
            int randomIndex = random.nextInt(i + 1);
            String temp = pokers[i];
            pokers[i] = pokers[randomIndex];
            pokers[randomIndex] = temp;
        }
    }
}
```

`shuffle` 使用 Fisher–Yates 洗牌算法。第 `i` 轮从下标 `0` 到 `i` 中随机选择一个位置，与 `pokers[i]` 交换；遍历结束后，每种排列出现的概率相同。算法的时间复杂度是 $O(n)$，额外空间复杂度是 $O(1)$。

这个案例涉及的数组知识点：

- 使用 `new String[54]` 动态初始化固定长度数组，尚未写入的位置默认是 `null`。
- 通过 `pokers[index++]` 依次向数组写入 54 张牌。
- 通过 `pokers.length` 获取数组长度，并使用下标读取或修改元素。
- 交换数组元素时，使用临时变量保存其中一个元素。
- 洗牌会直接修改传入的原数组，不会创建一副新的牌。

### 多维数组：数组的数组

Java 中的多维数组本质是“数组的数组”。以二维数组为例，外层数组的每个元素都是一个一维数组引用。

```java
// 动态初始化一个 3 行 4 列的二维数组，元素默认值为 0
int[][] matrix = new int[3][4];

// 访问或修改元素：[行下标][列下标]
matrix[0][1] = 10;
int rows = matrix.length;       // 行数：3
int cols = matrix[0].length;    // 第 0 行的列数：4
```

```javascript
// JavaScript 中通过嵌套数组实现二维数组
const matrix = Array.from({ length: 3 }, () => new Array(4).fill(0));
matrix[0][1] = 10;
const rows = matrix.length;
const cols = matrix[0].length;
```

#### 综合案例：数字华容道（初始化与随机乱序）

以常见的“数字华容道”游戏为例，使用 $n \times n$ 的二维数组模拟游戏棋盘。主要实现逻辑分为四步：

- **创建棋盘**：声明并动态初始化 $n \times n$ 的整型二维数组。
- **有序填充**：使用递增计数器，按先行后列的顺序填入 $1 \sim n^2$ 的连续数字。
- **随机打乱**：遍历每一个单元格，随机生成另一组有效行列坐标 $(m, p)$，借助中间变量完成元素对调，实现全盘洗牌。
- **格式化输出**：使用制表符 `\t` 与换行符，将二维棋盘规整打印到控制台。

```java
public class ArrayTest {
    public static void main(String[] args) {
        start(5);
    }

    /**
     * 数字华容道：初始化 + 随机乱序
     * 1：创建n×n的二维数组
     * 2：用1~n*n依次填充数组
     * 3：随机交换位置，打乱顺序
     * 4：打印结果
     */
    public static void start(int n) {
        // 1：创建n×n的二维数组
        int[][] arr = new int[n][n];

        // 2：用1~n*n依次填充数组
        int count = 1;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                arr[i][j] = count++;
            }
        }

        // 3：随机交换位置，打乱顺序
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                // 3.1 生成随机坐标
                int m = (int) (Math.random() * arr.length);
                int p = (int) (Math.random() * arr.length);
                // 3.2 交换arr[i][j]和arr[m][p]的值
                int temp = arr[i][j];    // 临时保存当前位置的值
                arr[i][j] = arr[m][p];   // 把随机位置的值放到当前位置
                arr[m][p] = temp;        // 把临时值放到随机位置
            }
        }

        // 4：打印结果
        printArr(arr);
    }

    /**
     * 打印二维数组
     */
    public static void printArr(int[][] arr) {
        for (int[] ints : arr) {
            for (int anInt : ints) {
                System.out.print(anInt + "\t");
            }
            System.out.println();
        }
    }
}
```

这个案例涉及的多维数组知识点：

- 二维数组定义：`int[][] arr = new int[n][n]`，`arr.length` 表示行数，`arr[i].length` 表示第 `i` 行的列数。
- 双重循环遍历：外层循环控制行索引 `i`，内层循环控制列索引 `j`，通过 `arr[i][j]` 访问或修改单元格。
- 嵌套增强 `for` 循环：`for (int[] row : arr)` 先拿到每一行的一维数组，再通过 `for (int val : row)` 遍历具体单元格数值。
- 二维坐标随机交换：生成随机行列坐标 `(m, p)`，通过临时变量 `temp` 与当前坐标 `(i, j)` 完成元素互换。

## List：有序且允许重复

`List` 按插入顺序保存元素，允许重复，也支持按下标访问。日常业务中默认选择 `ArrayList`；声明变量时优先使用接口类型 `List`。

```java

List<String> todos = new ArrayList<>();
todos.add("学习 Java");
todos.add("复习集合");
todos.add("学习 Java"); // 允许重复

String firstTodo = todos.get(0);
todos.set(1, "完成练习");
todos.remove("学习 Java"); // 删除第一个匹配项
```

```javascript
const todos = [];
todos.push("学习 Java");
todos.push("复习集合");
todos.push("学习 Java"); // 允许重复

const firstTodo = todos[0];
todos[1] = "完成练习";
const index = todos.indexOf("学习 Java");
if (index > -1) {
  todos.splice(index, 1); // 删除第一个匹配项
}
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

Set<String> tags = new HashSet<>();
tags.add("Java");
tags.add("集合");
tags.add("Java");

System.out.println(tags.size()); // 2
boolean hasJava = tags.contains("Java");
```

```javascript
const tags = new Set();
tags.add("Java");
tags.add("集合");
tags.add("Java");

console.log(tags.size); // 2
const hasJava = tags.has("Java");
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

Map<String, Integer> stockBySku = new HashMap<>();
stockBySku.put("SKU-001", 20);
stockBySku.put("SKU-002", 15);
stockBySku.put("SKU-001", 18); // 替换原库存

int stock = stockBySku.getOrDefault("SKU-001", 0);
boolean exists = stockBySku.containsKey("SKU-002");
```

```javascript
const stockBySku = new Map();
stockBySku.set("SKU-001", 20);
stockBySku.set("SKU-002", 15);
stockBySku.set("SKU-001", 18); // 替换原库存

const stock = stockBySku.get("SKU-001") || 0;
const exists = stockBySku.has("SKU-002");

// 或使用普通对象
const stockObj = {};
stockObj["SKU-001"] = 20;
stockObj["SKU-002"] = 15;
stockObj["SKU-001"] = 18; // 替换原库存
```

遍历 `Map` 时优先遍历 `entrySet()`，一次即可得到 key 和 value。

```java
for (Map.Entry<String, Integer> entry : stockBySku.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

```javascript
// 使用 for...of 遍历 Map
for (const [key, value] of stockBySku) {
  console.log(`${key}: ${value}`);
}

// 使用 forEach
stockBySku.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// 使用普通对象
for (const sku in stockObj) {
  console.log(`${sku}: ${stockObj[sku]}`);
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

Queue<String> tasks = new ArrayDeque<>();
tasks.offer("发送邮件");
tasks.offer("生成报表");

String currentTask = tasks.poll(); // 发送邮件；空队列时返回 null

Deque<String> history = new ArrayDeque<>();
history.push("页面 A");
history.push("页面 B");
String previousPage = history.pop(); // 页面 B
```

```javascript
// Queue（队列）- 使用 Array 模拟
const tasks = [];
tasks.push("发送邮件");
tasks.push("生成报表");

const currentTask = tasks.shift(); // 发送邮件；空数组时返回 undefined

// Deque 作为栈（后进先出）
const history = [];
history.push("页面 A");
history.push("页面 B");
const previousPage = history.pop(); // 页面 B

// 如果需要真正的双端操作
const deque = [];
deque.unshift("头部元素"); // 从头部添加
deque.push("尾部元素"); // 从尾部添加
const head = deque.shift(); // 从头部移除
const tail = deque.pop(); // 从尾部移除
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
