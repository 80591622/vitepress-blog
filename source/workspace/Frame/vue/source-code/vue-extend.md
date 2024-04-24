
# 全局挂载组件之Vue.extend

`Vue.extend` 属于Vue的全局 api，在实际业务开发中我们很少使用，因为相比常用的 `Vue.component` 写法使用 `extend` 步骤要更加繁琐一些。但是在一些独立组件开发场景中（例如：ElementUI库），所以`Vue.extend` + `$mount` 这对组合非常有必要需要我们了解下。

##  Vue.component

[文档](https://cn.vuejs.org/v2/api/index.html#Vue-componen)

**官网用法**：

注册或获取全局组件。注册还会自动使用给定的 `id` 设置组件的名称

```javascript
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
let ElInput = Vue.component('ElInput');
console.log(new ElInput);  // 就是Inout的实例
```

用法也特别的简单，你写好的组件，直接在main.js里面导入然后使用`Vue.component('xx-xxx',xxx)`就可以全局通用了。

- **好处**
  - 这样的`好处`就是所有页面基本上都是通过 router 来管理可以直接注册，组件的创建我们不需要去关注，相比 `extend` 要更省心一点
- **缺点**
  - 组件的名称都是自定义的，如果我要从接口动态渲染怎么办。【extend不用必须在初始化的时候完成，下面有实例】
  - 有内容都是在 `#app` 下渲染，注册组件都是在当前位置渲染。如果我要实现一个模态框的提示组件，就比较鸡肋了。


这时候，`Vue.extend + vm.$mount` 组合就派上用场了。


## Vue.extend

[文档](https://cn.vuejs.org/v2/api/index.html#Vue-extend)

**官网用法:**

```html
<div id="mount-point"></div>
```

```javascript
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

结果如下：

```html
<p>Walter White aka Heisenberg</p>
```

可以发现`Id`为`mount-point`的div ,是直接被替代了，没有在内部填充，在我们 `main.js` 初始化的时候用发其实也是一样：

```javascript
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');  // 此处都是替换，不是填充
```

**下面简单的分析下`$mount`的源码**

```javascript
// src/platforms/web/entry-runtime-with-compiler.js
import config from 'core/config'
import {warn, cached} from 'core/util/index'
import {mark, measure} from 'core/util/perf'

import Vue from './runtime/index'
import {query} from './util/index'
import {compileToFunctions} from './compiler/index'
import {shouldDecodeNewlines, shouldDecodeNewlinesForHref} from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount;  // 缓存了原型上的 $mount 方法
Vue.prototype.$mount = function (el, hydrating) {
  el = el && query(el)  // 通过 query函数 就是获取真实的DOM元素

  // 判断获取的真实 dom元素是否为 body 或 documentElement 报警告
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // 判断有么有render , 咱们一般都是用 template 写的vue，需要编译
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)  // 即获取 el 的 outerHTML
    }
    if (template) {
      // 然后通过compileToFunctions将 template 转化为 render 函数，options.render = render
      // 所有 Vue 的组件的渲染最终都需要 render 方法，无论是用单页面 .vue 方式开发，还是写了 el 或者 template 属性，
      // 最终都要被转成 render 方法，那么这个过程是 Vue 的一个 “在线编译” 的过程， 它是调用 compileToFunctions 方法实现的，最后调用原型上的 $mount 方法挂载。
      const {render, staticRenderFns} = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  // 如果没有传el的话，会直接执行这步，会把组件在内存中渲染完毕
  return mount.call(this, el, hydrating)
}
// 及时获取HTML 兼容IE
function getOuterHTML(el): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}
Vue.compile = compileToFunctions

export default Vue
```

- `$mount `方法支持传入 2 个参数，第一个是 el，它表示挂载的元素，可以是字符串，也可以是 DOM 对象，如果是字符串在浏览器环境下会调用 query 方法转换成 DOM 对象的。第二个参数是和服务端渲染相关，在浏览器环境下不需要传第二个参数。

- `$mount `方法实际上会调用` mountComponent` 方法，方法定义在 `src/core/instance/lifecycle.js `中


## 实现一个弹框组件

```javascript
// message/src/index.vue
<template>
    <div class="wrap">
        <div class="message" :class="item.type" v-for="item in notices" :key="item._name">
            <div class="content">{{item.content}}</div>
        </div>
    </div>
</template>

<script>
  // 默认选项
  const defaultOptions = {
    duration: 1500,
    type: 'info',
    content: '这是一条提示信息！',
  }
  let mid = 0
  export default {
    name:'MyMessage', // 建议添加方便外面直接取值
    data() {
      return {
        notices: []
      }
    },
    methods: {
      addMessage(notice = {}) {
        // name标识 用于移除弹窗
        let _name = this.getName()
        // 合并选项
        notice = Object.assign({
          _name
        }, defaultOptions, notice)

        this.notices.push(notice)

        setTimeout(() => {
          this.removeNotice(_name)
        }, notice.duration) 
      },
      getName() {
        return 'msg_' + (mid++)  //创建一个唯一的值 
      },
      removeNotice(_name) {
        let index = this.notices.findIndex(item => item._name === _name)
        this.notices.splice(index, 1)  // 删除当前超时的dom
      }
    }
  }
</script>

<style scoped>
    .wrap {
        position: fixed;
        top: 50px;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
    }
    .message {
        --borderWidth: 3px;
        min-width: 240px;
        max-width: 500px;
        margin-bottom: 10px;
        border-radius: 3px;
        box-shadow: 0 0 8px #ddd;
        overflow: hidden;
    }
    .content {
        padding: 8px;
        line-height: 1.3;
    }

    // 对应的集中状态 
    .message.info {
        border-left: var(--borderWidth) solid #909399;
        background: #F4F4F5;
    }
    .message.success {
        border-left: var(--borderWidth) solid #67C23A;
        background: #F0F9EB;
    }
    .message.error {
        border-left: var(--borderWidth) solid #F56C6C;
        background: #FEF0F0;
    }
    .message.warning {
        border-left: var(--borderWidth) solid #E6A23C;
        background: #FDF6EC;
    }
</style>
```



```javascript
// message/index.js
import Vue from 'vue'
import Message from './src/index.vue'

let messageInstance = null
let TempMessage = ''

// 模拟异步请求
setTimeout(() => {
  TempMessage = Message
}, 2000)

let init = () => {
  let MessageConstructor = TempMessage && Vue.extend(TempMessage)

  messageInstance = new MessageConstructor({})// 构造函数可以接传值，data、methods.....
  // console.log(messageInstance);

  // $mount()不带参数，会把组件在内存中渲染完毕
  messageInstance.$mount()

  // messageInstance.$el 拿到的就是组件对应的dom元素,可以直接操作dom
  document.body.appendChild(messageInstance.$el)
  messageInstance.$el.style.zIndex = 9999
}


let caller = (options) => {
  if (!messageInstance) {
    // 进页面初始化
    init(options)
  }
  // addMessage 是组件内部声明的方法，也可以通过构造函数传对应的方法
  messageInstance.addMessage(options)
}


export default {
  install(vue) {
    vue.prototype.$mymessage = caller
  }
}
```

```javascript
// main.js
import Message from '@/components/Message/index.js'
Vue.use(Message)
```

**使用**

```javascript
 this.$mymessage({
   type: 'warning',
   content: '你好坏啊，我好喜欢',
   duration: 6000
 })
```



## 参考文章

[JavaScript 方式调用的组件](https://blog.csdn.net/weixin_44867717/article/details/104954173)
