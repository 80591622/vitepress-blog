---
abbrlink: bbe84hhh
title: git hooks
date: 2021-05-19
tags: github
cover: https://tva1.sinaimg.cn/large/008i3skNly1gr536y5e67j60ls096wgo02.jpg
categories: 
- git
- git hooks
---

<strong class='old-blog'>git hooks</strong>

[[toc]]


在团队项目开发过程中和代码交接时，因个人编码习惯的不同往往出现代码风格不一致的情况或者使用 IDE 代码格式化不一致，造成不必要的代码维护成本，有时甚至大于新功能的开发成本。
对于代码的版本管理（svn、git或者其他），代码格式不一致带来的问题是严重的，在代码一致的情况下，因为格式不同，文件被标记为 diff，导致无法检查代码和校验。

起因：

本人使用 webstrom 同事使用 vscode,然后我们编辑器的代码格式设置不到一致，每次代码提交都会出现大量的diff，或者就是一些高频的文件开发时候不敢格式化代码，造成开发效率特别低迷。

优势：

更少的 Bug （错误代码提交不了）

更高的可读性

方便后续同学接手



### 代码规范

**prettier**

Prettier 说自己是一个 Opinionated code formatter 的代码格式化工具就是说：你必须认同我的观点，按照我说的做。否则你就别用我，硬着头皮用就会处处不爽！

**支持的编程语言**

