# vue基本用法

## 常用指令

<span style='display: block;text-align: left;'> 常用指令	</span>|<span style='display: block;text-align: left;'> 描述</span>
:-------- | :--------  
**v-model** | 双向数据绑定 把表单元素的value和data中的属性绑定到一起，表单的value发生变化，data的属性也会跟着变化【v-model.number // 直接转换成数字】
**v-text** | 把data（不只是data）中的属性值绑定到DOM元素中，会覆盖元素中原有的内容；并且不能识别字符串中的html标签
**v-html** | 把data（不只是data）中的属性值绑定到DOM元素中；并且可以识别字符串中的html标签
**v-if / v-else** | 如果v-if绑定的值为true，就显示对应的元素；如果为false，显示v-else对应的元素；注意：v-else不是必选项，但必须结合v-if使用，而v-if可以单独使用
**v-show** | 如果值为true，对应的元素就会展示，如果为false，则隐藏；
**v-bind** | 绑定动态属性，动态绑定后就可以使用data中的该属性的值；v-bind可以简写为 **:**
**v-for** | 列表渲染
**v-on** | 事件绑定，可简写为@
**is** | 配合`<component>`可动态控制展示那个组件，也可以摆脱html模板的限制

**`v-for()`**

与react的不同的是，react的map()只能循环对象，vue的v-for就厉害了可以遍历数组、对象、数组、字符串

```javascript
<li v-for="(item, key) of items" :key="key">
<li v-for="(item, key) in items" :key="key">
<li v-for="count in 10" :key="count">{{count}}</li>
// 可使用in 和 of 作为分隔符,与react的map不同的是，Vue的v-for都可以用作对象,数组，数字，
// 字符串等等的遍历，默认再js中，对象不能用for of 遍历，但是vue的合成方法中是允许的【Object.keys()】。
```

<span style='display: block;text-align: left;'> 事件修饰符	</span>|<span style='display: block;text-align: left;'> 描述</span>|
:-------- | :--------  
**.prevent** | 阻止元素的默认行为
**.stop** | 阻止事件冒泡
**.capture** | 事件在捕获阶段触发
**.once** | 事件只会执行一次，执行完后会被移除
**.self** | 自身的事件触发时才执行事件函数
**.passive** | 事件完成才会触发  例如：@scroll.passive="onScroll"

```javascript
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>
// 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。
// 因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
```

<span style='display: block;text-align: left;'> 键盘事件	</span>|<span style='display: block;text-align: left;'> 描述</span>|
:-------- | :--------
@keydown/@keyup | 修饰符：指定按下哪个按键时/松开时才触发事件函数
**.enter** | 回车
**.esc**  | esc键
**.delete** | 删除/退格
**.space** | 空格
**.tab** | tab键
**.up** | 上
**.right** | 右
**.down** | 下
**.left** | 左

## class与style如何动态绑定

```vue
<div id="box">
    <p :class="{ active: isActive, 'text-danger': hasError }"></p>
    <p v-bind:class="[isActive ? activeClass : '', errorClass]"></p>
    <!--直接添加样式-->
    <p style="background-color: blue;">sssss</p>
    <!--绑定样式-->
    <p v-bind:style="'background-color: red;'">sssss</p>
    <!--将vue中的属性作为样式设置-->
    <p :style="obj">sssss</p>
    <!--将多个属性作为样式设置-->
    <p :style="[obj,obj1]">sssss</p>
    <!--style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值 -->
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
</div>
<script type="text/javascript">
    var vm=new Vue({
        el:"#box",
        data:{
            isActive: true,
            hasError: false,
            errorClass: 'text-danger',
            obj:{
                backgroundColor:"gold"
            },
            obj1:{
                fontSize: "30px"
            }
        },
    });
</script>
```

## vue中一些小技巧

```javascript
// 访问父级组件实例,可以直接通过这个方法，访问到父组件定义的属性，也可直接修改，（不建议修改）
this.$parent

// 用来获取定义在data外的数据和方法的。
this.$options
```

## props类型

```javascript{3}
 props: {
  title: {
        type: [String, Number],
        default: '标题',
        required: true,
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
}

props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise,
  time:Date
}
```

