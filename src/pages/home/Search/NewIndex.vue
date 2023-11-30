<template>
  <div class="searchBar" :class="{ changeWidth: isExpanded }">
    <div class="icon" @click="toggleExpand">
      <i class="iconfont icon-sousuoxiao" ></i>
    </div>
    <div class="textInput">
      <input class="inp" v-model="searchText" type="text" placeholder="请输入搜索关键字">
      <button class="goBtn" @click="search">go</button>
      <div class="clear" @click="clearInput">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isExpanded = ref(false);
    const searchText = ref('');

    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };

    const clearInput = () => {
      searchText.value = '';
    };

    const search = () => {
      // 处理搜索逻辑
      console.log('Perform search for: ' + searchText.value);
    };

    return {
      isExpanded,
      searchText,
      toggleExpand,
      clearInput,
      search
    };
  }
};
</script>

<style scoped>
.searchBar {
  width: 60px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  border-radius: 60px;
  position: relative;
  overflow: hidden;
  transition: .5s;
}

.icon {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon i {
  color: dodgerblue;
  font-size: 30px;
}

.textInput {
  width: 320px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  position: absolute;
  top: 0;
  left: 60px;
}

.textInput input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
}

.clear {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 22%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear i {
  color: #999;
}

.goBtn {
  width: 12%;
  height: 60%;
  position: absolute;
  top: 20%;
  right: 0;
  border-radius: 8px;
  outline: none;
  border: none;
  color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .4);
  background: linear-gradient(skyblue, deepskyblue);
  cursor: pointer;
}

.changeWidth {
  width: 400px;
}
</style>
