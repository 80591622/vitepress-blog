import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const y=JSON.parse('{"title":"安装Nginx踩到的坑","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/nginx/nginx_local.md","filePath":"workspace/Server/nginx/nginx_local.md","lastUpdated":1713942612000}'),p={name:"workspace/Server/nginx/nginx_local.md"},e=l(`<h1 id="安装nginx踩到的坑" tabindex="-1">安装Nginx踩到的坑 <a class="header-anchor" href="#安装nginx踩到的坑" aria-label="Permalink to &quot;安装Nginx踩到的坑&quot;">​</a></h1><h2 id="装机" tabindex="-1">装机 <a class="header-anchor" href="#装机" aria-label="Permalink to &quot;装机&quot;">​</a></h2><p>先进入 <code>cd /user/local/src</code> 没有<code>src</code>,<code>mkdir src</code>自行新建</p><p><a href="https://nginx.org/download/" target="_blank" rel="noreferrer">nginx下载地址</a></p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">#安装</span></span>
<span class="line"><span style="color:#C678DD;">wget</span><span style="color:#ABB2BF;"> wget http://nginx.org/download/nginx-1.18.0.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#解压  </span></span>
<span class="line"><span style="color:#C678DD;">tar</span><span style="color:#ABB2BF;"> -xzvf nginx-1.18.0.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#进入nginx目录</span></span>
<span class="line"><span style="color:#C678DD;">cd</span><span style="color:#ABB2BF;"> nginx-1.18.0.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#配置</span></span>
<span class="line"><span style="color:#ABB2BF;">./</span><span style="color:#C678DD;">configure</span><span style="color:#ABB2BF;"> --prefix=/usr/local/nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#make</span></span>
<span class="line"><span style="color:#C678DD;">make</span></span>
<span class="line"><span style="color:#C678DD;">make</span><span style="color:#ABB2BF;"> install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="测试是否安装成功" tabindex="-1">测试是否安装成功 <a class="header-anchor" href="#测试是否安装成功" aria-label="Permalink to &quot;测试是否安装成功&quot;">​</a></h2><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">cd</span><span style="color:#ABB2BF;"> /user/local/nginx</span></span>
<span class="line"><span style="color:#ABB2BF;">./</span><span style="color:#D19A66;">sbin/nginx</span><span style="color:#ABB2BF;"> -t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 正常情况的信息输出：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok</span></span>
<span class="line"><span style="color:#ABB2BF;">nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="启动nginx" tabindex="-1">启动nginx <a class="header-anchor" href="#启动nginx" aria-label="Permalink to &quot;启动nginx&quot;">​</a></h2><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">cd</span><span style="color:#ABB2BF;"> /usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#ABB2BF;">./</span><span style="color:#C678DD;">nginx</span><span style="color:#ABB2BF;"> // 启动nginx</span></span>
<span class="line"><span style="color:#ABB2BF;">./</span><span style="color:#C678DD;">nainx</span><span style="color:#ABB2BF;"> -s stop // 停止nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>打开<a href="http://localhost:80" target="_blank" rel="noreferrer">localhost</a> 默认是 80 端口，<strong>切记这里不要使用6666端口号</strong>谷歌和火狐禁用6666端口号。</p><p><img src="https://ae01.alicdn.com/kf/H4ba122e3923a46dfa1ba5477c8d80eaax.jpg" alt=""></p><p>能看见这个页面说明已经成功了。</p><p>为了后期更好的时候nginx，可以配置下全局变量 我用的是软连接 <code>ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/</code></p><h2 id="将nginx作为服务启动" tabindex="-1">将nginx作为服务启动 <a class="header-anchor" href="#将nginx作为服务启动" aria-label="Permalink to &quot;将nginx作为服务启动&quot;">​</a></h2><p>在生产环境中，一般都希望将 nginx 作为一项服务，能在系统重启后自己运行起来。 那就需要在 /usr/lib/systemd/system/ 目录下，创建 nginx.service 文件，并输入以下内容（并保存退出）：</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">cd</span><span style="color:#ABB2BF;"> /usr/lib/systemd/system/</span></span>
<span class="line"><span style="color:#C678DD;">vi</span><span style="color:#ABB2BF;"> nginx.service</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">[Unit]</span></span>
<span class="line"><span style="color:#ABB2BF;">Description=</span><span style="color:#C678DD;">nginx</span></span>
<span class="line"><span style="color:#ABB2BF;">After=network.</span><span style="color:#C678DD;">target</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span></span>
<span class="line"><span style="color:#ABB2BF;">[Service]</span></span>
<span class="line"><span style="color:#ABB2BF;">Type=</span><span style="color:#C678DD;">forking</span></span>
<span class="line"><span style="color:#ABB2BF;">ExecStart=/</span><span style="color:#D19A66;">usr/local</span><span style="color:#ABB2BF;">/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span style="color:#ABB2BF;">ExecReload=/usr/local/nginx/sbin/nginx -s reload</span></span>
<span class="line"><span style="color:#ABB2BF;">ExecStop=/usr/local/nginx/sbin/nginx -s quit</span></span>
<span class="line"><span style="color:#ABB2BF;">PrivateTmp=true</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span></span>
<span class="line"><span style="color:#ABB2BF;">[Install]</span></span>
<span class="line"><span style="color:#ABB2BF;">WantedBy=multi-user.target</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>启动nginx服务(此时需要先用ps查看nginx进程是否已存在，若已存在，则服务会启动失败。启动服务前必须先将nginx进程kill掉)：</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">systemctl</span><span style="color:#ABB2BF;"> start nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>设置开机自启动：</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">systemctl</span><span style="color:#ABB2BF;"> enable nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://tva1.sinaimg.cn/large/008i3skNly1gw8vqjjkg7j31bw0f2gom.jpg" alt=""></p><p>查看服务状态：</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">systemctl</span><span style="color:#ABB2BF;"> status nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="部署服务" tabindex="-1">部署服务 <a class="header-anchor" href="#部署服务" aria-label="Permalink to &quot;部署服务&quot;">​</a></h2><p>既然是在本地配置的nginx就可以用编辑器打开文件了，打开访达然后 <code>shift+com+g</code> 输入 <code>/usr/local/nginx/conf</code>,然后用编辑器打开 <code>nginx.conf</code>配置文件</p><p>打开后是大致是这个样子的有删减</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;"># ...</span></span>
<span class="line"><span style="color:#C678DD;">http</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">    include </span><span style="color:#ABB2BF;">      mime.types;</span></span>
<span class="line"><span style="color:#C678DD;">    default_type </span><span style="color:#ABB2BF;"> application/octet-stream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">    sendfile </span><span style="color:#D19A66;">       on</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">    keepalive_timeout </span><span style="color:#D19A66;"> 65</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">    server</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">        listen </span><span style="color:#D19A66;">      80</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">        server_name </span><span style="color:#ABB2BF;"> localhost;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">         location</span><span style="color:#ABB2BF;"> / {</span></span>
<span class="line"><span style="color:#C678DD;">           root </span><span style="color:#ABB2BF;">html;</span></span>
<span class="line"><span style="color:#C678DD;">           index </span><span style="color:#ABB2BF;"> index.html index.htm;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # ....</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>这里的http块：</strong> 可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。</p><p><strong>这里还有一个权限的问题</strong> ，可能导致项目打开是403，在nginx目录上一级目录执行 <code>sudo chown -R $(whoami) ./nginx</code>，然后重新加载nginx,不行的话看看是不是的打包后的文件没有权限。</p><p><strong>然后我部署自己的服务</strong></p><p>可以保持这个页面的简洁，单独新建一个vhost文件夹 然后在里面配置新项目，最后用 <code>include vhost/*.conf;</code> 直接引入进来；</p><p>我这里展示直接就这样了</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">server</span></span>
<span class="line"><span style="color:#ABB2BF;">     {</span></span>
<span class="line"><span style="color:#ABB2BF;">        listen </span><span style="color:#D19A66;">9001</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">        index </span><span style="color:#ABB2BF;">index.html index.htm index.php default.html default.htm default.php;</span></span>
<span class="line"><span style="color:#C678DD;">        root </span><span style="color:#ABB2BF;"> /home/wwwroot/mic-react/build;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> / {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">          #定义首页索引文件的名称</span></span>
<span class="line"><span style="color:#C678DD;">             try_files </span><span style="color:#ABB2BF;">$</span><span style="color:#E06C75;">uri</span><span style="color:#ABB2BF;"> $</span><span style="color:#E06C75;">uri</span><span style="color:#ABB2BF;">/ /index.html;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ .*\\.(html|text)?$</span></span>
<span class="line"><span style="color:#ABB2BF;">        {</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Origin </span><span style="color:#98C379;">&#39;*&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Headers X-Requested-With;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Methods GET,POST,OPTIONS;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ .*\\.(svg|gif|jpg|jpeg|png|bmp|swf|woff)$</span></span>
<span class="line"><span style="color:#ABB2BF;">        {</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Origin </span><span style="color:#98C379;">&#39;*&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Headers X-Requested-With;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Methods GET,POST,OPTIONS;</span></span>
<span class="line"><span style="color:#C678DD;">            expires </span><span style="color:#D19A66;">30d</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ .*\\.(js|css)?$</span></span>
<span class="line"><span style="color:#ABB2BF;">        {</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Origin </span><span style="color:#98C379;">&#39;*&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Headers X-Requested-With;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Access-Control-Allow-Methods GET,POST,OPTIONS;</span></span>
<span class="line"><span style="color:#C678DD;">            expires </span><span style="color:#D19A66;">12h</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ </span><span style="color:#E06C75;">/.well-known </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#C678DD;">            allow </span><span style="color:#D19A66;">all</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ /\\.</span></span>
<span class="line"><span style="color:#ABB2BF;">        {</span></span>
<span class="line"><span style="color:#C678DD;">            deny </span><span style="color:#D19A66;">all</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">        access_log </span><span style="color:#D19A66;">off</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p>这里有个巨坑，在云服务器的时候 root 对应项目的时候，是可以正常运行的，但是在本地运行的时候，是没办法加载本地资源的😌，全部包404，看遍好多文章都不行，耽误了半天。实际的原因是 <code>nginx做代理后的虚拟路径和静态资源的请求路径不一致导的</code></p><p>然后其实就是单独给静态的资源设置对应的root目录，代码如下：</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> /js/ {</span></span>
<span class="line"><span style="color:#C678DD;">    root </span><span style="color:#ABB2BF;">  /Users/wk/Desktop/my-project/dist/js;</span></span>
<span class="line"><span style="color:#C678DD;">    autoindex </span><span style="color:#D19A66;">on</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> /font/ {</span></span>
<span class="line"><span style="color:#C678DD;">    root </span><span style="color:#ABB2BF;">  /Users/wk/Desktop/my-project/dist/font;</span></span>
<span class="line"><span style="color:#C678DD;">    autoindex </span><span style="color:#D19A66;">on</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> /css/ {</span></span>
<span class="line"><span style="color:#C678DD;">    root </span><span style="color:#ABB2BF;">  /Users/wk/Desktop/my-project/dist/css;</span></span>
<span class="line"><span style="color:#C678DD;">    autoindex </span><span style="color:#D19A66;">on</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 如果打包后还有别的文件，如:img，继续添加就好了...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><br><p>到目前为止，本地的nginx就可以正常运行了，后面遇到什么问题，我在及时更新。</p>`,39),o=[e];function r(c,i,t,b,B,d){return a(),n("div",null,o)}const m=s(p,[["render",r]]);export{y as __pageData,m as default};