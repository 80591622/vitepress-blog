---
abbrlink: 73de2ee
title: Redux源码解析
date: 2019-02-17
categories: 
- FE框架 
- React
- Redux源码解析
---

<strong class='old-blog'>Redux源码解析</strong>

[[toc]]

### Redux三大原则

- **唯一数据源**
   - 整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中
- **保持只读状态**
   - state是只读的，唯一改变state的方法就是触发action，action是一个用于描述以发生时间的普通对象
       - store里面保存的都是普通Object，可直接修改他的值，官方文档说的“只有通过action才能修改状态”更多的是一种规则/约束，目的是使数据的流动过程变得清晰且可预测，而不是说通过其他方式（比如直接修改对象属性）会报错。当然这种方式是 **无法触发props更新的**
- **数据改变只能通过纯函数来执行**
   - 使用纯函数来执行修改，为了描述action如何改变state的，你需要编写reducers
   
![](https://ae01.alicdn.com/kf/H70eea0923b414f78a4a4d805e374147aX.gif)

### Action & store.dispatch( )

`Action`是把数据从应用传到store的有效载荷。它是store数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

- 首先用户请求或者页面默认请求执行一个函数 例：myBoardList

```javascript
function myBoardList(){
  return function(dispatch,getState){//这里是中间件穿进去的
    request.get(`${route.myBoard}${getState().loginReducer.user_id}`).then(({data})=>{
        let my_list = data; //这里一整理数据格式
        //Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置
        const action ={
              type:TYPES.BOARD_MY,
              payload:{
                 my_list
              }
        }
        //store.dispatch()是页面发出Action的唯一方法。
        dispatch(action)
    })
  }
}

//页面使用
this.props.dispatch(myBoardList())
```
### Reducer

`Reducers`指定了应用状态的变化`如何响应`actions并发送到store的，actions只是描述了有事情发生了这一事实，并没有描述应用如何更新state。

```javascript
import * as TYPES from 'actionTypes';

const initialState = {
  my_list:[]
};
let tabBarReducer = (state = initialState, action) => {
  switch (action.type) {
     case TYPES.BOARD_MY :
          return Object.assign({}, state, action.payload)
    default: 
      return state;
  }
};

export default tabBarReducer;

export default reducer = combineReducers({ //合并所有的reducer导出，然后当做createStore的参数
   tabBarReducer,
   ....
});

```
### Store

`store`就是redux里面的一个容器，store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。

```javascript
import reduxThunk from "redux-thunk"
import reduxPromise from "redux-promise"
import {createStore, applyMiddleware} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducer"


const store = composeWithDevTools(createStore(reducer,applyMiddleware(reduxThunk, reduxPromise)))

export default store;
```

### Redux源码 *

```javascript{19,20,21,22,23,24}
let combineReducers=(renducers)=>{
    //传入一个renducers管理组，返回的是一个renducer
    return function(state={},action={}){
        let newState={};
        for(var attr in renducers){
            newState[attr]=renducers[attr](state[attr],action)
        }
        return newState;
    }
}

let createStore = (reducer) => {
    let state;
    //获取状态对象
    //存放所有的监听函数
    let listeners = [];
    let getState = () => state;
    //提供一个方法供外部调用派发action
    let dispath = (action) => {
        //调用管理员reducer得到新的state
        state = reducer(state, action);
        //执行所有的监听函数，相当于发布
        listeners.forEach((l) => l())
    }
    //订阅状态变化事件，当状态改变发生之后执行监听函数
    let subscribe = (listener) => {
        listeners.push(listener);
       //store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
        return function unsubscribe() {
             const index = listeners.indexOf(listener)
             listeners.splice(index, 1)
           }
    }
    dispath();
    return {
        getState,  //获取当前的容器的状态
        subscribe, //当你对数据库发出一个指令，而且数据库根据这个指令已经计算得到新的状态以后需要执行的回调函数
        dispath,   //发出一个Action，告诉数据库你要干嘛。数据库会根据当前的状态以及你的命令类型计算得到新的状态。计算完成以后，我们要执行subscribe添加的所有的回调函数.
        replaceReducer //用一个新的store替换掉我们当前的store用来计算我们的新的state。
    }
}


const store = createStore(reducer);
store.getState(); // 获取数据
store.dispatch({type: 'ADD_TODO'}); // 更新数据
store.subscribe(() =>  document.querySelector('#counter').innerHTML = store.getState()); // 注册订阅函数
```

我们可以在应用初始化的时候，创建一个`window.store = createStore(reducer)`，
然后在需要的地方通过`store.getState()去获取数据`，
通过`store.dispatch去更新数据`，
通过`store.subscribe去订阅数据变化然后进行setState`...如果很多地方都这样做一遍，实在是不堪其重，而且，还是没有避免掉全局变量的不优雅。所以就需要**react-redux**了


### React-Redux

#### Provider
由于全局变量有诸多的缺点，所有就需要用到Provider优化

`Provider`其实就只是一个外层容器，它的作用就是通过配合`connect`来达到跨层级传递数据。使用时只需将Provider定义为整个项目最外层的组件，并设置好store。
那么整个项目都可以直接获取这个store。它的原理其实是通过React中的Context来实现的。它的核心代码如下：

```javascript
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ReactReduxContext} from './Context'   //就是利用上下文来达到跨层级传递数据

class Provider extends Component {
    constructor(props) {
        super(props)
        const {store} = props
        this.state = {
            storeState: store.getState(),
            store
        }
    }
    componentDidMount() {
        this._isMounted = true
        this.subscribe()
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe()  //取消订阅
        this._isMounted = false
    }
    componentDidUpdate(prevProps) {
        if (this.props.store !== prevProps.store) {
            if (this.unsubscribe) this.unsubscribe()
            this.subscribe()
        }
    }
    subscribe() {
        const {store} = this.props;
        //store.subscribe返回的是取消订阅的方法
        //Store 允许使用store.subscribe方法设置监听函数，每次dispatch后，执行完reducer改变新的store后，都会重新发布这个含函数
        this.unsubscribe = store.subscribe(() => {
            const newStoreState = store.getState()
            if (!this._isMounted) {
                return
            }
            this.setState(providerState => {
                // 如果值相同，则跳过不必要的状态更新
                if (providerState.storeState === newStoreState) {
                    return null
                }
                return {storeState: newStoreState}
            })
        })
        // 可能在呈现和装载之间调度了操作-处理那些
        const postMountStoreState = store.getState()
        if (postMountStoreState !== this.state.storeState) {
            this.setState({storeState: postMountStoreState})
        }
    }
    render() {
        const Context = this.props.context || ReactReduxContext
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
Provider.propTypes = {
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired
    }),
    context: PropTypes.object,
    children: PropTypes.any
}
export default Provider

```
#### Connect

`connect`的作用是连接React组件与Store，它包在我们的容器组件的外一层，它接收上面Provider提供的store里面的`state`和`dispatch`，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件。

它共有四个参数 **mapStateToProps, mapDispatchToProps, mergeProps以及options**。

`mapStateToProps` 的作用是将store里的state（数据源）绑定到指定组件的props中

`mapDispatchToProps` 的作用是将store里的action（操作数据的方法）绑定到指定组件的props中

其实就是利用上下文获取所有的store,然后执行store.getState()保证能获取最新的数据，然后在利用mapStateToProps，mapDispatchToProps 把需要用到的解构出来

```javascript
let mapStateToProps = ({loginReducer,loading}) => ({
    userInfo: {...loginReducer, ...loading}
})
let mapDispatchToProps =  (dispatch) => {
   const actions = bindActionCreators({...globalActions}, dispatch);
   return {...actions};
 }
export default connect(mapStateToProps,mapDispatchToProps)(Index)


//通过props获取用户信息
this.props.userInfo
```

connect部分源码

新版的太复杂，看下老版本的，便于理解

```javascript
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor () {
      super()
      this.state = {}
    }
    componentDidMount () {
      const { store } = this.context
      //使用subscribe，会实时检测store的变化
      this.unsubscribe = store.subscribe(() => this.setProps())
    }
    componentWillUnMount () {
        this.unsubscribe()
    }

    setProps () {
      const { store } = this.context
      let stateProps = mapStateToProps
        ? mapStateToProps(store.storeState(), this.props)
        : {}; // 不传为空
        
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch,this.props)
        : mapDispatchToProps(dispatch => ({ dispatch })); // 默认传进去dispatch
        
        //mapDispatchToProps里面还可能会有bindActionCreators这个方法；bindActionCreators的作用是将一个或多个action和dispatch组合起来生成
        //通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法，直接调用dispatch(action)(隐式调用），相当于直接组合成
        //dispatch({type:type.ADD_ITEM, text}) 
        //export function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
        //    return wrapMapToPropsConstant(dispatch =>
        //        bindActionCreators(mapDispatchToProps, dispatch)
        // }
      this.setState({
          ...stateProps,
          ...dispatchProps,
          ...this.props
      })
    }
    render () {
      return <WrappedComponent {...this.state} />
    }
  }
  return Connect
}
```

### 异步处理

#### redux-thunk

**源码**

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {  //判别action的类型，如果action是函数，就调用这个函数
        //发现实参为dispatch和getState，因此我们在定义action为thunk函数是，一般形参为dispatch和getState。
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```
 上面的dispatch其实是中间件执行之后通过其他方法把store自带的dispatch覆盖，
 所以我们平时使用的store.dispatch(action)其实就是中间件执行之后的dispatch,
 而这里的next其实是store自带的dispatch，**虽然最终还是通过store自带的dispatch实现的，**
 但是调用的确是中间件的方法，虽然都叫做dispatch。

**使用方式**

可以传入对象或者函数

```javascript
function myBoardList(){
  return function(dispatch,getState){
     const action ={
            type:TYPES.BOARD_MY,
            payload:{
               my_list
            }
     }
     dispatch(action)
  }
}
```

**缺点**

thunk的缺点也是很明显的，thunk`仅仅做了执行`这个函数，`并不在乎函数主体内是什么`<br/>
thunk使得redux可以接受函数作为action,这就会使得异步操作`太为分散`【往往需要promise或者async/wait的支持才可以】

action的形式不统一

#### redux-saga

**流程:**

异步操作——>Effect函数——>纯文本对象——>saga-middleware——>执行异步操作


**配置sage**

**effect.js**
```javascript
import  * as Api from "../services";
import { call, put, takeEvery } from 'redux-saga/effects'

/**
 * 副作用处理 effects：
 *  用于异步处理请求
 * */
export const effects = {
  // 获取话题列表
  *fetchTopics({ payload }) {
    const res = yield call(Api.topics, payload);
    if (res.success) {
      yield put({
        type: 'topics',
        payload: {
          topics: res.data,
        }
      });
    }
  },
  //......
}

/**
 *  异步 action 监听： 所有的effect整合到了一块
 *  dispatch 对应的action时，调用对应的异步处理方法
 * */
export function* watcher() {
  yield takeEvery('fetchTopics', effects.fetchTopics);
  yield takeEvery('aaa', effects.aaa);
  yield takeEvery('bbb', effects.bbb);
  //.....
}
```
**reducers.js**
```javascript
// 多个reducer 需要用到combineReducers合并
// 初始化State
const initState = {
  topics: [],
  topic: {},
  collected: [],
}
/**
 * 纯函数 reducer：
 * 传入旧 state 和 action，从而返回一个信息state
 * */
export const reducers = (state = initState, { type, payload }) => {
  switch(type) {
    case 'topics': {
      return {
        ...state,
        topics: payload.topics,
      }
    }
    //.....
    default: {
      return state;
    }
  }
}
```
这里的写法和redux-thunk中reducers写法一样

**index.js**

```javascript
//统一导出reducers和effects
import { reducers } from './reducers'; 
import { watcher } from "./effects";

export default {
  reducers,
  watcher,
}
```
**main.js**

```javascript{8,9,10,11,12,13}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducers,watcher} from './redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,  //这里是所有的reducer
  applyMiddleware(sagaMiddleware), //执行saga的中间件
);
sagaMiddleware.run(watcher); 

