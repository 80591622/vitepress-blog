import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const F=JSON.parse('{"title":"Axios 获取文件流导出 excel 表格","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Js/export.md","filePath":"workspace/Js/export.md","lastUpdated":1713942612000}'),p={name:"workspace/Js/export.md"},o=l(`<h1 id="axios-获取文件流导出-excel-表格" tabindex="-1">Axios 获取文件流导出 excel 表格 <a class="header-anchor" href="#axios-获取文件流导出-excel-表格" aria-label="Permalink to &quot;Axios 获取文件流导出 excel 表格&quot;">​</a></h1><h2 id="一、导出excel表格实现的具体思路" tabindex="-1">一、导出excel表格实现的具体思路： <a class="header-anchor" href="#一、导出excel表格实现的具体思路" aria-label="Permalink to &quot;一、导出excel表格实现的具体思路：&quot;">​</a></h2><p>1.创建一个<code>a</code>标签； 2.获取响应头<code>content-disposition</code>作为文件名；(需要服务端放开<code>content-disposition</code>所以尽量自己命名) 3.利用<code>a</code>标签的<code>download</code>属性进行下载</p><p>大多数下也可以直接通过href跳转的方式下载文件，具体看业务。（地址栏下载是不支持添加响应头的）</p><h2 id="二、理解什么是-content-disposition" tabindex="-1">二、理解什么是 <code>Content-Disposition</code> <a class="header-anchor" href="#二、理解什么是-content-disposition" aria-label="Permalink to &quot;二、理解什么是 \`Content-Disposition\`&quot;">​</a></h2><p>Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件。Content-disposition其实可以控制用户请求所得的内容存为一个文件的时候提供一个默认的文件名，文件直接在浏览器上显示或者在访问时弹出文件下载对话框。</p><p>如图所示，后端返回的数据：</p><p><img src="https://tva1.sinaimg.cn/large/008eGmZEly1gpcep6bkhcj30ly0cugom.jpg" alt=""></p><p>务器在协议回包里加了该字段，但因没“暴露”给外部，客户端就“看得到，吃不到”，所以编码的时候前端是不能直接获取到content-disposition</p><p><strong>Access-Control-Expose-Headers</strong></p><p>根据MDN文档：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers" target="_blank" rel="noreferrer">Access-Control-Expose-Headers</a></p><p>默认情况下，header只有六种 simple response headers （简单响应首部）可以暴露给外部：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">Cache</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Control</span></span>
<span class="line"><span style="color:#E06C75;">Content</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Language</span></span>
<span class="line"><span style="color:#E06C75;">Content</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Type</span></span>
<span class="line"><span style="color:#E06C75;">Expires</span></span>
<span class="line"><span style="color:#E06C75;">Last</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Modified</span></span>
<span class="line"><span style="color:#E06C75;">Pragma</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这里的暴露给外部，意思是让客户端可以访问得到，既可以在Network里看到，也可以在代码里获取到他们的值。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">Access</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Control</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Expose</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">Headers</span><span style="color:#ABB2BF;"> : </span><span style="color:#98C379;">&#39;Content-Disposition&#39;</span><span style="color:#7F848E;font-style:italic;"> // 注意是大写</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 指定多个</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// Access-Control-Expose-Headers: Content-Length, X-Kuma-Revision</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="三、文件下载content-disposition中文乱码" tabindex="-1">三、文件下载Content-Disposition中文乱码 <a class="header-anchor" href="#三、文件下载content-disposition中文乱码" aria-label="Permalink to &quot;三、文件下载Content-Disposition中文乱码&quot;">​</a></h2><p>先确定后端的转码格式，一般默认的 <code>UTF-8</code></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">String</span><span style="color:#E06C75;"> fileName</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> &quot;中国.doc&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//方法1：</span></span>
<span class="line"><span style="color:#E5C07B;">response</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">setHeader</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;Content-Disposition&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;attachment; filename=&quot;</span><span style="color:#56B6C2;"> +</span><span style="color:#E5C07B;"> java</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">net</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">URLEncoder</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">encode</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">fileName</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;UTF-8&quot;</span><span style="color:#ABB2BF;">));</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//方法2：使用指定编码，并告诉浏览器编码类型</span></span>
<span class="line"><span style="color:#E5C07B;">response</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">setHeader</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;Content-Disposition&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;attachment; filename*=UTF-8&#39;&#39;&quot;</span><span style="color:#56B6C2;"> +</span><span style="color:#E5C07B;"> URLEncoder</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">encode</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">fileName</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;UTF-8&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//方法3：</span></span>
<span class="line"><span style="color:#E5C07B;">response</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">setHeader</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;Content-Disposition&quot;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&quot;attachment; filename=&quot;</span><span style="color:#56B6C2;"> +</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> String</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">fileName</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">getBytes</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;gb2312&quot;</span><span style="color:#ABB2BF;">), </span><span style="color:#98C379;">&quot;ISO-8859-1&quot;</span><span style="color:#ABB2BF;">));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="四、完整导出表格代码" tabindex="-1">四、完整导出表格代码 <a class="header-anchor" href="#四、完整导出表格代码" aria-label="Permalink to &quot;四、完整导出表格代码&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">down</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#C678DD;">    return</span><span style="color:#61AFEF;"> $axios</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#E06C75;">      method</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;get&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">      url</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">\`</span><span style="color:#C678DD;">\${</span><span style="color:#E5C07B;">$axios</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">defaults</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">baseURL</span><span style="color:#C678DD;">}\${</span><span style="color:#E06C75;">url</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#E06C75;">      responseType</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;blob&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    }).</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">data</span><span style="color:#C678DD;"> =&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">      let</span><span style="color:#E06C75;"> url</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> window</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">URL</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">createObjectURL</span><span style="color:#ABB2BF;">(</span><span style="color:#C678DD;">new</span><span style="color:#61AFEF;"> Blob</span><span style="color:#ABB2BF;">([</span><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">]));</span></span>
<span class="line"><span style="color:#C678DD;">      let</span><span style="color:#E06C75;"> fileName</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> \`</span><span style="color:#C678DD;">\${</span><span style="color:#E5C07B;">router</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">app</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">$route</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">meta</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">title</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">-</span><span style="color:#C678DD;">\${</span><span style="color:#61AFEF;">dayjs</span><span style="color:#ABB2BF;">().</span><span style="color:#61AFEF;">format</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;YYYY-MM-DD日)}.xlsx\`</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#E06C75;">      let</span><span style="color:#E06C75;"> link</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">createElement</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;a&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">      link</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">style</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">display</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> &#39;none&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">      link</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">href</span><span style="color:#56B6C2;"> =</span><span style="color:#E06C75;"> url</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">      link</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">setAttribute</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;download&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">fileName</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">      document</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">body</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">appendChild</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">link</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">      link</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">click</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#E5C07B;">      document</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">body</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">removeChild</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">link</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">    }).</span><span style="color:#61AFEF;">catch</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E5C07B;">      Message</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">error</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;导出失败&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    })</span></span>
<span class="line"><span style="color:#C678DD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,20),e=[o];function t(r,c,B,i,y,C){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{F as __pageData,A as default};