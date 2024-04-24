
# Mongoose使用

## 链接mongo

```js
/*
* @ use 数据库连接
*/
const mongoose = require('mongoose');
const config = require('../../config/common');

const dbConfig = config[process.env.NODE_ENV || 'development'];

mongoose.connect(dbConfig.mongo.url, {useNewUrlParser: true});

mongoose.set('useCreateIndex', true); //加上这个

// 连接成功
mongoose.connection.on('connected', function () {
    //console.log('连接成功 ' + dbConfig.mongo.url);
});

// 连接失败
mongoose.connection.on('error', function (err) {
    console.log('连接失败 ' + err);
});

// 断开连接
mongoose.connection.on('disconnected', function () {
    console.log('断开连接');
});
```

## 定义Schema

### Schema.Type

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- Objectid
- Array

```js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    name  : { type: String, unique: true },
    posts : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});
var User = mongoose.model('User', UserSchema);

var PostSchema = new Schema({
    poster   : { type: Schema.Types.ObjectId, ref: 'User' },
    comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    title    : String,
    content  : String
});
var Post = mongoose.model('Post', PostSchema);

var CommentSchema = new Schema({
    post      : { type: Schema.Types.ObjectId, ref: "Post" },
    commenter : { type: Schema.Types.ObjectId, ref: 'User' },
    content   : {
        main: String,
        label: String
    },
    points: [
        point: [{type: Schema.Types.ObjectId, ref: 'Point'}]
    ]
});
var Comment = mongoose.model('Comment', CommentSchema);

var PointSchema = new mongoose.Schema({
  name: String,
  parent: {type: Schema.Types.ObjectId, ref: 'point'},
  children: [{type: Schema.Types.ObjectId, ref: 'point'}]
})
var Point = mongoose.model('Point', PointSchema);
```

## 查询条件

```json
$or　　　　或关系
$nor　　　 或关系取反
$gt　　　　大于
$gte　　　 大于等于
$lt　　　　 小于
$lte　　　  小于等于
$ne            不等于
$in             在多个值范围内
$nin           不在多个值范围内
$all            匹配数组中多个值
$regex　　正则，用于模糊查询
$size　　　匹配数组大小
$maxDistance　　范围查询，距离（基于LBS）
$mod　　   取模运算
$near　　　邻域查询，查询附近的位置（基于LBS）
$exists　　  字段是否存在
$elemMatch　　匹配内数组内的元素
$within　　范围查询（基于LBS）
$box　　　 范围查询，矩形范围（基于LBS）
$center       范围醒询，圆形范围（基于LBS）
$centerSphere　　范围查询，球形范围（基于LBS）
$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
```

## mongodb对数组中的所有元素进行一次性修改方法

**$[]**

可以通过$[element] 配合 $cond 条件操作符等，来达到对数组的符合条件的元素统一更新。

```javascript
{
    name: 4,
    list: [{
        id: "a",
        date: 1504195200000,
        other: "c"
    },{
        id: "b",
        date: 1504195200000,
        other: "c"
    }]
}
```

现在要把other全部更新为"a",方法如下:

```js
db.getCollection('test').update({'name': 4}, {$set: {'list.$[].other': 'a'}}, {multi: true})
```


## 总结中...
