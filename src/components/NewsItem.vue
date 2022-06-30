<template>
  <div class="news-item">
    <router-link :to="`/detail/${data.id}`">
      <div class="img-box">
        <img
          v-if="data.images && data.images.length > 0"
          v-lazy="data.images[0]"
          alt=""
        />
      </div>
      <h4 class="title">{{ data.title }}</h4>
      <p class="desc">{{ data.hint }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  // props:["news"]
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>

<style lang="less" scoped>
.news-item {
  position: relative;
  box-sizing: border-box;
  height: 95px;
  padding: 15px 0;
  overflow: hidden;
  .img-box {
    position: absolute;
    width: 65px;
    height: 65px;
    right: 0;
    top: 15px;
    background: #d5d5d5;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .title {
    max-height: 50px;
    font-size: 16px;
    line-height: 25px;
    overflow: hidden;
    color: black;
    margin: 0 75px 0 0;
  }
  .desc {
    font-size: 12px;
    line-height: 15px;
    color: #999;
    margin: 0 75px 0 0;
  }
}
</style>