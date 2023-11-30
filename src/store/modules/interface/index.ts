import type { HosPitalDetail,DeparmentArr,UserInfo } from "@/api/hospital/type";

export interface DetailState{
    hospitalInfo:HosPitalDetail,
    deparmentArr:DeparmentArr
}

//用户相关的ts数据类型
export interface UserState{
    visiable:boolean,
    code:string,
    userInfo:UserInfo,
    yanzheng:string,
}