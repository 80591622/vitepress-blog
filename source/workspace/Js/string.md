# String的方法简单整理
### 常用方法

## `indexOf() `

- str.indexOf(searchValue, fromIndex?)
   - 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。

```javascript{5,14,15}
"Blue Whale".indexOf("Blue");     // 返回  0
"Blue Whale".indexOf("Blute");    // 返回 -1
"Blue Whale".indexOf("Whale", 0); // 返回  5

"Blue Whale".indexOf("Whale", 5); // 返回  5

"Blue Whale".indexOf("", -1);     // 返回 0
"Blue Whale".indexOf("", 9);      // 返回  9
"Blue Whale".indexOf("", 10);     // 返回 10

"Blue Whale".indexOf("", 11);     // 返回 10  
 
//检测字符串是否存在
"Blue Whale".indexOf("Blue") !== -1; // true
"Blue Whale".indexOf("Bloe") !== -1; // false
```

## `substring()`
  - 返回被截取的字符串，不改变原来的，传入参数是**起始位置和结束位置**。(不包含结束位置)

```javascript
let str='serein blogscape';
str.substring(1) // erein blogscape
```

## `substr()`
  - 返回被截取的字符串，不改变原来的，，传入参数是**起始位置和要截取的长度**
  

```javascript
let str='serein blogscape';
str.substr(1,1) // e
```


## `slice()`
  - 跟 `substring()`用户相同
  - 当为负值的时候不同，还是看例子吧
  
```javascript
let a =  'abcdefg' 

a.slice(1,-1) //"bcdef"  相当于 a.slice(1, a.length-1 )   有负值统一用length减去当前的负值来截取
a.substring(1,-1) //a    相当于 a.substring(0,1) 参数最小为0，小于0自动默认为0，参数小的为第一个参数
```

- `toLowerCase()` 将整个字符串转成小写字母。
- `toUpperCase()` 将整个字符串转成大写字母。

## `charAt()`

stringObject.charAt(index)

charAt() 方法可返回指定位置的字符

```javascript
"日一二三四五六".charAt(1)

// -> 日
```

### Es6新方法

## padStart()

- ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。
  - `padStart()`用于头部补全，`padEnd()`用于尾部补全。padStart()和padStart()一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

```javascript
//必须是字符串
'abc'.padStart(10, '0123456789')  //"0123456abc"
```

## trim()

- `trim()`是两边的空格 `trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格

```javascript
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

## repeat()

- `repeat(n)`方法返回一个新字符串，表示将原字符串重复n次。

```javascript
'x'.repeat(3) // "xxx"
'na'.repeat(2.9) // "nana"
'na'.repeat(Infinity)// RangeError
'na'.repeat(-0.9) // ""
'na'.repeat(NaN) // ""
'na'.repeat('3') // "nanana"
```
## includes()

- **includes(), startsWith(), endsWith()**
  - `includes()`：返回布尔值，表示是否找到了参数字符串。
  - `startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
  - `endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

### 参考文档

[MDN STRING](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
