
# 自定义事件

## dispatchEvent

**已废弃**

[initEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

## createEvent()

`createEvent()`方法返回新创建的Event对象，支持一个参数，表示事件类型，具体见下表：

| 参数        | 事件接口   | 初始化方法       |
| ----------- | ---------- | ---------------- |
| HTMLEvents  | HTMLEvent  | initEvent()      |
| MouseEvents | MouseEvent | initMouseEvent() |
| UIEvents    | UIEvent    | initUIEvent()    |



## initEvent()

`initEvent()`方法用于初始化通过`DocumentEvent`接口创建的Event的值。

支持三个参数：`initEvent(eventName, canBubble, preventDefault)`
 分别表示：

- 事件名称
- 是否可以冒泡
- 是否阻止事件的默认操作



## dispatchEvent()

`dispatchEvent()`就是触发执行了，`dom.dispatchEvent(eventObject)`
 参数`eventObject`表示事件对象，是`createEvent()`方法返回的创建的`Event`对象。


```javascript
/*TODO: 基于浏览器原生事件做通信*/
// 创建
window.evt = document.createEvent("HTMLEvents");
// 初始化
window.evt.initEvent("handleData", false, false);
// 监听
document.addEventListener('handleData', this.handelData, false);
// 触发事件
document.dispatchEvent(ev);
```


## Event (单向)

[Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

**语法**

```javascript
event = new Event(typeArg, eventInit);

1. typeArg 事件名称
2. eventInit
  "bubbles"，可选 默认值为 `false`，表示该事件是否冒泡。
  "cancelable"，可选 默认值为 `false`， 表示该事件能否被取消。
  "composed"，可选 默认值为 `false`，指示事件是否会在影子DOM根节点之外触发侦听器。


const ev = new Event("look", {"bubbles":true, "cancelable":false});

// 监听事件
document.addEventListener('look', function (e) { ... }, false);
    
// 触发事件
document.dispatchEvent(ev);
// 事件可以在任何元素触发，不仅仅是document
myDiv.dispatchEvent(ev);
```



## CustomEvent（多向）

[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

`CustomEvent` 可以创建一个更高度自定义事件，还可以附带一些数据，具体用法如下：



```javascript
var myEvent = new CustomEvent(eventname, options);
其中 options 可以是：
{
  detail: {
    ...
  }, // 初始化事件时传递的所有数据。
  bubbles: true,    //是否冒泡
  cancelable: false //是否取消默认事件
}
```



```javascript
// 父应用 
export default {
   mounted() {
      function createEvent(params, eventName = 'look') {
        // 数据必须挂载到detail上
        return new CustomEvent(eventName, {detail: params});
      }
      // 初始化
      window.cEvt = createEvent({handelData: this.handelData});
    },
    methods: {
      handelData(...opt) {
        this.ary.push(...opt)
        // 去重
        this.ary = _.uniqWith(this.ary, _.isEqual);
        return this.ary
      }
    }
}
// 子应用
export default {
   methods: {
     queryData({detail: {handelData}}) {
       // 返回当前传入的值
       const data =  handelData({ary: [1, 2, 3, 4], msg: '子传父'});
     },
     dispatchData() {
       // 子应用触发当前函数
       document.addEventListener('look', this.queryData);
       // 发起事件
       document.dispatchEvent(window.cEvt);
     },
   },
   mounted() {
      // 移除事件监听器。
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('look', this.queryData);
      })
   },
}
```