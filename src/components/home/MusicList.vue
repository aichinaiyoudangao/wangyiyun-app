<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <!-- 自定义滑块大小 指示器false-->
      <van-swipe :loop="false" :width="140" class="my-swiper" :show-indicators="false">
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <!-- 歌单路由跳转并携带参数，会解析成a标签 -->
          <router-link :to="{path:'itemMusic',query:{id:item.id}}">
            <img v-lazy="item.picUrl" alt="">
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
              </svg>
              {{changeCount(item.playCount) }}
            </span>
            <span class="name">{{item.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>


<script>
import { getMusicList } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";

export default {
  //发现好歌单的列表渲染
  //vue2
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   async getGnedan() {
  //     let res = await getMusicList();
  //     console.log(res);
  //     this.musicList = res.data.result;
  //   },
  //   changeCount: function (num) {
  //     if (num >= 100000000) {
  //       return (num / 100000000).toFixed(1) + "亿";
  //     } else if (num >= 10000) {
  //       return (num / 10000).toFixed(1) + "万";
  //     }
  //   },
  // },
  // mounted() {
  //   this.getGnedan();
  // },
  //vue3
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      console.log(res);
      state.musicList = res.data.result;
    });
    return { state, changeCount };
  },
};
</script>


<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    // margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.02rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.5rem;
    margin-top: 0.2rem;
    .my-swiper {
      height: 100%;
      .van-swipe-item {
        position: relative;
        padding-right: 0.2rem;
        // margin-right: 0.2rem;
        img {
          width: 100%;
          height: 2.6rem;
          border-radius: 20px;
          // margin-right: 10px;
        }
        .playCount {
          position: absolute;
          z-index: 100;
          right: 10px;
          color: white;
          margin-top: 0.06rem;
          .svg {
            color: white;
          }
          .icon {
            width: 0.3rem;
            height: 0.3rem;
          }
        }
      }
    }
  }
}
</style>