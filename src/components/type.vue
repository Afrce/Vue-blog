<template>
    <div class="contentMain">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>类型管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="typeContent">
            <el-row>
                <el-button type="primary" @click="showAddType()">添加分类</el-button>
            </el-row>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 15px;text-align: center"
            >
                <el-table-column
                        prop="id"
                        label="id"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="parent_id"
                        label="父级id"
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

        <el-dialog :title="title" :visible.sync="dialogFormVisible" style="max-width: 1000px;margin: 0 auto;">
            <el-form>
                <el-form-item label="id" :label-width="formLabelWidth" v-if="type == 'update'">
                    <el-input v-model="id" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="父级id" :label-width="formLabelWidth" v-if="type == 'update'">
                    <el-input v-model="parent_id" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" :label-width="formLabelWidth">
                    <el-input v-model="name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTypeNow()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getTypes, checkLogin, addType, delType, updateType} from "../tools/admin";

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
            }
        },
        methods: {
            getTypes(){
                let APP = this
                getTypes().then(function (data) {
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
                this.title = "更新类别信息"
                this.type = "update"
                this.name = data.name
                this.index = index
                this.dialogFormVisible = true
            },
            handleDelete(index, data){
                let _this = this
                this.$confirm('确认删除？删除后将无法恢复！', '确认删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '是的！确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    delType({'id': data.id}).then(function (data1) {
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
                this.type = "add"
                this.title = "新增类别"
                this.name = ""
                this.dialogFormVisible = true
            },
            addTypeNow(){
                let _this = this
                if(_this.type == 'add'){
                    addType({'name': _this.name}).then(function (data) {
                        if(data.status){
                            _this.tableData.unshift(data.data)
                        }
                        _this.$notify({
                            title: '添加反馈',
                            message: data.msg,
                            type: 'success'
                        })
                        _this.dialogFormVisible = false
                    }).catch(function (error) {

                    })
                }else {
                    updateType({id: _this.id, 'name': _this.name}).then(function (data) {
                        if(data.status){
                            _this.tableData[_this.index].name = _this.name
                        }
                        _this.$notify({
                            title: '添加反馈',
                            message: data.msg,
                            type: 'success'
                        })
                        _this.dialogFormVisible = false
                    }).catch(function (error) {

                    })
                }

            }
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
