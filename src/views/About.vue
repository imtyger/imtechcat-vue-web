<template>
  <div v-if="blog !== null && blog !== ''">
    <el-header style="height: 100px; text-align: center">
      <span><h2>{{blog.title}}</h2></span>
    </el-header>
    <el-main>
      <mavon-editor v-html="blog.html"> {{blog.html}}</mavon-editor>
    </el-main>
    <el-footer class="footer">
      <span>时间：{{blog.createdAt | formatDate }}</span>
      <div class="index-tag-list" v-if="blog.tags !== null && blog.tags !== ''">
        <span>标签：</span>
        <el-tag class="index-tag-list-item" disable-transitions size="mini" type="info" effect="plain"
                v-for="tag in blog.tags" :key="tag">
          <router-link :to="{ path:'/tags/post/'+ tag }">{{ tag }}</router-link></el-tag>
      </div>
    </el-footer>
    <div class="page-component__scroll el-scrollbar__wrap">
      <el-backtop></el-backtop>
    </div>
  </div>
</template>

<script>
  import { getAbout } from '../api/blog'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'about',
    data() {
      return{
        // id: this.$route.params.id,
        blog: ''
      }
    },
    components: {
      mavonEditor
    },
    mounted () {
      this.getBlogDetail()
    },
    watch: {
      $route(to, from) {
        this.getBlogDetail()
      }
    },
    methods:{
      async getBlogDetail(){
        const data = await getAbout();
        this._formatList(data)
      },
      _formatList(data) {
        this.blog = data.data;
      },
    }
  }
</script>

<style scoped>
  .el-row {
    width: 20%;
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }

  .row_class{
    width: 20%;
  }

  .el-main{
    text-align: center;
    margin-top: 10px;
    margin-left: 200px;
    margin-right: 200px;
  }

  .footer{
    text-align: left;
    margin-top: 30px;
    margin-left: 200px;
    margin-right: 200px;
    font-size: 12px;
    font-family: "YouYuan";
    color: #999999;
  }

  h3,h4,h5{
    font-weight: normal;
    font-size: 16px;
  }

  .page-component__scroll{
    overflow:hidden;
  }

  .page-component__scroll>.el-scrollbar__wrap {
    overflow-x: auto;
  }
</style>

