---
abbrlink: 64057aea
title: keep-alive源码分析
date: 2020-06-02
categories: 
- FE框架 
- Vue
- 源码分析
- keep-alive源码分析
---

<strong class='old-blog'>keep-alive源码分析</strong>

[[toc]]

### 如何使用

想看具体用法看我上一篇文章 [这大概是最全乎的keep-alive的踩坑指南](/2020/05/25/workspace/Frame/vue/keep-alive/)

### 源码剖析

[源码地址](https://github.com/vuejs/vue/blob/dev/src/core/components/keep-alive.js#L53)

```javascript
// /src/core/components/keep-alive.js
import {isRegExp, remove} from 'shared/util'
import {getFirstComponentChild} from 'core/vdom/helpers/index'

// 获取组件的name值
function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}
// 对应着includes那三种格式（数组、正则、和字符串），判断是否有当前的name
function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  return false
}
// 传进来当前的this和一个判断是否有当前name的函数
// pruneCache函数的核心是调用pruneCacheEntry
function pruneCache(keepAliveInstance, filter) {
  const {cache, keys, _vnode} = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        // 如果当前组件没有缓存，直接删除
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy() // 销毁当前组件
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  // 抽象组件没有真实的节点，在组件渲染的时候不会解析渲染成真实的dom节点，而只是作为中间的数据过度层处理，在keep-alive中是对组件缓存做处理
  abstract: true,
  props: {
    include: patternTypes, // 要缓存的组件
    exclude: patternTypes, // 不缓存的组件
    max: [String, Number] // 缓存的个数
  },
  created() {
    this.cache = Object.create(null)  // 缓存虚拟dom {key:vnode}
    this.keys = [] // 缓存的虚拟dom的键集合
  },
  destroyed() {
    for (const key in this.cache) {
      // 删除所有的缓存，所以 <keep-alive> 外面盒子尽可能的不要去使用v-if 
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted() {
     /*
      this.$watch('a', val => {
          console.log(val, 'balabala');
      })
      watch:{
          a：（newVal,oldVal)=>{
          }
      }
      都是监听值的变化的,方式一是监听不到对象的变化，第一个参数必须是字符串格式的
    */
    // 监控缓存的变化
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  render() {
    // 获取第一个子**组件**
    const slot = this.$slots.default
    // 找到第一个子组件对象
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    // 是否存在组件参数
    if (componentOptions) {
      const name = getComponentName(componentOptions)// 获取组件名字
      const {include, exclude} = this
      // 判断如果include没有当前的name或者exclude有不需要缓存的name  就返回vnode
      if ((include && (!name || !matches(include, name))) || (exclude && name && matches(exclude, name))) {
        return vnode
      }

      const {cache, keys} = this
      // 根据组件ID和tag生成缓存Key，会出现一个问题，就是在开发的时候，热加载后可能是空页面。
      const key = vnode.key == null ?
        componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '') :
        vnode.key

      if (cache[key]) {
        // 如果有缓存的话，直接赋值给vnode
        vnode.componentInstance = cache[key].componentInstance
        remove(keys, key)  // 删除当前的键
        keys.push(key)  // 然后把这个键追加到最后一位，目的就是排序，防止后面max的干扰
      } else {
        // 如果没有缓存的话，直接都存储起来
        cache[key] = vnode
        keys.push(key)
        if (this.max && keys.length > parseInt(this.max)) {
          // 超过缓存数限制，将第一个删除
          // 从这个看出动态改变max的数值，并不能控制缓存的个数，因为上面并没有watch监控max的改变。
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true  // 这个决定外面生命周期函数执行，很重要
    }
    return vnode || (slot && slot[0])
  }
}
```

其实大致可以分为这几步：

1. 在要缓存的组件上使用keep-alive标签
2. 根据传递的参数，看是否要添加缓存和限制的个数，不缓存直接返回你当前的vnode，若需要缓存就根据生成的key进行对象存储
3. 存储的过程要注意 max 和存储的位置，如果大于max就要把索引是1的key删除， 实现置换位置。
4. 将该组件实例的keepAlive属性值设置为true(this.$vnode.data.keepAlive 可以获取到，多的两个声明周期都是通过这个判断) 


### 钩子函数

#### 只执行一次的钩子

`keep-alive`是使用你之前存储的vnode，然后直接转换成真实dom，是发生在diff之后 patch阶段,所以缓存的组件是没有 `created,mounted` 这些生命周期的，具体看下面的代码分析。

```javascript
// src/core/vdom/create-component.js
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive  // 这里是判断是否使用了 keepAlive
    ) {
      const mountedNode: any = vnode
      componentVNodeHooks.prepatch(mountedNode, mountedNode) // 直接到了patch阶段
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },

  prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    const options = vnode.componentOptions
    const child = vnode.componentInstance = oldVnode.componentInstance
    updateChildComponent(
      child, // child.$scopedSlots
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // vnode.data.scopedSlots 
      options.children // new children
    )
  },
  insert (vnode) {
   const { context, componentInstance } = vnode
   if (!componentInstance._isMounted) {
     componentInstance._isMounted = true
     callHook(componentInstance, 'mounted')
   }
   if (vnode.data.keepAlive) {
     if (context._isMounted) {
       queueActivatedComponent(componentInstance)
     } else {
       activateChildComponent(componentInstance, true) // 这个就是新增的那个activate生命周期函数
     }
   }
 },
destroy (vnode) {
 const { componentInstance } = vnode
 if (!componentInstance._isDestroyed) {
   if (!vnode.data.keepAlive) {
     componentInstance.$destroy()
   } else {
     deactivateChildComponent(componentInstance, true) // 新增的deactivate生命周期函数
   }
	 }
	}
 // ....
}  
```

可以看出，当vnode.componentInstance(第一次进来是空的)和keepAlive同时为true时，不再进入$mount过程，那mounted之前的所有钩子函数（beforeCreate、created、mounted）都不再执行。

#### 调用activated

在patch的阶段，最后会执行invokeInsertHook函数，而这个函数就是去调用组件实例（VNode）自身的`insert`钩子，就是上面的那段代码。

```javascript
// src/core/vdom/patch.js
function invokeInsertHook (vnode, queue, initial) {
  // delay insert hooks for component root nodes, invoke them after the
  // element is really inserted
  if (isTrue(initial) && isDef(vnode.parent)) {
    vnode.parent.data.pendingInsert = queue
  } else {
    for (let i = 0; i < queue.length; ++i) {
      queue[i].data.hook.insert(queue[i]) // 调取insert方法
    }
  }
}
```

**就是上面componentVNodeHooks的insert的方法**

```javascript
  insert (vnode) {
   const { context, componentInstance } = vnode
   if (!componentInstance._isMounted) {
     componentInstance._isMounted = true
     callHook(componentInstance, 'mounted')
   }
   if (vnode.data.keepAlive) {
     if (context._isMounted) {
       queueActivatedComponent(componentInstance)
     } else {
       activateChildComponent(componentInstance, true) // 这个就是新增的那个activate生命周期函数
     }
   }
 }
```

**看下activateChildComponent函数**

```javascript
// src/core/instance/lifecycle.js
export function deactivateChildComponent (vm, direct) {
  if (!vm._inactive) {
    vm._inactive = true
    for (let i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i])
    }
    callHook(vm, 'deactivated') //添加钩子方法
  }
}
```

`deactivated`钩子函数也是一样的原理，在组件实例（VNode）的destroy钩子函数中调用`deactivateChildComponent`函数。

### 渲染

**keep-alive组件的渲染**

[/src/core/instance/lifecycle.js](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L32-L42)

```javascript
// /src/core/instance/lifecycle.js
export function initLifecycle (vm: Component) {
  const options = vm.$options
   // 找到第一个非abstract父组件实例
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
// ....
// 实例上的一些参数赋值
```

**keep-alive包裹的组件是如何使用缓存的？**

在patch阶段，会执行createComponent函数：

[/src/core/vdom/patch.js](https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js#L210-L230)

```javascript
// /src/core/vdom/patch.js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    // 第一次进来是没有这个的 （vnode.componentInstance），是在keep-alive里面赋值的
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef(i = i.hook) && isDef(i = i.init)) {
      i(vnode, false)
    }
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm) // 直接塞给父级
      if (isTrue(isReactivated)) { // 判断是不是空的
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) // 然后在进行响应式
      }
      return true
    }
  }
}
```