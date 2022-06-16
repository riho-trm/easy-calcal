<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="page-title">
        <div class="title">登録済目安量一覧</div>
      </div>
      <div class="table-list">
        <table>
          <tr class="table-title">
            <th></th>
            <th>ID</th>
            <th>分類ID</th>
            <th>食材ID</th>
            <th>食材名（栄養成分表記載）</th>
            <th>食材名（表示用）</th>
            <th>単位</th>
            <th>1単位あたりの量（g）</th>
            <th>廃棄率含</th>
            <th>追加日</th>
            <th>更新日</th>
          </tr>

          <tr class="esitimated-amount" v-for="state in states" :key="state.id">
            <td class="icon-btn">
              <div @click="routeEditData(state.id)"><fa icon="pen" /></div>
              <div @click="showModal(state.id)"><fa icon="trash-can" /></div>
            </td>
            <td>{{ state.id }}</td>
            <td>{{ state.classificationId }}</td>
            <td>{{ state.nutrientId }}</td>
            <td>{{ state.foodName }}</td>
            <td>{{ state.foodNameTodisplay }}</td>
            <td>{{ state.unit }}</td>
            <td>{{ state.standardQuantity }}</td>
            <td>{{ state.includeDisposal }}</td>
            <td>{{ state.creeatedAt }}</td>
            <td>{{ state.updatedAt }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="delete-modal">
      <ConfirmationModal
        :isVisible="modalVisible"
        message="削除してよろしいですか？"
        @cancel="closeModal"
        @processing="deleteData(targetId)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    ConfirmationModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let states = reactive([
      {
        id: -1,
        classificationId: -1,
        nutrientId: -1,
        foodName: "",
        foodNameTodisplay: "",
        unit: "",
        standardQuantity: -1,
        includeDisposal: Boolean(0),
        creeatedAt: "",
        updatedAt: "",
      },
    ]);
    let modalVisible = ref(false);
    let targetId = ref(-1);

    const created = async () => {
      states.splice(0);
      try {
        await store.dispatch("getEstimatedQuantity");
        const res = await store.getters.getEstimatedAmountList;
        for (const data of res) {
          states.push({
            id: data.id,
            classificationId: data.classificationId,
            nutrientId: data.nutrientId,
            foodName: data.foodName,
            foodNameTodisplay: data.foodNameTodisplay,
            unit: data.unit,
            standardQuantity: data.standardQuantity,
            includeDisposal: Boolean(data.includeDisposal),
            creeatedAt: new Date(Date.parse(data.creeatedAt)).toLocaleString(),
            updatedAt: new Date(Date.parse(data.updatedAt)).toLocaleString(),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    created();

    const showModal = (id: number) => {
      modalVisible.value = true;
      targetId.value = id;
    };
    const closeModal = () => {
      modalVisible.value = false;
      targetId.value = -1;
    };

    const deleteData = async (id: any) => {
      try {
        // resは削除対象のインデックス番号
        const res = await store.dispatch("deleteEstimatedQuantity", id);
        states.splice(res, 1);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };
    const routeEditData = (id: any) => {
      router.push({ path: `/editestimatedamount/${id}` });
    };

    return {
      states,
      modalVisible,
      targetId,
      created,
      showModal,
      closeModal,
      deleteData,
      routeEditData,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-wrapper {
  background-color: #f0f9ff;
  .container {
    width: 90%;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    .page-title {
      padding: 2rem 2rem;
      .title {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    .table-list {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
        .table-title {
          border-bottom: 0.1rem solid #d1d1d1;
        }
        .icon-btn {
          display: flex;
          height: 60px;
          align-items: center;
        }
      }
    }
  }
}
</style>
