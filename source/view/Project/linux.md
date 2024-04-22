---
abbrlink: 676ff959
title: shell & ssh
date: 2019-03-19
tags: Linux
categories: 
- Project
- Shell
---


<strong class='old-blog'>shell & ssh</strong>

[[toc]]

### 日常用到的Shell命令

| 命令名      |  功能描述     |
| ---        |    ---      |
 clear | 清除屏幕或窗口内容 |
env | 显示当前所有设置过的环境变量 |
date | 显示系统的当前日期和时间 |
cal | 显示日历 |
vi 修改文件 |      dd删除一行 A编辑选中的最后一行代码 ，
:set nu |  加索引
touch  |  创建文件
mkdir |   创建文件夹
du -ha [文件名称] |   查看目录/文件占用空间大小
ls -lh  | 看文件大小
ll  |  等价 ls -al
netstat -nltp | grep 443 | 查看端口号
mv  | 修改文件名 移动文件 mv  index.html  .bash_profile
cat  |  查看内容
sudo vim /etc/hosts |  ws破解
ssh -p 2289 root@182.92.117.162 | 登录ssh
chattr +i .user.ini |  重新恢复文件不可更动属性
chmod -R 777 pet_07 | 赋权限
r：可读<br/>w：可写<br/>x：可执行<br/><br/>-rw------- (600) -- 只有属主有读写权限。<br/>-rw-r--r-- (644) -- 只有属主有读写权限；而属组用户和其他用户只有读权限。<br/>-rwx------ (700) -- 只有属主有读、写、执行权限。<br/>**-rwxr-xr-x (755) -- 属主有读、写、执行权限；别的用户组只有读、执行权限。**<br/>-rwx--x--x (711) -- 属主有读、写、执行权限；而属组用户和其他用户只有执行权限。<br/>-rw-rw-rw- (666) -- 所有用户都有文件读、写权限。这种做法不可取。<br/>-rwxrwxrwx (777) -- 所有用户都有读、写、执行权限。更不可取的做法。<br/> | 参数解释
sudo chown -R $(whoami) or【你的用户名】  /Users/wk/Desktop/projectSvelte | 更改某个目录或文件的用户名和用户组
yarn version --new-version 1.0.0 | 更改版本号
curl http://www.wk.jing999.cn:8000/banner | http命令行工具
ping www.wk.jing999.cn | ping  
kill -9 PID |  杀死这个进程
npx browser-sync start -s . -f . | 静态页面动态刷新
browser-sync start --server --files . | 静态页面动态刷新
rm -rf node_modules/.cache/babel-loader  |  umi的bug
nginx -s reload  |  重启nginx
tar -czvf dist.tar.gz dist  |  dist 压缩
tar -xzvf dist.tar.gz  |  解压
-c: 建立压缩档案<br/>-x：解压<br/>-z：有gzip属性的<br/>-v：显示所有过程<br/>-r：向压缩归档文件末尾追加文件<br/>-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。<br/>  | 参数解释
find / -name jenkins |  查看安装目录
sed -i '' "s/666/777/g" config | 修改文字 666换成777

`看一共写了多少代码`

find . "(" -name "*.vue" -or -name "*.jsx" -or -name "*.tsx" -or -name "*.css" -or -name "*.less" -or -name "*.scss" -or -name "*.js" -or -name "*.ts" ")" -print | xargs wc -l

### 添加环境变量

- 临时有效
  - export PATH=$(pwd)/bin:$PATH
- 软连接  /usr/local/bin/就是环境变量目录
  - ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/
- 用户主目录下的.bashrc 或.profile文件（推荐）
  - export PATH=/Users/wk/mongodb/bin:$PATH
    - 执行source ~/.bashrc, 立即生效

### VIM

**批量注释**

从需要被注释的第一行开始，将光标移动到行首，

按下  `Ctrl + v`

接着按下`方向键`下，一直移动到需要被注释的最后一行，

这时可以看到，这些需要被注释的行的行首第一个字符已经全部被选中

然后按下  `Shift + i`，批量插入，

这时光标会跳到第一行的行首，不用管，继续按下`Shift + 3`，也就是  `#`键

最后按下  `Esc` 键，就可以看到刚才被选中的行的行首都会加多一个`#`号

批量注释完毕

**去注释**

对于一大段被注释的代码，需要去掉注释的时候，也可以一次性操作完

不用一个一个去删，具体操作如下：

光标移到需要去除注释的第一行的行首，跟上面的一样，

按下 ·`Ctrl + v`

接着按下`方向键`下，一直移动到需要被注释的最后一行，

这时候可以看到，行首的第一个字符`#`已经被选中了，

然后按下`d`键就可以全部删掉行首的`#`字符了。

