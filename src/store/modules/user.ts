//定义用户相关仓库
import { reqCode, reqUserLogin } from "@/api/hospital";
import { defineStore } from "pinia";
import type {loginData } from "@/api/hospital/type";
import type { UserLoginResponseData } from "@/api/hospital/type";
import type { UserState } from "./interface";
import { GET_TOKEN,SET_TOKEN,REMOVE_TOKEN,GET_YANZHENG,SET_YANZHENG, REMOVE_YANZHENG } from "@/utils/user";
import { reqUserInfo } from '@/api/user';
import { ElMessageBox } from "element-plus";
const useUserStore=defineStore('User',{
    state:():UserState=> {
        return{
            visiable:false, //控制组件显示隐藏
            code:'',
            yanzheng:JSON.parse(GET_YANZHENG() as string) || "0",
            //这里要直接进行判断，如果有本地存储，直接从本地存储拿,如果没有则为空
            userInfo:JSON.parse(GET_TOKEN() as string) || {}
        }
    },
    actions:{
       async getCode(phone:string){
        //正常开发只需要发一个请求，后台就会把验证码推送过去，目前服务器不支持,控制台打印
           let result:any = await reqCode(phone)
           if(result.code==200){
            return true
           //本地存储
           
           }else{
              return Promise.reject(new Error(result.message))
           }
        },
        //用户手机号登录
        async userLogin(loginData:loginData){
          let result:UserLoginResponseData = await reqUserLogin(loginData)
          if(result.code==200){
           this.userInfo=result.data
           SET_TOKEN(JSON.stringify(this.userInfo))
            }else{
               return Promise.reject(new Error(result.message))
            }
         },
         //验证状态判断
         async getYasnzheng(){
            let result:any = await reqUserInfo()
            if (result.code == 200) {
               this.yanzheng=result.data.authStatus
               
         SET_YANZHENG(result.data.authStatus)
           }
         },
        //退出登陆的方法
        logout(){
         this.userInfo={name:'',token:''};
         REMOVE_TOKEN();
         REMOVE_YANZHENG();
        },
        queryState(){
            let timer = setInterval(()=>{
               //本地存储已经放入之后，则执行
               if(GET_TOKEN()){
                    this.visiable=false
                    this.userInfo=JSON.parse(GET_TOKEN() as string)
                    clearInterval(timer)
               }
            },1000)
        }
    },
    getters:{},
})

export default useUserStore;