<template>
  <template v-for="option in options" :key="option.id">
    <BaseLabel :id="option.id">
      <input
        type="checkbox"
        :id="option.id"
        :name="name"
        :value="option.value"
        @change="updateValue"
      />{{ option.label }}
    </BaseLabel>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, SetupContext } from "vue";
import BaseLabel from "../presentational/BaseLabel.vue";

type CheckboxState = {
  values: string[];
};

export default defineComponent({
  components: {
    BaseLabel,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<InputItem[]>,
      required: true,
    },
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const state = reactive<CheckboxState>({
      values: [],
    });
    const updateValue = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        const value = e.target.value;
        if (e.target.checked) {
          state.values = [...state.values, value];
        } else {
          state.values = state.values.filter((v) => v !== value);
        }
        context.emit("update:value", state.values);
      }
    };

    return {
      props,
      updateValue,
    };
  },
});
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  padding: 5px 30px;
  position: relative;
  width: auto;
}
input[type="checkbox"]::before {
  background: #fff;
  border: 1px solid #231815;
  content: "";
  display: block;
  height: 16px;
  left: 5px;
  margin-top: -8px;
  position: absolute;
  top: 50%;
  width: 16px;
}
input[type="checkbox"]::after {
  border-right: 3px solid #ed7a9c;
  border-bottom: 3px solid #ed7a9c;
  content: "";
  display: block;
  height: 9px;
  left: 10px;
  margin-top: -7px;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: rotate(45deg);
  width: 5px;
}
</style>
