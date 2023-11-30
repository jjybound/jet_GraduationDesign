<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt=""> 
        <p>金医通 医院预约挂号平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
          <p class="help">帮助中心</p>
          <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
          <el-dropdown v-else>
            <span class="el-dropdown-link">
              {{userStore.userInfo.name}}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goUser">实名认证</el-dropdown-item>
                <el-dropdown-item @click="order">挂号订单</el-dropdown-item>
                <el-dropdown-item @click="patient">就诊人管理</el-dropdown-item>
                <el-dropdown-item @click="logot">退出登录</el-dropdown-item>
           
              </el-dropdown-menu>
            </template>
          </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user'
import { ArrowDown } from '@element-plus/icons-vue'

let userStore=useUserStore();
let $router=useRouter()

//编程式导航跳到首页
const goHome = () =>{
  $router.push({path:'/home'})
}

const login = ()=>{
    userStore.visiable=true
}
//退出登陆的时候
const logot=()=>{
  //清楚pinpia仓库用户信息
   userStore.logout();
   $router.push({path:'/home'})
}
const goUser=()=>{
  $router.push({path:'/user/certification'})
}
const order=()=>{
  $router.push({path:'/user/order'})
}
const patient=()=>{
  $router.push({path:'/user/patient'})
}
</script>

<style scoped lang="scss">
 .top{
  width:100%;
  height:70px;
  display: flex;
  justify-content: center;
  position: fixed; //固定定位
  z-index: 999; //设置优先最高级
  background-color: #fff;
  .content{
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    
    .left{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width:50px;
        height:50px;
      }
      p{
        font-size: 20px;
        color:skyblue;
        margin-left: 10px;
      }

    }
    .left:hover{
      cursor: pointer;
    }
    .right{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color:#bbb;
      .help{
        margin-right: 20px;
      }
      .help:hover{
        cursor: pointer;
      }
      .login:hover{
        cursor: pointer;
      }
    }
  }
 }
</style>

