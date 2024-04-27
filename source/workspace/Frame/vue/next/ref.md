

# ref

`ref`可以将原始数据类型也转换成响应式数据，需要通过`.value`属性进行获取值

```javascript
import { track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'
import { isObject, hasChanged } from '@vue/shared'
import { reactive, isProxy, toRaw } from './reactive'
import { ComputedRef } from './computed'
import { CollectionTypes } from './collectionHandlers'

/*
* 简单使用
* const count = ref(0)
* {
*  value: 0,
*  __v_isRef: true/false
* }
* */

declare const RefSymbol: unique symbol;

export interface Ref<T = any> {
 /*
 * 接口类型色声明
 * */
  // 用来与唯一的key,来做接口的的一个描述值，让isRef函数做类型判断
  [RefSymbol]: true,
  //value 值是真正存放数据的地方
  value: T
}

export type ToRefs<T = any> = { [K in keyof T]: Ref<T[K]> }

// 查看ref 的参数是不是一个对象，如果是对象的话 走reactive,不是对象的话走当前值
const convert = <T extends unknown>(val: T): T =>{
    return isObject(val) ? reactive(val) : val
};

// 判断是不是一个 ref创建出来的对象
export function isRef(r: any): r is Ref {
  return r ? r.__v_isRef === true : false
}

// 这里是Ref的执行代码
export function ref<T extends object>(
  value: T
): T extends Ref ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>

export function ref(value?: unknown) {
  return createRef(value)
}

// 这里是shallowRef的执行代码，默认不走reactive，所以就跟直接设置一个对象是没什么区别的
export function shallowRef<T>(value: T): T extends Ref ? T : Ref<T>
export function shallowRef<T = any>(): Ref<T | undefined>

export function shallowRef(value?: unknown) {
  return createRef(value, true)
}

// TODO: 正文 ref 的核心代码
function createRef(rawValue: unknown, shallow = false) {
  if (isRef(rawValue)) return rawValue;  // 如果是true的话 说明他不是一个对象，是基本数据类型

  let value = shallow ? rawValue : convert(rawValue);

  const r = {
    __v_isRef: true,
    get value() {
        // 监听函数收集依赖的方法。
      track(r, TrackOpTypes.GET, 'value');
      return value
    },
    set value(newVal) {
      // 先把传进来的数据转换成原生的对象,然后对比是否有变化，再决定要不要向下进行
      if (hasChanged(toRaw(newVal), rawValue)) {
        rawValue = newVal;
        value = shallow ? newVal : convert(newVal);
        //  触发监听函数执行的方法
        trigger(r, TriggerOpTypes.SET, 'value', __DEV__ ? { newValue: newVal } : void 0)
      }
    }
  };

  return r
}

// toRefs()
export function toRefs<T extends object>(object: T): ToRefs<T> {
  // 要求是reactive类型的对象
  if (__DEV__ && !isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`)
  }
  const ret: any = {};

  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): Ref<T[K]> {
  return {
    __v_isRef: true,
    get value(): any {
      return object[key]
    },
    set value(newVal) {
      // 这块有点奇怪，它没有继续递归，或者直接把对象变成响应式的
      // 可能作者前面已经报警告了
      // 这样会导致如果不是响应式对象并且对象嵌套多级的话，不能动态渲染页面
      object[key] = newVal
    }
  } as any
}


/*
* 记笔记
* ref VS reactive
*
* 对于`基本数据类型`，函数传递或者`对象解构`时，会丢失原始数据的引用，换言之，我们没法让基本数据类型，
* 或者解构后的变量(如果它的值也是基本数据类型的话)，成为响应式的数据  Proxy不能监听基本数据类型
*
* const pos = reactive({
*    a: 0,
*    b: 1
* });
* return {...pos}
* 正确的用法 ✅ toRefs(pos)或者直接导出pos（就是用的时候可能麻烦点）
* */
```