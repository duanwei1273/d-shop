<template>
  <div id="userCenter">
    <!--  顶部导航栏  -->
    <van-nav-bar
        title="个人资料"
        left-arrow
        :fixed=true
        @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell
          title="头像"
          is-link
          style="margin-top: 2.2rem"
          center
          @click="$router.push('/dashboard/mine/userCenter/modifyThePicture')"
      >
        <template #value>
          <van-image
              :src="userInfo.avatar"
              width="2rem"
              height="2rem"
              round
              style="border: 0.1rem solid #fff"
          ></van-image>

        </template>
      </van-cell>
      <van-cell
          title="账号"
          :value="userInfo.username"
      >
      </van-cell>
      <van-cell
          title="昵称"
          :value="userInfo.nickname"
          is-link
          @click="$router.push('/dashboard/mine/userCenter/modifyTheNickname')"
      >
      </van-cell>
      <van-cell
        title="邮箱"
        :value="userInfo.email"
        is-link
        @click="$router.push('/dashboard/mine/userCenter/modifyTheEmail')"
      >
    </van-cell>
      <van-cell
        title="修改密码"
        is-link
        @click="$router.push('/dashboard/mine/userCenter/modifyThePw')"
    >
    </van-cell>


    </van-cell-group>


    <div class="logout">
      <button @click="logOut">退出登录</button>
    </div>


    <!--  路由出口！  -->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }" >
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {mapMutations} from "vuex";
import {Toast} from "vant";

export default {
  name: "UserCenter",
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations(['RESET_USER_INFO']),
    logOut(){
      this.RESET_USER_INFO();
      Toast({
        message: '退出登录成功!',
        duration: 500
      });
    },
  }
}
</script>

<style scoped>
#userCenter{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  z-index: 200;
}

::v-deep .van-nav-bar__content {
  background-color: #FFF;
}
::v-deep .van-nav-bar__title {
  color: #000;
  font-size: 0.8rem;
}
.logout{

  margin-top: 2rem;
  height: 2.5rem;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout button{
  background-color: transparent;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
  /*transform: translate3d(-2rem,0,0);*/
}

.slide-fade-leave-active {
  transition: all 0.3s;
  transform: translate3d(2rem,0,0);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
}
</style>