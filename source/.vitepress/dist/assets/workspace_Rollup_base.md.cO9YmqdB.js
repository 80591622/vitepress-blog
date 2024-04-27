import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const m=JSON.parse('{"title":"rollup","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Rollup/base.md","filePath":"workspace/Rollup/base.md","lastUpdated":1713942612000}'),p={name:"workspace/Rollup/base.md"},e=l(`<h1 id="rollup" tabindex="-1">rollup <a class="header-anchor" href="#rollup" aria-label="Permalink to &quot;rollup&quot;">​</a></h1><p><a href="https://github.com/rollup/rollup" target="_blank" rel="noreferrer">github 20k</a></p><p><a href="https://www.rollupjs.com/guide/introduction" target="_blank" rel="noreferrer">文档</a></p><p>与webpack 偏向于应用打包的定位不同， rollup.js 更专注于 Javascript 类库打包 。</p><p>the-answer</p><p>与 webpack 和 browserify 这样的其他捆绑包不同， rollup 不知道如何打破常规去处理这些依赖。因此我们需要添加一些配置。</p><ul><li>-f 。 -f 参数是 --format 的缩写，它表示生成代码的格式， amd 表示采用 AMD 标准， cjs 为 CommonJS 标准， esm （或 es）为 ES 模块标准。 -f 的值可以为 amd 、 cjs 、 system 、 esm （&#39;es’也可以）、 iife 或 umd 中的任何一个。</li><li>-o 。 -o 指定了输出的路径，这里我们将打包后的文件输出到 dist 目录下的 bundle.js</li></ul><p>其实除了这两个，还有很多其他常用的命令（这里我暂且列举剩下两个也比较常用的，完整的rollup 命令行参数）：</p><ul><li><p>-c 。指定 rollup 的配置文件。</p></li><li><p>-w 。监听源文件是否有改动，如果有改动，重新打包。</p></li><li><p>input 入口文件地址</p></li><li><p>output</p></li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">output</span><span style="color:#ABB2BF;">:{</span></span>
<span class="line"><span style="color:#E06C75;">    file</span><span style="color:#ABB2BF;">:</span><span style="color:#98C379;">&#39;bundle.js&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">// 输出文件</span></span>
<span class="line"><span style="color:#E06C75;">    format</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;cjs,  //  五种输出格式：amd /  es6 / iife / umd / cj</span><span style="color:#FFFFFF;">s</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">:</span><span style="color:#98C379;">&#39;A&#39;</span><span style="color:#ABB2BF;">,  </span><span style="color:#7F848E;font-style:italic;">//当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...</span></span>
<span class="line"><span style="color:#E06C75;">    sourcemap</span><span style="color:#ABB2BF;">:</span><span style="color:#D19A66;">true</span><span style="color:#7F848E;font-style:italic;">  //生成bundle.map.js文件，方便调试</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>plugins 最常用的就是babel插件了,比较不爽的是，babel 的预设不像 webpack 可以直接写在配置文件里，而还是得独立写个“src/.babelrc”（注意我们可以写在 src 下，而不是非得放在项目根目录下）</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// .babelrc </span></span>
<span class="line"><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#98C379;">  &quot;presets&quot;</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">    [</span><span style="color:#98C379;">&quot;env&quot;</span><span style="color:#ABB2BF;">, {</span></span>
<span class="line"><span style="color:#98C379;">      &quot;modules&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span></span>
<span class="line"><span style="color:#ABB2BF;">    }]</span></span>
<span class="line"><span style="color:#ABB2BF;">  ],</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul><li>external</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">external</span><span style="color:#ABB2BF;">:[</span><span style="color:#98C379;">&#39;lodash&#39;</span><span style="color:#ABB2BF;">] </span><span style="color:#7F848E;font-style:italic;">//告诉rollup不要将此lodash打包，而作为外部依赖</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="整体打包流程" tabindex="-1">整体打包流程 <a class="header-anchor" href="#整体打包流程" aria-label="Permalink to &quot;整体打包流程&quot;">​</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#E06C75;"> babel</span><span style="color:#C678DD;"> from</span><span style="color:#98C379;"> &#39;@rollup/plugin-babel&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#E06C75;"> commonjs</span><span style="color:#C678DD;"> from</span><span style="color:#98C379;"> &quot;@rollup/plugin-commonjs&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#E06C75;"> resolve</span><span style="color:#C678DD;"> from</span><span style="color:#98C379;"> &quot;@rollup/plugin-node-resolve&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#E06C75;"> json</span><span style="color:#C678DD;"> from</span><span style="color:#98C379;"> &quot;@rollup/plugin-json&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#E06C75;"> replace</span><span style="color:#C678DD;"> from</span><span style="color:#98C379;"> &quot;@rollup/plugin-replace&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> env</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> process</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">env</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">NODE_ENV</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#C678DD;"> default</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E06C75;">  input</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;./package/watermark.js&quot;</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#E06C75;">  output</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">    file</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;./lib/index.js&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    format</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;umd&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;waterMark&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    sourcemap</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#E06C75;">  plugins</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#61AFEF;">    resolve</span><span style="color:#ABB2BF;">(),</span></span>
<span class="line"><span style="color:#61AFEF;">    commonjs</span><span style="color:#ABB2BF;">(),</span></span>
<span class="line"><span style="color:#61AFEF;">    json</span><span style="color:#ABB2BF;">(),</span></span>
<span class="line"><span style="color:#61AFEF;">    replace</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#98C379;">      &#39;process.env.NODE_ENV&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">JSON</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stringify</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">env</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    }),</span></span>
<span class="line"><span style="color:#61AFEF;">    babel</span><span style="color:#ABB2BF;">({</span><span style="color:#E06C75;">babelHelpers</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;bundled&#39;</span><span style="color:#ABB2BF;">}),</span></span>
<span class="line"><span style="color:#ABB2BF;">  ], </span><span style="color:#7F848E;font-style:italic;">// babel这个 显式配置此选项（即使使用其默认值）</span></span>
<span class="line"><span style="color:#E06C75;">  external</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&quot;the-answer&quot;</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div>`,16),o=[e];function r(c,t,i,B,u,y){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{m as __pageData,d as default};