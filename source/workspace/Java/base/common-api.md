---
date: 2026-11-06T14:04:02.000Z
title: Java 常用API
categories:
  - Java
tags:
  - java
lastUpdated: "2026-11-06T08:00:08.702Z"
---

# Java String方法

## String 类的特点

1. Java 程序中所有双引号字符串，都是 String 类的对象
2. 字符串在创建之后，其内容不可更改
3. 字符串虽然不可改变，但是可以被共享

```java

public class StringDemo1 {
    /*
        String类的特点:
            1. Java程序中的所有字符串文字（例如"abc" ）都是String类的对象
            2. String是不可改变的, 它们的值在创建后无法更改
                    - 想要更改, 需要使用新的对象进行替换.
            3. String虽然不可改变, 但是可以被共享操作.

                    字符串常量池(StringTable): 当我们使用双引号创建字符串对象的时候.
                                                会检查该数据在常量池中是否存在
                                                不存在: 创建新的
                                                存在: 不会创建新的对象, 复用已有的.
     */
    public static void main(String[] args) {
        String s1 = "abc";
        String s2 = "abc";

        System.out.println(s1 == s2);
    }
}
```

### 常见类构造方法

| 构造方法                         | 说明                             |
| -------------------------------- | -------------------------------- |
| `public String()`                | 创建空白字符串，不含任何内容     |
| `public String(String original)` | 根据传入的字符串，创建字符串对象 |
| `public String(char[] chs)`      | 根据字符数组，创建字符串对象     |

```java

public class StringDemo2 {
    /*
        String类的构造方法:
            public String() : 创建空白字符串，不含任何内容
            public String(char[] chs) : 根据字符数组，创建字符串对象
            public String(String original) : 根据传入的字符串，创建字符串对象

            问题: 两种创建字符串对象的方式, 有什么区别?
            回答:
                    1. 双引号直接创建: 数据在常量池中存储
                    2. 构造方法创建: 会在堆内存开辟独立的内存空间.
     */
    public static void main(String[] args) {
        // 创建空白字符串，不含任何内容
        String s1 = new String();
        System.out.println(s1);

        // 根据字符数组，创建字符串对象
        char[] chs = {'a', 'b', 'c'};
        String s2 = new String(chs);
        System.out.println(s2);

        // 根据传入的字符串，创建字符串对象
        String s3 = new String("abc");
        System.out.println(s3);

        String s4 = "abc";
    }
}
```

## String 方法

以下实例方法通过 `null` 引用调用时会抛出 `NullPointerException`；需要时先判断引用是否为 `null`。

### equals

`boolean equals(Object anObject)` 比较字符串内容，完全相同返回 `true`，否则返回 `false`。

```java
String s1 = "abc";
String s2 = new String("abc");
System.out.println(s1 == s2);      // false：比较引用
System.out.println(s1.equals(s2)); // true：比较内容
```

### equalsIgnoreCase

`boolean equalsIgnoreCase(String anotherString)` 忽略大小写比较字符串内容。

```java
System.out.println("abc".equalsIgnoreCase("ABC")); // true
```

### charAt

`char charAt(int index)` 根据索引获取字符，索引从 `0` 开始。

```java
System.out.println("Java".charAt(1)); // a
```

### toCharArray

`char[] toCharArray()` 将字符串转换为字符数组。

```java
char[] chars = "Java".toCharArray(); // ['J', 'a', 'v', 'a']
```

### length

`int length()` 返回字符串长度，常用于控制遍历次数。

```java
System.out.println("Java".length()); // 4
```

结合 `toCharArray()`、`charAt()` 和 `length()` 遍历字符串：

```java
public static void main(String[] args) {

        String s = "itheima";

        // 将字符串转换为字符数组
        char[] charArray = s.toCharArray();

        for (int i = 0; i < charArray.length; i++) {
            System.out.println(charArray[i]);
        }

        System.out.println("---------------------------------");

        // 根据索引找字符
        for (int i = 0; i < s.length(); i++) {
            // i = 0 1 2 3 4 5 6
            char c = s.charAt(i);
            System.out.println(c);
        }
    }
```

### substring

| 方法                                             | 说明                       |
| ------------------------------------------------ | -------------------------- |
| `String substring(int beginIndex)`               | 从指定索引截取到字符串末尾 |
| `String substring(int beginIndex, int endIndex)` | 截取指定索引范围内的内容   |

