

# Flex弹性布局

**`容器的属性`**

## flex-direction属性

`flex-direction`属性决定主轴的方向（即项目的排列方向）。


```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}

row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
```

## flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}

nowrap（默认）：不换行。
wrap：换行，第一行在上方。
wrap-reverse：换行，第一行在下方。
```

## flex-flow属性

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

## justify-content属性

`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}

flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```

## align-items属性

`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}

flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
```

## align-content属性

`align-content`属性定义了`多根轴线`的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。
```

**适用于弹性盒模型容器子元素**

## order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: 0;
}
```

## flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在**`剩余空间`**，也不放大。

```css
.item {
  flex-grow: 0
}
```
 <br/>
 
<img style="border: .3em solid #e0dfcc;border-radius: 1em;width：98%"  src="https://ae01.alicdn.com/kf/H71fcbd2221b642a6bc7f52d3170378239.png">

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: 1
}
```
<br/>

<img style="border: .3em solid #e0dfcc;border-radius: 1em;width：98%"  src="https://ae01.alicdn.com/kf/H245bfecf53234ecba3042bd2f74545efo.jpg">

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。

## flex-basis属性

flex-basis表示在flex items 被放入flex容器之前的大小，也就是items的理想或者假设大小，但是并不是其真实大小，
其真实大小取决于flex容器的宽度，flex items的min-width,max-width等其他样式，具体分析看下文

```html
#main {
    width: 350px;
    height: 100px;
    border: 1px solid #c3c3c3;
    display: flex;
}

#main div {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 40px;
}

#main div:nth-of-type(2) {
    flex-basis: 80px;
}

<div id="main">
  <div style="background-color:coral;"></div>
  <div style="background-color:lightblue;"></div>
  <div style="background-color:khaki;"></div>
  <div style="background-color:pink;"></div>
  <div style="background-color:lightgrey;"></div>
</div>
```

![](https://ae01.alicdn.com/kf/H8ca6768902df41ecb593aec7f900645ad.png)

##  flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
```

## align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。


```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
<br/>

<img style="border: .3em solid #e0dfcc;border-radius: 1emwidth：98%;"  src="https://ae01.alicdn.com/kf/Hedafd4f059f24e8cb9093252cad6f53an.png">

