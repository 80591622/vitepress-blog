---
abbrlink: 97cd01ae
title: vue之JSX封装table
date: 2020-01-17
categories: 
- FE框架 
- Vue
- 组件封装
- Vue之JSX封装Table
---

<strong class='old-blog'>vue之JSX封装table</strong>

[[toc]]

[封装之前先看下](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

[babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)

基于ElementUI的table二次封装

最近搞中台开发，用的ElementUI的Table组件比较多，几乎每个页面都用，相比react的antd,饿了么的table就相对臃肿了，可能是因为框架的原因吧。

本次封装用的jsx语法，vue模板拓展性不是特别显优势，没有jsx灵活。[想看jsx在vue中怎么使用的请转看下之前的文章](/workspace/Frame/vue/jsx.html)


### 组件封装源码

```javascript
//EnhanceTable.jsx
import table from "../mixins/table"

export default {
  mixins: [table],
  props: {
    otherTableParams: { // 设置table其他参数
      type: Object,
       default: function () {
        return {}; // Object/Array的属性必须使用函数返回默认值  箭头函数不行
      }
    },
    otherPaginationParams: { // 设置分页其他参数
      type: Object,
       default: function () {
        return {};
      }
    },
    tableColumn: { // table的column
      type: Array,
       default: function () {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleButtons(item, record) {
      // 处理操作部分按钮 -> 可以在外面自定义，必须是jsx
      if (item.handleButtons) return item.handleButtons(record);
      return (
        !!item.list.length && item.list.map((item) => {
          return (
            <el-button
              disabled={item.disabled}
              key={item.title}
              type="text"
              size="small"
              style={item.styles}
              onClick={() => item.cb(record)}
            >
              {item.title}
            </el-button>
          )
        })
      );
    }
    // handleCurrentChange(val) {
    //   this.$emit('currentChange', val);
    // },
  },
  mounted() {
  },
  render() {
    const {tableOptions, paginationOptions, paginationOptionsMethod, tableOptionsMethod, otherTableParams, tableColumn, multiple} = this;
    return (
      <div>
        <el-table
          {...{
            props: {
              ...tableOptions,
              ...otherTableParams.props,
            },
            on: {
              ...tableOptionsMethod,
              ...otherTableParams.on
            }
          }}
        >
          {/* table多选 */}
          {
            multiple && (
              <el-table-column
                type="selection"
                width="55"
                fixed={'left'}
              />
            )
          }
          {/* table列表 */}
          {
            tableColumn.map((item) => {
              if (item.type === 'button') {
                // 操作部分
                return (
                  <el-table-column
                    label={item.label || '操作'}
                    width={item.width || '88'}
                    fixed={item.fixed || 'right'}
                    {...{
                      scopedSlots: {
                        default: ({row}) => {
                          return this.handleButtons(item, row)
                        }
                      }
                    }}
                  />
                )
              }
              return (
                <el-table-column
                  props={item}
                  key={item.prop}
                  {...{
                    // 自定义的渲染方式，拓展性
                    scopedSlots: {
                      default: ({row}) => {
                        return item.render ? item.render(row[item.prop], row) : row[item.prop]
                      }
                    }
                  }}
                />
              )
            })
          }
        </el-table>
        {/*分页*/}
        <el-pagination
          {...{
            class: paginationOptions.class,  // 支持拓展
            props: {
              ...paginationOptions,
            },
            on: {
              ...paginationOptionsMethod
            },
          }}
        />
      </div>
    );
  }
};
```

### EnhanceTable 文档

### 组件使用

```javascript
<template>
    <enhance-table ref="table" :multiple="true" :otherTableParams="otherTableParams" :tableColumn="column"
    />
</template>
<script>
  import EnhanceTable from "../components/EnhanceTable"

  export default {
    data() {
      return {
        otherTableParams: {// table的参数
          props: {
            border: true,
            stripe: true,
            size: 'small',
            'default-sort': {prop: 'createTime', order: 'ascending'}
          }
        },
        otherPaginationParams:{},// 分页的参数
        column: [  // table的列
          {
            prop: "roleId",
            label: "序号",
            width: 100,
          },
          {
            prop: 'roleName',
            label: "角色名称",
            'width': "110"
          },
          {
            prop: "createTime",
            label: "创建时间",
            sortable: true
          },
          {
            prop: 'roleName',
            label: "角色名称",
            //formatter  完全可以用render代替
            render: (text, record) => { // 当前行的值，当前行数据
              // console.log(record);
              return <h4>{text}</h4>
            },
          },
          { // 最后的操作列，可根据list里面展示要操作的按钮，和回调
            type: 'button',
            width: '118',
            label: "设置",
            list: [
              {title: '查看', disabled: false, styles: {color: '#777'}, cb: this.seeHandle},
              {title: '编辑', cb: this.editHandle}
            ],
            // handleButtons: () => (<div>111</div>)  // 自定义的内容
          }
        ]
      }
    },
    components: {EnhanceTable},
    methods: {
      queryList() { // 子组件默认的请求名称
        this.$nextTick(async () => {  
          // 因为当前算是父组件，当执行到父组件的created周期才会执行它的子组件，所以这个时候子组件的data的一些方法获取不到，或者可以在mounted周期里面执行异步请求
          const {paginationOptions: {pageSize, currentPage}, handlePageData} = this.$refs.table;// 获取子组件mixins里面的参数
          const {data: {items, page: {totalRecord}}} = 
          await this.$fetch(`http://xx..xx/role?pageSize=${pageSize}&pageNum=${currentPage}`, {
            headers: {
              Authentication: 'xxxxx'
            },
          });
          handlePageData(items, totalRecord);  // mixin里面统一处理
        });
      },
      editHandle(...options) {
        console.log(options, '编辑');
      },
      seeHandle(...options) {
        console.log(options, '查看');
      }
    },
    created() {
      this.queryList();//必须是这个名称 
    },
    mounted() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
