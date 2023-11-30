<template>
<div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>请选择就诊人</span>
            <el-button class="button" type="primary" :icon="User" @click="goUser">添加就诊人</el-button>
          </div>
        </template>
       <!-- 每张卡片 -->
       <div class="user">
          <Vistor @click="changeIndex(index)" v-for="(item,index) in userArr" :key="item.id" class="item" :user="item" :index="index" :currentIndex="currentIndex"></Vistor>
       </div>
      </el-card>
      <!-- 底部内容 -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>挂号信息</span>
          </div>
        </template>

        <!-- 卡片身体 -->
        <el-descriptions
        class="margin-top"
        :column="2"
        border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
             就诊日期：
            </div>
          </template>
          {{docInfo.workDate}}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
              <div class="cell-item">
               就诊医院：
              </div>
            </template>
           {{docInfo.param?.hosname}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
               就诊科室：
              </div>
            </template>
            {{docInfo.param?.depname}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
               医生姓名：
              </div>
            </template>
            {{docInfo.docname}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
               医生职称：
              </div>
            </template>
            {{docInfo.title}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
               医生专长：
              </div>
            </template>
           {{docInfo.skill}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
               挂号费用：
              </div>
            </template>
            {{docInfo.amount}}
          </el-descriptions-item>
      </el-descriptions>
      </el-card>
      <!-- 确定挂号 -->
      <div class="btn">
        <el-button type="primary" size="large" :disabled="currentIndex==-1" @click="submitOrder">确认挂号</el-button>
      </div>
</div>
 </template>
<script setup lang='ts'>
import { User } from '@element-plus/icons-vue';

import {reqDoctorInfo, reqGetUser} from  '@/api/hospital'
import { onMounted,ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {  DoctorInfo } from '@/api/hospital/type';
import {reqSubmitOrder} from '@/api/user'
import {SubmitOrder} from '@/api/user/type'
import { ElMessage } from 'element-plus';
let $route=useRoute()
let $router=useRouter()
//存储就诊人索引
let currentIndex = ref<number>(-1);

//存储医生信息
let docInfo=ref<any>([])
//组件挂在完毕获取相应数据
onMounted(()=>{
  //获取就诊人信息

 fetchUserData()
 fetchInfo();
})
//储存全部就诊人信息
let userArr=ref<any>([]);
const fetchUserData = async()=>{
  let result:any=await reqGetUser();
 if(result.code==200){
  userArr.value=result.data
 }
}
const fetchInfo =async()=>{
  let result:DoctorInfo=await reqDoctorInfo($route.query.docId as string);
  if(result.code==200){
    docInfo.value=result.data
  }
}
//就诊人子组件回调
const changeIndex =(index:number)=>{
   currentIndex.value=index
}

//确定挂号按钮回调
const submitOrder=async()=>{
  let hoscode=docInfo.value.hoscode
  let scheduleId=docInfo.value.id
  let patientId=userArr.value[currentIndex.value].id
  console.log(patientId)
  let resuilt:SubmitOrder = await reqSubmitOrder(hoscode,scheduleId,patientId)
   console.log(resuilt)
  //let resuilt:SubmitOrder = await reqSubmitOrder(scheduleId,patientId)
  if (resuilt.code==200){
    
    $router.push({path:'/user/order',query:{orderId:resuilt.data}})
  }else{
    ElMessage({
      type:'error',
      message:resuilt.message
    })
  }
  
}
//预约挂号添加就诊人按钮
const goUser = ()=>{
  //路由跳转
  $router.push({path:'user/patient',query:{type:'add'}})
}
</script>
<style scoped lang='scss'>
.container{
    .tip{
        font-weight: 900;
        color:#7f7f7f;
        font-size: 20px;
    }
    .box-card{
        margin: 25px 0px;
        .card-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .user{
            display: flex;
            flex-wrap: wrap;
            .item{
                width: 32%;
                margin: 5px;
            }
        }
    }
    .btn{
        display:flex ;
        justify-content: center;
        margin: 20px;
        
    }
}

</style>