<template>
  <BaseButton :button-text="buttonText" @button-clicked="cancel" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "../presentational/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    buttonText: {
      type: String,
      default: "PUSH",
    },
  },
  setup(props, context) {
    const cancel = () => {
      context.emit("close");
    };
    return { cancel };
  },
});
</script>

<style></style>
