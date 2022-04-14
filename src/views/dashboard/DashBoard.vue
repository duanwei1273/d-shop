<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#75a342">
      <van-tabbar-item  replace to="/dashboard/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item  replace to="/dashboard/category">
        <span>分类</span>
        <template #icon="props">
          <img :src="props.active ? category_icon.active : category_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item  replace to="/dashboard/cart">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? cart_icon.active : cart_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item  replace to="/dashboard/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mine_icon.active : mine_icon.inactive" />
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
import category_url1  from '../../images/tabbar/category_default.png'
import category_url2  from '../../images/tabbar/category_selected.png'
import cart_url1  from '../../images/tabbar/shoppingcart_default.png'
import cart_url2  from '../../images/tabbar/shoppingcart_selected.png'
import mine_url1  from '../../images/tabbar/mine_default.png'
import mine_url2  from '../../images/tabbar/mine_selected.png'
export default {
  name: "DashBoard",
  setup() {
    const active = ref(0);
    const home_icon = {
      active: home_url2,
      inactive: home_url1,
    };
    const category_icon = {
      active: category_url2,
      inactive: category_url1,
    };
    const cart_icon = {
      active: cart_url2,
      inactive: cart_url1,
    };
    const mine_icon = {
      active: mine_url2,
      inactive: mine_url1,
    };
    return {
      home_icon,
      category_icon,
      cart_icon,
      mine_icon,
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