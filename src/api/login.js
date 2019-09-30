import request from '@/utils/request'

export function login(telephone, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            telephone,
            password
        }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/menus',
        method: 'get',
        // params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
