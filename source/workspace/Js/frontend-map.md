# 前端知识图谱
## 一、JavaScript基础

###  变量和类型
&emsp; 1. <span class="highlight">JavaScript</span> 规定了几种语言类型

&emsp; 2. <span class="highlight">JavaScript</span> 对象的底层数据结构是什么

&emsp; 3. <span class="highlight">Symbol</span> 类型在实际开发中的应用、可手动实现一个简单的Symbol

&emsp; 4. <span class="highlight">JavaScript</span> 中的变量在内存中的具体存储形式

&emsp; 5. 基本类型对应的内置对象，以及他们之间的装箱拆箱操作

&emsp; 6. 理解值类型和引用类型

&emsp; 7. <span class="highlight">null</span>和<span class="highlight">undefined</span>的区别

&emsp; 8. 至少可以说出三种判断<span class="highlight">JavaScript</span>数据类型的方式，以及他们的优缺点，如何准确的判断数组类型

&emsp; 9. 可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用

&emsp; 10. 出现小数精度丢失的原因，<span class="highlight">JavaScript</span>可以存储的最大数字、最大安全数字，<span class="highlight">JavaScript</span>处理大数字的方法、避免精度丢失的方法


### 原型和原型链

&emsp; 1. 理解原型设计模式以及<span class="highlight">JavaScript</span>中的原型规则

&emsp; 2. <span class="highlight">instanceof  typeof</span>的底层实现原理，手动实现一个<span class="highlight">instanceof  typeof</span>

&emsp; 3. 实现继承的几种方式以及他们的优缺点

&emsp; 4. 至少说出一种开源项目(如<span class="highlight">Node</span>)中应用原型继承的案例

&emsp; 5. 可以描述<span class="highlight">new</span>一个对象的详细过程，手动实现一个<span class="highlight">new</span>操作符

&emsp; 6. 理解<span class="highlight">es6 class</span>构造以及继承的底层实现原理


### 作用域和闭包

&emsp; 1. 理解词法作用域和动态作用域

&emsp; 2. 理解<span class="highlight">JavaScript</span>的作用域和作用域链

&emsp; 3. 理解<span class="highlight">JavaScript</span>的执行上下文栈，可以应用堆栈信息快速定位问题

&emsp; 4. <span class="highlight">this</span>的原理以及几种不同使用场景的取值

&emsp; 5. 闭包的实现原理和作用，可以列举几个开发中闭包的实际应用

&emsp; 6. 理解堆栈溢出和内存泄漏的原理，如何防止

&emsp; 7. 如何处理循环的异步操作

&emsp; 8. 理解模块化解决的实际问题，可列举几个模块化方案并理解其中原理


### 执行机制

&emsp; 1. 为何<span class="highlight">try</span>里面放<span class="highlight">return</span>，<span class="highlight">finally</span>还会执行，理解其内部机制

&emsp; 2. JavaScript如何实现异步编程，可以详细描述<span class="highlight">EventLoop</span>机制

&emsp; 3. 宏任务和微任务分别有哪些? 结合浏览器渲染怎么解释清楚

&emsp; 4. 可以快速分析一个复杂的异步嵌套逻辑，并掌握分析方法

&emsp; 5. 使用<span class="highlight">Promise</span>实现串行

&emsp; 6. <span class="highlight">Node</span>与浏览器<span class="highlight">EventLoop</span>的差异

&emsp; 7. 如何在保证页面运行流畅的情况下处理海量数据


### 语法和API

&emsp; 1. 理解<span class="highlight">ECMAScript</span>和<span class="highlight">JavaScript</span>的关系

&emsp; 2. 熟练运用<span class="highlight">es5、es6</span>提供的语法规范，

&emsp; 3. 熟练掌握<span class="highlight">JavaScript</span>提供的全局对象（例如<span class="highlight">Data</span>、<span class="highlight">Math</span>）、全局函数（例如<span class="highlight">decodeURI</span>、<span class="highlight">isNaN</span>）、全局属性（例如<span class="highlight">Infinity</span>、<span class="highlight">undefined</span>）

