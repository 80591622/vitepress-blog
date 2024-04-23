
# RN基本用法

## React Native区分安卓/iOS平台

[特定平台代码](https://reactnative.cn/docs/platform-specific-code/)

```javascript
import { Platform } from 'react-native';
JSON.stringify(Platform)

{"OS":"android","Version":25,"is Testing":false} 

```

## RN样式
```javascript
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  
});
```

```css
 //添加阴影
 shadowColor: '0px 6px 10px 0px rgba(0,0,0,0.1)',
 shadowOffset: {width: 1, height: 1},
 shadowOpacity: 0.1,

 //平移
 transform: [{translateY: 100}],

 //边框
 borderColor: '#F4F4F4',
 borderWidth: 1,
 
 //圆角       
 borderTopLeftRadius: 20,
 borderTopRightRadius: 20,
 borderBottomRightRadius: 20,
 borderBottomLeftRadius: 20,

```

## RN带有点击事件的标签

```javascript
//没有任何视觉反馈,只支持一个子节点（不能没有子节点也不能多于一个),如果你希望包含多个子组件，可以用一个View来包装它们。
 <TouchableWithoutFeedback onPress={() => {}}/>
 
//封装的视图的不透明度会降低,默认为0.2
<TouchableOpacity
 style={styles.button}
 onPress={()=>{}}
 activeOpacity={0-1,默认0.2}
>
  <Text> Touch Here </Text>
</TouchableOpacity>

//封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。
 <TouchableHighlight
  activeOpacity={0-1,默认为0.85}
  underlayColor={'#ccc'}
  onPress={this._onPressButton}
  >
  <FastImage
    style={styles.button}
    source={require('./myButton.png')}
  />
</TouchableHighlight>
```

##  输入框

[textinput](https://reactnative.cn/docs/textinput/)
```javascript
<TextInput
     style={styles.postTitle}
     autoFocus
     multiline
     underlineColorAndroid='transparent'
     placeholder='欢迎您的意见和建议…'
     placeholderTextColor='#9B9B9B'
     value={note}
     onChangeText={setPostTitle}
/>

//居顶显示
textAlignVertical: 'top'
```

## 获取盒子的位置信息

```javascript
 layout = () => {
    const handle = findNodeHandle(this.progressBar);

    new Promise((resolve) => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            resolve({
                x,
                y,
                width,
                height,
                pageX,
                pageY
            });
        });
    }).then((val) => {
        console.log(val);
    })
};
    

<View ref={(c) => {
   this.progressBar = c
}} onLayout={this.layout} />
                
```


## 页面通信

**方法一:callback函数刷新**

```javascript

//接收页面
_onPressBack=()=>{
    this.props.navigation.navigate('list',{
        refresh:()=>{
         this._refresh();
        },
    })
};
_refresh=()=>{
    console.log('refresh')
    alert('刷新哈!')
};
    

<TouchableOpacity onPress={this._onPressBack} activeOpacity={0.8}>
    <FastImage source={backIcon} style={styles.backIcon}/>
</TouchableOpacity>



//发送页面

const goBack=()=>{
     this.props.navigation.goBack();
     this.props.navigation.state.params.refresh();
};

<TouchableOpacity onPress={goBack} activeOpacity={0.8}>
    <FastImage source={backIcon} style={styles.backIcon}/>
</TouchableOpacity>

```

**方法二:发送通知DeviceEventEmitter刷新**

```javascript
//接收页面
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';


 componentDidMount() {
    this.queryList();

    this.refreshSubScription = DeviceEventEmitter.addListener('refresh', ({refresh}) => {
        if (refresh) {
            this.queryList();
        }
    })
}

componentWillUnmount() {
    this.refreshSubScription.remove();
}

//发送页面
const goBack=()=>{
    DeviceEventEmitter.emit('refresh', {
        'refresh': true,
    });
    NavigationService.goBack()
};

<TouchableOpacity onPress={goBack} activeOpacity={0.8}>
    <FastImage source={backIcon} style={styles.backIcon}/>
</TouchableOpacity>

```



## RN插件

```javascript
import {TabView} from "react-native-tab-view";    //tab切换组件
```
```javascript
import LinearGradient from 'react-native-linear-gradient'    //渐变色插件

<LinearGradient
  colors={['#FE6E50', '#FF4542']}
  start={{x: 0, y: 0}}
  end={{x: 1, y: 0}}
>
  <Text style={styles.sure_text}>---</Text>
</LinearGradient>
```             
   
```javascript          
import FastImage from "react-native-fast-image";   //图片的组件

<FastImage source={本地?本地:{uri:url}} style={styles.img}/>
``` 

```javascript
import DeviceInfo from 'react-native-device-info'; //获取设备的信息

async componentWillMount() {
    await console.log('api版本:', DeviceInfo.getAPILevel());
    await console.log('品牌:', DeviceInfo.getBrand());
    await console.log('当前应用名称:', DeviceInfo.getApplicationName());
    await console.log('应用编译版本号:', DeviceInfo.getBuildNumber());
    await console.log('获取应用程序包标识符:', DeviceInfo.getBundleId());
    await console.log('运营商名称:', DeviceInfo.getCarrier());
    await console.log('设备所处国家:', DeviceInfo.getDeviceCountry());
    await console.log('设备ID:', DeviceInfo.getDeviceId());
    await console.log('设备地区:', DeviceInfo.getDeviceLocale());
    await console.log('设备名称:', DeviceInfo.getDeviceName());
    await console.log('获取应用初始安装时间:', DeviceInfo.getFirstInstallTime());
    await console.log('设备字体大小:', DeviceInfo.getFontScale());
    await console.log('剩余存储容量(字节):', DeviceInfo.getFreeDiskStorage());
    await DeviceInfo.getIPAddress().then(res => {
        console.log('设备当前网络地址IP:', res);
    });
    await console.log('应用程序实例ID:', DeviceInfo.getInstanceID());
    await console.log('获取应用上次更新时间:', DeviceInfo.getLastUpdateTime());
    await DeviceInfo.getMACAddress().then(res => {
        console.log('网络适配器MAC地址:', res);
    });
    await console.log('设备制造商:', DeviceInfo.getManufacturer());
    await console.log('获取JVM试图使用的最大内存量(字节):', DeviceInfo.getMaxMemory());
    await console.log('获取设备模式:', DeviceInfo.getModel());
    await console.log('获取电话号码:', DeviceInfo.getPhoneNumber());
    await console.log('获取应用程序可读版本:', DeviceInfo.getReadableVersion());
    await console.log('设备唯一序列号:', DeviceInfo.getSerialNumber());
    await console.log('获取系统名称:', DeviceInfo.getSystemName());
    await console.log('获取系统版本:', DeviceInfo.getSystemVersion());
    await console.log('系统时区:', DeviceInfo.getTimezone());
    await console.log('完整磁盘空间大小(字节):', DeviceInfo.getTotalDiskCapacity());
    await console.log('设备总内存(字节):', DeviceInfo.getTotalMemory());
    await console.log('设备唯一ID:', DeviceInfo.getUniqueID());
    await console.log('设备用户代理:', DeviceInfo.getUserAgent());
    await console.log('设备版本:', DeviceInfo.getVersion());
    await console.log('用户偏好是否设置为24小时格式:', DeviceInfo.is24Hour());
    await console.log('程序是否允许在模拟器中:', DeviceInfo.isEmulator());
    await console.log('是否是平板电脑:', DeviceInfo.isTablet());
}
```

```javascript
import {BoxShadow,BorderShadow} from 'react-native-shadow'     //解决安卓阴影
```

```javascript
import ProgressBar from 'react-native-progress/Bar'; //进度条

<ProgressBar
    color={'red'}
    animated={true}
    width={width}
    height={2}
    borderWidth={0}
    progress={progress} //0-1
/>
```

```javascript
import { NavigationEvents ,NavigationActions , StackActions，withNavigation } from 'react-navigation';

onWillFocus={payload => console.log('will focus')}//将要被点击
onDidFocus={payload => this.imagePicker() }//被点击
onWillBlur={payload => console.log('will blur', payload)}//将要离开
onDidBlur={payload => console.log('did blur', payload)}//离开

//清空所有的路由
 const resetAction = StackActions.reset({
   index: 1,
    actions: [
        NavigationActions.navigate({routeName: "Tab"}),
        NavigationActions.navigate({routeName: "LoginPage"}),
    ],
});
navigation.dispatch(resetAction);
//navigation在pages声明过得页面才会添加，否则可以用withNavigation(Index)高阶下

```

##  屏蔽黄屏
 
```javascript
import { YellowBox} from 'react-native'

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
    'Module AudioRecorderManager requires main queue setup',
    'Module RCTVideoManager requires main queue setup',
    'Class RCTCxxModule was not exported',
    'RCTBridge required dispatch_sync to load RCTDevLoadingView.',
    'Require cycle:'
]);
```

## 阻止安卓快速双击退出应用

**需求**
- 需要监听安卓的返回键，点击安卓返回键的时候可以正常返回
- 但是当在tabs的几个页面中按返回键做如下的几个处理
   - 如果在首页tab，那么在连续点击两次返回键后退出应用
   - 在其他tab，按返回键不做处理

**app.js**
```javascript
import {
  Platform,
  BackHandler
} from 'react-native';


 componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress',this.onAndroidBackPress);
    }
  }


 //BACK物理按键监听
  onAndroidBackPress = () => {
    console.log(store.dataFixStore.route)
    const {route} = store.dataFixStore;
 
    if (route != 'Home') {
      return true;//true 表示返回上一页
    }else {
      if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
          return false;       
       }
        //最近0.5秒内按过back键，可以退出应用。
      this.lastBackPressed = Date.now();
      return true;
    }
  }
  
```
**Home.jsx**

```javascript
return  
    <View>
        <NavigationEvents
            onDidFocus={ ()=>{
              //使用redux把带有tab的页面存起来，如果有对应的就让其回到桌面
                 dispatch({
		            type: "setRouter/changeItem",
		            payload: {
		                router: 'Home'
                    }
                 });
              }}
            />    
   </View>
)

```

## 禁止IOS返回手势

```javascript
//禁止所有页面手势返回
const RootStackNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Main: {
      screen: MainDrawerNavigator
    }
  },
  {
    index: 0,
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
 
// 禁用某个页面的手势
static navigationOptions = {
     ...
     gesturesEnabled: false,
}
```
