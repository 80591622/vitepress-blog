---
abbrlink: jj86eea5
title: 聊一聊前端换肤
date: 2021-03-15
categories: 
- JS
- 聊一聊前端换肤
---
<strong class='old-blog'>聊一聊前端换肤</strong>

[[toc]]

### 前言

最近在写公司的组件库，遇到的动态更换主题的需求，顺带研究一波。

一般来说换肤的需求分为两种：

1. 一种是几种可供选择的颜色/主题样式，进行选择切换，这种可供选择的主题切换不会很多
2. 另一种是需要自定义色值（动态更换），或者通过取色板取色，可供选择的范围就很大了


### 如何实现 

### 对于可供选择的颜色/主题样式换肤的实现

- 一个全局class控制样式切换

　　切换的时候js控制样式的切换

- JS改变href属性值切换样式表，例如：

```javascript
<link id="theme" href="iread-theme.css" rel="stylesheet" type="text/css">
// js
document.getElementById('#theme').href = 'iread-update.css';
```

这种方式需要维护几个主题样式表，js点击切换的时候通过改变css样式表链接来实现。 

----------

这种实现对于，颜色和主题多了的时候，维护起来就很麻烦，需要同时维护 n 个样式文件，并且使用JS改变href属性会带来加载延迟，样式切换不流畅，体验也不好。

 

### 对于制定动态色值换肤的实现

如果是要实现动态换肤，自定义色值，那上面的几种方式就不适合了。 

先看下已有的实现有哪些方法

####  Element-UI的换肤功 [示例预览](https://elementui.github.io/theme-preview/#/zh-CN)

实现原理： [ 官方解释](https://github.com/ElemeFE/element/issues/3054)

1. 先把默认主题文件中涉及到颜色的 CSS 值替换成关键词：https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274
2. 根据用户选择的主题色生成一系列对应的颜色值：https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json
3. 把关键词再换回刚刚生成的相应的颜色值：https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js
4. 直接在页面上加 `style` 标签，把生成的样式填进去：https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211

实现原理十分暴力😂，还是比较麻烦的，看看还有没有更优雅的方法来实现。



**在实战中发现的问题（不是基于开发组件库）:**

1. spa跳转页面**新增**的css没有捕获，所以部分主题色就会失效 

   - 监听head引入style的个数，重新走下流程 效率低

   - 直接编译所有的css样式 (按需加载和直接引入)线上/开发  建议

2. 行内的样式不能编译

当我们在写ui库的时候只要修改自身的样式就行了，不要干扰开发者定义的样式（比如行内样式，UI库的开发肯定不会用行内的😄）

----

饿了么的采用的方式是，直接编译所有的index.css，导出的时候，把所有的**组件css**都编译过来然后在让开发者按需引入。



#### less的 modifyVars方法

蚂蚁antd、有赞vant团队的更换主题色功能是用 less 提供的 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 的方式进行覆盖变量来实现。

原理  : **modifyVars方法是是基于 `less` 在浏览器中可以直接 `编译css 变量` 的特性来实现。**所以在引入lessjs文件的时候需要**通过link方式引入**，然后基于less.js中的方法来进行修改变量。

link方式引入主题色文件

```javascript
<link rel="stylesheet/less" type="text/css" href="./iread-theme.less" />
/*
  *
  * 它会找到所有如下的less 样式标签，使用已编译的css同步创建 style 标签。
  * 也就是说我们必须把代码中所有的less 都以link的方式来引入(可以统一导入一个less里面)，这样less.js 才能在浏览器端实现编译。
  * 注：使用less 来实现换肤要注意 less 文件在 html 中编写的位置（优先级），不然很可能被其他css 文件所干扰导致换肤失败
  * */
```

更改主题色事件

```javascript
// color 传入颜色值
handleColorChange (color) {
    less.modifyVars({  // 调用 `less.modifyVars` 方法来改变变量值'
       @themeColor:color
    })
    .then(() => {
      console.log('修改成功');
    });
};
```

 可在webpack配置更改变量

```javascript
{
    test: /\.less$/,
    loader: 'less-loader',
    options: {
       // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
      lessOptions: {
        javascriptEnabled: true,
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
        }
      } 
   }
},
```

less方法仅限于用less的项目才能使用，查了下Sass是没有类似 less.modifyVars 这种方法的；

Sass 的变量不是纯声明式的，⽽是类似 JavaScript 的变量, 后面的更新不会影响前面的

也就是一个变量在不同阶段值是不同的。而 Less 中生效的只有最后一次赋值，统一修改 Sass 变量作用范围不明，不能确保符合预期

需要在 Sass 中抽取可定制的全局变量，需要使用 `!default` 声明变量，然后把用来覆盖的变量声明写在**前面**,例如：

![](https://tva1.sinaimg.cn/large/008eGmZEly1goo89u8g8pj30ik06et9h.jpg)

#### css 变量方法

如果项目里用的不是less, 那么还是用css的方法，通用且容易操作，使用**css变量**来进行主题色的修改，替换主题色变量，然后用setProperty来进行动态修改

用法就是给变量加`--`前缀，涉及到主题色的都改成`var(--themeColor)`这种方式

用之前看下兼容性

![](https://tva1.sinaimg.cn/large/008eGmZEly1goo8hf6vwpj31g20kjjx7.jpg)

大部分主流浏览器还是支持的，而且主要是操作起来够简便。

用法举例：

![](https://tva1.sinaimg.cn/large/008eGmZEly1goo8dm8qrpj30q40aoab1.jpg)

### 总结

个人更加偏向于 `antd` 或者基于 `css 自定义变量` 的写法，不过 `antd` 基于 `less` 在浏览器中的编译，less 官方文档中也说到了:

> This is because less is a large javascript file and compiling less before the user can see the page means a delay for the user. In addition, consider that mobile devices will compile slower.

所以编译速度是一个要考虑的问题。然后是css 自定义变量要考虑的可能就是浏览器中的兼容性问题了，不过感觉 css 自定义变量的支持度还是挺友好了的🤣🤣。

