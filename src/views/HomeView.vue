<template>
  <home-head :time="today"></home-head>
  <section class="banner-box">
    <van-swipe
      v-if="bannersList.length > 0"
      :autoplay="3000"
      indicator-color="white"
      lazy-render
    >
      <van-swipe-item v-for="banner in bannersList" :key="banner.id">
        <router-link :to="`/detail/${banner.id}`" class="content">
          <img :src="banner.image" alt="" />
          <div class="mark">
            <h3 class="title">{{ banner.title }}</h3>
            <span class="tip">{{ banner.hint }}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<script>
import HomeHead from "../components/HomeHead.vue";
import { reactive, toRefs, onBeforeMount } from "vue";
import axios from "@/api/index.js";
export default {
  name: "HomeView",
  components: {
    HomeHead,
  },
  setup() {
    let state = reactive({
      today: "",
      newsList: [],
      bannersList: [],
    });
    // 第一次加载获取数据
    onBeforeMount(async () => {
      let result = await axios.queryNewsLatest();
      // state.today=result.date
      // state.newsList=result.stories
      // state.banners=result.top_stories
      console.log(result);
      let { date, stories, top_stories } = await axios.queryNewsLatest();
      state.today = date;
      // state.newsList.push({
      //   date,
      //   stories,
      // });
      state.newsList.push(Object.freeze({
        date,
        stories,
      }));
      console.log(state.newsList[0])
      // state.bannersList = top_stories;
      //性能优化---对于不经常更新的数据冻结，不再做响应式处理
      state.bannersList = Object.freeze(top_stories);
    });

    return { ...toRefs(state) };
  },
};
</script>
<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #bbbbbb;
  .van-swipe {
    height: 100%;
    background: white;
    .content {
      position: relative;
      display: block;
      height: 100%;
      color: white;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .mark {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        padding: 10px 20px;
        width: 100%;
        height: 110px;
        background: rgba(0, 0, 0, 0.1);
        background: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5)
        );
        .title {
          padding-top: 10px;
          max-height: 50px;
          font-size: 20px;
          line-height: 25px;
          overflow: hidden;
          margin: 0;
        }
        .tip {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    /deep/ .van-swipe__indicators {
      left: auto;
      right: 15px;
      transform: none;
      .van-swipe__indicator--active {
        width: 15px;
        border-radius: 3px;
      }
    }
  }
}
</style>
