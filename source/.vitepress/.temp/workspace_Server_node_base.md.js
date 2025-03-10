import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"NodeJs的原生方法","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/node/base.md","filePath":"workspace/Server/node/base.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Server/node/base.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="nodejs的原生方法" tabindex="-1">NodeJs的原生方法 <a class="header-anchor" href="#nodejs的原生方法" aria-label="Permalink to &quot;NodeJs的原生方法&quot;">​</a></h1><h2 id="process-argv" tabindex="-1">process.argv <a class="header-anchor" href="#process-argv" aria-label="Permalink to &quot;process.argv&quot;">​</a></h2><p>process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。</p><p>process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，</p><p>其中：</p><p>数组的第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径</p><p>第二个元素process.argv[1]——为当前执行的JavaScript文件路径</p><p>剩余的元素为其他命令行参数</p><p>例如：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 输入</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">node</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> config</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">js</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> aaaa</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> bbbb</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> cccc</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">process</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">argv</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 输出</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">[</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &#39;/usr/local/bin/node&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &#39;/Users/wk/workspace/zy-vue/babel.config.js&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &#39;aaaa&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &#39;bbbb&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &#39;cccc&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="fs" tabindex="-1">fs <a class="header-anchor" href="#fs" aria-label="Permalink to &quot;fs&quot;">​</a></h2><p><img src="https://tva1.sinaimg.cn/large/008vxvgGgy1h8tcp0epc6j31q70u045s.jpg" alt="image-20221205231721390"></p><p>fs.promises API 提供了一组备用的异步文件系统的方法，它们返回 Promise 对象而不是使用回调。 API 可通过 require(&#39;fs&#39;).promises 访问。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Server/node/base.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const base = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  base as default
};
