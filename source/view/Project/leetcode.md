

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

