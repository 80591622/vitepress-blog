---
abbrlink: b40b02c9
title: for in和for of区别
date: 2018-01-16
categories: 
- JS
- for in和for of区别
---

<strong class='old-blog'>for in和for of区别</strong>

[[toc]]

### for in

以任意顺序遍历一个对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。遍历数组时，key为数组下标字符串；遍历对象，key为对象字段名。

#### 数组

``` js
let arr = [{age: 1}, {age: 5}, {age: 100}, {age: 34}]
for (let key in arr) {
    console.log(key, arr[key])
}
// 打印
// 0 {age: 1}
// 1 {age: 5}
// 2 {age: 100}
// 3 {age: 34}
```

```javascript
let arr = [1, 2];

for (let key in arr) {
    console.log(arr[key]); // 会正常打印 1, 2
}

// 但是如果在 Array 原型链上添加一个方法
Array.prototype.test = function() {};

for (let key in arr) {
    console.log(arr[key]); // 此时会打印 1, 2, ƒ () {}
}
```

#### 对象

``` js
let obj = {f1: 'test1', f2: 'test2'}
for (let key in obj) {
    console.log(key, obj[key])
}
// 打印
// f1 test1
// f2 test2
```



#### for in 缺点

1. for in 迭代顺序依赖于执行环境，不一定保证顺序
1. for in 不仅会遍历当前对象，还包括原型链上的可枚举属性
1. for in 没有break中断
1. for in 不适合遍历数组，主要应用为对象


#### Object.keys()和for in的区别

- 遍历结果为由对象自身可枚举属性组成的`数组`，数组中的属性名排列顺序与使用for in循环遍历该对象时返回的顺序一致；
- 与for in区别在于`不能遍历`出原型链上的属性；

### for of

ES6引入的新语法。在`可迭代对象`（包括 Array，Map，Set，String，TypedArray，arguments对象，NodeList对象）上创建一个迭代循环,调用自定义迭代钩子，并为每个不同属性的值执行语句。

`Object对象不是可迭代对象，故for of 不支持。`for of有个很大的特点是支持数组的break中断。

#### 数组

``` js
let arr = [{age: 1}, {age: 5}, {age: 100}, {age: 34}]
for(let {age} of arr) {
    if (age > 10) {
        break // for of 允许中断
    }
    console.log(age)
}
// 打印
// 1
// 5
```

#### 三个数组：arr1=[1,2,3,4],arr2=[4,5,6],arr3=[5],将arr1与arr2合并，去重，然后返回不包含arr3中元素的新数组（用es6标准的新特性实现）

```javascript

let arr1 = [1, 2, 3, 4], arr2 = [4, 5, 6], arr3 = [5];

function fn(arr1, arr2, arr3) {
    let ary4 = [...arr1, ...arr2];
    let ary5 = [...new Set(ary4)];
    for (let [ind, item] of ary5.entries()) {
        if (arr3.includes(item)) {
            ary5.splice(ind, 1);
        }
    }
    return ary5
}
```

#### for of 优点

1. for of 有与for in 一样的简洁语法（这也是两者容易混乱的点），但没有for in的缺点
1. for of 保证顺序且不会仅遍历当前对象
1. for of 可与break，continue，return配合
