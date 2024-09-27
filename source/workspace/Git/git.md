
# git基础

## git emoji
执行 git commit 时使用 emoji 为本次提交打上一个 "标签", 使得此次 commit 的主要工作得以凸现，也能够使得其在整个提交历史中易于区分与查找。

emoji                                   | emoji 代码                   | commit 说明
:--------                               | :--------                    | :--------
:tada: (庆祝)                           | `:tada:`                     | 初次提交
:sparkles: (火花)                       | `:sparkles:`                 | 引入新功能
:bookmark: (书签)                       | `:bookmark:`                 | 发行/版本标签
:bug: (bug)                             | `:bug:`                      | 修复 bug
:ambulance: (急救车)                    | `:ambulance:`                | 重要补丁
:globe_with_meridians: (地球)           | `:globe_with_meridians:`     | 国际化与本地化
:lipstick: (口红)                       | `:lipstick:`                 | 更新 UI 和样式文件
:clapper: (场记板)                      | `:clapper:`                  | 更新演示/示例
:rotating_light: (警车灯)               | `:rotating_light:`           | 移除 linter 警告
:wrench: (扳手)                         | `:wrench:`                   | 修改配置文件
:heavy_plus_sign: (加号)                | `:heavy_plus_sign:`          | 增加一个依赖
:heavy_minus_sign: (减号)               | `:heavy_minus_sign:`         | 减少一个依赖
:arrow_up: (上升箭头)                   | `:arrow_up:`                 | 升级依赖
:arrow_down: (下降箭头)                 | `:arrow_down:`               | 降级依赖
:zap: (闪电)<br>:racehorse: (赛马)      | `:zap:`<br>`:racehorse:`      | 提升性能
:chart_with_upwards_trend: (上升趋势图) | `:chart_with_upwards_trend:` | 添加分析或跟踪代码
:rocket: (火箭)                         | `:rocket:`                   | 部署功能
:white_check_mark: (白色复选框)         | `:white_check_mark:`         | 增加测试
:memo: (备忘录)                         | `:memo:`                     | 撰写文档
:hammer: (锤子)                         | `:hammer:`                   | 重大重构
:art: (调色板)                          | `:art:`                      | 改进代码结构/代码格式
:fire: (火焰)                           | `:fire:`                     | 移除代码或文件
:pencil2: (铅笔)                        | `:pencil2:`                  | 修复 typo
:construction: (施工)                   | `:construction:`               | 工作进行中
:construction_worker: (工人)            | `:construction_worker:`      | 添加 CI 构建系统
:green_heart: (绿心)                    | `:green_heart:`              | 修复 CI 构建问题
:lock: (锁)                             | `:lock:`                     | 修复安全问题
:whale: (鲸鱼)                          | `:whale:`                    | Docker 相关工作
:apple: (苹果)                          | `:apple:`                    | 修复 macOS 下的问题
:penguin: (企鹅)                        | `:penguin:`                  | 修复 Linux 下的问题
:checkered_flag: (旗帜)                 | `:checked_flag:`             | 修复 Windows 下的问题


最后附上gitmoji网站

