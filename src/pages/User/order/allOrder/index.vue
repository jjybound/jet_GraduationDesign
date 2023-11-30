<template>
<div>
    <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h1>挂号订单</h1>
          </div>
        </template>
        <el-form :inline="true">
          <el-form-item label="就诊人">
            <el-select placeholder="请选择就诊人" v-model="patientId" @change="genggai">
                <el-option label="请选择全部就诊人" value=""></el-option>
              <el-option :label=item.name v-for="item in UserName" :key="item" :value="item.id"></el-option>
             
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select placeholder="选择订单状态" v-model="orderStatus" @change="genggai">
                <el-option label="请选择订单状态" value=""></el-option>
                <el-option :label="item.comment" v-for="item in UserStatus" :key="item" :value="item.status"></el-option>
               
              </el-select>
          </el-form-item>
        </el-form>
        <el-table border style="margin: 30px 0px;" :data="allOrderArr">
          <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
          <el-table-column label="医院" prop="hosname"></el-table-column>
          <el-table-column label="科室" prop="depname"></el-table-column>
          <el-table-column label="医生" prop="title"></el-table-column>
          <el-table-column label="挂号费" prop="amount"></el-table-column>
          <el-table-column label="就诊人" prop="patientName"></el-table-column>
          <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
          <el-table-column label="查看">
            <template #="{row}">
                 <el-button type="text" @click="goDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="PageSize"
      :page-sizes="[10,20,30,40]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="handler"
      @size-change="hand"
    />
      </el-card>
</div>
 </template>
<script setup lang='ts'>
import { ref,onMounted } from 'vue';
import {reqUserOrderInfo,reqAllUsers,reqOrderStatus} from '@/api/user'
import type {UserOrderInfoResponseData,Records} from '@/api/user/type';
import { useRouter } from 'vue-router';

let $router= useRouter()
onMounted(() => {
    //获取订单
    getOrderInfo()
    getUser()
});
//获取订单方法
const getOrderInfo=async()=>{
   let result:UserOrderInfoResponseData =  await reqUserOrderInfo(pageNo.value,PageSize.value,patientId.value,orderStatus.value)
   if(result.code==200){
    allOrderArr.value=result.data.records
    total.value=result.data.total
   }
}
//获取对应的就诊人和订单状态
const getUser=async()=>{
     let result:any =await reqAllUsers()
     console.log(result)
     if(result.code==200){
        UserName.value=result.data
     }
     let response:any =await reqOrderStatus()
     if(response.code==200){
        UserStatus.value=response.data
     }
}


//第几页
let pageNo =ref<number>(1)
//当前页码展示几条数据
let PageSize=ref<number>(10);
//就诊人id
let patientId=ref<string>('')
//订单状态
let orderStatus=ref<string>('')
//存储全部订单
let allOrderArr=ref<Records>([])
//存储订单个数
let total=ref<number>(0)
//存储所有就诊人名字
let UserName=ref<any>([])
//存储所有订单状态
let UserStatus=ref<any>([])
//详情按钮回调
const goDetail=(row:any)=>{
    $router.push({path:'/user/order',query:{orderId:row.id}})
}
//分页器
const handler = (pager:number)=>{
    pageNo.value=pager;
    getOrderInfo()
}
//下拉菜单
const hand=(pageSize:number)=>{
   PageSize.value=pageSize
   getOrderInfo()
}
//就诊人下拉回调方法
const genggai=()=>{
    //下拉点击之后会改变model值，然后就会改变
    getOrderInfo()
}
</script>
<style scoped lang='scss'>
</style>