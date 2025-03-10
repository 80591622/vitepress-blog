import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"会用到的插件","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Project/more.md","filePath":"workspace/Project/more.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Project/more.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="会用到的插件" tabindex="-1">会用到的插件 <a class="header-anchor" href="#会用到的插件" aria-label="Permalink to &quot;会用到的插件&quot;">​</a></h1><ul><li><p><a href="https://github.com/daneden/animate.css" target="_blank" rel="noreferrer">animate.css</a></p></li><li><p><a href="https://github.com/buildo/react-placeholder" target="_blank" rel="noreferrer">骨架屏</a></p></li><li><p><a href="https://github.com/dwqs/blog/issues/72" target="_blank" rel="noreferrer">react-virtualized</a></p></li><li><p><a href="http://www.ruanyifeng.com/blog/2018/07/indexeddb.html" target="_blank" rel="noreferrer">indexedDB</a></p></li><li><p><a href="http://graphql.cn/learn/" target="_blank" rel="noreferrer">GraphQL</a></p></li><li><p>移动端滚动</p><ul><li><a href="https://github.com/ustbhuangyi/better-scroll" target="_blank" rel="noreferrer">better-scroll</a>强大</li><li><a href="https://github.com/yiminghe/zscroller" target="_blank" rel="noreferrer">zscroller</a> antm内置的</li><li><a href="https://zynga.github.io/scroller" target="_blank" rel="noreferrer">scroller</a> zscroller就是基于这个</li></ul></li><li><p><a href="https://tylermcginnis.com/react-higher-order-components/" target="_blank" rel="noreferrer">高阶函数</a></p></li><li><p><a href="https://juejin.im/post/5c1a506d5188253ff1477d6f?utm_source=gold_browser_extension" target="_blank" rel="noreferrer">webpack</a></p></li><li><p><a href="http://www.typescriptlang.org/play/index.html" target="_blank" rel="noreferrer">typescript</a></p></li><li><p><a href="https://github.com/Tencent/vConsole/blob/dev/README_CN.md" target="_blank" rel="noreferrer">vConsole</a> 它是微信团队开源的一个轻量、可拓展、针对手机网页的前端开发者调试面板，</p><ul><li>主要操作可以查看官方<a href="https://github.com/Tencent/vConsole" target="_blank" rel="noreferrer">文档</a>,它有一下特性：</li><li>查看console日志</li><li>查看网络请求</li><li>查看element结构</li><li>查看Cookies和localStorage</li><li>手动执行JS命令行</li><li>自定义插件</li></ul></li><li><p><a href="https://github.com/dimsemenov/PhotoSwipe" target="_blank" rel="noreferrer">移动端查看大图</a></p></li><li><p><a href="http://fengyuanchen.github.io/cropper/" target="_blank" rel="noreferrer">cropper组件，用于图片上传裁剪</a></p></li><li><p><a href="https://github.com/jamiebuilds/react-loadable?utm_source=gold_browser_extension" target="_blank" rel="noreferrer">react-loadable</a>-主要实现异步加载（也可以预加载）</p></li><li><p><a href="https://www.cnblogs.com/alan2kat/p/7754846.html" target="_blank" rel="noreferrer">React-Router4 按需加载的4种实现</a></p></li><li><p><a href="https://eggjs.org/zh-cn/tutorials/typescript.html" target="_blank" rel="noreferrer">egg后台应用框架</a></p></li><li><p><a href="https://koa.bootcss.com/" target="_blank" rel="noreferrer">koa</a></p></li><li><p><a href="http://mongoosejs.net/docs/schematypes.html" target="_blank" rel="noreferrer">mongoosejs</a></p></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Project/more.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const more = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  more as default
};
