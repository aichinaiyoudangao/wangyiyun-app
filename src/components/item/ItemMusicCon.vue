<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="pic">
    <!-- 歌单详情信息 -->
    <div class="itemContent">
      <div class="itemContent_left">
        <img :src="playlist.coverImgUrl" alt="" class="sPic">
      </div>
      <div class="itemcontent_right">
        <span>{{playlist.name}}</span>
      </div>
    </div>
    <!-- 四个icon -->
    <div class="itemFooter">
      <!-- <router-link :to="{path:'itemMusic',query:{id:item.id}}"> -->
      <div class="itemFooter_item" @click="get_comment">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <!-- </router-link> -->
      <div class="itemFooter_item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playlist.shareCount}}</span>
      </div>
      <div class="itemFooter_item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai "></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="itemFooter_item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["playlist"],
  setup(props) {
    console.log(props);
    // 通过props进行传值，判断如果数据拿不到，获取sessionStorage中的
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JOSN.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
  },
  methods: {
    async get_comment() {
      let res = await getComment();
      console.log(res);
    },
  },
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 5rem;
  // height: 100%;
  .pic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6rem;
    z-index: -1;
    // 背景虚化
    filter: blur(0.6rem);
  }

  .itemContent {
    width: 100%;
    height: 3.5rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-around;
    // margin-top: 4rem;
    .itemContent_left,
    .itemcontent_right {
      width: 45%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .sPic {
        width: 3rem;
        height: 3rem;
        border-radius: 0.2rem;
      }
      span {
        color: #fff;
      }
    }
  }
  .itemFooter {
    width: 100%;
    height: 1.2rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    .itemFooter_item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .icon {
        fill: #fff;
        width: 0.6rem;
        height: 0.6rem;
      }
      span {
        color: #fff;
        font-size: 0.2rem;
      }
    }
  }
}
</style>