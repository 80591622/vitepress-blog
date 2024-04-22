---
abbrlink: 9d0b6d80
title: 数据统计
date: 2019-08-16
hidden: true
---

<strong class='old-blog'>数据统计</strong>

[[toc]]

### 简要分析下数据统计的几个框架

### ECharts(推荐五星)

ECharts，一个纯 Javascript 的图表库，可以流畅的运行在`PC和移动`设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。

ECharts是一个成熟的图表库， 使用方便、图表种类多、容易上手、社区强大。文档资源也比较丰富


### G2

[文档](https://www.yuque.com/antv/g2-docs/api-g2)

G2 是一套基于可视化编码的图形语法，以数据驱动，具有高度的易用性和扩展性，用户无需关注各种繁琐的实现细节，一条语句即可构建出各种各样的可交互的统计图表。

**特性**
- 简单、易用
- 完备的可视化编码
- 强大的扩展能力

### BizCharts(推荐四星半)

超强的`react的模块化`开发，社区相对echarts还是差点

在 React 环境下使用 G2，我们推荐可以尝试使用BizCharts这个产品都是基于 G2 的 React 版本封装，使用体验更符合 React 技术栈的习惯

### G6

[文档](https://www.yuque.com/antv/g6)

在我看来他就是做`流程图`渲染的，树图，脑图，流程图


### F2

[文档](https://www.yuque.com/antv/f2/api-index)

F2 是一个专注于移动，开箱即用的可视化解决方案，`完美支持 H5 环境同时兼容多种环境（Node, 小程序，Weex）`，完备的图形语法理论，满足你的各种可视化需求，专业的移动设计指引为你带来最佳的移动端图表体验。


### L7

[文档](https://www.yuque.com/antv/l7)

L7 中的 L 代表 Location，7 代表世界七大洲，寓意能为全球位置数据提供可视化能力。L7 的目标是提供一套`地理空间`数据可视化框架，易用易扩展，支持海量数据的高性能和 3D 高质量渲染，安全可靠（无地图法务风险）的地理空间数据可视化解决方案。

L7 和 React结合使用可与参考[demo](https://github.com/lzxue/l7_react_template)

L7 依赖高德地图，目前高德地图只支持在线引入，因此在react使用L7需要动态加载 高德jsapi, jsapi加载完成后再进行L7 scene初始化。


### HighChart

HighChart 是一个用纯 JavaScript 编写的一个图表库， 能够很简单便捷的在 Web 网站或是 Web 应用程序添加有交互性的图表，并且免费提供给个人学习、个人网站和`非商业`用途使用


对于商业用途，只需要支付`少量的` 授权费用 即可使用我们的产品，同时我们会提供相应的 技术支持服务

Highcharts 系列软件包含 `Highcharts JS，Highstock JS，Highmaps JS` 共三款软件

少量的 ？？  我擦 这是少量？，分这么多的软件包就是为了收费

### D3js

`如果技术够硬，可以选择D3.js`

相对于echart、 highchart等其他图表库算是一个比较`底层的可视化工具`，简单来讲他`不提供任何一种现成的图表`，
所有的图表都是我们在它的库里挑选合适的方法构建而成。

d3复杂很多但是也强大自由的多，另外因为d3基于svg所以修改图表的样式和结构也会方便很多，但是同样是这个原因，
d3的性能比canvas类库差了不少，dom毕竟是拖累浏览器性能的罪魁祸首。顺口提一句，d3也是可以基于canvas构建图表的
