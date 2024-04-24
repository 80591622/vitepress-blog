
# Koa2

### 基本用法

## path

**__filename** 全局值，当前文件绝对路径 module.filename === __filename 等价 <br/>
**__dirname** 全局值，当前文件夹绝对路径。等效于path.resolve(__filename, '..')<br/>
**path.join([...paths])** 相当于把所传入的任意多的参数 按照顺序 进行命令行般的推进<br/>
**path.resolve([...paths])** 以当前文件的路径为起点，返回绝对路径。可以理解为每次都是新建cd命令<br/>
**path.dirname(path)** 返回指定路径所在文件夹的路径<br/>
**path.basename(path)** 返回指定Path路径所在文件的名字<br/>
**path.extname(path)** 获取指定字符串或者文件路径名字的后缀名，带.比如.txt<br/>
**path.isAbsolute(path)** 是否是绝对路径,返回boolean值<br/>
**process.cwd()**   返回运行当前脚本的工作目录的路径 <br/>
**process.chdir()** 改变工作目录


```javascript
path.join('a','b','../c/lolo') // a/c/lolo

path.resolve('/a', '/b') // '/b'
path.resolve('./a', './b') // '/User/../a/b'

const filePath = './bar/baz/asdf/quux.html'
path.basename(filePath) // quux.html
path.dirname(filePath) // ./bar/baz/asdf
path.extname(filePath) // .html
path.isAbsolute(filePath) // false
```

例子，文件路径有如下结构：

newapp > demo > hello.js

在hello.js文件中编写如下代码：

```javascript
console.log(__dirname);
console.log(__filename);
console.log(module.filename===__filename);
console.log(process.cwd());
process.chdir('/Users/jerry')
console.log(process.cwd());
```

然后定位在newapp目录下，执行命令 node demo/hello.js，输出结果如下：

```javascript
/Users/jerry/51talk/newapp/demo
/Users/jerry/51talk/newapp/demo/hello.js
true
/Users/jerry/51talk/newapp
/Users/jerry
```

## 启动HTTP服务

```javascript
const Koa = require('koa');
const app = new Koa();
app.listen(...)  //方法是如下的一个语法糖。

// const http = require('http')
// http.createServer(app.callback()).listen(3000)
```

## 开启import

```javascript
//server.js
require('@babel/register')({
    babelrc: false,
    presets: ['@babel/preset-env'],
    plugins: ["@babel/plugin-transform-runtime"]
});
 //package.json
devDependencies: {
    "@babel/core": "^7.4.5",
    "@babel/plugin-transform-runtime": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "@babel/register": "^7.4.4",
    "@babel/runtime": "^7.4.5",
    "nodemon": "^1.19.1"
}
```
## Context对象

Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容

`Context.response.body`属性就是发送给用户的内容

```javascript
const Koa = require("koa");
const app = new Koa();

app.use(ctx => { //处理请求的中间件
    ctx.response.body = "hello world";
}).listen(3000);
```
`ctx.response`代表 `HTTP Response`。同样地，`ctx.request`代表 `HTTP Request`

## HTTP Response 的类型

Koa 默认的返回类型是`text/plain`，如果想返回其他类型的内容，可以先用`ctx.request.accepts`判断一下，客户端希望接受什么数据，然后使用`ctx.response.type`指定返回类型

```javascript{5,6}
const Koa = require("koa");
const app = new Koa();

app.use(ctx => {
    if (ctx.request.accepts('xml')) {
        ctx.response.type = 'xml';
        ctx.response.body = '<data>Hello World</data>';
    } else if (ctx.request.accepts('json')) {
        ctx.response.type = 'json';
        ctx.response.body = { data: 'Hello World' };
    } else if (ctx.request.accepts('html')) {
        ctx.response.type = 'html';
        ctx.response.body = '<p>Hello World</p>';
    } else {
        ctx.response.type = 'text';
        ctx.response.body = 'Hello World';
    }
}).listen(3000);
```

## 设置响应头和请求头

```javascript
// 设置响应头
ctx.set('Content-Type', 'application/zip')

// 添加请求头
ctx.append('userName','wk');
```

## 网页模板

实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户

```javascript{7}
const Koa = require("koa");
const app = new Koa();
const fs = require('fs');

app.use(ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./public/template.html');
}).listen(3000);
```

### 路由

网站一般都有多个页面。通过`ctx.request.path`可以获取用户请求的路径，由此实现简单的路由

