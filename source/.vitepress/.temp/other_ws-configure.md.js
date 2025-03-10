import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/img/ws-configure.webp";
const _imports_1 = "/img/ws-configure2.webp";
const _imports_2 = "/img/ws-configure3.webp";
const __pageData = JSON.parse('{"title":"配置WS","description":"","frontmatter":{},"headers":[],"relativePath":"other/ws-configure.md","filePath":"other/ws-configure.md","lastUpdated":1715005148000}');
const _sfc_main = { name: "other/ws-configure.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="配置ws" tabindex="-1">配置WS <a class="header-anchor" href="#配置ws" aria-label="Permalink to &quot;配置WS&quot;">​</a></h1><h3 id="webstorm-代码格式化设置与eslint-standard一致" tabindex="-1">webstorm 代码格式化设置与eslint standard一致 <a class="header-anchor" href="#webstorm-代码格式化设置与eslint-standard一致" aria-label="Permalink to &quot;webstorm 代码格式化设置与eslint standard一致&quot;">​</a></h3><p>新弄了个vue项目，使用的eslint是standard规范。</p><p>新建项目，用webstorm打开项目，顺利开搞，结果一到vue组件里，就报黄色叹号警告⚠️了。</p><p>这里就需要配置一下webstorm里的 <code>code style</code></p><p><code>command + &#39;,&#39; </code>打开设置 -&gt; <code>Editor</code></p><h2 id="配置js格式化规范" tabindex="-1">配置js格式化规范 <a class="header-anchor" href="#配置js格式化规范" aria-label="Permalink to &quot;配置js格式化规范&quot;">​</a></h2><p><img${ssrRenderAttr("src", _imports_0)} alt="1"><br><img${ssrRenderAttr("src", _imports_1)} alt="2"><br><img${ssrRenderAttr("src", _imports_2)} alt="3"></p><h2 id="配置html-vue组件" tabindex="-1">配置html/vue组件 <a class="header-anchor" href="#配置html-vue组件" aria-label="Permalink to &quot;配置html/vue组件&quot;">​</a></h2><p><img src="https://ae01.alicdn.com/kf/H0e31c6cdba2e4cf5b1430509f83ad1bcF.jpg" alt=""></p><p>在do not indent children of里加入script标签</p><p><img src="https://ae01.alicdn.com/kf/Ha11bf52407204bc496b2b54e4ba314eeM.jpg" alt=""></p><h2 id="配置当前项目的-eslint" tabindex="-1">配置当前项目的 eslint <a class="header-anchor" href="#配置当前项目的-eslint" aria-label="Permalink to &quot;配置当前项目的 eslint&quot;">​</a></h2><p><img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h2yl18g6y7j214q0u040n.jpg" alt=""></p><p>一定要勾选 Run eslint --fix on save</p><p>右击 或者 command + s 自动转译符合的格式。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("other/ws-configure.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wsConfigure = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  wsConfigure as default
};
