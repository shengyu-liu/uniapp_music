<template>
  <view class="content">
    <div class="profile" :style="'background:url('+userInfo.backgroundUrl+')'">
      <img :src="userInfo.avatarUrl" alt />
      <div class="name">{{userInfo.nickname}}</div>
    </div>

    <div class="search">
      <!-- <text class="title">{{title}}</text> -->
      <input placeholder="请输入关键词" class="title" v-model="keyWords" @keyup.enter="search" />
      <button @click="search">搜索</button>
    </div>

    <ul class="hotlist">
      <li v-for="(item,index) in listdata" :key="index" @click="playMusic(item)">
        <div>{{(index+1)< 10 ? 0:""}}{{index+1}}</div>
        <img :src="item.al.picUrl" alt />
        <div>{{item.name}}</div>
      </li>
    </ul>
  </view>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      keyWords: "",
      title: "Hello uinapp",
      userInfo: {},
      token: "",
      listdata: {}
    };
  },
  onLoad() {
    console.log(uni.request);
    const profile: any = localStorage.getItem("profile");
    const token: any = localStorage.getItem("token1");
    this.token = token;
    this.userInfo = JSON.parse(profile);
    this.querylistData();
  },
  methods: {
    playMusic(data:any) {
      uni.navigateTo({
        url: `../home/play?music=${JSON.stringify(data)}`
      });
    },
    search() {
      this.querylistData();
    },
    querylistData() {
      uni.request({
        url: "http://localhost:3000/top/list/detail",
        data: {
          idx: 1
        },
        // header: {
        // 	token:this.token
        // },
        success: res => {
          // this.listdata = res || [];
          console.log(res.data);
          let list: any = res.data;
          this.listdata = list.playlist.tracks;
        }
      });
    }
  }
});
</script>

<style lang="stylus">
.content {
  text-align: center;
  height: 400upx;
}

.profile {
  width: 100%;
  height: 500upx;
  background-repeat: no-repeat;
  background-size: cover;

  img {
    border-radius: 50%;
    width: 200upx;
    height: 200upx;
    margin-top: 50upx;
  }

  .name {
    color: #ffffff;
    margin-top: 20upx;
  }
}

.hotlist {
  width: 100%;
  padding-left: 0;

  li {
    list-style: none;
    width: 100%;
    display: flex;
    line-height: 60px;
    margin-top: 6px;
    padding: 0 20px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      margin: 0 20px;
    }
  }

  li:nth-child(2n) {
    background: #f4eded;
  }
}

.search {
  width: 100%;
  height: 160upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ccc;
  padding: 0 20px;

  input {
    border-bottom: 1px solid #ffffff;
  }

  button {
    width: 60px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }
}
</style>
