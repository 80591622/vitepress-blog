---
abbrlink: bbe844f9
title: github API 调用
date: 2019-07-19
tags: github
categories: 
- git
- github API 调用
---

<strong class='old-blog'>github API 调用</strong>

[[toc]]

### 基本访问

```javascript
curl https://api.github.com/users/wkvictory
```
- 个人主要信息`https://api.github.com/users/用户名`
- 个人所有repo。`https://api.github.com/users/用户名/repos`。会得到一个repo的JSON格式列表。
- repo详细信息。`https://api.github.com/repos/用户名/仓库名`。repo的路径就开始和个人信息不同了。
- 获取某文件的原始内容（Raw）。
  - 通过上面的文件信息中提取download_url这条链接，就能获取它的原始内容了。
  - 或者直接访问：`https://raw.githubusercontent.com/用户名/仓库名/分支名/文件路径`
- **repo中所有的commits列表。`https://api.github.com/repos/用户名/仓库名/commits`。**
- 某一条commit详情。`https://api.github.com/repos/用户名/仓库名/commits/某一条commit的SHA`
- **issues列表。`https://api.github.com/repos/用户名/仓库名/issues`。**
- 某条issue详情。`https://api.github.com/repos/用户名/仓库名/issues/序号`。issues都是以1,2,3这样的序列排号的。
- **某issue中的comments列表。`https://api.github.com/repos/用户名/仓库名/issues/序号/comments`。**
- 某comment详情。`https://api.github.com/repos/用户名/仓库名/issues/comments/评论详情的ID`。其中评论ID是从issues列表中获得的。

### 查询参数

- 分页功能。格式是`?page=页数&per_page=每页包含数量`。
- issues状态。格式是`?state=状态`。

### 权限认证 Authentication

我的项目一般私有的，直接获取没有权限，需要添加token

![](https://ae01.alicdn.com/kf/H0fec58c800544c24b103e00bf3f4e82aY.png)

**1.直接作为url中的参数传输**
```javascript
curl https://api.github.com/?access_token=OAUTH-TOKEN
```
**2.作为header中的参数传输**
```javascript
curl -H "Authorization: token OAUTH-TOKEN"
```
```javascript
fetch(`https://api.github.com/repos/wkvictory/file/commits?per_page=15&sha=develop`,
    {
        method: 'GET',
        headers: {
            'Authorization': 'token OAUTH-TOKEN'
        }
    }
  ).then(response => {
     if (response.ok) {
        this.show = false
        return response.json();
     }
     throw new Error('接口调取失败！');
 });
```
### 参考文档

[Github Api](https://segmentfault.com/a/1190000015144126)