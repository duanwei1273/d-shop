<template>
  <div id="myOrder">
    <!-- 头部导航   -->
    <div class="nav">
      <div class="back" @click="this.$router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div class="search">
        <input type="text" placeholder="搜索订单" v-model="value"/>
        <div class="searchIcon" >
          <van-icon name="search" />
        </div>
      </div>
    </div>

    <van-tabs v-model:active="activeName" style="margin-top: 2.5rem" @click-tab="tabChlick">
      <van-tab title="待发货" name="a">
        <!--   待支付订单面板     -->
        <div class="wrapper">
          <div class="wrapperItem" v-for="(order, index) in forders" :key="order.id" >
            <div class="header">
              <span class="titleName">天天特价工厂</span>
              <span class="titleTime"> {{ order.create_time }}</span>
              <span class="titleState">{{order.g_status}}</span>
            </div>
            <div class="content" @click="this.$router.push({name: 'orderDetails',query:{id:order.id,state: activeName}})">
              <div class="contentLift">
                <van-image :src="order.g_picture" width="90" height="90" radius="5" />
              </div>
              <div class="contentRight">
                <div class="goodsName">{{order.g_name}}</div>
                <div class="goodsPriceNum">
                  <div class="goodsPrice">{{$filters.moneyFormat(order.g_price)}}</div>
                  <div class="goodsNum">x{{order.g_count}}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <van-button class="btn"  color="#000" plain size="small" round @click="this.$router.push({name:'goodsRefund',params:{g_name:order.g_name,g_picture: order.g_picture,g_price: order.g_price,g_count: order.g_count,og_id:order.og_id}})">申请退款</van-button>
              <van-button class="btn"  color="#ff4200" plain size="small" round @click="this.$router.push({name: 'orderDetails',query:{id:order.id,state: activeName}})">订单详情</van-button>
            </div>
          </div>

        </div>
      </van-tab>
      <van-tab title="待收货" name="b">

        <div class="wrapper">
          <div class="wrapperItem" v-for="(order, index) in lorders" :key="order.id" >
            <div class="header">
              <span class="titleName">天天特价工厂</span>
              <span class="titleTime"> {{ order.create_time }}</span>
              <span class="titleState">{{order.g_status}}</span>
            </div>
            <div class="content" @click="this.$router.push({name: 'orderDetails',query:{id:order.id,state: activeName}})">
              <div class="contentLift">
                <van-image :src="order.g_picture" width="90" height="90" radius="5" />
              </div>
              <div class="contentRight">
                <div class="goodsName">{{order.g_name}}</div>
                <div class="goodsPriceNum">
                  <div class="goodsPrice">{{$filters.moneyFormat(order.g_price)}}</div>
                  <div class="goodsNum">x{{order.g_count}}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <!--              <van-button class="btn"  color="#000" plain size="small" round>查看物流</van-button>-->
              <van-button class="btn"  color="#ff4200" plain size="small" round @click="sure(order.og_id)">确认收货</van-button>
            </div>
          </div>

        </div>


      </van-tab>
      <van-tab title="待评价" name="c">
        <div class="wrapper">
          <div class="wrapperItem"  v-for="(item, index) in evaluate" :key="item.id">
            <div class="header">
              <span class="titleName">天天特价工厂</span>
              <span class="titleTime"> {{item.create_time}} </span>
              <span class="titleState">{{item.g_status}}</span>
            </div>
            <div class="content" >
              <div class="contentLift">
                <van-image :src="item.g_picture" width="90" height="90" radius="5" />
              </div>
              <div class="contentRight">
                <div class="goodsName">{{item.g_name}}</div>
                <div class="goodsPriceNum">
                  <div class="goodsPrice">{{item.g_price}}</div>
<!--                  <div class="goodsNum">x1</div>-->
                </div>
              </div>
            </div>
            <div class="footer">
              <van-button class="btn"  color="red" plain size="small" round @click="this.$router.push({name: 'evaluate',params:{id: item.og_id, g_id: item.g_id}})">去评价</van-button>
            </div>
          </div>

        </div>
      </van-tab>
      <van-tab title="售后/退款" name="d">
        <div class="wrapper">
          <div class="wrapperItem" v-for="(order, index) in sorders" :key="order.id" >
            <div class="header">
              <span class="titleName">天天特价工厂</span>
              <span class="titleTime"> {{ order.create_time }}</span>
              <span class="titleState">{{order.order_status}}</span>
            </div>
            <div class="content" @click="this.$router.push({name: 'refundDetails',query:{id:order.id}})">
              <div class="contentLift">
                <van-image :src="order.g_picture" width="90" height="90" radius="5" />
              </div>
              <div class="contentRight">
                <div class="goodsName">{{order.g_name}}</div>
                <div class="goodsPriceNum">
                  <div class="goodsPrice">{{$filters.moneyFormat(order.g_price)}}</div>
                  <div class="goodsNum">x{{order.g_count}}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <van-button class="btn"  color="#000" plain size="small" round >撤销申请</van-button>
            </div>
          </div>

        </div>
      </van-tab>
<!--      <van-tab title="搜索结果" name="e">-->

