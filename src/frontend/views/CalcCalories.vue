<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="input-nutrients">
        <div class="nutrients-search-form">
          <SimpleTypeahead
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
            v-for="(food, index) in state"
            :key="food.id"
          >
            <div @click="deleteItem(index)"><fa icon="trash-can" /></div>
            <div>{{ food.nutrient.food_name }}</div>
            <BaseInput
              id="quantity-input"
              name="quantity"
              type="text"
              v-model="food.quantity"
              @onBlur="onBlur($event, index, food.nutrient.food_name)"
            />
            <AppProcessingButton
              class="btn input-estimated-btn"
              buttonText="目安量で入力"
            />
          </div>
          <AppCancelButton buttonText="リセット" @cancel="resetItem" />
        </div>
      </div>

      <div class="display-nutrients">
        <div class="title">総カロリーと三大栄養素</div>
        <div class="calculated-nutrient">
          <div class="carolies">エネルギー：{{ totalNutrient.calories }}</div>
          <div class="protain">たんぱく質：{{ totalNutrient.protain }}</div>
          <div class="fat">脂質：{{ totalNutrient.fat }}</div>
          <div class="carbon">炭水化物：{{ totalNutrient.carbohydrate }}</div>
        </div>
        <div class="modal-btn">
          <ConfirmationModal
            :isVisible="modalVisible"
            message="全ての栄養素を見る"
            @cancel="closeModal"
          />
          <ConfirmationModal
            :isVisible="modalVisible"
            message="保存"
            @cancel="closeModal"
            @processing="deleteData(targetId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CalculatedNutrient, Nutrients, TotalNutrient } from "@/types/task";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SimpleTypeahead from "vue3-simple-typeahead";
import { useStore } from "vuex";
import BaseInput from "@/components/presentational/BaseInput.vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import AppCancelButton from "@/components/container/AppCancelButton.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

export default defineComponent({
  components: {
    SimpleTypeahead,
    BaseInput,
    AppProcessingButton,
    AppCancelButton,
    ConfirmationModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const typeahead = ref<InstanceType<typeof SimpleTypeahead>>();

    let state = reactive([]) as Array<CalculatedNutrient>;
    let sugestItems = reactive([]);
    let modalVisible = ref(false);
    let totalNutrient = reactive({} as TotalNutrient);

    const created = () => {
      sugestItems = store.getters.getSugestList;
    };
    created();

    const resetTotalNutrient = () => {
      totalNutrient = {
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
      };
    };

    const selectItem = (foodName: string) => {
      const res: Nutrients = store.getters.calcNutrientsQuanrity(foodName, 0);
      state.push({
        quantity: 0,
        nutrient: res,
      });
      // モジュールのdata内のinputにアクセスしてリセット
      typeahead.value.input = "";
      //   resetTotalNutrient();
      //   for (const key in totalNutrient) {
      //     totalNutrient[key] = 0;
      //   }
      //   console.log(totalNutrient);
    };

    const onBlur = (quantity: number, index: number, foodName: string) => {
      const res: Nutrients = store.getters.calcNutrientsQuanrity(
        foodName,
        quantity
      );
      state[index].nutrient = res;
      console.log(state[index]);

      resetTotalNutrient();
      for (const totalKey in totalNutrient) {
        for (const nutrient of state) {
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
      console.log(totalNutrient);
    };

    const deleteItem = (index: number) => {
      state.splice(index, 1);
    };
    const resetItem = () => {
      state.splice(0);
    };

    return {
      state,
      sugestItems,
      modalVisible,
      totalNutrient,
      selectItem,
      typeahead,
      onBlur,
      deleteItem,
      resetItem,
      resetTotalNutrient,
    };
  },
});
</script>

<style lang="scss" scoped></style>
