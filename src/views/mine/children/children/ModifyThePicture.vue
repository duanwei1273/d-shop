<template>
  <div id="modifyThePicture">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="上传头像"
        right-text="保存"
        left-arrow
        :fixed=true
        @click-left="$router.back()"
        @click-right="modifyPic"
    />
    <div style="margin-top: 3rem">
      <van-uploader :after-read="afterRead" multiple />
    </div>

  </div>
</template>

<script>
// import {modifThePicture} from "../../../../service/api/index.js";
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "ModifyThePicture",
  data(){
    return{
      file: null,
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    afterRead(file){
      // console.log(file);
      this.file = file;
      // console.log(res);
    },
    //修改
    async modifyPic(){
      let forms = new FormData()

      forms.append('file',this.file.file);
      forms.append('id',this.userInfo.id)
      await axios.post('http://192.168.0.104:8887/user/avatar',forms,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      ).then(res=>{
        console.log(res);
      })
    }

  }
}
</script>

<style scoped>
#modifyThePicture{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  z-index: 999;
}
</style>