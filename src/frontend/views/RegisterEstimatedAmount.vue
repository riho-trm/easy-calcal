<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="page-title">
        <div class="title">目安量登録</div>
        <p>※目安量はDBに登録されている食材のみ登録可能です</p>
      </div>
      <div class="food-name-form">
        <BaseLabel id="food-name">食材名（栄養成分表登録名）</BaseLabel>
        <SimpleTypeahead
          id="food-name-input"
          placeholder="食材名を検索"
          :items="sugestItems"
          :minInputLength="1"
          @selectItem="selectItem"
        />
        <!-- 後でdisabledのcssを設定 -->
        <BaseInput
          id="selected-food"
          name="selected-food"
          type="text"
          placeholder="自動入力"
          v-model="state.nutrientsListFoodName"
          disabled
        />
      </div>
      <div class="display-food-name-form">
        <BaseLabel id="display-food-name">食材名（表示用）</BaseLabel>
        <BaseInput
          id="display-food-name"
          name="display-food-name"
          type="text"
          v-model="state.toDisplayFoodName"
        />
      </div>
      <div class="unit-form">
        <BaseLabel id="unit-name"
          >単位（例:大さじ、個etc、数量は1固定）</BaseLabel
        >
        <BaseInput
          id="unit-name"
          name="unit-name"
          type="text"
          v-model="state.unit"
        />
      </div>
      <div class="standard-quantity-form">
        <BaseLabel id="standard-quantity-name">単位あたりの量（g）</BaseLabel>
        <BaseInput
          id="standard-quantity-name"
          name="standard-quantity-name"
          type="text"
          v-model="state.standardQuantity"
        />
      </div>
      <div class="include-displsal-form">
        <BaseLabel id="include-displsal-name">廃棄率を含む</BaseLabel>
        <BaseCheckbox
          id="include-display-name"
          name="include-display-name"
          v-model:modelValue="state.includeDisposal"
        />
      </div>
      <div class="button">
        <AppCancelButton buttonText="キャンセル" />
        <AppProcessingButton buttonText="保存" @processing="save" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseInput from "@/components/presentational/BaseInput.vue";
import BaseLabel from "@/components/presentational/BaseLabel.vue";
import BaseCheckbox from "@/components/presentational/BaseCheckBox.vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import AppCancelButton from "@/components/container/AppCancelButton.vue";
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import SimpleTypeahead from "vue3-simple-typeahead";

export default defineComponent({
  components: {
    BaseLabel,
    SimpleTypeahead,
    BaseInput,
    BaseCheckbox,
    AppCancelButton,
    AppProcessingButton,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      nutrientsListFoodName: "",
      toDisplayFoodName: "",
      unit: "",
      standardQuantity: null as null | number,
      includeDisposal: false,
    });
    let sugestItems = reactive([]);

    const created = () => {
      sugestItems = store.getters.getSugestList;
      console.log(sugestItems);
    };
    created();

    const selectItem = (item: any) => {
      state.nutrientsListFoodName = item;
    };

    const save = () => {
      console.dir(JSON.stringify(state));
    };

    return {
      state,
      sugestItems,
      selectItem,
      save,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(label) {
  font-size: 1rem;
  font-weight: 450;
  padding: 1rem 5rem;
  display: block;
  width: 100%;
  text-align: left;
}
:deep(.input-form) {
  width: 50%;
  height: 35px;
  border: 1px solid #dcdcdc;
  font-size: 150%;
}

.top-wrapper {
  background-color: #f0f9ff;
  min-height: 100vh;
  .container {
    width: 90%;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    .page-title {
      display: flex;
      padding: 2rem 2rem;
      justify-content: space-around;
      .title {
        font-size: 2rem;
        font-weight: 500;
      }
      p {
        font-size: 1.3rem;
        display: flex;
        align-items: center;
      }
    }
    .food-name-form {
      :deep(.simple-typeahead) {
        position: relative;
        .simple-typeahead-input {
          width: 50%;
          height: 35px;
          border: 1px solid #dcdcdc;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 3px;
          margin-bottom: 1rem;
          font-size: 150%;
        }
        .simple-typeahead-list {
          position: absolute;
          top: 35px;
          left: 25%;
          width: 50%;
          max-height: 400px;
          overflow-y: auto;
          border-bottom: 0.1rem solid #d1d1d1;
          z-index: 9;
          margin-left: auto;
          margin-right: auto;
          .simple-typeahead-list-item {
            cursor: pointer;
            border-bottom: 0.1rem solid #d1d1d1;
            background-color: #fafafa;
            padding: 0.6rem 1rem;
            border-left: 0.1rem solid #d1d1d1;
            border-right: 0.1rem solid #d1d1d1;
          }
          .simple-typeahead-list-item-active {
            background-color: #e1e1e1;
          }
        }
      }
      :deep(#selected-food) {
        background-color: #bcbbbb;
      }
    }
    .include-displsal-form {
      :deep(#include-display-name) {
        transform: scale(2);
      }
    }
    .button {
      width: 60%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
      padding: 0;
      padding: 2rem 0;
      :deep(.btn) {
        font-size: 1rem;
        padding: 0.5rem 2rem;
        margin: 0 1rem;
      }
    }
  }
}
</style>
