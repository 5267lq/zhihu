<template>
  <Nav></Nav>
  <div class="base-info">
    <img src="@/assets/images/timg.jpg" alt="" />
    <p>lkk</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link />
    <van-cell value="退出登录" />
  </van-cell-group>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
  name: "PersonView",
  components: { Nav },
};
</script>

<style lang="less" scoped>
.base-info {
  box-sizing: border-box;
  margin: 20px 0;
  img {
    height: 86px;
    width: 86px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }
  p {
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    margin: 0;
  }
}
</style>
