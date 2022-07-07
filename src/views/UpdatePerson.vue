<template>
  <Nav></Nav>
  <div class="form-box">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        :rules="[{ required: true, message: '请填写修改后的用户名' }]"
      />
      <van-field name="uploader" label="用户头像">
        <template #input>
          <van-uploader v-model="value" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        修改信息
      </van-button>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import { ref } from "vue";
export default {
  name: "UpdatePerson",
  components: { Nav },
  setup() {
    const value = ref([]);
    return { value };
  },
};
</script>
<style lang="less" scoped>
.form-box{
  margin-top: 30px;
}
</style>