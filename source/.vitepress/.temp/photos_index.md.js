import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"photos/index.md","filePath":"photos/index.md","lastUpdated":1714231776000}');
const _sfc_main = { name: "photos/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/0.jpg" alt="1"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/1.jpg" alt="2"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/2.jpg" alt="3"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/3.jpg" alt="4"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/4.jpg" alt="5"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/5.jpg" alt="6"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/6.jpg" alt="7"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/7.jpg" alt="8"><img src="https://gcore.jsdelivr.net/gh/hzfvictory/cdn@master/newBlog/img/banner/8.jpg" alt="9"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("photos/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
