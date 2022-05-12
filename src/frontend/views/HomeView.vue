<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <app-routing-button buttonText="about" routing="about" />
    <app-routing-button buttonText="login" routing="login" />
    <BaseInput v-model="message" />
    <div>{{ message }}</div>
    <BaseCheckBox
      id="test-check-box1"
      name="test-check-box1"
      v-model="parrentCheckState"
    />
    <div>{{ parrentCheckState }}</div>
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
    BaseCheckBox,
  },
  setup() {
    let message = ref("");
    let parrentCheckState = ref(true);
    return { message, parrentCheckState };
  },
});
</script>
