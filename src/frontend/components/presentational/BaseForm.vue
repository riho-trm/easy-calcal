<template>
  <input
    type="text"
    class="input-form"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// 親コンポーネントに埋める際はinputのvalueを格納する変数を用意し、v-modelを設定する
export default defineComponent({
  props: ["modelValue"],
  emits: ["update:modelValue"],
});
</script>

<style lang="scss" scoped>
.input-form {
  background-color: #fff;
  border: 1px solid #6f6f6f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
</style>
