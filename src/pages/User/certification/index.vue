<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>实名认证</h1>
        </div>
      </template>
      <!-- 实名认证 -->
      <div class="tip">
        <svg
          t="1693108560499"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4034"
          width="20"
          height="20"
        >
          <path
            d="M512 0C373.76 0 245.76 51.2 148.48 148.48 56.32 245.76 0 373.76 0 506.88 0 793.6 225.28 1024 506.88 1024c286.72 0 517.12-225.28 517.12-506.88C1024 230.4 798.72 0 512 0z m0 957.44c-250.88 0-450.56-199.68-445.44-450.56 0-245.76 199.68-445.44 445.44-440.32 245.76 0 445.44 199.68 445.44 445.44 0 250.88-194.56 445.44-445.44 445.44zM460.8 424.96v163.84c0 35.84 20.48 46.08 56.32 46.08 35.84 0 35.84-20.48 35.84-46.08 5.12-97.28 5.12-194.56 10.24-291.84 5.12-35.84 0-61.44-51.2-61.44S455.68 256 455.68 296.96L460.8 424.96z m117.76 337.92c-5.12 40.96-30.72 61.44-66.56 61.44-35.84 0-61.44-20.48-66.56-56.32-5.12-40.96 20.48-61.44 61.44-61.44 40.96-5.12 61.44 20.48 71.68 56.32z"
            fill="#FAB427"
            p-id="4035"
          ></path>
        </svg>
        <p>
          需要实名认证后才可以添加就诊人信息正常挂号，为不影响后续，请先实名认证！
        </p>
      </div>
      <!-- 卡片底部两部分：认证成功的时候，未认证的时候 -->
      <div class="contain" v-if="userInfo.authStatus == 2">
        <el-descriptions class="margin-top" :column="1" border>
          <template #extra> </template>
          <el-descriptions-item label-align="center" width="10">
            <template #label>
              <div class="cell-item">用户姓名</div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">证件类型</div>
            </template>
            {{ userInfo.certificatesType == "10" ? "身份证" : "户口本" }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">证件号码</div>
            </template>
            {{ userInfo.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <el-form
        ref="form"
        :model="params"
        :rules="rules"
        v-else-if="userInfo.authStatus == 0"
        style="width: 60%; margin: 20px auto"
        label-width="90"
      >
        <el-form-item label="用户姓名:" prop="name">
          <el-input
            placeholder="请输入用户姓名"
            v-model="params.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型:" prop="certificatesType">
          <el-select
            placeholder="请选择证件类型"
            style="width: 100%"
            v-model="params.certificatesType"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in arrType"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码:" prop="certificatesNo">
          <el-input
            placeholder="请输入证件号码"
            v-model="params.certificatesNo"
          ></el-input>
        </el-form-item>

        <!-- action:上传图片路径,请求路径，就是直接访问后端，向后端发送请求 -->
        <!-- limit：照片墙约束图片购书  on-exceed：超出限制的函数-->
        <el-form-item label="上传证件" prop="certificatesUrl">
          <el-upload
            ref="upload"
            :limit="1"
            :on-remove="remove"
            :on-preview="preview"
            :on-success="success"
            :on-exceed="exceed"
            list-type="picture-card"
            action="http://localhost:9527/api/oss/file/fileUpload"
          >
            <img
              style="width: 100%"
              src="../../../assets/images/auth_example.png"
            />
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img
              w-full
              v-if="params.certificatesUrl"
              style="width: 100%; height: 100%"
              :src="params.certificatesUrl"
              alt="Preview Image"
            />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :model="params"
        :rules="rules"
        v-else-if="userInfo.authStatus == -1"
        style="width: 60%; margin: 20px auto"
        label-width="90"
      >
        <h1>您上次提交的个人信息未予以通过，请重新输入</h1>
        <el-form-item label="用户姓名:" prop="name">
          <el-input
            placeholder="请输入用户姓名"
            v-model="params.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型:" prop="certificatesType">
          <el-select
            placeholder="请选择证件类型"
            style="width: 100%"
            v-model="params.certificatesType"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in arrType"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码:" prop="certificatesNo">
          <el-input
            placeholder="请输入证件号码"
            v-model="params.certificatesNo"
          ></el-input>
        </el-form-item>

        <!-- action:上传图片路径,请求路径，就是直接访问后端，向后端发送请求 -->
        <!-- limit：照片墙约束图片购书  on-exceed：超出限制的函数-->
        <el-form-item label="上传证件" prop="certificatesUrl">
          <el-upload
            ref="upload"
            :limit="1"
            :on-remove="remove"
            :on-preview="preview"
            :on-success="success"
            :on-exceed="exceed"
            list-type="picture-card"
            action="http://localhost:9527/api/oss/file/fileUpload"
          >
            <img
              style="width: 100%"
              src="../../../assets/images/auth_example.png"
            />
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img
              w-full
              v-if="params.certificatesUrl"
              style="width: 100%; height: 100%"
              :src="params.certificatesUrl"
              alt="Preview Image"
            />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div v-else-if="userInfo.authStatus == 1" class="ing">
        <h1>官方人员正在验证您的信息，请稍后</h1>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reqUserInfo, reqCertaionType, reqUserCertation } from "@/api/user";
import {
  CertationTypeResponseData,
  CertaionArr,
  UserParams,
} from "@/api/user/type";
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive } from "vue";
import { SET_YANZHENG } from "@/utils/user";
onMounted(() => {
  getUserInfo();
  //获取证件类型
  getType();
});

let userInfo: any = ref<any>({});
let arrType = ref<CertaionArr>([]);

//控制图片预览的显示隐藏
let dialogVisible = ref<boolean>(false);
//获取照片ref实例，以便清空的时候删除
let upload = ref();

let form = ref();
//收集用户表单
let params = reactive<UserParams>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});
//根据传递过的token获取用户信息
const getUserInfo = async () => {
  let result: any = await reqUserInfo();
  console.log(result.data);
  if (result.code == 200) {
    userInfo.value = result.data;
    SET_YANZHENG(result.data.authStatus);
  }
};
//获取证件类型
const getType = async () => {
  let result: CertationTypeResponseData = await reqCertaionType();
  console.log("数据" + result);
  if (result.code == 200) {
    arrType.value = result.data;
  }
};
//图片超出显示
const exceed = () => {
  ElMessage({
    type: "error",
    message: "只允许上传一张图片",
  });
};
//图片上传成功钩子
const success = (response: any) => {
  //response手机上传成功图片地址
  //uploadFile:上传文件对象数据 uploadFiles:是一个数组，所有图片的数据
  params.certificatesUrl = response.data;

  //上传成功后清除校验
  form.value.clearValidate("certificatesUrl");
};
//照片预览
const preview = () => {
  //触发预览的时候，对话框显示
  dialogVisible.value = true;
};
//删除图片的时候
const remove = () => {
  params.certificatesUrl = "";
};
//清空数据
const reset = () => {
  /* es6语法，获取这个数组，并且直接更改里面的内容 */
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
  upload.value.clearFiles();
};
//自定义校验规则

