<template>
  <section style="background:#7d23dc">
    <div class="title">
      跨商贷
    </div>
     <img :src="banner" class="banner" />
     <img :src="qrTxt" class="qrTxt" />
     <div class="ksd">“跨商贷”是豆沙包科技公司根据对跨境电商多年的服务经验，根据跨境出口电商卖家的行业特点，与各大股份制银行、城商行定制的纯信用、无抵押的低利率贷款产品，支持申请人日常经营资金周转。</div>
     <div class="content">
         <div class="title2">跨商贷常见问题Q&A</div>
         <div class="question">Q：贷款产品服务对象？</div>
         <div class="answer">A：跨境电商卖家。</div>
         <div class="question">Q：贷款产品服务区域？</div>
         <div class="answer">A：华东区域、广东区域。</div>
         <div class="question">Q：贷款产品基本准入门槛？</div>
         <div class="answer">A：跨境出口电商卖家店铺注册其连续经营满6个月以上，年销售额大于500万以上。</div>
         <div class="question">Q：贷款资金来源?</div>
         <div class="answer">A：所有放款资金均来自正规银行机构，根据客户的资信、经营和区域不同，匹配最合适的银行产品。</div>
         <div class="question">Q：贷款的额度和利率？</div>
         <div class="answer">A：根据不同客户的资信和经营情况，额度最高可达千万，利率在年化5%~14%（按风险不同分别定价）</div>
         <div class="question">Q：贷款授信基于什么？</div>
         <div class="answer">A：基于卖家在第三方电商平台的店铺经营数据，企业、法人以及实际控制人的资信情况。</div>
         <div class="question">Q：贷款是否需要查询征信？</div>
         <div class="answer">A：因为放款为银行机构，所以贷款均需进行征信查询，但是相关查询均要在客户的主动授权下完成。</div>
     </div>
     <div class="tip">提示：贷款资金均由豆沙包合作银行进行发放</div>
     <div class="btnBox">
      <el-button class="btn" @click="next">开始答题</el-button>
    </div>
  </section>
</template>

<script>
import banner from '@/assets/banner02.png'
import qrTxt from '@/assets/qrTxt.png'
export default {
  name: 'page404',
  data() {
    return {
        banner,
        qrTxt
    }
  },
  methods: {
    next(){
        this.$router.push({path: `/one`});
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
    .banner{
        display: block;
        width: 100%;
    }
    .qrTxt{
        display: block;
        width: 90%;
        margin: 0 auto;
        margin-top: -10rem;
    }
    .ksd{
        color: #f4e7ff;
        font-size: .8rem;
        line-height: 1.5rem;
        width: 90%;
        margin: 1rem auto;
    }
    .content{
        display: block;
        width: 90%;
        margin: 0 auto;
        background: white;
        .title2{
            text-align: center;
            color: #292929;
            font-size: 1.2rem;
            line-height: 3rem;
            font-weight: bold;
        }
        .question{
            color: #292929;
            font-size: 1rem;
            line-height: 1.5rem;
            margin-left: 1rem;
            margin-right: 1rem;
        }
        .answer{
            color: #a1a1a1;
            font-size: 1rem;
            line-height: 1.5rem;
            margin-left: 1rem;
            margin-bottom: 1rem;
            margin-right: 1rem;
        }
    }
    .tip{
        color: #f4e7ff;
        text-align: center;
        font-size: .8rem;
        line-height: 3rem;
    }
    .btnBox{
        width: 100%;
        height: 6rem;
        .btn{
            display: block;
            margin: 2rem auto;
        }
    }
    
</style>