[https://gitmoji.carloscuesta.me](https://gitmoji.carloscuesta.me/)



以及github支持的表情超市

[https://www.webfx.com/tools/emoji-cheat-sheet](https://www.webfx.com/tools/emoji-cheat-sheet)


## git实用命令

```bash
git rebase -i HEAD~4 合并commit 的记录
git clone --depth=1
git log
git reflog
git remote -v :查看仓库源
git checkout -b [name]:创建并切换
git reset -–hard ID :回退代码   git reset --hard origin/master 可以用来清空本地的代码
git merge [name] :合并分支
git branch -l :查看本地分支
git branch -r :查看远程分支
git branch -a :查看全部分支（远程的和本地的）
git branch -m dev develop   :换本地分支名字，然后删除远程的，提交下就可以同步更新
git branch -d （分支名称） :可以删除本地分支（在主分支中）
git push origin --delete [name] :删除线上的分支
git checkout -- <file>  :丢弃工作区的修改
git checkout .  :本地所有修改的。没有的提交的，都返回到原来的状态
git blame src/pages/item/ItemTable/ItemTable.js  :查看当前谁修改过代码
git reset HEAD <file>  :当你不但改乱了工作区某个文件的内容，还添加到了暂存时，想丢弃修改
git commit --amend -m'新提交消息'  :提交信息出错`
git stash  :储藏
git stash pop  :删除当前储藏
git  config --global  user.name 'wk'  :修改git的用户名 
git  config --global  user.email 'python.wangke@gmail.com'  :修改git的邮箱
git config –-list   ：查看信息
git config --global credential.helper cache  :设置记住密码（默认15分钟）
git config credential.helper 'cache --timeout=3600'  :设置记住密码（1h）
git config --global credential.helper store :永久
```




## git revert 和 git reset 的区别

- `git revert`是用一次新的commit来回滚之前的commit，`git reset`是直接删除指定的commit。

- 在回滚这一操作上看，效果差不多。但是在日后继续merge以前的老版本时有区别。因为`git revert`是用一次逆向的commit“中和”之前的提交
，因此日后合并老的branch时，导致这部分改变不会再次出现，但是`git reset`是之间把某些commit在某个branch上删除，
因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。

- `git reset` 是把HEAD向后移动了一下，而`git revert`是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。

## 拉取代码 git pull --rebase

假设提交线图在执行 pull 前是这样的：

```bash
   A---B---C  remotes/origin/master
                /
           D---E---F---G  master
```

如果是执行 git pull 后，提交线图会变成这样：

```bash
 A---B---C remotes/origin/master
                /         \
           D---E---F---G---H master
```

结果多出了 H 这个没必要的提交记录。如果是执行 git pull --rebase 的话，提交线图就会变成这样：

```bash
  remotes/origin/master
                           |
           D---E---A---B---C---F'---G'  master
```

F G 两个提交通过 rebase 方式重新拼接在 C 之后，多余的分叉去掉了，目的达到

::: danger 注意：

git pull = git fetch + git merge

git pull --rebase = git fetch + git rebase

:::

## rebase合并分支

master分支,节点链表指向为: c1<--C3<--c4

dev分支，节点链表指向为: c1<--C2<--c5

master分支和dev分支祖先为c1,假定在master分支上做git merge dev合并，得到的提交历史为:

c1<--c2<--c3<--c4<--c5<--C6 (c1、 c4、 c5做了-次三方合并发现冲突,手工处理完毕后git add/commit增加了提交节点c6)

采用git merge dev处理提交log是按照时间戳先后顺序的。

假定采用的是git rebase处理过程为:

```js
git checkout dev
git rebase master //将dev上的c2、 c5在master分支 上做次衍合处理,并且保证在dev新增的commit 会排在 log 的最后
//git提示出现了代码冲突，此处为之前埋下的冲突点，处理完毕后
git add . //添加冲突处理后的文件
git rebase --continue  //单加上--continue参数让rebase继续处理 ，无需执行 git-commit 
//开发完成, 在 master 上用 mergin 合并dev,不会自动产生合并分支的 'commit'
```

[](https://imgssl.luxiaoquan.com/FtjtK3w9rjUXEip-hxjzSQhRSCSC?imageView2/2/w/640/interlace/1)

## git分支命名

master：主分支，负责记录上线版本的迭代，该分支代码与线上代码是完全一致的。

develop：开发分支，该分支记录相对稳定的版本，所有的feature分支和bugfix分支都从该分支创建。其它分支为短期分支，其完成功能开发之后需要删除

feature/*：特性（功能）分支，用于开发新的功能，不同的功能创建不同的功能分支，功能分支开发完成并自测通过之后，需要合并到 develop 分支，之后删除该分支。

bugfix/*：bug修复分支，用于修复不紧急的bug，普通bug均需要创建bugfix分支开发，开发完成自测没问题后合并到 develop 分支后，删除该分支。

release/*：发布分支，用于代码上线准备，该分支从develop分支创建，创建之后由测试同学发布到测试环境进行测试，测试过程中发现bug需要开发人员在该release分支上进行bug修复，所有bug修复完后，在上线之前，需要合并该release分支到master分支和develop分支。

hotfix/*：紧急bug修复分支，该分支只有在紧急情况下使用，从master分支创建，用于紧急修复线上bug，修复完成后，需要合并该分支到master分支以便上线，同时需要再合并到develop分支。

## gitlab的key

ssh-keygen -t rsa -C "feng960106@163.com"

cat ~/.ssh/id_rsa.pub

## 迁移 github

sed -i '' "s/115.28.166.109/123.57.86.216/g" .git/config

## git 无法添加文件夹下文件

最近做项目时，发现无法提交某个子文件夹下的文件。

google后发现可能是该子文件夹下有.git文件夹导致无法上传。

删除子文件夹下.git后，依然无法提交子文件夹下的文件。

继续google，

尝试以下方法：

 git rm --cached directory
 git add directory
 
**注：** directory为子文件夹的路径。

但是执行 git rm --cached directory 时，提示

> fatal: Unable to create 'xx/.git/index.lock': File exists.

执行 `rm -f xx/.git/index.lock` 后解决

## 扫盲 .git

```js
// .git
├COMMIT_EDITMSG  # 最新一次提交的备注信息(并不是HEAD所指备注)，git系统不会用到，给用户一个参考
├config # 配置文件，项目用户名、邮箱在该文件配置
├description # 仓库的描述信息，主要给gitweb等git托管系统使用
├FETCH_HEAD # 是一个版本链接，指向着目前已经从远程仓库取下来的分支的末端版本
├HEAD # 映射到ref引用，即当前commit对象哈希值。
├index # 该文件表示暂存区。
├ORIG_HEAD # 当前commit对象的前一个commit对象hash值，与logs/HEAD文件的最新一行的第一个hash值保持一致。
├<hooks> #Git执行特定事件（如commit、push、receive等）后触发运行的一些shell脚本。
│ ├applypatch-msg.sample
│ ├commit-msg.sample
│ ├fsmonitor-watchman.sample
│ ├post-update.sample
│ ├pre-applypatch.sample
│ ├pre-commit.sample
│ ├pre-merge-commit.sample
│ ├prepare-commit-msg.sample
│ ├pre-push.sample
│ ├pre-rebase.sample
│ ├pre-receive.sample
│ └update.sample
├<info> # 存放仓库的信息
│ └exclude
├<logs> # 保存所有更新的引用记录
│ ├HEAD # (切换前的commit对象hash值，切换后的commit对象hash值，切换者，切换者邮箱，切换时间，切换操作信息)
│ ├<refs>
│ │ ├stash
│ │ ├<heads> # 所有分支提交信息，保存每个分支的commit对象链
│ │ │ ├master # master分支的commit对象链
│ │ │ └testchanges # testchanges分支的commit对象链
├<objects> #对象目录，object有：commit、tree、blob、tag
│ ├<08>
│ │ └8aa22897a71f1ff5d34eedd8b30c35997a8ce8
│ ├<0b>
│ │ └20aead00e76e9afc1ee8775b2705c77e790cf6
│ ├<12>
│ │ └d5be03b603f88bc9611979039e58848afa647b
│ ├<14>
│ │ └ed3a8427cc35eec36784d7579db54646b098e9
│ ├<15>
│ │ └aa63597ef2de8f3574b2258a912c8ab63d0694
│ ├<info>
│ └<pack>
├<refs> #commit/tree/blob/tag对象的引用
│ ├stash
│ ├<heads> # 当前分支的当前head指针，便于分支切换
│ │ ├master # master分支当前head指针
│ │ └testchanges # testchanges分支当前head指针
│ ├<tags> # 保存所有的标签哈希值
│ │ └first # 保存first标签的哈希值
│ │ └fsecond # 保存second标签的哈希值
```

## git获取最后一次提交的的时间和commit id

**获取最后一次commit的时间**

git show --pretty=format:"%ci %cr" | head -1

2022-05-11 14:54:23 +0800 37 minutes ago



**获取最后一次提交的commit Id**

git rev-parse HEAD

31cab83b6cc7b844dc407291d47ac72f1d495690

**获取最后一次提交的short commit Id**

git rev-parse --short HEAD

31cab83b6


## git怎么删除所有tag

```nginx
# 只能在终端用   命令后面有个空格

远端：  git tag|grep "2022"|xargs git push origin --delete tag  

本地：  git tag|grep "2022"|xargs git tag -d 
```



删除本地tag

git tag -d $(git tag -l)


拉取远程tag

git fetch

删除远程tag

git push origin --delete $(git tag -l) 


删除本地tag

git tag -d $(git tag -l)


获取最后一次 tag 的名称 

git describe --abbrev=0


## git放弃本地文件修改

**未使用git add 缓存代码**

使用git checkout -- 文件名，注意中间有  -- 

```js
git checkout -- filename
```

放弃所有文件修改 git checkout .

```js
git checkout .
```



此命令用来放弃掉所有还没有加入到缓存区（就是 git add 命令）的修改：内容修改与整个文件删除。
此命令不会删除新建的文件，因为新建的文件还没加入git管理系统中，所以对git来说是未知，只需手动删除即可。



**已使用git add 缓存代码，未使用git commit**

使用 git reset HEAD 文件名

```js
git reset HEAD filename
```

放弃所有文件修改 git reset HEAD

```js
git reset HEAD
```

此命令用来清除 git 对于文件修改的缓存。相当于撤销 git add 命令所在的工作。在使用本命令后，本地的修改并不会消失，而是回到了第一步 **1. 未使用git add 缓存代码，继续使用用git checkout --filename，就可以放弃本地修改**。

**已经用 git commit 提交了代码**

使用 git reset --hard HEAD^ 来回退到上一次commit的状态。

```js
git reset --hard HEAD^
```


或者回退到任意版本git reset --hard commit id ，使用git log命令查看git提交历史和commit id。

```js
git reset --hard commit id

```

## git diff 

git diff 命令可以对比两个版本的差异，具体来说包括：

- 本地工作区和暂存区的diff信息：git diff 或者 git diff file

- 暂存区和版本库的diff信息（使用git add 将工作区修改保存到了暂存区后）：git diff --cached

- 版本库中不同commit、分支的diff信息（使用git commit 将暂存区修改提交到了版本库）：git diff commit1 commit2 或 git diff branch1 branch2

- 可以查看最近一次提交的版本与往过去时间线前数X个的版本之间的所有文件之间的增删改   git diff HEAD~X 或 git diff HEAD^1

**如何使git diff写入stdout**

    - git --no-pager diff

## git 切换分支 

如果本地分支已经存在，你可以使用以下命令来切换到该分支：

```js
git checkout branch-name
```

如果你想要从远程分支创建一个新的本地分支，并且不确定本地是否已经存在该分支，那么可以使用以下命令来实现：

```js
git checkout -b branch-name origin/branch-name
```

如果你既不确定本地是否有这个分支，也不想进行区分，你可以使用以下命令：

```js
git checkout -B branch-name origin/branch-name
```

**git checkout 命令的 -B 选项和 -b 选项在使用上有一些区别：**

-b 选项（小写）：

使用方式：`git checkout -b <branch-name> [<start-point>]`
如果指定的分支名称不存在，会创建一个新的本地分支，并将当前分支切换到这个新分支。
如果指定的分支名称已经存在，会产生一个错误，阻止分支的创建。你需要先删除同名的分支，然后再创建新的分支。
可以选择性地提供 `<start-point>` 参数，它可以是提交哈希、分支名等，用于指定新分支的起始点。


-B 选项（大写）：

使用方式：`git checkout -B <branch-name> [<start-point>]`
无论指定的分支名称是否已经存在，都会创建一个新的本地分支，并将当前分支切换到这个新分支。
如果同名的分支已经存在，会强制覆盖该分支，不会产生错误。这意味着同名分支的本地更改会被覆盖，所以请谨慎使用。
可以选择性地提供 `<start-point>` 参数，用于指定新分支的起始点。

## mac系统sourceTree一直提示输入密码的问题
作为一个习惯使用 SourceTree 在 MacBook Pro 上提交代码的用户，我在 macOS 上安装了该应用程序。

然而，我发现每次提交代码都需要输入密码，这对我的效率和心情产生了不良影响。我花了很多时间尝试了网上提供的各种解决方法，但是遗憾的是，都无法解决这个问题。

这个密码输入的过程让我感到非常繁琐，

其实原因是因为没有拿到push的凭据 

解决办法：

1、git config credential.helper store

这将告诉 Git 使用一个简单的凭据存储方式来记住你的用户名和密码。

2、 git pull  拉下代码

在弹出的对话框中，依次输入你的用户名和密码。请注意，输入密码时不会显示任何字符，但你可以正常输入。

现在就可以 正常push了  

## Mac下SourceTree无法执行pre-commit的解决方案

问题背景
最近负责的Web项目中参与人数多了起来，很多人没法自觉地遵守编码规范、在提交代码之前不检查自己的代码格式，导致提交了代码之后无法通过流水线的代码质量检查。

我是mac环境下，由于使用了nvm，不能正确识别node路径，执行代码提交后，husky一直报错：

```
.husky/pre-commit: line 8: npm: command not found
```

查询husky官方文档才知道如何解决：

创建~/.huskyrc文件，增加对nvm路径的支持：

```nginx
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