### Shell编程

``` bash
# run: sh depoly.sh 123 123
# 变量定义
str='test' # 注意赋值不需要空格
str2="this is $str" # 双引号可以直接写入变量
str3="this is ${str}"
arr=('1' '2') # 数组

# echo打印
echo this is test # this is test # 被默认为字符串，不会报错
echo $str # test # 变量引用需要家$符号
echo $str2 # this is test
echo $str3 # this is test
echo ${arr[1]} # 2 # 数组切割

# if判断
if [ $str == "test" ] # if条件需要在方括号中，并且注意需要空格
then
    echo 'successed'
fi

a='10'
b='20'
if [ $a != $b ]
then
   echo "a 不等于 b"
fi

# 获取参数
echo $1 # 123 #第一个参数
echo $# # 2 # 参数个数
echo $* # 123 123 所有参数

# for循环
# C语言风格
for ((i=1; i<=100; i++))
do
  echo $i
done
# Python风格（in的使用）
for i in {1..100}
do
  echo $i
done
```

### ssh 不能登录服务器

提示警告信息如下：

arnold@WSN:~$ ssh 120.79.229.197

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that the RSA host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
08:98:a9:cc:f8:37:20:6b:b4:b1:6c:3a:15:b9:a9:92.
Please contact your system administrator.
Add correct host key in /home/arnold/.ssh/known_hosts to get rid of this message.
Offending key in /home/arnold/.ssh/known_hosts:2
RSA host key for 10.18.46.111 has changed and you have requested strict checking.
Host key verification failed.

原因分析：

It is also possible that a host key has just been changed.

我之前对ssh服务器重装了系统，导致所有与原系统建立过ssh连接的系统都无法再建立连接，因为在于原系统建立首次连接时，双方相互记录了对方的公钥（ssh基于非对称密钥技术），在ssh服务主机重装系统后，公钥改变了，任以旧版本公钥的主机自然是无法与新系统连接的。

网上还有分析为ssh主机被人黑了，并在消除入侵记录时对known_hosts文件做了改动。当然也不排除这种可能，但我估计我是没那个福气了：）

解决方案：

删除 `~/.ssh/known_hosts`文件，或者`如果你可以判断出known_hosts中原ssh服务器的公钥，删去那部分`，

然后后再次建立新的连接，即可获得新的公钥。


### 关于sshpass使用举例

`使用-p参数指定登录密码`

```bash
# 免密码登录
$ sshpass -p password ssh username@host

# 远程执行命令
$ sshpass -p password ssh username@host <cmd>

# 通过scp上传文件
$ sshpass -p password scp local_file root@host:remote_file 

# 通过scp下载文件
$ sshpass -p password scp root@host:remote_file local_file
```

示例：

```linux{2,5}
#把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下
scp /home/work/source.txt root@192.168.0.10:/home/work/ 

#把120.79.229.197机器上的wk.gif文件拷贝到本地的/Users/zhenfeng/tempData/目录下
scp root@120.79.229.197:/tmp/wk.gif /Users/zhenfeng/tempData/  

#把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下
scp root@192.168.0.10:/home/work/source.txt root@192.168.0.11:/home/work/ 

#拷贝文件夹，加-r参数
scp -r /home/work/sourcedir root@192.168.0.10:/home/work/ 
```

### 脚本

```bash
#!/usr/bin/env bash
tar -czvf '$1' | sshpass -p password ssh root@host 'cd /home -rf;tar -xzvf -'
```

`脚本用env启动的原因，是因为脚本解释器在linux中可能被安装于不同的目录，env可以在系统的PATH目录中查找。同时，env还规定一些系统环境变量。 `

### linux-ab压力测试

```bash
# 基本用法
ab -c 10 -n 100 https://www.xxxxx.com
```

参数释义 总共请求100次 一次请求10个 post文件 请求头信息 地址


