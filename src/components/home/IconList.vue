<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianshijibofang"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem" @click="Gedan">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>
<script>
import { getGedan } from "@/request/api/home.js";
export default {
  methods: {
    async Gedan() {
      let res = await getGedan();
      console.log(res.data.playlists);
    },
  },
};
</script>
<style lang="less" scoped>
.iconList {
  width: 100%;
  height: 1.45rem;
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-around;
  // align-items: center;
  padding: 10px;
  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>