## 组件components

## 局部组件

在直接import导入在components里面注册下就能用了

```javascript
<script>
    import compB from './components/CompB'
    import compA from './components/CompA'
    import CompC from './components/CompC'

    export default {
        components: {
            compA,
            compB,
            CompC,
        },
      // ...
    }
```

## 全局组件

在main.js里面注册下，就可以全局直接用了

```javascript
import CompA from "./components/CompA"
Vue.component("com-a", CompA);
```

## 过滤器filter **

## 局部过滤器

写在Vue实例中的`filters`内的过滤器是局部过滤器；只能在当前组件可以使用
  - 过滤器可以连续使用，后面的过滤器的参数，是上一个过滤器的处理结果，数据会展示成最后一个过滤器的结果
  - 过滤器可以传参，参数是传给第二个形参的，第一个参数是`管道符前面的值

```javascript
{{item.price | toRMB | toFixed(3)}}

data: {
    products: [
        {
            name: 'MAC',
            price: 2000
        },
        {
            name: 'iphoneX',
            price: 1000
        }
    ]
},
filters: { // 写在filters里面的过滤器是局部过滤器
    toRMB (val) {
        return val * 6.832423
    },
    toFixed (val, num = 2) {
        return '¥' + val.toFixed(num)
    }
}
```

## 全局过滤器

`Vue.filter(过滤器名, callback)` 这种过滤器在任何地方都能使用

```javascript
// main.js
Vue.filter('toRMB', function(val) {
    return  return val * 6.832423
})
// 组件内部使用
{{item.price | toRMB}}
```

## 自定义全局方法

```javascript
// mian.js
//  全局的方法
Vue.prototype.$fetch = function (url) {
    return fetch(url).then(e => e.json()).then(val => {
        return val
    })
};

// 自定义全局指令
import Vue from 'vue'

const directives = {
    /**
     * 自动下滑到底部指令
     */
    autoscroll: {
        // componentUpdated:VNode 及其子 VNode 全部更新后调用
        componentUpdated: function(el) {
            let scrollHeight = el.scrollHeight
            let clientHeight = el.clientHeight

            scrollHeight > clientHeight && (el.scrollTop = scrollHeight)
        }
     },
    focus: function (el) {
        el.focus()
    }
}

Object.keys(directives).map(t => {
    Vue.directive(t, directives[t])
})

// 局部自定义的指令
<template>
    <input ref="input" v-focus v-model="val" type="text">
    <strong v-demo="{ color: 'red' }">111默认的slot</strong>
</template>
<script>
    export default {
        // ....
        directives: {
            // 局部自定义指令
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            },
            demo: {
                inserted: function (el, binding) {
                  // el当前的dom
                  //  binding 指令的一些信息 name: "demo"
                  //                       rawName: "v-demo"
                  //                       value: {color: "red"}
                    console.log(el.style.color = binding.value.color)
                }
            }
        },
        // ....
    }
</script>

// 全局组件
Vue.component("counter", About);

