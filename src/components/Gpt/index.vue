<template>
  <div class="position">
    <div class="text-container">
      <el-button link @click="dialogFormVisible = true">
        <svg
          t="1699191796185"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10106"
          width="168"
          height="168"
        >
          <path
            d="M623.786667 627.958519l-94.814815-274.204445a25.220741 25.220741 0 0 0-9.481482-12.98963 39.158519 39.158519 0 0 0-40.58074 0 25.220741 25.220741 0 0 0-9.481482 12.98963l-93.677037 273.066667c-4.266667 12.515556-3.508148 21.238519 2.085926 26.453333a31.194074 31.194074 0 0 0 22.376296 7.774815 30.814815 30.814815 0 0 0 21.522963-6.637037 44.847407 44.847407 0 0 0 11.282963-17.445926l20.100741-52.148148h92.065185l21.712593 54.518518a43.045926 43.045926 0 0 0 10.429629 15.54963 28.444444 28.444444 0 0 0 21.048889 6.162963 32.142222 32.142222 0 0 0 22.376297-8.059259c5.688889-5.214815 6.637037-13.463704 3.034074-25.031111zM464.592593 533.617778l35.176296-112.82963 34.891852 112.82963zM718.696296 632.225185a29.677037 29.677037 0 0 1-7.111111 21.997037 30.340741 30.340741 0 0 1-22.85037 7.300741 28.444444 28.444444 0 0 1-22.471111-7.300741 30.814815 30.814815 0 0 1-6.637037-21.428148V364.373333q0-29.013333 29.013333-29.013333A33.564444 33.564444 0 0 1 711.111111 341.333333a27.117037 27.117037 0 0 1 7.774815 22.186667z"
            fill="#1296db"
            p-id="10107"
          ></path>
          <path
            d="M555.804444 56.888889a410.074074 410.074074 0 0 0-409.41037 409.41037 35.460741 35.460741 0 0 0 0 4.930371c-28.444444 29.297778-88.746667 96.331852-88.746667 143.454814 0 52.148148 49.303704 72.248889 84.48 73.386667l40.106667 9.007408 7.585185 197.025185a73.765926 73.765926 0 0 0 74.145185 73.007407h150.281482a29.297778 29.297778 0 1 0 0-58.500741H263.964444a14.980741 14.980741 0 0 1-14.885925-14.885926l-9.481482-243.768888-87.04-18.962963-3.034074-0.663704h-3.318519a64.948148 64.948148 0 0 1-19.911111-4.551111c-9.481481-3.792593-9.481481-7.300741-9.481481-10.619259 0-16.971852 37.262222-68.171852 79.549629-109.700741a29.297778 29.297778 0 0 0 7.300741-29.771852 28.444444 28.444444 0 0 0 1.422222-9.007407 350.814815 350.814815 0 0 1 701.62963 0c0 16.308148 29.297778 29.297778 29.297778 29.297777s29.297778-12.98963 29.297778-29.297777A409.979259 409.979259 0 0 0 555.804444 56.888889z"
            fill="#1296db"
            p-id="10108"
          ></path>
          <path
            d="M860.728889 291.271111s146.299259 247.751111-81.92 485.451852c0 0-11.282963 50.725926 47.407407 36.124444 0 0 163.555556-134.542222 136.912593-392.438518z"
            fill="#1296db"
            p-id="10109"
          ></path>
        </svg>
      </el-button>
      <p class="wenzi">金医通智能医疗问诊</p>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="金医通智能医疗问诊"
      style="margin-top: 30px"
    >
      <div class="GPT">
        <div class="top">
          <h2 class="title">热门问题</h2>
  <div class="hot-questions">
    <div v-for="questions in hotQuestions" :key="questions" @click="askQuestion(questions)" class="hotquestion">
      {{ questions }}
    </div>
  </div>
        </div>
       
        <div class="center" >
          <div class="part" v-for="(item) in mergedList" :key="item.id">
            <img :src="item.role === 'user' ? '/src/assets/images/person.jpg' :'/src/assets/images/antur.jpg'">
           
            <div class="question">{{ item.content }}</div>
            <div v-if="item.role === 'answer' && item.isTyping" class="typing-animation"></div>
          </div>
          <div class="loading" v-if="isLoading">正在请求中，请稍后...</div>
        </div>
        <div class="footer11">
          <el-input
            class="input-box"
            placeholder="请输入您的问题并点击发送按钮"
            :rows="5"
            type="textarea"
            style="background-color:gray"
            v-model="test"
          >
          </el-input>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="question" :disabled="isLoading">发送</el-button>
          <el-button @click="dialogFormVisible = false">关闭窗口</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref,onMounted, reactive,computed } from "vue";
