<template>
  <div>
    <!--编辑界面-->
    <el-dialog class="dialog-title" title="编辑" width="50%" :visible.sync="dialogVisible" divider>
      <el-form :model="selectedItem" label-width="50px" :rules="rules" ref="Form">
        <el-form-item label="名称" prop="title">
          <el-input v-model="selectedItem.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descr">
          <el-input v-model="selectedItem.descr" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { updateHomeTags } from '../../../api/tag'
  export default {
    props: ['editDialogType', 'selectedItem'],
    data () {
      return {
        editLoading: false,
        rules: {
          title: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-20个字符', trigger: 'blur'}
          ],
          descr: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.editDialogType !== -1
        },
        set(value) {
          if(!value) {
            this.$refs.Form.resetFields()

            this.$emit('update:editDialogType', -1)
          }
        }
      }
    },
    methods: {
      editSubmit(){
        //link校验失败
        this.$refs.Form.validate(async valid => {
          if(valid){
            this.editLoading = true;
            const newData = await updateHomeTags(this.selectedItem).then(() => {
              this.editLoading = false;
              this.editDialogType = -1
              window.location.reload()
              //关闭页面
            }).catch( error=> {
              this.editLoading = false;
            })

          }else{
            alert('error submit!!')
            return false;
          }
        })

      }
    }
  }
</script>

<style scoped>
  .dialog-title{
    text-align: left;
  }
</style>
