<template>
  <div class="suosuo">
    <div class="searchTop">
      <!-- 全局路由对象go方法，返回历史记录前一页 -->
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" placeholder="于文文" v-model="searchKey" @keydown.enter="saveKey">
    </div>
    <!-- 历史记录 -->
    <div class="searchHistory">
      <span class="history">历史</span>
      <!-- 搜索的历史记录 -->
      <span v-for="(item,i) in keyList" :key=i class="keyword" @click="searchinput(item)">{{item}}</span>
      <!-- 删除 logo-->
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <RecycleScroller class="scroller" :items="searchList" :item-size="65" key-field="id" v-slot="{ item,index }">
      <div class="user">
        <!-- 左边 -->
        <div class="itemListContent_Litem" @click="updateindex(item)">
          <span class="leftindex">{{index+1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span v-for="(item1,index1) in item.artists" :key="index1">
              {{item1.name}}
            </span>
          </div>
        </div>
        <!-- 右边 -->
        <div class="itemListContent_Ritem">
          <!-- 是否有mv -->
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid!=0">
            <use xlink:href="#icon-24gl-playSquare"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-danlieliebiao"></use>
          </svg>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>
<script>
import { getSearchMusic } from "@/request/api/home";
import { _throttle } from "@/util/throttle.js";
import { _debounce } from "@/util/debounce.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      keyList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    // 渲染时用localStorage中的值
    this.keyList = JSON.parse(localStorage.getItem("keyList")) || [];
  },
  methods: {
    async saveKey() {
      if (this.searchKey != "") {
        this.keyList.unshift(this.searchKey);
        // 去重 ES6 Set类数组没有重复内容
        this.keyList = [...new Set(this.keyList)];
        // console.log([...new Set(this.keyList)]);
        // 固定长度
        if (this.keyList.length > 10) {
          this.keyList.pop(this.keyList[length - 1]);
        }
        // 保存在localStorage中
        localStorage.setItem("keyList", JSON.stringify(this.keyList));
        let res = await getSearchMusic(this.searchKey);
        console.log(res);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    delHistory() {
      localStorage.removeItem("keyList");
      this.keyList = [];
    },
    // 歌曲的搜索
    // async search(item) {
    //   let res = await getSearchMusic(item);
    //   console.log(res);
    //   this.searchList = res.data.result.songs;
    // },
    // 点击历史记录查询 防抖
    searchinput: _throttle(async function (item) {
      let res = await getSearchMusic(item);
      console.log(res);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
    }, 300),
    updateindex(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlaylist", item);
      this.$store.commit(
        "updatePlaylistIndex",
        this.$store.state.playlist.length - 1
      );
    },
  },
};
</script>
<style lang="less" scoped>
.suosuo {
  .searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    input {
      margin-left: 0.2rem;
      border: none;
      border-bottom: 1px solid #999;
      width: 90%;
      padding: 0.1rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0.1rem 0.2rem;
    position: relative;
    margin-bottom: 0.2rem;
    .history {
      font-size: 0.35rem;
      font-weight: 700;
    }
    .keyword {
      display: inline-block;
      font-size: 0.3rem;
      background-color: #c5c1c1;
      border-radius: 0.3rem;
      margin: 0.1rem 0.1rem;
      padding: 0.06rem 0.2rem;
    }
    .icon {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      right: 0.2rem;
      top: 0.25rem;
    }
  }
  .scroller {
    height: 10.4rem;
    .user {
      height: 1.3rem;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
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