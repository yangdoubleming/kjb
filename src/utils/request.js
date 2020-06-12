import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { BASE_URL } from './config'

// 创建axios实例

const service = axios.create({
    withCredentials: true,
    baseURL: BASE_URL, // 测试环境
    timeout: 100000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    return config
}, error => {
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
        return response.data
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
