---
abbrlink: 2bc132ae
title: RN IOS环境搭建
date: 2019-11-17
categories: 
- FE框架 
- ReactNative
- RN IOS环境搭建
---

<strong class='old-blog'>RN IOS环境搭建</strong>

[[toc]]

### iOS 安装CocoaPods

1、升级Ruby环境

sudo gem update --system

如果失败

```javascript
ERROR:  While executing gem ... (Errno::EPERM)
    Operation not permitted @ rb_sysopen - /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/gem
```
则执行
sudo gem install -n /usr/local/bin cocoapods

2、更换Ruby镜像

首先移除现有的Ruby镜像<br/>
终端输入：gem sources --remove https://rubygems.org/

然后添加国内最新镜像源（淘宝的Ruby镜像已经不更新了）<br/>
终端输入：gem sources -a https://gems.ruby-china.com/

执行完毕之后输入gem sources -l来查看当前镜像
终端输入：gem sources -l

```javascript
*** CURRENT SOURCES ***

https://gems.ruby-china.com
```

3、安装CocoaPods

终端输入：sudo gem install cocoapods

如果出现：
```javascript
 While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /usr/bin directory.
```

改为 sudo gem install -n /usr/local/bin cocoapods

4.pod切换源

查看源 <br/>
终端输入： pod repo

执行：<br/>
git clone https://git.coding.net/CocoaPods/Specs.git ~/.cocoapods/repos/master<br/>
时间有点久

最后切记要：<br/>
pod repo update

```javascript
master
- Type: git (master)
- URL:  https://git.coding.net/CocoaPods/Specs.git
- Path: /Users/leiming/.cocoapods/repos/master
```


### fatal: unable to access 'https://chromium.googlesource.com/webm/libwebp/'解决方法

::: danger
[!] Error installing libwebp
[!] /usr/local/bin/git clone https://chromium.googlesource.com/webm/libwebp /var/folders/pw/vctwmfjd5h9cg9dgql17_25m0000gn/T/d20191023-10469-1unjlyk --template= --single-branch --depth 1 --branch v1.0.3

Cloning into '/var/folders/pw/vctwmfjd5h9cg9dgql17_25m0000gn/T/d20191023-10469-1unjlyk'...
fatal: unable to access 'https://chromium.googlesource.com/webm/libwebp/': Failed to connect to chromium.googlesource.com port 443: Operation timed out
:::

主要是clone https://chromium.googlesource.com/webm/libwebp/ 这个google的git地址出的错(并且我开的全局模式的代理软件也无效)

**解决方法:**

Finder -> 前往文件夹 (⇧⌘G) -> ~/.cocoapods/repos/master/Specs/1/9/2/libwebp

选择最新版本   进入 libwebp.podspec.json 

把https://chromium.googlesource.com/webm/libwebp 替换为 https://github.com/webmproject/libwebp.git 并保存

接着pod install
