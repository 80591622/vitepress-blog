

# display:none opacity:0以及visibility:hidden的区别


**相同作用**
能够对元素进行隐藏 

## 空间占据
display:none;不占据空间，所以动态改变此属性时会引起重排。

visibility:hidden;元素会被隐藏，但是不会消失，依然占据空间。

opacity:0; 只是透明度为100%,元素隐藏，依然占据空间。

## 继承性

display:none; 不会被子元素继承，但是父元素都不在了，子元素自然也就不会显示了，皮之不存，毛之安附~~

visibility:hidden; 会被子元素继承，可以通过设置子元素 visibility:visible 使子元素显示出来

opacity:0; 也会被子元素继承，但是不能通过设置子元素opacity:0 使其重新显示

## 动画效果transition 

**display**

dispaly不仅仅对transition 无效，还能使其失效



```html
<div class="big-box">
<div class="box  transition-display"> display</div>
</div>
//css
.transition-display{
display: none;
transition:display 2s; 
}
.transition-display:hover{
 display: block;
}
```

**visibility **

visibility  visibility:visible 过渡到 visibility:hidden，不能从 visibility:hidden 过渡到 visibility:visible 。

元素从隐藏到实现 不能实现动画效果
```html
//html
 <div class="big-box">
    <div class="box  transition-visibility">visibility</div>
  </div>
//css
.transition-visibility{
  visibility: hidden;
  transition: visibility 2s;
}
.transition-visibility:hover{
  visibility: visible;
}
```

如果是元素从显示到隐藏 可以进行实现动画效果

```html
// css
.transition-visibility{
   visibility: visible;
   transition: visibility 1s;
  }
.transition-visibility:hover{
  visibility: hidden;
}
```

**opacity**

对transition有效
```html
  .undisplay.blue {
    width: 200px;
    height: 200px;
    background: blue;
  }

  .undisplay.yellow {
    width: 100px;
    height: 100px;
    background: yellow;
    opacity: 0;
    //增加display
    display: none;
    transition: 1s
  }

  .undisplay.blue:hover .yellow {
    opacity: 1;
    //增加display
    display: block;
  }
```

## 总结

|                                        | display:none | visibility:hidden                                           | opacity:0  |
| -------------------------------------- | ------------ | ----------------------------------------------------------- | ---------- |
| 是否占据页面空间                       | 否           | 是                                                          | 是         |
| 子元素设置该属性其他值是否可以继续显示 | 否           | 是                                                          | 否         |
| 自身绑定的事件能够出发                 | 不能触发     | 不能触发                                                    | 能触发     |
| 是否挡住其他元素出发事件               | 不影响       | 不影响                                                      | 影响       |
| 是否产生回流（reflow)                  | 产生         | 不产生                                                      | 不产生     |
| 是否产生重绘                           | 产生         | 产生                                                        | 不一定产生 |
| 是否支持transition                     | 不支持       | 支持 仅支持从 visibility:visible 过渡到 visibility:hidden， | 支持       |

