---
abbrlink: e1208224
title: GraphQL
date: 2019-10-15
tags: GraphQL
categories: 
- Server
- GraphQL
---

<strong class='old-blog'>GraphQL</strong>

[[toc]]

### BFF —— Backend For Frontend

`BFF，即 Backend For Frontend（服务于前端的后端）,BFF 只是一种逻辑分层，而非一种技术`

<img style="
       width: 50%;
       transform: translateX(50%);
       "
       src='/assets/img/jiaohu.png'/>
       

此时为了保障多端的不同需求，需要为不同的平台写不同的 API 接口，
而每当值发生一些变化时，需要多段同时做出修改,这样的代价显然相当大。

于是，我们就需要 BFF 作为中间件。在这个中间件上我们将做一些业务逻辑处理

而当我们有了 BFF 这一层时，我们就不需要考虑系统后端的迁移。后端发生的变化都可以在 BFF 层做一些响应的修改。

<img style="
       width: 50%;
       transform: translateX(50%);
       "
       src='/assets/img/bff.png'/>

### GraphQL 语言设计中的必然性
 
```text{7}
查询语法跟查询结果相近（自定义接口数据的字段）

能精确查询想要的字段（请求你所要的数据不多不少）

能合并多个请求到一个查询语句（获取多个资源只用一个请求）

无接口版本管理问题（升级迭代几乎没影响）

代码即文档。

强大的开发者工具
```

[文档](https://graphql.cn/graphql-js/)

[博客](https://mp.weixin.qq.com/s/8FgP1LeO6eDd8xuIMGzIIA)



### react需要的技术栈

```javascript
apollo-boost 包含启动阿波罗客户端的所有依赖
react-apollo  视图层面的集合
graphql-tag  解析查询语句必须
graphql 也是解析查询语句

```
    
