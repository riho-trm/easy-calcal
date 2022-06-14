<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="title">
        <span v-if="!isEdit">{{ defaultMyData.title }}</span>
        <BaseInput
          v-if="isEdit"
          id="my-data-title"
          name="my-data-title"
          placeholder="タイトル"
          type="text"
          v-model="defaultMyData.title"
          @change="onUpdateMyData"
        />
      </div>
      <div class="flex-wrapper">
        <div class="input-nutrients">
          <div class="nutrients-search-form">
            <SimpleTypeahead
              v-if="isEdit"
              id="food-name-input"
              placeholder="食材名を検索"
              :items="sugestItems"
              :minInputLength="1"
              @selectItem="selectItem"
              ref="typeahead"
            />
          </div>
          <div class="input-quantity">
            <div
              class="quantity-list"
              v-for="(data, index) in defaultMyNutrients"
              :key="index"
            >
              <div class="icon-btn" @click="deleteItem(index)">
                <fa icon="trash-can" />
              </div>
              <div class="food-name">{{ data.nutrient.food_name }}</div>
              <div class="food-input">
                <div class="gram-input">
                  <span v-if="!isEdit">{{ data.quantity }}</span>
                  <BaseInput
                    v-if="isEdit"
                    id="quantity-input"
                    class="quantity-input"
                    name="quantity"
                    type="text"
                    v-model="data.quantity"
                    @change="
                      calcNutrient(
                        Number($event.target.value),
                        index,
                        data.nutrient.food_name
                      )
                    "
                  />
                  <p class="gram">g</p>
                </div>
                <AppProcessingButton
                  v-if="data.estimatedIdList.length >= 1"
                  class="input-estimated-btn"
                  buttonText="目安量で入力"
                  @processing="
                    openInputEstimatedModal(
                      data.nutrient.food_name,
                      data.estimatedIdList,
                      index
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>

        <div class="display-informations">
          <div class="display-nutrients">
            <div class="display-nutrients-title">総カロリーと三大栄養素</div>
            <div class="calculated-nutrient">
              <div class="cn carolies">
                エネルギー：{{ totalNutrient.calories }}kcal
              </div>
              <div class="cn protain">
                たんぱく質：{{ totalNutrient.protain }}g
              </div>
              <div class="cn fat">脂質：{{ totalNutrient.fat }}g</div>
              <div class="cn carbon">
                炭水化物：{{ totalNutrient.carbohydrate }}g
              </div>
            </div>
            <AppProcessingButton
              class="show-all-nutrient-btn"
              buttonText="全ての栄養素を見る"
              @processing="openShowAllNutrientModal"
            />
          </div>

          <div class="display-memo">
            <BaseLabel class="label" id="memo">memo</BaseLabel>
            <br />
            <span v-if="!isEdit">{{ defaultMyData.memo }}</span>
            <textarea
              v-if="isEdit"
              rows="5"
              id="memo"
              name="memo"
              type="text"
              v-model="defaultMyData.memo"
              @change="onUpdateMyData"
            ></textarea>
          </div>
          <div class="display-url">
            <BaseLabel class="label" id="url">URL</BaseLabel>
            <br />
            <span v-if="!isEdit">{{ defaultMyData.url }}</span>
            <BaseInput
              v-if="isEdit"
              id="url"
              name="url"
              type="text"
              v-model="defaultMyData.url"
              @change="onUpdateMyData"
            />
          </div>
        </div>
      </div>
      <div class="btn">
        <AppProcessingButton
          class="delete-btn"
          buttonText="削除"
          @processing="openSaveCalculatedModal"
        />
        <AppCancelButton
          class="return-btn"
          buttonText="戻る"
          @cancel="showModal"
        />
        <AppProcessingButton
          v-if="!isEdit"
          class="edit-btn"
          buttonText="編集"
          @processing="isEdit = true"
        />
        <AppProcessingButton
          v-if="isEdit"
          class="save-btn"
          buttonText="保存"
          @processing="openSaveCalculatedModal"
        />
      </div>
    </div>

    <div class="modal">
      <InputEstimatedModal
        :isVisible="inputEstimatedModalData.inputEstimatedModalVisible"
        :foodName="inputEstimatedModalData.foodName"
        :estimatedIdList="inputEstimatedModalData.estimatedIdList"
        :index="inputEstimatedModalData.stateIndex"
        @cancel="closeInputEstimatedModal"
        @processing="setQuantity"
      />
      <ShowAllNutrientModal
        :isVisible="showAllNutrientModalVisible"
        :totalNutrient="totalNutrient"
        @close="closeShowAllNutrientModal"
      />
      <ConfirmationModal
        :isVisible="showDeleteModalVisible"
        message="削除してよろしいですか？"
        @cancel="closeModal"
        @processing="backPage"
      />
      <ConfirmationModal
        :isVisible="showCancelModalVisible"
        message="編集内容が破棄されますがよろしいですか？"
        @cancel="closeModal"
        @processing="backPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import AppCancelButton from "@/components/container/AppCancelButton.vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import InputEstimatedModal from "@/components/InputEstimatedModal.vue";
import BaseInput from "@/components/presentational/BaseInput.vue";
import BaseLabel from "@/components/presentational/BaseLabel.vue";
import ShowAllNutrientModal from "@/components/ShowAllNutrientModal.vue";
import {
  DefaultMyData,
  DefaultMyNutrients,
  DeletedMyNutrients,
  EditedMyData,
  EditedMyNutrients,
  MyData,
  Nutrients,
  TotalNutrient,
} from "@/types/task";
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SimpleTypeahead from "vue3-simple-typeahead";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    SimpleTypeahead,
    BaseLabel,
    BaseInput,
    AppProcessingButton,
    AppCancelButton,
    ConfirmationModal,
    InputEstimatedModal,
    ShowAllNutrientModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // 画面表示関連変数
    // 保存済みデータ（title,memoなど）
    let defaultMyData = reactive({}) as DefaultMyData;
    // 保存済み食品一覧
    let defaultMyNutrients = reactive([]) as Array<DefaultMyNutrients>;
    // 検索サジェスト機能用食品名一覧
    let sugestItems = reactive([]);
    // 計算済み栄養素合計
    let totalNutrient = reactive({
      calories: 0,
      water: 0,
      protein_due_to_amino_acid_composition: 0,
      protain: 0,
      fatty_acid_triacylglycerol_equivalent: 0,
      cholesterol: 0,
      fat: 0,
      available_carbohydrates_by_monosaccharide_equivalent: 0,
      available_carbohydrates_by_mass_meter: 0,
      available_carbohydrates_by_deduction_method: 0,
      dietary_fiber: 0,
      sugar_alcohol: 0,
      carbohydrate: 0,
      organic_acid: 0,
      ash: 0,
      sodium: 0,
      potassium: 0,
      calcium: 0,
      magnesium: 0,
      phosphorus: 0,
      iron: 0,
      zinc: 0,
      copper: 0,
      manganese: 0,
      iodine: 0,
      selenium: 0,
      chromium: 0,
      molybdenum: 0,
      retinol: 0,
      alpha_carotene: 0,
      beta_carotene: 0,
      beta_cryptoxanthin: 0,
      beta_carotene_equivalent: 0,
      retinol_active_equivalent: 0,
      vitamin_d: 0,
      alpha_tocopherol: 0,
      beta_tocopherol: 0,
      gamma_tocopherol: 0,
      delta_tocopherol: 0,
      vitamin_k: 0,
      vitamin_b1: 0,
      vitamin_b2: 0,
      niacin: 0,
      niacin_equivalent: 0,
      vitamin_b6: 0,
      vitamin_b12: 0,
      folic_acid: 0,
      pantothenic_acid: 0,
      biotin: 0,
      vitamin_c: 0,
      alcohol: 0,
      sodium_chloride_equivalent: 0,
    } as TotalNutrient);

    // フラグ関連変数
    // 編集ボタンを押下した際にフラグをたてる（true）
    let isEdit = ref(false);

    // モーダル関連変数
    // 目安量入力モーダルに渡す情報
    let inputEstimatedModalData = reactive({
      inputEstimatedModalVisible: false,
      foodName: "",
      estimatedIdList: [],
      stateIndex: -1,
    });
    // 栄養素一覧モーダルを表示するためのフラグ
    let showAllNutrientModalVisible = ref(false);
    // 削除確認モーダルを表示するためのフラグ
    let showDeleteModalVisible = ref(false);
    // キャンセル確認モーダルを表示するためのフラグ
    let showCancelModalVisible = ref(false);

    // 更新関連変数
    // myデータ（メモ、タイトルなど）の更新内容を保存
    let editedMyData = reactive({}) as EditedMyData;
    // 食品一覧の更新内容を保存
    let editedMyNutrients = reactive({}) as EditedMyNutrients;
    // 削除済み食品一覧を保存
    let deletedMyNutirients = reactive({}) as DeletedMyNutrients;

    const resetTotalNutrient = () => {
      for (const key in totalNutrient) {
        totalNutrient[key] = 0;
      }
    };

    const created = async () => {
      editedMyData.isEdited = false;
      editedMyNutrients.isEdited = false;
      deletedMyNutirients.isDeleted = false;

      sugestItems = store.getters.getSugestList;
      console.log(sugestItems);

      const targetId = Number(route.params.id);
      const myDataRes: MyData = await store.getters.getMyData(targetId);
      // defaultMyData初期設定
      defaultMyData.savedDataId = myDataRes.savedDataId;
      defaultMyData.title = myDataRes.title;
      defaultMyData.memo = myDataRes.memo;
      defaultMyData.url = myDataRes.url;
      // defaultMyNutrient初期設定
      for (const data of myDataRes.myNutrients) {
        const foodName = await store.getters.getNutrientById(data.nutrientId)
          .food_name;
        const nutrientRes: Nutrients =
          await store.getters.calcNutrientsQuanrity(foodName, data.quantity);
        const estimatedIdRes: Array<number> =
          await store.getters.getEstimatedIdList(data.nutrientId);
        defaultMyNutrients.push({
          savedNutrientsId: data.savedNutrientsId,
          quantity: data.quantity,
          estimatedIdList: estimatedIdRes,
          nutrient: nutrientRes,
        });
      }
      // totalNutrient初期設定
      for (const totalKey in totalNutrient) {
        for (const nutrient of defaultMyNutrients) {
          for (const nutrientKey in nutrient.nutrient) {
            if (nutrientKey === totalKey) {
              const plusNutrient =
                Math.round(
                  (totalNutrient[totalKey] += nutrient.nutrient[
                    nutrientKey
                  ] as number) * 100
                ) / 100;
              totalNutrient[totalKey] = plusNutrient;
            }
          }
        }
      }
      console.log(editedMyNutrients);
      console.log(sugestItems);
    };
    created();

    const onUpdateMyData = () => {
      editedMyData.isEdited = true;
      editedMyData.title = defaultMyData.title;
      editedMyData.memo = defaultMyData.memo;
      editedMyData.url = defaultMyData.url;
    };

    const calcNutrient = (
      quantity: number,
      index: number,
      foodName: string
    ) => {
      console.log("calcNutrientがよばれた");
      const res: Nutrients = store.getters.calcNutrientsQuanrity(
        foodName,
        quantity
      );
      defaultMyNutrients[index].nutrient = res;
      resetTotalNutrient();
      for (const totalKey in totalNutrient) {
        for (const nutrient of defaultMyNutrients) {
          for (const nutrientKey in nutrient.nutrient) {
            if (nutrientKey === totalKey) {
              const plusNutrient =
                Math.round(
                  (totalNutrient[totalKey] += nutrient.nutrient[
                    nutrientKey
                  ] as number) * 100
                ) / 100;
              totalNutrient[totalKey] = plusNutrient;
            }
          }
        }
      }
      updateEditedNutrients(
        defaultMyNutrients[index].savedNutrientsId,
        quantity
      );
    };
    const updateEditedNutrients = (
      savedNutrientsId: number,
      newQuantity: number
    ) => {
      console.log("updateEditedNutrientsがよばれた");

      editedMyNutrients.isEdited = true;

      let hasId = false;
      if (editedMyNutrients.editedData === undefined) {
        editedMyNutrients.editedData = [];
        editedMyNutrients.editedData.push({
          savedNutrientsId: savedNutrientsId,
          quantity: newQuantity,
        });
      } else if (savedNutrientsId === -100) {
        return;
      } else {
        for (const data of editedMyNutrients.editedData) {
          if (data.savedNutrientsId === savedNutrientsId) {
            data.quantity = newQuantity;
            hasId = true;
          }
        }
        if (!hasId) {
          editedMyNutrients.editedData.push({
            savedNutrientsId: savedNutrientsId,
            quantity: newQuantity,
          });
        }
      }
      console.log(editedMyNutrients);
    };

    const deleteItem = (index: number) => {
      for (const totalKey in totalNutrient) {
        for (const stateKey in defaultMyNutrients[index].nutrient) {
          if (totalKey === stateKey) {
            const subNutrient =
              Math.round(
                (totalNutrient[totalKey] -= defaultMyNutrients[index].nutrient[
                  stateKey
                ] as number) * 100
              ) / 100;
            totalNutrient[totalKey] = subNutrient;
          }
        }
      }
      updateDeletedMyNutrients(defaultMyNutrients[index].savedNutrientsId);
      defaultMyNutrients.splice(index, 1);
    };
    const updateDeletedMyNutrients = (savedNutrientsId: number) => {
      // 削除済みリスト追加処理
      if (savedNutrientsId === -100) {
        return;
      } else if (deletedMyNutirients.savedNutrientsId === undefined) {
        deletedMyNutirients.isDeleted = true;
        deletedMyNutirients.savedNutrientsId = [];
        deletedMyNutirients.savedNutrientsId.push(savedNutrientsId);
      } else {
        deletedMyNutirients.isDeleted = true;
        deletedMyNutirients.savedNutrientsId.push(savedNutrientsId);
      }
      // 削除したデータがeditedMyNutrientsにある場合削除
      for (const index in editedMyNutrients.editedData) {
        if (
          editedMyNutrients.editedData[index].savedNutrientsId ===
          savedNutrientsId
        ) {
          editedMyNutrients.editedData.splice(Number(index), 1);
        }
        if (editedMyNutrients.editedData.length === 0) {
          editedMyNutrients.isEdited = false;
        }
      }
    };

    const openInputEstimatedModal = (
      foodName: string,
      estimatedIdList: [],
      index: number
    ) => {
      inputEstimatedModalData.inputEstimatedModalVisible = true;
      inputEstimatedModalData.foodName = foodName;
      inputEstimatedModalData.estimatedIdList = estimatedIdList;
      inputEstimatedModalData.stateIndex = index;
    };
    const setQuantity = (
      calculatedQuantity: number,
      index: number,
      foodName: string
    ) => {
      console.log(calculatedQuantity, index);
      defaultMyNutrients[index].quantity = calculatedQuantity;
      calcNutrient(calculatedQuantity, index, foodName);
      closeInputEstimatedModal();
    };
    const closeInputEstimatedModal = () => {
      inputEstimatedModalData.inputEstimatedModalVisible = false;
    };

    const openShowAllNutrientModal = () => {
      showAllNutrientModalVisible.value = true;
    };
    const closeShowAllNutrientModal = () => {
      showAllNutrientModalVisible.value = false;
    };

    return {
      defaultMyData,
      defaultMyNutrients,
      sugestItems,
      totalNutrient,
      isEdit,
      inputEstimatedModalData,
      showAllNutrientModalVisible,
      showDeleteModalVisible,
      showCancelModalVisible,
      editedMyData,
      editedMyNutrients,
      deletedMyNutirients,

      resetTotalNutrient,
      onUpdateMyData,
      calcNutrient,
      updateEditedNutrients,
      deleteItem,
      updateDeletedMyNutrients,
      openInputEstimatedModal,
      setQuantity,
      closeInputEstimatedModal,
      openShowAllNutrientModal,
      closeShowAllNutrientModal,
    };
  },
});
</script>

