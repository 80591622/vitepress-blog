---
abbrlink: 525c87c3
title: Mongodb安装
date: 2019-05-10
categories: 
- Server
- Mongodb
---

<strong class='old-blog'>Mongodb安装</strong>

[[toc]]

### 本地安装mongodb

[安装地址](https://www.mongodb.com/download-center/community)


打开安装的目录，默认没有data,etc ,log 文件的

sudo mkdir -p /data/db

sudo chown -R zhf /data

./mongod 就可以启动了，但是全局不能使用，需要配置下

设置全局路径 ： echo 'export PATH=/Users/zhenfeng/mongodb/bin:$PATH'>>~/.bash_profile 

在根路径source .bash_profile就生效了，查看是否成功

$PATH/ /是否有当前db 的目录

which mongod  //是否路径

问题：整好之后发现配置的环境变量（mongod）不起作用了，执行source .bash_profile后，mongod可以用了，但是终端全部关闭后，再输入mongod，就不起作用了。

**解决方法**

执行vi ~/.zshrc打开.zshrc,将 source .bash_profile 粘贴到最下面，保存即可。或者直接open .bash_profile把里面的内容粘贴到.zshrc里面,保存重启即可。

接下来就是启动mongodb了,cmd+T 新建命令窗口，使用命令 `mongod` 启动mongoDB server，启动成功后最后一行应该是端口号27017

![](https://user-gold-cdn.xitu.io/2019/5/24/16ae8fe807c8c514?w=636&h=266&f=png&s=111571)

mongodb 启动成功，正等待着被连接。

cmd+T 新建命令窗口，执行 `mongo`，进入 mongodb 命令行模式：


### 阿里云服务器安装mongodb

1.下载mongodb

```nginx
# 兼容性好
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.9.tgz

curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.13.tgz
```

2.解压

```nginx
tar zxvf mongodb-linux-x86_64-3.2.9.tgz

# copy到usr目录下【使用规范】
cp -r mongodb-macos-x86_64-4.0.13   /usr/mongodb
```

3.创建数据文件夹和日志文件等

```nginx
mkdir -p  /usr/local/mongodb/data
touch /usr/local/mongodb/mongodb.log
touch /usr/local/mongodb/mongodb.conf

# mongodb.conf配置文件如下
dbpath=/usr/local/mongodb/data
logpath=/usr/local/mongodb/mongodb.log
logappend = true 
port = 27017 
fork = true 
auth = true
```

4.启动

```nginx{8,12}
# 设置全局变量
export PATH=$(pwd)/bin:$PATH

# 跳转到
/usr/mongodb/bin/

# 开启数据库
./mongod --config /usr/local/mongodb/mongodb.conf
./mongod --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/mongodb.log --logappend  --port=27017 --fork

# 关闭数据库
./mongod -shutdown -dbpath=/usr/local/mongodb/data

# 查看是否开启
netstat -lanp | grep "27017"
ps -ef|grep mongod

# 不能使用kill -9 杀死mongo

# 补救
/usr/local/mongodb/data/
rm -rf *.lock
./mongod  --repair

# 从0~65535全部是标准端口，但是从0~1024号端口是系统端口，用户无法修改
# 从1025~65534端口是系统为用户预留的端口，而65535号端口为系统保留
```

5.创建完成后需要在阿里云控制台配置防火墙才能连接


### 数据库的操作

- 导出数据库
./mongoexport --port [port] --db test --collection users --out export.json

- 导入数据库
./mongoimport -h 120.79.229.197:27-17 -d test -c scenics --file=./export.json
