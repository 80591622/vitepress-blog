---
abbrlink: 68a94f2b
title: React基本用法
date: 2018-01-17
sticky: 99
cover: https://ae01.alicdn.com/kf/Hf6fe65bdc09c47afb4b61d42d22ea80ae.jpg
tags: React.js
categories: 
- FE框架 
- React
- React基本用法
---

<strong class='old-blog'>React基本用法</strong>

[[toc]]

### 路由传递参数

```javascript
<Link to={{
        pathname:"/",
        search:"?lx=1",
        hash:"#AA",
        state: {id: id} 
    }} exact >
     首页
 </Link>
     
```
- 1.问号传参  基于location来完成处理  **let {data, location: {`search`}} = this.props** 
- 2.地址栏传参基于match的params来完成处理 **let {data, match: {`params`}} = this.prop** 
- 3.Link传参 循环进来的，此参数传参在浏览器看不见  **let {data, location: {`state`}} = this.props** 

- 参数解析（问号传参）

```javascript
//两种方式都行
const utils = {
   queryURLParameter(url) {
        let regParam = /([^?&=#]+)=?([^?&=#]+)?/ig,
            obj = {};
        url.replace(regParam, (...arg) => {
            obj[arg[1]] = arg[2];
        });
        return obj;
   },
   queryStringToJson(queryString) {
        if (queryString.indexOf('?') > -1) {
            queryString = queryString.split('?')[1]
        }
        const pairs = queryString.split('&');
        const result = {};
        pairs.forEach(pair => {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '')
        });
        return result
   }
        
};
export default utils;

```

### 发起 AJAX 请求

我们应当将AJAX 请求放到 `componentDidMount` 函数中执行，主要原因有下

- `componentsDidMount`里面请求数据此时dom已经渲染上去，从用户友好角度来讲，我们更愿意让用户先看到一个没有数据的方式，再通过一个spin的动画，来加载数据;`componentsWillMount`里面请求数据，拿到数据之后setState的时机是不确定的，可能是render之前，也可能是render之后，并不是下一个时间段，这依赖于ajax的返回时间，所以不能准时的出现loading图，所以说会出现较长白屏的现象.
- 还有在rn中，用react做服务端的同构，或者更高技术的时候会有一系列的问题【componentWillMount时发生在服务端 componentDidMount在客户端，会冲突】。
- React16 调和算法`Fiber`会通过开始或停止渲染的方式优化应用性能，其会影响到 `componentWillMount 的触发次数`。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount

### PropTypes
`JavaScript 是弱类型语言，所以请尽量声明 propTypes 对 props 进行校验，以减少不必要的问题。`

**`内置的 prop type 有：`**

- PropTypes.array
- PropTypes.bool
- PropTypes.func
- PropTypes.number
- PropTypes.object
- PropTypes.string
- PropTypes.any
- PropTypes.shape

```javascript
import PropTypes from "prop-types"

static defaultProps = {
    a: 0,
    b: 0,
};
static propTypes = {
    a: PropTypes.number,
    b: PropTypes.number,
    store: PropTypes.shape({
           subscribe: PropTypes.func.isRequired,
           dispatch: PropTypes.func.isRequired,
           getState: PropTypes.func.isRequired
    }),
    data: PropTypes.array.isRequired//必须有
};

```
[查看更多](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)

### Hooks为何能使用const 在下面声明的函数

```javascript
//思想
(function () {
   function b() {
      return a;
   }

  const a = 1;
  return b();
})();
```


### 组件传递参数
```javascript
//父
<List onItem={(item) => this.onItem(item)}/>
//子
{list.map((item, index) => {
  return (
    <div className={styles.item} key={index}    
     onClick={() => this.props.onItem(item)}>
   )
}

//父
<List onItem={this.onItem}/>
//子
{list.map((item, index) => {
  return (
    <div className={styles.item} key={index}    
     onClick={() => this.props.onItem(item)}>
   )
}
```
### PureComponent原理

```javascript
shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (!Object.is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || !Object.is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}
```


