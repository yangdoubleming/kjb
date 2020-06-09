<template>
  <section>
    <div class="title">
      <img :src="arrow" class="arrow" @click="reduce" />
      跨商贷
    </div>
    <div class="top">
      <img :src="top" class="topimg" />
      <div class="number"><span class="bigNum">{{actvieNum}}</span>  /  10</div>
    </div>
    <div class="content" v-for="item in qList" :key="item.num" v-show="actvieNum==item.num">
      <div class="radioTitle">{{item.title}}</div>
      <div class="radio" v-for="ele in item.rList" :key="ele.id">
        <el-radio v-model="ele.value" :label="ele.id" class="radioTxt">{{ele.label}}</el-radio>
      </div>
    </div>
    <div class="btnBox">
      <el-button class="btn" @click="submit" v-if="actvieNum==10">测试并领取贷款额度</el-button>
      <el-button class="btn" @click="next" v-else>下一题</el-button>
    </div>
  </section>
</template>

<script>
import top from '@/assets/top.png'
import arrow from '@/assets/arrow.png'
export default {
  name: 'page404',
  data() {
    return {
      top,
      arrow,
      actvieNum:1,
      radio1:'1',
      qList:[
        {
          title:"1、企业注册资本",
          num:'1',
          rList:[
            {id:"1",label:'100万以下',value:''},
            {id:"2",label:'500万以下',value:''},
            {id:"3",label:'1000万以下',value:''},
            {id:"4",label:'1000万以上（含）',value:''},
          ]
        },
        {
          title:"2、申请企业成立年限",
          num:'2',
          rList:[
            {id:"1",label:'1年',value:''},
            {id:"2",label:'2年',value:''},
            {id:"3",label:'3年',value:''},
            {id:"4",label:'4年',value:''},
            {id:"4",label:'5年及以上',value:''},
          ]
        },
        {
          title:"3、申请人名下是否有房产",
          num:'3',
          rList:[
            {id:"1",label:'是',value:''},
            {id:"2",label:'否',value:''},
          ]
        },
        {
          title:"4、实际经营地城市",
          num:'4',
          rList:[
            {id:"1",label:'深圳',value:''},
            {id:"2",label:'宁波',value:''},
            {id:"3",label:'广州',value:''},
            {id:"4",label:'上海',value:''},
          ]
        },
        {
          title:"5、主营电商平台",
          num:'5',
          rList:[
            {id:"1",label:'Amazon',value:''},
            {id:"2",label:'eBay',value:''},
            {id:"3",label:'AliExpress',value:''},
            {id:"4",label:'Wish',value:''},
            {id:"5",label:'Shopee',value:''},
            {id:"6",label:'其他平台',value:''},
          ]
        },
        {
          title:"6、平台经营时长",
          num:'6',
          rList:[
            {id:"1",label:'6个月以上',value:''},
            {id:"2",label:'1年以上',value:''},
            {id:"3",label:'2年以上',value:''},
            {id:"4",label:'3年以上',value:''},
            {id:"5",label:'4年以上',value:''},
            {id:"6",label:'5年及以上',value:''},
          ]
        },
        {
          title:"7、经营平台年销售额",
          num:'7',
          rList:[
            {id:"1",label:'500万以上',value:''},
            {id:"2",label:'1000万以上',value:''},
            {id:"3",label:'3000万以上',value:''},
            {id:"4",label:'8000万以上',value:''},
            {id:"5",label:'1亿以上',value:''},
          ]
        },
        {
          title:"8、经营平台近6个月退货率",
          num:'8',
          rList:[
            {id:"1",label:'5%以上',value:''},
            {id:"2",label:'10%以上',value:''},
            {id:"3",label:'15%以上',value:''},
          ]
        },
        {
          title:"9、企业近2年是否盈利",
          num:'9',
          rList:[
            {id:"1",label:'是',value:''},
            {id:"2",label:'否',value:''},
          ]
        },
        {
          title:"10、企业近2年是否有超过年化18%以上的融资贷款",
          num:'10',
          rList:[
            {id:"1",label:'是',value:''},
            {id:"2",label:'否',value:''},
          ]
        }
      ]
    }
  },
  methods: {
    next(){
      if(this.actvieNum<10){
        this.actvieNum++
      }
    },
    reduce(){
      if(this.actvieNum>1){
        this.actvieNum--
      }
    },
    submit(){
      this.$router.push({path: `/two`});
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title{
    width: 100%;
    height: 50px;
    color: #292929;
    font-size: 1.3rem;
    text-align: center;
    line-height: 50px;
    background: white;
    .arrow{
      float: left;
      margin: 10px 0 0 15px;
    }
  }
  .top{
    width: 100%;
    height: 50px;
    position: relative;
    .topimg{
      height: 50px;
      float: right;
    }
    .number{
      position: absolute;
      top: 10px;
      left: 20px;
      z-index: 2;
      color: white;
      font-size: .8rem;
      .bigNum{
        font-size: 1.3rem;
      }
    }
  }
  .content{
    .radioTitle{
      font-size: 1.3rem;
      line-height: 3rem;
      color: black;
      margin-left: 15px;
      margin-top: 15px;
    }
    .radio{
      width: 80%;
      height: 3rem;
      margin: 0 auto;
      background: white;
      margin-top: 1rem;
    }
    .radioTxt{
      color: black;
      font-size: 1.2rem;
      line-height: 3rem;
      margin-left: 1rem;
    }
    
  }
  .btnBox{
    width: 100%;
    .btn{
      display: block;
      margin: 5rem auto;
    }
  }
</style>
