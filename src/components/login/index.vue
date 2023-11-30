<template>
    <div class="login_container">
        <!-- title是对话框左上角的标题 v-model控制对话显示隐藏 -->
        <el-dialog v-model="userStore.visiable" title="用户登录" @close="close">
            <el-row>
                <!-- 左侧登录 -->
                <el-col :span="12">
                    <div v-show="scene">
                        <div class="logint">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                 
                                    <el-input v-model="loginParam.phone" placeholder="请输入手机号码" :prefix-icon="User"
                                        :suffix-icon="isPhone ? CircleCheck : CircleClose"></el-input>
                                
                              
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input v-model="loginParam.code" placeholder="请输入验证码" :prefix-icon="Lock"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone || flag" @click="getCode">

                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                        <span v-else>获取验证码</span>
                                    </el-button>
                                </el-form-item>
                                <div class="bottom">
                                    <el-button style="width: 100%;" type="primary"
                                        :disabled="!isPhone || loginParam.code.length < 6" @click="login">用户登录</el-button>

                                    <div class="vx" @click="Zhuan">
                                        <p>微信扫码登录</p>
                                        <svg t="1692510848342" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="4077" width="25" height="25">
                                            <path
                                                d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                                fill="#28C445" p-id="4078"></path>
                                            <path
                                                d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                                fill="#28C445" p-id="4079"></path>
                                        </svg>

                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>

                    <div v-show="!scene" class="Wxlogint">
                        <!-- 二维码容器 -->
                      <div  id="login_container"></div>
                      <div class="loginphone" @click="scene=!scene">
                        <span>手机短信验证码登录</span>
                        <svg t="1692766976333" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5192" width="28" height="28"><path d="M478.589065 294.377425h252.839506v397.319224h-361.199294z" fill="#C0EAFF" p-id="5193"></path><path d="M695.308642 843.400353h-75.851852c-10.835979 0-18.059965-7.223986-18.059965-18.059965s7.223986-18.059965 18.059965-18.059965h75.851852c7.223986 0 12.641975-5.417989 12.641975-12.641975V222.137566c0-7.223986-5.417989-12.641975-12.641975-12.641975H323.273369c-7.223986 0-12.641975 5.417989-12.641976 12.641975V794.638448c0 7.223986 5.417989 12.641975 12.641976 12.641975h229.361552c10.835979 0 18.059965 7.223986 18.059964 18.059965s-7.223986 18.059965-18.059964 18.059965H323.273369c-27.089947 0-48.761905-21.671958-48.761905-48.761905V222.137566c0-27.089947 21.671958-48.761905 48.761905-48.761905h370.229277c27.089947 0 48.761905 21.671958 48.761904 48.761905V794.638448c0 27.089947-21.671958 48.761905-46.955908 48.761905z" fill="#1F87DD" p-id="5194"></path><path d="M724.204586 316.049383H294.377425c-10.835979 0-18.059965-7.223986-18.059965-18.059965s7.223986-18.059965 18.059965-18.059965h429.827161c10.835979 0 18.059965 7.223986 18.059964 18.059965s-9.029982 18.059965-18.059964 18.059965zM715.174603 707.950617H294.377425c-10.835979 0-18.059965-7.223986-18.059965-18.059964s7.223986-18.059965 18.059965-18.059965h420.797178c10.835979 0 18.059965 7.223986 18.059965 18.059965s-9.029982 18.059965-18.059965 18.059964z" fill="#1F87DD" p-id="5195"></path><path d="M547.216931 263.675485H469.559083c-10.835979 0-18.059965-7.223986-18.059965-18.059965s7.223986-18.059965 18.059965-18.059964h77.657848c10.835979 0 18.059965 7.223986 18.059965 18.059964s-7.223986 18.059965-18.059965 18.059965z" fill="#1F87DD" p-id="5196"></path></svg>
                      </div>
                    </div>

                </el-col>
                <!-- 右侧结构 -->
                <el-col :span="12">
                    <div class="left">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png">
                                <svg t="1692510848342" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4077" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#707070" p-id="4078"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#707070" p-id="4079"></path>
                                </svg>
                                <p>微信扫一扫关注我</p>
                                <p>无关风月,我题序等你回</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png">
                                <svg t="1692510848342" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4077" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#707070" p-id="4078"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#707070" p-id="4079"></path>
                                </svg>
                                <p>微信扫一扫关注我</p>
                                <p>情字何解，怎落笔都不对</p>
                            </div>
                        </div>
                        <div class="text">
                            <p>金医通，快速挂号</p>
                            <p>神乎奇迹的选择，我行你也行</p>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <template #footer>
                <el-button type="primary" size="default" @click="closeDiglog">关闭窗口</el-button>
            </template>
        </el-dialog>

    </div>
</template>
<script setup lang='ts'>

