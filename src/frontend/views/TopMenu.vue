<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="page-title">TOPメニュー</div>
      <AppRoutingButton
        class="btn calc-calolies-btn"
        buttonText="カロリー計算"
        routing="calccalories"
      />
      <br />
      <AppRoutingButton
        class="btn my-data-btn"
        buttonText="Myデータ"
        routing="mydatalist"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AppRoutingButton from "@/components/container/AppRoutingButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppRoutingButton },
  setup() {
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
    .page-title {
      font-size: 2.5rem;
      font-weight: 500;
      width: 40%;
      padding: 2rem 0;
    }
  }
}
</style>