// 全局mixin
Vue.mixin(mixin);
```

## VUE自定义指令

```javascript
Vue.directive('focus',{
    bind() {
      // 当指令绑定到 HTML 元素上时触发.**只调用一次**
      console.log('bind triggerd')
    },
    inserted: (el, binding, vnode) => {
      // 当绑定了指令的这个HTML元素插入到父元素上时触发(在这里父元素是 `div#app`)**.但不保证,父元素已经插入了 DOM 文档.**
      console.log(el, '当前的dom');
      console.log(binding, '指令信息集');
      console.log(vnode, 'dom信息');
      console.log('inserted triggerd')
    },
    updated() {
      // 所在组件的`VNode`更新时调用.
      console.log('updated triggerd')
    },
    componentUpdated() {
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      console.log('componentUpdated triggerd')
      
    },
    unbind() {
      // 只调用一次，指令与元素解绑时调用.
      console.log('unbind triggerd')
    }
})
```

**钩子函数参数**

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。

- `binding` ：一个对象，包含以下属性：

  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。


## mixins

在开发中有这么一种情况，当你有两个非常相似的组件，它们的功能极其相似，但它们局部稍有不同，现在你的做法是将它们分成两个不同的组件？还是只保留一个组件，局部差异的部分采用`props`控制呢？

如果将它们拆分为两个不同的组件，这时功能发生变化，那么必须在两个地方修改它们，如果用props来区分它们，那么后期维护起来将会很复杂，可能减慢你开发的速度

`Vue`中的`Mixins`基本上是一块定义的逻辑，由Vue以特定的规定方式存储，可以反复使用，为`Vue`实例和组件添加功能。因此，`Vue mixins`可以在多个Vue组件之间共享，而无需重复代码块。使用过SASS的CSS预处理器的人对mixin应该有很好的了解。

组件内部有跟mixins里面一样的方法时，组件内部的优先级高与mixins

## 局部mixins

```javascript
//assets/mixins/mixin.js
export const toggle = {
  data() {
    return {
      "show": false
    }
  },
  methods: {
    changeState() {
      this.show = !this.show;
    }
  },
  created() {
      // 默认每次都会执行
      console.log('created', 'mixins');
  },
  mounted() {
      console.log('mounted', 'mixins');
  }
};
```

```javascript
<template>
  <div>
     <h1 @click="changeState">mixins</h1>
     <h2 v-if="show">toast</h2>
  </div>
</template>

<script>
import {toggle} from './mixins/toggle'

export default {
  mixins: [toggle]
  // ... 
  //这里面可以正常写，优先级高于mixin的方法。
}
</script>
```

## 全局mixins

```javascript
// main.js
const mixin = {
    methods: {
        formatDate(dateTime) {
            return dateTime
        }
    }
};
Vue.mixin(mixin);

// 组件里面使用
console.log(this.formatDate(new Date()),'mixins');
```

注意：请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项


## extends 和 mixins 区别

extends 和 mixins 类似，通过暴露一个 extends 对象到组件中使用。

extends 会比 mixins 先执行。执行顺序：extends > mixins > 组件

extends 只能暴露一个 extends 对象，暴露多个 extends 不会执行



## vue 组件间通信有哪几种方式

## props/$emit

适用 父子组件通信

```vue{7-10,41,49-58,61-62}
// 父组件
<template>
    <div id="app">
        <div @click="onMore('值')">
            父组件
        </div>
        <compB
            :title.sync="value"
            @more="onMore"
        />
    </div>
</template>

<script>
    import compB from './components/CompB'

    export default {
        name: 'App',
        components: {
            compB
        },
        data() {
            return {
                value: '',
            }
        },
        methods: {
            onMore(val) {
                console.log(val);
                // this.value = val
            }
        }
    }
</script>

// 子组件
<template>
    <div>
        <div class="title">{{title}}</div>
        <div @click="handleMore">子组件修改父组件的值</div>
        <!--<div @click="$emit('update:title', 'false')">子组件修改父组件的值</div>-->
    </div>
</template>

<script>
    export default {
        name: 'Comb',
        components: {},
        props: {
            title: {
                type: [String, Number],
                default: '标题'
            },
            moreBtn: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleMore() {
                this.$emit('update:title', 'sync方式修改');
                this.$emit('more', 111);
            }
        }
    }
