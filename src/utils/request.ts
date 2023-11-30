//对于axious函数进行二次封装！！
//为什么要二次封装axios？二次封装目的是什么？
//目的1：利用axious，响应拦截器功能，例如token，http网络错误
//目的2：请求拦截器，一般可以在请求头中携带公共参数：token
//目的3：响应拦截器，可以简化服务器返回的数据，比如说除了data里的东西，其他的不要，处理http网络错误
//目的4：如果该库不维护了，容易替换别的请求库

import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
//利用axios.create方法创建一个axios实例：设置基础路径和超时时间设置
const request= axios.create({
    baseURL:"http://localhost:9527", //因为要请求的地址都带有api，所以才加上
    timeout:5000//超出5秒则失败

})

//请求拦截器
request.interceptors.request.use((config)=>{
    //config：请求拦截器回调注入的对象(配置对象)，配置对象身上最重要的一些事情:headers属性
    //可以通过请求头携带公共参数-token
    let userStore=useUserStore();
    if(userStore.userInfo.token){
        config.headers.token=userStore.userInfo.token
    }
    return config
})//使用拦截器

//响应拦截器
request.interceptors.response.use((response)=>{
    //相应拦截器成功回调,一般进行简化数据
    return response.data;
},(error)=>{
    console.log(error)
    //可以处理http请求错误，例如404，500等
    let status=error.response.status;
    switch(status){
        case 404:
            ElMessage({//element组建的
                type:'error',
                message:error.message
            })
        case 401:
                ElMessage({//element组建的
                    type:'error',
                    message:'参数有误'
                })
        case 403:
                ElMessage({//element组建的
                    type:'error',
                    message:'没有访问权限'
                })    
        case 500|501|502|503|504|505:
            ElMessage({//element组建的
                type:'error',
                message:'服务器挂了'
            })
    }
    return Promise.reject(new Error(error.message))
    
})

//暴露出去
export default request