<template>
    <section>
        <el-card class="box-card" style="margin-bottom: 10px;" shadow='hover'>
            <el-page-header @back="goBack" content="" style="margin-bottom:10px;">
            </el-page-header>
            <!--查询栏-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
                    <el-form-item label="客户" prop="customerSource" style="margin-bottom:22px;">
                        <el-select v-model="ruleForm.customerSource" filterable placeholder="请输入客户" @change="setSource">
                            <el-option
                            v-for="item in options"
                            :key="item.source"
                            :label="item.companyName"
                            :value="item.source">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="保司单号" prop="polNo">
                        <el-input v-model="ruleForm.polNo" placeholder="请输入保司单号"></el-input>
                    </el-form-item>
                    <el-form-item label="申请时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1" style="text-align:center">至</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-card>

        <el-card class="box-card" style="padding-bottom: 30px;" shadow='hover'>
            <!-- 表格 -->
            <el-table border :data="tableData" v-loading="listLoading" element-loading-text="加载中" style="width: 100%">
                <el-table-column align='center' type="index" label="序号" width="50"> </el-table-column>
                <el-table-column align='center' prop="customerName" label="客户" width="100"> </el-table-column>
                <el-table-column align='center' prop="ticketNo" label="豆沙包订单号"   width="220"></el-table-column>
                <el-table-column align='center' prop="productName" label="产品名"  width="280"> </el-table-column>
                <el-table-column align='center' prop="commission" label="手续费（元）" width="130" v-if="type=='1'"></el-table-column>
                <el-table-column align='center' prop="premium" label="保费（元）" width="130" v-else></el-table-column>
                <el-table-column align='center' prop="polNo" label="保司保单号" width="200"></el-table-column>
                <el-table-column align='center' prop="createTime" label="订单时间"  width="" :formatter="dateFormat"></el-table-column>
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
    </section>
</template>

<script>
    
    import store from '../../store'
    import moment from 'moment'
    import { formatterColumn } from "@/utils";
    import { mapGetters } from 'vuex';
    import { getUser } from '@/utils/auth'
    import { getSettlementOrderForBaosi, getCompanyListName, exportOrderToExcelForBaosi } from '@/api/userManage'

    export default {
        data() {
            return {
                tableData: [],
                total:0,
                listLoading:false,
                textarea:"",
                ruleForm: {
                    statementNo:'',
                    customerSource: "",
                    polNo: "",
                    startTime: '',
                    endTime: '',
                    pageNum: 1,
                    pageSize: 10,
                },
                rules: {
                },
                options: [],
                type:''
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        created() {
            this.type = this.$route.query.type
            this.fetchData()
            this.getCompanyListName()
        },
        methods: {
            fetchData() {
                this.ruleForm.statementNo = this.$route.query.statementNo
                this.listLoading = true
                getSettlementOrderForBaosi(this.ruleForm).then(response => {
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
                this.ruleForm.customerSource = this.options.filter(item=>item.companyName==v)[0].source
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
                this.ruleForm.pageNum = 1
                this.ruleForm.source = ''
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
            userInfoDetails(row){
                this.$router.push({path:'/userManage/userInfoDetails',query: {id:row.id,productId:row.productId}})
            },
            loanRecords(row){
                this.$router.push({path:'/userManage/loanRecords',query:{ciCompanyId:row.id}})
            },
            statusText(row){
                if(row.legalPersonsAssets == 1){
                    return '500万以内'
                }else if(row.legalPersonsAssets == 2){
                    return '500万-1000万'
                }else if(row.legalPersonsAssets == 3){
                    return '1000万-2000万'
                }else if(row.legalPersonsAssets == 4){
                    return '2000万以上'
                }
            },
            getExcel(){
                this.listLoading = true
                exportOrderToExcelForBaosi(this.ruleForm).then(response => {
                    this.listLoading = false
                }).catch(err=>{
                    let blob = new Blob([err], {
                      type: 'application/ms-txt;charset=utf-8'
                    });// 转化为blob对象
                    var day = moment(new Date()).format("YYYYMMDD")
                    let filename = `订单列表${day}.csv`;// 判断是否使用默认文件名
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
            goBack() {
                this.$router.go(-1)
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