```javascript{6}
const Koa = require("koa");
const app = new Koa();
const fs = require('fs');

app.use(ctx => {
    if (ctx.request.path !== '/') {
        ctx.response.type = 'html';
        ctx.response.body = '<a href="/">Index Page1</a>';
    } else {
        ctx.response.body = 'Hello World';
    }
}).listen(3000);
```

## koa-router 模块

原生路由用起来不太方便，我们可以使用封装好的`koa-router`模块

```javascript{4,14,15}
const Koa = require("koa");
const app = new Koa();
const fs = require('fs');
const route = require('koa-router')();

route.get("/", ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page1</a>';
})
route.get("/about", ctx => {
    ctx.response.body = 'Hello World';
})

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods());
/* 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配
router.routes()之后,目的在于：根据ctx.status 设置response 响应头
*/
app.listen(3000);
```


## 路由传值

```javascript
// http://localhost:3000/api/1?type=123
app.use((req, res, next) => {
    console.log(req.query) // { type: '123' }
    console.log(req.path) // /api/1
    console.log(req.params) // 动态路由 ->类似于 '/api/:_id'
    console.log(req.body) // 通常是 post method
    console.log(req.cookies) // need  cookie-parser middleware

    // extend http.IncomingMessage
    console.log(req.url) // /api/1?type=123
    console.log(req.headers) // header object
    console.log(req.method) // GET
    next()
})
```
## 静态资源

如果网站提供静态资源（图片、字体、样式表、脚本……），为它们一个个写路由就很麻烦，也没必要。koa-static模块封装了这部分的请求

```javascript{7}
// 访问 http://localhost:3000/index.html
const Koa = require("koa");
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

app.use(serve(process.cwd() + '/public'));
app.listen(3000);
```

## 重定向

有些场合，服务器需要重定向（`redirect`）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。`ctx.response.redirect()`方法可以发出一个`302`跳转(临时性重定向)，将用户导向另一个路由

```javascript{6}
const Koa = require("koa");
const app = new Koa();
const route = require("koa-router")();

route.get("/orderList", ctx => {
    ctx.response.redirect('/');
    ctx.response.body = '<a href="/">Index Page</a>';
})
route.get("/", ctx => {
    ctx.response.body = "hello world";
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
```

## 中间件

### 中间件的概念

Koa 的最大特色，也是最重要的一个设计，就是`中间件`（middleware）

- 基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的routes()也是中间件
- 每个中间件默认接受两个参数，`第一个参数是 Context 对象，第二个参数是next函数`。只要调用next函数，就可以把执行权转交给下一个中间件，如果中间件内部没有调用next函数，那么执行权就不会传递下去

多个中间件会形成一个`栈结构（middle stack`），以`”先进后出”（first-in-last-out）`的顺序执行,看下面的洋葱模型

