<template>
    <section>
        <el-page-header @back="goBack" content="还款记录" style="margin-bottom:50px;">
        </el-page-header>
        <!--查询栏-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
                <el-form-item label="还款期数" prop="loanTerm">
                    <el-select v-model="ruleForm.loanTerm" placeholder="状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="第一期" value="1"></el-option>
                        <el-option label="第二期" value="2"></el-option>
                        <el-option label="第三期" value="3"></el-option>
                        <el-option label="第四期" value="4"></el-option>
                        <el-option label="第五期" value="5"></el-option>
                        <el-option label="第六期" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="还款时间" prop="time">
                    <el-date-picker
                        v-model="ruleForm.time"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    <el-button type="primary"  @click="centerDialogVisible = true">录入还款信息</el-button>
                </el-form-item>
            </el-form>
		</el-col>

        <!-- 表格 -->
        <el-table border :data="tableData" v-loading="listLoading" element-loading-text="Loading" style="width: 100%">
            <el-table-column align='center' prop="loanTerm" label="还款期数" width="150"> </el-table-column>
            <el-table-column align='center' prop="repaymentAllAmount" label="还款金额" width="280"> </el-table-column>
            <el-table-column align='center' prop="repaymentRateAmount" label="偿还利息金额" width=""></el-table-column>
            <el-table-column align='center' prop="repaymentTime" label="还款时间" width="" :formatter="dateFormat"> </el-table-column>
            <el-table-column align='center' prop="outstandingTerm" label="剩余还款期数" width=""> </el-table-column>
            <el-table-column align='center' prop="unpaidPrincipal" label="剩余还款总金额" width=""></el-table-column>
            <el-table-column align='center' prop="name" label="操作" fixed="right" width="">
                <template >
                    <el-button
                        type="text"
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

        <el-dialog
        title="还款信息录入"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
            <el-form :model="auditRuleForm" :rules="auditRules" ref="auditRuleForm" label-width="125px" >
                <el-form-item label="本次还款期数：" prop="loanTerm">
                    <el-select v-model="auditRuleForm.loanTerm" placeholder="本次还款期数">
                        <el-option label="第一期" value="1"></el-option>
                        <el-option label="第二期" value="2"></el-option>
                        <el-option label="第三期" value="3"></el-option>
                        <el-option label="第四期" value="4"></el-option>
                        <el-option label="第五期" value="5"></el-option>
                        <el-option label="第六期" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="本期还款金额：" prop="repaymentAllAmount">
                    <el-input v-model="auditRuleForm.repaymentAllAmount" ></el-input>
                </el-form-item>
                <el-form-item label="本期偿还利息：" prop="repaymentRateAmount">
                    <el-input v-model="auditRuleForm.repaymentRateAmount" ></el-input>
                </el-form-item>
                <el-form-item label="本期还款时间：" prop="repaymentTime">
                    <el-date-picker v-model="auditRuleForm.repaymentTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="剩余还款期数（期）：" prop="outstandingTerm">
                    <el-input v-model="auditRuleForm.outstandingTerm" ></el-input>
                </el-form-item>
                <el-form-item label="剩余还款总金额：" prop="unpaidPrincipal">
                    <el-input v-model="auditRuleForm.unpaidPrincipal" ></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitAuditForm('auditRuleForm')">保存</el-button>
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    
    import store from '../../store'
    import moment from 'moment'
    import { findCiRepaymentRecordList, editRepaymentRecord } from '@/api/userManage'
    import { formatterColumn } from "@/utils";
    import { mapGetters } from 'vuex'
    import { getBalance, accountInfo, goPay } from '@/api/userManage'

    export default {
        data() {
            return {
                centerDialogVisible:false,
                tableData: [],
                total:0,
                listLoading:true,
                ruleForm: {
                    endTime: "",
                    startTime: "",
                    loanTerm: "",
                    pageNum: 1,
                    pageSize: 10
                },
                rules: {
                },
                payInfo: {
                    ticketNo: '',
                    discountAmount: '',
                    balance: '',
                    source:'',
                    productName:''
                },
                auditRuleForm:{
                    ciCompanyId:"",
                    loanNo:"",
                    loanTerm:"",
                    repaymentAllAmount:"",
                    repaymentRateAmount:"",
                    repaymentTime:"",
                    outstandingTerm:"",
                    unpaidPrincipal:""
                },
                auditRules:{
                    ciCompanyId:[
                    ],
                    loanNo:[
                    ],
                    loanTerm:[
                        { required: true, message: '请输入本次还款期数', trigger: 'blur' },
                    ],
                    repaymentAllAmount:[
                        { required: true, message: '请输入本期还款金额', trigger: 'blur' },
                    ],
                    repaymentRateAmount:[
                        { required: true, message: '请输入本期偿还利息', trigger: 'blur' },
                    ],
                    repaymentTime:[
                        { required: true, message: '请输入本期还款时间', trigger: 'blur' },
                    ],
                    outstandingTerm:[
                        { required: true, message: '请输入剩余还款期数', trigger: 'blur' },
                    ],
                    unpaidPrincipal:[
                        { required: true, message: '请输入剩余还款总金额', trigger: 'blur' },
                    ]
                },
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        created() {
            this.fetchData()
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            fetchData() {
                this.listLoading = true
                findCiRepaymentRecordList(this.ruleForm,this.$route.query).then(result => {
                    this.tableData = result.data.list
                    this.total = result.data.total
                    this.listLoading = false
                }).catch(err=>{
                    this.$message.error(err.msg);
                    this.listLoading = false
                })
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
                        if(this.ruleForm.time&&this.ruleForm.time.length>0){
                            this.ruleForm.startTime = this.ruleForm.time[0];
                            this.ruleForm.endTime = this.ruleForm.time[1];
                        }else{
                            this.ruleForm.startTime = '';
                            this.ruleForm.endTime = '';
                        }
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
                this.ruleForm.pageNum = 1
                this.ruleForm.endTime = ''
                this.ruleForm.startTime = ''
                this.fetchData()
            },
             //时间格式化
            dateFormat(row, column) {
                var date = row[column.property];
                  if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD")
            },
            statusText(row, column){
                return formatterColumn(row.status)
            },
            customerInsureDetails(row){
                this.$router.push({path:'/userManage/customerInsureDetails',query: {id:row.id,productId:row.productId}})
            },
            submitAuditForm(formName,settlement){
                this.auditRuleForm.ciCompanyId = this.$route.query.ciCompanyId
                this.auditRuleForm.loanNo = this.$route.query.loanNo
                this.$refs[formName].validate((valid) => {
                    editRepaymentRecord(this.auditRuleForm).then(result=>{
                        this.$message.success(result.msg);
                        this.centerDialogVisible = false
                        this.fetchData()
                    }).catch(err=>{
                        this.$message.error(err.msg);
                        this.centerDialogVisible = false
                    })
                });
            },
            
        }
    }      
</script>

<style>
    .pageDown{
        float: right;
        margin-top: 15px;
    }
</style>