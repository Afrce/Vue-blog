<template>
    <div class="container">
        <bHeader></bHeader>
        <div class="nav">
            <div class="nav-center">
                <el-menu  class="el-menu-demo" mode="horizontal"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                          default-active="0">
                    <el-menu-item index="0" @click="getIndexes(0)">首页</el-menu-item>
                    <el-menu-item v-for="(item, key) in types" :key="key" :index="item.id.toString()" @click="getIndexes(item.id)">{{item.name}}</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div class="content">
            <div class="content-center">
                <el-row>
                    <el-col :span="6" v-for="(o, index) in Article.data" :key="index" :offset="2" class="art">
                        <div @click="goToPage(o.id)">
                            <el-card :body-style="{ padding: '0px',position: 'relative'}">
                                <div class="image" :style="{background:'url('+ o.img +') ',backgroundSize:'cover',
        backgroundPosition: 'center'}">

                                </div>
                                <div style="padding: 14px;" class="title">
                                    <span>{{o.title}}</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{o.created_at.substring(0,16)}}</time>
                                        <span>{{o.type}} && {{o.key}}</span>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
                <div v-show="NoData" class="noData">
                    抱歉！暂无相关数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAllKey, getAllType, getIndex} from "../tools/method";
    import bHeader from '../components/header.vue'
    export default {
        components:{
            bHeader
        },
        data(){
            return {
                keys: [],
                types: [],
                NoData: false,
                Article: [],
                loading: {},
            }
        },
        methods: {
            getAllTypes(){
                let _this = this
                getAllType().then(function (data) {
                    _this.types = data.data
                }).catch(function () {
                    console.log(data)
                })
            },
            getAllKeys(){
                let _this = this
                getAllKey().then(function (data) {
                    _this.keys = data.data
                }).catch(function () {
                    console.log(data)
                })
            },
            getIndexes(type){
                let _this = this
                _this.loadingBegin()
                this.NoData = false
                getIndex({type:type}).then(function (data) {
                    _this.Article = data.data
                    if(data.data.data.length === 0){
                        _this.NoData = true
                    }
                    _this.loading.close()
                }).catch(function () {
                    _this.loading.close()
                    console.log(data)
                })
            },
            goToPage(id){
                console.log(id)
                this.$router.push('/article/' + id)
            },
            loadingBegin () {
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }
        },
        created () {
            this.getAllKeys()
            this.getAllTypes()
            this.getIndexes()
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
    }
    .nav, .content{
        width: 100%;
    }
    .nav-center, .content-center{
        width: 60%;
        min-width: 850px;
        margin: 0 auto;
    }
    .nav{
        background: #545c64;
    }
    .art{
        margin-top: 10px;
        cursor: pointer;
    }
    .title{
        font-size: 14px;
    }
    .title span:nth-child(2){
        font-size: 12px;
        color: #CCC;
    }
    .time{
        font-size: 12px;
    }
    .noData{
        font-size: 30px;
        text-align: center;
        color: #333333;
        margin-top: 10px;
    }
    .image{
        width: 364px;
        height: 242px;
    }
</style>
