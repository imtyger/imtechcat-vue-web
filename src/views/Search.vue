<template>
  <div>
    <div class="input-search">
      <el-input v-model="q" type="text" clearable class="input-with-select"
                @keyup.enter.native="submitSearch">
        <el-button slot="append" icon="el-icon-search" @click.native="submitSearch"></el-button>
      </el-input>
    </div>
<!--    <search-tool keywordType="q" :placeholder="this.$route.query.q || '搜索'"></search-tool>-->
    <div class="content">
      <div v-for="blog in blogList">
        <ul>
          <article>
            <router-link :to="{path:'/post/'+ blog.id }" class="title">
              <li>{{blog.blogTitle}}</li>
            </router-link>
          </article>
        </ul>
        <ul class="profile" v-html="blog.blogProfile"></ul>
      </div>
    </div>
  </div>

</template>

<script>
  import { searchBlogListLikeInput } from "../api/search";
  import { Message } from 'element-ui'
  // import searchTool from "../components/SearchTool";

  export default {
    // components: {
    //   searchTool
    // },
    data () {
      return {
        q: '',
        pageNum: 1,
        pageSize: 20,
        blogList: []
      }
    },

    methods: {
      async submitSearch () {
        await searchBlogListLikeInput(this.q).then((res) => {//this.$route.query.q
          this.blogList = res.data.list;
        }).catch(error => {
          Message.error(error.message())
        })
      }
    },
    mounted() {
      this.submitSearch();
    }
  }
</script>

<style scoped>

  .input-search {
    margin-top: 50px;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 9px;
  }

  .input-with-select {
    background-color: #fff;
  }

  .content {
    margin-top: 50px;
    margin-left: 20%;
    margin-right: 20%;
    margin-bottom: 50px;
    padding: 20px;
  }

  .profile{
    font-size: 14px;
    font-family: "YouYuan";
    color: #999999;
  }

</style>
