import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const A=JSON.parse('{"title":"基于Vue的组件局部刷新","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Frame/vue/reload.md","filePath":"workspace/Frame/vue/reload.md","lastUpdated":1713942612000}'),p={name:"workspace/Frame/vue/reload.md"},e=l(`<h1 id="基于vue的组件局部刷新" tabindex="-1">基于Vue的组件局部刷新 <a class="header-anchor" href="#基于vue的组件局部刷新" aria-label="Permalink to &quot;基于Vue的组件局部刷新&quot;">​</a></h1><p>之前做keepalive，组件destroy销毁后，就不会缓存该页面了，解决的办法就是刷新当前的页面，一种是原始的刷新方式，一种就是基于框架本身的局部刷新，今天完善下基于vue的局部刷新。</p><p>我上次省事在做keepalive的时候，直接在页面内部做的局部刷新，具体看<a href="https://juejin.im/post/6844904178926485511#heading-7" target="_blank" rel="noreferrer">这大概是最全乎的keep-alive踩坑指南</a> ,实现的思路就是重置所有的data,然后在配合v-if,就能做到局部的刷新，然后可以自己定义一个mixins代码也是很简洁的，但是还是要每次都引入mixins,现在用另一种方式重新优化，原理跟上面的那个方法类似。</p><p><strong>第一步 : 在 app.vue 中定义全局方法:如下</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#D19A66;font-style:italic;"> id</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;app&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E5C07B;">router-view</span><span style="color:#D19A66;font-style:italic;"> v-if</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;isRouterAlive&quot;</span><span style="color:#ABB2BF;">/&gt;    //通过v-if来控制容器的出现与消失</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">export default </span><span style="color:#C678DD;">{</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;App&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#61AFEF;">  provide</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    // 通过provide传递给子代，谁需要谁获取下就OK了</span></span>
<span class="line"><span style="color:#ABB2BF;">    return {</span></span>
<span class="line"><span style="color:#E06C75;">      reload</span><span style="color:#ABB2BF;">:</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">reload</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#61AFEF;">  data</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#ABB2BF;">    return{</span></span>
<span class="line"><span style="color:#E06C75;">      isRouterAlive</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#E06C75;">  methods</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#61AFEF;">   reload</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#E5C07B;">     this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">isRouterAlive</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> false</span></span>
<span class="line"><span style="color:#E5C07B;">     this</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">$nextTick</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> (</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">isRouterAlive</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> true</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#ABB2BF;">   }   </span></span>
<span class="line"><span style="color:#ABB2BF;"> }</span></span>
<span class="line"><span style="color:#C678DD;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>我们定义了全局的方法 reload( ); 原理就是通过控制组件容器的出现与消失, 达到重新渲染的效果 , 从而实现我们的目的;</p><p><strong>第二步:在全局中定义了刷新的方法, 接下来就是要引入到需要刷新的组件中:</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">export default </span><span style="color:#C678DD;">{</span></span>
<span class="line"><span style="color:#E06C75;">  inject</span><span style="color:#ABB2BF;">:[</span><span style="color:#98C379;">&quot;reload&quot;</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#61AFEF;">  data</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    return {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#61AFEF;">  mounted</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    this.reload();</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>通过 <strong>inject 方法</strong>引入到需要的组件中, 直接<strong>this.reload()</strong> 调用这个方法即可.</p>`,9),o=[e];function r(t,c,B,i,y,b){return a(),n("div",null,o)}const F=s(p,[["render",r]]);export{A as __pageData,F as default};