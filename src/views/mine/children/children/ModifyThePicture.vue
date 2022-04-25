<template>
  <div id="modifyThePicture">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="上传头像"
        left-arrow
        :fixed=true
        @click-left="$router.back()"
    />
    <div>
      <input type="file" >
      <button @click="afterRead">发送</button>
    </div>

  </div>
</template>

<script>
// import {modifThePicture} from "../../../../service/api/index.js";
import axios from "axios";

export default {
  name: "ModifyThePicture",
  data(){
    return{
      file: null
    }
  },
  methods: {
    async afterRead(file){
      console.log(file);

      let forms = new FormData()
      let configs = {
        headers:{'Content-Type': 'multipart/form-data'}
      }
      forms.append('file',file);
      forms.append('abc','abc');
      await axios.post('http://192.168.0.109:8888/user/image',forms,configs).then(res=>{
        console.log(res);
      })
      // console.log(res);
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