![](https://tva1.sinaimg.cn/large/008i3skNly1gqq3du5giej313r0b8abu.jpg)

**支持的IDE集成**

![image-20210521154353419](https://tva1.sinaimg.cn/large/008i3skNly1gqqcfjdstoj311h0h6taz.jpg)


**规则设置**

```javascript
// https://prettier.io/docs/en/options.html#tabs
{
  "tabWidth": 4, // 一个tab代表几个空格数，默认2
  "useTabs": false, // 是否使用tab进行缩进，默认false
  "singleQuote": true,// 字符串是否使用单引号，默认false
  "trailingComma": "es5",// 是否使用尾逗号，可选值"<none|es5|all>"，默认none
  "printWidth": 100,// 每行最大字符数，超过会换行，默认80
  "endOfLine": "auto",// 行尾换行方式，可选值"<auto|lf|crlf|cr>"，默认auto
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
```



不管你写的代码是个什么样子，Prettier 会去掉你代码里的所有样式风格，然后用统一固定的格式重新输出，中间是使用 ast 做了一层转化



![](https://tva1.sinaimg.cn/large/008i3skNly1gqq3okpudij31gk0nkq9r.jpg)

[代码在线编译](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEAeAJgSwG4AJPoC8AOiAIYAOFpAfMVLrqplBQK4y4wCeFcJIeAA8YpXNgC0AWwjo4AGwEAzTACcAzjAByZKXDEB6Og1z1GZpi3acefAcNEhx02QoHyymnXsPHGwYCU2eXlvOABfcPpUAyxsY2j1MFVMChhjKDgAd1wANTY4AApgC0YFJFwAcgBiSgpKgBpS3HQyGDIKkpNGRhUNbV04CsrG5sYPL0Hh0e6eoJCw6abZxggAIwArJGBcAwMAOkPcKNnw5Z7cSClrOHROsdx50MHcQoBKXC6Li9U4GDZVAwYAALTDqfYTAZ6XAAai4oPBfUmegA3A8Thczs0sm0wMD7itHmpkUVMllcmR5A1cBB5OgKfIPl9vowQWD9k8wrhCPD2ZCuXCyQy0YSsYT+YNClAyOTKdTafTKUyHqyERzgs9oTyhZTYbzEcSoXARSyxSz1ltPircMCyFB0PI4KphuoyNwwpVcNS9rhAJvxgBnEwD0ZoB1bUAZN6AJjlrZgpHosG0hlxVAVvQZcIBpr0AzsqAcyNADIR1p9cjgFAqMCTcB6PsAj7aAMr1AItugHLja0YnrNxgY8JvEUxJIpNI0EANEAQNKYaDqZCgMiqVQQLIABSnCHHKEpOO448Ha1UZDAAGs-gBlCg7lgAc2QpeTIDgUjWtzk6AAMnbT2wyKe4AAxCCqKRtGBnsg5AcBAA4gMCMBSPIADqoLwOox5gHAB5LpgAHYGh3BAWA6gbiALDqE6MBztup5-sgSiUoRg4bOoQgAELbnuh6DI+LBwBRVFwDRdEHmejoAIpsBA8CcfI1EgMeGhOkB2AFGBFApLA0EECCyAAIwAAyaYOikQIR0HbhQQGKXAhGqNgHGDgAjsJ8AkcOy7kOoEiZLctxgb8tlqHAJHvuRSCUeJ3EgIRUiYBeZaDuo-FwEJIkcYFXGDqWZCYPIZ4AMIQDGZBAWZACsYFsIRAAqZBrMuQUSXJcAAJL2ggMAHskqQwAAgvaB48I6YkSe0awqegalIAATJEQA)



### Git 整合

确保你当前的工程在用 Git。

Husky：可以方便的让你通过npm scripts来调用各种 git hooks



**和 Git 整合，有四种方法：**

pretty-quick：在更改的文件上运行Prettier。

lint-staged:  文件过滤器(一般都会读取文件，格式化操作之后，重新写入)，提高性能

pre-commit： 直接操作 .git/hooks/pre-commit 文件

precise-commits：老产物 不推荐使用



其中除了 pre-commit 之外，都是 npm 的 module，需要先 yarn add  ... 装载。



下面的配置注意各个插件的版本号，husky的v6版本做了破坏性的变更，一些社区插件还没兼容，安装前请注意各个插件兼容husky的版本号

**lint-staged 配置方式**

```javascript
"husky": {
   "hooks": {
     "pre-commit": "lint-staged",
   }
},
"lint-staged": {
   "*.{js,vue}": [
     "eslint --fix", // 使用eslint或者prettier
     "git add"
   ]
},
```

**pretty-quick 配置方式**

```javascript
"husky": {
   "hooks": {
     "pre-commit": "pretty-quick --staged --ignore-path=.prettierignore",
   }
}
```

到这里一些项目已经可以使用，下面更加深度的使用下



```javascript
{
  "scripts": {
    "start": "snowpack dev",
    "build": "snowpack build",
    "prettier": "node ./scripts/prettier.js", // 这里是自己实现,可手动触发
    "lint-staged": "lint-staged" // 同上，走的是下面定义好的
    "pretty-quick": "pretty-quick --staged --ignore-path=.prettierignore" // pretty-quick 提示友好，但是支持版本有限 【v5暂不支持】
  },
  "husky": {
    "hooks": {
      // 直接使用 pretty-quick 提供的方法
      "pre-commit": "yarn pretty-quick"
    }
  },
   // "pre-commit":"lint-staged" // 可以自定义，定制化强
  "lint-staged": {
    "**/*.{js,ts,tsx,json,jsx,scss,vue}": [
      "yarn prettier",
      "git add ."
    ]
  },
  "devDependencies": {  
    "husky": "^4.3.6", // husky v6 做了破坏性的变更，之前所有针对hook的插件都会失效
    "lint-staged": "^10.5.3", // v11 的版本支持husky v6 的插件
    "prettier": "^2.2.1", 
    "pretty-quick": "^3.1.0", // 当前版本 仅支持 "husky": "^4.2.3" 
  }
}
```

```javascript
// scripts/getPrettierFiles.js
// 待处理的文件
const glob = require("glob");
const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync("src/**/*.js*", {
    ignore: ["**/node_modules/**", "build/**"],
  });
  const vueFiles = glob.sync("src/**/*.vue*", {
    ignore: ["**/node_modules/**", "build/**"],
  });
  const scssFiles = glob.sync("src/**/*.scss*", {
    ignore: ["**/node_modules/**", "build/**"],
  });

  files = [...jsFiles,...vueFiles,...scssFiles];
  if (!files.length) {
    return;
  }
  return files;
};
module.exports = getPrettierFiles;
```

自己实现代码格式化、写入功能

```javascript
/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 */
// scripts/prettier.js
const prettier = require("prettier");
const fs = require("fs");
const getPrettierFiles = require("./getPrettierFiles");
const prettierConfigPath = require.resolve("../.prettierrc");
const chalk = require("chalk");

let didError = false;

const files = getPrettierFiles();

files.forEach((file) => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, "utf8");
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    const output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, "utf8");
      console.log(chalk.green(`${file} is prettier`));
    }
  } catch (e) {
    didError = true;
  }
});

if (didError) {
  process.exit(1);
}
console.log(chalk.hex("#1890FF")("prettier success!"));
```


### husky为什么放弃了之前的配置方式

根据官方的说法，之前husky的工作方式是这样的，为了能够让用户设置任何类型的git hooks都能正常工作，husky不得不创建所有类型的git hooks。这样在git 工作的每个阶段都会调用husky所设置的脚本，在这个脚本中husky会检查用户是否配置该hook，如果有就运行用户配置的命令，如果没有就继续往下执行。

`这样做的好处就是无论用户设置什么类型的git hook husky都能确保其正常运行。但是缺点也是显而易见的，即使用户没有设置任何git hook，husky也向git中添加了所有类型的git hook。`

那有没有可能让husky只添加我们需要的git hook呢？作者尝试过解决这个问题，但是失败了。究其失败的根本原因，就是因为husky需要在两个地方进行配置才能完成一个完整的git hook功能。一个是在package.json中配置git hook所要执行的真正命令，一个是在.git/hooks/中配置相对应的git hook。也就是说无论是添加还是删除git hook就要保证在这两个地方同步执行对应的操作。作者无法找到一个可靠的方法来`同步`这两个地方的配置，因此失败了。

作者认为这个问题是由husky工作模型的自身缺陷导致的，如果想要解决就不得不另辟蹊径采用一种新的工作模型。因此新版husky做了破坏性的变更。


**新版husky的工作原理**

新版的husky使用了从git 2.9（2016年） 开始引入的一个新功能core.hooksPath。core.hooksPath可以让你指定git hooks所在的目录而不是使用默认的.git/hooks/。这样husky可以使用`husky install`将git hooks的目录指定为.husky/，然后使用`husky add`命令向.husky/中添加hook。通过这种方式我们就可以只添加我们需要的git hook，而且所有的脚本都保存在了一个地方（.husky/目录下）因此也就不存在同步文件的问题了。


### 兼容sourceTree

在 Mac下使用 sourcetree 提交代码，出现如下报错：

我这里的报错是因为装了nvm 导致node的根目录发生改变，不在 /usr/local/bin 目录下


```bash
.git/hooks/pre-commit: line XXX: node: command not found
```


在[此网站](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F12881975%2Fgit-pre-commit-hook-failing-in-github-for-mac-works-on-command-line)中有问题分析：使用诸如SourceTree这样的gui，可以访问的环境变量不一样，需要在`.git/hooks/pre-commit`脚本中加入你的node环境变量

首先打印你的node目录：

```bash 
which node    # /Users/wk/.nvm/versions/node/v12.14.1/bin/node
```

- 然后将目录加入到 你的git项目下 `.git/hooks/pre-commit`中

```bash
# $PATH是已有目录
PATH="/Users/wk/.nvm/versions/node/v12.14.1/bin:$PATH"
```



### 相关资料

1. [prettier](https://prettier.io/)
2. [husky](https://github.com/typicode/husky)
3. [pretty-quick](https://github.com/azz/pretty-quick)
4. [git-hooks](https://git-scm.com/docs/githooks)
5. [lint-staged](https://github.com/okonet/lint-staged)
6. [precise-commits](https://github.com/nrwl/precise-commits)
7. [Prettier看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true)
