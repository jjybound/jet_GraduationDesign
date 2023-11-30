<template>
<div class="bottom">
 <div class="content">
    <div class="left">金医通 越努力越幸运 phone：110</div>
    <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
    </div>
 </div>
</div>
 </template>
<script setup lang="ts">

</script>

<style lang="scss" scoped >
 .bottom{
    width: 100%;
    height: 50px;
    background-color:#f2f2f5;
    display:flex;
    justify-content: center;
    margin-top: 30px;
    .content{
     width:1200px;
     height: 100%;
     display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: black;
    .right{
       span{
        margin: 0px 5px;
       }
       span:hover{
         cursor: pointer;
       }
    }
    }
 }
</style>