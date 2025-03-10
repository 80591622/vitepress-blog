import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"irdd 组件库","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Frame/irdd/irdd.md","filePath":"workspace/Frame/irdd/irdd.md","lastUpdated":1713955424000}');
const _sfc_main = { name: "workspace/Frame/irdd/irdd.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="irdd-组件库" tabindex="-1">irdd 组件库 <a class="header-anchor" href="#irdd-组件库" aria-label="Permalink to &quot;irdd 组件库&quot;">​</a></h1><p>开发组件库，遇到的问题</p><h2 id="使用插件" tabindex="-1">使用插件 <a class="header-anchor" href="#使用插件" aria-label="Permalink to &quot;使用插件&quot;">​</a></h2><ul><li><p>popper.js Popper.js是一款功能强大的JS定位引擎。 <a href="./.html">https://blog.csdn.net/jhzhahuaiyu/article/details/90213582</a></p></li><li><p>deepmerge/object-assign 实现两个对象的深度合并，类似于Object.assign(),但是是多层的合并 <a href="./.html">https://blog.csdn.net/weixin_34198797/article/details/93476329</a></p></li><li><p>async-validator antd和element等ui库 都有引入这个插件,表单验证 <a href="./.html">https://www.cnblogs.com/wozho/p/10955525.html</a></p></li><li><p>vue-markdown-loader vue的md组件</p></li><li><p>css-color-function 转化css颜色</p></li><li><p>markdown-it-anchor 锚点插件,用于段落跳转 hash路径问题</p><ul><li><a href="https://github.com/valeriangalliat/markdown-it-anchor/blob/HEAD/README-zh_CN.md" target="_blank" rel="noreferrer">https://github.com/valeriangalliat/markdown-it-anchor/blob/HEAD/README-zh_CN.md</a></li></ul></li><li><p>transliteration 把汉语转化为拼音 <a href="https://www.npmjs.com/package/transliteration" target="_blank" rel="noreferrer">https://www.npmjs.com/package/transliteration</a></p></li><li><p>markdown-it <a href="https://markdown-it.docschina.org/#%E7%94%A8%E6%B3%95%E7%A4%BA%E4%BE%8B" target="_blank" rel="noreferrer">markdown解析器</a></p></li><li><p>markdown-it-chain 用于链式调用,参考 webpack-chain</p></li><li><p><a href="https://www.npmjs.com/package/markdown-it-container" target="_blank" rel="noreferrer">markdown-it-container</a> 自定义包裹元素插件识别 markdown 语法:::</p></li><li><p>highlightjs <a href="https://highlightjs.org/static/demo/" target="_blank" rel="noreferrer">https://highlightjs.org/static/demo/</a></p></li><li><p>vue-codemirror 线上ide <a href="https://github.com/surmon-china/vue-codemirror" target="_blank" rel="noreferrer">https://github.com/surmon-china/vue-codemirror</a> <a href="https://blog.csdn.net/weixin_43080277/article/details/83860629" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_43080277/article/details/83860629</a></p></li><li><p>resize-observer-polyfill <a href="https://github.com/que-etc/resize-observer-polyfill" target="_blank" rel="noreferrer">https://github.com/que-etc/resize-observer-polyfill</a></p><p>element-resize-detector <a href="https://github.com/wnr/element-resize-detector" target="_blank" rel="noreferrer">https://github.com/wnr/element-resize-detector</a></p><p>resize-detector <a href="https://github.com/Justineo/resize-detector" target="_blank" rel="noreferrer">https://github.com/Justineo/resize-detector</a></p><p>监控元素DOM变化</p></li></ul><h2 id="去除inline-block元素间间距的n方法" tabindex="-1">去除inline-block元素间间距的N方法 <a class="header-anchor" href="#去除inline-block元素间间距的n方法" aria-label="Permalink to &quot;去除inline-block元素间间距的N方法&quot;">​</a></h2><ul><li><p>webpack 去除空格了</p></li><li><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">let</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> rep</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> function</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">match</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">item1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">item2</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">item3</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">  // item2 是空格部分</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">  return</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> item1</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> +</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> item3</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">html</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">replace</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">/(&gt;)(\\s</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">*</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">)(&lt;)/</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">g</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">rep</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p><a href="https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/" target="_blank" rel="noreferrer">css 去除空格</a></p></li></ul><h2 id="scss用法大全" tabindex="-1">scss用法大全 <a class="header-anchor" href="#scss用法大全" aria-label="Permalink to &quot;scss用法大全&quot;">​</a></h2><p>bem [gulp-postcss、postcss-salad] 、 saladcss-bem</p><p>BEM是一个命名约定，让前端代码更容易阅读和理解，更容易协作，更加健壮和明确，而且更加严密。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">block</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">block__element</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">block</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">--</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">modifier</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 注释:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// .block代表了更高级别的抽象或组件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// .block__element代表.block的后代，用于形成一个完整的.block的整体。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// .block–modifier代表.block的不同状态或不同版本。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>ELE 自己编写的</p><p>scss 函数方法 ： <a href="https://www.cnblogs.com/Zting00/p/7497640.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/Zting00/p/7497640.html</a></p><h2 id="组件挂载" tabindex="-1">组件挂载 <a class="header-anchor" href="#组件挂载" aria-label="Permalink to &quot;组件挂载&quot;">​</a></h2><p>Babel直接编译需要先挂载才能用、Vue.extend可以随时挂载</p><p>全局挂载组件之 <a href="https://juejin.cn/post/6844904190255300615" target="_blank" rel="noreferrer">vue.extend</a></p><h2 id="todo" tabindex="-1">todo <a class="header-anchor" href="#todo" aria-label="Permalink to &quot;todo&quot;">​</a></h2><ul><li><p>升级babel ✅</p></li><li><p>文档侧边栏 ✅</p></li><li><p>主题换色 ✅</p></li><li><p>历史版本文档（cdn） ✅</p></li><li><p>按需加载 ✅</p></li><li><p>异常页面 <a href="https://luolr.github.io/mhc-iView-doc/components/exception" target="_blank" rel="noreferrer">https://luolr.github.io/mhc-iView-doc/components/exception</a></p></li><li><p>TextCopy 文本复制 ✅</p></li><li><p>富文本 ✅</p></li><li><p>更改媒体的 meta 信息</p></li><li><p>Ide 鼠标划上跳出用法详情 （.d.ts） ✅</p></li><li><p>Table thead置顶、table虚拟滚动、里面包含div的话会有位置的顺序的偏差</p></li><li><p>所有列举文字 都是图书命 ✅</p></li><li><p>国际化</p></li><li><p>hash时候锚点跳转的问题 ✅</p></li><li><p>除去浏览器默认空格 ✅</p></li></ul><h2 id="手动按需加载" tabindex="-1">手动按需加载 <a class="header-anchor" href="#手动按需加载" aria-label="Permalink to &quot;手动按需加载&quot;">​</a></h2><p><strong>js 按需加载</strong></p><p>babel-plugin-component(ele) fork 的babel-plugin-import</p><p>babel-plugin-import（antd)</p><h2 id="css-按需加载" tabindex="-1"><strong>css 按需加载</strong> <a class="header-anchor" href="#css-按需加载" aria-label="Permalink to &quot;**css 按需加载**&quot;">​</a></h2><ol><li>打包到组件中</li></ol><p>webpack多入口打包可以，但是热加载后的资源是放到内存中，不能引入(可以引入原文件) 但是js里面还是会有少量的针对css加载的代码（导致包变大）</p><p>组件库中引入其他的组件 css重复添加</p><ol start="2"><li>额外单独打包</li></ol><p>使用gulp的原因是能实时编译，而且发布包的时候不用额外打包， Js组件的体积小，组件内部没有关系css的样式(使用webpack打包抽离css的时候，会有少量真对css的代码)</p><p>css打包多个的时候，需要多页面打包，或者统一引入到一个js里面，更复杂，没有冗余代码</p><p>针对一些不是组件的样式，需要开发者可以自行引入的 (transtion.css)样式 支持友好</p><p>修改<strong>css</strong>后，可直接针对样式打包，不用所有的组件重新打包</p><p>减少耦合</p><p>能做主题换肤功能 导出scss文件</p><h2 id="组件库微前端优势" tabindex="-1"><strong>组件库微前端优势</strong> <a class="header-anchor" href="#组件库微前端优势" aria-label="Permalink to &quot;**组件库微前端优势**&quot;">​</a></h2><p>减少外在因素干扰</p><p>同级样式干扰</p><p>不是一个移动端容器，容器不同</p><p>拓展不足</p><p>vw vh rem响应式拓展不足</p><p>浏览器前缀</p><p>分享功能，或者移动端打开</p><p>需要同时服务两套系统</p><p>一些移动端的资源重复检查</p><p>埋点</p><h2 id="一期分享" tabindex="-1">一期分享 <a class="header-anchor" href="#一期分享" aria-label="Permalink to &quot;一期分享&quot;">​</a></h2><ol><li>锚点跳转、刷新、回退定位问题</li><li>动态修改主题色（3种）</li><li>行内块元素之间的间距 （loader）i</li><li>css 的使用方式 - BEM</li><li>Jsx 直接引入也ok</li><li>版本之间跳转的问题</li><li>在线ide</li><li>markdown</li><li>highlight 代码高亮</li><li>一个组件使用另一个组件 记得导入css</li><li>启动慢、hmr慢的问题 开发优化、生产保持现有的</li></ol><h2 id="外部扩展-externals" tabindex="-1">外部扩展(Externals) <a class="header-anchor" href="#外部扩展-externals" aria-label="Permalink to &quot;外部扩展(Externals)&quot;">​</a></h2><p><strong>防止</strong>将某些 <code>import</code> 的包(package)<strong>打包</strong>到 bundle 中，而是在运行时(runtime)再去从外部获取这些<em>扩展依赖(external dependencies)</em>。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> nodeExternals</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> require</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;webpack-node-externals&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> Components</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> require</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;../components.json&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 防止打包的时候再重新打包一次，直接使用require引入，开发者打包的时候自己会继承到项目内。 优点：打包速度快、体积小、需要区分开发和生产的包</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// var mixinsList = fs.readdirSync(path.resolve(__dirname, &#39;../src/mixins&#39;));</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">let</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> externals</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">Object</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">keys</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">Components</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">).</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">forEach</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">function</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">key</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">  // 这里要和约定好的路径对应上，不然就会把组件打包进来</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">  externals</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">[</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">\`packages/</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">\${</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">key</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">/index.js\`</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">] </span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> \`irdd/lib/</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">\${</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">key</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">\`</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">});</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// &quot;packages/button/index.js&quot;: &quot;irdd/lib/button&quot;,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">externals</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> [</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">Object</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">assign</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">  vue</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;vue&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">externals</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">), </span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">nodeExternals</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">()];</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">exports</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">externals</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> externals</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="区分dependencies和devdependencies" tabindex="-1">区分dependencies和devDependencies <a class="header-anchor" href="#区分dependencies和devdependencies" aria-label="Permalink to &quot;区分dependencies和devDependencies&quot;">​</a></h2><p>因为上面使用了Externals 会导致一些插件直接引入不会打包进去，就可能会导致开发依赖的在组件库中使用，到开发者手中就会报错提示找不到该插件或者版本不一致的问题。</p><h2 id="utils" tabindex="-1">utils <a class="header-anchor" href="#utils" aria-label="Permalink to &quot;utils&quot;">​</a></h2><p>为了方便使用，建议放到文件的第一级目录下 <code>import {} from &quot;irdd/utils&quot;</code>,也可以建立一个入口，直接引入打包后的地址</p><h2 id="types-的代码提示" tabindex="-1">types 的代码提示 <a class="header-anchor" href="#types-的代码提示" aria-label="Permalink to &quot;types 的代码提示&quot;">​</a></h2><p>纯手写</p><h2 id="按需加载" tabindex="-1">按需加载 <a class="header-anchor" href="#按需加载" aria-label="Permalink to &quot;按需加载&quot;">​</a></h2><p>将 .babelrc 的 plugins 修改为：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;plugins&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;import&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">    &quot;libraryName&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;irdd&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">    &quot;styleLibraryDirectory&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;src/styles/lib&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>irdd: 样式也可以按需加载, 可以使用cdn全量导入。</p><p><a href="https://www.iviewui.com/docs/guide/start#TBTX" target="_blank" rel="noreferrer">iview</a> ：按需引用仍然需要导入样式</p><p><a href="https://element-plus.gitee.io/#/zh-CN/component/quickstart#yang-shi-de-yin-ru" target="_blank" rel="noreferrer">Ele-plus</a>: 我们<strong>强烈建议直接引入全部的样式文件</strong>，虽然这看起来会增大整个应用的体积，但这样做可以避免引入额外的打包工具插件（减少负担）</p><p>注意 Webpack 不能百分百安全地进行 tree-shaking。有些模块导入，只要被引入，就会对应用程序产生重要的影响。一个很好的例子就是<strong>全局样式表</strong>，或者设置全局配置的 JavaScript 文件。webpack4 默认地将所有代码视为有副作用。这可以保护你免于删除必要的文件，但这意味着 Webpack 的默认行为实际上是不进行 tree-shaking。webpack5默认会进行 tree-shaking，所以需要在package.json 设置下sideEffects属性</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 所有文件都有副作用，全都不可 tree-shaking</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &quot;sideEffects&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">true</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 没有文件有副作用，全都可以 tree-shaking</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &quot;sideEffects&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">false</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 只有这些文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &quot;sideEffects&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;*.less&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;*.css&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;dist/*&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;es/**/style/*&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;lib/**/style/*&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="补坑-按需加载" tabindex="-1">补坑 按需加载 <a class="header-anchor" href="#补坑-按需加载" aria-label="Permalink to &quot;补坑  按需加载&quot;">​</a></h2><p><strong>坑位1</strong></p><p>使用 babel-plugin-import 做的按需加载，出现的问题就是，做了按需加载后不能全量导入，解决的办法就是 删除.babael的文件 或者 使用 <code>import Irdd from &quot;irdd/es&quot;</code> or <code>const Irdd = require(&#39;irdd&#39;)</code></p><p>需要注意的点是 此插件默认是查找到你的文件名称，需保持css和js命令是一致的，默认是短斜杠格式，可设置。</p><p><strong>坑位2</strong></p><p><img src="https://tva1.sinaimg.cn/large/008i3skNly1gurubwhk7nj60su09yjss02.jpg" alt=""></p><p>上述错误是因为 webpack 没有配置默认可以不写 <code>.css</code>的 extensions, 配置下即可</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// webpack下</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">resolve</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> extensions</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.js&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.jsx&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.vue&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.css&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.scss&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.json&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;.md&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// vue-cli下</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">  chainWebpack</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#E06C75", "font-style": "italic" })}">config</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> =&gt;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">    config</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">resolve</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">extensions</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">add</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;.css&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">).</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">end</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="jsx下-component-失效" tabindex="-1">JSX下 component 失效 <a class="header-anchor" href="#jsx下-component-失效" aria-label="Permalink to &quot;JSX下  component 失效&quot;">​</a></h2><p><code>@vue/babel-helper-vue-jsx-merge-props</code> 编译 <code>element-ui</code> 组件库 <code>table</code>的时候，内部编译导致 <code>dom</code> 丢失， 所以使用此组件时需保证项目中有在使用 <code>el-table</code></p><h2 id="外部不具名的坑" tabindex="-1">外部不具名的坑 <a class="header-anchor" href="#外部不具名的坑" aria-label="Permalink to &quot;外部不具名的坑&quot;">​</a></h2><p>发版后 ，yarn、cnpm获取不到最新的npm包 需要手动刷新下 <a href="https://developer.aliyun.com/special/npm/notice" target="_blank" rel="noreferrer">同步频率目前为 <strong>10分钟</strong></a></p><p>迁移前 babel 版本不一致，导致解析的不一样</p><p>一期组件库的入口 <code>...component</code> ,生产引发的 BUG FIX</p><h2 id="npm-下载问题" tabindex="-1">NPM 下载问题 <a class="header-anchor" href="#npm-下载问题" aria-label="Permalink to &quot;NPM 下载问题&quot;">​</a></h2><p>发版后 ，yarn、cnpm获取不到最新的npm包 需要手动刷新下 <a href="https://developer.aliyun.com/special/npm/notice" target="_blank" rel="noreferrer">同步频率目前为 <strong>10分钟</strong></a></p><p><strong>设置白名单</strong></p><p><code>.npmignore</code>的文件，是一种<code>黑名单</code>机制，在包发布时用于排除某些文件或目录跟<code>.gitigonre</code>一致。</p><p>比如，我有一份非常全的<code>.npmignore</code>清单，我不想去动它，可又想把清单上的一些文件放开并上传到npm，怎么办呢？</p><p>答案是：通过配置<code>package.json</code>里的<code>files</code>字段来解决。 比如，我的<code>.npmignore</code>清单忽略了<code>examples</code>整个目录：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">examples</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>配置<code>package.json</code>里的<code>files</code>字段放开<code>examples</code>下的<code>white-label.txt</code>文件:</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;files&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">    &quot;examples/white-label.txt&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  ],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="优先级问题" tabindex="-1">优先级问题 <a class="header-anchor" href="#优先级问题" aria-label="Permalink to &quot;优先级问题&quot;">​</a></h2><p>如果项目同时存在<code>.gitignore</code>,<code>.npmignore</code>,并且配置了<code>files</code>字段,优先级如下： <code>files</code>&gt;<code>.npmignore</code>&gt;<code>.gitignore</code>。</p><h2 id="markdown-loader-编译小胡子语法" tabindex="-1">markdown-loader 编译小胡子语法 <a class="header-anchor" href="#markdown-loader-编译小胡子语法" aria-label="Permalink to &quot;markdown-loader  编译小胡子语法&quot;">​</a></h2><h2 id="rem-未编译-import" tabindex="-1">rem 未编译 （@import &#39;&#39;） <a class="header-anchor" href="#rem-未编译-import" aria-label="Permalink to &quot;rem 未编译 （@import &#39;&#39;）&quot;">​</a></h2><p><a href="https://github.com/cuth/postcss-pxtorem/issues/38" target="_blank" rel="noreferrer">https://github.com/cuth/postcss-pxtorem/issues/38</a></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">   test</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> /</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">\\.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">(scss</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">|</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">css)</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">$</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">/</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">     use</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">       isProd</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> ?</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> MiniCssExtractPlugin</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">loader</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> :</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &quot;style-loader&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">       &quot;css-loader&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">       &quot;postcss-loader&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 新版本不支持在此配置，转postcss.config.js</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">       &quot;sass-loader&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">     ],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="pc-下没有滑动事件" tabindex="-1">pc 下没有滑动事件 <a class="header-anchor" href="#pc-下没有滑动事件" aria-label="Permalink to &quot;pc 下没有滑动事件&quot;">​</a></h2><p><a href="http://vant-contrib.gitee.io/vant/v2/#/zh-CN/advanced-usage#zhuo-mian-duan-gua-pei" target="_blank" rel="noreferrer">桌面适配</a></p><h2 id="组件库打包出现-const" tabindex="-1">组件库打包出现 const <a class="header-anchor" href="#组件库打包出现-const" aria-label="Permalink to &quot;组件库打包出现 const&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 组件库的 .babelrc</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;@babel/preset-env&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">   {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">   &quot;modules&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">false</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">   &quot;targets&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">     &quot;browsers&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">       &quot;Android &gt;= 4&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">       &quot;iOS &gt;= 8&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">     ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">   }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Frame/irdd/irdd.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const irdd = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  irdd as default
};
