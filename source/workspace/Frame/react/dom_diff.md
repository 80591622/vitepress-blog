
# VirtualDOM

**React 的核心思想**

React 提供声明式的 UI 构建方式：通过描述 UI（元素/虚拟节点）并把数据（state/props）映射到 UI，React 负责高效地把描述渲染到浏览器 DOM。现代 React 的更新由其 reconciliation（调和）算法与 Fiber 调度器驱动，并结合并发特性（Concurrent Rendering）来提升响应性。当前推荐使用函数组件 + Hooks 来组织组件逻辑。

## JSX 与 createElement

我们在实现 React 组件时常用 JSX，也可以直接调用 `React.createElement`。

```javascript
// 推荐写法：函数组件（Hook 优先）
function Hello() {
  return <div>Hello wk</div>;
}
```

```javascript
// 等价的非 JSX 写法
function Hello() {
  return React.createElement('div', null, 'Hello wk');
}
```

注意：自 React 17 起，引入了新的 JSX 转换（automatic runtime），在大多数构建配置下不再需要显式 `import React from 'react'`。同样，JSX 中首字母小写对应原生元素（如 `div`），首字母大写被视为自定义组件。


## Virtual DOM

![](https://lsqimg-1257917459.cos-website.ap-beijing.myqcloud.com/blog/%E8%99%9A%E6%8B%9Fdom.png)

冷静看待 Virtual DOM：首次渲染时 Virtual DOM 并不会自动提高性能，反而会带来额外的内存与计算开销；它的价值主要体现在更新阶段，通过 reconciliation 识别差异并只更新必要的部分可以减少不必要的 DOM 操作。现代 React 还引入了 Fiber 调度器，使渲染过程可中断与调度，从而支持并发渲染和更流畅的用户体验。

### Virtual DOM 的作用与场景

- 跨平台渲染（例如 React Native）——相同的组件描述可以渲染到不同的宿主平台。
- 服务端渲染与流式 SSR（更好的首屏体验和 SEO）。
- 支持函数式编程范式与可预测的组件更新（函数组件 + Hooks）。

### 渲染与更新的高层流程（简化）

1. 组件 render（函数组件）或 render 方法返回元素描述（虚拟节点）。
2. React 使用 reconciliation（调和）比较新旧元素树，计算出最小必要更新。Fiber 调度器负责分片执行这些更新，使渲染能被暂停或延后以保持交互流畅。
3. React 将差异应用到真实 DOM（或其他宿主环境），完成更新。

看看虚拟DOM的真实模样

![](https://ae01.alicdn.com/kf/H66008463790e4f8d9feaa1f12800ee9cm.png)

- `type`：元素的类型，可以是原生html类型（字符串），或者自定义组件（函数或class）
- `key`：组件的唯一标识，用于Diff算法
- `ref`：用于访问原生dom节点
- `props`：传入组件的props
- `owner`：当前正在构建的Component所属的Component
- `$$typeof`：防止xss攻击，如果你的服务器有一个漏洞，允许用户存储任意JSON对象， 而客户端代码需要一个字符串，这可能为你的应用程序带来风险。JSON中不能存储Symbol类型的变量，而React渲染时会把没有`$$typeof`标识的组件过滤掉。
- `self`指定当前位于哪个组件实例。
- `_source`指定调试代码来自的文件(fileName)和代码行数(lineNumber)。

### 简单实现 vdom

```html
<body>
  <div id="app"></div>
</body>
<script src="./createElement.js"></script>
```

```javascript
// createElement：构建一个虚拟节点（VDOM）
// - type: 字符串表示原生元素（如 'div'），也可以是函数表示组件
// - props: 属性对象（会拆出 key/ref）
// - children: 0 或多个子节点（支持嵌套数组）
const createElement = (type, props = {}, ...children) => {
  const { key = null, ref = null, ...rest } = props || {};

  // children 扁平化并去掉 null/undefined，这里用 flat 兼容较简单的嵌套情况
  const flatChildren = children.flat ? children.flat(Infinity) : [].concat(...children);
  const filtered = flatChildren.filter(c => c !== null && c !== undefined);

  // 返回的对象即为简单的虚拟节点表示
  return { type, key, ref, props: { ...rest, children: filtered } };
};

// render：把虚拟节点挂载到容器上（这里只做首次渲染）
const render = (vnode, container) => {
  container.appendChild(createDom(vnode));
};

// createDom：把 vnode 转换为真实 DOM 节点
const createDom = vnode => {
  // 处理空值和文本节点
  if (vnode === null || vnode === undefined) return document.createTextNode('');
  if (typeof vnode === 'string' || typeof vnode === 'number') return document.createTextNode(String(vnode));

  // 支持简化的函数组件（注意：这里没有处理 hooks）
  if (typeof vnode.type === 'function') {
    // 调用函数组件获得其渲染结果（vnode）并继续创建 DOM
    const rendered = vnode.type({ ...vnode.props });
    return createDom(rendered);
  }

  // 处理原生元素
  const el = document.createElement(vnode.type);

  // 设置属性（className -> class，style，事件绑定等）
  setProps(el, vnode.props);

  // 递归处理子节点：每个 child 都可能是文本、原生元素或组件
  const children = (vnode.props && vnode.props.children) || [];
  children.forEach(child => el.appendChild(createDom(child)));

  // 如果传入了 ref 回调，调用它并传入真实 DOM
  if (typeof vnode.ref === 'function') vnode.ref(el);

  return el;
};

// setProps：设置元素属性的辅助函数，并处理常见 edge case
const setProps = (el, props = {}) => {
  Object.entries(props).forEach(([name, value]) => {
    if (name === 'children') return; // children 已单独处理

    // className -> class
    if (name === 'className') el.setAttribute('class', value);

    // style 对象：逐个 key 赋值到 el.style
    else if (name === 'style' && typeof value === 'object') Object.assign(el.style, value);

    // 事件处理：'onClick' -> 'click'，并且绑定函数
    else if (name.startsWith('on') && typeof value === 'function') {
      el.addEventListener(name.slice(2).toLowerCase(), value);
    }

    // 内联 HTML（危险操作，需要谨慎使用）
    else if (name === 'dangerouslySetInnerHTML' && value && value.__html) {
      el.innerHTML = value.__html;
    }

    // false / null / undefined 表示移除属性
    else if (value === false || value === null || value === undefined) {
      el.removeAttribute(name);
    }

    // 其他普通属性直接设置
    else {
      el.setAttribute(name, value);
    }
  });
};

// 使用示例：构建一个简单的节点树并渲染
const app = createElement(
  'div',
  { id: 'box', className: 'box', style: { color: 'red' } },
  createElement('h2', { className: 'title' }, '这里是头部'),
  createElement(
    'ul',
    { className: 'newsItem' },
    createElement('li', { key: '1', style: { color: '#ccc' } }, '哈哈哈'),
    createElement('li', { key: '2' }, '呵呵呵')
  ),
  '1221'
);

// 初始渲染到页面上的 '#app' 元素
render(app, document.getElementById('app'));
```

> 说明：此实现旨在演示如何把虚拟节点转换为真实 DOM，处理了文本节点、函数组件、事件绑定与基本属性。

> 注释说明：
> - 已注释关键函数（createElement、createDom、setProps、render）以帮助理解流程；
> - 这个示例只实现了首次渲染，**未实现** diff/reconciliation 算法、key 的移动优化、hooks、生命周期与并发调度等；这些功能属于真实 React 的 reconciler 与 Fiber 调度器的职责。
> 注：上面是一个演示性的 `ReactDom.render` 实现，用于说明原理。在真实的 React 18+ 项目中，创建根并渲染的推荐方式是使用 `createRoot`：
>
> ```javascript
> import { createRoot } from 'react-dom/client';
> const root = createRoot(document.getElementById('app'));
> root.render(<App />);
> ```
> 这将启用 React 的并发能力和更新调度能力。


然后根据不同的情况，来进行树上节点的增删改的操作。这个过程是分为diff和patch：

- **diff**：递归对比两棵 VDom 树的、对应位置的节点差异
- **patch**：根据不同的差异，进行节点的更新


### reconciliation（简化示例）

下面给出一个更完整的、可运行的 **简化版 VDOM + reconciler** 实现（参考 React 18 的设计思路）：

- 支持首次 mount、最小化更新（replace / update / remove）、简单的 key 优化（按 key 匹配复用）
- 支持函数组件与一个非常简化的 `useState`（仅用于教学）
- 提供 `startTransition` 的低优先级更新模拟（用 setTimeout 表示）

> 注意：这是教学用的精简实现，未包含 React 的大量复杂性（Fiber 调度、并发优先队列、生命周期一致性、Hooks 的完整语义等），但能帮助理解核心思想。

```javascript
// ====== 简化 VDOM reconciler（教学实现） ======
// 假设 vnode 结构：{ type, key?, ref?, props: { ... , children: [...] } }

// 工具：判断节点是否不同（类型或 key 或文本变化）
const changed = (a, b) => {
  if (a == null && b == null) return false;
  if (typeof a === 'string' || typeof a === 'number' || typeof b === 'string' || typeof b === 'number') {
    return String(a) !== String(b);
  }
  if (!a || !b) return true;
  return a.type !== b.type || (a.key != null || b.key != null) && a.key !== b.key;
};

// createRoot / render API（与 React 18 思路相近）
function createRoot(container) {
  let current = null; // 已挂载的树的根节点（mounted node）
  return {
    render(nextVnode) {
      current = reconcile(container, current, nextVnode);
    }
  };
}

// reconcile：把 newVnode 和 oldMounted 对比并在容器上打补丁，返回新的 mounted 节点或 null
function reconcile(parentDom, oldMounted, newVnode) {
  // mount
  if (!oldMounted) {
    if (newVnode == null) return null;
    const dom = createDom(newVnode);
    parentDom.appendChild(dom);
    const mounted = { vnode: newVnode, dom, children: getChildMounted(dom, newVnode) };
    return mounted;
  }

  // unmount
  if (newVnode == null) {
    parentDom.removeChild(oldMounted.dom);
    return null;
  }

  // replace
  if (changed(oldMounted.vnode, newVnode)) {
    const dom = createDom(newVnode);
    parentDom.replaceChild(dom, oldMounted.dom);
    const mounted = { vnode: newVnode, dom, children: getChildMounted(dom, newVnode) };
    return mounted;
  }

  // update same-type node
  if (typeof newVnode.type === 'string') {
    // update props
    updateProps(oldMounted.dom, oldMounted.vnode.props, newVnode.props);

    // reconcile children with simple key-aware algorithm
    oldMounted.children = reconcileChildren(oldMounted.dom, oldMounted, newVnode);

    oldMounted.vnode = newVnode;
    return oldMounted;
  }

  // component (function)
  if (typeof newVnode.type === 'function') {
    // 简化的组件支持：保持组件的 mounted.child 作为组件输出的挂载树
    const prevChild = oldMounted.child || null;
    // 执行组件函数以获取子 vnode（注意：这里会触发简化 hooks）
    const rendered = renderWithHooks(newVnode);
    const newChildMounted = reconcile(parentDom, prevChild, rendered);
    oldMounted.child = newChildMounted;
    oldMounted.dom = newChildMounted ? newChildMounted.dom : null;
    oldMounted.vnode = newVnode;
    return oldMounted;
  }

  return oldMounted;
}

// reconcileChildren：按 key 做基本复用与更新
function reconcileChildren(parentDom, parentMounted, newVnode) {
  const oldChildren = parentMounted.children || [];
  const newChildren = (newVnode.props && newVnode.props.children) || [];

  // 建立 key -> oldMounted 映射
  const keyed = new Map();
  oldChildren.forEach((m, i) => {
    const k = keyOf(m.vnode, i);
    keyed.set(k, m);
  });

  const newMounted = [];
  newChildren.forEach((ch, i) => {
    const k = keyOf(ch, i);
    const old = keyed.get(k) || oldChildren[i] || null;
    const mounted = reconcile(parentDom, old, ch);
    if (mounted) {
      parentDom.appendChild(mounted.dom); // 确保顺序（可能会多次移动，但教学示例接受）
      newMounted.push(mounted);
    }
    keyed.delete(k);
  });

  // 删除残余旧节点
  keyed.forEach(m => parentDom.removeChild(m.dom));

  return newMounted;
}

const keyOf = (vnode, index) => (vnode && vnode.key != null) ? vnode.key : index;

// createDom：把 vnode 转为真实 dom（和之前的实现相同）
function createDom(vnode) {
  if (vnode == null) return document.createTextNode('');
  if (typeof vnode === 'string' || typeof vnode === 'number') return document.createTextNode(String(vnode));

  if (typeof vnode.type === 'function') {
    // 对于函数组件，直接渲染其返回的 vnode（不处理 hooks 这里会由 renderWithHooks 调用）
    const rendered = renderWithHooks(vnode);
    return createDom(rendered);
  }

  const el = document.createElement(vnode.type);
  setProps(el, vnode.props);
  const children = (vnode.props && vnode.props.children) || [];
  children.forEach(child => el.appendChild(createDom(child)));
  if (typeof vnode.ref === 'function') vnode.ref(el);
  return el;
}

function getChildMounted(dom, vnode) {
  // 辅助：为原生元素创建 children 的 mounted 表示（第一次 mount 时）
  if (typeof vnode.type === 'string') {
    const children = (vnode.props && vnode.props.children) || [];
    return children.map(child => ({ vnode: child, dom: createDom(child), children: [] }));
  }
  return [];
}

// updateProps：策略性地更新 DOM 属性（增量更新）
function updateProps(el, oldProps = {}, newProps = {}) {
  // 删除旧属性
  Object.keys(oldProps).forEach(name => {
    if (name === 'children') return;
    if (!(name in newProps)) el.removeAttribute(name);
  });
  // 添加 / 更新
  Object.entries(newProps).forEach(([name, value]) => {
    if (name === 'children') return;
    if (name === 'className') el.setAttribute('class', value);
    else if (name === 'style' && typeof value === 'object') Object.assign(el.style, value);
    else if (name.startsWith('on') && typeof value === 'function') {
      // 简化：直接绑定（未维护可移除的引用）
      el.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (name === 'dangerouslySetInnerHTML' && value && value.__html) {
      el.innerHTML = value.__html;
    } else if (value === false || value === null || value === undefined) {
      el.removeAttribute(name);
    } else {
      el.setAttribute(name, value);
    }
  });
}

// ===== 简化 Hooks 支持（教学） =====
let currentComponent = null; // 当前正在渲染的组件挂载节点
function renderWithHooks(vnode) {
  const prev = vnode._mounted || { hooks: [], hookIndex: 0 };
  vnode._mounted = prev; // 绑定挂载信息到 vnode 上，方便下一次渲染复用 hooks
  prev.hookIndex = 0;
  currentComponent = prev;
  const rendered = vnode.type(vnode.props || {});
  currentComponent = null;
  return rendered;
}

function useState(initial) {
  const comp = currentComponent;
  const i = comp.hookIndex++;
  if (comp.hooks[i] === undefined) comp.hooks[i] = typeof initial === 'function' ? initial() : initial;
  const setState = (v) => {
    comp.hooks[i] = typeof v === 'function' ? v(comp.hooks[i]) : v;
    // 触发全局重新渲染（简化：需要持有 app 根与 root 实例，在示例中我们直接重新 render）
    scheduleRender();
  };
  return [comp.hooks[i], setState];
}

// ===== 简单任务调度 / startTransition（教学） =====
let pendingRender = null;
function scheduleRender(lowPriority = false) {
  if (lowPriority) {
    // 模拟低优先级更新（不会阻塞用户交互），延后执行
    clearTimeout(pendingRender);
    pendingRender = setTimeout(() => root.render(appVnode), 50);
  } else {
    // 高优先级立即执行
    clearTimeout(pendingRender);
    root.render(appVnode);
  }
}

function startTransition(updateFn) {
  updateFn();
  scheduleRender(true);
}

// ===== 使用示例 =====
// 全局 root + appVnode 仅为教学演示用
const rootContainer = document.getElementById('app');
const root = createRoot(rootContainer);

// 一个简单的函数组件，使用 useState 演示交互
function Counter() {
  const [n, setN] = useState(0);
  return createElement('div', null,
    createElement('p', null, 'Count: ', String(n)),
    createElement('button', { onClick: () => setN(x => x + 1) }, '++'),
    createElement('button', { onClick: () => startTransition(() => setN(x => x + 1000)) }, '+1000 (low)')
  );
}

// 应用根 vnode
let appVnode = createElement('div', { id: 'app-root' },
  createElement('h3', null, '简化版 React 18-like VDOM 示例'),
  createElement(Counter, null),
  createElement('ul', null,
    createElement('li', { key: 'a' }, 'A'),
    createElement('li', { key: 'b' }, 'B')
  )
);

// 首次渲染
root.render(appVnode);
```


### 传统diff 对比 react diff

传统的diff算法追求的是“`完全`”以及“`最小`”，而react diff则是放弃了这两种追求：
在传统的diff算法下，对比前后两个节点，`如果发现节点改变了，会继续去比较节点的子节点，一层一层去对比`。就这样循环递归去进行对比，复杂度就达到了O(n3)，n是树的节点数，想象一下如果这棵树有1000个节点，我们得执行上十亿次比较，这种量级的对比次数，时间基本要用秒来做计数单位了。

### React reconciliation 的三大策略

React 的调和（reconciliation）是基于启发式的规则来高效比较新旧树，而不是执行一个严格的树形最小编辑序列。主要策略包括：

- **tree diff（层级策略）**：React 假设跨层级的大规模移动很少发生。如果父元素的类型不同，React 通常会卸载旧子树并创建新子树，而不会尝试跨层级的最小移动。
- **component diff（组件策略）**：同类型组件会尽量复用实例并更新其 props；不同类型的组件则会替换整个子树。函数组件通常配合 `React.memo`、`useMemo` 等优化手段减少不必要的渲染。
- **element diff（同层策略）**：同一层级的子节点通过 `key` 来辨识身份，从而实现增删改查（插入、删除、移动）的最小化操作。

![](https://ae01.alicdn.com/kf/H9b1d122f787048f7afc393265e732d28D.png)

### 虚拟DOM树分层比较（`tree diff`）

![](https://ae01.alicdn.com/kf/H087b9d785877406b94078d9b6a07c15av.png)

上图中，**div只会和同一层级的div对比，第二层级的只会和第二层级对比。 这样算法复杂度就可以达到O(n)**。

但是如果DOM节点出现了跨层级操作，diff会如何处理？

React是不会机智的判断出子树仅仅是发生了移动，而是**会直接销毁**，并重新创建这个子树，然后再挂在到目标DOM上;<br/>
实际上，React官方也并不推荐我们做出跨层级的骚操作。所以我们可以从中悟出一个道理：就是我们自己在实现组件的时候，一个稳定的DOM结构是有助于我们的性能提升的。

### 组件间的比较（`component diff`）

比较组件时的核心策略是判断组件类型是否一致：

- **同类组件**：若类型相同，React 会复用组件实例并更新其 props，从而触发重新渲染与调和（render -> reconciliation）。在函数组件中，可以使用 `React.memo`、`useMemo`、`useCallback` 等手段减少不必要的渲染。
- **不同类型组件**：若类型变化，React 会卸载旧组件及其子树并创建新的子树。

注意：以前类组件常用 `shouldComponentUpdate` 来阻止不必要的更新；在现代 React 中，函数组件配合 `React.memo` 与 Hooks（例如 `useMemo`）能达到类似和更灵活的效果。

```javascript
// 简化的伪代码：若类型不同则替换，否则更新 props 并再次 render
function reconcileComponent(oldNode, newNode) {
  if (oldNode.type !== newNode.type) {
    replaceNode(oldNode, instantiate(newNode))
  } else {
    updateProps(oldNode, newNode.props)
    renderAndReconcileChildren(oldNode)
  }
}
```
### 元素间的比较（`element diff`）

当节点处于同一层级的时候，react diff 提供了三种节点操作：**插入、删除、移动**。

| 操作 | 描述 |
| --- | --- |
| 插入 | 新节点不存在于老集合当中，即全新的节点，就会执行插入操作。 |
| 移动 | 新节点在老集合中存在，并且只做了位置上的更新，就会复用之前的节点，做移动操作（依赖于Key）。 |
| 删除 | 新节点在老集合中不存在，或节点做出了更改无法直接复用，会执行删除操作。 |

### Key的作用

**react利用key来识别组件，它是一种身份标识标识，就像我们的身份证用来辨识一个人一样**。每个key对应一个组件，相同的key react认为是同一个组件，这样后续相同的key对应组件都不会被创建。

**key的使用场景**

- 数组动态创建的子组件
- 为一个有复杂繁琐逻辑的组件添加key后，后续操作可以改变该组件的key属性值，从而达到先销毁之前的组件，再重新创建该组件。

我们在循环渲染列表时候(map)时候忘记标记key值报的警告,既然是警告,就说明即使没有key的情况下也不会影响程序执行的正确性,其实这个key的存在只会`影响diff算法的复杂度`(不是一定会提高性能),也就是说你不加上Key就会暴力渲染，加了Key之后，React就可以做出移动的操作了，看例子：

![](https://ae01.alicdn.com/kf/H1f3780ed47c947c8b8b9c9a5092a06507.png)

每个节点都加上了唯一的 `key` 值，通过这个 `key` React 可以识别新老集合中的节点身份，从而判定哪些元素可以复用、哪些需要移动或新增。下面给出一个简化的描述（实际实现属于 reconciler 的实现细节，并可能随 React 版本演进）：

React 会遍历新的集合：

① 从新集合中取到`B`，然后去旧集合中判断是否存在相同的`B`，确认`B`存在后，再去判断是否要移动：
`B`在旧集合中的`index = 1`，有一个游标叫做`lastindex`。默认`lastindex = 0`，然后会把旧集合的`index和游标作`对比来判断是否需要移动，如果**index < lastindex ，那么就做移动操作**，在这里`B的index = 1`，不满足于 `index < lastindex`,所以就不做移动操作，然后游标lastindex更新，`取(index, lastindex) 的较大值`，这里就是`lastindex = 1`

② 然后遍历到`A`，`A`在老集合中的`index = 0`，此时的游标`lastindex = 1`，满足`index < lastinde`x，所以对A需要移动到对应的位置，此时`lastindex = max(index, lastindex) = 1`

③ 然后遍历到`D`，`D`在老集合中的`index = 3`，此时游标`lastindex = 1`，不满足`index < lastindex`，所以D保持不动。`lastindex = max(index, lastindex) = 3`

④ 然后遍历到`C`，`C`在老集合中的`index = 2`，此时游标`lastindex = 3`，满足 `index < lastindex`，所以C移动到对应位置。C之后没有节点了，diff就结束了

以上主要分析新老集合中`节点相同但位置不同`的情景，仅对节点进行位置移动的情况，如果新集合中有新加入的节点且老集合存在需要删除的节点，那么 React diff 又是如何对比运作的呢？

![](https://ae01.alicdn.com/kf/Haafdd54eefeb47e1ad5fbb10e7f8ba9bE.png)

和第一种情景基本是一致的，react还是去循环整个新的集合：
① 不赘述了，和上面的第一步是一样的，`B不做移动，lastindex = 1`

② 新集合取得`E`，发现旧集合中不存在，则创建E并放在新集合对应的位置，`lastindex = 1`

③ 遍历到`C`，不满足`index < lastindex`，`C`不动，`lastindex = 2`

④ 遍历到`A`，满足`index < lastindex`，`A`移动到对应位置，`lastindex = 2`

⑤ 当完成新集合中所有节点 `diff` 时，最后还需要对老集合进行循环遍历，判断是否存在新集合中没有但老集合中仍存在的节点，发现存在这样的节点 `D`，因此`删除节点 D`，到此 diff 全部完成

但是 react diff也存在一些问题，和需要优化的地方，看下面的例子：

![](https://ae01.alicdn.com/kf/Hc94d1ce042be45a5b6e694b0b034817cU.png)

在上面的这个例子，**A、B、C、D**都没有变化，仅仅是`D`的位置发生了改变。看上面的图我们就知道react并没有把D的位置移动到头部，而是把 **A、B、C**分别移动到`D`的后面了，通过前面的两个例子，我们也大概知道，为什么会发生这样的情况了：

因为`D`节点在老集合里面的`index` 是最大的，使得**A、B、C**三个节点都会 `index < lastindex`，从而导致**A、B、C**都会去做移动操作。所以在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

### 三句箴言

所以经过这么一分析 `react reconciliation` 的三大策略，我们能够在开发中进一步提高 React 的渲染效率。

- 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
- 使用 `React.memo`、`useMemo`、`useCallback` 等替代或补充 `shouldComponentUpdate()` 来节省不必要的更新；
- 在开发过程中，尽量减少将最后一个节点移动到列表首部等对列表进行大量重排的操作，当节点数量过大或更新频繁时会影响渲染性能。

### 现代 React 特性（概览）

- **createRoot（React 18+）**：新的根 API，配合并发特性使用：

```javascript
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

- **Automatic batching**：React 会把多个 state 更新合并在一次渲染中，降低重渲染次数（适用于事件、宏任务、微任务等场景）。

- **startTransition / useTransition**：用于标记低优先级更新，避免阻塞关键交互：

```javascript
import { startTransition } from 'react';
startTransition(() => setState(next));
```

- **Suspense 与串流 SSR**：可以用于等待异步数据或懒加载组件，并与流式服务端渲染协同优化首屏体验。

- **Server Components（可选采用）**：在服务器端执行部分组件逻辑以减少发送到客户端的 JS 体积（依据项目采用情况而定）。

- **Hooks & 新增 API**：`useId`（生成稳定 id）、`useSyncExternalStore`（订阅外部存储）、`useInsertionEffect`（样式库插入时序）等，满足特定场景需要。例如：

```javascript
import { useId, useTransition } from 'react';
function Search() {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  // startTransition(() => setQuery(nextQuery)) // 将更新标记为低优先级
}
```

- **Profiler**：`<Profiler onRender={...}>` 用于测量组件渲染性能，便于优化。

- **StrictMode（开发模式）**：在严格模式下，React 会对某些生命周期或渲染进行额外检查（例如在开发环境下可能会执行额外的渲染以帮助发现副作用）。

（详情请参考 React 官方文档以获取最新稳定版的行为与示例。）

### 为什么不推荐使用 `index` 作为 `key`

看下面这个示例（函数组件风格）

```javascript
import React, { useState } from 'react';

function App() {
  const [list, setList] = useState([
    { id: 1, val: 'A' },
    { id: 2, val: 'B' },
    { id: 3, val: 'C' }
  ]);

  const reverse = () => setList(prev => [...prev].reverse());

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item.val}
            <input defaultValue="" />
          </li>
        ))}
      </ul>
      <button onClick={reverse}>Reverse</button>
    </div>
  );
}
```

如果你在三个输入框中依次输入 1、2、3，然后点击 Reverse，预期页面应显示 3、2、1。但如果使用 `index` 作为 `key`，你往往会发现输入框里的内容没有随项位置一起移动（看起来仍是 1、2、3）。原因是：

- `key` 用于标识元素的“身份”。当 key 不变时（这里都是 0、1、2），React 认为这些项保持不变，会重用已有的 DOM 节点。
- 当你用 `index` 作 key 并对列表顺序进行变换时，DOM 节点被复用到新的数据上，导致表单元素（尤其是非受控组件）保持了原有的 DOM 状态（例如用户输入），看起来像数据没有正确移动。

正确做法是为列表项使用稳定且唯一的 `id` 作为 `key`：

```javascript
{list.map(item => (
  <li key={item.id}>{item.val}<input defaultValue="" /></li>
))}
```

这样 React 才能根据 `key` 正确地理解哪些项应该被移动、添加或删除，从而保持 DOM 与数据的一致性。

![](https://ae01.alicdn.com/kf/H3ecb41d8764e4834b940428652f66478s.png)

出现这种情况，使用key是用来表示唯一的标识组件，当发现setState前后key的值没有发生变化 ，react就会认为你setState前后是同一个组件，进而只会对内部的属性进行修改：

- 检测key值发现都是0，判定组件为同一个。
- 检测item.val部分，发现有变化重新渲染这部分
- 检测input，发现不依赖props，所以不进行重新渲染

### diff 源码

```javascript{19,23,27,34,40}
// diff函数，对比两颗树
function diff(oldTree, newTree) {
    // 当前的节点的标志。因为在深度优先遍历的过程中，每个节点都有一个index。
    var index = 0;
    // 在遍历到每个节点的时候，都需要进行对比，找到差异，并记录在下面的对象中。
    var pathches = {};
    // 开始进行深度优先遍历
    dfsWalk(oldTree, newTree, index, pathches);
    // 最终diff算法返回的是一个两棵树的差异。
    return pathches;
}

// 对两棵树进行深度优先遍历。
function dfsWalk(oldNode, newNode, index, pathches) {
    // 对比oldNode和newNode的不同，记录下来
    pathches[index] = [...];
  if (_.isString(newNode)) {
    // 对比文本 dom 节点
    return diffTextDom(oldNode, newNode, index, pathches)   
  }
  if (oldNode.nodeName.toLowerCase() !== newNode.nodeName) {
    // 对比非文本 dom 节点
    diffNotTextDom(oldNode, newNode, index, pathches)     
  }
  if (_.isFunction(newNode.nodeName)) {
    // 对比自定义组件
    return diffComponent(oldNode, newNode, index, pathches) 
  }
  if (
     // 值对比标签的类型和key值是否一致
      oldNode.type === newNode.type &&
      oldNode.key === newNode.key
    ) {
      var propsPatches = diffProps(oldNode, newNode) // 对比属性
      if (propsPatches) {
        pathches.push({ type: patch.PROPS, props: propsPatches })
      }
     if (newVdom.children.length > 0) {
       // 遍历对比子节点
       diffChildren(oldNode.children, newNode.children, index, pathches);  
     }
  }
}

// 遍历子节点
function diffChildren(oldChildren, newChildren, index, pathches) {  
    var leftNode = null;
    var currentNodeIndex = index;
    oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i];
    currentNodeIndex = (leftNode && leftNode.count)
    ? currentNodeIndex + leftNode.count + 1
    : currentNodeIndex + 1

    // 深度遍历子节点
    dfsWalk(child, newChild, currentNodeIndex, pathches);
    leftNode = child;
    });
}
```

[详细diff跳转](https://github.com/livoras/simple-virtual-dom/blob/master/lib/diff.js#L5)

## patch（简化说明）

在本教育性实现中，patch 是将计算出的差异应用到真实 DOM 的过程。实际的 React 架构将渲染分为两个阶段：

- **render（渲染/计算）阶段**：纯计算式地构建/比较新旧元素树（可以中断/调度）。
- **commit（提交）阶段**：把不可中断的 DOM 变更应用到真实宿主环境，并执行副作用（例如 `useEffect` 中的回调）。

下面给出一个简化的 patch 流程说明，便于理解 DOM 更新的基本思想。

**差异类型**

DOM操作可能会：

- 替换原来的节点，如把上面的div换成了section。 
- 移动、删除、新增子节点， 例如上面div的子节点，把p和ul顺序互换。
- 修改了节点的属性。 
- 对于文本节点，文本内容可能会改变。
所以，我们可以定义下面的几种类型：

```javascript
var REPLACE = 0; 
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;

