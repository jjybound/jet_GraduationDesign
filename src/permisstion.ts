//创建路由守卫
import router from "./router";
//引入进度条
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import useUserStore from "./store/modules/user";
import pinia from "@/store";
import { ElMessage } from "element-plus";
import { GET_YANZHENG } from "./utils/user";
let userStore = useUserStore(pinia);

//未登录时能访问到的路由
let whiteList = [
  "/home",
  "/hospital/register",
  "/hospital/detail",
  "/hospital/notice",
  "/hospital/close",
  "/hospital/search",
  "/wxlogin",
];
let white = [
    "/user",
    "/user/certification",
  ];

//小圆球不要
Nprogress.configure({ showSpinner: false });
//添加全局首位
//前置守卫,在访问路由之前

router.beforeEach((to, from, next) => {
  //访问路由组件进入之前，进度条开始
  Nprogress.start();
  //动态设置标题
  document.title = `金医通--${to.meta.title}`;
  //根据token判断用户是否登录
  let yanzheng = JSON.parse(GET_YANZHENG() as string);
  let token = userStore.userInfo.token;

  if(whiteList.includes(to.path)){
    next();
  }else if(token && yanzheng == 2){
    next();
  }else if(token && (yanzheng !== 2)){
    if(white.includes(to.path)){
        next()
    }else
    next({ path: "/user/certification"});
    ElMessage({
      type: "error",
      message: "您还未实名认证",
    });
    }else{
        ElMessage({
            type: "error",
            message: "您还未登录",
          });
          userStore.visiable = true;
          console.log(to.fullPath);
          next({ path: "/home", query: { redirect: to.fullPath } });
    }
  }
);

//后置路由
router.afterEach((to, from, next) => {
  //访问路由成功后消失
  Nprogress.done();
});
