<template>
  <div id="eidAddress">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="添加地址"
        left-text="返回"
        left-arrow
        :fixed=true
        @click-left="onClickLeft"
    />

    <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
    />
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "EidAddress",
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
    onDelete() {
      Toast('delete');
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
  #eidAddress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F5F5;
    z-index: 9999;
  }
</style>