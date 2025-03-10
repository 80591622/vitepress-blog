import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"todos","description":"","frontmatter":{"title":"todos","date":"2019-05-17T09:30:03.000Z","top_img":"https://ae01.alicdn.com/kf/H003c7b4cc9df4772b376137cef90e4d1h.jpg"},"headers":[],"relativePath":"todos/index.md","filePath":"todos/index.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "todos/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>{% note primary no-icon %} <a href="https://zhuanlan.zhihu.com/p/141576317?utm_source=wechat_session&amp;utm_medium=social&amp;utm_oi=552476838291750912" target="_blank" rel="noreferrer">微前端</a><a href="https://xiaomi-info.github.io/2020/04/14/fe-microfrontends-practice/" target="_blank" rel="noreferrer">小米信息部技术团队</a> vue3.0源码分析 监测系统 <a href="http://www.ruanyifeng.com/blog/2019/08/web_components.html" target="_blank" rel="noreferrer">web_components</a><a href="https://mp.weixin.qq.com/s?__biz=MjM5NDgyODI4MQ==&amp;mid=2247483741&amp;idx=1&amp;sn=5b070192eae97e4cbf0cb3761d84a134&amp;chksm=a6809bcb91f712dd76a465cb619835bfcf5aea8df31c88ac528b0e0d8f68fb5418392da9ee01&amp;mpshare=1&amp;scene=1&amp;srcid=0910403oG2nFNtp9cTRVSIj6&amp;sharer_sharetime=1599710298583&amp;sharer_shareid=045014b21b7413c8e164a582e4128446#rd" target="_blank" rel="noreferrer">前端技术未来三年前瞻性思考</a> {% endnote %}v</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("todos/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
