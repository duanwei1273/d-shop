<template>
  <div id="goodsContent">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="您购物的商品"
        left-text="返回"
        left-arrow
        :fixed=true
        @click-left="this.$router.back()"
    />

    <div class="wrapper">
      <div class="wrapperItem" v-for="(good,index) in goods" :key="good.id">
        <div class="left">

          <img :src="good.small_image" alt="" width="110" height="110">
        </div>
        <div class="right">
          <div class="title">
            {{good.name}}
          </div>
          <div class="price">
            {{good.price}}
          </div>
          <div class="num">
            x{{good.num}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "GoodsContent",
  data(){
    return{
      //商品
      goods: []
    }
  },
  computed:{
    ...mapState(['shopCart'])
  },
  mounted() {
    this.getGoodsData();
  },
  methods:{
    //获取商品数据
    getGoodsData(){
      for(let key in this.shopCart){
        if(this.shopCart[key].checked){
          this.goods.push(this.shopCart[key])
        }
      }
      console.log(this.goods)
    }
  }
}
</script>

<style scoped>
#goodsContent{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  z-index: 200;
}


/*
搜索结果
*/
#goodsContent .wrapper{
  width: 100%;
  margin-top: 2.8rem;
}
#goodsContent .wrapper .wrapperItem{
  width: 100%;
  background-color: #fff;
  display: flex;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.3rem;
}
#goodsContent .wrapper .wrapperItem .left{
  border-radius: 0.5rem;
  width: 200px;
}
#goodsContent .wrapper .wrapperItem .left img{
  border-radius: 0.5rem;
}
#goodsContent .wrapper .wrapperItem .right{
  margin-left: 1rem;
  overflow: hidden;
}
#goodsContent .wrapper .wrapperItem .right .title{
  height: 1.5rem;
  font-size: 0.9rem;
  font-weight: 550;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
#goodsContent .wrapper .wrapperItem .right .price{
  margin-top: 2rem;
  font-size: 0.9rem;
  color: red;
}
#goodsContent .wrapper .wrapperItem .right .num{
  font-size: 0.9rem;
  color: #808080;
}
</style>