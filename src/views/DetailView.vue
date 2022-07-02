<template>
  <van-skeleton title :row="5" v-if="newsInfo === null" />
  <div class="content" v-html="newsInfo.body" v-else></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="goBack" />
    <van-icon name="comment-o" :badge="comments" size="25" />
    <van-icon name="good-job-o" :badge="popularity" />
    <van-icon name="star-o" color="#1989fa" />
    <van-icon name="share-o" color="#ccc" />
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
  onUpdated,
} from "vue";
import api from "@/api/index.js";
export default {
  name: "DetailView",
  components: {},
  setup() {
    const route = useRoute();
    let state = reactive({
      popularity: 0,
      comments: 0,
      newsInfo: null,
    });
    onBeforeMount(async () => {
      let id = route.params.id;
      let result = await api.queryNewsInfo(id);
      state.newsInfo = result;
      // 动态创建CSS
      let link = document.createElement("link");
      link.id = "link";
      link.rel = "stylesheet";
      link.href = state.newsInfo.css[0];
      document.head.appendChild(link);
      let { popularity, comments } = await api.queryNewsStory(id);
      state.popularity = popularity;
      state.comments = comments;
    });
    onUpdated(() => {
      let imgPlaceHolder = document.querySelector(".img-place-holder");
      if (imgPlaceHolder) {
        if (imgPlaceHolder.innerHTML.trim() === "") {
          imgPlaceHolder.innerHTML += `<img src="${state.newsInfo.image}" alt="">`;
        }
      }
    });
    // 组件销毁移除CSS
    onBeforeUnmount(() => {
      let link = document.getElementById("link");
      if (!link) {
        return;
      } else {
        document.head.removeChild(link);
      }
    });
    const router = useRouter();
    function goBack() {
      router.go(-1);
    }
    return { ...toRefs(state), goBack };
  },
};
</script>

<style lang="less" scoped>
.van-skeleton {
  padding: 30px 15px;
}
.content {
  background: #fff;
  padding-bottom: 50px;
  /deep/ .img-place-holder {
    height: 375px;
    overflow: hidden;
    img {
      width: 100%;
      min-height: 100%;
      margin: 0;
      display: block;
    }
  }
}
.nav-box {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  background: #f4f4f4;
  //?
  .van-icon:nth-child(1) {
    position: relative;
    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: "";
      width: 1px;
      height: 120%;
      background: #d5d5d5;
    }
  }
  /deep/ .van-badge {
    background: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>