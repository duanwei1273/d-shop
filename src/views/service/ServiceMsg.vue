<template>
  <div id="msg">
    <van-nav-bar
        title="在线客服"
        left-text="返回"
        left-arrow
        :fixed="true"
        @click-left="this.$router.back()"
    />
    <div class="chatlist">
<!--      <p class="time"><span>10:53</span></p>-->
      <div :class="{chatin: msg.state === 'in', chatout: msg.state ===  'out'}" v-for="(msg, index) in msgList" :key="msg"><!-- 客服 -->
        <img v-if="msg.state === 'in'" src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg">
        <img v-else :src="userInfo.avatar">
        <span>{{msg.msg}}</span>
      </div>
<!--      <p class="time"><span>11:01</span></p>-->
<!--      <div class="chatout">&lt;!&ndash; 询问 &ndash;&gt;-->
<!--        <img src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg">-->
<!--        <span>你好，请问什么时候发货</span>-->
<!--      </div>-->
    </div>



    <div class="msgInput">
      <input type="text"  v-model="message"/>
<!--      <van-button class="btn" color="#808080" round @click="openSocket">登录</van-button>-->
      <van-button class="btn" color="#808080" round @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ServiceMsg",
  data(){
    return{
      toUserId:1,
      message: '',
      userId: 2,
      //收信息列表
      msgList: [
        {
          msg: '亲，需要咨询什么问题？',
          state: 'in'

        }
      ]
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted() {
    this.openSocket()
  },
  methods:{
    openSocket() {
      let that = this;
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
        let socketUrl =
            "ws://124.222.138.52:8887/mall/services/" + this.userId;
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
        console.log(socketUrl);
        if (this.socket != null) {
          this.socket.close();
          this.socket = null;
        }
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket.onopen = function() {
          console.log("websocket已打开");
          //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        this.socket.onmessage = function(msg) {
          console.log(msg);
          //发现消息进入    开始处理前端触发逻辑
          that.msgList.push({
            msg: msg.data,
            state: "in"
          })
        };
        //关闭事件
        this.socket.onclose = function() {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
          console.log("websocket发生了错误");
        };
      }
    },
    sendMessage() {
      let timeShape = Date.now();
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        console.log(
            '{"toUserId":"'+ this.toUserId +'","'+ this.message +'":"消息内容"}'
        );
        this.socket.send('{"toUserId":"'+ this.toUserId +'","message":"'+ this.message +'"}');
        this.msgList.push({
          msg: this.message,
          state:  'out'
        })
        this.message = ''
      }
    },
  }
}
</script>

<style scoped>
#msg{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
}
.msgInput{
  width: 100%;
  height: 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #f5f5f5;
}
.msgInput input{
  width: 70%;
  height: 2rem;
  margin-right: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
}
.msgInput .btn{
  height: 2rem;
  margin-left: 20px;
}

.chatlist{margin-top:44px;padding: 0 12px;overflow-y:scroll;padding-bottom: 3.5rem;
  background-color: #f5f5f5; }
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