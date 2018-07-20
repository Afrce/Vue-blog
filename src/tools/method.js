import {host} from "./api";
import axios from 'axios'
import Qs from 'qs'
export function initRequest () {
    let init = axios.create({
        baseURL: host,
        timeout: 10000,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        validateStatus: function (status) {
                return status >= 200 && status < 300
        }
    })
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
// 改变上放选项
export const changeData = (params) => {
    return initRequest().post('/changeData', Qs.stringify(params)).then( res => res.data).catch(errorHandle)
}
// 获取具体数据

export const getArticle = (params) => {
    return initRequest().post('/getArticle', Qs.stringify(params)).then( res => res.data).catch(errorHandle)
}

// 搜索
export const search = (params) => {
    return initRequest().post('/search', Qs.stringify(params)).then( res => res.data).catch(errorHandle)
}

// 获取所有type
export const getAllType = (params) => {
    return initRequest().post('/getAllType', Qs.stringify(params)).then(res=> res.data).catch(errorHandle)
}

// 获取所有关键字
export const getAllKey = (params) => {
    return initRequest().post('/getAllKey', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}
// 首页数据
export const getIndex = (params) => {
    return initRequest().post('/getIndex', Qs.stringify(params)).then(res => res.data).catch(errorHandle)
}
