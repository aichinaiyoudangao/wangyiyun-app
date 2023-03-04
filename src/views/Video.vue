<template>
  <!-- <video src=""></video> -->
  11
</template>
<script>
import { getVideo } from "@/request/api/home.js";
export default {
  methods: {
    async video() {
      let res = await getVideo();
      console.log(res);
    },
  },
  mounted() {
    this.video();
  },
};
</script>