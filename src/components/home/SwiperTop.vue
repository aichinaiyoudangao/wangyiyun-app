<template>
  <!-- vant组件库 -->
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img v-lazy="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import axios from "axios";
import { getBanner } from "@/request/api/home.js";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    // state对象
    const state = reactive({
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    //async,await异步请求
    onMounted(async () => {
      // axios.get("http://localhost:3000/banner?type=2").then((res) => {
      //   console.log(res);
      //   state.images = res.data.banners;
      //   console.log(state.images);
      // });
      let res = await getBanner();
      state.images = res.data.banners;
      console.log(res);
    });
    return { state };
  },
};
</script>
<style lang="less">
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe__track {
      .van-swipe-item {
        padding: 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
    }
    .van-swipe__indicator--active {
      background-color: red;
    }
  }
}
</style>
