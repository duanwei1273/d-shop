<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(sowing, index) in sowing_list" :key="sowing.public_id">
      <img :src="sowing.icon_url" :alt="sowing.public_name">
    </van-swipe-item>

  </van-swipe>
</template>

<script>
import {inject} from 'vue'
export default {
  name: "Sowing",
  setup(){
    //订阅
    const sowing_list  = inject('sowing_list')
    console.log(sowing_list,'hh')
    return {
      sowing_list
    }
  }
}
</script>

<style lang="less" scoped>
//首页轮播图
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>