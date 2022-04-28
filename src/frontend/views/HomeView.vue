<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <app-routing-button buttonText="押してみよう！" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import BaseButton from "@/components/presentational/BaseButton.vue";
import AppRoutingButton from "@/components/container/AppRoutingButton.vue";

@Options({
  components: {
    HelloWorld,
    BaseButton,
    AppRoutingButton,
  },
})
export default class HomeView extends Vue {}
</script>
