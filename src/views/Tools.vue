<template>
    <div>
        <el-card class="box-card">
            <el-row style="text-align: center; margin-bottom: 20px;">时间转换</el-row>
            <el-row type="flex" :gutter="20">
                <el-col :span="8"><el-input v-model="timestamp1" placeholder="时间戳/毫秒" clearable></el-input></el-col>
                <el-col :span="2"><el-button @click="getDate">转换</el-button></el-col>
                <el-col :span="8"><el-input v-model="date1" placeholder="日期/yyyy-mm-dd hh:mm:ss" clearable></el-input></el-col>
                <el-col :span="8"><el-input v-model="date2" placeholder="日期/yyyy-mm-dd hh:mm:ss" clearable></el-input></el-col>
                <el-col :span="2"><el-button @click="getTimes">转换</el-button></el-col>
                <el-col :span="8"><el-input v-model="timestamp2" placeholder="时间戳/毫秒" clearable ></el-input></el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
    import { Message } from 'element-ui'
    import { timetrans, checkDate } from '../utils/validate'

    export default {
        data () {
            return {
                timestamp1: '',
                timestamp2: '',
                date1: '',
                date2: ''
            }
        },
        methods: {
            getDate() {
                if(this.timestamp1 >= 0 && this.timestamp1 !== null && this.timestamp1 !== ''){
                    this.date1 = timetrans(this.timestamp1)
                }else{
                    Message.error('时间戳格式错误')
                }
            },
            getTimes() {
                if(this.date2 !== null && this.date2 !== '' && checkDate(this.date2)){
                    this.timestamp2 = new Date(this.date2).getTime();
                }else{
                    Message.error('日期格式错误,请输入yyyy-mm-dd hh:mm:ss日期格式')
                }
            }
        }
    }
</script>

<style scoped>

    .box-card {
        border: 1px;
    }
</style>
