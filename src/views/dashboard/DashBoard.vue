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

      <van-tabbar-item  replace to="/dashboard/cart" :badge="gooodsNum > 0 ? gooodsNum : '' ">
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

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
    </router-view>

  </div>
</template>

<script>
import { ref } from 'vue'
import {mapState, mapMutations} from 'vuex'
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
  data() {
    return {
      active: Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
      home_icon: {
        active: home_url2,
        inactive: home_url1,
      },
      category_icon: {
        active: category_url2,
        inactive: category_url1,
      },
      cart_icon: {
        active: cart_url2,
        inactive: cart_url1,
      },
      mine_icon: {
        active: mine_url2,
        inactive: mine_url1,
      },
    }
  },
  // setup() {
  //   const active = ref(Number(sessionStorage.getItem('tabBarActiveIndex')) || 0);
  //   const home_icon = {
  //     active: home_url2,
  //     inactive: home_url1,
  //   };
  //   const category_icon = {
  //     active: category_url2,
  //     inactive: category_url1,
  //   };
  //   const cart_icon = {
  //     active: cart_url2,
  //     inactive: cart_url1,
  //   };
  //   const mine_icon = {
  //     active: mine_url2,
  //     inactive: mine_url1,
  //   };
  //   return {
  //     home_icon,
  //     category_icon,
  //     cart_icon,
  //     mine_icon,
  //     active,
  //   };
  // },
  watch: {
    active(value){
      // console.log(value);
      let tabBarActiveIndex = value > 0 ? value : 0;
      //缓存到本地
      sessionStorage.setItem('tabBarActiveIndex', value);
    }
  },
  computed: {
    ...mapState(['shopCart']),
    gooodsNum(){
      if(this.shopCart){
        let num = 0;//总的购物车商品数量
        Object.values(this.shopCart).forEach((goods, index)=> {
          num += goods.num;
        });
        return num;
      }else {
        return 0;
      }
    }
  },
  mounted() {
    //获取购物车数据
    this.INIT_SHOP_CART();
  },
  methods: {
    ...mapMutations(['INIT_SHOP_CART'])
  }
}
</script>

<style lang="less" scoped>
  #dashboard {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
</style>