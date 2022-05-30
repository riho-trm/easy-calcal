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
        <BaseInput
          id="selected-food"
          name="selected-food"
          type="text"
          placeholder="自動入力"
          v-model="selectedItem"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseInput from "@/components/presentational/BaseInput.vue";
import BaseLabel from "@/components/presentational/BaseLabel.vue";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import SimpleTypeahead from "vue3-simple-typeahead";

export default defineComponent({
  components: { BaseLabel, SimpleTypeahead, BaseInput },
  setup() {
    const store = useStore();

    const state = reactive({
      inputFood: "",
    });
    let sugestItems = reactive([]);
    let selectedItem = ref("");

    const created = () => {
      sugestItems = store.getters.getSugestList;
      console.log(sugestItems);
    };
    created();

    const selectItem = (item: any) => {
      selectedItem.value = item;
    };

    return {
      state,
      sugestItems,
      selectedItem,
      selectItem,
    };
  },
});
</script>

<style lang="scss" scoped></style>
