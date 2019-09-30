<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo-container">
      <img :src="logo" class="logo"/>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#ff4391"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import logo from '@/assets/mb_logo.png'

export default {
  components: { SidebarItem },
  data() {
    return {
      logo
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'menus'
    ]),
    routes() {
      // return this.menus.data.menuList
        return  [{
			title: "信息管理",
			list: [{
          name: "订单查询",
          url: "userInfo",
          icon:'el-icon-tickets'
        },{
          name: "理赔列表",
          url: "loanRecords",
          icon:'el-icon-document-remove'
        },{
          name: "手续费结算列表",
          url: "settleList",
          icon:'el-icon-document-checked'
        },{
          name: "保费结算列表",
          url: "premium",
          icon:'el-icon-document-checked'
        },{
          name: "产品佣金列表",
          url: "commissionList",
          icon:'el-icon-money'
        }],
        class: "userManage",
        icon:'el-icon-menu'
      }]
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped>
  .logo-container {
    position: relative;
    margin:0px auto;
    top:0;
    left:0;
    background:rgb(48, 65, 86);
    
  }
  .logo{
    display: block;
    width:110px;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
