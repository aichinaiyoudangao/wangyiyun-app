<template>
  <div class="topNav">
    <!-- 左边 -->
    <div class="topleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
    <!-- 中间 -->
    <div class="topContent">
      <span @click="$router.push('/User')">我的</span>
      <!-- 加粗 -->
      <span class="active">发现</span>
      <span>云村</span>
      <span @click="$router.push('/Video')">动态</span>
    </div>
    <!-- 右边 -->
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/Search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>
<style lang="less" >
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>