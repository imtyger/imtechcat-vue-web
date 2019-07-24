<template>
    <div>
      <ul><h3>{{ tagName }}</h3></ul>
      <div v-if="blogList !== null && blogList.size !== 0">
        <div v-for="blog in blogList">
          <ul>
            <router-link :to="{path:'/post/'+ blog.id }">
              {{ blog.blogTitle }}
            </router-link>
          </ul>
          <ul>
            {{ blog.createdAt }}
          </ul>
        </div>
      </div>

    </div>
</template>

<script>
  import { getBlogsPostTagName } from '../api/blog'
  export default {
    data () {
      return {
        tagName: this.$route.params.tagName,
        blogList: {}
      }
    },
    mounted () {
      this.getBlogList()
    },
    watch: {
      $route(to, from) {
        this.getBlogList()
      }
    },
    methods:{
      async getBlogList(){
        const data = await getBlogsPostTagName(this.tagName);
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
