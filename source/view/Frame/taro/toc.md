---
abbrlink: f7f45104
title: 项目目录
date: 2019-07-01
categories: 
- FE框架 
- Taro
- 项目目录
---

<strong class='old-blog'>项目目录</strong>

[[toc]]

**以Taro为栗子**

```text
├─config   -- 配置文件(插件等)  
│      dev.js  --开发项目配置
│      index.js  --适用于开发和生产
│      prod.js   --生产项目配置
│      template.js  --node写的文件模板，直接构建
├─src  
│  │--app.tsx  --项目入口文件 
│  │--app.scss  -- 全局样式文件(会自动引入)  
│  │--global.tsx  -- 项目全局引入(可在里面引入一些全局用到的包)  
│  ├─assets  --资源文件  
│  ├─components    --系统通用组件
│  ├─layouts   -- 布局文件夹   
│  ├─models  --全局model(非全局的不能放到这个下面)  
│  ├─pages  --业务相关页面  
│  |业务中用到的页面建议按模块划分，注意大小写保持一致  
│  |如果用到model，注意增加models文件夹 model的namespace得全局唯一，建议按文件夹层级命名  
│  |
│  ├─service  -- 服务方法 
│  │      api.ts --request的二次封装
│  │      global.service.ts   --全局用到的接口
│  │      config.default.ts  --状态码和生产开发域名的配置
│  ├─dev  --开发专用的一些快捷方式
│  ├─bases  -- 底层框架的封装
│  ├─types  --系统中用到的一些类型定义    
│  ├─utils  --辅助方法
│  │      lodash.ts  --权限辅助方法  
│  │      storage.ts  --本地存储的一些方法
│  │      index.ts  --通用辅助方法(导入的时候 import {xx} from '@/utils'即可)  
│  │      docs.ts   --一些状态展示用的方法
│  │      constants.ts  --定义的一些常量
│  │      regexp.ts --正则相关辅助方法   
│  │      router.ts --路由相关的方法
│  └─
└─project.config.json --微信小程序的配置
└─project.swan.json --百度智能小程序
└─project.tt.json --头条小程序的配置
└─project.quickapp.json --快应用
└─project.qq.json --QQ小程序
```
