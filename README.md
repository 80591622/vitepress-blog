<h1 align="center">vitepress-blog</h1>

<div align="center">

个人技术博客，基于 [VitePress](https://vitepress.dev/) 与 [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek) 构建。

</div>

**简体中文** | [English](./README.en.md)

## 项目结构

```
vitepress-blog/
├── source/              # 站点源码与 Markdown 文章
│   └── .vitepress/      # VitePress 配置与主题扩展
├── packages/            # 主题相关本地包
├── plugins/             # VitePress 插件（workspace）
├── scripts/             # 部署等脚本
└── dist/                # 构建产物（git 忽略）
```

## 开发

> 本项目仅支持使用 [pnpm](https://pnpm.io/) 安装依赖。

```bash
# 安装依赖（会自动初始化 husky）
pnpm install

# 构建 @teek/helper（VitePress 配置链会按包 exports 解析 helper 的 dist）
pnpm helper:build

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview

# TypeScript（根仓库 + `./plugins/*` 内各插件包分别检查）
pnpm typecheck

# 构建 workspace 插件
pnpm plugins:build
```

## 主题仓库说明

本仓库在 `packages/` 内维护 **vitepress-theme-teek** 的定制源码（pnpm workspace 名为 `vitepress-theme-teek`），可能与上游 [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek) 不同步；同步上游时请自行对比合并。

`source/.vitepress/teekConfig.ts` 直接相对路径导入 `packages/config` 与主题版本，`vite.config` 侧仍为 `vitepress-theme-teek` / `@teek/*` 提供别名解析；组件内 `@teek/theme-chalk/*.css` 由 Vite 插件映射到源码 `.scss`。

## packages 与 plugins 说明

`packages/` 与 `plugins/` 通过 pnpm workspace 与站点配置串联：**插件在构建期扫描、处理 Markdown 并注入站点数据；组件在运行期读取这些数据并渲染 UI**。二者没有独立预览站，改源码后执行 `pnpm dev` 即可在对应页面热更新查看效果。

### 接入关系（简图）

```
source/.vitepress/teekConfig.ts     # 站点级 Teek 配置（含 vitePlugins 开关）
        ↓ defineTeekConfig
packages/config                     # 注册 plugins、Markdown 插件、合并 VitePress 配置
        ↓ vite.plugins
plugins/*                           # 构建期 Vite 插件（扫描 MD、写 frontmatter、注入数据）
        ↓ 写入 siteData / themeConfig
packages/teek + packages/components # 主题入口与 Vue 组件（读取 posts、docAnalysis 等）
        ↓ extends
source/.vitepress/theme/            # 本仓库主题扩展（样式、TeekLayoutProvider 等）
```

关键文件：

| 文件                                                                     | 作用                                                        |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [`packages/config/vitePlugins.ts`](./packages/config/vitePlugins.ts)     | 统一注册 `plugins/` 下各 Vite 插件                          |
| [`source/.vitepress/teekConfig.ts`](./source/.vitepress/teekConfig.ts)   | 本博客的 Teek 配置与 `vitePlugins` 开关                     |
| [`source/.vitepress/teekVite.ts`](./source/.vitepress/teekVite.ts)       | `@teek/*`、`vitepress-theme-teek` 别名指向 `packages/` 源码 |
| [`packages/teek/index.ts`](./packages/teek/index.ts)                     | 主题入口，注册全局组件并 `extends` VitePress 默认主题       |
| [`packages/components/theme/Layout`](./packages/components/theme/Layout) | 主布局，按 frontmatter / 路由挂载各页面组件                 |

### packages/ 各子包

| 目录                                    | 作用                                                  | 在本项目中的使用位置                                                                 |
| --------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`teek`](./packages/teek)               | 主题 npm 入口（`vitepress-theme-teek`）               | `source/.vitepress/theme/index.ts` 通过 `extends: Teek` 引入；导出组件、工具、版本号 |
| [`config`](./packages/config)           | `defineTeekConfig`、类型定义、插件注册、Post 数据转换 | `teekConfig.ts` 调用；`vitePlugins.ts` 挂载 `plugins/*`                              |
| [`components`](./packages/components)   | Vue 组件（`common/` 通用 + `theme/` 主题）            | 由 `Layout`、各功能页、Markdown 容器等引用；见下表                                   |
| [`composables`](./packages/composables) | 组合式 API（命名空间、侧栏、国际化上下文等）          | 几乎所有 `components` 与主题逻辑                                                     |
| [`theme-chalk`](./packages/theme-chalk) | SCSS 样式与 CSS 变量                                  | `theme/index.ts` 与各组件 `style/`；`teekVite` 将 `*.css` 请求映射到 `.scss`         |
| [`locale`](./packages/locale)           | 中英文文案                                            | 组件内 `useLocale()`、主题配置项提示                                                 |
| [`helper`](./packages/helper)           | 工具函数（日期、类型判断、统计脚本等）                | 配置链、组件、插件；**需先 `pnpm helper:build` 生成 dist**                           |
| [`markdown`](./packages/markdown)       | 自定义 Markdown-it 插件（卡片、演示块、容器等）       | `packages/config/index.ts` 注册到 `markdown` 配置                                    |
| [`static`](./packages/static)           | 图标、字体等静态资源                                  | `Icon` 组件、社交图标、`DemoCode` 等                                                 |

#### components 常用组件与页面入口

**通用组件（`components/common/`）** — 被主题组件或 Markdown 复用：

| 组件                                | 典型用途               |
| ----------------------------------- | ---------------------- |
| `ArticlePage`                       | 带侧栏大纲的文章页容器 |
| `Pagination`                        | 列表分页               |
| `Icon` / `TitleTag`                 | 图标与标题角标         |
| `ImageViewer`                       | 图片预览               |
| `Message` / `Popover` / `FocusTrap` | 交互与无障碍           |

**主题组件（`components/theme/`）** — 与博客功能绑定：

| 组件 / 页面                                            | 触发方式或出现位置                                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `Layout`                                               | 全站根布局，包裹 VitePress `Layout`                                                                     |
| `Home` 及 `Home*Card`                                  | 首页博客卡片（`teekHome: true` 时，`source/index.md` 为 VitePress 落地页，博客首页在 `/workspace/...`） |
| `ArchivesPage`                                         | `source/routes/archives.md`（`archivesPage: true`）→ `/archives`                                        |
| `ArticleOverviewPage`                                  | `source/routes/articleOverview.md` → `/articleOverview`                                                 |
| `CataloguePage`                                        | frontmatter 含 `catalogue` / 目录页配置的文章                                                           |
| `RiskLinkPage`                                         | `source/routes/risk-link.md`（`riskLinkPage: true`）；外链风险提示                                      |
| `ArticleTitle` / `ArticleBanner` / `ArticleAnalyze` 等 | 文章详情页（`Layout` 的 `doc-*` 插槽）                                                                  |
| `ThemeEnhance` / `RightBottomButton`                   | 主题增强、返回顶部、评论入口等全站功能                                                                  |
| `Comment*`                                             | `teekConfig.comment` 配置的评论系统                                                                     |

**本仓库站点扩展**（`source/.vitepress/theme/`）在 Teek 布局插槽中额外挂载：

| 文件                     | 插槽                        | 作用                    |
| ------------------------ | --------------------------- | ----------------------- |
| `TeekLayoutProvider.vue` | 包裹 `Teek.Layout`          | 站点级布局扩展入口      |
| `CategoriesTagsPage.vue` | `teek-home-features-before` | 分类/标签聚合展示       |
| `ContributeChart.vue`    | `teek-archives-top-before`  | 归档页贡献图（ECharts） |
| `404.vue`                | `not-found`                 | 自定义 404              |

预览组件：执行 `pnpm dev`，打开用到该组件的页面；也可在 `source/routes/` 新建沙盒 Markdown 页引入 `@teek/components/*` 单独调试。

### plugins/ 各插件

插件均在 [`packages/config/vitePlugins.ts`](./packages/config/vitePlugins.ts) 注册，由 [`defineTeekConfig`](./packages/config/index.ts) 注入 Vite。分为两类：

- **可开关**（`teekConfig.vitePlugins` 配置）：`autoFrontmatter`、`sidebar`、`permalink`、`mdH1`、`docAnalysis`
- **主题强绑定**（默认始终启用）：`catalogue`、`file-content-loader`

| 插件                                                                                     | 作用                                                      | 数据 / 效果去向                                                                   | 本项目配置                                                                                             |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`vitepress-plugin-auto-frontmatter`](./plugins/vitepress-plugin-auto-frontmatter)       | 扫描 MD，自动补全或写回 frontmatter（分类、permalink 等） | 直接修改文章 `.md` 的 YAML                                                        | **开启**；`teekConfig.vitePlugins.autoFrontmatter`，含自定义 `transform`                               |
| [`vitepress-plugin-sidebar-resolve`](./plugins/vitepress-plugin-sidebar-resolve)         | 按目录结构自动生成侧栏                                    | 覆盖 `themeConfig.sidebar`                                                        | **关闭**；使用 [`source/.vitepress/config/sidebar.ts`](./source/.vitepress/config/sidebar.ts) 手写侧栏 |
| [`vitepress-plugin-permalink`](./plugins/vitepress-plugin-permalink)                     | 生成永久链接与路由重写                                    | `permalink`、`rewrites`、404 处理                                                 | **关闭**；文章 URL 跟随文件路径                                                                        |
| [`vitepress-plugin-md-h1`](./plugins/vitepress-plugin-md-h1)                             | 为无一级标题的文章注入页面 H1                             | 文章页顶部标题                                                                    | **默认开启**                                                                                           |
| [`vitepress-plugin-doc-analysis`](./plugins/vitepress-plugin-doc-analysis)               | 统计字数、阅读时间等                                      | `theme.docAnalysisInfo` → `ArticleAnalyze`、`HomeDocAnalysisCard`、文章清单字数列 | **默认开启**                                                                                           |
| [`vitepress-plugin-catalogue`](./plugins/vitepress-plugin-catalogue)                     | 扫描目录页结构                                            | 目录页数据 → `CataloguePage`                                                      | **始终启用**                                                                                           |
| [`vitepress-plugin-file-content-loader`](./plugins/vitepress-plugin-file-content-loader) | 扫描文章，生成 Post 列表（标题、摘要、分类、标签等）      | `themeConfig.posts` → 首页列表、分类/标签页、归档、搜索                           | **始终启用**                                                                                           |

修改插件逻辑：编辑 `plugins/<插件名>/` 后执行 `pnpm plugins:build`（或使用各插件的 `stub` 开发模式），再 `pnpm dev` 验证。

## pnpm Catalog

[`pnpm-workspace.yaml`](./pnpm-workspace.yaml) 中的 `catalog` / `catalogs` 用于在 monorepo 内**统一依赖版本**。实际安装的 VitePress 插件等使用 `workspace:*` 指向 **`plugins/` 内源码包**；catalog 中的 SemVer 可视作与上游 npm 版本对齐的参考，**不表示**根项目会从 registry 拉取该版本。

## 代码规范

项目已接入与 `vitepress-theme-teek` 一致的前端工程规范：
| 工具 | 说明 |
| --- | --- |
| ESLint | 代码质量检查（Vue / TypeScript / JavaScript） |
| Prettier | 代码格式化 |
| Husky | Git 钩子 |
| lint-staged | 仅对暂存文件执行 lint |
| commitlint + cz-git | 规范化提交信息 |

```bash
# 全量检查并自动修复
pnpm lint

# 仅 ESLint
pnpm lint:eslint

# 仅 Prettier
pnpm lint:prettier

# 交互式规范化提交（推荐）
pnpm cz
```

提交代码时，`pre-commit` 会自动对暂存文件执行 ESLint / Prettier，`commit-msg` 会校验提交信息是否符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交信息规范

提交信息格式为：

```
<type>(<scope>): <subject>
```

- `type`：必填，提交类型
- `scope`：可选，影响范围
- `subject`：必填，简短精炼的描述

允许的 `type` 类型：

| type       | emoji | 说明                                 |
| ---------- | ----- | ------------------------------------ |
| `feat`     | 🚀    | 新增功能                             |
| `fix`      | 🐞    | 修复缺陷                             |
| `docs`     | 📚    | 文档更新                             |
| `style`    | 🎨    | 代码格式（不影响代码逻辑）           |
| `refactor` | ♻️    | 代码重构（既非修复缺陷也非新增功能） |
| `perf`     | ⚡️    | 性能优化                             |
| `test`     | ✅    | 测试相关（新增/修改测试）            |
| `build`    | 📦️    | 构建相关（构建系统或外部依赖变更）   |
| `ci`       | 🎡    | 持续集成（CI 配置和脚本变更）        |
| `revert`   | ⏪️    | 回退代码                             |
| `chore`    | 🔨    | 其他修改（不涉及 src 或 test 文件）  |

示例：

```bash
git commit -m "feat: 添加文章搜索功能"
git commit -m "fix: 修复移动端侧边栏显示异常"
git commit -m "docs: 更新部署文档"
```

> 项目已配置 [cz-git](https://cz-git.qbb.sh/) 交互式提交，运行 `pnpm cz` 可逐步选择提交类型、范围、描述等，自动生成符合规范的提交信息。提交信息中包含 `init` 时会跳过 commitlint 校验。

## 部署

项目使用统一的部署脚本，支持 Mac 和 Windows 双平台。

### 部署配置

编辑 `scripts/deploy.config.json` 修改服务器配置：

```json
{
  "distDir": "dist",
  "archiveName": "dist.tar.gz",
  "serverUser": "root",
  "serverIP": "your-server-ip",
  "serverDir": "/home/www/your-site"
}
```

### 部署命令

```bash
# 推荐：使用 pnpm 命令
pnpm deploy

# 或直接运行脚本
pnpm exec tsx scripts/deploy.ts
```

### 部署流程

1. 检查 SSH 连接
2. 清理旧构建文件
3. 构建项目
4. 压缩 `dist` 目录
5. 上传到服务器
6. 远程解压并部署
7. 清理本地压缩包

### 前置要求

- 已配置服务器 SSH 免密登录
- 本地安装 Node.js（>= 18.12）和 pnpm
- 系统自带 `tar`、`ssh`、`scp` 命令（Windows 10/11 已内置）
