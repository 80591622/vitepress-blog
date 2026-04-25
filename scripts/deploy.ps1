# Windows PowerShell 部署脚本
# 使用方法: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"

# 配置
$config = @{
    distDir = "dist"
    archiveName = "dist.tar.gz"
    serverUser = "root"
    serverIP = "121.40.92.55"
    serverDir = "/home/www/www.wkdev.cn"
}

# 日志函数
function Write-Info ($msg) { Write-Host "ℹ️  $msg" -ForegroundColor Cyan }
function Write-Success ($msg) { Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Error_ ($msg) { Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Process ($msg) { Write-Host "🚀 $msg" -ForegroundColor Yellow }
function Write-Package ($msg) { Write-Host "📦 $msg" -ForegroundColor Magenta }
function Write-Upload ($msg) { Write-Host "📤 $msg" -ForegroundColor Blue }
function Write-Remote ($msg) { Write-Host "🖥  $msg" -ForegroundColor Cyan }
function Write-Done ($msg) { Write-Host "🎉 $msg" -ForegroundColor Green }

# 执行命令
function Invoke-Command_ ($command, $description) {
    try {
        Write-Process $description
        Invoke-Expression $command
        Write-Success "$description 完成"
    } catch {
        Write-Error_ "$description 失败: $_"
        exit 1
    }
}

# 检查 tar 命令
function Test-TarCommand {
    try {
        $null = Invoke-Expression "tar --version" -ErrorAction SilentlyContinue
        return $true
    } catch {
        return $false
    }
}

# 检查 SSH 命令
function Test-SSHCommand {
    try {
        $null = Invoke-Expression "ssh -h" -ErrorAction SilentlyContinue
        return $true
    } catch {
        return $false
    }
}

# 检查工具
function Test-Tools {
    Write-Info "检查必要工具..."
    
    if (-not (Test-TarCommand)) {
        Write-Error_ "tar 命令不可用"
        Write-Info "请安装以下之一:"
        Write-Info "1. Git Bash: https://git-scm.com/"
        Write-Info "2. WSL2: https://docs.microsoft.com/zh-cn/windows/wsl/install"
        exit 1
    }
    
    if (-not (Test-SSHCommand)) {
        Write-Error_ "SSH 工具不可用"
        Write-Info "请安装 Git Bash 或 WSL2"
        exit 1
    }
    
    Write-Success "工具检查完成"
}

# 检查 SSH 连接
function Test-SSHConnection {
    Write-Info "检查 SSH 连接..."
    try {
        $null = Invoke-Expression "ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 $($config.serverUser)@$($config.serverIP) 'echo SSH connection successful'" -ErrorAction SilentlyContinue
        Write-Success "SSH 连接正常"
    } catch {
        Write-Error_ "无法连接到服务器 $($config.serverUser)@$($config.serverIP)"
        Write-Info "请确保已配置 SSH 密钥或可以输入密码"
        exit 1
    }
}

# 主函数
function Deploy {
    Write-Host ""
    Write-Host "🖥  Windows 部署脚本" -ForegroundColor Cyan
    Write-Host ""
    
    # 检查工具
    Test-Tools
    Write-Host ""
    
    # 清理和构建
    Invoke-Command_ "pnpm clean" "清理旧构建文件"
    Invoke-Command_ "pnpm build" "构建项目"
    Write-Host ""
    
    # 压缩
    Write-Package "压缩 dist 目录..."
    try {
        Invoke-Expression "tar -zcf $($config.archiveName) $($config.distDir)"
        Write-Success "压缩完成"
    } catch {
        Write-Error_ "压缩失败: $_"
        exit 1
    }
    Write-Host ""
    
    # 检查 SSH 连接
    Test-SSHConnection
    Write-Host ""
    
    # 上传
    Write-Upload "上传到服务器 $($config.serverUser)@$($config.serverIP)..."
    try {
        Invoke-Expression "scp -C -o StrictHostKeyChecking=no $($config.archiveName) $($config.serverUser)@$($config.serverIP):$($config.serverDir)"
        Write-Success "上传完成"
    } catch {
        Write-Error_ "上传失败: $_"
        exit 1
    }
    Write-Host ""
    
    # 远程部署
    Write-Remote "执行远程部署..."
    $remoteCommands = @"
set -e
cd $($config.serverDir)
rm -rf dist
tar -zxf $($config.archiveName)
rm -f $($config.archiveName)
echo "✅ 远程解压完成"
"@
    
    try {
        Invoke-Expression "ssh -C -o StrictHostKeyChecking=no $($config.serverUser)@$($config.serverIP) `"$remoteCommands`""
        Write-Success "远程部署完成"
    } catch {
        Write-Error_ "远程部署失败: $_"
        exit 1
    }
    Write-Host ""
    
    # 清理本地压缩包
    if (Test-Path $config.archiveName) {
        try {
            Remove-Item $config.archiveName -Force
            Write-Success "删除本地 $($config.archiveName)"
        } catch {
            Write-Info "保留本地 $($config.archiveName)"
        }
    }
    
    Write-Done "部署完全成功！"
    Write-Host ""
}

# 执行部署
Deploy
