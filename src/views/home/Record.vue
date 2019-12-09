<template>
  <el-tabs type="border-card">
    <el-tab-pane label="登录">
      <el-table :data="loginRecord" style="width: 100%" stripe
                :default-sort="{prop: 'updatedAt', order: 'descending'}" v-loading="loading" >
        <el-table-column type="index" ></el-table-column>
        <el-table-column label="用户ID" prop="userId"></el-table-column>
        <el-table-column label="客户端" prop="userAgent"></el-table-column>
        <el-table-column label="最后登录时间" prop="lastLoginAt" sortable></el-table-column>
        <el-table-column label="最后登录IP" prop="lastLoginIp"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="博客">
      <div></div>
      <div></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { getLoginInfo } from "../../api/record";
  import { Message } from 'element-ui'
  export default {
    data () {
      return {
        reverse: true,
        loginRecord: [],
        bookmarkRecord: [],
        tagRecord: [],
        blogRecord: [],
        loading: false,
        pageNum: 1,
        pageSize: 30,
        pageTotal: undefined,
        count: undefined,
      }
    },
    mounted() {
      this.getLoginInfoRecord()
    },
    methods: {
      async getLoginInfoRecord () {
        await getLoginInfo(this.pageNum, this.pageSize).then((res) => {
          this.loginRecord = res.data.list
        }).catch( error => {
          Message.error(error.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>
