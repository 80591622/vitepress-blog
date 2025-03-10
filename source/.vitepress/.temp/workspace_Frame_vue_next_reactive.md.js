import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"reactive","description":"","frontmatter":{"abbrlink":"e74943f3","title":"reactive","date":"2020-03-17T00:00:00.000Z","hidden":true,"categories":["FE框架","Vue","源码分析"]},"headers":[],"relativePath":"workspace/Frame/vue/next/reactive.md","filePath":"workspace/Frame/vue/next/reactive.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Frame/vue/next/reactive.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Frame/vue/next/reactive.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reactive = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  reactive as default
};
