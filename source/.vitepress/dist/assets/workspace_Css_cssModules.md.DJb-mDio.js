import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const m=JSON.parse('{"title":"css的模块化","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Css/cssModules.md","filePath":"workspace/Css/cssModules.md","lastUpdated":1713942612000}'),p={name:"workspace/Css/cssModules.md"},e=l(`<h1 id="css的模块化" tabindex="-1">css的模块化 <a class="header-anchor" href="#css的模块化" aria-label="Permalink to &quot;css的模块化&quot;">​</a></h1><p><code>1</code>. 关于less使用建议</p><pre><code>1、过渡的嵌套会导致很多问题发生，使代码变得更复杂，而且太过依赖于HTML结构，这样后面要覆盖样式需要依赖于&quot;!important&quot;，而这种方式又是我们尽量避免使用的一种

2、嵌套层级不应该超过三层

3、嵌套层级编译出来的CSS，要确保其简洁，可重用

4、使用嵌套很有意义，但并不意味着无限级的嵌套
</code></pre><p><code>2</code>.这玩意的好处</p><pre><code>解决CSS中的全局作用域问题。说白了就是解决不同页面样式冲突的问题
保留了很好的组件复用性 （composes）
很方便的按需加载
</code></pre><p><code>3</code>.启用css modules 只需在webpack中使用css-loader，下面为less中使用</p><pre><code>\`使用cssmodules后改变css,浏览器会自动刷新,因为他是基于对象的，之前直接写less的时候，需要手动的\`
</code></pre><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//@Lynn 这里我开启自己编写的less文件的css modules功能 除了node_modules库中的less</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//也就是可以过滤掉antd库中的样式</span></span>
<span class="line"><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#E06C75;">  test</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;"> /</span><span style="color:#56B6C2;">\\.</span><span style="color:#E06C75;">less</span><span style="color:#C678DD;">$</span><span style="color:#E06C75;">/</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  exclude</span><span style="color:#ABB2BF;">: [</span><span style="color:#E06C75;">/node_modules/</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#E06C75;">  use</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#E5C07B;">      require</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;style-loader&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#ABB2BF;">      {</span></span>
<span class="line"><span style="color:#E06C75;">          loader</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">require</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;css-loader&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#E06C75;">          options</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">              modules</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">              localIndexName</span><span style="color:#ABB2BF;">:</span><span style="color:#98C379;">&quot;[name]__[local]___[hash:base64:5]&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">          },</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">      {</span></span>
<span class="line"><span style="color:#E06C75;">          loader</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">require</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;less-loader&#39;</span><span style="color:#ABB2BF;">), </span><span style="color:#7F848E;font-style:italic;">// compiles Less to CSS</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">  ],</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p><code>4</code>. 在智慧社区里面使用： 1. 对于局部css 采用[name]. module.[less | css]，</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//这个是在config/webpack.config.dev.js里面定义了</span></span>
<span class="line"><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#E06C75;">test</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;"> /</span><span style="color:#56B6C2;">\\.</span><span style="color:#E06C75;">less</span><span style="color:#C678DD;">$</span><span style="color:#E06C75;">/</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">use</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#E5C07B;">  require</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;style-loader&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#ABB2BF;">  ({</span><span style="color:#E06C75;font-style:italic;">resource</span><span style="color:#ABB2BF;">}) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> ({</span></span>
<span class="line"><span style="color:#E06C75;">    loader</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;css-loader&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    options</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">      importLoaders</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">      modules</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;"> /</span><span style="color:#56B6C2;">\\.</span><span style="color:#E06C75;">module</span><span style="color:#56B6C2;">\\.</span><span style="color:#E06C75;">less/</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">test</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">resource</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#E06C75;">      localIdentName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;[name]__[local]___[hash:base64:5]&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">  }),</span></span>
<span class="line"><span style="color:#ABB2BF;">  {</span></span>
<span class="line"><span style="color:#E06C75;">    loader</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">require</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;postcss-loader&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#E06C75;">    options</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">      ident</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;postcss&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">// https://webpack.js.org/guides/migrating/#complex-options</span></span>
<span class="line"><span style="color:#61AFEF;">      plugins</span><span style="color:#ABB2BF;">: () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> [</span></span>
<span class="line"><span style="color:#61AFEF;">        require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;postcss-flexbugs-fixes&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#61AFEF;">        autoprefixer</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">          browsers</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#98C379;">            &#39;&gt;1%&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#98C379;">            &#39;last 4 versions&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#98C379;">            &#39;Firefox ESR&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#98C379;">            &#39;not ie &lt; 9&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">// React doesn&#39;t support IE8 anyway</span></span>
<span class="line"><span style="color:#ABB2BF;">          ],</span></span>
<span class="line"><span style="color:#E06C75;">          flexbox</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;no-2009&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        }),</span></span>
<span class="line"><span style="color:#ABB2BF;">      ],</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#ABB2BF;">  {</span></span>
<span class="line"><span style="color:#E06C75;">    loader</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">require</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;less-loader&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#E06C75;">    options</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">      modifyVars</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">theme</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><pre><code>2. 定义全局样式，直接在css|less文件加入:global：
</code></pre><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">/* 定义多个全局样式 */</span></span>
<span class="line"><span style="color:#C678DD;">	:global</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">	  .link {</span></span>
<span class="line"><span style="color:#ABB2BF;">	    color: </span><span style="color:#D19A66;">green</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">	  }</span></span>
<span class="line"><span style="color:#D19A66;">	  .box</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">	    color: </span><span style="color:#D19A66;">yellow</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">	  }</span></span>
<span class="line"><span style="color:#ABB2BF;">	}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><pre><code>3. 对于组件的引入
</code></pre><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span>/* components/Button.css */</span></span>
<span class="line"><span>.base { /* 所有通用的样式 */ }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.normal {</span></span>
<span class="line"><span>  composes: base;</span></span>
<span class="line"><span>  /* normal 其它样式 */</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.disabled {</span></span>
<span class="line"><span>  composes: base;</span></span>
<span class="line"><span>  /* disabled 其它样式 */</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>import styles from &#39;./Button.css&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>buttonElem.outerHTML = \`&lt;button class=\${styles.normal}&gt;Submit&lt;/button&gt;\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><pre><code>4.css modules的局限：
1.class名必须是驼峰形式，否则不能正常在js里使用 styles.table 来引用 对此的解决方法
</code></pre><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;"> className=</span><span style="color:#ABB2BF;">{styles[&#39;tree-component-header&#39;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><pre><code>2.由于css模块化是默认，当你希望使用正常的全局css时，需要通过:local 和 :global 切换，不方便
3.所有的 className 都必须使用 {style.className} 的形式


5.composes 关键词
</code></pre><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">  //css</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#E06C75;">serif</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">font</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E06C75;">        font</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">family</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">Georgia</span><span style="color:#ABB2BF;">,</span><span style="color:#E06C75;">serif</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#E06C75;">display</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E06C75;">       composes</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">serif</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">font</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">        font</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">size</span><span style="color:#ABB2BF;">: 30</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">        line</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">height</span><span style="color:#ABB2BF;">: 35</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">   //组件</span></span>
<span class="line"><span style="color:#C678DD;">   import</span><span style="color:#E06C75;"> styles</span><span style="color:#C678DD;"> from</span><span style="color:#98C379;"> &quot;./type.css&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">   element</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">innerHTML</span><span style="color:#56B6C2;"> =</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#98C379;">   \`</span></span>
<span class="line"><span style="color:#98C379;">       &lt;h1 class={styles.display}&gt;</span></span>
<span class="line"><span style="color:#98C379;">           This is a heading</span></span>
<span class="line"><span style="color:#98C379;">       &lt;/h1&gt;\`</span></span>
<span class="line"><span style="color:#ABB2BF;">       </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">   //浏览器</span></span>
<span class="line"><span style="color:#ABB2BF;">   &lt;</span><span style="color:#E06C75;">h1</span><span style="color:#D19A66;font-style:italic;"> class</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;_type__display_0980340 _type_serif_404840&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">       This is a heading</span></span>
<span class="line"><span style="color:#ABB2BF;">   &lt;/</span><span style="color:#E06C75;">h1</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><code>最后配上我自己设置的cssModules</code></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E06C75;">  test</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">lessRegex</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  exclude</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">lessModuleRegex</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  use</span><span style="color:#ABB2BF;">: </span><span style="color:#61AFEF;">getStyleLoaders</span><span style="color:#ABB2BF;">(</span></span>
<span class="line"><span style="color:#ABB2BF;">      {</span></span>
<span class="line"><span style="color:#E06C75;">        importLoaders</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        modules</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">          localIdentName</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;[path][name]-[local]-[hash:base64:5]&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        sourceMap</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">isEnvProduction</span><span style="color:#56B6C2;"> &amp;&amp;</span><span style="color:#E06C75;"> shouldUseSourceMap</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#98C379;">      &#39;less-loader&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">  ),</span></span>
<span class="line"><span style="color:#E06C75;">  sideEffects</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>详情看：</p><p><code>1</code>. <a href="https://www.jianshu.com/p/51ff1c8be301" target="_blank" rel="noreferrer">如何在react中使用antd+less+css modules</a><br><code>2</code>. <a href="https://zhuanlan.zhihu.com/p/20495964" target="_blank" rel="noreferrer">具体使用 结合classnames</a><br><code>3</code>. <a href="https://zhuanlan.zhihu.com/p/20495964" target="_blank" rel="noreferrer">CSS Modules 详解及 React 中实践</a></p>`,22),o=[e];function r(c,t,B,i,y,b){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{m as __pageData,d as default};
