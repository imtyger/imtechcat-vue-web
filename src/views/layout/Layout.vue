<template>
  <div>
    <el-row class="container">

      <!--navbar 顶部栏-->
      <el-col :span="24" class="header">
        <el-col :span="10" class="logo logo-width">TYGER</el-col>
        <el-col :span="10"></el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner"><img :src="userInfo.avatar" /> {{userInfo.nickname}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
              <router-link :to="{path:'/home/setting'}">
                <el-dropdown-item>设置</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>

      <el-col :span="24" class="main">

        <!--siderbar 侧边栏-->
        <aside class="menu-expanded">
          <el-menu default-active="this.$router.path" router class="el-menu-vertical-demo" open="handleOpen">
            <el-menu-item index="/home/bookmarks">
              <i class="el-icon-star-on"></i>
              <span slot="title">书签</span>
            </el-menu-item>
            <el-menu-item index="/home/tags">
              <i class="el-icon-collection"></i>
              <span slot="title">标签</span>
            </el-menu-item>
            <el-menu-item index="/home/blog">
              <i class="el-icon-document"></i>
              <span slot="title">博客</span>
            </el-menu-item>
            <el-menu-item index="/home/setting">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
            <el-menu-item index="/home/timeline">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">记录</span>
            </el-menu-item>
          </el-menu>
        </aside>

        <!--主体部分-->
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Message, MessageBox } from 'element-ui'
  import { removeToken } from '../../utils/auth'

  export default {
    name: "HomeLayout",
    data () {
      return {
        collapsed: false,
        // 从store获取userInfo
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    mounted () {

    },
    methods: {
      logout () {
        MessageBox.confirm('确认登出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('fedLogOut').then(() => {
            window.location.reload()
          })
        }).catch(() => {
          Message({
            type: 'info',
            message: '取消登出'
          })
        })
      },

    }
  }
</script>

<style scoped lang="scss">
  .router-link .router-link-active {
    text-decoration: none;
  }
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #333333;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
      //width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }
        }
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
        flex:1;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }


  }

</style>
