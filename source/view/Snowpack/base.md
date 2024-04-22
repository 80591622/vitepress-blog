---
abbrlink: d3djjchh
title: snowpack
date: 2021-05-16
categories: 
- Snowpack
---

<strong class='old-blog'>snowpack</strong>

[[toc]]

[github 18k](https://github.com/snowpackjs/snowpack)


### 放弃 webpack 使用 snowpack 构建 vue2 



vue不建议使用snowpack ，直接使用vite

```javascript
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  mode: "development",
  mount: {
    public: "/",
    src: "/_build_",
  },
  plugins: [
    [
      "@snowpack/plugin-webpack",
      {
        manifest: true,
        extendConfig: (config) => {
          config.plugins.push(
            // 生产模式  下面 plugins 为了测试
            new ProgressBarPlugin(),
            new CompressionWebpackPlugin({
              filename: "[path].gz[query]", // 压缩后的文件策略
              algorithm: "gzip", // 压缩方式
              test: /\.(js|css|html|svg)$/, // 可设置需要压缩的文件类型
              threshold: 10240, // 大于 10 kb 的文件启用压缩
              minRatio: 0.8, // 压缩比率大于等于0.8时不进行压缩
              deleteOriginalAssets: false, // 是否删除压缩前的文件，默认false
            }),
          );
          console.log(1212, config);
          return config;
        },
      },
    ],
    // "@snowpack/plugin-vue", // 仅支持 vue3
    "snowpack-vue2-plugin",
    "@snowpack/plugin-sass",
    "@snowpack/plugin-dotenv", // 环境变量
  ],
  devOptions: {
    port: 9988,
  },
  env: {
    ...process.env, // 环境变量
    API_URL: "api.google.com",
  },
  alias: { // 别名
    vue: "vue/dist/vue.esm.js",
    src: "./src",
    "@": "./src",
    assets: "./src/assets",
  },
};
```

打包后的文件格式

```tex
├── _build_ // 这里是开发使用  直接使用esm
│   ├── app.vue.css
│   ├── app.vue.css.proxy.js
│   ├── app.vue.js
│   ├── assets // 静态资源要使用import导入才能用
│   │   ├── css
│   │   │   ├── base.css
│   │   │   └── common.css
│   │   └── images
│   │       ├── logo.svg
│   │       └── logo.svg.proxy.js 
│   └── main.js
├── _snowpack // _snowpack 会识别当前引入的包，打包到一块
│   ├── env.js
│   └── pkg
│       ├── import-map.json
│       └── vue
│           └── dist
│               └── vue.esm.js
| // 下面是生产模式用的
├── asset-manifest.json
├── asse─ asse打包ao├─ao─ asse─ asse打包ts
│   └── logo-0bd12d7f66941cb709a7916ed3711b83.svg
├── css
│   └── styles.54be0dbcaf3903e9ecf0.css
├── favicon.ico
├── index.html
├── js
│   ├── main.c7209184f49f325aa215.js
│   ├── styles.8c0579408b74c01eb83f.js
│   └── webpack-runtime.0ec3dfa59e6510ed107b.js
└── logo.svg
```



_ snowpack _ 文件夹里面包含的是snowpack脚手架自身包含的：其中env.js 是环境变量的配置文件，文件带hmr的项目热更新的配置文件。
_ dist _ 里面包含的页面应用到的js,css 等其他资源文件，就是app.vue里面的东西。

### 不足

- vue2热加载不兼容，官方非常微妙的表明了一点*Vue（仅适用于HMR）*，这意味着Vue不支持*快速刷新*（仅完全重新加载） 
- 使用了 ESM 不支持require，报错  `require is not defined`

- 页面报错后  hmr就会大概率失效
- 引入ui 库 会报出静态资源404的问题



### 参考文档

[文档 需翻墙](https://www.snowpack.dev/reference/configuration#mode)

[hmr 暂时没找到兼容vue2的 hmr](https://www.snowpack.dev/concepts/hot-module-replacement)