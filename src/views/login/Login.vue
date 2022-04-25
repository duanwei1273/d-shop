<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt="" width="300">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">邮箱登录</a>
          <a href="javascript:;" :class="{current: !loginMode}"  @click="dealLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="text" maxlength="20" placeholder="邮箱号" v-model="email">
              <button v-if="!countDown"  class="get-verification" :class="{phone_right: emailRight}" @click="getVerifyCode()">获取验证码</button>
              <button v-else disabled="disabled" class="get-verification">
                  已发送({{countDown}}s)
              </button>
            </section>
            <section class="login-verification">
              <input type="number" maxlength="8" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login-hint">
              温馨提示：未注册小撩买菜的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="20" placeholder="用户名" v-model="username">
              </section>
              <section class="login-verification">
                <input v-if="pwdMode"  type="password" maxlength="20" placeholder="密码" autocomplete="off" v-model="password" />
                <input v-else  type="text" maxlength="20" placeholder="密码" autocomplete="off" v-model="password" />
                <div class="switch-show">
                  <img src="./images/hide_pwd.png" :class="{on: pwdMode}" @click.prevent="dealPwdMode(false)" alt="" width="20">
                  <img src="./images/show_pwd.png" :class="{on: !pwdMode}" @click.prevent="dealPwdMode(true)" alt="" width="20">
                </div>
              </section>
<!--              <section class="login-message">-->
<!--                <input type="text" maxlength="4" placeholder="验证码">-->
<!--                <img-->
<!--                    class="get-verification"-->
<!--                    src=""-->
<!--                    alt="captcha"-->
<!--                >-->
<!--              </section>-->
            </section>
          </div>
        </form>
        <button class="login-submit" @click="login()">登录</button>
        <button class="login-back" @click="back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getPhoneCode, phoneCodeLogin, passwordLogin, getEmailCode, emailCodeLogin} from './../../service/api/index'
import {mapActions, mapMutations} from 'vuex'
import {Toast} from "vant"
export default {
  name: "Login",
  data(){
    return {
      //登录模式
      loginMode: true,
      //手机号码
      email: null,
      //倒计时
      countDown: 0,
      //手机验证码
      code: null,
      //输入账号
      username: null,
      //输入密码
      password: null,
      //用户信息
      userInfo: null,
      // true密文 false明文
      pwdMode: true,

    }
  },
  computed: {
    //验证手机号码是否正确
    emailRight(){
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)

    },
    codeRight(){
      return /^\d{6}$/gi.test(this.code)
    },
    usernameRight(){
      return /^[a-zA-Z0-9]{1,10}$/.test(this.username)
    },
    passwordRight(){//密码包含 数字,英文,字符中的两种以上，长度6-20
      return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(this.password)
    },
  },
  methods: {
    // ...mapActions(['syncUserInfo']),
    ...mapMutations(['USER_INFO']),
    //处理登录模式
    dealLoginMode(flag){
      this.loginMode = flag;
    },
    // 4. 处理密码的显示
    dealPwdMode(flag){
      this.pwdMode = flag;
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

  //   if(this.loginMode){//手机验证码登录
  // //输入手机号数据校验
  // if(!this.phone.trim){
  //   Toast({
  //     message: '请输入手机号码',
  //     duration: 500
  //   });
  //   return;
  // }else if(!this.phoneRight){//手机号码输入格式错误
  //   Toast({
  //     message: '请输入正确的手机号码',
  //     duration: 500
  //   });
  //   return;
  // }
  // //输入验证码校验
  // if(!this.code.trim){
  //   Toast({
  //     message: '请输入验证码',
  //     duration: 500
  //   });
  //   return;
  // }else if(!this.codeRight){//手机号码输入格式错误
  //   Toast({
  //     message: '请输入正确的验证码',
  //     duration: 500
  //   });
  //   return;
  // }

    //登录
    async login(){
      //判断登录模式
      if(this.loginMode){//邮箱登录
        //输入邮箱号码校验
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

        //验证码校验
        // if(!this.code.trim()){
        //   Toast({
        //     message: '请输入验证码',
        //     duration: 500
        //   });
        //   return;
        // }else if(!this.codeRight){//手机号码输入格式错误
        //   Toast({
        //     message: '请输入正确的验证码',
        //     duration: 500
        //   });
        //   return;
        // }

        //邮箱验证登录
        let result = await emailCodeLogin(this.email, this.code);
        console.log(result);
        if(result.success){
          this.userInfo = result.object.user;
        }else {
          this.userInfo = {
            message: '登录失败，账号或密码错误！'
          }
        }
        if(!this.userInfo.id){
          Toast({
            message: this.userInfo.message,
            duration: 500
          });
        }else {//成功登录
          this.USER_INFO(this.userInfo);
          //回到主面板
          this.$router.back();

        }




      }else {

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
        // if(!this.password.trim()){
        //   Toast({
        //     message:'请输入密码',
        //     duration: 500,
        //   });
        //   return;
        // }else if(!this.passwordRight){
        //   Toast({
        //     message:'请输入正确的密码',
        //     duration: 500,
        //   });
        //   return;
        // }






        //用户名密码登录
        let result = await passwordLogin(this.username, this.password);
        console.log(result);
        if(result.success){
          this.userInfo = result.object.user;
        }else {
          this.userInfo = {
            message: '登录失败，账号或密码错误！'
          }
        }
        if(!this.userInfo.id){
          Toast({
            message: this.userInfo.message,
            duration: 500
          });
        }else {//成功登录
          this.USER_INFO(this.userInfo);
          //回到主面板
          this.$router.back();

        }
      }


    },

    //返回
    back(){
      this.$router.back();
    }


  },
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #fff;
}

