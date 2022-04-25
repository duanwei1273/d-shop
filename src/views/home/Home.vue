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

      <!--  秒杀区    -->
      <FlashSale
          :flash_sale_product_list="flash_sale_product_list"
          :homeAddToCart="homeAddToCart"
      />

      <!--  猜你喜欢    -->
      <YouLike
          :you_like_product_list="you_like_product_list"
          :homeAddToCart="homeAddToCart"
      />

      <!--  返回顶部    -->
      <MakePage v-if="showBackStatus" :scrollToTop="scrollToTop"/>
    </div>
    <van-loading v-else class="vloading" type="spinner" color="#1989fa" >正在努力加载中...</van-loading>
  </div>
</template>

<script>
import {getHomeData, getAllGoods, getGoodsClassify} from './../../service/api/index.js'
import {showBack, animate} from "../../config/global.js"
import Header from "./components/header/Header.vue"
import Sowing from "./components/sowing/Sowing.vue"
import Nav from "./components/nav/Nav.vue"
import FlashSale from "./components/flashSale/FlashSale.vue"
import YouLike from "./components/youLike/YouLike.vue"
import MakePage from "./components/markPage/MakePage.vue";

//引用通知插件
// import PubSub from 'pubsub-js'
import { Toast } from 'vant';

//引入vuex
import {mapMutations} from 'vuex'
import {ADD_GOODS} from "../../store/mutations-type";

export default {
  name: "Home",
  components:  {
    Header,
    Sowing,
    Nav,
    FlashSale,
    YouLike,
    MakePage
  },
  data(){
    return{
      //首页轮播图数据
      sowing_list: [],
      //导航数据
      nav_list: [],
      //秒杀数据
      flash_sale_product_list: [],
      //猜你喜欢数据
      you_like_product_list: [],
      //是否显示加载图标
      showLoading: true,
      //是否显示返回顶部按钮
      showBackStatus: false
    }
  },
  created() {

    this.reqData();
    this.getAllGoodsData();
    this.getgoodsC();
  },
  // mounted() {
  //   //订阅添加购物车的消息
  //   PubSub.subscribe('homeAddToCart', (msg, goods)=>{
  //     if(msg === 'homeAddToCart'){
  //       this.ADD_GOODS({
  //         goodsId: goods.id,
  //         goodsName: goods.name,
  //         smallImage: goods.small_image,
  //         goodsPrice: goods.price
  //       })
  //     }
  //   })
  // },
  methods:{
    ...mapMutations(['ADD_GOODS']),
    homeAddToCart(goods){
      this.ADD_GOODS({
        goodsId: goods.id,
        goodsName: goods.name,
        smallImage: goods.small_image,
        goodsPrice: goods.price
      });
      //提示用户
      Toast({
        message: '添加到购物车成功！',
        duration: 800
      });
    },
    //获取分类
    async getgoodsC(){
      let res = await getGoodsClassify();
      console.log(res);
      if(res.success){
        this.nav_list = res.object.types;
      }
    },
    //获取所有商品数据
    async getAllGoodsData(){
      let res = await getAllGoods();
      console.log(res);
      if(res.success){
        this.you_like_product_list= res.object.goods;
        this.flash_sale_product_list = res.object.goods.slice(0,10);
      }
    },
    async reqData() {
      let res = await getHomeData();
      console.log(res);
      if(res.success){
        this.sowing_list = res.data.list[0].icon_list
        // this.nav_list = res.data.list[2].icon_list
        // this.flash_sale_product_list = res.data.list[3].product_list
        // this.you_like_product_list = res.data.list[12].product_list


        //隐藏动画
        this.showLoading = false

        //开始监听滚动,到达一定位置就显示返回顶部按钮
        showBack((status)=>{
          this.showBackStatus = status;
        })
      }
    },
    scrollToTop(){

      //做缓动动画返回顶部
      let docB = document.documentElement || document.body;
      animate(docB, {scrollTop: '0'}, 400,'ease-out');
    }
  }
}
</script>

<style lang="less" scoped>
  #home{
    width: 100%;
    height: 300rem;
    background-color: #F5F5F5;
  }
  .vloading {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
  }



</style>