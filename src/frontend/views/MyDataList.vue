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
            <th class="data-id">データID</th>
            <th class="title">タイトル</th>
            <th class="updated">更新日時</th>
          </tr>
          <tr
            class="my-data"
            v-for="data in filteredTitles"
            :key="data.savedDataId"
          >
            <td class="data-id">{{ data.savedDataId }}</td>
            <td class="title">
              <div @click="routeMyDataDetail(data.savedDataId)">
                {{ data.title }}
              </div>
            </td>
            <td class="updated">{{ data.updatedAt }}</td>
          </tr>
        </table>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseInput from "@/components/presentational/BaseInput.vue";
import { MyData } from "@/types/task";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { BaseInput },
  setup() {
    const store = useStore();
    const router = useRouter();

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

    const routeMyDataDetail = (id: any) => {
      router.push({ path: `/mydatadetail/${id}` });
    };

    return { states, searchWord, filteredTitles, routeMyDataDetail };
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
    .search-wrapper {
      padding: 2rem 0;
      :deep(.input-form) {
        width: 50%;
        height: 35px;
        border: 1px solid #dcdcdc;
        font-size: 150%;
      }
    }
    .list-wrapper {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 2rem;
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
        .title,
        .updated {
          text-align: left;
        }
        .table-title {
          border-bottom: 0.1rem solid #d1d1d1;
          border-top: 0.1rem solid #d1d1d1;
          .data-id {
            width: 15%;
          }
          .title {
            width: 55%;
          }
        }
        .my-data {
          height: 4rem;
          border-bottom: 0.1rem solid #d1d1d1;
          .data-id,
          .title {
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
