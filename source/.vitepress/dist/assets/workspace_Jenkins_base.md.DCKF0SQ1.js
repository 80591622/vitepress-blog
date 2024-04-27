import{_ as s,c as n,o as a,a5 as l}from"./chunks/framework.BQQWXjGs.js";const p="/assets/jenkins.DAASR9l-.jpeg",e="/assets/plugin.B3GnCcqf.png",o="/assets/addGit.CS7OjKE0.png",r="/assets/trigger.5Dhng6r9.png",t="/assets/webhooks.Bn3xk5_L.png",c="/assets/token.joUE1w2P.png",i="/assets/ssh.B58QQRGD.png",y="/assets/deploy.DbO-lZK1.png",b="/assets/email.DpRUhqRd.png",d="/assets/nextEmail.BNchdZcV.png",u="/assets/nextDeployEmail.DzCIgzwx.png",m="/assets/always.DHA5zPpY.png",C="/assets/security.DOHydn2E.png",_=JSON.parse('{"title":"Jenkins自动化部署","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Jenkins/base.md","filePath":"workspace/Jenkins/base.md","lastUpdated":1714061514000}'),h={name:"workspace/Jenkins/base.md"},g=l(`<h1 id="jenkins自动化部署" tabindex="-1">Jenkins自动化部署 <a class="header-anchor" href="#jenkins自动化部署" aria-label="Permalink to &quot;Jenkins自动化部署&quot;">​</a></h1><p><strong>Jenkins学习记录</strong></p><p>学前了解：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">linux</span><span style="color:#98C379;">  shell</span></span>
<span class="line"><span style="color:#61AFEF;">jenkins</span></span>
<span class="line"><span style="color:#61AFEF;">jdk</span><span style="color:#98C379;"> tomcat</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#61AFEF;">Java</span><span style="color:#98C379;"> Development</span><span style="color:#98C379;"> Kit是整个Java核心，包括Java运行环境、Java工具和Java基础类库。JDK作为JAVA开发的环境，不管做JAVA开发还是做安卓开发，都必须在电脑上安装JDK</span></span>
<span class="line"><span style="color:#61AFEF;">tomcat:由Apache组织提供的一种Web服务器,提供对jsp和Servlet的支持。它是一种轻量级的javaWeb容器(服务器</span><span style="color:#ABB2BF;">),也是当前应用最广的JavaWeb服务器(</span><span style="color:#61AFEF;">免费</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#61AFEF;">node</span><span style="color:#98C379;"> npm</span></span>
<span class="line"><span style="color:#61AFEF;">ssh</span></span>
<span class="line"><span style="color:#61AFEF;">git</span><span style="color:#98C379;"> github</span></span>
<span class="line"><span style="color:#61AFEF;">docker</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="why-jenkins" tabindex="-1">Why Jenkins <a class="header-anchor" href="#why-jenkins" aria-label="Permalink to &quot;Why Jenkins&quot;">​</a></h2><p><code>是业界流行开源的持续集成的工具，广泛用于项目开发，具有自动化构建，测试，部署等功能</code></p><p>CI 持续集成</p><p>CD 持续部署</p><img src="`+p+`"><h2 id="配置jdk安装java环境" tabindex="-1">配置jdk安装Java环境 <a class="header-anchor" href="#配置jdk安装java环境" aria-label="Permalink to &quot;配置jdk安装Java环境&quot;">​</a></h2><p><code>jenkins是java编写的，所以需要先安装jdk</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line highlighted"><span style="color:#56B6C2;">cd</span><span style="color:#98C379;"> /usr/local/src</span><span style="color:#98C379;"> //选择下载目录</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#61AFEF;">wget</span><span style="color:#98C379;"> https://download.oracle.com/otn/java/jdk/8u221-b11/230deb18db3e4014bb8e3e8324f81b43/jdk-8u221-linux-x64.tar.gz</span></span>
<span class="line"><span style="color:#61AFEF;">wget</span><span style="color:#98C379;"> http://img.zhufengpeixun.cn/jdk1.8.0_211.tar.gz</span><span style="color:#98C379;">  //下载目录备份</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#61AFEF;">tar</span><span style="color:#D19A66;"> -xzvf</span><span style="color:#ABB2BF;"> [name] //解压</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#61AFEF;">mkdir</span><span style="color:#98C379;"> /usr/java</span><span style="color:#98C379;"> //创建Java的目录</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#61AFEF;">cp</span><span style="color:#D19A66;"> -r</span><span style="color:#ABB2BF;"> [name]   /usr/java //copy</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#61AFEF;">ln</span><span style="color:#D19A66;"> -s</span><span style="color:#98C379;">  /usr/java/[name]/bin/java</span><span style="color:#98C379;"> /usr/bin/java</span><span style="color:#98C379;">   //创建一个软连接</span><span style="color:#98C379;"> or</span><span style="color:#98C379;"> 创建全局变量</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#61AFEF;">java</span><span style="color:#D19A66;"> -version</span><span style="color:#98C379;"> //查看版本号是否成功</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="配置-启动-jenkins" tabindex="-1">配置/启动 Jenkins <a class="header-anchor" href="#配置-启动-jenkins" aria-label="Permalink to &quot;配置/启动 Jenkins&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">cd</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">etc</span><span style="color:#56B6C2;">/</span><span style="color:#E5C07B;">yum</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">repos</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">d</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">wget</span><span style="color:#E06C75;"> http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//pkg.jenkins.io/redhat/jenkins.repo   //安装源</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">rpm</span><span style="color:#56B6C2;"> --</span><span style="color:#C678DD;">import</span><span style="color:#E06C75;"> http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//pkg.jenkins.io/redhat/jenkins.io.key//导入验证的key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">yum</span><span style="color:#E06C75;"> install</span><span style="color:#ABB2BF;"> -</span><span style="color:#E06C75;">y</span><span style="color:#E06C75;"> jenkins</span><span style="color:#7F848E;font-style:italic;">     //yum安装</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">service</span><span style="color:#E06C75;"> jenkins</span><span style="color:#E06C75;"> start</span><span style="color:#ABB2BF;">/</span><span style="color:#E06C75;">stop</span><span style="color:#ABB2BF;">/</span><span style="color:#E06C75;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">打开</span><span style="color:#98C379;"> \`http://120.79.229.197:8080\`</span><span style="color:#7F848E;font-style:italic;">  //打开jenkins</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//ip/exit //关闭jenkins服务.</span></span>
<span class="line"><span style="color:#E06C75;">http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//ip/reload //重新加载配置信息</span></span>
<span class="line"><span style="color:#E06C75;">http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//ip/restart //重启</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">-------------</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">systemctl</span><span style="color:#E06C75;"> start</span><span style="color:#E06C75;">  mysqld</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">service</span></span>
<span class="line"><span style="color:#E06C75;">systemctl</span><span style="color:#E06C75;"> start</span><span style="color:#E06C75;">  docker</span></span>
<span class="line"><span style="color:#E06C75;">docker</span><span style="color:#E06C75;"> ps</span><span style="color:#ABB2BF;"> -</span><span style="color:#E06C75;">a</span></span>
<span class="line"><span style="color:#E06C75;">docker</span><span style="color:#E06C75;"> start</span><span style="color:#ABB2BF;">  [</span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="如果是wget-安装的话" tabindex="-1">如果是wget 安装的话 <a class="header-anchor" href="#如果是wget-安装的话" aria-label="Permalink to &quot;如果是wget 安装的话&quot;">​</a></h3><p><code>启动jenkins</code><br> java -jar jenkins.war --httpPort=8081</p><p><code>如果想要在linux后台一直运行，则要开始加nohup，在末尾加&amp;号</code><br> nohup java -jar jenkins.war --httpPort=8081 &amp;</p><p>启动后 会生成一个nohup.out输出，需要的话，可以tail -f nohup.out实时查看日志</p><p><code>列出jenkins的所有进程</code><br> ps -aux|grep jenkins</p><p><code>杀死这个进程</code><br> kill -9 [PID]</p><h3 id="登录" tabindex="-1">登录 <a class="header-anchor" href="#登录" aria-label="Permalink to &quot;登录&quot;">​</a></h3><p>账号：admin <br> 密码：<code>cat /var/lib/jenkins/secrets/initialAdminPassword</code>（初始密码）</p><h2 id="安装插件" tabindex="-1">安装插件 <a class="header-anchor" href="#安装插件" aria-label="Permalink to &quot;安装插件&quot;">​</a></h2><p>首先重置安装源，切换到中国的镜像</p><p>系统管理-&gt;插件管理-&gt;高级-&gt;升级的站点</p><p><code>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</code> 清华大学的站点</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">Generic</span><span style="color:#E06C75;"> Webhook</span><span style="color:#E06C75;"> Trigger</span><span style="color:#7F848E;font-style:italic;">  //web触发器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">Publish</span><span style="color:#E06C75;"> Over</span><span style="color:#E5C07B;"> SSH</span><span style="color:#7F848E;font-style:italic;">  //通过ssh部署服务器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">nvm</span><span style="color:#E06C75;"> wrapper</span><span style="color:#7F848E;font-style:italic;">   //提供node环境 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">Role</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">based</span><span style="color:#E06C75;"> Authorization</span><span style="color:#E06C75;"> Strategy</span><span style="color:#7F848E;font-style:italic;">//增加用户的权限管理</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="手动下载jenkins插件" tabindex="-1">手动下载jenkins插件 <a class="header-anchor" href="#手动下载jenkins插件" aria-label="Permalink to &quot;手动下载jenkins插件&quot;">​</a></h3><p>插件下载地址：<code>http://updates.jenkins-ci.org/download/plugins/</code></p><p>如果有插件一直安装失败的情况，可以从jenkins官网下载插件，然后导入到jenkins。</p><p>示例：我从官方下载gitlab-plugin插件到本地，然后导入到jenkins中。</p><p>在jenkins<code>插件管理-&gt;高级</code>选择上传插件进行安装。</p><img src="`+e+`"><h2 id="关闭防火墙" tabindex="-1">关闭防火墙 <a class="header-anchor" href="#关闭防火墙" aria-label="Permalink to &quot;关闭防火墙&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">设置开机启用防火墙：systemctl</span><span style="color:#98C379;"> enable</span><span style="color:#98C379;"> firewalld.service</span></span>
<span class="line"><span style="color:#61AFEF;">设置开机禁用防火墙：systemctl</span><span style="color:#98C379;"> disable</span><span style="color:#98C379;"> firewalld.service</span></span>
<span class="line"><span style="color:#61AFEF;">启动防火墙：systemctl</span><span style="color:#98C379;"> start</span><span style="color:#98C379;"> firewalld</span></span>
<span class="line"><span style="color:#61AFEF;">关闭防火墙：systemctl</span><span style="color:#98C379;"> stop</span><span style="color:#98C379;"> firewalld.service</span></span>
<span class="line"><span style="color:#61AFEF;">检查防火墙状态：systemctl</span><span style="color:#98C379;"> status</span><span style="color:#98C379;"> firewalld</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="添加项目" tabindex="-1">添加项目 <a class="header-anchor" href="#添加项目" aria-label="Permalink to &quot;添加项目&quot;">​</a></h2><p>新建一个任务[name]-&gt;构架一个自由风格的项目-&gt;确定</p><p>源代码-&gt;git-&gt;<a href="https://github.com/wkvictory/weapp.git-" target="_blank" rel="noreferrer">https://github.com/wkvictory/weapp.git-</a>&gt;添加权限【git 的用户名和密码】-&gt;构建触发器(Generic Webhook Trigger)-&gt;应用保存</p><img src="`+o+'"><img src="'+r+'"><h2 id="配置webhook" tabindex="-1">配置webhook <a class="header-anchor" href="#配置webhook" aria-label="Permalink to &quot;配置webhook&quot;">​</a></h2><p>此时可以构建了，但是需要在还给Git中添加Webhooks，否则不能自动化构建</p><img src="'+t+'"><p><code>http://JENKINS_URL/generic-webhook-trigger/invoke</code></p><p>JENKINS_URL格式为 <code>用户名:token@ip:8080</code></p><p><strong>token生成的位置</strong><br><img src="'+c+`"></p><p>admin<br> 1108c27bdd32e70d8ba6ba7893bcf57450<br> 120.79.229.197:8080<br><a href="http://admin:1108c27bdd32e70d8ba6ba7893bcf57450@120.79.229.197:8080/generic-webhook-trigger/invoke" target="_blank" rel="noreferrer">http://admin:1108c27bdd32e70d8ba6ba7893bcf57450@120.79.229.197:8080/generic-webhook-trigger/invoke</a></p><h2 id="触发" tabindex="-1">触发 <a class="header-anchor" href="#触发" aria-label="Permalink to &quot;触发&quot;">​</a></h2><p>手动触发，查看日志是否成功<br> 代码默认目录,在控制台查看 cd /var/lib/jenkins/workspace/[name]</p><p>也可以Git提交一版代码触发看是否成功</p><h2 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-label="Permalink to &quot;构建&quot;">​</a></h2><p>下拉任务名字-&gt;配置-&gt;构建环境（选中Run the build in an NVM managed environment，【我们自己下载的插件提供node环境】）-&gt; 输入node的版本号-&gt;构建-&gt;选择shell</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#56B6C2;">echo</span><span style="color:#E06C75;"> $GIT_BRANCH</span></span>
<span class="line"><span style="color:#61AFEF;">npm</span><span style="color:#98C379;"> config</span><span style="color:#98C379;"> set</span><span style="color:#98C379;"> registry</span><span style="color:#98C379;"> https://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#61AFEF;">npm</span><span style="color:#98C379;"> install</span><span style="color:#D19A66;"> -g</span><span style="color:#98C379;"> yarn</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#61AFEF;">yarn</span><span style="color:#98C379;"> config</span><span style="color:#98C379;"> set</span><span style="color:#98C379;"> registry</span><span style="color:#98C379;"> https://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#61AFEF;">yarn</span><span style="color:#98C379;"> install</span></span>
<span class="line"><span style="color:#61AFEF;">yarn</span><span style="color:#98C379;"> global</span><span style="color:#98C379;"> add</span><span style="color:#98C379;"> @tarojs/cli@1.3.14</span></span>
<span class="line"><span style="color:#61AFEF;">yarn</span><span style="color:#98C379;"> build:h5</span></span>
<span class="line"><span style="color:#61AFEF;">tar</span><span style="color:#D19A66;"> -czvf</span><span style="color:#98C379;"> dist.tar.gz</span><span style="color:#98C379;"> dist/h5</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="添加服务器的私钥" tabindex="-1">添加服务器的私钥 <a class="header-anchor" href="#添加服务器的私钥" aria-label="Permalink to &quot;添加服务器的私钥&quot;">​</a></h2><p>系统管理-&gt;系统设置-&gt;Publish over SSH</p><img src="`+i+'"><h2 id="配置免费登录-同一台也要" tabindex="-1">配置免费登录（同一台也要） <a class="header-anchor" href="#配置免费登录-同一台也要" aria-label="Permalink to &quot;配置免费登录（同一台也要）&quot;">​</a></h2><p>ssh-keygen -t rsa</p><p>ssh-copy-id 120.79.229.197</p><p><code>这里不配置免登录，在部署的时候，找不到要部署的服务器</code></p><h2 id="构建后操作" tabindex="-1">构建后操作 <a class="header-anchor" href="#构建后操作" aria-label="Permalink to &quot;构建后操作&quot;">​</a></h2><p>下拉任务名字-&gt;配置-&gt;构建后操作-&gt;Send build artifacts over SSH <br><img src="'+y+'"></p><h2 id="邮件提醒" tabindex="-1">邮件提醒 <a class="header-anchor" href="#邮件提醒" aria-label="Permalink to &quot;邮件提醒&quot;">​</a></h2><p>1.系统管理-&gt;系统设置-&gt;Jenkins Location(系统管理员邮件地址) <a href="mailto:feng960106@163.com" target="_blank" rel="noreferrer">feng960106@163.com</a></p><p>2.系统管理-&gt;系统设置-&gt;Extended E-mail Notification</p><img src="'+b+'"><p>3.系统管理-&gt;系统设置-&gt;邮件通知</p><img src="'+d+'"><p>4.拉任务名字-&gt;配置-&gt;构建后操作-&gt;Editable Email Notification</p><img src="'+u+'"><br><img src="'+m+`"><blockquote><p>优化jenkins运行内存 vim /etc/sysconfig/jenkins</p></blockquote><h2 id="jenkins权限设置错误" tabindex="-1">Jenkins权限设置错误 <a class="header-anchor" href="#jenkins权限设置错误" aria-label="Permalink to &quot;Jenkins权限设置错误&quot;">​</a></h2><h3 id="修改config-xml" tabindex="-1">修改config.xml <a class="header-anchor" href="#修改config-xml" aria-label="Permalink to &quot;修改config.xml&quot;">​</a></h3><p>先查看目录 find / -name jenkins</p><ul><li>cd /var/lib/jenkins</li></ul><p>先备份 cp config.xml wk.xml</p><p>删除以下内容：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">authorizationStrategy</span><span style="color:#D19A66;font-style:italic;"> class</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;hudson.security.ProjectMatrixAuthorizationStrategy&quot;</span><span style="color:#ABB2BF;">&gt; </span></span>
<span class="line"><span style="color:#ABB2BF;">  ...</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E5C07B;">authorizationStrategy</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">securityRealm</span><span style="color:#D19A66;font-style:italic;"> class</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;hudson.security.HudsonPrivateSecurityRealm&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">disableSignup</span><span style="color:#ABB2BF;">&gt;true&lt;/</span><span style="color:#E5C07B;">disableSignup</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">enableCaptcha</span><span style="color:#ABB2BF;">&gt;false&lt;/</span><span style="color:#E5C07B;">enableCaptcha</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E5C07B;">securityRealm</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>启动jenkins</strong></p><p>service jenkins restart</p><p><strong>再次访问Jenkins后，首先要设置登录认证。</strong></p><img src="`+C+`"><h2 id="jenkins调优" tabindex="-1">Jenkins调优 <a class="header-anchor" href="#jenkins调优" aria-label="Permalink to &quot;Jenkins调优&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;"># 查看物理CPU个数</span></span>
<span class="line"><span style="color:#61AFEF;">cat</span><span style="color:#98C379;"> /proc/cpuinfo</span><span style="color:#ABB2BF;">| </span><span style="color:#61AFEF;">grep</span><span style="color:#98C379;"> &quot;physical id&quot;</span><span style="color:#ABB2BF;">| </span><span style="color:#61AFEF;">sort</span><span style="color:#ABB2BF;">| </span><span style="color:#61AFEF;">uniq</span><span style="color:#ABB2BF;">| </span><span style="color:#61AFEF;">wc</span><span style="color:#D19A66;"> -l</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 查看每个物理CPU中core的个数(即核数)</span></span>
<span class="line"><span style="color:#61AFEF;">cat</span><span style="color:#98C379;"> /proc/cpuinfo</span><span style="color:#ABB2BF;">| </span><span style="color:#61AFEF;">grep</span><span style="color:#98C379;"> &quot;cpu cores&quot;</span><span style="color:#ABB2BF;">| </span><span style="color:#61AFEF;">uniq</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 限制jenkins 启动占用内存</span></span>
<span class="line"><span style="color:#61AFEF;">vim</span><span style="color:#98C379;"> /etc/sysconfig/jenkins</span></span>
<span class="line"><span style="color:#E06C75;">JENKINS_JAVA_OPTIONS</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;-XX:MaxPermSize=512m -Djava.awt.headless=true&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">cd</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">usr</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">mongodb</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">bin</span></span>
<span class="line"><span style="color:#ABB2BF;">.</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">mongod</span><span style="color:#56B6C2;">  --</span><span style="color:#E06C75;">config</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">usr</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">local</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">mongodb</span><span style="color:#56B6C2;">/</span><span style="color:#E5C07B;">mongodb</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">pm2</span><span style="color:#E06C75;"> start</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">home</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">admin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">fenggeServer</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">bin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">www</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&#39;fenggezaoxing&#39;</span></span>
<span class="line"><span style="color:#E06C75;">pm2</span><span style="color:#E06C75;"> start</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">home</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">admin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">workplaceServer</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">bin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">www</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&#39;workplace&#39;</span></span>
<span class="line"><span style="color:#E06C75;">pm2</span><span style="color:#E06C75;"> start</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">home</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">admin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">transition</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">bin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">www</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&#39;transition&#39;</span></span>
<span class="line"><span style="color:#E06C75;">pm2</span><span style="color:#E06C75;"> start</span><span style="color:#56B6C2;"> /</span><span style="color:#E06C75;">home</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">admin</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">wangyiyunServer</span><span style="color:#56B6C2;">/</span><span style="color:#E5C07B;">app</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">js</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&#39;wangyiyunServer&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="卸载jenkins" tabindex="-1">卸载jenkins <a class="header-anchor" href="#卸载jenkins" aria-label="Permalink to &quot;卸载jenkins&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">service</span><span style="color:#E06C75;"> jenkins</span><span style="color:#E06C75;"> stop</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#E06C75;">yum</span><span style="color:#E06C75;"> clean</span><span style="color:#E06C75;"> all</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#E06C75;">yum</span><span style="color:#56B6C2;"> -</span><span style="color:#E06C75;">y</span><span style="color:#E06C75;"> remove</span><span style="color:#E06C75;"> jenkins</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,89),B=[g];function E(k,F,v,A,j,f){return a(),n("div",null,B)}const q=s(h,[["render",E]]);export{_ as __pageData,q as default};
