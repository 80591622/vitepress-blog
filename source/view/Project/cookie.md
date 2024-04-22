---
abbrlink: 7ec17189
title: 简易封装Cookie
date: 2018-01-16
categories: 
- Project
- 简易封装Cookie
---

<strong class='old-blog'>简易封装Cookie</strong>

[[toc]]

Cookie不仅仅有名字和值两个属性，还有域（domain）、路径（path）等属性。其中，不同的域、不同的路径下可以存在同样名字的cookie。
一般我们设置cookie的方法是用一个同样名字、一个值。这时就一定要搞清楚你要设置的cookie的域和路径，否则就会产生问题。

```javascript

/**
 * 生成过期时间
 *
 * @param {Number|Infinity} day 过期天数 默认 Infinity
 */
export function generateExpires(day) {
    const getDay = day || Infinity;
    const getNow = new Date();

    const getYearNumber = getNow.getFullYear();
    const getMonthNumber = getNow.getMonth() + 1;
    const getDateNumber = getNow.getDate();

    const getFullToday = `${getYearNumber}/${getMonthNumber}/${getDateNumber}`; // 只能用斜杠 不然有bug


    getNow.setTime(new Date(getFullToday).getTime() + (getDay * 24 * 60 * 60 * 1000));

    return getNow;
}

/**
 * 设置 Cookie
 *
 * @param {String} name Cookie 名
 * @param {String|Number|Boolean} value Cookie 值
 * @param {Number} expires 过期时间
 */
export function setCookie(name, value, expires = generateExpires(Infinity)) {
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}


/**
 * 获取 Cookie
 *
 * @param {String} name 名
 */
export function getCookie(name) {
    const cname = `${name}=`;
    const Cookie = document.cookie.split(';');
    for (let i = 0; i < Cookie.length; i += 1) {
        let item = Cookie[i];
        while (item.charAt(0) === ' ') item = item.substring(1);
        if (item.indexOf(cname) === 0) return item.substring(cname.length, item.length);
    }
    return '';
}

/**
 * 移除 Cookie
 * @param {string} name 名
 */
export function removeCookie(name) {
    try {
        if (!name) throw Error('请输入Cookie名');

        const expires = new Date();
        expires.setTime(expires.getTime() - 1);

        const value = getCookie(name);

        if (value != null) {
            setCookie(name, value, expires);
        }
    }catch (e) {
        console.log(e);
    }
}


```
