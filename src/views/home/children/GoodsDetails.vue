<template>
  <div id="goodsDetails">
    <van-nav-bar
        class="bar"
        left-arrow
        @click-left="this.$router.back()"
    />
    <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in imgs" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <div class="goodsDetails">
          <div class="price">
            ￥{{goods.g_price}}
            <span class="tips">/每件</span>
          </div>
          <div class="details">
            {{goods.g_name}}
          </div>
        </div>
      </van-cell>
    </van-cell-group>


    <div class="warpper">
      <div class="item" >
        <p @click="showSelecet"><span>选择</span>鞋码</p>
        <div class="goods">fasdasfasdfsadf </div>
        <div class="goods">dasfsdafasdfdas</div>
        <div class="icons" >
          <van-icon name="arrow" />
        </div>
      <van-popup v-model:show="showSele" position="bottom" round :style="{ height: '50%'}">
        
      </van-popup>
      </div>
      <div  class="item">
        <p ><span>发货</span>江苏苏州&nbsp;|&nbsp;快递：免运费</p>
        <p id="x1"><span id="peison">配送至：岳阳&nbsp;岳阳楼&nbsp;奇家岭</span></p>
<!--        <div class="icons">-->
<!--          <van-icon name="arrow" />-->
<!--        </div>-->
      </div>
      <div class="item">
        <p @click="showSecurity"><span>保障</span>7天无理由</p>
        <div class="icons">
          <van-icon name="arrow" />
        </div>
        <van-popup v-model:show="showSec" position="bottom" round :style="{ height: '50%'}">
          <div class="showSecContent">
            <div class="header">
              <h4>基础服务</h4>
            </div>
            <div class="content">
              <div class="item">
                <span class="itemIcon">
                  <van-icon name="passed" color="red" />
                </span>
                <span class="itemContent">7天无理由</span>
              </div>
              <div class="item">
                <span class="itemIcon">
                  <van-icon name="passed" color="red" />
                </span>
                <span class="itemContent">保价服务</span>
              </div>
              <div class="item">
                <span class="itemIcon">
                  <van-icon name="passed" color="red" />
                </span>
                <span class="itemContent">退货运费险</span>
              </div>
              <div class="item">
                <span class="itemIcon">
                  <van-icon name="passed" color="red" />
                </span>
                <span class="itemContent">急速退款</span>
              </div>
              <div class="item">
                <span class="itemIcon">
                  <van-icon name="passed" color="red" />
                </span>
                <span class="itemContent">假一赔四</span>
              </div>
            </div>
          </div>
        </van-popup>
      </div>
      <div class="item">
        <p @click="showParameter"><span>参数</span>生产日期 生产日期许可证编号</p>
        <div class="icons">
          <van-icon name="arrow" />
        </div>
        <van-popup v-model:show="showPar" position="bottom" round :style="{ height: '80%'}">
          <div class="showParContent">
            <div class="header">
              <h4>产品参数</h4>
            </div>
            <div class="content">
              <div class="item">
                <span class="itemTitle">品牌</span>
                <span class="itemContent">速浪</span>

              </div>
<!--              <van-divider />-->
              <div class="item">
                <span class="itemTitle">尺码</span>
                <span class="itemContent">S M L XL XXL XXXL</span>
              </div>
              <div class="item">
                <span class="itemTitle">适用性别</span>
                <span class="itemContent">男</span>
              </div>
              <div class="item">
                <span class="itemTitle">上市时间</span>
                <span class="itemContent">2021年夏季</span>
              </div>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
    <!-- 评论   -->
    <div class="comment">
      <div class="commentItem" v-for="(item, index) in commentList" :key="item.id">
        <div class="header">
          <div><img :src="item.avatar" alt=""  width="30" height="30" style="border-radius: 50%;"></div>
          <div class="commentName">zzz</div>
        </div>
        <div class="commentContent">
          <div class="score">
            <div class="scoreTitle">
              评分
            </div>
            <van-rate v-model="item.grade" readonly />

          </div>
          <div class="text"> {{item.content}}</div>
        </div>
        <div class="timeShow">
          {{item.c_time}}
        </div>
      </div>
    </div>





    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
    </van-action-bar>

  </div>
</template>

<script>
import {idGetGoods,idGetcommentary} from "../../../service/api/index.js";

