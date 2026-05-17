---
date: 2026-05-10 22:52:36
title: react-hooks
categories:
  - Frame
  - react
tags:
  - react
---


# Hooks
 
## Hook的规则
 
- 只在最顶层使用 Hook
    - 不要在`循环`，`条件`或`嵌套函数`中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的 <strong>`顺序`</strong> 被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。
- 只在 React 函数中调用 Hook     
    - 在 React 的函数组件中调用 Hook
    - 在自定义 Hook 中调用其他 Hook
       - **在类中使用报错警告** 「Hooks can only be called inside the body of a function component」
    

## 使用Hooks的好处

**1.class 学习成本高**<br/>
生命周期，this指向啥的，hooks只要会usestate   useeffect差不多能解决所有问题<br/>
**2.class业务逻辑分散**<br/>
定时器，dom2事件啥的一定要在componentWillUnMount 去卸载。而是用hooks就非常聚合了，直接返回函数里面清楚就可以了<br/>
**3.class逻辑复用困难**<br/>
hooks最有优势的就数她的逻辑复用能力了<br/>
在class中一般用Render Props（局限性）和高阶组件（嵌套太深）做逻辑复用<br/>
比如一个列表渲染，class每次都要写数据请求，下拉加载，上拉刷新重置分页，loading展示，而在hooks里直接自定义一个hooks就可以做到全部的列表加载逻辑公用<br/>
**4.** class 打包时无法对 class 的属性方法进行优化，而使用 hooks 则可以将代码压缩到极致。<br/>
**5.** 最直接的就是业务变更的时候不需要再把函数式组件变成class了


**缺点**<br/>
形成太多闭包，容易导致内存泄漏<br/>
function写太多代码后期不好维护

**自定义过的**<br/>
useFetch<br/>
useMouse<br/>
useScroll<br/>
useSize<br/>
useFrom<br/>
useTable<br/>
useStore<br/>


真正说服我使用 react hooks 的，是 react blog 里面提到的，使用 class component 打包时无法对 class 的属性方法进行优化，而**使用 hooks 则可以将代码压缩到极致**。<br/>
有人会说 hooks 是趋势是未来啥的，但是，实际上，hooks 比 class 复杂和难理解多了，而且随着业务逻辑的增长，一个 function 里面将会写出越来越多的代码，
越来越复杂，让你无法维护。而实际上，在运行时，两则的差别不是特别大，都没有性能上的优劣。<br/>



    
## Hooks的方法
 
| 钩子名 | 作用 |
| --- | --- |
| `useState` | 初始化和设置状态 |
| `useEffect` | `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的结合体，可监听 `useState` 定义值的变化 |
| `useContext` | 定义一个全局的对象，类似 `context` |
| `useReducer` | 可以增强函数，提供类似 Redux 的功能 |
| `useCallback` | 具有记忆作用，共有两个参数。第一个参数为一个匿名函数，即想要创建的函数体；第二个参数为一个数组，里面的每一项是用来判断是否需要重新创建函数体的变量。如果传入的变量值保持不变，返回记忆结果；如果任何一项改变，则返回新的结果 |
| `useMemo` | 作用和传入参数与 `useCallback` 一致，不过 `useCallback` 返回函数，`useMemo` 返回值 |
| `useRef` | 获取 `ref` 属性对应的 DOM |
| `useImperativeMethods` | 自定义使用 `ref` 时公开给父组件的实例值 |
| `useLayoutEffect` | 作用与 `useEffect` 相同，但在所有 DOM 改变后同步触发 |
| `useDebugValue` | 可用于在 React 开发者工具中显示自定义 hook 的标签 |
 
 
## useState


```javascript{2}
//直接传入初始值
const [state, setState] = useState(initialState);

//传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
const [state, setState] = useState(() => {
  const initialState = ff(props); 
  return initialState;
});
```

官方建议推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化。

**好处是**

- 后期把一些相关的逻辑抽取到一个自定义 Hook 变得容易<br/>
- 赋值的时候简单，多个需要克隆下，把不变的存储下来

```javascript
setState(state+1);  //直接从初始值里面获取
setState(prevState=>prevState+1) //该函数将接收先前的state,并返回一个更新后的值
```

## useEffect
| 依赖项 | 副作用执行时机 |
| --- | --- |
| 没有依赖项 | 组件初始渲染 + 组件更新时执行 |
| 空数组依赖项 | 只在初始渲染时执行一次 |
| 添加特定依赖项 | 组件初始渲染 + 特定依赖项变化时执行 |
 
`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。

