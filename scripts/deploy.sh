#!/usr/bin/env bash

# 部署脚本 - Linux/macOS
# 使用方法: bash scripts/deploy.sh

set -euo pipefail

# 配置
readonly PROJECT_NAME="vitepress-blog"
readonly DIST_DIR="dist"
readonly ARCHIVE_NAME="dist.tar.gz"
readonly SERVER_USER="root"
readonly SERVER_IP="121.40.92.55"
readonly SERVER_DIR="/home/www/www.wkdev.cn"

# 日志函数
log_info() { echo "ℹ️  $1"; }
log_success() { echo "✅ $1"; }
log_error() { echo "❌ $1"; }
log_process() { echo "🚀 $1"; }
log_package() { echo "📦 $1"; }
log_upload() { echo "📤 $1"; }
log_remote() { echo "🖥  $1"; }
log_done() { echo "🎉 $1"; }

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 检查工具
check_tools() {
    log_info "检查必要工具..."
    
    if ! command_exists tar; then
        log_error "tar 命令不可用"
        exit 1
    fi
    
    if ! command_exists ssh; then
        log_error "ssh 命令不可用"
        exit 1
    fi
    
    if ! command_exists scp; then
        log_error "scp 命令不可用"
        exit 1
    fi
    
    log_success "工具检查完成"
}

# 检查 SSH 连接
check_ssh_connection() {
    log_info "检查 SSH 连接..."
    if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 "${SERVER_USER}@${SERVER_IP}" 'echo SSH connection successful' >/dev/null 2>&1; then
        log_success "SSH 连接正常"
    else
        log_error "无法连接到服务器 ${SERVER_USER}@${SERVER_IP}"
        log_info "请确保已配置 SSH 密钥或可以输入密码"
        exit 1
    fi
}

# 主函数
main() {
    echo ""
    echo "🖥  Linux/macOS 部署脚本"
    echo ""
    
    # 检查工具
    check_tools
    echo ""
    
    # 清理和构建
    log_process "清理旧构建文件..."
    pnpm clean || { log_error "清理失败"; exit 1; }
    log_success "清理完成"
    
    log_process "构建项目..."
    pnpm build || { log_error "构建失败"; exit 1; }
    log_success "构建完成"
    echo ""
    
    # 压缩
    log_package "压缩 dist 目录..."
    tar -zcf "$ARCHIVE_NAME" "$DIST_DIR" || { log_error "压缩失败"; exit 1; }
    log_success "压缩完成"
    echo ""
    
    # 检查 SSH 连接
    check_ssh_connection
    echo ""
    
    # 上传
    log_upload "上传到服务器 ${SERVER_USER}@${SERVER_IP}..."
    scp -C -o StrictHostKeyChecking=no "$ARCHIVE_NAME" "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}" || { log_error "上传失败"; exit 1; }
    log_success "上传完成"
    echo ""
    
    # 远程部署
    log_remote "执行远程部署..."
    ssh -C -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" << EOF
set -e
cd ${SERVER_DIR}
rm -rf dist
tar -zxf ${ARCHIVE_NAME}
rm -f ${ARCHIVE_NAME}
echo "✅ 远程解压完成"
EOF
    log_success "远程部署完成"
    echo ""
    
    # 清理本地压缩包
    if [ -f "$ARCHIVE_NAME" ]; then
        rm -f "$ARCHIVE_NAME" && log_success "删除本地 $ARCHIVE_NAME"
    fi
    
    log_done "部署完全成功！"
    echo ""
}

# 执行
main "$@"
