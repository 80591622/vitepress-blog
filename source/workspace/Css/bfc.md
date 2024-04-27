

# BFC

**如何创建BFC**
- float的值不是none。
- position的值不是static或者relative。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex
- overflow的值不是visible

**BFC的作用**
- 利用BFC避免margin重叠。
- 自适应两栏布局
- 清除浮动

**实现一个三栏布局**
```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    body {
        width: 100%;
        position: relative;
    }
 
    .left {
        width: 100px;
        height: 150px;
        float: left;
        background: rgb(139, 214, 78);
    }
    .right {
        float: right;
        height: 300px;
        background: rgb(170, 54, 236);  
    }
    .center{
        overflow: hidden;
        background: red;  
    }
</style>
<body>
    <div class="left">1</div>
    <div class="right">2</div>
    <div class="center">3</div>
</body>
```


[https://blog.csdn.net/sinat_36422236/article/details/88763187](https://blog.csdn.net/sinat_36422236/article/details/88763187)