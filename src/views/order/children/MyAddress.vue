<template>
  <div id="myaddress">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="我的地址"
        left-text="返回"
        left-arrow
        right-text="完成"
        :fixed=true
        @click-left="onClickLeft"
        @click-right="chooseOver"
    />
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
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
import {getAllAddress} from "../../../service/api/index.js";
import {mapState} from "vuex";
// import eventBus from "../eventbus.js";
export default {
  name: "MyAddress",
  data() {
    return {
      chosenAddressId: 0,
      list: [],

    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted() {
    // this.$router.go(0)
    this.getAddress();
  },
  methods: {
    //回退
    onClickLeft(){
      this.$router.back();
    },
    //新增地址
    onAdd(){
      // Toast('新增地址');
      this.$router.push({
        path: '/confirmOrder/myaddress/addAddress'
      })
    },
    //修改地址
    onEdit(item, index){
      // Toast('编辑地址:' + index);
      console.log(item,index)
      this.$router.push({
        name: 'editAddress',
        params:{
          id: item.id,
          name: item.name,
          address: item.address,
          tel: item.tel,
          aid: item.aid,
          areaCode: item.areaCode
        },
      })
    },

    //选择地址
    // chooseAdress(content){
    //   // console.log(content);
    //   this.$router.push({name: 'order',params: content})
    // },
    //选择地址完成
    chooseOver(){
      // console.log(this.chosenAddressId)
      // console.log(this.list[this.chosenAddressId])
      this.$router.push({name: 'order',params: this.list[this.chosenAddressId]})
    },


    //获取所有地址信息
    async getAddress(){
      let res = await getAllAddress(this.userInfo.id)
      if(res.success){
        res.object.address.forEach((address, index)=>{
          this.list.push({
            id: index,
            name: address.consignee,
            address: address.address,
            tel: address.phone,
            aid: address.id,
            areaCode: address.areaCode
          })
        })
      }
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