

# Jenkins自动化部署

**Jenkins学习记录**

学前了解：
```bash
linux  shell
jenkins
jdk tomcat 
Java Development Kit是整个Java核心，包括Java运行环境、Java工具和Java基础类库。JDK作为JAVA开发的环境，不管做JAVA开发还是做安卓开发，都必须在电脑上安装JDK
tomcat:由Apache组织提供的一种Web服务器,提供对jsp和Servlet的支持。它是一种轻量级的javaWeb容器(服务器),也是当前应用最广的JavaWeb服务器(免费)

node npm
ssh
git github
docker
```



### Why Jenkins

`是业界流行开源的持续集成的工具，广泛用于项目开发，具有自动化构建，测试，部署等功能`

 CI 持续集成
 
 CD 持续部署
      
<!-- <img src='/assets/img/jenkins.jpeg'/> -->

### 配置jdk安装Java环境

`jenkins是java编写的，所以需要先安装jdk`

```bash{1,3,6,8,10,12,14}
cd /usr/local/src //选择下载目录

wget https://download.oracle.com/otn/java/jdk/8u221-b11/230deb18db3e4014bb8e3e8324f81b43/jdk-8u221-linux-x64.tar.gz
wget http://img.zhufengpeixun.cn/jdk1.8.0_211.tar.gz  //下载目录备份

tar -xzvf [name] //解压

mkdir /usr/java //创建Java的目录

cp -r [name]   /usr/java //copy

ln -s  /usr/java/[name]/bin/java /usr/bin/java   //创建一个软连接 or 创建全局变量

java -version //查看版本号是否成功
```

### 配置/启动 Jenkins

```javascript
cd /etc/yum.repos.d

wget http://pkg.jenkins.io/redhat/jenkins.repo   //安装源

rpm --import http://pkg.jenkins.io/redhat/jenkins.io.key//导入验证的key

yum install -y jenkins     //yum安装

service jenkins start/stop/restart

打开 `http://120.79.229.197:8080`  //打开jenkins

http://ip/exit //关闭jenkins服务.
http://ip/reload //重新加载配置信息
http://ip/restart //重启

-------------

systemctl start  mysqld.service
systemctl start  docker
docker ps -a
docker start  [name]

```
#### 如果是wget 安装的话

`启动jenkins`<br/>
java -jar jenkins.war --httpPort=8081
 
`如果想要在linux后台一直运行，则要开始加nohup，在末尾加&号`<br/>
nohup java -jar jenkins.war --httpPort=8081 &

启动后 会生成一个nohup.out输出，需要的话，可以tail -f nohup.out实时查看日志

`列出jenkins的所有进程`<br/>
ps -aux|grep jenkins

`杀死这个进程`<br/>
kill -9 [PID]

#### 登录

账号：admin <br/>
密码：`cat /var/lib/jenkins/secrets/initialAdminPassword`（初始密码）

### 安装插件

首先重置安装源，切换到中国的镜像

系统管理->插件管理->高级->升级的站点

`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json` 清华大学的站点

```javascript
Generic Webhook Trigger  //web触发器

Publish Over SSH  //通过ssh部署服务器

nvm wrapper   //提供node环境 

Role-based Authorization Strategy//增加用户的权限管理

```

#### 手动下载jenkins插件

插件下载地址：`http://updates.jenkins-ci.org/download/plugins/`

如果有插件一直安装失败的情况，可以从jenkins官网下载插件，然后导入到jenkins。

示例：我从官方下载gitlab-plugin插件到本地，然后导入到jenkins中。

在jenkins`插件管理->高级`选择上传插件进行安装。
       
<img src='/assets/img/plugin.png'/>


### 关闭防火墙
```bash
设置开机启用防火墙：systemctl enable firewalld.service
设置开机禁用防火墙：systemctl disable firewalld.service
启动防火墙：systemctl start firewalld
关闭防火墙：systemctl stop firewalld.service
检查防火墙状态：systemctl status firewalld 
```

### 添加项目

新建一个任务[name]->构架一个自由风格的项目->确定

源代码->git->https://github.com/wkvictory/weapp.git->添加权限【git 的用户名和密码】->构建触发器(Generic Webhook Trigger)->应用保存

<!-- <img src='/assets/img/addGit.png'/> -->

