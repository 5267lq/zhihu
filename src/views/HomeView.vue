<template>
  <home-head></home-head>
</template>

<script>
import HomeHead from "../components/HomeHead.vue";
import { reactive, toRefs, onBeforeMount } from "vue";
import axios from "@/api/index.js";
export default {
  name: "HomeView",
  setup() {
    let state = reactive({
      today: "",
      newsList: [],
      banners: [],
    });
    // 第一次加载获取数据
    onBeforeMount(async () => {
      // let result = await axios.queryNewsLatest();
      // state.today=result.date
      // state.newsList=result.stories
      // state.banners=result.top_stories
      // console.log(result);
      let { date, stories, top_stories } = await axios.queryNewsLatest();
      state.today=date
      state.newsList.push({
        date,
        stories
      })
      state.banners=top_stories
    });

    return { ...toRefs(state) };
  },
};
</script>
<style lang="less" scoped>
</style>
