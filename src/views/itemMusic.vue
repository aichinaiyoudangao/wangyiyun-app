<template>
  <div class="itemMusic">
    <ItemMusicTop :playlist='state.playlist' />
    <ItemMusicCon :playlist='state.playlist' />
    <ItemList :itemmusic='state.itemmusic' :subscribedCount='state.playlist.subscribedCount' />
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import {
  getMusicItemList,
  getMusicList,
  getComment,
} from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";

import ItemList from "@/components/item/ItemList.vue";
import ItemMusicCon from "@/components/item/ItemMusicCon.vue";
export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单的详情页的数据
      itemmusic: [], //歌单的歌曲
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      console.log(id);
      // 获取歌单评论
      let result_commend = await getComment(id);
      console.log(result_commend);
      //   获取歌单详情页
      let res = await getMusicItemList(id);
      console.log(res);
      state.playlist = res.data.playlist;
      //   获取歌单的歌曲
      let result = await getMusicList({ id, limit: 10, offset: 0 });
      console.log(result);
      state.itemmusic = result.data.songs;
      // 防止页面刷新，数据丢失
      sessionStorage.setItem("playlist", JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicCon,
    ItemList,
  },
};
</script>
<style lang="less" scoped>
.itemMusic {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
</style>