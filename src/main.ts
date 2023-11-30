//vue3框架提供方法createApp方法，用来创建应用实例方法
import { createApp } from 'vue'
//引入根组件App
import App from './App.vue'
//引入清除默认样式
import '@/style/reset.scss'
//引入vue-router组件
import router from './router'
//引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//引入全局组件--顶部和底部
import HospitalTop from '@/components/hostpital_top/index.vue'
import HospitalBottom from '@/components/hostpital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import VisitorVue from './components/Visitor/Visitor.vue';
import Gpt from './components/Gpt/index.vue'
//引入pinpa仓库，类似于vuex
import pinia from '@/store'
//国际化文件
//@ts-ignore 忽略下方ts错误
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app = createApp(App)
app.component('HospitalTop', HospitalTop);
app.component('HospitalBottom', HospitalBottom)
app.component('Login',Login)
app.component('Vistor',VisitorVue)
app.component('Gpt',Gpt)

app.use(router)

app.use(ElementPlus,{
    locale:zhCn
})
app.use(pinia)
//引入路由守卫
import './permisstion'
app.mount('#app')
