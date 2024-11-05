
# React 最佳实践  
本文来分享 React 中的 16 种常见反模式和最佳实践。  

## 在组件外部声明CSS
如果使用 CSS in JS 的解决方案，尽量避免在组件内声明 CSS。  

```js
// 如果使用 CSS in JS 的解决方案，尽量避免在组件内声明 CSS。
import makeCss from 'some/css/in/js/library'

const Component = () => {
  // 不要这样写
  return <div className={makeCss({ background: red, width: 100% })} />
}


// 因为在每次渲染时都会重新创建对象，可以将其从组件中提出来：
import cssLibrary from 'some/css/in/js/library'

const someCssClass = makeCss({
  background: red,
  width: 100%
})

const Component = () => {
  return <div className={someCssClass} />
}
```

## 使用 useCallback 防止函数重新创建  
每当重新渲染 React 组件时，都会重新创建组件中的所有函数。 React 提供了一个 `useCallback` Hook，可以用来避免这种情况。只要其依赖项不改变，`useCallback` 就会在渲染之间保留函数的旧实例。  

```js
import { useCallback } from 'react'

const Component = () => {
  const [value, setValue] = useState(false)

  // 该函数将在每次渲染时重新创建
  const handleClick = () => {
    setValue(true)
  }

  return <button onClick={handleClick}>Click</button>
}
```

```js
import { useCallback } from 'react'

const Component = () => {
  const [value, setValue] = useState(false)

  // 仅当变量值更新时才会重新创建此函数
  const handleClick = useCallback(() => {
    setValue(true)
  }, [value])

  return <button onClick={handleClick}>Click</button>
}
```
对于示例中的小函数，不能保证将函数包装在`useCallback`中确实更好。所以还需要根据实际情况来判断是否需要使用 `useCallback` 包装。  

在底层，React将在每次渲染时检查依赖关系，以确定是否需要创建新函数，而且有时依赖关系经常发生变化。因此，`useCallback`提供的优化并不总是必需的。然而，如果函数的依赖项不经常更新，那么使用`useCallback`是一种很好的优化方法，以避免在每次渲染时重新创建函数。

## 使用 useCallback 防止依赖项更改
`useCallback` 不仅可以用于避免函数实例化，但它也可用于更重要的事情。 由于 useCallback 在渲染之间为包装函数保留相同的内存引用，因此它可用于优化其他 `useCallback` 和记忆的使用。 

```js
import { memo, useCallback, useMemo } from 'react'

const MemoizedChildComponent = memo({ onTriggerFn }) => {
  // ...
})

const Component = ({ someProp }) => {
  // 仅当 someProp 发生变化时，对 onTrigger 函数的引用才会发生变化
  const onTrigger = useCallback(() => {
    // ...
  }, [someProp])

  // 这个记忆值只会在 onTrigger 函数更新时更新
  // 如果 onTrigger 不是 useCallback 中的包装器，则将在每次渲染时重新计算该值
  const memoizedValue = useMemo(() => {
    // ...
  }, [onTrigger])

  // Memoize子组件只会在onTrigger函数更新时重新渲染
  // 如果 onTrigger 未包装在 useCallback 中，MemoizedChildComponent 将在每次渲染此组件时重新渲染
  return (<>
    <MemoizedChildComponent onTriggerFn={onTrigger} />
    <button onClick={onTrigger}>Click me</button>
   </>)
}

```

## 使用 useCallback 防止 useEffect 触发  
前面的示例展示了如何借助 `useCallback` 来优化渲染，同样，也可以避免不必要的 `useEffect` 触发。

```js
import { useCallback, useEffect } from 'react'

const Component = ({ someProp }) => {
  // 仅当 someProp 发生变化时，对 onTrigger 函数的引用才会发生变化
  const onTrigger = useCallback(() => {
    // ...
  }, [someProp])

  // useEffect 仅在 onTrigger 函数更新时运行
  // 如果 onTrigger 未包装在 useCallback 中，则 useEffect 将在每次此函数渲染时运行
  useEffect(() => {
    // ...
  }, [onTrigger])

  return <button onClick={onTrigger}>Click me</button>
}
```

## 当不需要依赖项时，向 useEffect 添加空依赖项  
如果 effect 不依赖于任何变量，可以将空依赖项数组作为 `useEffect` 的第二个参数。 否则，effect 将在每次渲染时运行。

```js
import { useEffect } from 'react'

const Component = () => {
  useEffect(() => {
    // ...
  }, [])

  return <div>Example</div>
}
```
这个逻辑也适用于其他 React hook，例如 `useCallback` 和 `useMemo`。 不过，如果没有任何依赖项，可能根本不需要使用这些 Hooks。

