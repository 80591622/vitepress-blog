# Config Map

`.vitepress/config/` 现在按“博客工程职责”拆分：

- `index.ts`：VitePress 总装配入口
- `site.ts`：Teek 配置组装入口
- `theme.ts`：主题体验与交互规则
- `content.ts`：内容规则与自动 frontmatter 策略
- `presentation.ts`：导航、侧边栏、搜索、页脚等展示配置
- `ecosystem.ts`：生态页 rewrites/nav/sidebar 自动生成
- `vite.ts`：本地 workspace alias 与 SSR 接线
- `themeFlags.ts`：首页布局开关，需和最终 `themeConfig` 保持一致
- `sidebar/`：侧边栏分片

常见改动入口：

- 改首页/主题交互：`theme.ts`
- 改分类/标签/文章卡片规则：`content.ts`
- 改导航/搜索/社交链接/页脚：`presentation.ts` 及其引用文件
- 改生态目录生成：`ecosystem.ts`
- 改本地包解析：`vite.ts`

约定：

- 优先在已有职责文件中修改，不新增“杂项配置文件”
- 需要生成内容结构时，优先走内容驱动，而不是手改多处配置
- `themeFlags.ts` 同时影响 `teekConfig` 与最终 `themeConfig`，改这里时要保持语义一致
