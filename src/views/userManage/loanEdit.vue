<template>
    <section>
        <el-page-header @back="goBack" content="贷款信息录入">
        </el-page-header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="margin-top:50px;width:600px;margin:0 auto;">
            <el-form-item label="电子保单" prop="electronicPolicy">
                <el-upload
                        class="avatar-uploader"
                        :action="baseUrl"
                        :show-file-list="false"
                        :on-success="handleYyzz"
                        :with-credentials="true"
                        :headers="myHeaders"
                        v-loading="loadingYyzz"
                        element-loading-text="文件上传中"
                        element-loading-spinner="el-icon-loading"
                        :before-upload="beforeHandleYyzz">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon">电子保单</i>
                    </el-upload>
            </el-form-item>
            <el-form-item label="电子保单号" prop="policyNo">
                <el-input v-model="ruleForm.policyNo"></el-input>
            </el-form-item>
            <el-form-item label="投保金额（元）" prop="insuranceMoney">
                <el-input v-model="ruleForm.insuranceMoney"></el-input>
            </el-form-item>
            <el-form-item label="保单费率" prop="insuranceRate">
                <el-input v-model="ruleForm.insuranceRate"></el-input>
            </el-form-item>
            <el-form-item label="放款银行" prop="loanBank">
                <el-input v-model="ruleForm.loanBank"></el-input>
            </el-form-item>
            <el-form-item label="放款时间" prop="loanTime">
                <el-date-picker v-model="ruleForm.loanTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="贷款利率" prop="loanRate">
                <el-input v-model="ruleForm.loanRate"></el-input>
            </el-form-item>
            <el-form-item label="服务费" prop="handlingRate">
                <el-input v-model="ruleForm.handlingRate"></el-input>
            </el-form-item>
            <el-form-item label="贷款状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择贷款状态">
                    <el-option label="资料未完成" value="0"></el-option>
                    <el-option label="审核中" value="1"></el-option>
                    <el-option label="已终止" value="2"></el-option>
                    <el-option label="放款中" value="3"></el-option>
                    <el-option label="未结清" value="4"></el-option>
                    <el-option label="已逾期" value="5"></el-option>
                    <el-option label="已结清" value="6"></el-option>
                    <el-option label="还款中" value="7"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="每月还款时间" prop="monthRepaymentDay">
                <el-input v-model="ruleForm.monthRepaymentDay"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    
    import { editCompanyLoan, getCiCompanyLoanById } from '@/api/userManage'
    import { BASE_URL } from '@/utils/config'
    import moment from 'moment'
    if(JSON.parse(localStorage.getItem('user'))){
        var token = JSON.parse(localStorage.getItem("user")).token;
    } 

    export default {
        data() {
            return {
                loadingYyzz:false,
                imageUrl:'',
                myHeaders: {},
                baseUrl:`${BASE_URL}/upload`,
                ruleForm: {
                    id:"",
                    electronicPolicy:"",
                    policyNo:"",
                    insuranceMoney:"",
                    insuranceRate:"",
                    loanBank:"",
                    loanTime:"",
                    loanRate:"",
                    handlingRate:"",
                    status:"",
                    monthRepaymentDay:"",
                },
                rules: {
                    id:"",
                    electronicPolicy:[
                    ],
                    policyNo:[
                        { required: true, message: '请输入电子保单号', trigger: 'blur' },
                    ],
                    insuranceMoney:[
                        { required: true, message: '请输入投保金额（元', trigger: 'blur' },
                    ],
                    insuranceRate:[
                        { required: true, message: '请输入保单费率', trigger: 'blur' },
                    ],
                    loanBank:[
                        { required: true, message: '请输入放款银行', trigger: 'blur' },
                    ],
                    loanTime:[
                        { required: true, message: '请输入放款时间', trigger: 'blur' },
                    ],
                    loanRate:[
                        { required: true, message: '请输入贷款利率', trigger: 'blur' },
                    ],
                    handlingRate:[
                        { required: true, message: '请输入服务费', trigger: 'blur' },
                    ],
                    status:[
                        { required: true, message: '请选择贷款状态', trigger: 'blur' },
                    ],
                    monthRepaymentDay:[
                        { required: true, message: '请输入每月还款时间', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
            this.fetchData()
            this.ruleForm.id = this.$route.query.id
            this.myHeaders = {token:token}
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            fetchData(){
                getCiCompanyLoanById(this.$route.query).then(response => {
                    if(response.data){
                        this.ruleForm.electronicPolicy = response.data.ciCompanyLoan.electronicPolicy
                        this.imageUrl = BASE_URL+response.data.ciCompanyLoan.electronicPolicy;
                        this.ruleForm.policyNo = response.data.ciCompanyLoan.policyNo
                        this.ruleForm.insuranceMoney = response.data.ciCompanyLoan.insuranceMoney
                        this.ruleForm.insuranceRate = response.data.ciCompanyLoan.insuranceRate
                        this.ruleForm.loanBank = response.data.ciCompanyLoan.loanBank
                        this.ruleForm.loanTime = this.dateFormat(response.data.ciCompanyLoan.loanTime)
                        this.ruleForm.loanRate = response.data.ciCompanyLoan.loanRate
                        this.ruleForm.handlingRate = response.data.ciCompanyLoan.handlingRate
                        this.ruleForm.status = this.statusText(response.data.ciCompanyLoan.status)
                        this.ruleForm.monthRepaymentDay = response.data.ciCompanyLoan.monthRepaymentDay
                    }
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                    this.$message.error(err.msg);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.status = this.fStatusText(this.ruleForm.status)
                        if(!this.ruleForm.electronicPolicy){
                            this.$message.warning('请上传电子保单')
                            return false
                        }
                        editCompanyLoan(this.ruleForm).then(response => {
                            this.$message.success(response.msg);
                        }).catch(err=>{
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
            // 营业执照
            handleYyzz(res, file){
                this.loadingYyzz = false
                this.imageUrl = BASE_URL+res.data;
                this.ruleForm.electronicPolicy = res.data;
            },
            beforeHandleYyzz(file){
                this.loadingYyzz = true
            },
            statusText(row){
                if(row == 0){
                    return '资料未完成'
                }else if(row == 1){
                    return '审核中'
                }else if(row == 2){
                    return '已终止'
                }else if(row == 3){
                    return '放款中'
                }else if(row == 4){
                    return '未结清'
                }else if(row == 5){
                    return '已逾期'
                }else if(row == 6){
                    return '已结清'
                }else if(row == 7){
                    return '还款中'
                }
            },
            fStatusText(row){
                if(row == '资料未完成'){
                    return '0'
                }else if(row == '审核中'){
                    return '1'
                }else if(row == '已终止'){
                    return '2'
                }else if(row == '放款中'){
                    return '3'
                }else if(row == '未结清'){
                    return '4'
                }else if(row == '已逾期'){
                    return '5'
                }else if(row == '已结清'){
                    return '6'
                }else if(row == '还款中'){
                    return '7'
                }else{
                    return row
                }
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 100px;
    display: block;
  }
  .el-upload-text{
    line-height: 100px;
    text-align: center;
    font-size: 14px;
    color: #8c939d;
  }

</style>