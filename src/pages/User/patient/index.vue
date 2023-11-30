<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button class="button" type="primary" :icon="User" @click="addUser">添加就诊人</el-button>
            </div>
        </template>
        <!--就诊人管理模块 -->
        <div class="visitors" v-if="scene == 0">
            <Vistor @changeScene="changeScene" @removeUser="removeUser" class="card" v-for="(item, index) in userArr" :key="index" :user="item"
                :index="index"></Vistor>
        </div>
        <div class="form" v-if="scene == 1">

            <el-button type="primary" @click="scene = 0">返回就诊人卡片</el-button>

            <el-divider content-position="center"><span style="color:skyblue">就诊人信息</span></el-divider>
            <el-form style="width:60%;margin:10px auto">
                <el-form-item label="用户姓名">
                    <el-input placeholder="请输入就诊人姓名" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择证件类型" v-model="userParams.certificatesType">
                        <el-option v-for="(item, index) in certationArr" :key="index" :label="item.name"
                            :value="item.value"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="userParams.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>

                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="userParams.birthdate" value-format="YYYY-MM-DD" type="date"
                        placeholder="请选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号" v-model="userParams.phone"></el-input>
                </el-form-item>

                <el-divider content-position="center"><span style="color:skyblue">建档信息</span></el-divider>
                <el-form-item label="婚姻状况">
                    <el-radio-group v-model="userParams.isMarry">
                        <el-radio label="1">未婚</el-radio>
                        <el-radio label="0">已婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保">
                    <el-radio-group v-model="userParams.isInsure">
                        <el-radio label="1">自费</el-radio>
                        <el-radio label="0">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="当前地址">
                    <el-cascader :props="props" v-model="userParams.addressValue"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input placeholder="请输入详细地址" v-model="userParams.address"></el-input>
                </el-form-item>
                <el-divider content-position="center"><span style="color:skyblue">联系人信息（选填）</span></el-divider>
                <el-form-item label="用户姓名">
                    <el-input placeholder="请输入就诊人姓名" v-model="userParams.contactsName"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择证件类型" v-model="userParams.contactsCertificatesType">
                        <el-option v-for="(item, index) in certationArr" :key="index" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号" v-model="userParams.contactsPhone"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button @click="submit" type="primary" style="margin: auto;">提交</el-button>
                    <el-button style="margin: auto;" @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
    <!-- 展示增加或者修改的样子 -->
</template>
<script setup lang='ts'>
import { User } from '@element-plus/icons-vue';
import { ElMessage, type CascaderProps } from 'element-plus';
import { reqGetUser } from '@/api/hospital';
import { onMounted, ref, reactive, watch } from 'vue';
import { reqCertaionType, reqCity, reqAddOrUpdateUser } from '@/api/user'
import { AddOrUpdateUserType, CertaionArr, CertationTypeResponseData, CityResponseData, } from '@/api/user/type';
import { useRouter, useRoute } from 'vue-router';
onMounted(() => {
    //获取就诊人信息
    getUser()
    //获取证件类型
    getCertationType();
    //判断当前组件是否带有type,挂号组件来的话，路径是带着
    if ($route.query.type == 'add') {
        scene.value = 1
    }
    if ($route.query.type == 'edit') {
        scene.value = 1
    }
})

let $router = useRouter()
let $route = useRoute()
//存储就诊人信息
let userArr = ref<any>([])

let scene = ref<number>(0)
let certationArr = ref<CertaionArr>([])


//新增就诊人信息
let userParams = reactive<any>({
    address: '',
    
     addressValue : '',
     cityCode : '11',
     provinceCode : '11',
     districtCode : '11',

    birthdate: '',
    certificatesNo: '',
    certificatesType: '',
    contactsCertificatesNo: '',
    contactsCertificatesType: '',
    contactsName: '',
    contactsPhone: '',
    isInsure: 0,
    isMarry: 0,
    name: '',
    phone: '',
    sex: 0,
})

const getUser = async () => {
    let result: any = await reqGetUser()
    console.log(result)
    if (result.code == 200) {
        userArr.value = result.data
    }
}

const addUser = () => {
    scene.value = 1
    reset()
}

//清空数据
const reset = () => {
    Object.assign(userParams, {
        id: null,
        address: '',
        addressSelected: [],
        birthdate: '',
        certificatesNo: '',
        certificatesType: '',
        contactsCertificatesNo: '',
        contactsCertificatesType: '',
        contactsName: '',
        contactsPhone: '',
        isInsure: 0,
        isMarry: 0,
        name: '',
        phone: '',
        sex: 0,
    })
}

const changeScene = (user: AddOrUpdateUserType) => {
    scene.value = 1
    //收集已有就诊人信息
    Object.assign(userParams, user) //令userParams数组等于user数组
}

const removeUser = ()=>{
    //再次获取全部信息
    getUser()
}
const getCertationType = async () => {
    let result: CertationTypeResponseData = await reqCertaionType()
    console.log()
    if (result.code == 200) {
        certationArr.value = result.data
    }
}

//级联选择器数组
const props: CascaderProps = {
    lazy: true,//懒加载，需要的时候再加载
    //加载级联选择器数据方法
    async lazyLoad(node: any, resolve: any) {//node是选中的节点
        let result: CityResponseData = await reqCity(node.data?.id as string || '86')
        //整理数组
        let showDate = result.data.map((item: any) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value,
                leaf: !item.hasChildren //true代表只有一级，false是有二级
            }
        })
        //注入组件需要展示的数组
        resolve(showDate)
    }
}
//提交按钮
const submit = async () => {
    console.log(userParams)
    //要么新增，要么更新
    try {
        //要么新增用户成功，要么更新已有用户
        await reqAddOrUpdateUser(userParams)
        ElMessage({
            type: 'success',
            message: userParams.id ? '更改成功' : '新增成功'
        })

        //要根据路径是否带有type判断从哪来来的
        if ($route.query.type) {
            $router.back()
        } else {
            scene.value = 0;
        }
        //再重新获取全部就诊人信息
        getUser();
    } catch (error) {
        ElMessage({
            type: 'error',
            message: userParams.id ? '更改失败' : '新增失败'
        })
    }

}

//监听就诊人数据
watch(() => userArr.value, () => {
    if ($route.query.type == 'edit') {
        let user = userArr.value.find((item: any) => {
            return item.id == $route.query.id
        })
        Object.assign(userParams, user)
    }
})

watch(() => userParams.addressValue,() => {
    userParams.cityCode =userParams.addressValue[0],
      userParams.provinceCode=userParams.addressValue[1]
      userParams.districtCode=userParams.addressValue[2];
    console.log(userParams)
})

</script>
<style scoped lang='scss'>
.box-card {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .visitors {
        display: flex;
        flex-wrap: wrap;

        .card {
            width: 32%;
            margin: 5px 5px;
        }
    }
}</style>