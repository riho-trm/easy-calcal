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
          v-model="searchWord"
        />
        <!-- </div>
        <div class="search-btn"> -->
        <!-- <AppProcessingButton buttonText="検索" /> -->
        <!-- </div> -->
      </div>
      <div class="list-wrapper">
        <table>
          <tr class="table-title">
            <th>データID</th>
            <th>タイトル</th>
            <th>更新日時</th>
          </tr>
          <tr
            class="my-data"
            v-for="data in filteredTitles"
            :key="data.savedDataId"
          >
            <td>{{ data.savedDataId }}</td>
            <td>{{ data.title }}</td>
            <td>{{ data.updatedAt }}</td>
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
import { MyData } from "@/types/task";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { BaseInput },
  setup() {
    const store = useStore();

    let states = reactive([]) as MyData[];
    const searchWord = ref("");

    const created = async () => {
      try {
        await store.dispatch("getmydata");
        const res = store.getters.getMyDataList;
        res.forEach((data: MyData) => states.push(data));
      } catch (error) {
        console.log(error);
      }
    };
    created();

    const filteredTitles = computed(() => {
      let titles = [];
      for (let i in states) {
        if (states[i].title.indexOf(searchWord.value) !== -1) {
          titles.push(states[i]);
        }
      }
      return titles;
    });

    return { states, searchWord, filteredTitles };
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