&emsp; 4. 熟练应用<span class="highlight">map</span>、<span class="highlight">reduce</span>、<span class="highlight">filter</span> 等高阶函数解决问题

&emsp; 5. <span class="highlight">setInterval</span>需要注意的点，使用<span class="highlight">setTimeout</span>实现<span class="highlight">setInterval</span>

&emsp; 6. JavaScript提供的正则表达式API、可以使用正则表达式（邮箱校验、<span class="highlight">URL</span>解析、去重等）解决常见问题

&emsp; 7. <span class="highlight">JavaScript</span>异常处理的方式，统一的异常处理方案


## 二、HTML和CSS

### HTML

&emsp; 1. 从规范的角度理解<span class="highlight">HTML</span>，从分类和语义的角度使用标签

&emsp; 2. 常用页面标签的默认样式、自带属性、不同浏览器的差异、处理浏览器兼容问题的方式

&emsp; 3. 元信息类标签(<span class="highlight">head</span>、<span class="highlight">title</span>、<span class="highlight">meta</span>)的使用目的和配置方法

&emsp; 4. <span class="highlight">HTML5</span>离线缓存原理

&emsp; 5. 可以使用<span class="highlight">Canvas API</span> 、<span class="highlight">SVG</span>等绘制高性能的动画


### CSS

&emsp; 1. <span class="highlight">CSS</span>盒模型，在不同浏览器的差异

&emsp; 2. <span class="highlight">CSS</span>所有选择器及其优先级、使用场景，哪些可以继承，如何运用at规则

&emsp; 3. <span class="highlight">CSS</span>伪类和伪元素有哪些，它们的区别和实际应用

&emsp; 4. <span class="highlight">HTML</span>文档流的排版规则，<span class="highlight">CSS</span>几种定位的规则、定位参照物、对文档流的影响，如何选择最好的定位方式，雪碧图实现原理

&emsp; 5. 水平垂直居中的方案、可以实现6种以上并对比它们的优缺点

&emsp; 6. <span class="highlight">BFC</span>实现原理，可以解决的问题，如何创建BFC

&emsp; 7. 可使用<span class="highlight">CSS</span>函数复用代码，实现特殊效果

&emsp; 8. <span class="highlight">PostCSS</span>、<span class="highlight">Sass</span>、<span class="highlight">Less</span>的异同，以及使用配置，至少掌握一种

&emsp; 9. <span class="highlight">CSS</span>模块化方案、如何配置按需加载、如何防止CSS阻塞渲染

&emsp; 10. 熟练使用<span class="highlight">CSS</span>实现常见动画，如渐变、移动、旋转、缩放等等

&emsp; 11. <span class="highlight">CSS</span>浏览器兼容性写法，了解不同API在不同浏览器下的兼容性情况

&emsp; 12. 掌握一套完整的响应式布局方案


### 手写

&emsp; 1. 手写图片瀑布流效果

&emsp; 2. 使用<span class="highlight">CSS</span>绘制几何图形（圆形、三角形、扇形、菱形等）

&emsp; 3. 使用纯<span class="highlight">CSS</span>实现曲线运动（贝塞尔曲线）

&emsp; 4. 实现常用布局（三栏、圣杯、双飞翼、吸顶），可是说出多种方式并理解其优缺点


## 三、计算机基础

### 编译原理

&emsp; 1.理解代码到底是什么，计算机如何将代码转换为可以运行的目标程序

&emsp; 2.正则表达式的匹配原理和性能优化

&emsp; 3.如何将<span class="highlight">JavaScript</span>代码解析成抽象语法树(<span class="highlight">AST</span>)

&emsp; 4.<span class="highlight">base64</span>的编码原理

&emsp; 5.几种进制的相互转换计算方法，在<span class="highlight">JavaScript</span>中如何表示和转换


### 网络协议

