<template>
  <section>
    <div class="title">
      <img :src="arrow" class="arrow" @click="reduce" />
      跨商贷
    </div>
    <div class="imgBox">
        600000
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
     
    }
  },
  methods: {
    reduce(){
        this.$router.push({path: `/one`});
    },
    next(){
        this.$router.push({path: `/three`});
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
