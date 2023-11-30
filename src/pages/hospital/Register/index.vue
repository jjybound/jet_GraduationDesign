<template>
<div class="register">
   <div class="top">

    <!-- 加 ? 是因为在模板中，会先渲染页面，但是目前仓库是空的，所以查询到没有，就会产生报错，加了?就是有了之后再展示，这样就可以正常展示了 -->
     <div class="title">{{hospitalStore.hospitalInfo.hospital?.hosname}}</div>
     <div class="level">
     <svg t="1692409439697" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4304" width="20" height="20"><path d="M284.687309 461.887772H76.587153v404.71577h208.100156V461.887772zM18.770468 932.072495l986.459064-0.036839v61.654075H18.770468v-61.617236z m928.699684-470.184723H739.433441v404.71577c110.370516 0 97.665172-0.074701 208.032618-0.074702l0.004093-404.641068zM323.174801 91.846664v774.755854h377.639142V92.002206l-377.639142-0.155542z m416.237151 0.192381l-0.050142 308.232514h265.867722v61.616213h-19.344542l0.077771 404.641068h19.266771v42.308511l-986.459064 0.078794v-42.312603H38.066914l-0.081864-404.71577H18.770468v-61.616213h265.845209l0.049119-308.232514-19.260631-0.074701V30.310269h493.189623v61.654075l-19.181836 0.074701z" fill="#7FAB29" p-id="4305"></path><path d="M862.653588 712.431515h46.244138V824.179398h-46.244138V712.431515z m-84.758237 0h46.241068V824.179398H777.895351V712.431515z m-578.004141 0h46.240045V824.179398h-46.240045V712.431515z m-84.786889 0h46.236975V824.179398h-46.236975V712.431515z m84.786889-200.49189h46.240045v154.213983h-46.240045V511.939625z m-84.786889 0h46.236975v154.213983h-46.236975V511.939625z m747.549267-0.036839h46.244138v154.212959h-46.244138V511.902786z m-84.758237 0h46.241068v154.212959H777.895351V511.902786zM592.918799 712.431515h53.947572V824.179398h-53.947572V712.431515z m0-200.49189h53.947572v154.17612h-53.947572V511.939625zM377.130559 712.431515h53.947572V824.179398h-53.947572V712.431515z m0-200.49189h53.947572v154.17612h-53.947572V511.939625z m107.89412 200.49189h53.946549V824.179398h-53.946549V712.431515z m0-200.49189h53.946549v154.17612h-53.946549V511.939625zM469.637255 145.794236h84.72242v92.481113h92.506696v88.707167h-92.506696v88.506599h-84.72242v-88.506599h-92.514882v-88.707167h92.514882z" fill="#7FAB29" p-id="4306"></path></svg>
     <span>{{hospitalStore.hospitalInfo.hospital?.param.hostypeString}}</span>
    </div>
    </div>
 <div class="content">
    <div class="left">
        <img :src="hospitalStore.hospitalInfo.hospital?.logoData">
    </div>
    <div class="right">
        <h3>挂号规则</h3>
        <div class="neirong"></div>
        <span>预约周期: {{hospitalStore.hospitalInfo.bookingRule?.cycle}}天</span>
        <p>可预约时间: {{hospitalStore.hospitalInfo.bookingRule?.releaseTime}}——{{hospitalStore.hospitalInfo.bookingRule?.quitTime}}</p>
       
        <p>具体地址: {{hospitalStore.hospitalInfo.hospital?.param.fullAddress}}</p>
      
        <p>交通方式: {{hospitalStore.hospitalInfo.hospital?.route}}。更多请看医院官方详情</p>
        <h3>医院预约规则:</h3>
        <div v-for="(item,index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key='index'>
        <p>{{item}}</p></div>
    </div>
 </div>
<!-- 放置医院每一个科室数据 -->
<div class="deparment">
    <div class="left">
        <ul>
            <li :class="{active:index==currentIndex}" @click="point(index)" v-for="(deparment,index) in hospitalStore.deparmentArr" :key="deparment.depcode">{{deparment.depname}}</li>
        </ul>
    </div>
    <div class="right">
        <!-- 每一个大科室  -->
        <div  class="showDeparment" v-for="(deparment) in hospitalStore.deparmentArr" :key="deparment.depcode">
            <h1 class="cur">{{deparment.depname}}</h1>
            <!-- 在每个大科室里面分布小科室 -->
            <ul>
                <li @click="showLogin(item)" v-for="(item) in deparment.children" :key="item.depcode">{{ item.depname }}</li>
            </ul>
        </div>

    </div>
   </div>
</div>

 </template>
<script setup lang='ts'>
import { ref } from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail'
import { useRouter,useRoute } from 'vue-router';

let $route=useRoute();
let $router=useRouter();
//定义接收仓库信息
let hospitalStore=useDetailStore();

//控制科室高亮响应式数据
let currentIndex = ref<number>(0)

const point = (index:number)=>{
    currentIndex.value=index
    //点击导航获取右侧科室的标题,定位到对应的有.cur
    let allH1=document.querySelectorAll('.cur');
    //一点击就滚动，这是原生方法
    allH1[currentIndex.value].scrollIntoView({
        behavior:'smooth', //原生提供的动画滚动效果
        block:'start' //可定义定位起始位置
    });
}

//控制用户登录
const showLogin =(item:any)=>{
   /*  //这里需要路由鉴权
    userStore.visiable=true */
     $router.push({path:'/register_step1',query:{
        hoscode:$route.query.hoscode,
        depcode:item.depcode
     }})
    //点击应用，进入预约挂号详情页面
}
</script>

<!-- scrollintoview方法调用元素滚动到浏览器窗口可见区域-->
<style scoped lang='scss'>
.register{
    .top{
        display: flex;
        .title{
            font-size: 30px;
            font-weight: 900;
        }
        .level{
            color:#7f7f7f;
            margin-left: 15px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            span{
                margin-left: 5px;
            }
        }
    }
   .content{
    display: flex;
    
    .left{
        flex:1;
        width: 200px;
        height: 200px;
        border-style: solid;
        img{
            margin-top: 50px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
    }
    .right{
        flex: 9;
        h3{
            margin-top: 30px;
            margin-bottom: 20px;
        }
        p{
            color:#7f7f7f;
            margin-top: 10px;
        }
    }
   }
   
   .deparment{
    width:100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .left{
        width:80px;
        height: 100%;
        ul{
            width: 100%;
            height: 100%;
            background: rgb(248, 248, 248);
            display: flex;
            flex-direction: column;
        }
        li{
            flex:1;
            text-align: center;
            color: #7f7f7f;
            font-size: 15px;
            line-height: 40px;
            &.active{
                border-left:2px solid skyblue;
                color:skyblue;
                background-color:azure;
            }
        }
        li:hover{
            cursor: pointer;
        }
    }
    .right{
        flex:1;
        margin-left: 20px;
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        .showDeparment{
            width:100%;
           h1{
            background: rgb(248, 248, 248);
            color:skyblue;
            margin-bottom: 10px;
            margin-top: 10px;
            text-align: center;

           }
           ul{
            display: flex;
            flex-wrap: wrap;
            li{
                color:#7f7f7f;
                width: 33%; 
                line-height: 40px;
            }
            li:hover{
                cursor: pointer;
            }
           }
        }
    }
   }
}
</style>