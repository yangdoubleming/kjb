<template>
    <section>
        <!--查询栏-->
        <el-card class="box-card" style="margin-bottom: 10px;">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" class="demo-form-inline">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="结算单号" prop="statementNo">
                                <el-input v-model="ruleForm.statementNo" placeholder="请输入豆沙包订单号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="客户" prop="customerSource">
                                <el-select v-model="ruleForm.customerSource" filterable placeholder="请输入客户" @change="setSource">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.source"
                                    :label="item.companyName"
                                    :value="item.source">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结算时间">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2" style="text-align:center">至</el-col>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="结算状态" prop="isPay">
                                <el-select v-model="ruleForm.isPay" filterable placeholder="请输入结算状态" >
                                    <el-option value="0" label="未支付"></el-option>
                                    <el-option value="1" label="已付费"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="margin:40px auto;">
                            <el-form-item>
                                <el-button @click="getWeekStartAndEnd">本周</el-button>
                                <el-button @click="getMonthStartAndEnd">本月</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                <router-link to="/userManage/generateSettleList" style="margin:auto 10px;"><el-button type="primary">去结算</el-button></router-link>
                                <el-button type="primary" @click="submitForm('ruleForm')">查  询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-card>

        <!-- 表格 -->
        <el-card class="box-card" style="padding-bottom: 30px;">
            <el-table border :data="tableData" v-loading="listLoading" element-loading-text="加载中" style="width: 100%">
                <el-table-column align='center' type="index" label="序号" width="50"> </el-table-column>
                <el-table-column align='center' prop="statementNo" label="结算单号" width="200"> </el-table-column>
                <el-table-column align='center' prop="customerName" label="客户"   width="250"></el-table-column>
                <el-table-column align='center' prop="commission" label="手续费（元）" width="120"></el-table-column>
                <el-table-column align='center' prop="createTime" label="结算时间" :formatter="dateFormat" width="160"></el-table-column>
                <el-table-column align='center' prop="isPay" label="状态" :formatter="statusText" width="120"></el-table-column>
                <el-table-column align='center' prop="name" label="操作" width="">
                    <template slot-scope="scope">
                        <el-button
                            @click="userInfoDetails(scope.row)"
                            type="text"
                            size="small">
                            详情
                        </el-button>
                        <!-- <el-button
                            @click="payLink(scope.row)"
                            type="text"
                            size="small">
                            支付链接
                        </el-button> -->
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
        <!-- 支付链接弹窗 -->
        <el-dialog
            :visible.sync="uploadShow"
            width="30%"
            center>
            <el-upload
                class="avatar-uploader"
                style="margin:0 auto;width:200px;"
                :action="baseUrl"
                :show-file-list="false"
                :on-success="handleYyzz"
                :headers="myHeaders"
                :with-credentials="true"
                v-loading="loadingYyzz"
                element-loading-text="文件上传中"
                element-loading-spinner="el-icon-loading"
                :before-upload="beforeHandleYyzz">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">上传图片</i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadShow = false">取 消</el-button>
                <el-button type="primary" @click="savePayLinkImage()">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    
    import store from '../../store'
    import moment from 'moment'
    import { formatterColumn } from "@/utils";
    import { BASE_URL, IMG_URL, IMG_URL_show } from '@/utils/config'
    import { mapGetters } from 'vuex';
    import { getUser } from '@/utils/auth'
    import { getSettlementForBaosi, getCompanyListName, exportOrderToExcelForBaosi, savePayLinkImage } from '@/api/userManage'

    export default {
        data() {
            return {
                tableData: [],
                total:0,
                listLoading:false,
                textarea:"",
                ruleForm: {
                    statementNo: "",
                    customerSource: "",
                    startTime: '',
                    endTime: '',
                    pageNum: 1,
                    pageSize: 10,
                },
                rules: {
                },
                options: [],
                uploadShow:false,
                baseUrl: `${BASE_URL}/settlement/uploadPayLinkImage`,
                myHeaders: {token: getUser().token},
                loadingYyzz:false,
                imageUrl:'',
                payLinkId:'',
                imgData:''
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
            fetchData() {
                
                this.listLoading = true
                getSettlementForBaosi(this.ruleForm).then(response => {
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
                this.ruleForm.customerSource = ''
                this.ruleForm.startTime = ''
                this.ruleForm.endTime = ''
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
            //时间格式化2
            dateFormat2(date) {
                if (!date) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD")
            },
            userInfoDetails(row){
                this.$router.push({path:'/userManage/generateDetails',query: {parentStatementNo:row.statementNo,type:'1'}})
            },
            statusText(row){
                if(row.isPay == 0){
                    return '未支付'
                }else if(row.isPay == 1){
                    return '已付费'
                }else{
                    return ''
                }
            },
            payLink(row){
                this.payLinkId = row.id
                this.uploadShow = true
            },
            handleYyzz(res, file){
                this.loadingYyzz = false
                this.imageUrl = IMG_URL_show+res.data;
                this.imgData = res.data
            },
            beforeHandleYyzz(file){
                this.loadingYyzz = true
            },
            savePayLinkImage(){
                if(!this.imageUrl){
                    this.$message.error("请先上传图片");
                    return
                }
                savePayLinkImage({imageUrl:this.imgData, id:this.payLinkId}).then(response => {
                    this.$message.success(response.msg);
                    this.uploadShow = false
                }).catch(err=>{
                    this.$message.error(err.msg);
                })
            },
            getWeekStartAndEnd() { 
                var startStop = new Array(); 
                var millisecond = 1000 * 60 * 60 * 24; 
                var currentDate = new Date();
                currentDate = new Date(currentDate.getTime());
                var week = currentDate.getDay(); 
                var month = currentDate.getDate();
                var minusDay = week != 0 ? week - 1 : 6; 
                var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay)); 
                var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
                this.ruleForm.startTime = this.dateFormat2(currentWeekFirstDay); 
                this.ruleForm.endTime = this.dateFormat2(currentWeekLastDay); 
            },
            getMonthStartAndEnd() { 
                var startStop = new Array(); 
                var currentDate = new Date();
                var month=currentDate.getMonth();
                if(month<0){
                    var n = parseInt((-month)/12);
                    month += n*12;
                    currentDate.setFullYear(currentDate.getFullYear()-n);
                }
                currentDate = new Date(currentDate.setMonth(month));
                var currentMonth = currentDate.getMonth(); 
                var currentYear = currentDate.getFullYear(); 
                var currentMonthFirstDay = new Date(currentYear, currentMonth,1); 
                var currentMonthLastDay = new Date(currentYear, currentMonth+1, 0); 
                this.ruleForm.startTime = this.dateFormat2(currentMonthFirstDay); 
                this.ruleForm.endTime = this.dateFormat2(currentMonthLastDay); 
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