### 缓存路由

[网址](https://juejin.im/post/5cef73a3e51d4510926a7aeb)
```javascript

import React from 'react';
import PropTypes from 'prop-types';
import {matchPath} from 'react-router';
import {Route} from 'react-router-dom';

class RouteCache extends React.Component {

  static propTypes = {
    include: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array
    ])
  };

  cache = {}; //缓存已加载过的组件

  render() {
    const {children, include = []} = this.props;

    return React.Children.map(children, child => {
      if (React.isValidElement(child)) { // 验证是否为是react element
        const {path} = child.props;
        const match = matchPath(location.pathname, {...child.props, path});

        if (match && (include === true || include.includes(path))) {
          //如果匹配，则将对应path的computedMatch属性加入cache对象里
          //当include为true时，缓存全部组件，当include为数组时缓存对应组件
          this.cache[path] = {computedMatch: match};
        }

        //可以在computedMatch里追加入一个display属性，可以在路由组件的props.match拿到
        const cloneProps = this.cache[path] && Object.assign(this.cache[path].computedMatch, {display: match ? 'block' : 'none'});

        return <div style={{display: match ? 'block' : 'none'}}>{React.cloneElement(child, {computedMatch: cloneProps})}</div>;
      }

      return null;
    });
  }
}

// 使用
<RouteCache include={['/login', '/home']}>
  <Route path="/login" component={Login} />
  <Route path="/home" component={App} />
</RouteCache>

```

### 获取实际的DOM

```javascript
ReactDOM.findDOMNode(this.sildeWrapper).clientWidth;   //废弃  改用ref
```

### 添加DOM

```javascript
<div dangerouslySetInnerHTML={{__html: '<p>123</p>'}} />
```


### React.memo

```javascript{2}
import PowerList from "./components/PowerList"
const MemoPowerList = memo(PowerList, (prevProps, nextProps) => prevProps.data === nextProps.data);

 render() {
     <MemoPowerList/>
 }

```

### React.createElement

```javascript
React.createElement(
  type,
  {props},
  [...children]
)
```

```javascript{8,9,10,11,12}
// jsx 语法
<div id='one' class='two'>
    <div id="spanOne">this is spanOne</div>
    <h1 id="spanTwo">this is spanTwo</h1>
</div>

// 转化为 js
React.createElement(
    "div", {id: "one", className: "two"},
    React.createElement("div", {id: "spanOne"}, "this is spanOne"),
    React.createElement("h1", {id: "spanTwo"}, "this is spanTwo")
)

```

### React.cloneElement

新的子元素将取代现有的子元素， `key`和`ref`将被保留

```javascript
React.cloneElement(
  element,
  {props},
  [...children]
)
```

**适用于** 父组件是`独立`的，子组件是`独立`的， 父组件数据改变，想要通知子组件，或者子组件想要改父组件的数据(也是通过回调)


```javascript{14,15,16,17,18,19,20,21}
import React, {Fragment, Component, useState, useEffect} from 'react';
class MyContainer extends Component {
    state = {count: 1};
    handleClick = () => {
        this.setState(({count}) => {
            return {count: count + 1}
        })
    };

    render() {
        const {count} = this.state;
        return (
            <Fragment>
                {React.Children.map(this.props.children, (item, index) => {
                    return React.cloneElement(item,
                        {
                            parentState: count,
                            handleClick: this.handleClick
                        },
                    )
                })}
            </Fragment>
        )
    }
}
function MySub(props) {
    const {subInfo, parentState, handleClick} = props;
    return (
        <div style={{margin: "15px", border: "1px solid red", padding: 10}}>
            子元素:{subInfo}
            <br/>
            父组件属性count值: {parentState}
            <br/>
            <button onClick={() => handleClick()}>点击+1</button>
        </div>
    )
}
function Index() {
    return (
        <Fragment>
            <MyContainer>
                <MySub subInfo={"第一个"}/>
                <MySub subInfo={"第二个"}/>
            </MyContainer>
        </Fragment>
    )
}
export default Index;
```

### ReactDOM.createPortal

react 中所有的组件都会位于#app下，而使用Portals提供了一种脱离#app的组件。

适用 `模态框，通知，警告，goTop` 等

```javascript{19,20,21,22}
import React, {Fragment, useState, useEffect} from 'react';
import ReactDOM from "react-dom"

const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
        console.log(document.getElementById('root').style.display = 'none');
    }
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
function f() {
    return (
        <Modal>
            妈的 DW
        </Modal>
    )
}
export default f;

```

### Render Props

就是给组件添加一个`值为函数`的属性，这个函数可以在`组件渲染`的时候调用

**适用于** 父组件是独立的，子组件是独立的， 父组件数据改变，想要通知子组件，或者子组件想要改父组件的数据(也是通过回调)

**实现一个图片跟随鼠标的功能**

不知道这个功能之前可能这样实现

```javascript
import React from 'react';
const Cat = ({mouse}) => {
    return (
        <img src="https://ae01.alicdn.com/kf/H62563fe1dc6447aca248634b671b7a59W.png"
             style={{position: 'absolute', left: mouse.x, top: mouse.y}} alt={''}/>
    );
};
class Mouse extends React.Component {
    state = {x: 0, y: 0};
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        }, () => {
            this.props.render(this.state) //在这里传给父组件
        });
    };
    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                <h1>移动鼠标</h1>
                <p>当前的鼠标定位 (X:{this.state.x}, Y:{this.state.y})</p>
                {/*TODO:组件在里面渲染*/}
                {this.props.children}  
                
                {/*TODO:这种方式简单*/}
                {/*{*/}
                {/*    React.Children.map(this.props.children, (item, index) => {*/}
                {/*        return React.cloneElement(item,*/}
                {/*            {*/}
                {/*                mouse: this.state*/}
                {/*            },*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </div>
        );
    }
}
class Index extends React.Component {
    state = { mouse: {} };  //交给他们的父级来出来，然后重新state,把值传进来
    render() {
        const {mouse} = this.state;
        return (
            <Mouse render={(item) => {
                this.setState({mouse: item})
            }}>
                <Cat mouse={mouse}/>
            </Mouse>
        );
    }
}
export default Index;
```

现在可以这么实现
```javascript
import React from 'react';
const Cat = ({mouse}) => {
    return (
        <img src="https://ae01.alicdn.com/kf/H62563fe1dc6447aca248634b671b7a59W.png"
             style={{position: 'absolute', left: mouse.x, top: mouse.y}} alt={''}/>
    );
};
class Mouse extends React.Component {
    state = {x: 0, y: 0};
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    };
    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                <h1>移动鼠标</h1>
                <p>当前的鼠标定位 (X:{this.state.x}, Y:{this.state.y})</p>
                {/*TODO:在render里面执行的这个方法，不仅仅是执行当前这个函数还把函数在这里渲染出来了*/}
                {this.props.render(this.state)}
            </div>
        );
    }
}
const Index = () => {
    const catRender=(item)=><Cat mouse={item}/>;
    return (<Mouse render={catRender}/>);
};
export default Index;
```

### Error Boundaries

`错误边界`是一种React组件，这种组件**可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI**，而不是渲染那些崩溃了的子组件树。
错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

**static getDerivedStateFromError(error)**

当后代组件抛出错误时，首先会调用这个方法，并将抛出的错误作为参数。无论这个方法返回什么值，都将用于更新组件的状态。

在后代组件抛出错误之后，也会调用**componentDidCatch**方法除了抛出的错误之外，还会有另一个参数，这个参数包含了有关错误的更多信息

- getDerivedStateFromError是在reconciliation阶段触发，所以getDerivedStateFromError进行捕获错误后进行组件的状态变更，不允许出现副作用。
- componentDidCatch因为在commit阶段，因此允许执行副作用。 它应该用于记录错误之类的情况

::: warning 注意
错误边界无法捕获以下场景中产生的错误：

- 事件处理（了解更多）
- 异步代码（例如 `setTimeout` 或 `requestAnimationFrame` 回调函数）
- 服务端渲染
- 它自身抛出来的错误（并非它的子组件）



**只有 class 组件才可以成为错误边界组件**

自React16起，`任何未被错误边界捕获的错误`将会导致整个React组件树被卸载。

**错误边界的`粒度`由你来决定，可以将其包装在`最顶层的路由`组件并为用户展示一个 “Something went wrong” 的错误信息，
就像服务端框架经常处理崩溃一样。
你也可以将`单独的部件`包装在错误边界以保护应用其他部分不崩溃。**
:::

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

### Code Splitting

**import()**  

适用于函数

```javascript{9,8}
//add.js
export const sum = (a, b) => a + b;

//index.js
import React from 'react';
function Index() {
    const handleClick = async () => {
        const {sum} = await import('./add');
        console.log(sum(1, 2));
    };
    return (
        <button onClick={handleClick}>点击</button>
    );
}
export default Index;
```
**React.lazy**

适用于组件 目前不支持服务端渲染
```javascript{1,4}
const Foo = React.lazy(() => import('../components/Foo'));
render() {
    return (
            <Suspense fallback={<div>loading...</div>}>
                <Foo/>
            </Suspense>
        )
}
```
`React.lazy 目前只支持默认导出（default exports)` 你可以创建一个中间模块，来重新导出为默认模块

```javascript
//a.jsx
export const A = /* ... */;
export const B = /* ... */;
//middle.js
export { A as default } from "./a";   //A就相当于默认导出
//index.jsx
import React, { lazy } from 'react';
const A = lazy(() => import("./middle"));

<Suspense fallback={<div>loading...</div>}>
    <A/>
</Suspense>
```


### React.StrictMode 

开发模式会调用多次

StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告

```javascript
import React from "react";
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

**StrictMode 目前有助于：**
- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告（React.createRef();）
- 关于使用废弃的 findDOMNode 方法的警告（貌似没有）
- 检测遗留 context API
- 检测意外的副作用

react 在检测意外的副作用时可能重复调用某些生命周期方法、hooks 或者 render 方法，其包括：

class 组件的 constructor，render 以及 shouldComponentUpdate 方法
class 组件的生命周期方法 getDerivedStateFromProps
函数组件
状态更新函数 (即 setState 的第一个参数）
函数组件中 useState，useMemo 或者 useReducer 中的函数
当 React 发现在重复调用这些方法时出现了内存泄漏、无限循环或者其他奇怪的表现时会在控制台输出错误，以供程序员快速定位错误。


简单来说就是我们在使用 hooks 或者在某些生命周期函数中不应该使用有副作用的代码。在开发模式的 StrictMode 下，React 会帮助我们发现这些不好的代码并给予提示。

StrictMode 的这个重复调用的特性只使用于开发模式，在生产模式下不会触发多次调用。


### ref(非受控)

React的ref有4种用法：

- 字符串(已废弃)
- 回调函数
```javascript
//获取子组件的dom节点
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

function Parent(props) {
  return (
    <div>
      My input: <CustomTextInput inputRef={props.inputRef} />
    </div>
  );
}

class Grandparent extends React.Component {
  render() {
    return (
      <Parent
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
- **React.createRef()** （React16.3提供,无状态的组件也可以使用）

- Hooks **useRef()** 用法类似createRef()

```javascript
const Example = () => {
    let inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <input type="text" ref={inputRef}/>
    )
};
```
```javascript
//类组件
class Child extends React.Component{
    constructor(props){
        super(props);
        this.myRef=React.createRef();
    }
    componentDidMount(){
        console.log(this.myRef.current);
    }
    render(){
        return <input ref={this.myRef}/>
    }
}

//无状态组件
function CustomTextInput(props) {
  // textInput must be declared here so the ref can refer to it
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```
- `React.forwardRef()`  同样是React 16.3版本后提供的，可以用来创建子组件，以传递ref。

### React生命周期

![](https://ae01.alicdn.com/kf/Hbb3d522c7afa45d894e583388f1615f4p.jpg)




### 极简 React 入门配置

https://kentcdodds.com/blog/super-simple-start-to-react

```javascript
<html>
<body>
<div id="root"></div>
<script src="https://unpkg.com/react@16.13.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.8.3/babel.js"></script>
<script type="text/babel">
  const {PureComponent} = React;
  // 也可以是函数式 
  class App extends PureComponent {
    render = () => {
      return (
        <div>
          <h1>watermark-webp</h1>
        </div>
      )
    }
  };
  ReactDOM.render(<App />, document.getElementById('root'))
</script>
</body>
</html>
```


### antd 

```css
@import '~antd/es/style/themes/default.less';

@pro-header-hover-bg: rgba(0, 0, 0, 0.025);
```

```javascript
//获取from里面的数据集合
 this.props.form.getFieldsValue()
//重置from输入的内容，（参数不传默认是所有的）
this.props.form.resetFields('search_product_name');
//抛出错误
this.props.form.setFields({
   name: {
      value: val,
        errors: [new Error('forbid ha')],
    },
});
//设置from的值
this.props.form.setFieldsValue({
   points: 1212121,
});
/*
* 提交数据滚动到该位置
* 参数1 只捕捉该字段的数据
* 参数2 定义 validateFieldsAndScroll 的滚动行为
* 参数3 获取数据，错误捕获
*/
form.validateFieldsAndScroll( 
   ['user', 'password'],
    {
      scroll: {
           offsetTop: 60
       }
   },(err, fieldsValue) => {
        if(err)return false;
   }     
)
//自定义输入框额格式 
{getFieldDecorator('user', {
    rules: [
    {required: true, message: '必填'},
    {
        validator: (rule, value, callback) => {
            if ('不符合') {
                callback('不符合')
            }
            callback()
        }
    }
    ],
    initialValue: ''
})(<Input/>)}
```

### 定义环境变量

```javascript
cross-env ANALYZE=true // 设置环境变量
process.env.ANALYZE=true  // 获取环境变量

new webpack.DefinePlugin({
    ENV: JSON.stringify(process.env.ENV), // 可以设置环境变量在页面直接使用
}),
```
react 默认测试环境 NODE_ENV为`development`，正式为`production`

### dva & effects

```javascript
//全局执行model
window.g_app 

//effects基本用法
*add(action,{put,call,select}){
    yield call(delay,1000);//yield 调用一个delay的方法，返回一个promise,会等待在这里。等待到promise变成完成态
    yield fork(delay,1000);//yield 调用一个delay的方法，返回一个promise,直接执行不会堵塞
    
    yield put({type:'counter/minus'});//put派发一个动作,相当于dispatch;注意： put 也是阻塞 effect
    let state = yield select(state=>state.counter);  //获取store的数据相当于 store.getState()
    
    let {push} = routerRedux;//dva封装的router-redux，dva的核心库没有这个方法。
    yield put(push(action.to));
}

//effects里面调取公共的方法  例：
 effects: {
    * a(action, person) {
        console.log(8888)
    },
    * b(action, person) {
        yield put({//就是dispatch
            type: 'a',
        })
    }
}

//dva请求多个接口
//方法一 ：利用Promise.all
const [ary1,ary2] = yield Promise.all([queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id'])])
console.log(ary1);//[{},{}]

//方法二 ：利用axios.all()
axios.all([queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id']), queryWxapps(scenicid()['id']).then(axios.spread((user, aside) => {
  console.log(user);
  console.log(aside);
}));
//方法三 ：sage提供的将会同步执行
const [a,b,c] = yield [
    call(groupbuysList, shopid()['id'], action.params),
    call(groupbuysList, shopid()['id'], action.params),
    call(groupbuysList, shopid()['id'], action.params)
];
//方法四 ：sage提供的yield all
 const [a,b,c]  = yield all([
    call(groupbuysList, shopid()['id'], action.params),
    call(groupbuysList, shopid()['id'], action.params),
    call(groupbuysList, shopid()['id'], action.params),
]);
```
