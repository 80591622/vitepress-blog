import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/img/jiaohu.png";
const _imports_1 = "/img/bff.png";
const __pageData = JSON.parse('{"title":"GraphQL","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/api/GraphQL.md","filePath":"workspace/Server/api/GraphQL.md","lastUpdated":1715005148000}');
const _sfc_main = { name: "workspace/Server/api/GraphQL.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="graphql" tabindex="-1">GraphQL <a class="header-anchor" href="#graphql" aria-label="Permalink to &quot;GraphQL&quot;">​</a></h1><h2 id="bff-——-backend-for-frontend" tabindex="-1">BFF —— Backend For Frontend <a class="header-anchor" href="#bff-——-backend-for-frontend" aria-label="Permalink to &quot;BFF —— Backend For Frontend&quot;">​</a></h2><p><code>BFF，即 Backend For Frontend（服务于前端的后端）,BFF 只是一种逻辑分层，而非一种技术</code></p><p><img style="${ssrRenderStyle({ "width": "50%", "transform": "translateX(50%)" })}"${ssrRenderAttr("src", _imports_0)}></p><p>此时为了保障多端的不同需求，需要为不同的平台写不同的 API 接口， 而每当值发生一些变化时，需要多段同时做出修改,这样的代价显然相当大。</p><p>于是，我们就需要 BFF 作为中间件。在这个中间件上我们将做一些业务逻辑处理</p><p>而当我们有了 BFF 这一层时，我们就不需要考虑系统后端的迁移。后端发生的变化都可以在 BFF 层做一些响应的修改。</p><p><img style="${ssrRenderStyle({ "width": "50%", "transform": "translateX(50%)" })}"${ssrRenderAttr("src", _imports_1)}></p><h2 id="graphql-语言设计中的必然性" tabindex="-1">GraphQL 语言设计中的必然性 <a class="header-anchor" href="#graphql-语言设计中的必然性" aria-label="Permalink to &quot;GraphQL 语言设计中的必然性&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>查询语法跟查询结果相近（自定义接口数据的字段）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>能精确查询想要的字段（请求你所要的数据不多不少）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>能合并多个请求到一个查询语句（获取多个资源只用一个请求）</span></span>
<span class="line"><span></span></span>
<span class="line highlighted"><span>无接口版本管理问题（升级迭代几乎没影响）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码即文档。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>强大的开发者工具</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><a href="https://graphql.cn/graphql-js/" target="_blank" rel="noreferrer">文档</a></p><p><a href="https://mp.weixin.qq.com/s/8FgP1LeO6eDd8xuIMGzIIA" target="_blank" rel="noreferrer">博客</a></p><h2 id="react需要的技术栈" tabindex="-1">react需要的技术栈 <a class="header-anchor" href="#react需要的技术栈" aria-label="Permalink to &quot;react需要的技术栈&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">apollo</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">boost</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> 包含启动阿波罗客户端的所有依赖</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">react</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">apollo</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">  视图层面的集合</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">graphql</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">tag</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">  解析查询语句必须</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">graphql</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> 也是解析查询语句</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Server/api/GraphQL.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GraphQL = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  GraphQL as default
};
