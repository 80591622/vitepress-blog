import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Flex弹性布局","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Css/flex.md","filePath":"workspace/Css/flex.md","lastUpdated":1714231776000}');
const _sfc_main = { name: "workspace/Css/flex.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="flex弹性布局" tabindex="-1">Flex弹性布局 <a class="header-anchor" href="#flex弹性布局" aria-label="Permalink to &quot;Flex弹性布局&quot;">​</a></h1><p><strong><code>容器的属性</code></strong></p><h2 id="flex-direction属性" tabindex="-1">flex-direction属性 <a class="header-anchor" href="#flex-direction属性" aria-label="Permalink to &quot;flex-direction属性&quot;">​</a></h2><p><code>flex-direction</code>属性决定主轴的方向（即项目的排列方向）。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.box</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  flex-direction: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">row</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">row-reverse</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">column</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">column-reverse</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">row（默认值）：主轴为水平方向，起点在左端。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">row-reverse</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：主轴为水平方向，起点在右端。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">column：主轴为垂直方向，起点在上沿。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">column-reverse</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：主轴为垂直方向，起点在下沿。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="flex-wrap属性" tabindex="-1">flex-wrap属性 <a class="header-anchor" href="#flex-wrap属性" aria-label="Permalink to &quot;flex-wrap属性&quot;">​</a></h2><p>默认情况下，项目都排在一条线（又称&quot;轴线&quot;）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.box</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  flex-wrap: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">nowrap</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">wrap</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">wrap-reverse</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">nowrap（默认）：不换行。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">wrap：换行，第一行在上方。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">wrap-reverse</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：换行，第一行在下方。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="flex-flow属性" tabindex="-1">flex-flow属性 <a class="header-anchor" href="#flex-flow属性" aria-label="Permalink to &quot;flex-flow属性&quot;">​</a></h2><p><code>flex-flow</code>属性是<code>flex-direction</code>属性和<code>flex-wrap</code>属性的简写形式，默认值为<code>row nowrap</code>。</p><h2 id="justify-content属性" tabindex="-1">justify-content属性 <a class="header-anchor" href="#justify-content属性" aria-label="Permalink to &quot;justify-content属性&quot;">​</a></h2><p><code>justify-content</code>属性定义了项目在主轴上的对齐方式。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.box</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  justify-content: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">center</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">space-between</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">space-around</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">（默认值）：左对齐</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：右对齐</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">center： 居中</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">space-between</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：两端对齐，项目之间的间隔都相等。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">space-around</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="align-items属性" tabindex="-1">align-items属性 <a class="header-anchor" href="#align-items属性" aria-label="Permalink to &quot;align-items属性&quot;">​</a></h2><p><code>align-items</code>属性定义项目在交叉轴上如何对齐。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.box</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  align-items: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">center</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">baseline</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">stretch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：交叉轴的起点对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：交叉轴的终点对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">center：交叉轴的中点对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">baseline: 项目的第一行文字的基线对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="align-content属性" tabindex="-1">align-content属性 <a class="header-anchor" href="#align-content属性" aria-label="Permalink to &quot;align-content属性&quot;">​</a></h2><p><code>align-content</code>属性定义了<code>多根轴线</code>的对齐方式。如果项目只有一根轴线，该属性不起作用。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.box</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  align-content: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">center</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">space-between</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">space-around</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">stretch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：与交叉轴的起点对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：与交叉轴的终点对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">center：与交叉轴的中点对齐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">space-between</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：与交叉轴两端对齐，轴线之间的间隔平均分布。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">space-around</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">stretch（默认值）：轴线占满整个交叉轴。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>适用于弹性盒模型容器子元素</strong></p><h2 id="order属性" tabindex="-1">order属性 <a class="header-anchor" href="#order属性" aria-label="Permalink to &quot;order属性&quot;">​</a></h2><p><code>order</code>属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.item</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  order: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">0</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="flex-grow属性" tabindex="-1">flex-grow属性 <a class="header-anchor" href="#flex-grow属性" aria-label="Permalink to &quot;flex-grow属性&quot;">​</a></h2><p><code>flex-grow</code>属性定义项目的放大比例，默认为<code>0</code>，即如果存在**<code>剩余空间</code>**，也不放大。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.item</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  flex-grow: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">0</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div> <br><img style="${ssrRenderStyle({ "border": ".3em solid #e0dfcc", "border-radius": "1em" })}" src="https://ae01.alicdn.com/kf/H71fcbd2221b642a6bc7f52d3170378239.png"><p>如果所有项目的<code>flex-grow</code>属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的<code>flex-grow</code>属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。</p><h2 id="flex-shrink属性" tabindex="-1">flex-shrink属性 <a class="header-anchor" href="#flex-shrink属性" aria-label="Permalink to &quot;flex-shrink属性&quot;">​</a></h2><p><code>flex-shrink</code>属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.item</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  flex-shrink: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">1</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><br><img style="${ssrRenderStyle({ "border": ".3em solid #e0dfcc", "border-radius": "1em" })}" src="https://ae01.alicdn.com/kf/H245bfecf53234ecba3042bd2f74545efo.jpg"><p>如果所有项目的<code>flex-shrink</code>属性都为1，当空间不足时，都将等比例缩小。如果一个项目的<code>flex-shrink</code>属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。</p><h2 id="flex-basis属性" tabindex="-1">flex-basis属性 <a class="header-anchor" href="#flex-basis属性" aria-label="Permalink to &quot;flex-basis属性&quot;">​</a></h2><p>flex-basis表示在flex items 被放入flex容器之前的大小，也就是items的理想或者假设大小，但是并不是其真实大小， 其真实大小取决于flex容器的宽度，flex items的min-width,max-width等其他样式，具体分析看下文</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">#main {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    width: 350px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    height: 100px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    border: 1px solid #c3c3c3;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    display: flex;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">#main div {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    flex-grow: 0;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    flex-shrink: 0;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    flex-basis: 40px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">#main div:nth-of-type(2) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    flex-basis: 80px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> id</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;main&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> style</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;background-color:coral;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> style</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;background-color:lightblue;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> style</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;background-color:khaki;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> style</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;background-color:pink;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> style</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;background-color:lightgrey;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><img src="https://ae01.alicdn.com/kf/H8ca6768902df41ecb593aec7f900645ad.png" alt=""></p><h2 id="flex属性" tabindex="-1">flex属性 <a class="header-anchor" href="#flex属性" aria-label="Permalink to &quot;flex属性&quot;">​</a></h2><p><code>flex</code>属性是<code>flex-grow</code>, <code>flex-shrink</code> 和 <code>flex-basis</code>的简写，默认值为0 1 auto。后两个属性可选。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.item</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  flex: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">none</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | [ &lt;</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;flex-grow&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt; &lt;</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;flex-shrink&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;? || &lt;</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;flex-basis&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt; ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="align-self属性" tabindex="-1">align-self属性 <a class="header-anchor" href="#align-self属性" aria-label="Permalink to &quot;align-self属性&quot;">​</a></h2><p><code>align-self</code>属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D19A66" })}">.item</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  align-self: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">auto</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-start</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">flex-end</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">center</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">baseline</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> | </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">stretch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><br><img style="${ssrRenderStyle({ "border": ".3em solid #e0dfcc", "border-radius": "1emwidth：98%" })}" src="https://ae01.alicdn.com/kf/Hedafd4f059f24e8cb9093252cad6f53an.png"></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Css/flex.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const flex = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  flex as default
};
