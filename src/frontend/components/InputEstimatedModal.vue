<template>
  <teleport to="body">
    <div class="modal" id="cancel-modal" v-show="isVisible"></div>
    <div class="modal-content" v-show="isVisible">
      <div class="modal-wrapper">
        <div class="food-name-input">
          <BaseLabel id="food-name">食材名</BaseLabel>
          <BaseInput
            id="food-name"
            name="food-name"
            type="text"
            v-model="setFoodName"
            disabled
          />
        </div>
        <div class="quantity-form">
          <!-- required、数字のみのバリデーションを行う -->
          <!-- v-modelの設定 -->
          <div class="quantity-input">
            <BaseLabel id="quantity">量</BaseLabel>
            <BaseInput
              id="quantity"
              name="quantity"
              type="text"
              v-model="quantity"
            />
          </div>
          <div class="unit-input">
            <!-- requiredのバリデーションを行う -->
            <BaseLabel id="unit">単位</BaseLabel>
            <v-select
              name="unit"
              v-bind:options="options"
              v-model="select"
            ></v-select>
          </div>
        </div>
        <div class="gram-input">
          <BaseLabel id="gram">グラム換算</BaseLabel>
          <div class="add-unit">
            <BaseInput
              id="gram"
              name="gram"
              type="text"
              v-model="calcQuantity"
              disabled
            />
            <p>g</p>
          </div>
        </div>
        <div class="btn">
          <div class="cancel" @click="cancel"><fa icon="xmark" /></div>
          <AppProcessingButton buttonText="反映" @processing="processing" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import BaseInput from "./presentational/BaseInput.vue";
import BaseLabel from "./presentational/BaseLabel.vue";
import "vue-select/dist/vue-select.css";
import AppProcessingButton from "./container/AppProcessingButton.vue";
import { Selected } from "@/types/task";

export default defineComponent({
  components: { BaseLabel, BaseInput, AppProcessingButton },
  props: {
    isVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
    foodName: { type: String, required: true },
    estimatedIdList: { type: Array, required: true },
    index: { type: Number, required: true },
  },
  emits: ["cancel", "processing"],
  setup(props, context) {
    // propsでもらうもの：food.nutrient.food_name(食材名),food.EstimatedIdList(目安量ID一覧（配列）)
    // emitで渡すもの：計算済みのグラム
    // storeから取得するもの：目安量idを渡す→単位、グラムをもらう

    const store = useStore();

    const { estimatedIdList } = toRefs(props);
    let select = ref("") as any;
    let options = reactive([]) as Selected[];
    let quantity = ref(0);
    let copiedFoodName = "";
    let calculatedQuantity = 0;

    watch(estimatedIdList, () => {
      console.log("watchが呼ばれた");
      console.log(props.estimatedIdList);
      console.log(estimatedIdList);
      options.splice(0);
      for (const id of props.estimatedIdList) {
        console.log(id);

        const res = store.getters.getEstimatedAmount(id);
        console.log(res);
        options.push({
          label: res.unit,
          unit: res.unit,
          standardQuantity: res.standardQuantity,
        });
      }
      console.log(options);
    });

    const setFoodName = computed(() => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      copiedFoodName = props.foodName;
      return copiedFoodName;
    });

    const calcQuantity = computed(() => {
      const calcData = select.value.standardQuantity * quantity.value;
      console.log(Math.round(calcData * 100) / 100);
      if (isNaN(calcData)) {
        calculatedQuantity = 0;
        return calculatedQuantity;
      } else {
        calculatedQuantity = Math.round(calcData * 100) / 100;
        return calculatedQuantity;
      }
    });

    const cancel = () => {
      context.emit("cancel");
      select.value = "";
      quantity.value = 0;
      copiedFoodName = "";
      calculatedQuantity = 0;
    };
    const processing = () => {
      context.emit(
        "processing",
        calculatedQuantity,
        props.index,
        props.foodName
      );
      select.value = "";
      quantity.value = 0;
      copiedFoodName = "";
      calculatedQuantity = 0;
    };

    return {
      select,
      options,
      quantity,
      copiedFoodName,
      setFoodName,
      calcQuantity,
      cancel,
      processing,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  font-family: "Kiwi Maru", serif;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // モーダルの幅や色などはお好きにどうぞ！
  background-color: white;
  width: 600px;
  height: auto;
  padding: 20px;
  .modal-wrapper {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    :deep(label) {
      font-size: 1.3rem;
      font-weight: 450;
      padding: 1rem 0;
      display: block;
      width: 100%;
      text-align: left;
    }
    :deep(.input-form) {
      width: 30%;
      height: 35px;
      border: 1px solid #dcdcdc;
      font-size: 100%;
      margin-left: 1rem;
    }
    .food-name-input {
      :deep(.input-form) {
        width: 90%;
        background-color: #bcbbbb;
      }
    }
    .unit-input {
      .v-select {
        width: 30%;
        margin-left: 1rem;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
    .gram-input {
      .add-unit {
        display: flex;
        :deep(.input-form) {
          background-color: #bcbbbb;
        }
        p {
          font-size: 1rem;
          font-weight: 400;
          padding-left: 1rem;
        }
      }
    }

    .btn {
      width: 70%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
      padding: 2rem 0;
      :deep(.btn) {
        font-size: 1.5rem;
        padding: 0.5rem 2rem;
        margin: 0 1rem;
      }
      .cancel {
        font-size: 2rem;
        color: gray;
        position: absolute;
        top: 1rem;
        right: 2rem;
        cursor: pointer;
      }
    }
  }
}
</style>
