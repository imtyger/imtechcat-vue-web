<template>
    <div v-if="blog !== null && blog !== ''">
        <el-header style="height: 100px">
            <span><h2>{{blog.blogTitle}}</h2></span>
            <span><h4><span>{{blog.createdAt | formatDate }}</span>
          <span>/</span>
          <span v-if="blog.tags !== null && blog.tags !== ''">
            <el-tag disable-transitions size="mini" type="info" effect="plain" v-for="tag in blog.tags" :key="tag">{{ tag }}</el-tag>
          </span></h4>
        </span>
        </el-header>
        <el-main>
            <mavon-editor v-html="blog.blogHtml"> {{blog.blogHtml}}</mavon-editor>
        </el-main>
    </div>
</template>

<script>
    import { getBlogPostId} from '../api/blog'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: 'postDetail',
        data() {
            return{
                id: this.$route.params.id,
                blog: ''
            }
        },
        components: {
            mavonEditor
        },
        mounted () {
            this.getBlogDetail()
        },
        watch: {
            $route(to, from) {
                this.getBlogDetail()
            }
        },
        methods:{
            async getBlogDetail(){
                const data = await getBlogPostId(this.id);
                this._formatList(data)
            },
            _formatList(data) {
                this.blog = data.data;
            },
        }
    }
</script>

<style scoped>
    .el-row {
        width: 20%;
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }

    .row_class{
        width: 20%;
    }


    .el-main{
        text-align: center;
        margin-top: 30px;
        margin-left: 200px;
        margin-right: 200px;
    }
    h3,h4,h5{
        font-weight: normal;
        font-size: 16px;
    }
</style>
