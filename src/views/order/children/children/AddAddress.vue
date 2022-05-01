<template>
  <div id="addAddress">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="添加地址"
        left-text="返回"
        left-arrow
        :fixed=true
        @click-left="onClickLeft"
    />
    <!--收货地址 -->
    <van-address-edit
        :area-list="areaList"

        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import {addADDress} from "../../../../service/api/index.js";
import {mapState} from "vuex";
export default {
  name: "AddAddress",
  data() {
    return {
      areaList:areaList,
      searchResult: [],
    };
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    onClickLeft(){
      this.$router.back();
    },

    async onSave(content) {
      // Toast('save');
      if(this.userInfo.id){
        let res = await addADDress(content.province+content.city+content.county+content.addressDetail, content.name, content.tel, this.userInfo.id)
      }else {
        Toast({
          message: '您未登录账号，请退出重新登录！',
          duration:400
        })
      }


    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },

}
</script>

<style scoped>
  #addAddress{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F5F5;
    z-index: 9999;
  }
</style>