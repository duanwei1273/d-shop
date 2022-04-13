<template>
  <div id="home">
    首页
  </div>
</template>

<script>
import {getHomeData} from './../../service/api/index.js'
export default {
  name: "Home",
  created() {
    getHomeData().then((response)=> {
      console.log(response);
    }).catch(error=> {
      console.log(error);
    })
  }
}
</script>

<style lang="less" scoped>
  #home{
    width: 100%;
    height: 100%;
    background-color: skyblue;
  }
</style>