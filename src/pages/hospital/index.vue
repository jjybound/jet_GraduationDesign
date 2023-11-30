<template>
    <div>
        <div class="hostpital">
            <!-- 左侧导航 -->
            <div class="menu">
                <div class="top">
                    <svg t="1692256424558" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4019" width="18" height="18"><path d="M851.2 441.6l-320-268.8C524.8 172.8 518.4 172.8 512 172.8s-12.8 0-19.2 6.4l-320 268.8C166.4 448 160 460.8 160 467.2L160 832c0 19.2 12.8 32 32 32l640 0c19.2 0 32-12.8 32-32L864 467.2C864 460.8 857.6 448 851.2 441.6zM806.4 806.4 601.6 806.4l0-147.2c0-51.2-38.4-89.6-89.6-89.6s-89.6 38.4-89.6 89.6l0 147.2L217.6 806.4 217.6 480 512 236.8l294.4 243.2L806.4 806.4z" fill="#272636" p-id="4020"></path></svg>
                    <p>  / 医院信息</p>
                </div>
                <!-- 默认第一个高亮 -->
                <el-menu :default-active='$route.path' class="el-menu-vertical-demo">
                 
                    <el-menu-item index="/hospital/register" @click="changeActivce('/hospital/register')">
                        <el-icon><icon-menu /></el-icon>
                        <span>预约挂号</span>
                    </el-menu-item>
                    <el-menu-item index="/hospital/detail" @click="changeActivce('/hospital/detail')">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>医院详情</span>
                    </el-menu-item>
                    <el-menu-item index="/hospital/notice" @click="changeActivce('/hospital/notice')">
                        <el-icon><Message /></el-icon>
                        <span>预约通知</span>
                    </el-menu-item>
                    <el-menu-item index="/hospital/close" @click="changeActivce('/hospital/close')">
                        <el-icon>
                            <InfoFilled/>
                        </el-icon>
                        <span>停诊信息</span>
                    </el-menu-item>
                    <el-menu-item index="/hospital/search" @click="changeActivce('/hospital/search')">
                        <el-icon>
                            <Search/>
                        </el-icon>
                        <span>查询/取消</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <!-- 右侧路由展示 -->
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//useRouter实现跳转，useRoute获取信息
import { useRouter,useRoute } from 'vue-router';

//左侧菜单引入图标
import {
    Document,
    Menu as IconMenu,
    InfoFilled,
    Message,
    Search
} from '@element-plus/icons-vue'
import {onMounted} from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail'
let $router=useRouter()
//获取当前路由信息
let $route=useRoute()
//当前路由地址
//console.log($route.path)

const changeActivce = (path:string)=>{
    $router.push({path:path,query:{hoscode:$route.query.hoscode}})
}

//获取仓库对象
let detailStore=useDetailStore()
//组件挂在完毕之后，会将数据放入仓库，并通知其他组件接收
onMounted(()=>{
  detailStore.getHospital($route.query.hoscode)
  //获取医院科室的详细数据
  detailStore.getDeparment($route.query.hoscode)
  
});
</script>
<style scoped lang="scss">
.hostpital {
    display: flex;
    justify-content: space-between;
    margin-top: 10%;
    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;//垂直排序
        align-items: center;
     
         .top{
            color:#7f7f7f;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
         }
    }

    .content {
        flex: 8
    }
}</style>