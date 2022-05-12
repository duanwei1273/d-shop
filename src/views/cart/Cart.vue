<template>
  <div id="cart" v-if="userInfo.id">
    <!--头部区域-->
    <header class="titleWrapper">
      <h4><strong>购物车</strong></h4>
      <button class="clearCart" @click="clearCart()">清空购物车</button>
    </header>
    <div class="contentWrapper">
      <!--中间内容-->
      <main class="contentWrapperList">
        <section style="border-radius: 0.5rem; margin-left: 0.2rem; margin-right: 0.2rem">
          <div class="shopCartListCon" v-for="(goods, index) in shopCart" :key="goods.id">
            <div class="left">
              <a
                  href="javascript:;"
                  class="cartCheckBox"
                  :checked="goods.checked"
                  @click.stop="singerGoodsSelected(goods)"
              ></a>
            </div>
            <div class="center">
              <img :src="goods.small_image" alt="">
            </div>
            <div class="right">
              <a href="#">{{goods.name}}</a>
              <div class="bottomContent">
                <p class="shopPrice">{{ $filters.moneyFormat(goods.price * goods.num) }}</p>
                <div class="shopDeal">
                  <span @click="removeOutCart(goods.id, goods.num,goods.cid)">-</span>
                  <input disabled type="number" v-model="goods.num">
                  <span @click="addToCart(goods.id, goods.name, goods.small_image, goods.price,goods.cid)">+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <!--底部通栏-->
      <div class="tabBar">
        <div class="tabBarLeft">
          <a
              href="javascript:;"
              class="cartCheckBox"
              :checked="isSelectedAll"
              @click.stop="selectedAll(isSelectedAll)"
          ></a>
          <span style="font-size: 16px;">全选</span>
          <div class="selectAll">
            合计：<span class="totalPrice">{{$filters.moneyFormat(totalPrice)}}</span>
          </div>
        </div>
        <div class="tabBarRight">
          <button class="pay" @click="toPay" >去结算({{goodsCount}})</button>
        </div>
      </div>
    </div>
<!--    <button @click="openSocket">点击</button>-->
<!--    <button @click="sendMessage">发送</button>-->
  </div>
  <SelectLogin v-else />
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {Dialog, Toast} from 'vant'
import SelectLogin from "../login/SelectLogin.vue"
import {SELECTED_SINGER_GOODS} from "../../store/mutations-type";

//接口方法
import {addUserGoodsCard, delAllGoodsCard, delUserGoodsCard, getUserGoodsCard,singerGoodsSelected,allCheckGoods} from "../../service/api/index.js";

export default {
  name: "Cart",
  data(){
    return{
      socket:null,
      userId:localStorage.getItem("ms_uuid"),
      toUserId:'1',
      content:'你好1',
      Cid:null
    }
  },

  mounted() {
    this.initGoodsCard();
  },
  computed: {
    ...mapState(['shopCart','userInfo']),
    //选中商品的总件数
    goodsCount(){
      let selectedGoodsCount = 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(goods.checked){
          selectedGoodsCount += 1;
        }
      });
      // return Object.keys(this.shopCart).length;
      return selectedGoodsCount
    },
    //商品是否全选
    isSelectedAll(){
      let tag = this.goodsCount > 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(!goods.checked){
          tag = false;
        }
      });
      return tag;
    },
    //计算商品的总价
    totalPrice(){
      let totalPrice = 0;
      Object.values(this.shopCart).forEach((goods, index)=>{
        if(goods.checked){
          totalPrice += goods.price * goods.num;
        }
      });
      return totalPrice;
    },
  },
  methods: {
    ...mapMutations(['REDUCE_CART','ADD_GOODS','SELECTED_SINGER_GOODS','SELECTED_ALL_GOODS','CLEAR_CART']),
    //初始化购物车数据
    async initGoodsCard(){
      let id = parseInt(this.userInfo.id);
      let res = await getUserGoodsCard(id);
      // console.log(res);
      // console.log(res.object.cards.length);
      // console.log(this.shopCart)
      if(res.success){
        if(res.object.cards.length === 0){
          this.CLEAR_CART();
        }
        res.object.cards.forEach((good,index)=>{
          // console.log(good.checked);
          this.ADD_GOODS({
            goodsId: good.g_id,
            goodsName: good.g_name,
            smallImage: good.g_picture,
            goodsPrice: good.g_price / good.g_nums,
            gNum:good.g_nums,
            cId: good.id,
            checked: good.g_checked,
            isIf: false
          })
        })
      }
    },


    //移除购物车
    async  removeOutCart(goodsId, goodsNum,cId){
      let res = await delUserGoodsCard(cId,goodsNum)
      console.log(res);
      if(goodsNum > 1){
        this.REDUCE_CART({goodsId});

        }else if(goodsNum === 1) {
        //挽留
        Dialog.confirm({
          title: '温馨提示',
          message:
              '确定删除该商品吗？',
        })
            .then(() => {
              this.REDUCE_CART({goodsId});
            })
            .catch(() => {
              //do noting
            });


      }
      },

    //添加1购物车
    async addToCart(goodsId, goodsName, smallImage, goodsPrice,cId){

      let res = await addUserGoodsCard(this.userInfo.id,goodsId)
      console.log(res);

      if(res.success){

        this.ADD_GOODS({
          goodsId,
          goodsName,
          smallImage,
          goodsPrice
        })
      }

    },

    //单个商品选中和取消
    async singerGoodsSelected(goods) {
      let checked = goods.checked;
      console.log(checked);
      if(checked !== null){
        checked = !checked;
      }


      let res = await singerGoodsSelected(goods.cid,checked)
      console.log(res);
      this.SELECTED_SINGER_GOODS({goodsId: goods.id});
    },

    //全选和取消全选
    async selectedAll(isSelected) {
      let res = await allCheckGoods(parseInt(this.userInfo.id ),isSelected)
      console.log(res);
      this.SELECTED_ALL_GOODS({isSelected});
    },

    //清空购物车
    async clearCart(){
      let ids = Array()
      for (let key in this.shopCart){
        ids.push(parseInt(this.shopCart[key].cid))
      }
      console.log(ids);
      let res = delAllGoodsCard(ids);
      console.log(res);

      Dialog.confirm({
        title: '温馨提示',
        message:
            '确定清空所有商品吗？',
      }).then(() => {
        this.CLEAR_CART();
      })
          .catch(() => {
            //do noting
          });
    },


    //去支付
    toPay(){
      if(this.goodsCount < 1){
        Toast({
          message: '请先选择商品后再结算',
          duration: 600
        })
      }else {
        this.$router.push({name:'order',query:{totalPrice: this.totalPrice}})
      }

    },




    openSocket() {
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
        let socketUrl =
            "ws://192.168.0.109:8080/webservice/2//" + this.userId;
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
        console.log(socketUrl);
        if (this.socket != null) {
          this.socket.close();
          this.socket = null;
        }
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket.onopen = function() {
          console.log("websocket已打开");
          //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件  
        this.socket.onmessage = function(msg) {
          console.log(msg);
          //发现消息进入    开始处理前端触发逻辑
        };
        //关闭事件
        this.socket.onclose = function() {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
          console.log("websocket发生了错误");
        };
      }
    },
    sendMessage() {
      let timeShape = Date.now();
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        console.log(
            '{"toUserId":"' +
            this.toUserId +
            '","contentText":"' +
            this.content +
            '"}'
        );
        this.socket.send('{"toUserId":"'+this.toUserId+'","contentText":"'+this.content+'","timeShape":"'+timeShape+'","type":"chat"}');

      }
    },



  },
  components: {
    SelectLogin
  }

}
</script>

