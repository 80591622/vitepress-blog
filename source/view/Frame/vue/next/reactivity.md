
# vue3.o源码分析

## 前言

调研的预览版本，很多api还没完善，但大致架构已经成形, 暂时还不能用于生产。

**优势**

- 函数式编程，函数对ts兼容性好【react-hooks】
- static tree hoisting 功能 （检测静态语法，进行提升）  【diff】
- 基于 Proxy 实现的数据变更检测  【不需要递归了，节省内存】
- 支持 Fragments  【 react 空标签，当根元素用】
- 支持 Portals  【react 允许在DOM的其它位置进行渲染】
- 同时支持 Composition API 和 Options API  【单文件兼容vue2.o】
- Custom Renderer API  【自定义渲染器API】

## 源码目录

```bash
├── packages
│   ├── compiler-core # 所有平台的编译器(weex也是基于这个)
│   ├── compiler-dom # 针对浏览器的编译器
│   ├── compiler-ssr # ssr
│   ├── compiler-sfc # 针对单文件
│   ├── reactivity # 数据响应式系统
│   ├── runtime-core # 渲染器，一些核心的api
│   ├── runtime-dom # 针对浏览器的runtime,包括处理原生DOM 
│   ├── runtime-test # 专门为测试写的runtime
│   ├── server-renderer # 用于SSR
│   ├── shared # 帮助方法
│   ├── template-explorer
│   └── vue # 构建vue
```

## composition-api

Composition API纯粹是添加的，不会影响/弃用任何现有的2.x API，它是可以单独导入到项目中的

**动机**

- Vue 3 使用ts实现了类型推断，新版api全部采用普通函数，在编写代码时可以享受完整的类型推断（避免使用装饰器）
- 解决了多组件间**逻辑重用**问题 （解决：高阶组件、mixin、作用域插槽）
   - 如果项目过于复杂的时候，mixin中的代码和外部组件的代码存在命名冲突的时候会被覆盖，而且如果有相同的生命周期函数也会被覆盖，所以会导致代码难以维护，容易出现bug
   - 代码分散

> // 安装<br/>
> yarn add @vue/composition-api<br/>
> // 使用<br/>
> import Vue from 'vue';<br/>
> import VueCompositionApi from '@vue/composition-api';<br/>
> Vue.use(VueCompositionApi);<br/>

## reactive

#### Object.defineProperty()

```javascript
let oldProtoMehtods = Array.prototype;
let proto = Object.create(oldProtoMehtods);
// 针对数组
['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'].forEach(method => {
    proto[method] = function () { // 函数劫持，把内部的函数重写，数组方法还是继续调用老的方法
        updateView();
        observer(...arguments);
        oldProtoMehtods[method].call(this, ...arguments)
    }
});

function observer(target) {
    if (!isObject(target)) return target;
    
    if (Array.isArray(target)) {
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
// data.ary[4][1] = 2222;  不会触发更新，值会改变

console.log(data.ary);
```

**缺点**

- 无法监听数组的变化
- 需要递归深度遍历，浪费内存

```javascript
// 无法响应式
vm.items[indexOfItem] = newValue
vm.items.length = newLength

// 解决办法
vm.$set(vm.items, indexOfItem, newValue)
vm.items.splice(indexOfItem, 1, newValue)

vm.items.splice(newLength)
```

#### Proxy

```javascript

```

### effect

### ref

下面是自己提炼的的核心代码，[源码分析看这](/workspace/Frame/vue/next/ref)

```javascript
// ref
const convert = (val) => {
 return isObject(val) ? reactive(val) : val
};
function ref(rawValue) {
  let value = convert(rawValue);

  const result = {
    __v_isRef: true,
    get value() {
      return value
    },
    set value(newVal) {
      console.log('视图更新');
      value = convert(newVal);
    }
  };
  return result
}
// ---------------
// toRefs
function toRefs(object) {
  const ret = {};
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}

function toRef(object, key) {
  return {
    __v_isRef: true,
    get value() {
      return object[key]
    },
    set value(newVal) {
      object[key] = newVal
    }
  }
}
```

### computed


## Beta升级使用

`写demo可以，公司正式项目不建议，后期少不了小改动`

## 安装3.o新版本

> yarn add vue@next  vue-router@next vuex@next<br>
> yarn add @vue/compiler-sfc@next eslint-plugin-vue@next vue-cli-plugin-vue-next -D


## 逻辑复用
```javascript
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
// 在组件中使用：
import { useMousePosition } from './mouse'
export default {
  setup() {
    return { ...useMousePosition() }
  }
}
```


## 参考文档

[vue-next](https://github.com/vuejs/vue-next)<br>
[vue-cli-plugin-vue-nex](https://github.com/vuejs/vue-cli-plugin-vue-next)<br>
[vue-composition-api文档](https://vue-composition-api-rfc.netlify.app/#summary)<br>
[vue3的编译工具](https://vue-next-template-explorer.netlify.app/)<br>
[尤雨溪在Vue3.0Beta直播里聊到了这些](https://juejin.im/post/5e9f6b3251882573a855cd52)<br>
[juejin](https://juejin.im/post/5eaead656fb9a0438d4060be)<br>
[segmentfault](https://segmentfault.com/a/1190000020709962?utm_source=tag-newest)