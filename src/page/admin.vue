<template>
    <div class="content">
        <div class="admin-header">
            <span class="logo">
                后台管理
            </span>
            <div class="aboutMe">

            </div>
        </div>
        <div class="main">
            <el-col :span="3" class="aside" >
                <el-menu
                        default-active="/admin"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :router = "true"
                >
                    <el-menu-item index="/admin">
                        <i class="el-icon-setting"></i>
                        <span slot="title">类型管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/keyWord">
                        <i class="el-icon-setting"></i>
                        <span slot="title">关键字管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/article">
                        <i class="el-icon-setting"></i>
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/logs">
                        <i class="el-icon-setting"></i>
                        <span slot="title">日志查看</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <div class="content_main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "admin",
        data() {
            return {
                true: true
            }
        }
    }
</script>

<style scoped>
    .content{
        height: 100%;
    }
    .admin-header{
        width: 100%;
        height:10%;
        background-color: rgb(84, 92, 100);
        max-height: 100px;
    }
    .logo{
        font-size: 24px;
        font-weight: bolder;
        line-height: 100px;
        padding: 5px 25px;
        color: #cccccc;
    }
    .aside{
        height: 100%;
        background-color: rgb(84, 92, 100);
        min-width: 175px;
    }
    .main{
        height: 90%;
        width: 100%;
    }
    .content_main{
        max-height: 100%;
        overflow: auto;
        float: left;
        width: 87.5%;
    }
</style>