</script>
```

## $emit/$on

适用于 父子、隔代、兄弟组件通信


**最近在思考一个问题为什么一定要在created中写this.$on，可以放在mounted中吗?**

1. 如果触发和监听组件在页面上都创建了，并没有进行数据传输，那么可以放在mounted中

这种情况在实际工作中比较常见，如果在触发的组件实际触发之前，监听组件mouted方法执行了，那么就没有任何问题

2. 如果触发和监听组件在页面上依次创建，那么要放在created中

放在created中最主要的原因是组件的生命周期执行顺序决定的， 下面做一个控制不同子组件显示隐藏的问题，a是现在的组件，b是即将显示的组件，那么执行顺序是b先created，beforeMount,
然后才是a的beforeDestroy,destroyed钩子执行,b的mounted最后执行,针对这种业务你想一下，你在a的beforeDestroy钩子中触发emit，
如果在b的mounted中监听，这时候b的生命周期还没有执行到那一步所以，你的触发是不会生效的，所以更通用的情况是放在created钩子中


**总结就是 $emit 要放在 $on监听 之后**

## vuex 、 $refs 、$parent

## provide/inject

provide 和 inject 主要为高阶插件/组件库提供用例。与 React 的上下文特性很相似。

provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其**对象的属性还是可响应的**。

inject/provide 本质还是通过$parent向上查找祖先节点数据

```javascript
export default {
    name: 'u-form',
    props: {
        title: String,
        labelWidth: String,
        contentWidth: String,
        okButton: { type: String, default: '确定' },
        cancelButton: { type: String, default: '取消' }
    },
    provide() {
        return {
            uForm: this
        }
    }
}
```

```javascript
export default {
    name: 'u-form-item',
    props: {
        label: String,
        error: String,
        required: Boolean,
        tip: String
    },
    data() {
        return {
            leftSty: {},
            rightSty: {}
        }
    },
    inject: ['uForm'],
    created() {
        this.uForm.labelWidth && (this.leftSty.width = this.uForm.labelWidth)
        this.uForm.contentWidth && (this.rightSty.width = this.uForm.contentWidth)
    }
}
```

watch 也可以监听 

```js
// 父
provide () {
    return {
      nameFromParent: this.name,
      getReaciveNameFromParent: () => this.name
    }
  },
  
 // 子  
inject: ['nameFromParent', 'getReaciveNameFromParent'],
computed: {
// 方便使用
reactiveNameFromParent () {
  return this.getReaciveNameFromParent()
}
},
watch: {
// 测试
'reactiveNameFromParent': function (val) {
  console.log('来自Parent组件的name值发生了变化', val)
}
},

mounted() {
  const unWatch = this.$watch("reactiveNameFromParent", (promise) => {
   
    unWatch(); // 仅执行一次
  });
},
```

## defineProperty 的不足

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。
然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`
- 新增对象节点时候 `vm.obj.a = 1`

## 解决的办法

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名,当前组件的实例
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

// Object
this.$set(this.obj,'a',1);
this.obj= Object.assign({}, this.obj, { a: 1})
```

## nextTick()

Vue 的特点之一就是响应式，但数据更新时，DOM 并不会立即更新。当我们有一个业务场景，需要在 DOM 更新之后再执行一段代码时，可以借助nextTick实现。

Vue的DOM更新不是同步的，而是异步的，如果我们希望获取更新数据后渲染出来的DOM，
我们需要使用 **$nextTick；this.$nextTick(callback),** callback会在DOM更新以后执行（如果想要在DOM更新后操作DOM，或者在DOM更新后有其他的事情，要用$nextTick）

```vue
<li v-for="(item, index) in ary"
    :key="item.id"
    ref="listItem">{{item}}</li>

new Vue({
    el: '#app',
    data: {
        ary: [1, 3, 5]
    },
    mounted() {
        console.log(this.$refs.listItem.length)
        this.ary.push(7, 9)
        // console.log(this.$refs.listItem.length) // 为什么还是3，而不是5呢？
        // 因为Vue更新DOM的机制是异步的；push 7，9后并没有直接就去更新DOM，而是先等同步任务执行完，才去执行异步的更新DOM

        // 如果一定要获取更新数据以后的DOM，要用$nextTick
        this.$nextTick(() => {
            // $nextTick 会把回调函数放到DOM更新以后执行
            console.log(this.$refs.listItem.length)
        })
    }
});
```


## computed & watch **

**computed 计算属性**

1. 页面加载时就求值；支持缓存，如果依赖的数据发生改变，才会重新计算
2. 不支持异步
3. 如果一个属性是由其他属性计算而来，这个属性依赖其他属性，依赖发生变化时自动求取最新的计算结果

**watch 观察属性**

1. 页面加载时不求值，依赖值发生改变时才求值
2. watch 支持异步
3. watch只能监听一个属性的变化，如果有属性依赖这个结果，那么需要手动去重新计算这个结果；

> **`栗子`**

```vue
<div id="app">
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
  {{fullName}}
