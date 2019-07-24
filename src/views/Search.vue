<template>
  <div class="search">
    <div class="input-search">
      <el-input v-model="input" type="text" clearable class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click.native="submitSearch"></el-button>
      </el-input>
    </div>
    <!--<template v-if=" searchMarks !== null && searchMarks.length !== 0">-->
      <!--<div class="search-table">-->
        <!--<el-table :data="searchMarks"-->
                  <!--stripe style="width: 100%" height="600"-->
        <!--&gt;-->
          <!--<el-table-column fixed sortable prop="lastUpdatedAt" label="日期" ></el-table-column>-->
          <!--<el-table-column sortable prop="markTitle" label="标题" ></el-table-column>-->
          <!--<el-table-column prop="markLink" label="URL" ></el-table-column>-->
        <!--</el-table>-->
      <!--</div>-->
    <!--</template>-->
  </div>
</template>

<script>
  import { searchBookmarkListLikeName } from '../api/search'
  import { Message } from 'element-ui'

  export default {
    name: 'search',
    data () {
      return {
        input: '',
        pageNum: 1,
        pageSize: 20,
        searchMarks: []
      }
    },

    methods: {
      async submitSearch () {
        await searchBookmarkListLikeName(this.input.trim()).then((res) => {
          if(res.data){
            const result = res.data
            if(result.code === 200){
              this.searchMarks = result.data
            }else{
              Message({
                message: result.msg,
                type: 'error',
                duration: 3 * 1000,
              })
            }
          }else{
            return false
          }

        }).catch(err => {
          console.log(err)
          return err
        })

      }
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

  .search-table {
    margin-top: 50px;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 9px;
  }

</style>
