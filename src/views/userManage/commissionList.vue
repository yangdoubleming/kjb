<template>
    <section>
        <!--查询栏-->
        <el-card class="box-card" style="margin-bottom: 10px;">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
                    <el-form-item label="产品名称" prop="productName" style="margin-bottom: 22px;">
                        <el-input v-model="ruleForm.productName" placeholder="请输入产品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="userInfoDetails()">新  增</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">查  询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-card>

        <!-- 表格 -->
        <el-card class="box-card" style="padding-bottom: 30px;">
            <el-table border :data="tableData" v-loading="listLoading" element-loading-text="加载中" style="width: 100%">
                <el-table-column align='center' type="index" label="序号" width="50"> </el-table-column>
                <el-table-column align='center' prop="insurerName" label="保司名称" width="150"> </el-table-column>
                <el-table-column align='center' prop="insurerRate" label="保司费率" width="100"> </el-table-column>
                <el-table-column align='center' prop="productName" label="产品名称"  width="250"> </el-table-column>
                <el-table-column align='center' prop="commissionRate" label="佣金比例" width="100"></el-table-column>
                <el-table-column align='center' prop="startTime" label="生效开始时间"  width="200" :formatter="dateFormat"></el-table-column>
                <el-table-column align='center' prop="endTime" label="生效截止时间"  width="200" :formatter="dateFormat"></el-table-column>
                <el-table-column align='center' prop="name" label="操作" width="">
                    <template slot-scope="scope">
                        <el-button
                            @click="userInfoDetails(scope.row)"
                            type="text"
                            size="small">
                            编辑
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
    </section>
</template>

<script>
    
    import store from '../../store'
    import moment from 'moment'
    import { formatterColumn } from "@/utils";
    import { mapGetters } from 'vuex';
    import { getUser } from '@/utils/auth'
    import { getInsuranceCommissionRate, exportOrderToExcelForBaosi } from '@/api/userManage'

    export default {
        data() {
            return {
                tableData: [],
                total:0,
                listLoading:false,
                textarea:"",
                ruleForm: {
                    productName:'',
                    pageNum: 1,
                    pageSize: 10,
                },
                rules: {
                },
                options: []
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
            fetchData() {
                this.ruleForm.statementNo = this.$route.query.statementNo
                this.listLoading = true
                getInsuranceCommissionRate(this.ruleForm).then(response => {
                    this.tableData = response.data.list
                    this.total = response.data.total
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
                return moment(date).format("YYYY-MM-DD")
            },
            userInfoDetails(row){
                row?this.$router.push({path:'/userManage/commissionDetails',query: {id:row.id}}):this.$router.push({path:'/userManage/commissionDetails'})
            }
        }
    }      
</script>

<style>
    .pageDown{
        float: right;
        margin-top: 15px;
    }
</style>