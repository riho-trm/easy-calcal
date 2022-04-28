<template>
  <div>
    <div>
      <h1>{{ data.result }}</h1>
    </div>
    <form>
      <input type="text" v-model="data.userName" />
      <button v-on:click.prevent="hello">挨拶</button>
    </form>
    <div>テスト</div>
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
      result: "",
    });

    const test = async () => {
      const res = await axios.get("/test");
      console.log(res.data[0].user_name);
      data.result = res.data[0].user_name;
    };
    test();

    const hello = async () => {
      const res = await axios.post("http://localhost:3000/api/hello", {
        userName: data.userName,
      });
      alert(res.data);
    };

    return {
      data,
      hello,
      test,
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
