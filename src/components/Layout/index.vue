<template>
    <div>
        <el-container>
            <!--顶部栏-->
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item class="site-title">Tyger's Blog</el-menu-item>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/bookmark">收藏</el-menu-item>
                    <el-menu-item index="/tags">标签</el-menu-item>
                    <el-menu-item index="/search">搜索</el-menu-item>
                    <el-menu-item index="/tools">工具</el-menu-item>
                    <el-menu-item index="/about">关于</el-menu-item>
                </el-menu>
            </el-header>

            <!--主体部分-->
            <el-main>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>

            <!--底部栏-->
            <el-footer>
                <el-link target="_blank" href="http://www.miibeian.gov.cn/">京ICP备19001124号-1</el-link>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                activeIndex: '/'
            }
        },
        methods: {
            handleSelect(key) {
                this.$router.push(key)
            }
        }
    }
</script>

<style scoped>
    .el-header {
        text-align: center;
        line-height: 60px;
        border-bottom-style: solid;
        border-bottom-color: #f6f6f6;
        border-bottom-width: .5px;
    }

    .el-main {
        /*text-align: center;*/
        /*line-height: 160px;*/
    }

    .el-footer {
        text-align: center;
        line-height: 60px;
        border-top-style: solid;
        border-top-color: #f6f6f6;
        border-top-width: .5px;
    }

    body > .el-container {
        margin-bottom:60px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-menu--horizontal>.el-menu-item {
        color: #202020;
    }

    .site-title {
        font-size: 22px;
    }
</style>
