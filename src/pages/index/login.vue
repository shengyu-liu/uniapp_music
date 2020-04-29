<template>
  <view class="content">
    <!-- <image class="logo" src="../../static/logo.png"></image> -->
    <view>
      <input placeholder="请输入账号" class="title" v-model="userInfo.count" />
      <input placeholder="请输入密码" password class="title" v-model="userInfo.password" />
    </view>
    <view>
      <button @click="login">登录</button>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      userInfo: {
        count: "",
        password: ""
      },
      title: "Hello uinapp"
    };
  },
  onLoad() {
    // console.log(this.$api)
  },
  methods: {
    login() {
      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      uni.request({
        url: "http://localhost:3000/login/cellphone",
        data: {
          phone: this.userInfo.count,
          password: this.userInfo.password
        },
        success: res => {
          // this.listdata = res || [];
          let resData: any = res.data;
          localStorage.setItem("profile", JSON.stringify(resData.profile));
          localStorage.setItem("token1", resData.token);
          if (resData.code == 200) {
            uni.navigateTo({
              url: "../home/index"
            });
          } else {
            uni.showToast({
                title: "手机号或密码错误！",
                duration: 2000
            });
          }
        }
      });
      // const data = {
      //   phone: this.userInfo.count,
      //   password: this.userInfo.password
      // };
      // Vue.prototype.$api.login(data)
      // // .then(resData=>{
      // //     if (resData.code == 200) {
      // //                localStorage.setItem("profile", JSON.stringify(resData.profile));
      // //     localStorage.setItem("token1", resData.token);
      // //       uni.navigateTo({
      // //         url: "../home/index"
      // //       });
      // //     } else {
      // //       uni.showToast({
      // //           title: "手机号或密码错误！",
      // //           duration: 2000
      // //       });
      // //     }
      // // });
    }
  }
});
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
