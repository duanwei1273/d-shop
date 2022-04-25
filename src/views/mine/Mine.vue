<template>
  <div id="mine" v-if="userInfo.id">

    <!-- 导航   -->
    <van-nav-bar
        title="我的"
        :fixed=true
        :border=false
    />

    <van-cell-group style="margin-top: 2.4rem">
      <van-cell
          is-link
          :center=true
          style="background-color: #3bba63; color: #fff"
          @click="$router.push('/dashboard/mine/userCenter')"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="personMsg">
            <van-image
                :src="userInfo.avatar"
                width="4rem"
                height="4rem"
                round
                style="border: 0.1rem solid #fff"
            ></van-image>
            <div class="personInfo">
              <img
                  v-show="userInfo.vip"
                  src="../../../public/images/VIP.png"
                  width="30"
              />
              <span>{{userInfo.nickname}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell
          title="我的订单"
          value="查看所有订单"
          is-link
          icon="bill"
      ></van-cell>
      <van-grid>
        <van-grid-item
            v-for="(order, index) in orderDta"
            :key="index"
            :icon="order.icon"
            :text="order.title"
        />
      </van-grid>

    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="我的优惠卷" value="1张" is-link icon="shop"></van-cell>
      <van-cell title="我的收货地址"  is-link icon="column"></van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="联系客服" value="客服时间07:00-22:00" is-link icon="service"></van-cell>
      <van-cell title="意见反馈"  is-link icon="chat"></van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="云商城" value="下载APP体验更佳" is-link icon="gift-card"></van-cell>
    </van-cell-group>

    <!--  路由出口！  -->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }" >
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
  <SelectLogin v-else />
</template>

<script>
import {mapState} from 'vuex'
import SelectLogin from "../login/SelectLogin.vue"
export default {
  name: "Mine",
  data() {
    return {
      orderDta: [
        {
          icon: 'balance-list-o',
          title: '待支付'
        },
        {
          icon: 'point-gift-o',
          title: '待收货'
        },
        {
          icon: 'smile-comment-o',
          title: '待评价'
        }
        ,{
          icon: 'cash-back-record',
          title: '售后/退款'
        }
      ],

    }
  },
  computed: {
    ...mapState(['userInfo'])

  },
  components: {
    SelectLogin
  }
}
</script>

<style scoped>
  #mine{
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
  /*转场动画*/
  .slide-fade-enter-active {
    transition: all 0.3s ease-in-out;
    /*transform: translate3d(-2rem,0,0);*/
  }

  .slide-fade-leave-active {
    transition: all 0.3s;
    transform: translate3d(2rem,0,0);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-to, .slide-fade-leave-from {
    opacity: 1;
  }

  ::v-deep .van-nav-bar__content {
    background-color: #3bba63;
  }
  ::v-deep .van-nav-bar__title {
    color: #fff;
    font-size: 1rem;
  }
  ::v-deep .van-icon-bill {
    color: orange;
    font-size: 1.2rem;
  }
  ::v-deep .van-icon-shop {
    color: orange;
    font-size: 1.2rem;
  }
  ::v-deep .van-icon-column {
    color: orange;
    font-size: 1.2rem;
  }
  ::v-deep .van-icon-service {
    color: orange;
    font-size: 1.2rem;
  }
  ::v-deep .van-icon-chat {
    color: orange;
    font-size: 1.2rem;
  }
  ::v-deep .van-icon-gift-card {
    color: orange;
    font-size: 1.2rem;
  }

  ::v-deep .van-icon-vip-card{
    color: red;
    font-size: 1.5rem;
  }

  .personMsg {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .personInfo {
    display: flex;
    flex-direction: column;
    margin-left: 0.8rem;
  }



  
</style>