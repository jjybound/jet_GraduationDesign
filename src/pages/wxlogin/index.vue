<template>
<div>
</div>
 </template>
<script setup lang='ts'>
//获取跳转之后的用户信息

import { useRoute } from 'vue-router';
import {SET_TOKEN} from '@/utils/user';
import {onMounted} from 'vue'
//读取到了之后直接塞进本地存储
let $route=useRoute();
onMounted(() => {
    console.log("重定向过来了")
    console.log($route.query)
    SET_TOKEN(JSON.stringify($route.query));
});

//访问此路由组件，说明微信授权成功
let html:any= document.querySelector('html');
html.style.display = 'none'
</script>
<style scoped lang='scss'>
</style>