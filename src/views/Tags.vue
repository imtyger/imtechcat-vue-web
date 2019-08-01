<template>
  <div>
    <el-container>
      <el-main>
        <div v-if="tagList !== null && tagList.size !== 0">
          <div v-for="tags in tagList">
            <el-tag>
              <router-link :to="{path:'/tags/post/'+ tags.tagName }">{{ tags.tagName }}
              </router-link> {{ tags.count }}
            </el-tag>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { getTags } from '../api/tag'

  export default {
    data () {
      return {
        tagList: {}
      }
    },
    mounted () {
      this.getTagList()
    },
    watch: {
      $route(to, from) {
        this.getTagList()
      }
    },
    methods: {
      async getTagList () {
        const data = await getTags ()
        this._formatList(data)
      },
      _formatList(data) {
        this.tagList = data.data.list
      },
    }
  }
</script>

<style scoped>

</style>
