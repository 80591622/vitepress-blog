---
date: "2026-08-12 10:00:00"
title: jdk-install
categories:
  - Java
  - java
  - base
tags:
  - java
  - jdk
lastUpdated: "2026-08-30T16:47:07.753Z"
---

# mac 上安装 JDK 与版本切换

最近在 mac 上补 Java 环境，顺手整理一下。

如果只是装一个 JDK，用官网安装包也够了。但只要项目一多，很快就会碰到 JDK 17、21 来回切换的问题，这种场景下直接用 `SDKMAN!` 管理更省事。

## JDK 里都有什么

先看这张图：

![jdk组成](/img/jdk.png)

平时总会看到 `JDK`、`JRE`、`JVM` 这几个词，最简单的理解方式就是：

- `JVM` 是真正运行 Java 程序的地方
- `JRE` 是 Java 运行环境，里面包含 `JVM` 和核心类库
- `JDK` 是开发工具包，里面包含 `JRE`，也包含 `javac`、`java` 这类开发和运行工具

也可以直接记成：

```text
JDK = JRE + 开发工具
JRE = JVM + 核心类库
```

## 分别是干什么的

### JVM

`JVM` 就是 Java 虚拟机。

Java 程序最终不会直接跑在操作系统上，而是跑在 `JVM` 里。也正因为中间多了这一层，所以 Java 才能做到“一次编译，到处运行”。

### JRE

`JRE` 是运行环境。

如果你只是要运行一个已经写好的 Java 程序，那本质上需要的是运行环境，也就是 `JVM` 加上 Java 自带的基础类库。

### JDK

`JDK` 是开发工具包。

平时写代码、编译代码、调试程序，用到的基本都是 `JDK`。

常见的工具有：

- `javac`：把 `.java` 编译成 `.class`
- `java`：启动 Java 程序
- `javap`：反编译查看字节码
- `jps`、`jstack`、`jmap`：排查 Java 进程问题

所以平时开发机器装 `JDK` 就够了，它已经把运行环境一起带上了。

## Java 是怎么编译和运行的

Java 这套流程不复杂，顺一下就清楚了。

### 1. 先写 `.java` 文件

比如写一个 `Hello.java`：

```java
public class Hello {
  public static void main(String[] args) {
    System.out.println("hello java");
  }
}
```

### 2. 用 `javac` 编译

执行：

```bash
javac Hello.java
```

这一步会把源码编译成 `Hello.class`。

这个 `.class` 文件不是机器直接能执行的二进制文件，它是 Java 字节码。

### 3. 交给 JVM 运行

再执行：

```bash
java Hello
```

这里 `java` 命令会启动 `JVM`，然后由 `JVM` 去加载 `Hello.class` 并执行 `main` 方法。

整个流程可以简单记成：

```text
Hello.java
  -> javac 编译
Hello.class
  -> JVM 加载执行
程序运行结果
```

## 为什么 Java 能跨平台

核心点就在 `.class` 文件。

Java 源码不会直接编译成某个操作系统专属的机器码，而是先编译成统一的字节码文件。不同平台只要有对应的 `JVM`，就可以去解释或编译执行这份字节码。

所以更准确一点的说法其实是：

- 不是 Java 源码直接跨平台
- 是 Java 字节码借助不同平台的 `JVM` 实现跨平台

## 一条命令看懂当前环境

平时最常用的还是这几条：

```bash
java -version
javac -version
which java
echo $JAVA_HOME
```

它们分别用来确认：

- 当前运行时版本
- 当前编译器版本
- 当前 `java` 命令路径
- 当前 `JAVA_HOME`

如果你正在用 `SDKMAN!` 管理 JDK，这几项最好一起看，不然很容易出现“切了版本，但 IDE 或终端没跟上”的情况。

## 为什么选 SDKMAN!

原因很简单：

- 装多个 JDK 很方便
- 切换版本就是一条命令
- 不用自己反复改 `JAVA_HOME`
- 后面装 Maven、Gradle 也能继续用它管

## 安装 SDKMAN!

官方安装命令：

```bash
curl -s "https://get.sdkman.io" | zsh
```

装完后重新打开终端。

如果当前窗口想立刻生效，可以执行：

```bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

然后先确认一下：

```bash
sdk version
```

能正常输出版本号就说明没问题。

## 先看可安装的 JDK

不要直接把版本号写死，先看本机当前能装哪些版本：

```bash
sdk list java
```

这里会列出很多发行版，比如：

- `tem`：Temurin
- `amzn`：Amazon Corretto
- `zulu`：Azul Zulu
- `oracle`：Oracle JDK

我自己的习惯是：

- 默认装一个长期使用版本，比如 JDK 21
- 再留一个兼容老项目的版本，比如 JDK 17

如果没有特殊要求，`Temurin` 就够用了，比较通用。

## 安装多个 JDK

先从 `sdk list java` 里找到你要装的标识，再执行安装。

比如我一般会装两个版本：

```bash
sdk install java 21.0.x-tem
sdk install java 17.0.x-tem
```

这里的 `21.0.x-tem`、`17.0.x-tem` 只是举例，实际要以 `sdk list java` 输出的标识为准。

这一点要注意，`SDKMAN!` 的候选版本名会变，不能想当然写成固定值。

## 设置默认 JDK

比如把 JDK 21 设成默认：

```bash
sdk default java 21.0.x-tem
```

这个默认值会影响后面新开的终端窗口。

## 临时切换 JDK

有些老项目只能跑在 17 上，这时不用改全局，直接临时切：

```bash
sdk use java 17.0.x-tem
```

这个切换只对当前 shell 生效，关掉终端就恢复成默认版本了。

## 看看当前到底在用哪个版本

切完之后最好顺手查一下：

```bash
java -version
which java
echo $JAVA_HOME
```

正常情况下，`which java` 会指向 `~/.sdkman/candidates/java/current/bin/java`。

## 常用命令

```bash
# 查看当前使用的 Java
sdk current java

# 查看所有可安装版本
sdk list java

# 安装 JDK
sdk install java <identifier>

# 临时切换
sdk use java <identifier>

# 设置默认版本
sdk default java <identifier>

# 卸载某个版本
sdk uninstall java <identifier>
```

## 一套我觉得比较顺手的方案

如果是新机器，我一般会这么配：

```bash
sdk install java <21 identifier>
sdk install java <17 identifier>
sdk default java <21 identifier>
```

平时默认用 21。

遇到老项目时再执行：

```bash
sdk use java <17 identifier>
```

这样大多数场景就够了。

## 补充

如果你之前已经下载过 Oracle 或 Temurin 的 `.dmg` 安装包，也不是不能用，只是既然已经决定用 `SDKMAN!` 管理，多数情况下就没必要再手动装一遍。

统一交给 `SDKMAN!` 管，后面查版本、切版本、删版本都会轻松很多。
