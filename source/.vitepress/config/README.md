# Config Map

`.vitepress/config/` 现在按“博客工程职责”拆分：

- `index.ts`：VitePress 总装配入口
- `site.ts`：Teek 配置组装入口
- `siteInfo.ts`：站点基础资料与可复用展示数据
- `theme.ts`：主题体验与交互规则
- `content.ts`：内容规则与自动 frontmatter 策略
- `presentation.ts`：导航、侧边栏、搜索、页脚等展示配置
- `resources.ts`：资源库页 rewrites/nav/sidebar 自动生成
- `vite.ts`：本地 workspace alias 与 SSR 接线
- `themeFlags.ts`：首页布局共享开关，通过 `withThemeLayoutFlags()` 注入到 Teek 配置和最终 `themeConfig`
- `sidebar/`：侧边栏分片

常见改动入口：

- 改首页/主题交互：`theme.ts`
- 改站点标题/描述/logo/GitHub/页脚资料：`siteInfo.ts`
- 改分类/标签/文章卡片规则：`content.ts`
- 改导航/搜索/社交链接/页脚：`presentation.ts` 及其引用文件
- 改资源库目录生成：`resources.ts`
- 改本地包解析：`vite.ts`

约定：

- 优先在已有职责文件中修改，不新增“杂项配置文件”
- 需要生成内容结构时，优先走内容驱动，而不是手改多处配置
- `source/.vitepress/config.ts` 是 VitePress 实际入口，`config/index.ts` 是整理后的装配模块
- 首页布局开关统一通过 `withThemeLayoutFlags()` 注入，避免两处手动 spread 漏改
- `siteInfo.ts` 负责“资料与衍生数据”，`presentation.ts` 负责“themeConfig 装配”，尽量不要把两类逻辑混写
- `content.ts` 内优先复用已有路径常量、文案常量和 frontmatter 辅助函数，避免在配置对象里直接堆长逻辑
- `search.ts` 内优先把搜索文案和索引过滤规则抽成独立常量 / 函数，保持 `_render` 简短
- `sidebar/workspace.ts` 负责组织 section 顺序，`sidebar/sections/*.ts` 只维护各自内容，避免在入口文件里反复手写 spread
