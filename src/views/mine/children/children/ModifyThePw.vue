<template>
  <div id="modifyThePw">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="修改密码"
        left-arrow
        :fixed=true
        right-text="保存"
        @click-left="$router.back()"
        @click-right="onClickRight"
    />
    <van-cell-group inset style="margin-top: 3rem">
      <van-field v-model="oldPassword" label="原密码"  />
      <van-field v-model="newPassword" label="新密码"  />
    </van-cell-group>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {modifyThePassword} from "../../../../service/api/index.js";
import {Toast} from "vant";

export default {
  name: "ModifyThePw",
  data(){
    return{
      newPassword:null,
      oldPassword:null
    }
  },
  methods:{
    async onClickRight(){
      let res = await modifyThePassword(this.userInfo.id, '123', '1234')
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
  computed:{
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
#modifyThePw{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F5F5F5;
  z-index: 9999;
}
</style>