---
abbrlink: b4b9f9d0
title: 单元测试框架Jest学习总结
date: 2019-07-01
categories: 
- FE框架 
- Jest
---

<strong class='old-blog'>单元测试框架Jest学习总结</strong>

[[toc]]

### 测试框架

`Mocha+chai`(断言库)<br/>
yarn add mocha chai -D

`Jest`<br/>
yarn add jest -D



### 适合场景
- 业务比较复杂
- 公司非常注重代码质量，想尽一切办法杜绝线上出bug
- 需要长期维护的项目。它们需要测试来保障代码可维护性、功能的稳定性
- 被多次复用的部分，比如一些通用组件和库函数。因为多处复用，更要保障质量
- 开源项目


### 首先安装需要的包

基于vue

```javascript
yarn add jest vue-jest babel-jest @vue/test-utils @types/jest -D
```

注意版本号之间兼容性问题



#### 让Jest支持ES6语法

```javascript
// .babelrc
"@babel/preset-env",
   {
   "targets": {
     "browsers": [
       "chrome >= 50"
     ],
     "node": "current" 
   },
   "modules": "auto" // 不能为true 
 }
```


 
### 测试的步骤

- 写测试说明，针对你的每条测试说明测试了什么功能，预期结果是什么。
- 写测试主体，通常是 输入 -> 输出。
- 判断测试结果，拿输出和预期做对比。如果输出和预期相符，则测试通过。反之，不通过。

**yarn add jest @types/jest  babel-jest babel-core babel-preset-env regenerator-runtime -D**

Jest本身是不支持es6的，但是在react中已经配置好babel等，可以直接使用ES6的语法特性进行单元测试

**使用方式**
```javascript
expect(1).not.toBe(2)//判断不等
```

`toBe()` 绝对相等<br/>
`toEqual()` 判断对象或者数组是否相等<br/>
`toBeNull()`只匹配null<br/>
`toContain()`检测数组中是否包含特定某一项<br/>
`toBeUndefined()`只匹配undefined<br/>
`toBeDefine()`与toBeUndefined相反<br/>
`toBeTruthy()`匹配任何if语句为真<br/>
`toBeFalsy()`匹配任何if语句为假<br/>
`toBeCloseTo(0.3)` 浮点数判断相等<br/>

 **数字匹配器**<br/>
`toBeGreaterThan()`大于<br/>
`toBeGreaterThanOrEqual()`大于或者等于<br/>
`toBeLessThan()`小于<br/>
`toBeLessThanOrEqual()`小于或等于<br/>

### package里面关于jest的配置


```javascript
//package.json
"scripts": {
   "test": "jest",//全部测试
   "app":"jest /test/app.test.js --watch"  //单个测试  --watch持续检测
   "test-watch": "jest --watchAll",// 所有文件持续检测
   "test-with-coverage": "jest --coverage" // 文件覆盖
},
"jest": {
   "collectCoverage":true,  //查看覆盖的文件  `可以直接输入 jest --coverage 生成测试覆盖率报告`
   "collectCoverageFrom": [ //哪些文件需要收集覆盖率信息 
     "src/**/*.{js,jsx,ts,tsx}",
     "!src/**/*.d.ts"
   ],
   "coverageDirectory": "tests/coverage", //覆盖的文件输入到tests文件夹下
   "resolver": "jest-pnp-resolver",
   "setupFiles": [
     "react-app-polyfill/jsdom"
   ],
   "testMatch": [ //设置识别哪些文件是测试文件
     "<rootDir>/test/**/__tests__/**/*.{js,jsx,ts,tsx}",
     "<rootDir>/test/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
   ],
   "testEnvironment": "jsdom",
   "testURL": "http://localhost",
   "transform": {
     "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
     "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
     "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
   },
   "transformIgnorePatterns": [
     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
     "^.+\\.module\\.(css|sass|scss|less)$"
   ],
   "moduleNameMapper": { 
     "^react-native$": "react-native-web",
     "^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy", //css module的问题
     "^@(.*)$": "<rootDir>/src$1" //jest的别名设置
   },
   "moduleFileExtensions": [ //测试文件的类型
     "js",
     "ts",
     "tsx",
     "json",
     "jsx",
     "node"
   ]
 }
```

#### Jest.config.js