</div>

<script>
new Vue({
    el: '#app',
    data: {
      firstName: '',
      lastName: '',
      fullName: '',
      obj:{  }
    },
    computed: {
      fullName () {
        return this.lastName + this.firstName;
      }
    },
    watch: {
      firstName(newVal, oldVal) {
        this.fullName = this.lastName + newVal;
      },
      lastName(nawVal, oldVal) {
        this.fullName = newVal + this.firstName;
      },
      obj: {
        handler: 'sayName' , // 这里是字符串
        immediate: true, // 立即执行
        // deep: true   // 深度监控
        }
    },
    methods: {
       sayName() {
           console.log(this.name)
       }
    }
 });
</script>
```

```javascript
// 整个对象深度监听的时候  需求可能导致让你忽略某个指定的属性变动侦测，这样就就不能这么用了，如果属性特别多的话，单个拆开监听 费时费力 ， 可以用下面的方法。

// https://cn.vuejs.org/v2/api/#vm-watch
mounted() {
  const handler = () => console.log(this.obj);
  Object.keys(this.obj)
    .filter(_ => !["name"].includes(_)) // 指定那些属性 不用监听
    .forEach(_ => {
    this.$watch(vm => vm.obj[_], handler, {
      deep: true
    });
  });
}
```

```javascript
computed: {
  fullName: {
    // getter  默认只有getter方法
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter  我们可以手动添加setter方法，做一些中间处理
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 使用ref

- 首先在要获取的元素添加ref="标识符"的行内属性
- 获取的时候this.$refs.标识符获取元素
- 如果相同的一个ref有一个，获取到的就是带这个ref的原生元素对象
- 如果相同ref的有多个，获取到的是所有带有这个ref的元素组成的数组

```vue
<p ref="box">{{msg}}</p>

this.$refs.box.style.color = 'red'
```

## this.$once() && 钩子事件hookEvent

this.$once('hook:beforeDestroy',callback)


**只针对钩子函数**

清除定时器

```javascript
// 可以用这个方式离开页面之前可以清除定时器
mounted() {
   // console.log(this.$options.data())
   console.log(this)
   this.timer = setInterval(() => {
     console.log(Date.now())
   }, 1000)

   this.$once('hook:beforeDestroy', () => {
     clearInterval(this.timer);
   })
 },
```

监控子组件的生命周期


```javascript
// 可以侦查组件的钩子函数
<List @hook:mounted="listenMounted" />
```



## vue 如何关掉响应式

**使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化**

例子：

```javascript
let obj = {
  foo: 'bar'
}
Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

```javascript
<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

另外 Vue 也为大家提供了一个 只能修改数据一次的方法

**v-once**

通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：

```javascript
<span v-once>这个将不会改变: {{ msg }}</span>
```


## vue样式穿透

在开发中修改第三方组件样式是很常见，但由于 scoped 属性的样式隔离，可能需要去除 scoped 或是另起一个 style 。这些做法都会带来副作用（组件样式污染、不够优雅），样式穿透在css预处理器中使用才生效。

深度作用选择器有`>>>`和别名`/deep/`

`>>>`基本在纯css中使用，类似Sass，less的Css预编译器一般都用`/deep/`，但是eslint 可能不被通过，所以可以使用`::v-deep`代替

```scss
  ::v-deep .el-table thead tr,::v-deep .el-table thead tr th {
    background: rgba(235, 238, 245, 0.27) !important;
  }
```


## 函数式组件

函数式组件是无状态，它无法实例化，没有任何的生命周期和方法。创建函数式组件也很简单，只需要在模板添加 functional 声明即可。一般适合只依赖于外部数据的变化而变化的组件，因其轻量，渲染性能也会有所提高。

```javascript
<template functional>
    <div class="list">
        <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
        </div>
    </div>
</template>
```

## css使用js的变量

```javascript
<template>
  <div class="box" :style="styleVar">
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 54,
    },
  },
  computed: {
    styleVar() {
      return {
        '--box-height': this.height + 'px'
      }
    }
  },
}
</script>
<style scoped>
.box {
  height: var(--box-height);
}
</style>
```

## 生命周期**

<span style='display: block;text-align: left;'> 生命周期	</span>|<span style='display: block;text-align: left;'> 描述</span>|
:-------- | :--------
beforeCreate | 组件实例被创建之初，组件的属性生效之前
created | 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用
beforeMount | 在挂载开始之前被调用：相关的 render 函数首次被调用
mounted | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
beforeUpdate | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前
update | 组件数据更新之后
activated | `keep-alive 专属`，组件被激活时调用
deactivated | `keep-alive 专属`，组件被销毁时调用
beforeDestroy | 组件销毁前调用
destoryed | 组件销毁后调用

## 路由使用

```javascript
   {
    path: "/",
    redirect: "/accountSum",
  },
  {
    path: '/mic/*',
    name: 'mic',
    component: {
      render: (h) => h('router-view'),// 渲染到 	<router-view></router-view> 中
    },
  },
  {
    path: "/accountDetails/id:?",
    component: () => import('../components/AccountDetails.vue'),
    meta: {keepAlive: true,}
  },
  {
    path: "*",
    redirect: "/accountSum",
  },

export default new Router({
  mode: "history",// 默认是hash模式
  routes,
  // linkActiveClass: "active"
})
```

## 路由的方法

```javascript
this.$router.back()  // 回退
this.$router.go(n)

this.$router.replace()
this.$router.push(`/permission/role-detail/${val}`);  // 跳转到当前role-detail页面

 const {name, meta, path, params, fullPath, query, hash} = this.$route // 获取值
```

## 全局守卫

```javascript
// main.js 入口文件
import router from './router'; // 引入路由
router.beforeEach((to, from, next) => { 
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  console.log('afterEach 全局后置钩子');
});
```

## 路由独享守卫

```javascript
const router = new VueRouter({
  routes: [
    {
      path: workspace,
      component: Foo,
      beforeEnter: (to, from, next) => { 
        // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
      }
    }
  ]
})
```

## router-link-exact-active和router-link-active

**router-link-exact-active**

当路由到哪里时，该类名就添加到对应的路由标签上

**router-link-active**

子级选中后，父级也会跟着选中

## AJAX数据调取

可以在钩子函数 `created、beforeMount、mounted` 中进行调用，因为在这三个钩子函数中，data 已经创建，
可以将服务端端返回的数据进行赋值。推荐在 `created` 钩子函数中调用异步请求，因为在 `created` 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

```javascript
export default {
   data () {
     return {
        commitList:[],
        show:true,
      }
   },
   methods: {
      async queryCommit(){
       this.show = true
       this.commitList =  await fetch(`https://api.xxxx.cn`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'token xxxx'
                }
            }
         ).then(response => {
             if (response.ok) {
                this.show = false
                return response.json();
             }
             throw new Error('接口调取失败！');
         });
      }
   },
   created(){
       this.queryCommit();
   },
}
```

## 语法示例*

```javascript
<div id="app">
    <!-- 小胡子语法 -->
    {{ msg }}

    <!-- v-on事件绑定，可简写为 @ -->
    <p>{{ msg }}</p>
    <button v-on="reverseMsg">点击翻转</button>

    <!-- v-bind数据动态绑定，可简写为 : -->
    <span v-bind:message="msgTime">创建时间</span>

    <!-- v-if/v-else/v-show控制元素出现（v-if和v-else直接操作的DOM；v-show控制的是style） -->
    <p v-if="seen">Now you see this</p>
    <p v-else>Now you see that</p>
    <p v-show="seen">This is v-show's content</p>

    <!-- v-for列表渲染，可渲染对象、数组、字符串、数字，生成谁就v-for谁，v-for之后一定要写:key属性 -->
    <ul>
        <li v-for="(item, index) in toDoList" :key="item.id">
            {{ index }}
        </li>
    </ul>

    <!-- v-text/v-html将属性绑定到DOM元素中，text不识别标签，html识别 -->
    <div v-text="title"></div>
    <div v-html="title"></div>

    <!-- v-model双向数据绑定，注意只能绑定表单元素 -->
    <div>{{ phone }}</div>
    <div>
        <input type="text" v-model="phone"/>
    </div>
