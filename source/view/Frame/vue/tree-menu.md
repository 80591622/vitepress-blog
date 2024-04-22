---
abbrlink: fe474409
title: 封装树形菜单
date: 2020-01-17
categories: 
- FE框架 
- Vue
- 组件封装
- 封装树形菜单
---

<strong class='old-blog'>封装树形菜单</strong>

之前面试有让用react做过一次 ，今天仿造elementUI用Vue在做一个

**老套路先看看怎么使用的**

```javascript
// 具体使用
<template>
  <div id="test">
    <trees :data="treeData" :treeProps="treeProps"></trees>
  </div>
</template>

<script>
  import trees from "./../test/index";
  export default {
    data() {
      return {
        treeProps: {
          children: 'children',
          label: 'name'
        },
        treeData: [{
            name: "一级 1",
            children: [{
              name: "二级 1-1",
              children: [{
                name: "三级 1-1-1"
              }]
            }]
          },
          {
            name: "一级 2",
            children: [{
                name: "二级 2-1",
                children: [{
                  name: "三级 2-1-1"
                }]
              },
              {
                name: "二级 2-2",
                children: [{
                  name: "三级 2-2-1"
                }]
              }
            ]
          },
          {
            name: "一级 3",
            children: [{
                name: "二级 3-1",
                children: [{
                  name: "三级 3-1-1"
                }]
              },
              {
                name: "二级 3-2",
                children: [{
                  name: "三级 3-2-1"
                }]
              }
            ]
          }
        ]
      };
    },
    components: {
      trees
    }
  };
</script>
```

**子组件的封装**

```javascript
// 菜单节点
<template>
    <li>
        <span @click="toggle" >
            <span v-if="hasChild" >{{isOpen ? 'down' : 'up'}}</span>
            <!-- 末菜单 -->
            <span v-if="!hasChild" >'='</span> 
            {{ data[treeProps.label] }}
        </span>
        // 如果还有子集菜单，继续递归
        <ul v-show="isOpen" v-if="hasChild">
            <tree-item v-for="(item, index) in data[treeProps.children]" :data="item" :key="index" :treeProps="treeProps" ></tree-item>
        </ul>
    </li>
</template>

<script>
export default {
    name: 'TreeItem', //递归组件必须有name
    props: {
        data: {
            type: [Object, Array], //多个可能的类型
            required: true
        },
        // label、children 默认值
      treeProps:{
          type:Object,
          default:()=>({
            children:'children',
            label:'label'
          })
        }
    },
    data() {
        return {
            isOpen: false,
        }
    },
    computed: {
      // 判断当前级别是否还有children
        hasChild() {
            return this.data[this.treeProps.children] && this.data[this.treeProps.children].length
        }
    },
    methods: {
      // 点击子菜单也要判断是否有children，有就展开
        toggle() {
            if(this.hasChild) {
                this.isOpen = !this.isOpen
            }
        }
    }
}
</script>

<style>
ul {
    list-style: none;
    margin: 10px 0;
    padding-left: 20px;
}
li {
      color: #000;
}
li > span {
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
}
</style>
```

```javascript
// 菜单标题
<template>
  <div>
    <ul v-for="(item,index) in data" :key="index">
      <tree-item :data="item" :treeProps="treeProps"></tree-item>
    </ul>
  </div>
</template>

<script>
  import treeItem from './item'
  export default {
    props: {
      data: {
        type: [Object, Array],
        required: true
      },
      treeProps: {
        type: Object,
        default: () => ({
          children: 'children',
          label: 'label'
        })
      }
    },
    components: {
      treeItem
    },
  }
</script>
```

跟react大同小异，依旧是用了递归的思想，不过vue的这个组件自身递归看的很新奇。
