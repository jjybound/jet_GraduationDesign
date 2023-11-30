//因为一开始都是any，项目最好要限定类型


//定义首页模块ts数据类型,就是每个数据都有的

/* 先定义每个都必然有的 */
export interface ResponseDate{
    code:number,
    message:string,
    ok:boolean,
}

//代表已有的医院数据ts类型

/* 定义主要用到的东西，是在content里面，所以直接定义content */
export interface Hospital{
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "hostypeString":string,
        "fullAddress": string
      },
      "hoscode":string,
      "hosname": string,
      "hostype": string,
      "provinceCode": string,
      "cityCode": string,
      "districtCode":string,
      "address":string,
       "logoData": string,
        "intro": string
        "route": string,
        "status": number,
        "bookingRule": {
            "cycle": number,
            "releaseTime": string,
            "stopTime": string,
            "quitDay": number,
            "quitTime": string,
            "rule": string[]
          }
}

//存储全部已有医院的数组类型，content里面，所以可以这么写
/* 东西都在content里面，所以写一个type类型存储进 */
export type Content=Hospital[]

//获取已有医院接口返回的数据ts类型

/* 这里是整体的，要全部都写在里面，extent继承父亲里所有的东西 */
export interface HospitalResponseDate extends ResponseDate{
    data:{
        content:Content
        "pageable": {
            "sort": {
              "sorted": boolean,
              "unsorted": boolean,
              "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean,
          },
          "totalPages": number,
          "totalElements": number,
          "last": boolean,
          "first": boolean,
          "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
          },
          "numberOfElements": number,
          "size": number,
          "number": number,
          "empty": boolean
        },
    
}

//代表议员等级或者地区数据ts类型,里面的data
export interface HospitalLevelAndRegion{
    "createTime": string,
    "dictCode":string,
    "hasChildren": boolean,
    "id": number,
    "isDeleted":  number,
    "name": string,
    "param": {},
    "parentId":  number,
    "updateTime": string,
    "value": string
}

export type HospitalLevelAndRegionArr=HospitalLevelAndRegion[];
//获取等级或医院地区接口返回数据类型
export interface HospitalLevelAndRegionResponseDate extends ResponseDate{
    data:HospitalLevelAndRegionArr
}

export interface HostpitalInfo extends ResponseDate{
  data:Content
}

//