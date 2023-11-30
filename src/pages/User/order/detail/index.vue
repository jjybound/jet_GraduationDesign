<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="detail">挂号详情</div>
      </template>
      <!-- 内容结构 -->
      <div class="top">
        <el-tag type="success">
          <div class="tag">

            <span class="success">{{ orderInfo.param?.orderStatusString }}</span>
            <svg t="1693030765224" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3970" width="16" height="16">
              <path
                d="M512 0C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z m0 945.230769C271.753846 945.230769 78.769231 752.246154 78.769231 512S271.753846 78.769231 512 78.769231s433.230769 192.984615 433.230769 433.230769-192.984615 433.230769-433.230769 433.230769z"
                fill="#1afa29" p-id="3971"></path>
              <path
                d="M716.8 330.830769l-208.738462 248.123077c-15.753846 15.753846-43.323077 19.692308-59.076923 7.876923L299.323077 472.615385c-15.753846-11.815385-43.323077-7.876923-55.138462 7.876923-11.815385 15.753846-7.876923 43.323077 7.876923 55.138461l149.661539 114.215385c19.692308 15.753846 47.261538 23.630769 74.830769 23.630769 35.446154 0 70.892308-15.753846 94.523077-43.323077l208.738462-248.123077c15.753846-15.753846 11.815385-43.323077-3.938462-55.138461-19.692308-15.753846-43.323077-15.753846-59.076923 3.938461z"
                fill="#1afa29" p-id="3972"></path>
            </svg>
          </div>
        </el-tag>

        <div class="rightMa">
          <img src="../../../../assets/images/code_app.png">
          <p>微信 扫码关注金医通</p>
        </div>
      </div>
      <!-- 订单底部结构 -->
      <div class="bottom">
        <div class="left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊人信息
                </div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊日期
                </div>
              </template>
              {{ orderInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊医院
                </div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊科室
                </div>
              </template>
              {{ orderInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医生职称
                </div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号费用
                </div>
              </template>
              {{ orderInfo.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号单号
                </div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号时间
                </div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <div class="btn" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
            <el-popconfirm title="您确定要取消预约吗" @confirm="cancel">
              <template #reference>
                <el-button type="danger">取消预约</el-button>
              </template>
            </el-popconfirm>

            <el-button type="primary" v-if="orderInfo.orderStatus == 0" @click="open">支付</el-button>
          </div>
        </div>
        <div class="right">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span class="zhuyi">注意事项</span>
              </div>
            </template>
            <p>取号时间:{{ orderInfo.fetchTime }}</p>
            <p>退号时间:{{ orderInfo.quitTime }}</p>
            <p>1:本网站只做学习用途</p>
            <p>2:没有任何商业用途</p>
            <p class="danger">3:是虚假的网站，无法真实挂号</p>
            <p>4:本网站基于vue3测试</p>
            <p>5:是用了typescrit,vite,pinpia等技术</p>
          </el-card>
        </div>
      </div>
    </el-card>
    <!-- 展示支付内容，通过v-model控制 -->
    <el-dialog v-model="dialogVisible" title="微信支付" width="30%" @close="guanbi">
      <!-- 二维码图片 -->
      <div class="qrocde">
        <img :src=imgUrl>
        <svg t="1693055020892" class="icon" viewBox="0 0 1144 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5775" width="20" height="20">
          <path
            d="M436.314353 632.771765c-68.517647 36.321882-78.667294-20.389647-78.667294-20.389647l-85.835294-190.524236c-33.039059-90.533647 28.581647-40.839529 28.581647-40.839529s52.856471 38.038588 93.003294 61.229176c40.086588 23.190588 85.835294 6.806588 85.835294 6.806589l561.212235-246.362353C936.899765 80.112941 765.891765 0 572.235294 0 256.180706 0 0 213.232941 0 476.310588c0 151.311059 84.811294 285.967059 216.937412 373.248l-23.792941 130.288941s-11.625412 38.038588 28.611764 20.389647c27.437176-12.047059 97.370353-55.115294 138.992941-81.347764 65.445647 21.684706 136.734118 33.731765 211.486118 33.731764 316.024471 0 572.235294-213.232941 572.235294-476.310588 0-76.197647-21.594353-148.178824-59.843764-212.028235-178.808471 102.309647-594.733176 340.118588-648.312471 368.489412z"
            fill="#43C93E" p-id="5776"></path>
        </svg>
        <p>请使用微信扫码付款</p>
      </div>
      <!-- 对话底部插槽 -->
      <template #footer>
        <el-button type="primary" @click="guanbi">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang='ts'>
import { reqgetOrderInfo, reqOrderCancal, reqQrcode,reqPayState } from '@/api/user';
import { OrderInfoResponseData, QrCode,PayResultResponseData } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
//生成二维码插件
//@ts-ignore
import QRcode from 'qrcode'
let $route = useRoute();
let orderInfo = ref<any>({})
let imgUrl=ref<string>()
//存储全局定时器
let timer=ref<any>()
onMounted(() => {
  getOrderInfo();
})

//控制对话框显示
let dialogVisible = ref<boolean>(false)
//获取订单详情
const getOrderInfo = async () => {
  let result: OrderInfoResponseData = await reqgetOrderInfo($route.query.orderId as string)
  console.log(result)
  if (result.code == 200) {
    orderInfo.value = result.data
  }
}

//关闭窗口
const guanbi=()=>{
  dialogVisible.value=false;
  clearInterval(timer.value)
}
const open = async () => {
  dialogVisible.value = true;
  try {
   let result:QrCode= await reqQrcode($route.query.orderId as string)
    getOrderInfo();
    imgUrl.value = await QRcode.toDataURL(result.data.codeUrl)
    //询问服务器当前这笔交易结果,//二维码出来，每隔几秒询问服务器
   timer.value= setInterval(async() => {
     let payresult:PayResultResponseData =await reqPayState($route.query.orderId as string)
     //如果服务器返回为真，则是支付成功
     console.log(payresult)
      if(payresult.message=="支付成功"){
        dialogVisible.value=false;
        //提示信息
        ElMessage({
          type:'success',
          message:'恭喜你支付成功'
        });
        //清除定时器
        clearInterval(timer.value)
        //再一次获取订单详情
        getOrderInfo()
      }
    }, 2000);
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消预约失败'
    })
  }

  }
  

//取消订单  
//三种状态 orderStatus -1取消预约 0预约但是没有支付 1：支付成功
const cancel = async () => {

  try {
    await reqOrderCancal($route.query.orderId as string)
    getOrderInfo();
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消预约失败'
    })
  }

}
</script>
<style scoped lang='scss'>
.box-card {
  .detail {
    color: #7f7f7f;
    font-weight: 800;
  }

  .top {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;

      .success {
        font-size: 16px;
        margin-right: 5px;

      }
    }

    .rightMa {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 30px;

      img {
        width: 50px;
        height: 50px
      }

      p {
        font-size: 18px;

      }
    }

  }

  .bottom {
    display: flex;
    margin: 20px 0px;

    .left {
      flex: 4;

      .btn {
        margin-top: 20px
      }
    }

    .right {
      margin: 0px 20px;
      flex: 6;

      .zhuyi {
        color: skyblue
      }

      p {
        line-height: 50px;
      }

      .danger {
        color: red
      }
    }
  }
}

.qrocde {
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    margin: 10px 0px;
  }
}

::v-deep(.el-dialog__body) {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}</style>