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
            <svg t="1692415298047" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4024" width="16" height="16"><path d="M821.653333 633.813333L576.533333 917.333333a85.333333 85.333333 0 0 1-129.066666 0.064L198.634667 629.952c-1.152-1.322667-2.133333-2.773333-2.88-4.266667A361.088 361.088 0 0 1 149.333333 448c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667c0 63.744-16.490667 125.162667-47.381334 179.370667a21.269333 21.269333 0 0 1-5.632 6.421333zM792.32 602.453333A318.442667 318.442667 0 0 0 832 448c0-176.725333-143.274667-320-320-320-176.725333 0-320 143.274667-320 320 0 55.317333 14.037333 108.522667 40.384 155.733333l247.317333 285.738667a42.666667 42.666667 0 0 0 64.554667-0.021333L792.32 602.453333zM512 597.333333a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z m0-42.666666a106.666667 106.666667 0 1 0 0-213.333334 106.666667 106.666667 0 0 0 0 213.333334z" fill="#222222" p-id="4025"></path></svg>
            <span>具体地址: {{hospitalStore.hospitalInfo.hospital?.param.fullAddress}}</span>
          
            <p>交通方式: {{hospitalStore.hospitalInfo.hospital?.route}}。更多请看医院官方详情</p>
            <h3>{{hospitalStore.hospitalInfo.hospital?.hosname}}简介</h3>
            <p class="intro">{{hospitalStore.hospitalInfo.hospital?.intro}}</p>
        </div>
     </div>
    <!-- 放置医院每一个科室数据 -->
    </div>
     </template>
    <script setup lang='ts'>
    import useDetailStore from '@/store/modules/hospitalDetail'
    //定义接收仓库信息
    let hospitalStore=useDetailStore();
    console.log(hospitalStore.hospitalInfo.bookingRule?.rule)
    </script>
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
            .intro{
                line-height: 25px;
                text-indent: 2em;
            }
        }
       }
       
    }
    </style>