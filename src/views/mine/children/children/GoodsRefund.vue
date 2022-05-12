<template>
  <div id="goodsRefund">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="申请退款"
        left-arrow
        :fixed=true
        @click-left="$router.back()"
    />

    <!--  退款商品信息    -->
    <div class="wrapper">
      <div class="wrapperItem"  >
        <div class="header">
          <span class="titleName">退款商品</span>
        </div>
        <div class="content" >
          <div class="contentLift">
            <van-image :src="this.$route.params.g_picture" width="90" height="90" radius="5" />
          </div>
          <div class="contentRight">
            <div class="goodsName">{{this.$route.params.g_name}}</div>
            <div class="goodsPriceNum">
              <div class="goodsPrice">￥{{this.$route.params.g_price}}</div>
              <div class="goodsNum">x{{this.$route.params.g_count}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 退款选项   -->
    <div class="refundInformation">
      <div class="header">
        <span>退款信息</span>
      </div>
      <div class="content">
        <div class="contentItem">
          <div class="title">货物状态</div>
          <div class="right" @click="chooseShowSteta">
            <div class="rightContent">{{state}}</div>
            <div class="icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="contentItem">
          <div class="title">退款原因</div>
          <div class="right">
<!--            <div class="rightContent">请输入</div>-->
<!--            <div class="icon">-->
<!--              <van-icon name="arrow" />-->
<!--            </div>-->
            <input type="text" placeholder="请输入" v-model="value">
          </div>
        </div>
        <div class="contentItem">
          <div class="title">退款金额</div>
          <div class="right">
            <div class="rightContent price">￥{{this.$route.params.g_price}}</div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model:show="showSteta" round position="bottom" :style="{ height: '30%' }">
      <van-radio-group v-model="checked" style="margin-top: 1rem">
        <van-cell-group inset>
          <van-cell title="未收到货" clickable @click="checked = '1',state = '未收到货'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="已收到货" clickable @click="checked = '2',state = '已收到货'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>


    </van-popup>

    <!-- 底部确认   -->
    <div class="btn">
      <van-button type="primary" size="large" round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import {idQueryOrder,appRefund} from "../../../../service/api/index.js";
import {Toast} from "vant";

export default {
  name: "GoodsRefund",
  data(){
    return{
      //订单详情
      order:{},
      //展示货物状态
      showSteta: false,
      //状态选中
      checked: null,
      state: '未选择',
      //退款原因
      value: ''
    }
  },
  computed:{
  },
  mounted() {
    // this.getOrder();
    // console.log(this.$route.params);
    // console.log(this.$route.params.og_id);
  },
  methods:{
    //获取订单详情
    async getOrder(){
      let res = await idQueryOrder(this.$route.params.id)
      if(res.success){
        this.order = res.object.order;
      }
    },
    //改变货物状态弹框
    chooseShowSteta(){
      this.showSteta = true
    },

    //提交退款
    async submit(){
      console.log(this.value,this.order)
      let res = await appRefund(this.$route.params.og_id,this.$route.params.g_price,this.value)
      console.log(res);
      if(res.success){
        Toast({
          message: res.msg,
          duration: 500
        })
        await this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
  #goodsRefund{
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

  /*待支付订单面板*/
  #goodsRefund .wrapper{
    margin: 2.5rem auto;
    margin-bottom: 0;
    width: 95%;
  }
  #goodsRefund .wrapper .wrapperItem{
    border-radius: 5px;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 0.8rem;
  }
  #goodsRefund .wrapper .wrapperItem .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #goodsRefund .wrapper .wrapperItem .header .titleName{
    font-size: 0.9rem;
    font-weight: 600;
  }

  #goodsRefund .wrapper .wrapperItem .content{
    width: 100%;
    height: 100px;
    display: flex;
    padding-top: 5px;
  }
  #goodsRefund .wrapper .wrapperItem .content .contentLift{

  }
  #goodsRefund .wrapper .wrapperItem .content .contentRight{
    width: 73.19%;
    height: 95%;
    padding-left: 0.8rem;
  }
  #goodsRefund .wrapper .wrapperItem .content .contentRight .goodsName{
    width: 80%;
    font-size: 0.8rem;
    font-weight: 550;
    margin-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #goodsRefund .wrapper .wrapperItem .content .contentRight .goodsPriceNum{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  #goodsRefund .wrapper .wrapperItem .content .contentRight .goodsPriceNum .goodsPrice{
    font-size: 0.8rem;
    font-weight: 550;
  }
  #goodsRefund .wrapper .wrapperItem .content .contentRight .goodsPriceNum .goodsNum{
    color: #808080;
    font-size: 0.5rem;
  }


  /* 退款信息 */
  #goodsRefund .refundInformation{
    width: 95%;
    margin: 1rem auto;
    margin-bottom: 4rem;
    background-color: #fff;
    padding: 0.8rem;
    border-radius: 5px;
  }
  #goodsRefund .refundInformation .header span{
    font-weight: 700;
  }
  #goodsRefund .refundInformation .content{
    width: 100%;

  }
  #goodsRefund .refundInformation .content .contentItem{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
  }
  #goodsRefund .refundInformation .content .contentItem .title{
    font-size: 0.8rem;
    color: #808080;
  }
  #goodsRefund .refundInformation .content .contentItem .right{
    display: flex;
    font-size: 0.8rem;
    color: #808080;
  }
  .price{
    color: red;
  }

  #goodsRefund .btn{
    height: 3.5rem;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
  }



</style>