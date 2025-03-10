import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"问题验证解析","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Frame/vue/problem.md","filePath":"workspace/Frame/vue/problem.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Frame/vue/problem.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="问题验证解析" tabindex="-1">问题验证解析 <a class="header-anchor" href="#问题验证解析" aria-label="Permalink to &quot;问题验证解析&quot;">​</a></h1><h2 id="vue中组件的data为什么是一个函数" tabindex="-1">vue中组件的data为什么是一个函数 <a class="header-anchor" href="#vue中组件的data为什么是一个函数" aria-label="Permalink to &quot;vue中组件的data为什么是一个函数&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 方法一</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">data</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> () {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">   return</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">      count</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">0</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">      show</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">true</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">   }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 方法二</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">data</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">    count</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">0</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">    show</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">true</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>组件是可复用的<code>vue</code>实例，一个组件被创建好之后，就可能被用在各个地方，而组件不管被复用了多少次， 组件中的<code>data</code>数据都应该是<code>相互隔离，互不影响</code>的，基于这一理念，组件每复用一次，<code>data</code>数据就应该被复制一次，之后， 当某一处复用的地方组件内<code>data</code>数据被改变时，其他复用地方组件的<code>data</code>数据不受影响</p><p><strong>方法一</strong> 例子中的<code>data</code>不是一个单纯的对象，而是一个函数返回值的形式，所以每个组件实例可以维护一份被返回对象的独立拷贝，如果我们将上述例子中的<code>data</code>修改为 <strong>方法二</strong>。<br> 那么就会造成无论在哪个组件里改变了<code>count</code>值，都会影响到其他组件里的<code>count</code>。这是因为当data如此定义后，这就表示所有的组件实例共用了一份<code>data</code>数据，因此，无论在哪个组件实例中修改了<code>data</code>,都会影响到所有的组件实例。</p><h2 id="v-show-与-v-if-有什么区别" tabindex="-1">v-show 与 v-if 有什么区别 <a class="header-anchor" href="#v-show-与-v-if-有什么区别" aria-label="Permalink to &quot;v-show 与 v-if 有什么区别&quot;">​</a></h2><p><strong>v-if</strong> 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建； 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。<strong>v-if</strong> 有更高的切换开销</p><p><strong>v-show</strong> 就简单得多——不管初始条件是什么，元素总是会被渲染，所以有更高的初始渲染开销，并且只是简单地基于 <strong>CSS 的 &#39;display&#39;</strong> 属性进行切换。 适用于需要非常频繁切换条件的场景</p><h2 id="vue-的父组件和子组件生命周期钩子函数执行顺序" tabindex="-1">vue 的父组件和子组件生命周期钩子函数执行顺序 <a class="header-anchor" href="#vue-的父组件和子组件生命周期钩子函数执行顺序" aria-label="Permalink to &quot;vue 的父组件和子组件生命周期钩子函数执行顺序&quot;">​</a></h2><ul><li><p>加载渲染过程</p><ul><li>父 beforeCreate -&gt; 父 created -&gt; 父 beforeMount -&gt; 子 beforeCreate -&gt; 子 created -&gt; 子 beforeMount -&gt; 子 mounted -&gt; 父 mounted</li></ul></li><li><p>子组件更新过程</p><ul><li>父 beforeUpdate -&gt; 子 beforeUpdate -&gt; 子 updated -&gt; 父 updated</li></ul></li><li><p>父组件更新过程</p><ul><li>父 beforeUpdate -&gt; 父 updated</li></ul></li><li><p>销毁过程</p><ul><li>父 beforeDestroy -&gt; 子 beforeDestroy -&gt; 子 destroyed -&gt; 父 destroyed</li></ul></li></ul><h2 id="vue-项目进行哪些优化" tabindex="-1">vue 项目进行哪些优化 <a class="header-anchor" href="#vue-项目进行哪些优化" aria-label="Permalink to &quot;vue 项目进行哪些优化&quot;">​</a></h2><p><strong>代码层面的优化</strong></p><ul><li>v-if 和 v-show 区分使用场景</li><li>computed 和 watch 区分使用场景</li><li>v-for 遍历必须为 item 添加 key，且避免同时使用 v-if</li><li>长列表性能优化</li><li>事件的销毁</li><li>图片资源懒加载</li><li>路由懒加载(按需加载)</li><li>第三方插件的按需引入</li><li>优化无限列表性能</li><li>服务端渲染 SSR or 预渲染</li></ul><p><strong>Webpack 层面的优化</strong></p><ul><li>Webpack 对图片进行压缩</li><li>减少 ES6 转为 ES5 的冗余代码</li><li>提取公共代码</li><li>模板预编译</li><li>提取组件的 CSS</li><li>优化 SourceMap</li><li>构建结果输出分析</li><li>Vue 项目的编译优化</li></ul><p><strong>基础的 Web 技术的优化</strong></p><ul><li>开启 gzip 压缩</li><li>http缓存</li><li>CDN 的使用</li><li>使用 Chrome Performance 查找性能瓶颈</li></ul><h2 id="vue-采用数据劫持的手段可以精准拿到变化的数据-为什么还需要虚拟dom进行diff检测差异" tabindex="-1">Vue 采用数据劫持的手段可以精准拿到变化的数据,为什么还需要虚拟DOM进⾏diff检测差异? <a class="header-anchor" href="#vue-采用数据劫持的手段可以精准拿到变化的数据-为什么还需要虚拟dom进行diff检测差异" aria-label="Permalink to &quot;Vue 采用数据劫持的手段可以精准拿到变化的数据,为什么还需要虚拟DOM进⾏diff检测差异?&quot;">​</a></h2><p>现在前端框架有两种数据变动侦测方式，一种是pull，一种是push. pull 的代表是React ，在进行 setState 操作后显示更新数据，React 会使用 diff 算法一层层找出差异，然后 patch 到 DOM 树上，React 一开始不知道那里变化了，只是知道变化了，然后暴力进行查找那变化了或者使用<code>PureComponent/shouldComponentUpdate</code>，另一个代表是 Angular 的脏检查。</p><p>Vue 的响应式系统就是 Push 的代表，Vue 初始化的时候就会对 data 的数据进行依赖收集，因此Vue能实时知道那里发生了变化，一般绑定的细粒度过高，会生成大量的Watcher 实例，则会造成过大的内存和依赖追踪的开销，而细粒度过低无法侦测到变化。因此，Vue采用的是中等细粒度的方案，只针对组件级别的进行响应式监听也就是push，这样可以知道那个组件发生了变化，再对组件进行diff算法找到具体变化的位置，这是pull操作，vue是pull + push 结合进行变化侦测的。</p><h2 id="vue-中怎么重置-data" tabindex="-1">vue 中怎么重置 data <a class="header-anchor" href="#vue-中怎么重置-data" aria-label="Permalink to &quot;vue 中怎么重置 data&quot;">​</a></h2><p>使用Object.assign()，vm.$data可以获取当前状态下的data，vm.$options.data可以获取到组件初始化状态下的data</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">Object</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">assign</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">this</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">$data</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">this</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">$options</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">data</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">())</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="组件中写-name-选项有什么作用" tabindex="-1">组件中写 name 选项有什么作用 <a class="header-anchor" href="#组件中写-name-选项有什么作用" aria-label="Permalink to &quot;组件中写 name 选项有什么作用&quot;">​</a></h2><ol><li>项目使用 keep-alive 时，可搭配组件 name 进行缓存过滤</li><li>DOM 做递归组件时需要调用自身 name</li><li>vue-devtools 调试工具里显示的组见名称是由vue中组件name决定的</li></ol><h2 id="route-和-router-的区别是什么" tabindex="-1">route 和 router 的区别是什么 <a class="header-anchor" href="#route-和-router-的区别是什么" aria-label="Permalink to &quot;route 和 router 的区别是什么&quot;">​</a></h2><ol><li>$route是“路由信息对象”，包括path,params,hash,query,fullPath,matched,name等路由信息参数。</li><li>$router是“路由实例对象”，包括了路由的跳转方法(push、replace)，钩子函数等</li></ol><h2 id="vue组件里写的原生addeventlisteners监听事件-要手动去销毁吗" tabindex="-1">vue组件里写的原生addEventListeners监听事件，要手动去销毁吗 <a class="header-anchor" href="#vue组件里写的原生addeventlisteners监听事件-要手动去销毁吗" aria-label="Permalink to &quot;vue组件里写的原生addEventListeners监听事件，要手动去销毁吗&quot;">​</a></h2><p>要</p><p>一方面是绑定多次，另一方面是函数没释放会内存溢出</p><h2 id="v-clock和v-pre指令" tabindex="-1">v-clock和v-pre指令 <a class="header-anchor" href="#v-clock和v-pre指令" aria-label="Permalink to &quot;v-clock和v-pre指令&quot;">​</a></h2><p>v-cloak指令只是在标签中加入一个v-cloak自定义属性，在HTML还编译完成之后该属性会被删除。 v-pre可以用来阻止预编译，有v-pre指令的标签内部的内容不会被编译，会原样输出。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">h1</span><span style="${ssrRenderStyle({ "color": "#D19A66", "font-style": "italic" })}"> v-pre</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    {</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">showPage</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">h1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 仍然是显示的 {{showPage}}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="权限指令" tabindex="-1">权限指令 <a class="header-anchor" href="#权限指令" aria-label="Permalink to &quot;权限指令&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">Vue</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">directive</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;hasPermission&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">  bind</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">el</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">binding</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">vnode</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">    el</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">parentNode</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> ?</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> el</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">parentNode</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">removeChild</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">el</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">:</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> el</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">style</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">display</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;none&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> permissions</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> vnode</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">context</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">$store</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">state</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">account</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">permissions</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">; </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 存放在vuex</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    if</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">binding</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">value</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> ===</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">return</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> value</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> binding</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">value</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">split</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;,&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    let</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> flag</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> true</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    for</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> v</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> of</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> value</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">      if</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">!</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">permissions</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">includes</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">v</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">)) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">        flag</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> false</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">      }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    if</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">!</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flag</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">});</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 使用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">v</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">hasPermission</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;[1,2,3,4,5]&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="vue-router报错uncaught-in-promise-及解决方法" tabindex="-1">vue-router报错Uncaught (in promise)及解决方法 <a class="header-anchor" href="#vue-router报错uncaught-in-promise-及解决方法" aria-label="Permalink to &quot;vue-router报错Uncaught (in promise)及解决方法&quot;">​</a></h2><p>问题：</p><p>在升级了Vue-Router版本到到3.1.0及以上之后，页面在跳转路由控制台会报Uncaught (in promise)的问题。</p><p>看vue-router的版本更新日志</p><p>V3.1.0版本里面新增功能：push和replace方法会返回一个promise, 你可能在控制台看到未捕获的异常。</p><p><img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h2er9ktpx8j21fc0dmage.jpg" alt=""></p><p>解决：</p><p>方法一：在调用方法的时候用catch捕获异常</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">this</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">$router</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">replace</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;/login&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">).</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">catch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">err</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> =&gt;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">   console</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">log</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">err</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>方法二：对Router原型链上的push、replace方法进行重写，这样就不用每次调用方法都要加上catch</p><p>在router.js加入以下内容：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> originalPush</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> VueRouter</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">prototype</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">push</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">VueRouter</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">prototype</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">push</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> function</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> push</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">location</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">  return</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> originalPush</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">call</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">this</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">location</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">).</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">catch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">((</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">err</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">=&gt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> err</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">};</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> originalReplace</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> VueRouter</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">prototype</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">replace</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">VueRouter</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">prototype</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">replace</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> function</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> replace</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">location</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">  return</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> originalReplace</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">call</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">this</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">location</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">).</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">catch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">err</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> =&gt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> err</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="在vue中watch和created哪个先执行-为什么" tabindex="-1">在vue中watch和created哪个先执行？为什么？ <a class="header-anchor" href="#在vue中watch和created哪个先执行-为什么" aria-label="Permalink to &quot;在vue中watch和created哪个先执行？为什么？&quot;">​</a></h2><p>官网的生命周期图中，init reactivity是晚于beforeCreate但是早于created的。</p><p>watch加了immediate，应当同init reactivity周期一同执行，早于created。</p><p>而正常的watch，则是mounted周期后触发data changes的周期执行，晚于created。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Frame/vue/problem.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const problem = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  problem as default
};
