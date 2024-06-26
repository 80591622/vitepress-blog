
# 什么是cookie,token和session?它们之间有什么关系？


由Session到Token的身份验证演变过程理解Session、Cookie、Token



很久以前，Web 应用基本用作文档的浏览，如网络黄页。既然仅仅是浏览，因此服务器不需要记录具体用户在某一段时间里都浏览了哪些文档，每次请求都是一个新的HTTP协议，对服务器来说都是全新的。



## 基于Session的身份验证

随着交互式Web应用的兴起，比如，购物等需要登录的网站。引出了一个新的问题，那就是要记录哪些用户登录了系统进行了哪些操作，即要**管理会话**，比如，不同用户将不同商品加入到购物车中， 也就是说必须把每个用户区分开。因为HTTP请求是无状态的，所以想出了一个办法，那就是给每个用户配发一个会话**标识(Session id)**，简单的讲就是一个既不会重复，又不容易被找到规律以仿造的随机字符串，使得每个用户的收到的会话标识都不一样， 每次用户从客户端向服务端发起HTTP请求的时候，把这个字符串给一并发送过来， 这样服务端就能区分开谁是谁了，至于客户端（浏览器）如何保存这个“身份标识”，一般默认采用 Cookie 的方式，这个会话标识(Session id)会存在客户端的Cookie中。



虽然这样解决了区分用户的问题，但又引发了一个新的问题，那就是每个用户（客户端）只需要保存自己的会话标识(Session id)，而服务端则要保存所有用户的会话标识(Session id)。 如果访问服务端的用户逐渐变多， 就需要保存成千上万，甚至几千万个，这对服务器说是一个难以接受的开销 。 再比如，服务端是由2台服务器组成的一个集群， 小明通过服务器A登录了系统， 那session id会保存在服务器A上， 假设小明的下一次请求被转发到服务器B怎么办？ 服务器B可没有小明 的 session id。




如此一来，那只能做集群间的 session 复制共享了， 就是把 session id 在两个机器之间进行复制，如下图，但这对服务器的性能和内存提出了巨大的挑战。



![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2q79fw1odj20hs095glp.jpg)


因此，又想到如果将所有用户的Session集中存储呢，也就想到了缓存服务Memcached——由于 Memcached 是分布式的内存对象缓存系统，因此可以用来实现 Session 同步。把session id 集中存储到一台服务器上， 所有的服务器都来访问这个地方的数据， 如此就避免了复制的方式， 但是这种“集万千宠爱于一身”使得又出现了单点故障的可能， 就是说这个负责存储 session 的服务器挂了， 所有用户都得重新登录一遍， 这是用户难以接受的。


索性存储Session的服务器也搞成集群，增加其可靠性，避免单点故障，但不管如何，Session 引发出来的问题层出不穷。

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2q7bfks0rj20hs0a5aa6.jpg)

于是有人就在思考， 为什么服务端必须要保存这session呢， 只让每个客户端去保存不行吗？可是服务端如果不保存这些session id ，又将如何验证客户端发送的 session id 的确是服务端生成的呢？ 如果不验证，服务端无法判断是否是合法登录的用户，对，这里的问题是验证， session 只是解决这个验证问题的而产生的一个解决方案，是否还有其它方案呢？



## 基于Token 的身份验证

例如， 小明已经登录了系统，服务端给他发一个令牌(Token)， 里边包含了小明的 user id， 后续小明再次通过 Http 请求访问服务器的时候， 把这个 Token 通过 Http header 带过来不就可以了。

Token俗称为“令牌”，它的构成是：

- uid：用户唯一身份标识
- timestamp：当前时间戳
- sign：签名字符串，防止第三方伪造数据；签名密钥是存储在服务器端的，其它人无法知道
- 其它附加参数。

服务端需要验证 Token是自己生成的，而非伪造的。假如不验证任何人都可以伪造，那么这个令牌(token)和 session id没有本质区别，如何让别人伪造不了？那就对数据做一个签名（Sign）吧， 比如说服务端用 HMAC-SHA256 加密算法，再加上一个只有服务端才知道的密钥， 对数据做一个签名， 把这个签名和数据一起作为 Token 发给客户端， 客户端收到 Token 以后可以把它存储起来，比如存储在 Cookie 里或者 Local Storage 中，由于密钥除了服务端任何其他用户都不知道， 就无法伪造令牌(Token)。

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2q7ipgnnjj209909kt8r.jpg)

如此一来，服务端就不需要保存 Token 了， 当小明把这个Token发给服务端时，服务端使用相同的HMAC-SHA256 算法和相同的密钥，对数据再计算一次签名， 和 Token 中的签名做个对比， 如果相同，说明小明已经登录过了， 即验证成功。若不相同， 那么说明这个请求是伪造的，也就实现了时间换取空间（CPU计算时间换取session 存储空间）。没了session id 的限制， 当用户访问量增大， 直接加机器就可以轻松地做水平扩展，也极大的提高了可扩展性。
