<template>
  <div id="myOrder">
    <!-- 头部导航   -->
    <div class="nav">
      <div class="back" @click="this.$router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div class="search">
        <input type="text" placeholder="搜索订单" />
        <div class="searchIcon" >
          <van-icon name="search" />
        </div>
      </div>
    </div>

    <van-tabs v-model:active="activeName" style="margin-top: 2.5rem">
      <van-tab title="待支付" name="a">
        <!--   待支付订单面板     -->
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
              <van-button class="btn" color="#000" plain size="small" round>延长收货</van-button>
              <van-button class="btn"  color="#000" plain size="small" round>查看物流</van-button>
              <van-button class="btn"  color="#ff4200" plain size="small" round>确认收货</van-button>
            </div>
          </div>
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
              <van-button class="btn" color="#000" plain size="small" round>延长收货</van-button>
              <van-button class="btn"  color="#000" plain size="small" round>查看物流</van-button>
              <van-button class="btn"  color="#ff4200" plain size="small" round>确认收货</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货" name="b">内容 2</van-tab>
      <van-tab title="待评价" name="c">内容 3</van-tab>
      <van-tab title="售后/退款" name="d">内容 4</van-tab>
    </van-tabs>

    <!--  路由出口  -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Myorder",
  data(){
    return{
      activeName:null
    }
  },
  created() {
    this.activeName =  this.$route.params.activeName
  },
  methods:{

}
}
</script>

<style scoped>
#myOrder{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 200;
}
#myOrder .nav{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f5f5f5;
}

#myOrder .nav .back{
  height: 100%;
  line-height: 2.5rem;
}
#myOrder .nav .search{
  width: 60%;
  height: 1.5rem;
  margin-right: 20px;
  position: relative;
}
#myOrder .nav .search input{
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 30px;
  font-size: 0.9rem;
  border-radius: 20px;
  background-color: #f5f5f5;
}
#myOrder .nav .search .searchIcon{
  position: absolute;
  top: 2px;
  left: 10px;
  z-index: 999;
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
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
}
#myOrder .wrapper .wrapperItem .footer .btn{
  margin-left: 10px;
}
</style>