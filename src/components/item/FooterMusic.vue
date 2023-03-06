<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img v-lazy="playlist[playlistIndex].al.picUrl" alt="">
      <div>
        <p>{{ playlist[playlistIndex].name}}</p>
        <span @click="updateDetailShow">横划切歌</span>
      </div>
    </div>
    <div class="footerRight">
      <!-- 开始暂停 -->
      <svg class="icon" aria-hidden="true" @click="play" v-if="isPause">
        <use xlink:href="#icon-kaishi2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
      <audio @timeupdate="updateTime" ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"></audio>
    </div>
  </div>
  <!-- 使用一个空盒子 -->
  <div class="Footer"></div>
  <!-- 使用vant组件库从底部弹出 -->
  <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
    <MusicDetail :updateDetailShow='updateDetailShow' :playlist='playlist' :playlistIndex='playlistIndex' :isPause='isPause' :detailShow='detailShow' :play='play' />
  </van-popup>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {
  data() {
    return {
      detailShow: false,
      interVal: 0,
    };
  },
  methods: {
    play() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsPause(false);
        // this.updateTime(); //播放就调用函数进行传值
      } else {
        this.$refs.audio.pause();
        // this.isPause = !this.isPause;
        this.updateIsPause(true);
        // clearTimeout(this.interVal); //暂停 清除定时器
      }
    },
    updateDetailShow() {
      // console.log(this.detailShow);
      this.detailShow = !this.detailShow;
    },
    updateTime() {
      this.interVal = setTimeout(() => {
        this.updatecurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    addDuration() {
      this.updataDuration(this.$refs.audio.duration);
    },
    ...mapMutations(["updateIsPause", "updatecurrentTime", "updataDuration"]),
  },
  computed: {
    ...mapState(["playlist", "playlistIndex", "isPause"]),
  },
  // 渲染
  mounted() {
    console.log(this.$refs);
    // 原有的歌词渲染
    this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id);
    // this.updateTime();
  },
  // 用watch好，每次暂停开始都会发送请求，浪费资源
  // updated() {
  //   this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id);
  // },
  watch: {
    // 监听下标是否变化
    playlistIndex() {
      this.$refs.audio.autoplay = true;
      this.updateIsPause(false);
      // 歌词
      this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id);
      this.addDuration();
    },
  },
  components: {
    MusicDetail,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  position: fixed;
  width: 100%;
  height: 1rem;
  background-color: #fff;
  border-top: 0.04rem solid rgb(168, 162, 162);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  .footerLeft {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-around;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    div {
      margin-left: 0.2rem;
      p {
        width: 4.5rem;
        font-weight: 700;
        font-size: 0.3rem;
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
      }
      span {
        font-size: 0.2rem;
      }
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
.Footer {
  width: 100%;
  height: 1rem;
}
</style>