---
abbrlink: 617fb4bf
title: 配置WS
hidden: false
date: 2020-01-16
tags: WebStorm
categories: 
- Other
- 配置WS
---

<strong class='old-blog'>配置WS</strong>

[[toc]]

### webstorm 代码格式化设置与eslint standard一致

新弄了个vue项目，使用的eslint是standard规范。

新建项目，用webstorm打开项目，顺利开搞，结果一到vue组件里，就报黄色叹号警告⚠️了。

这里就需要配置一下webstorm里的 `code style`

`command + ',' `打开设置 -> `Editor`

#### 配置js格式化规范

![](https://ae01.alicdn.com/kf/H86506f0d0b25471d9826e543af0bc40cz.jpg)
![](https://ae01.alicdn.com/kf/Hbf762eeef1074a3aa8d614167de006355.jpg)
![](https://ae01.alicdn.com/kf/Hf694848fcefb4849a3171f607dec5c99W.jpg)
![](https://ae01.alicdn.com/kf/Ha4e8713c7aeb4dc19bfddb5df4e67146l.jpg)

#### 配置html/vue组件

![](https://ae01.alicdn.com/kf/H0e31c6cdba2e4cf5b1430509f83ad1bcF.jpg)

在do not indent children of里加入script标签

![](https://ae01.alicdn.com/kf/Ha11bf52407204bc496b2b54e4ba314eeM.jpg)

#### 配置当前项目的 eslint 

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h2yl18g6y7j214q0u040n.jpg)

一定要勾选 Run eslint --fix on save

右击 或者 command + s 自动转译符合的格式。
