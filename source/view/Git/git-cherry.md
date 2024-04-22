---
abbrlink: 81fc7ad7
title: git恢复上一次的修改
date: 2019-02-11
categories: 
- git
---

<strong class='old-blog'>git恢复上一次的修改</strong>

[[toc]]

### 查看谁修改的代码 
```javascript{9}
git blame
比如多人协作的情况下线上出问题了，可以通过git blame清楚的知道是谁对文件进行了修改了。下面给出一个例子:

//(1)第一步进入到我们的本地git仓库
git branch -a
//(2)假如我们是要查看远程的daily/1.1.68分支的修改情况，执行下面的命令
git checkout  remotes/origin/daily/1.1.68
//(3)查看远程分支src/pages/item/ItemTable/ItemTable.js文件的修改
git blame src/pages/item/ItemTable/ItemTable.js
//(4)此时会显示每一行代码的修改者
```
    
### git log

```javascript{27,36}
git log

下面只是给出几种显示log的方式：
//压缩模式，在每个提交的旁边显示经过精简的提交哈希码和提交信息，以一行显示
git log --oneline

//图形模式，使用该选项会在输出的左边绘制一张基于文本格式的历史信息表示图。如果你查看的是单个分支的历史记录的话，该选项无效
git log --graph

// 显示所有分支的历史记录
git log --all

```

### git reset & 撤回回退的代码

```javascript
git reflog + git cherry-pick

场景: 你提交了几个commit，然后用 git reset --hard 撤销了这些修改，接着你又意识到：你    希  望还原这些修改！
    原理: git reflog 对于恢复项目历史是一个超棒的资源。你可以恢复几乎任何东西 — 任何你commit 过的东西 — 只要通过 reflog。

你可能已经熟悉了 git log 命令，它*会显示commit的列表*。 git reflog 也是类似的，不过它显示的是一个*HEAD发生改变的时间列表*。

一些注意事项：

(1)它涉及的只是*HEAD的改变*。在你切换分支、用git commit进行提交、以及用 git reset撤销 commit时，HEAD会改变，但当你用 git checkout -- 撤销时(只是替换文件，分支不变)，HEAD 并不会改变 — 如前所述，这些修改从来没有被提交过，因此reflog 也无法帮助我们恢复它们。

(2)git reflog不会永远保持。Git 会定期清理那些 “用不到的” 对象。不要指望几个月前的提交还一直躺在那里。

(3)你的reflog就是你的，只是你的。你不能用 git reflog 来恢复另一个开发者没有 push 过的 commit。

下面我们演示一个例子:

//(1)第一次修改并提交
git add -A
git commit -m "1"

//(2)第二次修改和提交
git add -A
git commit -m "2"

//(3)第三次修改和提交
git add -A
git commit -m "3"

//(4)取消第三次提交
git reset --hard HEAD~1
//注意：此时运行git log会没有第三次提交的log信息，但是reflog却可以看到HEAD指针的移动历史
下面我们看看git reflog的HEAD的改变历史:

如果我们要恢复上一次的修改只要执行如下的命令就可以了:

git cherry-pick 52e3fa6
//52e3fa6表示第三次的修改的hash
此时运行了git cherry-pick之后，我们通过git log可以看到第三次的提交信息了。
```

### Tag回退代码


```javascript{5,9,13,15}
git add .

git commit -m'1.0.0'

git tag v1.0.0 //打tag

git push -u origin master

git push origin --tags  or git push origin v1.0.0 //本地tag推送到线上

git tag  //查看所有的tag

git tag -d v1.0.0 //本地删除tag

git push origin :refs/tags/v1.0.0  //本地tag删除了，再执行该句，删除线上tag

git checkout v1.0.0 //切换tag,完成代码回退

git show 1.0.0  or git show v1.0.0^{tree}//查看相关信息

```

::: danger 特别注意
 通过标签回退版本后，尽量不要改动代码，如果一定要修改代码`必须马上拉一个分支`，然后当前的主干的分支立即回到原来的位置，否则正在开发的分支可能白干了，并且不能把改动的代码合并到主干，接着在刚拉的分支上改bug,修改完毕后合并在主干上
:::


`如果你通过标签回退版本后，立马改了当前的分支，很不幸你就成功的push不到Git上了，看提示的错误：`

```text
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
//更新被拒绝，因为远程包含您所做的工作,大致意思就是你之前的提交的那个库指向同一引用，且低于一个版本，要你集成远程更改
```
> 有如下几种解决方法：

**1：使用强制push的方法：**

git push -u origin [name] -f 

太暴力，峰哥不喜欢 ，这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

**2：push前先将远程repository修改pull下来**

git pull origin [name]

一般会让你解决冲突，然后还要merge一堆破事,不过这个冲突总是要解决的，你就看看是你解决还是等人来解决。

**3：若不想merge远程和本地修改，可以先创建新的分支：**

git checkout -b  [name]

然后git push -u origin [name]  万事大吉，实在不行后期你直接 git push origin --delete [name]不留痕迹
