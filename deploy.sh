#!/usr/bin/env bash

set -e

# ====== 基本配置 ======
PROJECT_NAME="vitepress-blog"
DIST_DIR="dist"

SERVER_USER="root"
SERVER_IP="121.40.92.55"
SERVER_DIR="/home/www/www.wkdevhub.cn"

ARCHIVE_NAME="dist.tar.gz"

echo "🚀 开始构建项目..."

# 1. 清理 & 构建
yarn clean
yarn build

# 2. 打包 dist（只打包 dist，本地相对路径）
echo "📦 打包 dist..."
tar -zcf $ARCHIVE_NAME $DIST_DIR

# 3. 上传到服务器
echo "📤 上传到服务器..."
scp $ARCHIVE_NAME ${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}

# 4. 远程部署
echo "🖥 服务器部署中..."
ssh ${SERVER_USER}@${SERVER_IP} << EOF

set -e
cd ${SERVER_DIR}

echo "🧹 清理旧 dist..."
rm -rf dist

echo "📂 解压新 dist..."
tar -zxf ${ARCHIVE_NAME}

echo "🗑 清理压缩包..."
rm -f ${ARCHIVE_NAME}

echo "✅ 部署完成"

EOF

echo "🎉 全部完成！"
