import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const A=JSON.parse('{"title":"Mongoose使用","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/sql/mongoose.md","filePath":"workspace/Server/sql/mongoose.md","lastUpdated":1713942612000}'),p={name:"workspace/Server/sql/mongoose.md"},o=l(`<h1 id="mongoose使用" tabindex="-1">Mongoose使用 <a class="header-anchor" href="#mongoose使用" aria-label="Permalink to &quot;Mongoose使用&quot;">​</a></h1><h2 id="链接mongo" tabindex="-1">链接mongo <a class="header-anchor" href="#链接mongo" aria-label="Permalink to &quot;链接mongo&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">* @ use 数据库连接</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;mongoose&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> config</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;../../config/common&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> dbConfig</span><span style="color:#56B6C2;"> =</span><span style="color:#E06C75;"> config</span><span style="color:#ABB2BF;">[</span><span style="color:#E5C07B;">process</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">env</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">NODE_ENV</span><span style="color:#56B6C2;"> ||</span><span style="color:#98C379;"> &#39;development&#39;</span><span style="color:#ABB2BF;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">connect</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">dbConfig</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">mongo</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;">, {</span><span style="color:#E06C75;">useNewUrlParser</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">set</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;useCreateIndex&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">); </span><span style="color:#7F848E;font-style:italic;">//加上这个</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 连接成功</span></span>
<span class="line"><span style="color:#E5C07B;">mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">connection</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">on</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;connected&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    //console.log(&#39;连接成功 &#39; + dbConfig.mongo.url);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 连接失败</span></span>
<span class="line"><span style="color:#E5C07B;">mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">connection</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">on</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;error&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">err</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;连接失败 &#39;</span><span style="color:#56B6C2;"> +</span><span style="color:#E06C75;"> err</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 断开连接</span></span>
<span class="line"><span style="color:#E5C07B;">mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">connection</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">on</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;disconnected&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;断开连接&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="定义schema" tabindex="-1">定义Schema <a class="header-anchor" href="#定义schema" aria-label="Permalink to &quot;定义Schema&quot;">​</a></h2><h3 id="schema-type" tabindex="-1">Schema.Type <a class="header-anchor" href="#schema-type" aria-label="Permalink to &quot;Schema.Type&quot;">​</a></h3><ul><li>String</li><li>Number</li><li>Date</li><li>Buffer</li><li>Boolean</li><li>Mixed</li><li>Objectid</li><li>Array</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> mongoose</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;mongoose&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> Schema</span><span style="color:#56B6C2;">   =</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">Schema</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> UserSchema</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> Schema</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">    name  </span><span style="color:#ABB2BF;">: { </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">String</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">unique</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;"> },</span></span>
<span class="line"><span style="color:#E06C75;">    posts </span><span style="color:#ABB2BF;">: [{ </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;Post&#39;</span><span style="color:#ABB2BF;"> }]</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> User</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">model</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;User&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">UserSchema</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> PostSchema</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> Schema</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">    poster   </span><span style="color:#ABB2BF;">: { </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;User&#39;</span><span style="color:#ABB2BF;"> },</span></span>
<span class="line"><span style="color:#E06C75;">    comments </span><span style="color:#ABB2BF;">: [{ </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;Comment&#39;</span><span style="color:#ABB2BF;"> }],</span></span>
<span class="line"><span style="color:#E06C75;">    title    </span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">String</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    content  </span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">String</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> Post</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">model</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;Post&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">PostSchema</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> CommentSchema</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> Schema</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">    post      </span><span style="color:#ABB2BF;">: { </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;Post&quot;</span><span style="color:#ABB2BF;"> },</span></span>
<span class="line"><span style="color:#E06C75;">    commenter </span><span style="color:#ABB2BF;">: { </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;User&#39;</span><span style="color:#ABB2BF;"> },</span></span>
<span class="line"><span style="color:#E06C75;">    content   </span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#E06C75;">        main</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">String</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        label</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">String</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#E06C75;">    points</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#E06C75;">        point</span><span style="color:#ABB2BF;">: [{</span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;Point&#39;</span><span style="color:#ABB2BF;">}]</span></span>
<span class="line"><span style="color:#ABB2BF;">    ]</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> Comment</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">model</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;Comment&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">CommentSchema</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> PointSchema</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> new</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">Schema</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">  name</span><span style="color:#ABB2BF;">: </span><span style="color:#E06C75;">String</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">  parent</span><span style="color:#ABB2BF;">: {</span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;point&#39;</span><span style="color:#ABB2BF;">},</span></span>
<span class="line"><span style="color:#E06C75;">  children</span><span style="color:#ABB2BF;">: [{</span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">Schema</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">Types</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">ObjectId</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;point&#39;</span><span style="color:#ABB2BF;">}]</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> Point</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> mongoose</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">model</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;Point&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">PointSchema</span><span style="color:#ABB2BF;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h2 id="查询条件" tabindex="-1">查询条件 <a class="header-anchor" href="#查询条件" aria-label="Permalink to &quot;查询条件&quot;">​</a></h2><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">$or　　　　或关系</span></span>
<span class="line"><span style="color:#ABB2BF;">$nor　　　 或关系取反</span></span>
<span class="line"><span style="color:#ABB2BF;">$gt　　　　大于</span></span>
<span class="line"><span style="color:#ABB2BF;">$gte　　　 大于等于</span></span>
<span class="line"><span style="color:#ABB2BF;">$lt　　　　 小于</span></span>
<span class="line"><span style="color:#ABB2BF;">$lte　　　  小于等于</span></span>
<span class="line"><span style="color:#ABB2BF;">$ne            不等于</span></span>
<span class="line"><span style="color:#ABB2BF;">$in             在多个值范围内</span></span>
<span class="line"><span style="color:#ABB2BF;">$nin           不在多个值范围内</span></span>
<span class="line"><span style="color:#ABB2BF;">$all            匹配数组中多个值</span></span>
<span class="line"><span style="color:#ABB2BF;">$regex　　正则，用于模糊查询</span></span>
<span class="line"><span style="color:#ABB2BF;">$size　　　匹配数组大小</span></span>
<span class="line"><span style="color:#ABB2BF;">$maxDistance　　范围查询，距离（基于LBS）</span></span>
<span class="line"><span style="color:#ABB2BF;">$mod　　   取模运算</span></span>
<span class="line"><span style="color:#ABB2BF;">$near　　　邻域查询，查询附近的位置（基于LBS）</span></span>
<span class="line"><span style="color:#ABB2BF;">$exists　　  字段是否存在</span></span>
<span class="line"><span style="color:#ABB2BF;">$elemMatch　　匹配内数组内的元素</span></span>
<span class="line"><span style="color:#ABB2BF;">$within　　范围查询（基于LBS）</span></span>
<span class="line"><span style="color:#ABB2BF;">$box　　　 范围查询，矩形范围（基于LBS）</span></span>
<span class="line"><span style="color:#ABB2BF;">$center       范围醒询，圆形范围（基于LBS）</span></span>
<span class="line"><span style="color:#ABB2BF;">$centerSphere　　范围查询，球形范围（基于LBS）</span></span>
<span class="line"><span style="color:#ABB2BF;">$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="mongodb对数组中的所有元素进行一次性修改方法" tabindex="-1">mongodb对数组中的所有元素进行一次性修改方法 <a class="header-anchor" href="#mongodb对数组中的所有元素进行一次性修改方法" aria-label="Permalink to &quot;mongodb对数组中的所有元素进行一次性修改方法&quot;">​</a></h2><p><strong>$[]</strong></p><p>可以通过$[element] 配合 $cond 条件操作符等，来达到对数组的符合条件的元素统一更新。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#E06C75;">    name</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">4</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">    list</span><span style="color:#ABB2BF;">: [{</span></span>
<span class="line"><span style="color:#E06C75;">        id</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;a&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        date</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1504195200000</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        other</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;c&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">    },{</span></span>
<span class="line"><span style="color:#E06C75;">        id</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;b&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        date</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1504195200000</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">        other</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;c&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }]</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>现在要把other全部更新为&quot;a&quot;,方法如下:</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E5C07B;">db</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">getCollection</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;test&#39;</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">update</span><span style="color:#ABB2BF;">({</span><span style="color:#98C379;">&#39;name&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">4</span><span style="color:#ABB2BF;">}, {</span><span style="color:#E06C75;">$set</span><span style="color:#ABB2BF;">: {</span><span style="color:#98C379;">&#39;list.$[].other&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;a&#39;</span><span style="color:#ABB2BF;">}}, {</span><span style="color:#E06C75;">multi</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="总结中" tabindex="-1">总结中... <a class="header-anchor" href="#总结中" aria-label="Permalink to &quot;总结中...&quot;">​</a></h2>`,16),e=[o];function r(c,t,B,y,i,b){return a(),n("div",null,e)}const m=s(p,[["render",r]]);export{A as __pageData,m as default};