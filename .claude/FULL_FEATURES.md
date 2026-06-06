# vitepress-theme-teek 完整功能文档

> 基于 v1.6.0，三次深度扫描生成 | 2026/06/06

---

## 目录

1. [项目概览](#1-项目概览)
2. [配置系统](#2-配置系统)
3. [首页系统](#3-首页系统)
4. [文章系统](#4-文章系统)
5. [侧边卡片栏](#5-侧边卡片栏)
6. [文章增强功能](#6-文章增强功能)
7. [评论系统](#7-评论系统)
8. [主题增强面板](#8-主题增强面板)
9. [页面系统](#9-页面系统)
10. [私密文章系统](#10-私密文章系统)
11. [风险链接提示](#11-风险链接提示)
12. [页脚系统](#12-页脚系统)
13. [导航与侧边栏](#13-导航与侧边栏)
14. [Markdown 拓展](#14-markdown-拓展)
15. [样式系统](#15-样式系统)
16. [国际化系统](#16-国际化系统)
17. [站点分析](#17-站点分析)
18. [Vite 插件系统](#18-vite-插件系统)
19. [组合式函数库](#19-组合式函数库)
20. [工具函数库](#20-工具函数库)
21. [图标系统](#21-图标系统)
22. [组件库](#22-组件库)
23. [构建系统](#23-构建系统)
24. [Frontmatter 拓展](#24-frontmatter-拓展)
25. [插槽系统](#25-插槽系统)

---

## 1. 项目概览

**vitepress-theme-teek** 是一个基于 VitePress 的博客主题，在默认主题基础上进行深度拓展，支持 VitePress 所有原生功能和配置。

### 1.1 技术栈

| 技术       | 版本    |
| ---------- | ------- |
| VitePress  | ^1.6.4  |
| Vue        | ^3.5.32 |
| Vite       | ^7.3.1  |
| TypeScript | ^6.0.2  |
| Sass       | ^1.99.0 |
| pnpm       | 10.7.1  |

### 1.2 架构概览

```
扩展 DefaultTheme
  ├── Layout: ConfigProvider(TkLayout)
  │   ├── 注入 postsContext (全部文章数据)
  │   ├── 注入 teekConfigContext (主题配置)
  │   ├── 启动 useAnchorScroll (锚点监听)
  │   └── 启动 useViewTransition (切换动画)
  └── enhanceApp
      ├── 注册全局组件 (7个)
      ├── 处理站点分析 (百度/谷歌/Umami/Clarity)
      └── 处理永久链接 404 问题
```

### 1.3 包结构 (Monorepo)

```
packages/
├── teek/            # 主题入口，导出 theme 对象
├── config/          # 配置系统 + Vite 插件注册
├── components/      # 45+ Vue 组件 (base/common/theme 三类)
├── composables/     # 24 个 Vue 组合式函数
├── markdown/        # 7 个 markdown-it 插件
├── helper/          # 工具函数 (is/date/color/util/types/analytics)
├── locale/          # 国际化 (zh-CN/en-US)
├── static/          # 静态资源 (55+ 图标/字体)
└── theme-chalk/     # SCSS 样式系统

plugins/             # 7 个外部 VitePress 插件源码
docs/                # 文档站点
build/               # Rollup + esbuild 构建工具链
```

---

## 2. 配置系统

### 2.1 入口

`defineTeekConfig(config)` 函数返回 `UserConfig`，内部处理：

1. 注册 Vite 插件
2. 配置 Markdown 插件
3. 设置 `ignoreDeadLinks: true`
4. 注入 `ssr.noExternal`
5. Scss modern API 警告修复

### 2.2 配置读取优先级

组件内通过 `useTeekConfig()` 读取，支持 4 级优先级：

```
provide > frontmatter.tk[key] > frontmatter[key] > theme[key] > defaultValue
```

- 对象类型：深度合并
- 非对象类型：取最高优先级
- `getTeekConfig(key, default)` — 非响应式
- `getTeekConfigRef(key, default)` — 响应式 computed

### 2.3 完整配置项清单

#### 全局开关

| 配置项                 | 类型                                                              | 默认值                                                       | 说明                                                 |
| ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| `teekTheme`            | `boolean`                                                         | `true`                                                       | 主主题开关，关闭后仅保留永久链接/锚点/过渡动画       |
| `teekHome`             | `boolean`                                                         | `true`                                                       | 博客风格首页                                         |
| `vpHome`               | `boolean`                                                         | `true`                                                       | VitePress 原生首页                                   |
| `anchorScroll`         | `boolean`                                                         | `true`                                                       | 锚点自动滚动 URL hash                                |
| `loading`              | `boolean \| string`                                               | `false`                                                      | 路由加载动画                                         |
| `sidebarTrigger`       | `boolean`                                                         | `false`                                                      | 侧边栏展开/折叠按钮                                  |
| `windowTransition`     | `boolean \| object`                                               | `true`                                                       | 渐入过渡效果 (可分别控制 post/card/archives/feature) |
| `themeSize`            | `"small" \| "default" \| "large" \| "wide" \| ""`                 | `""`                                                         | 主题尺寸                                             |
| `pageStyle`            | `"default" \| "card" \| "segment" \| "card-nav" \| "segment-nav"` | `"default"`                                                  | 文章页布局风格                                       |
| `homeCardListPosition` | `"left" \| "right" \| false`                                      | `"right"`                                                    | 首页卡片栏位置                                       |
| `homeCardSort`         | `string[]`                                                        | `["topArticle","category","tag","friendLink","docAnalysis"]` | 卡片排序                                             |
| `tagColor`             | `{bg,text,border}[]`                                              | 7 种 Tailwind 色系                                           | 标签背景色                                           |

#### 深色模式

| 配置项           | 类型     | 默认值                                            | 说明         |
| ---------------- | -------- | ------------------------------------------------- | ------------ |
| `viewTransition` | `object` | `{enabled:true, mode:"out-in", easing:"ease-in"}` | 切换动画配置 |

#### 右下角按钮

| 配置项      | 类型     | 默认值                               | 说明         |
| ----------- | -------- | ------------------------------------ | ------------ |
| `backTop`   | `object` | `{enabled:true, content:"progress"}` | 回到顶部     |
| `toComment` | `object` | `{enabled:true}`                     | 滚动到评论区 |

#### 首页 Banner

| 配置项      | 类型        | 默认值            | 说明                               |
| ----------- | ----------- | ----------------- | ---------------------------------- |
| `banner`    | `Banner`    | 全部开启          | 支持 pure/partImg/fullImg 三种风格 |
| `wallpaper` | `Wallpaper` | `{enabled:false}` | 全屏壁纸模式                       |
| `bodyBgImg` | `BodyBgImg` | `{}`              | Body 背景图片                      |

#### 文章列表

| 配置项     | 类型         | 默认值   | 说明                           |
| ---------- | ------------ | -------- | ------------------------------ |
| `post`     | `Post`       | 全部开启 | list/card 风格，封面图，摘要等 |
| `page`     | `Pagination` | `{}`     | 分页配置                       |
| `features` | `Feature[]`  | —        | 文档风格首页特性列表           |

#### 文章信息

| 配置项             | 类型                  | 默认值                    | 说明                        |
| ------------------ | --------------------- | ------------------------- | --------------------------- |
| `author`           | `Author`              | —                         | 默认作者信息                |
| `articleAnalyze`   | `ArticleAnalyze`      | 全部开启                  | 文章信息展示控制            |
| `articleShare`     | `ArticleShare`        | `{enabled:false}`         | 文章分享按钮                |
| `articleUpdate`    | `ArticleUpdate`       | `{enabled:true, limit:3}` | 最近更新栏                  |
| `articleBanner`    | `ArticleBanner`       | `{enabled:false}`         | 无侧边栏文章页顶部 Banner   |
| `breadcrumb`       | `Breadcrumb`          | `{enabled:true}`          | 面包屑导航                  |
| `articleTopTip`    | `boolean \| function` | —                         | 文章顶部 VitePress 容器提示 |
| `articleBottomTip` | `function`            | —                         | 文章底部 VitePress 容器提示 |
| `appreciation`     | `Appreciation`        | —                         | 赞赏功能 (3 种位置)         |

#### 评论

| 配置项    | 类型            | 默认值 | 说明                                    |
| --------- | --------------- | ------ | --------------------------------------- |
| `comment` | `CommentConfig` | —      | 内置 Twikoo/Waline/Giscus/Artalk/render |

#### 代码块

| 配置项      | 类型        | 默认值                               | 说明       |
| ----------- | ----------- | ------------------------------------ | ---------- |
| `codeBlock` | `CodeBlock` | `{enabled:true, collapseHeight:700}` | 代码块增强 |

#### 公告

| 配置项   | 类型     | 默认值            | 说明         |
| -------- | -------- | ----------------- | ------------ |
| `notice` | `Notice` | `{enabled:false}` | 弹窗公告系统 |

#### 主题增强

| 配置项         | 类型           | 默认值                           | 说明                 |
| -------------- | -------------- | -------------------------------- | -------------------- |
| `themeEnhance` | `ThemeEnhance` | `{enabled:true, position:"top"}` | 布局/颜色/聚光灯面板 |

#### 私密与安全

| 配置项     | 类型       | 默认值                         | 说明         |
| ---------- | ---------- | ------------------------------ | ------------ |
| `private`  | `Private`  | `{enabled:false, expire:"1d"}` | 4 级认证保护 |
| `riskLink` | `RiskLink` | `{enabled:false}`              | 外链风险提示 |

#### 站点分析

| 配置项          | 类型              | 默认值 | 说明                    |
| --------------- | ----------------- | ------ | ----------------------- |
| `siteAnalytics` | `SiteAnalytics[]` | `[]`   | 百度/谷歌/Umami/Clarity |

#### 插件与 Markdown

| 配置项        | 类型       | 默认值   | 说明               |
| ------------- | ---------- | -------- | ------------------ |
| `vitePlugins` | `Plugins`  | 全部开启 | 7 个 Vite 插件配置 |
| `markdown`    | `Markdown` | —        | Markdown 插件配置  |

---

## 3. 首页系统

### 3.1 首页判断逻辑

```
isHomePage = layout === "home" && !categoriesPage && !tagsPage
```

支持 `teekHome` 和 `vpHome` 同时为 `true`，两种首页共存。

### 3.2 Banner 系统 (`TkHomeBanner`)

**三种背景风格**：

| 风格      | 组件                       | 特点                   |
| --------- | -------------------------- | ---------------------- |
| `pure`    | `home-banner-bg-pure.vue`  | 纯色背景，CSS 变量驱动 |
| `partImg` | `home-banner-bg-image.vue` | 局部图片 + 特性列表    |
| `fullImg` | `home-banner-bg-image.vue` | 全屏图片 + 波浪纹      |

**Banner 配置项全览**：

- `name` — 标题文字
- `bgStyle` — `"pure"` / `"partImg"` / `"fullImg"`
- `pureBgColor` — 纯色背景色 (`#28282d`)
- `imgSrc` — 图片链接 (支持单张/多张/函数)
- `imgInterval` — 图片切换间隔 (15000ms)
- `imgShuffle` — 随机切换 (false)
- `imgWaves` — 波浪纹 (仅 fullImg，默认 true)
- `mask` / `maskBg` — 遮罩层 (rgba 0.4)
- `textColor` / `titleFontSize` / `descFontSize`
- `descStyle` — `"default"` / `"types"` (打字机) / `"switch"` (切换)
- `description` — 描述文字 (支持字符串数组)
- `switchTime` — 切换间隔 (4000ms)
- `switchShuffle` — 随机切换
- `typesInTime` / `typesOutTime` / `typesNextTime` — 打字速度控制
- `typesShuffle` — 随机打字
- `features` — 特性列表 `{title, details?, link?, image?}[]`
- `featureCarousel` — 移动端轮播间隔 (4000ms)

**Banner 子组件结构**：

```
TkHomeBanner
├── home-banner-bg-pure     (pure 风格)
├── home-banner-bg-image     (partImg/fullImg 风格)
├── home-banner-waves        (fullImg 波浪纹)
├── home-banner-content      (标题+描述+特性)
└── home-banner-feature      (移动端轮播)
```

**Backend 实现细节**：

- 图片切换使用 `useSwitchData` composable
- 打字机效果使用 `useTextTypes` composable
- 波浪纹使用 CSS animation
- 描述支持 `tk.banner.description` 和 `tk.description` 两种 frontmatter

### 3.3 壁纸模式 (`TkHomeFullscreenWallpaper`)

全屏壁纸按钮（首页最顶部），条件：

- `banner.bgStyle = 'fullImg'` 或 `bodyBgImg.imgSrc` 存在
- 配置项：`enabled`, `hideBanner` (隐藏 Banner 文字), `hideMask` (隐藏遮罩)

### 3.4 Body 背景图 (`TkBodyBgImage`)

- 单张/多张图片切换
- `imgOpacity` — 透明度 (0.1 ~ 1.0)
- `imgInterval` — 切换间隔
- `imgShuffle` — 随机切换
- `mask` / `maskBg` — 遮罩

### 3.5 文章列表 (`TkHomePost`)

**两种风格**：

| 风格   | 组件                      | 特点                      |
| ------ | ------------------------- | ------------------------- |
| `list` | `home-post-item-list.vue` | 列表布局，封面图左侧/右侧 |
| `card` | `home-post-item-card.vue` | 卡片布局，封面图顶部/全宽 |

**配置项**：

- `postStyle` — `"list"` / `"card"`
- `excerptPosition` — 摘要位置 `"top"` / `"bottom"`
- `showMore` / `moreLabel` — "阅读全文 >" 按钮
- `emptyLabel` — 空状态文字 "暂无文章"
- `coverImgMode` — `"small"` / `"full"` 封面模式
- `showCapture` — 自动截取摘要 (前 300 字)
- `splitSeparator` — 信息分隔符 `|`
- `transition` / `transitionName` — 过渡动画
- `listStyleTitleTagPosition` — 列表风格标题标签位置
- `cardStyleTitleTagPosition` — 卡片风格标题标签位置
- `defaultCoverImg` — 默认封面图数组

**分页**：基于 `page.pageSize` 每页文章数，结合 URL query `?pageNum=N` 实现分页。

### 3.6 首页特性 (`TkHomeFeature`)

仅当 `!teekHome` (文档风格首页) 时显示，在 `home-features-after` 插槽中渲染。

### 3.7 博主信息卡片 (`TkHomeCardMy`)

在侧边栏 `sidebar-nav-before` 插槽中渲染。

配置项 `blogger`：

- `name`, `slogan`, `avatar`
- `shape` — `"square"` / `"circle"` / `"circle-rotate"` / `"circle-rotate-last"` (旋转 59s)
- `circleBgImg` / `circleBgMask` — 圆形背景图
- `circleSize` — 头像大小 (默认 100)
- `color` — 字体颜色
- `status` — 状态图标 `{icon, size?, title?}`

---

## 4. 文章系统

### 4.1 文章数据处理管道

```
原始文件
  ↓ transformData()
TkContentData {url, relativePath, frontmatter, author, title, date, excerpt, capture}
  ↓ transformRaw()
PostData {
  allPosts, originPosts,
  sortPostsByDateAndSticky, sortPostsByDate,
  groupPostsByYear, groupPostsByYearMonth,
  groupPosts: {categories, tags},
  groupCards: {categories, tags},
  locales?: Record<string, PostData>
}
```

### 4.2 数据提取逻辑

**标题获取优先级**：`frontmatter.title` > 一级标题 > 文件名

**日期获取优先级**：`frontmatter.date` > 文件创建时间 > 当前时间

**摘要截取** (`getCaptureText`)：

- 最多 300 字符
- 清除：标题、图片、链接、加粗、`[[TOC]]`、`:::` 容器、`<!-- more -->`
- HTML 转义 `<` `>`

### 4.3 排序逻辑

`getSortPostsByDateAndSticky`：

1. 先按 `sticky` 排序 (值越小越靠前)
2. 同 `sticky` 按日期倒序
3. 无 `sticky` 按日期倒序

### 4.4 分组逻辑

- `groupByYear()` — 按年分组 `{"2025 ": [...], "2024 ": [...]}`（加空格防止自动排序）
- `groupByYearMonth()` — 按年月分组 `{"2025 ": {"01": [...], "02": [...]}}`
- `getGroupPosts()` — 按分类/标签分组
- `getGroupCards()` — 生成卡片显示数据 `{name, length}[]`

### 4.5 文章页布局 (`TkLayout`)

`TkLayout` 通过 VitePress 插槽系统渲染所有文章页组件：

**插槽 `doc-before`** (文章正文前)：

1. `TkArticleAnalyze` — 文章信息
2. `TkArticleImagePreview` — 图片预览
3. `TkArticlePageStyle` — 文章页风格
4. `TkArticleCodeBlock` — 代码块增强
5. `TkVpContainer` — 顶部提示
6. `TkSidebarTrigger` — 侧边栏触发器

**插槽 `doc-after`** (文章正文后)：

1. `TkArticleUpdate` — 最近更新栏
2. `TkDocAfterAppreciation` / `TkDocAfterAppreciationPopper` — 赞赏
3. 评论组件 (`TkCommentTwikoo` / `TkCommentWaline` / `TkCommentGiscus` / `TkCommentArtalk`)

**插槽 `aside-bottom`**：

- `TkAsideBottomAppreciation` — 侧边栏赞赏

**插槽 `aside-outline-before`**：

- `TkArticleShare` — 文章分享

**插槽 `layout-top`**：

- `TkArticleBanner` — 文章 Banner (条件渲染)

### 4.6 文章页风格 (`TkArticlePageStyle`)

5 种风格，通过 `pageStyle` 配置：

| 风格          | 类名                        | 说明               |
| ------------- | --------------------------- | ------------------ |
| `default`     | —                           | VitePress 原生风格 |
| `card`        | `tk-page-style-card`        | 单卡片包裹         |
| `segment`     | `tk-page-style-segment`     | 片段卡片包裹       |
| `card-nav`    | `tk-page-style-card-nav`    | 卡片 + 导航栏样式  |
| `segment-nav` | `tk-page-style-segment-nav` | 片段 + 导航栏样式  |

### 4.7 文章 Banner (`TkArticleBanner`)

显示条件（全部满足）：

- `articleBanner.enabled = true`
- 无侧边栏
- `frontmatter.article !== false`
- `layout` 为 `doc` 或无 layout
- `pageStyle === "default"`

配置项：`showCategory`, `showTag`, `defaultCoverImg`, `defaultCoverBgColor`

### 4.8 面包屑 (`TkBreadcrumb` / `TkArticleBreadcrumb`)

配置项 `breadcrumb`：

- `showCurrentName` — 是否显示当前文件名 (默认 false)
- `separator` — 分隔符 (默认 `/`)
- `homeLabel` — 首页提示 "首页"

---

## 5. 侧边卡片栏

支持 5 种卡片，通过 `homeCardSort` 排序：

### 5.1 精选文章 (`TkHomeCardTopArticle`)

- 从 `topArticle` 配置读取 `limit` 条
- 数据源：sticky > 0 或日期最新的文章
- 支持自动翻页 (`autoPage` + `pageSpeed`)
- 标题可点击回调 `titleClick(router)`

### 5.2 分类卡片 (`TkHomeCardCategory`)

- 从 `groupCards.categories` 获取数据
- 默认 `limit: 5`，支持自动翻页
- `moreLabel: "更多 ..."`
- 点击跳转到分类页 `category.path` (默认 `/categories`)

### 5.3 标签卡片 (`TkHomeCardTag`)

- 从 `groupCards.tags` 获取数据
- 默认 `limit: 21`，支持自动翻页
- 使用 `tagColor` 配置控制每个标签的背景色
- 点击跳转到标签页 `tag.path` (默认 `/tags`)

### 5.4 友情链接 (`TkHomeCardFriendLink`)

- 配置 `friendLink.list: FriendLinkItem[]`
- 支持自动滚动 (`autoScroll` + `scrollSpeed`)
- 支持自动翻页 (`autoPage` + `pageSpeed`)
- 标题可点击回调 `titleClick(router)`

### 5.5 站点信息 (`TkHomeCardDocAnalysis`)

- 显示信息：文章数、近一周/月新增、运行时间、总字数、最后活跃时间、访问量/访客数
- `createTime` — 站点创建时间
- `statistics.provider` — `"busuanzi"` / `"vercount"`
- `statistics.siteView` — 首页访问量
- `statistics.pageView` — 文章页浏览量
- `statistics.permalink` — 是否统计永久链接
- `overrideInfo` — 自定义覆盖已有信息
- `appendInfo` — 追加额外信息

### 5.6 通用卡片功能 (`TkPageCard`)

所有卡片共用：

- 分页 (`TkPagination`)
- 标题自定义 (`title: string | ((icon: string) => string)`)
- 空状态 (`emptyLabel`)

---

## 6. 文章增强功能

### 6.1 文章信息展示 (`TkArticleAnalyze`)

配置项 `articleAnalyze`：

- `showIcon` — 是否显示图标
- `dateFormat` — `"yyyy-MM-dd"` / `"yyyy-MM-dd hh:mm:ss"` / 自定义函数
- `dateUTC` — 是否使用 UTC 时间
- `showInfo` — 基本信息开关 (支持按位置 `["post","article"]`)
- `showAuthor` / `showCreateDate` / `showUpdateDate` / `showCategory` / `showTag`
- `teleport` — 传送到指定位置 `{selector, position:"before"/"after", className}`
- `imageViewer` — 图片查看器配置 (基于 `TkImageViewer` 组件)

### 6.2 图片预览 (`TkArticleImagePreview`)

- 继承自通用 `TkImageViewer` 组件
- 点击文章内图片开启全屏预览
- 支持缩放/拖拽/旋转/键盘导航

### 6.3 图片查看器 (`TkImageViewer`)

通用图片查看器组件：

- `urlList` — 图片 URL 列表
- `initialIndex` — 初始索引
- `infinite` — 无限循环
- 工具栏：缩放、旋转、全屏、关闭

### 6.4 代码块增强 (`TkArticleCodeBlock`)

配置项 `codeBlock`：

- `collapseHeight` — 超出折叠高度 (默认 700px)
- `overlay` — 底部遮罩层 (默认 false)
- `overlayHeight` — 遮罩层高度 (默认 400)
- `langTextTransform` — 语言标签文本转换 (`"uppercase"` / `"lowercase"` / `"capitalize"` / `"none"`)
- `copiedDone(TkMessage)` — 复制完成回调

### 6.5 标题高亮 (`TkArticleHeadingHighlight`)

自动为文章内 h1~h6 标题添加 hover 高亮效果。

### 6.6 文章分享 (`TkArticleShare`)

- 一键复制当前页面链接
- 配置项：`icon`, `text`, `copiedIcon`, `copiedText`, `query` (是否含查询参数), `hash`

### 6.7 最近更新栏 (`TkArticleUpdate`)

- 显示在文章底部
- `limit` — 显示数量 (默认 3)
- `moreLabel` — "更多文章 >"

### 6.8 赞赏功能 (`TkArticleAppreciation`)

**3 种位置**：

| 位置               | 组件                           | 特点                  |
| ------------------ | ------------------------------ | --------------------- |
| `doc-after`        | `TkDocAfterAppreciation`       | 文章底部展开/折叠     |
| `doc-after-popper` | `TkDocAfterAppreciationPopper` | 文章底部 Popover 弹出 |
| `aside-bottom`     | `TkAsideBottomAppreciation`    | 侧边栏底部            |

**配置方式**：

```
appreciation: {
  position: "doc-after",
  options: {
    icon: "weChatPay" | "alipay" | TkIcon,
    expandTitle: "打赏支持",
    collapseTitle: "下次一定",
    content: "<img src='...'>",  // 支持 HTML
    expand: false
  }
}
```

### 6.9 文章顶部/底部提示

- `articleTopTip` — 顶部 VitePress 容器，支持布尔值或函数返回 `VpContainerProps`
- `articleBottomTip` — 底部 VitePress 容器，函数返回 `VpContainerProps`
- 使用场景：超期文章提醒、版权声明、免责声明等

---

## 7. 评论系统

### 7.1 评论提供者

| 提供者 | 组件                | 加载方式       |
| ------ | ------------------- | -------------- |
| Twikoo | `TkCommentTwikoo`   | CDN 在线链接   |
| Waline | `TkCommentWaline`   | CDN 在线链接   |
| Giscus | `TkCommentGiscus`   | CDN 或在线链接 |
| Artalk | `TkCommentArtalk`   | CDN 在线链接   |
| 自定义 | 插槽 `teek-comment` | 用户自定义组件 |

### 7.2 各评论配置示例

**Twikoo**：

```ts
comment: {
  provider: "twikoo",
  options: { envId: "xxx", version: "1.6.42", timeout: 700 }
}
```

**Waline**：

```ts
comment: {
  provider: "waline",
  options: { serverURL: "xxx", dark: "html[class='dark']" }
}
```

**Giscus**：

```ts
comment: {
  provider: "giscus",
  options: {
    repo: "user/repo", repoId: "xxx",
    category: "xxx", categoryId: "xxx",
    useOnline: false
  }
}
```

**Artalk**：

```ts
comment: {
  provider: "artalk",
  options: { server: "xxx", site: "xxx" }
}
```

### 7.3 Frontmatter 控制

```yaml
comment: false   # 关闭评论
comment: true    # 强制开启
```

### 7.4 评论检测

`TkRightBottomButton` 中的 `ToComment` 按钮通过 inject 检测 4 种评论组件实例，自动判断是否显示"前往评论"按钮。

---

## 8. 主题增强面板

### 8.1 概览

`TkThemeEnhance` 渲染在 `nav-bar-content-after` 插槽，包含 3 大功能模块。

配置项：

- `enabled` — 是否启用
- `hidden` — 隐藏面板但保留默认值
- `position` — `"top"` (导航栏右侧) / `"bottom"` (右下角)

### 8.2 布局切换 (`TkLayoutSwitch`)

**4 种布局模式** (通过 `html[layout-mode="xxx"]` 驱动)：

| 模式       | 值                           | 说明               |
| ---------- | ---------------------------- | ------------------ |
| 原始宽度   | `original`                   | VitePress 默认布局 |
| 全部展开   | `fullWidth`                  | 侧边栏+内容全屏    |
| 侧边栏可调 | `sidebarWidthAdjustableOnly` | 侧边栏宽度可调     |
| 全部可调   | `bothWidthAdjustable`        | 侧边栏+内容均可调  |

子配置项：

- `disabled` / `hidden` / `defaultMode` / `disableHelp` / `disableAnimation`
- `switchModeDone(mode)` — 切换回调

### 8.3 文档/页面最大宽度

两个独立的滑块控件：

- **文档内容最大宽度** — 滑块 0-100%，对应 `defaultDocMaxWidth`
- **页面最大宽度** — 滑块 0-100%，对应 `defaultPageMaxWidth`

### 8.4 主题色板 (`TkThemeColor`)

**12 个内置主题色**：

| 系列              | 颜色                           | 选择器                              |
| ----------------- | ------------------------------ | ----------------------------------- |
| VP (VitePress)    | primary/success/warning/danger | `html[theme-color="vp-primary"]` 等 |
| TK (Teek)         | primary/success/warning/danger | `html[theme-color="tk-primary"]` 等 |
| EP (Element Plus) | primary/success/warning/danger | `html[theme-color="ep-primary"]` 等 |

**自定义拓展色板**：

```ts
themeColor: {
  customize: true,  // 从 0 开始自定义
  append: [
    {
      label: "自定义组",
      tip: "自定义提示",
      options: [{ value: "my-color", label: "颜色名", color: "#ff0000" }]
    }
  ]
}
```

**扩散开关** (`defaultSpread`)：

- 开启后将主题色计算扩散到更多 CSS 变量（背景色、文字色等）
- 使用 `useThemeColor` composable 进行颜色计算
- 支持 `switchColorDone(color)` 回调

**禁用与隐藏**：

- `disabled` — 完全禁用
- `hidden` — 隐藏 UI 但保留默认值生效
- `disabledInMobile` — 移动端禁用

### 8.5 聚光灯 (`TkSpotlight`)

阅读辅助功能，高亮鼠标悬停区域。

**2 种样式** (`SpotlightStyle`)：

| 样式     | 值      | 效果                 |
| -------- | ------- | -------------------- |
| 置于侧边 | `aside` | 悬停元素旁固定纯色线 |
| 置于底部 | `under` | 悬停元素下方纯色背景 |

配置项：

- `disabled` / `hidden` / `defaultStyle` / `defaultValue` / `disableHelp`

### 8.6 主题增强面板子组件结构

```
TkThemeEnhance
├── base-template.vue      (通用面板模板)
├── switch.vue             (开关控件)
├── title.vue              (标题控件)
├── helper.vue             (帮助提示)
├── layout-switch.vue      (布局切换)
├── layout-doc-width-slide.vue  (文档宽度滑块)
├── layout-page-width-slide.vue (页面宽度滑块)
├── theme-color.vue        (主题色选择)
├── spotlight.vue          (聚光灯开关)
├── spotlight-style.vue    (聚光灯样式)
├── spotlight-hover.vue    (聚光灯悬停效果)
└── border-highlight.vue   (边框高亮)
```

---

## 9. 页面系统

### 9.1 页面类型判断 (`usePageState`)

| 属性                    | 判断条件                                                                  |
| ----------------------- | ------------------------------------------------------------------------- |
| `isHomePage`            | `layout === "home"` 且非分类/标签页                                       |
| `isCategoriesPage`      | `frontmatter.categoriesPage`                                              |
| `isTagsPage`            | `frontmatter.tagsPage`                                                    |
| `isArchivesPage`        | `frontmatter.archivesPage` 或 `layout === "TkArchivesPage"`               |
| `isCataloguePage`       | `frontmatter.catalogue` 或 `layout === "TkCataloguePage"`                 |
| `isArticleOverviewPage` | `frontmatter.articleOverviewPage` 或 `layout === "TkArticleOverviewPage"` |
| `isLoginUrl`            | `frontmatter.loginPage` 或 `layout === "TkLoginPage"`                     |
| `isRiskLinkPage`        | `frontmatter.riskLinkPage` 或 `layout === "TkRiskLinkPage"`               |

### 9.2 归档页 (`TkArchivesPage`)

- 按年份分组展示所有文章
- 显示每篇文章的发布日期
- 国际化支持：`tk.archives.*` 翻译键

### 9.3 目录页 (`TkCataloguePage`)

- 基于 `frontmatter.path` 扫描指定目录下的文章
- 展示文章目录树
- 配置：`catalogueOption` (通过 `vitepress-plugin-catalogue`)

### 9.4 文章清单页 (`TkArticleOverviewPage`)

- 表格形式展示所有文章
- 列：分类、标题、发布时间、字数、阅读时长
- 支持排序

### 9.5 登录页 (`TkLoginPage`)

- 表单：用户名 + 密码 + 验证码
- 支持自定义登录逻辑 (`doLogin`)
- 支持自定义验证码组件
- 重置/登录按钮
- `loginSuccess` / `loginError` 提示

### 9.6 风险链接页 (`TkRiskLinkPage`)

- 显示警告信息
- 显示目标链接
- "继续访问"按钮
- 链接安全性校验中状态

### 9.7 页面路径解析 (`usePagePath`)

自动从 `allPosts` 中查找各功能页的 URL：

- `categoryPath` — 分类页
- `tagPath` — 标签页
- `archivesPath` — 归档页
- `articleOverviewPath` — 文章清单页
- `loginPath` — 登录页
- `riskLinkPath` — 风险链接页

支持国际化前缀拼接。

---

## 10. 私密文章系统

### 10.1 4 级认证体系

| 级别       | 类型    | 说明                       | 作用范围 |
| ---------- | ------- | -------------------------- | -------- |
| 站点级     | `site`  | 进入网站即验证             | 全站     |
| 全局页面级 | `pages` | 登录一次访问所有全局级文章 | 多个页面 |
| 领域级     | `realm` | 登录一次访问同领域文章     | 限定领域 |
| 单页面级   | `page`  | 每篇文章独立验证           | 单篇文章 |

### 10.2 admin 角色

站点级登录信息中 `role: "admin"` 可跳过所有后续页面级验证。

### 10.3 配置结构

```ts
private: {
  enabled: false,
  expire: "1d",          // 过期时间 (1d / 1h / 秒数)
  session: false,        // 关闭页面时清除登录
  siteLogin: false,      // 站点级登录
  site: [{ username, password, role, expire, session, strategy }],
  pages: [{ username, password, ... }],
  realm: {
    realmName: [{ username, password, ... }]
  },
  onFocus(formName),     // 输入框聚焦回调
  onBlur(formName),      // 输入框失焦回调
  doLogin(loginInfo, type, nativeExecLogin),  // 自定义登录逻辑
  doValidate(type, frontmatter, nativeValidate), // 自定义验证逻辑
  encrypt(value, frontmatter),  // 自定义加密
  decrypt(value, frontmatter),  // 自定义解密
}
```

### 10.4 Frontmatter 控制

```yaml
private: true # 启用私密保护
privateRealm: "realm1" # 指定领域
username: "user" # 单页面用户名
password: "pass" # 单页面密码
loginInfo: # 多用户
  - username: "user1"
    password: "pass1"
```

### 10.5 存储键设计

```
tk:private:site:{hostname}
tk:private:pages:{hostname}
tk:private:page:{hostname}{path}
tk:private:realm:{hostname}{realmName}
```

### 10.6 认证流程

```
1. 检查 private.enabled
2. 检查站点级 admin 角色 → 直接放行
3. 单页面级认证 (frontmatter.loginInfo 或 username/password)
   └── 失败 → 4
4. 领域级认证 (frontmatter.privateRealm)
   └── 失败 → 5
5. 全局页面级认证 (pages)
   └── 失败 → 跳转登录页
```

---

## 11. 风险链接提示

### 11.1 配置

```ts
riskLink: {
  enabled: false,
  whitelist: [/example\.com/, "https://safe.com"],  // 白名单
  blacklist: [/evil\.com/],                          // 黑名单 (优先)
}
```

### 11.2 工作流程

1. 页面内容更新时 (`onContentUpdated`)，扫描所有外链
2. 如果设置黑名单，只拦截黑名单链接
3. 否则，拦截所有外链（白名单除外）
4. 点击外链时跳转到风险提示页
5. 用户在提示页确认后继续访问

---

## 12. 页脚系统

### 12.1 信息组 (`TkFooterGroup`)

```ts
footerGroup: [
  {
    title: "外部链接",
    icon: TkIcon, // 可选
    links: [
      { name: "GitHub", link: "...", icon: "..." },
      { name: "Gitee", link: "..." },
    ],
  },
];
```

### 12.2 页脚信息 (`TkFooterInfo`)

```ts
footerInfo: {
  topMessage: string | string[],      // 主题版权上方的信息 (支持 HTML)
  bottomMessage: string | string[],   // 主题版权下方的信息 (支持 HTML)
  theme: {
    show: true,
    name: "自定义名称",
    link: "自定义链接",
    icon: "..."
  },
  copyright: {
    show: true,
    createYear: 2021,
    suffix: "天客 Blog"
  },
  icpRecord: {
    name: "桂ICP备2021009994号",
    link: "http://beian.miit.gov.cn/"
  },
  securityRecord: {
    name: "",
    link: ""
  },
  customHtml: "<div>自定义 HTML</div>"
}
```

### 12.3 社交链接

```ts
social: [
  {
    name: "GitHub",
    icon: "mdi:github", // 支持 Iconify / SVG / 图片
    iconType: "svg", // "svg" | "iconify" | "img"
    link: "https://github.com/xxx",
  },
];
```

社交链接渲染在博主信息卡片 (`TkHomeCardMy`) 和页脚 (`TkFooterInfo`) 中。

---

## 13. 导航与侧边栏

### 13.1 导航栏

- 继承 VitePress 默认导航栏
- `nav-bar-content-after` 插槽注入 `TkThemeEnhance`
- vp-plus 样式增强：毛玻璃效果、搜索按钮、开关按钮、翻译下拉

### 13.2 侧边栏触发器 (`TkSidebarTrigger`)

- 在 `doc-before` 插槽渲染
- 点击展开/折叠侧边栏
- 支持自定义插槽 `teek-sidebar-trigger`

### 13.3 侧边栏样式增强

- 一级菜单字体加大 (18px)
- 菜单项 hover 右移动画 (translateX 4px)
- 二级菜单缩进 (10px)

---

## 14. Markdown 拓展

### 14.1 TODO 列表 (`todoPlugin`)

```md
- [ ] 未完成任务
- [x] 已完成任务
```

渲染为 `<input type="checkbox" disabled>` + 移除标记前缀。

### 14.2 视频容器 (`videoPlugin`)

```md
::: video bilibili
BV1xx411c7mD
:::
```

支持平台：`bilibili`, `tencent`, `youku`, `youtube`, `vimeo`, `xigua`

渲染为 iframe，支持 `allowfullscreen`。

### 14.3 Demo 容器 (`demoPlugin`)

````md
::: demo effect

```yaml
effect: button-primary.vue
file: button-primary.vue
`` `
:::
```
````

- 读取 `examples/` 目录下的 `.vue` 文件
- `effect` 标记表示渲染组件效果
- 支持 YAML 配置分离 effect 和 source
- 渲染为 `<TkDemoCode>` 组件，显示效果 + 源码 + Playground/GitHub 链接

### 14.4 分享卡片 (`shareCardPlugin`)

````md
::: shareCard 3

```yaml
- name: Teeker
  desc: 描述
  avatar: /avatar.png
  link: https://...
  bgColor: "#f0f0f0"
  textColor: "#333"
`` `
:::
```
````

- CSS Grid 自适应布局 (1-4 列 + auto)
- 头像 + 名称 + 描述 + 链接

### 14.5 图片卡片 (`imgCardPlugin`)

````md
::: imgCard 3

```yaml
- img: /image.png
  name: 图片名称
  desc: 图片描述
  author: 作者
  avatar: /avatar.png
  link: https://...
`` `
:::
```
````

- 支持 `objectFit`, `imgHeight`, `lineClamp` 配置
- 图片懒加载骨架屏

### 14.6 导航卡片 (`navCardPlugin`)

````md
::: navCard 3

```yaml
- name: 卡片名称
  desc: 卡片描述
  img: /image.png
  link: https://...
  badge: NEW
  badgeType: tip
`` `
:::
```
````

- 右上角 VPBadge 支持 (`info` / `tip` / `warning` / `danger`)

### 14.7 内置容器 (`containerPlugin`)

```md
::: center
居中内容
:::

::: right
右对齐内容
:::

::: note 自定义标题
提示内容
:::
```

### 14.8 自定义容器拓展

```ts
markdown: {
  container: {
    config: () => [{ type: "myContainer", useTitle: true, defaultTitle: "标题", className: "my-class" }];
  }
}
```

### 14.9 Markdown 配置

```ts
markdown: {
  config: (md) => { /* 注册更多 markdown-it 插件 */ },
  container: { label: { noteLabel: "提示" }, config: () => [...] },
  demo: {
    disabled: false,
    playgroundUrl: "...",
    playgroundMainFileName: "App.vue",
    githubUrl: "...",
    // 按钮提示文案...
  }
}
```

---

## 15. 样式系统

### 15.1 SCSS 架构

```
theme-chalk/src/
├── index.scss                 # 入口 → 导入 base
├── base.scss                  # 基础层 (common/var/markdown-plugin/article-page)
│   ├── common/
│   │   ├── tk.scss            # 工具类 (pointer/center/hover/scroll-animate/skeleton)
│   │   ├── atomic.scss        # 原子类
│   │   ├── scrollbar.scss     # 滚动条
│   │   ├── transition-collapse.scss
│   │   ├── transition-dark.scss   # View Transition API
│   │   ├── transition-fade.scss   # 3 种淡入淡出
│   │   └── transition-slide.scss  # 4 种滑动效果
│   ├── var/
│   │   ├── var.scss           # CSS 变量定义 (全局 + Teek + Element Plus)
│   │   ├── theme-color.scss   # 12 个内置主题色
│   │   └── theme-size.scss    # 4 档响应式尺寸
│   ├── markdown-plugin/       # Markdown 插件样式 (6 个)
│   ├── components/
│   │   ├── common/            # 通用组件样式 (15 个)
│   │   └── theme/             # 主题组件样式 (40+ 个)
│   ├── vp-plus/               # VitePress 原生样式覆盖 (20+ 个)
│   └── tk-plus/               # Teek 额外效果 (6 个)
└── mixins/
    ├── config.scss            # 命名空间 + BEM 分隔符配置
    ├── function.scss          # SCSS 函数 (getCssVar/bem/joinVarName)
    ├── bem.scss              # BEM 混合宏 (b/e/m/multiple-b)
    └── mixins.scss            # set-css-var 混合宏
```

### 15.2 BEM 命名规范

- 命名空间：`tk`
- 块：`.tk-block`
- 元素：`.tk-block__element`
- 修饰符：`.tk-block--modifier`
- 状态：`.is-xxx`, `.has-xxx`
- JS 端通过 `useNamespace()` 生成

### 15.3 CSS 变量三层设计

**第一层：全局样式变量** (`:root` / `:root.dark`)

- `--tk-theme-color`, `--tk-text-color-*`, `--tk-bg-color*`, `--tk-fill-color*`
- `--tk-card-shadow`, `--tk-hover-shadow`
- `--tk-transition-duration*` (fast/normal/slow/slow-plus)
- `--tk-home-bg-color`

**第二层：Teek 主题变量** (`:root` / `:root.dark`)

- 每种颜色有 4 级变体：base / light-3 / light-5 / light-8
- primary, success, warning, danger, error, info

**第三层：Element Plus 主题变量** (`:root` / `:root.dark`)

- `--tk-el-color-*` 系列
- 同样 4 级变体

### 15.4 主题色切换机制

通过 `html[theme-color="xxx"]` 属性选择器覆盖 4 个 VitePress CSS 变量：

- `--vp-c-brand-1` → 主色
- `--vp-c-brand-2` → 浅色
- `--vp-c-brand-3` → 更浅
- `--vp-c-brand-soft` → 柔和色

### 15.5 主题尺寸系统

通过 `html[tk-theme-size="xxx"]` 驱动 4 档响应尺寸：

| 尺寸    | 首页最大宽 | 卡片宽 | 文章图片(小/大) | 字号范围 | 页面宽 | 页脚宽 |
| ------- | ---------- | ------ | --------------- | -------- | ------ | ------ |
| small   | 1000px     | 260px  | 100/240px       | 12-17px  | 800px  | 70%    |
| default | 1140px     | 280px  | 120/360px       | 12-18px  | 900px  | 80%    |
| large   | 1330px     | 350px  | 160/420px       | 13-19px  | 1000px | 90%    |
| wide    | 1420px     | 350px  | 160/480px       | 13-19px  | 1100px | 100%   |

移动端 (≤768px) 卡片宽度 == 100%。

### 15.6 过渡动画

| 类名                          | 效果                          |
| ----------------------------- | ----------------------------- |
| `tk-fade`                     | 淡入淡出                      |
| `tk-fade-scale`               | 淡入淡出 + 缩放               |
| `tk-fade-linear`              | 线性淡入淡出                  |
| `tk-slide-next`               | 下一页滑入                    |
| `tk-slide-prev`               | 上一页滑入                    |
| `tk-slide-fade`               | 滑动淡入 (文章列表默认)       |
| `tk-scroll`                   | 上下滚动                      |
| `scroll__animate` + `visible` | IntersectionObserver 滚动入场 |

### 15.7 VitePress 样式增强 (vp-plus)

| 文件                         | 增强内容                                       |
| ---------------------------- | ---------------------------------------------- |
| `nav-blur.scss`              | 导航栏毛玻璃效果 (backdrop-filter: blur(10px)) |
| `nav-search-button.scss`     | 搜索按钮样式                                   |
| `nav-switch-button.scss`     | 开关按钮样式                                   |
| `nav-translation.scss`       | 翻译下拉样式                                   |
| `sidebar.scss`               | 一级菜单加大、hover 位移、二级缩进             |
| `aside.scss`                 | 大纲栏文字悬停和激活样式                       |
| `blockquote.scss`            | 引用块样式                                     |
| `table.scss`                 | 表格去单元格线条                               |
| `mark.scss`                  | `<mark>` 高亮样式                              |
| `doc-h1-gradient.scss`       | H1 渐变色                                      |
| `doc-fade-in.scss`           | 文章页渐入                                     |
| `code-block-mobile.scss`     | 移动端代码块优化                               |
| `index-rainbow.scss`         | 首页图片彩虹动画                               |
| `container*.scss`            | 容器增强系列 (背景/图标/流体/左侧边框/变量)    |
| `brand-color-animation.scss` | 品牌色动画                                     |
| `scrollbar.scss`             | 自定义滚动条                                   |

### 15.8 Teek 增强效果 (tk-plus)

| 文件                         | 效果                                   |
| ---------------------------- | -------------------------------------- |
| `banner-desc-gradient.scss`  | Banner 描述彩虹渐变字                  |
| `banner-full-img-scale.scss` | 全屏 Banner 图片缩放                   |
| `copy-banner.scss`           | 复制时顶部横幅滑入                     |
| `fade-up-animation.scss`     | 首页加载淡入动画                       |
| `home-card-hover.scss`       | 卡片悬停放大 (scale 1.02) + 品牌色阴影 |

### 15.9 图片懒加载骨架屏

```html
<div class="skeleton-image">
  <img src="..." onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')" />
</div>
```

未加载完成时显示骨架屏动画，加载完成后渐入显示。

---

## 16. 国际化系统

### 16.1 语言包

```ts
// zh-CN
{ lang: "zh-CN", tk: { archives: {...}, home: {...}, ... } }

// en-US
{ lang: "en-US", tk: { archives: {...}, home: {...}, ... } }
```

### 16.2 翻译函数

```ts
const { t } = useLocale();
t("tk.home.postLabel"); // "文章列表"
t("tk.pagination.total", { total: 100 }); // "共 100 条"
```

- 路径分隔符 `.`
- `{key}` 模板替换
- 默认语言 zh-CN
- 支持 provide/inject 和直接传参两种方式

### 16.3 国际化文章数据

`transformRaw()` 自动按语言目录分组：

- `locales["zh-CN"]` — `zh-CN/` 目录下的文章
- `locales["en-US"]` — `en-US/` 目录下的文章
- `locales["root"]` — 根目录文章

`usePosts()` 自动根据当前语言返回对应文章数据。

---

## 17. 站点分析

### 17.1 支持提供商

| 提供商    | 配置项                        | 方式                  |
| --------- | ----------------------------- | --------------------- |
| `baidu`   | `{ id: string }`              | script 注入 + PV 上报 |
| `google`  | `{ id: string }`              | script 注入           |
| `umami`   | `{ id: string, src: string }` | script 注入           |
| `clarity` | `{ id: string }`              | script 注入           |

### 17.2 配置

```ts
siteAnalytics: [
  { provider: "baidu", options: { id: "xxx" } },
  { provider: "google", options: { id: "xxx" } },
  { provider: "umami", options: { id: "xxx", src: "https://..." } },
  { provider: "clarity", options: { id: "xxx" } },
];
```

### 17.3 UV/PV 统计

通过 `useUvPv` composable 实现：

**busuanzi**：

- JSONP 回调方式请求
- 返回 `site_pv`, `site_uv`, `page_pv`, `page_uv`

**vercount**：

- localStorage 轮询方式
- 支持 today/yesterday 数据

**自定义**：

- `requestFn(url, createScriptFn)` 自定义请求
- 触发 `window.dispatchEvent(new CustomEvent("views", { detail: data }))` 通知

**配置项**：

- `provider` — `"busuanzi"` / `"vercount"`
- `tryRequest` / `tryCount` / `tryIterationTime` — 重试机制

---

## 18. Vite 插件系统

### 18.1 插件架构

`registerPluginAndGet()` 分为两组：

**松散耦合插件** (通过配置可关闭)：

| 插件                                | 默认  | 功能                 |
| ----------------------------------- | ----- | -------------------- |
| `vitepress-plugin-auto-frontmatter` | false | 自动生成 frontmatter |
| `vitepress-plugin-sidebar-resolve`  | true  | 自动侧边栏           |
| `vitepress-plugin-permalink`        | true  | 永久链接             |
| `vitepress-plugin-md-h1`            | true  | 自动 H1 标题         |
| `vitepress-plugin-doc-analysis`     | true  | 文档统计             |

**强依赖插件** (始终激活，当 `teekTheme !== false`)：

| 插件                                   | 功能         |
| -------------------------------------- | ------------ |
| `vitepress-plugin-catalogue`           | 目录页生成   |
| `vitepress-plugin-file-content-loader` | 文章数据加载 |

### 18.2 AutoFrontmatter 增强

Teek 对 `autoFrontmatterOption` 进行了扩展：

- `permalink` — 是否生成永久链接
- `permalinkType` — `"simple"` / `"rules"`
- `permalinkPrefix` — 固定前缀
- `permalinkRules` — 规则配置数组
- `categories` — 自动生成分类
- `coverImg` — 自动添加封面图
- `forceCoverImg` — 强制替换封面图
- `coverImgList` — 封面图池

### 18.3 永久链接生成规则

支持占位符：

| 占位符     | 说明                      | 示例                     |
| ---------- | ------------------------- | ------------------------ |
| `$UUID`    | 随机字符串 (默认 6 位)    | `$UUID` → `a3k9m2`       |
| `$UUID{n}` | n 位随机字符串 (1-15)     | `$UUID10` → `a3k9m2x8p1` |
| `$PATH`    | 一级目录 hash (默认 6 位) | `$PATH` → `264ca4`       |
| `$PATH{n}` | 一级目录 hash (6-10 位)   | `$PATH8` → `264ca4ab`    |

中文路径自动 SHA-256 哈希处理。

### 18.4 忽略规则

各插件默认忽略：

- `autoFrontmatter`: `**/@pages/**`, `**/.scripts/**`
- `sidebar`: `@pages`, `@fragment`, `examples`, `.scripts`
- `mdH1`: `@pages`, `.scripts`
- `docAnalysis`: `@pages`, `/目录页/`, `.scripts`
- `fileContentLoader`: `**/components/**`, `**/.vitepress/**`, `**/public/**`, `**/*目录页*/**`

---

## 19. 组合式函数库

### 19.1 完整列表 (24 个)

| 函数                                                 | 功能                  | 关键特性                                              |
| ---------------------------------------------------- | --------------------- | ----------------------------------------------------- |
| `useNamespace(block?)`                               | BEM 类名生成          | b/e/m/is/has/cssVar/storageKey                        |
| `useAnchorScroll()`                                  | URL hash 锚点         | 自动监听+防抖，离顶 ≤150px 判定                       |
| `useClipboard(timeout?)`                             | 复制到剪贴板          | navigator.clipboard + execCommand 兜底                |
| `useCopyBanner(text?, timeout?)`                     | 复制横幅提示          | 监听 copy 事件，顶部滑入横幅                          |
| `useDebounce(fn, delay?, immediate?)`                | 防抖函数              | 标准实现                                              |
| `useElementHover(el, options?)`                      | 鼠标悬停检测          | 支持延迟进入/离开                                     |
| `useEventListener(target, event, handler, options?)` | 事件监听              | 自动清理，watch 响应式 target                         |
| `useLocale(override?)`                               | 国际化翻译            | provide/inject 或直接传参                             |
| `useMediaQuery(query, match?)`                       | 媒体查询              | 响应式 matchMedia                                     |
| `useMounted(fn?, options?)`                          | onMounted 封装        | sync/nextTick 控制                                    |
| `usePopoverSize(trigger, popover, options?)`         | Popover 定位          | 12 方向，边界检测，自动翻转                           |
| `useScrollData(data, limit, options?)`               | 数据滚动截取          | 定时循环，支持 start/stop/restart                     |
| `useScrollbarSize()`                                 | 滚动条尺寸            | DOM 测量                                              |
| `useScopeDispose(fn)`                                | 作用域销毁            | 等价 onUnmounted                                      |
| `useStorage(key, defaults, type?, options?)`         | 响应式 Storage        | localStorage/sessionStorage，8 种序列化器，跨标签同步 |
| `useSwitchData(dataList, options?)`                  | 数据定时切换          | 顺序/随机，onBeforeUpdate/onUpdate/onAfterUpdate      |
| `useTextTypes(data, options?)`                       | 打字机效果            | 逐字输入→停顿→逐字删除→切换                           |
| `useThemeColor(color, ignoreList?)`                  | 主题色全元素扩散      | light/dark 双模式，start/stop/update/clear            |
| `useUvPv(immediate?, options?)`                      | UV/PV 统计            | busuanzi JSONP / vercount localStorage 轮询           |
| `useViewTransition(options)`                         | View Transition API   | 深色/浅色圆圈扩散动画                                 |
| `useVpRouter()`                                      | VitePress Router 绑定 | 防重复绑定，before/after 控制                         |
| `useWindowSize(callback?, options?)`                 | 窗口尺寸              | inner/outer/visual 三种模式，防抖                     |
| `useWindowTransition(element?, immediate?)`          | 滚动入场动画          | IntersectionObserver + CSS class                      |
| `useZIndex(overrides?)`                              | z-index 管理          | 全局递增，不重复                                      |
| `onClickOutside(target, handler, options?)`          | 点击外部检测          | 来自 VueUse，支持 ignore/iframe/controls              |

---

## 20. 工具函数库

### 20.1 类型判断 (`is.ts`)

| 函数                                  | 功能                                 |
| ------------------------------------- | ------------------------------------ |
| `isExternal(path)`                    | 是否外部链接 (http/https/mailto/tel) |
| `isValidURL(url)`                     | 是否有效 URL                         |
| `isType(val)`                         | 返回数据类型字符串                   |
| `is(val, type)`                       | 类型判断                             |
| `isPlainFunction(val)`                | 是否纯函数                           |
| `isFunction(val)`                     | 是否函数 (含 async)                  |
| `isDef(val)` / `isUnDef(val)`         | 是否已定义/未定义                    |
| `isObject(val)`                       | 是否对象                             |
| `isDate(val)`                         | 是否日期                             |
| `isNumber(val)`                       | 是否数字                             |
| `isStringNumber(val)`                 | 是否字符串数字                       |
| `isAsyncFunction(val)`                | 是否异步函数                         |
| `isPromise(val)`                      | 是否 Promise                         |
| `isString(val)`                       | 是否字符串                           |
| `isBoolean(val)`                      | 是否布尔值                           |
| `isArray(val)`                        | 是否数组                             |
| `isElement(val)`                      | 是否 DOM 元素                        |
| `isNull(val)` / `isNullOrUnDef(val)`  | null 判断                            |
| `isPhone(val)`                        | 是否手机号                           |
| `isImagePath(path)`                   | 是否图片链接                         |
| `isImageDom(o)`                       | 是否图片节点                         |
| `isIos()`                             | 是否 iOS                             |
| `isEmpty(val, checkComplexType?)`     | 是否空值                             |
| `isFocusable(element)`                | 是否可聚焦                           |
| `isClient` / `isServer` / `inBrowser` | 环境判断                             |

### 20.2 日期工具 (`date.ts`)

| 函数                               | 功能                              |
| ---------------------------------- | --------------------------------- |
| `getNowDate(format?, utc?)`        | 获取当前时间                      |
| `formatDate(date, format?, utc?)`  | 日期格式化 (yyyy-MM-dd hh:mm:ss)  |
| `formatDiffDate(start, end?)`      | 时间差 (x 秒/分/时/天/周/月/年前) |
| `formatDiffDateToDay(start, end?)` | 相差天数                          |

### 20.3 颜色工具 (`color.ts`)

| 函数                          | 功能           |
| ----------------------------- | -------------- |
| `hexToRgb(str)`               | HEX → RGB 数组 |
| `rgbToHex(r, g, b)`           | RGB → HEX      |
| `getDarkColor(color, level)`  | 加深颜色 (0-1) |
| `getLightColor(color, level)` | 变浅颜色 (0-1) |

### 20.4 通用工具 (`util.ts`)

| 函数                                      | 功能                           |
| ----------------------------------------- | ------------------------------ |
| `withBase(base, path)`                    | 添加站点根路径前缀             |
| `upperFirst(str)`                         | 首字母大写                     |
| `addUnit(value?, unit?)`                  | 添加单位 (16 → "16px")         |
| `removeUnit(value?, unit?)`               | 移除单位 ("16px" → 16)         |
| `get(object, path, defaultValue?)`        | 对象路径取值 (支持点号分隔)    |
| `removeStorageItem(key, storage, vague?)` | 删除 Storage 项 (支持模糊匹配) |

### 20.5 TypeScript 工具类型 (`types.ts`)

| 类型                            | 功能               |
| ------------------------------- | ------------------ |
| `PartialKey<T, U>`              | 指定属性变为可选   |
| `RequiredKey<T, U>`             | 指定属性变为必选   |
| `RequiredKeyPartialOther<T, U>` | 指定必选，其他可选 |
| `ReadOnlyKey<T, U>`             | 指定属性变为只读   |
| `Recordable<T, K>`              | 对象类型           |
| `Nullable<T>`                   | 可空类型           |

---

## 21. 图标系统

### 21.1 架构

- **55+ SVG 图标** — 在 `packages/static/icons/` 下，每个是独立的 `.ts` 文件导出 SVG path
- **Icon 组件** (`TkIcon`) — 统一渲染组件，支持 3 种图标类型
- **社交图标字体** — iconfont 字体文件 (.ttf/.woff/.woff2)
- **Iconify 集成** — 通过 `@iconify/vue` 支持数万图标

### 21.2 TkIcon 组件

```vue
<TkIcon icon="github" />
<!-- 内置图标 -->
<TkIcon icon="mdi:github" iconType="iconify" />
<!-- Iconify -->
<TkIcon icon="/path/to/img.png" iconType="img" />
<!-- 图片 -->
```

Props：

- `icon` — 图标标识符
- `iconType` — `"svg"` / `"iconify"` / `"img"`
- `size` — 大小
- `color` — 颜色
- `hoverEffect` — hover 效果

### 21.3 内置图标清单

**通用**：arrow-left, arrow-right, d-arrow-left, d-arrow-right, close, circle-close-filled, copy, code, calendar, clock, house, user, github, external-link, fullscreen, top, caret-top, share, thumbs, more-filled, size, magic, rocket, empty, refresh-left, refresh-right, scale-to-original, zoom-in, zoom-out

**功能**：category, tag, collection-tag, friend-link, top-article, doc-analysis, notice, comment, folder-opened, reading, view, edit-pen, lock

**状态**：info-filled, success-filled, warning-filled, question-filled, circle-close-filled

**支付**：ali-pay, we-chat-pay

**页脚**：copyright, icp-record

**主题增强**：layout, full-screen-one, fullscreen-two, auto-width, overall-reduction, click, scale, water, align-left, align-text-left

**Banner/首页**：playground, theme

---

## 22. 组件库

### 22.1 通用组件 (base/common)

| 组件                   | 名称           | 功能                              |
| ---------------------- | -------------- | --------------------------------- |
| `TkAvatar`             | 头像           | 方形/圆形/旋转，支持状态图标      |
| `TkBreadcrumb`         | 面包屑         | 路径导航                          |
| `TkFocusTrap`          | 焦点陷阱       | 弹窗焦点管理                      |
| `TkIcon`               | 图标           | 统一图标渲染                      |
| `TkImageViewer`        | 图片查看器     | 全屏预览，缩放/拖拽/旋转          |
| `TkInputSlide`         | 滑块输入       | 数值滑块                          |
| `TkMessage`            | 消息提示       | 5 种类型，支持分组/偏移/关闭      |
| `TkPageCard`           | 分页卡片       | 卡片标题 + 分页                   |
| `TkPagination`         | 分页器         | 完整分页组件                      |
| `TkPopover`            | 弹出框         | 12 方向弹出定位                   |
| `TkSegmented`          | 分段控制器     | 分段选择                          |
| `TkTitleTag`           | 标题标签       | 文章标题旁标签                    |
| `TkTransitionCollapse` | 折叠过渡       | Vue Transition 封装               |
| `TkVerifyCode`         | 验证码         | 图形验证码生成                    |
| `TkVpContainer`        | VitePress 容器 | 渲染 info/tip/warning/danger 容器 |

### 22.2 主题组件 (theme)

**首页**：
| 组件 | 功能 |
|------|------|
| `TkHomeMain` | 首页主体 |
| `TkHomeBanner` | 首页横幅 |
| `TkHomePost` | 文章列表 |
| `TkHomeFeature` | 特性列表 |
| `TkHomeCardMy` | 博主信息卡片 |
| `TkHomeCardTopArticle` | 精选文章卡片 |
| `TkHomeCardCategory` | 分类卡片 |
| `TkHomeCardTag` | 标签卡片 |
| `TkHomeCardFriendLink` | 友情链接卡片 |
| `TkHomeCardDocAnalysis` | 站点信息卡片 |
| `TkHomeFullscreenWallpaper` | 全屏壁纸 |

**文章页**：
| 组件 | 功能 |
|------|------|
| `TkArticleBanner` | 文章页 Banner |
| `TkArticleAnalyze` | 文章信息展示 |
| `TkArticleTitle` | 文章标题 |
| `TkArticleInfo` | 文章元信息 |
| `TkArticleShare` | 文章分享 |
| `TkArticleUpdate` | 最近更新栏 |
| `TkArticleBreadcrumb` | 文章面包屑 |
| `TkArticleCodeBlock` | 代码块增强 |
| `TkArticleHeadingHighlight` | 标题高亮 |
| `TkArticleImagePreview` | 图片预览 |
| `TkArticlePageStyle` | 文章页风格 |
| `TkArticleAppreciation` | 赞赏功能 |

**评论**：
| 组件 | 功能 |
|------|------|
| `TkCommentTwikoo` | Twikoo 评论 |
| `TkCommentWaline` | Waline 评论 |
| `TkCommentGiscus` | Giscus 评论 |
| `TkCommentArtalk` | Artalk 评论 |

**页面**：
| 组件 | 功能 |
|------|------|
| `TkArchivesPage` | 归档页 |
| `TkCataloguePage` | 目录页 |
| `TkArticleOverviewPage` | 文章清单页 |
| `TkLoginPage` | 登录页 |
| `TkRiskLinkPage` | 风险链接页 |

**其他**：
| 组件 | 功能 |
|------|------|
| `TkLayout` | 主布局 |
| `TkConfigProvider` | 配置注入 HOC |
| `TkNotice` | 公告弹窗 |
| `TkRightBottomButton` | 右下角按钮组 |
| `TkSidebarTrigger` | 侧边栏触发器 |
| `TkThemeEnhance` | 主题增强面板 |
| `TkDemoCode` | 演示代码 |
| `TkFooterGroup` | 页脚链接组 |
| `TkFooterInfo` | 页脚信息 |
| `TkBodyBgImage` | Body 背景图 |
| `TkRouteLoading` | 路由加载动画 |

### 22.3 Message 组件 API

```ts
TkMessage.success("成功");
TkMessage.warning("警告");
TkMessage.info("信息");
TkMessage.error("错误");
TkMessage.primary("主要");
TkMessage({ message: "自定义", duration: 5000, showClose: true });
TkMessage.closeAll("error"); // 关闭所有 error 类型消息
```

---

## 23. 构建系统

### 23.1 技术栈

- **开发桩**: `unbuild --stub`
- **生产构建**: Rollup + esbuild + vite-plugin-dts
- **SCSS**: Sass `compile()` → PostCSS (nested + autoprefixer) → cssnano
- **类型**: vite-plugin-dts 生成 `.d.ts`

### 23.2 构建脚本

| 命令                 | 功能               |
| -------------------- | ------------------ |
| `pnpm stub`          | 为所有包创建开发桩 |
| `pnpm build`         | clean + 主构建     |
| `pnpm plugins:build` | 构建所有插件       |
| `pnpm docs:dev`      | 启动文档站点       |
| `pnpm publish`       | 发布 (bash 脚本)   |

### 23.3 构建产物

```
dist/vitepress-theme-teek/
├── es/            # ESM 格式
│   ├── index.mjs
│   ├── index.d.ts
│   ├── config/
│   └── icons.mjs
├── lib/           # CJS 格式
│   ├── index.js
│   └── index.d.ts
├── theme-chalk/   # 样式
│   └── src/       # 源码
├── package.json   # 发布版 package.json
└── index.css      # 主样式入口
```

### 23.4 包导出 (子路径)

```json
{
  ".": "./es/index.mjs",
  "./config": "./es/config/index.mjs",
  "./icons": "./es/icons.mjs",
  "./vp-plus/*.scss": "./theme-chalk/src/vp-plus/*.scss",
  "./tk-plus/*.scss": "./theme-chalk/src/tk-plus/*.scss"
}
```

---

## 24. Frontmatter 拓展

### 24.1 Teek 特有 Frontmatter

```yaml
---
# 文章基本
article: true           # 是否为文章
sticky: 1               # 置顶权重 (越小越前)
titleTag: "原创"        # 标题标签
describe: "摘要"        # 文章摘要 (优先于自动截取)

# 封面
coverImg: /img/cover.jpg

# 布局控制
layout: home            # 首页布局
layout: page            # 普通页面
layout: false           # 隐藏布局

# 功能页
archivesPage: true      # 归档页
categoriesPage: true    # 分类页
tagsPage: true          # 标签页
catalogue: true         # 目录页
articleOverviewPage: true # 文章清单页

# 目录页
path: /guide            # 目录页扫描路径
description: "指南"     # 目录页描述

# 私密
private: true           # 私密保护
privateRealm: "realm1"  # 领域
username: "admin"       # 用户名
password: "pass"        # 密码
loginInfo:              # 多用户
  - username: "user1"
    password: "pass1"

# Teek 配置覆盖 (tk 命名空间)
tk:
  banner:
    description: ["描述1", "描述2"]
    features: [...]
  description: "备选描述"
  bgColor: "#ff0000"

# 其他控制
comment: false          # 关闭评论
articleBanner: false    # 关闭文章 Banner
articleUpdate: false    # 关闭最近更新栏
---
```

### 24.2 自动生成的 Frontmatter

通过 `vitepress-plugin-auto-frontmatter` 自动添加：

- `permalink` — 永久链接
- `categories` — 分类 (从文件路径提取)
- `coverImg` — 随机封面图

---

## 25. 插槽系统

### 25.1 TkLayout 插槽

| 插槽名                                        | 位置           | 说明             |
| --------------------------------------------- | -------------- | ---------------- |
| `teek-home-before`                            | 首页前         | 首页 Banner 之前 |
| `teek-home-after`                             | 首页后         | 首页 Banner 之后 |
| `teek-home-features-before/after`             | 特性前后       | 文档风格首页     |
| `teek-footer-group-before/after`              | 页脚组前后     | 首页页脚         |
| `teek-footer-info`                            | 页脚信息       | 自定义页脚       |
| `teek-footer-info-before/after`               | 页脚信息前后   | 首页页脚         |
| `teek-article-banner-before/after`            | Banner 前后    | 文章页 Banner    |
| `teek-article-analyze-before/after`           | 文章信息前后   | 文章页           |
| `teek-article-bottom-tip-before/after`        | 底部提示前后   | 文章页           |
| `teek-doc-update-before/after`                | 更新栏前后     | 文章页           |
| `teek-doc-after-appreciation-before/after`    | 赞赏前后       | 文章页           |
| `teek-comment-before/after`                   | 评论区前后     | 文章页           |
| `teek-comment`                                | 自定义评论     | 渲染自定义组件   |
| `teek-aside-bottom-appreciation-before/after` | 侧边栏赞赏前后 | 文章页           |
| `teek-article-share-before/after`             | 分享前后       | 文章页           |
| `teek-page-top-before/after`                  | 功能页前后     | 功能页           |
| `teek-loading`                                | 加载动画       | 路由加载         |
| `teek-login-page`                             | 登录页         | 自定义登录页     |
| `teek-risk-link-page`                         | 风险链接页     | 自定义风险页     |
| `teek-sidebar-trigger`                        | 侧边栏触发器   | 自定义触发器     |
| `teek-back-top`                               | 回到顶部       | 右下角按钮       |
| `teek-to-comment`                             | 前往评论       | 右下角按钮       |
| `teek-right-bottom-before/after`              | 按钮组前后     | 右下角           |

### 25.2 ThemeEnhance 插槽

- `teek-theme-enhance-before/after` — 面板前后
- `teek-theme-enhance-layout-switch` — 自定义布局切换
- `teek-theme-enhance-theme-color` — 自定义主题色选择
- `teek-theme-enhance-spotlight` — 自定义聚光灯

### 25.3 插槽透传

布局中未使用的 VitePress 插槽全部透传：

```vue
<template v-for="name in Object.keys($slots).filter(name => !usedSlots.includes(name))" :key="name" #[name]="slotData">
  <slot :name="name" v-bind="slotData"></slot>
</template>
```

已占用的 VitePress 插槽（不透传）：

- `home-hero-before`, `home-features-after`, `nav-bar-content-after`
- `layout-top`, `layout-bottom`, `doc-footer-before`
- `doc-before`, `doc-after`, `aside-bottom`
- `page-top`, `aside-outline-before`, `sidebar-nav-before`

---

## 附录

### A. 版权信息

- 作者: teeker (2456019588@qq.com)
- 许可证: MIT
- 仓库: https://github.com/Kele-Bingtang/vitepress-theme-teek
- 文档: https://vp.teek.top
- 预览: https://notes.teek.top

### B. 浏览器兼容

```
> 1%, not ie 11, not op_mini all
```

### C. Node.js 要求

```
>= 18.x
```

---

> 本文档基于 vitepress-theme-teek v1.6.0，通过三次深度代码扫描生成，覆盖全部功能点。
