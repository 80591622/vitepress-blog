# 微前端方案总结

Iframe、Single-spa、Qiankun、Micro-app、Web Components

总结： 当匹配到 activeRule 的时候，请求获取 entry 资源，渲染到对应的 container 中

## 1）iframe
* 微前端最简单的实现方案，通过 iframe 加载子应用
* 通信通过 postMessage 来完成
* 完美的沙箱机制，能实现应用隔离
> 用户体验欠佳，像弹框只能在 iframe 内展示，在其内部切换刷新时会导致状态丢失

## 2）Single-spa
* 基于类似 Web Components 进行渲染，从组件思想出发实现微前端。对前端框架无限制，能将不同框架开发的微应用嵌入基础应用
* Single-spa 通过路由劫持实现应用的加载（采用 SystemJS ），提供应用间公共组件加载及公共业务逻辑处理。**子应用需要暴露 固定的钩子（bootstrap、mount、unmount）接入协议**
* 基于 props 进行主子应用间通信
* 无沙箱机制，需要自行实现 JS 沙箱以及 CSS 沙箱
> 学习成本高、无沙箱机制、需要对原有的应用进行改造、子应用间相同资源重复加载问题

## 3）Qiankun
* 基于 single-spa 实现，通过自定义事件机制和路由监听，在路由变化时加载、卸载子应用。在渲染方面，利用 HTML Entry 技术，能加载子应用的 HTML、CSS、JavaScript 等资源，并进行沙箱隔离，避免子应用之间以及与主应用的全局变量冲突。
* 支持多种前端框架作为子应用；有完善的生命周期管理，便于对子应用进行管控；沙箱机制保障了应用间的隔离性。
* 配置相对复杂，上手成本较高；对子应用的改造有一定要求

## 4) Micro-app
* 基于 Web Components 实现，通过自定义元素（Custom Elements）、影子 DOM（Shadow DOM）、模板（Templates）和插槽（Slots）等核心概念，将前端应用程序拆分为自定义 HTML 元素。
* 微应用之间通过自定义事件进行通信，实现了应用间的解耦。
* 无 CSS 沙箱和 JS 沙箱，需要自行实现。
> 学习成本较高；需要对原有的应用进行改造；子应用间相同资源重复加载问题

## 5）Web Components
* 浏览器原生的组件化技术，包含自定义元素（Custom Elements）、影子 DOM（Shadow DOM）、模板（Templates）和插槽（Slots）等核心概念。通过自定义元素创建新 HTML 元素，影子 DOM 封装内部结构和样式，模板实现结构重用，插槽实现内容插入 
* 把前端应用程序拆分为自定义 HTML 元素
* 依靠 CustomEvent 实现通信  
* Shadow DOM 天生就有作用域隔离功能
> 存在浏览器支持问题；学习成本较高；调试存在困难；修改样式困难等问题

## 4）Module federation
* 通过模块联邦将组件进行打包导出使用。
* 以共享模块的方式进行通信。
* 无 CSS 沙箱和 JS 沙箱。
> 需要 webpack5。



```js 
src/main.ts  // 主应用入口文件

import { registerMicroApps, start } from 'qiankun';

// 注册微应用
registerMicroApps([
  {
    name: 'app-react', // 微应用名称
    entry: '//localhost:3001', 
    container: '#subapp-container', 
    activeRule: '/sub-app/app-react', 
  },
  {
    name: 'app-vue2', 
    entry: '//localhost:3002', 
    container: '#subapp-container', 
    activeRule: '/sub-app/app-vue2', 
  },
  {
    name: 'app-vue3', 
    entry: '//localhost:3003', 
    container: '#subapp-container', 
    activeRule: '/sub-app/app-vue3', 
  },
]);

// 启动 Qiankun
start();

```

```HTML
src/index.vue   // 主应用微前端渲染出口页面
<template>
  <el-container>
    <el-aside width="200px">
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header>Micro Frontends</el-header>
      <el-main>
        <!-- 主应用路由渲染出口 -->
        <router-view></router-view>

        <!-- 微前端子应用渲染出口 -->
        <div id="subapp-container"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMenu from './AppMenu'

export default {
  components: {
    AppMenu
  }
}
</script>
```

