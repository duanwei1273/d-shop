<template>
  <div id="register">
    <h4 style="padding: 12px 0">注册</h4>
    <div  class="registerCenten">
      <form class="formintr">
        <section class="secStyle">
          <input type="text" placeholder="昵称(长度最多为5个汉字或10个字母\数字)" v-model="nickname">
        </section>
        <section class="secStyle">
          <input type="text" placeholder="用户名(长度最多为10个字母\数字)" v-model="username">
        </section>
        <section class="secStyle">
          <input type="password" placeholder="密码(包含数字英文字符中的两种以上长度6-20)" v-model="password">
        </section>
        <section class="secStyle">
          <input type="password" placeholder="确认密码" v-model="rightPassword">
        </section>
        <section class="secStyle">
          <input type="text" placeholder="邮箱" v-model="email">
          <button v-if="!countDown"  class="get-verification" :class="{phone_right: emailRight}" @click="getVerifyCode()">获取验证码</button>
          <button v-else disabled="disabled" class="get-verification">
            已发送({{countDown}}s)
          </button>
        </section>
        <section class="secStyle">
          <input type="number" placeholder="验证码" v-model="code">
        </section>
      </form>

    </div>
    <button class="btn" @click="register()">确认注册</button>
    <button class="btn-back" @click="back()">返回</button>
  </div>
</template>

<script>
import {getEmailCode, emailCodeRegister} from "../../service/api";
import {Toast} from "vant"
export default {
  name: "Register",
  data() {
    return {
      //昵称
      nickname: null,
      //用户名
      username: null,
      //密码
      password: null,
      //确认密码
      rightPassword: null,
      //邮箱
      email: null,
      //倒计时
      countDown: 0,
      //手机验证码
      code: null,
    }
  },
  computed: {
    nicknameRight(){//长度最多为5个汉字或10个字母\数字
      return /^[a-zA-Z0-9]{1,10}|[\x4e00-\x9fa5]{1,5}$/.test(this.nickname)
    },
    usernameRight(){
      return /^[a-zA-Z0-9]{1,10}$/.test(this.username)
    },
    passwordRight(){//密码包含 数字,英文,字符中的两种以上，长度6-20
      return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(this.password)
    },
    rightPasswordRight(){
      return (this.password === this.rightPassword)
    },
    //验证邮箱号码是否正确
    emailRight(){
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)

    },
  },
  methods: {
    back(){
      this.$router.back();
    },
    //获取验证码
    async getVerifyCode(){

      if(this.emailRight){
        this.countDown = 60;
        this.intervalId = setInterval(()=>{
          this.countDown--;
          if(this.countDown === 0){
            clearInterval(this.intervalId);
          }
        },1000)

        let res = await getEmailCode(this.email);
        console.log(res);
      }

    },
    //注册
    async register(){
      if(!this.nickname.trim()){
        Toast({
          message:'请输入昵称',
          duration: 500,
        });
        return;
      }else if(!this.nicknameRight){
        Toast({
          message:'请输入正确的昵称',
          duration: 500,
        });
        return;
      }

      if(!this.username.trim()){
        Toast({
          message:'请输入用户名',
          duration: 500,
        });
        return;
      }else if(!this.usernameRight){
        Toast({
          message:'请输入正确的用户名',
          duration: 500,
        });
        return;
      }

      if(!this.password.trim()){
        Toast({
          message:'请输入密码',
          duration: 500,
        });
        return;
      }else if(!this.passwordRight){
        Toast({
          message:'请输入正确的密码',
          duration: 500,
        });
        return;
      }

      if(!this.rightPassword.trim()){
        Toast({
          message:'请输入密码',
          duration: 500,
        });
        return;
      }else if(!this.rightPasswordRight){
        Toast({
          message:'密码与确认密码不一致',
          duration: 500,
        });
        return;
      }

      if(!this.email.trim()){//没输入任何邮箱号码
        Toast({
          message: '请输入邮箱号码',
          duration: 500
        });
        return;
      }else if(!this.emailRight){//输入邮箱不正确
        Toast({
          message: '请输入正确的邮箱号码',
          duration: 500
        });
        return;
      }

      console.log(this.nickname,this.username,this.password,this.email,this.code);
      //注册
      let res = await emailCodeRegister(this.nickname,this.username,this.password,this.email,this.code.toString())
      console.log(res);
      let tips= res.msg;
      if(res.success){
        Toast({
          message: tips + '返回登录',
          duration: 500
        });
        this.back();
      }else {
        Toast({
          message: tips,
          duration: 500
        })
      }

    }


  },
}
</script>

<style scoped>
#register {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
}
.registerCenten{
  width: 100%;
  height: 60%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.registerCente .formintr {
  width: 100%;
  height: 100%;
}

.registerCenten  .secStyle{
  width: 300px;
  height: 48px;
  margin-bottom: 20px;
  background-color: #fff;
  position: relative;
}
.registerCenten input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}
.get-verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

.phone_right{
  color: #75a342
}

.btn {
  display: block;
  width: 300px;
  height: 42px;
  margin: 30px auto;
  border-radius: 4px;
  background: #75a342;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  order: 0;
  border-style: none;
}
.btn-back {
  display: block;
  width: 300px;
  height: 42px;
  margin: 0 auto;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #75a342;
  color: #75a342;
  text-align: center;
  font-size: 16px;
  line-height: 42px
}
</style>