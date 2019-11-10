<template>
    <!--工具条-->
    <div class="input-search">
        <el-input v-model="filters.keywords"  :placeholder="placeholder?placeholder:'搜索'"
                  @keyup.enter.native="searchSubmit" clearable >
            <el-button slot="append" icon="el-icon-search"
                       @click.native="searchSubmit"></el-button>
        </el-input>
    </div>
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--            <el-button   size="small" v-on:click="searchSubmit('reset')">重置</el-button>-->
<!--        </el-form-item>-->
<!--    </el-form>-->
</template>

<script>
    export default {
        props: ['placeholder', 'keywordType'],
        data() {
            return {
                filters: {
                    keywords: ''
                }
            }
        },
        methods: {
            searchSubmit(action) {
                // 真正的url更改 需要放到外面处理,因为不同组件的url参数不同,有的不能覆盖
                if (action === 'reset') {
                    this.filters.keywords = undefined
                }

                this.$emit('submitSearch', this.filters.keywords || undefined)// 如果值不是undefined会被设置到url中
                this.$router.push({
                    path: this.$route.path,
                    query: { [this.keywordType]: this.filters.keywords }
                })

            }
        },
        mounted: function() {

        }
    }
</script>
<style scoped>

    .input-search {
        margin-top: 50px;
        margin-left: 20%;
        margin-right: 20%;
        border-radius: 19px;
    }


</style>

<!--<style lang="scss">-->
<!--    @import "src/styles/variables.scss";-->
<!--    .tool-button {-->
<!--        border-top-left-radius: 0;-->
<!--        border-bottom-left-radius: 0;-->
<!--        border-top-right-radius: 1;-->
<!--        border-bottom-right-radius: 1;-->

<!--        background:$selectColor!important;-->
<!--        color:#fff!important;-->
<!--        &:hover{-->
<!--            background:$selectHoverColor!important;-->
<!--        }-->
<!--    }-->
<!--</style>-->