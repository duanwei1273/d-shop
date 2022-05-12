<template>
  <div id="evaluate">
    <van-nav-bar
        title="发表评论"
        left-arrow
        right-text="发布"
        :fixed=true
        @click-left="$router.back()"
        @click-right="comment"
    />

    <div class="content">
      <div class="img">
        <img :src="goods.g_picture" alt="" width="50" height="50">
      </div>
      <div class="name">
        {{goods.g_name}}
      </div>
      <div  class="Grade">
        <div class="title">评分</div>
        <van-rate v-model="value" @change="onChange" />
      </div>
      <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请从多个角度评价宝贝，可以帮助更多想买的人"
          show-word-limit
      />
    </div>
  </div>
</template>

<script>
import {idGetGoods,commentary} from "../../../../service/api/index.js";
import {mapState} from "vuex";
import {Toast} from "vant";

export default {
  name: "Evaluate",
  data(){
    return{
        //评价分数
      value: 0,
      //评论
      message: '',
      //商品信息
      goods: {}
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getGoodsData();
  },
  methods:{
    //触摸评价等级
    onChange(value){
      this.value  = value
    },

    //获取商品数据
    async getGoodsData(){
      let res = await idGetGoods(this.$route.params.g_id);
      console.log(res);
      if(res.success){
        this.goods = res.object.goods;
      }
    },
    //确认发布
    async comment(){
      let res = await commentary(this.$route.params.id,this.userInfo.id,this.$route.params.g_id,this.message,this.value);
      console.log(res);
      if(res.success){
        Toast({
          message:  res.msg,
          duration: 500
        })
        this.$router.back();
      }
    }
  }
}
</script>

<style scoped>
#evaluate{
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

.content{
  width: 95%;
  height: 200px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.content .img{
  position: relative;
  top:-20px;
  box-shadow: 0px 0px 5px #888888;
}
.content .img img{

}
.content .name{
  font-size: 0.8rem;
  color: #808080;
}
.content .Grade{
  display: flex;
  font-size: 0.9rem;
}
.content .Grade .title{
  margin-right: 0.2rem;
}



</style>