
# 问题验证解析


## vue中组件的data为什么是一个函数

```javascript
// 方法一
data () {
   return {
      count:0,
      show:true,
   }
}
// 方法二
data: {
    count: 0,
    show:true
}
```
组件是可复用的`vue`实例，一个组件被创建好之后，就可能被用在各个地方，而组件不管被复用了多少次，
组件中的`data`数据都应该是`相互隔离，互不影响`的，基于这一理念，组件每复用一次，`data`数据就应该被复制一次，之后，
当某一处复用的地方组件内`data`数据被改变时，其他复用地方组件的`data`数据不受影响


**方法一** 例子中的`data`不是一个单纯的对象，而是一个函数返回值的形式，所以每个组件实例可以维护一份被返回对象的独立拷贝，如果我们将上述例子中的`data`修改为 **方法二**。<br/>
那么就会造成无论在哪个组件里改变了`count`值，都会影响到其他组件里的`count`。这是因为当data如此定义后，这就表示所有的组件实例共用了一份`data`数据，因此，无论在哪个组件实例中修改了`data`,都会影响到所有的组件实例。

## v-show 与 v-if 有什么区别

**v-if** 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；
也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。**v-if** 有更高的切换开销

**v-show** 就简单得多——不管初始条件是什么，元素总是会被渲染，所以有更高的初始渲染开销，并且只是简单地基于 **CSS 的 'display'** 属性进行切换。
适用于需要非常频繁切换条件的场景

## vue 的父组件和子组件生命周期钩子函数执行顺序

- 加载渲染过程
  - 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted


- 子组件更新过程
  - 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated


- 父组件更新过程 
  - 父 beforeUpdate -> 父 updated


- 销毁过程
  - 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
  
  
## vue 项目进行哪些优化

**代码层面的优化**

- v-if 和 v-show 区分使用场景
- computed 和 watch  区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载(按需加载)
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染


**Webpack 层面的优化**

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

**基础的 Web 技术的优化**

- 开启 gzip 压缩
- http缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

## Vue 采用数据劫持的手段可以精准拿到变化的数据,为什么还需要虚拟DOM进⾏diff检测差异?

现在前端框架有两种数据变动侦测方式，一种是pull，一种是push.
pull 的代表是React ，在进行 setState 操作后显示更新数据，React 会使用 diff 算法一层层找出差异，然后 patch 到 DOM 树上，React 一开始不知道那里变化了，只是知道变化了，然后暴力进行查找那变化了或者使用`PureComponent/shouldComponentUpdate`，另一个代表是 Angular 的脏检查。

Vue 的响应式系统就是 Push 的代表，Vue 初始化的时候就会对 data 的数据进行依赖收集，因此Vue能实时知道那里发生了变化，一般绑定的细粒度过高，会生成大量的Watcher 实例，则会造成过大的内存和依赖追踪的开销，而细粒度过低无法侦测到变化。因此，Vue采用的是中等细粒度的方案，只针对组件级别的进行响应式监听也就是push，这样可以知道那个组件发生了变化，再对组件进行diff算法找到具体变化的位置，这是pull操作，vue是pull + push 结合进行变化侦测的。

## vue 中怎么重置 data

使用Object.assign()，vm.$data可以获取当前状态下的data，vm.$options.data可以获取到组件初始化状态下的data

```js
Object.assign(this.$data, this.$options.data())
```

## 组件中写 name 选项有什么作用

1. 项目使用 keep-alive 时，可搭配组件 name 进行缓存过滤
1. DOM 做递归组件时需要调用自身 name
1. vue-devtools 调试工具里显示的组见名称是由vue中组件name决定的

## route 和 router 的区别是什么

1. $route是“路由信息对象”，包括path,params,hash,query,fullPath,matched,name等路由信息参数。
1. $router是“路由实例对象”，包括了路由的跳转方法(push、replace)，钩子函数等

## vue组件里写的原生addEventListeners监听事件，要手动去销毁吗

要 

一方面是绑定多次，另一方面是函数没释放会内存溢出

## v-clock和v-pre指令

v-cloak指令只是在标签中加入一个v-cloak自定义属性，在HTML还编译完成之后该属性会被删除。
v-pre可以用来阻止预编译，有v-pre指令的标签内部的内容不会被编译，会原样输出。

```js
<h1 v-pre>
    {{showPage}}
</h1>// 仍然是显示的 {{showPage}}
```

## 权限指令

```js
Vue.directive('hasPermission', {
  bind(el, binding, vnode) {
    el.parentNode ? el.parentNode.removeChild(el) : el.style.display = 'none';

    const permissions = vnode.context.$store.state.account.permissions; // 存放在vuex
    if (binding.value === '') return;
    const value = binding.value.split(',')
    let flag = true
    for (const v of value) {
      if (!permissions.includes(v)) {
        flag = false
      }
    }
    if (!flag) {
    }
  }
});

// 使用
v-hasPermission="[1,2,3,4,5]"
```

## vue-router报错Uncaught (in promise)及解决方法

问题：

在升级了Vue-Router版本到到3.1.0及以上之后，页面在跳转路由控制台会报Uncaught (in promise)的问题。

看vue-router的版本更新日志

V3.1.0版本里面新增功能：push和replace方法会返回一个promise, 你可能在控制台看到未捕获的异常。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2er9ktpx8j21fc0dmage.jpg)

解决：

方法一：在调用方法的时候用catch捕获异常

```js
this.$router.replace('/login').catch(err => {
   console.log(err)
})
```

方法二：对Router原型链上的push、replace方法进行重写，这样就不用每次调用方法都要加上catch

在router.js加入以下内容：
```js
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
```

## 在vue中watch和created哪个先执行？为什么？

官网的生命周期图中，init reactivity是晚于beforeCreate但是早于created的。

watch加了immediate，应当同init reactivity周期一同执行，早于created。

而正常的watch，则是mounted周期后触发data changes的周期执行，晚于created。

