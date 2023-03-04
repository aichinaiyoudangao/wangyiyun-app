<template>
  <router-view />
  <div v-show="$store.state.isFooterMusic">
    <FooterMusic />
  </div>

</template>
<script>
import FooterMusic from "@/components/item/FooterMusic.vue";
export default {
  // 注册
  components: {
    FooterMusic,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  // 怪异盒模型
  box-sizing: border-box;
}
.icon {
  // svg,必须通过宽高确定大小，扩展工具，font-size
  width: 0.5rem;
  height: 0.5rem;
}
// 歌单跳转router-link变成a标签
a {
  color: black;
}
</style>
