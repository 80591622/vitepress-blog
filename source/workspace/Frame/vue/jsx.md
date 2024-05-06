# vue中使用JSX


## vue中使用JSX

**Template**

- 学习成本低
- 大量内置指令简化开发
- 组件作用域css
- 但灵活性低

**JSX**

- 灵活
- JSX更易读也是 JavaScript。
- JSX使自定义Vue组件更容易导入和管理,导入直接使用，不用再通过components了

可以例子可以看出jsx的写法，比较干净，可读性高

```javascript
 <div>
   <textarea v-if="multiline" v-model="content" :name="name" :placeholder="placeholder" :aria-invalid="false">
   <input v-else v-model="content" :name="name" :placeholder="placeholder" :aria-invalid="false">
 </div>

 render (createElement) {
     const inputAttributes = {
         class: 'input-field has-outline',
         onClick: this.handleClick,
         placeholder: 'placeholder',
         value:this.value,
         onchange:()=>{}
     }
     const inputMarkup = this.multiline
         ? <textarea {...inputAttributes}></textarea>
         : <input {...inputAttributes}/>


    return inputMarkup
 }
```

## 配置vue以使用JSX

如果使用的Vue-cli大于或等于 3.0 版本，那么就直接可以使用JSX的语法了。

如果您使用的是不支持 `JSX` 的`Vue-cli`较旧版本，则可以通过安装`babel-preset-vue-app`来添加它，并将其添加到您的`.babelrc`文件中。

```javascript
yarn add  babel-preset-vue-app -D
// yarn add babel-plugin-transform-vue-jsx -D
```

在`.babelrc`文件中，添加：

```javascript
{
 "presets": ["vue-app"]
 // "plugins": ["transform-vue-jsx"]
}
```

我们现在可以在组件的render函数中使用JSX。

## 使用JSX需要注意的

## slot

slot 是挂在 `this.$slots` 的这个属性上的，this.$slot['property'] 可以直接拿到slot的vNode,也可以通过数组索引拿到（不推荐）

所以，jsx 中，通过访问this.$slots来代替 slot 的定义:

```javascript
//父组件：parent.jsx
render() {
  return (
    <child>
      <div>
        I am the slot
      </div>

      <div slot='namedSlot'>I am the named slot</div>
    </child>
  )
}
// 子组件：child.jsx
render() {
  return (
    <div class='child'>
      <span>I am a component</span>
      {
        this.$slots.default
      }
      {
        this.$slots.default[1]
      }
      {
        this.$slots.namedSlot
      }
    </div>
  )
}
```

## scoped slots

`scopedSlot` 是挂在 `this.$scopedSlots` 的这个属性上的，`this.$scopedSlots['property']` 可以直接拿到一个函数，这个函数的参数就是 `scopeSlots` 外传的数据，返回值是VNode.

```javascript
// 父组件：parent.jsx
<child
    scopedSlots={{
        default: props => {
            return (
                <div style="line-height: 30px;">
                    {props.info.title}
                </div>
            );
        },
        other: props => {
            return (
                <div style="line-height: 30px;">
                    {props.info.title}
                </div>
            );
        }
    }}
/>
// 子组件：child.jsx
export default {
    data() {
        return {
            info: {
                title: "标题一"
            },
            info2: {
                title: "标题二"
            }
        };
    },
    render() {
        return (
            <div>
                {this.$scopedSlots.default({
                    info: this.info
                })}

                {this.$scopedSlots.other({
                    info: this.info2
                })}
            </div>
        );
    }
};
```

## 事件

要监听 `JSX` 中的事件，我们需要“on”前缀。 例如，将`onClick`用于单击事件。

```javascript
render (createElement) {
 return (
     <button onClick={this.handleClick}></button>
 )
}
```

要阻止默认事件，请使用

```javascript
render (createElement) {
 return (
     <button onClick:prevent={this.handleClick}></button>
 )
}
```

## v-model

v-model 实际上就是一个语法糖。

