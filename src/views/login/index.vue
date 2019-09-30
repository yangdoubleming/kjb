<template>
    <div class="login-container">
        <div class="header">
            <div class="use-width">
                <img :src="logo2" class="login-logo">
                <div class="head-word">账号登录</div>
            </div>
        </div>
        <div class="login-box">
            <img :src="loginLeft" class="login-left">
            <div class="login-right">
                <div class="up">
                    <img :src="logo" style="float:right;margin-top:33px;margin-right:35px;" />
                </div>
                <div style="width:288px;margin:25px auto;">
                    <div style="color:#292929;font-size:24px; margin-bottom:25px;">欢迎登录</div>
                    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                        <el-form-item prop="username">
                            <span class="fontcontainer">
                                <span class="iconfont icon-yonghu"></span>
                            </span>
                            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <span class="fontcontainer">
                                <span class="iconfont icon-mima"></span>
                            </span>
                            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                            placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div style="width:100%;" :loading="loading" v-loading="loading" @click="handleLogin" class="login-in">
                            登  录
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div style="position:fixed;bottom:15px;font-size:14px;color:black;left:50%;margin-left:-200px;">
            版权所有©  2018 豆沙包科技有限公司 沪ICP备15015443号-1
        </div>
    </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import logo from '@/assets/login_logo.png'
import logo2 from '@/assets/login_logo2.png'
import loginLeft from '@/assets/login_left.png'

export default {
    name: "login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                console.log()
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error("密码不能小于5位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "",
                password: ""
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    { required: true, trigger: "blur", validator: validatePass }
                ]
            },
            loading: false,
            pwdType: "password",
            logo,
            logo2,
            loginLeft,
        };
    },
    methods: {
        showPwd() {
            if (this.pwdType === "password") {
                this.pwdType = "";
            } else {
                this.pwdType = "password";
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("Login", this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push({ path: "/" });
                        })
                        .catch((err) => {
                            this.loading = false;
                            this.$message.error(err.msg);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: white;
    $light_gray: black;
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 90%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: black !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid #d9d6d5;
            border-radius: 6px;
            color: #454545;
        }
    }
    .login-container{
        width: 100%;
        height: 100vh;
        background-image: url(../../assets/login_bg.jpg);
        background-repeat:round;
    }
    .use-width {
        width: 1200px;
        margin: 0 auto;
    }
    .header {
        width:100%;
        height: 100px;
        background: white;
    }
    .login-logo{
        width: 140px;
        height: 62px;
        float: left;
        margin-top:20px;
    }
    .head-word{
        float: left;
        font-size: 18px;
        margin-left: 20px;
        line-height: 100px;
    }
    .login-box{
        width: 1080px;
        height: 540px;
        margin: 0 auto;
        margin-top:50px; 
        background: white;
    }
    .login-left{
        width: 720px;
        height: 540px;
        float: left;
    }
    .login-right{
        width: 360px;
        height: 540px;
        float: left;
        .up{
            height: 158px;
            border-bottom: 1px solid #bdc4d3;
        }
    }
    .fontcontainer{
        margin-left: 5px;
    }
    .login-in{
        height: 48px;
        border-radius: 5px;
        text-align: center;
        color: #fff;
        line-height: 48px;
        background: -webkit-linear-gradient(90deg, #950bbe, #fa0391, #fe6caa);
        background: linear-gradient(90deg, #950bbe, #fa0391, #fe6caa);
        cursor: pointer;
    }
</style>