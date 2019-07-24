<template>
    <div>
      <ul>
        <span><h3>{{blog.blogTitle}}</h3></span>
      </ul>
      <ul>
        <span>{{blog.createdAt}} / {{blog.tags}}</span>
      </ul>
      <ul>
        <span>{{blog.blogHtml}}</span>
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
