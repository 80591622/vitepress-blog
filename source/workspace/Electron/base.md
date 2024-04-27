

# Electron基础


## 简介

`​Electron 是一个由 GitHub 开发的开源库，通过将 Chromium) 和Node.js 组合并使用 HTML，CSS 和 JavaScript 进行构建 Mac，Windows，和 Linux 跨平台桌面应用程序。`

**优点:**

方便快捷的开发桌面应用，跨平台，对前端开发者友好，活跃的社区，丰富的api......

**缺点:**

性能肯定比不上原生的桌面应用，发布的包很大。（DeskGap这个不带浏览器的功能，包比较小）

## 初始化项目

**1.electron-react-boilerplate**

[star~13000](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

**2.** 使用脚手架`electron-forge`
```javascript
//全局安装脚手架
yarn global add @electron-forge/cli

//初始化项目
yarn create electron-app my-app
```

**3.** 自己搭建

- 新建main.js
```javascript
/**
 * Author: wk;
 * Date: 2019-08-08 13:57;
 * Description:主进程
 */


const electron = require('electron');
const {app, BrowserWindow} = electron;
//保持对window对象的全局引用
// 垃圾回收的时候，window对象将会自动的关闭
let win;

const createWindow = () => {
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });
    // 加载index.html文件
    win.loadFile('index.html');
    // 打开开发者工具
    win.webContents.openDevTools();
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
};

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。

app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) createWindow()
});
```

- 新建index.html
```javascript
//渲染进程
<!DOCTYPE html>
<html lang="zh-Hans-CN">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>Hello!</h1>
</body>
</html>
```

- 初始化git 

```javascript
npm init -y
//electron 运行 package.json 的 main 脚本的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。
// 一个 Electron 应用总是有且只有一个主进程。
{
  "name": "electron",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^6.0.1"
  }
}
```

## API

```javascript
//加载index.html文件
win.loadFile(path.join(__dirname, 'index.html'));
//加载URL
win.loadURL('http://music.migu.cn/');
//打开开发者工具
win.webContents.openDevTools();
//关闭开发者工具
win.webContents.closeDevTools();
```

## 打包


`devDependencies与dependencies的区别`

[详细介绍](https://www.yuque.com/docs/share/963e29e1-3314-453f-b417-d8ce543b78cc)

如果不是发布npm包，例如我们常用的就是clone源码，然后npm install，这样的话，这两个地方包含的依赖都会被正确下载到 node_modules 里，意思就是，没区别。

但是，如果你要发布npm包，那就要注意了，这种情况如果有人想使用你的npm模块，npm install只会下载在 dependencies 的依赖。举个例子，你做了个日历插件，day.js，没有把它放在dependencies，
而是放在了 devdependencies，那别人使用你的日历插件的时候就会报错，因为在dependencies找不到day.js ,反过来 dependencies 的包放到 devdependencies 里面，这样就会增加本地项目的体积。
