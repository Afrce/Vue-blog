<template>
    <div class="login">
        <div class="login-form">
            <div class="login-header">
                <p>登录后台</p>
            </div>
            <el-input
                    placeholder="请输入用户名"
                    suffix-icon="fa fa-user"
                    v-model="userName"
                    style="margin-bottom: 18px"
            >
            </el-input>

            <el-input
                    placeholder="请输入密码"
                    suffix-icon="fa fa-keyboard-o"
                    v-model="password"
                    type="password"
                    style="margin-bottom: 18px"
                    @keyup.native.enter="login"
            >
            </el-input>

            <el-button
                    type="primary" :loading="loginLoading"
                    style="width: 100%;margin-bottom: 18px"
                    @click.native="login"
            >登录
            </el-button>
        </div>
    </div>
</template>

<script>
    import {login} from "../tools/admin";

    export default {
        data() {
            return {
                userName: '',
                password: '',
                loginLoading: false
            }
        },
        methods: {
            login() {
                let APP = this;
                APP.loginLoading = true;
                login({'username': APP.userName, 'password': APP.password}).then(function (data) {
                    if(data.status){
                        localStorage.setItem('jwt',data.data.token)
                        localStorage.setItem('exp',data.data.exp)
                        APP.$notify({
                            title: '登录成功',
                            message: '登录成功',
                            type: 'success'
                        });
                        APP.loginLoading = false;
                        APP.$router.push({path: '/admin'});
                    }else{
                        APP.$notify({
                            title: '登录失败',
                            message: data.msg,
                            type: 'warning'
                        });
                        APP.loginLoading = false;
                    }
                }).catch(function (err) {
                    APP.$notify({
                        title: '登录失败',
                        message: "未知错误发生，请稍后再试",
                        type: 'warning'
                    });
                    APP.loginLoading = false;
                })
            }
        }
    }
</script>

<style scoped>
    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #e4e5e6;
        background-image: url("../assets/images/bg.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .login-form{
        width: 375px;
        height: 200px;
        padding: 30px;
        background: rgba(216,216,216,0.5);
        text-align: left;
        border-radius: 4px;
        position: relative;
        margin-left: 0;
        margin-right: 0;
        zoom: 1;
        display: block;
    }
    .login-header{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
    }
</style>