import {getSt,getGpt,getThree,updateGpt} from "@/api/gptRquest"
const dialogFormVisible = ref(false);
let SessionToken =ref<any>();
let  test = ref();
let  isLoading = ref(false);

const answer = reactive<{ id: number; content: string; isTyping: boolean }[]>([]);  
const questions = reactive<{ id: number; content: string;isTyping: false  }[]>([]);
let hotQuestions=reactive<any>([])
let data = reactive({"messages":[
    {
        "role":"user",
        "content":'null'
    }
],
})
onMounted(()=>{
  getSessionToken()
  getThreeTitle()
})
const getSessionToken = async()=>{
  let result:any = await getSt()
  SessionToken.value = result.data.access_token
}

const getThreeTitle = async()=>{
  let result:any = await getThree()
  for(let i =0;i<result.data.length;i++){
    hotQuestions.push(result.data[i].content)
  }
}

const askQuestion = (questions:String)=>{
    test.value=questions
    question();
}

const question = async () => {
  isLoading.value=true;
  data.messages[0].content = test.value;
  let content: any = await getGpt(SessionToken.value, data);
  await updateGpt(test.value)
  const answerContent = content.data.result;
  isLoading.value=false;
  const answerIndex = questions.length; // 计算回答在mergedList中的索引
  answer.push({ id: answerIndex, content: answerContent, isTyping: true });
  questions.push({ id: questions.length, content: test.value,isTyping:false });
  test.value = "";
  // 模拟打字效果
  const typingDelay = 20; // 打字延迟时间，单位为毫秒
  const answerLength = answerContent.length;
  for (let i = 0; i < answerLength; i++) {
    setTimeout(() => {
      answer[answerIndex].content = answerContent.slice(0, i + 1);
    }, typingDelay * (i + 1));
  }
  setTimeout(() => {
    answer[answerIndex].isTyping = false; // 打字结束后，将isTyping设置为false
  }, typingDelay * answerLength);

};




const mergedList = computed(() => {
  const merged = [];
  const maxLen = Math.max(questions.length, answer.length);
  for (let i = 0; i < maxLen; i++) {
    if (questions[i]) {
      merged.push({ ...questions[i], role: 'user' });
    }
    if (answer[i]) {
      merged.push({ ...answer[i], role: 'answer' });
    }
  }
  return merged;
});
</script>
<style scoped lang="scss">
.position {

  display: flex;
  justify-content: flex-end;
  align-items: center;

  z-index: 999;
  :deep(.el-textarea__inner) {
    background-color:rgb(218, 228, 238);
    color:gray
}
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  .GPT {
    height: 1000px;
    .top {
      height: 100px;
      background-color: aqua;
      display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }
  .hot-questions {
    display: flex;
    justify-content: center;
    .hotquestion {
      margin: 0 10px;
      padding: 8px 12px;
      font-size: 16px;
      color: #666;
      background-color: #f5f5f5;
      border-radius: 4px;
      cursor: pointer;
    }
    .hotquestion:hover {
      background-color: #ebebeb;
    }
  }
    }

    .center {
      height: 800px;
     overflow: auto;
     .loading{
        width: 100%;
        text-align: center;
        letter-spacing: 2px;
        font-size: 20px;
        margin-bottom: 10px;
     }
     .part{
      display: flex;
      align-items: center;
      margin: 30px 0px;
      img{
        height: 50px;
        width: 50px;
        border-radius: 50px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
      }
      .question{
        width:100%;
        height: auto;
        border-radius: 10px;
        min-height: 50px;
        margin-left: 20px;
        font-size: 20px;
        line-height: 22px;
        padding: 10px;
        background-color: #b6dff6;
        box-shadow:  4px 4px 8px rgba(0, 0, 0, 0.4 );
      }
     }
     
    }
    .footer11 {
      display: flex;
      flex-wrap: wrap;
      .input-box {
        height: 100%;
        width: 100%;
        font-size: 20px;
      }
    }
  }
  .dialog-footer button:first-child {
    margin-right: 30px;
  }
  .dialog-footer {
    margin-top: 60px;
  }
}
</style>
