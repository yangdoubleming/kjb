<template>
  <div class="inside">
      <div class="title">
          <div class="name">借款人信息</div>
      </div>
      <div style="margin:50px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-form-item label="企业名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="统一社会信用代码：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                  <el-form-item label="法人姓名：" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="法人身份证：" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                  <el-form-item label="手机号码：" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="邮箱：" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="4">
                    <el-form-item label="法人现居住地址：" prop="name">
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="4">
                    <el-form-item label="法人现办公地址：" prop="name">
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-col>
            </el-row>
            <div style="margin-left:150px;overflow:hidden;height:30px;">
                <el-checkbox-group v-model="check" style="float:left;margin-right:5px;">
                    <el-checkbox label="" name="type"></el-checkbox>
                </el-checkbox-group>
                <span style="color:#606266;font-size:14px;float:left;line-height:18px;">法人信息同借款人信息&nbsp;&nbsp;<label style="color:#ff6e1f;border:1px solid #ff6e1f;height:16px;border-radius:3px;">跨境保</label></span>
            </div>
            <el-form-item>
                <span style="color:#eb105c;font-size:14px;">提示：企业应为贷款申请主体</span>
            </el-form-item>
            <el-form-item>
                <div @click="submitForm('ruleForm')" class="login-in">提&nbsp;&nbsp;&nbsp;交</div>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>

export default {
   data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        check:false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.inside{
    background: white;
    border: 1px solid #e5e5e5;
    .title{
        height: 66px;
        border-bottom: 1px solid #e5e5e5;
        .name{
            font-size: 20px;
            color: #182b38;
            line-height: 66px;
            font-weight: bold;
            margin-left: 30px;
        }
    }
}
.login-in{
    width: 200px;
    height: 48px;
    font-size: 16px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    line-height: 48px;
    background: -webkit-linear-gradient(90deg, #950bbe, #fa0391, #fe6caa);
    background: linear-gradient(90deg, #950bbe, #fa0391, #fe6caa);
    cursor: pointer;
}
</style>