```js
module.exports = {
  // preset: "ts-jest",
  moduleFileExtensions: ["vue", "js", "jsx"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest", // js 文件用 babel-jest 转换
    "^.+\\.vue$": "vue-jest", // vue 文件用 vue-jest 转换
    // "^.+\\.ts$": "ts-jest", // ts 文件用 ts-jest 转换
  },
  // // 例如，require('a') 语句会递归往上层的 node_modules 中寻找 a 模块
  moduleDirectories: ["node_modules"],
  // 匹配 __tests__ 目录下的 .js/.jxs 文件 或其他目录下的 xx.test.js xx.spec.js
  testRegex: "(/__tests__/.(js|jsx)|(\\.|/)(test|spec))\\.(js|jsx)$",
  // 支持源代码中相同的 `@` -> `src` 别名
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
```

### 代码覆盖率

可以查看你那些代码没有被覆盖，帮助你发现盲点

- 在命令行中通过 “–coverage” flag 指定
- 在 package.json 中手动配置

![](https://ae01.alicdn.com/kf/H90bd3a97f33a427ebe9de0b3a3e42a2dc.png)

%stmts是语句覆盖率（statement coverage）：是不是每个语句都执行了？

%Branch分支覆盖率（branch coverage）：是不是每个if代码块都执行了？

%Funcs函数覆盖率（function coverage）：是不是每个函数都调用了？

%Lines行覆盖率（line coverage）：是不是每一行都执行了？

**Uncovered Line** 是哪行没有被覆盖

专业术语里，把describe包含的块叫做suite，把it/test包含的块叫做specification，也简称为spec，在一个suite里面可以包含多个数量的spec，但是也要注意结构化语义化。


### 示例

编写测试文件时遵循的命名规范：`测试文件的文件名` = `被测试模块名` + .test.js

```javascript
//function.js
import axios from 'axios';
export default {
    fetchUser() {
        return axios.get('http://jsonplaceholder.typicode.com/users/1')
            .then(res => res.data)
            .catch(error => console.log(error));
    },
    sum(a, b) {
        return a + b;
    }
}
//function.test.js
import functions from '../src/functions';
test('fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象', () => {
    expect.assertions(1);
    return functions.fetchUser()
        .then(data => {
            expect(data.name).toBe('Leanne Graham');
        });
});
it('fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象  async -- await', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();

    expect(data.name).toBe('Leanne Graham');

});
describe('加法函数测试', () => {
    it('1加2应该等于3', () => {
        expect(functions.sum(1, 2)).toBe(3);
    });
});
test('sum(2 + 2) 等于 4', () => {
    expect(functions.sum(2, 2)).toBe(4);
});
test('sum(2 + 2) 等于 4', () => {
    expect(functions.sum(2, 2)).not.toBe(1008611);
});
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});
test('but there is a “stop” in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});
test('测试浮点数是否相等', () => {
    expect(0.003 + 0.01).toBeCloseTo(0.013);  //这里不能使用toBe
});
test('对象判断是否相等', () => {
    expect({test: "11111"}).toEqual({test: "11111"}); //
});


describe("筛选数组", () => {
    test("it should filter by a search term (link)", () => {
        const input = [
            {id: 1, url: "https://www.url1.dev"},
            {id: 2, url: "https://www.url2.dev"},
            {id: 3, url: "https://www.link3.dev"}
        ];

        const output = [{id: 3, url: "https://www.link3.dev"}];

        expect(filterByTerm(input, "link")).toEqual(output);

        expect(filterByTerm(input, "LINK")).toEqual(output);
    });
});

function filterByTerm(inputArr, searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    const a = inputArr.filter(function (arrayElement) {
        return arrayElement.url.match(regex);
    });
    console.log(a);
    return a
}


```

#### vue中的测试案例

```js
// test.vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

// test.spec.js
import { shallowMount, mount } from "@vue/test-utils";
import test from "../test.vue";
import Vue from "vue";

describe("test.vue", () => {
  let wrapper = shallowMount(test, {
    slots: {
      default: "测试案例",
    },
  });

  it("设置slot", () => {
    return Vue.nextTick().then(function() {
      expect(wrapper.text()).toBe("测试案例");
    });
  });
});
```

### 未完待续...


### 参考文档

[*ReactTestUtils](https://zh-hans.reactjs.org/docs/test-utils.html)

[参考文档](https://segmentfault.com/a/1190000020387433)

[参考文档2](https://www.jianshu.com/p/aee9a19d5e6a)

[jest 别名](http://www.voidcn.com/article/p-ftetcszg-btt.html)

[Jest 入门教程](https://juejin.im/post/5df73d35e51d45581509a1c2?utm_source=gold_browser_extension)
