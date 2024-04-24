
# Vue之JSX封装搜索头部


## 组件封装源码

```javascript
export default {
  data() {
    const {searchProps} = this;
    return {
      searchData: searchProps.search || {},
    }
  },
  props: {
    searchProps: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    typeInput(item) {
      return (
        <el-form-item prop={item.key}>
          {item.label !== false && <div class="prepend small">{item.name}</div>}
          <el-input
            clearable={true}
            style={{width: '160px', ...item.styles}}
            v-model={this.searchData[item.key]}
            placeholder={`请输入${item.name}`}
          />
        </el-form-item>
      )
    },
    typeSelect(item) {
      return (
        <el-form-item prop={item.key}>
          {item.label !== false && <div class="prepend small">{item.name}</div>}
          <zy-select v-model={this.searchData[item.key]} type={item.enumType} data={item.enums}
                     style={{...item.styles}}
                     placeholder="全部"/>
        </el-form-item>
      )
    },
    typeDatePicker(item) {
      return (
        <el-form-item prop={item.key}>
          {item.label !== false && <div class="prepend small">{item.name}</div>}
          <el-date-picker
            style={{width: '220px', ...item.styles}}
            v-model={this.searchData[item.key]}
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            picker-options={{...this.picker_options, ...item.pickerOptions}}
          />
        </el-form-item>
      )
    },
    handleDom(item) {
      return {
        select: this.typeSelect(item),
        datePicker: this.typeDatePicker(item),
        default: this.typeInput(item),
      }
    },
    typeSearchBtn() {
      const {searchProps: {onReset, onSearch}} = this;
      const searchDom = <el-button type="primary" icon="el-icon-search" onClick={this.handleSearch}>查询</el-button>
      const resetDom = <el-button icon="el-icon-refresh" onClick={this.handleReset}>重置</el-button>
      return (
        <div>
          {onSearch && searchDom}
          {onReset && resetDom}
        </div>
      )
    },
    handleSearch() {
      const {searchProps: {onSearch}} = this;
      onSearch && onSearch(this.searchData)
      // this.$emit('search', this.searchData)  // 可以自定义父级的事件，这里没用
    },
    handleReset() {
      const {searchProps: {onReset}} = this;
      // console.log(this.$refs['formData'].resetFields());
      this.searchData = {}
      onReset && onReset()
    },
    // handlerSearchData(newVal) {
    //   this.searchProps.formData = newVal
    // }
  },
  computed: {
    handlerSearchData() {
      // 这里可以直接操作父级的数据，前提是别深克隆
      this.searchProps.formData = this.searchData
    }
  },
  // watch: {
  //   // 跟上面的computed效果一样
  //   searchData: {
  //     // 页面能实时获取到数据
  //     handler: 'handlerSearchData',
  //     deep: true,
  //     immediate: true
  //   },
  // },
  render() {
    const {searchProps: {fields, formData}} = this;
    formData && this.handlerSearchData

    return (
      <div class="searchBox">
        <el-form
          props={{model: this.searchData}}
          label-width="85px"
          ref="formData"
          inline
          class="demo-form-inline"
        >
          {/*form表单*/}
          {
            fields.map((item) => {
              return (
                this.handleDom(item)[item.type || 'default']
              )
            })
          }

          {/* 操作按钮 */}
          <div class="searchBtn" style="float: right">
            {this.typeSearchBtn()}
            {/*额外的操作按钮*/}
            {this.$slots.default}
          </div>
        </el-form>
      </div>
    );
  }
};
```

## WithSearch文档


| 参数名   | 作用                                                         | 类型   | 默认值 |
| :------- | :----------------------------------------------------------- | :----- | :----- |
| search   | 搜索初始值                                                   | object | {}     |
| fields   | 必填，搜索表单项                                             | array  | []     |
| onSearch | 查询操作,只有设置了此项，查询按钮才会显示                    | fun    | 无     |
| onReset  | 查询重置操作, 只有设置了此项，重置按钮才会显示               | fun    | 无     |
| formData | 获取form表单的值，只有设置了此项，才能获取最新值，默认不获取 | object | 无     |



**fields**

```javascript
const searchFields = [
  {
    key: 'name',
    name: '应用名称/ID',
    label: false, // 隐藏label
    styles: {width: '100px'} // 宽度
  },
  {
    key: 'mediaId', // 数据提交的字段
    name: '应用分类', // label的名字
    type: 'select', // form的类型  默认是 input
    enums: [{label: '是', value: 1}, {label: '否', value: 0}],  // 选框的数据
    enumType: {id: 'value', name: 'label'} // 选框的数据格式化
  },
  {
    key: 'system',
    name: '系统',
    type: 'datePicker',
    pickerOptions: { // picker的一些参数
      disabledDate(time) {
        return time.getTime() <= Date.now();
      },
    }
  }
];
```



## 组件使用

```vue
<template>
 <with-search :searchProps="searchProps"/>
</template>

export default {
   data() {
      return {
        searchProps: {
          search: {name: 112},
          fields: searchFields,
          onSearch: this.handleSearch,
          onReset: this.handleReset,
          formData: {}
        },
      }
   }
}
```


## 写在最后

`仅仅是提供一个思路，有待完善  有待完善  ...`