import useUserStore from '@/store/modules/user'
import { User, Lock, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { ref, reactive, computed,watch } from 'vue';
//引入倒计数组件
import CountDown from '../countdown/index.vue'
//引入微信的参数
import { reqWxLogin } from '@/api/hospital';
import type { WXloginResponseData } from '@/api/hospital/type';
import { ElMessage,ElMessageBox } from 'element-plus';
import { useRoute,useRouter } from 'vue-router';
let $route=useRoute();
let $router=useRouter();
let userStore = useUserStore();
//获取仓库数据，以控制隐藏或打开


//获取form组件实例
let form = ref<any>()
//收集手机号码
let loginParam = reactive({
    phone: '',
    code: ''

})
let scene = ref<boolean>(true)
//控制倒计数
let flag = ref<boolean>(false);//true开启倒计时
//使用计算属性计算当前表收集是否是手机号码格式
let isPhone = computed(() => {
    //手机号码正则
    const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    return reg.test(loginParam.phone)
})

//引入vx扫码登录参数


const Zhuan = async() => {
    scene.value = false;
    //生成二维码登陆页面
    //向硅谷服务器发请求，并且获取微信扫码登录页面参数,还需要携带学校服务器成功授权以后重定向项目某一个页面
    let redirect_uri = encodeURIComponent(window.location.origin+'/wxlogin')
    console.log('起始地址'+redirect_uri)
    let result:WXloginResponseData = await reqWxLogin();
    console.log(result.data.redirect_uri);
    //@ts-ignore
    var obj = new WxLogin({
 self_redirect:true,//手机确定登陆后可以在ifame内跳转到redirect_uri
 id:"login_container", //显示二维码的容器
 appid: result.data.appid, //应用唯一标识
 scope: "snsapi_login",//应用域 ，当前微信扫码登录已经授权
 redirect_uri: result.data.redirect_uri,//填写授权回调域路径，就是用户成功授权，微信服务器向后台推送code
  state: result.data.state,//state就是学校服务器重定向地址，携带用户信息
 style: "black",//二维码外观,有white何black
 href: ""//可以连接css样式
 });

}

//获取验证码
const getCode =async () => {
    
    //通知pinia仓库存储验证码
    //发送验证码
    userStore.getCode(loginParam.phone)
    /* .then((value) => {
        loginParam.code = value
    }) */
    //开启倒计时
    flag.value = true
}
//计数器子组件绑定自定义事件
const getFlag = (Flag: boolean) => {
    flag.value = Flag
}

//用户登录
const login = async () => {
    //表单校验，通过了就发请求,保证表单校验两个都符合标准
    await form.value.validate();
    //发起登录请求，调用仓库方法，并且需要展示用户名字，对话框关闭
    //登陆失败要弹出对应失败的错误信息
   try{
    //用户登录成功 
    await userStore.userLogin(loginParam);
    console.log(loginParam);
    userStore.visiable=false;
    userStore.getYasnzheng().then(()=>{
        let yanzhengValue = Number(userStore.yanzheng)
               if(yanzhengValue!=2){
                  ElMessageBox.alert('您还没实名认证', '提示', {
                     confirmButtonText: '前往认证',
                   }).then(()=>{
                    $router.push({path:'/user/certification'})
                   })
               }else{
                    if($route.query.redirect){
                $router.push($route.query.redirect as string)
               }else{
                    $router.push({path:'/home'})
               }
               }
    });

    
   }
   catch(error){
    ElMessage({
        type:'error',
    message:(error as Error).message})
    
   }
}

//自定义表单校验规则
//@ts-ignore
const validatorPhone = (rule:any,value:any,callBack:any)=>{
   //rule:即为表单校验规则对象.value为当前文本内容,callBack表示回调函数
   const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
   if (reg.test(value)){
    callBack();//是的话就放行
   }else{
    callBack(new Error('请输入正确的手机格式'))
   }
}
//@ts-ignore
const validatorCode = (rule:any,value:any,callBack:any)=>{
    if(/^\d{6}$/.test(value)){
        callBack()
    }else{
        callBack(new Error('请输入正确的验证码格式'))
    }
}
//表单校验规则
const rules =  reactive({
    //required代表当前字段进行校验，message表示错误提示信息,trigger:代表表单校验触发时机，文本发生变化的时候进行校验
    //blur失去焦点,change发生变化
    //min代表最小位数，max代表最大位数，这种只能约束相应长度
   /*  phone:[
        {required:true,message:'您输入的不是11位手机号',trigger:'change'},
        {min:11,max:11,message:'您输入的不是11位手机号',trigger:'change'}
    ],
    
    code:[{required:true,min:6,max:6,message:'请输入6位验证码',trigger:'blur'}] */

    phone:[{trigger:'change',validator:validatorPhone}],
    code:[{trigger:'change',validator:validatorCode}]
})


/* 这里也可以直接在app组件里面设置，销毁整个login组件 */

//对话框关闭事件
const close = ()=>{
    /* loginParam.code=''
    loginParam.phone='' */
    //清空收集数据
    Object.assign(loginParam,{phone:'',code:''})
    //清除上一次校验
    form.value.resetFields();
}

//关闭窗口
const closeDiglog=()=>{
    userStore.visiable=false
    Object.assign(loginParam,{phone:'',code:''})
    //清除上一次校验
    form.value.resetFields();
}

//监听场景数据
watch(()=>scene.value,(val:boolean)=>{
    if(!val){
        userStore.queryState();
    }
})
</script>



<style scoped lang='scss'>
.login_container {
    :deep(.el-dialog__body) {
        border-top: 2px solid skyblue;
        border-bottom: 2px solid skyblue;
    }

    .logint {
        border: 2px solid skyblue;
        padding: 20px;
        .loginphone{
           display: flex;
           justify-content: center;
           align-items: center;
        }
       
    }

    .Wxlogint {
        border: 2px solid skyblue;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .loginphone{
           display: flex;
           justify-content: center;
           align-items: center;
           color:#7f7f7f;
        }
        .loginphone:hover{
            cursor: pointer;
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }

        .vx {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .vx:hover {
            cursor: pointer;
        }
    }

    .left {
        margin-left: 20px;

        .top {
            display: flex;
            justify-content: space-between;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }

        .text {
            margin-top: 10px;
            text-align: center;
            line-height: 35px;
            font-size: 20px;
        }
    }
}</style>