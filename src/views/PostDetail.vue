<template>
    <div>
      <ul>
        <span><h3>{{blog.blogTitle}}</h3></span>
      </ul>
      <ul>
        {{blog.createdAt}}
        <div v-if="blog.tags !== null && blog.tags !== ''">
          <el-tag disable-transitions size="small" effect="plain" v-for="tag in blog.tags"
                  :key="tag"> {{ tag }}</el-tag>
        </div>
      </ul>
      <ul>
        <span v-html="blog.blogHtml">{{blog.blogHtml}}</span>
      </ul>
    </div>
</template>

<script>
  import { getBlogPostId} from '../api/blog'

  export default {
    name: 'postDetail',
    data() {
      return{
        id: this.$route.params.id,
        blog: ''
      }
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
        const data = await getBlogPostId(this.id);
        this._formatList(data)
      },
      _formatList(data) {
        this.blog = data.data;
      },
    }
  }
</script>

<style scoped>

</style>
