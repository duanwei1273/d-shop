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
        type="add"
        add-text="选择收货地址"
        @click="chooseAddress"
        style="margin-top: 3rem"
    />

    <van-cell-group
        style="margin-top: 0.6rem"
    >
      <van-cell
          title="送达时间"
          value="请点击送达时间"
          is-link
      />
      <van-cell value="内容" is-link center>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <img src="./images/detail1.jpg" alt="" style="width: 3rem;">
          <img src="./images/detail1.jpg" alt="" style="width: 3rem;">
          <img src="./images/detail1.jpg" alt="" style="width: 3rem;">
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="支付方式" value="微信" >

      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="备注"  >
          <input type="text" placeholder="选填，备注您的特殊需要！">
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额"  value="￥50.30"></van-cell>
      <van-cell title="配送费"  value="￥0.00"></van-cell>
    </van-cell-group>

    <van-submit-bar
        :price="3050"
        button-text="提交订单"
        label="实付"
        @submit="onSubmit"
    />


    <!--  路由出口！  -->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
        <component :is="Component" />
      </transition>
    </router-view>





  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    chooseAddress(){
      this.$router.push('/confirmOrder/myaddress');
    },
    onSubmit(){

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


</style>