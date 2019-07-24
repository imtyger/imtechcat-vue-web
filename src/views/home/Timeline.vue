<template>
  <div class="block">
    <el-timeline :data="recordList" style="width: 80%" :reverse="reverse">
      <el-timeline-item v-for="(record, index) in recordList" :key="index" :timestamp="record.createdAt" placement="top" :type="primary" :icon="el-icon-more" :size="mini">
        <el-card>
          <h4>{{record.content}}</h4>
          <p>{{userInfo.nickname}} 提交于 {{record.createdAt}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        reverse: true,
        recordList: []
      }
    }
  }
</script>

<style scoped>

</style>
