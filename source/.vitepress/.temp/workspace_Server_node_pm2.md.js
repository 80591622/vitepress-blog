import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Node启动工具","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/node/pm2.md","filePath":"workspace/Server/node/pm2.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Server/node/pm2.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="node启动工具" tabindex="-1">Node启动工具 <a class="header-anchor" href="#node启动工具" aria-label="Permalink to &quot;Node启动工具&quot;">​</a></h1><h3 id="nodemon" tabindex="-1">nodemon <a class="header-anchor" href="#nodemon" aria-label="Permalink to &quot;nodemon&quot;">​</a></h3><p><strong>开发环境用</strong></p><h5 id="下载" tabindex="-1">下载 <a class="header-anchor" href="#下载" aria-label="Permalink to &quot;下载&quot;">​</a></h5><p>yarn global add nodemon</p><h5 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h5><p>nodemon app.js</p><h3 id="pm2" tabindex="-1">pm2 <a class="header-anchor" href="#pm2" aria-label="Permalink to &quot;pm2&quot;">​</a></h3><h5 id="下载-1" tabindex="-1">下载 <a class="header-anchor" href="#下载-1" aria-label="Permalink to &quot;下载&quot;">​</a></h5><p>yarn global add pm2</p><h5 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h5><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> start app.js              </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 启动app.js应用程序</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> start app.js -i </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">4</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">         # cluster mode 模式启动4个app.js的应用实例    </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> start app.js --name=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;api&quot;</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"> # 启动应用程序并命名为 &quot;api&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> start app.js --watch      </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 当文件变化时自动重启应用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> list  / pm2 ls            </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 列表 PM2 启动的所有的应用程序</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> logs                      </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 显示所有应用程序的日志</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> logs [app-name|id]        </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 显示指定应用程序的日志</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> stop </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">all</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">                  # 停止所有的应用程序</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> stop </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">0</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">                    # 停止 id为 0的指定应用程序</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> restart </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">all</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">               # 重启所有应用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> delete </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">all</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">                # 关闭并删除所有应用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">$ </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> delete </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">0</span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">                  # 删除指定应用 id 0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="查看日志" tabindex="-1">查看日志 <a class="header-anchor" href="#查看日志" aria-label="Permalink to &quot;查看日志&quot;">​</a></h5><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">cd</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> /root/.pm2/logs</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">pm2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> log id</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Server/node/pm2.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pm2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  pm2 as default
};
