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
        show-postal

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
export default {
  name: "AddAddress",
  data() {
    return {
      areaList:{},
      searchResult: [],
    };
  },
  methods: {
    onClickLeft(){
      this.$router.back();
    },

    onSave() {
      Toast('save');
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