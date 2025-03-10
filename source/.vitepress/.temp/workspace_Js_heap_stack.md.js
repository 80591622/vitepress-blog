import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"堆内存 & 栈内存","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Js/heap_stack.md","filePath":"workspace/Js/heap_stack.md","lastUpdated":1727690041000}');
const _sfc_main = { name: "workspace/Js/heap_stack.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="堆内存-栈内存" tabindex="-1">堆内存 &amp; 栈内存 <a class="header-anchor" href="#堆内存-栈内存" aria-label="Permalink to &quot;堆内存 &amp; 栈内存&quot;">​</a></h1><p>前几天面试刚问到的 ，这几天有空话总结下</p><p>在js引擎中对变量的存储主要有两种内存，堆内存（heap）和栈内存（stack），下面从三个方面简单介绍</p><h2 id="存储角度" tabindex="-1">存储角度 <a class="header-anchor" href="#存储角度" aria-label="Permalink to &quot;存储角度&quot;">​</a></h2><p><strong>栈内存</strong> 主要用于存储各种基本类型的变量，包括<code>Boolean、Number、String、Undefined、Null</code>以及对象变量的<code>指针</code>，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。</p><p><strong>堆内存</strong> 主要负责像对象<code>Object</code>这种变量类型的存储</p><p>盗用一张图</p><p><img src="https://ae01.alicdn.com/kf/H98e4d550d5d444d9b8d1666c70024915J.png" alt=""></p><p>我们平时用<code>const</code>定义的常量，如果是引用数据类型的话，仅仅是在栈内存保存的一个指针，而对于const定义的基础变量而言，这个值就相当于const对象的指针，是不可变。当<code>let cosnt</code>在重新声明的时候，会首先遍历当前的<code>内存栈</code>，看看有没有重名变量，有的话就返回错误</p><h2 id="存取速度" tabindex="-1">存取速度 <a class="header-anchor" href="#存取速度" aria-label="Permalink to &quot;存取速度&quot;">​</a></h2><p>栈区由于基本数据类型值比较简单，他们都是直接在栈内存中开辟一个位置，把值直接存储进去的，系统分配效率高，存取速度快</p><p>堆内存首先要在运行时动态分配内存，之后又要把指针存储到栈内存中，效率相对就要低一些了。</p><h2 id="gc" tabindex="-1">GC <a class="header-anchor" href="#gc" aria-label="Permalink to &quot;GC&quot;">​</a></h2><p>栈区GC比较频繁，变量基本上用完就回收了</p><p>堆区内存中的变量因为存在很多不确定的引用，一般由程序员分配释放， 若程序员不释放，程序结束时才可能被销毁</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("workspace/Js/heap_stack.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const heap_stack = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  heap_stack as default
};
