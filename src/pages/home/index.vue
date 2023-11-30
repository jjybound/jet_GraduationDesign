<template>
  <div>
    <!-- 轮播图 -->
    <Carousel />
    <!-- 搜索框 -->
    <SearchVue />
    <!-- 显示医院结构 -->
    <el-row :gutter="20"> <!-- gutter每个列的间距 -->
      <el-col :span="20">
        <HospitalLevel @getLevel="getLevel"/>
        <Region @getRegion="getRegion"/>

        <div class="hospital" v-if="hasHospitalArr.length>0">
          <Card class="card" v-for="(item, index) in hasHospitalArr" :key="index" :HospitalInfo="item" />
        </div>
        <!-- 如果是空的就显示，这个是el组件库的东西 -->
        <el-empty v-else description="没有医院信息"/>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          :background="true" layout="  prev, pager, next, jumper,->,sizes,total," :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
          />
      </el-col>
      <el-col :span="4"><tip/></el-col>
    </el-row>
  </div>
</template>
  
<script setup lang="ts">
//这里错误不用管
//引入首页轮播图

import { onMounted, ref } from 'vue'

//医院数据ts类型限制
import type { Content,HospitalResponseDate } from '@/api/home/type'

import { reqHospital } from '../../api/home'

import Carousel from './carousel/index.vue'

import SearchVue from './Search/index.vue'
//引入医院等级
import HospitalLevel from './HospitalLevel/index.vue'
//地区
import Region from './region/index.vue'
//展示医院卡片
import Card from './card/index.vue'
//引入右侧内容
import tip from './tip/index.vue'
//import NewIndex from './Search/NewIndex.vue'

//分页器页码
let pageNo = ref<number>(1); //设置数字类型1
//一页展示几条数据
let pageSize = ref<number>(10);
//存储已有的医院数据
let hasHospitalArr = ref<Content>([])
//存储医院总个数
let total = ref<number>(0);

//存储医院等级响应数据
let hostype=ref<string>('')
//存储医院地区
let districtCode = ref<string>('')

//子组件自定义事件：获取儿子给父组件传递过来的参数
const getLevel = (level:string)=>{
  hostype.value=level;
  //再次发送请求
  getHospitalInfo()
}

const getRegion = (level:string)=>{
   districtCode.value=level
   //再次发送请求
   getHospitalInfo()
}
//组件挂在完毕
onMounted(() => {
  //获取医院的数据：默认获取第一页，一页10个数据
  getHospitalInfo()
})
//获取已有医院数据
const getHospitalInfo = async () => { //因为是ref类型，所以需要加 .value
  let result: HospitalResponseDate = await reqHospital(pageNo.value, pageSize.value,hostype.value,districtCode.value)
  if (result.code == 200) {
    hasHospitalArr.value = result.data.content
    total.value = result.data.totalElements
  }
}

//分页器页码发生变化回调，现在的回调
const currentChange = () => {
  getHospitalInfo();
}
//第一页也可以改变，当值发生改变时也改变
const sizeChange= ()=>{
  //当前页码归第一页
  pageNo.value= 1;
  getHospitalInfo()
}

</script>
  
<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card {
    width: 48%;
    margin-bottom: 20px;
  }
}
</style>
  