```

### 最后在送一个当前使用的mixins

```javascript
// table.mixins.js
const table = {
  data() {
    return {
      tableOptions: {
        data: [], // 列表数据
        border: true, // 带边框
        style: "width: 100%",
        size: "small",
        multipleSelection: [], // 列表多选
      },
      tableOptionsMethod: {
        "selection-change": this.handleSelectionChange
      },
      paginationOptions: {
        class: "fyDiv",
        background: true, // 带有背景色
        layout: "total, sizes, prev, pager, next",
        pageSizes: [10, 20, 30, 40],
        total: 0, // 应用列表总数量
        pageSize: 10, // 当前分页数量
        currentPage: 1, // 当前页数第一页
        showPage: false, // 是否显示分页组件,必须total总数也要小于当前要展示的页数
      },
      paginationOptionsMethod: {
        "size-change": this.handleSizeChange,
        "current-change": this.handleCurrentChange
      }
    };
  },
  methods: {
    // 获取数据回调处理分页和data
    handlePageData(data, total) {
      this.tableOptions.data = data;
      // 如果还有下一页，则显示分页插件
      if (total > 10) {
        this.paginationOptions.showPage = false;
      } else {
        this.paginationOptions.showPage = true;
        this.paginationOptions.currentPage = 1;
        this.paginationOptions.pageSize = 10;
      }
      this.paginationOptions.total = total;
    },
    // 选项变化
    handleSelectionChange(multipleSelection) {
      console.log(multipleSelection, "选中");
      this.tableOptions.multipleSelection = multipleSelection;
    },
    // 改变页数
    handleCurrentChange(currentPage) {
      this.paginationOptions.currentPage = currentPage;
      this.queryList ? this.queryList() : this.$parent.queryList();
    },
    // 选择页数
    handleSizeChange(currentSize) {
      this.paginationOptions.pageSize = currentSize;
      this.paginationOptions.currentPage = 1;
      this.queryList ? this.queryList() : this.$parent.queryList();
    },
    // 搜索专用
    handleSearchChange(page = 1, size = 10) {
      this.paginationOptions.pageSize = size;
      this.paginationOptions.currentPage = page;
      this.queryList ? this.queryList() : this.$parent.queryList();
    }
  }
};

export default table;
```

### 写在最后

当前的table组件是针对自己项目的需求封装，兼容了饿了么table大部分的业务场景，随着后期的业务拓展，当前的组件的拓展性也会增强，封装路漫漫，一点点完善吧。