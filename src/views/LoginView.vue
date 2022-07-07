<template>
  <Nav></Nav>
  <van-form ref="formBox" @submit="submit">
    <van-cell-group inset>
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: regPhone, message: '手机号格式错误' },
        ]"
      >
        <template #button>
          <van-button
            size="small"
            :type="isBtnAccess ? 'primary' : ''"
            class="form-btn"
            @click="sendcode"
            :disabled="!isBtnAccess"
            >{{ isBtnAccess ? "发送验证码" : time }}</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        center
        clearable
        label="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: regCode, message: '请输入有效的验证码' },
        ]"
      >
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        立即登录/注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { reactive, toRefs, ref } from "vue";
import api from "@/api/index.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
export default {
  name: "LoginView",
  components: { Nav },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    console.log(route);
    let formBox = ref(null);
    let state = reactive({
      phone: "",
      code: "",
      isBtnAccess: true,
      time: "60s",
    });
    //发送验证码
    const sendcode = async () => {
      try {
        // 校验手机号格式?
        await formBox.value.validate("phone");
        //向服务器发送请求
        let { code } = await api.phoneCode(state.phone);
        if (+code !== 0) {
          Toast("网络延迟，请稍后再试");
          return;
        }
        //开启按钮倒计时
        state.isBtnAccess = false;
        let n = 60;
        let timer = setInterval(() => {
          n--;
          if (n === 0) {
            clearInterval(timer);
            state.isBtnAccess = true;
            return;
          }
          state.time = `${n}s`;
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    const submit = async () => {
      let { code, token } = await api.login(state.phone, state.code);
      if (+code !== 0) {
        Toast("很遗憾登录失败");
        formBox.value.resetValidation();
        state.code = "";
        return;
      }
      localStorage.setItem("token", token);
      store.commit("changeisLogin", true);
      store.dispatch("changeInfoAsync");
      Toast("登录成功");
      //跳转到指定地址
      let from = route.query.from;
      if (from) {
        router.replace(`/${from}`);
        return;
      }
      router.replace("/person");
    };
    return {
      ...toRefs(state),
      regPhone: /^1\d{10}$/,
      regCode: /^\d{6}$/,
      formBox,
      sendcode,
      submit,
    };
  },
};
</script>
<style lang="less" scoped>
.van-form {
  margin-top: 30px;
  .form-btn {
    width: 78px;
  }
}
</style>
