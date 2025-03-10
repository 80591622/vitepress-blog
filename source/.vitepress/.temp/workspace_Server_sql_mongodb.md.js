import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Mongodb安装","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Server/sql/mongodb.md","filePath":"workspace/Server/sql/mongodb.md","lastUpdated":1713942612000}');
const _sfc_main = { name: "workspace/Server/sql/mongodb.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="mongodb安装" tabindex="-1">Mongodb安装 <a class="header-anchor" href="#mongodb安装" aria-label="Permalink to &quot;Mongodb安装&quot;">​</a></h1><h2 id="本地安装mongodb" tabindex="-1">本地安装mongodb <a class="header-anchor" href="#本地安装mongodb" aria-label="Permalink to &quot;本地安装mongodb&quot;">​</a></h2><p><a href="https://www.mongodb.com/download-center/community" target="_blank" rel="noreferrer">安装地址</a></p><p>打开安装的目录，默认没有data,etc ,log 文件的</p><p>sudo mkdir -p /data/db</p><p>sudo chown -R zhf /data</p><p>./mongod 就可以启动了，但是全局不能使用，需要配置下</p><p>设置全局路径 ： echo &#39;export PATH=/Users/zhenfeng/mongodb/bin:$PATH&#39;&gt;&gt;~/.bash_profile</p><p>在根路径source .bash_profile就生效了，查看是否成功</p><p>$PATH/ /是否有当前db 的目录</p><p>which mongod //是否路径</p><p>问题：整好之后发现配置的环境变量（mongod）不起作用了，执行source .bash_profile后，mongod可以用了，但是终端全部关闭后，再输入mongod，就不起作用了。</p><p><strong>解决方法</strong></p><p>执行vi ~/.zshrc打开.zshrc,将 source .bash_profile 粘贴到最下面，保存即可。或者直接open .bash_profile把里面的内容粘贴到.zshrc里面,保存重启即可。</p><p>接下来就是启动mongodb了,cmd+T 新建命令窗口，使用命令 <code>mongod</code> 启动mongoDB server，启动成功后最后一行应该是端口号27017</p><p><img src="https://user-gold-cdn.xitu.io/2019/5/24/16ae8fe807c8c514?w=636&amp;h=266&amp;f=png&amp;s=111571" alt=""></p><p>mongodb 启动成功，正等待着被连接。</p><p>cmd+T 新建命令窗口，执行 <code>mongo</code>，进入 mongodb 命令行模式：</p><h2 id="阿里云服务器安装mongodb" tabindex="-1">阿里云服务器安装mongodb <a class="header-anchor" href="#阿里云服务器安装mongodb" aria-label="Permalink to &quot;阿里云服务器安装mongodb&quot;">​</a></h2><p>1.下载mongodb</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 兼容性好</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">curl</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.9.tgz</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">curl</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.13.tgz</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>2.解压</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">tar</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> zxvf mongodb-linux-x86_64-3.2.9.tgz</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># copy到usr目录下【使用规范】</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">cp</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> -r mongodb-macos-x86_64-4.0.13   /usr/mongodb</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>3.创建数据文件夹和日志文件等</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">mkdir</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> -p  /usr/local/mongodb/data</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">touch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> /usr/local/mongodb/mongodb.log</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">touch</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> /usr/local/mongodb/mongodb.conf</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># mongodb.conf配置文件如下</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">dbpath=/</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">usr/local</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">/mongodb/data</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">logpath=/usr/local/mongodb/mongodb.log</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">logappend = </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">true</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">port = </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">27017</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">fork = </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">true</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">auth = true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>4.启动</p><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 设置全局变量</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C678DD" })}">export</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> PATH=$(pwd)/bin:$</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">PATH</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 跳转到</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">/</span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">usr/mongodb</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">/bin/</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 开启数据库</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">./mongod --config /usr/local/mongodb/mongodb.conf</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">./mongod --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/mongodb.log --logappend  --port=27017 --fork</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 关闭数据库</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">./mongod -shutdown -dbpath=/usr/local/mongodb/data</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 查看是否开启</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">netstat -lanp | grep </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;27017&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">ps -ef|grep mongod</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 不能使用kill -9 杀死mongo</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 补救</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">/usr/local/mongodb/data/</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">rm -rf *.lock</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">./mongod  --repair</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 从0~65535全部是标准端口，但是从0~1024号端口是系统端口，用户无法修改</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#7F848E", "font-style": "italic" })}"># 从1025~65534端口是系统为用户预留的端口，而65535号端口为系统保留</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>5.创建完成后需要在阿里云控制台配置防火墙才能连接</p><h2 id="数据库的操作" tabindex="-1">数据库的操作 <a class="header-anchor" href="#数据库的操作" aria-label="Permalink to &quot;数据库的操作&quot;">​</a></h2><ul><li><p>导出数据库 ./mongoexport --port [port] --db test --collection users --out export.json</p></li><li><p>导入数据库 ./mongoimport -h 120.79.229.197:27-17 -d test -c scenics --file=./export.json</p></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Server/sql/mongodb.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mongodb = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  mongodb as default
};
