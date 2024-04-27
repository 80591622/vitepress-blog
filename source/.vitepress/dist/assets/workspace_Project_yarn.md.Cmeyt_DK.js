import{_ as a,c as n,o as s,a5 as e}from"./chunks/framework.BQQWXjGs.js";const b=JSON.parse('{"title":"yarn & npm","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Project/yarn.md","filePath":"workspace/Project/yarn.md","lastUpdated":1713955424000}'),r={name:"workspace/Project/yarn.md"},p=e(`<h1 id="yarn-npm" tabindex="-1">yarn &amp; npm <a class="header-anchor" href="#yarn-npm" aria-label="Permalink to &quot;yarn &amp; npm&quot;">​</a></h1><h2 id="node升级" tabindex="-1">node升级 <a class="header-anchor" href="#node升级" aria-label="Permalink to &quot;node升级&quot;">​</a></h2><p>1、window系统升级node就只有到node官网下载window安装包来覆盖之前的node</p><p>2、mac升级node版本 npm i -g n n 12.9.1 //指定版本升级 n latest //安装最新版本 n stable //安装最稳定的版本</p><p>强烈推荐使用 nvm</p><p><strong>nvm常用命令</strong></p><p>命令 说明</p><p>nvm list nrm ls 查看已经安装的版本 <br> nvm list installed 查看已经安装的版本<br> nvm list available 查看网络可以安装的版本<br> nvm arch 查看当前系统的位数和当前nodejs的位数<br> nvm install [arch] 安装制定版本的node 并且可以指定平台 version 版本号 arch 平台<br> nvm on 打开nodejs版本控制 (在第一次使用nvm安装node后，要记得使用 nvm use 切换下node版本，以及用 nvm on 打开nodejs版本控制，不然这时候node和npm也都不可用。)<br> nvm off 关闭nodejs版本控制<br> nvm proxy [url] 查看和设置代理<br> nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 <a href="https://nodejs.org/dist/" target="_blank" rel="noreferrer">https://nodejs.org/dist/</a> <br> nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是：<a href="https://github.com/npm/npm/archive/" target="_blank" rel="noreferrer">https://github.com/npm/npm/archive/</a>. <br> nvm uninstall 卸载制定的版本<br> nvm use [version] [arch] 切换制定的node版本和位数<br> nvm root [path] 设置和查看root路径<br> nvm version 查看当前的版本<br></p><h2 id="升级包" tabindex="-1">升级包 <a class="header-anchor" href="#升级包" aria-label="Permalink to &quot;升级包&quot;">​</a></h2><p>方式1</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">npm</span><span style="color:#E06C75;"> install</span><span style="color:#56B6C2;"> -</span><span style="color:#E06C75;">g</span><span style="color:#E06C75;"> npm</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">check</span><span style="color:#7F848E;font-style:italic;">    //安装全局的包</span></span>
<span class="line"><span style="color:#E06C75;">npm</span><span style="color:#E06C75;"> update</span><span style="color:#56B6C2;"> &lt;</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">&gt;</span><span style="color:#56B6C2;"> -</span><span style="color:#E06C75;">g</span><span style="color:#7F848E;font-style:italic;">        //全部安装不建议用</span></span>
<span class="line"><span style="color:#E06C75;">npm</span><span style="color:#E06C75;"> update</span><span style="color:#56B6C2;"> &lt;</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">&gt;</span><span style="color:#7F848E;font-style:italic;">           //单个安装</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>方式2</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">yarn</span><span style="color:#E06C75;"> global</span><span style="color:#E06C75;"> add</span><span style="color:#E06C75;"> npm</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">check</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">updates</span><span style="color:#7F848E;font-style:italic;">  //安装全局的包</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//ncu  查看所有可以安装的包</span></span>
<span class="line"><span style="color:#E06C75;">sudo</span><span style="color:#E06C75;"> ncu</span><span style="color:#56B6C2;"> -</span><span style="color:#E06C75;">u</span><span style="color:#56B6C2;"> &lt;</span><span style="color:#E06C75;">name</span><span style="color:#56B6C2;">&gt;</span><span style="color:#7F848E;font-style:italic;">  //这个只是改变package里面的版本 不会更新包</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//所以要sudo ncu -u &lt;name&gt; &amp;&amp; sudo yarn</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>方式3推荐</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">yarn</span><span style="color:#E06C75;"> upgrade</span><span style="color:#56B6C2;">-</span><span style="color:#E06C75;">interactive</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">latest</span><span style="color:#7F848E;font-style:italic;"> //需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>方式4</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">yarn</span><span style="color:#E06C75;"> upgrade</span><span style="color:#E06C75;"> react</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">latest</span><span style="color:#7F848E;font-style:italic;"> //yarn upgrade 更新依赖包时yarn.lock更新但package.json不同步更新版本信息,网上说会同步更新，我试了下，未更新，具体看你们</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="切换源" tabindex="-1">切换源 <a class="header-anchor" href="#切换源" aria-label="Permalink to &quot;切换源&quot;">​</a></h2><h3 id="yarn-切换源" tabindex="-1">yarn 切换源 <a class="header-anchor" href="#yarn-切换源" aria-label="Permalink to &quot;yarn 切换源&quot;">​</a></h3><p>1、<code>查看一下当前源</code> yarn config get registry<br> 2、<code>切换为淘宝源</code> yarn config set registry <a href="https://registry.npm.taobao.org" target="_blank" rel="noreferrer">https://registry.npm.taobao.org</a><br> 3、<code>或者切换为自带的</code> yarn config set registry <a href="https://registry.yarnpkg.com" target="_blank" rel="noreferrer">https://registry.yarnpkg.com</a></p><h3 id="npm-切换源" tabindex="-1">npm 切换源 <a class="header-anchor" href="#npm-切换源" aria-label="Permalink to &quot;npm 切换源&quot;">​</a></h3><p>1、<code>全局配置切换到淘宝源</code> npm config set registry <a href="https://registry.npm.taobao.org" target="_blank" rel="noreferrer">https://registry.npm.taobao.org</a><br> 2、<code>检测是否切换到了淘宝源</code> npm info underscore</p><h3 id="淘宝-npm-镜像站切换新域名" tabindex="-1">淘宝 NPM 镜像站切换新域名 <a class="header-anchor" href="#淘宝-npm-镜像站切换新域名" aria-label="Permalink to &quot;淘宝 NPM 镜像站切换新域名&quot;">​</a></h3><p>淘宝为了提供更稳定、更安全、更符合国家法律法规要求的镜像服务（说人话就是怕国家找茬所以要低调）， 将要更换淘宝npm源的服务器，并且老的域名 <a href="./npm.taobao.org.html">npm.taobao.org</a> 和 registry.npm.taobao.org 将不再使用。</p><p>2022年5月31日0时，这两个老域名将会停止服务，截至目前，通过老域名安装npm包已经会被301到新域名 registry.npmmirror.com</p><p>Web 站点：<a href="https://npmmirror.com" target="_blank" rel="noreferrer">https://npmmirror.com</a></p><p>Registry Endpoint：<a href="https://registry.npmmirror.com" target="_blank" rel="noreferrer">https://registry.npmmirror.com</a></p><p><strong>可能受到的影响和处理方式</strong></p><ul><li>企业用户需要联系 网管/IT/SRE 更新防火墙白名单。</li><li>cnpm 自身的 CLI，我们会对每个大版本都发个 patch 去更新，开发者重新安装即可。</li><li>nrm 等工具，需要提 PR 去更新内置的域名。</li><li>一些开发者自己封装的工具，如 egg-init，需要维护者自行提 PR 去更新。</li><li>存量应用的 lock 文件，开发者需要自行执行 sed 等指令去替换或重新生成。</li><li>本地 npmrc 里面的 registry 地址，（如果有，则）需要开发者自行更新。</li><li>平台应用里面写死的，需开发者自己更新并部署。</li></ul><p><a href="https://registry.npmmirror.com" target="_blank" rel="noreferrer">知乎 阿里</a></p><h2 id="你必须知道的yarn" tabindex="-1">你必须知道的yarn <a class="header-anchor" href="#你必须知道的yarn" aria-label="Permalink to &quot;你必须知道的yarn&quot;">​</a></h2><p><a href="https://code.fb.com/web/yarn-a-new-package-manager-for-javascript/" target="_blank" rel="noreferrer">yarn的起源</a>已经解释了为什么要创建一个新的javascript包管理器， 这里笔者也推荐大家从npm切换为yarn。npm4就不说了，速度太慢了，npm5借鉴了很多yarn的机制，比如简单的版本锁、重写cache模块等，减少了与yarn的差距。 但依然有些地方做的不如yarn,<a href="https://jobs.stratsys.com/blog/posts/9244-npm5-vs-yarn-which-one-is-better" target="_blank" rel="noreferrer">这篇文章</a>记录了npm5和yarn的实验对比，结论是：在没有缓存时，yarn和npm5速度差不多；在有缓存时，yarn比npm5快2倍。</p><h3 id="yarn优势" tabindex="-1">yarn优势 <a class="header-anchor" href="#yarn优势" aria-label="Permalink to &quot;yarn优势&quot;">​</a></h3><p>以下针对npm5前:</p><ul><li><code>yarn 离线安装。</code> 下载的时候 Yarn 缓存了所有的包以至于不需要再次从网络下载</li><li><code>yarn并行下载，使得时间更快。</code> 通过并行操作最大限度地提高资源利用率，以至于再次下载的时候安装时间比之前更快。npm5之前是等上一个安装完后再执行下一个，串行下载。</li><li><code>yarn锁包yarn-lock，保证引用包正确。</code> yarn.lock 文件准确的锁定了所有被下载和项目依赖的包版本。通过这个文件，你能确定你的工程师团队的每一位成员都能安装准确的包，并且可以更容易的部署，而没有意外 bug出现。</li></ul><h3 id="yarn指令" tabindex="-1">yarn指令 <a class="header-anchor" href="#yarn指令" aria-label="Permalink to &quot;yarn指令&quot;">​</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#56B6C2;">*</span><span style="color:#98C379;"> \`yarn bin\`</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">打印出执行脚本的位置</span><span style="color:#ABB2BF;">，</span><span style="color:#E06C75;">可以被yarn</span><span style="color:#E06C75;"> run执行</span><span style="color:#ABB2BF;">。</span><span style="color:#E06C75;">相当于npm</span><span style="color:#E06C75;"> bin</span></span>
<span class="line"><span style="color:#56B6C2;">*</span><span style="color:#98C379;"> \`yarn login/yarn publish\`</span><span style="color:#E06C75;"> npm登录和发布</span><span style="color:#ABB2BF;">。</span><span style="color:#E06C75;">相当于npm</span><span style="color:#E06C75;"> login</span><span style="color:#56B6C2;">/</span><span style="color:#E06C75;">npm</span><span style="color:#E06C75;"> publish</span></span>
<span class="line"><span style="color:#56B6C2;">*</span><span style="color:#98C379;"> \`yarn cache clean\`</span><span style="color:#ABB2BF;">，</span><span style="color:#E06C75;">清除缓存</span><span style="color:#ABB2BF;">，</span><span style="color:#E06C75;">相当于npm</span><span style="color:#E06C75;"> cache</span><span style="color:#E06C75;"> clean</span><span style="color:#ABB2BF;">。</span></span>
<span class="line"><span style="color:#56B6C2;">*</span><span style="color:#98C379;"> \`yarn list\`</span><span style="color:#E06C75;"> 列出当前所有依赖的包</span></span>
<span class="line"><span style="color:#56B6C2;">*</span><span style="color:#98C379;"> \`yarn config list\`</span><span style="color:#E06C75;"> 显示所有配置设置</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="npm-发布包" tabindex="-1">npm 发布包 <a class="header-anchor" href="#npm-发布包" aria-label="Permalink to &quot;npm 发布包&quot;">​</a></h2><h3 id="npm-link" tabindex="-1">npm link <a class="header-anchor" href="#npm-link" aria-label="Permalink to &quot;npm link&quot;">​</a></h3><p>记录一下，开发npm包时要在项目中调试，可以在npm包中执行npm link 链接到全局，</p><p>在项目中npm link xxxxx(npm包名)；当调试完成后，解除npm link 可以在项目中执行 npm unlink xxxx(npm包名)</p><p>第二种方法，npm list -g --depth 0查看全局安装的包，找到全局包的路径，直接删除这个文件</p><h3 id="发布" tabindex="-1">发布 <a class="header-anchor" href="#发布" aria-label="Permalink to &quot;发布&quot;">​</a></h3><p><code>npm publish</code></p><p>很多软件在正式发布前都会发布一些预览版或者测试版，一般都叫“beta版”或者 “rc版”，特别是开源软件，甚至有“alpha版”，下面来解释一下各个版本的意思。</p><p><strong>alpha版</strong>：内部测试版。α是希腊字母的第一个，表示最早的版本，一般用户不要下载这个版本，这个版本包含很多BUG，功能也不全，主要是给开发人员和 测试人员测试和找BUG用的。</p><p><strong>beta版</strong>：公开测试版。β是希腊字母的第二个，顾名思义，这个版本比alpha版发布得晚一些，主要是给“部落”用户和忠实用户测试用的，该版本任然存 在很多BUG，但是相对alpha版要稳定一些。这个阶段版本的软件还会不断增加新功能。如果你是发烧友，可以下载这个版本。</p><p><strong>rc版</strong>：全写：Release Candidate（候选版本），该版本又较beta版更进一步了，该版本功能不再增加，和最终发布版功能一样。这个版本有点像最终发行版之前的一个类似 预览版，这个的发布就标明离最终发行版不远了。作为普通用户，如果你很急着用这个软件的话，也可以下载这个版本。</p><p><strong>stable版</strong>：稳定版。在开源软件中，都有stable版，这个就是开源软件的最终发行版，用户可以放心大胆的用了。</p><h3 id="发布组织包" tabindex="-1">发布组织包 <a class="header-anchor" href="#发布组织包" aria-label="Permalink to &quot;发布组织包&quot;">​</a></h3><p>类似于 @/babel/core ...</p><p>现在npm 下申请一个组织名字，然后执行 npm init --scope=@起好的名字，现在就可以执行 npm publish 发布了</p><h3 id="删除npm包" tabindex="-1">删除npm包 <a class="header-anchor" href="#删除npm包" aria-label="Permalink to &quot;删除npm包&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">npm</span><span style="color:#E06C75;"> unpublish</span><span style="color:#56B6C2;"> --</span><span style="color:#E06C75;">force</span><span style="color:#7F848E;font-style:italic;">  // 强制删除</span></span>
<span class="line"><span style="color:#E06C75;">npm</span><span style="color:#E06C75;"> unpublish</span><span style="color:#E06C75;"> irdd</span><span style="color:#ABB2BF;">@</span><span style="color:#D19A66;">1.0</span><span style="color:#ABB2BF;">.</span><span style="color:#D19A66;">6</span><span style="color:#7F848E;font-style:italic;"> // 指定版本号</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="npm废弃包" tabindex="-1">npm废弃包 <a class="header-anchor" href="#npm废弃包" aria-label="Permalink to &quot;npm废弃包&quot;">​</a></h3><p>npm包发布后可以对包进行废弃或删除操作，废弃和删除的区别在于：</p><ul><li>废弃不会将包或版本从npm仓库删除，仍然可以继续下载安装，并在安装的时候会有警示</li><li>删除会将包从npm彻底删除，无法被下载安装</li></ul><p>单个废弃 <code>npm deprecate irdd@0.6.38 &#39;critical bug in commonjs package&#39;</code></p><p>整个废弃 npm deprecate irdd &#39;This package has been deprecated in favour of irdd&#39;</p><h2 id="深入理解-npm-命令-npm-i-之前可被自动执行的命令-prepare" tabindex="-1">深入理解 npm 命令，npm i 之前可被自动执行的命令 prepare <a class="header-anchor" href="#深入理解-npm-命令-npm-i-之前可被自动执行的命令-prepare" aria-label="Permalink to &quot;深入理解 npm 命令，npm i 之前可被自动执行的命令 prepare&quot;">​</a></h2><p>可以理解为是 npm install 的钩子函数</p><p>在 package.json 里面配置 scripts 字段，增加新的内置命令 prepare。注意这里配置的命令，是在终端里面可以执行的，比如：输出一句话使用的是echo，而不是 nodejs 里面的 console.log()。</p><p>执行 npm i 的时候，就会自动执行 prepare 命令。使用 yarn 安装的时候，也会自动执行。</p><p>执行的先后顺序是：先执行安装，然后再 prepare，也就是说，如果在 prepare 命令里面配置了只有被安装的包才能执行的命令的话，是没有问题的，所以需要注意下这个点</p><h2 id="介绍下-npm-模块安装机制-为什么输入-npm-install-就可以自动安装对应的模块" tabindex="-1">介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？ <a class="header-anchor" href="#介绍下-npm-模块安装机制-为什么输入-npm-install-就可以自动安装对应的模块" aria-label="Permalink to &quot;介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？&quot;">​</a></h2><h3 id="模块安装过程" tabindex="-1">模块安装过程 <a class="header-anchor" href="#模块安装过程" aria-label="Permalink to &quot;模块安装过程&quot;">​</a></h3><ol><li>查找此模块是否已经在node_modules中安装过，然后再.npm 缓存中查看是否有同版本缓存</li><li>如果有缓存，直接使用缓存</li><li>没有缓存去registry中按照registry/packagename/version模式搜索模块</li><li>将模块下载并解压到node_modules目录中，如果模块是可执行模块，将可执行文件放到 .bin 目录中</li><li>同时在模块放在 .npm 中作为副本缓存</li></ol><h3 id="npm-实现原理" tabindex="-1">npm 实现原理 <a class="header-anchor" href="#npm-实现原理" aria-label="Permalink to &quot;npm 实现原理&quot;">​</a></h3><ol><li><strong>执行工程自身 preinstall</strong></li></ol><p>当前 npm 工程如果定义了 preinstall 钩子此时会被执行。</p><ol start="2"><li><strong>确定首层依赖模块</strong></li></ol><p>首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。</p><p>工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。</p><ol start="3"><li><strong>获取模块</strong></li></ol><p>获取模块是一个递归的过程，分为以下几步：</p><ul><li>获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。</li><li>获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。</li><li>查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。</li></ul><ol><li><strong>模块扁平化（dedupe）</strong></li></ol><p>上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 A 模块依赖于 loadsh，B 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。</p><p>从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有<strong>重复模块</strong>时，则将其丢弃。</p><p>这里需要对<strong>重复模块</strong>进行一个定义，它指的是<strong>模块名相同</strong>且 <strong>semver 兼容。**每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个**兼容</strong>版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。</p><p>比如 node-modules 下 foo 模块依赖 lodash@^1.0.0，bar 模块依赖 lodash@^1.1.0，则 <strong>^1.1.0</strong> 为兼容版本。</p><p>而当 foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0，则依据 semver 的规则，二者不存在兼容版本。会将一个版本放在 node_modules 中，另一个仍保留在依赖树里。</p><p>举个例子，假设一个依赖树原本是这样：</p><p>node_modules -- foo ---- lodash@version1</p><p>-- bar ---- lodash@version2</p><p>假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：</p><p>node_modules -- foo</p><p>-- bar</p><p>-- lodash（保留的版本为兼容版本）</p><p>假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：</p><p>node_modules -- foo -- lodash@version1</p><p>-- bar ---- lodash@version2</p><ol start="5"><li><strong>安装模块</strong></li></ol><p>这一步将会更新工程中的 node_modules，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。</p><ol start="6"><li><strong>执行工程自身生命周期</strong></li></ol><p>当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。</p><p>最后一步是生成或更新版本描述文件，npm install 过</p><h3 id="npm依赖包版本号-和-和-的区别" tabindex="-1">NPM依赖包版本号~和^和*的区别 <a class="header-anchor" href="#npm依赖包版本号-和-和-的区别" aria-label="Permalink to &quot;NPM依赖包版本号~和^和*的区别&quot;">​</a></h3><p>~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0</p><p>^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0</p><ul><li>这意味着安装最新版本的依赖包</li></ul><h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h2><ul><li><a href="https://auth0.com/blog/five-things-you-can-do-with-yarn/" target="_blank" rel="noreferrer">5 things you can do with Yarn</a></li><li><a href="https://yarnpkg.com/en/docs/cli/" target="_blank" rel="noreferrer">Yarn - CLI Introduction</a></li><li><a href="https://mp.weixin.qq.com/s/XdOPPay8fpNBiH2ExW_EyQ" target="_blank" rel="noreferrer">Node.js 中的依赖管理</a></li></ul>`,103),l=[p];function o(t,i,c,d,m,h){return s(),n("div",null,l)}const u=a(r,[["render",o]]);export{b as __pageData,u as default};
