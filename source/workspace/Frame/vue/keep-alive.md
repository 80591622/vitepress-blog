---
date: 2026-05-10 22:52:36
title: keep-alive
categories:
  - Frame
  - vue
tags:
  - vue
---


# 使用keepAlive遇到的坑


## 介绍

`keep-alive`是`vue`的一个内置组件。它会缓存不活动的**组件实例**，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中。它提供了`include`与`exclude`属性，允许组件有条件地进行缓存，其中exclude的优先级比include高，max最多可以缓存多少组件实例。

[keep-alive详解文档](https://cn.vuejs.org/v2/api/#keep-alive)

使用 `keep-alive`的话会增加两个钩子函数， `activated` 和 `deactivated`

下面的文章我是`keep-alive`配合`vue-router`一块使用的，当前`keep-alive`也可以缓存单个组件，在这里就不多赘述。
 
## include和exclude

`include` 和 `exclude` prop 允许组件有条件地缓存。二者都可以用`逗号分隔字符串`、`正则表达式`或一个`数组`来表示详细健文档

我这里使用的`vuex`配合数组动态控制

```javascript
<keep-alive :include="includes" exclude="" :max="10" >
   <router-view/>
</keep-alive>

<script>
 export default {
	computed: {
	  includes() {
	     return state => state.router.includes
	   }
	},
	methods: {
     changeStoreIncludes() {
       this.$store.commit('changeIncludes', 'tableLists');
     }
   }  
 }
</script>  

// vuex
mutations: {
	changeIncludes(state, payload) {
	  state.includes = payload
	} 
}	
```

## include和exclude无效问题

使用`include/exclude` 属性需要给所有`vue类的name`赋值（注意不是给route的name赋值），否则 `include/exclude`不生效

```javascript
export default {
 name:'TableList', // include 或 exclude所使用的name
 data () {
  return {}
  },
}
```

## 直接使用v-if做区分

```html
<transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
     <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
          </router-view>
      </keep-alive>
</transition>
<transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
     <router-view v-if="!$route.meta.keepAlive">
       </router-view>
</transition>
```

这样做的话更加简单明了，而且配合动画更搭，不用再`vue`组件里面声明`name`，但是要在`route`的`meta`里面添加 `{keepAlive:true}`字段，如果路由是后台控制的话，前端调试就比较鸡肋。

**暴露的问题**

**问题1：**

位置公用的问题，当前列表页跳转到详情页面的时候，使用路由回到列表也时候，会出现位置公用的情况。（如果使用浏览器的回退方式，不会出现位置公用的情况。）

> **对于这个位置公用的情况，我是一头雾水，期待大佬解答** 🤝，有几点要说的不知对错，待求证。
> - **多页面**
> 1. 如果有数据请求的话，浏览器将会把页面置顶？
> 2. 如果是静态页面的话，浏览器会滚到你之前滚动的地方？
> 3. 上面仅仅是使用的浏览器的跳转行为，如果使用href或者路由封装一些方法，则都会置顶？
> - **求证上面 🤝**
> 4. 基于SPA模式开发，所以页面仅有一个，实现页面切换是利用哈希与组件的映射关系，vue-router是通过哈希来模拟完整的url，但是对于页面来说仍是一个url，所以在任何一个组件滚动页面，切换到其他组件的时候，页面仍保持滚动之前的状态，这就是出现位置公用的情况.

**问题2：**

加入有`A B C`三个页面，我现在只想要`A->B`时`A`缓存，然后`B->A`时，展示缓存的页面，`C->A`、`A->B->C->A`等都不要缓存。

## scrollBehavior

对于 **`问题1`** 我的想法是，跳转前直接把滚动高度缓存起来，然后每次再回来的时候，在把高度在重新赋值给它，但是如果我页面特别多都需要使用缓存的时候，就有些麻烦，然后我发现路由提供的一个这样的方法。

[scrollBehavior文档详解](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)

**scrollBehavior** 方法接收 to 和 from 路由对象。**第三个参数 `savedPosition`** 当且仅当 popstate 导航 (`通过浏览器的 前进/后退 按钮触发`) 时才可用。

```javascript
const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 此方法默认是检测 document.body 的，如果你是自定义的滚动盒子 是没办法控制你的滚动高度，都是 0
    console.log(savedPosition);
    // 如果返回一个 falsy(不是false) ，或者是一个空对象，那么不会发生滚动,说白了就是这个方法没用，并不会在页面顶部
    // falsy文档 https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        // 这里并不准确，可能我页面滚动的盒子不是body,vue应该有设置的地方
        from.meta.scrollTop = document.documentElement.scrollTop;
      }
      return {x: 0, y: to.meta.scrollTop || 0}
    }
  },
});

export default router

// 新版本支持异步滚动，返回一个Promise，这个特别有用，之前的方式如果页面里有异步请求的话，是不能够置顶的
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(savedPosition)
      }, 20)
    })
  } else {
    if (from.meta.keepAlive) {
      from.meta.scrollTop = document.documentElement.scrollTop;
    }
    return {x: 0, y: to.meta.scrollTop || 0}
  }
}
```

## 实现返回不刷新、其他菜单进入刷新


### 实现方式一

```javascript
// app.vue
<keep-alive>
   <router-view v-if="$route.meta.keepAlive" />
</keep-alive>

<router-view v-if="!$route.meta.keepAlive" />
```

```javascript
// router.js
{
   path: '/table-list',
   name: 'table-list',
   component: TableList,
   meta: {keepAlive: true} // 添加这个
 },
 {
   path: '/table-detail',
   name: 'table-detail',
   component: () => import('../views/table-detail.vue'),
 }
```
方式一和方式二都是基于上面这两个代码段。

在要缓存的列表页添加下面的代码

```javascript
activated() {
  // 如果是第一次进来的时候，就不用执行下面的函数。
  if (this.hasFirst) return
  this.queryList()
},
beforeRouteLeave(to, from, next) {
  if (to.name === 'table-detail') {
    if (!from.meta.keepAlive) {
      from.meta.keepAlive = true;
    }
  } else {
    from.meta.keepAlive = false;
    this.$destroy(); //销毁类页表页的实例，有坑
  }
  next()
}
```
完成上面的代码后，`A->B->A`正常，然后当`A->C->A->B->A `发现列表页A不会再缓存了，每次都是新的页面。谷歌后的方法是若不是第一次进入就强制刷新一次缓存页面。
**`this.$destroy()`**  调用`distory`之后不能再缓存该组件 而且会不断进入这个页面后重复生成多个虚拟dom.

继续完善，在`main.js`中使用router.afterEach((to,from)=>{})

```javascript
// 原理是如果不是从详情页进来的页面，都需要刷新，否则不能缓存
router.afterEach((to, from) => {
  // 如果当前页面刷新或者从详情也进来，就要执行下面代码，防止执行销毁方法导致不能缓存
  if (from.name && from.name !== 'table-detail' && to.name === 'table-list') {
    let isRefresh = sessionStorage.getItem('isRefresh')
    if (isRefresh === '0') {
      setTimeout(() => {// 这里必须是异步的，不然不能跳转
        window.location.reload()
      })
      sessionStorage.setItem('isRefresh', null)
    } else {
      sessionStorage.setItem('isRefresh', '0')
    }
  } else if (from.name === 'table-list' && to.name === 'table-detail') {
    sessionStorage.setItem('isRefresh', null)
  } else {
    sessionStorage.setItem('isRefresh', '0')
  }
})
```

我不知道谷歌出来的解决方案为什么都在详情页刷新，这样的问题就是用户第一次跳转到详情页，再回到列表页是没有缓存的功能，第二次就会正常，但是客户很可能就会执行这一次操作；

这种解决方式太过原始，用户体验太差，而且需要缓存多个页面就不太好控制，不建议用这个方法


### 实现方式二

灵感来自`方式一`，我可以其他方式模拟页面刷新。

```javascript
<template>
    <!--这里一定要使用v-if，好处是你可以使用$nextTick体验更好，另一方面是在使用v-show之后，他就相当于隐藏了该页面，但是如果里面有一些不会diff的dom,就会展示出来，模拟刷新的体验就不太好。例如使用 input->
    <div v-if="isRouterAlive">
        <div>{{ddd}}</div>
        <input v-model="ddd" type="text" />
        <table-list ref="table" :multiple="true" :otherTableParams="otherTableParams" :tableColumn="column"/>
    </div>
</template>
<script>
  export default {
    // 其他代码 ........
    activated() {
      if (this.$route.meta.isRefresh) { // 如果不是跳转到详情页
        const resetData = this.$options.data() // 获取原来data的数据
        delete resetData.column  // 我在这里操作的原因是因为，我通过上面获取的数据里面，用到函数返回的形式，展示为undefined  {cb: this.jumpEdit} 展示为 {cb: this.undefined},具体原因未知

        Object.assign(this.$data, resetData) // 重置data
        this.isRouterAlive = false // 通过v-if不展示当前页面 
        this.$nextTick(function () { 
          window.scroll(0, 0) // 页面置顶，不要再下面的定时器里面使用，有顿挫感
          this.isRouterAlive = true // 通过v-if展示当前页面 
        })
        setTimeout(() => {
          this.queryList() // 异步获取数据，跟我的项目组件有关，你们可以直接在上面获取就OK
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      // 判断如果不是进详情页，展示为true 是页面重新加载的意思
      from.meta.isRefresh = to.name !== 'table-detail';
      next() // 不添加路由不会跳转
    }
  }
</script>
```

**优化**
现在的代码有两个问题
`一`是从详情页到列表页，数据不会更新，如果我在详情页修改了某个数据，然后再到列表页就会滞后;
`二`是从详情页跳转到别的列表页然后在跳转到缓存的列表页，然后他还是会缓存之前的数据，不会更新当前页面;

优化如下：

```javascript
activated() {
 // 如果是第一次进来不执行下面的方法，否则会请求两次数据
 // this.hasFirst 不用生成响应式的，直接一个变量就好
 if (this.hasFirst) return
 if (this.$route.meta.isRefresh) {
    const data = this.$options.data()
    delete data.column

    Object.assign(this.$data, data)
    this.isRouterAlive = false
    this.$nextTick(function () {
      window.scroll(0, 0)
      this.isRouterAlive = true
    })
    setTimeout(() => {
      this.queryList()
    })
  } else if (this.$route.meta.isRefresh === false) { 
    // this.$route.meta.isRefresh在路由里面我并没有设置，默认是undefined，当他为false的时候，说明他从别的页面进来了，这个时候让他请求下数据
    this.queryList()
  }
}

beforeRouteEnter(to, from, next) {
 // 这个路由守卫函数式最先执行的
 to.meta.isRefresh = from.name && from.name !== 'table-detail';
  next()
},
// 下面代码注释即可
// beforeRouteLeave(to, from, next) {
//   from.meta.isRefresh = to.name !== 'table-detail';
//   next()
// }
```

最后可以把这些代码抽离成一个`mixins`,然后编写一个刷新的组件，哪里用在哪里调取下,[也可以看这篇文章](/2020/06/15/workspace/Frame/vue/reload/)。


### 实现方式三

这种用 `keep-alive` 提供的 `include` 和 `exclude `,然后配合vuex实现动态控制。

**路由入口页面**

```javascript
// app.vue
<keep-alive :include='includes' :exclude='':max="3">
  <router-view></router-view>
</keep-alive>
```

其中`include`代表着要缓存的，`exclude`代表着非缓存的,`max`代表最多缓存的个数。

```javascript
// 获取vuex的数据
import {mapGetters} from 'vuex'
export default {
  computed: {// 在computed中动态监控
     ...mapGetters(['includes']),
   },
  methods: {
     changeStore() {
       // 改变vue的数据，在这用不到
       this.$store.commit('change', 'tableLists')
     }
   }
}
```

**Vuex**

```javascript
const keepalive = {
  state: {
    includes: ['tableLists']
  },
  mutations: {
    change(state, payload) {
      state.includes = payload
    },
  },
  getters: {
    includes(state) {
      return state.includes
    }
  }
};

export default keepalive
```

**列表页的部分代码**

```javascript
activated() {
  // 同上，如果第一次进来，不执行下面的方法
  if (this.hasFirst) return
  this.queryList()
},
beforeRouteEnter(to, from, next) {
  // 这个时候还有没this,所以这里用this的话是不能操作vuex,我是在main.js里面赋值给了window
  window._store.commit('change', ['tableLists']);
  next()
  // 也可以这么用
  // next((el) => {
  //  el.$store.commit('change', ['tableLists']);
  // })
},
beforeRouteLeave(to, from, next) {
  // 这里可以统一在 scrollBehavior 处理就好了（建议在这里添加 = 参考下面）
  from.meta.scrollTop = document.documentElement.scrollTop; 
  if (to.name !== 'table-detail') {
    // 如果不是跳转到详情页面，就穿个空数组，这里不能用 '' 默认是所有的都缓存
    this.$store.commit('change', []);
  }
  next()
}
```

**详情页的部分代码**

```javascript
beforeRouteLeave(to, from, next) {
  if (to.name !== 'table-list') {
    this.$store.commit('change', []);
  }
  next()
}
```

**路由页面**

因为includes没有在路由里面定义 keepalive,所以上面的`scrollBehavior`这个方法当使用合成事件跳转的时候，需要做额外的处理

```javascript
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition)
      }, 20)
    })
  } else {
    const ary = ['Invest', 'Store'];  // 这里需要缓存的页面的route的name   不是vue类的name
    // 这里列表页跳转到别的页面，也会保留页面的滚动高度但是并没有缓存当前的页面，所以当页面再次返回的时候会重新加载当前页面
    if (ary.includes(from.name)) {
      /* 最近一次回顾的时候 发现了一个问题
       * 如果是列表页跳转到详情页，这个时候时候其实已经到了详情页面，
       * 如果当当前详情页的页面的高度没有列表页面跳转进来时滚动的高度高的时候，这个时候就会获取不真正的页面高度，然后合成事件回退的时候就会滚动不到跳转前的位置
       * 解决的办法就是在每个页面离开前，获取到页面的高度，存到的meta上，这样既能解决这个问题，也能结局把不是body滚动的情况获取不到滚动高度的问题。
      */
      from.meta.scrollTop = document.documentElement.scrollTop;
    }
    return {x: 0, y: to.meta.scrollTop || 0}

  }
}
```

上面的代码比较琐碎，需要添加到每一个页面，所以在实际项目中大家可添加一个keepalive的mixins,方便大家管理。

**使用include和exclude的注意点：**

1. 每个组件内部添加 {name:xx}
2. 若将include设置空 ' ' 每个页面都将会缓存
3. exclude的优先级高于include 使用exclude后


## 参考文档

[keep-alive](https://github.com/vuejs/vue/blob/dev/src/core/components/keep-alive.js)

[vueRouterIssues](https://github.com/vuejs/vue-router/issues/811)

[scrollBehavior](https://github.com/vuejs/vue-router/blob/dev/src/util/scroll.js#L10:1)

[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)