&emsp; 1. 浏览器提供的符合<span class="highlight">W3C</span>标准的<span class="highlight">DOM</span>操作<span class="highlight">API</span>、浏览器差异、兼容性

&emsp; 2. 浏览器提供的浏览器对象模型 (<span class="highlight">BOM</span>)提供的所有全局API、浏览器差异、兼容性

&emsp; 3. 大量<span class="highlight">Dom</span>操作、海量数据的性能优化(合并操作、<span class="highlight">Diff</span>、<span class="highlight">requestAnimationFrame</span>、 <span class="highlight">requestidlecallback</span> 等)

&emsp; 4. 浏览器海量数据存储、操作性能优化

&emsp; 5. <span class="highlight">DOM</span>事件流的具体实现机制、不同浏览器的差异、事件代理

&emsp; 6. 前端发起网络请求的几种方式及其底层实现、可以手写原生<span class="highlight">ajax</span>  <span class="highlight">xhr</span>、<span class="highlight">fetch</span>可以熟练使用第三方库

&emsp; 7. 浏览器的同源策略，如何避免同源策略，几种方式的异同点以及如何选型

&emsp; 8. 浏览器提供的几种存储机制、优缺点、开发中正确的选择

&emsp; 9. 浏览器跨标签通信


### 设计模式

&emsp; 1. 熟练使用前端常用的设计模式编写代码，如单例模式、装饰器模式、代理模式等

&emsp; 2. 发布订阅模式和观察者模式的异同以及实际应用

&emsp; 3. 可以说出几种设计模式在开发中的实际应用，理解框架源码中对设计模式的应用


## 四、数据结构和算法

### JavaScript编码能力

&emsp; 1. 多种方式实现数组去重、扁平化、对比优缺点

&emsp; 2. 多种方式实现深拷贝、对比优缺点

&emsp; 3. 手写函数柯里化工具函数、并理解其应用场景和优势

&emsp; 4. 手写防抖和节流工具函数、并理解其内部原理和应用场景

&emsp; 5. 实现一个<span class="highlight">sleep</span>函数

### 手动实现前端轮子

&emsp; 1. 手动实现<span class="highlight">call</span>、<span class="highlight">apply</span>、<span class="highlight">bind</span>

&emsp; 2. 手动实现符合<span class="highlight">Promise/A+</span>规范的<span class="highlight">Promise</span>、手动实现<span class="highlight">async await</span>

&emsp; 3. 手写一个<span class="highlight">EventEmitter</span>实现事件发布、订阅

&emsp; 4. 可以说出两种实现双向绑定的方案、可以手动实现

&emsp; 5. 手写<span class="highlight">JSON.stringify</span>、<span class="highlight">JSON.parse</span>

&emsp; 6. 手写一个模版引擎，并能解释其中原理

&emsp; 7. <span class="highlight">手写懒加载</span>、<span class="highlight">下拉刷新</span>、<span class="highlight">上拉加载</span>、<span class="highlight">预加载</span>等效果


### 数据结构

&emsp; 1.理解常见数据结构的特点，以及他们在不同场景下使用的优缺点

&emsp; 2.理解<span class="highlight">数组</span>、<span class="highlight">字符串</span>的存储原理，并熟练应用他们解决问题

&emsp; 3.理解<span class="highlight">二叉树</span>、<span class="highlight">栈</span>、<span class="highlight">队列</span>、<span class="highlight">哈希表</span>的基本结构和特点，并可以应用它解决问题

&emsp; 4.了解<span class="highlight">栈</span>、<span class="highlight">堆</span>的基本结构和使用场景


### 算法

&emsp; 1. 可计算一个算法的时间复杂度和空间复杂度，可估计业务逻辑代码的耗时和内存消耗

&emsp; 2. 至少理解五种排序算法的实现原理、应用场景、优缺点，可快速说出时间、空间复杂度

&emsp; 3. 了解递归和循环的优缺点、应用场景、并可在开发中熟练应用

