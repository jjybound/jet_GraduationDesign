<template>
  <div class="container">
    <!-- 顶部 -->
    <HospitalTop></HospitalTop>
    
    <!-- 路由组件区域 -->
    <div class="content">
      <!-- 展示路由组件区域 -->
      <router-view></router-view>
      
    </div>
    <div class="gpt">
    <Gpt></Gpt>
  </div>
    <!-- 底部 -->
    <HospitalBottom></HospitalBottom>
    <!-- 登录组件 -->
    <Login v-if="userStore.visiable" />

</div>


</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
 
}
.content {
  margin-top: 80px; //被顶部导航遮住了，所以字出不来，需要加这个
  width: 1200px;
  min-height: 1000px;
}

</style>
