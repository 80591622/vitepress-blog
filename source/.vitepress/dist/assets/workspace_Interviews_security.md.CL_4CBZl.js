import{_ as s,c as e,o as a,a5 as o}from"./chunks/framework.BQQWXjGs.js";const B=JSON.parse('{"title":"安全问题","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Interviews/security.md","filePath":"workspace/Interviews/security.md","lastUpdated":1714231776000}'),l={name:"workspace/Interviews/security.md"},n=o(`<h1 id="安全问题" tabindex="-1">安全问题 <a class="header-anchor" href="#安全问题" aria-label="Permalink to &quot;安全问题&quot;">​</a></h1><h2 id="同源策略" tabindex="-1">同源策略 <a class="header-anchor" href="#同源策略" aria-label="Permalink to &quot;同源策略&quot;">​</a></h2><p>如果两个 URL 的协议、域名和端口都相同，我们就称这两个 URL 同源。</p><ul><li>同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作。</li><li>同源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据。</li><li>同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点。</li></ul><p>解决同源策略的方法：</p><ul><li><code>跨文档消息机制</code>:可以通过 window.postMessage 的 JavaScript 接口来和不同源的 DOM 进行通信。</li><li><code>跨域资源共享（CORS）</code>:跨域资源在服务端设置允许跨域，就可以进行跨域访问控制，从而使跨域数据传输得以安全进行。</li><li><code>内容安全策略（CSP）</code>:主要以白名单的形式配置可信任的内容来源，在网页中，能够使白名单中的内容正常执行（包含 JS，CSS，Image 等等），而非白名单的内容无法正常执行。</li></ul><h2 id="xss-跨站脚本攻击-cross-site-scripting" tabindex="-1">XSS，跨站脚本攻击(Cross Site Scripting) <a class="header-anchor" href="#xss-跨站脚本攻击-cross-site-scripting" aria-label="Permalink to &quot;XSS，跨站脚本攻击(Cross Site Scripting)&quot;">​</a></h2><h3 id="存储型-xss-攻击" tabindex="-1">存储型 XSS 攻击 <a class="header-anchor" href="#存储型-xss-攻击" aria-label="Permalink to &quot;存储型 XSS 攻击&quot;">​</a></h3><p>利用漏洞提交恶意 JavaScript 代码，比如在input, textarea等所有可能输入文本信息的区域，输入<code>&lt;script src=&quot;http://恶意网站&quot;&gt;&lt;/script&gt;</code>等，提交后信息会存在服务器中，当用户再次打开网站请求到相应的数据，打开页面，恶意脚本就会将用户的 Cookie 信息等数据上传到黑客服务器。</p><h3 id="反射型-xss-攻击" tabindex="-1">反射型 XSS 攻击 <a class="header-anchor" href="#反射型-xss-攻击" aria-label="Permalink to &quot;反射型 XSS 攻击&quot;">​</a></h3><p>用户将一段含有恶意代码的请求提交给 Web 服务器，Web 服务器接收到请求时，又将恶意代码反射给了浏览器端，这就是反射型 XSS 攻击。 在现实生活中，黑客经常会通过 QQ 群或者邮件等渠道诱导用户去点击这些恶意链接，所以对于一些链接我们一定要慎之又慎。</p><p><code>Web 服务器不会存储反射型 XSS 攻击的恶意脚本，这是和存储型 XSS 攻击不同的地方。</code></p><h3 id="基于-dom-的-xss-攻击" tabindex="-1">基于 DOM 的 XSS 攻击 <a class="header-anchor" href="#基于-dom-的-xss-攻击" aria-label="Permalink to &quot;基于 DOM 的 XSS 攻击&quot;">​</a></h3><p>基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。它的特点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。比如利用工具(如Burpsuite)扫描目标网站所有的网页并自动测试写好的注入脚本等。</p><p>预防策略：</p><ol><li>将cookie等敏感信息设置为httponly，禁止Javascript通过<code>document.cookie</code>获得</li><li>对所有的输入做严格的校验尤其是在服务器端，过滤掉任何不合法的输入，比如手机号必须是数字，通常可以采用正则表达式.</li><li>净化和过滤掉不必要的html标签，比如：<code>&lt;iframe&gt;, alt,&lt;script&gt;</code> ;净化和过滤掉不必要的Javascript的事件标签，比如：<code>onclick, onfocus</code>等</li><li>转义单引号，双引号，尖括号等特殊字符，可以采用htmlencode编码 或者过滤掉这些特殊字符</li><li>CSP,CSP 全称为 Content Security Policy，即内容安全策略。主要以白名单的形式配置可信任的内容来源，在网页中，能够使白名单中的内容正常执行（包含 JS，CSS，Image 等等），而非白名单的内容无法正常执行，从而减少跨站脚本攻击（XSS），当然，也能够减少运营商劫持的内容注入攻击。 配置方式：</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">//1、meta</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">meta</span><span style="color:#D19A66;font-style:italic;"> http-equiv</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;Content-Security-Policy&quot;</span><span style="color:#D19A66;font-style:italic;"> content</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;script-src &#39;self&#39;&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">//2、Http 头部</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">Content-Security-Policy:</span></span>
<span class="line"><span style="color:#ABB2BF;">script-src &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; &#39;self&#39; *.54php.cn *.yunetidc.com *.baidu.com *.cnzz.com *.duoshuo.com *.jiathis.com;report-uri /error/csp</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="csrf-跨站请求伪造-cross-site-request-forgery" tabindex="-1">CSRF,跨站请求伪造（Cross-site request forgery） <a class="header-anchor" href="#csrf-跨站请求伪造-cross-site-request-forgery" aria-label="Permalink to &quot;CSRF,跨站请求伪造（Cross-site request forgery）&quot;">​</a></h2><p>引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。</p><p>发起 CSRF 攻击的三个必要条件：</p><ol><li>目标站点一定要有 CSRF 漏洞；</li><li>用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；</li><li>需要用户打开一个第三方站点，如黑客的站点等。</li></ol><p>预防策略：</p><ol><li>充分利用好 Cookie 的 SameSite 属性。</li></ol><p>SameSite 选项通常有 Strict、Lax 和 None 三个值。</p><ul><li>SameSite 的值是 Strict，那么浏览器会完全禁止第三方 Cookie。</li><li>Lax 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。</li><li>而如果使用 None 的话，在任何情况下都会发送 Cookie 数据。 如：</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">set</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">cookie</span><span style="color:#ABB2BF;">: 1</span><span style="color:#E5C07B;">P_JAR</span><span style="color:#56B6C2;">=</span><span style="color:#D19A66;">2019</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">10</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">20</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">06</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">expires</span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;">Tue</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">19</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Nov</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">2019</span><span style="color:#D19A66;"> 06</span><span style="color:#ABB2BF;">:</span><span style="color:#D19A66;">36</span><span style="color:#ABB2BF;">:</span><span style="color:#D19A66;">21</span><span style="color:#E5C07B;"> GMT</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">path</span><span style="color:#56B6C2;">=/</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">domain</span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">google</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">com</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">SameSite</span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;">none</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>验证请求的来源站点</li></ol><p>在服务器端验证请求来源的站点，就是验证 HTTP 请求头中的 <code>Origin</code> 和 <code>Referer</code> 属性。Referer 是 HTTP 请求头中的一个字段，记录了该 HTTP 请求的来源地址，而O rigin 属性只包含了域名信息，并没有包含具体的 URL 路径。这是 Origin 和 Referer 的一个主要区别。</p><p>服务器的策略是优先判断 Origin，如果请求头中没有包含 Origin 属性，再根据实际情况判断是否使用 Referer 值。</p><ol start="3"><li>在请求地址中添加 token 并验证</li></ol><p>CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。因此要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。</p><ol start="4"><li>在 HTTP 头中自定义属性并验证</li></ol><p>这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。</p><p>然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。</p><h2 id="sql注入" tabindex="-1">SQL注入 <a class="header-anchor" href="#sql注入" aria-label="Permalink to &quot;SQL注入&quot;">​</a></h2><p>拼接 SQL 时未仔细过滤，黑客可提交畸形数据改变语义。比如查某个文章，提交了这样的数据<code>id=-1 or 1=1</code>等。1=1 永远是true，导致where语句永远是ture.那么查询的结果相当于整张表的内容，攻击者就达到了目的。或者，通过屏幕上的报错提示推测 SQL 语句等。</p><p>预防策略：</p><ol><li>禁止目标网站利用动态拼接字符串的方式访问数据库</li><li>减少不必要的数据库抛出的错误信息</li><li>对数据库的操作赋予严格的权限控制</li><li>净化和过滤掉不必要的SQL保留字，比如：where, or, exec 等</li></ol><h2 id="点击劫持" tabindex="-1">点击劫持 <a class="header-anchor" href="#点击劫持" aria-label="Permalink to &quot;点击劫持&quot;">​</a></h2><ul><li>诱使用户点击看似无害的按钮（实则点击了透明 iframe 中的按钮）.</li><li>监听鼠标移动事件，让危险按钮始终在鼠标下方.</li><li>使用 HTML5 拖拽技术执行敏感操作（例如 deploy key）.</li></ul><p>预防策略：</p><ol><li>服务端添加 X-Frame-Options 响应头,这个 HTTP 响应头是为了防御用 iframe 嵌套的点击劫持攻击。 这样浏览器就会阻止嵌入网页的渲染。</li><li>JS 判断顶层视口的域名是不是和本页面的域名一致，不一致则不允许操作，<code>top.location.hostname === self.location.hostname</code>；</li><li>敏感操作使用更复杂的步骤（验证码、输入项目名称以删除）。</li></ol><h2 id="window-opener-安全问题" tabindex="-1">window.opener 安全问题 <a class="header-anchor" href="#window-opener-安全问题" aria-label="Permalink to &quot;window.opener 安全问题&quot;">​</a></h2><p>window.opener 表示打开当前窗体页面的的父窗体的是谁。例如，在 A 页面中，通过一个带有 target=&quot;_blank&quot; 的 a 标签打开了一个新的页面 B，那么在 B 页面里，window.opener 的值为 A 页面的 window 对象。</p><p>一般来说，打开同源(域名相同)的页面，不会有什么问题。但对于跨域的外部链接来说，存在一个被钓鱼的风险。比如你正在浏览购物网站，从当前网页打开了某个外部链接，在打开的外部页面，可以通过 window.opener.location 改写来源站点的地址。利用这一点，将来源站点改写到钓鱼站点页面上，例如跳转到伪造的高仿购物页面，当再回到购物页面的时候，是很难发现购物网站的地址已经被修改了的，这个时候你的账号就存在被钓鱼的可能了。</p><p>预防策略：</p><ol><li>设置 rel 属性</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">a</span><span style="color:#D19A66;font-style:italic;"> href</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;https://xxxx&quot;</span><span style="color:#D19A66;font-style:italic;"> rel</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;noopener noreferrer&quot;</span><span style="color:#ABB2BF;">&gt; 外链 &lt;</span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>rel=noopener 规定禁止新页面传递源页面的地址，通过设置了此属性的链接打开的页面，其 window.opener 的值为 null。 2. 将外链替换为内部的跳转连接服务，跳转时先跳到内部地址，再由服务器 redirect 到外链。 3. 可以由 widow.open 打开外链。</p><h2 id="文件上传漏洞" tabindex="-1">文件上传漏洞 <a class="header-anchor" href="#文件上传漏洞" aria-label="Permalink to &quot;文件上传漏洞&quot;">​</a></h2><p>服务器未校验上传的文件，致使黑客可以上传恶意脚本等方式。</p><p>预防策略：</p><ol><li>用文件头来检测文件类型，使用白名单过滤(有些文件可以从其中一部分执行，只检查文件头无效，例如 PHP 等脚本语言)；</li><li>上传后将文件彻底重命名并移动到不可执行的目录下；</li><li>升级服务器软件以避免路径解析漏洞；</li><li>升级用到的开源编辑器；</li><li>管理后台设置强密码。</li></ol>`,53),t=[n];function p(r,i,c,d,u,y){return a(),e("div",null,t)}const S=s(l,[["render",p]]);export{B as __pageData,S as default};