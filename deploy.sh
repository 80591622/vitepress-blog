#!/usr/bin/env sh

# 压缩文件，其中 dist为要上传的文件所在目录
tar -zcvf dist.tar.gz  /Users/wangke/Desktop/vitepress-blog/source/.vitepress/dist

# 上传到服务器（需要输入密码，如果已经进行过私钥配置，则不用），其中/home/wwwapp/www.wkdevhub.cn 为上传文件所在目录
scp  -r dist.tar.gz root@101.42.135.167:/home/wwwapp/www.wkdevhub.cn

# 登录到服务器（需要输入密码，如果已经进行过私钥配置，则不用）
# 服务器环境开启
ssh root@101.42.135.167 << EOF

# 进入目标目录
cd /home/wwwapp/www.wkdevhub.cn/dist

# 解压
sudo tar -zxvf dist.tar.gz --strip-components 6


# 移除线上压缩文件
sudo rm -rf dist.tar.gz