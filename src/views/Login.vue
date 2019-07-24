<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="login-container">
      <h3 class="title">请登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-row>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submitForm('ruleForm')" :loading="loading">登录</el-button>
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { login } from '../api/login'

  export default {
    data(){
      return {
        loading: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 5, max: 20, message: '长度在5-20个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, max: 20, message: '长度在5-20个字符', trigger: 'blur'}
          ]
        },
        checked: true
      };
    },
    methods: {
      submitForm(ruleForm){
        this.$refs[ruleForm].validate( async valid =>{
          if(valid){
            this.loading = true;
            this.$store.dispatch('login',this.ruleForm).then(() => {
              this.$router.push({ path: '/home'})
              this.loading = false
            })
              .catch(() => {
                this.loading = false
              })
          }else{
            this.resetForm(ruleForm)
            return false
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin-right: 100%;
  }

  .el-row {
    margin-top: 0px;
    margin-bottom: 25px;
  }

  .el-button {
    width: 350px;
  }
</style>