ReactDOM.render(
  <Provider store={store}>
  </Provider>,
  document.getElementById('app')
);
```
这里的sagaMiddleware.run() 方法，主要是启动saga，**用于监听actions请求**，待匹配到定义的effects type时，转发调用effects方法，从而处理异步请求，然后再调用redux中的dispatch来触发新的action，来更新store！

**页面使用**
```javascript
@connect(({ topics, loading }) => ({  //type的值
  topics,
  loading,
}))

componentDidMount() {
  this.props.dispatch({
    type: 'fetchTopics', //effect的函数
  });
}
```

**处理步骤：**

1. 用户dispatch执行一个异步函数

1. 调用redux-saga/effects中的方法 call，访问接口获取数据；

2. 接口访问成功，使用redux-saga/effects中的方法put，发起action，这里的put方法和dispatch一样，都是用于发起action；

3. put发起action后，redux的reducers会收到action，从而更新state。


集中处理了所有的异步操作，异步接口部分一目了然

异步操作的流程是可以控制的，可以随时取消相应的异步操作。


### redux middleware 源码分析

```javascript
// 以 redux-thunk、logger 中间件为例介绍中间件的使用
const enhancer = applyMiddleware(thunk, logger),  
const store = createStore(rootReducer, enhancer)
```
**applyMiddleware 调用入口**

```javascript{4,8}
export default function createStore(reducer, preloadedState, enhancer) {
  // 通过下面代码可以发现，如果 createStore 传入 2 个参数，第二个参数相当于就是 enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState)
  }
  ...
}
```

由上述 createStore 源码发现，applyMiddleware 会进行 `applyMiddleware(thunk, logger)(createStore)(reducer, preloadedState)` 的调用。

**applyMiddleware 源码如下**

```javascript{4}
export default function applyMiddleware(...middlewares) {
    // 柯理化  ()=>()=>{}
  return createStore => (...args) => {
    const store = createStore(...args)  //store  =  {getState,dispatch.....}
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,                // 调用 redux 原生方法，获取状态
      dispatch: (...args) => dispatch(...args) // 调用 redux 原生 dispatch 方法
    }
    // 串行 middleware
    chain = middlewares.map(middleware => middleware(middlewareAPI)) // thunk的参数参数正是 ({ dispatch, getState })
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch // 返回加工过的 dispatch
    }
  }  //然后 <Provider store={store} />
}
```
**dispatch 是如何被加工的**

compose 的源码

```javascript
export default function compose(...funcs) {
  // ...
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
```javascript
export default ({ dispatch, getState }) => next => action => {
   // 经 compose 源码分析，此处 next 为 Store.dispatch
   // action  为 this.props.dispatch(`action`)
  if (typeof action === 'function') {
    return action(dispatch)
  }
  return next(action)
}
```

其 middleware 的内部串行调用方式如下，从而完成了 dispatch 功能的增强(支持如 this.props.dispatch(action) 的调用以及日志功能)

```javascript
action => {
  if (typeof action === 'function') {
    return action(dispatch)
  }
  return (action => {
    return store.dispatch(action)
  })(action)
}
```

applyMiddleware的核心就是 执行的createStore,在dispatch里面添加一些方法,最后返回加工过的 dispatch,这个dispatch 有中间价的一些处理
