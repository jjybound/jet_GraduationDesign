import { defineStore } from "pinia";
//pina仓库写法：组合式api，选择式api写法
import { reqHospitalDetail,reqHospitalDeparment } from "@/api/hospital";
//组合式api
import type { HosPitalDetail, HospitalDetailall,DeparmentResponseData } from "@/api/hospital/type";
import type { DetailState } from "./interface";
const useDetailStore = defineStore('Detail',{
    state:():DetailState=>{
        return{
            //定义一个医院详情数据,需要加HosPitalDetail类型，否则查找不到
            hospitalInfo:({} as HosPitalDetail),
            //存储医院科室信息
            deparmentArr:[]
        }
    },
    actions:{//方法
        async getHospital(hoscode:any){
          let result :HospitalDetailall =  await reqHospitalDetail(hoscode)
          if(result.code ==200){
            //存储进state仓库
             this.hospitalInfo=result.data
          }
        },
        async getDeparment(hoscode:any){
            let result :DeparmentResponseData  =  await reqHospitalDeparment(hoscode)
            if(result.code ==200){
              //存储进state仓库
               this.deparmentArr= result.data
            }
          },
    },
    getters:{},
})

export default useDetailStore;