export default {
  name: "GoodsDetails",
  data(){
    return{
      images:[
        'https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
      ],
      //是否弹出选择
      showSele: false,
      //是否弹出保障
      showSec: false,
      //是否弹出参数
      showPar: false,
      //评分
      score: 2,
      //商品数据
      goods: {},
      //图片
      imgs:[],
      //评论列表
      commentList: []
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getGoodsData();
    this.getCommentary();
  },
  methods:{
    //弹出选择
    showSelecet(){
      this.showSele = true
    },
    //弹出保障
    showSecurity(){
      this.showSec = true
    },
    //showParameter
    showParameter(){
      this.showPar = true
    },
    //获取商品数据
    async getGoodsData(){
      let res =  await idGetGoods(this.$route.params.id);
      if(res.success){
        this.goods = res.object.goods;
      }
      for(let index = 0; index < 3 ; index++){
        this.imgs.push(this.goods.g_picture)
      }
    },

    //获取评论
    async getCommentary(){
      let res = await idGetcommentary(this.$route.params.id)
      if(res.success){
        this.commentList = res.object.comment
      }
      console.log(this.commentList);
    }



  }
}
</script>

<style scoped>
#goodsDetails{
  position: fixed;
  overflow-y: scroll;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  z-index: 200;
}
#goodsDetails::-webkit-scrollbar{
  display: none;
}
.bar{
  position: fixed;
  top: 0;
  left: 0;
}

.my-swipe {
  width: 100%;
  height: 12rem;
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;

}

.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
}

.goodsDetails{
  height: 5rem;
  width: 100%;
  padding: 0.5rem 0.5rem;

  background-color: #fff;
}
.goodsDetails .price{
  color: red;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 5px;
}
.goodsDetails .price .tips{
  color: #808080;
  font-size: 0.5rem;
}
.goodsDetails .details{
  color: #000;
  font-size: 0.8rem;
  font-weight: 600;
}



.warpper{
  margin: 10px 0;
  width: 100%;
  /*border-radius: 10px;*/
  background-color: white;
  position: relative;
  z-index: 10;
}
.warpper  .item .icons{
  position: absolute;
  top: 0;
  right: 20px;
}
.warpper  .goods{
  background-color: #dddddd;
  float: left;
  margin-left: 15px;
  position: relative;
  left: 2.5rem;
  line-height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  color: gray;
}
.item{
  font-size: 10px;
  line-height: 30px;
  margin-bottom: 10px;
  position: relative;
}
.item::after{
  content: "";
  display: block;
  clear: both;
}
span{
  color: gray;
  margin: 10px 20px;
}
#x1{
  position: relative;
  left: 2.5rem;
  line-height: 10px;
}
#x1 span{
  line-height: 15px;
  font-size: 1px;
}



/*弹出层样式*/
.showParContent{
  width: 100%;
  height: 100%;
}
.showParContent .header{
  text-align: center;
  font-size: 1rem;
}
.showParContent .content{
  color: #000;
}
.showParContent .content .item{
  display: flex;
  color: #000;

}
.showParContent .content .item .itemTitle{
  color: #000;
  font-size: 0.6rem;
  width: 2.5rem;
}
.showParContent .content .item .itemContent{
  color: #000;
  font-size: 0.6rem;
  margin-left: 2rem;
}


.showSecContent{
  width: 100%;
  height: 100%;
}
.showSecContent .header{
  text-align: center;
  font-size: 1rem;

}


/*
评论
*/
.comment{
  width: 100%;
  background-color: #fff;
  margin-top: 1rem;
  margin-bottom: 3.5rem;
  padding: 0.5rem;
}
.comment .commentItem{

}
.comment .commentItem .header{
  display: flex;
  justify-content: start;
  align-items: center;
}
.comment .commentItem .header .commentName{
  display: inline-block !important;
  margin-left: 0.5rem;
  line-height: 34px;
}
.comment .commentItem  .commentContent{

}
.comment .commentItem  .commentContent .score{
  display: flex;
  margin-top: 0.4rem;
}
.comment .commentItem  .commentContent .score .scoreTitle{
  color: #000;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}
.comment .commentItem  .commentContent .text{
  margin-top: 0.5rem;
  color: #000;
  font-size: 0.8rem;
}
.comment .commentItem .timeShow{
  color: #808080;
  font-size: 0.7rem;
  margin-top: 0.5rem;
  text-align: right;
}
</style>