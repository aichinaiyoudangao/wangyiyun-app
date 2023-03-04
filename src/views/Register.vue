<template>
  <svg class="icon" aria-hidden="true" @click="$router.push('/')">
    <use xlink:href="#icon-zuojiantou"></use>
  </svg>
  <div class="login">
    <img src="@/assets/logo.webp" alt="" class="logo">
    <div class="content">
      <van-cell-group inset>
        <van-field v-model="phone" type="phone" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="captcha" center clearable label="短信验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="small" type="primary" @click="getMa">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>

      <!-- <input v-model="phone" type="phone" label="手机号" placeholder="请输入手机号" />

      <input v-model="password" type="password" label="密码" placeholder="请输入密码" />
      <button type="primary" @click="Login">登录</button> -->
    </div>
    <van-button type="primary" size="large" @click="Login" class="botton" color="red">注册</van-button>
  </div>
</template>
<script>
import {
  getLoginUser,
  getCaptcha,
  getCheckcaptcha,
  getCheck,
} from "@/request/api/home.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      phone: "",
      password: "",
      captcha: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // 点击获取验证码
    async getMa() {
      // 判断该手机号是否注册
      let res_check = await getCheck(this.phone);
      console.log(res_check);
      // let res = await getCaptcha(this.phone);
      // if (res.data.code === 200) {
      //   alert("发送成功");
      // } else {
      //   alert(res.data.message);
      // }
      // console.log(res);
    },
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
    height: 2.5rem;
  }
  .botton {
    width: 80%;
    margin-top: 0.2rem;
  }
}
</style>