```js
src/main.js// 子应用入口文件

import './public-path'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let instance = null
function render(props) {
  const { container } = props
  instance = new Vue({
    render: (h) => h(App)
  }).$mount(container? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  mount({})
}

// 子应用接入 qiankun
// 1. 导出三个必要的生命周期钩子函数
//    bootstrap 渲染之前
//    mount 渲染函数
//    unmount 卸载函数
// 注意： 生命周期钩子函数必须返回一个 Promise

export async function bootstrap() {
  console.log('[vue] vue app bootstrapped')
}

export async function mount(props) {
  console.log('[vue] vue app mount')
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
```

```js
vue.config.js // 子应用配置文件

const packageName = require('./package.json').name

module.exports = {
  configureWebpack: {
    output: {
      // 必须打包出一个库文件
      library: `${packageName}-[name]`,
      // 库的格式必须是 umd
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  devServer: {
    port: 9002,
    headers: {
      // 允许 CORS 跨域
      'Access-Control-Allow-Origin': '*'
    }
  }
}
```

## Qiankun 原理

主要有四部分组成，分别负责微应用注册，路由的监听和重写，动态加载和卸载子应用

## 微应用注册与启动（index.js）
应用存储：使用 _apps 数组存储注册的微应用信息，每个微应用包含 name、entry、container、activeRule、bootstrap、mount、unmount 等属性。

注册函数：registerMicroApp 函数用于将传入的微应用信息存储到 _apps 数组中。

启动函数：start 函数负责启动微前端框架，主要执行两个操作：调用 rewriteRouter 函数监听路由变化，调用 handleRouter 函数进行初始的路由匹配。

```js

import { handleRouter } from './handle-router.js';
import { rewriteRouter } from './rewrite-router.js';

// {name, entry, container, activeRule, bootstrap, mount, unmount}
let _apps = [];

export const getApps = (apps) => _apps;

export const registerMicroApp = (apps) => {

  _apps = apps;
}

export const start = () => {
  // 微前端原理
  // 1. 监视路由变化
  //  hash 路由：windows.onhashchange
  //  history 
  //    history.go、history.back、history.forward、history.pushState、history.replaceState  
  //      事件：windows.popstate
  //      history.pushState、history.replaceState  需要通过函数重写的方式进行劫持

  rewriteRouter();

  // 初始化执行匹配
  handleRouter();

}

```

## 路由监听与重写（rewrite-router.js）
路由状态管理：使用 prevRoute 和 nextRoute 分别记录上一个路由和当前路由。

事件监听：监听 popstate 事件，当用户点击浏览器的前进或后退按钮时触发，更新 prevRoute 和 nextRoute，并调用 handleRouter 函数进行路由匹配。

重写 history.pushState 和 history.replaceState 方法，在路由变化前后更新 prevRoute 和 nextRoute，并调用 handleRouter 函数。

```js

import { handleRouter } from './handle-router.js';


let prevRoute = ''
let nextRoute = window.location.pathname

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

export const rewriteRouter = () => {
  
  // 监听 popstate 事件
  window.addEventListener('popstate', () => { 
    console.log('popstate');
    // popstate 事件触发时，路由已经完成导航
    // 假设prevRoute之前已经定义过，这里获取变化前的路由
    prevRoute = nextRoute; 
    nextRoute = window.location.pathname; // 最新的    
    handleRouter();
  });
  
  // 重写 pushState 方法
  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {

    // 导航前
    prevRoute = window.location.pathname
    rawPushState.apply(window.history, args); // 改变历史路由
    nextRoute = window.location.pathname

    // 导航后
    handleRouter();

  };
  
  // 重写 replaceState 方法
  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    prevRoute = window.location.pathname
    rawReplaceState.apply(window.history, args);
    nextRoute = window.location.pathname  
    handleRouter();
  };
}

```

## 路由匹配与应用加载（handle-router.js）
路由匹配：根据 prevRoute 和 nextRoute 从 _apps 数组中找出上一个和当前要加载的微应用。

应用卸载：如果存在上一个应用，调用 unmount 函数卸载该应用。

应用加载：使用 importHTML 函数加载当前应用的 HTML、CSS 和 JS 资源。
将加载的 HTML 模板插入到指定的容器中。

配置全局变量 __POWERED_BY_QIANKUN__ 和 __INJECTED_PUBLIC_PATH_BY_QIANKUN__。
执行加载的脚本，获取应用的生命周期函数（bootstrap、mount、unmount）

