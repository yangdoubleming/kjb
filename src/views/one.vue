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
    <div class="content" v-for="item in qList" :key="'q'+item.num" v-show="actvieNum==item.num">
      <div class="radioTitle">{{item.title}}</div>
      <div class="radio" v-if="item.num==5">
        <el-checkbox v-model="checked1" label="Amazon" class="radioTxt"></el-checkbox>
      </div>
      <div class="radio" v-if="item.num==5">
        <el-checkbox v-model="checked2" label="eBay" class="radioTxt"></el-checkbox>
      </div>
      <div class="radio" v-if="item.num==5">
        <el-checkbox v-model="checked3" label="AliExpress" class="radioTxt"></el-checkbox>
      </div>
      <div class="radio" v-if="item.num==5">
        <el-checkbox v-model="checked4" label="Wish" class="radioTxt"></el-checkbox>
      </div>
      <div class="radio" v-if="item.num==5">
        <el-checkbox v-model="checked5" label="Shopee" class="radioTxt"></el-checkbox>
      </div>
      <div class="radio" v-if="item.num==5">
        <el-checkbox v-model="checked6" label="其他平台" class="radioTxt"></el-checkbox>
      </div>
      <div class="radio" v-for="ele in item.rList" v-else>
        <el-radio v-model="radio1" :label="ele.id" class="radioTxt" @change="pushRadio">{{ele.label}}</el-radio>
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
      checked1:'',
      checked2:'',
      checked3:'',
      checked4:'',
      checked5:'',
      checked6:'',
      qList:[
        {
          title:"1、企业注册资本",
          num:'1',
          rList:[
            {id:"1",label:'100万以下'},
            {id:"2",label:'500万以下'},
            {id:"3",label:'1000万以下'},
            {id:"4",label:'1000万以上（含）'},
          ]
        },
        {
          title:"2、申请企业成立年限",
          num:'2',
          rList:[
            {id:"1",label:'1年'},
            {id:"2",label:'2年'},
            {id:"3",label:'3年'},
            {id:"4",label:'4年'},
            {id:"4",label:'5年及以上'},
          ]
        },
        {
          title:"3、申请人名下是否有房产",
          num:'3',
          rList:[
            {id:"1",label:'是'},
            {id:"2",label:'否'},
          ]
        },
        {
          title:"4、实际经营地城市",
          num:'4',
          rList:[
            {id:"1",label:'深圳'},
            {id:"2",label:'宁波'},
            {id:"3",label:'广州'},
            {id:"4",label:'上海'},
          ]
        },
        {
          title:"5、主营电商平台",
          num:'5',
          rList:[
            {id:"1",label:'Amazon'},
            {id:"2",label:'eBay'},
            {id:"3",label:'AliExpress'},
            {id:"4",label:'Wish'},
            {id:"5",label:'Shopee'},
            {id:"6",label:'其他平台'},
          ]
        },
        {
          title:"6、平台经营时长",
          num:'6',
          rList:[
            {id:"1",label:'6个月以上'},
            {id:"2",label:'1年以上'},
            {id:"3",label:'2年以上'},
            {id:"4",label:'3年以上'},
            {id:"5",label:'4年以上'},
            {id:"6",label:'5年及以上'},
          ]
        },
        {
          title:"7、经营平台年销售额",
          num:'7',
          rList:[
            {id:"1",label:'500万以上'},
            {id:"2",label:'1000万以上'},
            {id:"3",label:'3000万以上'},
            {id:"4",label:'8000万以上'},
            {id:"5",label:'1亿以上'},
          ]
        },
        {
          title:"8、经营平台近6个月退货率",
          num:'8',
          rList:[
            {id:"1",label:'5%以上'},
            {id:"2",label:'10%以上'},
            {id:"3",label:'15%以上'},
          ]
        },
        {
          title:"9、企业近2年是否盈利",
          num:'9',
          rList:[
            {id:"1",label:'是'},
            {id:"2",label:'否'},
          ]
        },
        {
          title:"10、企业近2年是否有超过年化18%以上的融资贷款",
          num:'10',
          rList:[
            {id:"1",label:'是'},
            {id:"2",label:'否'},
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
      }else{
        this.$router.push({path: `/home`});
      }
    },
    submit(){
      console.log(666666,this.qList)
      this.$router.push({path: `/two`});
    },
    pushRadio(v){
      console.log(222,v)
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
