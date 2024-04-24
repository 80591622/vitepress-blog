
# 安装Nginx踩到的坑

## 装机

先进入 `cd /user/local/src` 没有`src`,`mkdir src`自行新建

[nginx下载地址](https://nginx.org/download/)

```nginx
#安装
wget wget http://nginx.org/download/nginx-1.18.0.tar.gz

#解压  
tar -xzvf nginx-1.18.0.tar.gz

#进入nginx目录
cd nginx-1.18.0.tar.gz

#配置
./configure --prefix=/usr/local/nginx

#make
make
make install
```

## 测试是否安装成功

```nginx
cd /user/local/nginx
./sbin/nginx -t

# 正常情况的信息输出：

nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

## 启动nginx

```nginx
cd /usr/local/nginx/sbin
./nginx // 启动nginx
./nainx -s stop // 停止nginx
```

打开[localhost](http://localhost:80) 默认是 80 端口，**切记这里不要使用6666端口号**谷歌和火狐禁用6666端口号。

![](https://ae01.alicdn.com/kf/H4ba122e3923a46dfa1ba5477c8d80eaax.jpg)

能看见这个页面说明已经成功了。

为了后期更好的时候nginx，可以配置下全局变量 我用的是软连接 `ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/`

## 将nginx作为服务启动

在生产环境中，一般都希望将 nginx 作为一项服务，能在系统重启后自己运行起来。
那就需要在 /usr/lib/systemd/system/ 目录下，创建 nginx.service 文件，并输入以下内容（并保存退出）：

```nginx
cd /usr/lib/systemd/system/
vi nginx.service
```

```nginx
[Unit]
Description=nginx
After=network.target
  
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
  
[Install]
WantedBy=multi-user.target
```
启动nginx服务(此时需要先用ps查看nginx进程是否已存在，若已存在，则服务会启动失败。启动服务前必须先将nginx进程kill掉)：

```nginx
systemctl start nginx
```

设置开机自启动：

```nginx
systemctl enable nginx
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gw8vqjjkg7j31bw0f2gom.jpg)

查看服务状态：
```nginx
systemctl status nginx
```

## 部署服务

既然是在本地配置的nginx就可以用编辑器打开文件了，打开访达然后 `shift+com+g` 输入 `/usr/local/nginx/conf`,然后用编辑器打开 `nginx.conf`配置文件

打开后是大致是这个样子的有删减

```nginx
# ...
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

         location / {
           root html;
           index  index.html index.htm;
        }
    }
    # ....
}
```

**这里的http块：** 可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。

**这里还有一个权限的问题** ，可能导致项目打开是403，在nginx目录上一级目录执行 `sudo chown -R $(whoami) ./nginx`，然后重新加载nginx,不行的话看看是不是的打包后的文件没有权限。

**然后我部署自己的服务**

可以保持这个页面的简洁，单独新建一个vhost文件夹 然后在里面配置新项目，最后用 `include vhost/*.conf;` 直接引入进来；

我这里展示直接就这样了

```nginx
server
     {
        listen 9001;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/mic-react/build;

        location / {
          #定义首页索引文件的名称
             try_files $uri $uri/ /index.html;
        }

        location ~ .*\.(html|text)?$
        {
            add_header Access-Control-Allow-Origin '*';
            add_header Access-Control-Allow-Headers X-Requested-With;
            add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
        }

        location ~ .*\.(svg|gif|jpg|jpeg|png|bmp|swf|woff)$
        {
            add_header Access-Control-Allow-Origin '*';
            add_header Access-Control-Allow-Headers X-Requested-With;
            add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
            expires 30d;
        }

        location ~ .*\.(js|css)?$
        {
            add_header Access-Control-Allow-Origin '*';
            add_header Access-Control-Allow-Headers X-Requested-With;
            add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
            expires 12h;
        }

        location ~ /.well-known {
            allow all;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log off;
    }
```

这里有个巨坑，在云服务器的时候 root 对应项目的时候，是可以正常运行的，但是在本地运行的时候，是没办法加载本地资源的😌，全部包404，看遍好多文章都不行，耽误了半天。实际的原因是 `nginx做代理后的虚拟路径和静态资源的请求路径不一致导的`

然后其实就是单独给静态的资源设置对应的root目录，代码如下：

```nginx
location /js/ {
    root   /Users/wk/Desktop/my-project/dist/js;
    autoindex on;
}

location /font/ {
    root   /Users/wk/Desktop/my-project/dist/font;
    autoindex on;
}

location /css/ {
    root   /Users/wk/Desktop/my-project/dist/css;
    autoindex on;
}
# 如果打包后还有别的文件，如:img，继续添加就好了...
```

<br/>

到目前为止，本地的nginx就可以正常运行了，后面遇到什么问题，我在及时更新。