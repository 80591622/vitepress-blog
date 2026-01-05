#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="vitepress-blog"
DIST_DIR="dist"

SERVER_USER="root"
SERVER_IP="121.40.92.55"
SERVER_DIR="/home/www/www.wkdev.cn"

ARCHIVE_NAME="dist.tar.gz"

echo "🚀 构建项目..."
yarn clean
yarn build

echo "📦 压缩 dist..."
tar -zcf $ARCHIVE_NAME $DIST_DIR

echo "📤 上传服务器..."
scp -C -o StrictHostKeyChecking=no $ARCHIVE_NAME ${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}

echo "🖥 执行远程部署..."
ssh -C -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} << EOF
set -e

cd ${SERVER_DIR}

rm -rf dist
tar -zxf ${ARCHIVE_NAME}
rm -f ${ARCHIVE_NAME}

echo "✅ 部署完成"
EOF

echo "🎉 Done!"