<!--        <div class="wrapper">-->
<!--          <div class="wrapperItem" v-for="(order, index) in forders" :key="order.id" >-->
<!--            <div class="header">-->
<!--              <span class="titleName">天天特价工厂</span>-->
<!--              <span class="titleTime"> {{ order.create_time }}</span>-->
<!--              <span class="titleState">{{order.g_status}}</span>-->
<!--            </div>-->
<!--            <div class="content" @click="this.$router.push({name: 'orderDetails',query:{id:order.id}})">-->
<!--              <div class="contentLift">-->
<!--                <van-image :src="order.g_picture" width="90" height="90" radius="5" />-->
<!--              </div>-->
<!--              <div class="contentRight">-->
<!--                <div class="goodsName">{{order.g_name}}</div>-->
<!--                <div class="goodsPriceNum">-->
<!--                  <div class="goodsPrice">{{$filters.moneyFormat(order.g_price)}}</div>-->
<!--                  <div class="goodsNum">x{{order.g_count}}</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="footer">-->
<!--              &lt;!&ndash;              <van-button class="btn"  color="#000" plain size="small" round>查看物流</van-button>&ndash;&gt;-->
<!--              <van-button class="btn"  color="#ff4200" plain size="small" round @click="sure(order.id)">确认收货</van-button>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash;          <div class="wrapperItem">&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="header">&ndash;&gt;-->
<!--          &lt;!&ndash;              <span class="titleName">天天特价工厂</span>&ndash;&gt;-->
<!--          &lt;!&ndash;              <span class="titleState">待支付</span>&ndash;&gt;-->
<!--          &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="content">&ndash;&gt;-->
<!--          &lt;!&ndash;              <div class="contentLift">&ndash;&gt;-->
<!--          &lt;!&ndash;                <van-image src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="90" height="90" radius="5" />&ndash;&gt;-->
<!--          &lt;!&ndash;              </div>&ndash;&gt;-->
<!--          &lt;!&ndash;              <div class="contentRight">&ndash;&gt;-->
<!--          &lt;!&ndash;                <div class="goodsName">篮球短裤男士夏季大码运动</div>&ndash;&gt;-->
<!--          &lt;!&ndash;                <div class="goodsPriceNum">&ndash;&gt;-->
<!--          &lt;!&ndash;                  <div class="goodsPrice">￥31.90</div>&ndash;&gt;-->
<!--          &lt;!&ndash;                  <div class="goodsNum">x1</div>&ndash;&gt;-->
<!--          &lt;!&ndash;                </div>&ndash;&gt;-->
<!--          &lt;!&ndash;              </div>&ndash;&gt;-->
<!--          &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="footer">&ndash;&gt;-->
<!--          &lt;!&ndash;              <van-button class="btn" color="#000" plain size="small" round>延长收货</van-button>&ndash;&gt;-->
<!--          &lt;!&ndash;              <van-button class="btn"  color="#000" plain size="small" round>查看物流</van-button>&ndash;&gt;-->
<!--          &lt;!&ndash;              <van-button class="btn"  color="#ff4200" plain size="small" round>确认收货</van-button>&ndash;&gt;-->
<!--          &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->
<!--      </van-tab>-->
    </van-tabs>

    <!--  路由出口  -->
    <router-view/>
  </div>
</template>

<script>
import {stateQuerOrder,sureGoods} from "../../../service/api/index.js";
import {mapState} from "vuex";
import {Toast} from "vant";

export default {
  name: "Myorder",
  data(){
    return{
      //状态
      activeName:'a',
      //代发货订单数组
      forders:[],
      //待收货订单数组
      lorders: [],
      //售后退款订单数组
      sorders: [],
      //待评价数组
      evaluate: [],
      //输入框
      value: ''
    }
  },
  created() {
    this.activeName =  this.$route.params.activeName
  },
  mounted() {
    this.getOrder();
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    //获取订单数据
    async getOrder(){
      let state = ''
      state = '待发货'
      let fres = await stateQuerOrder(this.userInfo.id, state)
      console.log(fres);

      if(fres.success) {
        this.forders = fres.object.orders;
      }
      state = '待收货'
      let lres = await stateQuerOrder(this.userInfo.id, state)
      if(lres.success) {
        this.lorders = lres.object.orders;
      }



      state = '退款中'
      let sres = await stateQuerOrder(this.userInfo.id, state)
      if(sres.success){
        this.sorders = sres.object.orders;
      }
      state = '待评价'
      let evaluates = await stateQuerOrder(this.userInfo.id, state)
      if(sres.success){
        this.evaluate = evaluates.object.orders;
      }
      console.log(this.evaluate);

    },
    //点击tab
    tabChlick(){
      console.log('点击')
    },
    //确认收货
    async sure(og_id){

      let res = await sureGoods(og_id)
      if(res.success){
        Toast({
          message: res.msg,
          duration: 500
        })
        this.$router.go(0)
      }
    }

  }
}
</script>

<style scoped>
#myOrder{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 200;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow-y:scroll;

}
#myOrder::-webkit-scrollbar {
  display: none;
}

#myOrder .nav{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
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
#myOrder .wrapper .wrapperItem .header .titleTime{
  font-size: 0.5rem;
  color: #808080;
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
  white-space: nowrap;
  text-overflow: ellipsis;
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