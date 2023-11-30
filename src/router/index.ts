import { createRouter, createWebHistory } from 'vue-router'

//createRouter方法，用于创建路由器实例，可以管理多个路由

export default createRouter({
    //路由模式创建
    history: createWebHistory(),
    //管理路由
    routes: [
        {
            //配置主页
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
           
        },
        {
            path: '/hospital',
            component: () => import('@/pages/hospital/index.vue'),
            meta:{
                title:'医院信息'
            },
            children:[{
                path:'register',
                component:() =>import('@/pages/hospital/Register/index.vue'),
                meta:{
                    title:'预约挂号'
                },
            },{
                path:'detail',
                component:() =>import('@/pages/hospital/detail/index.vue'),
                meta:{
                    title:'医院详情'
                },
            },
            {
                path:'notice',
                component:() =>import('@/pages/hospital/Notice/index.vue'),
                meta:{
                    title:'通知'
                },
            },
            {
                path:'close',
                component:() =>import('@/pages/hospital/Close/index.vue'),
                meta:{
                    title:'停诊信息'
                },
            },
            {
                path:'search',
                component:() =>import('@/pages/hospital/Search/index.vue'),
                meta:{
                    title:'查询'
                },
            },
            {
                path:'/register_step1',
                component:()=>import('@/pages/hospital/Register/register_step1.vue'),
                meta:{
                    title:'预约'
                },
            },
            {
                path:'/register_step2',
                component:()=>import('@/pages/hospital/Register/register_step2.vue'),
                meta:{
                    title:'预约'
                },
            },
        ]
        
        },
        //重定向，就是开始路由指向哪里
        {
            path:'/wxlogin',
            component:()=>import('@/pages/wxlogin/index.vue')
        },
        {
            path:'/user',
            component:()=>import('@/pages/User/index.vue'),
            meta:{
                title:'用户'
            },
            children:[{
                path:'certification',
                component:()=>import('@/pages/User/certification/index.vue'),
                meta:{
                    title:'实名认证'
                },
            },{
                path:'feedback',
                component:()=>import('@/pages/User/feedback/index.vue'),
                meta:{
                    title:'反馈'
                },
            },{
                path:'order',
                component:()=>import('@/pages/User/order/index.vue'),
                meta:{
                    title:'挂号订单'
                },

            },{
                path:'patient',
                component:()=>import('@/pages/User/patient/index.vue'),
                meta:{
                    title:'就诊人管理'
                },
            },{
                path:'profile',
                component:()=>import('@/pages/User/profile/index.vue'),
                meta:{
                    title:'账号信息'
                },
            }]
        },
        {
            path: '/',
            redirect: '/home'
        },

    ],
    //滚动行为:控制滚动条的位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})