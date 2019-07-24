<template>
  <div>
    <el-dialog title="新建" class="dialog-title" width="50%" :visible.sync="dialogVisible">
      <el-form :model="tag" :rules="rules" label-width="50px" ref="Form">
        <el-form-item label="名称" prop="tagName">
          <el-input v-model="tag.tagName" auto-complete="off" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="tagDesc">
          <el-input v-model="tag.tagDesc" auto-complete="off" placeholder="描述"></el-input>
        </el-form-item>
        <!--<el-form-item label="标签" prop="tags">-->
        <!--<el-input v-model="Mark.tags" auto-complete="off" placeholder="标签"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click.native="submitDialog" :loading="loading">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import { newHomeTags } from '../../../api/tag'
  export default {
    props: ['dialogType'],
    data () {
      return {
        loading: false,
        tag: {
          tagName: '',
          tagDesc: ''
          // tags: undefined,
        },
        rules: {
          tagName: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-20个字符', trigger: 'blur'}
          ],
          tagDesc: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.dialogType !== -1
        },
        set(value) {
          if(!value) {
            this.$refs.Form.resetFields()
            this.$emit('update:dialogType', -1)
          }
        }
      }
    },
    methods : {
      submitDialog () {
        //link校验失败
        this.$refs.Form.validate(async valid => {
          if(valid){
            this.loading = true;
            const newData = await newHomeTags(this.tag).then( res => {
              this.loading = false;
              this.dialogType = -1
              window.location.reload()
              //关闭页面
              //数据添加到table最后一行

            }).catch( error=> {
              this.loading = false;
            })

          }else{
            alert('error submit!!')
            return false;
          }
        })
      },
    }

  }
</script>

<style scoped>

  .dialog-title{
    text-align: left;
  }
</style>

