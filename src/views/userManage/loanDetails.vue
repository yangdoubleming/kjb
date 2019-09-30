<template>
  <section v-loading="loading" element-loading-text="Loading">
    <el-page-header @back="goBack" content="理赔详情" style="margin-bottom:50px;">
    </el-page-header>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <span>基本信息</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">订单号：</span>{{details.ticketNo}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">产品名称：</span>{{details.productShowName}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">产品id：</span>{{details.productShowId}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">支付金额（元）：</span>{{details.discountAmount}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">包主姓名：</span>{{details.name}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">包主手机号：</span>{{details.phoneNo}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">产品购买份数：</span>{{details.productNum}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple"> 生效日期：</span>{{dateFormat(details.effectiveDate)}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">截止日期：</span>{{dateFormat(details.expiryDate)}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">订单日期：</span>{{dateFormat(details.orderTime)}}</div></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;">
      <div slot="header" class="clearfix">
          <span>理赔信息</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">购买数量：</span>{{details.productNum}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">最高赔付：</span>{{details.productCompensationAmount}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">申请赔付金额：</span>{{details.applyAmount}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">理赔金额：</span>{{details.indemnifySum}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">申请理赔日期：</span>{{dateFormat(details.applyTime)}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">转运公司：</span>{{details.companyName}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">物流快递单号：</span>{{details.expressNo}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple"> 海淘购物网站：</span>{{details.shoppingSite}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">海淘商品订单号：</span>{{details.purchasOrderNo}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">商品列表：</span>{{details.goodsCategory}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">海淘包裹号：</span>{{details.expressNo}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">海淘商品价值：</span>{{details.goodsValue}}</div></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8"><div class=""><span class="bg-purple">备注：</span>{{details.specialExplain}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">理赔说明：</span>{{details.applyRemark}}</div></el-col>
        <el-col :span="8"><div class=""><span class="bg-purple">状态：</span>已打款</div></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover" style="margin-top:30px;" v-for="item in imgInfo" :key="item.id">
      <div slot="header" class="clearfix">
          <span>{{item.docName}}</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12" v-for="element in item.imgList" :key="element.documentationId">
            <el-image :src="element.path" error="暂无">
              <div slot="error" class="image-slot">
                暂无
              </div>
            </el-image>
          </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top:30px;" shadow="hover" v-if="num==2">
      <div slot="header" class="clearfix">
          <span>审核信息</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="10">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
            <el-form-item label="保司赔付金额（元）" prop="indemnifySum">
              <el-input v-model="ruleForm.indemnifySum"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="dealRemark">
              <el-input type="textarea" v-model="ruleForm.dealRemark" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm','11')">审核通过</el-button>
              <el-button @click="submitForm('ruleForm','4')">驳回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>
    
    import { getCiCompanyLoanById, documentInfo, applyExamine } from '@/api/userManage'
    import moment from 'moment'

    export default {
        data() {
            return {
                loading: true,
                details:{},
                ciRepaymentRecord:{},
                imgInfo:[],
                ruleForm: {
                  indemnifySum:'',
                  dealRemark: '',
                  id:'',
                },
                rules: {
                  indemnifySum: [
                    { required: true, message: '请输入赔付金额', trigger: 'blur' },
                  ],
                  // dealRemark: [
                  //   { required: true, message: '备注', trigger: 'blur' },
                  // ],
                },
                num:''
            }
        },
        computed: {
            
        },
        created() {
          this.fetchData();
          this.documentInfo()
          this.num = this.$route.query.num
          this.ruleForm.id = this.$route.query.id
        },
        methods: {
          goBack() {
              this.$router.go(-1)
          },
          fetchData(){
            getCiCompanyLoanById(this.$route.query).then(response => {
                if(response.data.length>0){
                  this.details = response.data[0]
                }
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
                this.$message.error(err.msg);
            })
          },
          documentInfo(){
            documentInfo({id:this.$route.query.id}).then(response => {
                this.imgInfo = response.data
            }).catch(err=>{
                // this.$message.error(err.msg);
            })
          },
          dateFormat(date){
            if (!date) {
              return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
          },
          submitForm(formName,type) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.ruleForm.status = type
                applyExamine(this.ruleForm).then(response => {
                    this.$message.success(response.msg);
                }).catch(err=>{
                    this.$message.error(err.msg);
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
        }
    }      
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .row-bg {
    margin: 30px 0;
  }

  .box-card {
    /* width: 480px; */
  }
  .bg-purple{
    color:#909399;
  }
</style>