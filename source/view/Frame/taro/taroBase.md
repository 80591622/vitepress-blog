---
abbrlink: 6b3651d0
title: Taro基本用法
date: 2019-07-01
categories: 
- FE框架 
- Taro
- Taro基本用法
---

<strong class='old-blog'>Taro基本用法</strong>

[[toc]]

### 常用的小方法

```javascript{1,4,10,17,22,27,32,35,42,47,52,57,63,67,72,77,92,102,109,123}
//运行时的尺寸转换
Taro.pxTransform(10) // 小程序：rpx，H5：rem

//tabbar右上角的数字
Taro.setTabBarBadge({
    index: 0,
    text: '1'
})

//弹框
 Taro.showToast({
    title: '成功',
    icon: 'loading',
    duration: 2000
});

//loading图
Taro.showLoading({
    title: '加载中...'
});

// 打电话
Taro.makePhoneCall({
    phoneNumber: '18331883557',
});

// 屏幕最亮 0-1
Taro.setScreenBrightness({
    value: 1
});

// 震动
Taro.vibrateShort() / Taro.vibrateLong()

//弹框
Taro.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000
});

//动态修改title
Taro.setNavigationBarTitle({
    title: '当前页面'
})

//底部对话框
Taro.showActionSheet({
     itemList: ["不感兴趣"]
})

//点击tabbar,仅weapp支持
onTabItemTap(res) {
    console.log(res);
}

//监听用户下拉刷新事件
onPullDownRefresh() 
需要在全局配置的 window 选项中或页面配置中开启 enablePullDownRefresh
Taro.startPullDownRefresh()//触发下拉刷新
Taro.stopPullDownRefresh()  //停止当前页面的下拉刷新

//上拉加载
onReachBottom()  
可以在全局配置的 window 选项中或页面配置中设置触发距离 onReachBottomDistance

//监听用户滑动页面事件
onPageScroll(res){
   console.log(res);
}

//滚定到顶部
Taro.pageScrollTo({
     scrollTop: 0
});

//转发按钮
onShareAppMessage(res) {
  if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
    }
    //imageUrl:'https://storage.360buyimg.com/mtd/home/111543234387022.jpg'
    return {
        title: '工作台',
        path: '/pages/functionArea/index',
    }
}
// 页面内部转发
<Button open-type="share" onClick={this.onShareAppMessage}>分享</Button>

//获取系统信息同步接口。
const res = Taro.getSystemInfoSync()
console.log(res.model)//手机型号
console.log(res.pixelRatio)//设备像素比
console.log(res.windowWidth)//可使用窗口宽度
console.log(res.windowHeight)//可使用窗口高度
console.log(res.language)//微信设置的语言
console.log(res.version)//微信版本号
console.log(res.platform)//客户端平台

// 打开设置页面
Taro.openSetting({
  success (res) {
    console.log(res.authSetting)
  }
})

 //向用户发起授权请求
 Taro.getSetting({ //查看用户授权结果
  success(res) {
    if (!res.authSetting['scope.userLocation']) {
      Taro.authorize({
        scope: 'scope.userLocation',
        success() {
          console.log('打开userLocation');
        }
      })
    }
  }
})

// 导航栏展示loading
Taro.showNavigationBarLoading(); // open
Taro.hideNavigationBarLoading(); // close
```

### 路由功能
```javascript
// 跳转到目的页面，打开新页面
Taro.navigateTo({
  url: '/pages/page/path/name',
  success:function,
  fail:function,
  complete:function
})

// 跳转到目的页面，在当前页面打开
Taro.redirectTo({
  url: '/pages/page/path/name'
})

//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
Taro.switchTab({
  url: '/pages/page/path/name'
})

//关闭当前页面，返回上一页面或多级页面
Taro.navigateBack({ delta: 2 })

//关闭所有页面，打开到应用内的某个页面
wx.reLaunch({
  url: 'test?id=1',
})
// 传入参数 id=2&type=test
Taro.navigateTo({
  url: '/pages/page/path/name?id=2&type=test'
})

//his.$router.params 获取到传入的参数
class C extends Taro.Component {
  componentWillMount () {
    console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
  }
}

//获取历史记录的条数
Taro.getCurrentPages()

```

### 组件的外部样式和全局样式

```javascript
//在taro 中
#a { } /* 在组件中不能使用 */
[a] { } /* 在组件中不能使用 */
button { } /* 在组件中不能使用 */
.a > .b { } /* 除非 .a 是 view 组件节点，否则不一定会生效 */

/* 该自定义组件的默认样式 支持 */
:host {
  color: yellow;
}
```

