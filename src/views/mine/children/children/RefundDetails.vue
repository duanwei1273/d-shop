<template>
  <div id="refundDetails">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="退款详情"
        left-arrow
        :fixed=true
        @click-left="$router.back()"

    />

    <!-- 进度条   -->
    <van-steps :active="active" style="margin-top: 2.5rem">
      <van-step>提交申请</van-step>
      <van-step>商家处理</van-step>
      <van-step>退款成功</van-step>
    </van-steps>
    <!--  提示   -->
    <div class="hint">
      <div class="title">您已成功发起退款申请，请耐心等待商家处理。</div>
      <div class="content">商家同意或者超时未处理，系统将退款给您</div>
      <div class="content">如果上加拒绝，您可以撤销撤销申请后再次发起。</div>
    </div>
    
    <!-- 退款信息   -->
    <div class="refundInformation">
      <div class="title">退款信息</div>
      <div class="content" v-for="(goods ,index) in orders.goods" :key="goods.g_id">
        <div class="left">
          <img :src="goods.g_picture" width="90" height="90">
        </div>
        <div class="right">
          {{goods.g_name}}
        </div>
      </div>
      <div class="footer">
        <div class="footerItem">
          <div class="title">退款原因</div>
          <div class="content">{{ orders.return_reason }}</div>
        </div>
        <div class="footerItem">
          <div class="title">退款金额</div>
          <div class="content">￥{{orders.return_amount}}</div>
        </div>
        <div class="footerItem">
          <div class="title">申请时间</div>
          <div class="content">{{orders.return_time}}</div>
        </div>
      </div>
    </div>

    <!-- 底部选项   -->
    <div class="btn">
      <van-button  size="small" plain color="red" round>撤销申请</van-button>
    </div>
    
    
  </div>
  
</template>

<script>
import {refunddetails} from "../../../../service/api/index.js";

export default {
  name: "RefundDateils",
  data(){
    return{
      active: 1,
      //订单信息
      orders: {}
    }
  },
  mounted() {
    this.getRefundDet();
  },
  methods: {
    async getRefundDet(){
      let  res = await refunddetails(parseInt(this.$route.query.id))
      if (res.success){
        this.orders = res.object.order
      }
    }
  }
}
</script>

<style scoped>
  #refundDetails{
    position: fixed;
    overflow-y: scroll;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F5F5;
    z-index: 9998;
  }
  ::v-deep .van-nav-bar__content {
    background-color: #FFF;
  }
  ::v-deep .van-nav-bar__title {
    color: #000;
    font-size: 0.8rem;
  }
  /*
  提示
  */
  #refundDetails .hint{
    background-color: #fff;
    width: 100%;
    padding: 0.8rem;
    margin-top: 1rem;
  }
  #refundDetails .hint .title{
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  #refundDetails .hint .content{
    color: #808080;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  
/*  
  退款信息
*/
  #refundDetails .refundInformation{
    width: 100%;
    background-color: #fff;
    margin-top: 1rem;
    padding: 0.8rem;
    margin-bottom: 3rem;
  }
  #refundDetails .refundInformation .title{
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  #refundDetails .refundInformation .content{
    display: flex;
  }
  #refundDetails .refundInformation .content .left img{
    border-radius: 5px;
  }
  #refundDetails .refundInformation .content .right{
    margin-left: 1rem;
    font-size: 0.8rem;
  }
  #refundDetails .refundInformation .footer{
    margin-top: 1rem;
  }
  #refundDetails .refundInformation .footer .footerItem{
    display: flex;
  }
  #refundDetails .refundInformation .footer .footerItem .title{
    font-size: 0.8rem;
    font-weight: normal;
    color: #808080;
  }
  #refundDetails .refundInformation .footer .footerItem .content{
    font-size: 0.8rem;

    margin-left: 2.8rem;
  }



/*
底部选项
*/
  #refundDetails .btn{
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1.5rem;
  }


</style>