## 始终将所有依赖项添加到 useEffect 和其他 React Hooks  
在处理内置 React Hooks 的依赖项项（例如 `useEffects` 和 `useCallback`）时，请将所有依赖项添加到依赖项列表（Hooks 的第二个参数）。 当省略依赖项时，effect 或回调可能会使用它的旧值，这通常会导致难以预测的错误。
```js
import { useEffect } from 'react'

const Component = () => {
  const [value, setValue] = useState()

  useEffect(() => {
    // 使用 value 变量的代码

    // 将变量添加到依赖项数组中，应在此处添加 value 变量
  }, [])

  return <div>{value}</div>
}
```
那当 useEffect 被触发的次数比希望的次数多时，如何避免副作用？ 不幸的是，没有完美的解决方案。不同的场景需要不同的解决方案。 可以尝试使用 hook 仅运行一次代码，这有时很有用，但实际上并不是一个值得推荐的解决方案。

大多数情况下，可以使用 if-case 来解决问题。 可以查看当前状态并从逻辑上决定是否确实需要运行代码。 例如，如果不将 value 值添加为上述 effect 的依赖项的原因是仅在值未定义时运行代码，则只需在 effect 内添加 if 语句即可。
```js
import { useEffect } from 'react'

const Component = () => {
  const [value, setValue] = useState()

  useEffect(() => {
    if (!value) {
      // ...
    }
  }, [value])

  return <div>{value}</div>
```
其他场景可能更复杂，也许使用 if 语句来防止 effect 多次发生不太可行。 在这种情况下，首先应该确定，真的需要 effect 吗？ 在很多情况下，开发人员在实际上不应该这样做时却使用了 effect。  

## 不要将外部函数包装在 useCallback 中
不需要 useCallback 来调用外部函数。 只需按原样调用外部函数即可。 这使得 React 不必检查 useCallback 是否需要重新创建，并且使代码更简洁。
```js
import { useCallback } from 'react'
import externalFunction from '/services/externalFunction'

const Component = () => {
  // ❌
  const handleClick = useCallback(() => {
    externalFunction()
  }, [])

  return <button onClick={handleClick}>Click me</button>
}
```
```js
import externalFunction from '/services/externalFunction'

const Component = () => {
  // ✅
  return <button onClick={externalFunction}>Click me</button>
}
```

使用 useCallback 的一个用例是回调调用多个函数或读取或更新内部状态（例如 useState  hook 中的值或组件传入的 props 之一）时。 
```js
import { useCallback } from 'react'
import { externalFunction, anotherExternalFunction } from '/services'

const Component = ({ passedInProp }) => {
  const [value, setValue] = useState()

  const handleClick = useCallback(() => {
    // 调用了多个函数
    externalFunction()
    anotherExternalFunction()

    // 读取和或设置内部值或属性。
    setValue(passedInProp)
  }, [passedInProp, value])

  return <button onClick={handleClick}>Click me</button>
}
```

## 不要将 useMemo 与空依赖数组一起使用  
如果添加了带有空依赖项数组的 useMemo，问问自己为什么要这样做。因为它依赖于组件的状态变量而不想添加它？ 在这种情况下，应该列出所有依赖变量！因为 useMemo 没有任何依赖项？ 那就不需要使用 useMemo 了。  

```js
import { useMemo } from 'react'

const Component = () => {
  // ❌
  const memoizedValue = useMemo(() => {
    return 3 + 5
  }, [])

  return <div>{memoizedValue}</div>
}
```
```js
// ✅
const memoizedValue = 3 + 5

const Component = () => {
  return <div>{memoizedValue}</div>
}
```

## 不要在其他组件中声明组件

```js
const Component = () => {

  // ❌
  const ChildComponent = () => {
    return <div>child</div>
  }

  return <div><ChildComponent /></div>
}
```
这样写的话，组件内声明的变量将在每次组件呈现时重新声明。 在这种情况下，这意味着每次父级重新渲染时都必须重新创建功能子组件。就必须在每次渲染时实例化一个函数。  
React 将无法决定何时进行任何类型的组件优化。如果在 ChildComponent 中使用 hooks，它们将在每次渲染时重新启动。

那该怎么办呢？ 只需在父组件之外声明子组件即可。
```js
const ChildComponent = () => {
    return <div>child</div>
}

const Component = () => {
  return <div><ChildComponent /></div>
}
```
或者，更好的方式是：
```js
import ChildComponent from 'components/ChildComponent'

const Component = () => {
  return <div><ChildComponent /></div>
}
```

