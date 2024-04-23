# 问题验证解析

## setState为什么是异步的、什么时候是异步的？

setState本身的执行过程是同步的，只是因为在react的**合成事件**与钩子函数中执行顺序在更新之前，所以不能直接拿到更新后的值，形成了所谓的异步；

在原生事件与setTimeout中是同步的

**验证结果**

```javascript
import React from 'react';
class Index extends React.Component {
    state = {
        num: 1
    };
    componentDidMount() {
        this.clickFunc();
    }
    //原生点击事件的处理函数
    clickFunc() {
        document.querySelector('#btn').addEventListener('click', () => {
            this.setState({num: this.state.num + 1});
            console.log(this.state.num);
            this.setState({num: this.state.num + 1});
            console.log(this.state.num,'打印的是当前值');
        })
    }
    //setTimeout
    addNumSet = () => {
        setTimeout(() => {
            this.setState({num: this.state.num + 1});
            console.log(this.state.num);
            this.setState({num: this.state.num + 1});
            console.log(this.state.num, '打印的是当前值');
        }, 1000)
    };
    //合成事件、钩子函数内进行了批量更新优化
    addNum = () => {
        this.setState({num: this.state.num + 1});
        this.setState({num: this.state.num + 1});
        console.log(this.state.num, '打印的是上一次的值');
    };
    render() {
        return (
            <>
                <h1>{this.state.num}</h1>
                {/* react的合成事件 */}
                <button onClick={this.addNum}>React合成事件的按钮</button>
                {/* 原生DOM事件 */}
                <button id='btn'>绑定原生DOM事件的按钮</button>
                {/* 定时器 */}
                <button onClick={this.addNumSet}>定时器</button>
            </>
        )
    }
}
export default Index;
```

![](https://ae01.alicdn.com/kf/Hbb3d522c7afa45d894e583388f1615f4p.jpg)

## setState之后都发生了什么

- 合并 state
- 更新 state  （先浅对比在深度）
- 然后看业务代码中是否实现生命周期方法 shouldComponentUpdate 有则调用，如果返回值为 false 则停止往下执行
- 然后是生命周期方法 componentWillUpdate
- 然后通过拿到新 state 的 instance 调用 render 方法拿到新的 element 和之旧的 element 的节点差异，然后根据差异对界面进行最小化重渲染
- 在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

## 传入 setState 函数的第二个参数的作用是什么？

该函数会在setState函数调用完成并且`组件开始重渲染`的时候被调用，我们可以用来监听该函数是否渲染完成：

```javascript
this.setState(
  { username: 'xxxx' },
  () => console.log('更新完成')
)
```

## shouldComponentUpdate 的作用

shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们`避免不必要的更新`,减少向下diff的规模，减少diff的成本

## useState为什么不能放到条件语句里面？

这是因为React通过单链表来管理Hooks。

![345fad8ae0e74dd2912a10ae77018a25](https://tva1.sinaimg.cn/large/e6c9d24ely1h3xc51ru68j20y20iwgmn.jpg)

update 阶段，每次调用 useState，链表就会执行 next 向后移动一步。如果将 useState 写在条件判断中，假设条件判断不成立，没有执行里面的 useState 方法，会导致接下来所有的 useState 的取值出现偏移，从而导致异常发生。

