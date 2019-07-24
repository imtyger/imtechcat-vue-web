<template>
  <div>
    <el-container>
      <el-main>
        <div v-if="blogList !== null && blogList.size !== 0">
          <div v-for="blog in blogList">
            <ul>
              <router-link :to="{path:'/post/'+ blog.id }">
                <h4>{{blog.blogTitle}}</h4>
              </router-link>
            </ul>
            <ul>
              {{blog.createdAt}}
              <div v-if="blog.tags !== null && blog.tags.size !== 0">
                <el-tag disable-transitions size="small" effect="plain" v-for="tag in blog.tags"
                  :key="tag"> {{ tag }}</el-tag>
              </div>
            </ul>
            <ul>
              <span v-html="blog.blogHtml">{{blog.blogHtml}}</span>
            </ul>
            <ul>
              <router-link :to="{path:'/post/'+ blog.id }">
                <span>阅读原文></span>
              </router-link>
            </ul>
          </div>
        </div>
      </el-main>
      <el-footer class="bg">
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
        count: undefined,
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
      },
    }
  }
</script>

<style scoped>

  .el-footer{
    background-color: #999999;
    color: #333333;
    font-size: 12px;
    line-height: 60px;
  }
  .el-container{
    height: 100%;
  }
  .el-main{
    width: 100%;
    height: 100%;
    text-align: left;
  }

  .bg{
    height: 60px;
    text-align: center;
    background-color: #f9fafc;
  }

</style>