&emsp; 4. 可应用<span class="highlight">回溯算法</span>、<span class="highlight">贪心算法</span>、<span class="highlight">分治算法</span>、<span class="highlight">动态规划</span>等解决复杂问题

&emsp; 5. 前端处理海量数据的算法方案


## 五、运行环境

### 浏览器API

&emsp; 1. 浏览器提供的符合<span class="highlight">W3C</span>标准的<span class="highlight">DOM</span>操作<span class="highlight">API</span>、浏览器差异、兼容性

&emsp; 2. 浏览器提供的浏览器对象模型 (<span class="highlight">BOM</span>)提供的所有全局<span class="highlight">API</span>、浏览器差异、兼容性

&emsp; 3. 大量<span class="highlight">DOM</span>操作、海量数据的性能优化(合并操作、<span class="highlight">Diff</span>、<span class="highlight">requestAnimationFrame  requestidlecallback</span>等)

&emsp; 4. 浏览器海量数据存储、操作性能优化

&emsp; 5. <span class="highlight">DOM</span>事件流的具体实现机制、不同浏览器的差异、事件代理

&emsp; 6. 前端发起网络请求的几种方式及其底层实现、可以手写原生<span class="highlight">ajax</span>  <span class="highlight">xhr</span>、<span class="highlight">fetch</span>可以熟练使用第三方库

&emsp; 7. 浏览器的同源策略，如何避免同源策略，几种方式的异同点以及如何选型

&emsp; 8. 浏览器提供的几种存储机制、优缺点、开发中正确的选择

&emsp; 9.浏览器跨标签通信


### Node

&emsp; 1.理解<span class="highlight">Node</span>在应用程序中的作用，可以使用<span class="highlight">Node</span>搭建前端运行环境、使用<span class="highlight">Node</span>操作文件、操作数据库等等

&emsp; 2.掌握一种<span class="highlight">Node</span>开发框架，如Express，Express和Koa的区别

&emsp; 3.熟练使用Node提供的<span class="highlight">API</span>如<span class="highlight">Path</span>、<span class="highlight">Http</span>、<span class="highlight">Child Process</span>等并理解其实现原理

&emsp; 4.<span class="highlight">Node</span>的底层运行原理、和浏览器的异同

&emsp; 5.<span class="highlight">Node</span>事件驱动、非阻塞机制的实现原理


## 六、框架和类库

### TypeScript

&emsp; 1. 理解泛型、接口等面向对象的相关概念，<span class="highlight">TypeScript</span>对面向对象理念的实现

&emsp; 2. 理解使用<span class="highlight">TypeScript</span>的好处，掌握<span class="highlight">TypeScript</span>基础语法

&emsp; 3. <span class="highlight">TypeScript</span>的规则检测原理

&emsp; 4. 可以在<span class="highlight">React</span>、<span class="highlight">Vue</span>等框架中使用<span class="highlight">TypeScript</span>进行开发


### React

&emsp; 1.<span class="highlight">React</span>和<span class="highlight">Vue</span> 选型和优缺点、核心架构的区别

&emsp; 2.<span class="highlight">React</span>中setState的执行机制，如何有效的管理状态

&emsp; 3.<span class="highlight">React</span>的事件底层实现机制

&emsp; 4.<span class="highlight">React</span>的虚拟<span class="highlight">Dom</span>和<span class="highlight">Diff</span>算法的内部实现

&emsp; 5.<span class="highlight">React</span>的<span class="highlight">Fiber</span>工作原理，解决了什么问题

&emsp; 6.<span class="highlight">React</span> Router和<span class="highlight">Vue Router</span> 的底层实现原理、动态加载实现原理

&emsp; 7.可熟练应用<span class="highlight">React</span> API、生命周期等，可应用HOC、render props、Hooks等高阶用法解决问题

&emsp; 8.基于<span class="highlight">React</span>的特性和原理，可以手动实现一个简单的<span class="highlight">React</span>


### Vue

&emsp; 1. 熟练使用<span class="highlight">Vue</span>的<span class="highlight">API</span>、生命周期、钩子函数

