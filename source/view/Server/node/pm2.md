---
abbrlink: '93277671'
title: Node启动工具
date: 2019-09-15
categories: 
- Server
- NodeJS
- Node启动工具
---

<strong class='old-blog'>Node启动工具</strong>

[[toc]]

### nodemon

**开发环境用**

##### 下载
yarn global add  nodemon

##### 启动
nodemon app.js

### pm2

##### 下载
yarn global add  pm2

##### 常用命令

```nginx
$ pm2 start app.js              # 启动app.js应用程序
$ pm2 start app.js -i 4         # cluster mode 模式启动4个app.js的应用实例    
$ pm2 start app.js --name="api" # 启动应用程序并命名为 "api"
$ pm2 start app.js --watch      # 当文件变化时自动重启应用
$ pm2 list  / pm2 ls            # 列表 PM2 启动的所有的应用程序
$ pm2 logs                      # 显示所有应用程序的日志
$ pm2 logs [app-name|id]        # 显示指定应用程序的日志
$ pm2 stop all                  # 停止所有的应用程序
$ pm2 stop 0                    # 停止 id为 0的指定应用程序
$ pm2 restart all               # 重启所有应用
$ pm2 delete all                # 关闭并删除所有应用
$ pm2 delete 0                  # 删除指定应用 id 0
```

##### 查看日志

```nginx
cd /root/.pm2/logs

pm2 log id
```