截取范围是**包头不包尾**：包含 `beginIndex`，不包含 `endIndex`。

```java
String text = "Java";
System.out.println(text.substring(2));    // va
System.out.println(text.substring(0, 2)); // Ja
```

### replace

`String replace(CharSequence target, CharSequence replacement)` 按字面内容替换，并返回替换后的字符串。原字符串不会改变，需要使用返回值。

```java
String text = "TMD";
String result = text.replace("TMD", "***");
System.out.println(result); // ***
System.out.println(text);   // TMD
```

### split

`String[] split(String regex)` 按传入的正则表达式切割字符串，并返回字符串数组。

```java
String text = "Java,Python,Go";
String[] languages = text.split(","); // ["Java", "Python", "Go"]
```

按加号切割并遍历结果：

```java
    public static void main(String[] args) {
        String s = "192+168+10+20";

        String[] arr = s.split("\\+");

        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }

    }
```

切割规则是正则表达式。遇到 `.`、`|` 等有特殊含义的字符，需要转义；例如按点切割可写成 `text.split("\\.")`。默认情况下，结果末尾的空字符串会被丢弃。

### isEmpty

`boolean isEmpty()` 在字符串长度为 `0` 时返回 `true`。

```java
System.out.println("".isEmpty());   // true
System.out.println("  ".isEmpty()); // false
```

### isBlank

`boolean isBlank()` 在字符串为空或只包含空白字符时返回 `true`，Java 11 起可用。

```java
System.out.println("  ".isBlank()); // true（Java 11+）
```

### contains

`boolean contains(CharSequence s)` 判断是否包含指定内容。

```java
System.out.println("hello".contains("ell")); // true
```

### startsWith

`boolean startsWith(String prefix)` 判断是否以指定内容开头。

```java
System.out.println("banana".startsWith("ba")); // true
```

### endsWith

`boolean endsWith(String suffix)` 判断是否以指定内容结尾。

```java
System.out.println("a.txt".endsWith(".txt")); // true
```

### indexOf

`int indexOf(String str)` 返回指定内容第一次出现的索引，找不到返回 `-1`。

```java
System.out.println("banana".indexOf("an")); // 1
```

### lastIndexOf

`int lastIndexOf(String str)` 返回指定内容最后一次出现的索引，找不到返回 `-1`。

```java
System.out.println("banana".lastIndexOf("an")); // 3
```

### trim

`String trim()` 去除首尾字符值不大于 `U+0020` 的字符，不改变原字符串。

```java
System.out.println("  Java  ".trim()); // Java
```

### strip

`String strip()` 按 Unicode 空白字符规则去除首尾空白，Java 11 起可用。它能识别更多 Unicode 空白字符，但不包括所有看起来像空格的字符；字符串中间的空格不会被去除。

```java
System.out.println("  Java  ".strip()); // Java（Java 11+）
```

### toLowerCase

`String toLowerCase()` 转换为小写，返回新字符串。

```java
System.out.println("Java".toLowerCase()); // java
```

无参数版本使用当前默认语言环境。处理协议标识等与自然语言无关的内容时，可使用 `text.toLowerCase(Locale.ROOT)`，需要导入 `java.util.Locale`。

### toUpperCase

`String toUpperCase()` 转换为大写，返回新字符串。

```java
System.out.println("Java".toUpperCase()); // JAVA
```

无参数版本使用当前默认语言环境；处理与自然语言无关的内容时，可传入 `Locale.ROOT`。

### join

`static String join(CharSequence delimiter, CharSequence... elements)` 使用指定分隔符拼接多个字符串。

```java
System.out.println(String.join("-", "a", "b")); // a-b
```

### valueOf

`static String valueOf(...)` 将基本类型或对象转换为字符串。

```java
System.out.println(String.valueOf(123)); // 123
```

`String.valueOf(Object)` 接收的对象为 `null` 时返回字符串 `"null"`。直接传入未指定类型的 `null` 会受重载解析影响，不能把 `String.valueOf(null)` 当作该用法。

### replaceAll

`String replaceAll(String regex, String replacement)` 按正则表达式匹配内容并返回替换结果。

```java
String text = "a1b2";
System.out.println(text.replaceAll("\\d", "")); // ab
```

`replace()` 按字面内容替换，`replaceAll()` 的第一个参数是正则表达式；替换文本中的 `$` 和 `\` 也有特殊含义。
