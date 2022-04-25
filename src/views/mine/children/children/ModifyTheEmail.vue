<template>
  <div id="modifyTheEmail">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="修改邮箱"
        left-arrow
        :fixed=true
        right-text="保存"
        @click-left="$router.back()"
        @click-right="onClickRight"
    />
    <van-cell-group inset style="margin-top: 3rem">
      <van-field v-model="email" label="邮箱" :placeholder="userInfo.email" />
    </van-cell-group>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {modifyTheEmail} from "../../../../service/api/index.js";
import {Toast} from "vant";

export default {
  name: "ModifyTheEmail",
  data(){
    return{
      email:null
    }
  },
  methods:{
    async onClickRight(){
      let res = await modifyTheEmail(this.userInfo.id, this.email);
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
#modifyTheEmail{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F5F5F5;
  z-index: 9999;
}
</style>