默认情况下，effect 将在每轮`渲染结束后执行`，但你可以选择让它 在只有`某些值改变`的时候 才执行。


```javascript{8}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1); 
    }, 1000);
    return () => clearInterval(timer);
  }, []); 
  return <h1>{count}</h1>;
}
```
为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，`上一个 effect 就已被清除`。看下个栗子：

```javascript{5,6,7,8,9,10,15,16,17,18}
import React, {Fragment, useState, useEffect, useRef} from "react";

const Example = () => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        console.log("11");
        return () => {
            console.log("22")
        }
    });
    return (
        <Fragment>
            {console.log("渲染")}
            <h1>{count}</h1>
            <button onClick={() => {
                setCount(count + 1)
            }}> +
            </button>
        </Fragment>
    );
};
export default Example
```

![](https://ae01.alicdn.com/kf/H66bfd87154314ad49baee2dd855336acT.gif)

打印的顺序为 **渲染->22->11**

若多次执行effect，其内部会生成新的函数，（effect还是原函数，或者说指向原地址）这样的话如果我是定义的事件，每次更新都会执行，那么岂不是在事件还没有移除掉又定义了一次，所以useEffect加入了这个功能。

```javascript{6,7,8,9,10,11,12,13,14,15}
import React, {useState, useEffect} from "react";

const Example = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [count, setCount] = useState(1);
    const resizeHandle = () => {
        setWidth(window.innerWidth);
        console.log(window.innerWidth);
    };
    const a = useEffect(() => {
        window.addEventListener("resize", resizeHandle);
        return () => {
            // window.removeEventListener("resize", resizeHandle)
        }
    });  //或者使用[]

    return (
        <Fragment>
            <h1>{width}</h1>
            <button onClick={() => {
                setCount(count + 1)
            }}>+
            </button>
        </Fragment>
    );
}
export default Example
```

看下面图片可以看出来，重复多次执行了`resize`方法

![](https://ae01.alicdn.com/kf/H9d109cbe0722447baf4ef132fa24268fE.gif)


[官方建议effect使用的方法声明在其内部](http://file.wkdevhub.cn/workspace/Frame/react/use-hooks.html#useeffect%E5%9C%A8%E5%A4%96%E9%9D%A2%E5%A3%B0%E6%98%8E%E5%87%BD%E6%95%B0')

## useContext
 
React16中更新了Context API，Context主要用于爷孙组件的传值问题，新的Context API使用订阅发布者模式方式实现在爷孙组件中传值
 
React Hooks出现之后也对Context API出了响应的Hook useContext。同样也是解传值的问题

```javascript{11}
const stateContext = createContext('default');

//父组件
<stateContext.Provider
    value={"Hello React"}
>
    <ContextComponent/>
</stateContext.Provider>
//子组件 
const ContextComponent = () => {
    const value = useContext(stateContext);
    return (
        <>
            <h1>{value}</h1>
        </>
    );
}
```

可以看出，使用`useContext仍然需要在上层组件中使用<MyContext.Provider>`来为下层组件提供context。

## useReducer

<img src='/img/redux.jpeg'/>

为了职责清晰，数据流向明确，Redux 把整个数据修改的流程分成了三个核心概念：
1. state：一个对象，存放着我们管理的数据状态。
2. action：一个对象，用来描述你想怎么改数据。
3. reducer：一个函数，根据 action 的描述生成一个新的 state 。


看到`useReducer`,肯定会想到Redux，没错它和Redux的工作方式是一样的。useReducer的出现是useState的替代方案，能够让我们更好的管理状态。

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

在某些场景下，useReducer 会比 useState 更适用，例如 state `逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state `等。
并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，`因为你可以向子组件传递 dispatch 而不是回调函数` 。

```javascript{3,4,5,6,7,8,9,10,11,12,19,20}
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

**第三个参数(惰性初始化)**

useReducer的第三个参数接受一个函数作为参数，并把第二个参数当作函数的参数执行。主要作用是初始值的惰性求值，把一些对状态的逻辑抽离出来，有利于重置state。

```javascript{2,3,4,5,6,13,14,26}
import React, {Fragment, useState, useEffect, useRef, useCallback, useMemo, useReducer} from "react";
const initialState = {count: 0};
function init(s) {
    console.log(s);
    return {...s};
}
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}
function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState, init);
    return (
        <Fragment>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'reset', payload: initialState})}>重置</button>
        </Fragment>
    );
}
export default Counter

