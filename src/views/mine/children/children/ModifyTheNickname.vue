<template>
  <div id="modifyTheNickname">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="修改昵称"
        left-arrow
        :fixed=true
        right-text="保存"
        @click-left="$router.back()"
        @click-right="onClickRight"
    />
    <van-cell-group inset style="margin-top: 3rem">
      <van-field v-model="nickname" label="昵称" :placeholder="userInfo.nickname" />
    </van-cell-group>
  </div>
</template>

<script>
import {modifyTheNickname} from "../../../../service/api/index.js";
import {mapState} from 'vuex'
import {Toast} from "vant";

export default {
  name: "ModifyTheNickname",
  data(){
    return{
      nickname:null
    }
  },
  methods:{
    async onClickRight(){
      let res = await modifyTheNickname(this.userInfo.id, this.nickname);
      console.log(res);
      if(res.success){
        Toast({
          message: res.msg,
          duration:500
        });
        this.$router.back();
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
#modifyTheNickname{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F5F5F5;
  z-index: 9999;
}
</style>