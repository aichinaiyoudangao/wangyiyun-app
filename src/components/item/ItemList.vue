<template>
  <div class="itemList">
    <!-- 头部 固定-->
    <div class="itemListTop">
      <!-- 播放全部 -->
      <div class="itemListTop_left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kaishi"></use>
        </svg>
        <div>
          <span class="active">播放全部</span>
          <span>(共{{itemmusic.length }}首)</span>
        </div>
      </div>
      <!-- 收藏 -->
      <div class="itemListTop_right">
        <span>+收藏({{subscribedCount}})</span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="itemListContent">
      <div class="itemListContent_item" v-for="(item,index) in itemmusic" :key="index">
        <!-- 左边 -->
        <div class="itemListContent_Litem" @click="playMusic(index)">
          <span class="leftindex">{{index+1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span v-for="(item1,index1) in item.ar" :key="index1">
              {{item1.name}}
            </span>
          </div>
        </div>
        <!-- 右边 -->
        <div class="itemListContent_Ritem">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv!=0">
            <use xlink:href="#icon-24gl-playSquare"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-danlieliebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {
    console.log(props);
  },
  props: ["itemmusic", "subscribedCount"],
  methods: {
    ...mapMutations(["updatePlaylist", "updatePlaylistIndex"]),
    // 更新歌单列表
    playMusic(index) {
      this.updatePlaylist(this.itemmusic);
      this.updatePlaylistIndex(index);
    },
  },
};
</script>
<style lang="less" scoped>
.itemList {
  width: 100%;
  // height: 2rem;
  background-color: #fff;
  border-radius: 0.4rem 0.4rem 0 0;
  margin-top: 0.12rem;
  .itemListTop {
    width: 100%;
    height: 1.2rem;
    display: flex;

    justify-content: space-between;
    padding: 0.2rem;
    .itemListTop_left {
      width: 46%;
      height: 0.8rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .active {
        font-size: 0.32rem;
        font-weight: 900;
      }
    }
    .itemListTop_right {
      // width: 30%;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      background-color: red;
      border-radius: 0.6rem;
      span {
        color: #fff;
        font-size: 0.26rem;
      }
    }
  }
  .itemListContent {
    width: 100%;
    // height: 1rem;
    .itemListContent_item {
      width: 100%;
      height: 1.3rem;
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
      align-items: center;
      .itemListContent_Litem {
        width: 85%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        // 序号
        .leftindex {
          font-size: 0.32rem;
          display: inline-block;
          width: 0.5rem;
          // text-align: center;
        }
        div {
          p {
            overflow: hidden;
            // 规定文本不进行换行
            white-space: nowrap;
            // text-overflow 属性规定当文本溢出包含元素时发生的事情。ellipsis 表示显示省略符号来代表被修剪的文本。
            text-overflow: ellipsis;
            width: 4rem;
            height: 0.4rem;
            font-weight: 700;
          }
          span {
            font-size: 0.16rem;
            color: gray;
          }
        }
      }
      .itemListContent_Ritem {
        width: 18%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
        .icon {
          fill: grey;
        }
      }
    }
  }
}
</style>