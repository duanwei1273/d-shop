<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#75a342">
    <van-swipe-item v-for="(sowing, index) in sowing_list" :key="sowing.public_id">
      <img :src="sowing.icon_url" :alt="sowing.public_name">
    </van-swipe-item>

  </van-swipe>

</template>

<script>
import {inject} from 'vue'
export default {
  name: "Sowing",
  props: {
    sowing_list: Array

  },
  setup(){

    return {

    }
  }
}
</script>

<style lang="less" scoped>
//首页轮播图
.my-swipe {
  width: 100%;
  height: 14rem;
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;

}

.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>