&emsp; 2. <span class="highlight">MVVM</span>框架设计理念

&emsp; 3. <span class="highlight">Vue</span>双向绑定实现原理、<span class="highlight">Diff</span>算法的内部实现

&emsp; 4. <span class="highlight">Vue</span>的事件机制

&emsp; 5. 从<span class="highlight">template</span>转换成真实<span class="highlight">DOM</span>的实现机制


### 多端开发

&emsp; 1. 单页面应用（<span class="highlight">SPA</span>）的原理和优缺点，掌握一种快速开发SPA的方案

&emsp; 2. 理解<span class="highlight">Viewport</span>、<span class="highlight">em</span>、<span class="highlight">rem</span>的原理和用法，分辨率、<span class="highlight">px</span>、<span class="highlight">ppi</span>、<span class="highlight">dpi</span>、<span class="highlight">dp</span>的区别和实际应用

&emsp; 3. 移动端页面适配解决方案、不同机型适配方案

&emsp; 4. 掌握一种<span class="highlight">JavaScript</span>移动客户端开发技术，如<span class="highlight">React Native</span>：可以搭建<span class="highlight">React Native</span>开发环境，熟练进行开发，可理解<span class="highlight">React Native</span>的运作原理，不同端适配

&emsp; 5. 掌握一种<span class="highlight">JavaScript PC</span>客户端开发技术，如<span class="highlight">Electron</span>：可搭建<span class="highlight">Electron</span>开发环境，熟练进行开发，可理解<span class="highlight">Electron</span>的运作原理

&emsp; 6. 掌握一种小程序开发框架或原生小程序开发

&emsp; 7. 理解多端框架的内部实现原理，至少了解一个多端框架的使用


### 数据流管理

&emsp; 1. 掌握<span class="highlight">React</span>和<span class="highlight">Vue</span>传统的跨组件通信方案，对比采用数据流管理框架的异同

&emsp; 2. 熟练使用<span class="highlight">Redux</span>管理数据流，并理解其实现原理，中间件实现原理

&emsp; 3. 熟练使用<span class="highlight">Mobx</span>管理数据流，并理解其实现原理，相比<span class="highlight">Redux</span>有什么优势

&emsp; 4. 熟练使用<span class="highlight">Vuex</span>管理数据流，并理解其实现原理

&emsp; 5. 以上数据流方案的异同和优缺点，不情况下的技术选型


### 实用库

&emsp; 1. 至少掌握一种<span class="highlight">UI</span>组件框架，如<span class="highlight">antd design</span>，理解其设计理念、底层实现

&emsp; 2. 掌握一种图表绘制框架，如<span class="highlight">Echart</span>，理解其设计理念、底层实现，可以自己实现图表

&emsp; 3. 掌握一种<span class="highlight">GIS</span>开发框架，如百度地图<span class="highlight">API</span>

&emsp; 4. 掌握一种可视化开发框架，如<span class="highlight">Three.js</span>、<span class="highlight">D3</span>

&emsp; 5. 工具函数库，如<span class="highlight">lodash</span>、<span class="highlight">underscore</span>、<span class="highlight">moment</span>moment <span class="highlight">dayjs</span> 等，理解使用的工具类或工具函数的具体实现原理


### 开发和调试

&emsp; 1. 熟练使用各浏览器提供的调试工具

&emsp; 2. 熟练使用一种代理工具实现请求代理、抓包，如<span class="highlight">charls</span>(花瓶)

&emsp; 3. 可以使用<span class="highlight">Android</span>、<span class="highlight">IOS</span>模拟器进行调试，并掌握一种真机调试方案

&emsp; 4. 了解<span class="highlight">Vue</span>、<span class="highlight">React</span>等框架调试工具的使用


## 七、前端工程

### 项目构建

&emsp; 1. 理解<span class="highlight">npm</span>、<span class="highlight">yarn</span>、<span class="highlight">pnpm</span>依赖包管理的原理，两者的区别

