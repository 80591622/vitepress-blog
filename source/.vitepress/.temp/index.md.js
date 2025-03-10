import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"wankor Blogscape ","actions":[{"theme":"brand","text":"Home","link":"/workspace/Js/home.html"}]},"features":[{"icon":"🛠️","title":"Feature A","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},{"icon":"⚡️","title":"Feature B","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},{"icon":"🌞","title":"Feature C","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1735889969000}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Layout = resolveComponent("Layout");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Layout, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
