<template>
  <div class="container">
    <div class="title-animation">
      <h1 class="title-logo">title（仮）</h1>
      <img
        class="humberger-img"
        src="../assets/hamburger-g53f2dd67d_640.jpg"
        alt="ハンバーガーの写真"
      />
      <img
        class="img muffin-img"
        src="../assets/muffins-g1f7348331_640.jpg"
        alt="マフィンの写真"
      />
    </div>
    <div class="login-wrapper">
      <div class="login">
        <h2>ログイン</h2>
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
          class="btn login-btn"
          buttonText="ログイン"
          @processing="validateTest"
        />
        <hr />
        <AppProcessingButton
          class="btn register-btn"
          buttonText="新規登録はこちら"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import BaseInput from "@/components/presentational/BaseInput.vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface InputType {
  email: string;
  password: string;
}

export default defineComponent({
  components: {
    BaseInput,
    AppProcessingButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state: InputType = reactive({
      email: "",
      password: "",
    });
    const resErrorMessage = reactive({
      email: "",
      password: "",
    });

    const fixedPassword = (value: string) => {
      const passwordRegex =
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
      if (value.length === 0) {
        return true;
      } else {
        return passwordRegex.test(value);
      }
    };

    const rules = computed(() => ({
      email: { required, email },
      password: {
        required,
        fixedPassword,
      },
    }));
    const v$ = useVuelidate(rules, state);
    const validateTest = async () => {
      const isFormCorrect = await v$.value.$validate();
      console.log(v$);
      if (!isFormCorrect) return;
      // バリデーションエラーじゃない場合にやりたい処理
      handleLogin(state);
    };
    const handleLogin = async (authInfo: InputType) => {
      try {
        const res = await store.dispatch("login", authInfo);

        if (res.data.message) {
          resErrorMessage.email = res.data.message;
        }
        router.push({ path: "/topview" });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      state,
      resErrorMessage,
      v$,
      validateTest,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 90%;
  margin: 0 auto;
  height: 80vh;
  .title-animation {
    width: 50%;
    margin-left: auto;
    position: relative;
    .title-logo {
      font-size: 3rem;
      padding: 30px 0;
    }
    img {
      width: 400px;
    }
    .muffin-img {
      position: absolute;
      top: 280px;
      right: 25px;
    }
  }

  .login-wrapper {
    width: 50%;
    margin-right: auto;
    border: solid;
    border-color: #dfdfdf;
    position: relative;
    .login {
      width: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      -webkit-transform: translateY(-50%) translateX(-50%);
      h2 {
        padding: 20px 0;
        font-size: 2rem;
      }
      :deep(.input-form) {
        width: 50%;
        height: 35px;
        border: 1px solid #dcdcdc;
      }
      .email,
      .password {
        margin-bottom: 35px;
      }
      .error-msg {
        color: red;
      }
      .btn {
        padding: 0;
        :deep(.btn) {
          font-size: 1rem;
          padding: 0.5rem 2rem;
        }
      }
      .login-btn {
        margin-bottom: 35px;
      }
      .register-btn {
        margin: 35px 0;
      }
      hr {
        height: 1px;
        width: 80%;
        margin: 0 auto;
        background-color: #dcdcdc;
        border: none;
      }
    }
  }
}
</style>
