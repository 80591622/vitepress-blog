---
abbrlink: '36484973'
title: 全屏实现方案
date: 2019-03-19
categories: 
- Project
- 全屏实现方案
---


<strong class='old-blog'>全屏实现方案</strong>

```javascript

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <button onclick="fullScreen()">现代浏览器全屏</button>

        <button onclick="exitScreen()">现代浏览器退出</button>

        <button onclick="iefull()">低版本ie全屏</button>
    </body>
    <script type="text/javascript">
        //全屏
        function fullScreen(){
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
                if(typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                };
              return;
        }
        //退出全屏
        function exitScreen(){
            if (document.exitFullscreen) {  
                document.exitFullscreen();  
            }  
            else if (document.mozCancelFullScreen) {  
                document.mozCancelFullScreen();  
            }  
            else if (document.webkitCancelFullScreen) {  
                document.webkitCancelFullScreen();  
            }  
            else if (document.msExitFullscreen) {  
                document.msExitFullscreen();  
            } 
            if(typeof cfs != "undefined" && cfs) {
                cfs.call(el);
            }
        }
        //ie低版本的全屏，退出全屏都这个方法
        function iefull(){
            var el = document.documentElement;
            var rfs =  el.msRequestFullScreen;
            if(typeof window.ActiveXObject != "undefined") {
                //这的方法 模拟f11键，使浏览器全屏
                var wscript = new ActiveXObject("WScript.Shell");
                if(wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }
        //注：ie调用ActiveX控件，需要在ie浏览器安全设置里面把 ‘未标记为可安全执行脚本的ActiveX控件初始化并执行脚本’ 设置为启用
    </script>
</html>

```
