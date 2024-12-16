

# leetCode

## 两数之和

**示例：**

    给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]


```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
   let obj={};
   const len=nums.length;
   if(len<2)return;
   for (let i=0;i<len;i++){
      let otherNum=target-nums[i]
      if(otherNum in obj){
        return [obj[otherNum],i]
      }
      obj[nums[i]]=i
   }
};

var twoSum = function(nums, target) {
  for(var i = 0; i < nums.length; i++) {
    let diff = target - nums[i]
    for(let j = i + 1; j < nums.length; j++) {
      if (nums[j] === diff) {
        return [i, j]
      }
    }
  }
};
```

## 1,2,3,5,8...求第一百个数

```javascript
function findIndexNum(n){
    let ary = [1,2,3,5]
    if(ary.length>=n){
     return ary[n-1]
    }
    Array.from(Array(n-4), (key, index) => index).forEach(()=>{
      let len =ary.length;
      let sum = ary[len-2]+ary[len-1]
      ary.push(sum)
    })
    return ary[n-1]    
}
findIndexNum(100)
```

## 求数组中连续数最大个数

    给定一个数组, 里面的元素全部由0和1组成, 计算其中最大连续1的个数
    
    输入: [1,1,0,1,1,1]
    输出: 3
    解释: 开头的两位和最后的三位都是连续1, 所以最大连续1的个数是3

```javascript
let arr = [1,1,0,1,1,1]
function isBiggest(arr) {
  let count = null;
  let arg = [];
  for(var i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      count++;
      arg.push(count);
      count = 0;
      continue;
    } else {
      count++;
    }
  }
  return Math.max(...arg)
}
```

##  [组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)

示例 1:

输入: k = 3, n = 7
输出: [[1,2,4]]
示例 2:

输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]



1. 先找出来能组成的所有数组，然后在根据长度和和找出适合的数组

```javascript
let k = 4, n = 10;
let combinationSum3 = function (k, n) {
  let number = [[]];
  let ary = []
  let numbers = [...Array(9)].map((item, index) => index + 1)
  for (let i = 0; i < numbers.length + 1; i++) {
    let turn = number.map(v => [...v, numbers[i]])
    number = number.concat(turn);
  }
  for (let i = 0; i < number.length; i++) {
    if (number[i].length === k) {
      if (sum(number[i]) === n) {
        ary.push(number[i])
      }
    }
  }
  return ary;ary
};

function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr)
}

console.log(combinationSum3(k,n)) 
```

2. 回溯+剪纸

如果当前组合数组的长度超过了题目给定的k，那么没有必要继续回溯，进行剪纸
由于遍历[start, 9]的过程中，我们是从小到大排序的，那么如果当前的组合总和sum加上了[start, 9]中的某个数字num后，使得sum + num > n，这里假设num的下标是i，那么很明显，[i, 9]区间的数字就没有必要再遍历回溯了，因为什么组合的和都会大于n，进行剪纸。
于是可以写出代码如下：

```javascript
let k = 3, n = 10;

let ans;
let combinationSum3 = function (k, n) {
  ans = [];
  back(k, n, [], 0, 1);
  return ans;
};

/*
* @params {Array} nowArr 当前回溯组合
* @params {number} sum 当前回溯组合的总和
* @params {number} start 下次回溯的起点坐标
*/
function back(k, n, nowArr, sum, start) {
  // 符合双重条件
  if (nowArr.length === k && sum === n) {
    return ans.push(nowArr);
  }
  // 递归找到合适的数组
  for (let i = start; i <= 9; i++) {
    if (sum + i > n || nowArr.length > k) break;
    back(k, n, [...nowArr, i], sum + i, i + 1);
  }
}

console.log(combinationSum3(k, n));
```

## 去除字符串中出现次数最少的字符，同时保持字符串的原始顺序

```js
function removeLeastFrequentChars(input) {
  // 统计每个字符的出现次数
  const charCount = {};
  for (const char of input) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // 找到最小出现次数
  const minCount = Math.min(...Object.values(charCount));

  // 过滤掉出现次数等于最小次数的字符
  return input.split('').filter(char => charCount[char] > minCount).join('');
}

// 示例用法
const input = "aabbccddeeffg";
const result = removeLeastFrequentChars(input);
console.log(result); // 输出: "aabbccddeeff"

```

## 写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。

```js
// 示例：
// 输入：1234567890
// 输出：一千二百三十四万五千六百七十八九零

function trans(num) {
    const units = ['个', '十', '百', '千', '万', '亿']; // 单位
    const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; // 汉字数字

    if (num === 0) return chineseNums[0]; // 特殊处理零

    let str = num.toString();
    let result = '';
    let zeroFlag = false; // 用于判断是否需要加“零”
    let unitIndex = 0; // 单位索引

    for (let i = str.length - 1; i >= 0; i--) {
        const digit = parseInt(str[i]);
        const unit = units[unitIndex] || ''; // 获取当前位的单位

        if (digit === 0) {
            // 如果是0且前面不是零，则添加“零”
            if (!zeroFlag && unitIndex !== 0) {
                result = chineseNums[0] + result;
                zeroFlag = true;
            }
        } else {
            // 非零时，拼接数字和单位
            result = chineseNums[digit] + (unit ? unit : '') + result;
            zeroFlag = false;
        }

        unitIndex++;
        // 如果当前已经超过“亿”单位，可以跳出循环
        if (unitIndex >= 8) break;
    }

    // 处理“十”的特殊情况：如果开头是“一十”，则去掉“一”
    if (result.startsWith('一十')) {
        result = result.slice(1);
    }

    return result;
}

// 示例
console.log(trans(123456));         // 输出 "十二万三千四百五十六"
console.log(trans(100010001));      // 输出 "一亿零一万零一"
console.log(trans(0));              // 输出 "零"
console.log(trans(1000000000));     // 输出 "十亿"
console.log(trans(100));            // 输出 "一百"
console.log(trans(100000));         // 输出 "十万"
```

## 给几个数组, 可以通过数值找到对应的数组名称

```js
// 比如这个函数输入一个1，那么要求函数返回A
const mappings = {
    A: [1, 2, 3],
    B: [4, 5, 6],
    C: [7, 8, 9]
};

function numberToLetter(num) {
    // 遍历 mappings 对象的键和值
    for (const [letter, numbers] of Object.entries(mappings)) {
        if (numbers.includes(num)) {
            return letter; // 返回对应的字母
        }
    }
    return 'Invalid input'; // 如果数字不在任何映射中
}

// 示例
console.log(numberToLetter(1));  // 输出 "A"
console.log(numberToLetter(5));  // 输出 "B"
console.log(numberToLetter(9));  // 输出 "C"
console.log(numberToLetter(10)); // 输出 "Invalid input"

```