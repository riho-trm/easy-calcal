<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="title">
        <span v-if="!isEdit">{{ state.title }}</span>
        <BaseInput
          v-if="isEdit"
          id="my-data-title"
          name="my-data-title"
          type="text"
          v-model="state.title"
        />
      </div>
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
            v-for="(data, index) in state"
            :key="index"
          >
            <div class="icon-btn" @click="deleteItem(index)">
              <fa icon="trash-can" />
            </div>
            <div class="food-name">{{ food.nutrient.food_name }}</div>
            <div class="food-input">
              <div class="gram-input">
                <span v-if="!isEdit">{{ あとで入力 }}</span>
                <BaseInput
                  v-if="isEdit"
                  id="quantity-input"
                  class="quantity-input"
                  name="quantity"
                  type="text"
                  v-model="food.quantity"
                  @onBlur="calcNutrient($event, index, food.nutrient.food_name)"
                />
                <p class="gram">g</p>
              </div>
              <AppProcessingButton
                v-if="food.estimatedIdList.length >= 1"
                class="btn input-estimated-btn"
                buttonText="目安量で入力"
                @processing="
                  openInputEstimatedModal(
                    food.nutrient.food_name,
                    food.estimatedIdList,
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
            class="btn show-all-nutrient-btn"
            buttonText="全ての栄養素を見る"
            @processing="openShowAllNutrientModal"
          />
        </div>

        <div class="display-memo">
          <BaseLabel id="memo">memo</BaseLabel>
          <span v-if="!isEdit">{{ あとで入力 }}</span>
          <textarea
            v-if="isEdit"
            rows="5"
            id="memo"
            name="memo"
            type="text"
            v-model="memo"
          ></textarea>
        </div>
        <div class="display-url">
          <BaseLabel id="url">URL</BaseLabel>
          <span v-if="!isEdit">{{ あとで入力 }}</span>
          <BaseInput
            v-if="isEdit"
            id="url"
            name="url"
            type="text"
            v-model="state.unit"
          />
        </div>
        <div class="btn">
          <AppProcessingButton
            class="btn delete-btn"
            buttonText="削除"
            @processing="openSaveCalculatedModal"
          />
          <AppCancelButton buttonText="戻る" @cancel="showModal" />
          <AppProcessingButton
            v-if="!isEdit"
            class="btn edit-btn"
            buttonText="編集"
            @processing="openSaveCalculatedModal"
          />
          <AppProcessingButton
            v-if="isEdit"
            class="btn save-btn"
            buttonText="保存"
            @processing="openSaveCalculatedModal"
          />
        </div>
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
import BaseInput from "@/components/presentational/BaseInput.vue";
import BaseLabel from "@/components/presentational/BaseLabel.vue";
import {
  DefaultMyData,
  DefaultMyNutrients,
  DeletedMyNutrients,
  EditedMyData,
  EditedMyNutrients,
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

    const created = () => {
      sugestItems = store.getters.getSugestList;
    };
    created();
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
    };
  },
});
</script>

<style lang="scss" scoped></style>