```

## useCallback
用于缓存函数，避免在每次组件渲染时都重新创建函数，从而优化性能  
- 第一个参数是需要 memoize 的回调函数。  
- 第二个参数是一个数组，包含了所有该回调函数依赖的值。只有当数组中的值发生变化时，useCallback 才会返回一个新的函数  

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);



```

```jsx
import React, { useState, useCallback } from 'react';

// 使用 React.memo 包裹子组件
const ChildComponent = React.memo(({ onClick }) => {
    return <button onClick={onClick}>Click me</button>;
});

const ParentComponent = () => {
    const [count, setCount] = useState(0);

    // 使用 useCallback 缓存函数
    const handleClick = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <ChildComponent onClick={handleClick} />
        </div>
    );
};

export default ParentComponent;
```


## useMemo

- `第一个参数`：是一个函数，该函数包含需要进行的计算逻辑，并且返回计算结果    
-  `第二个参数`：是一个依赖项数组，当数组中的某个值发生变化时，useMemo 会重新调用第一个参数中的函数进行计算；如果依赖项数组为空，则 useMemo 只会在组件挂载时计算一次  

```jsx
import React, { useState, useMemo } from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Example = () => {
    const [filterValue, setFilterValue] = useState(5);

    // 使用 useMemo 进行过滤操作
    const filteredNumbers = useMemo(() => {
        return numbers.filter(num => num > filterValue);
    }, [filterValue]);

    return (
        <div>
            <input
                type="number"
                value={filterValue}
                onChange={(e) => setFilterValue(Number(e.target.value))}
                placeholder="Enter filter value"
            />
            <ul>
                {filteredNumbers.map(num => (
                    <li key={num}>{num}</li>
                ))}
            </ul>
        </div>
    );
};

export default Example;
```

## useRef

本质上`useRef`就像是可以在其`.current`属性中保存一个可变值的“盒子”，`useRef(null)返回值`是不可拓展的属性,`.current`可以。

下篇介绍如何使用而useRef自己最新的值，或者存储上一次props或者state的值；我们直接声明一个值存储当前的值不好吗，为啥要借助useRef()

**这是因为它创建的是一个普通Javascript对象。而useRef()和自建一个 {current: ...}对象的唯一区别是，useRef会在每次渲染时返回同一个ref对象。**

```javascript{4,9}
import React, {Fragment, useState, useEffect, useRef, useCallback, useMemo, useReducer} from "react";

const Example = () => {
    let inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <input type="text" ref={inputRef}/>
    )
};

export default Example
```


## useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle`可以让你在使用 ref 时`自定义`暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用

就是说：当我们使用父组件把ref传递给子组件的时候，这个Hooks允许在子组件中把自定义实例附加到父组件传过来的ref上，有利于父组件控制子组件。


