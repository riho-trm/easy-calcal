<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="page-title">
        <div class="title">登録済目安量一覧</div>
      </div>
      <div class="table-list">
        <table>
          <tr>
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
            <td>
              <div><fa icon="pen" /></div>
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
        @processing="deleteData(deleteId)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

export default defineComponent({
  components: {
    ConfirmationModal,
  },
  setup() {
    const store = useStore();

    let states = reactive([{}]);
    let modalVisible = ref(false);
    let deleteId = ref(-1);

    const created = async () => {
      states.splice(0);
      try {
        const res = await store.dispatch("getEstimatedQuantity");
        for (const data of res) {
          const targetNutrient = await store.state.nutrients.find(
            (n: any) => n.id === data.nutrient_id
          );
          states.push({
            id: data.id,
            classificationId: data.classification_id,
            nutrientId: data.nutrient_id,
            foodName: targetNutrient.food_name,
            foodNameTodisplay: data.food_name_todisplay,
            unit: data.unit,
            standardQuantity: data.standard_quantity,
            includeDisposal: data.include_disposal,
            creeatedAt: new Date(Date.parse(data.creeated_at)).toLocaleString(),
            updatedAt: new Date(Date.parse(data.updated_at)).toLocaleString(),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    created();

    const showModal = (id: number) => {
      modalVisible.value = true;
      deleteId.value = id;
    };
    const closeModal = () => {
      modalVisible.value = false;
      deleteId.value = -1;
    };

    const deleteData = async (id: any) => {
      try {
        const res = await store.dispatch("deleteEstimatedQuantity", id);
        closeModal();
        created();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      states,
      modalVisible,
      deleteId,
      created,
      showModal,
      closeModal,
      deleteData,
    };
  },
});
</script>

<style lang="scss" scoped></style>
