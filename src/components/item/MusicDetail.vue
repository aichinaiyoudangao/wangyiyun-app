<template>
  <div class="musicDetail">
    <img v-lazy="playlist[playlistIndex].al.picUrl" alt="" class="bgimg">
    <div class="musicDetailTop">
      <div class="top_left">
        <svg class="icon" aria-hidden="true" @click="updateDetailShow();isLyricShow=false">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <!-- 跑马灯歌名 -->
        <div class="title">
          <Vue3Marquee class="marquee">
            {{playlist[playlistIndex].name}}
          </Vue3Marquee>
          <span v-for="item in playlist[playlistIndex].ar" :key="item">
            {{ item.name }}
          </span>
        </div>
      </div>
      <div class="top_right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="musicDetailContent" v-show="!isLyricShow">
      <!-- 磁针的位置 动态class -->
      <img src="@/assets/needle.png" alt="" class="needle" :class="{needle_active:!isPause}">
      <img src="@/assets/cd.png" alt="" class="cd">
      <!-- 图片绕z轴转动 -->
      <img v-lazy="playlist[playlistIndex].al.picUrl" alt="" @click="change" class="picUrl" :class="!isPause?'picUrl_running':'picUrl_paused'">
    </div>
    <!-- 歌词 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="change">
      <p ref="refLyric" v-for="(item,i) in lyric" :key="i" :class="{active:(currentTime*1000>=item.time&&currentTime*1000<item.pre)}">{{item.lrc}}</p>
      <!-- {{lyricList.lyric}} -->
    </div>
    <!-- 底部 -->
    <div class="musicDetailFooter">
      <div class="footer_top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon"></use>
        </svg>
      </div>
      <!-- 进度条 -->
      <div class="footer_content">
        <input type="range" class="range" v-model="currentTime" min='0' :max="duration" step="0.05">
      </div>
      <div class="footer_bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-repeat2"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goplay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <!-- 开始暂停的切换 -->
        <svg class="icon1" aria-hidden="true" @click="play" v-if="isPause">
          <use xlink:href="#icon-kaishi2"></use>
        </svg>
        <svg class="icon1" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goplay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { createLogger, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  methods: {
    change() {
      this.isLyricShow = !this.isLyricShow;
    },
    goplay(num) {
      console.log(this.playlistIndex);
      let index = this.playlistIndex + num;
      console.log(index);
      if (index < 0) {
        index = this.playlist.length;
      } else if (index == this.playlist.length) {
        index = 0;
      }
      this.updatePlaylistIndex(index);
    },
    ...mapMutations(["updatePlaylistIndex"]),
  },
  //歌词的渲染
  props: ["playlist", "playlistIndex", "isPause", "updateDetailShow", "play"],
  components: {
    Vue3Marquee,
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        this.goplay(1);
      }
    },
  },
  computed: {
    ...mapState(["lyricList", "currentTime", "duration"]),
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      console.log(arr);
      return arr;
    },
  },
  mounted() {
    console.log(this.lyricList.lyric);
  },
};
</script>
<style lang="less" scoped>
.musicDetail {
  // 解决背景图片与图标颜色一致，遮盖问题
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
  .musicDetailTop {
    width: 100%;
    height: 1.2rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    fill: #fff;
    align-items: center;
    .top_left {
      width: 4rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        height: 100%;
        width: 3rem;
        // width: 100%;
        margin-left: -2rem;
        .marquee {
          width: 100%;
          height: 50%;
          // margin-left: -2rem;
          width: 1.5rem;
          color: #fff;
        }
        span {
          color: #999;
        }
      }
    }
  }
  .musicDetailContent {
    width: 100%;
    height: 9rem;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-10deg);
      transition: all 2s;
    }
    .needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: 2rem;
      z-index: -1;
    }
    .picUrl {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      position: absolute;
      top: 2.78rem;
      // 匀速无限循环
      animation: identifier 10s linear infinite;
    }
    .picUrl_running {
      animation-play-state: running;
    }
    .picUrl_paused {
      animation-play-state: paused;
    }
    @keyframes identifier {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .musicLyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    margin-top: 0.2rem;
    p {
      color: #d1cdcd;
      margin-bottom: 0.4rem;
    }
    .active {
      color: #fff;
      font-size: 0.45rem;
    }
  }
  .musicDetailFooter {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    position: absolute;
    bottom: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .range {
      width: 100%;
      height: 0.05rem;
    }
    .icon {
      fill: #fff;
      width: 0.6rem;
      height: 0.6rem;
    }
    .icon1 {
      fill: #fff;
      width: 1rem;
      height: 1rem;
    }
    .footer_top {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .footer_bottom {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>