</div>

<script>
new Vue({
    // 绑定根DOM元素节点，在此元素节点下的操作都可以被vue识别
    el : '#app',
    // 储存
    data : {
        msg : 'Hello World',
        msgTime : new Date().toLocaleString(),
        seen : true,
        toDoList : [
            {item : sleep},
            {item : eat}
        ],
        title : '<h2>这是个title</h2>',
        phone : '231231231'
    },
    // 方法
    methods : {
        reverseMsg () {
            this.msg = this.msg.split('').reverse().join('')
        }
    },
    // 用于处理数据，但是不会改变原数据的数据处理方式，一般用来格式化数据（文本数据格式化）
    filters: {

    },
    // 侦听器属性，是一个对象；键是需要观察的表达式，值是对应的回调函数；当被观察的表达式的值发生变化之后，会用对应的回调函数完成相应的监视操作
    watch: {

    },
    // 计算属性，基于依赖进行缓存，只有当缓存发生改变时才会重新求值；不要放入过多的逻辑，不能与data中的属性重名，否则会报错
    computed: {

    },
    // 挂载局部组件，只能当前使用
    components: {
        // 一个字符串模板作为 Vue 实例的标识使用
        template: ``,
        // 创建props及其传递过来的属性
        props: []
    }
    // 生命周期的钩子函数 - 一个组件从开始到毁灭的过程
    beforeCreate () {}, // 初始化实例后，数据观测前
    created () // 在这儿可以调用methods中的方法、改变data数据；常用来发送请求，获取数据
        axios.get/post/all() // axios获取ajax的数据
    },
    beforeMount () {}, // 挂载开始之前
    mounted () {}, // 已挂载，可以获取、操作el的DOM元素
    beforeUpdate () {}, // 数据更新时，获取的数据是更新之后的，但页面中的DOM元素是更新之前的
    updated () {}, // DOM已更新，可以执行依赖DOM的操作
    beforeDestroy () {}, // 实例销毁之前，此时所有方法都可调用，常用来执行清理任务
    destroyed () {}, // 实例销毁之后，所有事件、子实例都会销毁
});
vm.$set(vm.toDoList, item, play) // 向data中新增属性需要使用$set方法
</script>
```

## Vuex

Vuex是一个专为Vue应用程序开发的状态管理模式。每一个Vuex应用的核心就是store,就是一个容器，它包含着你的应用中大部分的状态state。

**主要包括以下几个模块：**

- **State**：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- **Getter**：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- **Mutation**：是唯一更改 store 中状态的方法，且必须是同步函数，`相当于rudex的reducer`
- **Action**：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作，`相当于rudex的action`
- **Module**：允许将单一的 Store 拆分为多个store且同时保存在单一的状态树中。

## 项目结构

    ├── main.js
    ├── api
    │   └── ... // API请求
    ├── components 
    │   ├── App.vue
    │   └── ...
    └── store
        ├── index.js          # 我们组装模块并导出 store 的地方
        ├── actions.js        # 根级别的 action
        ├── mutations.js      # 根级别的 mutation
        └── modules
            └── test.js       # 测试demo

## vuex配置

```javascript
// modules/test.js
const test = {
    namespaced: true,
    state: {
       // state就是数据，如果数据定义在state中组件中如果要使用这个数据：默认是this.$store.state.属性名 的方式获取
        count: 15
    },
    mutations: {
      // state 中的数据不能被直接修改，如果要修改这些数据，需要使用mutation，注意mutation中不能使用异步更新state
      // 组件中使用this.$store.commit('add')更新
        add(state, payload) {
            console.log(payload);
            state.count++
        },
    },
    actions: {
      // action可以使用异步，但是更新数据仍然需要 commit 对应的mutation
      // 组件中使用this.$store.dispatch('syncAdd')更新
        syncAdd(context) {
            setTimeout(() => {
                context.commit('add', 11)
            }, 1000)
        },
       async asyncAdd(context, val) {
           await console.log(val);
            context.commit('add')
        },
    },
    getters: { // 跟在外面单独声明是一样的
        getCount(state) { // this.$store.getters.getCount
            return state.count
        }
    }
};
export default test
```

namespaced为true的作用是告诉vuex，该模块所有的state 、getters、mutations、actions里面的东西调用时都需要加上命名空间，这个命名空间就是该模块被improt时命名的名字。


```javascript
// getters.js
const getters = {
 // this.$store.getters.count
    count: state => state.test.count,
};
export default getters
```

```javascript
// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

