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
          id="display-food-name-input"
          name="display-food-name-input"
          type="text"
          v-model="state.toDisplayFoodName"
        />
      </div>
      <div class="unit-form">
        <BaseLabel id="unit-name">単位（例:大さじ、個etc）</BaseLabel>
        <BaseInput
          id="unit-input"
          name="unit-input"
          type="text"
          v-model="state.unit"
        />
      </div>
      <div class="standard-quantity-form">
        <BaseLabel id="standard-quantity-name">単位あたりの量（g）</BaseLabel>
        <BaseInput
          id="standard-quantity-input"
          name="standard-quantity-input"
          type="text"
          v-model="state.standardQuantity"
        />
      </div>
      <div class="include-displsal-form">
        <BaseLabel id="include-displsal-name">廃棄率を含む</BaseLabel>
        <BaseCheckbox
          id="include-display-box"
          name="include-display-box"
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

<style lang="scss" scoped></style>
