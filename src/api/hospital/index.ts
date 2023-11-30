//引入二次封装
import request from '@/utils/request'
import { HospitalDetailall, DeparmentResponseData, loginData, UserLoginResponseData, WXloginResponseData, HospitalWorkData, DoctorResponseData, DoctorInfo } from './type';
enum API {
    url ='/api/hosp',
    //**获取医院信息
    HOSPITALDETAIL_URL = `${url}/hospital/`,
    //**获取医院科室
    HOSPITALDEPARMENT_URL = `${url}/hospital/department/`,
    //**验证码登录接口
    GETUSERCODE_URL = `/api/msm/send/`,
    //**用户登录接口
    USERLOGIN_URL = '/api/user/login',
    //**微信扫码后端接口
    WXLOGIN_URL = '/api/ucenter/wx/getLoginParam',

    //**获取一个医院的排班和有号
    HOSPITALWORK_URL = `${url}/hospital/auth/getBookingScheduleRule/`,
    //**医院医生排班信息
    HOSPITALDOCTOR_URL = `${url}/hospital/auth/findScheduleList/`,
    
    //**获取一个账号下的就诊人信息
    GETUSER_RUL = '/api/user/patient/auth/findAll',
    //**获取挂号医生信息
    GETDOCTOR_URL = `${url}/hospital/getSchedule/`,
    
}

//获取医院详情接口
export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailall>(API.HOSPITALDETAIL_URL + hoscode);

//相应科室接口
export const reqHospitalDeparment = (hoscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);

//获取验证码接口
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)

//用户登录
export const reqUserLogin = (data: loginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)

//微信接口
//export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXloginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`)
export const reqWxLogin = () => request.get<any, WXloginResponseData>(API.WXLOGIN_URL)

//医院排班
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)

//医生信息
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)

//获取一个账号下的就诊人信息
export const reqGetUser = () => request.get<any, any>(API.GETUSER_RUL)

//获取一个医生的信息
export const reqDoctorInfo = (scheduleId: string) => request.get<any, DoctorInfo>(API.GETDOCTOR_URL + scheduleId)



