# vitepress-blog

个人技术博客，基于 VitePress 构建。

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 部署

项目使用统一的部署脚本，支持 Mac 和 Windows 双平台。

### 部署配置

编辑 `scripts/deploy.config.json` 修改服务器配置：

```json
{
  "distDir": "dist",
  "archiveName": "dist.tar.gz",
  "serverUser": "root",
  "serverIP": "121.40.92.55",
  "serverDir": "/home/www/www.wkdev.cn"
}
```

### 部署命令

```bash
# 方式 1：使用 pnpm 命令（推荐）
pnpm deploy

# 方式 2：直接运行脚本
node scripts/deploy.js
```

### 部署流程

1. 清理旧构建文件
2. 构建项目
3. 检查 SSH 连接
4. 压缩 dist 目录
5. 上传到服务器
6. 远程解压并部署
7. 清理本地压缩包

### 前置要求

- 已配置服务器 SSH 免密登录
- 本地安装 Node.js 和 pnpm
- 系统自带 tar、ssh、scp 命令（Windows 10/11 已内置）
