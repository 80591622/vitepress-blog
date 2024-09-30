
# Array的方法简单整理
## 快速生成一个数组

```javascript
//快速生成一个数组
Array.from(Array(100), (key, index) => index);

[...new Array(100).keys()]

 Array(3).fill(''); //["", "", ""]

new Array(10).fill({}).map((item)=>{
 return {
    title:"掘金会员",
    createtime:"2020-05-03",
    state:1,
    price:19.8,
    timeNum:12,
    userName:"虎克小哥哥",
    age:18,
    city:"上海"
  }
})

//递归
let arr = [];
(function dfs(i) {
  if (i < 100) {
    arr.push(i);
    dfs(++i);
  }
}(0));

Array(100).join(",").split(",").map((key,index)=> index)

Array.apply(null,Array(100)).map((key,index)=>index)
```

## some() & every()

every()与some()方法都是JS中数组的迭代方法。

`some()是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true;some一直在找符合条件的值，一旦找到，则不会继续迭代下去。`

`every()是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true;every从迭代开始，一旦有一个不符合条件，则不会继续迭代下去。`

<img style="border: .3em solid #e0dfcc;border-radius: 1em;width：98%"  src="https://p1.ssl.qhimg.com/t110b9a9301f089e3c51293f7c9.webp">


## reduce()

- reducer 函数接收4个参数:

    - Accumulator (acc) (累计器,没有返回值为undefined)

    - CurrentValue (cur) (当前值)

    - CurrentIndex (idx) (当前索引)

    - SourceArray (ary) (原数组)


```javascript
arr.reduce((Accumulator,CurrentValue,CurrentIndex,SourceArray) => {
...
}, init);
```

```javascript
let arr = [3,9,4,3,6,0,9];

//求数组项之和
let sum = arr.reduce((prev, cur) => {
    return prev + cur;
},0);

//求数组项最大值
let max = arr.reduce((prev, cur) => {
    return Math.max(prev,cur);
});

Math.max(...arr);

//数组去重
let newArr = arr.reduce((prev, cur) => {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]);
```

## isArray() 

Array.isArray() 用于确定传递的值是否是一个 Array。

```javascript
Array.isArray([1, 2, 3]);  // true

Array.isArray({foo: 123});  //false


let dom1 =  document.getElementsByClassName('token')
Array.isArray(dom1);  //false
Array.isArray([...dom1]);  //true
Array.isArray(Array.from(dom1));  //true
```
`Array.isArray 实现`

```javascript
Array.myIsArray = function(o) {
  return Object.prototype.toString.call(Object(o)) === '[object Array]';
};

console.log(Array.myIsArray([])); // true

```
## slice()

**请注意:** 该方法并`不会修改数组`，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。

- arr.slice(begin ,end?)
  - （包含 begin，但不包含 end）。
  - slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
  
```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
// [].slice.call(animals,1,3)

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

```javascript
// slice的内部实现
Array.prototype.slice = function(start,end){ 
      let result = new Array(); 
      start = start || 0; 
      end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键 
      for(let i = start; i < end; i++){ 
           result.push(this[i]); 
      } 
      return result; 
 }
```


## splice()

`splice()` 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

**删除**

第二个参数为`删除的个数`

```javascript
let ary =[1,2,3,4,5,6]
// [].splice.call(ary,1,1)
ary.splice(1,1);   // 返回删除的一项 [2]
ary  // [1, 3, 4, 5, 6]
```

**插入**

```javascript
let ary =[1,2,3,4,5,6]
ary.splice(2, 0, "7");   // [], 没有元素被删除
ary  // [1, 2, "7", 3, 4, 5, 6]

