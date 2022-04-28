<template>
  <div>
    <BaseButton :button-text="buttonText" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/presentational/BaseButton.vue";

export default defineComponent({
  components: { BaseButton },
  props: {
    buttonText: {
      type: String,
      default: "PUSH",
    },
    routing: {
      type: String,
      require: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style></style>
