<template>
  <section>
    <div class="title">
      <img :src="arrow" class="arrow" @click="reduce" />
      可贷额度
    </div>
    <div class="imgBox">
        {{money}}
        <div style="font-size:1rem;line-height:2rem">期限最长{{month}}个月&nbsp;&nbsp;|&nbsp;&nbsp;日利率低至年化{{rate}}%</div>
    </div>
    <div class="btn" @click="next">我 要 贷 款</div>
  </section>
</template>

<script>
import bg from '@/assets/bg.png'
import arrow from '@/assets/arrow.png'
export default {
  name: 'page404',
  data() {
    return {
      bg,
      arrow,
      money:'',
      month:'',
      rate:''
    }
  },
  mounted(){
    let saleMoney = JSON.parse(localStorage.getItem('submitObj')).annualSales
    if(saleMoney == "500万以上"){
      saleMoney = 5000000
    }
    if(saleMoney == "1000万以上"){
      saleMoney = 10000000
    }
    if(saleMoney == "3000万以上"){
      saleMoney = 30000000
    }
    if(saleMoney == "8000万以上"){
      saleMoney = 80000000
    }
    if(saleMoney == "1亿以上"){
      saleMoney = 100000000
    }
    let city = JSON.parse(localStorage.getItem('submitObj')).businessAddress
    if(city.indexOf("宁波")){
      this.money=saleMoney*0.1
      if(this.money>3000000){
        this.money = 3000000
      }
      this.month=12
      this.rate=9
    }
    if(city.indexOf("浙江")||city.indexOf("上海")||city.indexOf("江苏")){
      this.money=saleMoney*0.4
      if(this.money>10000000){
        this.money = 10000000
      }
      this.month=12
      this.rate=5
    }
    if(city.indexOf("深圳")||city.indexOf("广州")||city.indexOf("广东")){
      this.money=saleMoney*0.1
      if(this.money>10000000){
        this.money = 10000000
      }
      this.month=12
      this.rate=5
    }
  },
  methods: {
    reduce(){
        this.$router.push({path: `/one`});
    },
    next(){
        this.$router.push({path: `/three`});
    }
  },
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
    .imgBox{
        background-image: url(../assets/bg.png);
        background-size:100%;
        background-repeat: no-repeat;
        color: white;
        font-size: 2rem;
        line-height: 20rem;
        text-align: center;
        width: 100%;
        height: 30rem;
    }
    .btn{
        width: 80%;
        height: 3rem;
        color: white;
        font-size: 1.3rem;
        line-height: 3rem;
        text-align: center;
        background: #e71d5d;
        border-radius: 25px;
        margin: 1.5rem auto;
    }
  
</style>
