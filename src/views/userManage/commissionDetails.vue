<template>
    <section>
        <el-page-header @back="goBack" content="产品佣金列表" style="margin-bottom:50px;">
        </el-page-header>
        <el-card class="box-card" style="padding-bottom: 30px;" shadow='hover'>
          <el-form :model="ruleForm" v-loading="loading" element-loading-text="加载中" :rules="rules" ref="ruleForm" style="width:50%;margin-top:30px;" label-width="120px" class="demo-form-inline">
              <el-form-item label="保司名称：" prop="insurerSource" style="margin-bottom: 22px;">
                  <el-col :span="12">
                    <el-select v-model="ruleForm.insurerSource" filterable placeholder="请输入商户名称" @change="setSource">
                          <el-option
                          v-for="item in options"
                          :key="item.source"
                          :label="item.companyName"
                          :value="item.source">
                          </el-option>
                      </el-select>
                  </el-col>
              </el-form-item>
              <el-form-item label="保司费率：" prop="insurerRate" style="margin-bottom: 22px;">
                  <el-col :span="12">
                    <el-input v-model="ruleForm.insurerRate"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="佣金比例：" prop="commissionRate" style="margin-bottom: 22px;">
                  <el-col :span="12">
                    <el-input v-model="ruleForm.commissionRate"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="产品名称：" prop="productName" style="margin-bottom: 22px;">
                  <el-col :span="12">
                    <el-input v-model="ruleForm.productName"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="生效开始时间：" prop="startTime" style="margin-bottom: 22px;">
                  <el-col :span="8">
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                  </el-col>
              </el-form-item>
              <el-form-item label="生效截止时间：" prop="endTime" style="margin-bottom: 22px;">
                  <el-col :span="8">
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                  </el-col>
              </el-form-item>
              
              <el-form-item style="margin-bottom: 22px;">
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
          </el-form>
        </el-card>
    </section>
</template>
    
<script>
  import { getInsuranceCommissionRateById, findBaoSiCompanyListByName, editInsuranceCommissionRate } from '@/api/userManage'
  import moment from 'moment'

  export default {
    data() {
      return {
        ruleForm: {
          insurerSource: '',
          insurerRate:'',
          commissionRate: '',
          productName: '',
          startTime: '',
          endTime: '',
          id:''
        },
        rules: {
          insurerSource: [
            { required: true, message: '请输入保司名称', trigger: 'blur' },
          ],
          insurerRate: [
            { required: true, message: '请输入保司费率', trigger: 'blur' },
          ],
          commissionRate: [
            { required: true, message: '请选择佣金比例', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '请选择输入名称', trigger: 'blur' }
          ]
        },
        loading:false,
        options:[]
      };
    },
    created() {
      this.ruleForm.id = this.$route.query.id
      this.findBaoSiCompanyListByName()
      this.fetchData();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            editInsuranceCommissionRate(this.ruleForm).then(response => {
              this.loading = false;
              this.$message.success(response.msg);
              this.goBack()
            }).catch(err=>{
              this.loading = false;
              this.$message.error(err.msg);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack() {
        this.$router.go(-1)
      },
      fetchData(){
        if(this.$route.query.id){
          this.loading = true;
          getInsuranceCommissionRateById(this.$route.query.id).then(response => {
            if(response.data){
              this.ruleForm.insurerSource = response.data.insurerSource
              this.ruleForm.insurerRate = response.data.insurerRate
              this.ruleForm.commissionRate = response.data.commissionRate
              this.ruleForm.productName = response.data.productName
              this.ruleForm.startTime = this.dateFormat(response.data.startTime)
              this.ruleForm.endTime = this.dateFormat(response.data.endTime)
            }
            this.loading = false;
          }).catch(err=>{
            this.loading = false;
            this.$message.error(err.msg);
          })
        }
      },
      findBaoSiCompanyListByName(){
          findBaoSiCompanyListByName({name:''}).then(response => {
              this.options = response.data
          }).catch(err=>{
              this.$message.error(err.msg);
          })
      },
      setSource(v){
        this.ruleForm.source = this.options.filter(item=>item.companyName==v)[0].source
      },
      //时间格式化
      dateFormat(date) {
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD")
      },
    }
  }
</script>