```javascript{11,12,14,13,15,16,17,18,19,20,24,30,31,35}
import React, {
    Fragment,
    useRef,
    useImperativeHandle,
    forwardRef,
    useEffect
} from "react";

function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => (
        {
            addText: () => {
                inputRef.current.value = "我是由父级添加的";
            },
            focus: () => {
                inputRef.current.focus();
            }
        }
    ));
    return <input ref={inputRef}/>;
}

const TempFancyInput = forwardRef(FancyInput);

const Example = () => {
    let ref = useRef(null);
    useEffect(() => {
        console.log(ref);
        ref.current.addText();
        ref.current.focus();
    });
    return (
        <Fragment>
            <TempFancyInput ref={ref}/>
        </Fragment>
    )
};
export default Example
```
![](https://ae01.alicdn.com/kf/H3eab0df2695d4654a1f9e9a9b1f20edem.png)

## useLayoutEffect

这个钩子函数与useEffect相同，但它会在所有的DOM变更之后`同步`调用effect。可以使用它来读取DOM布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

官网建议还是尽可能的是使用标准的useEffec以避免阻塞视觉更新。

## useDebugValue

useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

## 自定义 Hook 必须以 use 开头吗？
 
必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的[规则](https://react.docschina.org/docs/hooks-rules.html)。
 
```javascript
const useWinResize = () => {
 const [size, setSize] = useState({
     width: document.documentElement.clientWidth,
     height: document.documentElement.clientHeight
 });
 const resize = useCallback(() => {
     setSize({
     width: document.documentElement.clientWidth,
     height: document.documentElement.clientHeight
 })
 }, [])
 useEffect(() => {
     window.addEventListener('resize', resize);
     return () => window.removeEventListener('resize', resize);
 }, []);
 return size;
}

//使用
const Home = () => {
 const {width, height} = useWinResize();

 return <div>
         <p>width: {width}</p>
         <p>height: {height}</p>
  </div>;
};
```


## 面试题示例

```javascript
import React, {Fragment, useState, useEffect, useRef, useCallback} from "react";
const useInterval = (callback, delay) => {
    useEffect(() => {
        if (delay !== null) {
            let id = setInterval(callback, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
function Home() {
    const [count, setCount] = useState(0);
    const [diff, setDiff] = useState(500);
    useInterval(() => {
        setCount(count + 1);
    }, diff);
    return (
        <Fragment>
            <p> count: {count} </p>
            <p> diff: {diff}ms </p>
            <p>
                <button onClick={() => setDiff(diff - 50)}> 加快50ms</button>
                <button onClick={() => setDiff(diff + 50)}> 减慢50ms</button>
            </p>
        </Fragment>
    );
}
export default Home
```

可是这段运行后很奇怪，页面从0到1后，就再也不变了，console.log(count)的输出表明代码并没有卡死，那么问题出在哪儿了？<br/>
React组件中的props和state是可以改变的，React会重渲染它们且「丢弃」任何关于上一次渲染的结果，它们之间不再有相关性。<br/>
useEffect()Hook也「丢弃」上一次渲染结果，它会清除上一次effect再建立下一个effect，下一个effect`锁住新的props和state`，这也是我们第一次尝试简单示例可以正确工作的原因。<br/>
但setInterval不会「丢弃」。它会一直引用老的props和state直到你把它换掉——不重置时间你是无法做到的。这里就要用到useRef这个hook了，我们把callback存储到ref中，当callback更新时去更新ref.current的值：

两种方法:【一种是把count存起来，一种是把定时器里面的函数存起来】

```javascript
import React, {Fragment, useState, useEffect, useRef, useCallback} from "react";
const useInterval = (callback, delay, val) => {
    const saveCallback = useRef();
    useEffect(() => {
        saveCallback.current = val
    },[val]);
    useEffect(() => {
        if (delay !== null) {
            let id = setInterval(() => callback(saveCallback.current), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
function Home() {
    const [count, setCount] = useState(0);
    const [diff, setDiff] = useState(500);
    useInterval((val) => {
        setCount(val + 1);
    }, diff, count);
    return (
        <Fragment>
            <p> count: {count} </p>
            <p> diff: {diff}ms </p>
            <p>
                <button onClick={() => setDiff(diff - 50)}> 加快50ms</button>
                <button onClick={() => setDiff(diff + 50)}> 减慢50ms</button>
            </p>
        </Fragment>
    );
}
// const useInterval = (callback, delay) => {
//     const saveCallback = useRef();
//
//     useEffect(() => {
//         // 每次渲染后，保存新的回调到我们的 ref 里
//         saveCallback.current = callback;
//     });
//
//     useEffect(() => {
//         function tick() {
//             saveCallback.current();  //每次执行最新的callback
//         }
//
//         if (delay !== null) {
//             let id = setInterval(tick, delay);
//             return () => clearInterval(id);
//         }
//     }, [delay]);
// };

export default Home

```

## `Hooks FAQ`

### useEffect在外面声明函数

**一般来说，不安全**

```javascript
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 这样不安全（它调用的 `doSomething` 函数使用了 `someProp`）
}
```
要记住 effect 外部的函数使用了哪些 props 和 state 很难。这也是为什么 通常你会想要在 effect 内部 去声明它所需要的函数。 这样就能容易的看出那个 effect 依赖了组件作用域中的哪些值：

```javascript
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）
}
```

**如果处于某些原因你无法把一个函数移动到effect内部，还有一些其他办法：**

- 你可以尝试把那个函数移动到你的组件之外。那样一来，这个函数就肯定不会依赖任何 props,或state并且也不用出现在依赖列表中了。

- 如果你所调用的方法是一个纯计算，并且可以在渲染时调用，你可以 转而在 effect 之外调用它， 并让 effect 依赖于它的返回值。

- 万不得已的情况下，你可以把函数加入effect的依赖但 把它的定义包裹 进`useCallback Hook`。这就确保了它不随渲染而改变，除非 它自身 的依赖发生了改变

## 如何获取上一轮的 props 或 state

```javascript
import React, {Fragment, useState, useEffect, useRef} from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    console.log(1)
    return ref.current;
}

function Example() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    //此时prevCount是上一次的effect的调用，内部已经改变,只是没有重新渲染
    console.log(2)  //先渲染后执行这个effect
    return <>
        <h1>Now: {count}, before: {prevCount}</h1>
        <div onClick={() => setCount((val) => val + 1)}>
            点击加一
        </div>
    </>
}

export default Example
```

![](https://ae01.alicdn.com/kf/Hd6588fe44428462c90a0d7ee879c5948a.gif)

考虑到这是一个相对常见的使用场景，很可能在未来 React 会自带一个 usePrevious Hook。

## 为什么我修改后在别的函数中获取的还是上一次的值

组件内部的任何函数，包括事件处理函数和 effect，都是从它`被创建`的那次渲染中拿到的

```javascript{10}
import React, {useState, useRef} from "react";
function Example() {
    const [count, setCount] = useState(0);
    function handleClick() {
        console.log(count,'函数内部');
    }
    const add = () => {
        let val = count + 1;
        setCount(val);
        handleClick()
    };
     console.log(count,'函数外面');
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={add}>
                点击我
            </button>
            <button onClick={handleClick}>
                获取值
            </button>
        </div>
    );
}
export default Example;
```

![](https://ae01.alicdn.com/kf/H70f6508f638a4c35bb9d095a2a5fde9cE.gif)

你发现`handleClick`每次获取的都是上一次的值，**因为它获取的是创建它的那次值**，此时可以用`useRef`曲线救国

```javascript{4,6,11}
import React, {useState, useRef} from "react";
function Example() {
    const [count, setCount] = useState(0);
    const ref = useRef();
    function handleClick() {
        console.log(count, ref.current);
    }
    const add = () => {
        let val = count + 1;
        setCount(val);
        ref.current = val;
        handleClick()
    };
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={add}>
                点击我
            </button>
            <button onClick={handleClick}>
                获取值
            </button>
        </div>
    );
}
export default Example;
```

## 获取DOM 节点

```javascript{9,10,11,13,12}
import React, {Fragment,useState, useRef, useCallback} from "react";
function Example() {
    const [width, setWidth] = useState(0);
    // const inputEl = useRef(null)
    // useEffect(() => {
    //      setWidth(inputEl.current.getBoundingClientRect().width);
    // });
          
    let ref = useCallback(node => {
        if (node !== null) {
            setWidth(node.getBoundingClientRect().width);
        }
    }, []);
    return (
        <Fragment>
            <h1 ref={ref}>Hello, world</h1>
            <h2>当前屏幕宽度为 {Math.round(width)}px</h2>
        </Fragment>
    );
}
export default Example
```
这里我们没有选择使用`useRef`，用的ref的回调函数，因为当ref是一个对象时它并不会把当前ref的值的变化通知到我们，最终还是要借助effect来实现「代码如上」

**抽离出来**

```javascript{3,4,5,6,7,8,9,10,11,14}
import React, {useState, useRef, useCallback} from "react";

const useClientRect = () => {
    const [width, setWidth] = useState(0);
    let ref = useCallback(node => {
        if (node !== null) {
            setWidth(node.getBoundingClientRect().width);
        }
    }, []);
    return [width, ref]
};

function Example() {
    const [width, ref] = useClientRect(0);
    return (
        <>
            <h1 ref={ref}>Hello, world</h1>
            <h2>当前屏幕宽度为 {Math.round(width)}px</h2>
        </>
    );
}

export default Example
```

## useCallback示例何时更新

```javascript{5,7,8,9,26,15,16,17,18,19,20,21}
import React, {Fragment, useState, useEffect, useRef, useCallback} from "react";

const set1 = new Set();

let c = 21;//【2】

let obj = {
    name: "wk"
};//【1】如果是对象的话，他会指向一个地址，除非改变地址他才会重新执行useCallback，否则他返回的是上次缓存的函数

function Form() {
    const [text, updateText] = useState('');
    const textRef = useRef();

    useEffect(() => {
        c = Math.random(); //【2】

        textRef.current = text;

        obj = {...textRef}; //【1】
    });

    const handleSubmit = useCallback(() => {
        const currentText = textRef.current;
        console.log((currentText));
    }, [obj]);


    set1.add(handleSubmit);
    console.log(set1.size);

    return (
        <>
            <input value={text} onChange={e => updateText(e.target.value)}/>
            {/*<div>{textRef.current}</div>*/}
            <div>{c}</div>
            <button onClick={handleSubmit}>点击</button>
        </>
    );
}

export default Form
```

![](https://ae01.alicdn.com/kf/H7410c03e8eab4361b28a18bfce16c4ba9.gif)

由此可见obj每次执行都要`浅克隆`，useCallback依赖于`obj`所以每次都会生成新的函数。

## useMemo优化组件

```javascript{3,5,8,9}
function Example({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
export default Example
```
`注意这种方式在循环中是无效的`

## 如何向下传递回调？

我们已经发现大部分人并不喜欢在组件树的每一层手动传递回调。尽管这种写法更明确，但这给人感觉像错综复杂的管道工程一样麻烦。

在`大型`的组件树中建议使用 context 用 useReducer 往下传一个 `dispatch` 函数：

```javascript{8}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```
```javascript{3,6}
function DeepTree(props) {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

## 自定义Hooks

### useFetch

```javascript
const useDataApi = (initialUrl, initialData) => {
    
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await fetch(url).then(response => response.json());
                // const result = await axios.get(url);
                setData(result);
            } catch (error) {
                setIsError(true);
                setData(initialData);
            }
            setIsLoading(false);
        };
    fetchData();
    }, [url]);
    return [{data, isLoading, isError}, setUrl];
};
```

## Hooks原理分析

### 简单实现一个useState

```javascript
var _state;
function useState(initialValue){
    _state = _state || initialValue;
    function setState(newState){
        _state = newState;
        render()
    }
    return [_state,setState]
}
```

setState第一个参数可以使函数，当为函数的时候，参数为当前的_state

```js
var _state;
function useState(initialValue){
    _state = _state || initialValue;
    function setState(fun){
        _state = fun(_state) || _state
        render()
    }
    return [_state,setState]
}

setCount(state=>state+1)
```

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "./styles.css";

let _state; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state | initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击1
      </Button>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  ReactDOM.render(<App />, rootElement);
}
render();
```

## 简单实现一个useEffect

dependencies:依赖关系

Effect有几个特点

- 有两个参数 callback 和 dependencies 数组
- 如果 dependencies 不存在，那么 callback 每次 render 都会执行
- 如果 dependencies 存在，只有当它发生了变化， callback 才会执行

```js
let _deps; // _deps 记录 useEffect 上一次的 依赖

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 如果 dependencies 不存在
  const hasChangedDeps = (_deps
    ? !depArray.every((el, i) => el === _deps[i]) // 两次的 dependencies 是否完全相等
    : true);
  /* 如果 dependencies 不存在，或者 dependencies 有变化*/
  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
}
```

到现在的话，在页面能正常使用了，但是每次使用只能用一次，因为你声明多次的话，它是公用的一个变量，不能重复使用。

们可以使用数组，来解决 Hooks 的复用问题

**代码关键在于：**

初次渲染的时候，按照 `useState，useEffect` 的顺序，把 `state，deps` 等按顺序塞到 `memoizedState` 数组中。
更新的时候，按照顺序，从 `memoizedState` 中把上次记录的值拿出来。

```javascript
let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = (deps
    ? !depArray.every((el, i) => el === deps[i])
    : true);
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}
```

到这里基本的业务已经满足了，但是有几个需要注意的点：

- memoizedState 数组是按 hook定义的顺序来放置数据的，如果hooks的顺序变化，memoizedState 并不会感知到所以不要再循环或者判断语句中调用。
- 自定义的hooks也是共享同一个 memoizedState，共享同一个顺序。

## 参考文档

[hooks](https://react.docschina.org/docs/hooks-reference.html)

[react-hooks-fetch](https://www.robinwieruch.de/react-hooks)

[hooks-faq](https://react.docschina.org/docs/hooks-faq.html)

[ReactHooks源码](https://github.com/facebook/react/blob/master/packages/react/src/ReactHooks.js)
