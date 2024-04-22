---
abbrlink: 4e764fd1
title: XCODE模拟器报错修复
date: 2019-11-17
categories: 
- FE框架 
- ReactNative
- XCODE模拟器报错修复
---

<strong class='old-blog'>XCODE模拟器报错修复</strong>

<!-- # `XCODE模拟器报错修复` -->

**1.MAC上调试工具React-native-debugger下载缓慢及其解决办法。**

我们可以下载React-native-debugger,用于RN项目的 调试

我在下载的时候，遇到两个无语的问题

这玩意儿是没有官网的，你只能从github上下载，我这里给一个点击就能直接下载的链接：https://github.com/jhen0409/react-native-debugger/releases/download/v0.10.0/rn-debugger-macos-x64.zip
这个东西大概90M左右，下载慢不说，而且因为网络原因，经常下载到快完成的时候失败！ 加快下载速度的方式如下：
打开你的VPN
打开上面的链接：https://github.com/jhen0409/react-native-debugger/releases/download/v0.10.0/rn-debugger-macos-x64.zip，很快就能下好

**2.调试中，可能偶尔就会出现让人非常无语的红屏问题，报（Could not connect to development server）**

比如下面的这个不能连接到服务器就是我偶尔或经常遇到的问题，

解决方法：一般刷新几次就好了，如果刷新多次无效，那么重新通过react-native启动项目

（如果IOS模拟器是个人我已经想要打死他了。。。）

**3.调试中报错：Missing request token for request**

解决方法：反正重启就万完事了。。。不行就再重启

**4. 导入新的图片image后，显示红屏（非法字符 Error on load image on React-native: Unexpected character ）**

解决方法：1.关闭项目，重新通过命令行启动。 2.如果还不行，那么再重试多次，一般会行的


**5.红屏，提示 JSON value 'XXXX'  of type NSString cannot be converted to  a YGValue. Did you forget the % or pt suffix ?**

**6.红屏，和上面一样，但提示的文字是“Runtime is not ready for debugging”**

这一般是这种情况： 就是你先打开了调试器（React-Native-debugger），然后才启动的项目，项目认为“自己还没有准备好调试”，所以报了这个错误

解决方法

调出控制台菜单（IOS模拟器下通过control + D开启）
选择Stop Remote JS Debugging


**7.红屏，和上面一样，提示文字: “Unhandled JS Exception:  global.nativeTraceBeginSection is not a function”**

这个问题据说不少人遇到过，解决方法是：在模拟器上删掉APP，然后重新编译安装，

它属于“完全的不可抗力”，不是因为你做错了什么，但问题恰恰就这样出现了。。。。。

参考链接 https://cloud.tencent.com/developer/ask/216506/answer/333025

**8. 发现程序有错但是控制台看不到红色错误（error）???**

这是因为。。。。。。。报的错误可能不是红色的，而是白色的

下面的这位error老弟，我还是第一次看到长得这么“白白净净” 的Error, 难道你不应该是“红脸关公”🐎 ？


解决办法：认真从一大堆输出中通过过滤掉其他信息的方式，定位到白色色块的error输出

 
**9.调出React-Native-Debugger的时候,报警告：Another debugger is already connected**

一般情况下，这是因为你的浏览器页面打开了debugger页面，长这样的

解决办法：把浏览器的debugger关掉就可以了

 
**10.解决MAC和IOS模拟器之间的复制粘贴问题**

用过IOS模拟器的人就会发现一个问题，MAC上的东东是不能直接粘贴到模拟器的APP上的

解决办法： https://www.jianshu.com/p/a34ab4933211

 
**11.如果报错：组件不是class/function,而是undefined**

不一定是当前组件没有正确导入，还可能是当前组件的子组件没有正确导入

 
**12.涉及图片引用改变的时候，偶尔会出现热重载失效的现象**

你说失效，辣就是失效，不狡辩（证据确凿，百口莫辩）

**13.IOS模拟器使用起来非常缓慢，如同乌龟和树獭一般，而且卡顿死机看心情**

解决办法：毫无办法，听天由命
