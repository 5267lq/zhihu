<template>
  <header class="header-box">
    <div class="left">
      <div class="time">
        <span>25</span>
        <span>十月</span>
      </div>
      <h1 class="tip">知乎日报</h1>
    </div>
    <router-link to="/person" class="link-btn">
      <!-- <img src="../assets/images/timg.jpg" alt=""> -->
      <!-- Vue中动态绑定的地址不能用相对地址，相对地址需要通过模块规范导入进来使用，保证webpack对其进行编译。静态的则不需要，因为vue在解析的时候webpack本身就能把template和style中的东西进行编译 -->
      <img :src="pic" alt="" />
    </router-link>
  </header>
</template>

<script>
import { reactive, toRefs } from "vue";
import timg from "../assets/images/timg.jpg";
export default {
  name: "Head",
  setup() {
    let state = reactive({
      //   pic: require("../assets/images/timg.jpg"),
      pic: timg,
    });
    return { ...toRefs(state) };
  },
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  .left {
    display: flex;
    // justify-content: flex-start;
    align-items: center;
    .time {
      padding-right: 15px;
      border-right: 1px solid #ddd;
      span {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        text-align: center;
        &:nth-child(2) {
          height: 15px;
          line-height: 15px;
          font-size: 12px;
        }
      }
    }
    .tip {
      padding-left: 10px;
      font-size: 22px;
    }
  }
  .link-btn {
    width: 30px;
    height: 30px;
    // box-sizing: border-box;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>