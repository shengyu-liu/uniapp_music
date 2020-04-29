<template>
  <div class="music">
    <div class="lyric" :style="'background:url('+music.al.picUrl+')'" ref="scroll">
      <p
        :key="index"
        v-for="(item,index) in lyrics"
        :class="index == activeIndex?'active':''"
      >{{item.c}}</p>
    </div>
    <audio
      class="player"
      :src="playData.url"
      :poster="music.al.picUrl"
      :name="music.name"
      :author="music.ar[0].name"
      controls
      @timeupdate="timeupdata"
    ></audio>
    <!-- <av-waveform :audio-src="playData.url"></av-waveform> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      // id: "",
      playData: [],
      music: {},
      lyricData: "",
      lyrics: [],
      activeIndex: 0 // 激活的歌词的下标
    };
  },
  watch: {
    activeIndex() {
      // 通过监听激活歌词来滚动歌词
      if (this.activeIndex > 9 && this.activeIndex<this.lyrics.length - 6) {
        const ele:any = document.querySelector(".lyric");
        const ele2:any = document.querySelector(".active");
        // console.log(this.activeIndex-1);
        ele.scrollTop = (ele2.offsetHeight)*(this.activeIndex - 7);
      }
    }
  },
  computed: {
    lycric: {
      get: function() {
        return this.lyricData.split("\n");
      }
    }
  },
  onLoad(option: any) {
    this.music = JSON.parse(option.music);
    // this.id = option.data.id;
    this.querymusic();
    this.querylyric();
  },
  methods: {
    timeupdata(data) {
      this.lyrics.forEach((ele, index) => {
        if (ele.t < data.detail.currentTime) {
          this.activeIndex = index; //通过改变index来控制激活的歌词
          return;
        }
      });
    },
    querylyric() {
      uni.request({
        url: "http://localhost:3000/lyric/url",
        data: {
          id: this.music.id
        },
        // header: {
        // 	token:this.token
        // },
        success: (res: any) => {
          // this.listdata = res || [];
          console.log(res.data);
          this.lyricData = res.data.lrc.lyric;
          this.dealLyric(this.lyricData);
        }
      });
    },
    dealLyric(data) {
      // 处理请求到的歌词
      let tl = data.split("\n"); // 带时间的歌词数组
      this.lyrics = [];
      tl.forEach((item, index) => {
        const t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
        this.lyrics.push({
          t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
          c: item.substring(item.indexOf("]") + 1, item.length)
        });
      });
      console.log(this.lyrics);
    },
    querymusic() {
      uni.request({
        url: "http://localhost:3000/song/url",
        data: {
          id: this.music.id
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
});
</script>

<style lang="stylus" scoped>
.music {
  width: 100%;

  .player {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #ffffff;

    >>>.uni-audio-default {
      width: 100%;
      height: 100%;
    }
  }

  .lyric {
    width: 100%;
    height: calc(100vh - 44px);
    padding-bottom: 70px;
    overflow: scroll;
    color: #000;
    background-repeat: no-repeat;
    background-position: fixed;
    padding: 1px;
    box-sizing: border-box;
    z-index: 1;
    padding-bottom: 400px
    ::-webkit-scrollbar { width: 0 !important }

    p {
      width: 100%;
      line-height: 30px;
      text-align: center;
      border-radius: 4px
    }

    .active {
      background: rgba(0,0,0,0.5);
      color: #ffffff;
    }
  }
}
</style>
