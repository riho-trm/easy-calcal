<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="page-title">管理者メニュー</div>
      <AppRoutingButton
        class="btn registered-estimated-amount-btn"
        buttonText="登録済目安量一覧"
        routing="estimatedamountlist"
      />
      <br />
      <AppRoutingButton
        class="btn estimated-amount-list-btn"
        buttonText="目安量登録"
        routing="registerestimatedamount"
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
