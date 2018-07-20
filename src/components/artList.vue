<template>
    <div class="contentMain">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="typeContent">
            <el-row>
                <el-button type="primary" @click="showAddType()">添加文章</el-button>
            </el-row>
            <el-table
                    :data="tableData"
                    border
                    style="margin-top: 15px;text-align: center"
            >
                <el-table-column
                        prop="id"
                        label="id"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="img"
                        label="封面图"
                        width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.img " style="height:20px">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="发布时间"
                        width="200">
                </el-table-column>

                <el-table-column
                        prop="type"
                        label="分类"
                        width="120">
                </el-table-column>

                <el-table-column
                        prop="key"
                        label="关键字"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    :page-size="per_page"
                    :pager-count="11"
                    layout="prev, pager, next"
                    background
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {checkLogin, getArticles, delArticle} from "../tools/admin";
    import {imgUrl} from "../tools/api";

    export default {
        name: "type",
        data () {
            return{
                tableData: [],
                per_page: 20,
                total: 0,
                name: "",
                title: "新增类别",
                id: 0,
                parent_id: 0,
                dialogFormVisible: false,
                formLabelWidth: "120px",
                type : "add",
                index : 0,
                imgUrl: imgUrl
            }
        },
        methods: {
            getTypes(){
                let APP = this
                getArticles().then(function (data) {
                    console.log(data)
                    if(data.status){
                        APP.tableData = data.data.data
                        APP.per_page = Number(data.data.per_page)
                        APP.total = data.data.total
                    }else{
                        checkLogin(APP,data)
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            handleEdit(index, data){
                this.id = data.id
                this.$router.push("/admin/articleEdit/" + this.id)
            },
            handleDelete(index, data){
                let _this = this
                this.$confirm('确认删除？删除后将无法恢复！', '确认删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '是的！确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    delArticle({'id': data.id}).then(function (data1) {
                        if(data1.status){
                            _this.tableData.splice(index,1)
                        }
                        _this.$notify({
                            title: '删除反馈',
                            message: data1.msg,
                            type: 'success'
                        })
                    }).catch(function (err) {

                    })
                })
            },
            showAddType(){
                this.$router.push("/admin/articleEdit/0")
            },
        },
        mounted(){
            this.getTypes();
        }
    }
</script>

<style scoped>
    .nav{
        padding: 24px;
        margin-left: 10px;
    }
    .typeContent{
        padding: 24px;
    }
    .el-pagination{
        margin-top: 10px;
    }
</style>
