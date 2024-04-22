---
abbrlink: egsgsds
title: 基于Vue的组件局部刷新
date: 2020-06-15
categories: 
- FE框架 
- Vue
- 基于Vue的组件局部刷新
---

<strong class='old-blog'>基于Vue的组件局部刷新</strong>


之前做keepalive，组件destroy销毁后，就不会缓存该页面了，解决的办法就是刷新当前的页面，一种是原始的刷新方式，一种就是基于框架本身的局部刷新，今天完善下基于vue的局部刷新。



我上次省事在做keepalive的时候，直接在页面内部做的局部刷新，具体看[这大概是最全乎的keep-alive踩坑指南](https://juejin.im/post/6844904178926485511#heading-7) ,实现的思路就是重置所有的data,然后在配合v-if,就能做到局部的刷新，然后可以自己定义一个mixins代码也是很简洁的，但是还是要每次都引入mixins,现在用另一种方式重新优化，原理跟上面的那个方法类似。



**第一步 : 在 app.vue 中定义全局方法:如下**



```javascript
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>    //通过v-if来控制容器的出现与消失
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    // 通过provide传递给子代，谁需要谁获取下就OK了
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods: {
   reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   }   
 }
}
</script>
```

我们定义了全局的方法 reload( ); 原理就是通过控制组件容器的出现与消失, 达到重新渲染的效果 , 从而实现我们的目的;



**第二步:在全局中定义了刷新的方法, 接下来就是要引入到需要刷新的组件中:**



```javascript
<script>
export default {
  inject:["reload"],
  data() {
    return {
      
    }
  },
  mounted() {
    this.reload();
  }
};
</script>
```



通过 **inject 方法**引入到需要的组件中, 直接**this.reload()** 调用这个方法即可.

