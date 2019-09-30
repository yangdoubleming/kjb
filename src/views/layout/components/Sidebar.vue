<template>
  <div class="side">
      <div class="item-box" v-for="(item, index) in sideData" :key="index">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
      </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            sideData:[
                {name:'个人信息',icon:'el-icon-s-custom'},
                {name:'企业信息',icon:'el-icon-s-home'},
                {name:'店铺授权',icon:'el-icon-s-shop'},
                {name:'支付绑定',icon:'el-icon-s-finance'},
                {name:'产品申请',icon:'el-icon-s-order'},
                {name:'额度预估',icon:'el-icon-zoom-in'},
                {name:'申请进度',icon:'el-icon-s-claim'}
            ]
        }
    },
    methods: {
    
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.side{
    width: 198px;
    border-bottom: 1px solid #e5e5e5;
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
}
</style>

