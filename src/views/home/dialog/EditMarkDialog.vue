<template>
  <div>
    <!--编辑界面-->
    <el-dialog class="dialog-title" title="编辑" width="50%" :visible.sync="dialogVisible" divider>
      <el-form :model="selectedItem" label-width="50px" :rules="rules" ref="Form">
        <el-form-item label="标题" prop="markTitle">
          <el-input v-model="selectedItem.markTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="markDesc">
          <el-input v-model="selectedItem.markDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input v-model="selectedItem.tags" auto-complete="off" >
            <template slot-scope="scope">
              <div v-if="selectedItem.tags !== null && selectedItem.tags.size !== 0">
                <el-tag disable-transitions size="small" effect="plain" v-for="tag in selectedItem.tags"
                        :key="tag">{{ tag }}</el-tag>
              </div>
            </template>
          </el-input>

        </el-form-item>
        <el-form-item label="URL" prop="markLink">
          <el-input v-model="selectedItem.markLink" type="textarea" :row="3" auto-complete="off"></el-input>
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
  import { isURL } from '@/utils/validate'
  import { updateHomeBookmarks } from '../../../api/bookmark'
  export default {
    props: ['editDialogType', 'selectedItem'],
    data () {
      const validateURL = (rule, value, callback) => {
        if(!isURL(value)){
          callback(new Error('非法URL'))
        }else{
          callback()
        }
      }
      return {
        editLoading: false,
        rules: {
          markTitle: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur'}
          ],
          markDesc: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur'}
          ],
          markLink: [
            { required: true, message: '必填项', trigger: 'blur'},
            { validator: validateURL, trigger: 'blur'}
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
            const newData = await updateHomeBookmarks(this.selectedItem).then(() => {
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
