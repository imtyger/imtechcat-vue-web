<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="8" class="grid-content" >
        <el-input v-model="searchData" size="mini" @click="searchMark" placeholder="输入书签标题搜索" clearable></el-input>
      </el-col>
      <el-col :span="8" class="grid-content">
        <el-button size="mini" type="primary" @click="onClickNew">新建</el-button>
      </el-col>
    </el-row>
    <new-mark-dialog :dialogType.sync="dialogType"/>

    <el-container>
      <el-table :data="markList" style="width: 100%" stripe
                :default-sort="{prop: 'lastUpdatedAt', order: 'descending'}" v-loading="listLoading" >
        <el-table-column type="index" ></el-table-column>
        <el-table-column label="标题" prop="markTitle"  sortable>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>标题: {{ scope.row.markTitle }}</p>
              <p>描述: {{ scope.row.markDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.markTitle }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="URL" prop="markLink"  class="info-content">
          <template slot-scope="scope" >
            <a target="_blank" :href="scope.row.markLink">{{ scope.row.markLink }}</a>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="tags" >
          <template slot-scope="scope">
            <div v-if="scope.row.tags !== null && scope.row.tags.size !== 0">
              <el-tag disable-transitions size="small" effect="plain" v-for="tag in scope.row.tags"
                      :key="tag">{{ tag }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt"  sortable></el-table-column>
        <el-table-column label="最后更新时间" prop="lastUpdatedAt"  sortable></el-table-column>
        <el-table-column label="操作" fixed="right" >
          <div slot-scope="scope">
            <el-button size="mini" @click="editMark(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteMark(scope.$index, scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </el-container>
    <pagination
      background
      layout="prev, pager, next"
      :pageTotal="count"
      :pageNum="pageNum"
      :pageSize="pageSize"
    >
    </pagination>

    <edit-mark-dialog :selectedItem="selectedItem" :editDialogType.sync="editDialogType" />

  </div>
</template>

<script>
  import newMarkDialog from '@/views/home/dialog/NewMarkDialog'
  import editMarkDialog from '@/views/home/dialog/EditMarkDialog'
  import pagination from '@/components/Pagination'
  import { getHomeBookmarks, deleteHomeBookmarks } from '../../api/bookmark'
  import { Message, MessageBox } from 'element-ui'

  export default {
    data () {
      return {
        dialogType: -1,
        editDialogType: -1,
        listLoading: false,
        markList: [],
        pageNum: 1,
        pageSize: 5,
        pageTotal: undefined,
        count: undefined,
        searchData: '',
        selectedItem: {}
      }
    },
    mounted () {
      this.getList()
    },
    components: {
      newMarkDialog,
      editMarkDialog,
      pagination
    },
    watch: {
      $route(to, from) {
        this.getList()
      }
    },
    methods: {
      async getList () {
        const bookmarks = await getHomeBookmarks(this.$route.query)
        this._formatList(bookmarks)
      },
      _formatList(data) {
        this.markList = data.data.list
        this.pageNum = data.data.pageNum
        this.pageSize = data.data.pageSize
        this.pageTotal = data.data.pageTotal
        this.count = data.data.count
      },
      onClickNew () {
        this.dialogType = 1;
      },
      editMark(item){
        this.selectedItem = item
        this.editDialogType = 1
      },
      async deleteMark(index,row){
        MessageBox.confirm('确定删除此记录嘛？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          // let para = { id: row.id };
          deleteHomeBookmarks(row).then(() => {
            this.listLoading = false;
            Message.success('删除成功')
            window.location.reload()
          }).catch(error => {
            Message.error(error.message)
          })
        }).catch(() => {})

      },
      searchMark(){

      }
    }
  }
</script>

<style scoped>
  .grid-content{
    border-radius: 4px;
    min-height: 36px;

  }
  .el-table-column .info-content{
    width: 100%; /*根据自己项目进行定义宽度*/
    overflow: hidden; /*设置超出的部分进行隐藏*/
    text-overflow: ellipsis; /*设置超出部分使用省略号*/
    white-space: nowrap; /*设置为单行*/
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-tag+ .el-tag{
    margin-left: 6px;
  }

</style>
