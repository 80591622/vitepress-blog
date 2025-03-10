import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"display:none opacity:0以及visibility:hidden的区别","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Css/hidden.md","filePath":"workspace/Css/hidden.md","lastUpdated":1714231776000}');
const _sfc_main = { name: "workspace/Css/hidden.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="display-none-opacity-0以及visibility-hidden的区别" tabindex="-1">display:none opacity:0以及visibility:hidden的区别 <a class="header-anchor" href="#display-none-opacity-0以及visibility-hidden的区别" aria-label="Permalink to &quot;display:none opacity:0以及visibility:hidden的区别&quot;">​</a></h1><p><strong>相同作用</strong> 能够对元素进行隐藏</p><h2 id="空间占据" tabindex="-1">空间占据 <a class="header-anchor" href="#空间占据" aria-label="Permalink to &quot;空间占据&quot;">​</a></h2><p>display:none;不占据空间，所以动态改变此属性时会引起重排。</p><p>visibility:hidden;元素会被隐藏，但是不会消失，依然占据空间。</p><p>opacity:0; 只是透明度为100%,元素隐藏，依然占据空间。</p><h2 id="继承性" tabindex="-1">继承性 <a class="header-anchor" href="#继承性" aria-label="Permalink to &quot;继承性&quot;">​</a></h2><p>display:none; 不会被子元素继承，但是父元素都不在了，子元素自然也就不会显示了，皮之不存，毛之安附~~</p><p>visibility:hidden; 会被子元素继承，可以通过设置子元素 visibility:visible 使子元素显示出来</p><p>opacity:0; 也会被子元素继承，但是不能通过设置子元素opacity:0 使其重新显示</p><h2 id="动画效果transition" tabindex="-1">动画效果transition <a class="header-anchor" href="#动画效果transition" aria-label="Permalink to &quot;动画效果transition&quot;">​</a></h2><p><strong>display</strong></p><p>dispaly不仅仅对transition 无效，还能使其失效</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> class</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;big-box&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> class</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;box  transition-display&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt; display&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">//css</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.transition-display{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">display: none;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">transition:display 2s; </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.transition-display:hover{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> display: block;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>**visibility **</p><p>visibility visibility:visible 过渡到 visibility:hidden，不能从 visibility:hidden 过渡到 visibility:visible 。</p><p>元素从隐藏到实现 不能实现动画效果</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">//html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> class</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;big-box&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> class</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;box  transition-visibility&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;visibility&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">div</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">//css</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.transition-visibility{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  visibility: hidden;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  transition: visibility 2s;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.transition-visibility:hover{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  visibility: visible;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>如果是元素从显示到隐藏 可以进行实现动画效果</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">// css</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.transition-visibility{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">   visibility: visible;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">   transition: visibility 1s;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.transition-visibility:hover{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  visibility: hidden;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>opacity</strong></p><p>对transition有效</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  .undisplay.blue {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    width: 200px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    height: 200px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    background: blue;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  .undisplay.yellow {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    width: 100px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    height: 100px;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    background: yellow;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    opacity: 0;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    //增加display</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    display: none;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    transition: 1s</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  .undisplay.blue:hover .yellow {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    opacity: 1;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    //增加display</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    display: block;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><table><thead><tr><th></th><th>display:none</th><th>visibility:hidden</th><th>opacity:0</th></tr></thead><tbody><tr><td>是否占据页面空间</td><td>否</td><td>是</td><td>是</td></tr><tr><td>子元素设置该属性其他值是否可以继续显示</td><td>否</td><td>是</td><td>否</td></tr><tr><td>自身绑定的事件能够出发</td><td>不能触发</td><td>不能触发</td><td>能触发</td></tr><tr><td>是否挡住其他元素出发事件</td><td>不影响</td><td>不影响</td><td>影响</td></tr><tr><td>是否产生回流（reflow)</td><td>产生</td><td>不产生</td><td>不产生</td></tr><tr><td>是否产生重绘</td><td>产生</td><td>产生</td><td>不一定产生</td></tr><tr><td>是否支持transition</td><td>不支持</td><td>支持 仅支持从 visibility:visible 过渡到 visibility:hidden，</td><td>支持</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Css/hidden.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const hidden = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  hidden as default
};
