---
date: 2026-11-06T16:09:40.000Z
title: Java 集合操作
description: 整理 Java 集合常用的增删改查、遍历、排序与转换操作。
categories:
  - Java
tags:
  - java
  - collection
lastUpdated: "2026-11-07T14:09:27.219Z"
---

# Java 集合操作

数组长度固定；集合可以根据需要增删元素。前面的 [Java 数据存储容器](./data-containers) 介绍了容器类型，这里主要记录日常操作。除特别说明外，示例使用 Java 8 语法，集合类需要从 `java.util` 包导入。

## 集合的声明方式

`List` 是接口，`ArrayList` 是它的实现类。声明变量时常使用接口类型，让后续更换实现更方便：

```java
Collection<String> collection = new ArrayList<>();
List<String> list = new ArrayList<>();
ArrayList<String> arrayList = new ArrayList<>();
```

- `Collection<String>`：可以使用集合通用方法，不能直接使用 `get` 按索引取值。
- `List<String>`：还可以使用 `get`、`set` 等列表方法，需要下标时常用这种声明方式。
- `ArrayList<String>`：可以使用 `ArrayList` 特有方法，但更换实现类型时可能需要修改声明。

## 选择集合

| 需求                 | 常用类型        | 特点                       |
| -------------------- | --------------- | -------------------------- |
| 按位置保存和读取数据 | `ArrayList`     | 有序、可重复，支持下标访问 |
| 去重                 | `HashSet`       | 不允许重复，不保证遍历顺序 |
| 去重并保留插入顺序   | `LinkedHashSet` | 按插入顺序遍历             |
| 按键查找值           | `HashMap`       | 键不能重复，不保证遍历顺序 |
| 从两端添加或取出     | `ArrayDeque`    | 可以作为队列或栈使用       |

`List`、`Set`、`Queue` 都属于 `Collection`；`Map` 保存键值对，属于集合框架，但不继承 `Collection`。

### 集合体系结构

```text
Collection<E>
├─ List<E>：有序、可重复、带索引
│  ├─ ArrayList<E>：动态数组，按索引访问快；中间插入、删除需要移动元素
│  ├─ LinkedList<E>：双向链表，按索引访问需要查找，首尾增删方便
│  └─ Vector<E>：动态数组，主要方法有同步保护，较少在新代码中使用
├─ Set<E>：元素不重复，不支持按索引访问
│  ├─ HashSet<E>：基于哈希表，不保证遍历顺序
│  ├─ LinkedHashSet<E>：保留插入顺序
│  └─ TreeSet<E>：按自然顺序或比较器排序，基于红黑树
└─ Queue<E>：队列接口，元素取出顺序由具体实现决定
   ├─ ArrayDeque<E>：数组实现的双端队列，常用于队列或栈
   └─ PriorityQueue<E>：基于优先级堆，队首是优先级最高的元素

```

普通队列常按先进先出处理，但 `PriorityQueue` 按优先级取出，默认取最小元素；它的迭代顺序不保证有序。

`Vector` 的单个方法有同步保护；多步操作仍不一定自动成为原子操作。

![Collection 与 Map 集合结构](/img/java-collection-map-structure.png)

```java
List<String> names = new ArrayList<>();
Set<String> tags = new HashSet<>();
Map<String, Integer> scores = new HashMap<>();
```

尖括号中的类型是泛型，限制集合中保存的数据类型。基本类型需要使用包装类型，例如 `List<Integer>`，不能写 `List<int>`。

## Collection 常用方法

下面的代码片段可放在方法中使用，集合类型需从 `java.util` 包导入。方法适用于支持相应操作的 `Collection`，具体集合可能对重复元素、`null` 或修改操作有不同限制。

| 方法                | 作用                                 |
| ------------------- | ------------------------------------ |
| `add(element)`      | 添加元素，返回值表示集合是否发生变化 |
| `remove(element)`   | 移除一个匹配的元素，成功返回 `true`  |
| `contains(element)` | 判断是否包含元素                     |
| `size()`            | 返回元素数量                         |
| `isEmpty()`         | 判断是否为空                         |
| `clear()`           | 清空集合                             |

```java
Collection<String> names = new ArrayList<>();
names.add("张三");
names.add("李四");
System.out.println(names.contains("张三")); // true
System.out.println(names.size());            // 2
names.remove("张三");
System.out.println(names.isEmpty());         // false
names.clear();
```

## 集合的三种遍历方式

集合的遍历顺序由具体类型决定。常用写法有迭代器、增强 `for` 和 Lambda 表达式。

### 1. 迭代器 Iterator

