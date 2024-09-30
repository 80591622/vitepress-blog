# Date时间

```javascript
// 时间戳
Date.now()
new Date().getTime();
new Date().valueOf()

// 设置时间
new Date("2019-06-16 07:55:55"); // Sun Jun 16 2019 07:55:55 GMT+0800 (中国标准时间)

// 时间格式化 
date2 = new Date().toISOString().slice(0,10);   // 2019-06-16

typeof date2 // 'object'
```

## 时间戳转标准时间

// 方法一

```javascript
/*
** 时间戳转换成指定格式日期
** eg.
** dateFormat(1626750568413, 'Y年m月d日 H时i分')
** → "2021年07月20日 11时09分"
*/
const dateFormat = (timestamp, formats) => {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分s秒
    formats = formats || 'Y-m-d';

    let zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    let myDate = timestamp? new Date(timestamp): new Date();

    let year = myDate.getFullYear();
    let month = zero(myDate.getMonth() + 1);
    let day = zero(myDate.getDate());

    let hour = zero(myDate.getHours());
    let minite = zero(myDate.getMinutes());
    let second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};

// 方法二
const dateFormat = (timeStamp) => {
    let date = new Date(timeStamp);
    return date.getFullYear() + "年"
        + (date.getMonth() + 1).toString().padStart(2, 0) + "月"
        + (date.getDate()).toString().padStart(2, 0) + "日 "
        + (date.getHours()).toString().padStart(2, 0) + ":"
        + (date.getMinutes().toString().padStart(2, 0));
}
```

## 倒计时时间格式化

```javascript
// timeStamp 是未来时间 减去 当前时间的差值
function format_time(timeStamp) {
    // 计算各时间单位
    let day = Math.floor(timeStamp / (24 * 3600 * 1000));
    let hours = Math.floor((timeStamp % (24 * 3600 * 1000)) / (3600 * 1000));
    let minutes = Math.floor((timeStamp % (3600 * 1000)) / (60 * 1000));
    let seconds = Math.floor((timeStamp % (60 * 1000)) / 1000);

    // 使用数组存储不同时间单位
    let timeArr = [];
    if (day) timeArr.push(`${day}天`);
    if (hours) timeArr.push(`${hours}小时`);
    if (minutes) timeArr.push(`${minutes}分`);
    if (seconds) timeArr.push(`${seconds}秒`);

    return timeArr.length ? timeArr.join('') : "时间到！";
}

// 测试示例
console.log(format_time(90061000));  // 输出: "1天1小时1分1秒"
```

## 距离现在多久

```javascript
const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function formatToInterval(timestamp) {
    let now = Date.now()
    let value = now - timestamp
    value = value < 1 ? 1 : value

    if (value < MINUTE) {
      return Math.floor(value / SECOND) + '秒前'
    }
    if (value < HOUR) {
      return Math.floor(value / MINUTE) + '分钟前'
    }
    if (value < DAY) {
      return Math.floor(value / HOUR) + '小时前'
    }
    return format(timestamp, 'MM月DD日')
}
```

## 坑点 


```js
// 第1种 
let date1 = '12/04/2021 00:00:00'
let time1 = new Date(date1)
console.log(time1) 
//Mon Dec 04 2021 00:00:00 GMT+0800 (中国标准时间)

// 第2种 
let date2 = '12/04/2021'
let time2 = new Date(date2)
console.log(time2) 
//Mon Dec 04 2021 00:00:00 GMT+0800 (中国标准时间)

// 第3种 
let date3 = '12-04-2021'
let time3 = new Date(date3)
console.log(time3) 
//Mon Dec 04 2021 00:00:00 GMT+0800 (中国标准时间)

// 第4种  有bug
let date4 = '2021-12-04'
let time4 = new Date(date4)
console.log(time4) 
//Mon Dec 04 2021 08:00:00 GMT+0800 (中国标准时间)

// 第5种 
let date5 = '2021-12-4'
let time5 = new Date(date5)
console.log(time5) 
//Mon Dec 04 2021 00:00:00 GMT+0800 (中国标准时间)

// 第6种 
let date6 = '2021/12/4'
let time6 = new Date(date6)
console.log(time6) 
//Mon Dec 04 2021 00:00:00 GMT+0800 (中国标准时间)
```

除了第四种 其他都能满足预期，第四种加上 00:00:00  也能满足预期。

**探究**

那么为什么默认是8点呢？有没有觉得8这个数字很值得关注，我们所在的时区是东八区，如果以GMT标准0点来算的话，在那个时间点，这里就是8点啊。

那我就可以这样理解了，创建时间时，它默认时间确实是0点，但是是以GMT为基准的，所以将其转换成本地时间就是8点。而/分割的字符串在创建时，则是以本地时区为基准。

那么为什么js会对不同分割的时间字符串进行不同处理呢？貌似是因为-分隔且具有前导0的日期字符串，会被解析成ISO格式的字符串，以GMT时区为基准，不过我也没看懂。

说人话就是  09-11这种是规范的 ISO 格式，转到本地时间就成 八点了。

**兼容性问题** 

```js
const  sendDate = "2021-06-07 10:07:32"; // 这种在低版本 or ios上打印时间戳会出现 nan 的情况
sendDate = sendDate.replace(/-/g, "/");		// 得到 2021/06/07 10:07:32
sendDate.getTime()
```
