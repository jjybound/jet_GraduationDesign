import axios from "axios";
import request from "@/utils/request";

const requestST= axios.create({
    baseURL:'/gpt',
})



const grant_type:String = "client_credentials"
const client_id:String= "Gl76AFTZCvDPDRO9G5qbMwGw"
const client_secret:string= "9PRcyw2W0Brpmv8s0LVOlIPUrYQ8DN1B"

enum API {
    url ='/api/gpt',
    //**获取热门的三个标题
    GPTTHREE_URL = `${url}/count`,
    //**记录
    UPDATEGPT_URL = `${url}/value/`,
}
//请求accessiontoken
export const getSt = ()=>requestST.get<any,any>(`/oauth/2.0/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`)

//请求gpt
export const getGpt = (access_token:String,data:any)=>requestST.post<any,any>(`/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${access_token}`,data)

  //**获取热门的三个标题
export const getThree = ()=>request.get<any,any>(API.GPTTHREE_URL)

  //**记录
export const updateGpt = (content:String)=>request.post<any,any>(API.UPDATEGPT_URL+content)