迭代器用于依次访问集合中的元素。`List`、`Set` 等实现了 `Collection` 的集合都可以通过 `iterator()` 获取迭代器，不需要通过下标访问。

```java
public class IteratorDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList("张三", "李四", "王五"));

        // 获取迭代器：初始时还没有取出任何元素。
        Iterator<String> iterator = names.iterator();

        // hasNext() 判断是否还有下一个元素，不会移动迭代器。
        while (iterator.hasNext()) {
            // next() 取出下一个元素，并将迭代器向前移动。
            String name = iterator.next();
            System.out.println(name);
        }
    }
}
```

运行结果依次为“张三”“李四”“王五”。每次调用 `next()` 都会取下一个元素；如果已经没有元素，继续调用会抛出 `NoSuchElementException`，所以通常先用 `hasNext()` 判断。

#### 遍历时删除元素

遍历过程中需要删除当前元素时，使用迭代器的 `remove()`：

```java
List<String> names = new ArrayList<>(Arrays.asList("张三", "李四", "王五"));
Iterator<String> iterator = names.iterator();

while (iterator.hasNext()) {
    String name = iterator.next();
    if ("李四".equals(name)) {
        iterator.remove(); // 删除刚刚由 next() 取出的元素。
    }
}

System.out.println(names); // [张三, 王五]
```

每次 `next()` 后最多调用一次 `remove()`；调用 `next()` 之前或连续调用两次 `remove()`，会抛出 `IllegalStateException`。迭代器能否删除也取决于集合是否支持该操作，不支持时会抛出 `UnsupportedOperationException`。

遍历 `ArrayList` 等常见集合时，不要直接通过集合增删元素，否则可能抛出 `ConcurrentModificationException` 或漏处理。Java 8 起也可以用 `removeIf` 按条件删除。

`Map` 不是 `Collection`，不能直接调用 `iterator()`；需要先遍历 `keySet()`、`values()` 或 `entrySet()`，再获取对应视图的迭代器。

**使用场景**：遍历时需要按条件删除当前元素，或者需要自己控制每次取出元素的时机。

### 2. 增强 for 循环

增强 `for` 适合逐个读取元素，写法比手动使用迭代器简洁。遍历集合时，底层通常通过迭代器完成。

```java
List<String> names = new ArrayList<>(Arrays.asList("张三", "李四", "王五"));

// 每次循环将一个元素赋给 name。
for (String name : names) {
    System.out.println(name);
}
```

**使用场景**：只需要逐个读取或处理元素，不需要索引，也不需要在遍历过程中通过迭代器删除元素。增强 `for` 同样可以遍历数组。

增强 `for` 不提供下标；需要下标时可以使用普通 `for` 循环。

### 3. Lambda 表达式

Java 8 起，可以使用集合的 `forEach` 方法，配合 Lambda 表达式处理每个元素。

```java
List<String> names = new ArrayList<>(Arrays.asList("张三", "李四", "王五"));

// name 是当前元素，箭头右侧是对它执行的操作。
names.forEach(name -> System.out.println(name));

// 另一种写法：方法引用，取消注释后与上面效果相同。
// names.forEach(System.out::println);
```

**使用场景**：对每个元素执行简单、相同的操作，例如打印或调用一个方法。`forEach` 不提供普通循环的 `break`、`continue`；需要提前结束循环时，可以使用增强 `for` 或迭代器。

需要按条件删除时，可以使用 `names.removeIf(name -> "李四".equals(name))`，前提是集合支持删除操作。

## List 操作

`List` 按位置保存元素，允许重复。`ArrayList` 是常用实现，下标从 `0` 开始。

### 增删改查

```java
List<String> names = new ArrayList<>();
names.add("张三");
names.add("王五");
names.add(1, "李四");  // 在索引 1 插入，原位置及之后的元素后移。

System.out.println(names.get(0)); // 张三
names.set(2, "赵六");            // 替换索引 2 的元素。
names.remove(1);                  // 按索引删除李四。
names.remove("张三");             // 按内容删除第一次匹配的元素。
System.out.println(names);        // [赵六]
```

`get`、`set` 和按索引删除时，索引必须在现有范围内，否则会抛出 `IndexOutOfBoundsException`。`add(index, value)` 允许 `index` 等于当前长度，表示追加。

`List<Integer>` 的 `remove` 容易混淆：传入 `int` 会按索引删除，要按数值删除时使用 `Integer.valueOf`。

```java
List<Integer> numbers = new ArrayList<>(Arrays.asList(10, 20, 30));
numbers.remove(1);                   // 按索引删除 20。
numbers.remove(Integer.valueOf(30));  // 按值删除 30。
System.out.println(numbers);         // [10]
```

