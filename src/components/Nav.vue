<template>
  <van-nav-bar left-text="返回" left-arrow @click-left="handle" />
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Nav",
  setup() {
    let router = useRouter();
    function handle() {
      router.go(-1);
    }
    return { handle };
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-icon,
/deep/ .van-nav-bar__text {
  color: #000;
}
</style>