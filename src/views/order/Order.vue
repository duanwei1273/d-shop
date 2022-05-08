<template>
  <div id="order">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="填写订单"
        left-text="返回"
        left-arrow
        :fixed=true
        @click-left="onClickLeft"
    />
    <!--  联系人  -->
    <van-contact-card
        v-if="isChooseAddress"
        type="add"
        add-text="选择收货地址"
        @click="chooseAddress"
        style="margin-top: 3rem"
    />

    <van-contact-card
        v-else
        type="edit"
        :tel="adress.tel"
        :name="adress.name"
        @click="chooseAddress"
        style="margin-top: 3rem"
    />

    <van-cell-group
        style="margin-top: 0.6rem"
    >
      <van-cell :value="`共${goodsCount}件`" is-link center @click="goGoodsContent">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span v-for="(imgsrc, index) in showImg"  :key="imgsrc" style="margin-right: 2px">
            <img :src="imgsrc" alt="" style="width: 75px">
          </span>

        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="支付方式" value="微信" >

      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="备注"  >
          <input type="text" placeholder="选填，备注您的特殊需要！" :value="remark" >
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额"  :value="totalPrice"></van-cell>
      <van-cell title="配送费"  value="￥0.00"></van-cell>
    </van-cell-group>

    <van-submit-bar
        :price="totalPrice * 100"
        decimal-length="2"
        button-text="提交订单"
        label="实付"
        @submit="onSubmit"
    />
    <van-popup v-model:show="showPopup" position="bottom" round :style="{ height: '60%' }">
        <div class="showContent">
          <div class="top">
            <img src="./images/moneyCode.png" alt="" width="200">
          </div>
          <div class="footer">
            <van-button type="primary" size="large" @click='toPay'>已支付</van-button>
          </div>
        </div>
    </van-popup>


    <!--  路由出口！  -->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }"  appear>
        <component :is="Component" />
      </transition>
    </router-view>





  </div>
</template>

<script>
import {mapState} from "vuex";
import {submitOrder,getWXCode,queryPayStatus} from "../../service/api/index.js";
import {Toast} from "vant";

export default {
  name: "Order",
  data() {
    return {
      //备注
      remark: '',
      //展示图片
      showImg:[],
      //地址
      adress: {},
      //是否展示选择地址
      isChooseAddress: true,
      //是否弹出
      showPopup: false,
      //是否支付
      isPay: false,
    }
  },
  computed:{
    ...mapState(['shopCart','userInfo']),
    //商品价格
    totalPrice(){
      let totalPrice = 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(1){
          totalPrice += goods.price * goods.num;
        }
      });
      return totalPrice;
    },
    //计算商品总数
    goodsCount(){
      let selectedGoodsCount = 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(1){
          selectedGoodsCount += 1;
        }
      });
      return Object.keys(this.shopCart).length;
    },

  },
  mounted() {
    // console.log(this.$route.query);
    // console.log(this.$route.params)

    this.getShowImg();


  },
  updated(){
    this.getAdress();
  },
  methods: {
    //回退
    onClickLeft() {
      this.$router.push({name: 'cart'});
    },
    //选择地址
    chooseAddress(){
      this.$router.push('/confirmOrder/myaddress');
    },
    //去订单商品列表页面
    goGoodsContent(){
      if(this.userInfo.id){
        this.$router.push({name: 'goodsContent'})
      }
    },

    //提交订单
    async onSubmit(){


      if(this.userInfo.id){

        if(this.adress.name){
          this.showPopup = true
        }else {
          Toast({
            message: '您未选择收货地址，请选择后再提交订单！',
            duration: 500
          })
          return
        }
      }else {
        Toast({
          message: '您未登录，亲退出登录！',
          duration: 500
        })
        return
      }

    },
    //去支付
    async toPay(){
      let g_ids = Array();
      for(let key in this.shopCart){
        if(this.shopCart[key].checked){
          for(let i = 0; i < this.shopCart[key].num; i++){
            g_ids.push(this.shopCart[key].id)
          }
        }
      }
      g_ids = g_ids.toString()
      let res = await submitOrder(this.adress.aid,this.remark,this.goodsCount,g_ids,this.totalPrice,this.userInfo.id)
      console.log(res);
      if(res.success){
        Toast({
          message: '提交成功！',
          duration: 500
        })
        this.showPopup = false
        this.$router.back()
      }
    },


    //获取展示图片
    getShowImg(){

      for( let key in this.shopCart){
        if(this.shopCart[key].checked){
          this.showImg.push(this.shopCart[key].small_image)
        }
      }
      this.showImg  = this.showImg.splice(0,2)
    },

    //获取地址
    getAdress(){
      this.adress = this.$route.params;
      if(this.$route.params.name){
        this.isChooseAddress = false
      }else {
        this.isChooseAddress = true
      }
      console.log(this.isChooseAddress);
    }
  }
}
</script>

<style scoped>
  #order {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-in-out;
    /*transform: translate3d(-2rem,0,0);*/
  }

  .slide-fade-leave-active {
    transition: all 0.3s;
    transform: translate3d(2rem,0,0);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-to, .slide-fade-leave-from {
    opacity: 1;
  }

  /*.slide-fade-enter-active, .slide-fade-leave-active {*/
  /*  transition: all 0.3s;*/
  /*}*/
  /*.slide-fade-enter, .slide-fade-leave-active{*/
  /*  transform: translate3d(2rem, 0, 0);*/
  /*  opacity: 0;*/
  /*}*/


  .showContent{
    width: 80%;
    margin: 2rem auto;
  }
  .showContent .top{
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .showContent .footer{
    margin-top: 2rem;
  }

</style>