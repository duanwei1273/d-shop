<template>
  <div id="eidAddress">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="修改地址"
        left-text="返回"
        left-arrow
        :fixed=true
        @click-left="onClickLeft"
    />

    <van-address-edit
        :area-list="areaList"
        :name="name"
        :address-info="addressInfo"
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
import { areaList } from '@vant/area-data';
import {editAddress, delAddress} from "../../../../service/api/index.js";
import {mapState} from "vuex";

export default {
  name: "EidAddress",
  data() {
    return {
      name: 'aaa',
      areaList:areaList,
      searchResult: [],
      addressInfo:{}
    };
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted() {
    console.log(this.$route.params);
    this.getUserAddress();
  },
  methods: {
    onClickLeft(){
      this.$router.back();
    },
    //保存上传地址
    async onSave(content) {
      // Toast('save');
      let res = await editAddress(this.$route.params.aid,content.addressDetail,content.name,content.tel,content.areaCode,this.userInfo.id);
      if (res.success){
        Toast({
          message: '修改成功',
          duration: 400
        })
        this.$router.back()
      }
    },
    //删除
    async onDelete(content) {
      let res = await delAddress(this.$route.params.aid)
      if (res.success){
        Toast({
          message: '已删除',
          duration: 400
        })
        this.$router.go(-1)
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

    //获取用户收货地址
    getUserAddress(){
      let addressS = this.$route.params;
      console.log(addressS);
      this.addressInfo = {
        id: addressS.id,
        name: addressS.name,
        areaCode: addressS.areaCode,
        tel: addressS.tel,
        addressDetail: addressS.address
      }
      console.log(this.addressInfo);

    }
    //
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