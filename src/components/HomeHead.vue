<template>
  <header class="header-box">
    <div class="left">
      <div class="time">
        <span>{{ timeNow.day }}</span>
        <span>{{ timeNow.month }}</span>
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
import { reactive, toRefs, computed, onBeforeMount } from "vue";
import timg from "../assets/images/timg.jpg";
import { formatTime } from "@/assets/utils.js";
import { useStore } from "vuex";
export default {
  name: "HomeHead",
  props: {
    time: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    // let state = reactive({
    //   //   pic: require("../assets/images/timg.jpg"),
    //   pic: timg,
    // });
    let pic = computed(() => {
      let { isLogin, info } = store.state;
      if (isLogin && info) {
        return info.pic|| timg;
      }
      return timg;
    });
    onBeforeMount(() => {
      let { isLogin, info } = store.state;
      if (isLogin === null) {
        store.dispatch("changeisLoginAsync");
      }
      if (info === null) {
        store.dispatch("changeInfoAsync");
      }
    });
    let timeNow = computed(() => {
      let time = props.time || null;
      let [month, day] = formatTime(time, "{1}-{2}").split("-");
      let area = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ];
      return {
        month: area[month - 1],
        day,
      };
    });
    return {
      //...toRefs(state),
      pic,
      timeNow,
    };
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