<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{ WorkData.baseMap?.hosname }}</div>
            <div></div>
            <div class="subject">{{ WorkData.baseMap?.bigname }}</div>
            <div class="dot">·</div>
            <div class="hosdeparment">{{ WorkData.baseMap?.depname }}</div>
        </div>

        <div class="center">
            <h1 class="time">{{ WorkData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item"
                    :class="{ active: item.status == -1 || item.availableNumber == -1, cur: item.workDate == workTime.workDate }"
                    v-for="item in WorkData.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="top1">{{ item.workDate }} {{ item.dayofWeek }}</div>
                    <div class="bottom">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-if="item.status == 0">{{ item.availableNumber == -1 ? '号满' : `剩余(${item.availableNumber})` }}
                        </div>
                        <div v-if="item.status == 1">即将有号</div>
                    </div>
                </div>

            </div>
            <el-pagination v-model:current-page="pageNo" @current-change="fetchWorkData" layout="prev, pager, next"
                :total="total" :page-size="6"  />
        </div>
        <div class="Bottom">
            <!-- 展示即将放号 -->
            <div class="will" v-if="workTime.status == 1">
                <span>{{workTime.workDate}} 放号</span>
            </div>
            <!-- 展示医生结构 -->
            <div class="doctor" v-else>
                <div class="moring">
                    <div class="tip">
                        <svg t="1692871877951" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6794" width="20" height="20">
                            <path
                                d="M270.387022 463.499421A226.484357 226.484357 0 1 1 496.871379 689.983778a226.484357 226.484357 0 0 1-226.484357-226.484357z"
                                fill="#FFDA6A" p-id="6795"></path>
                            <path
                                d="M496.12978 823.76825a16.31518 16.31518 0 0 1-8.899189-2.966396L444.959444 790.396292a16.611819 16.611819 0 0 1-3.707996-22.989571 16.760139 16.760139 0 0 1 23.137892-3.856315l33.371958 24.176129 36.190035-22.247972a16.463499 16.463499 0 0 1 16.908458 28.329085l-46.127462 27.735805a16.611819 16.611819 0 0 1-8.602549 2.224797z m193.705678-88.10197a16.463499 16.463499 0 0 1-4.746234-32.482039l41.677868-10.382387 6.674391-40.19467a16.463499 16.463499 0 0 1 32.630359 5.339514l-8.454229 51.318655a16.908459 16.908459 0 0 1-12.310545 13.348784l-52.208574 13.052143zM311.471611 733.738123a12.013905 12.013905 0 0 1-3.263036 0l-51.318656-8.45423a16.463499 16.463499 0 0 1-13.348783-12.310544l-13.052144-52.060255a16.463499 16.463499 0 1 1 31.59212-8.30591l10.382387 41.826188 40.49131 6.526072a16.463499 16.463499 0 0 1-1.483198 32.778679z m187.772885-17.650058a251.253766 251.253766 0 1 1 250.660487-251.253766 251.253766 251.253766 0 0 1-251.105446 251.253766z m0-32.926999a218.326767 218.326767 0 1 0-218.771727-218.326767 218.326767 218.326767 0 0 0 218.326768 218.326767z m-312.954809-156.180765a16.01854 16.01854 0 0 1-14.831981-7.86095l-27.735806-46.275782a16.463499 16.463499 0 0 1 0.741599-18.095017l29.663963-42.271148a16.463499 16.463499 0 0 1 26.697567 19.281576L177.983778 465.279258l22.099652 36.783314a16.463499 16.463499 0 0 1-5.636153 22.544612 14.831981 14.831981 0 0 1-8.15759 2.373117z m625.019699 0a14.831981 14.831981 0 0 1-7.71263-2.373117 16.463499 16.463499 0 0 1-5.636153-22.544612l22.099652-36.783314-23.87949-33.520278a16.16686 16.16686 0 0 1 3.707995-22.841251 16.463499 16.463499 0 0 1 22.989571 3.559675l30.405562 42.271148a16.31518 16.31518 0 0 1 0 18.095017L826.141367 519.119351a16.01854 16.01854 0 0 1-14.831981 7.86095zM338.910776 470.173812a16.463499 16.463499 0 0 1-14.831981-17.501738c3.263036-50.577057 19.429896-90.030127 49.242178-117.469293a185.103129 185.103129 0 0 1 118.655852-43.012746 16.463499 16.463499 0 1 1 1.779838 32.926999c-44.495944 2.373117-76.533024 14.090382-98.780997 34.410197s-35.745075 50.577057-38.563152 95.221321a16.611819 16.611819 0 0 1-17.501738 15.42526zM749.015064 294.414832a16.611819 16.611819 0 0 1-14.831982-13.793743l-7.41599-40.639629-41.677868-10.382387a16.463499 16.463499 0 0 1 8.00927-32.03708l52.208574 13.052144a16.760139 16.760139 0 0 1 12.310545 13.348783l8.454229 51.318656a16.908459 16.908459 0 0 1-13.645423 18.984936z m-504.28737-1.928158a12.310545 12.310545 0 0 1-3.263036 0 16.31518 16.31518 0 0 1-12.013905-20.023175l13.052144-52.208574a16.760139 16.760139 0 0 1 13.348783-12.310545l51.318656-8.30591a16.463499 16.463499 0 1 1 5.191194 32.48204l-40.49131 6.674392-10.382387 41.677867a16.463499 16.463499 0 0 1-16.16686 12.013905z m209.872538-120.287369a16.463499 16.463499 0 0 1-10.234067-29.663963l42.271147-29.663963a16.463499 16.463499 0 0 1 18.095017 0l46.127462 27.735805a16.31518 16.31518 0 0 1 5.636153 22.544612 16.463499 16.463499 0 0 1-22.544611 5.784473l-36.783314-22.247972-32.778679 22.396292a17.056779 17.056779 0 0 1-9.195829 3.114716z"
                                fill="#333333" p-id="6796"></path>
                        </svg>
                        <span>上午号源</span>

                        <div class="doctor_info" v-for="doctor in moringArr" :key="doctor.id">
                            <div class="left">
                                <p class="name">{{ doctor.title }} | {{ doctor.docname }}</p>
                                <p class="bing">{{ doctor.skill }}</p>
                            </div>
                            <div class="right">
                                <div class="money">￥{{ doctor.amount }}</div>
                                <el-button type="primary" @click="guahao(doctor.id)">{{ doctor.availableNumber }}</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="after">
                    <div class="tip">
                        <svg t="1692872229359" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="8383" width="20" height="20">
                            <path
                                d="M181.9648 406.3744h644.5568v160.2048a322.2528 322.2528 0 0 1-322.2528 322.2528 322.2528 322.2528 0 0 1-322.2528-322.2528V406.3744z"
                                fill="#FFF3AE" p-id="8384"></path>
                            <path
                                d="M916.1216 391.1168c-20.48-22.3744-49.9712-22.3744-62.464-22.3744h-76.8V346.112a25.6 25.6 0 0 0-25.6-25.6H106.5472a25.6 25.6 0 0 0-25.6 25.6v160.1536a347.648 347.648 0 0 0 610.5088 227.7888c78.7968-8.96 140.7488-37.9904 184.32-86.528 45.5168-51.2 59.0336-110.5408 62.4128-151.6032 3.8912-50.8416-3.0208-84.1216-22.0672-104.8064z m-487.2704 411.8528a296.96 296.96 0 0 1-296.704-296.96V371.712H725.504v134.5536a296.96 296.96 0 0 1-296.6528 296.704z m458.0864-311.1936c-3.7376 46.08-26.8288 148.1216-153.6 182.4256a345.4976 345.4976 0 0 0 43.3152-167.936V419.84h76.8c13.9264 0 20.8896 1.6384 24.832 5.888s12.5952 18.9952 8.6528 66.048z"
                                fill="#333333" p-id="8385"></path>
                            <path
                                d="M503.1424 710.656a25.6 25.6 0 0 1-5.632-50.5856c114.5856-25.6 122.88-135.2704 122.88-139.9296a25.6 25.6 0 0 1 51.2 2.9184c-2.9184 52.6336-40.6528 159.488-162.9696 186.9824a26.7264 26.7264 0 0 1-5.4784 0.6144zM269.056 314.3168a25.6 25.6 0 0 1-23.04-14.336c-26.1632-53.6064 7.7824-87.04 28.0576-107.1616C282.7776 184.32 291.84 175.2576 293.0688 168.96c2.9696-15.36-21.8112-37.2224-33.536-44.8A25.6 25.6 0 0 1 286.72 80.7936c6.912 4.352 66.56 43.9808 56.32 97.7408-4.2496 22.016-19.6608 37.2736-33.3312 50.7392-22.3232 22.0672-27.0336 29.696-17.9712 48.2304a25.6 25.6 0 0 1-11.776 34.2528 25.9584 25.9584 0 0 1-10.9056 2.56zM419.84 314.3168a25.6 25.6 0 0 1-23.04-14.336c-26.1632-53.6064 7.7824-87.04 28.0064-107.1616 8.9088-8.4992 17.9712-17.5616 19.2-23.8592 2.9696-15.36-21.8112-37.2224-33.536-44.8a25.6 25.6 0 0 1 27.392-43.2128c6.8608 4.352 66.56 43.9808 56.32 97.7408-4.2496 22.016-19.712 37.2736-33.3312 50.7392-22.3232 22.0672-27.0336 29.696-17.9712 48.2304a25.6 25.6 0 0 1-11.776 34.2528 25.9584 25.9584 0 0 1-11.264 2.4064zM570.88 314.3168a25.6 25.6 0 0 1-22.9888-14.336c-26.1632-53.6064 7.7312-87.04 28.0064-107.1616C584.6528 184.32 593.92 175.2576 594.944 168.96c2.9696-15.36-21.8112-37.2224-33.5872-44.8a25.6 25.6 0 0 1 27.4432-43.3664c6.8608 4.352 66.56 43.9808 56.32 97.7408-4.2496 22.016-19.712 37.2736-33.3312 50.7392-22.3744 22.0672-27.0336 29.696-18.0224 48.2304a25.6 25.6 0 0 1-22.9888 36.8128zM742.4 921.9584H135.4752a25.6 25.6 0 0 1 0-51.2H742.4a25.6 25.6 0 1 1 0 51.2z"
                                fill="#333333" p-id="8386"></path>
                        </svg>
                        <span>下午号源</span>
                        <div class="doctor_info" v-for="doctor in afterArr" :key="doctor.id">
                            <div class="left">
                                <p class="name">{{ doctor.title }} | {{ doctor.docname }}</p>
                                <p class="bing">{{ doctor.skill }}</p>
                            </div>
                            <div class="right">
                                <div class="money">￥{{ doctor.amount }}</div>
                                <el-button type="primary" @click="guahao(doctor.id)">{{ doctor.availableNumber }}</el-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref, computed } from 'vue'
import { reqHospitalDoctor, reqHospitalWork } from '@/api/hospital';
import { useRoute,useRouter } from 'vue-router';
import { Doctor, DoctorList, DoctorResponseData, HospitalWorkData } from '@/api/hospital/type';


let $route = useRoute() //因为转过来的时候query已经携带了两个参数，hoscode和depcode，所以直接从query里面拿
let $router=useRouter()
let pageNo = ref<number>(1) //当前页码

let limit = ref<number>(6) //当前展示几条数据

//医院科室数据
let WorkData = ref<any>({})

//存储排版日期，当前数据的第一个
let workTime: any = ref({})
//储存全部数量
let total:any = ref<number>(0)
//存储医生数据
let docArr = ref<DoctorList>([])
onMounted(() => {
    fetchWorkData()

});

//获取挂号数据
const fetchWorkData = async () => {
    let result: HospitalWorkData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (result.code == 200) {
        console.log(result)
        total.value=result.data.total
        console.log(total.value)
        WorkData.value = result.data
        workTime.value = WorkData.value.bookingScheduleList[0]
        getDoctorWorkData()
    }
}
//获取医生排班信息
const getDoctorWorkData = async () => {

    //医院接口
    let result: DoctorResponseData = await reqHospitalDoctor($route.query.hoscode as string, $route.query.depcode as string, workTime.value.workDate)
    console.log(result)
    if (result.code == 200) {
        docArr.value = result.data;
    }
}
//点击天数触发回调
const changeTime = (item: any) => {
    workTime.value = item
    getDoctorWorkData()
}

//计算上午排班
let moringArr = computed(() => {
    return docArr.value.filter((item: Doctor) => {
        return item.workTime == 0;
    })
})

let afterArr = computed(() => {
    return docArr.value.filter((item: Doctor) => {
        return item.workTime == 1;
    })
})

//点击挂号跳转
const guahao = (id:string)=>{
   $router.push({path:'/register_step2',query:{
      docId:id
   }})
}
</script>
<style scoped lang='scss'>
.wrap {
    .top {
        display: flex;
        color: #7f7f7f;

        .hosname {
            margin-right: 10px;
        }

        .subject {
            background-color: skyblue;
        }

        .dot {
            margin: 0px 5px;
        }
    }

    .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0px;

        .time {
            font-weight: 999;
        }

        .item:hover {
            cursor: pointer;
        }

        .container {
            width: 100%;
            display: flex;
            margin: 50px 0px;

            .item {
                flex: 1;
                border: 1px solid skyblue;
                margin: 0px 6px;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: all 1s;
                &.active {
                    border: 1px solid #7f7f7f;
                    color: black;

                    .top1 {
                        background-color: #7f7f7f;
                    }
                    }
                &.cur{
                    transform:scale(1.1);
                }

                .top1 {
                    height: 30px;
                    width: 100%;
                    background-color: #e8f2ff;
                    height: 35px;
                    text-align: center;
                    line-height: 30px;
                }

                .bottom {
                    background-color: white;
                    height: 45px;
                    width: 100%;
                    text-align: center;
                    line-height: 45px;
                }
            }
        }
    }

    .Bottom {
        .will {
            text-align: center;
            font-size: 30px;
            font-weight: 20;
            color: skyblue
        }

        .moring,
        .after {
            .doctor {
                .tip {
                    display: flex;
                    align-items: center;
                }
            }

            .doctor_info {
                display: flex;
                justify-content: space-between;
                margin: 20px 0px;
                border-bottom: 1px solid #ccc;

                .left {
                    .name {
                        font-size: 25px;
                        color: skyblue;

                    }

                    .bing {
                        font-size: 15px;
                        color: #7f7f7f;
                        margin: 15px 0px;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    .money {
                        margin-right: 20px;
                    }
                }

            }
        }

    }
}</style>