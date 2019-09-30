import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { BASE_URL } from './config'
import { getUser } from '@/utils/auth'

// 创建axios实例


// var BASE_API = '';
// if (process.env.NODE_ENV == 'production') {
//     BASE_API = '"http://193.112.153.155:3001"';
// }else{
//     BASE_API = '"http://193.112.153.155:3001"';
// }
const service = axios.create({
    withCredentials: true,
    baseURL: BASE_URL, // 测试环境
    timeout: 100000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    if (store.getters.user) {
        config.headers['token'] = getUser().token
    }

    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
        * code为非20000是抛错 可结合自己业务进行修改
        */
        const res = response.data
        console.log("response",res)
        if (res.code !== 0) {
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 3 || res.msg === "登录异常，请重新登录") {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
