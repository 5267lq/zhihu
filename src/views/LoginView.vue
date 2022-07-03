<template>
  <Nav></Nav>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="手机号"
        label="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #button>
          <van-button size="small" type="primary" class="form-btn">发送验证码</van-button>
        </template>
      </van-field>
      <van-field v-model="sms" center clearable label="验证码"> </van-field>
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
export default {
  name: "LoginView",
  components: {Nav},
};
</script>
<style lang="less" scoped>
.van-form{
  margin-top: 30px;
  .form-btn{
    width: 78px;
  }
}
</style>
