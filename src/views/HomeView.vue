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
  <van-skeleton title :row="5" v-if="newsList.length === 0" />
  <div v-else>
    <section class="news-box" v-for="(item, index) in newsList" :key="index">
      <van-divider content-position="left" v-if="index !== 0">
        {{ formatTime(item.date, "{1}月{2}日") }}</van-divider
      >
      <div class="content" v-for="(story, i) in item.stories" :key="i">
        <news-item :data="story"></news-item>
      </div>
      <!-- <div class="content">
        <news-item v-for="item2 in item.stories" :key="item2.id" :data="item2"></news-item>
      </div> -->
    </section>
  </div>
  <div class="lazy-more" v-show="newsList.length !== 0" ref="loadingMore">
    <van-loading size="14px">您好，精彩数据准备中...</van-loading>
  </div>
</template>

<script>
import HomeHead from "../components/HomeHead.vue";
import NewsItem from "../components/NewsItem.vue";
import { reactive, toRefs, onBeforeMount, onMounted, ref } from "vue";
import { formatTime } from "@/assets/utils.js";
import api from "@/api/index.js";
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
    let loadingMore = ref(null);
    // 第一次加载获取数据
    onBeforeMount(async () => {
      // let result = await axios.queryNewsLatest();
      // state.today=result.date
      // state.newsList=result.stories
      // state.banners=result.top_stories
      // console.log(result);
      let { date, stories, top_stories } = await api.queryNewsLatest();
      state.today = date;
      // state.newsList.push({
      //   date,
      //   stories,
      // });
      state.newsList.push(
        Object.freeze({
          date,
          stories,
        })
      );
      console.log(state.newsList[0]);
      // state.bannersList = top_stories;
      //性能优化---对于不经常更新的数据冻结，不再做响应式处理
      state.bannersList = Object.freeze(top_stories);
    });
    // 第一次加载完，获取更多数据
    onMounted(() => {
      // 拿到DOM元素
      console.log(loadingMore.value);
      // Intersection Observer监听某个Dom元素和可视窗口交叉位置的改变
      let intersectionObserver = new IntersectionObserver(async (changes) => {
        let item = changes[0];
        if (item.isIntersecting) {
          let result = await api.queryNewsBefore(
            state.newsList[state.newsList.length - 1]["date"]
          ); //?
          state.newsList.push(Object.freeze(result));
        }
      });
      intersectionObserver.observe(loadingMore.value);
    });
    return { ...toRefs(state), formatTime, loadingMore };
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
.news-box {
  padding: 0 15px;
  .van-divider {
    margin: 5px 0;
    font-size: 14px;
    &::before {
      display: none;
    }
  }
}
.van-skeleton {
  padding: 30px 15px;
}
.lazy-more {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>
