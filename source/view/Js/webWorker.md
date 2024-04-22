
### Web Worker


JavaScript 语言采用的是`单线程模型`，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，就是为 JavaScript `创造多线程环境`，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。
这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

## Web Worker 有以下几个使用注意点

(1)**同源限制**<br/>
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
  
(2)**DOM 限制**<br/>
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document、window、parent`这些对象。
但是，Worker 线程可以`navigator对象和location`对象。

(3)**通信联系**<br/>
Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

(4)**脚本限制**<br/>
Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 `XMLHttpRequest` 对象发出 AJAX 请求。

(5)**文件限制**<br/>
Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。


## Worker用法

通常情况下，Worker 载入的是一个`单独的 JavaScript 脚本文件`，但是也可以载入与主线程在同一个网页的代码。

```html
<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message', function () {
        postMessage('some message');
      }, false);
    </script>
  </body>
</html>
```

上面是一段嵌入网页的脚本，注意必须指定script标签的type属性是一个浏览器不认识的值，上例是`app/worker`。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

```javascript
var blob = new Blob([document.querySelector('#worker').textContent]);
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);

worker.onmessage = function (e) {
  // e.data === 'some message'
};
```
上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。

`可以配合webpack 使用worker-loader 方便其操作`

## 主线程初始化WebWorker

```javascript
//方法一 同页面的 Web Worker
class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(['(' + code + ')()']);
        return new Worker(URL.createObjectURL(blob));
    }
}
this.worker = new WebWorker(worker,{name:'这是worker的名称  self.name能获取出来'});  

//方法二 worker.js放到public目录
this.worker = new Worker('worker.js');
```

## 主线程向Worker发消息

然后，`主线程调用worker.postMessage()`方法，向 Worker 发消息。

```javascript
let params = {
    users,
    types:'users'  //这里加个类型，方便子线程判断  【e.data.types】
};

this.worker.postMessage(params);
```
worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是`各种数据类型`，包括二进制数据。

## 子线程发回处理后的数据

```javascript
//worker.js
export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        let {users,types} = e.data;
        
        for (let i = 0; i < users.length - 1; i++) {
            for (let j = i + 1; j < users.length; j++) {
                if (users[i].id > users[j].id) {
                    const t = users[i];
                    users[i] = users[j];
                    users[j] = t;
                }
            }
        }
        postMessage(users);
    })
}
//self代表子线程自身，即子线程的全局对象


//这里可以添加判断，调用不同的方法
let {types,user} = e.data;
switch (types) {
    case 'users':
        self.postMessage(user);
     break;
}

//子线程内部关闭自身。
self.close()   
        
```

## 主线程接收数据

接着，`主线程通过worker.onmessage`指定监听函数，接收子线程发回来的消息。

```javascript
 this.worker.addEventListener('message', (event) => {
    const sortedList = event.data;
    this.setState({
        users: sortedList,
        isSorting: false
    })
});

```

## 关闭Worker

Worker 完成任务以后，`主线程`就可以把它关掉。

```javascript
this.worker.terminate();
```
## 错误处理

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。

```javascript
this.worker.addEventListener('error', function (event) {
    ...
});
```
子线程内部也可以监听error事件。

## Worker线程完成轮询

有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

```javascript
class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(['(' + code + ')()']);
        return new Worker(URL.createObjectURL(blob));
    }
}

const pollingWorker = WebWorker( (e)=> {
  let cache;
  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      let data = res.json();
      //如果不一致
      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

//主进程
worker.addEventListener('message', (event) => {
    const sortedList = event.data;
    .....
});
pollingWorker.postMessage('success');
```
Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。


## API

**主线程**

```javascript
let myWorker = new Worker(jsUrl, options);
```

Worker()构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且`只能加载JS脚本`，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是`指定Worker的名称`，用来区分多个Worker线程。

```javascript
// 主线程
let myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程
self.name // myWorker
```

Worker()构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。

**主线程对象的属性和方法**

```javascript
Worker.onerror：指定 error 事件的监听函数。
Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
Worker.postMessage()：向 Worker 线程发送消息。
Worker.terminate()：立即终止 Worker 线程。
```

**Worker 线程**

```javascript
self.name： Worker 的名字。该属性只读，由构造函数指定。
self.onmessage：指定message事件的监听函数。
self.onmessageerror：指定messageerror事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
self.close()：关闭Worker线程。
self.postMessage()：向主线程发送消息。
self.importScripts()：加载JS脚本。
```

## 适用场景

webWorker解决的是js中数据处理导致的UI线程阻塞

- 计算量数据大的，不能控制在毫秒级内的运算都可以考虑放在web worker中执行。
- 高频的用户交互根据用户的输入习惯、历史记录以及缓存等信息来协助用户完成输入的纠错、校正功能等类似场景，用户频繁输入的响应处理同样可以考虑放在web worker中执行
