export interface ResponseData{
    "code":number,
    "message":string,
    "ok":boolean
}

//提交订单返回ts类型
export interface SubmitOrder extends ResponseData{
    data:number
}

//医院订单详情 
export interface OrderInfo{
    "id": number,
    "createTime": string,
    "updateTime":string,
    "isDeleted": number,
    "param": {
      "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime":string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}
//定义订单接口
export interface OrderInfoResponseData extends ResponseData{
    data:OrderInfo
}

//获取二维码数据类型

export interface PayInfo{
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}
export interface QrCode extends ResponseData{
    data:PayInfo
}

//查询支付是否成功
export interface PayResultResponseData extends ResponseData{
    data:boolean
}

//证件类型数据ts
export interface CertaionType {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}
export type  CertaionArr=CertaionType[];

export interface CertationTypeResponseData extends ResponseData{
    data:CertaionArr
}

//用户认证携带的参数ts类型
export interface UserParams{
    certificatesNo : string ,
certificatesType :  string ,
certificatesUrl :  string ,
name :  string
}

//获取订单ts类型
export interface OrderInfo{
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId":string,
    "title": string,
    "reserveDate":string,
    "reserveTime":number,
    "patientId": number,
    "patientName":string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress":string,
    "amount": number,
    "quitTime": string,
    "orderStatus":number
}
export type Records=OrderInfo[]
//获取订单接口数据ts
export interface UserOrderInfoResponseData extends ResponseData{
    data:{
        "records":Records
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "hitCount":boolean,
        "searchCount": boolean,
        "pages": number,
    }
}

//获取地区
export interface City{
    "id": number,
      "createTime":string,
      "updateTime": string,
      "isDeleted": number,
      "param": {},
      "parentId": number,
      "name": string,
      "value": string,
      "dictCode": null,
      "hasChildren": boolean
}

export type CityArr=City[]

export interface CityResponseData extends ResponseData{
    data:CityArr
}

//新增与修改就诊人
export interface AddOrUpdateUserType{
    "address": string,
    addressSelected:string[],
    "birthdate": string,
    "cardNo": string,
    "certificatesNo": string,
    "certificatesType": string,
    "cityCode": string,
    "contactsCertificatesNo": string,
    "contactsCertificatesType": string,
    "contactsName": string,
    "contactsPhone": string,
    "createTime": string,
    "districtCode": string,
     id?: string,
    "isDeleted": number,
    "isInsure": number,
    "isMarry": number,
    "name": string,
    "param": {},
    "phone": string,
    "provinceCode": string,
    "sex": number,
    "status": string,
    "updateTime":string,
    "userId": number
  }