## 不要在 If 语句中使用 Hook  
在React内部，Hook的调用顺序是必须固定的，以确保正确地管理组件状态和生命周期。如果在if语句内部使用Hook，会导致两个问题：
1. 违反Hook的调用规则：根据React的规定，Hook应该在每次渲染中按照相同的顺序被调用。当条件发生变化时，Hook调用的顺序可能会发生变化，这会破坏React对Hook调用顺序的依赖，导致无法预料的行为和错误。
2. Hook的依赖关系无效：Hook的工作原理是基于依赖项列表，它可以检测依赖项的变化，并在需要时重新运行。如果将Hook放在if语句中，它的依赖关系可能无法正确地捕捉到变化，从而导致状态更新或副作用的错误。

```js
import { useState } from 'react'

const Component = ({ propValue }) => {
  if (!propValue) {
    const [value, setValue] = useState(propValue)
  }

  return <div>{value}</div>
}
```

## 使用 useState 而不是变量
在React中，存储状态应该始终使用 React hooks（如`useState`或`useReducer`），不要直接将状态声明为组件中的变量。这样做会导致在每次渲染时重新声明变量，这意味着React无法像通常一样对其进行记忆化处理。
```js
import AnotherComponent from 'components/AnotherComponent'

const Component = () => {
  const value = { someKey: 'someValue' }

  return <AnotherComponent value={value} />
}
```
在上述情况下，依赖于`value`的`AnotherComponent`及其相关内容将在每次渲染时重新渲染，即使它们使用`memo`、`useMemo`或`useCallback`进行了记忆化处理。

如果将一个带有`value`作为依赖的`useEffect`添加到组件中，它将在每次渲染时触发。因为每次渲染时 `value` 的JavaScript引用都会不同。

通过使用 React 的`useState`，React会保留`value`的相同引用，直到使用`setValue`进行更新。然后，React 将能够检测何时触发和何时不触发 effect ，并重新计算记忆化处理。
```js
import { useState } from 'react'
import AnotherComponent from 'components/AnotherComponent'

const Component = () => {
  const [value, setValue] = useState({ someKey: 'someValue' })

  return <AnotherComponent value={value} />
}
```
如果只需要一个状态，在初始化后就不再更新，那么可以将变量声明在组件外部。这样 JavaScript 引用将不会改变。  
```js
// 如果不需要更新该值，就可以这样声明变量
const value = { someKey: 'someValue' }

const Component = () => {
  return <AnotherComponent value={value} />
}
```

## return 后不使用 Hook  
根据定义，if语句是有条件执行的，“return”关键字也会导致条件 Hook 渲染。
```js
import { useState } from 'react'

const Component = ({ propValue }) => {

  if (!propValue) {
    return null
  }

  // 这个 hook 是有条件的，因为只有当 propValue 存在时才会调用它
  const [value, setValue] = useState(propValue)

  return <div>{value}</div>
}
```
条件语句中的 return 语句会使后续的 Hook 成为有条件的。为了避免这种情况，将所有的 Hook 放在组件的第一个条件渲染之前。也就是说，始终将 Hook 放在组件的顶部。
```js
import { useState } from 'react'

const Component = ({ propValue }) => {
  // 在条件渲染之前放 hooks
  const [value, setValue] = useState(propValue)

  if (!propValue) {
    return null
  }

  return <div>{value}</div>
}
```
## 让子组件决定是否应该渲染  
在许多情况下应该让子组件决定是否应该渲染：
```js 
import { useState } from 'react'

const ChildComponent = ({ shouldRender }) => {
  return <div>Rendered: {shouldRender}</div>
}

const Component = () => {
  const [shouldRender, setShouldRender] = useState(false)

  return <>
    { !!shouldRender && <ChildComponent shouldRender={shouldRender} /> }
  </>
}
```
以上是有条件地渲染子组件的常见方法。 代码很好，除了在有很多子组件时有点冗长之外。 但根据 `ChildComponent` 的作用，可能存在更好的解决方案。下面来稍微重写一下代码。  
```js
import { useState } from 'react'

const ChildComponent = ({ shouldRender }) => {

  if (!shouldRender) {
    return null
  }

  return <div>Rendered: {shouldRender}</div>
}

const Component = () => {
  const [shouldRender, setShouldRender] = useState(false)

  return <ChildComponent shouldRender={shouldRender} />
}
```
这里重写了两个组件，将条件渲染移至子组件中。 那条件渲染移至子组件有什么好处？

最大的好处是 React 可以继续渲染 `ChildComponent`，即使它不可见。 这意味着，`ChildComponent` 可以在隐藏时保持其状态，然后第二次渲染而不会丢失其状态。 它一直都在那里，只是不可见。

如果组件像第一个代码那样停止渲染，则 `useState` 中保存的状态将被重置，并且一旦组件再次渲染，`useEffect`、`useCallback` 和 `useMemo` 都需要重新运行并重新计算新值。

