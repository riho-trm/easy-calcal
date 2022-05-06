<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <app-routing-button buttonText="押してみよう！" routing="about" />
    <BaseInput v-model="message" />
    <div>{{ message }}</div>
    <BaseCheckBox name="" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// import BaseButton from "@/components/presentational/BaseButton.vue";
import AppRoutingButton from "@/components/container/AppRoutingButton.vue";
import BaseInput from "@/components/presentational/BaseInput.vue";
import BaseCheckBox from "@/components/presentational/BaseCheckBox.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    HelloWorld,
    // BaseButton,
    AppRoutingButton,
    BaseInput,
  },
  setup() {
    let message = ref("");
    return { message };
  },
});
</script>