**外部样式类**

如果想传递样式给引用的自定义组件，直接传递 className）不可行，在react是可以的，在taro中：

`注意：externalClasses 需要使用 短横线命名法 (kebab-case)，而不是 React 惯用的 驼峰命名法 (camelCase)。否则无效。`

```javascript
/* CustomComp.js 子组件*/
export default class CustomComp extends Component {
  static externalClasses = ['my-class']

  render () {
    return <View className="my-class">这段文本的颜色由组件外的 class 决定</View>
  }
}
/* MyPage.js 父组件*/
export default class MyPage extends Component {
  render () {
    return <CustomComp my-class="red-text" />
  }
}
/* MyPage.scss 父组件的样式*/
.red-text {
  color: red;
}
```


### 使用taro注意事项

`1.必须声明 Taro 和组件`
```tex
即使变量 View 没有被调用，但也必须从 @tarojs/components 中引入声明。变量 Taro 也是一个必须引入声明的变量，因为我们在编译期和运行时会依赖这个变量做一些特殊处理。**当你引入了其他组件时，一定要使用，不要出现没有使用的变量**。

当你只用支持微信小程序时，可以不用引入组件例如 View 这样的声明。但我们仍然强烈推荐你在顶部引入你将要使用的组件，这样编辑器/IDE 能更好地提前发现可能出现的问题，也为将来可能需要的多端转换留有余地。

```

`2.首字母大写与驼峰式命名`
```tex
<home_page message="Hello World!" />  //不支持
<Home_Page message="Hello World!" />  //支持
<HomePage message="Hello World!" />   //支持
```

`3.JavaScript 表达式`
```tex
不能在包含 JSX 元素的 map 循环中使用 if 表达式;
解决方案:尽量在 map 循环中使用条件表达式或逻辑表达式。
```

```javascript
//不能在 JSX 参数中使用对象展开符
<View {...this.props} />
//解决
render () {
    const { id, title } = obj
    return <View id={id} title={title} />
}
```
`4.JS 编码必须用单引号`
```tex
在 Taro 中，JS 代码里必须书写单引号，特别是 JSX 中，如果出现双引号，可能会导致编译错误。
```
`5.组件传递函数属性名以 on 开头`
```javascript
//在 v1.3.0-beta.0 之后，自定义组件间的事件传递可以不用 on 开头，但内置组件的事件依然是以 on 开头的，为了一致性我们仍然推荐你以 on 开头命名你的事件。

// 在 Taro 中，父组件要往子组件传递函数，属性名必须以 on 开头
class Parent extends Component {
  handleEvent () {}
  render () {
    return (
      <Custom onTrigger={this.handleEvent}></Custom>
    )
  }
}
```
`6.小程序端不要在组件中打印传入的函数`
`7.小程序端不要在组件中打印 this.props.children`
`8.小程序端不要将在模板中用到的数据设置为 undefined`
```javascript
由于小程序不支持将 data 中任何一项的 value 设为 undefined ，在 setState 的时候也请避免这么用。你可以使用 null 来替代。
```
`9.组件 state 与 props 里字段重名的问题`
```tex
不要在 state 与 props 上用同名的字段，因为这些字段在微信小程序中都会挂在 data 上。
```
`10.小程序中页面生命周期 componentWillMount 不一致问题`
```javascript
//由于微信小程序里页面在 onLoad 时才能拿到页面的路由参数，而页面 onLoad 前组件都已经 attached 了。因此页面的 componentWillMount 可能会与预期不太一致。例如：
// 错误写法
render () {
  // 在 willMount 之前无法拿到路由参数
  const abc = this.$router.params.abc
  return <Custom adc={abc} />
}

// 正确写法
componentWillMount () {
  const abc = this.$router.params.abc
  this.setState({
    abc
  })
}
render () {
  // 增加一个兼容判断
  return this.state.abc && <Custom adc={abc} />
}
//对于不需要等到页面 willMount 之后取路由参数的页面则没有任何影响。
```
`11.环境变量 process.env 的使用`
```javascript
// 错误写法，不支持
const { NODE_ENV = 'development' } = process.env
if (NODE_ENV === 'development') {
  ...
}
// 正确写法
if (process.env.NODE_ENV === 'development') {
}
```
`12.要添加包裹的元素`
```javascript
const Block = (props) =>  props.children
const Block = (props) => <div>{props.children}</div>  // ✅
```

