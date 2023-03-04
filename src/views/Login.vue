<template>
  <svg class="icon" aria-hidden="true" @click="$router.push('/')">
    <use xlink:href="#icon-zuojiantou"></use>
  </svg>
  <div class="login">
    <img src="@/assets/logo.webp" alt="" class="logo">
    <div class="content">
      <van-cell-group inset>
        <van-field v-model="phone" type="phone" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
      </van-cell-group>

      <!-- <input v-model="phone" type="phone" label="手机号" placeholder="请输入手机号" />

      <input v-model="password" type="password" label="密码" placeholder="请输入密码" />
      <button type="primary" @click="Login">登录</button> -->
    </div>
    <van-button type="primary" size="large" @click="Login" class="botton" color="red">登录</van-button>
    <div class=" register" @click="$router.push('/Register')">没有账号?点击注册
    </div>
  </div>
</template>
<script>
import { getLoginUser } from "@/request/api/home.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch("getPhoneLogin", {
        phone: this.phone,
        password: this.password,
      });

      console.log(res);
      // 返回的code为200，登陆成功，跳转到User页面
      if (res.data.code === 200) {
        this.$store.commit("updateisLogin", true);
        this.$store.commit("updatetoken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        localStorage.setItem("id", res.data.account.id);
        console.log(result);
        this.$store.commit("updateuser", result);
        console.log(this.user);
        this.$router.push("/User");
      } else {
        alert("手机号或者密码错误");
        this.password = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.icon {
  margin-top: 0.2rem;
  margin-left: 0.2rem;
}
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin-top: 2rem;
  align-items: center;
  .logo {
    width: 2rem;
    height: 2rem;
  }
  .content {
    margin-top: 0.8rem;
    width: 100%;
    height: 2rem;
  }
  .botton {
    width: 80%;
    margin-top: 0.2rem;
  }
  .register {
    position: absolute;
    bottom: 1.6rem;
    color: #999;
    font-size: 0.2rem;
  }
}
</style>