ary.splice(2, 0, "9",'10',11,12)
ary  // [1, 2, "9", "10", 11, 12, "7", 3, 4, 5, 6]
```

**删除 & 插入**

```javascript
let myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
myFish.splice(0, 2, 'parrot', 'anemone', 'blue'); //["angel", "clown"]
myFish  // ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
```

## filter() 实现

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。


注意： filter() 不会对空数组进行检测。

注意： filter() 不会改变原始数组。


**语法**

array.filter(function(currentValue,index,arr), thisValue)

```javascript
Array.prototype.selfFilter = function(callback, context) {
  // 不能是null调用方法
  if (this == null) {
        throw new TypeError("Array.prototype.selfFilter called on null or undefined");
    }
    // 第一个参数必须是函数
    if (typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function`);
    }
    
    const result = [];
    const length = this.length;

    // 循环调用 callback
    for (let i = 0; i < length; i++) {
        if (i in this) { 
            if (callback.call(context, this[i], i, this)) {
                result.push(this[i]);
            }
        }
    }

    return result;
};

```

## Map + Set + WeakMap + WeakSet

```javascript
// Sets
let s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Weak Sets 
let ws = new WeakSet();
ws.add({ data: 42 }); //只能是对象（null除外）

// Maps
let m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
let wm = new WeakMap(); 
wm.set(s, { extra: 42 });//只接受对象作为键名（null除外）
wm.size === undefined
```
<img style="border-radius: 4px;width:49%"  src="https://ae01.alicdn.com/kf/H98fdbfe7a328477cae2506f4f3346bd1G.png">

<img style="border-radius: 4px;width:49%"  src="https://ae01.alicdn.com/kf/Ha1b8b3b1e2db46e6926de265813c5cd3Z.png">

## 数组去重

```javascript
// 数组去重
const uniqueSet = (arr) => [...new Set(arr)];

const uniqueFilter = (arr) => arr.filter((item, index) => arr.indexOf(item) === index); // 性能较差，时间复杂度为 O(n²)

const uniqueReduce = (arr) => arr.reduce((acc, item) => {
    if (!acc.includes(item)) {
        acc.push(item);
    }
    return acc;
}, []); // 性能较差，时间复杂度为 O(n²)

const uniqueObject = (arr) => {
    const obj = {};
    return arr.filter((item) => {
        if (!obj[item]) {
            obj[item] = true;
            return true;
        }
        return false;
    });
}; // 性能较好，时间复杂度为 O(n)

const uniqueMap = (arr) => {
    const map = new Map();
    arr.forEach(item => map.set(item, item));
    return [...map.values()];
}; // 性能较好，时间复杂度为 O(n)

```
## 对象去重
```js
// 对象去重 
// 时间复杂度为 O(n²)，性能较差
const uniqueByFilter = (arr) => {
    return arr.filter((item, index, self) => 
        index === self.findIndex(obj => obj.id === item.id)
    );
};


// 性能较好，时间复杂度为 O(n)
const result = uniqueByFilter([{ id: 1 }, { id: 2 }, { id: 1 }]);
console.log(result); // 输出: [{ id: 1 }, { id: 2 }]

const uniqueByReduce = (arr) => {
    const map = new Map();
    return arr.reduce((acc, item) => {
        if (!map.has(item.id)) {
            map.set(item.id, true);
            acc.push(item);
        }
        return acc;
    }, []);
};


// 使用示例
const result = uniqueByReduce([{ id: 1 }, { id: 2 }, { id: 1 }]);
console.log(result); // 输出: [{ id: 1 }, { id: 2 }]

const uniqueByForEach = (arr) => {
    const seen = {};
    const result = [];
    arr.forEach(item => {
        if (!seen[item.id]) {
            seen[item.id] = true;
            result.push(item);
        }
    });
    return result;
};

// 使用示例
const result = uniqueByForEach([{ id: 1 }, { id: 2 }, { id: 1 }]);
console.log(result); // 输出: [{ id: 1 }, { id: 2 }]
```

## forEach中return有效果吗？如何中断forEach循环？

在forEach中用return不会返回，函数会继续执行。

```javascript
let nums = [1, 2, 3];
nums.forEach((item, index) => {
  return;//无效
})
```
**中断方法：**

(1). 使用try监视代码块，在需要中断的地方抛出异常。

(2). 官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环


## js将多维数组转换为一维数组

```javascript

let arr = [1, 2, 3, 4, 5, [6, 7, 8, [9, 10, 11, 12, [13, 14, 15, 16]]]]
console.log(arr.join())   // 输出为：1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16

let newArr = arr.join().split(',')
let newArr = arr.toString().split(',')
let newArr = (arr + '').split(',')


console.log(newArr) // 输出为：["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
```


**递归**

```javascript
let arr = [1, 2, 3, 4, 5, [6, 7, 8, [9, 10, 11, 12, [13, 14, 15, 16]]]]
let newArr = [] // 存放转化后的一维数组
function arrConversion (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arrConversion(arr[i])
    } else {
      newArr.push(arr[i])
    }
  }
}
arrConversion(arr)
console.log(newArr) 
```

**循环**

```javascript
function flatArray(ary) {
  let result = [];
  while (ary.length) {
    let item = ary.shift();
    if (Array.isArray(item)) {
      ary.unshift(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}
```

**flat**

```javascript
console.log([1 ,[2, 3]].flat()); // [1, 2, 3]
 
// 指定转换的嵌套层数
console.log([1, [2, [3, [4, 5]]]].flat(2)); // [1, 2, 3, [4, 5]]
 
// 不管嵌套多少层
console.log([1, [2, [3, [4, 5]]]].flat(Infinity)); // [1, 2, 3, 4, 5]
```

**正则**

```javascript
let ary = [1, [2, [3, [4, 5]]], 6];
let str = JSON.stringify(ary);
let result = str.replace(/(\[|\])/g, '').split(',');
console.log( result )
```

## 数组快速随机排序
```javascript
let arr =[1,2,3,4];
//方法一
let t;
for(let i = 0;i < arr.length; i++){
  let rand = parseInt(Math.random()*arr.length);
     t = arr[rand];
     arr[rand] =arr[i];
     arr[i] = t;
}
//方法二
arr.sort(()=>{
  return Math.random() - 0.5;
})

```
## 数组排序

```javascript
function selectSort(arr) {
    let len = arr.length;
    for(let i = 0 ;i < len - 1; i++) {
        for(let j = i ; j<len; j++) {
            if(arr[j] < arr[i]) {
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
    }
    return arr
}

function quickSort(arr) {
    if(arr.length <= 1) {
        return arr;  //递归出口
    }
    let left = [],
        right = [],
        current = arr.splice(0,1); 
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i])  //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    return quickSort(left).concat(current,quickSort(right));
}

```

## 判断数组中是否有重复元素

```javascript
let arr = [1,2,3,4,4]

function isRepeat(arr) {
  let flag = false;
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        flag = true;
        break;
      }
    }
  }
  return flag
}

function isRepeat(arr) {
  let obj = {}
  for(let i = 0; i < arr.length; i++) {
   obj[arr[i]] = arr[i]
  }
  return Object.keys(obj).length !== arr.length
}
```

## 求第一个数组中没有第二个数组中部分的值

**差集**

```javascript

function differenceSecond(ary1,ary2){
    let arr = []
    ary1.filter((item)=>{
      !ary2.includes(item)&&arr.push(item)
    })
    return arr
}

function differenceSecond(m, n) {
  let a = [...m, ...n];
  let b = n;
  let aHasNaN = m.some(function(v) {
    return isNaN(v);
  });
  let bHasNaN = n.some(function(v) {
    return isNaN(v);
  });
  let difference = a
    .filter(function(v) {
      return b.indexOf(v) == -1 && !isNaN(v);
    })
    .concat(
      b.filter(function(v) {
        return a.indexOf(v) == -1 && !isNaN(v);
      })
    )
    .concat(aHasNaN ^ bHasNaN ? [NaN] : []);
  return difference;
}


```

## 参考文档

[MDN ARRAY](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
