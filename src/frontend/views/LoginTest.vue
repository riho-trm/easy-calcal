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
      <div class="user-id">
        <BaseInput
          id="user-id-input"
          name="user-id"
          type="text"
          placeholder="ユーザーID"
          v-model="state.userId"
        />
        <BaseErrors
          :moduleNames="['required', 'email']"
          stateKey="userId"
          :stateValue="state.userId"
          errorMessage="ユーザーIDを入力してください"
          ref="errorRef"
        />
      </div>
      <!-- <div class="password">
        <BaseInput
          id="password-input"
          name="password"
          type="password"
          placeholder="パスワード"
          v-model="state.password"
        />
        <div
          class="input-errors"
          v-for="(error, index) in v$.password.$errors"
          :key="index"
        >
          <div class="error-msg" v-if="error.$validator == 'required'">
            パスワードを入力してください
          </div>
        </div>
      </div> -->
      <AppProcessingButton buttonText="ログイン" @processing="onClickButton" />
      <hr />
      <AppProcessingButton buttonText="新規登録はこちら" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import BaseInput from "@/components/presentational/BaseInput.vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import BaseErrors from "@/components/presentational/BaseErrors.vue";

export default defineComponent({
  components: {
    BaseInput,
    AppProcessingButton,
    BaseErrors,
  },
  setup() {
    const state = reactive({
      userId: "",
      password: "",
    });
    const errorRef = ref<InstanceType<typeof BaseErrors>>();

    const onClickButton = () => {
      if (!errorRef.value) return;
      console.log(errorRef.value);
    };
    return {
      state,
      errorRef,
      onClickButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.error-msg {
  color: red;
}
</style>
