<template>
    <section>
        <!--查询栏-->
        <el-card class="box-card" style="margin-bottom: 10px;">
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" class="demo-form-inline">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="豆沙包订单号" prop="ticketNo" v-if='!this.$route.query.ciCompanyId'>
                                <el-input v-model="ruleForm.ticketNo" placeholder="请输入商户标识"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="保司单号" prop="polNo">
                                <el-input v-model="ruleForm.polNo" placeholder="请输入商户标识"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="生效时间">
                                <el-row>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="2" style="text-align:center">至</el-col>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="商户名称" prop="companyName" >
                                <el-select v-model="ruleForm.companyName" filterable placeholder="请输入商户名称" @change="setSource">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.source"
                                    :label="item.companyName"
                                    :value="item.companyName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="理赔状态" prop="status" >
                                <el-select v-model="ruleForm.status" filterable placeholder="请选择理赔状态">
                                    <el-option value="1" label="待审核"></el-option>
                                    <el-option value="3" label="已打款"></el-option>
                                    <el-option value="4" label="驳回"></el-option>
                                    <el-option value="11" label="待打款"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="处理理赔时间">
                                <el-row>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" v-model="ruleForm.dealStart" style="width: 100%;"></el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="2" style="text-align:center">至</el-col>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" v-model="ruleForm.dealEnd" style="width: 100%;"></el-date-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-col style="margin:30px auto;font-size: 15px;color: #606266;font-weight: 700;">总单量：{{total||0}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总理赔金额：{{tableData.length>0&&tableData[0].money1/100||0}}</el-col>
                        </el-col>
                        <el-col :span="18" style="margin-top:20px;">
                            <el-form-item>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                <el-button @click="getExcel">导出excel</el-button>
                                <el-button @click="getPay">批量打款</el-button>
                                <el-button type="primary" @click="submitForm('ruleForm')">查  询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-card>
        
        <!-- 表格 -->
        <el-card class="box-card" style="padding-bottom: 30px;">
            <el-table border :data="tableData" v-loading="listLoading" @selection-change="handleSelectionChange" element-loading-text="Loading" style="width: 100%">
                <el-table-column align='center' type="selection" width="50" ></el-table-column>
                <el-table-column align='center' prop="ticketNo" label="豆沙包订单号" width="230"> </el-table-column>
                <el-table-column align='center' prop="polNo" label="保司保单号" width="220"> </el-table-column>
                <el-table-column align='center' prop="companyName" label="商户名称" width="200"></el-table-column>
                <el-table-column align='center' prop="productName" label="产品名称" width="250"></el-table-column>
                <el-table-column align='center' prop="applyAmount" label="申请理赔金额（元）" width="150" > </el-table-column>
                <el-table-column align='center' prop="indemnifySum" label="理赔金额（元）" width="120"> </el-table-column>
                <el-table-column align='center' prop="effectiveDate" label="生效时间" width="160" :formatter="dateFormat"> </el-table-column>
                <el-table-column align='center' prop="updateAt" label="处理赔付时间" width="160" :formatter="dateFormat"> </el-table-column>
                <el-table-column align='center' prop="status" label="理赔状态" width="100" :formatter="statusText"></el-table-column>
                <el-table-column align='center' prop="name" label="操作" width="50">
                    <template slot-scope="scope">
                        <el-button
                            @click="loanDetails(scope.row,'loanDetails',2)"
                            type="text"
                            v-if="scope.row.status==1"
                            size="small">
                            审核
                        </el-button>
                        <el-button
                            @click="loanDetails(scope.row,'loanDetails',1)"
                            type="text"
                            v-else
                            size="small">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 工具条 -->
            <div class="pageDown">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="ruleForm.pageNum"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="ruleForm.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog
        title="结算审核"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
            <el-form :model="auditRuleForm" :rules="auditRules" ref="auditRuleForm" label-width="138px" >
                <el-form-item label="企业名称" prop="companyName" >
                    <el-input v-model="auditRuleForm.companyName" disabled></el-input>
                </el-form-item>
                <el-form-item label="法人姓名" prop="legalPersonName">
                    <el-input v-model="auditRuleForm.legalPersonName" disabled></el-input>
                </el-form-item>
                <el-form-item label="待结算金额（元）" prop="notSettlementMoney">
                    <el-input v-model="auditRuleForm.notSettlementMoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="auditRuleForm.remarks" type='textarea' :rows="3"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitAuditForm('auditRuleForm','3')">审核</el-button>
                    <el-button type="primary" @click="submitAuditForm('auditRuleForm','5')">驳回</el-button>
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    
    import store from '../../store'
    import moment from 'moment'
    import { findCiCompanyLoanList, applyExamineBatch, getCompanyListName, exportApplyDataToExcel, getCiCompanyLoanById, toExamineCompanyLoan, downloadExcelForCompanyLoan, toBatchExamineCompanyLoan } from '@/api/userManage'
    import { formatterColumn } from "@/utils";
    import { mapGetters } from 'vuex'
    import { BASE_URL } from '@/utils/config'

    export default {
        data() {
            return {
                centerDialogVisible: false,
                tableData: [],
                total:0,
                listLoading:false,
                ruleForm: {
                    ticketNo:'',
                    polNo: "",
                    dealStart:'',
                    dealEnd: "",
                    startTime:'',
                    endTime:'',
                    companyName:'',
                    source: '',
                    status:'',
                    pageNum: 1,
                    pageSize: 10,
                },
                rules: {
                },
                auditRuleForm:{
                    companyName:'',
                    legalPersonName:'',
                    notSettlementMoney:'',
                    remarks:'',
                    id:'',
                    settlement:''
                },
                auditRules:{
                    remarks:[
                        { required: true, message: '请输入每月还款时间', trigger: 'blur' },
                    ]
                },
                payInfo: {
                    ticketNo: '',
                    discountAmount: '',
                    balance: '',
                    source:'',
                    productName:''
                },
                options: [],
                multipleSelection:[],
                ids:[]
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        created() {
            this.fetchData()
            this.getCompanyListName()
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            fetchData() {
                this.listLoading = true
                findCiCompanyLoanList(this.ruleForm).then(response => {
                    this.tableData = response.data.list
                    this.total = response.data.total
                    this.listLoading = false
                }).catch(err=>{
                    this.$message.error(err.msg);
                    this.listLoading = false
                })
            },
            getCompanyListName(){
                getCompanyListName().then(response => {
                    this.options = response.data
                }).catch(err=>{
                    this.$message.error(err.msg);
                })
            },
            setSource(v){
                this.ruleForm.source = this.options.filter(item=>item.companyName==v)[0].source
            },
            handleSizeChange(val) {
                this.ruleForm.pageSize = val
                this.ruleForm.pageNum = 1
                this.fetchData()
            },
            handleCurrentChange(val) {
                this.ruleForm.pageNum = val
                this.fetchData()
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.pageNum = 1
                        this.fetchData()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.source = ''
                this.ruleForm.dealEnd = ''
                this.ruleForm.dealStart = ''
                this.ruleForm.endTime = ''
                this.ruleForm.startTime = ''
                this.ruleForm.pageNum = 1
                this.fetchData()
            },
             //时间格式化
            dateFormat(row, column) {
                var date = row[column.property];
                  if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            loanDetails(row,type,num){
                this.$router.push({path:`/userManage/${type}`,query: {ticketNo:row.ticketNo,applyProductId:row.applyProductId,id:row.id,num:num}})
            },
            submitAuditForm(formName,settlement){
                this.auditRuleForm.settlement = settlement
                this.$refs[formName].validate((valid) => {
                    toExamineCompanyLoan(this.auditRuleForm).then(result=>{
                        this.$message.success(result.msg);
                        this.centerDialogVisible = false
                        this.ruleForm.pageNum = 1
                        this.fetchData()
                    }).catch(err=>{
                        this.$message.error(err.msg);
                        this.centerDialogVisible = false
                    })
                });
            },
            resetAuditForm(){

            },
            loanAudit(row){
                getCiCompanyLoanById({id:row.id}).then(response => {
                    this.auditRuleForm.companyName = response.data.ciCompany.companyName
                    this.auditRuleForm.legalPersonName = response.data.ciCompany.legalPersonName
                    this.auditRuleForm.notSettlementMoney = response.data.ciCompanyLoan.notSettlementMoney
                    this.auditRuleForm.id = row.id
                    this.centerDialogVisible = true
                }).catch(err=>{
                    this.$message.error(err.msg);
                })
            },
            repayRecords(row){
                this.$router.push({path:`/userManage/repayRecords`,query: {ciCompanyId:row.ciCompanyId,loanNo:row.loanNo}})
            },
            getExcel(){
                this.listLoading = true
                exportApplyDataToExcel(this.ruleForm).then(response => {
                    this.listLoading = false
                }).catch(err=>{
                    let blob = new Blob([err], {
                      type: 'application/ms-txt;charset=utf-8'
                    });// 转化为blob对象
                    var day = moment(new Date()).format("YYYYMMDD")
                    let filename = `理赔列表${day}.csv`;// 判断是否使用默认文件名
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                      window.navigator.msSaveBlob(blob, filename);
                    } else {
                      var blobURL = window.URL.createObjectURL(blob);// 将blob对象转为一个URL
                      var tempLink = document.createElement('a');// 创建一个a标签
                      tempLink.style.display = 'none';
                      tempLink.href = blobURL;
                      tempLink.setAttribute('download', filename);// 给a标签添加下载属性
                      if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank');
                      }
                      document.body.appendChild(tempLink);// 将a标签添加到body当中
                      tempLink.click();// 启动下载
                      document.body.removeChild(tempLink);// 下载完毕删除a标签
                      window.URL.revokeObjectURL(blobURL);
                    }
                    this.listLoading = false
                })
            },
            statusText(row){
                if(row.status == 1){
                    return '待审核'
                }else if(row.status == 11){
                    return '待打款'
                }else if(row.status == 3){
                    return '已打款'
                }else if(row.status == 4){
                    return '驳回'
                }else{
                    return ''
                }
            },
            handleSelectionChange(val) {
                var arr = []
                val.forEach(item=>{
                    arr.push(item.id)
                })
                this.ids = arr;
            },
            getPay(){
                applyExamineBatch({ids:this.ids, status:3}).then(response => {
                    this.$message.success(response.msg);
                    this.fetchData()
                }).catch(err=>{
                    this.$message.error(err.msg);
                })
            }
        }
    }      
</script>

<style>
.el-form-item{
        margin-bottom: 0px;
    }
    .el-form--label-top .el-form-item__label{
        padding-bottom: 0px;
    }
    .pageDown{
        float: right;
        margin-top: 15px;
    }
</style>