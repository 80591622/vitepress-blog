

# Element-UI
## Table组件实现拖拽效果


最近业务需求要添加table的拖拽，但是element并没有table的拖拽功能，只能自己添加了。


找了两个组价库`sortablejs`和`vuedraggable`,后者是基于前者实现的更加符合vue标准的库，依赖于前者，但是项目中用的element的table, `vuedraggable`在这个基础上就不能使用，看[官方的示例](https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/table-example.vue) , 所以只能使用`sortablejs`了，我直接安装了`vuedraggable`，它依赖`sortablejs`可以直接使用里面的特性，万一后期再有其他拖拽的功能，这个库上手还比较方便。


## Sortable使用示例

```javascript
<template>
    <el-card v-loading="fullscreenLoading">
        <el-table
                :data="tableOptions.data"
                border
                size="small"
                row-key='roleId'
                ref="table"
                @cell-mouse-enter.once='rowDrop'
        >
            <el-table-column
                    prop="sort"
                    label="拖拽区域"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="small" class="handle">按住拖拽</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    v-for="item of column"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :fixed="item.fixed"
            />
        </el-table>
        <el-pagination
                background
                :hide-on-single-page="paginationOptions.showPage"
                :layout="paginationOptions.layout"
                :page-sizes="paginationOptions.pageSizes"
                :total="paginationOptions.total"
                :page-size="paginationOptions.pageSize"
                :current-page="paginationOptions.currentPage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        />
    </el-card>
</template>
<script>
  import Sortable from 'sortablejs';
  import table from "@/mixins/table"

  export default {
    name: 'TableDraggable',
    mixins: [table],
    props: {},
    data() {
      return {
        column: [
          {
            prop: "roleId",
            label: "序号",
            width: 100,
          },
          {
            prop: 'roleName',
            label: "角色名称",
          },
          {
            prop: "createTime",
            label: "创建时间",
          },
          {
            prop: "roleId",
            label: "序号",
            width: 100,
          },
          {
            prop: 'edit',
            label: "编辑",
            width: 180,
            fixed: 'right'
          },
        ],
        fullscreenLoading: true,
        paginationOptions: {
          pageSizes: [10, 20, 30, 40],
        },
      }
    },
    watch: {
      'tableOptions.data': {
        deep: true,
        handler: function (newData) {
          // console.log(newData);  // 可以发现每次拖拽后数据发生了改变
        }
      }
    },
    methods: {
      //行拖拽
      rowDrop() {
        const tbody = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody');
        const _this = this;
        Sortable.create(tbody, {
          handle: '.handle',
          animation: 150,
          onChoose() {
            //选择元素
            _this.column[_this.column.length - 1].fixed = false
          },
          onUnchoose: function (evt) {
            // 取消选择元素
            _this.column[_this.column.length - 1].fixed = 'right'

          },
          onEnd({newIndex, oldIndex}) {
            // 拖拽完成
            const currRow = _this.tableOptions.data.splice(oldIndex, 1)[0]
            _this.tableOptions.data.splice(newIndex, 0, currRow)
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
    .handle {
        cursor: move
    }

    ::v-deep .hover-row > td {
        background-color: #fff !important;
    }

    ::v-deep .sortable-chosen > td {
        // 拖动的样式
        background-color: #eff2f6 !important;
    }

    ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
        // 修复拖拽的时候hover的不消失的问题
        background-color: #fff;
    }
</style>

```



**上面的代码有一些注意的地方我一一列举下来**



1. element table务必指定`row-key`，row-key必须是唯一的，不然会出现排序不对的情况。
2. 我在table里面使用了**fixed**，最后一列是固定在右侧，用过element的知道这是两个table的拼接成的，所以拖拽是没有反应的
   1. 以因为上面我们有指定row-key，所以拖拽后不会出现错位的情况，但是在拖拽的时候，是有很明显的错位出现。
   2. 我解决的思路是在拖拽的时候先把这个固定取消`onChoose`,然后拖拽完成后在把固定加上`onUnchoose`,具体看两个方法的代码
3. 样式table会有鼠标滑过的效果，但是使用拖拽后，鼠标滑过后的效果不消失，甚至会出现很多个鼠标滑过的效果，解决的方式比较粗暴，我是把所有的滑过的效果全部取消了，谁有更好的方案欢迎评论区留言。
	1. 不使用`fixed`,可以防止2、3问题
4. `mounted`生命周期调取的`rowDrop`方法，会出现的问题是，如果在`created`调取的接口量大在`mounted`周期可能不能更好的渲染完成，此时将获取不到`tbody`,所以这里我的解决办法就是使用,table组件自带的`@cell-mouse-enter.once='rowDrop'`，hover滑过的时候完成初始化，加上once是他只需要执行一次，或者更粗暴的办法直接使用定时器。



## 参考文档 

[draggable](https://sortablejs.github.io/Vue.Draggable/#/table-example)

[sortable](https://github.com/SortableJS/Sortable)