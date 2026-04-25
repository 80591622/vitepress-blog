# 快速开始

## 1. 安装依赖
```bash
pnpm install
```

## 2. 本地开发
```bash
pnpm dev
```
访问 `http://localhost:5173`

## 3. 构建项目
```bash
pnpm build
```

## 4. 部署到服务器
```bash
pnpm deploy
```

> **Windows 用户**: 如需使用 PowerShell 脚本，运行 `.\scripts\deploy.ps1`

> **详细部署说明**: 查看 [DEPLOY.md](./DEPLOY.md)

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动本地开发服务器 |
| `pnpm build` | 构建项目 |
| `pnpm preview` | 预览构建结果 |
| `pnpm clean` | 清理构建文件 |
| `pnpm deploy` | 构建并部署到服务器 |

## 项目结构
```
.
├── source/          # 文档源文件（Markdown）
├── scripts/         # 部署脚本
│   ├── deploy.js    # Node.js 通用脚本（推荐）
│   ├── deploy.sh    # Bash 脚本（Linux/macOS）
│   └── deploy.ps1   # PowerShell 脚本（Windows）
├── vite.config.ts   # Vite 配置
├── tsconfig.json    # TypeScript 配置
├── package.json     # 项目配置
└── DEPLOY.md        # 详细部署指南
```

## 环境要求
- Node.js 18+
- pnpm 9+
- SSH/tar (用于部署)

## 第一次部署前

1. **配置 SSH 密钥** (推荐):
   ```bash
   ssh-keygen -t rsa -b 4096
   ssh-copy-id -i ~/.ssh/id_rsa.pub root@121.40.92.55
   ```

2. **修改部署配置** (如需要):
   编辑 `scripts/deploy.js` 中的 `config` 对象

## 获取帮助
查看 [DEPLOY.md](./DEPLOY.md) 了解完整的部署指南和故障排除方法。
