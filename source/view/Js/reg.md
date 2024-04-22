

# RegExp正则

## 正则方法

```javascript
reg.test(str)  //检验 
//字符串中有没有正则能匹配到的内容，返回值: true false
reg.exec(str)  //捕获 
//方法用于检索字符串中的正则表达式的匹配。 
//返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
str.match(reg) // 把匹配到的字符放入到数组中，不匹配返回null
str.replace( reg ,""替换成什么 | callback（替换成什么）)
```

### 正则的修饰符、元字符

## 量词元字符

<span style='display: block;text-align: left;'> 常用指令	</span>|<span style='display: block;text-align: left;'> 描述</span>
:-------- | :--------  
\n | 在js中表示换行
* | `表示出现0次到多次`
？| `表示出现0次或1次`
+ | `表示至少出现一次`
{n} |  表示出现n次
{n,} | 表示至少出现n次
{n,m} | `最小是n，最大是m，（n，m都是一个非负整数`

`中文的范围：[ \u4e00 - \u9fa5 ]` （记忆：有事100，有酒罚我）

## 修饰符有三种
<span style='display: block;text-align: left;'>修饰符</span>|<span style='display: block;text-align: left;'> 说明</span>
:-------- | :-------- 
i|忽略大小写匹配
g|全局匹配，即是匹配一个后继续匹配，直到结束
m|多行匹配，即是遇到换行后不停止匹配，直到结束

## 特殊元字符
<span style='display: block;text-align: left;'>字符</span>|<span style='display: block;text-align: left;'> 说明</span>|
:-------- | :-------- 
\d | 匹配0-9中任意一个数字
\D|	除了0-9以外的任意一个字符
\w|	数字、字母、下划线中任意一个字符
\W| 除了数字、字母、下划线以外任意一个字符
\s|	匹配一个空白符（空格；制表符（tab）\t ；\n换行符 ；\r回车...）
\S| 除了空白符以外任意一个字符
\b|	匹配单词边界（边界字母和非字母连接的地方）
\n|	匹配一个换行符
.| 除换行符\n以外任意一个字符
\ | 转义符，把有特殊意义的字符转义为普通字符
^| (读作caret）表示以某个元字符开头
$| 表示以某个元字符结尾
x\|y | 表示x/y中任意一个
[]| 表示匹配[ ]中任意一个字符
[xyz]| 表示x/y/z中任意一个
[a-z]| 表示匹配a-z中的任意一个小写字母
[A-Z]| 表示匹配A-Z中的任意一个大写字母
[0-9]| 表示匹配0-9中的任意一个数字，等价于\d
[^abc]| 表示除了a、b、c以外的任意一个字符
()| 正则分组
(?: ) | 表示当前分组只匹配不捕获（取消分组捕获）
(?=)| 正向预查
(?!)| 负向预查


## 正向预查、负向预查

```javascript
let reg1 = /x(?=y)/ // 表示匹配x，并且仅当x后紧跟着一个y（匹配紧跟着y的x）
let reg2 = /x(?!y)/ // 表示匹配x，并且仅当x后没有y（匹配后面没有y的x）
```

### 构造函数方式
```javascript
var reg = new RegExp('\d', 'gi');
```

### 字面量方式

两个斜线内为正则的内容，后面可以跟修饰符，与第一种构造函数方式相比更简洁，缺点是正则内容`不能拼接`.

```javascript
'aBcd efg'.match(/[a-z]+/);// ["a"]
'aBcd efg'.match(/[a-z]+/i);// ["aBcd"]
'aBcd efg'.match(/[a-z]+/g);// ["a", "cd", "efg"]
'aBcd efg'.match(/[a-z]+/gi);// ["aBcd", "efg"]
'aB\ncd\n efg'.match(/^[a-z]+/m);// ["a"]
'aB\ncd\n efg'.match(/^[a-z]+/g);// ["a"]
'aB\ncd\n efg'.match(/^[a-z]+/gm);// ["a", "cd"]
// 注意不是 ["a", "cd", "efg"]
```
### 示例

`js正则删除行内块之间的空格`
```javascript
 let rep = function (match, item1, item2, item3) {
   // item2 是空格部分
   return item1 + item3
 }
 let source = template.content.replace(/(>)(\s*)(<)/g, rep);
```

`手机号*过滤`
```javascript
'123567905849'.replace(/^(\d{3})(\d*?)(\d{4})$/, '$1****$3')  // 扩展性好
'123567905849'.substr(0, 3) + '****' + '123567905849'.substr(7, 11)  // 快
```

`用正则写一个验证23-68中的数字`
```javascript
let reg6 = /[23-68]/ // 不是表示23-68；而是表示2或3-6或8

/* 将范围拆分为23-29；30-59；60-68 */
let reg7 = /^(2[3-9]|[3-5]\d|6[0-8])$/
```

`写一个正则，匹配第二个字母和第四个字母相同`
```javascript
//\数字 表示(引用)数字代表的分组的内容
let reg = /^[a-z]([a-z])[a-z]\1$/
console.log(reg.test('data')) // true
console.log(reg.test('java')) // true
console.log(reg.test('fear')) // false
```
`数据类型检测`
```javascript
Object.isTypeOf = function (val){
    // 1. 给传进来的val进行数据类型检测
    let result = Object.prototype.toString.call(val)
    // 2. 用一个正则把需要的代表类型的字符串获取到
    let reg = /^\[object ([a-zA-Z]+)\]$/
    let [,catches] = reg.exec(result) // 从捕获结果中把类型字符串解构出来
    // 3. 把上一步得到的代表类型的字符串返回
    return catches
}
console.log(Object.isTypeOf(1)) // Number
console.log(Object.isTypeOf(true)) // Boolean
```
`url查询参数序列化`
```javascript
// 1. 方便理解但方法繁杂
let url = 'https://www.baidu.com/s?name=mars&age=18&address=hebei'
let reg = /([^?=&]+)=([^?=&]+)/ig
let urlAry = url.match(reg)
let params = {}
for(let i = 0 ; i < urlAry.length ; i++){
    let item = urlAry[i]
    let itemAry = item.split('=') // 按照=把字符串拆分成一个数组，数组的第一项就是key，第二项就是value
    params[itemAry[0]] = itemAry[1] // 位params添加对象
}
console.log(params)

// 2. 不容易理解但方法简洁
let url = 'https://www.baidu.com/s?name=mars&age=18&address=hebei'
let params = {};
let reg = /([^?=&]+)=([^?=&]+)/ig;
url.replace(reg, (str, key, value) => params[key] = value);
console.log(params);

// 3. 方便理解2的
const queryURLParameter=(url)=> {
    let regParam = /([^?&=#]+)=?([^?&=#]+)?/ig,
    obj = {};
    url.replace(regParam, (...arg) => {
        obj[arg[1]] = arg[2];
    });
    return obj;
}
```

### 参考文档

[正则大全](https://github.com/any86/any-rule)
