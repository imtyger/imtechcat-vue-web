<template>
  <div style="text-align: center;margin-top: 30px;">
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="pageTotal"
      :current-page="pageNum"
      :page-size='pageSize'
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: ['pageTotal', 'pageSize', 'pageNum', 'path'],
    methods: {
      handleCurrentChange(pageNum) {
        if (pageNum !== this.pageNum) {
          this.$router.push({ path: this.$route.path, query: { ...this.$route.query, pageNum}})
        }
      },

    }
  }
</script>



