import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/order/ordersByBaosi',
        method: 'post',
        data: params
    })
}

export function getCompanyListName(params) {
    return request({
        url: '/company/getCompanyListName',
        method: 'post',
        data: params
    })
}

export function getCusInsureDetails(params) {
    return request({
        url: '/merchant/merchantOrderList',
        method: 'get',
        params: params
    })
}

export function findCiCompanyLoanList(data) {
    return request({
        url: `/apply/applyMerchantForBaosi   `,
        method: 'post',
        data: data
    })
}

export function getCiCompanyLoanById(params) {
    return request({
        url: '/apply/applyClaim',
        method: 'get',
        params: params
    })
}

export function documentInfo(params) {
    return request({
        url: 'apply/documentInfo',
        method: 'post',
        data: params
    })
} 

export function exportApplyDataToExcel(params) {
    return request({
        url: '/apply/exportApplyToExcelForBaosi',
        method: 'get',
        params: params,
        responseType: 'arraybuffer'
    })
}

export function exportOrderToExcelForBaosi(params) {
    return request({
        url: '/order/exportOrderToExcelForBaosi',
        method: 'get',
        params: params,
        responseType: 'arraybuffer'
    })
}

export function ordersByBatchForBaosi(params) {
    return request({
        url: '/order/ordersByBatchForBaosi',
        method: 'post',
        data: params,
    })
}



export function toExamineCompanyLoan(data) {
    return request({
        url: '/toExamineCompanyLoan',
        method: 'post',
        data: data
    })
}

export function editCompanyLoan(data) {
    return request({
        url: '/editCompanyLoan',
        method: 'post',
        data: data
    })
}

export function findCiRepaymentRecordList(data,params={}) {
    return request({
        url: `/findCiRepaymentRecordList?ciCompanyId=${params.ciCompanyId}&loanNo=${params.loanNo}`,
        method: 'post',
        data: data
    })
}

export function editRepaymentRecord(data) {
    return request({
        url: '/editRepaymentRecord',
        method: 'post',
        data: data
    })
}

export function toBatchExamineCompanyLoan(data) {
    return request({
        url: '/toBatchExamineCompanyLoan',
        method: 'post',
        data: data
    })
}

export function applyExamine(data) {
    return request({
        url: '/apply/applyExamine',
        method: 'post',
        data: data
    })
}

export function applyExamineBatch(data) {
    return request({
        url: '/apply/applyExamineBatch',
        method: 'post',
        data: data
    })
}

export function getSettlementForBaosi(data) {
    return request({
        url: '/settlement/getSettlementForBaosi',
        method: 'post',
        data: data
    })
}

export function getSettlementListForBaosi(data) {
    return request({
        url: '/settlement/getSettlementListForBaosi',
        method: 'post',
        data: data
    })
}

export function getSettlementAllForBaosi(data) {
    return request({
        url: '/settlement/getSettlementAllForBaosi',
        method: 'post',
        data: data
    })
}

export function getSettlementOrderForBaosi(data) {
    return request({
        url: '/settlement/getSettlementOrderForBaosi',
        method: 'post',
        data: data
    })
}

export function generateSettlementListForBaosi(data) {
    return request({
        url: '/settlement/generateSettlementListForBaosi',
        method: 'post',
        data: data
    })
}

export function savePayLinkImage(data) {
    return request({
        url: `/settlement/savePayLinkImage`,
        method: 'post',
        data: data
    })
}

export function getInsuranceCommissionRate(data) {
    return request({
        url: `/settlement/getInsuranceCommissionRate`,
        method: 'post',
        data: data
    })
}

export function getInsuranceCommissionRateById(id) {
    return request({
        url: `/settlement/getInsuranceCommissionRateById?id=${id}`,
        method: 'get'
    })
}


export function findBaoSiCompanyListByName(data) {
    return request({
        url: `/settlement/findBaoSiCompanyListByName`,
        method: 'post',
        data: data
    })
}

export function editInsuranceCommissionRate(data) {
    return request({
        url: `/settlement/editInsuranceCommissionRate`,
        method: 'post',
        data: data
    })
}











