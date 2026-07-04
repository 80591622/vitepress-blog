# Theme Map

`.vitepress/theme/` 负责“站点级主题扩展”，不放内容规则。

- `index.ts`：主题入口，只做主题接线
- `layouts/`：布局入口与插槽编排
- `styles/`：站点级样式入口
- `features/`：独立特性，如粒子拖尾
- `components/pages/`：页面型组件，如 404
- `components/widgets/`：布局内拼装的小部件
- `utils/`：主题侧小工具
- `api/`：主题侧运行时暴露

常见改动入口：

- 改全站布局插槽：`layouts/`
- 改站点级视觉样式：`styles/`
- 改某个局部功能卡片：`components/widgets/`
- 改独立动画或交互特性：`features/`

约定：

- 能放 `features/` 的，不塞进 `layouts/`
- 能放 `widgets/` 的，不直接写进布局文件
- `index.ts` 保持轻量，只保留主题入口、样式入口、布局入口三类接线
