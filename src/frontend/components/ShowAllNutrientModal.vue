<template>
  <teleport to="body">
    <div class="modal" id="cancel-modal" v-show="isVisible"></div>
    <div class="modal-content" v-show="isVisible">
      <div class="modal-wrapper">
        <div class="cancel" @click="close"><fa icon="xmark" /></div>
        <div class="title">全栄養成分</div>
        <tr>
          <th>項目</th>
          <th>計算値</th>
        </tr>
        <tr>
          <td>エネルギー</td>
          <td>{{ totalNutrient.calories }}</td>
        </tr>
        <tr>
          <td>水分</td>
          <td>{{ totalNutrient.water }}</td>
        </tr>
        <tr>
          <td>たんぱく質</td>
          <td>{{ totalNutrient.protain }}</td>
        </tr>
        <tr>
          <td>>アミノ酸組成によるたんぱく質</td>
          <td>
            {{ totalNutrient.protein_due_to_amino_acid_composition }}
          </td>
        </tr>
        <tr>
          <td>脂質</td>
          <td>{{ totalNutrient.fat }}</td>
        </tr>
        <tr>
          <td>コレステロール</td>
          <td>{{ totalNutrient.cholesterol }}</td>
        </tr>
        <tr>
          <td>脂肪酸のトリアシルグリセロール当量</td>
          <td>
            {{ totalNutrient.fatty_acid_triacylglycerol_equivalent }}
          </td>
        </tr>
        <tr>
          <td>炭水化物</td>
          <td>{{ totalNutrient.carbohydrate }}</td>
        </tr>
        <tr>
          <td>糖アルコール</td>
          <td>{{ totalNutrient.sugar_alcohol }}</td>
        </tr>
        <tr>
          <td>食物繊維総量</td>
          <td>{{ totalNutrient.dietary_fiber }}</td>
        </tr>
        <tr>
          <td>利用可能炭水化物差引き法による</td>
          <td>
            {{ totalNutrient.available_carbohydrates_by_deduction_method }}
          </td>
        </tr>
        <tr>
          <td>利用可能炭水化物（質量計）</td>
          <td>
            {{ totalNutrient.available_carbohydrates_by_mass_meter }}
          </td>
        </tr>
        <tr>
          <td>利用可能炭水化物（単糖当量）</td>
          <td>
            {{
              totalNutrient.available_carbohydrates_by_monosaccharide_equivalent
            }}
          </td>
        </tr>
        <tr>
          <td>有機酸</td>
          <td>{{ totalNutrient.organic_acid }}</td>
        </tr>
        <tr>
          <td>灰分</td>
          <td>{{ totalNutrient.ash }}</td>
        </tr>
        <tr>
          <td>ナトリウム</td>
          <td>{{ totalNutrient.sodium }}</td>
        </tr>
        <tr>
          <td>カリウム</td>
          <td>{{ totalNutrient.potassium }}</td>
        </tr>
        <tr>
          <td>カルシウム</td>
          <td>{{ totalNutrient.calcium }}</td>
        </tr>
        <tr>
          <td>マグネシウム</td>
          <td>{{ totalNutrient.magnesium }}</td>
        </tr>
        <tr>
          <td>リン</td>
          <td>{{ totalNutrient.phosphorus }}</td>
        </tr>
        <tr>
          <td>鉄</td>
          <td>{{ totalNutrient.iron }}</td>
        </tr>
        <tr>
          <td>亜鉛</td>
          <td>{{ totalNutrient.zinc }}</td>
        </tr>
        <tr>
          <td>銅</td>
          <td>{{ totalNutrient.copper }}</td>
        </tr>
        <tr>
          <td>マンガン</td>
          <td>{{ totalNutrient.manganese }}</td>
        </tr>
        <tr>
          <td>ヨウ素</td>
          <td>{{ totalNutrient.iodine }}</td>
        </tr>
        <tr>
          <td>セレン</td>
          <td>{{ totalNutrient.selenium }}</td>
        </tr>
        <tr>
          <td>クロム</td>
          <td>{{ totalNutrient.chromium }}</td>
        </tr>
        <tr>
          <td>モリブデン</td>
          <td>{{ totalNutrient.molybdenum }}</td>
        </tr>
        <tr>
          <td>レチノール</td>
          <td>{{ totalNutrient.retinol }}</td>
        </tr>
        <tr>
          <td>α-カロテン</td>
          <td>{{ totalNutrient.alpha_carotene }}</td>
        </tr>
        <tr>
          <td>β-カロテン</td>
          <td>{{ totalNutrient.beta_carotene }}</td>
        </tr>
        <tr>
          <td>β-クリプトキサンチン</td>
          <td>{{ totalNutrient.beta_cryptoxanthin }}</td>
        </tr>
        <tr>
          <td>β-カロテン当量</td>
          <td>{{ totalNutrient.beta_carotene_equivalent }}</td>
        </tr>
        <tr>
          <td>レチノール活性当量</td>
          <td>{{ totalNutrient.retinol_active_equivalent }}/td></td>
        </tr>
        <tr>
          <td>ビタミンD</td>
          <td>{{ totalNutrient.vitamin_d }}</td>
        </tr>
        <tr>
          <td>α-トコフェロール</td>
          <td>{{ totalNutrient.alpha_tocopherol }}</td>
        </tr>
        <tr>
          <td>β-トコフェロール</td>
          <td>{{ totalNutrient.beta_tocopherol }}</td>
        </tr>
        <tr>
          <td>γ-トコフェロール</td>
          <td>{{ totalNutrient.gamma_tocopherol }}</td>
        </tr>
        <tr>
          <td>δ-トコフェロール</td>
          <td>{{ totalNutrient.delta_tocopherol }}</td>
        </tr>
        <tr>
          <td>ビタミンK</td>
          <td>{{ totalNutrient.vitamin_k }}</td>
        </tr>
        <tr>
          <td>ビタミンB1</td>
          <td>{{ totalNutrient.vitamin_b1 }}</td>
        </tr>
        <tr>
          <td>ビタミンB2</td>
          <td>{{ totalNutrient.vitamin_b2 }}</td>
        </tr>
        <tr>
          <td>ナイアシン</td>
          <td>{{ totalNutrient.niacin }}</td>
        </tr>
        <tr>
          <td>ナイアシン当量</td>
          <td>{{ totalNutrient.niacin_equivalent }}</td>
        </tr>
        <tr>
          <td>ビタミンB6</td>
          <td>{{ totalNutrient.vitamin_b6 }}</td>
        </tr>
        <tr>
          <td>ビタミンB12</td>
          <td>{{ totalNutrient.vitamin_b12 }}</td>
        </tr>
        <tr>
          <td>葉酸</td>
          <td>{{ totalNutrient.folic_acid }}</td>
        </tr>
        <tr>
          <td>パントテン酸</td>
          <td>{{ totalNutrient.pantothenic_acid }}</td>
        </tr>
        <tr>
          <td>ビオチン</td>
          <td>{{ totalNutrient.biotin }}</td>
        </tr>
        <tr>
          <td>ビタミンC</td>
          <td>{{ totalNutrient.vitamin_c }}</td>
        </tr>
        <tr>
          <td>アルコール</td>
          <td>{{ totalNutrient.alcohol }}</td>
        </tr>
        <tr>
          <td>食塩相当量</td>
          <td>{{ totalNutrient.sodium_chloride_equivalent }}</td>
        </tr>
        <div class="cancel" @click="close"><fa icon="xmark" /></div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch } from "vue";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export default defineComponent({
  props: {
    isVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
    totalNutrient: {
      type: Object,
      required: true,
      default: () => {
        return {
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
      },
    },
  },
  emits: ["close"],
  setup(props, context) {
    const { isVisible } = toRefs(props);

    watch(isVisible, () => {
      console.log("watchがよばれた");
      console.log(isVisible.value);
      const modal = document.querySelector(".modal-content");
      if (isVisible.value === true) {
        disableBodyScroll(modal);
      } else if (isVisible.value === false) {
        clearAllBodyScrollLocks();
      }
    });
    const close = () => {
      context.emit("close");
    };
    return {
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  font-family: "Kiwi Maru", serif;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-y: scroll;

  // モーダルの幅や色などはお好きにどうぞ！
  background-color: white;
  width: 600px;
  height: 60%;
  padding: 20px;
  .modal-wrapper {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
  }
}
</style>
