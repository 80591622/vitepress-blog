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

## CI/CD（GitHub Actions）

推送或合并到 `master` 时，会自动执行 **CI**（代码检查与构建）；在仓库配置了部署密钥后，还会执行 **CD**（构建并 SSH 部署到服务器）。

| Workflow | 触发时机 | 说明 |
| --- | --- | --- |
| [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | `push` / `pull_request` → `master` | ESLint、Typecheck、`pnpm build` |
| [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) | `push` → `master` 或手动 `workflow_dispatch` | 构建后上传 `dist.tar.gz` 并在服务器解压部署 |

### 配置 GitHub Secrets

在仓库 **Settings → Secrets and variables → Actions** 中新增：

| Secret | 说明 | 示例 |
| --- | --- | --- |
| `DEPLOY_SSH_KEY` | 部署用私钥（完整 PEM，含首尾行） | `-----BEGIN OPENSSH PRIVATE KEY-----` … |
| `DEPLOY_HOST` | 服务器 IP 或域名 | `121.40.92.55` |
| `DEPLOY_USER` | SSH 用户名 | `root` |
| `DEPLOY_DIR` | 站点根目录（与 `deploy.config.json` 的 `serverDir` 一致） | `/home/www/www.wkdev.cn` |
| `DEPLOY_PORT` | SSH 端口（可选，默认 22） | `22` |

未配置 `DEPLOY_SSH_KEY` 时，Deploy 工作流会自动跳过，仅 CI 仍会运行。

### 本地模拟 CI

```bash
pnpm install
pnpm exec eslint . --max-warnings 0
pnpm run typecheck
pnpm run build
```
