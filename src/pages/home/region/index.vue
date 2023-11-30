<template>
    <div class="region">
        <div class="content"> 
         <div class="left">地区:</div>
         <ul>
             <li :class="{active:RegionFlag==''}" @click="changeRegion('')">全部</li>
         
             <li v-for="item in RegionArr" :class="{active:RegionFlag==item.value}" @click="changeRegion(item.value)" :key="item.value">{{item.name}}</li>
         </ul>
        </div>
        </div>
 </template>
<script setup lang="ts">
import {reqHospitalLevelANDRegion} from '@/api/home'
import { HospitalLevelAndRegionResponseDate, HospitalLevelAndRegionArr } from '@/api/home/type';
import { onMounted,ref } from 'vue';

//存储地区设置
let RegionArr= ref<HospitalLevelAndRegionArr>([])
//高亮显示
let RegionFlag= ref<string>('')
onMounted(()=>{
  getRegion()
})
const getRegion = async ()=>{
  let result : HospitalLevelAndRegionResponseDate = await  reqHospitalLevelANDRegion('zhejiang')
  if (result.code ==200){
    RegionArr.value=result.data
  }
}

//子给父用emit
let Regionvalue=defineEmits(['getRegion'])

const changeRegion =(value:string)=>{
    RegionFlag.value=value
   Regionvalue('getRegion',value)
}
</script>
<style setup lang="scss">
.region{
    color:#7f7f7f;
    margin-top:10px;

    .content{
        display:flex;
        .left{
            margin-right:10px;
            width:55px
        }
        ul{
            display:flex;
            flex-wrap:wrap; //这样会换行

            li{
                margin-right:10px;
                margin-bottom:10px;
                &.active{ //加&是因为active写在了li里面，父级元素指向，需要&
                color:skyblue
                }
            }
        }
      
        li:hover{
            color:skyblue;
            cursor:pointer
        }
    }
}

</style>