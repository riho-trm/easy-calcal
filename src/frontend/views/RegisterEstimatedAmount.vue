<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="page-title">
        <div class="title">目安量登録</div>
        <p>※目安量はDBに登録されている食材のみ登録可能です</p>
      </div>
      <div class="food-name-form">
        <BaseLabel id="food-name">食材名（栄養成分表登録名）</BaseLabel>
        <BaseInput
          id="food-name-input"
          name="food-name-input"
          type="text"
          placeholder="食材名を検索"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseInput from "@/components/presentational/BaseInput.vue";
import BaseLabel from "@/components/presentational/BaseLabel.vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { BaseLabel, BaseInput },
  setup() {
    const store = useStore();

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
