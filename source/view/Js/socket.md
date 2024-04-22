---
abbrlink: 20dd34b7
title: WebSocket & socket.io
date: 2018-01-16
categories: 
- JS
- WebSocket & socket.io
---

<strong class='old-blog'>WebSocket & socket.io</strong>

[[toc]]

**前言**

大家参与的项目里多少都会有web server与browser需要长连接互联的场景，
比如即时通讯、即时报价等，为了解决这个问题，便出现了 WebSocket 协议，实现了客户端和服务端双向通信的能力。
介绍 WebSocket 之前，还是让我们先了解下轮询实现推送的方式。

### 短轮询（Polling）

短轮询的实现思路就是浏览器端每隔几秒钟向服务器端发送 HTTP 请求，服务端在收到请求后，
不论是否有数据更新，都直接进行响应。在服务端响应完成，就会关闭这个 TCP 连接，
代码实现也最简单，就是利用 XHR ， 通过 setInterval 定时向后端发送请求，以获取最新的数据

```javascript
setInterval(function() {
  fetch(url).then((res) => {
      // success code
  })
}, 3000);

```

- 优点：实现简单。
- 缺点：会造成数据在一小段时间内不同步和大量无效的请求，安全性差、浪费资源。

### 长轮询（Long-Polling）

当服务器收到客户端发来的请求后,服务器端不会直接进行响应，而是先将这个请求挂起，
然后判断服务器端数据是否有更新。如果有更新，则进行响应，如果一直没有数据，则到达一定的时间限制(服务器端设置)才返回。
客户端JavaScript响应处理函数会在处理完服务器返回的信息后，再次发出请求，重新建立连接。

```javascript
function queryData(){
    fetch(url).then((res) => {
        queryData()
    })
}
```

- 优点：比 Polling 做了优化，有较好的时效性。
- 缺点：保持连接挂起会消耗资源，服务器没有返回有效数据，程序超时。



轮询与长轮询都是基于HTTP的，两者本身存在着缺陷:`轮询需要更快的处理速度；长轮询则更要求处理并发的能力`;
两者都是“被动型服务器”的体现:服务器不会主动推送信息，而是在客户端发送ajax请求后进行返回的响应。
而理想的模型是"在服务器端数据有了变化后，可以主动推送给客户端",这种"主动型"服务器是解决这类问题的很好的方案。Web Sockets就是这样的方案。


### WebSocket

WebSocket是Html5定义的一个新协议，与传统的http协议不同，该协议可以实现服务器与客户端之间全双工通信。简单来说，首先需要在客户端和服务器端建立起一个连接，这部分需要http。
连接一旦建立，客户端和服务器端就处于平等的地位，可以相互发送数据，不存在请求和响应的区别。

当客户端要和服务端建立 WebSocket 连接时，在客户端和服务器的握手过程中，客户端首先会向服务端发送一个 HTTP 请求，
包含一个**Upgrade 请求头** 来告知服务端客户端想要建立一个 WebSocket 连接。

```javascript
Connection: Upgrade
Sec-WebSocket-Accept: ZUip34t+bCjhkvxxwhmdEOyx9hE=
Upgrade: websocket
```

WebSocket的优点是实现了双向通信，缺点是服务器端的逻辑非常复杂。现在针对不同的后台语言有不同的插件可以使用。

```javascript
import React,{useEffect} from "react";


const Index = (props) => {
    
    useEffect(()=>{
    ws = new WebSocket('ws://localhost:9000');
    // 监听连接成功
    ws.onopen = () => {
        console.log('连接服务端WebSocket成功');
        
        ws.send(JSON.stringify(msgData));	// send 方法给服务端发送消息
    };

    // 监听服务端消息(接收消息)
    ws.onmessage = (msg) => {
        let message = JSON.parse(msg.data);
        console.log('收到的消息：', message)
    };

    // 监听连接失败
    ws.onerror = () => {
        console.log('连接失败，正在重连...');
        connectWebsocket();
    };

    // 监听连接关闭
    ws.onclose = () => {
        console.log('连接关闭');
    };
    },[])
    
    return ();
};


export default Index;

```

#### 心跳检测

在实际使用 WebSocket 中，长时间不通消息可能会出现一些连接不稳定的情况，这些未知情况导致的连接中断会影响客户端与服务端之前的通信，

为了防止这种的情况的出现，有一种心跳保活的方法：客户端就像心跳一样每隔固定的时间发送一次 ping ，
来告诉服务器，我还活着，而服务器也会返回 pong ，来告诉客户端，服务器还活着。ping/pong,
其实是一条与业务无关的假消息，也称为心跳包。

可以在连接成功之后，每隔一个固定时间发送心跳包，比如 60s:

```javascript
setInterval(() => {
    ws.send('这是一条心跳包消息');
}, 60000)
```


<img style="border: .3em solid #e0dfcc;border-radius: 1em;width：98%"  src="https://ae01.alicdn.com/kf/H2ca9851f8d104b37bfe96f78b39e34966.png">

其中`绿色`箭头表示`发出`的消息，`红色`箭头表示`收到`的消息。


### Socket.IO

- 可靠性，Socker.IO基于engine.io实现，先建立长轮询连接后再升级为基于websocket全双工的长连接
- 自动重连与断连检查
- 多路传输/多种数据格式传输（这个和websocket特性一样)
- 广播机制（这个用法在开发上还是很方便的，开发同学不需要做太多额外的工作，broadcast函数即可，不用像自己实现websocket服务端一样要做topic和连接管理及并发推送的处理）


Socket.io允许你触发或响应自定义的事件，除了connect，message，disconnect这些事件的名字不能使用之外，你可以触发任何`自定义`的事件名称。

#### 建立连接

```javascript
const query = {
    admin_id: adminid().id,
    scenic_id: scenicid().id
};
this.socket = io(scenicAnalysis, {
    transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    query
});
 
this.socket.on('connect', () => {
    const {id} = this.socket;
    console.log('连接成功,', id);
});
```

#### 消息收发

```javascript
//发送数据
 this.socket.emit(`一般是后端定义的字段`, data);

//接收数据
this.socket.on(`一般是后端定义的字段`, (data) => {
     console.log(data);
});
```

#### 断开连接

```javascript
//断开
this.socket.close();
this.socket=null;

//检测是否断开
this.socket.on('disconnect', (msg: any) => console.log(msg));
//失败捕获
this.socket.on('error', (err: any) => console.log('error', new Error(err)))
```


### 适用场景

只从两个方面分析：

**易用性:** Socket.IO的易用性更好，对于前端开发来说，没有太多心智负担，比如需要关心重连、push转polling等容错逻辑; 服务端上也没有太多的连接管理的设计，Socker.IO已经打包处理了。

**灵活性:** 个人觉得websocket的灵活性更高一些，不管是前端还是后端，可以做更多的设计与优化，比如连接管理，容错重连，用户认证等，至少在提升技术能力上还是很有帮助。


### 参考文章

[基于 socket.io 快速实现一个实时通讯应用](https://juejin.im/post/5cbd154be51d456e442ff348)

[engine.io 原理详解](https://blog.csdn.net/u013243347/article/details/86661778)

