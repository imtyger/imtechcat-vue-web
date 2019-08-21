<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="8" class="grid-content">
        <el-input v-model="searchData" size="mini" placeholder="输入关键字搜索" clearable></el-input>
      </el-col>
      <el-col :span="8" class="grid-content">
        <router-link :to="{path:'/home/blog-new'}">
          <el-button size="mini" type="primary">新建</el-button>
        </router-link>

      </el-col>
    </el-row>

    <el-container>
      <el-table :data="blogList" style="width: 100%" stripe
                :default-sort="{prop: 'lastUpdatedAt', order: 'descending'}" v-loading="listLoading">
        <el-table-column label="标题" prop="blogTitle" sortable></el-table-column>
        <el-table-column label="标签" prop="tags">
          <template slot-scope="scope">
            <div v-if="scope.row.tags !== null && scope.row.tags.size !== 0">
              <el-tag disable-transitions size="small" effect="plain" v-for="tag in scope.row.tags"
                      :key="tag"> {{ tag }} </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" sortable></el-table-column>
        <el-table-column label="最后更新时间" prop="lastUpdatedAt" sortable></el-table-column>
        <el-table-column label="展示" prop="status" >
          <div slot-scope="scope">
            <el-switch v-model="scope.row.status" name="status" active-value="1" inactive-value="0"
                       @change="switchStatus(scope.row)" placement="top"></el-switch>
          </div>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <div slot-scope="scope">
            <el-button size="mini" @click="editBlog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteBlog(scope.row)">删除</el-button>
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

  </div>

</template>

<script>
  import pagination from '@/components/Pagination'
  import { updateHomeBlogByIdAndStatus, getHomeBlogList, deleteHomeBlog } from '../../../api/blog'
  import { Message, MessageBox } from 'element-ui'

  export default {
    data () {
      return {
        dialogType: -1,
        editType: -1,
        listLoading: false,
        blogList: [],
        pageNum: 1,
        pageSize: 5,
        pageTotal: undefined,
        count: undefined,
        searchData: '',
        selectedItem: {},
        status: undefined
      }
    },
    mounted () {
      this.getList()
    },
    components: {
      pagination
    },
    watch: {
      $route(to, from) {
        this.getList()
      }
    },
    methods: {
      async getList () {
        const blog = await getHomeBlogList(this.$route.query)
        this._formatList(blog)
      },
      _formatList(data) {
        this.blogList = data.data.list
        if(this.blogList !== null || this.blogList !== ''){
          this._checkBlogStatus(this.blogList);
        }
        this.pageNum = data.data.pageNum
        this.pageSize = data.data.pageSize
        this.pageTotal = data.data.pageTotal
        this.count = data.data.count
      },
      _checkBlogStatus(blogList) {
        blogList.forEach((blog) => {
          if(blog.status == true){
            blog.status = "1";
          }else{
            blog.status = "0";
          }
        })
      },
      onClickNew () {

      },
      editBlog(item){
        const id = item.id
        this.$router.push('/home/blog-edit/'+id)
      },
      async deleteBlog(row){
        MessageBox.confirm('确定删除此记录嘛？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          // let para = { id: row.id };
          deleteHomeBlog(row).then(() => {
            this.listLoading = false;
            Message.success('删除成功')
            window.location.reload()
          }).catch(error => {
            Message.error(error.message)
          })
        }).catch(() => {})

      },
      search(){

      },
      switchStatus(row){
        updateHomeBlogByIdAndStatus(row.id, row.status).then(res => {
          this.status = res.data.status;
        }).catch(() => {
          Message.error('修改展示失败')
        })
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
  .el-tag+ .el-tag{
    margin-left: 6px;
  }
</style>
