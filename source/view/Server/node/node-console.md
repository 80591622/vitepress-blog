---
abbrlink: e48jjjpp
title: 终端实现console输出不同颜色
date: 2019-08-15
categories: 
- Server
- NodeJS
---

<strong class='old-blog'>终端实现console输出不同颜色</strong>

[[toc]]


**在浏览器的控制塔也适用**

### 使用方式

```javascript
console.log('\x1B[31m%s\x1B[0m', '这是红色')
console.log('\x1B[36m%s\x1B[0m', '这是青色')
```



#### 规则说明

- **`\x1B[31m` 是一个转义序列，它将被您的终端拦截并指示它切换到红色。`\x1B`是不可打印控制字符 的代码escape。仅处理颜色和样式的转义序列也称为 [ANSI转义码](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors) 并且是标准化的，因此它们（应该）可以在任何平台上工作。这里可以指定多种样式`\x1B[31m\x1B[42m`；**
- **`%s` 是字符串（第二个参数）被注入的位置；上述代码还可以这样写：**

```javascript
console.log('\x1B[31m这是红色\x1B[0m')
console.log('\x1B[36m这是青色\x1B[0m')
```

- **`\x1B[0m` 表示重置终端颜色，使其在此之后不再继续成为所选颜色；**「推荐种用法」



### 封装

```javascript
// 颜色参考
const styles = {
    'reset': '\x1B[0m',
    'bright'    : '\x1B[1m', // 亮色
    'grey'      : '\x1B[2m', // 灰色
    'italic'    : '\x1B[3m', // 斜体
    'underline' : '\x1B[4m', // 下划线
    'reverse'   : '\x1B[7m', // 反向
    'hidden'    : '\x1B[8m', // 隐藏
    'black'     : '\x1B[30m', // 黑色
    'red'       : '\x1B[31m', // 红色
    'green'     : '\x1B[32m', // 绿色
    'yellow'    : '\x1B[33m', // 黄色
    'blue'      : '\x1B[34m', // 蓝色
    'magenta'   : '\x1B[35m', // 品红
    'cyan'      : '\x1B[36m', // 青色
    'white'     : '\x1B[37m', // 白色
    'blackBG'   : '\x1B[40m', // 背景色为黑色
    'redBG'     : '\x1B[41m', // 背景色为红色
    'greenBG'   : '\x1B[42m', // 背景色为绿色
    'yellowBG'  : '\x1B[43m', // 背景色为黄色
    'blueBG'    : '\x1B[44m', // 背景色为蓝色
    'magentaBG' : '\x1B[45m', // 背景色为品红
    'cyanBG'    : '\x1B[46m', // 背景色为青色
    'whiteBG'   : '\x1B[47m' // 背景色为白色
}

function colors(keys, source) {
    var values = ''
    if(typeof keys === 'string'){
        values = styles[keys]
    }
    else {
        keys.forEach(key => {
            values += styles[key]
        });
    }
    return values + source + styles['reset']
}

// 使用
console.log(colors(['red','greenBG','underline'], '这是红色、绿色背景、下划线'))
```

**也可以使用 `chalk`** 

node的终端样式库

```js
const chalk = require('chalk');
console.log(chalk.blue('Hello world!'));
console.log(chalk.blue.bgRed.bold('Hello world!'));
console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
```