const path = require('path');

Vue.use(Vuex);

// 通过node的 require.context，获取所有的的文件目录,不需要每次显式的调用import导入模块
const files = require.context('./modules', false, /\.js$/);

let modules = {};

files.keys().forEach(key => {
    let name = path.basename(key, '.js'); // 当前文件的名字，没有后缀
    modules[name] = files(key).default || files(key)
});

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules,
    getters, // 这里也可以写在modules里面
    strict: debug,
    plugins: [
        // 这个数组里面是函数
        (...state) => {
            console.log(state);
        }
    ]
});

export default store
```

```javascript{5}
// main.js
import store from "./store"
new Vue({
    router,
    store, // 这里导入就可以this.$store使用了
    render: h => h(App)
}).$mount('#app');
```

## 组件中使用

```vue
<template>
    <h1 @click="changeCount">Vuex</h1>
    <h2>{{num}}</h2>
    <h2>{{count}}</h2>
</template>

<script>
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex'
export default {
  name: 'test',
  data(){
    return {
    //  num: this.$store.state.test.count  //这里获取只会加载一次，不能动态响应
    }
  },
  created() {
      // console.log(`%c store`, `color:#42b983`, this.$store.state.test.count);
      // console.log(`%c store`, `color:#42b983`, this.$store.getters.count);
      console.log(`%c store`, `color:#42b983`, this.$store);
  },
  methods: {
    changeCount() {
      // this.$store.commit('add'); // 在不使用辅助函数，默认是这么用的  对应的是mutations
      // this.$store.dispatch('syncAdd'); // 对应的是actions
      this.add();  // 这里是使用辅助函数之后的用法
      this.syncAdd()
    },
    ...mapMutations(['add']),
    ...mapActions({
        syncAdd: 'syncAdd' // 可重命名
    })
  },
  computed: {
      // vuex 的数据建议在这里面声明，可保持页面的整洁
      // count() {
      //     return this.$store.state.test.count
      // },
      ...mapGetters(['count']), // 跟上面的一致
      ...mapState({  // 直接砸容器内部获取值
          num: state => state.test.count  // 如果外面有num的字段，外面的优先级高
      })
  }
}
</script>
```

如果有 namespaced 命名空间、如果使用辅助函数 `...mapGetters()`

```javascript
...mapGetters({
  zoom : 'map/zoom'
})

...mapGetters('map',['zoom'])
```
## element ui

## form表单自定义验证规则

```javascript{5}
rules = {
    roleName: [
        {required: true, message: '请输入名称', trigger: 'blur'},
        {max: 10, message: '长度超过 10 个字符', trigger: ['blur', 'change']},
        {validator: this.repeatRoleName, trigger: 'blur'}
    ]
};
// 查询当前名称是否已经被占用
async repeatRoleName(rule: any, value: string, callback: (val?: string) => void) {
    if (this.formData.tempRoleName === value) return callback();
    const usable = await checkRoleName(value);
    if (!usable) {
        callback('该角色名称已被占用')
    }
    callback()
}
```

## Table

```javascript{7,11-13}
// 格式化
<el-table-column 
  min-width="180" 
  align="right"
  prop="cpm" 
  label="千次展现消费（元）"
  :formatter="row => formatterNumber(row.cpm)"
/>
// 自定义内容
<el-table-column>
	<template slot-scope="scope">
	  <span>{{scope.row.amount}}</span>
	</template>
</el-table-column>
```

## 参考文档

[vue.js](https://cn.vuejs.org/)<br/>
[vuex](https://vuex.vuejs.org/zh/guide/actions.html)
