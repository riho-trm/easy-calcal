<template>
  <input
    class="input-form"
    :id="id"
    :name="name"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
// input typeの型を指定
type InputAttr =
  | "text"
  | "number"
  | "email"
  | "url"
  | "password"
  | "tel"
  | "date"
  | "time";
// 親コンポーネントに埋める際はinputのvalueを格納する変数を用意し、v-modelを設定する
export default defineComponent({
  props: {
    id: { type: String, repuired: true },
    name: { type: String, repuired: true },
    type: { type: String as PropType<InputAttr>, repuired: true },
    modelValue: { type: String, repuired: true },
    placeholder: { type: String },
  },
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
