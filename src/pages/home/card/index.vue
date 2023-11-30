<template>
<el-card shadow="hover" class="card" @click="goDetail">
  <div class="content">
    <div class="left">
        <div class="hostpitalName">
           {{HospitalInfo.hosname}}
        </div>
        <div class="tip">
            <div class="level">
                <svg t="1692088795076" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4022" width="16" height="16"><path d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z" p-id="4023"></path></svg>
                <span>{{HospitalInfo.param.hostypeString}}</span>
            </div>
            <div class="time">
                <svg t="1692088895677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5218" width="16" height="16"><path d="M533.333333 938.666667C332.8 938.666667 170.666667 776.533333 170.666667 576S332.8 213.333333 533.333333 213.333333 896 375.466667 896 576 733.866667 938.666667 533.333333 938.666667z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 256 533.333333 256 213.333333 401.066667 213.333333 576 358.4 896 533.333333 896zM640 128v42.666667h-213.333333V128h213.333333z m55.466667 256l29.866666 29.866667-174.933333 174.933333-29.866667-29.866667L695.466667 384z" fill="#444444" p-id="5219"></path></svg>
                <span>{{HospitalInfo.bookingRule?.releaseTime}}——{{HospitalInfo.bookingRule?.quitTime}} </span>
            </div>
        </div>
    </div>
    <div class="right">
        <!-- 因为这个图片地址是加密的，需要使用base64的形式打开 -->
        <img :src="HospitalInfo.logoData" alt="">
    </div>

  </div>
</el-card>
 </template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

let $router=useRouter()



//点击医院卡片跳转路由
const goDetail =()=>{
  $router.push({path:'/hospital/register',query:{hoscode:props.HospitalInfo.hoscode}})
  
}
//接收父组件的传递过来的props
let props=defineProps(['HospitalInfo'])

</script>
<style scoped lang="scss">
.card:hover{
    cursor: pointer;
}
.content{
    display:flex;
    justify-content:space-between;
    .right{
        img{  
            width:50px;
            height:50px;
        }
    }
    .left{
        width:60%;
        .tip{
            margin-top:25px;
            color:#7f7f7f;
            display:flex;
            justify-content:space-between;
            .level, .time{
                display:flex;
                align-items:center;
                span{
                    margin-left:5px
                }
            }
          
        }
    }
}
</style>