### 按索引遍历

需要下标时，可以使用普通 `for` 循环。它适合 `ArrayList`；`LinkedList` 反复按索引读取较慢，遍历时可使用迭代器并自行计数。

```java
List<String> names = new ArrayList<>(Arrays.asList("张三", "李四", "王五"));
for (int i = 0; i < names.size(); i++) {
    System.out.println(i + ": " + names.get(i));
}
```

### LinkedList

`LinkedList` 是基于双向链表的集合，既实现了 `List`，也实现了 `Deque`。它可以按列表使用，也可以从两端添加、取出元素。和 `ArrayList` 一样，它允许重复元素。

#### 常用操作

```java
public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> names = new LinkedList<>();

        // List 操作：按添加顺序保存，可以通过索引访问。
        names.add("张三");
        names.add("李四");
        System.out.println(names.get(0)); // 张三

        // 双端操作：从头部或尾部添加、读取和删除。
        names.addFirst("王五");
        names.addLast("赵六");
        System.out.println(names);            // [王五, 张三, 李四, 赵六]
        System.out.println(names.getFirst()); // 王五，只读取不删除
        System.out.println(names.getLast());  // 赵六，只读取不删除

        names.removeFirst(); // 删除头部的王五。
        names.removeLast();  // 删除尾部的赵六。
        System.out.println(names); // [张三, 李四]
    }
}
```

`getFirst()`、`getLast()`、`removeFirst()` 和 `removeLast()` 在空集合上调用会抛出 `NoSuchElementException`。如果希望空集合时返回 `null`，可以使用 `peekFirst()`、`peekLast()`、`pollFirst()` 和 `pollLast()`。

`LinkedList` 允许存入 `null`，所以 `peek` 或 `poll` 返回 `null` 时，可能是集合为空，也可能取到的元素本身就是 `null`。

#### 和 ArrayList 怎么选

- `ArrayList` 基于动态数组，适合经常按索引读取的场景，通常作为列表的首选。
- `LinkedList` 基于双向链表，按索引访问需要从头部或尾部逐个查找；如果需要频繁操作两端，可以使用它提供的双端方法。
- 如果只需要队列或栈，通常也可以选择 `ArrayDeque`；它不允许存入 `null`。

不能只凭“链表增删快”就判断 `LinkedList` 更适合：在中间位置插入或删除时，找到目标位置也需要时间。实际选择要看读取和修改方式。

## Set 操作

![Collection 中 List 与 Set 的常见实现](/img/java-collection-list-set-structure.png)

`Set` 用于保存不重复的元素。重复添加时，`add` 返回 `false`。

### HashSet：去重，不保证顺序

`HashSet` 基于哈希表，适合只关心元素是否存在、是否重复的场景。它不保证遍历顺序，允许存入一个 `null`。

`HashSet` 判断对象是否重复依赖 `hashCode()` 和 `equals()`。如果自定义类需要按业务字段去重，应同时重写这两个方法；对象放入集合后，参与比较的字段应保持稳定。

```java
public class HashSetDemo {
    public static void main(String[] args) {
        Set<String> cities = new HashSet<>();
        System.out.println(cities.add("北京")); // true
        cities.add("上海");
        System.out.println(cities.add("北京")); // false，重复元素不会加入。
        System.out.println(cities.size()); // 2
        System.out.println(cities.contains("北京")); // true
        cities.remove("上海");
        for (String city : cities) {
            System.out.println(city); // 北京
        }
    }
}
```

#### 示例：按学号去重

下面约定学号相同就是同一个学生，所以 `equals()` 和 `hashCode()` 都使用学号。学号设为 `final`，放入集合后不会改变。

```java
public class StudentSetDemo {
    public static void main(String[] args) {
        Set<Student> students = new HashSet<>();
        students.add(new Student("S01", "张三"));
        students.add(new Student("S01", "小张")); // 学号相同，不再添加。
        students.add(new Student("S02", "李四"));
        System.out.println(students.size()); // 2
    }
}

final class Student {
    private final String id;
    private final String name;

    public Student(String id, String name) {
        this.id = Objects.requireNonNull(id, "学号不能为空");
        this.name = name;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (!(other instanceof Student)) return false;
        Student student = (Student) other;
        return id.equals(student.id); // 按学号比较。
    }

    @Override
    public int hashCode() {
        return id.hashCode(); // 与 equals 使用同一个字段。
    }
}
```

### LinkedHashSet：去重并保留插入顺序

`LinkedHashSet` 同样基于哈希结构去重，还会保留元素的插入顺序。适合去重后仍希望按原顺序展示的场景。重复添加已有元素不会改变它的位置。

