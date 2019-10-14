<template>
  <div class="head">
    <div class="head-nav">
      <img :src='logo' class="logo"/>
      <span style="color:#fc3939;">登录&nbsp;&nbsp;|&nbsp;&nbsp;注册</span>
      <span>历史记录</span>
      <span>我要借款</span>
      <span>首页</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '@/assets/login_logo.png'

export default {
  data() {
    return {
      logo
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.head{
  height: 60px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
  .head-nav{
    width:1200px;
    margin: 0 auto;
    .logo{
      float: left;
      height: 48px;
      margin-top: 4px;
    }
    span{
      float: right;
      font-size: 18px;
      color:#8e8e8e;
      margin: 0 25px;
      line-height: 60px;
      cursor:pointer;
    }
  }
}
</style>

