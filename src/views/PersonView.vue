<template>
  <Nav></Nav>
  <div class="base-info" v-if="info">
    <img :src="info.pic" alt="" @click="$router.push('/updateperson')" />
    <p>{{ info.name }}</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link url="#/store"/>
    <van-cell value="退出登录" @click="quit" />
  </van-cell-group>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { onBeforeMount, computed } from "vue";
export default {
  name: "PersonView",
  components: { Nav },
  setup() {
    const store = useStore();
    const router = useRouter();
    //能进入person页面一定isLogin为true，这么写虽然没必要但更严谨
    let info = computed(() => {
      let { isLogin, info } = store.state;
      if (isLogin && info) {
        return info;
      }
      return null;
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
    const quit = () => {
      Toast("退出成功");
      localStorage.removeItem("token");
      store.commit("changeisLogin", null);
      store.commit("changeInfo", null);
      router.replace("/login");
    };
    return { info, quit };
  },
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
