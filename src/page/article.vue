<template>
    <div class="editorContainer mdContainer">
        <Header></Header>
        <div class="content-header content-center">
            <h4>{{html.title}}</h4>
            <p><span class="span left">{{html.key}}</span><span class="span right">{{html.created_at}}</span></p>
        </div>
        <div class="clear"></div>
        <div class="content-center previewContainer markdown-body" v-html="html.content">

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
    import {getArticle} from "../tools/method";
    import Header from '../components/header.vue'
    export default {
        components:{
            Header: Header
        },
        data (){
            return {
                html: [],
                id: "",
            }
        },
        methods: {
            getArt(){
                let _this = this
                getArticle({id: _this.id}).then(function (data) {
                    _this.html = data.data[0]
                }).catch(function (err) {
                    console.log(err)
                })
            }
        },
        mounted(){
            this.id = this.$route.params.id
            this.getArt()
        }
    }
</script>

<style scoped>
    .content-center{
        width: 60%;
        min-width: 850px;
        margin: 0 auto;
        padding-top: 15px;
    }
    .content-header{
        text-align: center;
    }
    .content-center h4{
        font-size: 32px;
    }
    .span{
        display: block;
        color: #cccccc;
        font-size: 16px;
        padding: 0 30px;
        margin: 10px 50px;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .clear{
        clear: both;
    }
    .mdContainer{
        background-color: white !important;
    }
</style>
