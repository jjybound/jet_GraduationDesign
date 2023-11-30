<template>
  <div class="search">
    <el-autocomplete clearable placeholder="请输入医院" 
    class="form" v-model="hosname" 
    :fetch-suggestions="fetchData"
    :trigger-on-focus="false"   
    @select="goDetail"
     />

    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>


<script  setup  lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
//引入搜索关键字的数据，第一个是方法，第二个是数据类型限制
import { reqHospitalInfo } from "@/api/home";
import type { HostpitalInfo } from "@/api/home/type";
//引入路由跳转
import { useRouter } from "vue-router";

//创建路由对象
let $router=useRouter()
//收集搜索的关键字
let hosname=ref<string>('');
//:fetch-suggestions当输入东西的时候输入完毕就会回调，自带防抖功能
//trigger-on-focus鼠标放上去的时候触发不触发
//keyword:string,cb:any 官网的kpi
const fetchData = async(keyword:string,cb:any) =>{
  //当用户输入完关键字就会执行一次，发送请求获取需要展示的数据
  let result:HostpitalInfo = await reqHospitalInfo(keyword)
  //整理数据，变成api需要的数据格式，value + name
  let showData= result.data.map(item=>{
    return{
      value:item.hosname, //展示医院的名字
      hoscode:item.hoscode //存储医院编码，跳转的时候需要
    }
  })
  //给组件提供展示的数组
  cb(showData)
  
}
//点击推荐项后路由跳转
const goDetail =(item:any)=>{
    //点击推荐向后进入详情页，将来需要携带query参数，医院编码
    $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}})
}
</script>

<style scoped lang="scss">
//深度选择器，因为这是封装好的组件，所以加class修改样式没有用
// >>> /deep/ ::v-deep
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
   //深度选择用法
  :deep(.form) {
    width: 400px;
    margin-right: 10px;
  }
}

</style>

