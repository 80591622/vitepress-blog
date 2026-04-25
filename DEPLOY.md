# 部署指南

本项目支持跨平台部署，包括 Windows、macOS 和 Linux。

## 前置要求

### 通用要求
- Node.js 16+ 和 pnpm 9+
- SSH 客户端（用于连接服务器）
- tar 工具（用于压缩）

### Windows 用户需要安装以下之一

#### 方案 1: Git Bash (推荐简单)
```bash
# 下载并安装
https://git-scm.com/download/win

# Git Bash 内置了 SSH 和 tar 工具
```

#### 方案 2: WSL2 (推荐功能完整)
```bash
# Windows 11/10 上安装 WSL2
wsl --install

# 在 WSL2 中使用部署脚本
wsl bash scripts/deploy.sh
```

#### 方案 3: 原生 Windows PowerShell
```powershell
# 需要事先安装 SSH 和 tar，或使用已包含的 PowerShell 脚本
.\scripts\deploy.ps1
```

## 安装项目依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

## 部署方式

### 1️⃣ 推荐: 使用 Node.js 部署脚本 (跨平台)

```bash
# 所有平台统一命令
pnpm deploy

# 或直接运行
node scripts/deploy.js
```

**优点:**
- ✅ 跨平台支持 (Windows/Mac/Linux)
- ✅ 自动检测工具和 SSH 连接
- ✅ 完整的错误处理
- ✅ 支持有密码的 SSH

### 2️⃣ Linux/macOS: 使用 Bash 脚本

```bash
chmod +x scripts/deploy.sh
bash scripts/deploy.sh
```

### 3️⃣ Windows PowerShell: 使用 PS1 脚本

```powershell
# 允许运行未签名脚本 (一次性)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 运行部署脚本
.\scripts\deploy.ps1
```

## 配置部署参数

编辑部署脚本中的配置部分:

### Node.js 脚本 (`scripts/deploy.js`)
```javascript
const config = {
  distDir: 'dist',
  archiveName: 'dist.tar.gz',
  serverUser: 'root',
  serverIP: '121.40.92.55',
  serverDir: '/home/www/www.wkdev.cn',
};
```

### PowerShell 脚本 (`scripts/deploy.ps1`)
```powershell
$config = @{
    distDir = "dist"
    archiveName = "dist.tar.gz"
    serverUser = "root"
    serverIP = "121.40.92.55"
    serverDir = "/home/www/www.wkdev.cn"
}
```

## SSH 密钥配置 (推荐无密码部署)

### 1. 生成 SSH 密钥
```bash
# 如果已有 SSH 密钥可跳过
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
```

### 2. 将公钥复制到服务器
```bash
# macOS/Linux
ssh-copy-id -i ~/.ssh/id_rsa.pub root@121.40.92.55

# Windows (Git Bash)
# 手动方式: 将 ~/.ssh/id_rsa.pub 的内容添加到服务器 ~/.ssh/authorized_keys
```

### 3. 配置 SSH 免密登录 (可选)
编辑 `~/.ssh/config`:
```
Host deploy-server
    HostName 121.40.92.55
    User root
    IdentityFile ~/.ssh/id_rsa
    StrictHostKeyChecking no
```

## 开发流程

```bash
# 1. 安装依赖
pnpm install

# 2. 本地开发
pnpm dev

# 3. 构建和部署
pnpm deploy

# 4. 预览生成的文件
pnpm preview
```

## 故障排除

### 问题: 找不到 tar 命令 (Windows)
**解决:**
- 确保已安装 Git Bash 或 WSL2
- 或使用 PowerShell 脚本: `.\scripts\deploy.ps1`

### 问题: SSH 连接超时
**解决:**
- 检查服务器 IP 和用户名是否正确
- 确保服务器防火墙允许 SSH 连接 (端口 22)
- 检查 SSH 密钥是否配置正确

### 问题: 权限被拒绝 (Permission denied)
**解决:**
```bash
# Linux/macOS
chmod +x scripts/deploy.sh

# Windows PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 问题: 上传失败
**解决:**
- 检查磁盘空间: `ssh root@121.40.92.55 'df -h'`
- 检查远程目录是否存在: `ssh root@121.40.92.55 'ls /home/www/www.wkdev.cn'`
- 尝试手动上传测试: `scp test.txt root@121.40.92.55:/tmp/`

## 相关命令

```bash
# 清理构建文件
pnpm clean

# 构建项目
pnpm build

# 本地预览
pnpm preview

# 部署
pnpm deploy
```

## 自动化部署建议

### GitHub Actions 部署
创建 `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm deploy
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
```

## 常见问题

**Q: 部署中断，如何恢复?**
A: 脚本是幂等的，可以重新运行相同命令。

**Q: 如何部署到不同的服务器?**
A: 编辑脚本中的 `config` 部分，更改 `serverIP` 和 `serverDir`。

**Q: 支持部分文件部署吗?**
A: 当前脚本部署整个 `dist` 目录。需要自定义请修改脚本逻辑。

## 许可证

MIT
