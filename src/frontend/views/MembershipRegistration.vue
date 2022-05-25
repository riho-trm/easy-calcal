<template>
  <div class="container">
    <div class="title-wrapper">
      <h1 class="title-logo">title（仮）</h1>
    </div>

    <!-- <div class="register-wrapper">
      <div class="register-form">
        <h2>新規登録</h2>

        <div class="email">
          <BaseInput
            id="email-input"
            name="email-input"
            type="email"
            placeholder="メールアドレス"
            v-model="state.email"
          />
          <div
            class="input-errors"
            v-for="(error, index) in v$.email.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="error.$validator == 'required'">
              メールアドレスを入力してください
            </div>
            <div class="error-msg" v-else-if="error.$validator == 'email'">
              メールアドレスの形式が不正です
            </div>
          </div>
          <div class="error-msg">
            {{ resErrorMessage.email }}
          </div>
        </div>

        <div class="user-id">
          <BaseInput
            id="user-id-input"
            name="euser-id-input"
            type="text"
            placeholder="ユーザーID"
            v-model="state.userId"
          />
          <div
            class="input-errors"
            v-for="(error, index) in v$.userId.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="error.$validator == 'required'">
              メールアドレスを入力してください
            </div>
            <div class="error-msg" v-else-if="error.$validator == 'email'">
              メールアドレスの形式が不正です
            </div>
          </div>
          <div class="error-msg">
            {{ resErrorMessage.email }}
          </div>
        </div>

        <div class="password">
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
            <div class="error-msg" v-if="error.$validator === 'required'">
              パスワードを入力してください
            </div>
            <div class="error-msg" v-if="error.$validator === 'fixedPassword'">
              大小半角英数字混在で8文字以上のパスワードを入力してください
            </div>
          </div>
          <div class="error-msg">
            {{ resErrorMessage.password }}
          </div>
        </div>
        <AppProcessingButton
          class="btn register-btn"
          buttonText="登録"
          @processing="validateTest"
        />
        <hr />
        <AppProcessingButton
          class="btn login-btn"
          buttonText="ログインはこちら"
        />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.container {
  .title-wrapper {
    width: 100%;
    height: 80px;
    display: flex;
    .title-logo {
      align-self: center;
      font-size: 2rem;
      padding-left: 1.2rem;
    }
  }
}
</style>
