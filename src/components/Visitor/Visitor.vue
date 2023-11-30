<template>
<div class="visitor">
    <div class="top">
        <div class="left">
            <span class="free">{{user.isInsure==1? '医保':'自费'}}</span>
            <span class="name">{{user.name}}</span>
        </div>
        <div class="right">
            <el-button type="primary" :icon="Edit" @click="handler"></el-button>
            <el-popconfirm :title="` 你确定要删除 ${user.name} 吗`" width="300" @confirm="removeUser"> 
                <template #reference>
                    <el-button v-if="$route.path=='/user/patient'" type="danger" :icon="Delete"></el-button>
                </template>
              </el-popconfirm>
          
        </div>
    </div>

    <div class="bottom">
        <p>证件类型：{{user.certificatesType ==="10"? '身份证':'户口本'}}</p>
        <p>证件号码：{{user.certificatesNo}}</p>
        <p>用户性别：{{user.sex==0?'女士':'男士'}}</p>
        <p>出生日期：{{user.birthdate}}</p>
        <p>手机号码：{{user.phone}}</p>
        <p>婚姻状况：{{user.isMarry==0?'未婚':'已婚'}}</p>
        <p>当前地址：{{user.cityCode+user.districtCode}}</p>
        <p>详细地址：{{user.address}}</p>
        <!-- 已选择的盒子 -->
        <transition name="confirm">
        <div class="confirm" v-if="index==currentIndex">已选择</div>
    </transition>
    </div>
</div>
 </template>
<script setup lang='ts'>
import { reqDeleteUser } from '@/api/user';
import { Edit,Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {useRoute,useRouter} from 'vue-router';
let $route=useRoute();
let $router=useRouter();
//接收父组件
let props = defineProps(['user','index','currentIndex']);
let $emit = defineEmits(['changeScene','removeUser'])

//点击修改按钮回调
const handler = ()=>{
    //要么是就诊人管理进入的，要么是挂号进入的
    if($route.path=='/user/patient'){
        $emit('changeScene',props.user)
    }else{
        $router.push({path:'/user/patient',query:{type:'edit',id:props.user.id}})
    }
   
}

//删除回调
const removeUser = async()=>{
    try {
        await reqDeleteUser(props.user.id)
        ElMessage(({
            type:'success',
            message:'删除成功'
        }))
        $emit('removeUser')
    } catch (error) {
        
    }

}
</script>
<style scoped lang='scss'>
.visitor{
    box-shadow:0px 0px 12px rgba(0, 0, 0, 0.12) ;
    .top{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60px;
        background-color: #e5e5e5;
        .left{
            .free{
                background-color: white;
                padding: 3px;
                margin-right: 5px;
                border-radius: 10px;
            }
            .name{
                color: #7f7f7f;
                font-size: 18px;
            }
        }
    }
    .bottom{
        position: relative;
        padding: 20px;
        p{
            line-height: 40px;
        }
        .confirm{
            position: absolute;
            width: 200px;
            height: 200px;
            color:red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 200px;
            left: 20%;
            top:20%;
            opacity: 0.5;
            transform: rotate(45deg);
            font-weight: 900;
        }
        .confirm-enter-from{
            transform:scale(1);
            
        }
        .confirm-enter-active{
          transition: all 0.5s;
        }
        .confirm-enter-to{
             transform: scale(1.2);
        }
    }
}
</style>