![](https://ae01.alicdn.com/kf/H4242d98115564b91a0f007f2c15125e24.jpg)

- 最外层的中间件首先执行。
- 调用next函数，把执行权交给下一个中间件。
- …
- 最内层的中间件最后执行。
- 执行结束后，把执行权交回上一层的中间件。
- …
- 最外层的中间件收回执行权之后，执行next函数后面的代码

```javascript
app.use(async (ctx,next)=>{
  console.log("1");
  await next();
  console.log("3")
})
app.use(async (ctx,next)=>{
  console.log("2");
  await next()
  console.log("4")
})
// 打印结果是：1,2,4,3
```


## 异步中间件

如果有异步操作（比如读取数据库），中间件就必须写成 **async** 函数

```javascript
const response = () => {
    function render({data, msg, status, code = 200,...option}) {
        this.status = status || 200;
        this.set("Content-Type", "application/json");
        this.body = {
            code: code,
            msg,
            data,
            is_login: this['is_login'],
            ...option
        };
    }

    return async (ctx, next) => {
        ctx.send = render.bind(ctx);
        await next()
    }
};
export default response
```

## 中间件的合成

koa-compose模块可以将多个中间件合成为一个

```javascript{14}
const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const middlewares = compose([logger, main]);

app.use(middlewares);
app.listen(3000);
```

### 错误处理

## 500 错误

如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回500状态码

Koa提供了`ctx.throw()`方法，用来抛出错误，`ctx.throw(500)`就是抛出500错误

```javascript{5}
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.use(main);
app.listen(3000);
```
`ctx.response.status`设置成404，就相当于`ctx.throw(404)`，返回404错误

## 处理错误的中间件

为了方便处理错误，最好使用`try...catch`将其捕获。但是，为每个中间件都写`try...catch`太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理

```javascript{6}
const catchErr = () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                msg: "服务器错误",
                code: -1,
                data:[]
            };
        }

    }
};
export default catchErr
app.use(catchErr);
```

## error 事件的监听

运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误

```javascript{8}
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

app.use(main);
app.listen(3000);
```

## Web 的功能

###  Cookies

ctx.cookies用来读写 Cookie

```javascript
ctx.cookies.set(name, value, [options])
```

访问 http://127.0.0.1:3000 ，你会看到1 views。刷新一次页面，就变成了2 views。再刷新，每次都会计数增加1

```javascript{5,6}
const Koa = require('koa');
const app = new Koa();

const main = function(ctx) {
    const n = Number(ctx.cookies.get('view') || 0) + 1;
    ctx.cookies.set('view', n);
    ctx.response.body = n + ' views';
}

app.use(main);
app.listen(3000);
```
![](https://ae01.alicdn.com/kf/Hc7a6ea6122f941e6875c29f19ed65996F.png)

## Session

`session` 是另一种记录客户状态的机制，不同的是 `Cookie` 保存在客户端浏览器中，而 `session` 保存在服务器上

**Session 的工作流程**

当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 `session` 对象，生 成一个类似于 `key,value` 的键值对， 然后将`key(cookie)`返回到浏览器(客户)端，浏览 器下次再访问时，携带 `key(cookie)`，找到对应的 `session(value)`.

**koa-session 的使用**

```javascript
const session = require('koa-session');
// 通过任意字符串为基准进行加密算法的字符串  base64
// keys 作用在cookie 的value值时加密后的内容 
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess',  // 设置 session的名字 也是cookie中key
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true, 
  httpOnly: true, // 是否允许客户端操作cookies true:不允许 false 允许
  signed: true, // 数字签名，保证数据不被修改
  rolling: false, // 过期时间访问顺延，指的是数据存储过期后；时候否继续加时间 false 不顺延  true 顺延
  renew: false, 
};

app.use(session(CONFIG, app));
```
**使用**

```javascript
//设置值 
ctx.session.username = "张三";

// 获取值 
ctx.session.username
```
**Cookie 和 Session 关系**

coolies 的value 为session 存的内容，过程经过了请求与响应
通过cookies 与session存储数据；可以知道当前登录的是哪个用户

**Cookie 和 Session 区别**

- cookie 数据存放在客户的浏览器上，session 数据放在服务器上
- cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗 考虑到安全应当使用 session
- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用 COOKIE
- 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie



## JWT(Json Web Token)

[JWT](https://www.npmjs.com/package/jsonwebtoken) 是一个开放标准(RFC 7519)，它定义了一种用于简洁，自包含的用于通信双方之间以 JSON 对象的形式安全传递信息的方法。JWT 可以使用 HMAC 算法或者是 RSA 的公钥密钥对进行签名。它具备两个特点：

- 简洁(Compact)可以通过URL, POST 参数或者在 HTTP header 发送，因为数据量小，传输速度快
- 自包含(Self-contained) 负载中包含了所有用户所需要的信息，避免了多次查询数据库
- JWT的主要作用在于
  - 可附带用户信息，后端直接通过JWT获取相关信息。
  - 使用本地保存，通过HTTP Header中的`Authorization`位提交验证。

**koa-jwt的工作流程**

- 用户通过登录Api获取当前用户在有效期内的token
- 需要身份验证的API则都需要携带此前认证过的token发送至服务端
- `koa2`会利用`koa-jwt`中间件的默认验证方式进行身份验证，中间件会进行验证成功和验证失败的分流。

```javascript
// koa-jwt的默认验证方式: 
{'authorization': "Bearer " + token}
```

**在项目中使用**

1. 安装依赖

```text
yarn add jsonwebtoken koa-jwt
```

2. 中间件 请求验证token
```javascript
// 中间件对token进行验证
app.use(async (ctx, next) => {
    // 不用
    // let token = ctx.header.authorization;  // 解密操作
    // let payload = await jwt.verify(token, customConfig.passportJwt);
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: err.message
            }
        } else {
            throw err;
        }
    })
});
```
3. 排除不验证的请求
```javascript
app.use(koajwt({ secret: SECRET }).unless({
    path: [/^\/api\/login/,/^\/api\/register/]   // 登录注册接口不需要验证
}));
```
4. 登陆签发token

```javascript
let customConfig = {
    passportJwt: 'xxxxxxxxxx'
};
const token = jwt.sign({
         username:'xx',
         password:'xx',
         admin: true,
         exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // 过期时间秒,
    },
    customConfig.passportJwt, // 加密
    // {expiresIn: '1h'}  也可以这么设置过期时间
);

ctx.body = {
    code: 200,
    msg: '登录成功',
    token: token
}
```
## 表单 (POST)

Web应用离不开处理表单。本质上，表单就是`POST`方法发送到服务器的键值对。`koa-bodyparser`模块可以用来从 POST 请求的数据体里面提取键值对

**原生 Nodejs 获取 post 提交数据**

```javascript{5,6,7,8,9,10}
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
            ctx.req.on('data',(data)=>{
                postdata += data
            })
            ctx.req.on("end",function(){
                resolve(postdata);
            })
        }catch(error){
            reject(error);
        }
      }
    });
}
```

**Koa 中 koa-bodyparser 中间件的使用**

```javascript{11,12,13}
const Koa = require('koa');
import bodyParser from "koa-bodyparser";
const app = new Koa();

const main = async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name };
};

app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(main);
app.listen(3000);
```

打开命令行窗口，运行下面的命令

```bash{1,4}
curl -X POST --data "name=Jack" 127.0.0.1:3000
{"name":"Jack"}

$ curl -X POST --data "name" 127.0.0.1:3000
name required
```

**Koa-body模块**

Koa2中利用`Koa-body`代替`koa-bodyparser`和`koa-multer`。原来通过`koa-bodyparser`来打包`Post`请求的数据，通过`koa-multe`r来处理`multipar`t的文件;使用`koa-body`后，`ctx.request.files`获得Post中的文件信息。`ctx.request.body`获得Post上传的表单信息。

```javascript{6,7,8,9,10}
// 添加koaBody中间件
app.use(
  koaBody({
    // 如果需要上传文件,multipart: true
    //　不设置无法传递文件
    multipart: true,
    formidable: {
      maxFileSize: 10 * 1024 * 1024  // 设置上传文件大小最大限制，默认2M
    },
    patchKoa: true
  })
);
```

## 文件上传

实现文件上传的中间件有3个

- koa-body 
- busboy 
- koa-multer 

因为上面POST用了 `koa-body` ，这里还继续用`koa-body`，使用方式跟上面的一样，这里就不在写了

使用koa-body中间件后，即可通过`ctx.request.files`获取上传的文件

**提醒：** <br/>
新版本的koa-body通过ctx.request.files获取上传的文件 <br/>
旧版本的koa-body通过ctx.request.body.files获取上传的文件 <br/>

**上传单个文件**

```javascript
router.post('/uploadfile', async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
   // 获取上传文件扩展名
  let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";
});
```

**上传多个文件**

```javascript
router.post('/uploadfiles', async (ctx, next) => {
  const filePaths = [];
  // 上传多个文件
  const files = ctx.request.files.file; // 获取上传文件
  for (let file of files) {
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    filePaths.push(filePath);
  }
 return ctx.body = filePaths
});
```

## nodemailer

**发送邮件**

```javascript
let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    service: 'smtp.163.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: { //用户信息
        user: 'xxxxxx@163.com',
        pass: 'xxxxxx', // smtp授权码
    }
});

let title = '标题';
let mailOptions = {
    from: `<feng960106@163.com>`,
    to: `feng960106@163.com`, // `1 | 2 | 3` 多个邮箱
    subject: title || '自动发邮件',
    text: JSON.stringify(params),
    html: 'html模板',
    //附件信息
    attachments:[
      {
        filename:'',
        path:'',
      }
    ]
};

new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        resolve(info)
    });
}).then((info) => {
    return ctx.send({
        msg: info,
    });
}).catch((err) => {
    return ctx.send({
        msg: err,
        code: -1
    });
})
```

## koa-compress

**压缩数据**

```javascript
const Koa = require('koa');
const app = new Koa();
const compress = require('koa-compress');
 
app.use(compress({
    //只有在请求的content-type中有gzip类型，我们才会考虑压缩
    filter: function (content_type) { 
        return /text/i.test(content_type);
    },
    threshold: 1024*2, //阀值，当数据超过2kb的时候，可以压缩
    flush: require('zlib').Z_SYNC_FLUSH
}));
 
//使用
app.use(async(ctx, next) => {
    ctx.compress = true; //是否压缩数据
    await next();
});
```


### 遇到的问题
 
##  async/await后ctx.body失效

**事由**

在做ssr的时候，在Promise.all()里面返回的ctx.body没有值，但是能打印出来

**原因**

中间件在调用next()的时候 并没有把next当作一个异步函数使用。因此你在promise中异步赋值了ctx.body，但是由于next函数没有等你，在你赋值之前这一网络请求就已经完成了。

**解决办法**

1. 使用异步的中间件`async/await和promise`
2. 检查你的中间件的next函数是否等待了。