//@ts-ignore 姓名
const validatorName = (rule: any, value: any, callBack: any) => {
  const reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确姓名"));
  }
};

//@ts-ignore 身份证
const validatorNo = (rule: any, value: any, callBack: any) => {
  const reg = /^[0-9]*$/;

  if (reg.test(value) && value != 0) {
    callBack();
  } else {
    callBack(new Error("请输入正确的证件号码"));
  }
};

//表单校验规则
//required：true代表当前字段务必进行填写
const rules = reactive({
  name: [
    {
      required: true,
      validator: validatorName,
      trigger: "change",
    },
  ],
  certificatesType: [
    {
      required: true,
      message: "请选择证件类型",
    },
  ],
  certificatesNo: [
    {
      required: true,
      message: "请输入对应的证件号码",
      validator: validatorNo,
      trigger: "change",
    },
  ],
  certificatesUrl: [
    {
      required: true,
      message: "请上传证件照",
    },
  ],
});

//提交按钮
const submit = async () => {
  //进行全部表单校验,返回的数据如果是错的，那么后面语句也不会执行了，如果都是对的，就会展示显示true
  await form.value.validate();
  try {
    await reqUserCertation(params);
    ElMessage({
      type: "success",
      message: "认证成功",
    });
    //认证成功之后
    getUserInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败",
    });
  }
};
</script>
<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 13px;
      color: #7f7f7f;
    }
  }

  .contain {
    margin: 20px auto;
    width: 50%;
  }

  .ing {
    margin: 30px auto;
    width: 25%;
  }
}
</style>
