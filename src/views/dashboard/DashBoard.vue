<template>
  <div id="dashboard">
    <van-tabbar v-model="active">
      <van-tabbar-item badge="3">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="3">
        <span>分类</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="3">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="3">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

    </van-tabbar>

    <!-- 路由出口   -->
    <router-view />

  </div>
</template>

<script>
import { ref } from 'vue';
import home_url1  from '../../images/tabbar/home_default.png'
import home_url2  from '../../images/tabbar/home_selected.png'
export default {
  name: "DashBoard",
  setup() {
    const active = ref(0);
    const home_icon = {
      active: home_url1,
      inactive: home_url2,
    };
    return {
      home_icon,
      active,
    };
  },
}
</script>

<style lang="less" scoped>
  #dashboard {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
</style>