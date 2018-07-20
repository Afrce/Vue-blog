import {host} from "./api";
import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue';
export function initRequest () {
    let init = axios.create({
        baseURL: host + "/admin",
        timeout: 10000,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        validateStatus: function (status) {
            return status >= 200 && status < 300
        }
    })
    let jwt =  localStorage.getItem('jwt');
    init.defaults.headers.Authorization = jwt;
    return init
}

export function initUpload () {
    let init = axios.create({
        baseURL: host + "/admin",
        timeout: 10000,
        headers:{'Content-Type':'multipart/form-data'},
        validateStatus: function (status) {
            return status >= 200 && status < 300
        }
    })
    let jwt =  localStorage.getItem('jwt');
    init.defaults.headers.Authorization = jwt;
    return init
}
// 需要和axios catch 配合使用
export function errorHandle (error) {
    let code = error.response.status
    let msgs = {
        400: '语义有误，当前请求无法被服务器理解,请求参数有误',
        401: '请求已经包含了 Authorization 证书，代表着服务器验证已经拒绝了那些证书',
        404: '请求失败，请求所希望得到的资源未被在服务器上发现',
        405: '请求行中指定的请求方法不能被用于请求相应的资源',
        412: '图像验证码错误,服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个',
        500: '服务器错误'
    }
    if (code in msgs) {
        if (code == 401) {
            alert('身份验证失效，请重新登录')
            bus.$emit('logout')
        } else if (code == 500) {
            alert('网络错误,请稍后重试')
        }
    }
}

export const checkLogin = (APP,data) => {
    if(!data.status){
        APP.$notify({
            title: '登录失效',
            message: data.msg,
            type: 'warning'
        });
        APP.$router.push({path: '/admin/login'});
    }
}

export const login = (params) => {
    return initRequest().post('/login', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const getTypes = (params) => {
    return initRequest().post('/getTypes', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const addType = (params) => {
    return initRequest().post('/addType', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const delType = (params) => {
    return initRequest().post('/delType', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const updateType = (params) => {
    return initRequest().post('/updateType', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const getLogs = (params) => {
    return initRequest().post('/getLogs', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}


export const getKeys = (params) => {
    return initRequest().post('/getKeys', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const addKey = (params) => {
    return initRequest().post('/addKey', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const delKey = (params) => {
    return initRequest().post('/delKey', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const updateKey = (params) => {
    return initRequest().post('/updateKey', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const getArticles = (params) => {
    return initRequest().post('/getArticles', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}
export const delArticle = (params) => {
    return initRequest().post('/delArticle', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const getArtInfo = (params) => {
    return initRequest().post('/getArtInfo', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const getList = (params) => {
    return initRequest().post('/getList', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

export const uploadImg = (params) => {
    return initUpload().post('/uploadImg', params).then(res => res.data).catch(errorHandle)
}

export const uploadMd = (params) => {
    return initUpload().post('/uploadMd', params).then(res => res.data).catch(errorHandle)
}

export const updateArt = (params) => {
    return initRequest().post('/updateArt', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}

