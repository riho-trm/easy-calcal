<template>
  <div class="container">
    <div class="title-animation">
      <h1 class="title-logo">title（仮）</h1>
      <img
        src="../assets/hamburger-g53f2dd67d_640.jpg"
        alt="ハンバーガーの写真"
      />
      <img src="../assets/muffins-g1f7348331_640.jpg" alt="マフィンの写真" />
    </div>
    <div id="login">
      <h2>ログイン</h2>
      <BaseInput
        id="user-id"
        name="user-id"
        type="text"
        placeholder="ユーザーID"
        v-model="userId"
      />
      <BaseInput
        id="password"
        name="password"
        type="password"
        placeholder="パスワード"
        v-model="password"
      />
      <AppProcessingButton buttonText="ログイン" />
      <hr />
      <AppProcessingButton buttonText="新規登録はこちら" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseInput from "@/components/presentational/BaseInput.vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";

export default defineComponent({
  components: {
    BaseInput,
    AppProcessingButton,
  },
  setup() {
    let userId = ref("");
    let password = ref("");
    return {
      userId,
      password,
    };
  },
});
</script>

<style lang="scss" scoped></style>
