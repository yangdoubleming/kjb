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
        redirect: '/login',
        name: 'login',
        hidden: true,
        children: [{
            path: 'login',
            component: () => import('@/views/login/index')
        }]
    },
    // 登录
    {
        path: '/login',
        component: Layout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/login/index'),
                meta: { title: 'login'}
            },
        ]
    },
    // 个人信息
    {
        path: '/center',
        component: Layout,
        children: [
            {
                path: 'personalInfo',
                name: 'personalInfo',
                component: () => import('@/views/center/personalInfo'),
                meta: { title: '个人信息'}
            }
        ]
    },

];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
