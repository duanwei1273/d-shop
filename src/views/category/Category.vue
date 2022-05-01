<template>
  <div id="category">
    <!-- 头部搜索框   -->
    <Header/>
    <!-- 内容   -->>
    <div class="listWrapper" v-if="!showLoading">
      <!--  左边导航    -->
      <div class="leftWrapper">
        <ul class="wrapper">
          <li
              class="categoryItem"
              v-for="(cate, index) in categoriesData"
              :class="{selected: currentIndex === index}"
              @click="clickLeftLi(index,cate.id)"
              :key="cate.id"
              ref="menuList"
          >
            <span class="textWrapper">{{cate.name}}</span>
          </li>

        </ul>
      </div>
      <!--  右边内容   -->
      <ContentView
          :categoriesDetailData="categoriesDetailData"
          :AddToCart="AddToCart"
      />
    </div>
    <van-loading v-else class="vloading" type="spinner" color="#1989fa" >正在努力加载中...</van-loading>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue"
import ContentView from "./components/contentView/ContentView.vue"
import BScroll from 'better-scroll'
import {getCategories, getCategoriesDetail, getAllGoods, getGoodsClassify, getCategoryGoods} from './../../service/api/index.js'
import { Toast } from 'vant'
import {mapMutations} from "vuex";
export default {
  name: "Category",
  data(){
    return{
      //是否显示加载图标
      showLoading: true,
      //左边列表数据
      categoriesData: [],
      //右边列表数据
      categoriesDetailData: [],
      //左边item选择与否
      currentIndex: 0
    }
  },
  created() {
    this.initData();
    this.getAllGoodsData();
    this.getgoodsC();
  },
  components: {
    Header,
    ContentView
  },
  methods: {
    ...mapMutations(['ADD_GOODS']),
    AddToCart(goods){
      console.log(goods.id);
      this.ADD_GOODS({
        goodsId: goods.id,
        goodsName: goods.g_name,
        smallImage: goods.g_picture,
        goodsPrice: goods.g_price
      });
      //提示用户

      Toast({
        message: '添加到购物车成功aaa！',
        duration: 800
      });
    },
    //初始化左边分类数据
    async getgoodsC(){
      let res = await getGoodsClassify();
      // console.log(res);
      if(res.success){
        this.categoriesData = res.object.types;
      }
    },


    //初始化有病商品数据
    async getAllGoodsData(){

    },





    //初始化数据界面
    async initData(){
      let leftRes = await getCategories();
      // console.log(leftRes.data.cate);
      if(leftRes.success){
        // this.categoriesData = leftRes.data.cate;
      }

      let rightRes = await getCategoryGoods(1);
      // console.log(rightRes);
      if(rightRes.success){
        this.categoriesDetailData =rightRes.object.goods;
      }
      // console.log(this.categoriesDetailData);


      //隐藏loading框
      this.showLoading = false;

      //初始化滚动框架
      this.$nextTick(() => {
        this.leftScroll = new BScroll('.leftWrapper', {
          probeType: 3,
          click: true,
          scrollY: true,
          tap: true,
          mouseWheel: true
        })
      });
    },

    //左边点击事件
    async clickLeftLi(index,id){
      //改变搜引
      this.currentIndex = index;
      //
      //滚动到对应位置
      let meunLists = this.$refs.menuList;
      let el = meunLists[index];
      this.leftScroll.scrollToElement(el, 300);

      //获取右边数据
      let rightRes = await getCategoryGoods(parseInt(id));

      // console.log(rightRes);
      if(rightRes.success){
        this.categoriesDetailData =rightRes.object.goods;
      }
      // console.log(this.categoriesDetailData);
    }

  }


}
</script>

<style lang="less" scoped>
  #category {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    overflow: hidden;
  }
  .vloading {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
  }

  .listWrapper {
    display: flex;
    position: absolute;
    top: 2.8rem;
    bottom: 3rem;
    width: 100%;
    overflow: hidden;
  }

  .leftWrapper {
    background-color: #F4F4F4;
    width: 5.3125rem;
    flex: 0 0 5.3125rem;
  }


  //nav




  .categoryItem {
    padding: 0.75rem 0;
    border-bottom: solid 1px #E8E9E8;
  }

  .categoryItem .textWrapper {
    line-height: 1.25rem;
    border-left: solid 0.1875rem transparent;
    padding: 0.3125rem 0.6875rem;
    font-size: 0.8125rem;
    color: #666666;
  }
  .categoryItem.selected {
    background: #FFF;
  }

  .categoryItem.selected .textWrapper {
    border-left-color: #3cb963;
    font-weight: bold;
    font-size: 0.875rem;
    color: #333333;
  }

  @media (min-width: 960px) {
    .wrapper {
      border-right: 1px solid #E8E9E8;
    }
    .wrapper .categoryItem {
      background: #fff;
    }
  }
</style>