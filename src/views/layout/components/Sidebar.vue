<template>
  <div class="side">
      <template v-for="(item, index) in sideData">
        <router-link :to="item.path" :key="index">
            <div class="item-box" :class="item.path == $route.path? 'active':''">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
            </div>
        </router-link>
      </template>
  </div>
</template>

<script>

export default {
    data() {
        return {
            sideData:[
                {name:'个人信息',icon:'el-icon-s-custom',path:'/center/personalInfo'},
                {name:'企业信息',icon:'el-icon-s-home',path:'/center/companyInfo'},
                {name:'店铺授权',icon:'el-icon-s-shop',path:'/center/w'},
                {name:'支付绑定',icon:'el-icon-s-finance',path:'/center/b'},
                {name:'产品申请',icon:'el-icon-s-order',path:'/center/e'},
                {name:'额度预估',icon:'el-icon-zoom-in',path:'/center/a'},
                {name:'申请进度',icon:'el-icon-s-claim',path:'/center/q'}
            ],
        }
    },
    methods: {
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.side{
    width: 198px;
    .item-box{
        height: 66px;
        background: white;
        border: 1px solid #e5e5e5;
        border-bottom: none;
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-items: center;
        cursor: pointer;
        i{
            font-size: 20px;
            color: #d6d6d6;
        }
        span{
            font-size: 16px;
            font-weight: bold;
            color: #303f4a;
            display: inline-block;
            margin-left: 10px;
        }
    }
    .active{
        i{
            color: #1895eb;
        }
        span{
            color: #1895eb;
        }
    }
}
</style>

