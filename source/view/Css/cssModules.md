---
abbrlink: c22368c1
title: css的模块化
tag: css
date: 2018-01-20
---

<strong class='old-blog'>css的模块化</strong>

`1`. 关于less使用建议

    1、过渡的嵌套会导致很多问题发生，使代码变得更复杂，而且太过依赖于HTML结构，这样后面要覆盖样式需要依赖于"!important"，而这种方式又是我们尽量避免使用的一种
    
    2、嵌套层级不应该超过三层
    
    3、嵌套层级编译出来的CSS，要确保其简洁，可重用
    
    4、使用嵌套很有意义，但并不意味着无限级的嵌套
    
    
`2`.这玩意的好处

    解决CSS中的全局作用域问题。说白了就是解决不同页面样式冲突的问题
    保留了很好的组件复用性 （composes）
    很方便的按需加载

`3`.启用css modules 只需在webpack中使用css-loader，下面为less中使用


    `使用cssmodules后改变css,浏览器会自动刷新,因为他是基于对象的，之前直接写less的时候，需要手动的`

```javascript

//@Lynn 这里我开启自己编写的less文件的css modules功能 除了node_modules库中的less
//也就是可以过滤掉antd库中的样式
{
  test: /\.less$/,
  exclude: [/node_modules/],
  use: [
      require.resolve('style-loader'),
      {
          loader: require.resolve('css-loader'),
          options: {
              modules: true,
              localIndexName:"[name]__[local]___[hash:base64:5]"
          },
      },
      {
          loader: require.resolve('less-loader'), // compiles Less to CSS
      },
  ],
}


```



`4`.	在智慧社区里面使用：
    1. 对于局部css   采用[name]. module.[less | css]，

```javascript

//这个是在config/webpack.config.dev.js里面定义了
{
test: /\.less$/,
use: [
  require.resolve('style-loader'),
  ({resource}) => ({
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: /\.module\.less/.test(resource),
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  }),
  {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),
      ],
    },
  },
  {
    loader: require.resolve('less-loader'),
    options: {
      modifyVars: theme,
    },
  },
],
}

```

    2. 定义全局样式，直接在css|less文件加入:global：

```css
/* 定义多个全局样式 */
	:global {
	  .link {
	    color: green;
	  }
	  .box {
	    color: yellow;
	  }
	}
```


    3. 对于组件的引入

```
/* components/Button.css */
.base { /* 所有通用的样式 */ }

.normal {
  composes: base;
  /* normal 其它样式 */
}

.disabled {
  composes: base;
  /* disabled 其它样式 */
}
import styles from './Button.css';

buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
```




    4.css modules的局限：
    1.class名必须是驼峰形式，否则不能正常在js里使用 styles.table 来引用 对此的解决方法
  
```css
 className={styles['tree-component-header']

```
    2.由于css模块化是默认，当你希望使用正常的全局css时，需要通过:local 和 :global 切换，不方便
    3.所有的 className 都必须使用 {style.className} 的形式


    5.composes 关键词
    
```javascript
  //css
    .serif-font {
        font-family: Georgia,serif;
    }
    .display {
       composes: serif-font;
        font-size: 30px;
        line-height: 35px;
    }}
   //组件
   import styles from "./type.css";
   element.innerHTML = 
   `
       <h1 class={styles.display}>
           This is a heading
       </h1>`
       
   //浏览器
   <h1 class="_type__display_0980340 _type_serif_404840">
       This is a heading
   </h1>
```

`最后配上我自己设置的cssModules`

```javascript

 {
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
      {
        importLoaders: 2,
        modules: true,
          localIdentName: '[path][name]-[local]-[hash:base64:5]',
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
      'less-loader'
  ),
  sideEffects: true
 }
            
```

详情看：

`1`. [如何在react中使用antd+less+css modules](https://www.jianshu.com/p/51ff1c8be301)<br/>
`2`. [具体使用 结合classnames](https://zhuanlan.zhihu.com/p/20495964)<br/>
`3`. [CSS Modules 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20495964)