&emsp; 2.可以使用<span class="highlight">npm</span>运行自定义脚本

&emsp; 3. 理解<span class="highlight">Babel</span>、<span class="highlight">ESLint</span>、<span class="highlight">webpack</span>等工具在项目中承担的作用

&emsp; 4. <span class="highlight">ESLint</span>规则检测原理，常用的<span class="highlight">ESLint</span>配置

&emsp; 5. <span class="highlight">Babel</span>的核心原理，可以自己编写一个<span class="highlight">Babel</span>插件

&emsp; 6. 可以配置一种前端代码兼容方案，如<span class="highlight">Polyfill</span>--- 现在是  <span class="highlight">corejs</span>

&emsp; 7. <span class="highlight">Webpack</span>的编译原理、构建流程、热更新原理，chunk、bundle和module的区别和应用

&emsp; 8. 可熟练配置已有的<span class="highlight">loaders</span>和<span class="highlight">plugins</span>解决问题，可以自己编写loaders和plugins

&emsp; 9. 其他的构建工具<span class="highlight">vite </span>  


### nginx

&emsp; 1. 正向代理与反向代理的特点和实例

&emsp; 2. 可手动搭建一个简单的<span class="highlight">nginx</span>服务器、

&emsp; 3. 熟练应用常用的<span class="highlight">nginx</span>内置变量，掌握常用的匹配规则写法

&emsp; 4. 可以用<span class="highlight">nginx</span>实现请求过滤、配置<span class="highlight">gzip</span>、负载均衡等，并能解释其内部原理


### 开发提速

&emsp; 1. 熟练掌握一种接口管理、接口<span class="highlight">nginx</span>mock工具的使用，如<span class="highlight">nginx</span>yapi

&emsp; 2. 掌握一种高效的日志埋点方案，可快速使用日志查询工具定位线上问题

&emsp; 3. 理解<span class="highlight">TDD</span>与<span class="highlight">BDD</span>模式，至少会使用一种前端单元测试框架


### 版本控制

&emsp; 1. 理解<span class="highlight">Git</span>的核心原理、工作流程、和<span class="highlight">Svn</span>的区别

&emsp; 2. 熟练使用常规的<span class="highlight">Git</span>命令、<span class="highlight">git rebase</span>、<span class="highlight">git stash</span>等进阶命令

&emsp; 3. 可以快速解决<span class="highlight">线上分支回滚</span>、<span class="highlight">线上分支错误合并</span>等复杂问题


### 持续集成

&emsp; 1. 理解<span class="highlight">CI/CD</span>技术的意义，至少熟练掌握一种<span class="highlight">CI/CD</span>工具的使用，如<span class="highlight">Jenkins</span>

&emsp; 2. 可以独自完成架构设计、技术选型、环境搭建、全流程开发、部署上线等一套完整的开发流程（包括Web应用、移动客户端应用、PC客户端应用、小程序、H5等等）


## 八、项目和业务

### 后端技能

&emsp; 1. 了解后端的开发方式，在应用程序中的作用，至少会使用一种后端语言（<span class="highlight">node  java  go</span>）

&emsp; 2. 掌握数据最终在数据库中是如何落地存储的，能看懂表结构设计、表之间的关联，至少会使用一种数据库


### 前端安全

&emsp; 1. <span class="highlight">XSS</span>攻击的原理、分类、具体案例，前端如何防御

&emsp; 2. <span class="highlight">CSRF</span>攻击的原理、具体案例，前端如何防御

&emsp; 3. <span class="highlight">HTTP</span>劫持、页面劫持的原理、防御措施


### 业务相关

&emsp; 1. 能理解所开发项目的整体业务形态、业务目标、业务架构，可以快速定位线上业务问题

&emsp; 2. 能理解所开发项目整体的技术架构、能快读的根据新需求进行开发规划、能快速根据业务报警、线上日志等定位并解决线上技术问题

&emsp; 3. 可以将自己的想法或新技术在业务中落地实践，尽量在团队中拥有一定的不可替代性