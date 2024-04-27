import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const B=JSON.parse('{"title":"Nginx的使用指南","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/nginx/nginx_base.md","filePath":"workspace/Server/nginx/nginx_base.md","lastUpdated":1713971483000}'),e={name:"workspace/Server/nginx/nginx_base.md"},p=l(`<h1 id="nginx的使用指南" tabindex="-1">Nginx的使用指南 <a class="header-anchor" href="#nginx的使用指南" aria-label="Permalink to &quot;Nginx的使用指南&quot;">​</a></h1><h2 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h2><p><a href="http://www.nginx.cn/76.html" target="_blank" rel="noreferrer">nginx基本配置与参数说明</a></p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">#运行用户</span></span>
<span class="line"><span style="color:#C678DD;">user </span><span style="color:#ABB2BF;">nobody;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#启动进程,通常设置成和cpu的数量相等</span></span>
<span class="line"><span style="color:#C678DD;">worker_processes </span><span style="color:#D19A66;"> 1</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#全局错误日志及PID文件</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#error_log  logs/error.log;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#error_log  logs/error.log  notice;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#error_log  logs/error.log  info;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#pid        logs/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#工作模式及连接数上限</span></span>
<span class="line"><span style="color:#C678DD;">events</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #仅用于linux2.6以上内核,可以大大提高nginx的性能</span></span>
<span class="line"><span style="color:#C678DD;">    use </span><span style="color:#D19A66;">  epoll</span><span style="color:#ABB2BF;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #单个后台worker process进程的最大并发链接数    </span></span>
<span class="line"><span style="color:#C678DD;">    worker_connections </span><span style="color:#D19A66;"> 1024</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 并发总数是 worker_processes 和 worker_connections 的乘积</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 即 max_clients = worker_processes * worker_connections</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 为什么上面反向代理要除以4，应该说是一个经验值</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # worker_connections 值的设置跟物理内存大小有关</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # $ cat /proc/sys/fs/file-max</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 输出 34336</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 32000 &lt; 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 使得并发总数小于操作系统可以打开的最大文件数目</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 其实质也就是根据主机的物理CPU和内存进行配置</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # ulimit -SHn 65535</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#C678DD;">http</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #设定mime类型,类型由mime.type文件定义</span></span>
<span class="line"><span style="color:#C678DD;">    include </span><span style="color:#ABB2BF;">   mime.types;</span></span>
<span class="line"><span style="color:#C678DD;">    default_type </span><span style="color:#ABB2BF;"> application/octet-stream;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #设定日志格式</span></span>
<span class="line"><span style="color:#C678DD;">    log_format </span><span style="color:#D19A66;"> main</span><span style="color:#98C379;">  &#39;$</span><span style="color:#E06C75;">remote_addr</span><span style="color:#98C379;"> - $</span><span style="color:#E06C75;">remote_user</span><span style="color:#98C379;"> [$</span><span style="color:#E06C75;">time_local</span><span style="color:#98C379;">] &quot;$</span><span style="color:#E06C75;">request</span><span style="color:#98C379;">&quot; &#39;</span></span>
<span class="line"><span style="color:#98C379;">                      &#39;$</span><span style="color:#E06C75;">status</span><span style="color:#98C379;"> $</span><span style="color:#E06C75;">body_bytes_sent</span><span style="color:#98C379;"> &quot;$</span><span style="color:#E06C75;">http_referer</span><span style="color:#98C379;">&quot; &#39;</span></span>
<span class="line"><span style="color:#98C379;">                      &#39;&quot;$</span><span style="color:#E06C75;">http_user_agent</span><span style="color:#98C379;">&quot; &quot;$</span><span style="color:#E06C75;">http_x_forwarded_for</span><span style="color:#98C379;">&quot;&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">    access_log </span><span style="color:#ABB2BF;"> logs/access.log  </span><span style="color:#D19A66;">main</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #对于普通应用，必须设为 on,</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.</span></span>
<span class="line"><span style="color:#C678DD;">    sendfile </span><span style="color:#D19A66;">    on</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #tcp_nopush     on;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #连接超时时间</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #keepalive_timeout  0;</span></span>
<span class="line"><span style="color:#C678DD;">    keepalive_timeout </span><span style="color:#D19A66;"> 65</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">    tcp_nodelay </span><span style="color:#D19A66;">    on</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#7F848E;font-style:italic;">    #开启gzip压缩</span></span>
<span class="line highlighted"><span style="color:#C678DD;">    gzip </span><span style="color:#D19A66;">on</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;"># 开启gzip</span></span>
<span class="line highlighted"><span style="color:#C678DD;">    gzip_min_length </span><span style="color:#D19A66;">1k</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">#最小1k的文件才使用gzip</span></span>
<span class="line highlighted"><span style="color:#C678DD;">    gzip_buffers </span><span style="color:#D19A66;">4</span><span style="color:#D19A66;"> 8k</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">#代表以8k为单位，按照原始数据大小以8k为单位的4倍申请内存</span></span>
<span class="line highlighted"><span style="color:#C678DD;">    gzip_comp_level </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">#1 压缩比最小处理速度最快，9 压缩比最大但处理最慢（传输快但比较消耗cpu）</span></span>
<span class="line highlighted"><span style="color:#C678DD;">    gzip_types </span><span style="color:#ABB2BF;">application/javascript text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png; </span><span style="color:#7F848E;font-style:italic;"># 支持的文件类型</span></span>
<span class="line highlighted"><span style="color:#C678DD;">    gzip_disable </span><span style="color:#98C379;">&quot;MSIE [1-6]\\.&quot;</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">#IE6一下 Gzip支持的不好，故不实用gzip</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #设定请求缓冲</span></span>
<span class="line"><span style="color:#C678DD;">    client_header_buffer_size </span><span style="color:#D19A66;">   128k</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">    large_client_header_buffers </span><span style="color:#D19A66;"> 4</span><span style="color:#D19A66;"> 128k</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    #设定虚拟主机配置</span></span>
<span class="line"><span style="color:#C678DD;">    server</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        #侦听80端口</span></span>
<span class="line"><span style="color:#C678DD;">        listen </span><span style="color:#D19A66;">   80</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        #定义使用 www.nginx.cn访问</span></span>
<span class="line"><span style="color:#C678DD;">        server_name </span><span style="color:#ABB2BF;"> www.nginx.cn;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        #定义服务器的默认网站根目录位置</span></span>
<span class="line"><span style="color:#C678DD;">        root </span><span style="color:#ABB2BF;">html;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        #设定本虚拟主机的访问日志</span></span>
<span class="line"><span style="color:#C678DD;">        access_log </span><span style="color:#ABB2BF;"> logs/nginx.access.log  </span><span style="color:#D19A66;">main</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#7F848E;font-style:italic;">        #默认请求</span></span>
<span class="line highlighted"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> / {</span></span>
<span class="line highlighted"><span style="color:#7F848E;font-style:italic;">          #定义首页索引文件的名称</span></span>
<span class="line highlighted"><span style="color:#C678DD;">             try_files </span><span style="color:#ABB2BF;">$</span><span style="color:#E06C75;">uri</span><span style="color:#ABB2BF;"> $</span><span style="color:#E06C75;">uri</span><span style="color:#ABB2BF;">/ /index.html;</span></span>
<span class="line highlighted"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # 定义错误提示页面</span></span>
<span class="line"><span style="color:#C678DD;">        error_page </span><span style="color:#D19A66;">  500</span><span style="color:#D19A66;"> 502</span><span style="color:#D19A66;"> 503</span><span style="color:#D19A66;"> 504</span><span style="color:#ABB2BF;"> /50x.html;</span></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> = </span><span style="color:#E06C75;">/50x.html </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        #静态文件，nginx自己处理</span></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ </span><span style="color:#E06C75;">^/(images|javascript|js|css|flash|media|static)/ </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">            #过期30天，静态文件不怎么更新，过期可以设大一点，</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">            #如果频繁更新，则可以设置得小一点。</span></span>
<span class="line"><span style="color:#C678DD;">            expires </span><span style="color:#D19A66;">30d</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        # PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.</span></span>
<span class="line"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ </span><span style="color:#E06C75;">.php$ </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#C678DD;">            fastcgi_pass </span><span style="color:#ABB2BF;">127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#C678DD;">            fastcgi_index </span><span style="color:#ABB2BF;">index.php;</span></span>
<span class="line"><span style="color:#C678DD;">            fastcgi_param </span><span style="color:#ABB2BF;"> SCRIPT_FILENAME  $</span><span style="color:#E06C75;">document_root</span><span style="color:#ABB2BF;">$</span><span style="color:#E06C75;">fastcgi_script_name</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">            include </span><span style="color:#ABB2BF;">fastcgi_params;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#7F848E;font-style:italic;">        #禁止访问 .htxxx 文件</span></span>
<span class="line highlighted"><span style="color:#C678DD;">        location</span><span style="color:#ABB2BF;"> ~ </span><span style="color:#E06C75;">/.ht </span><span style="color:#ABB2BF;">{</span></span>
<span class="line highlighted"><span style="color:#C678DD;">            deny </span><span style="color:#D19A66;">all</span><span style="color:#ABB2BF;">;</span></span>
<span class="line highlighted"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">   include </span><span style="color:#ABB2BF;">vhost/*.conf; </span><span style="color:#7F848E;font-style:italic;"># server可单独抽离出来写，方便管理</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br></div></div><h2 id="负载均衡-反向代理" tabindex="-1">负载均衡（反向代理） <a class="header-anchor" href="#负载均衡-反向代理" aria-label="Permalink to &quot;负载均衡（反向代理）&quot;">​</a></h2><p>1.用户输入<code>http://test-openai.com</code> 时，访问<code>80</code>端口<br> 2.nginx监听到80端口<code>被访问</code>，匹配到的<code>/</code>路径，被反向代理到<code>http://dramatic-offical-website</code><br> 3.<code>dramatic-offical-website</code>集群管理着一堆机器地址，从而实现负载均衡。<br> 4.如果匹配到<code>http://test-openai.com/images/</code> 路径，则直接映射<code>/data</code>下的文件<br></p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;"># 虚拟主机配置</span></span>
<span class="line"><span style="color:#C678DD;">server</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">    server_name </span><span style="color:#ABB2BF;">test-openai.com; </span><span style="color:#7F848E;font-style:italic;"># 请求到达的服务器名</span></span>
<span class="line"><span style="color:#C678DD;">    listen </span><span style="color:#D19A66;">80</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;"># 监听80端口</span></span>
<span class="line"><span style="color:#C678DD;">    listen </span><span style="color:#D19A66;">443</span><span style="color:#ABB2BF;"> ssl; </span><span style="color:#7F848E;font-style:italic;"># https默认端口是443</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 对 / 所有做负载均衡+反向代理</span></span>
<span class="line"><span style="color:#C678DD;">    location</span><span style="color:#ABB2BF;"> / {</span></span>
<span class="line"><span style="color:#C678DD;">        proxy_pass </span><span style="color:#ABB2BF;">http://dramatic-offical-website; </span><span style="color:#7F848E;font-style:italic;"># 代理到目标地址</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 静态文件，nginx自己处理</span></span>
<span class="line"><span style="color:#C678DD;">    location</span><span style="color:#ABB2BF;"> /images/ {</span></span>
<span class="line"><span style="color:#C678DD;">        root </span><span style="color:#ABB2BF;">/data; </span><span style="color:#7F848E;font-style:italic;"># 映射到/data/images</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 设定负载均衡后台服务器列表</span></span>
<span class="line"><span style="color:#C678DD;">upstream</span><span style="color:#ABB2BF;"> dramatic-offical-website {</span></span>
<span class="line"><span style="color:#C678DD;">    server</span><span style="color:#D19A66;"> 10.192.106.133</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">    server</span><span style="color:#D19A66;"> 10.192.106.134</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;"># /etc/nginx/conf.d</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># /usr/local/nginx/conf/vhost</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> /api {</span></span>
<span class="line"><span style="color:#C678DD;">   rewrite</span><span style="color:#E06C75;">  ^/api/(.*)$</span><span style="color:#ABB2BF;"> /$</span><span style="color:#E06C75;">1</span><span style="color:#C678DD;"> break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">   proxy_pass </span><span style="color:#98C379;">&#39;XXXXXXXXXXXXX&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="http缓存控制" tabindex="-1">HTTP缓存控制 <a class="header-anchor" href="#http缓存控制" aria-label="Permalink to &quot;HTTP缓存控制&quot;">​</a></h2><p>常用的缓存设置里面有两种方式，都是使用add_header来设置：分别为<code>Cache-Control</code>和<code>Pragma</code></p><p><code>Pragma</code>可以应用到http 1.0 和http 1.1，只能应用于http 1.1<br><code>Pragma</code>是旧产物，已经逐步抛弃</p><h3 id="pragma" tabindex="-1"><code>Pragma</code> <a class="header-anchor" href="#pragma" aria-label="Permalink to &quot;\`Pragma\`&quot;">​</a></h3><p><code>Pragma</code>有两个字段<code>Pragma</code>和<code>Expires</code>。Pragma的值为no-cache时，表示禁用缓存，Expires的值是一个GMT时间，表示该缓存的有效时间。</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> ~ </span><span style="color:#E06C75;">.*\\.(css|js|swf|php|htm|html )$ </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#C678DD;">	add_header </span><span style="color:#ABB2BF;">Cache-Control max-age=10;</span></span>
<span class="line"><span style="color:#C678DD;">	add_header </span><span style="color:#ABB2BF;">Pragma no-cache;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Pragma的优先级高于Cache-Control</span></span>
<span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> ~ </span><span style="color:#E06C75;">.*\\.(js|css)$ </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#C678DD;">   expires </span><span style="color:#D19A66;">10d</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 若报文中同时出现了 Expires 和 Cache-Control，则以 Cache-Control 为准。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="cache-control-「强制缓存」" tabindex="-1"><code>Cache-Control 「强制缓存」</code> <a class="header-anchor" href="#cache-control-「强制缓存」" aria-label="Permalink to &quot;\`Cache-Control 「强制缓存」\`&quot;">​</a></h3><p>对于强缓存来说，会直接去查看<code>缓存资源中的响应头</code>的字段值，以此来判断缓存的资源是否还能使用，在这个过程中，<code>不需要</code>向服务器发起请求。</p><p><code>public</code>指示响应可被任何缓存区缓存。【如果定义了<code>max-age</code>，可以不用再定义<code>public</code>，它们的意义是一样的。】<br><code>private</code>指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。<br><code>no-cache</code>可以在本地缓存，可以在代理服务器缓存，但是这个缓存要服务器验证才可以使用<br><code>no-store</code>彻底得禁用缓冲，本地和代理服务器都不缓冲，每次都从服务器获取<br><code>max-age</code>指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应 【max-age=1008611】<br><code>only-if-cached</code>表示不进行网络请求，完全只使用缓存，若缓存不命中，则返回503错误<br><code>must-revalidate</code>：告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验<br></p><h3 id="缓存校验「协商缓存」" tabindex="-1"><code>缓存校验「协商缓存」</code> <a class="header-anchor" href="#缓存校验「协商缓存」" aria-label="Permalink to &quot;\`缓存校验「协商缓存」\`&quot;">​</a></h3><p>当超过max-ages设置的时间,这个就会起作用</p><p>而对于协商缓存来说，要判断缓存是否能使用，需要通过发起请求，带着与缓存相关的字段，到服务器去做过期判断后，才能通过相应的内容做出相应的操作。（是回去拿缓存的资源，还是拿这次服务器返回的资源）</p><h3 id="last-modified-if-modified-since" tabindex="-1"><code>Last-Modified/If-Modified-Since</code> <a class="header-anchor" href="#last-modified-if-modified-since" aria-label="Permalink to &quot;\`Last-Modified/If-Modified-Since\`&quot;">​</a></h3><p><code>Last-Modified</code>：标示这个<code>响应</code>资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。<br><code>If-Modified-Since</code>是标准的HTTP请求头标签，在发送HTTP<code>请求</code>时，<strong>把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较</strong>。<br> 如果时间一致，那么返回HTTP状态码304（不返回文件内容），客户端接到之后，就直接把本地缓存文件显示到浏览器中。<br> 如果时间不一致，就返回HTTP状态码200和新的文件内容，客户端接到之后，会丢弃旧文件，把新文件缓存起来，并显示到浏览器中</p><p><code>If-Modified-Since</code>和<code>If-Unmodified-Since</code>的区别是：<br> If-Modified-Since：告诉服务器如果时间一致，返回状态码304<br> If-Unmodified-Since：告诉服务器如果时间不一致，返回状态码412</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">last_modified</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> res</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">headers</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&#39;Last-Modified&#39;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;"># </span><span style="color:#E06C75;">修改headers</span></span>
<span class="line"><span style="color:#E06C75;">headers</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&#39;If-Unmodified-Since&#39;</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> last_modified</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="etag-if-none-match" tabindex="-1"><code>ETag/If-None-Match</code> <a class="header-anchor" href="#etag-if-none-match" aria-label="Permalink to &quot;\`ETag/If-None-Match\`&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">为什么要有etag？</p><p>1、一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新get<br> 2、某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，if-modified-since能检查到的粒度是秒级的，这种修改无法判断<br> 3、某些服务器不能精确的得到文件的最后修改时间。<br></p></div><p><code>etag</code>的方式是这样：服务器通过某个算法对资源进行计算，取得一串值,之后将该值通过etag返回给客户端，客户端下次请求时通过<code>If-None-Match或If-Match</code>带上该值，服务器对该值进行对比校验,如果一致则不要返回资源。</p><p><code>If-None-Match</code>和<code>If-Match</code>的区别是：</p><p><code>If-None-Match</code>：告诉服务器如果一致，返回状态码304，不一致则返回资源<br><code>If-Match</code>：告诉服务器如果不一致，返回状态码412</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;"> location</span><span style="color:#ABB2BF;"> ~* </span><span style="color:#E06C75;">^.+\\.(css|js|txt|xml|swf|wav)$ </span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#            expires      24h;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#            add_header Cache-Control no-store;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#            add_header Cache-Control max-age=43200;</span></span>
<span class="line"><span style="color:#C678DD;">            add_header </span><span style="color:#ABB2BF;">Cache-Control  max-age=86400,s-maxage=3600,must-revalidate;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#            add_header Cache-Control only-if-cached;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#            add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#            add_header Cache-Control must-revalidate;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>有一种场景需要注意</strong></p><ul><li>分布式系统里多台机器间文件的Last-Modified必须保持一致，以免负载均衡到不同机器导致比对失败；</li><li>分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）；</li><li>京东页面的资源请求，返回的repsones header就只有Last-Modified，没有ETag：</li></ul><h3 id="用户行为" tabindex="-1">用户行为 <a class="header-anchor" href="#用户行为" aria-label="Permalink to &quot;用户行为&quot;">​</a></h3><p>F5刷新那个可以去火狐看看</p><p><img src="https://ae01.alicdn.com/kf/He00c7b1f799e40f39f6b6ab2f9f60710J.jpg" alt=""></p><h3 id="流程图" tabindex="-1">流程图 <a class="header-anchor" href="#流程图" aria-label="Permalink to &quot;流程图&quot;">​</a></h3><p><img src="https://ae01.alicdn.com/kf/Hcca8568c990e4f33b30636b57b2fd65cc.jpg" alt=""></p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在前后端不分离的项目中，我们一般会把强缓存设置的时间特别长，一方面是减少304缓存， 另一方面是webpack打包的项目会带有hash值，只要文件发生改变对应的js或者css的hash值就会发生变化，这时候服务端就会重新请求数据，这里不会触碰到任何的缓存。 所以为了更好地运用缓存，提升客户端的体验，减轻服务器的压力，我们一定要要把经常用的库，如antd,echarts等等，单独打包成一个js，这样不会每次上线都会重新请求数据了。 如果线上遇到小的问题特别急，源码又不在身边，需要登录服务器改代码，也尽可能的不直接修改js或者css里面的代码， 这样在强缓存时间内或者用户刷新页面并不会请求到真正的请求数据，会直接使用本地的缓存，浏览器强制刷新会解决此问题，但是在手机端就gg了， 好的办法就是直接把文件名称，加一些hash值，然后在对应的页面修改下，这样就能拿到真正的资源了。（上一家公司遇到的坑）</p><h2 id="_404-转发到兜底页面" tabindex="-1">404 转发到兜底页面 <a class="header-anchor" href="#_404-转发到兜底页面" aria-label="Permalink to &quot;404 转发到兜底页面&quot;">​</a></h2><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> /test {</span></span>
<span class="line"><span style="color:#C678DD;">	error_page </span><span style="color:#D19A66;">404</span><span style="color:#D19A66;"> 403</span><span style="color:#ABB2BF;"> @opr_404_error;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">location</span><span style="color:#ABB2BF;"> @opr_404_error {</span></span>
<span class="line"><span style="color:#C678DD;">	return</span><span style="color:#D19A66;"> 302</span><span style="color:#ABB2BF;"> https://h5.wkdevhub.cn/opr/activity.html?$</span><span style="color:#E06C75;">args</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;"># 带上问号后面的参数</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="系统常用目录" tabindex="-1">系统常用目录 <a class="header-anchor" href="#系统常用目录" aria-label="Permalink to &quot;系统常用目录&quot;">​</a></h2><p><code>/etc</code>下一般是系统<code>全局性</code>的公共文件目录 <br><code>/usr/local</code>一般是<code>第三方软件</code>所存放的目录的分区，可以单独分区，且建议单独挂载分区。 <br><code>/usr/local/src</code>一般是<code>下载的第三方软件</code>。 <br><code>/usr/local/etc</code>下一般指代<code>用户级</code>的公共文件目录 <br><code>/usr/local/bin</code>目录是给用户放置自己的可执行程序. <br><code>/usr/bin</code>下面的都是系统预装的<code>可执行程序</code>，系统升级有可能会被覆盖. <br></p>`,43),o=[p];function c(r,t,i,b,y,d){return a(),n("div",null,o)}const u=s(e,[["render",c]]);export{B as __pageData,u as default};
