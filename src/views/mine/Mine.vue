<template>
  <div id="mine">

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
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="personMsg">
            <van-image
                src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                width="4rem"
                height="4rem"
                round
                style="border: 0.1rem solid #fff"
            ></van-image>
            <div class="personInfo">
              <span>林深时见鹿</span>
              <span>微信号：123456</span>
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

  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      orderDta: [
        {
          icon: '',
          title: '待支付'
        },
        {
          icon: '',
          title: '待收货'
        },
        {
          icon: '',
          title: '待评价'
        }
        ,{
          icon: '',
          title: '售后/退款'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  #mine{
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
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