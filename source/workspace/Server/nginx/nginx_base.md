
# Nginx的使用指南

## 基础配置

[nginx基本配置与参数说明](http://www.nginx.cn/76.html)


```nginx{63,64,65,66,67,68,69,88,89,90,91,92,114,115,116,117}
#运行用户
user nobody;
#启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志及PID文件
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#工作模式及连接数上限
events {
    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    #仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll; 

    #单个后台worker process进程的最大并发链接数    
    worker_connections  1024;

    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535
}
http {
    #设定mime类型,类型由mime.type文件定义
    include    mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    #对于普通应用，必须设为 on,
    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    #tcp_nopush     on;

    #连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay     on;

    #开启gzip压缩
    gzip on; # 开启gzip
    gzip_min_length 1k; #最小1k的文件才使用gzip
    gzip_buffers 4 8k; #代表以8k为单位，按照原始数据大小以8k为单位的4倍申请内存
    gzip_comp_level 5; #1 压缩比最小处理速度最快，9 压缩比最大但处理最慢（传输快但比较消耗cpu）
    gzip_types application/javascript text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png; # 支持的文件类型
    gzip_disable "MSIE [1-6]\."; #IE6一下 Gzip支持的不好，故不实用gzip

    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;

    #设定虚拟主机配置
    server {
        #侦听80端口
        listen    80;
        #定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;

        #定义服务器的默认网站根目录位置
        root html;

        #设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;

        #默认请求
        location / {
          #定义首页索引文件的名称
             try_files $uri $uri/ /index.html;
        }

        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
        }

        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            #过期30天，静态文件不怎么更新，过期可以设大一点，
            #如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        # PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        #禁止访问 .htxxx 文件
        location ~ /.ht {
            deny all;
        }
    }
   include vhost/*.conf; # server可单独抽离出来写，方便管理
}
```

## 负载均衡（反向代理）


1.用户输入`http://test-openai.com` 时，访问`80`端口<br/>
2.nginx监听到80端口`被访问`，匹配到的`/`路径，被反向代理到`http://dramatic-offical-website`<br/>
3.`dramatic-offical-website`集群管理着一堆机器地址，从而实现负载均衡。<br/>
4.如果匹配到`http://test-openai.com/images/` 路径，则直接映射`/data`下的文件<br/>

```nginx
# 虚拟主机配置
server {
    server_name test-openai.com; # 请求到达的服务器名
    listen 80; # 监听80端口
    listen 443 ssl; # https默认端口是443

    # 对 / 所有做负载均衡+反向代理
    location / {
        proxy_pass http://dramatic-offical-website; # 代理到目标地址
    }

    # 静态文件，nginx自己处理
    location /images/ {
        root /data; # 映射到/data/images
    }
}

# 设定负载均衡后台服务器列表
upstream dramatic-offical-website {
    server 10.192.106.133;
    server 10.192.106.134;
}
```

```nginx
# /etc/nginx/conf.d
# /usr/local/nginx/conf/vhost

location /api {
   rewrite  ^/api/(.*)$ /$1 break;
   proxy_pass 'XXXXXXXXXXXXX';
}
```

## HTTP缓存控制

常用的缓存设置里面有两种方式，都是使用add_header来设置：分别为`Cache-Control`和`Pragma`

`Pragma`可以应用到http 1.0 和http 1.1，只能应用于http 1.1<br/>
`Pragma`是旧产物，已经逐步抛弃

### `Pragma`

`Pragma`有两个字段`Pragma`和`Expires`。Pragma的值为no-cache时，表示禁用缓存，Expires的值是一个GMT时间，表示该缓存的有效时间。
```nginx
location ~ .*\.(css|js|swf|php|htm|html )$ {
	add_header Cache-Control max-age=10;
	add_header Pragma no-cache;
}
# Pragma的优先级高于Cache-Control
location ~ .*\.(js|css)$ {
   expires 10d;
}
# 若报文中同时出现了 Expires 和 Cache-Control，则以 Cache-Control 为准。
```

### `Cache-Control 「强制缓存」`

对于强缓存来说，会直接去查看`缓存资源中的响应头`的字段值，以此来判断缓存的资源是否还能使用，在这个过程中，`不需要`向服务器发起请求。

`public`指示响应可被任何缓存区缓存。【如果定义了`max-age`，可以不用再定义`public`，它们的意义是一样的。】<br/>
`private`指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。<br/>
`no-cache`可以在本地缓存，可以在代理服务器缓存，但是这个缓存要服务器验证才可以使用<br/>
`no-store`彻底得禁用缓冲，本地和代理服务器都不缓冲，每次都从服务器获取<br/>
`max-age`指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应 【max-age=1008611】<br/>
`only-if-cached`表示不进行网络请求，完全只使用缓存，若缓存不命中，则返回503错误<br/>
`must-revalidate`：告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验<br/>

### `缓存校验「协商缓存」`

当超过max-ages设置的时间,这个就会起作用

而对于协商缓存来说，要判断缓存是否能使用，需要通过发起请求，带着与缓存相关的字段，到服务器去做过期判断后，才能通过相应的内容做出相应的操作。（是回去拿缓存的资源，还是拿这次服务器返回的资源）


### `Last-Modified/If-Modified-Since`

`Last-Modified`：标示这个`响应`资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。<br/>
`If-Modified-Since`是标准的HTTP请求头标签，在发送HTTP`请求`时，**把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较**。<br/>
如果时间一致，那么返回HTTP状态码304（不返回文件内容），客户端接到之后，就直接把本地缓存文件显示到浏览器中。<br/>
如果时间不一致，就返回HTTP状态码200和新的文件内容，客户端接到之后，会丢弃旧文件，把新文件缓存起来，并显示到浏览器中

`If-Modified-Since`和`If-Unmodified-Since`的区别是：<br/>
If-Modified-Since：告诉服务器如果时间一致，返回状态码304<br/>
If-Unmodified-Since：告诉服务器如果时间不一致，返回状态码412

```javascript
last_modified = res.headers['Last-Modified']
# 修改headers
headers['If-Unmodified-Since'] = last_modified
```
### `ETag/If-None-Match`

::: tip 为什么要有etag？
1、一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新get<br/>
2、某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，if-modified-since能检查到的粒度是秒级的，这种修改无法判断<br/>
3、某些服务器不能精确的得到文件的最后修改时间。<br/>
:::

`etag`的方式是这样：服务器通过某个算法对资源进行计算，取得一串值,之后将该值通过etag返回给客户端，客户端下次请求时通过`If-None-Match或If-Match`带上该值，服务器对该值进行对比校验,如果一致则不要返回资源。

`If-None-Match`和`If-Match`的区别是：

`If-None-Match`：告诉服务器如果一致，返回状态码304，不一致则返回资源<br/>
`If-Match`：告诉服务器如果不一致，返回状态码412


```nginx
 location ~* ^.+\.(css|js|txt|xml|swf|wav)$ {
#            expires      24h;
#            add_header Cache-Control no-store;
#            add_header Cache-Control max-age=43200;
            add_header Cache-Control  max-age=86400,s-maxage=3600,must-revalidate;
#            add_header Cache-Control only-if-cached;
#            add_header Cache-Control no-cache;
#            add_header Cache-Control must-revalidate;
        }
```

**有一种场景需要注意**

- 分布式系统里多台机器间文件的Last-Modified必须保持一致，以免负载均衡到不同机器导致比对失败；
- 分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）；
- 京东页面的资源请求，返回的repsones header就只有Last-Modified，没有ETag：


### 用户行为

F5刷新那个可以去火狐看看

![](https://ae01.alicdn.com/kf/He00c7b1f799e40f39f6b6ab2f9f60710J.jpg)

### 流程图

![](https://ae01.alicdn.com/kf/Hcca8568c990e4f33b30636b57b2fd65cc.jpg)

### 总结

在前后端不分离的项目中，我们一般会把强缓存设置的时间特别长，一方面是减少304缓存，
另一方面是webpack打包的项目会带有hash值，只要文件发生改变对应的js或者css的hash值就会发生变化，这时候服务端就会重新请求数据，这里不会触碰到任何的缓存。
所以为了更好地运用缓存，提升客户端的体验，减轻服务器的压力，我们一定要要把经常用的库，如antd,echarts等等，单独打包成一个js，这样不会每次上线都会重新请求数据了。
如果线上遇到小的问题特别急，源码又不在身边，需要登录服务器改代码，也尽可能的不直接修改js或者css里面的代码，
这样在强缓存时间内或者用户刷新页面并不会请求到真正的请求数据，会直接使用本地的缓存，浏览器强制刷新会解决此问题，但是在手机端就gg了，
好的办法就是直接把文件名称，加一些hash值，然后在对应的页面修改下，这样就能拿到真正的资源了。（上一家公司遇到的坑）


## 404 转发到兜底页面

```nginx
location /test {
	error_page 404 403 @opr_404_error;
}

location @opr_404_error {
	return 302 https://h5.wkdevhub.cn/opr/activity.html?$args; # 带上问号后面的参数
}
```

## 系统常用目录

`/etc`下一般是系统`全局性`的公共文件目录 <br/>
`/usr/local`一般是`第三方软件`所存放的目录的分区，可以单独分区，且建议单独挂载分区。 <br/>
`/usr/local/src`一般是`下载的第三方软件`。 <br/>
`/usr/local/etc`下一般指代`用户级`的公共文件目录 <br/>
`/usr/local/bin`目录是给用户放置自己的可执行程序. <br/>
`/usr/bin`下面的都是系统预装的`可执行程序`，系统升级有可能会被覆盖. <br/>
