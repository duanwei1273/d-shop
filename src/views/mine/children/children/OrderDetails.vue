<template>
  <div id="orderDetails">
    <!-- 头部导航   -->
    <van-nav-bar
        title="待付款"
        left-arrow
        @click-left="this.$router.back()"
    />
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <div class="wrapper" @click="this.$router.push({name:'orderDetails'})">
      <div class="wrapperItem">
        <div class="header">
          <span class="titleName">天天特价工厂</span>
          <span class="titleState">待支付</span>
        </div>
        <div class="content">
          <div class="contentLift">
            <van-image src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="90" height="90" radius="5" />
          </div>
          <div class="contentRight">
            <div class="goodsName">篮球短裤男士夏季大码运动</div>
            <div class="goodsPriceNum">
              <div class="goodsPrice">￥31.90</div>
              <div class="goodsNum">x1</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <van-cell-group>
            <van-cell title="实付款" value="￥31.90" value-class="priceFooter" />
            <van-cell title="订单编号" value="15502229765655"  />
            <van-cell title="运费" value="$0.00"  />
            <van-cell title="运费险" value="$0.00"  />
            <van-cell title="收货地址" value="**********"  />

          </van-cell-group>
        </div>
      </div>
    </div>
    <div class="btns">
      <van-button class="btn" color="#000" plain size="small" round>延长收货</van-button>
      <van-button class="btn"  color="#000" plain size="small" round>查看物流</van-button>
      <van-button class="btn"  color="#ff4200" plain size="small" round>确认收货</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetails",
  data(){
    return{
      //进度条
      active: 0
    }
  }
}
</script>

<style scoped>
  #orderDetails{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F5F5;
    z-index: 9999;
  }
  ::v-deep .van-nav-bar__content {
    background-color: #FFF;
    color: #000;
  }
  ::v-deep .van-nav-bar__title {
    color: #000;
    font-size: 0.8rem;
  }
  ::v-deep .van-nav-bar__text{
    color: #000;
  }


  /*待支付订单面板*/
  #myOrder .wrapper{
    margin: 10px auto;
    width: 95%;
  }
  #myOrder .wrapper .wrapperItem{
    border-radius: 5px;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 0.8rem;
  }
  #myOrder .wrapper .wrapperItem .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #myOrder .wrapper .wrapperItem .header .titleName{
    font-size: 0.9rem;
    font-weight: 600;
  }
  #myOrder .wrapper .wrapperItem .header .titleState{
    font-size: 0.8rem;
    color: #ff4200;
  }

  #myOrder .wrapper .wrapperItem .content{
    width: 100%;
    height: 100px;
    display: flex;
    padding-top: 5px;
  }
  #myOrder .wrapper .wrapperItem .content .contentLift{

  }
  #myOrder .wrapper .wrapperItem .content .contentRight{
    width: 73.19%;
    height: 95%;
    padding-left: 0.8rem;
  }
  #myOrder .wrapper .wrapperItem .content .contentRight .goodsName{
    width: 80%;
    font-size: 0.8rem;
    font-weight: 550;
    margin-top: 10px;
    overflow: hidden;
  }
  #myOrder .wrapper .wrapperItem .content .contentRight .goodsPriceNum{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  #myOrder .wrapper .wrapperItem .content .contentRight .goodsPriceNum .goodsPrice{
    font-size: 0.8rem;
    font-weight: 550;
  }
  #myOrder .wrapper .wrapperItem .content .contentRight .goodsPriceNum .goodsNum{
    color: #808080;
    font-size: 0.5rem;
  }
  #myOrder .wrapper .wrapperItem .footer{

  }


  .btns{
    width: 100%;
    height: 2.8rem;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 0.2rem;
    border-top: 2px solid #F5F5F5;
    background-color: #fff;
  }
  .btns .btn{
    margin-left: 0.5rem;
  }


</style>