`13.小程序`
```tex
若使用 微信小程序预览模式 ，则需下载并使用微信开发者工具添加项目进行预览，此时需要注意微信开发者工具的项目设置
需要设置关闭 ES6 转 ES5 功能，开启可能报错
需要设置关闭上传代码时样式自动补全，开启可能报错
需要设置关闭代码压缩上传，开启可能报错
```

### 组件
> 跟react 基本保持一致


**使用 `this.$componentType` 来判断当前 `Taro.Component` 是页面还是组件**
`this.$componentType` 可能取值分别为 `PAGE` 和` COMPONEN`T，开发者可以根据此变量的取值分别采取不同逻辑。

`使用 PropTypes 检查类型`
```javascript
随着应用日渐庞大，你可以通过类型检查捕获大量错误。要检查组件的属性，你需要配置特殊的 propTypes 属性：

import PropTypes from 'prop-types';

class Greeting extends Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
Greeting.defaultProps = {
  name: 'word'
}
Greeting.propTypes = {
  name: PropTypes.string
};
```

### 事件处理 

`使用匿名函数` 自 v1.2.9 开始支持
<br/>
`柯里化` 自 v1.3.0-beta.1 开始支持
```javascript
handleClick = (index) => (e) => {
    e.stopPropagation()
    this.setState({
      currentIndex: index
    })
  }
```
`函数式组件`

```javascript
const App = () => {
  const [c1, setC1] = useState(0);
  const [c3, setC3] = useState(0);

  const increment = c => c + 1

  // 只有 useCallback 对应的 c1的值改变时，才会返回新的函数
  const increment1 = useCallback(() => setC1(increment), [c1]);
 

  return (<View>
    <Text> Counter 1 is {c1} </Text>
	<Text> Counter 3 is {c3} </Text>
    <View>
      <Button onClick={increment1}>Increment Counter 1</Button>
      <Button onClick={() => setC3(increment)}>Increment Counter 3</Button>
    </View>
  </View>)
}
```

`任何组件的事件传递都要以 on 开头` 在 v1.3.0-beta.0 之后，自定义组件间的事件传递可以不用 on 开头，但内置组件的事件依然是以 on 开头的，为了一致性我们仍然推荐你以 on 开头命名你的事件。

### 条件渲染

`if-else `
`逻辑运算符 &&`
`三元运算符（条件表达式）`
`枚举条件渲染` 第一次看到，感觉还挺好玩的
```javascript
function Loading (props) {
  const { loadingText, LOADING_STATUS, loadingStatus, onRetry } = props
  return (
    <View className='loading-status'>
      {
        {
          'loading': loadingText,
          'fail': <View onClick={onRetry}> 加载失败, 点击重试 </View>,
          'no-more': '没有更多了'
        }[loadingStatus] /** loadingStatus 是 `loading`、`fail`、`no-more`  其中一种状态 **/
      }
    </View>
  )
}
```

### Refs 引用

`使用字符串创建 ref`  此方法在react中已经废弃
```javascript
class MyComponent extends Component {
  componentDidMount () {
    // 如果 ref 的是小程序原生组件，那只有在 didMount 生命周期之后才能通过
    // this.refs.input 访问到小程序原生组件
    if (process.env.TARO_ENV === 'weapp') {
      // 这里 this.refs.input 访问的时候通过 `wx.createSeletorQuery` 取到的小程序原生组件
    } else if (process.env.TARO_ENV === 'h5') {
      // 这里 this.refs.input 访问到的是 `@tarojs/components` 的 `Input` 组件实例
    }
  }

  render () {
    return <Input ref='input' />
  }
}
```

`通过函数创建 ref`  **Taro推荐使用**

```javascript
class MyComponent extends Component {
  refCat = (node) => this.cat = node // `this.cat` 会变成 `Cat` 组件实例的引用
  render () {
    return <Cat ref={this.refCat} />
  }
}
```
`通过 createRef 创建 ref`

```javascript
class MyComponent extends Component {
  this.cat = Taro.createRef()
  componentDidMount(): void {
    this.cat.current
  }
  render () {
    return <Cat ref={this.cat} />
  }
}
```
### 内置环境变量

```javascript
//weapp / swan / alipay / h5 / rn / tt
process.env.TARO_ENV

//可以在 JSX 中使用，决定不同端要加载的组件
render () {
  return (
    <View>
      {process.env.TARO_ENV === 'weapp' && <ScrollViewWeapp />}
      {process.env.TARO_ENV === 'h5' && <ScrollViewH5 />}
    </View>
  )
}
```
**统一接口的多端文件**