<style  scoped>
#cart{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.titleWrapper{
  width: 100%;
  height: 2.6rem;
  background: #fff;
  -webkit-background-size: 0.1rem 4.4rem;
  background-size: 0.1rem 4.4rem;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
}
.titleWrapper .clearCart {
  background-color: transparent;
  position: absolute;
  right: 0.3rem;
  color: red;
  font-size: 0.8rem;
}

.contentWrapper{
  padding-top: 3.5rem;
}

/*列表内容*/
.contentWrapperList{
  padding-bottom: 6rem;
}

.contentWrapperList section{
  background-color: #fff;
}

.cartCheckBox{
  background: url("./images/shop-icon.png ") no-repeat;
  -webkit-background-size: 2.5rem 5rem;
  background-size: 2.5rem 5rem;
  width: 1rem;
  height: 1rem;

}

.cartCheckBox[checked = true]{
  background-position: -1.2rem 0;
}

.shopCartListCon{
  display: flex;
  height: 6rem;
  border-bottom:  0.01rem solid #e0e0e0;
  margin-bottom: 0.7rem;
  padding: 0.5rem 0;
}

.shopCartListCon .left{
  /*background: purple;*/
  flex: 1;
  display: flex;
  /*justify-content: center;*/
}

.shopCartListCon .left a{
  display: inline-block;
  margin-top: 0.8rem;
  margin-left: 0.5rem;
}


.shopCartListCon .center{
  /*background: blue;*/
  flex: 3;
}

.shopCartListCon .center img{
  width: 100%;
  height: 100%;
}

.shopCartListCon .right{
  /*background: orangered;*/
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  position: relative;
}

.shopCartListCon .right a{
  height: 2.2rem;
  line-height: 1.2rem;
  overflow: hidden;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: #000;
}

.shopCartListCon .bottomContent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.shopCartListCon .bottomContent .shopPrice{
  font-size: 0.8rem;
}

.shopCartListCon .right .shopDeal span{
  display: inline-block;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  float: left;
}

.shopCartListCon .right .shopDeal input{
  float: left;
  width: 2rem;
  height: 1.2rem;
  text-align: center;
  margin: 0 0.2rem;
  font-size: 0.8rem;
}

/*底部通栏*/
.tabBar{
  position: fixed;
  left:0;
  bottom:2.7rem;
  width:100%;
  height: 2.5rem;
  background-color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.01rem solid #e0e0e0;
}

.tabBarLeft{
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.tabBarLeft .selectAll{
  margin-left: 1rem;
  font-size: 1rem;
}

.totalPrice{
  color: #E9232C;
}


.tabBarRight .pay{
  width:5rem;
  height: 2rem;
  background-color: #E9232C;
  border-radius: 1rem;
  margin-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #fff;
}
</style>