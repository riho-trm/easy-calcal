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
// 仮CSS
.input-form {
  border: 0;
  padding: 10px;
  font-size: 1.3em;
  font-family: Arial, sans-serif;
  color: #aaa;
  border: solid 1px #ccc;
  margin: 0 0 20px;
  width: 300px;
}
</style>
