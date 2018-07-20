<template>
    <div class="contentMain">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{nav}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="typeContent">
            <el-form  label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="文章封面">
                    <a href="javascript:;" class="file">选择图片
                        <input type="file" accept=".jpg,.gif,.png,.jpeg" @change="uploadImg($event)">
                    </a>
                    <br>
                    <el-input v-model="imgUrl" type="hidden"></el-input>
                    <img :src="imgUrl" style="width: 300px" v-show="imgUrl != ''">
                </el-form-item>

                <el-form-item label="文章类别">
                    <el-select v-model="type" placeholder="请选择文章类别">
                        <el-option  v-for="item in typesArr" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章关键字">
                    <el-select v-model="key" placeholder="请选择文章关键字">
                        <el-option  v-for="item in keysArr" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章内容">
                    <a href="javascript:;" class="file">选择MD文件
                        <input type="file" @change="uploadMd($event)" accept=".md">
                    </a>
                    <br>
                    <div style="width: 100%;height: 500px">
                        <markdown
                                :mdValuesP="mdContent"
                                :fullPageStatusP="false"
                                :editStatusP="false"
                                :previewStatusP="false"
                                :navStatusP="true"
                                :icoStatusP="true"
                                @childevent="childEventHandler">
                        </markdown>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateArt">{{id == 0 ? "新建文章" : "更新文章"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    /*根据项目修改引入文件的路径（所需文件放在了static目录下）*/
    /*引入reset文件*/
    import "../../static/css/reset.scss";
    /*引入github的markdown样式文件*/
    import "../../static/css/github-markdown.css";
    /*引入atom的代码高亮样式文件*/
    import "../../static/css/atom-one-dark.min.css";
    import {getArtInfo, getList, uploadImg, uploadMd, updateArt} from "../tools/admin";
    import markdown from '../components/markdown'
    import {imgUrl} from "../tools/api";
    import eventdata from '../tools/bus'
    export default {
        name: "art-edit",
        components :{
          markdown
        },
        data () {
            return {
                nav: "",
                id: 0,
                title: "",
                imgUrl: "",
                content: '',
                mdContent: "",
                key: "",
                type: "",
                keysArr: [],
                typesArr: []
            }
        },
        methods: {
            getArtInfo(id){
                if(id == 0){
                    return false
                }
                let _this =this
                getArtInfo({id: id}).then(function (data) {
                    if(data.status){
                        _this.key = data.data.key
                        _this.title = data.data.title
                        _this.content = data.data.content
                        _this.mdContent = data.data.mdContent
                        _this.type = data.data.type
                        _this.imgUrl = data.data.img
                        eventdata.$emit('changeMd',_this.mdContent)
                    }else{
                        _this.$notify({
                            title: '获取文章信息失败',
                            message: data.msg,
                            type: 'success'
                        })
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            uploadImg(event){
                let file = event.target.files[0];
                let formData = new FormData();
                formData.append('file',file);
                let _this = this
                uploadImg(formData).then(function (data) {
                    if(data.status){
                        _this.imgUrl = imgUrl + data.data.imgUrl
                        _this.$notify({
                            title: '图片上传结果',
                            message: "上传成功",
                            type: 'success'
                        })
                    }else{
                        _this.$notify({
                            title: '图片上传结果',
                            message: data.msg,
                            type: 'success'
                        })
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            uploadMd(event){
                let file = event.target.files[0];
                let formData = new FormData();
                formData.append('file',file);
                let _this = this
                uploadMd(formData).then(function (data) {
                    if(data.status){
                        _this.mdContent = data.data.content
                        eventdata.$emit('changeMd',_this.mdContent)
                        _this.$notify({
                            title: 'md文档上传结果',
                            message: "上传成功",
                            type: 'success'
                        })
                    }else{
                        _this.$notify({
                            title: 'md文档上传结果',
                            message: data.msg,
                            type: 'success'
                        })
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            // 监听事件，接收子组件传过来的数据
            childEventHandler:function(res){
                // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
                this.msg=res;
                this.mdContent = res.mdValue
                this.content = res.htmlValue
            },
            getList (){
                let _this = this
                getList().then(function (data) {
                    _this.keysArr = data.data.key
                    _this.typesArr = data.data.type
                }).catch(function (err) {
                    console.log(err)
                })
            },
            updateArt (){
                let _this = this
                updateArt({id: _this.id, title: _this.title, img: _this.imgUrl, content: _this.content, mdContent: _this.mdContent, type: _this.type, key: _this.key}).then(function (data) {
                    if(data.status){
                        _this.$notify({
                            title: '文章修改结果',
                            message: "修改成功",
                            type: 'success'
                        })
                        _this.$router.push('/admin/article')
                    }else{
                        _this.$notify({
                            title: '文章修改结果',
                            message: data.msg,
                            type: 'success'
                        })
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            }

        },
        mounted () {
            let id = this.$route.params.id
            if( id == 0) {
                this.nav = "新增文章"
            }else{
                this.nav = "修改文章"
                this.getArtInfo(id)
            }
            this.id = id
            this.getList()
        }
    }
</script>

<style scoped>
    .file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
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
    .el-input__inner{
        max-width: 450px;
    }
    .el-form-item__content{
        line-height: 0;
    }
</style>
