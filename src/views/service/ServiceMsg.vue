<template>
  <div id="msg">
    <van-nav-bar
        title="在线客服"
        left-text="返回"
        left-arrow
        @click-left="this.$router.back()"
    />
    <div class="chatlist">
      <p class="time"><span>10:53</span></p>
      <div class="chatin"><!-- 客服 -->
        <img src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg">
        <span>您好欢迎使用趣批油:)</span>
      </div>
      <p class="time"><span>11:01</span></p>
      <div class="chatout"><!-- 询问 -->
        <img src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg">
        <span>你好，请问什么时候发货</span>
      </div>
    </div>



    <div class="msgInput">
      <input type="text"  />
      <van-button class="btn" color="#808080" round>发送</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServiceMsg"
}
</script>

<style scoped>
#msg{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
}
.msgInput{
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.msgInput input{
  width: 70%;
  height: 2rem;
  margin-right: 20px;
  border-radius: 5px;
}
.msgInput .btn{
  height: 2rem;
  margin-left: 20px;
}

.chatlist{margin-top:44px;padding:12px;}
.chatlist p.time{margin:0;text-align: center;}
.chatlist p.time span{padding:0 18px;display:inline-block;font-size:9pt;color: #fff;border-radius: 2px;background-color: #dcdcdc;}
.chatlist .chatout,.chatlist .chatin{margin:10px 0;}
.chatlist .chatout{text-align:right;}
.chatlist .chatout img{float:right;width:40px;height:40px;border-radius:50%;margin: 0 0 0 10px;}
.chatlist .chatout span{display: inline-block;position:relative;padding:10px;max-width: calc(100% - 90px);min-height: 40px;line-height:20px;font-size: 13px;word-break: break-all;border-radius: 4px;background-color: #ff0000;color:#fff;}
.chatlist .chatout span:before{content: " ";position: absolute;top: 9px;left: 100%;border: 6px solid transparent;border-left-color: #ff0000;}
.chatlist .chatin img{float:left;width:40px;height:40px;border-radius:50%;margin: 0 10px 0 0;}
.chatlist .chatin span{display: inline-block;position:relative;padding:10px;max-width: calc(100% - 90px);min-height: 40px;line-height:20px;font-size: 13px;word-break: break-all;border-radius: 4px;text-align: left;background-color: #fafafa;}
.chatlist .chatin span:before{content: " ";position: absolute;top: 9px;right: 100%;border: 6px solid transparent;border-right-color: #fafafa;}


</style>