<template>
  <div class="itemMusicTop">
    <!-- 歌单Nav 固定顶部 -->
    <div class="itemTop">
      <div class="itemTop_left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemTop_right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao2"></use>
        </svg>
      </div>
    </div>
  </div>
  <!-- <div class="itemMusicTop_el"></div> -->
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.itemMusicTop_el {
  width: 100%;
  height: 1rem;
}
.itemMusicTop {
  // background: rgba(0, 0, 0, 0);
  z-index: 2;
  // position: fixed;
  width: 100%;
  height: 1rem;
  // height: 100%;
  .itemTop {
    // position: sticky;
    top: 0rem;
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    .icon {
      // 图标的颜色
      fill: #fff;
    }
    .itemTop_left {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.4rem;
        color: #fff;
      }
    }
    .itemTop_right {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>