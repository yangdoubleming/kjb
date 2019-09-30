import request from '@/utils/request'

export function accountSsoService(params) {
    return request({
        url: `/account/ssoService`,
        method: 'post',
        data: params
    })
}

export function getCity(params) {
    return request({
        url: `/company/getCity/${params}`,
        method: 'get'
    })
}

export function getBankBranch(depositBankNo,depositBankCityNo) {
    return request({
        url: `/company/getBankBranch/${depositBankNo}/${depositBankCityNo}`,
        method: 'get'
    })
}

export function accountPayment(params) {
    return request({
        url: `/account/payment`,
        method: 'post',
        data: params
    })
}

export function accountCallBack(params) {
    return request({
        url: `/account/callBack`,
        method: 'post',
        data: params
    })
}

export function accountResetPayPwd(params) {
    return request({
        url: `/account/resetPayPwd`,
        method: 'post',
        data: params
    })
}

export function getVerfyCode(username, photoCode) {
    return request({
        url: `/account/getVerfyCode/${username}/${photoCode}`,
        method: 'get'
    })
}

export function getBank() {
    return request({
        url: `/company/getBank`,
        method: 'get'
    })
}

export function getProvince() {
    return request({
        url: `/company/getProvince`,
        method: 'get'
    })
}

export function accountRegister(params) {
    return request({
        url: `/account/register`,
        method: 'post',
        data: params
    })
}

export function accountUpdate(params) {
    return request({
        url: `/account/update`,
        method: 'post',
        data: params
    })
}