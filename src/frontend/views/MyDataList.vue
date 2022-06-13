<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="search-wrapper">
        <!-- <div class="search-form"> -->
        <BaseInput
          id="my-data-search"
          name="my-data-search"
          type="text"
          placeholder="Myデータを検索"
          v-model="state.nutrientsListFoodName"
        />
        <!-- </div>
        <div class="search-btn"> -->n
        <AppProcessingButton buttonText="検索" @processing="validateTest" />
        <!-- </div> -->
      </div>
      <div class="list-wrapper">
        <table>
          <tr class="table-title">
            <th>データID</th>
            <th>タイトル</th>
            <th>更新日時</th>
          </tr>
          <tr class="my-data">
            <td>テスト1</td>
            <td>テスト2</td>
            <td>テスト3</td>
          </tr>
        </table>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import BaseInput from "@/components/presentational/BaseInput.vue";
import axios from "axios";
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { BaseInput, AppProcessingButton },
  setup() {
    const store = useStore();

    const created = async () => {
      try {
        await store.dispatch("getmydatalist");
      } catch (error) {
        console.log(error);
      }
    };
    created();
    return {};
  },
});
</script>

<style lang="scss" scoped>
.top-wrapper {
  background-color: #f0f9ff;
  min-height: 100vh;
  .container {
    width: 90%;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
  }
}
</style>
