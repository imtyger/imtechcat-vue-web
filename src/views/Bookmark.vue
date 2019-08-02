<template>
  <div>
    <div class="content">
      <div v-for="mark in markList" class="book-mark-item">
        <a target="_blank" :href="mark.markLink">{{mark.markTitle}}</a>
      </div>
    </div>
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
  import { getBookmarkList } from '../api/bookmark'
  import pagination from '@/components/Pagination'

  export default {
    data () {
      return {
        markList: {},
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
      this.getMarkList()
    },
    watch: {
      $route(to, from) {
        this.getMarkList()
      }
    },
    methods: {
      async getMarkList () {
        const data = await getBookmarkList ()
        this._formatList(data)
      },
      _formatList(data) {
        this.markList = data.data.list
        this.pageNum = data.data.pageNum
        this.pageSize = data.data.pageSize
        this.pageTotal = data.data.pageTotal
        this.count = data.data.count
      },
    }
  }
</script>

<style scoped>
  .content {
    margin: 10px 180px 10px 180px;
    padding: 20px;
  }

  .book-mark-item {
    margin-top: 15px
  }
</style>
