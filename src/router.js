import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/',
        redirect: '/404',
        name: '404',
        hidden: true,
        children: [{
            path: '404',
            component: () => import('@/views/404')
        }]
    },
];
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
