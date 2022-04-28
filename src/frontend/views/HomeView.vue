<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <app-routing-button buttonText="押してみよう！" routing="about" />
    <BaseForm v-model="message" />
    <div>{{ message }}</div>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// import BaseButton from "@/components/presentational/BaseButton.vue";
import AppRoutingButton from "@/components/container/AppRoutingButton.vue";
import BaseForm from "@/components/presentational/BaseForm.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    HelloWorld,
    // BaseButton,
    AppRoutingButton,
    BaseForm,
  },
  setup() {
    let message = ref("");
    return { message };
  },
});
</script>
