//本地存储文件

export const SET_TOKEN=(userInfo:string)=>{
    localStorage.setItem('USERINFO',userInfo)
}

export const GET_TOKEN=()=>{
    return localStorage.getItem('USERINFO')
}


export const REMOVE_TOKEN=()=>{
    localStorage.removeItem('USERINFO')
}

export const REMOVE_YANZHENG=()=>{
    localStorage.removeItem('YANZHENG')
}
export const SET_YANZHENG=(yanzheng:string)=>{
    localStorage.setItem('YANZHENG',yanzheng)
}

export const GET_YANZHENG=()=>{
    return localStorage.getItem('YANZHENG')
}