#!/usr/bin/env bash

# 开启错误处理
set -e

# 清除删除旧打包目录
yarn clean || { echo "清除旧打包目录失败"; exit 1; }

# 打包
yarn build || { echo "打包失败"; exit 1; }

# 定义打包命令
if [[ $(uname) == "Darwin" ]]; then
    # 如果是 macOS 环境，执行该命令
    tar -zcvf dist.tar.gz  /Users/wangke/Desktop/vitepress-blog/dist || { echo "打包失败"; exit 1; }
else
    # 如果是其他操作系统（例如 Windows），执行该命令
    tar -zcvf dist.tar.gz "C:/Users/v-wangke3/Desktop/vitepress-blog/dist" || { echo "打包失败"; exit 1; }
fi

# 上传到服务器（需要输入密码，如果已经进行过私钥配置，则不用），其中/www/wwwroot/www.wkdevhub.cn 为上传文件所在目录
scp  -r dist.tar.gz root@129.204.108.97:/www/wwwroot/www.wkdevhub.cn || { echo "上传失败"; exit 1; }

# 登录到服务器（需要输入密码，如果已经进行过私钥配置，则不用）
# 服务器环境开启
ssh root@129.204.108.97 << SSH_COMMANDS

# 进入目标目录
cd /www/wwwroot/www.wkdevhub.cn || { echo "进入目标目录失败"; exit 1; }

# 解压
tar -zxvf dist.tar.gz --strip-components=5 -C dist || { echo "解压失败"; exit 1; }

# 移除线上压缩文件
rm -rf dist.tar.gz || { echo "删除线上压缩文件失败"; exit 1; }

SSH_COMMANDS