```javascript
<Component v-model='test'></Component>
```

等价于

```javascript
<component :value='test' @input='test = arguments[0]'></component>
```

使用jsx写法

```javascript
<component
  value={ this.test }
  onInput={ val => { this.test = val } }
>
</component>
```

**配置 v-model**

vue-cli默认搭建的脚手架时配置好这个plugin的，可直接使用`v-model`

[可以通过这个plugin,在vue jsx里写v-model的s语法](https://github.com/nickmessing/babel-plugin-jsx-v-model)

babel7以上 访问[https://github.com/vuejs/jsx](https://github.com/vuejs/jsx)

## sync 修饰符

```javascript
<comp :foo.sync="bar"></comp>
```

等价于

```javascript
<component  visible={dialogFormVisible}
            {...{on: {'update:visible': this.handelVisible}}}/>
```
其实会被拓展为

```javascript
<comp :foo="bar" @update:foo="val => bar = val"></comp>

// 更新的时候
this.$emit('update:foo', newValue)
```

使用jsx写法

```javascript
<component
  foo={ this.bar }
  {
    on: {
      'update:foo': val => this.bar = val
    }
  }
>
</component>
```

[在jsx里面直接用.sync的方法](https://github.com/nickmessing)

## v-html

将HTML字符串设置为元素的内容，使用domPropsInnerHTML而不是使用v-html

```javascript
render (createElement) {
 return (
     <button domPropsInnerHTML={htmlContent}></button>
 )
}
```

## 可以使用拓展运算符

我们也可以展开一个大对象：

```javascript
render (createElement) {
 return (
     <button {...this.largeProps}></button>
 )
}
```

## 用好jsx需要知道的**

```vue
render (h) {
  return (
    <div
      id="foo"
      domPropsInnerHTML="bar"
      onClick={this.clickHandler}
      nativeOnClick={this.nativeClickHandler}
      class={{ foo: true, bar: false }}
      style={{ color: 'red', fontSize: '14px' }}
      key="key"
      ref="ref"
      refInFor
      slot="slot" />
 )
}
```

```javascript
render (h) {
    return h('div', {
      props: { // 组件的参数
        msg: 'hi'
      },
      attrs: { 
        id: 'foo'
      },
      domProps: { 
        innerHTML: 'bar'
      },
      on: { // 一些事件
        click: this.clickHandler
      },
      nativeOn: {
        click: this.nativeClickHandler
      },
      class: {
        foo: true,
        bar: false
      },
      style: {
        color: 'red',
        fontSize: '14px'
      },
      key: 'key',
      ref: 'ref',
      refInFor: true,
      slot: 'slot'
    });
}
```

所以必要情况下要这么用

```js
<div
  {...{
    attrs: {
      id: 'foo',
    },
    domProps: {
      innerHTML: 'bar'
    },
    class: {
      foo: true,
      bar: false
    },
    style: {
      color: 'red',
      fontSize: '14px'
    },
    on: {
      click: this.clickHandler
    },
  }}
/>
```

## JSX代码示例

以下是jsx写法

```vue
// index.vue
<script>
import Props from "./Props";
import Event from "./Event";
import Slot from "./Slot";
import BigProps from "./BigProps";
export default {
  components: {
    Props,
    Event,
    SlotDemo: Slot,
    BigProps
  },
  data: () => {
    return {
      name: "",
      type: "success",
      bigPropsName: "Hello world!"
    };
  },
  methods: {
    handlePropChange(val) {
      this.type = val;
    },
    handleEventChange(val) {
      this.name = val;
    },
    handleBigPropChange(val) {
      this.bigPropsName = val;
    },
    getDefault() {
      return [<p>default slot</p>];
    },
    getTitle() {
      return [<p>title slot1</p>, <p>title slot2</p>];
    },
    getItem(props) {
      return [<p>{`item slot-scope ${JSON.stringify(props)}`}</p>];
    }
  },
  render() {
    const {
      type,
      handlePropChange,
      name,
      handleEventChange,
      bigPropsName,
      getDefault,
      getTitle,
      getItem,
      handleBigPropChange
    } = this;
    const slotDemoProps = {
      scopedSlots: {
        item(props) {
          return `item slot-scope ${JSON.stringify(props)}`;
        }
      },
      props: {}
    };
    const bigProps = {
      props: {
        onChange: handleBigPropChange
      }
    };
    return (
      <div>
        <a-tabs>
          <a-tab-pane key="props" tab="属性">
            <Props
              name="Hello Vue！"
              type={type}
              isVisible={false}
              {...{ props: { onChange: handlePropChange } }}
              title="属性Demo"
              class="test1"
              class={["test1", "test2"]}
              style={{ marginTop: "10px" }}
            />
          </a-tab-pane>
          <a-tab-pane key="event" tab="事件">
            <Event name={name} onChange={handleEventChange} />
          </a-tab-pane>
          <a-tab-pane key="slot" tab="插槽">
            <SlotDemo {...slotDemoProps}>
              <p>default slot</p>
              <p slot="title">title slot1</p>
              <p slot="title">title slot2</p>
            </SlotDemo>
          </a-tab-pane>
          <a-tab-pane key="bigProps" tab="大属性">
            <BigProps
              name={bigPropsName}
              {...bigProps}
              slotDefault={getDefault()}
              slotTitle={getTitle()}
              slotScopeItem={getItem}
            />
          </a-tab-pane>
        </a-tabs>
      </div>
    );
  }
};
</script>
```

```vue
// bigProps
<script>
export default {
  name: "BigProps",
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    name: String,
    onChange: {
      type: Function,
      default: () => {}
    },
    slotDefault: Array,
    slotTitle: Array,
    slotScopeItem: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleChange() {
      this.onChange("Hello vue!");
    }
  },
  render() {
    const { name, handleChange, slotDefault, slotTitle, slotScopeItem } = this;
    return (
      <div>
        {name}
        <br />
        <button onClick={handleChange}>change name</button>
        <br />
        {slotDefault}
        <br />
        {slotTitle}
        <br />
        {slotScopeItem({ value: "vue" })}
      </div>
    );
  }
};
</script>
```

```vue
// Events.vue
<script>
export default {
  name: "EventDemo",
  props: {
    name: String
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    handleDivClick() {
      this.$emit("change", "");
    },
    handleClick(e, stop) {
      console.log("stop", stop);
      if (stop) {
        e.stopPropagation();
      }
    }
  },
  render() {
    const { name, handleChange, handleDivClick, handleClick } = this;
    return (
      <div>
        name: {name || "--"}
        <br />
        <input value={name} onChange={handleChange} />
        <br />
        <br />
        <div onClick={handleDivClick}>
          <button onClick={handleClick}>重置成功</button>&nbsp;&nbsp;&nbsp;
          <button onClick={e => handleClick(e, true)}>重置失败</button>
        </div>
      </div>
    );
  }
};
</script>
```

```vue
// Props.vue
<script>
export default {
  name: "PropsDemo",
  // inheritAttrs: false,
  // props: ['name', 'type', 'list', 'isVisible'],
  props: {
    name: String,
    type: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["success", "warning", "danger"].includes(value);
      }
    },
    list: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => []
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      // 不要这么做、不要这么做、不要这么做
      //this.type = "warning";

      // 可以，还可以更好
      this.onChange(this.type === "success" ? "warning" : "success");
    }
  },
  render() {
    const { name, type, list, isVisible, handleClick } = this;
    return (
      <div>
        name: {name}
        <br />
        type: {type}
        <br />
        list: {list}
        <br />
        isVisible: {isVisible}
        <br />
        <button onClick={handleClick}>change type</button>
      </div>
    );
  }
};
</script>
```

```vue
// Slot
<script>
export default {
  name: "SlotDemo",
  render() {
    const { $scopedSlots } = this;
    return (
      <div>
        {$scopedSlots.default()}
        {$scopedSlots.title()}
        {$scopedSlots.item({ value: "vue" })}
      </div>
    );
  }
};
</script>
```

感觉看起来还是没有react的顺眼


## 基于类react的编码格式 

[基于类的Vue组件](https://cn.vuejs.org/v2/guide/typescript.html#%E5%9F%BA%E4%BA%8E%E7%B1%BB%E7%9A%84-Vue-%E7%BB%84%E4%BB%B6)

如果您在声明组件时更喜欢基于类的 API，则可以使用官方维护的 `vue-class-component` 装饰器

`vue-property-decorator` 是一个非官方库，是 `vue-class-component` 的很好的补充。它可以让`vue`的某些属性和方法，通过修饰器的写法让它也写到`vue`组件实例的类里面。

```tex
@Component (完全继承于vue-class-component)
@Emit
@Inject
@Provice    
@Prop
@Watch
@Model
Mixins (继承vue-class-component中的mixins)
```

## 类写的JSX

```javascript
// import Vue from 'vue'
// import Component from 'vue-class-component'

import {Component, Vue} from 'vue-property-decorator';


// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里,建议直接写在render里面
  template: '<button @click="onClick">Click!</button>'
})
export default class Index extends Vue {
  // 初始数据可以直接声明为实例的属性 data(){return{}}
  private message: string = 'Hello!'

  // computed
  get subMessage(): string {
      return `boy ${this.message}`;
  }
  // 生命周期
  mounted () {
      this.greet()
  }
  // 组件方法也可以直接声明为实例的方法
  public onClick (): void {
     window.alert(this.message)
  }
 // 这里可以代替装饰器里面的template,采用的jsx的编码方式
 //  public render() {
 //    const {onClick,message} = this;
 //    return (<button @click="onClick">Click!</button>)
 //  }
}
```

## 添加声明文件

我们在开发的时候很可能会自定义一些全局的指令或者一些的方法等等，如果不添加声明的话，可能需要每一个都`// @ts-ignore`,甚至有的报错。

```javascript{1,9,21,43}
// main.js
// 添加一个全局的方法
Vue.prototype.$fetch = function (url) {
  return fetch(url).then(e => e.json()).then(val => {
    return val
  })
};

// tsconfig.json
{
   "compilerOptions": {
      // ...
      "typeRoots": [
	   "node_modules/@types",
	   "src/type/global.d.ts"
      ]
      // ...
   }
}

// global.d.ts
import Vue from 'vue'  // 必须添加否则无效

declare module 'vue/types/vue' {
    // 在实例上的属性
    interface Vue {
        $fetch: string
    }
    // 使用 `VueConstructor` 接口
    // 声明全局属性
    interface VueConstructor {
      $myGlobal: string
    }
}

declare module 'vue/types/options' {

  interface ComponentOptions<V extends Vue> {
    myOption?: string  // 额外的组件选项
  }
}

// 使用
vm.$fetch()
Vue.$myGlobal
var vm = new Vue({
  myOption: 'Hello'
})
```

## 使用 Mixins

[template的声明方式](/workspace/Frame/vue/vue.html#mixins)

声明 mixin 的例子：

```javascript
// public/mixins/mixin.js
import Vue from 'vue'
import Component from 'vue-class-component'

// 你可以想声明一个组件一样声明一个 mixin
@Component
export default class MyMixin extends Vue {
  // 这个里面可以抽离一些公共逻辑
  mixinValue = 'Hello'
}
```

```javascript
// import Component, { mixins } from 'vue-class-component'
import {Component, Mixins} from 'vue-property-decorator';
import MyMixin from '@/mixins/mixin'

// 使用 `mixins` 帮助函数，而不是 `Vue`.
// `mixins` 可以获取任何数量的参数

@Component
export class MyComp extends Mixins(MyMixin) {
  created () {
    console.log(this.mixinValue) // -> Hello
  }
}
```

## 自定义修饰器

`vue-class-component` 提供 `createDecorator` 帮助函数用来创建自定义修饰器。

`createDecorator` 的第一个参数是一个回调函数，并且这个函数可以获取一下参数：

`options`: vue 组件选项组成的对象，改变这些选项会影响所提供的组件<br/>
`key`: 修饰器所作为的属性或方法的 key<br/>
`parameterIndex`: 修饰器作用于参数时，这个参数的索引<br/>

```javascript{4}
// decorators.js
import { createDecorator } from 'vue-class-component'

export const NoCache = createDecorator((options, key) => {
  // 组件的选项应该传给回调函数，同时会更新选项对象（options object）
  // 进而作用于组件
  options.computed[key].cache = false
})
```

```javascript{6}
import { NoCache } from './decorators'

@Component
class MyComp extends Vue {
  // 这个计算属性不会被缓存
  @NoCache
  get random () {
    return Math.random()
  }
}
```

## 添加自定义钩子

如果你使用了一些Vue 插件比如 Vue Router，你可能会希望 class 组件解析它们所提供的钩子， `Component.registerHooks` 就允许你注册这些钩子

```javascript
// class-component-hooks.js
import Component from 'vue-class-component'

// 通过这些钩子的名称来注册它们
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])
```

```javascript
// MyComp.js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class MyComp extends Vue {
  // class 组件现在可以处理 beforeRouteEnter 钩子和 
  // beforeRouteLeave 钩子作为 Vue Router 钩子
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next() // 需要调用这个来确认导航
  }

  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next() // 需要调用这个来确认导航
  }
}
```

值得注意的是，你必须在组件定义之前注册钩子

```javascript
// main.js

// 确保在引入任何组件之前注册
import './class-component-hooks'

import Vue from 'vue'
import MyComp from './MyComp'

new Vue({
  el: '#app',
  components: {
    MyComp
  }
})
```

这种乍一看跟react的编码格式很像，但是代码压缩后文件太大，
而且vue的版本迭代速度很快，vue3已经不推崇这种写法了，vue3推崇使用函数式开发，对react的用户很是友好

## vue-property-decorator

`vue-property-decorator` 是一个非官方库，是 `vue-class-component` 的很好的补充。它可以让`vue`的某些属性和方法，通过修饰器的写法让它也写到`vue`组件实例的类里面。

```ts
@Component (完全继承于vue-class-component)
@Emit
@Inject
@Provice
@Prop
@Watch
@Model
Mixins (继承vue-class-component中的mixins)
```

## @Component

@Component 修饰符注明了此类为一个 Vue 组件

```ts
@Component({
  name: 'A',
  components: {
    B
  },
  // 所有的组件选项都可以放在这里,建议直接写在render里面
  template: '<button @click="onClick">Click!</button>'
})
```

## @Props

```typescript
@Prop({default: '默认的title', type: [String, Number]}) public readonly title!: string;
```

这里 `!是必选的`  ` ?可选参数`, !告诉TypeScript我这里一定有值,实践感觉并没有ts的类型检验，仅仅编辑器有提示，代码正常运行

下面这种写法，能少用@Prop,我的代码运行的时候，在父组件中必须是`x-xx`,类型的，在子组件`xXx`，即可使用，不然没办法打包。

```typescript
// 父组件
<Child
     z-context={{
        title: message,
        changeTitle: (val: string) => this.state.message = val  // 这里只能是this.state.message，不能直接 message = val，默认是只读属性
    }}
/>
// 子组件
interface IProps {
    changeTitle: (val: string) => {},
    title: string
}

@Prop({default: {}, type: Object}) zContext: IProps; // 这样ts有类型检验,但是父级的类型检测不出来

const {title,changeTitle} = this.zContext;
changeTitle('只能是字符串')
```

## @Watch

```typescript
@Watch('message', {immediate: true, deep: false})
// 上面的装饰器，就是检测下面这个函数
public onMsgChane(val: string, oldVal: string) {
    console.log('onMsgChane', val, oldVal);
}
```

## Mixins

在使用`Vue`进行开发时我们经常要用到混合,结合`TypeScript`之后我们有两种`mixins`的方法

**一种是vue-class-component提供的**

```typescript
//定义要混合的类 mixins.ts
import Vue from 'vue';
import  Component  from 'vue-class-component';

@Component  // 一定要用Component修饰
export default class myMixins extends Vue {
    value: string = "Hello"
}
```

```typescript
// 引入
import  Component  {mixins}  from 'vue-class-component';
import myMixins from 'mixins.ts';

@Component
export class myComponent extends mixins(myMixins) {
                          // 直接extends myMinxins 也可以正常运行
      created(){
          console.log(this.value) // => Hello
    }
}
```

**第二种方式是在@Component中混入**

```typescript
// mixins.ts
import { Vue, Component } from 'vue-property-decorator';
// 这里是ts的类型声明，建议直接写在 type/global.d.ts
declare module 'vue/types/vue' {
    interface Vue {
        value: string;
    }
}

@Component
export default class myMixins extends Vue {
    value: string = 'Hello'
}
```

```typescript
import { Vue, Component, Prop } from 'vue-property-decorator';
import myMixins from 'mixins.ts';

@Component({
    mixins: [myMixins]
})
export default class myComponent extends Vue{
    created(){
        console.log(this.value) // => Hello
    }
}
```

## 使用JSX遇到的坑

- 在使用ui框架的时候，@都用 on- 代替
- el-popconfirm 在 table 里面不能直接使用
```html
// 在table里面不能直接使用
<template>
<el-popconfirm
  title="这是一段内容确定删除吗？"
>
  <el-button slot="reference">删除</el-button>
</el-popconfirm>
</template>
 
// 这种可以
<el-popconfirm
   icon="el-icon-info"
    iconColor="red"
    title="确定要删除吗？"
    @onConfirm="handelCancel"
    @onCancel="handelCancel"
    scopedSlots={{
        reference: props => {
            console.log(props);
            return (
                <el-button solt={'reference'} type="text" size="medium">删除</el-button>
            );
        }
    }}
/>
```

```javascript
// table获取行的数据
//
<el-table-column
  fixed="right"
  label="操作"
  width="100">
  <template slot-scope="scope">
    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
  </template>
</el-table-column>
//
<el-table-column
   prop="edit"
   label="操作"
   fixed="right"
   width="180"
   scopedSlots={{
       default: ({$index, row}) => {
       return (//...)
       }
   }}
/>
```

- 用from

```javascript
<el-form :model="form"></form>

<el-form props={{model: this.formPass}}    // 这里不能直接使用model   rules里面拿不到value,最后不能校验
        label-position={'left'}
        ref={'formData'}
        label-width={'100px'}
        rules={this.rules}>
  <el-input  autocomplete="off"></el-input>
</el-form>
```

- v-model不能使用解构出来的，解构默认是只读属性的
- 箭头函数慎用，当前的this是类的实例，temp中的this是Vue的实例, （可使用bind解决传值）
- tsx写的组件，传递性需要是 x-xxx 如 zy-props={}
   - tsx引入tsx，如果不使用@Component装饰器的话，（PascalCase）传递性需要是 x-xxx 如 zy-props={}，大驼峰，使用@Component正常（kebab-case）
   - tsx引入.vue的，如果不使用@Component装饰器的话，默认开发环境是没事的，打包报错，使用@Component正常 

- 一些事件，在tsx中不能直接用v-model,需要用onChange方法获取值

```javascript
//  v-model="formData.roleId"
<el-select value={this.formData.roleId} onChange={this.setSelect} size="small">
    {roles.map((item: any) => {
        return (
            <el-option
                key={item.roleId}
                label={item.roleId + '-' + item.roleName}
                value={item.roleId}
            />
        )
    })}
</el-select>
```

## 参考文档

[https://juejin.im/post/5d7e662e6fb9a06b1f1460c2](https://juejin.im/post/5d7e662e6fb9a06b1f1460c2)