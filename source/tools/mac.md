---
abbrlink: ee34d04d
title: MAC整理
date: 2019-01-16
tags: Mac
categories: 
- Other
- MAC整理
---

<strong class='old-blog'>MAC整理</strong>

[[toc]]

<!-- ### MAC整理 -->

###  配置sudo免密码
[创建root账户](https://blog.csdn.net/u011046452/article/details/90140936)

`1.` 需要在/etc/sudoers中配置。 
<br/>
这个文件的权限是只读，配置之前需要加写权限。
<br/>
`sudo chmod u+w /etc/sudoers`

`2.` 打开命令窗口
`sudo visudo 或者 sudo vi /etc/sudoers`

按i(insert)开启插入编辑模式

`将 #%admin ALL=(ALL) ALL
替换为 %admin ALL=(ALL) NOPASSWD: ALL`

修改后按esc键，退出编辑模式，最后按住Shift+ ZZ 保存退出

`3.` 既然原来权限是r/r/只读的,修改之后最好也改回来。

`sudo chmod u-w /etc/sudoers`


### sudo报错信息 /etc/sudoers is world writable

::: danger 错误信息

sudo: /etc/sudoers is world writable 
<br/>
sudo: no valid sudoers sources found, quitting 
<br/>
sudo: unable to initialize policy plugin

:::



今天误操作修改了/etc/sudoers的权限，将它的权限改成了777，结果就导致执行所有sudo的命令都报错。
<br/>
`
sudo: /etc/sudoers is world writable
sudo: no valid sudoers sources found, quitting
`
<br/>
想重新把它的权限修改回去，但是执行`chmod 440 /etc/sudoers`后却发现报错为：
<br/>
`chmod: Unable to change file mode on /etc/sudoers: Operation not permitted`
<br/>
这就尴尬了，改不回去。
<br/>
最后通过疯狂的百度谷歌，找到了一些解决方法，但是有些方法说的太简单了，还是走了好多冤枉路，现总结如下：
<br/>
`1.` 在Mac中启动root账户 [启动root](https://jingyan.baidu.com/article/49711c619e7620fa441b7ca8.html)
<br/>
`2.` 切换到root用户，修改 /etc/sudoers的权限
<br/>

```nginx{2,4,8,10,12,13,15}
# 无法使用chmod修改权限
ls -la /etc/sudoers
-rwxrwxrwx  1 root  wheel  1371  8  9 11:28 /etc/sudoers
chmod 440 /etc/sudoers
chmod: Unable to change file mode on /etc/sudoers: Operation not permitted

# 切换到root用户
 su
Password:你自己设置的密码
sh-3.2# ls -l /etc/sudoers
-rwxrwxrwx  1 root  wheel  1371  8  9 11:28 /etc/sudoers
sh-3.2# chmod 0440 /etc/sudoers
sh-3.2# ls -l /etc/sudoers
-r--r-----  1 root  wheel  1371  8  9 11:28 /etc/sudoers
sh-3.2# exit

```

### mac下安装Homebrew


安装 [Homebrew](https://brew.sh/index_zh-cn)


```nginx{3,5}
# 使用方式
# 安装 wget  
brew install wget
# 安装 yum   
brew install yum
```


### mac安装autojump

要知道autojump是什么，我们得先来了解一下shell，bash和zsh。
<br/>

**shell**就是我们经常说的shell命令，其实就是一个c语言编写的程序，用户在命令行键入命令，经过shell解释后传送给操作系统（内核）执行。

**1. bash**

bash (Bourne-Again Shell) 是大多数Linux系统以及Mac OS X默认的shell，换句话说，bash是shell的实例。

**2. zsh**

虽然Linux和Mac OS X默认使用的几乎都是bash，但真正强大的shell其实是深藏不露的zsh，俗称终极shell。它兼容了bash，还有各种强大的功能

**autojump**

autojump是一个命令行工具，它可以使用快捷命令，直接跳转到配置好的目录，而不用管现在身在何处，依赖zsh。

`echo $SHELL`可以查看用的哪个shell（bash or zsh）

查看系统安装的所有shell有哪些 `cat /etc/shells`

将zsh设置成默认的shell：`chsh -s /bin/zsh` (重启shell)

安装autojump：`brew install autojump`（确保有brew）

使用`vim .zshrc`打开.zshrc（有些人会找不到.zshrc这个文件，其实安装了zsh才会有.zshrc ，在默认打开的终端目录下。可以打开终端并且ls -a查看）。

a. 找到 plugins=，在后面添加autojump：`plugins=(git autojump)`

b. 新开一行，添加：`[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh`

c. :wq保存退出，重启终端。


### Mac 终端 oh-my-zsh 配置

Mac 终端默认 shell 为 `bash`。

主要介绍使用 zsh 以及 oh-my-zsh 的配置。

**使用 zsh**

查看当前使用的 shell
```nginx
echo $SHELL
# /bin/bash
```
**使用 brew 更新 zsh**
```nginx
brew install zsh
```

**切换为 zsh**
```nginx
chsh -s /bin/zsh # 重启shell
```

重启终端即可使用 `zsh`


**1.安装**
```nginx
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

**2.主题**

`vim ~/.zshrc`

配置项 `ZSH_THEME` 即为 oh-my-zsh 的主题配置，oh-my-zsh 的 GitHub Wiki 页面提供了 [主题列表](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)

更新配置`source ~/.zshrc`

**3.自动补全插件**

[下载 incr 自动补全插件](http://mimosa-pudica.net/src/incr-0.2.zsh)

将插件放在 oh-my-zsh 自定义插件目录中 `~/.oh-my-zsh/custom/plugins`

在配置文件结束添加：

`source $ZSH/custom/plugins/incr/incr*.zsh`

更新配置`source ~/.zshrc`


**4.自动提示功能插件**

```nginx
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
vi ~/.zshrc  
```

```nginx
plugins=(
  git 
  zsh-autosuggestions
)
```
更新配置`source ~/.zshrc`

**5.安装zsh-syntax-highlighting语法高亮插件**

[官网](https://github.com/zsh-users/zsh-syntax-highlighting)
```nginx
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git 
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```
更新配置`source ~/.zshrc`


**在编辑器内配置**

在终端配置好后，打开编辑器发现仍是bash，

在您喜欢的编辑器中打开您的bashrc文件

`sudo vim  ~/.bash_profile `

然后添加文件顶部添加

`exec zsh`

每次加载终端并运行zsh shell时，它都会执行命令。



### mac下sshpass 不能使用

```nginx
# 在官网下载源码包（最新的是1.06)
wget https://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz/download
# 解压
tar xvzf sshpass-1.05.tar.gz
# 编译安装
./configure
# 如果此处失败安装 **xcode-select –install**
make
sudo make install
```
### mac设置git的分支记录

`基于bash,zsh下不能使用`

```nginx
# 1.进入你的home目录
cd ~
# 2.编辑.bash_profile
vi .bash_profile
# 3.将下面的代码加入到文件的最后处

find_git_branch () {
    local dir=. head
    until [ "$dir" -ef / ]; do
        if [ -f "$dir/.git/HEAD" ]; then
            head=$(< "$dir/.git/HEAD")
            if [[ $head = ref:\ refs/heads/* ]]; then
                git_branch=" → ${head#*/*/}"
            elif [[ $head != '' ]]; then
                git_branch=" → (detached)"
            else
                git_branch=" → (unknow)"
            fi
            return
        fi
        dir="../$dir"
    done
    git_branch=''
}
PROMPT_COMMAND="find_git_branch; $PROMPT_COMMAND"
black=$'\[\e[1;30m\]'
red=$'\[\e[1;31m\]'
green=$'\[\e[1;32m\]'
yellow=$'\[\e[1;33m\]'
blue=$'\[\e[1;34m\]'
magenta=$'\[\e[1;35m\]'
cyan=$'\[\e[1;36m\]'
white=$'\[\e[1;37m\]'
normal=$'\[\e[m\]'

PS1="$white[$magenta\u$white@$green\h$white:$cyan\w$yellow\$git_branch$white]\$ $normal"

# 4.保存退出
# 5.执行加载命令
source .bash_profile
# 6.完成
```

### 允许安装未知来源

```nginx
sudo spctl --master-disable
```

### 微信助手

跳转这个链接，有教程，[https://github.com/lmk123/oh-my-wechat#oh-my-wechat](https://github.com/lmk123/oh-my-wechat#oh-my-wechat)

### 添加WebStrom的主题

先到这里下载喜欢的主题[http://color-themes.com/?view=index](http://color-themes.com/?view=index)

然后打开ws,左上角打开`File-> Import Settings->选择jar文件`

### VSCode

**添加`code+文件`打开VSCode**

安装code：打开VSCode –> command+shift+p –> 输入shell command –> 点击提示Shell Command: Install ‘code’ command in PATH运行

### 谷歌插件

https://chrome.google.com/webstore/category/extensions?utm_source=chrome-ntp-icon

由于Google域名在国内不可访问，可以使用第三方网站  http://chrome-extension-downloader.com/ 或者 www.gugeapps.net 来下载

#### Mac系统中如何导出 chrome 插件

1.使用命令行进入 ~/Library/ApplicationSupport/Google/Chrome/Default/Extensions/

```nginx
#进入扩展程序目录
cd ~/Library/Application\Support/Google/Chrome/Default/Extensions/

#查看当前目录下文件
ls
```

2.根据插件ID找到对应插件，cd/{ID值}，进入文件夹, ls查看

获取 id 方式
![image-20220922173753489](https://tva1.sinaimg.cn/large/e6c9d24ely1h6fiq4qme3j214u0ngta1.jpg)


```nginx
#进入插件目录
cd nmmhkkegccagdldgiimedpiccmgmieda

#查看
ls
```

3.进入对应版本文件夹，pwd查看当前路径：

```nginx
cd 1.0.0.3_0

#查看路径
pwd
```

4.复制插件路径，在 chrome 中->扩展程序->打包扩展程序，弹出打包弹窗。输入插件的路径，即可在生成的打包目录中，获得打包后生成的 crx 文件。


使用 crx 也很简单，使用人打开 "扩展程序"，然后把 crx 拖进来即可。
