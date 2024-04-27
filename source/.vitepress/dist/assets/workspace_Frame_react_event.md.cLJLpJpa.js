import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const d=JSON.parse('{"title":"react事件委托机制","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Frame/react/event.md","filePath":"workspace/Frame/react/event.md","lastUpdated":1713942612000}'),p={name:"workspace/Frame/react/event.md"},e=l(`<h1 id="react事件委托机制" tabindex="-1">react事件委托机制 <a class="header-anchor" href="#react事件委托机制" aria-label="Permalink to &quot;react事件委托机制&quot;">​</a></h1><h2 id="为什么要用事件委托" tabindex="-1">为什么要用事件委托 <a class="header-anchor" href="#为什么要用事件委托" aria-label="Permalink to &quot;为什么要用事件委托&quot;">​</a></h2><p>一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，那如果是很多的dom需要添加事件处理呢？比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历，这样的话每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，如果数量更大的话就gg了。</p><h2 id="事件委托的作用" tabindex="-1">事件委托的作用 <a class="header-anchor" href="#事件委托的作用" aria-label="Permalink to &quot;事件委托的作用&quot;">​</a></h2><ul><li>支持为同一个DOM元素注册多个同类型事件</li><li>可将事件分成事件捕获和事件冒泡机制</li></ul><h2 id="dom-绑定事件" tabindex="-1">dom 绑定事件 <a class="header-anchor" href="#dom-绑定事件" aria-label="Permalink to &quot;dom 绑定事件&quot;">​</a></h2><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">div</span><span style="color:#D19A66;"> class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;div1&quot;</span><span style="color:#ABB2BF;">&gt;&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>onclick</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E5C07B;">div1</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">onclick</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印第一次&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#E5C07B;">div1</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">onclick</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印第二次&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//结果是第二个点击注册事件覆盖了第一个点击事件,只执行了console.log(&#39;打印第二次&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>DOM 2 实现</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">,</span><span style="color:#E06C75;">listener</span><span style="color:#ABB2BF;">,</span><span style="color:#E06C75;">useCapture</span><span style="color:#ABB2BF;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E5C07B;">div1</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">,</span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">   console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印第一次&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span>
<span class="line"><span style="color:#E5C07B;">div1</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">,</span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印第二次&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//可以看到两个注册事件都会成功触发</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="事件捕获和事件冒泡机制" tabindex="-1">事件捕获和事件冒泡机制 <a class="header-anchor" href="#事件捕获和事件冒泡机制" aria-label="Permalink to &quot;事件捕获和事件冒泡机制&quot;">​</a></h2><p><strong>事件捕获</strong><br> 当一个事件触发后,从Window对象触发,不断经过下级节点,直到目标节点。在事件到达目标节点之前的过程就是捕获阶段。所有经过的节点,都会触发对应的事件</p><p><strong>事件冒泡</strong><br> 当事件到达目标节点后，会沿着捕获阶段的路线原路返回。同样，所有经过的节点,都会触发对应的事件</p><p><img src="https://ae01.alicdn.com/kf/H872695a92b914492ab8ba0d9783368cdg.jpg" alt=""></p><p>上面的<code>addEventListener</code>的第三个参数就是设置是捕获还是冒泡阶段，默认是false是<code>冒泡阶段</code>，当设为true的时候是<code>事件捕获</code></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E5C07B;">body</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">,</span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印body&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">},</span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#E5C07B;">div1</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">,</span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印div1&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 打印body   打印div1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="addeventlistener-和-onclick的区别" tabindex="-1">addEventListener() 和 onclick的区别 <a class="header-anchor" href="#addeventlistener-和-onclick的区别" aria-label="Permalink to &quot;addEventListener() 和 onclick的区别&quot;">​</a></h2><ul><li>onclick 不能同时执行两个函数，addEventListener()可以执行两个不同的函数</li><li>移除事件侦听的方式不同 (onclick直接覆盖就行 ，addEventListener用removeEventListener移除)</li><li>addEventListener可以在捕获阶段和冒泡阶段触发，而onclick只能冒泡阶段触发</li><li>onclick支持IE低版本，addEventListener不支持IE8一下，低版本的IE使用 attachEvent 进行事件侦听；使用 detachEvent 移除事件侦听。</li></ul><h2 id="事件委托的优点" tabindex="-1">事件委托的优点 <a class="header-anchor" href="#事件委托的优点" aria-label="Permalink to &quot;事件委托的优点&quot;">​</a></h2><p><strong>提高性能</strong> 每一个函数都会占用内存空间，只需添加一个事件处理程序代理所有事件,所占用的内存空间更少。 <strong>动态监听</strong> 使用事件委托可以自动绑定动态添加的元素,即新增的节点不需要主动添加也可以一样具有和其他元素一样的事件。</p><h2 id="react的事件委托机制" tabindex="-1">react的事件委托机制 <a class="header-anchor" href="#react的事件委托机制" aria-label="Permalink to &quot;react的事件委托机制&quot;">​</a></h2><p>react事件机制分为两个部分：<strong>1、事件注册 2、事件分发</strong></p><p><strong>事件注册</strong>部分，所有的事件都会注册到document上，拥有统一的回调函数dispatchEvent来执行事件分发</p><p><strong>事件分发</strong>部分，首先生成合成事件，注意同一种事件类型只能生成一个合成事件<code>Event</code>，如<code>onClick</code>这个类型的事件，dom上所有带有通过jsx绑定的<code>onClick</code>的回调函数都会按顺序（冒泡或者捕获）会放到<code>Event._dispatchListeners</code> 这个数组里，后面依次执行它。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;"> componentDidMount</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">    document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">      console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;document click&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    })</span></span>
<span class="line"><span style="color:#E5C07B;">    document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">getElementsByClassName</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;App&#39;</span><span style="color:#ABB2BF;">)[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">      console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;app click&#39;</span><span style="color:#ABB2BF;">) </span></span>
<span class="line"><span style="color:#ABB2BF;">    })</span></span>
<span class="line"><span style="color:#E5C07B;">    document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">getElementsByTagName</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;button&#39;</span><span style="color:#ABB2BF;">)[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">){</span></span>
<span class="line"><span style="color:#E5C07B;">      console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;button click&#39;</span><span style="color:#ABB2BF;">)  </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      // e.stopPropagation();</span></span>
<span class="line"><span style="color:#ABB2BF;">    })</span></span>
<span class="line"><span style="color:#ABB2BF;">  } </span></span>
<span class="line"><span style="color:#61AFEF;">  onClick</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E5C07B;">    e</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stopPropagation</span><span style="color:#ABB2BF;">() </span><span style="color:#7F848E;font-style:italic;">// 能够阻止div.app的触发</span></span>
<span class="line"><span style="color:#E5C07B;">    e</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">nativeEvent</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stopImmediatePropagation</span><span style="color:#ABB2BF;">(); </span><span style="color:#7F848E;font-style:italic;">// nativeEvent是原生的事件 ， 能够阻止document的触发  </span></span>
<span class="line"><span style="color:#E5C07B;">    e</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">nativeEvent</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stopPropagation</span><span style="color:#ABB2BF;">(); </span><span style="color:#7F848E;font-style:italic;">// 什么都阻止不了,因为onClick合成事件都会注册到document上</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;react button click&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  };</span></span>
<span class="line"><span style="color:#61AFEF;">  render</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#C678DD;">    return</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E06C75;">div</span><span style="color:#D19A66;font-style:italic;"> className</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;App&quot;</span><span style="color:#D19A66;font-style:italic;"> onClick</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;react app click&#39;</span><span style="color:#ABB2BF;">)}</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">button</span><span style="color:#D19A66;font-style:italic;"> onClick</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">onClick</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;">&gt;按钮&lt;/</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    );</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // button click -&gt; app click -&gt; react button click</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><strong>看下实现封步骤</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">let</span><span style="color:#E06C75;"> vdom</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E06C75;">  type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;div&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  props</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#61AFEF;">    onClick</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){ </span><span style="color:#7F848E;font-style:italic;">//合成事件</span></span>
<span class="line"><span style="color:#E5C07B;">      console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;react app click&#39;</span><span style="color:#ABB2BF;">)    </span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#E06C75;">    children</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">      {</span></span>
<span class="line"><span style="color:#E06C75;">        type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;button&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        props</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#61AFEF;">           onClick</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#E5C07B;">              console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;react button click&#39;</span><span style="color:#ABB2BF;">)    </span></span>
<span class="line"><span style="color:#ABB2BF;">           }</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">      }</span></span>
<span class="line"><span style="color:#ABB2BF;">    ]</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>注册事件</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">bankForRegistrationName</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> { </span><span style="color:#7F848E;font-style:italic;">// 回调事件的保存</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 数字是_debugID,react用于识别每一个dom</span></span>
<span class="line"><span style="color:#D19A66;">    5</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#61AFEF;">      click</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">        console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;react app click&#39;</span><span style="color:#ABB2BF;">)    </span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#D19A66;">    6</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#61AFEF;">      click</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#E5C07B;">        console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;react button click&#39;</span><span style="color:#ABB2BF;">)    </span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>事件触发</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 合成事件简单实现</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#61AFEF;"> SyntheticEvent</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  ...</span></span>
<span class="line"><span style="color:#E5C07B;">  this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">nativeEvent</span><span style="color:#56B6C2;"> =</span><span style="color:#E06C75;"> e</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  ...</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// e: event， type: 事件类型</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#61AFEF;"> dispatchEvent</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">type</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> synE</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> SyntheticEvent</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">e</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  // 执行监听事件</span></span>
<span class="line"><span style="color:#C678DD;">  let</span><span style="color:#E06C75;"> debugID</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> e</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">target</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">__reactInternalInstance$om8tco7dvl</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">_debugID</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">  bankForRegistrationName</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">debugID</span><span style="color:#ABB2BF;">][</span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">](</span><span style="color:#E06C75;">synE</span><span style="color:#ABB2BF;">); </span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// document事件委托</span></span>
<span class="line"><span style="color:#E5C07B;">document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">addEventListener</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#61AFEF;">  dispatchEvent</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">e</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;click&#39;</span><span style="color:#ABB2BF;">); </span><span style="color:#7F848E;font-style:italic;">// 总之最后是通过点击document做事件委托触发的</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="参考文档" tabindex="-1">参考文档 <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档&quot;">​</a></h3><p><a href="https://www.jianshu.com/p/b249793fd2a7" target="_blank" rel="noreferrer">https://www.jianshu.com/p/b249793fd2a7</a><br><a href="https://www.jianshu.com/p/c01756e520c7" target="_blank" rel="noreferrer">https://www.jianshu.com/p/c01756e520c7</a></p>`,35),o=[e];function c(r,t,B,i,y,F){return a(),n("div",null,o)}const A=s(p,[["render",c]]);export{d as __pageData,A as default};
