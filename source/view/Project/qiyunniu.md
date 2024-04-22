---
abbrlink: de59479a
title: base64上传七云获取key
date: 2019-03-19
categories: 
- Project
- base64上传七云获取key
---

<strong class='old-blog'>base64上传七云获取key</strong>

上传到七云牛 base64 转化为 key(原生的ajax)

```javascript
 putb64 = async () => {
    /*picUrl用来存储返回来的url*/
    let picBase = base64图片;
    /*把头部的data:image/png;base64,去掉。（注意：base64后面的逗号也去掉）*/
    picBase = picBase.substring(23);

    /*通过base64编码字符流计算文件流大小函数*/
    function fileSize(str) {
        let fileSize,
            indexOf = str.indexOf('=');
        if (indexOf > 0) {
            str = str.substring(0, indexOf);//把末尾的’=‘号去掉
        }
        fileSize = parseInt(str.length - (str.length / 8) * 2);
        return fileSize;
    }

    //https://upload-z2.qiniu.com/putb64/ 只适用于七牛云华南空间
    const url = `https://upload-z2.qiniup.com/putb64/${fileSize(picBase)}`;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let keyText = xhr.responseText;
            console.log(keyText);
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", `UpToken ${this.state.uptoken}`);
    xhr.send(picBase);
};
```
