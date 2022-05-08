<template>
  <div id="goodsSearch">
    <!-- 顶部搜索框   -->
    <form action="/">
      <van-search
          v-model="value"
          show-action
          shape="round"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>
    <!-- 价格区间选择   -->
    <div class="priceSection">
      <span>价格区间</span>
      <div  class="priceInput">
        <input type="number" v-model="price1">
        <span style="margin-right: 0.2rem">-</span>
        <input type="number" v-model="price2">
        <van-button type="primary" round  size="small" plain color="#2eba5a" @click="onPrice">确定区间</van-button>
      </div>
    </div>

    <!-- 搜索结果   -->
    <div class="wrapper">
      <div class="wrapperItem" v-for="(goods, index) in goodsList" :key="goods.id">
        <div class="left">

          <img :src="goods.g_picture" alt="" width="110" height="110">
        </div>
        <div class="right">
          <div class="title">
            {{goods.g_name}}
          </div>
          <div class="price">
            {{goods.g_price}}
          </div>
        </div>
      </div>
    </div>

    <!-- 返回   -->
    <div class="back" @click="this.$router.back()">
      <van-icon name="revoke" size="1.25rem"/>
    </div>
  </div>
</template>

<script>
import {searchGoodsName,searchGoodsPrice} from "../../service/api/index.js";
import {Toast} from "vant";
export default {
  name: "goodsSearch",
  data(){
    return{
      //搜索框值
      value: '',
      //价格区间
      price1: null,
      price2: null,
      //商品列表
      goodsList: []
    }
  },
  methods:{
    //点击键盘上的搜索/回车按钮
    async onSearch(val){
      console.log(val)
      let res = await searchGoodsName(val)
      console.log(res);
      if(res.success){
        this.goodsList = res.object.goods;
        Toast({
          message: res.msg,
          duration:  800
        })
      }
      console.log(this.goodsList)
    },
    //点击取消
    onCancel(){
      this.value = ''
    },
    //选择价格区间
    async onPrice(){
      let res = await searchGoodsPrice(this.price1,this.price2)
      console.log(res);
      if(res.success){
        this.goodsList = res.object.goods;
        Toast({
          message: res.msg,
          duration:  800
        })
      }
    }
  }

}
</script>

<style scoped>
#goodsSearch{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

/*
价格区间选择
*/
#goodsSearch  .priceSection{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  font-size: 0.8rem;
  padding: 0 0.5rem;
  height: 2.5rem;
}
#goodsSearch  .priceSection  .priceInput{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#goodsSearch  .priceSection  .priceInput input{
  width: 5rem;
  height: 1.5rem;
  display: inline-block;
  margin-right: 0.2rem;
  background-color: #F5F5F5;
  border-radius: 0.5rem;
  padding: 0  0.5rem;
}

/*
搜索结果
*/
#goodsSearch .wrapper{
  width: 100%;
  margin-top: 0.2rem;
}
#goodsSearch .wrapper .wrapperItem{
  width: 100%;
  background-color: #fff;
  display: flex;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.3rem;
}
#goodsSearch .wrapper .wrapperItem .left{
  padding-top: 1rem;
  border-radius: 0.5rem;
  width: 200px;
}
#goodsSearch .wrapper .wrapperItem .left img{
  border-radius: 0.5rem;
}
#goodsSearch .wrapper .wrapperItem .right{
  width: 20rem;

  margin-left: 1rem;
  overflow: hidden;
}
#goodsSearch .wrapper .wrapperItem .right .title{
  height: 5rem;
  font-size: 0.8rem;
  font-weight: 510;
  padding-top: 1rem;
}
#goodsSearch .wrapper .wrapperItem .right .price{
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: red;

}

/*
返回
*/
#goodsSearch .back{
  width: 2.25rem;
  height: 2.25rem;
  position: fixed;
  bottom: 5rem;
  right: 2.5rem;
  z-index: 9999;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f5f5f5;
  box-shadow: 1px 2px 5px #888888;
}
</style>