import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"项目使用总结","description":"","frontmatter":{"abbrlink":"45502620","title":"项目使用总结","date":"2020-03-11T00:00:00.000Z","categories":["FE框架","Vue"]},"headers":[],"relativePath":"workspace/Frame/vue/use-project.md","filePath":"workspace/Frame/vue/use-project.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Frame/vue/use-project.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Frame/vue/use-project.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useProject = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  useProject as default
};
