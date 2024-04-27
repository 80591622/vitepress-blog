import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const u=JSON.parse('{"title":"封装树形菜单","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Frame/vue/tree-menu.md","filePath":"workspace/Frame/vue/tree-menu.md","lastUpdated":1713942612000}'),p={name:"workspace/Frame/vue/tree-menu.md"},e=l(`<h1 id="封装树形菜单" tabindex="-1">封装树形菜单 <a class="header-anchor" href="#封装树形菜单" aria-label="Permalink to &quot;封装树形菜单&quot;">​</a></h1><p>之前面试有让用react做过一次 ，今天仿造elementUI用Vue在做一个</p><p><strong>老套路先看看怎么使用的</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 具体使用</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#D19A66;font-style:italic;"> id</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;test&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">trees</span><span style="color:#FFFFFF;"> :data=&quot;treeData&quot;</span><span style="color:#FFFFFF;"> :treeProps=&quot;treeProps&quot;&gt;&lt;/trees&gt;</span></span>
<span class="line"><span style="color:#FFFFFF;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#FFFFFF;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#D19A66;font-style:italic;">  import</span><span style="color:#D19A66;font-style:italic;"> trees</span><span style="color:#D19A66;font-style:italic;"> from</span><span style="color:#98C379;"> &quot;./../test/index&quot;</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#D19A66;font-style:italic;">  export</span><span style="color:#D19A66;font-style:italic;"> default</span><span style="color:#C678DD;"> {</span></span>
<span class="line"><span style="color:#61AFEF;">    data</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">      return {</span></span>
<span class="line"><span style="color:#E06C75;">        treeProps</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">          children</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;children&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">          label</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;name&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#E06C75;">        treeData</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">            name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;一级 1&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">              name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;二级 1-1&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">              children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;三级 1-1-1&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">              }]</span></span>
<span class="line"><span style="color:#ABB2BF;">            }]</span></span>
<span class="line"><span style="color:#ABB2BF;">          },</span></span>
<span class="line"><span style="color:#ABB2BF;">          {</span></span>
<span class="line"><span style="color:#E06C75;">            name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;一级 2&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;二级 2-1&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">                children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;三级 2-1-1&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">                }]</span></span>
<span class="line"><span style="color:#ABB2BF;">              },</span></span>
<span class="line"><span style="color:#ABB2BF;">              {</span></span>
<span class="line"><span style="color:#E06C75;">                name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;二级 2-2&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">                children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;三级 2-2-1&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">                }]</span></span>
<span class="line"><span style="color:#ABB2BF;">              }</span></span>
<span class="line"><span style="color:#ABB2BF;">            ]</span></span>
<span class="line"><span style="color:#ABB2BF;">          },</span></span>
<span class="line"><span style="color:#ABB2BF;">          {</span></span>
<span class="line"><span style="color:#E06C75;">            name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;一级 3&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;二级 3-1&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">                children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;三级 3-1-1&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">                }]</span></span>
<span class="line"><span style="color:#ABB2BF;">              },</span></span>
<span class="line"><span style="color:#ABB2BF;">              {</span></span>
<span class="line"><span style="color:#E06C75;">                name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;二级 3-2&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">                children</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">                  name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;三级 3-2-1&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">                }]</span></span>
<span class="line"><span style="color:#ABB2BF;">              }</span></span>
<span class="line"><span style="color:#ABB2BF;">            ]</span></span>
<span class="line"><span style="color:#ABB2BF;">          }</span></span>
<span class="line"><span style="color:#ABB2BF;">        ]</span></span>
<span class="line"><span style="color:#ABB2BF;">      };</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#E06C75;">    components</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">      trees</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">  }</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#FFFFFF;">&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><p><strong>子组件的封装</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 菜单节点</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">li</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">span</span><span style="color:#FFFFFF;"> @click=&quot;toggle&quot;</span><span style="color:#ABB2BF;"> &gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;</span><span style="color:#E06C75;">span</span><span style="color:#D19A66;font-style:italic;"> v-if</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;hasChild&quot;</span><span style="color:#ABB2BF;"> &gt;</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">{isOpen ? </span><span style="color:#98C379;">&#39;down&#39;</span><span style="color:#ABB2BF;"> : </span><span style="color:#98C379;">&#39;up&#39;</span><span style="color:#ABB2BF;">}</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">span</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;!-- 末菜单 --&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;</span><span style="color:#E06C75;">span</span><span style="color:#D19A66;font-style:italic;"> v-if</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;!hasChild&quot;</span><span style="color:#ABB2BF;"> &gt;&#39;=&#39;&lt;/</span><span style="color:#E06C75;">span</span><span style="color:#ABB2BF;">&gt; </span></span>
<span class="line"><span style="color:#C678DD;">            {</span><span style="color:#ABB2BF;">{ data[</span><span style="color:#E5C07B;">treeProps</span><span style="color:#E06C75;">.label</span><span style="color:#ABB2BF;">]</span><span style="color:#E06C75;"> }}</span></span>
<span class="line"><span style="color:#E06C75;">        &lt;/span&gt;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        // 如果还有子集菜单，继续递归</span></span>
<span class="line"><span style="color:#E06C75;">        &lt;ul v-show=&quot;isOpen&quot; v-if=&quot;hasChild&quot;&gt;</span></span>
<span class="line"><span style="color:#E06C75;">            &lt;tree-item v-for=&quot;(item, index) in data</span><span style="color:#ABB2BF;">[</span><span style="color:#E5C07B;">treeProps</span><span style="color:#E06C75;">.children</span><span style="color:#ABB2BF;">]</span><span style="color:#E06C75;">&quot; </span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;">data</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;item&quot;</span><span style="color:#ABB2BF;"> :</span><span style="color:#E06C75;">key</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;index&quot;</span><span style="color:#ABB2BF;"> :</span><span style="color:#E06C75;">treeProps</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;treeProps&quot;</span><span style="color:#56B6C2;"> &gt;&lt;/</span><span style="color:#E06C75;">tree</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">item</span><span style="color:#56B6C2;">&gt;</span></span>
<span class="line"><span style="color:#56B6C2;">        &lt;/</span><span style="color:#E06C75;">ul</span><span style="color:#56B6C2;">&gt;</span></span>
<span class="line"><span style="color:#56B6C2;">    &lt;/</span><span style="color:#E06C75;">li</span><span style="color:#56B6C2;">&gt;</span></span>
<span class="line"><span style="color:#56B6C2;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#56B6C2;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">export default </span><span style="color:#C678DD;">{</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;TreeItem&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">//递归组件必须有name</span></span>
<span class="line"><span style="color:#E06C75;">    props</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">        data</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">            type</span><span style="color:#ABB2BF;">: [</span><span style="color:#E06C75;">Object</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Array</span><span style="color:#ABB2BF;">], </span><span style="color:#7F848E;font-style:italic;">//多个可能的类型</span></span>
<span class="line"><span style="color:#E06C75;">            required</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        // label、children 默认值</span></span>
<span class="line"><span style="color:#E06C75;">      treeProps</span><span style="color:#ABB2BF;">:{</span></span>
<span class="line"><span style="color:#E06C75;">          type</span><span style="color:#ABB2BF;">:</span><span style="color:#E06C75;">Object</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#61AFEF;">          default</span><span style="color:#ABB2BF;">:()</span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">            children</span><span style="color:#ABB2BF;">:</span><span style="color:#98C379;">&#39;children&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">            label</span><span style="color:#ABB2BF;">:</span><span style="color:#98C379;">&#39;label&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">          })</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#61AFEF;">    data</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">        return {</span></span>
<span class="line"><span style="color:#E06C75;">            isOpen</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#E06C75;">    computed</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      // 判断当前级别是否还有children</span></span>
<span class="line"><span style="color:#61AFEF;">        hasChild</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#C678DD;">            return</span><span style="color:#E5C07B;"> this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">[</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">treeProps</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">children</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">&amp;&amp;</span><span style="color:#E5C07B;"> this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">[</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">treeProps</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">children</span><span style="color:#ABB2BF;">].</span><span style="color:#E06C75;">length</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#E06C75;">    methods</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">      // 点击子菜单也要判断是否有children，有就展开</span></span>
<span class="line"><span style="color:#61AFEF;">        toggle</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#C678DD;">            if</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">hasChild</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E5C07B;">                this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">isOpen</span><span style="color:#56B6C2;"> =</span><span style="color:#56B6C2;"> !</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">isOpen</span></span>
<span class="line"><span style="color:#ABB2BF;">            }</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">ul </span><span style="color:#C678DD;">{</span></span>
<span class="line"><span style="color:#E06C75;">    list</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">none</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">    margin</span><span style="color:#ABB2BF;">: 10</span><span style="color:#E06C75;">px</span><span style="color:#D19A66;"> 0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">    padding</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">left</span><span style="color:#ABB2BF;">: 20</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">li </span><span style="color:#C678DD;">{</span></span>
<span class="line"><span style="color:#E06C75;">      color</span><span style="color:#ABB2BF;">: #</span><span style="color:#D19A66;">000</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">li &gt; span </span><span style="color:#C678DD;">{</span></span>
<span class="line"><span style="color:#E06C75;">    cursor</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">pointer</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">    font</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">size</span><span style="color:#ABB2BF;">: 14</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">    line</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">height</span><span style="color:#ABB2BF;">: 20</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 菜单标题</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">ul</span><span style="color:#D19A66;font-style:italic;"> v-for</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;(item,index) in data&quot;</span><span style="color:#FFFFFF;"> :key=&quot;index&quot;&gt;</span></span>
<span class="line"><span style="color:#FFFFFF;">      &lt;tree-item</span><span style="color:#FFFFFF;"> :data=&quot;item&quot;</span><span style="color:#FFFFFF;"> :treeProps=&quot;treeProps&quot;&gt;&lt;/tree-item&gt;</span></span>
<span class="line"><span style="color:#FFFFFF;">    &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#FFFFFF;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#FFFFFF;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#D19A66;font-style:italic;">  import</span><span style="color:#D19A66;font-style:italic;"> treeItem</span><span style="color:#D19A66;font-style:italic;"> from</span><span style="color:#98C379;"> &#39;./item&#39;</span></span>
<span class="line"><span style="color:#D19A66;font-style:italic;">  export</span><span style="color:#D19A66;font-style:italic;"> default</span><span style="color:#C678DD;"> {</span></span>
<span class="line"><span style="color:#E06C75;">    props</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">      data</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">        type</span><span style="color:#ABB2BF;">: [</span><span style="color:#E06C75;">Object</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Array</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#E06C75;">        required</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#E06C75;">      treeProps</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">        type</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">Object</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#61AFEF;">        default</span><span style="color:#ABB2BF;">: () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> ({</span></span>
<span class="line"><span style="color:#E06C75;">          children</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;children&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">          label</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;label&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">        })</span></span>
<span class="line"><span style="color:#ABB2BF;">      }</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#E06C75;">    components</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">      treeItem</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#C678DD;">  }</span></span>
<span class="line"><span style="color:#FFFFFF;">&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>跟react大同小异，依旧是用了递归的思想，不过vue的这个组件自身递归看的很新奇。</p>`,8),o=[e];function r(c,t,B,i,y,b){return a(),n("div",null,o)}const m=s(p,[["render",r]]);export{u as __pageData,m as default};