//patches里面存储着差异的dom,是个数组
patches[0] = [
  {
   type:  TEXT,
   content: 'word'
  },
  { 
    type: PROPS,
    props: {
      id: 'container'
    }
  }
]
```

**patch 源码**

```javascript
function patch (node, patches) {
  var walker = {index: 0}
  dfsWalk(node, walker, patches)
}

function dfsWalk (node, walker, patches) {
  var currentPatches = patches[walker.index] // 从patches拿出当前节点的差异

  var len = node.childNodes
    ? node.childNodes.length
    : 0
  for (var i = 0; i < len; i++) { // 深度遍历子节点
    var child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches) // 对当前节点进行DOM操作
  }
}
```

applyPatches，根据不同类型的差异对当前节点进行 DOM 操作：

```javascript
function applyPatches (node, currentPatches) {
  currentPatches.forEach(function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node)
        break
      case REORDER:
        reorderChildren(node, currentPatch.moves)
        break
      case PROPS:
        setProps(node, currentPatch.props)
        break
      case TEXT:
        node.textContent = currentPatch.content
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}
```
 
[详细patch跳转](https://github.com/livoras/simple-virtual-dom/blob/master/lib/patch.js#L8)
 
## 总结

现代 React 的更新与渲染思路可以概括为：组件返回元素描述（虚拟节点），React 的 reconciler 比较新旧描述并由调度器（Fiber）分配执行，使得只在必要时修改真实 DOM，同时将渲染分为可中断的 render 阶段和不可中断的 commit 阶段来保证交互流畅性与副作用的正确执行。

教学性地，可以把实现抽象为 `createElement` -> `diff/reconcile` -> `patch/commit` 三个步骤，但实际的 React 实现更为复杂并包含并发渲染、自动批处理、Suspense、Server Components 等新特性。建议参考 React 官方文档以获取最新稳定版的 API 与最佳实践。

## 参考文档

[https://juejin.im/post/5cb66fdaf265da0384128445](https://juejin.im/post/5cb66fdaf265da0384128445)<br/>
[https://blog.csdn.net/qq_36407875/article/details/84965311](https://blog.csdn.net/qq_36407875/article/details/84965311)<br/>
[https://www.cnblogs.com/zhuzhenwei918/p/7271305.html](https://www.cnblogs.com/zhuzhenwei918/p/7271305.html)<br/>
[http://react-china.org/t/react-react/26788](http://react-china.org/t/react-react/26788)<br/>
[https://github.com/MuYunyun/blog/blob/master/React/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/4.diff%E7%AE%97%E6%B3%95.md](https://github.com/MuYunyun/blog/blob/master/React/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/4.diff%E7%AE%97%E6%B3%95.md)