---
abbrlink: d5825ec0
title: toFixed方法的bug
date: 2019-03-19
categories: 
- Project
- toFixed方法的bug
---

<strong class='old-blog'>toFixed方法的bug</strong>

最近在工作过程中碰到一个隐藏的bug，经调试发现竟然是toFixed函数不可靠的结果引起的。在处理价格比较的时候，用foFixed进行价格的四舍五入之后，竟然发现比较的结果有问题；
大家都知道，Number类型的变量有个toFixed方法，该方法将Number四舍五入为指定小数位数的数字，以`字符串`返回。

**IE**

```javascript
0.6 .toFixed(0); // 0
1.6 .toFixed(0); // 2


( 0.035 ).toFixed( 2 ); // 0.04
( 0.045 ).toFixed( 2 ); // 0.05
```

**Chrome**

```javascript
0.6 .toFixed(0); // 1
1.6 .toFixed(0); // 2

( 0.035 ).toFixed( 2 ); // 0.04
( 0.045 ).toFixed( 2 ); // 0.04
```

结论 ：**toFixed()函数靠不住，如果有需要精确控制的情况，特别是`金钱`的计算时，还是自己写个方法比较好。** 比如：

```javascript

/**
 * 保留两位小数
 * @param val 需要进行操作的数字
 */
export const returnFloat = (val) => {
    let value = Math.round(parseFloat(val) * 100) / 100;
    let xsd = value.toString().split(".");
    if (xsd.length === 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
};
```
