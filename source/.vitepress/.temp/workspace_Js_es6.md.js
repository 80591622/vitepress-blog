import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"ES6-新增特性一览","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Js/es6.md","filePath":"workspace/Js/es6.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Js/es6.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="es6-新增特性一览" tabindex="-1">ES6-新增特性一览 <a class="header-anchor" href="#es6-新增特性一览" aria-label="Permalink to &quot;ES6-新增特性一览&quot;">​</a></h1><h2 id="_1-let-const取代var" tabindex="-1">1. let/const取代var <a class="header-anchor" href="#_1-let-const取代var" aria-label="Permalink to &quot;1. let/const取代var&quot;">​</a></h2><h2 id="_2-字符串模板" tabindex="-1">2. 字符串模板 <a class="header-anchor" href="#_2-字符串模板" aria-label="Permalink to &quot;2. 字符串模板&quot;">​</a></h2><h2 id="_3-对象解构" tabindex="-1">3. 对象解构 <a class="header-anchor" href="#_3-对象解构" aria-label="Permalink to &quot;3. 对象解构&quot;">​</a></h2><h2 id="_4-新数据类型-symbol" tabindex="-1">4. 新数据类型 Symbol <a class="header-anchor" href="#_4-新数据类型-symbol" aria-label="Permalink to &quot;4. 新数据类型 Symbol&quot;">​</a></h2><h2 id="_5-新数据结构map-set-weakmap-weakset" tabindex="-1">5. 新数据结构<a href="https://github.com/lukehoban/es6features#map--set--weakmap--weakset" target="_blank" rel="noreferrer">Map/Set/WeakMap/WeakSet</a> <a class="header-anchor" href="#_5-新数据结构map-set-weakmap-weakset" aria-label="Permalink to &quot;5. 新数据结构[Map/Set/WeakMap/WeakSet](https://github.com/lukehoban/es6features#map--set--weakmap--weakset)&quot;">​</a></h2><h2 id="_6-proxy、reflect" tabindex="-1">6. <a href="https://github.com/lukehoban/es6features#proxies" target="_blank" rel="noreferrer">Proxy</a>、<a href="https://www.cnblogs.com/zczhangcui/p/6486582.html" target="_blank" rel="noreferrer">Reflect</a> <a class="header-anchor" href="#_6-proxy、reflect" aria-label="Permalink to &quot;6. [Proxy](https://github.com/lukehoban/es6features#proxies)、[Reflect](https://www.cnblogs.com/zczhangcui/p/6486582.html)&quot;">​</a></h2><h2 id="_7-扩展" tabindex="-1">7. 扩展 <a class="header-anchor" href="#_7-扩展" aria-label="Permalink to &quot;7. 扩展&quot;">​</a></h2><ul><li><p>字符串填充（padStart 和 padEnd）</p></li><li><p>Array</p><ul><li>Array.from()</li><li>Array.of()</li><li>Array.copyWithin()</li><li>Array.find()</li><li>Array.findIndex()</li><li>Array.fill()</li><li>Array.includes()<sup><code>ES7</code></sup></li></ul></li><li><p>Object</p><ul><li>Object.keys()</li><li>Object.values()<sup><code>ES8</code></sup></li><li>Object.entries()<sup><code>ES8</code></sup></li><li>Object.assign()</li><li>Object. is()</li></ul></li></ul><h2 id="_8-异步" tabindex="-1">8. 异步 <a class="header-anchor" href="#_8-异步" aria-label="Permalink to &quot;8. 异步&quot;">​</a></h2><ul><li><a href="https://github.com/lukehoban/es6features#promises" target="_blank" rel="noreferrer">Promise</a><ul><li>Promise.prototype.then</li><li>Promise.prototype.catch</li><li>Promise.prototype.finally<sup><code>ES9</code></sup></li><li>Promise.all()</li><li>Promise.rece()</li></ul></li><li><a href="https://github.com/lukehoban/es6features#iterators--forof" target="_blank" rel="noreferrer">Iterator</a><ul><li>Iterator接口</li><li>for of</li></ul></li><li><a href="https://github.com/lukehoban/es6features#generators" target="_blank" rel="noreferrer">Generator</a><ul><li>yield*</li></ul></li><li>async/await<sup><code>ES8</code></sup></li></ul><h2 id="_9-class类" tabindex="-1">9. Class类 <a class="header-anchor" href="#_9-class类" aria-label="Permalink to &quot;9. Class类&quot;">​</a></h2><ul><li>class</li><li>extends</li><li>decorator<sup><code>ES7</code></sup></li></ul><h2 id="_10-module" tabindex="-1">10. Module <a class="header-anchor" href="#_10-module" aria-label="Permalink to &quot;10. Module&quot;">​</a></h2><ul><li>import</li><li>export</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// export default 方式</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> defaultName</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> from</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;modules.js&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// export type 方式</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> { </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">export1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">export2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> } </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">from</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;modules&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> { </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">export1</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> as</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> ex1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">export2</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> as</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> ex2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> } </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">from</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;moduls.js&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">; </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// as 关键字</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> *</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> as</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> moduleName</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> from</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;modules.js&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 同时引入export default 和export type</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> defaultName</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, { </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">expoprt1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">export2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> } </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">from</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;modules&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> defaultName</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">， </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">*</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> as</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> moduleName</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> from</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;modules&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 引入无输出模块</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">import</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;modules&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="参考文档" tabindex="-1">参考文档 <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档&quot;">​</a></h2><ul><li><p><a href="https://zhuanlan.zhihu.com/p/87699079" target="_blank" rel="noreferrer">司徒正美</a></p></li><li><p><a href="https://github.com/lukehoban/es6features" target="_blank" rel="noreferrer">es6features</a></p></li><li><p><a href="https://github.com/tc39/proposals/blob/master/finished-proposals.md" target="_blank" rel="noreferrer">Finished Proposals</a></p></li><li><p><a href="http://es6.ruanyifeng.com/#docs/reference" target="_blank" rel="noreferrer">ryf es6 reference</a></p></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Js/es6.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const es6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  es6 as default
};
