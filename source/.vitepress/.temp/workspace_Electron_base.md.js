import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Electron基础","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Electron/base.md","filePath":"workspace/Electron/base.md","lastUpdated":1714231776000}');
const _sfc_main = { name: "workspace/Electron/base.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="electron基础" tabindex="-1">Electron基础 <a class="header-anchor" href="#electron基础" aria-label="Permalink to &quot;Electron基础&quot;">​</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p><code>​Electron 是一个由 GitHub 开发的开源库，通过将 Chromium) 和Node.js 组合并使用 HTML，CSS 和 JavaScript 进行构建 Mac，Windows，和 Linux 跨平台桌面应用程序。</code></p><p><strong>优点:</strong></p><p>方便快捷的开发桌面应用，跨平台，对前端开发者友好，活跃的社区，丰富的api......</p><p><strong>缺点:</strong></p><p>性能肯定比不上原生的桌面应用，发布的包很大。（DeskGap这个不带浏览器的功能，包比较小）</p><h2 id="初始化项目" tabindex="-1">初始化项目 <a class="header-anchor" href="#初始化项目" aria-label="Permalink to &quot;初始化项目&quot;">​</a></h2><p><strong>1.electron-react-boilerplate</strong></p><p><a href="https://github.com/electron-react-boilerplate/electron-react-boilerplate" target="_blank" rel="noreferrer">star~13000</a></p><p><strong>2.</strong> 使用脚手架<code>electron-forge</code></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//全局安装脚手架</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">yarn</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> global</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> add</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> @</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">electron</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">forge</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">cli</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//初始化项目</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">yarn</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> create</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> electron</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">app</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> my</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">-</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">app</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>3.</strong> 自己搭建</p><ul><li>新建main.js</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">/**</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"> * Author: wk;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"> * Date: 2019-08-08 13:57;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"> * Description:主进程</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"> */</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}"> electron</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> require</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;electron&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">app</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">BrowserWindow</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">} </span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">=</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> electron</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//保持对window对象的全局引用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 垃圾回收的时候，window对象将会自动的关闭</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">let</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">const</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> createWindow</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> () </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">=&gt;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 创建浏览器窗口</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">    win</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#C678DD" })}"> new</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}"> BrowserWindow</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">        width</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">800</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">        height</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">600</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">        webPreferences</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">            preload</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">path</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">join</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">__dirname</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;preload.js&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">),</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">            nodeIntegration</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">true</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">        }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    });</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 加载index.html文件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">    win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">loadFile</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;index.html&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 打开开发者工具</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">    win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">webContents</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">openDevTools</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">();</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 当 window 被关闭，这个事件会被触发。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">    win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">on</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;closed&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, () </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">=&gt;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">        // 取消引用 window 对象，如果你的应用支持多窗口的话，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">        // 通常会把多个 window 对象存放在一个数组里面，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">        // 与此同时，你应该删除相应的元素。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">        win</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> =</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> null</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    })</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">};</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// Electron 会在初始化后并准备</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 创建浏览器窗口时，调用这个函数。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 部分 API 在 ready 事件触发后才能使用。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">app</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">on</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;ready&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">createWindow</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 当全部窗口关闭时退出。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">app</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">on</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;window-all-closed&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, () </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">=&gt;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 否则绝大部分应用及其菜单栏会保持激活。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    if</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">process</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">platform</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> !==</span><span style="${ssrRenderStyle({ "color": "#98C379" })}"> &#39;darwin&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) </span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">app</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">quit</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">});</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">app</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">on</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;activate&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, () </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">=&gt;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 在macOS上，当单击dock图标并且没有其他窗口打开时，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">    // 通常在应用程序中重新创建一个窗口。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">    if</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> (</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">win</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> ===</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}"> null</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">) </span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">createWindow</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><ul><li>新建index.html</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//渲染进程</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">&lt;!</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">DOCTYPE</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> html</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">html</span><span style="${ssrRenderStyle({ "color": "#D19A66", "font-style": "italic" })}"> lang</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;zh-Hans-CN&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">head</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">meta</span><span style="${ssrRenderStyle({ "color": "#D19A66", "font-style": "italic" })}"> charset</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;UTF-8&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">title</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;Title&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">title</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">head</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">body</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">h1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;Hello!&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">h1</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">body</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">html</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul><li>初始化git</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E06C75" })}">npm</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}"> init</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}"> -</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">y</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//electron 运行 package.json 的 main 脚本的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">// 一个 Electron 应用总是有且只有一个主进程。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;name&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;electron&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;version&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;1.0.0&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;description&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;main&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;main.js&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;scripts&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">    &quot;start&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;electron .&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  },</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;keywords&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: [],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;author&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;license&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;ISC&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">  &quot;dependencies&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#98C379" })}">    &quot;electron&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;^6.0.1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//加载index.html文件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">loadFile</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">path</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">join</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">__dirname</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">, </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;index.html&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">));</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//加载URL</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">loadURL</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">(</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;http://music.migu.cn/&#39;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//打开开发者工具</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">webContents</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">openDevTools</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">();</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}">//关闭开发者工具</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">win</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">webContents</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">.</span><span style="${ssrRenderStyle({ "color": "#61AFEF" })}">closeDevTools</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="打包" tabindex="-1">打包 <a class="header-anchor" href="#打包" aria-label="Permalink to &quot;打包&quot;">​</a></h2><p><code>devDependencies与dependencies的区别</code></p><p><a href="https://www.yuque.com/docs/share/963e29e1-3314-453f-b417-d8ce543b78cc" target="_blank" rel="noreferrer">详细介绍</a></p><p>如果不是发布npm包，例如我们常用的就是clone源码，然后npm install，这样的话，这两个地方包含的依赖都会被正确下载到 node_modules 里，意思就是，没区别。</p><p>但是，如果你要发布npm包，那就要注意了，这种情况如果有人想使用你的npm模块，npm install只会下载在 dependencies 的依赖。举个例子，你做了个日历插件，day.js，没有把它放在dependencies， 而是放在了 devdependencies，那别人使用你的日历插件的时候就会报错，因为在dependencies找不到day.js ,反过来 dependencies 的包放到 devdependencies 里面，这样就会增加本地项目的体积。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Electron/base.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const base = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  base as default
};
