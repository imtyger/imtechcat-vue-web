<template>
  <div>
    <el-container>
      <el-main>
        <div v-if="blogList !== null && blogList.size !== 0">
          <div v-for="blog in blogList">
            <el-row>
              <router-link :to="{path:'/post/'+ blog.id }">
                <span><h3>{{blog.blogTitle}}</h3></span>
              </router-link>
            </el-row>
            <el-row type="flex" justify="start">
              <span>{{ blog.createdAt | formatDate }}</span>
              <span>/</span>
              <span v-if="blog.tags !== null && blog.tags.size !== 0">
                  <el-tag disable-transitions size="mini" type="info"  effect="plain" v-for="tag in blog.tags"
                          :key="tag">{{ tag }}</el-tag>
              </span>
            </el-row>
            <el-row>
              <span v-html="blog.blogProfile">{{blog.blogProfile }}</span>...
            </el-row>
            <el-row>
              <router-link :to="{path:'/post/'+ blog.id }">
                <span>阅读全文></span>
              </router-link>
            </el-row>
          </div>
        </div>
      </el-main>
      <el-footer>
        <span>京ICP备19001124号-1</span>
      </el-footer>
    </el-container>


  </div>

</template>

<script>
  import { getBlogList } from '../api/blog'
  import pagination from '@/components/Pagination'

  export default {
    data () {
      return {
        blogList: {},
        pageNum: 1,
        pageSize: 10,
        pageTotal: undefined,
        count: undefined
      }
    },
    components: {
      pagination
    },
    mounted () {
      this.getBlogList()
    },
    watch: {
      $route(to, from) {
        this.getBlogList()
      }
    },
    methods: {
      async getBlogList () {
        const data = await getBlogList (this.$route.query)
        this._formatList(data)
      },
      _formatList(data) {
        this.blogList = data.data.list
        this.pageNum = data.data.pageNum
        this.pageSize = data.data.pageSize
        this.pageTotal = data.data.pageTotal
        this.count = data.data.count
      }
    }
  }
</script>

<style scoped>

  .el-footer{
    color: #333333;
    font-size: 12px;
    border: #cac6c6;
    line-height: 60px;
    text-align: center;
    background-color: #f9fafc;
  }
  el-container{
    height: 100%;
  }
  .el-main{
    height: 100%;
    text-align: left;
    font-size: 15px;
    margin-left: 150px;
    margin-right: 100px;
  }

  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0px;
      margin-left: 0px;
   }
  }
  .el-col {
    /*border-radius: 4px;*/
    margin-left: 0px;
    font-size: 14px;
  }

</style>
