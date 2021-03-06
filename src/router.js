import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    { path: '/home', component: () => import('@/views/home'), hidden: true },
    { path: '/one', component: () => import('@/views/one'), hidden: true },
    { path: '/two', component: () => import('@/views/two'), hidden: true },
    { path: '/three', component: () => import('@/views/three'), hidden: true },
    {
        path: '/',
        redirect: '/home',
        name: 'home',
        hidden: true,
        children: [{
            path: 'home',
            component: () => import('@/views/home')
        }]
    },
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
