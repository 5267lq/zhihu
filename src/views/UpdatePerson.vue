<template>
  <Nav></Nav>
  <div class="form-box">
    <van-cell-group inset>
      <van-field v-model="name" label="用户名" />
      <van-field label="用户头像">
        <template #input>
          <van-uploader v-model="pic" max-count="1" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 20px 40px">
      <van-button :loading="isLoading" loading-text="处理中..." round block type="primary" @click="submit">
        修改信息
      </van-button>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import api from "../api/index.js";
export default {
  name: "UpdatePerson",
  components: { Nav },
  setup() {
    //也可类似person个人主页设置一个更严谨的对于isLogin\info的校验，这里没做
    const store = useStore();
    const router = useRouter();
    let { name } = store.state.info;
    let state = reactive({
      name,
      pic: [],
      isLoading:false,
    });
    const submit = async () => {
      if(state.isLoading){
        return
      }
      state.isLoading=true
      let { name, pic } = state;
      let reg = /^[\w\u4e00-\u9fa5]+$/;
      //格式校验
      if (!reg.test(name)) {
        Toast("修改后的用户名格式不符合规则");
        return;
      }
      if (pic.length === 0) {
        Toast("必须上传一张图片");
        return;
      }
      //提交数据给服务器
      let { code, data } = await api.userUpdate(name, pic[0].file);//差一个图片格式处理，断点续传、分片传图...
      if (+code !== 0) {
        Toast("信息修改失败，请稍后再试");
        return;
      }
      Toast("信息修改成功");
      store.commit("changeInfo", data);
      router.replace("/person");
      state.isLoading=false
    };
    return { ...toRefs(state), submit };
  },
};
</script>
<style lang="less" scoped>
.form-box {
  margin-top: 30px;
}
</style>