内置环境变量虽然可以解决大部分跨端的问题，但是会让代码中充斥着逻辑判断的代码，影响代码的可维护性，而且也让代码变得愈发丑陋，为了解决这种问题, 开发者可以通过将文件修改成原 `文件名 + 端类型` 的命名形式 

**多端组件 👍**

假如有一个 Test 组件存在微信小程序、百度小程序和 H5 三个不同版本，那么就可以像如下组织代码
test.js 文件，这是 Test 组件默认的形式，编译到微信小程序、百度小程序和 H5 三端之外的端使用的版本
test.h5.js 文件，这是 Test 组件的 H5 版本
test.weapp.js 文件，这是 Test 组件的 微信小程序 版本
test.swan.js 文件，这是 Test 组件的 百度小程序 版本
四个文件，对外暴露的是统一的接口，它们接受一致的参数，只是内部有针对各自平台的代码实现

而我们使用 Test 组件的时候，引用的方式依然和之前保持一致，import 的是不带端类型的文件名，在编译的时候会自动识别并添加端类型后缀

```javascript
import Test from '../../components/test'

<Test argA={1} argA={2} />
```

### 小程序原生作用域获取

`this.$scope`

### 通用配置
```javascript
const config = {
  // 项目名称
  projectName: 'kj',
  // 项目创建日期
  date: '2018-6-8',
  // 设计稿尺寸
  designWidth: 750,
  // 项目源码目录
  sourceRoot: 'src',
  // 项目产出目录
  outputRoot: 'dist',
  // 通用插件配置
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']
    }
  },
  // 全局变量设置
  defineConstants: {},
  // 文件 copy 配置
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  // 小程序端专用配置
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240
          }
        }
      }
    },
    // 替换 JSX 中的属性名，参考：
    // https://github.com/NervJS/taro/issues/2077
    jsxAttributeNameReplace: {}
  },
  // H5 端专用配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    miniCssExtractPluginOption: {
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[name].[chunkhash:8].css'
    },
    imageUrlLoaderOption: {
        limit: 5000,
        name: 'static/images/[name].[hash:8].[ext]'
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    },
    //修改url的路径
    router: {
      mode: 'browser',
      customRoutes: {
        '/pages/login/index': '/login',
        '/pages/functionArea/index': '/functionArea',
        '/pages/personCenter/index': '/personCenter',
        '/pages/message/index': '/message',
        '/pages/ticketCode/index':'/ticketCode',
        '/pages/ticketList/index':'/ticketList',
        '/pages/activityCode/index':'/activityCode',
        '/pages/activityList/index':'/activityList',
        '/pages/activityVerify/index':'/activityVerify',
        '/pages/analysis/index':Analysis,
        '/pages/feedBack/index':'/feedBack',
        '/pages/set/index':'/set',
        '/pages/scenicList/index':'/scenicList',
        '/pages/selectPosition/index':'/selectPosition',
        '/pages/selectActivity/index':'/selectActivity',
        '/pages/codeResult/index':'/codeResult',
       }
    },
    // 自定义 Webpack 配置
    webpackChain: {},
     devServer: {
      "proxy": {
        "/api": {
          "target": "https://www.v2ex.com/api/",
          "changeOrigin": true,
          "secure": false,
          "pathRewrite": { "^/api": "" }
        }
      },
    }
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};

```

### 编译配置详情
> config目录下面的index

**defineConstants**
```
用来配置一些全局变量供代码中进行使用，例如：

defineConstants: {
  A: '"a"' // JSON.stringify('a')
}

```

**alias**
```javascript
alias: {
  '@': path.resolve(__dirname, '..', 'src')
}
```
```js
//为了让编辑器（VS Code）不报错，并继续使用自动路径补全的功能，需要在项目根目录下的 jsconfig.json 或者 tsconfig.json 中配置 paths 让编辑器认得我们的别名，形式如下：
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    }
  }
}
```

`但若要在 Sass 中使用别名，如 @styles 指向 src/styles：`

```css
@import "@styles/theme.scss";
```

```javascript
// config/index.js
plugins: {
  sass: {
    importer: function(url) {
      const reg = /^@styles\/(.*)/
      return {
        file: reg.test(url) ? path.resolve(__dirname, '..', 'src/styles', url.match(reg)[1]) : url
      }
    }
  }
}
//备注：目前资源引用时仍无法使用别名，如 background: url('@assets/logo.png')
```

还需要额外的配置（Taro 对样式的处理是 node-sass -> postcss，在 sass 这步就报错了，不能用 postcss-import 插件解决）：

### 通过环境变量实现 config 的多元控制

> package.json 

