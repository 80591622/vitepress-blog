# Axios 获取文件流导出 excel 表格

## 一、导出excel表格实现的具体思路：

1.创建一个`a`标签；
2.获取响应头`content-disposition`作为文件名；(需要服务端放开`content-disposition`所以尽量自己命名)
3.利用`a`标签的`download`属性进行下载

大多数下也可以直接通过href跳转的方式下载文件，具体看业务。（地址栏下载是不支持添加响应头的）



## 二、理解什么是 `Content-Disposition`

Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件。Content-disposition其实可以控制用户请求所得的内容存为一个文件的时候提供一个默认的文件名，文件直接在浏览器上显示或者在访问时弹出文件下载对话框。

 如图所示，后端返回的数据：

![](https://tva1.sinaimg.cn/large/008eGmZEly1gpcep6bkhcj30ly0cugom.jpg)



务器在协议回包里加了该字段，但因没“暴露”给外部，客户端就“看得到，吃不到”，所以编码的时候前端是不能直接获取到content-disposition

**Access-Control-Expose-Headers**

根据MDN文档：[Access-Control-Expose-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)

默认情况下，header只有六种 simple response headers （简单响应首部）可以暴露给外部：

```javascript
Cache-Control
Content-Language
Content-Type
Expires
Last-Modified
Pragma
```

这里的暴露给外部，意思是让客户端可以访问得到，既可以在Network里看到，也可以在代码里获取到他们的值。

```javascript
Access-Control-Expose-Headers : 'Content-Disposition' // 注意是大写
// 指定多个
// Access-Control-Expose-Headers: Content-Length, X-Kuma-Revision
```



## 三、文件下载Content-Disposition中文乱码

先确定后端的转码格式，一般默认的 `UTF-8`

```javascript
String fileName = "中国.doc";
//方法1：
response.setHeader("Content-Disposition", "attachment; filename=" + java.net.URLEncoder.encode(fileName, "UTF-8"));
 
//方法2：使用指定编码，并告诉浏览器编码类型
response.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + URLEncoder.encode(fileName, "UTF-8");
 
//方法3：
response.setHeader("Content-Disposition", "attachment; filename=" + new String(fileName.getBytes("gb2312"), "ISO-8859-1"));
```



## 四、完整导出表格代码

```javascript
down(url) {
    return $axios({
      method: 'get',
      url: `${$axios.defaults.baseURL}${url}`,
      responseType: 'blob',
    }).then(data => {
      let url = window.URL.createObjectURL(new Blob([data]));
      let fileName = `${router.app.$route.meta.title}-${dayjs().format('YYYY-MM-DD日)}.xlsx`;
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(() => {
      Message.error('导出失败')
    })
}
```

