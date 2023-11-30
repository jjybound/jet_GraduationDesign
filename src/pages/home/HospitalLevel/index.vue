<template>
<div class="level">
   <h1>医院</h1>
   <div class="content"> 
    <div class="left">等级:</div>
    <ul class="hostpitallevel">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li v-for="level in levelArr" :class="{active:activeFlag==level.value}" :key="level.value" @click="changeLevel(level.value)">{{level.name}}</li>
    </ul>
   </div>
</div>
 </template>
<script setup lang="ts">
import {reqHospitalLevelANDRegion} from '@/api/home'
import { HospitalLevelAndRegionResponseDate, HospitalLevelAndRegionArr } from '@/api/home/type';
import { onMounted,ref } from 'vue';
onMounted(()=>{
  getLevel()
})
//定义一个数组存储医院等级
let levelArr= ref< HospitalLevelAndRegionArr>([])
//控制医院等级高亮响应式数据
let activeFlag= ref<string>('')



const getLevel = async()=>{
    let result:HospitalLevelAndRegionResponseDate  = await reqHospitalLevelANDRegion("HosType")
    if (result.code == 200) {
     levelArr.value = result.data
  }
}
//点击等级按钮回调
//需要先设定一个$emit方法
let $emit = defineEmits(['getLevel'])
const changeLevel = (level:string)=>{

    //高亮响应式数据存储level数值
   activeFlag.value=level
   //调用&emit
   $emit('getLevel',level)
}

</script>
<style scoped lang="scss">

.level{
    color: #7f7f77;
    h1{
  
        font-weight: 900;
        margin-bottom: 10px;
    }
    .content{
        display: flex;
        .left{
            margin-right: 14px;
        }
        .hostpitallevel{
            display: flex;
            li{
                margin-right: 10px;
                &.active{
                    color:skyblue
                }
            }
            li:hover{
                color:skyblue;
                cursor: pointer;//变成小手
            }
            
        }
    }
}
</style>