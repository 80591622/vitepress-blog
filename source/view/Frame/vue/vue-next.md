
# Vue3.0源码分析


第一次用vue也是两年前了，今天看了预览版的3.0变化挺大，方法都是基于函数式的，
这对于一直用react的我来说挺新奇的，也是因为下家用vue开发的项目比较多，特此班门弄斧，研究一波。

在19年10月5日发布了`Vue3.0`预览版源码，但是预计最早需要等到 2020 年第一季度才有可能发布 3.0 正式版。

可以直接看 [github](https://github.com/vuejs/vue-next/tree/master/packages)源码。

`Vue 3.0` 的想法是引入灵感来自于 `React Hook` 的` Function-based API`，作为主要的组件声明方式。

意思就是所有组件的初始状态、`computed、watch、methods` 都要在一个叫做 `setup` 的方法中定义，抛弃（暂时会继续兼容）原有的基于对象的组件声明方式。

`Vue 3.0`同时支持 `Composition API` 和 `Options API`,个人认为如果这个改变实装到 `Vue 3.0`，也许对之前的项目不会带来太大的影响，
但是如果在 `Vue 4.0` 中彻底废弃原有的组件声明方式，`Vue`相当于自杀了。

**在很多帖子和论坛上开发者声称：**
- 所有 Vue 代码都必须以全新的方式重写，因为现有的语法正在被移除，并且被其他东西取代；
- 人们花在学习 Vue 上的所有时间都被浪费了，因为一切都会改变；
- 新语法比旧的更糟糕，因为它没有强制的结构，并且会导致意大利面条式代码；
- Vue核心团队在没有任何咨询的情况下突然施行一个巨大的破坏性的变化；
- Vue 要变成 React 了！
- 所有 HTML 都要写在一个超长的字符串里！

## 剖析Composition API

[文档](https://vue-composition-api-rfc.netlify.com/#basic-example)

- Vue 3 使用ts实现了类型推断，新版api全部采用普通函数，在编写代码时可以享受完整的类型推断（避免使用装饰器）
- 解决了多组件间逻辑重用问题 （`解决`：高阶组件、mixin、作用域插槽）
- `Composition API` 使用简单

`composition API` 就是让多个方法进行组合使用
```vue
<script src="vue.global.js"></script>
<div id="container"></div>
<script>
     // 使用场景跟react的hooks一样，逻辑抽离，方便复用
    function usePosition(){ // 实时获取鼠标位置
        let state = Vue.reactive({x:0,y:0});
        function update(e) {
            state.x= e.pageX
            state.y = e.pageY
        }
        Vue.onMounted(() => {
            window.addEventListener('mousemove', update)
        })
        Vue.onUnmounted(() => {
            window.removeEventListener('mousemove', update)
        })
        return Vue.toRefs(state);  
    }
    const App = {
        setup(){ // Composition API 使用的入口,只会执行一次，减少gc
            const state  = Vue.reactive({name:'youxuan'}); // 定义响应数据
            const {x,y} = usePosition(); // 使用公共逻辑
            Vue.onMounted(()=>{
                console.log('当组挂载完成')
            });
            Vue.onUpdated(()=>{
                console.log('数据发生更新')
            });
            Vue.onUnmounted(()=>{
                console.log('组件将要卸载')
            })
            function changeName(){
                state.name = 'webyouxuan';
            }
            return { // 返回上下文,可以在模板中使用
                state,
                changeName,
                x,
                y
            }
        },
        template:`<button @click="changeName">{{state.name}} 鼠标x: {{x}} 鼠标: {{y}}</button>`
    }
    Vue.createApp().mount(App,container);
</script>
```

## 源码目录剖析

```bash
packages目录中包含着Vue3.0所有功能
  
    ├── packages
    │   ├── compiler-core # 所有平台的编译器
    │   ├── compiler-dom # 针对浏览器而写的编译器
    │   ├── reactivity # 数据响应式系统，核心方法reactive、effect、 ref、computed
    │   ├── runtime-core # 虚拟 DOM 渲染器 ，Vue 组件和 Vue 的各种API
    │   ├── runtime-dom # 针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。
    │   ├── runtime-test # 专门为测试写的runtime
    │   ├── server-renderer # 用于SSR
    │   ├── shared # 帮助方法
    │   ├── template-explorer
    │   └── vue # 构建vue runtime + compiler
```

## Proxy 与 Object.defineProperty 优劣对比

**Object.defineProperty()**

1. 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。
1. 无法监听数组的变化
1.  需要深度遍历，浪费内存

[解决vue中使用defineProperty的不足](/workspace/Frame/vue/vue.html#defineproperty-的不足)

**Proxy()**

1. Proxy 可以直接监听对象而非属性；
1. Proxy 可以直接监听数组的变化；
1. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
1. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
1. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
1. 兼容性差，IE11也不兼容

## vue2.0响应式原理机制

```javascript
// utils.js 定义的公共方法
// 判断是一个object类型的
function isObject(target){
    return typeof target === 'object' && target!== null;
}
```

```javascript
// 视图代码
function  updateView() {
    console.log('更新视图')
}
```

## 针对对象进行拦截

```javascript
function observer(target) {
    if (!isObject(target)) return target;
    
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

function defineReactive(target, key, value) {
    observer(value); // 有可能对象类型是多层，递归劫持

    Object.defineProperty(target, key, {
        get() {
            // 在get 方法中收集依赖
            return value
        },
        set(newVal) {
            console.log('set方法', newVal);
            if (newVal !== value) {
                updateView(); // 在set方法中触发更新
                observer(newVal); // 防止传进来是一个二级对象，不能对以后的数据监测
                value = newVal; // 赋新值
            }
        }
    })
}

let data = {name: 'wk', obj: {a: 11}, ary: [1, 2, 3, 4, 5]};
observer(data);
data.obj.a = {b: 222};
data.obj.a.b = 121212;
```
例如上面的代码，我们用push方法改变ary的话，会改变原数组，但是并没有触发视图更新，所以这里数组劫持来优化触发视图更新


## 数组的劫持

我们不能直接更改`Array.prototype`，这样会污染其他的代码，代价更大，我们找到所有能改变原数组的方法`push,shift,unshift,pop,splice,reverse,sort`,
对这些方法重新包装，使其触发视图更新，做到数组劫持。

```javascript{1-10,15-24}
let oldProtoMethods = Array.prototype;
let proto = Object.create(oldProtoMethods);

['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'].forEach(method => {
    proto[method] = function () { // 函数劫持，把内部的函数重写，数组方法还是继续调用老的方法
        updateView();
        observer(...arguments);
        oldProtoMethods[method].call(this, ...arguments)
    }
});

function observer(target) {
    if (!isObject(target)) return target;

    if (Array.isArray(target)) {
        // Object.setPrototypeOf(target, proto);
        target.__proto__ = proto;  // 同上

        // 给数组中的每一项进行observer
        for (let i = 0; i < target.length; i++) {
            observer(target[i])
        }
        return
    }

    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

function defineReactive(target, key, value) {
    observer(value); // 有可能对象类型是多层，递归劫持

    Object.defineProperty(target, key, {
        get() {
            // 在get 方法中收集依赖
            return value
        },
        set(newVal) {
            console.log('set方法', newVal);
            if (newVal !== value) {
                updateView(); // 在set方法中触发更新
                observer(newVal); // 防止传进来是一个二级对象，不能对以后的数据监测
                value = newVal; // 赋新值
            }
        }
    })
}


let data = {ary: [1, 2, {age: 22}]};
let result = observer(data);

data.ary.push({age: 33});
data.ary.push([1, 2, 3]);
data.ary[4].push(1);

data.ary[4].splice(1, 1, 22222);
// data.ary[4][1] = 2222;  不会触发

console.log(data.ary);
```

## vue3.0响应式原理机制参考文档

[https://vue-js.com/topic/5e2d023f7a28821363fb6821](https://vue-js.com/topic/5e2d023f7a28821363fb6821)<br/>
[github](https://github.com/vuejs/vue-next/blob/e6ef52c3f8992cf7bb8f648a791edeea0632459e/packages/reactivity/src/baseHandlers.ts)