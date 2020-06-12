<template>
  <section>
    <div class="title">
      <img :src="arrow" class="arrow" @click="reduce" />
      跨商贷
    </div>
     <img :src="banner" class="banner" />
    <div class="info">
        <el-row :gutter="10" style="width:80%;margin:0px auto">
            <el-col :span="14">
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            </el-col>
            <el-col :span="8">
                <el-button @click="getCode" :disabled="btnStatus">{{paracont}}</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="width:80%;margin:10px auto">
            <el-col :span="23">
                <el-input v-model="verifyCode" placeholder="请输入验证码"></el-input>
            </el-col>
        </el-row>
        <div class="btn" @click="submit">提 交</div>
    </div>
    <div class="bot">
        <img :src="qrcode" class="qrcode" />
        <div class="tip">提交申请后会有客户经理联系您进行后续申请流程</div>
    </div>
  </section>
</template>

<script>
import banner from '@/assets/banner.png'
import qrcode from '@/assets/qrcode.png'
import arrow from '@/assets/arrow.png'
import { saasGetVerifyCode, easylink } from '@/api/login'
export default {
  name: 'page404',
  data() {
    return {
        banner,
        qrcode,
        arrow,
        phone:'',
        verifyCode:'',
        paracont:'获取验证码',
        btnStatus:false,
        getCodeStatus:false,
    }
  },
  methods: {
      reduce(){
          this.$router.push({path: `/two`});
      },
    //获取验证码
    getCode () {
        this.getCodeStatus = true;
        var second = null, timePromise = undefined;
        if (second === null) {
            second = 60;
            if (!this.phone) {
                this.$message({message:'手机号不能为空',type:'warning'})
                second = null;
                return false;
            } else {
                saasGetVerifyCode({phoneNo:this.phone,photoCode:"DSBKJ"}).then(result => {
                    const _this = this;
                    this.btnStatus = true;
                    timePromise = setInterval(function () {
                        if (second <= 0) {
                            clearInterval(timePromise);
                            timePromise = undefined;
                            second = null;
                            _this.paracont = "重发验证码";
                            _this.btnStatus = false;
                        } else {
                            _this.paracont = second + "s";
                            second--;
                        }
                    }, 1000);
                }).catch(err => {
                    this.$message({message:err.msg,type:'error'})
                    second = null;
                })
            }
        } else {
            return false;
        }
    },
    submit(){
        let obj = JSON.parse(localStorage.getItem('submitObj'))
        obj.phone = this.phone
        obj.validateCode = this.verifyCode
        easylink(obj).then(result => {
            if(result.code==0){
                this.$message.success('提交成功')
            }else{
                this.$message.error(result.msg)
            }
           
        }).catch(err => {
            this.$message({message:err.msg,type:'error'})
        })
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
    .info{
        width: 100%;
        background: white;
        padding: 1.2rem 0;
        .btn{
            width: 80%;
            height: 3rem;
            color: white;
            font-size: 1.3rem;
            line-height: 3rem;
            text-align: center;
            background: #e71d5d;
            border-radius: 25px;
            margin: 1rem auto;
        }
    }
    .bot{
        background: white;
        margin:15px 0;
        width: 100%;
        .qrcode{
            width: 30%;
            display: block;
            margin: 1rem auto;
            padding-top: 2rem;
        }
        .tip{
            color: #9d9d9d;
            text-align: center;
            font-size: .8rem;
            padding-bottom: 2rem;
        }
    }
    
</style>
