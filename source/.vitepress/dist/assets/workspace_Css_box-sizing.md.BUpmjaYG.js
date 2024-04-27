import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const u=JSON.parse('{"title":"css的两种盒模型","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Css/box-sizing.md","filePath":"workspace/Css/box-sizing.md","lastUpdated":1713942612000}'),p={name:"workspace/Css/box-sizing.md"},o=l(`<h1 id="css的两种盒模型" tabindex="-1">css的两种盒模型 <a class="header-anchor" href="#css的两种盒模型" aria-label="Permalink to &quot;css的两种盒模型&quot;">​</a></h1><h2 id="w3c的标准盒模型" tabindex="-1">W3C的标准盒模型 <a class="header-anchor" href="#w3c的标准盒模型" aria-label="Permalink to &quot;W3C的标准盒模型&quot;">​</a></h2><p>默认是w3c标准的</p><p><img src="https://ae01.alicdn.com/kf/H8a671283100a4512ba5ae28cdfe70b3b6.jpg" alt="仔细看图"></p><blockquote><p>在标准的盒子模型中，width指content部分的宽度</p></blockquote><h2 id="ie的盒模型" tabindex="-1">IE的盒模型 <a class="header-anchor" href="#ie的盒模型" aria-label="Permalink to &quot;IE的盒模型&quot;">​</a></h2><p><img src="https://ae01.alicdn.com/kf/H113065c568374278958356d8834155a1x.jpg" alt="仔细看图"></p><blockquote><p>在IE盒子模型中，width表示content+padding+border这三个部分的宽度</p></blockquote><h2 id="box-sizing的使用" tabindex="-1">box-sizing的使用 <a class="header-anchor" href="#box-sizing的使用" aria-label="Permalink to &quot;box-sizing的使用&quot;">​</a></h2><p>如果想要切换盒模型也很简单，这里需要借助css3的box-sizing属性</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">box</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">sizing</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">content</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">box</span><span style="color:#7F848E;font-style:italic;">  //是W3C盒子模型</span></span>
<span class="line"><span style="color:#E06C75;">box</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">sizing</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">border</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">box</span><span style="color:#7F848E;font-style:italic;"> //是IE盒子模型</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;!</span><span style="color:#E06C75;">DOCTYPE</span><span style="color:#D19A66;"> html</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">html</span><span style="color:#D19A66;"> lang</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;en&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">head</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">meta</span><span style="color:#D19A66;"> charset</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;UTF-8&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">title</span><span style="color:#ABB2BF;">&gt;css盒模型&lt;/</span><span style="color:#E06C75;">title</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">head</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#D19A66;"> type</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;text/css&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#D19A66;">.content</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">	width: </span><span style="color:#D19A66;">300</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">	height: </span><span style="color:#D19A66;">400</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">	border: </span><span style="color:#D19A66;">5</span><span style="color:#E06C75;">px</span><span style="color:#D19A66;"> solid</span><span style="color:#D19A66;"> #242424</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">	padding: </span><span style="color:#D19A66;">20</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">	background-color: </span><span style="color:#D19A66;">#898989</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">   /*box-sizing: border-box;*/</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">body</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">	&lt;</span><span style="color:#E06C75;">div</span><span style="color:#D19A66;"> class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;content&quot;</span><span style="color:#ABB2BF;">&gt;&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">body</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">html</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div>`,12),e=[o];function t(c,r,i,B,y,b){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{u as __pageData,A as default};