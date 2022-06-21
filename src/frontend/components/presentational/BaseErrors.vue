<template>
  <div>テスト</div>
  <div
    class="input-errors"
    v-for="(error, index) in v$.stateKey.$errors"
    :key="index"
  >
    <div v-for="(moduleName, index) in moduleNames" :key="index">
      <div class="error-msg" v-if="error.$validator == moduleName">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  watch,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  onMounted,
  Ref,
} from "vue";
import { useVuelidate, Validation } from "@vuelidate/core";

export default defineComponent({
  props: {
    moduleNames: {
      type: Array as PropType<string[]>,
      required: true,
    },
    stateKey: {
      type: String,
      required: true,
    },
    stateValue: {
      type: String || Number,
      required: true,
    },
    errorMessage: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { stateKey } = toRefs(props);
    const { stateValue } = toRefs(props);
    const state = reactive({ [stateKey.value]: stateValue });
    let rule = reactive({ [stateKey.value]: {} });
    let v$: Ref<
      Validation<
        {
          // eslint-disable-next-line @typescript-eslint/ban-types
          [x: string]: {};
        },
        {
          [x: string]: string;
        }
      >
    >;

    const created = async () => {
      await import("@vuelidate/validators").then((module) => {
        for (let moduleName of props.moduleNames) {
          rule[stateKey.value] = {
            ...rule[stateKey.value],
            [moduleName]: module[moduleName],
          };
        }
        v$ = useVuelidate(rule, state);
        console.log("createdがよばれた");
        console.log(rule);
        console.log(stateValue.value);
        console.log(state);
        console.log(stateKey.value);
      });
    };
    created();

    // const view = () => {
    //   console.log(state);
    // };
    // watch(stateValue, () => {
    //   view();
    // });

    const validateTest = async () => {
      //   const v$ = useVuelidate(rule, state);
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;

      // バリデーションエラーじゃない場合にやりたい処理
    };

    return {
      created,
      validateTest,
    };
  },
});
</script>

<style lang="scss" scoped></style>
