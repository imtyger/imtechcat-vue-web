<template>
    <div class="components-container">
        <el-form :model="blogForm" :rules="rules" ref="blogForm" style="width: 100%">
            <el-form-item  prop="title" >
                <el-input v-model="blogForm.title" type="text" auto-complete="off" clearable placeholder="标题"
                          style="width: 100%"></el-input>
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
            <el-form-item prop="content" >
                <mavon-editor style="height: 600px" v-model="blogForm.content" @change="changeData"></mavon-editor>
            </el-form-item>
            <el-form-item prop="html" fixed="right">
                <el-button style="margin-top: 20px;" type="primary" size="small" @click="exit" :loading="loading" >取消
                </el-button>
                <el-button style="margin-top: 20px;" type="primary" size="small" @click="saveBlog" :loading="loading" >保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import { newHomeBlog } from '../../../api/blog'
    import { getBookmarkDefaultTagNames } from '../../../api/tag'
    import { Message, MessageBox } from 'element-ui'

    export default {
        components: {
            mavonEditor
        },
        data() {
            return {
                blogForm: {},
                loading: false,
                selectItems: [],
                rules: {
                    title: [
                        {required: true, message: '请填写标题', trigger: 'blur'},
                        {min: 2, max: 50, message: '标题长度在2-50个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请填写内容', trigger: 'blur'},
                        {min: 2, message: '内容最少包含10个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        mounted () {
            this.getDefaultTagList()
        },
        methods: {
            async getDefaultTagList () {
                const data = await getBookmarkDefaultTagNames();
                this.selectItems = data.data.tags;
            },
            changeData(markdown, html){
                this.blogForm.html = html
            },
            async saveBlog() {
                //获取html
                // this.blogForm.blogHtml = this.blogHtml;
                this.$refs['blogForm'].validate( async valid =>{
                    if(valid){
                        MessageBox.confirm('确定保存？', '提示', {
                            type: 'warning'
                        }).then(() => {
                            this.loading = true
                            newHomeBlog(this.blogForm).then(() => {
                                this.loading = false;
                                //跳转博客页面
                                this.$router.push('/home/blog')

                            }).catch( error=> {
                                this.loading = false;
                                Message.error(error.message)
                            })
                        }).catch(error=> {
                            Message.error(error.message)
                        })

                    }else {
                        Message.error('error submit!!!')
                        return false
                    }
                });

            },

            // async saveData() {
            //     //获取html
            //     // this.blogForm.blogHtml = this.blogHtml;
            //     this.$refs['blogForm'].validate( async valid =>{
            //         if(valid){
            //             this.loading = true
            //             await newHomeBlog(this.blogForm).then(() => {
            //                 this.loading = false;
            //             }).catch( error=> {
            //                 this.loading = false;
            //                 Message.error(error.message)
            //             })
            //         }else {
            //             Message.error('error submit!!!')
            //             return false
            //         }
            //     });
            //
            // },
            exit(){
                this.$router.push({ path: '/home/blog'})
            }

        }
    }
</script>

<style scoped>
</style>