.login-container .login-inner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}

.login-container .login-inner .login-header .login-logo {
  font-size: 40px;
  font-weight: bold;
  color: #75a342;
  text-align: center
}

.login-container .login-inner .login-header .login-header-title {
  padding-top: 40px;
  padding-bottom: 10px;
  text-align: center;
}

.login-container .login-inner .login-header .login-header-title > a {
  color: #333;
  font-size: 14px;
  padding-bottom: 4px;
  text-decoration: none;
}

.login-container .login-inner .login-header .login-header-title > a:first-child {
  margin-right: 40px
}

.login-container .login-inner .login-header .login-header-title > a.current {
  color: #75a342;
  font-weight: 700;
  border-bottom: 2px solid #75a342
}

.login-container .login-inner .login-content > form > div {
  display: none;
}

.login-container .login-inner .login-content > form > div.current {
  display: block
}

.login-container .login-inner .login-content > form > div input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}

.login-container .login-inner .login-content > form > div input:focus {
  border: 1px solid #75a342
}

.login-container .login-inner .login-content > form > div .login-message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login-container .login-inner .login-content > form > div .login-message .get-verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

.login-container .login-inner .login-content > form > div .login-message .get-verification.phone_right {
  color: #75a342
}

.login-container .login-inner .login-content > form > div .login-verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login-container .login-inner .login-content > form > div .login-verification .switch-show {
  position: absolute;
  right: 10px;
  top: 12px;
}

.login-container .login-inner .login-content > form > div .login-verification .switch-show img {
  display: none
}

.login-container .login-inner .login-content > form > div .login-verification .switch-show img.on {
  display: block
}

.login-container .login-inner .login-content > form > div .login-hint {
  margin-top: 12px;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.login-container .login-inner .login-content > form > div .login-hint > a {
  color: #75a342
}
/*.login-container .login-inner .login-content > form */
.login-submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #75a342;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0
}

.login-container .login-inner .login-content .login-back {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 15px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #75a342;
  color: #75a342;
  text-align: center;
  font-size: 16px;
  line-height: 42px
}
</style>