<!-- <img src='/assets/img/trigger.png'/> -->

### 配置webhook

此时可以构建了，但是需要在还给Git中添加Webhooks，否则不能自动化构建

<!-- <img src='/assets/img/webhooks.png'/> -->

`http://JENKINS_URL/generic-webhook-trigger/invoke` 

JENKINS_URL格式为 `用户名:token@ip:8080`

**token生成的位置**<br/>
<!-- <img src='/assets/img/token.png'/> -->

admin<br/>
1108c27bdd32e70d8ba6ba7893bcf57450<br/>
120.79.229.197:8080<br/>
http://admin:1108c27bdd32e70d8ba6ba7893bcf57450@120.79.229.197:8080/generic-webhook-trigger/invoke

### 触发

手动触发，查看日志是否成功<br/>
代码默认目录,在控制台查看  cd /var/lib/jenkins/workspace/[name]

也可以Git提交一版代码触发看是否成功

### 构建

下拉任务名字->配置->构建环境（选中Run the build in an NVM managed environment，【我们自己下载的插件提供node环境】）->
输入node的版本号->构建->选择shell

<!-- <img src='/assets/img/nvm.png'/> -->

```bash
echo $GIT_BRANCH
npm config set registry https://registry.npm.taobao.org
npm install -g yarn 
yarn config set registry https://registry.npm.taobao.org
yarn install
yarn global add @tarojs/cli@1.3.14
yarn build:h5
tar -czvf dist.tar.gz dist/h5
```

### 添加服务器的私钥

系统管理->系统设置->Publish over SSH

<!-- <img src='/assets/img/ssh.png'/> -->

### 配置免费登录（同一台也要）

ssh-keygen -t rsa

ssh-copy-id 120.79.229.197

`这里不配置免登录，在部署的时候，找不到要部署的服务器`

### 构建后操作

下拉任务名字->配置->构建后操作->Send build artifacts over SSH
<br/>
<!-- <img src='/assets/img/deploy.png'/> -->

### 邮件提醒

1.系统管理->系统设置->Jenkins Location(系统管理员邮件地址) feng960106@163.com

2.系统管理->系统设置->Extended E-mail Notification

<!-- <img src='/assets/img/email.png'/> -->

3.系统管理->系统设置->邮件通知

<!-- <img src='/assets/img/nextEmail.png'/> -->

4.拉任务名字->配置->构建后操作->Editable Email Notification

<!-- <img src='/assets/img/nextDeployEmail.png'/> -->
<br/>
<!-- <img src='/assets/img/always.png'/> -->

> 优化jenkins运行内存 vim /etc/sysconfig/jenkins


### Jenkins权限设置错误


#### 修改config.xml

先查看目录 find / -name jenkins

- cd /var/lib/jenkins

先备份 cp config.xml wk.xml

删除以下内容：

```javascript
<authorizationStrategy class="hudson.security.ProjectMatrixAuthorizationStrategy"> 
  ...
</authorizationStrategy>

<securityRealm class="hudson.security.HudsonPrivateSecurityRealm">
<disableSignup>true</disableSignup>
<enableCaptcha>false</enableCaptcha>
</securityRealm>
```

**启动jenkins**

service jenkins restart

**再次访问Jenkins后，首先要设置登录认证。**


<!-- <img src='/assets/img/security.png'/> -->
       

### Jenkins调优 

```bash
# 查看物理CPU个数
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l

# 查看每个物理CPU中core的个数(即核数)
cat /proc/cpuinfo| grep "cpu cores"| uniq

# 限制jenkins 启动占用内存
vim /etc/sysconfig/jenkins
JENKINS_JAVA_OPTIONS="-XX:MaxPermSize=512m -Djava.awt.headless=true"
```

```javascript
cd /usr/mongodb/bin
./mongod  --config /usr/local/mongodb/mongodb.conf

pm2 start /home/admin/fenggeServer/bin/www --name='fenggezaoxing'
pm2 start /home/admin/workplaceServer/bin/www --name='workplace'
pm2 start /home/admin/transition/bin/www --name='transition'
pm2 start /home/admin/wangyiyunServer/app.js --name='wangyiyunServer'

```

### 卸载jenkins

```js
service jenkins stop
 
yum clean all
 
yum -y remove jenkins
```