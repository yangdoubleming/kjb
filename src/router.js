import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/userManage/userInfo',
        name: 'userManage',
        hidden: true,
        children: [{
            path: 'userManage',
            component: () => import('@/views/userManage/userInfo')
        }]
    },

    // 信息管理
    {
        path: '/userManage',
        component: Layout,
        children: [
            {
                path: 'userInfo',
                name: 'userInfo',
                component: () => import('@/views/userManage/userInfo'),
                meta: { title: '订单查询'}
            },
            {
                path: 'loanRecords',
                name: 'loanRecords',
                component: () => import('@/views/userManage/loanRecords'),
                meta: { title: '理赔列表'}
            },
            {
                path: 'repayRecords',
                name: 'repayRecords',
                component: () => import('@/views/userManage/repayRecords'),
                meta: { title: '还款记录'}
            },
            {
                path: 'userInfoDetails',
                name: 'userInfoDetails',
                component: () => import('@/views/userManage/userInfoDetails'),
                meta: { title: '用户详情' }
            },
            {
                path: 'loanDetails',
                name: 'loanDetails',
                component: () => import('@/views/userManage/loanDetails'),
                meta: { title: '理赔详情' }
            },
            {
                path: 'loanEdit',
                name: 'loanEdit',
                component: () => import('@/views/userManage/loanEdit'),
                meta: { title: '贷款信息录入' }
            },
            {
                path: 'settleList',
                name: 'settleList',
                component: () => import('@/views/userManage/settleList'),
                meta: { title: '手续费结算列表' }
            },
            {
                path: 'premium',
                name: 'premium',
                component: () => import('@/views/userManage/premium'),
                meta: { title: '保费结算列表' }
            },
            {
                path: 'generateSettleList',
                name: 'generateSettleList',
                component: () => import('@/views/userManage/generateSettleList'),
                meta: { title: '生成结算单' }
            },
            {
                path: 'generateDetails',
                name: 'generateDetails',
                component: () => import('@/views/userManage/generateDetails'),
                meta: { title: '结算详情' }
            },
            {
                path: 'lastList',
                name: 'lastList',
                component: () => import('@/views/userManage/lastList'),
                meta: { title: '结算详情' }
            },
            {
                path: 'commissionList',
                name: 'commissionList',
                component: () => import('@/views/userManage/commissionList'),
                meta: { title: '产品佣金列表' }
            },
            {
                path: 'commissionDetails',
                name: 'commissionDetails',
                component: () => import('@/views/userManage/commissionDetails'),
                meta: { title: '产品佣金编辑' }
            },
        ]
    },

];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