<style lang="scss" scoped>
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
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    .title {
      padding-top: 2rem;
      span {
        font-size: 2.5rem;
        font-weight: bold;
        color: #39587d;
      }
    }
    .flex-wrapper {
      display: flex;
      padding-bottom: 2rem;
      .input-nutrients {
        width: 50%;
        .nutrients-search-form {
          padding-top: 2rem;
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
              background-color: white;
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
        }

        .input-quantity {
          width: 95%;
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 3px;
          padding: 1rem;
          .quantity-list {
            border-bottom: 1px solid #dcdcdc;
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            .icon-btn {
              width: 10%;
              font-size: 2rem;
            }
            .food-name {
              width: 65%;
              font-size: 1rem;
            }
            .food-input {
              width: 25%;
              display: flex;
              flex-direction: column;
              :deep(.btn) {
                font-size: 0.2rem;
                padding: 0.1rem 0.3rem;
                margin: 0;
              }
              .gram-input {
                display: flex;
                justify-content: center;
                span {
                  font-size: 1rem;
                }
                .gram {
                  font-size: 1rem;
                  margin-left: 0.3rem;
                }
              }
              .input-estimated-btn {
                margin: 0.6rem 0;
              }
            }
          }
        }
      }
      .display-informations {
        width: 50%;
        font-size: 1rem;
        .display-nutrients {
          padding-bottom: 1rem;
          .display-nutrients-title {
            font-weight: bold;
            color: #39587d;
            padding-top: 2rem;
            padding-bottom: 0.5rem;
          }
          .calculated-nutrient {
            padding-bottom: 0.5rem;
            .cn {
              padding-bottom: 0.5rem;
            }
          }
          :deep(.btn) {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }
        }
        .display-memo,
        .display-url {
          padding-bottom: 1rem;
          .label {
            margin-bottom: 0.5rem;
          }
          :deep(label) {
            font-weight: bold;
            color: #39587d;
          }
        }
        .display-memo {
          textarea {
            background-color: #fff;
            border: 1px solid #dcdcdc;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 3px;
            font-size: 100%;
          }
        }
      }
    }
    .btn {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      :deep(.btn) {
        font-size: 1rem;
        padding: 0.5rem 2.5rem;
        margin: 0 1rem;
      }
      .delete-btn {
        :deep(.btn--color) {
          background-color: red;
          border: 2px solid red;
          &:hover {
            color: red;
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
