<template>
  <div id="home">
    <div v-if="!showLoading">
      <!--  首页顶部导航栏  -->
      <Header />
      <!--  首页轮播图  -->
      <Sowing />
    </div>
    <van-loading v-else class="vloading" type="spinner" color="#1989fa" >正在努力加载中...</van-loading>
  </div>
</template>

<script>
import {getHomeData} from './../../service/api/index.js'
import Header from "./components/header/Header.vue"
import Sowing from "./components/sowing/Sowing.vue"
import {reactive, provide, ref} from "vue"

export default {
  name: "Home",
  setup() {
    let sowing_list;
    let showLoading = ref(true)

    getHomeData().then((response)=> {
      console.log(response);
      if(response.success){
        sowing_list = reactive(response.data.list[0].icon_list)

        showLoading.value = false
      }
    }).catch(error=> {
      console.log(error);
    })

    //发布
    provide('sowing_list', sowing_list)

    return {
      showLoading
    }
  },
  // created() {
  //
  // },
  components:  {
    Header,
    Sowing
  }
}
</script>

<style lang="less" scoped>
  #home{
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
  .vloading {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
  }



</style>