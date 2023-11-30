//引入二次分装

import request from "@/utils/request";
import { CertationTypeResponseData, CityResponseData, OrderInfoResponseData, PayResultResponseData, QrCode, SubmitOrder, UserOrderInfoResponseData, UserParams,AddOrUpdateUserType } from "./type";
enum API{
    api='/api/user',
    //**提交订单，获取订单号码接口
    SUBMITORDER_URL='/api/order/orderInfo/auth/submitOrder/',
    //**获取订单详情
    GETORDERINFO_URL='/api/order/orderInfo/auth/getOrders/',
    //**取消订单接口
    ORDERCANCEL_URL='/api/order/orderInfo/auth/cancelOrder/',
    //**支付二维码
    QRCODE_URL='/api/order/weixin/createNative/',
    //**查询支付结果
    PAYRESULT_URL='/api/order/weixin/queryPayStatus/',

    //** 获取当前用户是否有实名,已经相应信息
    USERINFO_URL=`${api}/auth/getUserInfo`,
    //** 获取证件类型
    CERTIFICATIONTYPE_URL='/admin/cmn/dict/findByDictCode/',
    
    //** 发送请求，把用户认证的数据放入后端
    USERCERTIFICATION_URL=`${api}/auth/userAuth`,

    //**用户的全部订单
    USERORDERINFO_URL='/api/order/orderInfo/auth/',
    //**获取用户下的全部就诊人信息
    ALLUSER_URL=`${api}/patient/auth/findAll`,
    //**获取用户下的所有订单状态
    ORDERSTATUS_URL='/api/order/orderInfo/auth/getStatusList',
    //**获取地区域名
    CITY_URL='/admin/cmn/dict/findChildData/',

    //**新增用户
    ADDUSER_URL=`${api}/patient/auth/save`,
    //**更细已有用户
    UPDATEUSER_URL=`${api}/patient/auth/update`,
    //**删除用户
    DELETEUSER_URL=`${api}/patient/auth/remove/`
}
export const reqSubmitOrder=(hoscode:string,scheduleId:string,patientId:number)=>request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
//export const reqSubmitOrder=(scheduleId:string,patientId:number)=>request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${scheduleId}/${patientId}`)
//获取订单详情
export const reqgetOrderInfo=(id:string)=>request.get<any,OrderInfoResponseData>(API.GETORDERINFO_URL+id)

//取消订单
export const reqOrderCancal=(orderId:string)=>request.get<any,any>(API.ORDERCANCEL_URL+orderId)

//二维码
export const reqQrcode=(orderId:string)=>request.get<any,QrCode>(API.QRCODE_URL+orderId)

//查询支付
export const reqPayState=(orderId:string)=>request.get<any,PayResultResponseData>(API.PAYRESULT_URL+orderId)

//获取当前用户是否有实名,已经相应信息
export const reqUserInfo= ()=>request.get<any,any>(API.USERINFO_URL)

//获取证件类型
export const reqCertaionType =(CertificatesType='CertificatesType')=>request.get<any,CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL+CertificatesType)

//用户认证
export const reqUserCertation=(data:UserParams)=>request.post<any,any>(API.USERCERTIFICATION_URL,data)

//获取订单
export const reqUserOrderInfo =(page:number,limit:number,patientId:string,orderStatus:string)=>request.get<any,UserOrderInfoResponseData>(API.USERORDERINFO_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

//获取账号下所有就诊人
export const reqAllUsers=()=>request.get<any,any>(API.ALLUSER_URL)

//获取用户下的所有订单状态
export const reqOrderStatus=()=>request.get<any,any>(API.ORDERSTATUS_URL)

//获取城市信息
export const reqCity=(parentId:string)=>request.get<any,CityResponseData>(API.CITY_URL+parentId)

//新增用户和已有修改
export const reqAddOrUpdateUser=(data:AddOrUpdateUserType)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data)
    }else{
        return request.post<any,any>(API.ADDUSER_URL,data)
    }
}

//删除用户
export const reqDeleteUser=(id:number)=>request.delete<any,any>(API.DELETEUSER_URL+id)