# Immer

## React中浅层次拷贝的问题

```javascript
const detail = {name:'王可',school:{loc:'shijaizhuang'}}
const copy = Object.assign({},detail);
copy.school.loc ="北京";
//此时你会发现我们的detail.school.loc也变成了"北京"了
copy.school === detail.school
//此时copy.school和detail.school指向同一个对象，引用相同，一个值被修改那么另一个同样被修改
```

要解决上面的问题，一定要深克隆，而不是浅层次的拷贝


## React中引用类型导致组件不更新

**栗子**

```javascript
class Index extends Component {
    state = {
        ff: {
            a: 1, b: 2, c: 3, school: {
                location: "wk.jing999.cn",
                name: "王可"
            }
        }
    };
    add = () => {
        const {ff} = this.state;
        // ff.school.name = 11;  //[1]

        this.setState({
            ff: {
                ...ff,
                school: {
                    location: "wk.jing999.cn",
                    name: 11
                }
            }
        }); //[2]
        
        // let draftFF = produce(ff, draft => {
        //   draft.school.name = 11;
        // });
        // this.setState({
        //   ff: draftFF
        // }) // [3]
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //[1]这里永远是true ,因为内存地址是完全一样的
        //[2]这里永远是false ,因为克隆后地址一直在变
        //[3]只有第一次是false,后面不会变，值变化后跟之前的一样，性能最高
        console.log(nextState.ff === this.state.ff);
        if (nextState.ff === this.state.ff) {
            return false
        }
        return true;
    }
    render() {
        return (
            <>
                <button onClick={this.add}>点击</button>
                {this.state.ff.school.name}
            </>
        );
    }
}
export default Index
```

## 简介不可变数据

React在减少重复渲染方面确实是有一套独特的处理办法，那就是虚拟DOM，但显然在首次渲染的时候React绝无可能超越原生的速度，或者一定能将其它的框架比下去。
但是每次数据变动都会执行render，大大影响了性能，特别是在移动端。


JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如 foo={a: 1}; bar=foo; bar.a=2 你会发现此时 foo.a 也被改成了 2。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，Mutable 带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。


不可变数据就是一旦创建，就不能再被直接更改的数据。对Immutable 对象的任何修改或添加删除操作都会返回一个新的Immutable对象。
Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，
Immutable 使用了Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。



`Object.freeze()` 方法可以冻结一个对象，冻结的对象不能添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。尝试修改会静默失败或抛出TypeError类型的错误。相关函数还包括：
`Object.isExtensible() `
`Object.seal()` 和`Object.defineProperty()`均为ES5中定义的方法


## immerJS

Immer是mobx的作者写的一个immutable库，核心实现是利用 ES6 的 `proxy`，几乎以最小的成本实现了js的不可变数据结构

## 使用方式

```javascript
import produce from "immer"

const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]

const nextState = produce(baseState, draftState => {
    draftState.push({todo: "Tweet about it"})
    draftState[1].done = true
})


```

```javascript
/**
 * 带深度合并的经典React.setState
 */
onBirthDayClick1 = () => {
    this.setState(prevState => ({
        user: {
            ...prevState.user,
            age: prevState.user.age + 1
        }
    }))
}

/**
 * ...但是，由于setState接受函数，
 * 上面相当于所有的东西都会重新渲染，用immerjs优化后
 */
onBirthDayClick2 = () => {
    this.setState(
        produce(draft => {
            //这里只有age发生的变化，state里面的值，他们的引用不会发生变化，不会引起不必要的更新
            draft.user.age += 1 
        })
    )
}

```
## 图解