```java
public class LinkedHashSetDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("张三", "李四", "张三", "王五");

        // 去重后保留第一次插入的顺序。
        Set<String> uniqueNames = new LinkedHashSet<>(names);
        System.out.println(uniqueNames); // [张三, 李四, 王五]
    }
}
```

### TreeSet：去重并排序

`TreeSet` 按元素的自然顺序或指定比较器排序，不按插入顺序保存。默认情况下，数字按从小到大、字符串按自然顺序排列。

```java
public class TreeSetDemo {
    public static void main(String[] args) {
        Set<Integer> scores = new TreeSet<>();
        scores.add(90);
        scores.add(70);
        scores.add(85);
        scores.add(70); // 重复元素不会再次加入。

        System.out.println(scores); // [70, 85, 90]
    }
}
```

`TreeSet` 根据比较结果判断元素是否重复：自然排序的 `compareTo` 或比较器的 `compare` 返回 `0` 时，会被视为重复。自定义类型需要提供自然排序规则或比较器，否则添加元素时可能抛出 `ClassCastException`。应让排序规则与 `equals` 尽量保持一致，避免去重结果与预期不同。

默认自然排序的 `TreeSet` 不接受 `null`；使用自定义比较器时，是否接受 `null` 取决于比较器。元素放入集合后，不应修改影响排序的字段。

## Map 操作

![Collection 与 Map 常见实现](/img/java-collection-map-implementations.png)

图中 Set 的“存取无序”不能概括所有实现：`LinkedHashSet` 保留插入顺序，`TreeSet` 按比较规则排序。

`Map<K, V>` 用键查找值。键不能重复，重复 `put` 会替换该键原有的值。

### put、get、remove

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("张三", 85);
scores.put("李四", 90);
scores.put("张三", 95); // 同一个 key，替换原值。

System.out.println(scores.get("张三"));                // 95
System.out.println(scores.get("王五"));                // null：没有该 key。
System.out.println(scores.getOrDefault("王五", 0));    // 0
System.out.println(scores.containsKey("李四"));        // true
scores.remove("李四");
System.out.println(scores.size());                      // 1
```

`HashMap` 允许值为 `null`，所以 `get(key)` 返回 `null` 可能是键不存在，也可能是键对应的值就是 `null`。需要区分时使用 `containsKey(key)`；`getOrDefault` 只在键不存在时使用默认值。

### HashMap：按键查找

`HashMap` 适合根据键查找数据，不保证遍历顺序。键可以有一个 `null`，值也可以为 `null`。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("张三", 85);
scores.put("李四", 90);
scores.put("张三", 95); // 键重复时，替换原来的值。
System.out.println(scores.get("张三")); // 95
```

`HashMap` 根据键的 `hashCode()` 和 `equals()` 判断是否为同一个键。自定义键类型时，应同时重写这两个方法，并避免在放入后修改参与比较的字段。

### LinkedHashMap：保留插入顺序

`LinkedHashMap` 也通过键查找，默认按插入顺序遍历，适合需要按添加顺序展示数据的场景。

```java
Map<String, Integer> scores = new LinkedHashMap<>();
scores.put("张三", 85);
scores.put("李四", 90);
scores.put("张三", 95); // 替换值，不改变原来的插入位置。
System.out.println(scores); // {张三=95, 李四=90}
```

它允许一个 `null` 键和 `null` 值，也可以配置为按访问顺序排列；这里使用默认的插入顺序。

### TreeMap：按键排序

`TreeMap` 根据键的自然顺序或指定的比较器排序，适合需要按键顺序查看数据的场景。

```java
Map<Integer, String> students = new TreeMap<>();
students.put(3, "王五");
students.put(1, "张三");
students.put(2, "李四");
System.out.println(students); // {1=张三, 2=李四, 3=王五}
```

`TreeMap` 按键比较，比较结果为 `0` 的键视为同一个键，后一次 `put` 会替换原值。自定义键需要实现 `Comparable` 或提供比较器，否则可能抛出 `ClassCastException`；比较规则尽量与 `equals` 保持一致。放入后不要修改影响排序的字段。

默认自然排序不接受 `null` 键；自定义比较器能否处理 `null`，取决于比较器。值可以为 `null`。

### 怎么选择

- 不需要顺序：`HashMap`。
- 需要按插入顺序遍历：`LinkedHashMap`。
- 需要按键排序：`TreeMap`。

`Map` 还有 `Hashtable` 和 `Properties`。前者的主要方法有同步保护，较少用于新代码；后者常用于读写字符串配置。`Properties` 不是泛型类，它继承 `Hashtable<Object, Object>`。

