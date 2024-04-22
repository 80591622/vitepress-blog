---
abbrlink: 3cc0fad5
title: 实现JS复制内容到剪贴板
date: 2019-03-19
categories: 
- Project
- 实现JS复制内容到剪贴板
---

<strong class='old-blog'>实现JS复制内容到剪贴板</strong>

[[toc]]


**实现JS复制内容到剪贴板**

(1):[第三方库：clipboard.js](https://github.com/zenorocha/clipboard.js)


(2):[原生方法：document.execCommand()](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)

- execCommand()允许运行命令来操作可编辑区域的内容，注意是`可编辑区域`

```javascript
bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)

//方法返回一个 Boolean 值，表示操作是否成功。

//aCommandName ：表示命令名称，比如： copy, cut 等
//aShowDefaultUI：是否展示用户界面，一般情况下都是 false；
//aValueArgument：有些命令需要额外的参数，一般用不到；

```

execCommand()方法的定义中提到，它只能操作可编辑区域，也就是意味着除了 `<input>、<textarea>`这样的输入域以外，是无法使用这个方法的。

`曲线救国`

```javascript
clipboard = (text) => {
 const copyText = document.createElement('input');
 copyText.setAttribute('readonly', 'readonly');//防止在移动端默认获取焦点，使键盘弹起
 copyText.setAttribute('value', text); // [!code focus]
 document.body.appendChild(copyText);
 copyText.select();
 if (document.execCommand('copy')) {
     document.execCommand('copy');
     alert('复制成功');
 }else{
     alert('请手动复制');
 }
 document.body.removeChild(copyText);//删除节点
};

```
