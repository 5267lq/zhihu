<template>
  <Nav title="收藏列表"></Nav>
  <van-empty description="暂无收藏" />
  <van-swipe-cell :before-close="beforeClose">
    <div class="con">
      <!-- <news-item></news-item> -->
    </div>
    <template #right>
      <van-button square type="danger" text="删除" />
    </template>
  </van-swipe-cell>
</template>

<script>
import Nav from "../components/Nav.vue";
import NewsItem from "../components/NewsItem.vue";
export default {
  name: "StoreView",
  components: { Nav, NewsItem },
  setup() {

  },
};
</script>

<style lang="less" scoped>
</style>