如果代码会触发一些网络请求或进行一些复杂的计算，那么当组件再次渲染时，这些请求也会运行。 同样，如果将一些表单数据存储在组件的内部状态中，则每次组件隐藏时都会重置。

## 使用 useReducer 而不是多个 useState  
可以使用一个 useReducer 来代替使用多个 useState，这样写起来可能比较麻烦，但是这样既可以避免不必要的渲染，又可以让逻辑更容易理解。 一旦有了 useReducer，向组件添加新逻辑和状态就会容易得多。
```js
import { useState } from 'react'

const Component = () => {
  // ❌
  const [text, setText] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const handleChange = (event) => {
    const value = event.target.value
    setText(value)

    if (value.length < 6) {
      setError('Too short')
    } else {
      setError('')
    }
  }

  return <>
    {!touched && <div>Write something...</div> }
    <input type="text" value={text} onChange={handleChange} />
    <div>Error: {error}</div>
  </>
}
```
```js
import { useReducers } from 'react'

const UPDATE_TEXT_ACTION = 'UPDATE_TEXT_ACTION'
const RESET_FORM = 'RESET_FORM'

const getInitialFormState = () => ({
  text: '',
  error: '',
  touched: false
})

const formReducer = (state, action) => {
  const { data, type } = action || {}

  switch (type) {
    case UPDATE_TEXT_ACTION:
      const text = data?.text ?? ''

      return {
        ...state,
        text: text,
        error: text.length < 6,
        touched: true
      }
    case RESET_FORM:
      return getInitialFormState()
    default:
      return state
  }
}

const Component = () => {
  // ✅
  const [state, dispatch] = useReducer(formReducer, getInitialFormState());
  const { text, error, touched } = state

  const handleChange = (event) => {
    const value = event.target.value
    dispatch({ type: UPDATE_TEXT_ACTION, text: value})
  }

  return <>
    {!touched && <div>Write something...</div> }
    <input type="text" value={text} onChange={handleChange} />
    <div>Error: {error}</div>
  </>
}
```

## 将初始状态写为函数而不是对象
来看看下面的 `getInitialFormState` 函数：
```js
// 初始状态是一个函数
const getInitialFormState = () => ({
  text: '',
  error: '',
  touched: false
})

const formReducer = (state, action) => {
  // ...
}

const Component = () => {
  const [state, dispatch] = useReducer(formReducer, getInitialFormState());
  // ...
}
```
这里将将初始状态写成了一个函数，但其实直接使用一个对象也是可以的。
```js
// 初始状态是一个对象
const getInitialFormState = {
  text: '',
  error: '',
  touched: false
}

const formReducer = (state, action) => {
  // ...
}

const Component = () => {
  const [state, dispatch] = useReducer(formReducer, getInitialFormState());
  // ...
}
```
那为什么不直接写成对象呢？ 答案很简单，**避免可变性**。 在上面的例子中，当initialFormState是一个对象时，我们可能会一不小心就在代码中的某个地方改变了该对象。如果这样，当再次使用该变量，例如在重置表单时，将无法恢复初始状态。 相反，会得到变异的对象。

因此，将初始状态转换为返回初始状态对象的 `getter` 函数是一个很好的做法。 或者更好的是，使用像 `Immer` 这样的库，它用于避免编写可变代码。

## 当组件不应重新渲染时，使用 useRef 而不是 useState  
可以通过用 useRef 替换 useState 来优化组件渲染。来看下面的例子：
```js
import { useEffect } from 'react'

const Component = () => {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!triggered) {
      setTriggered(true)
      // ...
    }
  }, [triggered])
}
```

当运行上面的代码时，组件将在调用 `setTriggered` 时重新渲染。在这种情况下，触发状态变量可能是确保 effect 仅运行一次的一种方法。

由于在这种情况下触发变量的唯一用途是跟踪函数是否已被触发，因此不需要组件渲染任何新状态。 因此，可以将 `useState` 替换为 `useRef`，这样更新时就不会触发组件重新渲染。
```js
import { useRef } from 'react'

const Component = () => {
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (!triggeredRef.current) {
      triggeredRef.current = true

      // ...
    }

  }, [])
}
```
那为什么需要使用 useRef，而不简单地使用组件外部的变量呢？
```js
const triggered = false

const Component = () => {
  useEffect(() => {
    if (!triggered) {
      triggered = true

      // ...
    }
  }, [])
}
```
这里需要 `useRef` 的原因是因为上面的代码不能以同样的方式工作！上面的变量只会为 `false` 一次。 如果组件卸载了，当组件再次挂载时，`triggered`变量仍然会被设置为`true`，因为`triggered`变量并没有绑定到React的生命周期中。当使用 `useRef` 时，React 将在组件卸载并再次安装时重置其值。在这种情况下，就可以要使用 `useRef`。