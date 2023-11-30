//统一管理模块接口

import request from "@/utils/request";
//引入返回的ts全部类型，约束类型,
import type { HospitalResponseDate, HospitalLevelAndRegionResponseDate,HostpitalInfo } from "./type";
//通过枚举管理首页模块的接口

enum API {
    url ='/api/hosp',
    //**获取现在已有的医院数据接口
    HOSPITAL_RUL = `${url}/hospital/findHospList/`,
    //**医院等级与地区接口
    HOSPITALLEVELANDREGION_URL = '/admin/cmn/dict/findByDictCode/',
    //**搜索关键字
    HOSPITALINFO_URL= '/api/hosp/hospital/findByHosName/'
}
//因为上面的HoSpital_url是需要两个参数的，一个是page当前页码，limit每页记录数
/* 如果约束类型了，记得加any */  
/* 因为hostype和distictCode是后面因为选择医院等级和地区需要的，所以是如果有就加上，没有就默认不加 */
export const reqHospital = (page: number, limit: number,hostype='',districtCode='') => request.get<any, HospitalResponseDate>(API.HOSPITAL_RUL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
//获取医院等级与地区接口数据
export const reqHospitalLevelANDRegion = (dictCode: string) => request.get<any, HospitalLevelAndRegionResponseDate>(API.HOSPITALLEVELANDREGION_URL + dictCode);
//根据关键字获取医院数据
export const reqHospitalInfo = (hosname:string)=>request.get<any,HostpitalInfo>(API.HOSPITALINFO_URL+hosname)

