<template>
  <div id="home">
    <div v-if="!showLoading">
      <!--  首页顶部导航栏  -->
      <Header />
      <!--  首页轮播图  -->
      <Sowing
          :sowing_list="sowing_list"
      />
      <!--  中间导航    -->
      <Nav :nav_list="nav_list" />
    </div>
    <van-loading v-else class="vloading" type="spinner" color="#1989fa" >正在努力加载中...</van-loading>
  </div>
</template>

<script>
import {getHomeData} from './../../service/api/index.js'
import Header from "./components/header/Header.vue"
import Sowing from "./components/sowing/Sowing.vue"
import Nav from "./components/nav/Nav.vue"

export default {
  name: "Home",
  components:  {
    Header,
    Sowing,
    Nav
  },
  data(){
    return{
      //首页轮播图数据
      sowing_list: [],
      //导航数据
      nav_list: [],
      //是否显示加载图标
      showLoading: true
    }
  },
  created() {
    getHomeData().then((response)=> {
      console.log(response);
      if(response.success){
        this.sowing_list = response.data.list[0].icon_list
        this.nav_list = response.data.list[2].icon_list

        this.showLoading = false
      }
    }).catch(error=> {
      console.log(error);
    })
  },

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