<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="8" class="grid-content" >
        <el-input v-model="searchData" size="mini" @click="searchTag" placeholder="输入标签名称搜索" clearable></el-input>
      </el-col>
      <el-col :span="8" class="grid-content">
        <el-button size="mini" type="primary" @click="onClickNew">新建</el-button>
      </el-col>
    </el-row>
    <new-tag-dialog :dialogType.sync="dialogType"/>
    <el-container>
      <el-table :data="tagList" style="width: 100%" stripe
                :default-sort="{prop: 'lastUpdatedAt', order: 'descending'}" v-loading="listLoading">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" prop="tagName" sortable>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>名称: {{ scope.row.tagName }}</p>
              <p>描述: {{ scope.row.tagDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.tagName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!--<el-table-column label="描述" prop="tagDesc"></el-table-column>-->
        <el-table-column label="创建时间" prop="createdAt" sortable></el-table-column>
        <el-table-column label="更新时间" prop="lastUpdatedAt" sortable></el-table-column>
        <el-table-column label="操作" fixed="right">
          <div slot-scope="scope">
            <el-button size="mini" @click="editTag(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteTag(scope.row)">删除</el-button>
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

    <edit-tag-dialog :selectedItem="selectedItem" :editDialogType.sync="editDialogType" />
  </div>
</template>

<script>
  import newTagDialog from '@/views/home/dialog/NewTagDialog'
  import editTagDialog from '@/views/home/dialog/EditTagDialog'
  import pagination from '@/components/Pagination'
  import { getHomeTags, deleteHomeTags, updateHomeTags, newHomeTags } from '../../api/tag'
  import { Message, MessageBox } from 'element-ui'
  export default {
    data () {
      return {
        dialogType: -1,
        editDialogType: -1,
        listLoading: false,
        tagList: [],
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
      newTagDialog,
      editTagDialog,
      pagination
    },
    watch: {
      $route(to, from) {
        this.getList()
      }
    },
    methods: {
      async getList () {
        const data = await getHomeTags(this.$route.query)
        this._formatList(data)
      },
      _formatList(data) {
        this.tagList = data.data.list
        this.pageNum = data.data.pageNum
        this.pageSize = data.data.pageSize
        this.pageTotal = data.data.pageTotal
        this.count = data.data.count
      },
      onClickNew () {
        this.dialogType = 1;
      },
      editTag(item){
        this.selectedItem = item
        this.editDialogType = 1
      },
      async deleteTag(row){
        MessageBox.confirm('确定删除此记录嘛？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          // let para = { id: row.id };
          deleteHomeTags(row).then(() => {
            this.listLoading = false;
            Message.success('删除成功')
            window.location.reload()
          }).catch(error => {
            Message.error(error.message)
          })
        }).catch(() => {})
      },
      searchTag(){

      }
    }
  }
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
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
</style>