**对相关参数进行说明：**

    -n 即requests，用于指定压力测试总共的执行次数。
    -c 即concurrency，用于指定的并发数。
    -t 即timelimit，等待响应的最大时间(单位：秒)。
    -b 即windowsize，TCP发送/接收的缓冲大小(单位：字节)。
    -p 即postfile，发送POST请求时需要上传的文件，此外还必须设置-T参数。
    -u 即putfile，发送PUT请求时需要上传的文件，此外还必须设置-T参数。
    -T 即content-type，用于设置Content-Type请求头信息，例如：application/x-www-form-urlencoded，默认值为text/plain。
    -v 即verbosity，指定打印帮助信息的冗余级别。
    -w 以HTML表格形式打印结果。
    -i 使用HEAD请求代替GET请求。
    -x 插入字符串作为table标签的属性。
    -y 插入字符串作为tr标签的属性。
    -z 插入字符串作为td标签的属性。
    -C 添加cookie信息，例如：“Apache=1234”(可以重复该参数选项以添加多个)。
    -H 添加任意的请求头，例如：“Accept-Encoding: gzip”，请求头将会添加在现有的多个请求头之后(可以重复该参数选项以添加多个)。
    -A 添加一个基本的网络认证信息，用户名和密码之间用英文冒号隔开。
    -P 添加一个基本的代理认证信息，用户名和密码之间用英文冒号隔开。
    -X 指定使用的和端口号，例如:“126.10.10.3:88”。
    -V 打印版本号并退出。
    -k 使用HTTP的KeepAlive特性。
    -d 不显示百分比。
    -S 不显示预估和警告信息。
    -g 输出结果信息到gnuplot格式的文件中。
    -e 输出结果信息到CSV格式的文件中。
    -r 指定接收到错误信息时不退出程序。
    -h 显示用法信息，其实就是ab -help。


```bash
[root@hadoop ab]# ab -c 10 -n 100 https://ah2.zhangyue.com/zybk/subscribe/talk?actId=949

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking ah2.zhangyue.com (be patient).....done


Server Software:
Server Hostname:        ah2.zhangyue.com    #请求的URL主机名
Server Port:            443  #web服务器监听的端口
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES128-GCM-SHA256,2048,128
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        ah2.zhangyue.com

Document Path:          /zybk/subscribe/talk?actId=949 #请求的URL中的根绝对路径
Document Length:        13731 bytes #HTTP响应数据的正文长度

Concurrency Level:      10 　# 并发用户数，这是我们设置的参数之一
Time taken for tests:   3.207 seconds   #所有这些请求被处理完成所花费的总时间 单位秒
Complete requests:      100  # 总请求数量，这是我们设置的参数之一
Failed requests:        33  # 表示失败的请求数量，这里的失败是指请求在连接服务器、发送数据等环节发生异常，以及无响应后超时的情况
   (Connect: 0, Receive: 0, Length: 33, Exceptions: 0)
Total transferred:      1404034 bytes #所有请求的响应数据长度总和。包括每个HTTP响应数据的头信息和正文数据的长度
HTML transferred:       1373034 bytes  # 所有请求的响应数据中正文数据的总和，也就是减去了Total transferred中HTTP响应数据中的头信息的长度
Requests per second:    31.18 [#/sec] (mean)  #吞吐率，计算公式：Complete requests/Time taken for tests  总请求数/处理完成这些请求数所花费的时间
Time per request:       320.737 [ms] (mean) # 用户平均请求等待时间，计算公式：Time token for tests/（Complete requests/Concurrency Level）。处理完成所有请求数所花费的时间/（总请求数/并发用户数）
Time per request:       32.074 [ms] (mean, across all concurrent requests) #服务器平均请求等待时间，计算公式：Time taken for tests/Complete requests，正好是吞吐率的倒数。也可以这么统计：Time per request/Concurrency Level
Transfer rate:          427.49 [Kbytes/sec] received #表示这些请求在单位时间内从服务器获取的数据长度，计算公式：Total trnasferred/ Time taken for tests，这个统计很好的说明服务器的处理能力达到极限时，其出口宽带的需求量。

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       39  138 150.2     76     906
Processing:    27  119 164.8     54     984
Waiting:       27  118 164.7     54     984
Total:         70  256 220.1    153    1135

Percentage of the requests served within a certain time (ms)
  50%    153
  66%    296
  75%    351
  80%    371
  90%    565
  95%    796
  98%   1069
  99%   1135
 100%   1135 (longest request)
```

### 针对jenkins总结的

`启动jenkins`<br/>
java -jar jenkins.war --httpPort=8081
 
`如果想要在linux后台一直运行，则要开始加nohup，在末尾加&号`<br/>
nohup java -jar jenkins.war --httpPort=8081 &

启动后 会生成一个nohup.out输出，需要的话，可以tail -f nohup.out实时查看日志

`列出jenkins的所有进程`<br/>
ps -aux|grep jenkins

`杀死这个进程`<br/>
kill -9 [PID]

`启动jenkins的另外方式`<br/>
service jenkins start/stop/restart/status

systemctl start jenkins.service

`查看运行的后台进程`<br/>
jobs -l<br/>
jobs命令只看当前终端生效的，关闭终端后，在另一个终端jobs已经无法看到后台跑得程序了，此时利用ps（进程查看命令）<br/>
ps -ef<br/>
ps -aux|grep jenkins

**查看使用某端口的进程**<br/>
`lsof -i:3000` <br/>
kill -9  [pid]
