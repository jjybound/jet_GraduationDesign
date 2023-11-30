//定义详情模块类型ts类型
export interface ResponseDate{
    code:number,
    message:string,
    ok:boolean,
}

//医院详情数据
export interface HosPitalDetail{
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
      },
      "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
          "hostypeString": string,
          "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule": null
      }

    }
//医院详情返回数据ts
export interface HospitalDetailall extends ResponseDate{
    data:HosPitalDetail
}

//医院科室数据
export interface Deparment{
    "depcode": string,
      "depname":string,
      "children"?:Deparment[]
}

//代表存储科室数组类型
export type DeparmentArr = Deparment[];
//获取科室接口返回的数据类型
export interface DeparmentResponseData extends ResponseDate{
  data:DeparmentArr
}

//用户登录接口需要携带参数
export interface loginData{
  phone:string,
  code:string
}
//登录接口返回用户信息数据
export interface UserInfo{
  name:string,
  token:string
}
//登录接口返回ts类型
export interface UserLoginResponseData extends ResponseDate{
  data:UserInfo
}


//定义微信扫码登录
export interface WXlogin{
  "redirect_uri": string,
    "appid": string,
    "scope": string,
    "state": string
}

export interface WXloginResponseData extends ResponseDate{
  data:WXlogin
}

//一个医院排班信息
export interface BaseMap{
  "workDateString": string,
  "releaseTime": string,
  "bigname": string,
  "stopTime": string,
  "depname": string,
  "hosname":string
}
export interface WorkData{
  "workDate":string,
        "workDateMd": string,
        "dayOfWeek": string,
        "docCount": number,
        "reservedNumber": number,
        "availableNumber": number,
        "status": number
}

export type bookingScheduleList=WorkData[]

export interface HospitalWorkData extends ResponseDate{
  data:{
    total:number,
    bookingScheduleList:bookingScheduleList,
    baseMap:BaseMap
    
  }
}

//医生数据
export interface Doctor{
  "id": string,
      "createTime": string,
      "updateTime": string,
      "isDeleted": number,
      "param": {
        "dayOfWeek": string,
        "depname": string,
        "hosname": string
      },
      "hoscode":string,
      "depcode": string,
      "title": string,
      "docname": string,
      "skill":string,
      "workDate": string,
      "workTime": number,
      "reservedNumber": number,
      "availableNumber": number,
      "amount": number,
      "status": number,
      "hosScheduleId": string
}
export type DoctorList=Doctor[]

export interface DoctorResponseData extends ResponseDate{
  data:DoctorList
}

//获取挂号的医生信息
export interface DoctorInfoData{
  "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "dayOfWeek": string,
      "depname": string,
      "hosname": string
    },
    "hoscode": string,
    "depcode": string,
    "title": string,
    "docname": string,
    "skill":string,
    "workDate": string,
    "workTime": number,
    "reservedNumber": number,
    "availableNumber": number,
    "amount":number,
    "status": number,
    "hosScheduleId":string
}

export interface DoctorInfo extends ResponseDate{
  data:DoctorInfoData
}

