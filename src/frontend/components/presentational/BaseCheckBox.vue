<template>
  <!-- 今回使用するのは単一チェックボックスのみ -->
  <input
    type="checkbox"
    :id="id"
    :name="name"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style lang="scss" scoped></style>
