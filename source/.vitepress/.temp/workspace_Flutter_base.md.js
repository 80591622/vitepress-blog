import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Flutter基础","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Flutter/base.md","filePath":"workspace/Flutter/base.md","lastUpdated":1714231776000}');
const _sfc_main = { name: "workspace/Flutter/base.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="flutter基础" tabindex="-1">Flutter基础 <a class="header-anchor" href="#flutter基础" aria-label="Permalink to &quot;Flutter基础&quot;">​</a></h1><h2 id="待总结" tabindex="-1">待总结 <a class="header-anchor" href="#待总结" aria-label="Permalink to &quot;待总结&quot;">​</a></h2></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Flutter/base.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const base = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  base as default
};
