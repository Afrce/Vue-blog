<template>
    <div class="header">
        <div class="img">
            <img src="../assets/images/header.jpg" alt="" id="author">
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .header{
        width: 100%;
        height: 350px;
        background: #FAFBFC;
        position: relative;
        background: url("../assets/images/bg.png")  no-repeat;
        background-size: cover;
    }
    .img{
        position: absolute;
        bottom: 20px;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 1px solid #cccccc;
        border-radius: 50%;
        overflow: hidden;
    }
    #author{
        width: 100px;
    }
</style>
