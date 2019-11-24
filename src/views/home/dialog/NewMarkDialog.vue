<template>
    <div>
      <el-dialog title="新建" class="dialog-title" width="50%" :visible.sync="dialogVisible">
        <el-form :model="mark" :rules="rules" label-width="50px" ref="Form">
          <el-form-item label="标题" prop="title">
            <el-input v-model="mark.title" auto-complete="off" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="descr">
            <el-input v-model="mark.descr" auto-complete="off" placeholder="描述"></el-input>
          </el-form-item>
<!--          <el-form-item label="标签" prop="tags">-->
<!--            &lt;!&ndash;<el-input v-model="mark.tags" auto-complete="off" placeholder="标签"></el-input> :v-infinite-scroll="selectLoad"&ndash;&gt;-->
<!--            <el-select v-model="mark.tags" multiple :multiple-limit="5" placeholder="选择或搜索"  style="width: 100%" filterable clearable>-->
<!--              <div v-if="selectItems !== null && selectItems.size !== 0">-->
<!--                <el-option v-for="item in selectItems" :key="item" :label="item" :value="item"></el-option>-->
<!--              </div>-->
<!--              <div v-else>-->

<!--              </div>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="URL" prop="link">
            <el-input v-model="mark.link" type="textarea" :row="3" auto-complete="off" placeholder="URL"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible=false">取 消</el-button>
          <el-button size="small" type="primary" @click.native="submitDialog" :loading="loading">确 定</el-button>
        </div>

      </el-dialog>
    </div>
</template>

<script>
  import { isURL } from '@/utils/validate'
  import { newHomeBookmarks } from '../../../api/bookmark'
  import { getBookmarkDefaultTagNames } from '../../../api/tag'

  export default {
    props: ['dialogType'],
    data () {
      const validateURL = (rule, value, callback) => {
        if(!isURL(value)){
          callback(new Error('非法URL'))
        }else{
          callback()
        }
      };
      return {
        loading: false,
        mark: {},
        selectItems: [],
        // loadCount: 0,
        rules: {
          title: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur'}
          ],
          descr: [
            { required: true, message: '必填项', trigger: 'blur'},
            { type:'string', min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur'}
          ],
          link: [
            { required: true, message: '必填项', trigger: 'blur'},
            { validator: validateURL, trigger: 'blur'}
          ]
        },
      }
    },
    mounted () {
      this.getDefaultTagList()
    },
    watch: {
      $route(to, from) {
        this.getDefaultTagList()
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
      },
    },
    methods : {
      // selectLoad (){
      //   this.loadCount += 2;
      // },
      async getDefaultTagList () {
        const data = await getBookmarkDefaultTagNames();
        this.selectItems = data.data.tags;
      },
      submitDialog () {
        //link校验失败
        this.$refs.Form.validate(async valid => {
          if(valid){
            this.loading = true;
            console.log(this.mark.tags)
            console.log(this.mark)
            const newData = await newHomeBookmarks(this.mark).then( res => {
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
