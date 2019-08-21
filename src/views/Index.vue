<template>
  <div class="recent-posts">
    <el-row>
      <el-col :span="24" v-for="blog in blogList">
        <article class="recent-post-item">
          <router-link :to="{path:'/post/'+ blog.id }" class="title">
            <h2>{{blog.blogTitle}}</h2>
          </router-link>
          <div class="post-meta">
            <span>{{ blog.createdAt | formatDate }}</span>
            <span>&nbsp;/&nbsp;</span>
            <ul class="index-tag-list" v-if="blog.tags !== null && blog.tags.size !== 0">
              <li class="index-tag-list-item" v-for="tag in blog.tags" :key="tag">{{ tag }}&nbsp;</li>
            </ul>
          </div>
          <div v-html="blog.blogProfile"></div>
          <router-link :to="{path:'/post/'+ blog.id }" class="post-excerpt">
            <p>阅读原文></p>
          </router-link>
        </article>
      </el-col>
    </el-row>
    <div class="page-component__scroll el-scrollbar__wrap">
      <el-backtop></el-backtop>
    </div>
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
  .recent-posts {
    margin: 10px 150px 10px 150px;
    padding: 20px;
  }

  .recent-posts {
    margin: 0 auto;
    max-width: 70%;
  }
  @media (max-width: 576px) {
    .recent-posts {
      padding: 10px;
    }
  }
  .recent-posts .recent-post-item {
    margin: 2 px auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: none;
  }
  .recent-posts .recent-post-item .post-excerpt {
    color: #999;
    font-size: 14px;
  }
  @media screen and (max-width: 576px) {
    .recent-posts .recent-post-item .post-excerpt {
      display: none;
    }
  }
  .recent-posts .recent-post-item .post-meta {
    font-size: 12px;
    position: relative;
    padding-right: 60px;
    min-height: 30px;
  }
  .recent-posts .recent-post-item .title {
    font-size: 12px;
  }
  .recent-posts .recent-post-item .title h2 {
    font-size: 1.2rem;
    font-weight: normal;
  }
  @media screen and (max-width: 576px) {
    .recent-posts .recent-post-item .title h2 {
      font-size: 1rem;
    }
  }
  .recent-posts .recent-post-item .title:hover {
    color: #2196F3;
  }
  .recent-posts .recent-post-item .more {
    margin-top: -5px;
    font-size: 14px!important;
  }
  .recent-posts .recent-post-item .more:hover {
    color: #2196F3;
  }
  .recent-posts .recent-post-item .index-tag-list {
    display: inline;
    padding: 0;
  }
  .recent-posts .recent-post-item .index-tag-list .index-tag-list-item {
    margin-right: 5px;
    color: #999;
    padding: 2px 5px;
    background-color: #f6f6f6;
    border-radius: 2px;
    display: inline;
    list-style: none;
  }
  .recent-posts .recent-post-item .index-tag-list .index-tag-list-item:hover {
    background-color: #efefef;
  }
  .recent-posts .recent-post-item .time {
    color: #999;
  }

  .backtop{
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }

  .page-component__scroll{
    overflow:hidden;
  }

  .page-component__scroll>.el-scrollbar__wrap {
    overflow-x: auto;
  }

</style>
