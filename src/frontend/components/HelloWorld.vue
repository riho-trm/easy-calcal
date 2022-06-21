<template>
  <div>
    <div>
      <h1>{{ data.result }}</h1>
    </div>
    <form>
      <input type="text" v-model="data.userName" />
      <button v-on:click.prevent="hello">挨拶</button>
      <br />
      <button v-on:click.prevent="test">router test表示</button>
      <br />
      <button v-on:click.prevent="logintest">ログインテスト</button>
    </form>
    <form>
      <label for="user-name">ユーザー名</label>
      <input id="user-name" type="text" v-model="formData.userName" />
      <label for="email">メールアドレス</label>
      <input id="email" type="text" v-model="formData.email" />
      <label for="password">パスワード</label>
      <input id="password" type="password" v-model="formData.password" />
      <button v-on:click.prevent="queryTest">登録</button>
    </form>
    <div>{{ result }}</div>
    <fa icon="leaf" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const data = reactive({
      userName: "",
    });
    const formData = reactive({
      userName: "",
      email: "",
      password: "",
    });
    let result: any;

    const test = async () => {
      const res = await axios.get("http://localhost:3000/login/test");
      console.log(res.data[0].user_name);
    };

    const show = async () => {
      const res = await axios.get("http://localhost:3000/show");
      console.log(res.data);
    };

    const hello = async () => {
      const res = await axios.post("http://localhost:3000/api/hello", {
        userName: data.userName,
      });
      alert(res.data);
    };
    const json = async () => {
      const res = await axios.get("http://localhost:3000/api/version");
      console.log(res.data);
    };
    const logintest = async () => {
      const data = {
        userName: "長澤まさみ",
        email: "nagasawamasami@test.com",
        password: "masamasa1234",
        isadmin: false,
      };
      const res = await axios.post("http://localhost:3000/logintest", data);
      console.log(res.data);
    };
    const queryTest = async () => {
      console.log("queryTestが押された");
      const res = await axios.post("http://localhost:3000/login/register", {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        isadmin: false,
      });
      console.log(res);
    };

    return {
      data,
      formData,
      result,
      hello,
      test,
      json,
      show,
      logintest,
      queryTest,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