```javascript
"scripts": {
  "dev:weapp:mock": "MOCK=1 npm run dev:weapp"
}

//MOCK=1 可以在 config 中通过 process.env.MOCK 访问到
```

### demo

```typescript jsx
import Taro, { Component, PageConfig } from '@tarojs/taro';
class ReportList extends Component {

  /**
   * 指定config的类型声明为: Taro.PageConfig
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: PageConfig = {
    navigationBarTitleText: '可疑数据汇总',
    enablePullDownRefresh: true,   // 这个是启用下拉刷新特性
    backgroundTextStyle: "dark",   // 把显示的文本颜色改成暗色调,亮色的话.你背景不改看不到,因为同色
    backgroundColor:'#f7f7f7' // 页面的背景色
  }

}

// 启用后,记得加对应的条件关闭,不然会一直显示
 // 下拉刷新
 onPullDownRefresh = () :void => {
    // 这个loading是 导航栏,页面标题那块显示一个loading  , 微信内置的
    Taro.showLoading({
      title: 'loading....'
    })
    
    // 因为我的接口请求都是 async await的姿势,所以可以队列执行
    this.getList(); 
    this.unselect();
    
    // 接口请求完毕后隐藏两个loading , 标题和下拉区域
    Taro.hideLoading();
    Taro.stopPullDownRefresh();
  }
```
### 更新Taro 

```javascript{3,5,7,10,12,13}
//更新 Taro CLI 工具
taro
$ taro update self
npm
$ npm i -g @tarojs/cli@latest
yarn
$ yarn global add @tarojs/cli@latest

//更新项目中 Taro 相关的依赖
$ taro update project

$ taro info 打印的信息
$ taro doctor 诊断项目的依赖、设置、结构，以及代码的规范是否存在问题，并尝试给出解决方案。
```





### Taro的注意事项

 **1. 在H5端 周期函数里面使用动态修改tabbar的内容，会循环执行钩子函数**
 
 **2. taro路由在h5端 ，不能使用引用的变量**
```javascript
const method='navigateTo';
Taro[method]({
      url
})
//这种的在h5端，报错
//设置变量在h5下不能跳转，必须是Taro['navigateTo'] or Taro.navigateTo
```
**3. H5下ScrollView,只显示首屏，下面的都是空白,TaroUI里面overflow:hidden**

**4. cssModules 在字节头条里面，修改全局的样式必须声明在最外面**

**5. H5下:global{}后的样式，有污染的影响,前提是兼容tt**

 **6. TaroUI在路由组件里面可以修改全局的样式，但是拆分组件之后，就不能修改样式,h5下正常显示【cssModules】**
 
`小程序的 addGlobalClass 只能使 page 页面上的样式可以影响`

**7. 自定义若干个外部样式类 用 `static externalClasses = ['class-name-style'];`，然后传递给子组件** 

缺陷 `1.H5端不兼容;2.必须用小驼峰`

**8. 小程序拆包在tt下需要手动放到pages里面,在H5下正常显示**

**9. 阻止冒泡**
```javascript
//jsx
 {
   [1, 2, 3].map((item) => {
        return (
            <View key={item} onClick={this.parent(item)}>
                <Text>
                    我是父盒子{item}
                </Text>
                <View onClick={this.son(item)}>
                    <Text>
                        我是子盒子 {item}
                    </Text>
                </View>
            </View>
        )
    })
}
//方法
parent = (val) => () => {
     console.log('parent', val);
 };
 son = (val) =>（e）=> {
     e.stopPropagation();
     console.log('son', val);
 };
```

**函数式组件**

	H5
	  柯理化函数阻止冒泡成功
	  bind阻止冒泡成功
	  
	weapp
	  柯理化函数阻止冒泡失效
	  bind阻止冒泡失效

**类组件**

	H5
	柯理化函数阻止冒泡成功
	bind阻止冒泡成功
	
	weapp
	柯理化函数阻止冒泡失效
	bind阻止冒泡成功

**通用**

	1.普通的箭头函数,所有兼容，有局限性;
	2.行内阻止冒泡，写业务代码
	 
 **10. iconfont只能使用下载本地的方式,直接使用链接页面显示方框**
```javascript
 //三种使用方式
 <Text className={classNames('icon', 'icon-home', styles.setIcon)}/>

 <Text className={'icon'}>&#xe64e;</Text>

 <AtIcon prefixClass='icon' value='home' size='20' color='#fff'/>
```

**11. TaroUI在H5模式下编译报错**

请在 config/index.js 文件中添加如下配置项：
```javascript
h5: {
  esnextModules: ['taro-ui']
}
```
