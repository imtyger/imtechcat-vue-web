<template>
  <div class="components-container">
    <el-form :model="blogForm" :rules="rules" ref="blogForm" style="width: 100%">
      <el-form-item  prop="blogTitle" >
        <el-input v-model="blogForm.blogTitle" type="text" auto-complete="off" clearable placeholder="标题" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item prop="tags">
        <!--<el-input v-model="mark.tags" auto-complete="off" placeholder="标签"></el-input> :v-infinite-scroll="selectLoad"-->
        <el-select v-model="blogForm.tags" multiple :multiple-limit="5" placeholder="标签"  style="width: 100%" filterable clearable>
          <div v-if="selectItems !== null && selectItems.size !== 0">
            <el-option v-for="item in selectItems" :key="item" :label="item" :value="item"></el-option>
          </div>
          <div v-else>

          </div>
        </el-select>
      </el-form-item>

      <el-form-item  prop="blogContent" >
        <div class="editor-container">
          <markdown-editor ref="markdownEditor" v-model="blogForm.blogContent" :language="language" height="500px" />
        </div>
      </el-form-item>

      <el-form-item prop="blogHtml" fixed="right">
        <el-button style="margin-top: 20px;" type="primary" size="small" @click="saveBlog" :loading="loading" >保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  import { newHomeBlog } from '../../../api/blog'
  import { getBookmarkDefaultTagNames } from '../../../api/tag'
  import { Message } from 'element-ui'

  export default {
    components: { MarkdownEditor },
    data() {
      return {
        blogForm: {},
        languageTypeList: {
          'en': 'en_US',
          'zh': 'zh_CN',
          'es': 'es_ES'
        },
        loading: false,
        selectItems: [],
        rules: {
          blogTitle: [
            {required: true, message: '请填写标题', trigger: 'blur'},
            {min: 2, max: 50, message: '标题长度在2-50个字符', trigger: 'blur'}
          ],
          blogContent: [
            {required: true, message: '请填写内容', trigger: 'blur'},
            {min: 2, message: '内容最少包含10个字符', trigger: 'blur'}
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
      language() {
        return this.languageTypeList['en']
      }
    },
    methods: {
      async getDefaultTagList () {
        const data = await getBookmarkDefaultTagNames();
        this.selectItems = data.data.tags;
      },
      async saveBlog() {
        //获取html
        this.blogForm.blogHtml = this.$refs.markdownEditor.getHtml()
        this.$refs['blogForm'].validate( async valid =>{
          if(valid){
            this.loading = true
            await newHomeBlog(this.blogForm).then(() => {
              this.loading = false;
              //跳转博客页面
              this.$router.push('/home/blog')

            }).catch( error=> {
              this.loading = false;
              Message.error(error.message)
            })
          }else {
            Message.error('error submit!!!')
            return false
          }
        });

      }

    }
  }
</script>

<style scoped>
  .editor-container{
    margin-bottom: 30px;
  }
  .tag-title{
    margin-bottom: 5px;
  }
</style>

