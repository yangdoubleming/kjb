import request from '@/utils/request'

export function saasGetVerifyCode(param) {                  // saas获取验证码
    return request({
        url: `/code/getPhoneCodeVerify`,
        method: 'post',
        data: param
    })
}

export function easylink(param) {                  // saas获取验证码
    return request({
        url: `/easylink/submit`,
        method: 'post',
        data: param
    })
}