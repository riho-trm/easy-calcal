<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <BaseButton button-text="押してみて" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import BaseButton from "@/components/presentational/BaseButton.vue";

@Options({
  components: {
    HelloWorld,
    BaseButton,
  },
})
export default class HomeView extends Vue {}
</script>
