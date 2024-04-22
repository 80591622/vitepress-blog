---
abbrlink: d279204f
title: 云服务器配置
date: 2019-09-15
categories: 
- Server
---

<strong class='old-blog'>云服务器配置</strong>

[[toc]]

### 装机

[LNMP文档](https://lnmp.org/faq/lnmp-vhost-add-howto.html)

### 添加、删除虚拟主机使用教程

```nginx
# 添加
# 如果输入有错误需要删除时，可以按住Ctrl再按Backspace键进行删除。
lnmp vhost add

**注意事项：** 当添加域名虚拟机的时候，一定要先去阿里云等平台，把当前的域名解析出来，如果要指定端口号的情况下也要去阿里云上打开对应的防火墙端口号（一般添加后几分钟内生效）


# 列表
lnmp vhost list

# 删除网站会先列出当前已有虚拟主机，按提示输入要删除的虚拟主机域名 回车确认。
# 这里只是删除虚拟主机配置文件，网站文件并不会删除需要自己删除。
lnmp vhost del
```



#### LNMP相关软件安装目录

```nginx
# Nginx 目录
/usr/local/nginx/
# 默认网站目录 : 0.9版本为 
/home/wwwroot/
#1.0及以后版本为 
/home/wwwroot/default/
# Nginx日志目录
/home/wwwlogs/
```

#### LNMP相关配置文件位置

```nginx{2}
# Nginx主配置(默认虚拟主机)文件
/usr/local/nginx/conf/nginx.conf
# 虚拟主机配置文件
/usr/local/nginx/conf/vhost/域名.conf
# MySQL配置文件
/etc/my.cnf
```
### 修改linux root@后面的别名
```nginx
vi /etc/hostname  # 重启服务器
```

###  Operation Not Permitted 错误问题
```nginx
chattr -i [name]
rm -rf [name]
```

### 安装 node

使用 nvm 安装多版本的 node

nvm（Node Version Manager）是 Node.js 的版本管理软件，使您可以轻松在 Node.js 各个版本间进行切换。适用于长期做 node 开发的人员或有快速更新 node 版本、快速切换 node 版本的场景。


确保安装 git ，没有 git 执行 `yum install git` 安装 git

1. 克隆 nvm 源码

```nginx
git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout git describe --abbrev=0 --tags
```

2. 激活 nvm

```nginx
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile
```

3. 安装 node 

安装版本 nvm install v12.14.1

列出已安装版本  nvm ls

测试版本号 node -v

切换版本 nvm use 8.12.0

永久切换版本 nvm alias default v15.10.0