![](https://ae01.alicdn.com/kf/H7060e5bd80e044aea4ccda0edcf06f8e7.png)

上图可以：immer.js的方法修改了对象的某一个属性的时候，该属性的所有的父级属性的引用都会发生改变，而其他属性的引用都是共享

```javascript
nextState = produce(currentState, draftState => {
   ...
});
```
**主要思想就是先在currentState基础上生成一个代理draftState，之后的所有修改都会在draftState上进行，避免直接修改currentState，而当修改结束后，再从draftState基础上生成nextState。**

Immer内部使用Object.freeze()方法,只冻结nextState跟currentState`相比修改`的部分

- 优点:
   - 降低了 Mutable 带来的复杂度
   - 节省内存
   - Undo/Redo (因为每次数据都是不一样的，只要把这些数据放到一个数组里储存起来，想回退到哪里就拿出对应数据即可，很容易开发出撤销重做这种功能。)
   - 拥抱函数式编程 (纯函数式编程比面向对象更适用于前端开发。因为只要输入一致，输出必然一致，这样开发的组件更易于调试和组装。)
   - 写法更加优雅
    

- 对比ImmutableJS
   - 增加了资源文件大小(压缩后代码大小16K，immer是4k)
   - 需要使用者学习它的数据结构操作方式，没有 Immer 提供的使用`原生对象`的操作方式简单、易用；
   - 它的操作结果需要通过toJS方法才能得到原生对象，这使得在操作一个对象的时候，时刻要主要操作的是原生对象还是 ImmutableJS 的返回结果，稍不注意，就会产生意想不到的 bug。


## 示例

### immutable.js

看看Immutable怎么使用的，谁能保证以后一定不用这个

```javascript
import Immutable from "immutable"

let map1 = Immutable.Map({a:1, b:2, c:3,school:{
    location:"shijiazhuang",
    name :"王可"
 }});
let map2 = map1.set('b', 50);//我这里仅仅设置了b的值，那么其他的值都会共享

console.log(map1) //返回的是一个Map的对象，不能直接在原数据更改

console.log('引用相等',map1===map2); //immutable.js中每次返回的引用都是不一样的，此处返回false

console.log('school的引用没有变化',map2.school===map1.school);//immutable.js中没有变化的对象将会共享，所以此处返回true

let map3 = {a:1,b:2,c:3}
let map4 = map3; //map4拿到的是map3的指针，所以一个变化后另外一个也会变化，但是变化的是值，引用本身是不变化的，所以map3===map4返回true
map4.c =4;
console.log('map3===map4',map3===map4);
```

## Immer.js

```javascript
import produce from "immer"
let map1 = {
    a: 1, b: 2, c: 3, school: {
        location: "shijiazhuang",
        name: "王可"
    }
};
let map2 = produce(map1, draft => {
    draft.b = 50
});
console.log(map2);  //跟源原对象一样的类型
// console.log(map2.a = 100); // Cannot assign to `read only` property 'a' of object  要保持跟源对象一致，值类型不能被修改
console.log(map1 === map2);  //false  此处跟immutable一致，每次返回的引用都是不一样的
console.log(map1.school === map2.school);  //没有变化的对象将会共享
console.log(map2.school.name = 1);  //school的引用地址没有发生改变，可以修改,双方发生变化  不建议修改
```

## 实践

为什么你要在React.js中使用Immutable Data熟悉React.js的都应该知道，React.js是一个UI = f(states)的框架，为了解决更新的问题，React.js使用了virtual dom，virtual dom通过diff修改dom，来实现高效的dom更新。听起来很完美吧，但是有一个问题。
当state更新时，如果子组件数据没变，你也会去做virtual dom的diff，这就产生了浪费。

1. 与 React 搭配使用，Pure Render
熟悉 React 的都知道，React 做性能优化时有一个避免重复渲染的大招，就是使用 `shouldComponentUpdate()`，但它默认返回 `true`，即始终会执行 `render()` 方法，然后做 Virtual DOM 比较，并得出是否需要做真实 DOM 更新，这里往往会带来很多无必要的渲染并成为性能瓶颈。

当然我们也可以在 `shouldComponentUpdate()` 中使用使用 deepCopy 和 deepCompare 来避免无必要的 `render()`，但 **deepCopy 和 deepCompare 一般都是非常耗性能的**。

搭配 

`shouldComponentUpdate、PureComponent、memo、useMemo`
memo(xxxx, (prevProps, nextProps) => prevProps.data === nextProps.data);

2. React 建议把 `this.state` 当作 Immutable 的，因为之前修改前需要做一个 deepCopy，显得麻烦

3. 与 Redux 搭配使用

## 参考

[官方文档](https://immerjs.github.io/immer/docs/introduction)

[Immutable 详解及 React 中实践](https://github.com/camsong/blog/issues/3)

[seamless-immutable](http://file.wk.jing999.cn/workspace/Project/immutable.html)

[Immer.js简析](https://segmentfault.com/a/1190000015426465)
