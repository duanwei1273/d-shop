<template>
  <div id="myaddress">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="我的地址"
        left-text="返回"
        left-arrow
        :fixed=true
        @click-left="onClickLeft"
    />
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        style="margin-top: 3rem"
    />

    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }" >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "MyAddress",
  data() {
    return {
      chosenAddressId: 2,
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ]
    }
  },
  methods: {
    onClickLeft(){
      this.$router.back();
    },
    onAdd(){
      // Toast('新增地址');
      this.$router.push({
        path: '/confirmOrder/myaddress/addAddress'
      })
    },
    onEdit(item, index){
      // Toast('编辑地址:' + index);
      this.$router.push({
        path: '/confirmOrder/myaddress/editAddress'
      })
    }
  }

}
</script>

<style scoped>
#myaddress {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  z-index: 200;
}

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
</style>