### 遍历键值对

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("张三", 85);
scores.put("李四", 90);

// 同时需要键和值时，遍历 entrySet。
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 只需要键或值时，分别使用 keySet() 或 values()。
for (String name : scores.keySet()) {
    System.out.println(name);
}

// Java 8：forEach 接收键和值。
scores.forEach((name, score) -> System.out.println(name + ": " + score));
```

### 统计字符出现次数

统计字符串 `aababcabcdabcde` 中每个字符出现的次数，按照 `a(5)b(4)c(3)d(2)e(1)` 的格式输出。把字符作为键、出现次数作为值；`LinkedHashMap` 保留字符第一次出现的顺序。

```java
public class MapTest1 {
    /*
        需求: 字符串 aababcabcdabcde
                    请统计字符串中每一个字符出现的次数，并按照以下格式输出

	    输出结果
                    a(5)b(4)c(3)d(2)e(1)
     */
    public static void main(String[] args) {
        String s = "aababcabcdabcde";
        // 创建Map集合, 键的位置存储字符, 值的位置存储次数
        Map<Character, Integer> map = new HashMap<>();

        // 遍历字符串, 获取每一个字符
        char[] charArray = s.toCharArray();
        for (char c : charArray) {
            // 判断当前字符在Map集合中是否存在
            if (!map.containsKey(c)) {
                // 不存在: 直接存入, 值的位置写1
                map.put(c, 1);
            } else {
                // 存在: 取出旧值, +1存回去
                map.put(c, map.get(c) + 1);
            }
        }


        // a(5)b(4)c(3)d(2)e(1)
        StringBuilder sb = new StringBuilder();
        map.forEach((key, value) -> sb.append(key).append("(").append(value).append(")"));
        System.out.println(sb);

    }
}
```

输出：

```text
a(5)b(4)c(3)d(2)e(1)
```

此例按 Java 的 `char` 遍历，适合示例中的英文字母；部分 Unicode 字符会由两个 `char` 表示。

## Queue 与 Deque 操作

队列通常先进先出。`offer` 添加元素，`poll` 取出并删除队首，`peek` 只查看队首；空队列的 `poll` 和 `peek` 返回 `null`。

```java
Queue<String> tasks = new ArrayDeque<>();
tasks.offer("任务一");
tasks.offer("任务二");
System.out.println(tasks.peek()); // 任务一，仍在队列中。
System.out.println(tasks.poll()); // 任务一，取出并删除。
```

`ArrayDeque` 不允许存入 `null`。作为栈使用时，可以通过 `Deque` 的 `push`、`pop` 操作，后放入的元素先取出；空栈调用 `pop` 会抛出 `NoSuchElementException`。

```java
Deque<String> history = new ArrayDeque<>();
history.push("首页");
history.push("详情页");
System.out.println(history.pop()); // 详情页
```

## 排序与集合转换

### List 排序

```java
List<Integer> scores = new ArrayList<>(Arrays.asList(85, 70, 95));
Collections.sort(scores);                      // 升序：[70, 85, 95]
scores.sort(Comparator.reverseOrder());        // 降序：[95, 85, 70]
```

排序会修改原列表，列表必须支持元素替换。比较对象时，可以按指定字段提供比较器，例如 `Comparator.comparing(Student::getName)`；字段可能为 `null` 时需要额外处理。

### 数组与 List

```java
String[] array = {"Java", "Go"};
List<String> fixed = Arrays.asList(array);       // 固定大小的列表视图。
fixed.set(0, "Python");                         // 可以替换，array[0] 也随之改变。

List<String> editable = new ArrayList<>(fixed); // 新建可增删的列表。
editable.add("Rust");
String[] result = editable.toArray(new String[0]);
```

`Arrays.asList` 返回的列表不能增加或删除元素；需要增删时，先用 `new ArrayList<>(...)` 创建新列表。直接将 `int[]` 传给 `Arrays.asList` 会把整个数组作为一个元素，而不是得到 `List<Integer>`。

## 不可修改集合与线程安全

`List.of`、`Set.of`、`Map.of` 从 Java 9 开始提供不可修改集合，不能通过返回的集合添加、删除或替换元素，也不接受 `null`。集合中的可变对象仍可能被修改。

```java
List<String> names = List.of("张三", "李四"); // Java 9+
// names.add("王五"); // 抛出 UnsupportedOperationException
```

`ArrayList`、`HashMap` 等常用实现不是线程安全的。多线程同时读写时，需要根据场景使用同步机制或并发集合，例如 `ConcurrentHashMap`；即使换成并发集合，涉及多步操作时也要确认这些操作是否需要整体保持原子性。
