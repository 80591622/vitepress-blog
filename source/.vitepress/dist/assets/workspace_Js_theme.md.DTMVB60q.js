import{_ as s,c as a,o as e,a5 as n}from"./chunks/framework.BQQWXjGs.js";const u=JSON.parse('{"title":"聊一聊前端换肤","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Js/theme.md","filePath":"workspace/Js/theme.md","lastUpdated":1713942612000}'),l={name:"workspace/Js/theme.md"},p=n(`<h1 id="聊一聊前端换肤" tabindex="-1">聊一聊前端换肤 <a class="header-anchor" href="#聊一聊前端换肤" aria-label="Permalink to &quot;聊一聊前端换肤&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>最近在写公司的组件库，遇到的动态更换主题的需求，顺带研究一波。</p><p>一般来说换肤的需求分为两种：</p><ol><li>一种是几种可供选择的颜色/主题样式，进行选择切换，这种可供选择的主题切换不会很多</li><li>另一种是需要自定义色值（动态更换），或者通过取色板取色，可供选择的范围就很大了</li></ol><h2 id="如何实现" tabindex="-1">如何实现 <a class="header-anchor" href="#如何实现" aria-label="Permalink to &quot;如何实现&quot;">​</a></h2><h3 id="对于可供选择的颜色-主题样式换肤的实现" tabindex="-1">对于可供选择的颜色/主题样式换肤的实现 <a class="header-anchor" href="#对于可供选择的颜色-主题样式换肤的实现" aria-label="Permalink to &quot;对于可供选择的颜色/主题样式换肤的实现&quot;">​</a></h3><ul><li>一个全局class控制样式切换</li></ul><p>切换的时候js控制样式的切换</p><ul><li>JS改变href属性值切换样式表，例如：</li></ul><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">link</span><span style="color:#D19A66;font-style:italic;"> id</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;theme&quot;</span><span style="color:#D19A66;font-style:italic;"> href</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;iread-theme.css&quot;</span><span style="color:#D19A66;font-style:italic;"> rel</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;stylesheet&quot;</span><span style="color:#D19A66;font-style:italic;"> type</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;text/css&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">// js</span></span>
<span class="line"><span style="color:#ABB2BF;">document.getElementById(&#39;#theme&#39;).href = &#39;iread-update.css&#39;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这种方式需要维护几个主题样式表，js点击切换的时候通过改变css样式表链接来实现。</p><hr><p>这种实现对于，颜色和主题多了的时候，维护起来就很麻烦，需要同时维护 n 个样式文件，并且使用JS改变href属性会带来加载延迟，样式切换不流畅，体验也不好。</p><h2 id="对于制定动态色值换肤的实现" tabindex="-1">对于制定动态色值换肤的实现 <a class="header-anchor" href="#对于制定动态色值换肤的实现" aria-label="Permalink to &quot;对于制定动态色值换肤的实现&quot;">​</a></h2><p>如果是要实现动态换肤，自定义色值，那上面的几种方式就不适合了。</p><p>先看下已有的实现有哪些方法</p><h2 id="element-ui的换肤功-示例预览" tabindex="-1">Element-UI的换肤功 <a href="https://elementui.github.io/theme-preview/#/zh-CN" target="_blank" rel="noreferrer">示例预览</a> <a class="header-anchor" href="#element-ui的换肤功-示例预览" aria-label="Permalink to &quot;Element-UI的换肤功 [示例预览](https://elementui.github.io/theme-preview/#/zh-CN)&quot;">​</a></h2><p>实现原理： <a href="https://github.com/ElemeFE/element/issues/3054" target="_blank" rel="noreferrer"> 官方解释</a></p><ol><li>先把默认主题文件中涉及到颜色的 CSS 值替换成关键词：<a href="https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274" target="_blank" rel="noreferrer">https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274</a></li><li>根据用户选择的主题色生成一系列对应的颜色值：<a href="https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json" target="_blank" rel="noreferrer">https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json</a></li><li>把关键词再换回刚刚生成的相应的颜色值：<a href="https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js" target="_blank" rel="noreferrer">https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js</a></li><li>直接在页面上加 <code>style</code> 标签，把生成的样式填进去：<a href="https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211" target="_blank" rel="noreferrer">https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211</a></li></ol><p>实现原理十分暴力😂，还是比较麻烦的，看看还有没有更优雅的方法来实现。</p><p><strong>在实战中发现的问题（不是基于开发组件库）:</strong></p><ol><li><p>spa跳转页面<strong>新增</strong>的css没有捕获，所以部分主题色就会失效</p><ul><li><p>监听head引入style的个数，重新走下流程 效率低</p></li><li><p>直接编译所有的css样式 (按需加载和直接引入)线上/开发 建议</p></li></ul></li><li><p>行内的样式不能编译</p></li></ol><p>当我们在写ui库的时候只要修改自身的样式就行了，不要干扰开发者定义的样式（比如行内样式，UI库的开发肯定不会用行内的😄）</p><hr><p>饿了么的采用的方式是，直接编译所有的index.css，导出的时候，把所有的<strong>组件css</strong>都编译过来然后在让开发者按需引入。</p><h2 id="less的-modifyvars方法" tabindex="-1">less的 modifyVars方法 <a class="header-anchor" href="#less的-modifyvars方法" aria-label="Permalink to &quot;less的 modifyVars方法&quot;">​</a></h2><p>蚂蚁antd、有赞vant团队的更换主题色功能是用 less 提供的 <a href="http://lesscss.org/usage/#using-less-in-the-browser-modify-variables" target="_blank" rel="noreferrer">modifyVars</a> 的方式进行覆盖变量来实现。</p><p>原理 : <strong>modifyVars方法是是基于 <code>less</code> 在浏览器中可以直接 <code>编译css 变量</code> 的特性来实现。<strong>所以在引入lessjs文件的时候需要</strong>通过link方式引入</strong>，然后基于less.js中的方法来进行修改变量。</p><p>link方式引入主题色文件</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">link</span><span style="color:#D19A66;font-style:italic;"> rel</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;stylesheet/less&quot;</span><span style="color:#D19A66;font-style:italic;"> type</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;text/css&quot;</span><span style="color:#D19A66;font-style:italic;"> href</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;./iread-theme.less&quot;</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  *</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  * 它会找到所有如下的less 样式标签，使用已编译的css同步创建 style 标签。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  * 也就是说我们必须把代码中所有的less 都以link的方式来引入(可以统一导入一个less里面)，这样less.js 才能在浏览器端实现编译。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  * 注：使用less 来实现换肤要注意 less 文件在 html 中编写的位置（优先级），不然很可能被其他css 文件所干扰导致换肤失败</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  * */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>更改主题色事件</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// color 传入颜色值</span></span>
<span class="line"><span style="color:#61AFEF;">handleColorChange</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">color</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E5C07B;">    less</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">modifyVars</span><span style="color:#ABB2BF;">({  </span><span style="color:#7F848E;font-style:italic;">// 调用 \`less.modifyVars\` 方法来改变变量值&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">       @</span><span style="color:#E06C75;">themeColor</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;">color</span></span>
<span class="line"><span style="color:#ABB2BF;">    })</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E5C07B;">      console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;修改成功&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">    });</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>可在webpack配置更改变量</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#E06C75;">    test</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;"> /</span><span style="color:#56B6C2;">\\.</span><span style="color:#E06C75;">less</span><span style="color:#C678DD;">$</span><span style="color:#E06C75;">/</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    loader</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;less-loader&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    options</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">       // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。</span></span>
<span class="line"><span style="color:#E06C75;">      lessOptions</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">        javascriptEnabled</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">          modifyVars</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">            // 直接覆盖变量</span></span>
<span class="line"><span style="color:#98C379;">            &#39;text-color&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;#111&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#98C379;">            &#39;border-color&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;#eee&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">      } </span></span>
<span class="line"><span style="color:#ABB2BF;">   }</span></span>
<span class="line"><span style="color:#ABB2BF;">},</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>less方法仅限于用less的项目才能使用，查了下Sass是没有类似 less.modifyVars 这种方法的；</p><p>Sass 的变量不是纯声明式的，⽽是类似 JavaScript 的变量, 后面的更新不会影响前面的</p><p>也就是一个变量在不同阶段值是不同的。而 Less 中生效的只有最后一次赋值，统一修改 Sass 变量作用范围不明，不能确保符合预期</p><p>需要在 Sass 中抽取可定制的全局变量，需要使用 <code>!default</code> 声明变量，然后把用来覆盖的变量声明写在<strong>前面</strong>,例如：</p><p><img src="https://tva1.sinaimg.cn/large/008eGmZEly1goo89u8g8pj30ik06et9h.jpg" alt=""></p><h2 id="css-变量方法" tabindex="-1">css 变量方法 <a class="header-anchor" href="#css-变量方法" aria-label="Permalink to &quot;css 变量方法&quot;">​</a></h2><p>如果项目里用的不是less, 那么还是用css的方法，通用且容易操作，使用<strong>css变量</strong>来进行主题色的修改，替换主题色变量，然后用setProperty来进行动态修改</p><p>用法就是给变量加<code>--</code>前缀，涉及到主题色的都改成<code>var(--themeColor)</code>这种方式</p><p>用之前看下兼容性</p><p><img src="https://tva1.sinaimg.cn/large/008eGmZEly1goo8hf6vwpj31g20kjjx7.jpg" alt=""></p><p>大部分主流浏览器还是支持的，而且主要是操作起来够简便。</p><p>用法举例：</p><p><img src="https://tva1.sinaimg.cn/large/008eGmZEly1goo8dm8qrpj30q40aoab1.jpg" alt=""></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>个人更加偏向于 <code>antd</code> 或者基于 <code>css 自定义变量</code> 的写法，不过 <code>antd</code> 基于 <code>less</code> 在浏览器中的编译，less 官方文档中也说到了:</p><blockquote><p>This is because less is a large javascript file and compiling less before the user can see the page means a delay for the user. In addition, consider that mobile devices will compile slower.</p></blockquote><p>所以编译速度是一个要考虑的问题。然后是css 自定义变量要考虑的可能就是浏览器中的兼容性问题了，不过感觉 css 自定义变量的支持度还是挺友好了的🤣🤣。</p>`,52),o=[p];function t(r,c,i,y,b,d){return e(),a("div",null,o)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
