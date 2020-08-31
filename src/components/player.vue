<template>
  <view class="box">
    <Lyrics :music="music" v-if="showLyrics" class="lyrics" ref="lyrics"></Lyrics>
    <audio
      class="player"
      :src="playData.url"
      :poster="music.picUrl"
      :name="music.name"
      :author="music.author"
      controls
      @timeupdate="timeupdata"
      <!-- 提交到分支上 -->
    ></audio>
    <div class="lyricbtn" @click="openLyrics">词</div>
  </view>
</template>

<script lang="ts">
import Lyrics from "./lyrics.vue";
export default {
  components: { Lyrics },
  props: {
    music: {
      type: Object
    }
  },
  data() {
    return {
      playData: {},
      showLyrics: false
    };
  },
  created() {
    this.querymusic();
  },
  methods: {
    openLyrics() {
      console.log("open");
      // this.$emit("openLyrics")
      this.showLyrics = !this.showLyrics;
    },
    timeupdata(data) {
      if (this.$refs.lyrics) {
        this.$refs.lyrics.timeupdata(data);
      }
    },
    querymusic(Id: any) {
      console.log("a");
      uni.request({
        url: "http://localhost:3000/song/url",
        data: {
          id: Id || this.music.id
        },

        // header: {
        // 	token:this.token
        // },
        success: (res: any) => {
          // this.listdata = res || [];
          console.log(res.data);
          this.playData = res.data.data[0];
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.box {
  position: relative;

  .lyric {
    width: 100%;
    height: calc(100vh - 44px);
    position: fixed;
    top: 0;
    padding-bottom: 70px;
    overflow: scroll;
    color: #000;
    background-repeat: no-repeat;
    background-position: fixed;
    padding: 1px;
    padding-bottom: 400px;

    ::-webkit-scrollbar {
      width: 0 !important;
    }

    p {
      width: 100%;
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
    }

    .active {
      background: rgba(0, 0, 0, 0.5);
      color: #ffffff;
    }
  }

  .lyricbtn {
    position: absolute;
    right: 80px;
    bottom: 20px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #cccccc;
    color: #ffffff;
    line-height: 35px;
    text-align: center;
  }
}

.player {
  width: 100%;
}
</style>