<template>
  <div class="User">
    <img v-lazy="user.data.profile.backgroundUrl" alt="" class="bgimg">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="User1">
      <img v-lazy="user.data.profile.avatarUrl" alt="" class="headphoto">
      <span>{{user.data.profile.nickname}}</span>
      <div class="info">
        <span>{{user.data.profile.follows}} 关注</span>
        <span>{{user.data.profile.followeds}} 粉丝</span>
        <span>Lv.{{user.data.level}}</span>
      </div>
    </div>
    <div class="User2">
      <span>基本信息</span>
      <div class="info">
        <div>村龄：{{user.data.createDays}}天</div>
        <div>性别：{{user.data.profile.gender==1?"男":user.data.profile.gender==2?"女":""}}</div>
        <div>累计听歌：{{user.data.listenSongs}}首</div>
      </div>
    </div>
    <van-button type="primary" size="large" @click="Loginout" class="botton" color="#474646">退出</van-button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getLoginout, getLoginUser } from "@/request/api/home.js";
export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async Loginout() {
      let res = await getLoginout();
      console.log(res);
      this.$store.commit("updateisLogin", false);
      this.$store.commit("updatetoken", "");
      this.$router.push("/");
    },
    async getInfo() {
      let id = localStorage.getItem("id");
      let res = await getLoginUser(id);
      console.log(res);
      this.$store.commit("updateuser", res);
      console.log(this.user);
    },
  },
  created() {
    this.getInfo();
  },
};
</script>
<style lang="less" scoped>
.User {
  position: absolute;
  background: rgba(0, 0, 0, 0.85);
  // height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bgimg {
    width: 100%;
    height: 5rem;
  }
  .icon {
    position: absolute;
    fill: #fff;
    left: 0.2rem;
    top: 0.2rem;
  }
  .User1 {
    width: 90%;
    height: 2rem;
    margin-top: -0.5rem;
    border-radius: 0.3rem;
    background-color: #474646;
    display: flex;
    flex-direction: column;
    align-items: center;
    .headphoto {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      margin-top: -0.75rem;
    }
    span {
      color: #fff;
      font-size: 0.4rem;
    }
    .info {
      span {
        color: #8e8d8d;
        margin: 0.1rem;
        font-size: 0.3rem;
      }
    }
  }
  .User2 {
    width: 90%;
    height: 3rem;
    border-radius: 0.3rem;
    background-color: #474646;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-around;
    margin-top: 0.6rem;
    padding: 0.3rem 0.2rem;
    span {
      color: #fff;
      font-size: 0.4rem;
    }
    .info {
      div {
        color: #a8a6a6;
        padding: 0.05rem 0rem;
        font-size: 0.3rem;
      }
    }
  }
  .botton {
    width: 90%;
    // height: 3rem;
    border-radius: 0.3rem;
    margin-top: 0.4rem;
  }
}
</style>