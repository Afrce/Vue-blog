<template>
    <div class="contentMain">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>日志查看</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="typeContent">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 15px;text-align: center"
            >
                <el-table-column
                        fixed
                        prop="id"
                        label="id"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="doWhat"
                        label="操作"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="result"
                        label="结果"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="ip"
                        label="操作ip"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="操作时间"
                        width="240">
                </el-table-column>
            </el-table>
            <el-pagination
                    :page-size="per_page"
                    :pager-count="11"
                    layout="prev, pager, next"
                    background
                    @current-change="handleCurrentChange"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getLogs} from "../tools/admin";

    export default {
        name: "logs",
        data (){
            return {
                tableData: [],
                per_page: 20,
                total: 0,
                page: 1,
            }
        },
        methods: {
            getLogs(page){
                let _this = this
                getLogs({page:page}).then(function (data) {
                    console.log(data)
                    _this.tableData = data.data.data
                    _this.per_page = Number(data.data.per_page)
                    _this.total = data.data.total
                }).catch(function (err) {

                })
            },
            handleCurrentChange(val){
                this.getLogs(val)
            }
        },
        mounted (){
            this.getLogs(1)
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
    .contentMain{
        max-height: 100%;
        overflow: auto;
        width: 100%;
    }
</style>