```js
import { getApps } from './index'
import { importHTML } from './import-html'
import { getPrevRoute,getNextRoute } from './rewrite-router'

export const handleRouter = async () => {
     
  const apps = getApps()

  // 获取上一个应用
  const prevApp = apps.find((item) => {
    return getPrevRoute().startsWith(item.activeRule)
})


  // 获取下一个应用
  const app = apps.find((item) => {
    return getNextRoute().startsWith(item.activeRule)
  })

  // 如果又上一个应用先销毁
  if (prevApp) {
    await unmount(prevApp);
  }


  if (!app) {
    // 初始化应用，没有匹配到路由返回
    return
  }

  // 3. 加载子应用
  const { template, execScripts, getExternalScripts } = await importHTML(app.entry)
  const container = document.querySelector(app.container)
  container.appendChild(template)

  // 配置全局变量
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/';
 

  const appExports = await execScripts();

  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;



  // getExternalScripts().then((script) => {
  //    console.log(script);
     
  // })
  // 请求获取子应用的资源：html、css、js
  // const html = await fetch(app.entry).then(res => res.text())
  // const container = document.querySelector(app.container);
  // 1. 客户端渲染需要通过执行 JavaScript 来生成内容
  // 2. 浏览器出于安全考虑，innerHTML 中的 script 不会加载执行
  // container.innerHTML = html;


  // 手动加载子应用的 script
  // 执行 script 中的代码
  //eval 或 new Function”

  // 4. 渲染子应用
}

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount && (await app.mount({
    container: document.querySelector(app.container)
  }));
}

async function unmount(app) {
  app.unmount && (await app.unmount({
    container: document.querySelector(app.container)
  }));
}

```

##  子应用切换加载对应资源（import-html.js）
importHtml 函数
功能：从指定 URL 加载 HTML 文件，提取其中的脚本代码并执行。
实现步骤：
1. 获取 HTML 内容：调用 fetchResource 函数从指定 URL 获取 HTML 内容，并将其插入到新创建的 div 元素中。
2. 提取脚本代码：getExternalScripts 函数遍历 HTML 中的所有 script 标签，对于内联脚本直接获取其内容，对于外部脚本则根据 src 属性请求脚本内容，最后通过 Promise.all 并行处理所有脚本的获取。
3. 执行脚本代码：execScripts 函数手动模拟 CommonJS 环境，使用 eval 函数执行提取到的脚本代码，并返回脚本导出的内容。
4. 返回结果：返回一个包含 HTML 模板、执行脚本函数和获取脚本函数的对象。

```js
import { fetchResource } from "./fetch-resource";

// https://github.com/kuitos/import-html-entry
export const importHtml = async(url) => {
  const html = await fetchResource(url);
  const template = document.createElement('div');
  template.innerHTML = html;

  // 获取所有 script 标签的代码: [代码, 代码]
  function getExternalScripts() {
    const scripts = document.querySelectorAll('script');
    return Promise.all(Array.from(scripts).map(script => {
      const src = script.getAttribute('src');
      if (!src) {
        return Promise.resolve(script.innerHTML);
      } else {
        return fetchResource(
          src.startsWith('http')? src : `${url}${src}`
        );
      }
    }));
  }

  // 获取并执行 script 标签的代码
  const execScripts = async(el) => {
    const scripts = await getExternalScripts();

    // 手动构造一个 CommonJs 环境
    const module = { exports: {} };
    const exports = module.exports;

    scripts.forEach((code) => {
      // eval 执行的代码可以访问全局变量
      eval(code);
    });

    return module.exports;
  }

  return {
    template,
    execScripts,
    getExternalScripts
  }
}
```

## 应用生命周期管理
bootstrap 函数：调用应用的 bootstrap 方法，用于应用的初始化操作。

mount 函数：调用应用的 mount 方法，将应用挂载到指定的容器中。

unmount 函数：调用应用的 unmount 方法，卸载应用并清理资源。

通过监听浏览器的路由变化（popstate 事件以及重写 pushState 和 replaceState 方法），在路由变化时匹配相应的子应用。根据路由匹配结果，卸载上一个应用，加载并渲染当前应用，实现了子应用的动态切换



