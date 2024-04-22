---
abbrlink: 675369a3
title: 错误机制
date: 2020-01-17
categories: 
- FE框架 
- Vue
- 错误机制
---

<strong class='old-blog'>错误机制</strong>

[[toc]]

### 源码解析

文件路径`vue/src/core/util/error.js`

```javascript{68,96,98,116,138,145}
import config from '../config'
import {warn} from './debug'
import {inBrowser, inWeex} from './env'  // 运行的平台
import {isPromise} from 'shared/util'

/*自己实现一个版本，前几天一个npm小项目的更新给整个npm生态系统制造了一场混乱，影响到了数百万 JS 项目。这个库就是 is-promise；
* function isPromise(val){
*    return (typeof val === 'object' || typeof val === 'function') && val !==null &&  typeof val.then === 'function' && typeof val.catch === 'function'
*  }
* */
import {pushTarget, popTarget} from '../observer/dep'

export function handleError(err: Error, vm: any, info: string) {
  // 处理错误信息, 进行错误上报
  // err错误对象
  // vm Vue实例
  // info是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用

  // 当错误函数处理错误时，停用deps跟踪以避免可能出现的infinite rendering
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget()
  try {
    if (vm) {
      let cur = vm  // 获取当前的错误组件，然后递归查找当前组件的父组件，依次调用errorCaptured 方法。
      while ((cur = cur.$parent)) {
        const hooks = cur.$options.errorCaptured
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            try {
              // 逐个执行
              const capture = hooks[i].call(cur, err, vm, info) === false
              if (capture) return   // 返回false 默认不会向上递归
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook')
            }
          }
        }
      }
    }
    // 最后执行全局的errorHandler，返回返回false就中断了
    globalHandleError(err, vm, info)
  } finally {
    popTarget()
  }
}
// 处理异步错误
export function invokeWithErrorHandling(
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
      res._handled = true
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      //如果用户有意在处理程序中抛出原始错误，
      //不要记录两次，一次性输出
      if (e !== err) {
        logError(e, null, 'config.errorHandler')
      }
    }
  }
  logError(err, vm, info)
}


function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}

/*
* ErrorBoundary  错误边界
*
* react
* class ErrorBoundary extends React.Component {
*    constructor(props) {
*        super(props);
*        this.state = { hasError: false };
*    }
*    componentDidCatch(error, info) {
*        this.setState({ hasError: true });
*        // 将异常信息上报给服务器
*        logErrorToMyService(error, info);
*    }
*    render() {
*        if (this.state.hasError) {
*            return '出错了';
*        }
*        return this.props.children;
*    }
* }
* vue
* Vue.component('ErrorBoundary', {
*  data: () => ({ error: null }),
*  errorCaptured (err, vm, info) {
*    this.error = `${err.stack}\n\nfound in ${info} of component`
*    return false
*  },
*  render (h) {
*    if (this.error) {
*      return h('pre', { style: { color: 'red' }}, this.error)
*    }
*    // ignoring edge cases for the sake of demonstration
*    return this.$slots.default[0]
*  }
*})
**
* <ErrorBoundary>
*   <this.props.children>
* </ErrorBoundary>
*
* 笔记
*
* 组件内部使用
* errorCaptured(...opt) {
*   //  当前组件报错，他会顺着父组件向上传递，直接到全局的errorHandler
*    console.log('你大爷的', opt);
*    return false   // 错误会被阻止，不会换起上一级的 errorCaptured 和全局的errorHandler
*  },
*
* 全局使用
*Vue.config.errorHandler = function (err, vm, info) {
*  // throw Error('抛出一个错误')
*  let {
*    message, // 异常信息
*    name, // 异常名称
*   stack  // 异常堆栈信息
* } = err;
* console.log('----1111----', name);
* console.log('----1111----', message);
* console.log('----1111----', stack);
*
* console.log('----2222----', vm,);
* console.log('----3333----', info);
* // 可以执行一步操作
};
* throw Error('抛出一个错误')
*
* */
```

### react的error解析

```js
// koa2
router.post('/errorMsg/', function(ctx) {
    let error = ctx.request.body;; // 获取前端传过来的报错对象
    let url = error.scriptURI; // 压缩文件路径
    if (url) {
        // map文件路径  vue的官方不建议上传 .map 文件，说是容易看到很多源码，react何尝不是呢
        // 所以可以直接传递给服务器当前的 .map 文件
        let fileUrl = url.slice(url.indexOf('client/')) + '.map'; 
        // 解析sourceMap
        let smc = new sourceMap.SourceMapConsumer(fs.readFileSync(resolve('../' + fileUrl), 'utf8')); // 返回一个promise对象
        smc.then(function(result) {
            // 解析原始报错数据
            let ret = result.originalPositionFor({
                line: error.lineNo, // 压缩后的行号
                column: error.columnNo // 压缩后的列号
            });
            let url = ''; // 上报地址
            // 将异常上报至后台
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    errorMessage: error.errorMessage, // 报错信息
                    source: ret.source, // 报错文件路径
                    line: ret.line, // 报错文件行号
                    column: ret.column, // 报错文件列号
                    stack: error.stack // 报错堆栈
                })
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                res.json(json);
            });
        })
    }
});
```