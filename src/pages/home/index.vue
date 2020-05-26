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
      <button @click="cancle">取消</button>
    </div>

    <ul class="hotlist" v-if="listState == 'hotlist'">
      <li v-for="(item,index) in listdata" :key="index" @click="playMusic(item)">
        <i class="icon-bofang iconfont"></i>
        <div>{{(index+1)< 10 ? 0:""}}{{index+1}}</div>
        <img :src="item.al.picUrl" alt />
        <div>{{item.name}}</div>
      </li>
    </ul>

    <ul class="hotlist" v-if="listState == 'searchlist'">
      <li v-for="(item,index) in listdata2" :key="index" @click="playMusic(item)">
        <div>{{(index+1)< 10 ? 0:""}}{{index+1}}</div>
        <img :src="item.album.artist.img1v1Url" alt />
        <div>{{item.name}}</div>
      </li>
    </ul>
    <Player :music="controler" v-if="showControler" ref="controler" v-on:openLyrics="openLyrics" class="controler"></Player>
    <!-- <Lyrics :music="controler" v-show="showLyrics" class="lyrics" ref="lyrics"></Lyrics> -->
  </view>
</template>
<script lang="ts">
import Vue from "vue";
import Player from "../../components/player.vue";
// import Lyrics from "../../components/lyrics.vue";
export default Vue.extend({
  components: { Player},
  data() {
    return {
      showLyrics: false,
      showControler: false,
      listState: "hotlist",
      keyWords: "",
      title: "Hello uinapp",
      userInfo: {},
      token: "",
      listdata: {},
      listdata2: {},
      controler: {
        picUrl: "",
        name: "",
        author: "",
        id: ""
      }
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
    openLyrics() {
      console.log("opne2")
      this.$refs.lyrics.querylyric();
      this.showLyrics = true;
    },
    cancle() {
      console.log("变了");
      this.keyWords = "";
      this.listState = "hotlist";
    },
    search() {
      uni.request({
        url: `http://localhost:3000/search/?keywords=${this.keyWords}`,
        data: {
          idx: 1
        },
        // header: {
        // 	token:this.token
        // },
        success: (res: any) => {
          // this.listdata = res || [];
          console.log(res.data);
          this.listdata2 = res.data.result.songs;
          this.listState = "searchlist";
        }
      });
    },
    playMusic(data: any) {
      // uni.navigateTo({
      //   url: `../home/play?music=${JSON.stringify(data)}`
      // });
      this.controler = {
        picUrl: data.al.picUrl,
        name: data.ar[0].name,
        author: data.name,
        id: data.id
      };
      console.log(this.$refs.controler)
      this.$refs.controler.querymusic(data.id)
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
          this.controler = {
            picUrl: this.listdata[0].al.picUrl,
            name: this.listdata[0].name,
            author: this.listdata[0].ar[0].name,
            id: this.listdata[0].id
          };
          console.log(this.controler);
          this.listState = "hotlist";
          this.showControler = true;
        }
      });
    }
  }
});
</script>

<style lang="stylus" scoped>
.content {
  text-align: center;
  height: 400upx;

  .controler {
    position: fixed;
    bottom: -5px;
    width: 100%;
    z-index: 100;
    // height 72px
    >>>.uni-audio-default {
      width: 100%;
    }
  }
  .lyrics {
    position fixed
    bottom 72px
    z-index 2
    height 100%
    width 100%
    left 0
    top 0
    background: #cccccc
  }
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
    height: 60px;
    overflow: scroll;

    i {
      margin-right: 20px;
      color: #f26060;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      margin: 0 20px;
    }
  }

  li:nth-child(2n) {
    background: #cccccc;
  }
}

.search {
  width: 100%;
  height: 160upx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #ccc;

  input {
    border-bottom: 1px solid #ffffff;
  }

  button {
    width: 60px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    margin: 0;
  }
}
</style>
